# CreateScript: An eLearning Script Architect

CreateScript is a focused full-stack prototype that helps instructional designers and course creators generate structured, voiceover-ready eLearning scripts from simple inputs. It pairs a React (Vite) frontend with a Node.js/Express backend that builds deterministic prompts for an AI model to produce complete module scripts, including voiceover copy, slide notes, and MCQ knowledge checks.

## Key features
- Simple form to capture course inputs:
  - Course topic
  - Learning objectives (one per line)
  - Audience description
  - Audience level (Beginner | Intermediate | Advanced)
  - Number of modules (1–8)
  - Optional module breakdown (one line per module)
  - Optional additional context
- Two-step AI prompt chain:
  - Step 1 generates a structured course outline (JSON)
  - Step 2 generates a full voiceover script per module
- Each module script includes:
  - Opening hook
  - Concept scripts with workplace examples
  - Slide notes
  - MCQ knowledge check with per-option feedback
  - Module summary
- Loading indicator with animated spinner and rotating status messages
- Script display UI with per-module cards, scrollable script area, copy-to-clipboard, and download all as .txt
- Frontend and backend separated for easy local development

## Tech stack
- Frontend: React, Vite
- Backend: Node.js, Express
- AI: Google Gemini API (gemini-2.5-flash-lite)
- Dev tooling: GitHub Copilot

## Project structure
```
elearning-script-architect/
├── frontend/
│   └── src/
│       ├── App.jsx               # Application wiring and API calls
│       ├── components/
│       │   ├── ScriptForm.jsx
│       │   ├── LoadingIndicator.jsx
│       │   └── ScriptDisplay.jsx
│       ├── main.jsx
│       └── index.css
└── server/
    ├── index.js                  # Express server and /generate endpoint
    ├── prompts.js                # Prompt builder functions
    └── .env                      # Environment variables (not committed)
```

## Quick start

**Requirements:** Node.js 16+, npm, a free Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/elearning-script-architect.git
cd elearning-script-architect
```

### 2. Start the backend
```bash
cd server
npm install
```
Create a `.env` file inside the `server` folder:
```
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3001
```
Then start the server:
```bash
node index.js
```
Server runs on `http://localhost:3001`

### 3. Start the frontend
```bash
cd ../frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal — typically `http://localhost:5173`

## API

### POST /generate
**Request body (JSON):**
```json
{
  "topic": "string",
  "objectives": "newline-separated string",
  "audience": "string (optional)",
  "level": "Beginner | Intermediate | Advanced",
  "numModules": "number",
  "additionalInfo": "string (optional)",
  "moduleBreakdown": "newline-separated string (optional)"
}
```

**Response:**
```json
{
  "course_title": "string",
  "course_description": "string",
  "estimated_duration_minutes": "number",
  "modules": [
    {
      "module_number": 1,
      "title": "string",
      "objective": "string",
      "key_concepts": ["string"],
      "script": "string"
    }
  ]
}
```

## Notes
- The backend builds a two-step structured prompt chain. Step 1 returns a course outline as JSON. Step 2 uses each module from the outline to generate a full voiceover script.
- If a module breakdown is provided, the prompt instructs the AI to follow the provided structure.
- Styling is inline in components for quick adjustments during prototyping.
- To swap the AI provider, replace the Gemini client in `server/index.js` with your preferred SDK and update `.env` accordingly.

## Contributing
Issues, suggestions, and pull requests are definitely welcome. But for larger changes, please open an issue first to discuss the proposal.