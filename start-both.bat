@echo off
title Starting Both Servers
color 0E

echo.
echo ========================================
echo   Starting Backend and Frontend
echo ========================================
echo.

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"

REM Start backend in a new window
echo [INFO] Starting Backend Server...
start "Backend Server - Port 8000" cmd /k "cd /d %SCRIPT_DIR%backend && set PYTHONHOME= && if exist venv\Scripts\python.exe (venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000) else (echo ERROR: Virtual environment not found! && pause)"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new window
echo [INFO] Starting Frontend Server...
start "Frontend Server - Port 3000" cmd /k "cd /d %SCRIPT_DIR%frontend && npm run dev"

echo.
echo ========================================
echo   Both Servers Started!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Two windows have opened - one for each server.
echo Close the windows to stop the servers.
echo.
echo ========================================
echo.
pause
