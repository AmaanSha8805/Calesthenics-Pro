# 🚀 Quick Run Commands

This guide provides the exact commands to run the backend and frontend servers.

## Prerequisites

- Python 3.9+ installed
- Node.js 18+ installed
- npm or yarn installed

## Windows PowerShell Commands

### Backend Setup & Run

Open **Terminal 1** (PowerShell):

```powershell
# Navigate to backend directory
cd backend

# Activate virtual environment (if not already activated)
.\venv\Scripts\Activate.ps1

# If activation fails, you may need to set execution policy:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Install dependencies (if not already installed)
.\venv\Scripts\python.exe -m pip install -r requirements.txt

# Start backend server
.\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

**Alternative (if venv doesn't work):**
```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Frontend Setup & Run

Open **Terminal 2** (PowerShell):

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

## Quick Start (One-Liners)

### Backend
```powershell
cd backend; .\venv\Scripts\Activate.ps1; .\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

### Frontend
```powershell
cd frontend; npm run dev
```

## Easy Start (Batch Scripts)

For Windows users, you can use the provided batch scripts:

### Option 1: Start Both Servers
Double-click `start-both.bat` - This will start both backend and frontend in separate windows.

### Option 2: Start Individually
- Double-click `start-backend.bat` to start only the backend
- Double-click `start-frontend.bat` to start only the frontend

**Note:** Make sure dependencies are installed first (see setup steps above).

## Access the Application

Once both servers are running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (FastAPI automatic documentation)

## Stopping the Servers

Press `Ctrl+C` in each terminal to stop the respective server.

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Module not found:**
```powershell
# Ensure virtual environment is activated
.\venv\Scripts\Activate.ps1

# Reinstall dependencies
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

**Activation script execution policy error:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**npm script execution policy error:**
```powershell
# If you get "running scripts is disabled" error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or use cmd.exe instead of PowerShell for npm commands
```

### Frontend Issues

**Port 3000 already in use:**
```powershell
# Use different port
npm run dev -- -p 3001
```

**Dependencies not installed:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## Environment Variables (Optional)

For AI features, create `backend/.env`:
```
GEMINI_API_KEY=your_api_key_here
```

The app works without this key (uses mock data).

