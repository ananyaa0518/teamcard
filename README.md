# TeamCard (FastAPI + Next.js)

Full-stack Team Page project for Armatrix:
- FastAPI backend with team member CRUD API
- Next.js frontend with animated, responsive team experience

## Tech Stack

- Frontend: React + Next.js + TypeScript + Tailwind CSS + Framer Motion
- Backend: Python + FastAPI + Pydantic
- Deployment: Vercel (frontend), Railway (backend)

## Quick setup

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```

Open: http://localhost:3000/team

## Environment variables

- Frontend: `NEXT_PUBLIC_API_BASE_URL` (backend base URL)
- Backend (optional but recommended in prod): `FRONTEND_ORIGIN` (frontend origin for CORS)

## API (backend)

- `GET /team` - list team members
- `POST /team` - create member
- `PUT /team/{member_id}` - update member
- `DELETE /team/{member_id}` - delete member

Main schema fields: `id`, `name`, `role`, `bio`, `photo_url`, `linkedin_url`, `email`, `location`.

## Deployment notes

- Frontend: Vercel
- Backend: Render/Railway
- Backend start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Set:
- `NEXT_PUBLIC_API_BASE_URL` in Vercel
- `FRONTEND_ORIGIN` in backend host

## Live Demo

Frontend: https://teamcard-hazel.vercel.app

Backend API: https://teamcard-production.up.railway.app

API Endpoint Example:
GET https://teamcard-production.up.railway.app/team

## Design decisions 

- In-memory storage was chosen to keep backend setup fast and simple for assignment scope.
- API helper layer on frontend centralizes network calls for cleaner components.
- Hero + Team sections use animation-heavy but responsive layouts to feel production-ready.
- Fallback behavior is included where possible so UI still renders even if API is temporarily unavailable.

