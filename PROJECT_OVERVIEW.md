# 📋 Project Overview

## 🎯 Project Summary

**Calisthenics Pro** is a full-stack web application that generates personalized fitness plans using AI. Users complete an interactive assessment quiz and receive customized workout plans, diet plans, and health tips in PDF format.

## 🏗️ Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Backend (FastAPI)
- **Framework**: FastAPI (Python)
- **AI Integration**: Google Gemini API
- **PDF Generation**: ReportLab
- **Server**: Uvicorn

## 📁 File Structure

```
calisthenics-fitness-app/
│
├── frontend/                    # Next.js frontend application
│   ├── app/
│   │   ├── assessment/         # Assessment quiz page
│   │   │   └── page.tsx        # 18-question interactive quiz
│   │   ├── results/            # Results display page
│   │   │   └── page.tsx        # Shows plans and PDF download
│   │   ├── globals.css         # Global styles + glass effects
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Homepage with features & pricing
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── next.config.js          # Next.js configuration
│
├── backend/                     # FastAPI backend application
│   ├── main.py                 # Main API server
│   ├── requirements.txt        # Python dependencies
│   └── README.md               # Backend documentation
│
├── README.md                    # Main project documentation
├── SETUP.md                     # Detailed setup instructions
├── QUICK_START.md              # Quick start guide
└── PROJECT_OVERVIEW.md         # This file

```

## 🔄 User Flow

1. **Homepage** (`/`)
   - Landing page with features
   - Pricing plans display
   - "Start Your Journey" button

2. **Assessment** (`/assessment`)
   - 18 interactive questions
   - Progress bar
   - Previous/Next navigation
   - Image-based questions
   - Form validation

3. **Results** (`/results`)
   - Display generated plans:
     - Workout Plan
     - Diet Plan
     - Health Tips
   - PDF download button
   - Option to start new assessment

## 🎨 Design Features

### Apple Glass Morphism
- Glass-effect buttons with backdrop blur
- Transparent cards with borders
- Smooth hover animations
- Modern, aesthetic appearance

### Color Scheme
- Primary: Blue gradient (#0ea5e9 to #0284c7)
- Background: Dark gradient (gray-900 to blue-900)
- Accents: Purple, green, red for different sections

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly buttons
- Optimized images

## 🔌 API Endpoints

### `POST /api/assess`
Generates personalized plans based on user answers.

**Request:**
```json
{
  "answers": {
    "1": "John Doe",
    "2": 25,
    "3": 75,
    ...
  }
}
```

**Response:**
```json
{
  "workout_plan": "...",
  "diet_plan": "...",
  "health_tips": "..."
}
```

### `POST /api/generate-pdf`
Generates PDF from plans.

**Request:**
```json
{
  "workout_plan": "...",
  "diet_plan": "...",
  "health_tips": "..."
}
```

**Response:** PDF file download

## 📝 Assessment Questions

The quiz includes 18 questions covering:

1. Personal Info (name, age, weight, height)
2. Fitness Goals (primary goal, current level)
3. Training Schedule (days/week, session length, time preference)
4. Equipment Access
5. Diet Information (diet type, meals, restrictions)
6. Activity Level
7. Medical Conditions
8. Skill Interests (calisthenics skills)
9. Motivation & Tracking Preferences

## 🤖 AI Integration

### With Gemini API Key
- Real AI-generated personalized plans
- Context-aware responses
- Natural language generation

### Without API Key (Mock Mode)
- Intelligent mock responses
- Still provides valuable plans
- Works offline

## 📦 Key Dependencies

### Frontend
- `next`: 14.0.0
- `react`: 18.2.0
- `framer-motion`: 10.16.4
- `axios`: 1.6.0
- `tailwindcss`: 3.3.0

### Backend
- `fastapi`: 0.104.1
- `uvicorn`: 0.24.0
- `google-generativeai`: 0.3.1
- `reportlab`: 4.0.7
- `python-dotenv`: 1.0.0

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Update API URLs to production backend

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Install dependencies: `pip install -r requirements.txt`
3. Run: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🔧 Customization

### Modify Questions
Edit: `frontend/app/assessment/page.tsx`

### Change Styling
Edit: `frontend/tailwind.config.js` or `frontend/app/globals.css`

### Adjust AI Prompts
Edit: `backend/main.py` (workout_prompt, diet_prompt, health_prompt)

### Update Pricing
Edit: `frontend/app/page.tsx` (pricing section)

## 📊 Features Checklist

- ✅ Modern, aesthetic UI design
- ✅ Apple glass-morphism theme
- ✅ Interactive assessment quiz (18 questions)
- ✅ Image-based questions
- ✅ Previous/Next navigation
- ✅ Progress tracking
- ✅ AI-powered plan generation
- ✅ PDF download functionality
- ✅ Mobile responsive design
- ✅ Smooth animations
- ✅ Pricing plans section
- ✅ Error handling
- ✅ Loading states
- ✅ Comprehensive documentation

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Google Gemini API](https://ai.google.dev/docs)

## 📞 Support

For issues or questions:
1. Check `SETUP.md` for troubleshooting
2. Review error messages in terminal/browser console
3. Verify all dependencies are installed
4. Check API endpoints are accessible

---

**Built with modern web technologies for the calisthenics community!** 💪

