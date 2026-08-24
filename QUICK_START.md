# ⚡ Quick Start Guide

Get your Calisthenics Pro website running in 5 minutes!

## Prerequisites

- Node.js 18+ 
- Python 3.9+

## Installation

### 1. Backend (Terminal 1)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

### 3. Open Browser

Visit: **http://localhost:3000**

## That's it! 🎉

The app will work with mock AI data. For real AI generation, add your Gemini API key to `backend/.env`:

```
GEMINI_API_KEY=your_key_here
```

Get your key from: https://makersuite.google.com/app/apikey

## Need Help?

See `SETUP.md` for detailed instructions and troubleshooting.

