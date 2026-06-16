# CreateScript: An eLearning Script Architect

CreateScript is a small full‑stack prototype that helps instructional designers, subject matter experts, and course creators generate structured eLearning scripts from simple inputs. It combines a React frontend (Vite) with a lightweight Node/Express backend that prepares prompts for an AI/agent to produce module scripts.

## Key features
- Simple, focused form to collect:
  - Course title
  - Learning objectives (one per line)
  - Audience level (Beginner / Intermediate / Advanced)
  - Number of modules
  - Optional module breakdown (one line per module) — agent will use it when provided
  - Optional additional context
- Loading indicator with rotating spinner and progressive status messages
- Script display UI with per-module cards, scrollable script box, copy-to-clipboard and download-all as .txt
- Frontend and backend separated for easy local development and customization

## Repo structure
- frontend/ — Vite + React app
  - src/
    - App.jsx — main app wiring (calls backend)
    - components/ — ScriptForm, LoadingIndicator, ScriptDisplay
    - main.jsx, index.css, assets...
- server/ — Node/Express backend
  - index.js — server endpoints (POST /generate)
  - prompts.js — prompt-builder logic (prefers user module breakdown when provided)
  - .env — environment variables (not committed)

## How it works (high level)
1. User fills the form in the frontend and submits.
2. Frontend POSTs the form data to the server at `http://localhost:3001/generate`.
3. Server builds an AI prompt (using `prompts.js`). If the user provided a module breakdown, the prompt instructs the agent to use the provided structure.
4. Server calls the AI/agent (replaceable implementation) and returns structured results.
5. Frontend shows the generated script in ScriptDisplay.

## Setup and run locally

Prereqs: Node.js (16+), npm or yarn.

1. Clone repo
   - git clone <repo-url>
   - cd elearning-script-architect

2. Install and run server
   - cd server
   - npm install
   - Create a `.env` file with required variables (example below)
   - npm start
   The server listens on port 3001 by default (see `server/index.js`).

   Example `.env` (do NOT commit):
   ```
   OPENAI_API_KEY=sk-...
   PORT=3001
   ```

3. Install and run frontend
   - cd frontend
   - npm install
   - npm run dev
   Open the dev URL shown by Vite (typically http://localhost:5173).

## API
POST /generate
- Body: JSON with fields:
  - title (string)
  - objectives (string — newline separated objectives)
  - audienceLevel (string)
  - numModules (number)
  - additionalInfo (string, optional)
  - moduleBreakdown (string, optional — one line per module)
- Response: JSON describing course/script (format produced by the AI agent; frontend expects course_title and modules[])

## Development notes
- prompts.js contains logic to prefer a provided module breakdown. If moduleBreakdown is present and non-empty, the prompt tells the agent to use the provided module titles/descriptions and to generate scripts in that order.
- Frontend sends the raw moduleBreakdown string; server normalizes it into lines.
- Styling is inline in React components for quick prototyping.

## Tips & customization
- Swap the AI provider: replace the AI call in `server/index.js` with your preferred SDK or service.
- Add client-side validation to warn when moduleBreakdown lines differ from numModules, or to auto-sync numbers.
- Improve accessibility and responsive layout by extracting styles to CSS/SCSS and adding ARIA attributes.

## Contributing
Contributions, issues, and suggestions are welcome. For major changes, please open an issue first to discuss.

## License
Include your preferred license here (e.g., MIT, GPL-3.0, etc.).
