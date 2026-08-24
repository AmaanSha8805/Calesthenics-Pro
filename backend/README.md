# Backend API - Calisthenics Fitness

FastAPI backend for generating personalized fitness plans using AI.

## Setup

1. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. (Optional) Set up Gemini API key:
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

4. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

### GET /
Health check endpoint.

### POST /api/assess
Generate personalized workout, diet, and health tips.

**Request Body:**
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

### POST /api/generate-pdf
Generate PDF from plans.

**Request Body:**
```json
{
  "workout_plan": "...",
  "diet_plan": "...",
  "health_tips": "..."
}
```

**Response:** PDF file download

## Environment Variables

- `GEMINI_API_KEY`: Google Gemini API key (optional)

