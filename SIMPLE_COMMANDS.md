# 🚀 Simple Commands to Start Servers

## One Command Each - Choose Your Method

### Method 1: Double-Click Batch Files (Easiest) ⭐

**Backend:**
- Double-click `start-backend.bat`

**Frontend:**
- Double-click `start-frontend.bat`

**Both at once:**
- Double-click `start-both.bat`

---

### Method 2: Command Prompt (cmd.exe)

**Backend:**
```cmd
start-backend.bat
```

**Frontend:**
```cmd
start-frontend.bat
```

---

### Method 3: PowerShell (After Setting Execution Policy)

First time only - run this in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then use:
```powershell
.\START_BACKEND.ps1
.\START_FRONTEND.ps1
```

---

### Method 4: Direct Commands

**Backend (PowerShell):**
```powershell
cd backend; $env:PYTHONHOME=""; .\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

**Frontend (Command Prompt):**
```cmd
cd frontend && npm run dev
```

---

## What Each Server Does

- **Backend**: Runs on http://localhost:8000
  - API endpoint for the fitness app
  - Auto-reloads when code changes
  
- **Frontend**: Runs on http://localhost:3000
  - Web interface for the fitness app
  - Auto-reloads when code changes

## Access the App

Once both are running:
- Open browser: http://localhost:3000
- API docs: http://localhost:8000/docs

## Stop Servers

Press `Ctrl+C` in each window, or close the window.

---

**Recommended: Use the batch files (`start-backend.bat` and `start-frontend.bat`) - they work without any setup!**

