# 🚀 How to Run the Application

## ✅ FIXED - Simple One-Command Solution

### **Backend - One Command:**
```
start-backend.bat
```
Or double-click: `start-backend.bat`

### **Frontend - One Command:**
```
start-frontend.bat
```
Or double-click: `start-frontend.bat`

---

## Quick Start

### Step 1: Start Backend
Double-click `start-backend.bat` or run:
```cmd
start-backend.bat
```

**Expected Output:**
```
========================================
  Starting Backend Server
========================================

Activating virtual environment...
Installing/updating dependencies...
Starting backend server on http://localhost:8000
Press Ctrl+C to stop the server
========================================
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Start Frontend (in a NEW window)
Double-click `start-frontend.bat` or run:
```cmd
start-frontend.bat
```

**Expected Output:**
```
========================================
  Starting Frontend Server
========================================

Starting frontend server on http://localhost:3000
Press Ctrl+C to stop the server
========================================
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### Step 3: Open Browser
Visit: **http://localhost:3000**

---

## Start Both at Once

Double-click `start-both.bat` - This opens both servers in separate windows automatically.

---

## Alternative: PowerShell Commands

If you prefer PowerShell:

**Backend:**
```powershell
.\START_BACKEND.ps1
```

**Frontend:**
```powershell
.\START_FRONTEND.ps1
```

*Note: If you get execution policy errors, run this once:*
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Troubleshooting

### Backend Won't Start

**Error: Virtual environment not found**
- Solution: The venv should already exist. If not, run:
  ```cmd
  cd backend
  python -m venv venv
  venv\Scripts\activate.bat
  pip install -r requirements.txt
  ```

**Error: Port 8000 already in use**
- Solution: Close the other window using port 8000, or kill the process:
  ```cmd
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  ```

### Frontend Won't Start

**Error: npm is not recognized**
- Solution: Make sure Node.js is installed. Download from: https://nodejs.org/

**Error: Port 3000 already in use**
- Solution: Close the other window, or the batch file will try a different port automatically.

**Error: Dependencies not installed**
- Solution: The batch file will auto-install them. If it fails, run manually:
  ```cmd
  cd frontend
  npm install
  ```

### PowerShell Execution Policy Error

If you see: "cannot be loaded because running scripts is disabled"

**Solution 1 (Recommended):** Use the `.bat` files instead (they don't have this issue)

**Solution 2:** Fix PowerShell policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## What the Batch Files Do

### `start-backend.bat`
1. Navigates to backend directory
2. Activates Python virtual environment
3. Installs/updates dependencies automatically
4. Starts FastAPI server on port 8000
5. Auto-reloads on code changes

### `start-frontend.bat`
1. Navigates to frontend directory
2. Installs dependencies if needed
3. Starts Next.js dev server on port 3000
4. Auto-reloads on code changes

### `start-both.bat`
1. Starts backend in one window
2. Waits 2 seconds
3. Starts frontend in another window
4. Both run independently

---

## Server URLs

Once running:
- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

## Stop Servers

- Press `Ctrl+C` in each window
- Or close the window

---

## Summary

✅ **Backend**: `start-backend.bat`  
✅ **Frontend**: `start-frontend.bat`  
✅ **Both**: `start-both.bat`

**That's it! Just double-click and run!** 🎉

