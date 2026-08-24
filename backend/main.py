from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import os
from dotenv import load_dotenv

# Try to import optional dependencies
try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False
    genai = None
    print("Warning: google-generativeai not installed. AI features will use mock responses.")

try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image
    from reportlab.lib.enums import TA_CENTER, TA_LEFT
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False
    print("Warning: reportlab not installed. PDF generation will be disabled.")

from io import BytesIO
from fastapi.responses import Response

load_dotenv()

app = FastAPI(title="Calisthenics Fitness API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY and GENAI_AVAILABLE:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
    except Exception as e:
        print(f"Warning: Failed to configure Gemini AI: {e}")
        model = None
else:
    model = None
    if not GENAI_AVAILABLE:
        print("Warning: google-generativeai not installed. AI features will use mock responses.")
    elif not GEMINI_API_KEY:
        print("Warning: GEMINI_API_KEY not found. AI features will use mock responses.")


class AssessmentRequest(BaseModel):
    answers: Dict[int, Any]


class PDFRequest(BaseModel):
    workout_plan: str
    diet_plan: str
    health_tips: str


def generate_ai_response(prompt: str) -> str:
    """Generate AI response using Gemini or return mock data"""
    if model:
        try:
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"AI Error: {e}")
            return generate_mock_response(prompt)
    else:
        return generate_mock_response(prompt)


def generate_mock_response(prompt: str) -> str:
    """Generate mock response when AI is not available"""
    if "workout" in prompt.lower():
        return """WEEK 1-2: Foundation Building
Day 1: Upper Body
- Push-ups: 3 sets x 10 reps
- Pull-ups (or negatives): 3 sets x 5 reps
- Dips: 3 sets x 8 reps
- Plank: 3 sets x 30 seconds

Day 2: Lower Body
- Squats: 4 sets x 15 reps
- Lunges: 3 sets x 12 reps each leg
- Calf raises: 3 sets x 20 reps
- Leg raises: 3 sets x 15 reps

Day 3: Core & Flexibility
- Plank variations: 3 sets x 45 seconds
- Russian twists: 3 sets x 20 reps
- Leg raises: 3 sets x 15 reps
- Stretching: 15 minutes

Rest day between sessions. Focus on proper form over speed."""
    
    elif "diet" in prompt.lower():
        return """MEAL PLAN

Breakfast (7-8 AM):
- Oatmeal with fruits and nuts
- 2-3 eggs or protein smoothie
- Green tea

Lunch (12-1 PM):
- Grilled chicken/fish with quinoa
- Mixed vegetables
- Salad with olive oil dressing

Snack (3-4 PM):
- Greek yogurt with berries
- Or protein bar

Dinner (7-8 PM):
- Lean protein (chicken/fish/tofu)
- Sweet potato or brown rice
- Steamed vegetables

HYDRATION:
- Drink 2-3 liters of water daily
- Avoid sugary drinks
- Green tea for antioxidants"""
    
    else:
        return """HEALTH TIPS FOR SUCCESS:

1. SLEEP: Aim for 7-9 hours of quality sleep
2. HYDRATION: Drink water throughout the day
3. CONSISTENCY: Better to train 3x/week consistently than 7x/week sporadically
4. PROGRESS TRACKING: Take photos and measurements weekly
5. REST DAYS: Essential for muscle recovery
6. WARM-UP: Always warm up before workouts
7. COOL-DOWN: Stretch after each session
8. NUTRITION: Focus on whole foods, avoid processed foods
9. PATIENCE: Results take time, stay consistent
10. ENJOYMENT: Find exercises you enjoy to maintain motivation"""


@app.get("/")
async def root():
    return {"message": "Calisthenics Fitness API is running!"}


@app.post("/api/assess")
async def assess_user(request: AssessmentRequest):
    """Generate personalized workout, diet, and health tips based on user assessment"""
    try:
        answers = request.answers
        
        # Build context from answers
        context = "User Assessment Answers:\n"
        for key, value in answers.items():
            context += f"Q{key}: {value}\n"
        
        # Generate workout plan
        workout_prompt = f"""You are an expert calisthenics trainer. Based on the following user assessment, create a detailed, personalized calisthenics workout plan. 
        
{context}

Create a comprehensive workout plan that includes:
- Weekly schedule
- Specific exercises with sets and reps
- Progression plan
- Rest days
- Form tips

Make it motivating and achievable. Focus on bodyweight exercises only."""
        
        workout_plan = generate_ai_response(workout_prompt)
        
        # Generate diet plan
        diet_prompt = f"""You are a nutrition expert. Based on the following user assessment, create a personalized diet plan.
        
{context}

Create a comprehensive diet plan that includes:
- Meal timing
- Food recommendations
- Portion guidance
- Hydration tips
- Meal examples

Make it practical and sustainable."""
        
        diet_plan = generate_ai_response(diet_prompt)
        
        # Generate health tips
        health_prompt = f"""You are a health and fitness expert. Based on the following user assessment, provide personalized health tips.
        
{context}

Provide 10-15 practical health tips covering:
- Sleep
- Recovery
- Motivation
- Injury prevention
- Lifestyle habits

Make them specific and actionable."""
        
        health_tips = generate_ai_response(health_prompt)
        
        return {
            "workout_plan": workout_plan,
            "diet_plan": diet_plan,
            "health_tips": health_tips
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating plan: {str(e)}")


@app.post("/api/generate-pdf")
async def generate_pdf(request: PDFRequest):
    """Generate PDF from workout, diet, and health tips"""
    if not REPORTLAB_AVAILABLE:
        raise HTTPException(status_code=503, detail="PDF generation is not available. Please install reportlab: pip install reportlab")
    try:
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=0.5*inch, bottomMargin=0.5*inch)
        
        # Container for the 'Flowable' objects
        story = []
        
        # Define styles
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor='#0ea5e9',
            spaceAfter=30,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=18,
            textColor='#0284c7',
            spaceAfter=12,
            spaceBefore=20,
            fontName='Helvetica-Bold'
        )
        
        normal_style = ParagraphStyle(
            'CustomNormal',
            parent=styles['Normal'],
            fontSize=11,
            leading=14,
            spaceAfter=12,
            alignment=TA_LEFT
        )
        
        # Title
        story.append(Paragraph("Your Personalized Calisthenics Plan", title_style))
        story.append(Spacer(1, 0.3*inch))
        
        # Workout Plan Section
        story.append(Paragraph("💪 WORKOUT PLAN", heading_style))
        workout_lines = request.workout_plan.split('\n')
        for line in workout_lines:
            if line.strip():
                story.append(Paragraph(line.strip(), normal_style))
        story.append(Spacer(1, 0.2*inch))
        story.append(PageBreak())
        
        # Diet Plan Section
        story.append(Paragraph("🍽️ DIET PLAN", heading_style))
        diet_lines = request.diet_plan.split('\n')
        for line in diet_lines:
            if line.strip():
                story.append(Paragraph(line.strip(), normal_style))
        story.append(Spacer(1, 0.2*inch))
        story.append(PageBreak())
        
        # Health Tips Section
        story.append(Paragraph("💚 HEALTH TIPS", heading_style))
        health_lines = request.health_tips.split('\n')
        for line in health_lines:
            if line.strip():
                story.append(Paragraph(line.strip(), normal_style))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return Response(
            content=buffer.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=calisthenics-plan.pdf"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating PDF: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

