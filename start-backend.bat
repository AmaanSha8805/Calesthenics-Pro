@echo off
setlocal enabledelayedexpansion
title Backend Server - Calisthenics Fitness App
color 0A

echo.
echo ========================================
echo   Starting Backend Server
echo ========================================
echo.

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%backend"

REM Check if venv exists
if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found!
    echo.
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Failed to create virtual environment!
        echo Please make sure Python is installed and in PATH.
        pause
        exit /b 1
    )
    echo Virtual environment created successfully!
    echo.
)

REM Set Python path to avoid prefix errors
set "PYTHONHOME="
set "PYTHONPATH="

REM Use venv python directly (no activation needed)
set "PYTHON_EXE=%CD%\venv\Scripts\python.exe"

REM Check if python executable exists
if not exist "%PYTHON_EXE%" (
    echo [ERROR] Python executable not found at: %PYTHON_EXE%
    pause
    exit /b 1
)

echo [INFO] Using Python: %PYTHON_EXE%
echo.

REM Install/update dependencies
echo [INFO] Installing/updating dependencies...
"%PYTHON_EXE%" -m pip install --quiet --upgrade pip 2>nul
"%PYTHON_EXE%" -m pip install --quiet fastapi uvicorn[standard] python-multipart pydantic python-dotenv google-generativeai reportlab Pillow aiofiles pypdf2 2>nul
if errorlevel 1 (
    echo [WARNING] Some packages may not have installed correctly, but continuing...
)

echo [INFO] Dependencies ready!
echo.

REM Check if main.py exists
if not exist "main.py" (
    echo [ERROR] main.py not found in backend directory!
    pause
    exit /b 1
)

echo ========================================
echo   Backend Server Starting...
echo ========================================
echo.
echo Server URL: http://localhost:8000
echo API Docs:   http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the server
"%PYTHON_EXE%" -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

REM If we get here, server stopped
echo.
echo [INFO] Server stopped.
pause
exit /b 0
