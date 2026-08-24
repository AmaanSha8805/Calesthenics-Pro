@echo off
setlocal enabledelayedexpansion
title Frontend Server - Calisthenics Fitness App
color 0B

echo.
echo ========================================
echo   Starting Frontend Server
echo ========================================
echo.

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%frontend"

REM Check if package.json exists
if not exist "package.json" (
    echo [ERROR] package.json not found in frontend directory!
    pause
    exit /b 1
)

REM Check if node_modules exists, if not install
if not exist "node_modules" (
    echo [INFO] Dependencies not found. Installing...
    echo.
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        echo Please make sure Node.js and npm are installed.
        pause
        exit /b 1
    )
    echo.
    echo [INFO] Dependencies installed successfully!
    echo.
) else (
    echo [INFO] Dependencies found.
    echo.
)

REM Check if node_modules/.bin/next exists (verify installation)
if not exist "node_modules\.bin\next.cmd" (
    echo [WARNING] Next.js not found. Reinstalling dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo ========================================
echo   Frontend Server Starting...
echo ========================================
echo.
echo Server URL: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the dev server
call npm run dev

REM If we get here, server stopped
echo.
echo [INFO] Server stopped.
pause
exit /b 0
