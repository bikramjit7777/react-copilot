# React Multi-Agent Copilot

A full-stack code assistant built with React, Express, and LangChain's LangGraph. This project demonstrates a multi-agent pipeline for software assistance, including classification, planning, coding, testing, documenting, and review.

## Project Structure

- `backend/` - Express server, LangGraph assistant pipeline, and AI agent modules
- `frontend/` - React app with prompt entry, output display, and UI state handling
- `package.json` - root scripts to run backend and frontend in parallel

## Features

- Multi-agent assistant graph with:
  - `classifierAgent`
  - `plannerAgent`
  - `coderAgent`
  - `testAgent`
  - `docsAgent`
  - `reviewerAgent`
- Frontend prompt UI and response output panel
- Backend API endpoint: `POST /api/assistant`
- Health check endpoint: `GET /api/health`

## Getting Started

### Prerequisites

- Node.js 18+ (or compatible version)
- npm
- AI credentials/configuration for the backend model provider (set via `.env`)

### Install

From the root directory:
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Run

Start both backend and frontend together:
```bash
npm run dev
```

Or run individually:
```bash
npm run backend
npm run frontend
```

### Use

1. Open the frontend in your browser (default Vite port).
2. Enter a developer question or coding prompt.
3. Submit and review the assistant response.

## Notes

- The backend is configured with `dotenv` and expects environment variables for the AI provider.
- Adjust `API_URL` in `frontend/src/App.jsx` if the backend runs on a different host or port.

