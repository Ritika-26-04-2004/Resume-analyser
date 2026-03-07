## AI Resume Analyzer

AI-powered resume analysis web application with a modern, SaaS-style dashboard UI.

### Tech stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Recharts, React Icons  
- **Backend**: Node.js, Express, Multer, pdf-parse, OpenAI API  
- **Database**: MongoDB + Mongoose  

### Project structure

- `backend/` – Express API, MongoDB models and OpenAI integration  
  - `server.js` – server bootstrap and MongoDB connection  
  - `routes/resumeRoutes.js` – `/api/upload-resume` endpoint with Multer  
  - `controllers/resumeController.js` – PDF parsing and AI analysis logic  
  - `models/ResumeAnalysis.js` – stores each analysis and scores  
- `frontend/` – React + Tailwind single page app  
  - `src/pages/LandingPage.jsx` – marketing-style landing page  
  - `src/pages/UploadPage.jsx` – drag-and-drop resume upload flow  
  - `src/pages/DashboardPage.jsx` – analysis dashboard with charts and stats  
  - `src/components/*` – reusable UI components (score cards, skills, suggestions, charts, navbar, etc.)  

### Prerequisites

- Node.js 18+ and npm  
- MongoDB running locally or in the cloud  
- An OpenAI API key

### Backend setup

1. Open a terminal in the `backend` folder:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/`:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ai-resume-analyzer
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Start the backend (development mode with auto-reload):

   ```bash
   npm run dev
   ```

4. The API will be available at:

   - `http://localhost:5000/` – health check  
   - `POST http://localhost:5000/api/upload-resume` – PDF upload + analysis  

### Frontend setup

1. Open another terminal in the `frontend` folder:

   ```bash
   cd frontend
   npm install
   ```

2. (Optional) Configure a custom API URL (if your backend is not on `http://localhost:5000`):  
   Create a `.env` file in `frontend/`:

   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

   By default, the frontend will use `http://localhost:5000/api`.

3. Start the frontend dev server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser:

   - `http://localhost:5173`

### Core user flow

- **Landing Page**  
  - Modern hero section: “AI Resume Analyzer”  
  - Subtitle: “Analyze your resume and improve your chances of getting hired”  
  - Gradient background, glassmorphism cards and responsive layout  
  - Primary CTA: “Upload resume” (navigates to the upload page)  

- **Resume Upload Page**  
  - Drag-and-drop PDF upload (up to 5MB)  
  - Multer on the backend (`file` field)  
  - Upload and analysis progress indicator  
  - Clear copy describing what insights the user gets back  

- **Resume Analysis Dashboard**  
  After a successful upload, the frontend navigates to `/dashboard` with the analysis result:
  - Resume score (0–100) and ATS compatibility score (0–100)  
  - Skills detected and missing skills (tag-style chips)  
  - Strengths, weaknesses, suggestions (glassmorphism cards)  
  - Analytics chart (Recharts) visualizing dimensions like impact, structure, keywords and ATS readiness  

### API contract

`POST /api/upload-resume`

- **Request**:  
  - Content type: `multipart/form-data`  
  - Field: `file` (PDF resume)  

- **Processing**:
  - Multer receives the file into memory  
  - `pdf-parse` extracts text from the PDF  
  - Text is sent to the OpenAI API with a strict JSON-only prompt  
  - Response is parsed and normalized into:
    - `resumeScore` (number, 0–100)  
    - `atsScore` (number, 0–100)  
    - `strengths` (string[])  
    - `weaknesses` (string[])  
    - `skills` (string[])  
    - `missingSkills` (string[])  
    - `suggestions` (string[])  
  - A `ResumeAnalysis` document is stored in MongoDB

- **Response** (JSON):

  ```json
  {
    "id": "mongodb_document_id",
    "resumeScore": 82,
    "atsScore": 90,
    "strengths": ["Clear impact in current role", "Strong ownership of projects"],
    "weaknesses": ["Limited quantified achievements", "Summary is vague"],
    "skills": ["React", "Node.js", "TypeScript"],
    "missingSkills": ["System design", "People leadership"],
    "suggestions": [
      "Add metrics to 3-4 key bullets (e.g. revenue, users, performance)",
      "Clarify your target role in the summary section"
    ],
    "createdAt": "2026-03-07T10:00:00.000Z"
  }
  ```

### UI/UX highlights

- Tailwind CSS with a dark, gradient-driven theme  
- Glassmorphism cards, soft shadows, and rounded corners  
- Smooth dashboard composition with analytics cards and charts  
- Icons for key sections (upload, strengths, ATS, suggestions)  
- Fully responsive layout from mobile to desktop  

### Notes

- Remember to keep your `OPENAI_API_KEY` and `MONGO_URI` secrets out of version control.  
- The app is designed as a starter-quality professional product; you can easily extend it with auth, multi-resume history views, or role-specific analysis presets.  

