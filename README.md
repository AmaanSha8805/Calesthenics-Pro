# 🏋️ Calisthenics Pro - AI-Powered Fitness Website

A modern, aesthetic calisthenics-themed fitness website that generates personalized workout plans, diet plans, and health tips using AI. Users complete an interactive assessment quiz and receive downloadable PDF plans.

## ✨ Features

- **Interactive Assessment Quiz**: 18 engaging health and fitness questions with images
- **AI-Powered Personalization**: Generates customized workout, diet, and health plans
- **PDF Generation**: Download your complete plan as a beautiful PDF
- **Modern UI**: Apple glass-morphism design with smooth animations
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- **Pricing Plans**: 4 subscription options (1 month, 4 months, 8 months, 1 year)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend
- **FastAPI** - Python web framework
- **Google Gemini AI** - AI plan generation
- **ReportLab** - PDF generation
- **Uvicorn** - ASGI server

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.9+
- Google Gemini API key (optional - mock data available if not provided)

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd calisthenics-fitness-app
```

### Step 2: Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (optional - for AI features)
# Copy .env.example to .env and add your Gemini API key
# If you don't have an API key, the app will use mock data
```

### Step 3: Set Up Frontend

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
# or
yarn install
```

### Step 4: Run the Application

#### Terminal 1 - Start Backend Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`

#### Terminal 2 - Start Frontend Server

```bash
cd frontend
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🔑 Getting Gemini API Key (Optional)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Create a `.env` file in the `backend` directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

**Note**: If you don't provide an API key, the application will use intelligent mock data that still provides valuable plans.

## 📁 Project Structure

```
calisthenics-fitness-app/
├── frontend/
│   ├── app/
│   │   ├── assessment/      # Assessment quiz page
│   │   ├── results/         # Results display page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables template
└── README.md
```

## 🎨 Design Features

- **Apple Glass Morphism**: Modern glass-effect buttons and cards
- **Smooth Animations**: Framer Motion for engaging transitions
- **Progress Tracking**: Visual progress bar during assessment
- **Image-Based Questions**: Each question includes relevant imagery
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Modern dark gradient background

## 📱 User Flow

1. **Homepage**: User lands on attractive landing page with features and pricing
2. **Assessment**: User completes 18-question interactive quiz
   - Questions include images for better engagement
   - Previous/Next navigation
   - Progress tracking
3. **Results**: AI generates personalized:
   - Workout Plan (calisthenics-focused)
   - Diet Plan
   - Health Tips
4. **PDF Download**: User can download complete plan as PDF

## 🔧 Configuration

### Backend Port
Default: `8000`
Change in `backend/main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Frontend Port
Default: `3000`
Change in `frontend/package.json` or use:
```bash
npm run dev -- -p 3001
```

### CORS Settings
Update allowed origins in `backend/main.py`:
```python
allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"]
```

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**Module not found:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Issues

**Port already in use:**
```bash
# Use different port
npm run dev -- -p 3001
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### CORS Errors

Ensure backend CORS settings include your frontend URL in `backend/main.py`.

## 📦 Production Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
```

Update API URLs in frontend code to point to production backend.

### Backend (Railway/Render/Heroku)

1. Set environment variables
2. Install dependencies: `pip install -r requirements.txt`
3. Run: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- User accounts and progress tracking
- Social sharing features
- Video exercise demonstrations
- Integration with fitness trackers
- Community features
- Payment integration for premium plans

## 💬 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for the calisthenics community**

