@echo off
echo Testing Backend Setup...
echo.

cd /d "%~dp0backend"

if not exist "venv\Scripts\python.exe" (
    echo [FAIL] Virtual environment not found
    exit /b 1
)

set PYTHONHOME=
set "PYTHON_EXE=%CD%\venv\Scripts\python.exe"

echo [TEST] Checking Python...
"%PYTHON_EXE%" --version
if errorlevel 1 (
    echo [FAIL] Python not working
    exit /b 1
)

echo [TEST] Checking FastAPI...
"%PYTHON_EXE%" -c "import fastapi; print('FastAPI: OK')" 2>nul
if errorlevel 1 (
    echo [FAIL] FastAPI not installed
    exit /b 1
)

echo [TEST] Checking Uvicorn...
"%PYTHON_EXE%" -c "import uvicorn; print('Uvicorn: OK')" 2>nul
if errorlevel 1 (
    echo [FAIL] Uvicorn not installed
    exit /b 1
)

echo [TEST] Checking main.py...
if not exist "main.py" (
    echo [FAIL] main.py not found
    exit /b 1
)

echo.
echo [SUCCESS] Backend setup is correct!
echo You can run start-backend.bat now.
pause

