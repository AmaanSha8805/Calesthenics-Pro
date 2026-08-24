# 🐛 Debugging Guide

Comprehensive guide for debugging backend and frontend code in the Calisthenics Fitness App.

## Table of Contents

1. [Backend Debugging](#backend-debugging)
2. [Frontend Debugging](#frontend-debugging)
3. [API Connection Issues](#api-connection-issues)
4. [Common Errors & Solutions](#common-errors--solutions)
5. [Debugging Tools](#debugging-tools)

---

## Backend Debugging

### 1. Enable Debug Mode

The backend runs with `--reload` flag which enables auto-reload on code changes. For more verbose logging:

```powershell
# Run with debug logging
cd backend
.\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000 --log-level debug
```

### 2. Add Print Statements / Logging

Edit `backend/main.py` to add debug statements:

```python
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# In your functions:
def generate_ai_response(prompt: str) -> str:
    logger.debug(f"Generating AI response with prompt: {prompt[:100]}...")
    # Your code here
    logger.debug(f"AI response generated successfully")
    return response
```

### 3. Test API Endpoints Directly

#### Using Browser
- Visit: http://localhost:8000/docs
- Interactive API documentation (Swagger UI)
- Test endpoints directly from the browser

#### Using PowerShell (Invoke-WebRequest)
```powershell
# Test health endpoint
Invoke-WebRequest -Uri "http://localhost:8000/docs" -Method GET

# Test assessment endpoint
$body = @{
    answers = @{
        "1" = "John Doe"
        "2" = 25
        "3" = 75
    }
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/assess" -Method POST -Body $body -ContentType "application/json"
```

#### Using curl (if available)
```bash
# Test assessment endpoint
curl -X POST "http://localhost:8000/api/assess" \
  -H "Content-Type: application/json" \
  -d '{"answers": {"1": "John Doe", "2": 25, "3": 75}}'
```

### 4. Check Backend Logs

Watch the terminal where uvicorn is running. Look for:
- Request logs (method, path, status code)
- Error tracebacks
- Print statements you added

### 5. Debug Specific Functions

Add breakpoints using Python's `pdb`:

```python
import pdb

def generate_ai_response(prompt: str) -> str:
    pdb.set_trace()  # Execution will pause here
    # Your code
    return response
```

When execution hits `pdb.set_trace()`, you can:
- `n` - next line
- `s` - step into function
- `c` - continue
- `p variable_name` - print variable value
- `q` - quit

### 6. Check Environment Variables

```python
# Add to main.py temporarily
import os
print("GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY", "NOT SET"))
```

### 7. Validate Request Data

Add validation logging:

```python
@app.post("/api/assess")
async def assess(request: AssessmentRequest):
    print(f"Received answers: {request.answers}")
    print(f"Number of answers: {len(request.answers)}")
    # Your code
```

---

## Frontend Debugging

### 1. Browser Developer Tools

**Open DevTools:**
- Press `F12` or `Ctrl+Shift+I`
- Right-click → Inspect

**Key Tabs:**
- **Console**: JavaScript errors, `console.log()` output
- **Network**: API requests, responses, errors
- **Elements**: HTML structure, CSS styles
- **Sources**: Set breakpoints, debug JavaScript

### 2. Console Logging

Add `console.log()` statements in your React components:

```typescript
// In frontend/app/assessment/page.tsx
const handleSubmit = async () => {
  console.log('Submitting assessment with answers:', answers)
  setLoading(true)
  try {
    console.log('Sending request to:', 'http://localhost:8000/api/assess')
    const response = await axios.post('http://localhost:8000/api/assess', {
      answers,
    })
    console.log('Response received:', response.data)
    // ...
  } catch (error) {
    console.error('Error details:', error)
    console.error('Error response:', error.response)
    console.error('Error message:', error.message)
  }
}
```

### 3. React DevTools

Install React Developer Tools browser extension:
- Chrome: https://chrome.google.com/webstore/detail/react-developer-tools
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

**Features:**
- Inspect component props and state
- View component hierarchy
- Monitor state changes
- Profile performance

### 4. Network Tab Debugging

**Check API Requests:**
1. Open DevTools → Network tab
2. Filter by "XHR" or "Fetch"
3. Submit assessment
4. Click on the request to see:
   - Request URL
   - Request headers
   - Request payload
   - Response status
   - Response data
   - Response time

**Common Issues to Check:**
- Status code (200 = success, 404 = not found, 500 = server error)
- CORS errors (blocked by browser)
- Request timeout
- Wrong URL

### 5. TypeScript Errors

Check terminal where `npm run dev` is running for:
- TypeScript compilation errors
- ESLint warnings
- Build errors

### 6. State Debugging

Use React DevTools or add state logging:

```typescript
useEffect(() => {
  console.log('Current question:', currentQuestion)
  console.log('Answers so far:', answers)
  console.log('Loading state:', loading)
}, [currentQuestion, answers, loading])
```

### 7. Breakpoints in Browser

1. Open DevTools → Sources tab
2. Navigate to your file (e.g., `page.tsx`)
3. Click line number to set breakpoint
4. Interact with app to trigger breakpoint
5. Inspect variables, step through code

### 8. Check Next.js Build Errors

```powershell
# Run build to see all errors
cd frontend
npm run build
```

---

## API Connection Issues

### 1. CORS Errors

**Symptom:** Browser console shows:
```
Access to XMLHttpRequest at 'http://localhost:8000/api/assess' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
- Check `backend/main.py` CORS settings:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
- Ensure backend is running
- Restart backend after changing CORS settings

### 2. Connection Refused

**Symptom:** `Network Error` or `ECONNREFUSED`

**Check:**
1. Is backend running? Visit http://localhost:8000/docs
2. Is port 8000 correct?
3. Check firewall settings
4. Verify URL in frontend code matches backend URL

### 3. 404 Not Found

**Symptom:** `404` status code

**Check:**
- API endpoint path is correct
- Backend route matches frontend request
- Backend server is running

**Verify routes:**
- Backend: `@app.post("/api/assess")` in `main.py`
- Frontend: `axios.post('http://localhost:8000/api/assess', ...)`

### 4. 500 Internal Server Error

**Symptom:** `500` status code

**Debug:**
1. Check backend terminal for error traceback
2. Check backend logs
3. Verify request data format matches expected schema
4. Check environment variables (API keys, etc.)

### 5. Timeout Errors

**Symptom:** Request takes too long or times out

**Solutions:**
- Increase timeout in axios:
```typescript
const response = await axios.post(url, data, {
  timeout: 60000 // 60 seconds
})
```
- Check backend processing time
- Verify AI API key is valid (if using Gemini)

---

## Common Errors & Solutions

### Backend Errors

#### `ModuleNotFoundError: No module named 'fastapi'`
```powershell
# Solution: Install dependencies
cd backend
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

#### `Port 8000 already in use`
```powershell
# Solution: Kill process or use different port
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use different port:
uvicorn main:app --reload --port 8001
```

#### `ImportError: cannot import name 'X'`
- Check Python version (needs 3.9+)
- Reinstall dependencies
- Check virtual environment is activated

### Frontend Errors

#### `Module not found: Can't resolve 'X'`
```powershell
# Solution: Install missing package
cd frontend
npm install <package-name>
```

#### `Hydration error`
- Check for mismatched HTML between server and client
- Look for `useEffect` or browser-only code running on server

#### `TypeError: Cannot read property 'X' of undefined`
- Add null checks:
```typescript
if (results && results.workout_plan) {
  // Use results.workout_plan
}
```

#### Build fails with TypeScript errors
- Fix type errors shown in terminal
- Use `any` type temporarily for debugging:
```typescript
const data: any = response.data
```

---

## Debugging Tools

### Backend Tools

1. **FastAPI Docs**: http://localhost:8000/docs
   - Interactive API testing
   - See request/response schemas
   - Test endpoints without frontend

2. **Python Debugger (pdb)**
   ```python
   import pdb; pdb.set_trace()
   ```

3. **Logging Module**
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

4. **Postman/Insomnia**
   - Test API endpoints
   - Save request collections
   - Environment variables

### Frontend Tools

1. **Browser DevTools** (F12)
   - Console, Network, Sources tabs
   - Performance profiling
   - Memory profiling

2. **React DevTools**
   - Component inspection
   - State debugging
   - Profiler

3. **VS Code Debugger**
   - Attach to Chrome
   - Set breakpoints in VS Code
   - Step through code

4. **Next.js Debug Mode**
   ```powershell
   # Run with debug output
   NODE_OPTIONS='--inspect' npm run dev
   ```

### VS Code Debugging Setup

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: FastAPI",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/backend/venv/Scripts/uvicorn.exe",
      "args": ["main:app", "--reload", "--port", "8000"],
      "console": "integratedTerminal",
      "cwd": "${workspaceFolder}/backend"
    },
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/frontend",
      "console": "integratedTerminal"
    }
  ]
}
```

---

## Debugging Checklist

When something doesn't work:

- [ ] Backend server is running (check terminal)
- [ ] Frontend server is running (check terminal)
- [ ] Check browser console for errors
- [ ] Check Network tab for failed requests
- [ ] Verify API endpoint URLs are correct
- [ ] Check CORS settings
- [ ] Verify request payload format
- [ ] Check response status codes
- [ ] Review backend logs for errors
- [ ] Check environment variables
- [ ] Verify dependencies are installed
- [ ] Check TypeScript/compilation errors
- [ ] Test API endpoint directly (using /docs or Postman)

---

## Getting Help

1. **Check Logs**: Always check terminal and browser console first
2. **Isolate the Issue**: Test backend and frontend separately
3. **Simplify**: Create minimal test case to reproduce error
4. **Search**: Google the error message
5. **Documentation**: Check FastAPI and Next.js docs

---

**Happy Debugging! 🐛🔍**

