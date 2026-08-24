@echo off
echo Testing Frontend Setup...
echo.

cd /d "%~dp0frontend"

if not exist "package.json" (
    echo [FAIL] package.json not found
    exit /b 1
)

echo [TEST] Checking Node.js...
node --version
if errorlevel 1 (
    echo [FAIL] Node.js not found
    exit /b 1
)

echo [TEST] Checking npm...
npm --version
if errorlevel 1 (
    echo [FAIL] npm not found
    exit /b 1
)

echo [TEST] Checking dependencies...
if not exist "node_modules" (
    echo [WARN] node_modules not found - will be installed on first run
) else (
    echo [OK] Dependencies found
)

echo.
echo [SUCCESS] Frontend setup is correct!
echo You can run start-frontend.bat now.
pause

