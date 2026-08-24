# Backend Server Startup Script
# Usage: .\START_BACKEND.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptPath\backend"

if (-not (Test-Path "venv\Scripts\python.exe")) {
    Write-Host "ERROR: Virtual environment not found!" -ForegroundColor Red
    Write-Host "Please run setup first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& "venv\Scripts\Activate.ps1" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Installing/updating dependencies..." -ForegroundColor Yellow
$env:PYTHONHOME = ""
& "venv\Scripts\python.exe" -m pip install -q fastapi uvicorn python-multipart pydantic python-dotenv google-generativeai reportlab Pillow aiofiles pypdf2 2>$null

Write-Host ""
Write-Host "Starting backend server on http://localhost:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$env:PYTHONHOME = ""
& "venv\Scripts\python.exe" -m uvicorn main:app --reload --port 8000

