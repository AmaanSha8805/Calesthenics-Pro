# 🚀 Complete Setup Guide

Follow these steps to get your Calisthenics Pro website up and running.

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js 18+ installed (`node --version`)
- ✅ Python 3.9+ installed (`python3 --version`)
- ✅ npm or yarn installed
- ✅ Code editor (VS Code recommended)

## Step-by-Step Installation

### 1. Navigate to Project Directory

```bash
cd calisthenics-fitness-app
```

### 2. Backend Setup (Terminal 1)

```bash
# Go to backend directory
cd backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# Install Python packages
pip install -r requirements.txt

# (Optional) Set up Gemini API key
# Create .env file and add:
# GEMINI_API_KEY=your_key_here

# Start backend server
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 3. Frontend Setup (Terminal 2)

Open a new terminal window:

```bash
# Navigate to frontend directory
cd calisthenics-fitness-app/frontend

# Install Node.js packages
npm install

# Start development server
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### 4. Access the Application

Open your browser and visit:
```
http://localhost:3000
```

## Testing the Application

1. **Homepage**: You should see the landing page with features and pricing
2. **Start Assessment**: Click "Start Your Journey" button
3. **Complete Quiz**: Answer all 18 questions
4. **View Results**: See your personalized plans
5. **Download PDF**: Click "Download PDF" button

## Troubleshooting

### Backend Won't Start

**Issue**: Port 8000 already in use
```bash
# Find process using port 8000
lsof -ti:8000

# Kill the process
lsof -ti:8000 | xargs kill -9
```

**Issue**: Module not found
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Won't Start

**Issue**: Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

**Issue**: Dependencies not installed
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

If you see CORS errors in browser console:

1. Check that backend is running on port 8000
2. Check that frontend is running on port 3000
3. Verify CORS settings in `backend/main.py`

### API Connection Errors

If assessment submission fails:

1. Verify backend is running: `http://localhost:8000`
2. Check browser console for errors
3. Verify CORS settings allow `http://localhost:3000`

## Getting Gemini API Key (Optional)

The app works without an API key (uses mock data), but for real AI generation:

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Create `backend/.env` file:
   ```
   GEMINI_API_KEY=paste_your_key_here
   ```
6. Restart backend server

## Next Steps

- Customize questions in `frontend/app/assessment/page.tsx`
- Modify styling in `frontend/tailwind.config.js`
- Adjust AI prompts in `backend/main.py`
- Add more features!

## Need Help?

- Check the main README.md
- Review error messages in terminal
- Check browser console for frontend errors
- Verify all dependencies are installed
- **Quick Commands**: See `RUN_COMMANDS.md` for ready-to-use commands
- **Debugging**: See `DEBUGGING_GUIDE.md` for comprehensive debugging help

Happy coding! 🎉

