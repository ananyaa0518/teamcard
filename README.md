## TeamCard — FastAPI + Next.js

TeamCard is a small full‑stack app that showcases a polished, animated team section for a product site.  
The backend is a FastAPI service exposing a simple in‑memory CRUD API for team members, and the frontend is a Next.js app that renders the team page using that API.

### Project structure

- **backend**: FastAPI app with in‑memory storage, Pydantic models, and seed data.
- **frontend**: Next.js app (App Router) with a `/team` page that matches the dark, cinematic design.

---

### Local setup

#### Backend (FastAPI)

1. **Create and activate a virtualenv (recommended)**:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

2. **Install dependencies**:

```bash
pip install -r requirements.txt
```

3. **Run the API server**:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

This works when run from inside the `backend/` directory. If you prefer to run from the repo root, use:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

> For deployment platforms (Render/Railway), use the backend-directory form and bind to their provided `$PORT`:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

#### Frontend (Next.js)

1. **Install dependencies**:

```bash
cd frontend
npm install
```

2. **Set the API base URL** (see env vars below), then run the dev server:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```

3. Open `http://localhost:3000/team` in your browser.

---

### Environment variables

Root‑level env vars are not required, but each app expects:

- **Backend**
  - `FRONTEND_ORIGIN` (optional): Production frontend origin, e.g. `https://your-app.vercel.app`

- **Frontend**
  - `NEXT_PUBLIC_API_BASE_URL` (required in practice): Base URL for the FastAPI backend, e.g.:
    - Local: `http://localhost:8000`
    - Production: backend Render/Railway URL

For local development you can export these or use per‑app `.env` files:

```bash
# backend/.env (optional)
FRONTEND_ORIGIN=https://your-app.vercel.app

# frontend/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

### API endpoints (FastAPI backend)

All endpoints are relative to the backend base URL (e.g. `http://localhost:8000`).

- **GET `/team`**
  - **Description**: Return all team members.
  - **Response**: `200 OK` — JSON array of team members.

- **POST `/team`**
  - **Description**: Create a new team member.
  - **Body** (JSON):
    - `name` (string, required)
    - `role` (string, required)
    - `photo_url` (string, URL, required)
    - `bio` (string, optional)
    - `linkedin_url` (string, URL, optional)
    - `email` (string, optional)
    - `location` (string, optional)
  - **Response**: `201 Created` — Created member (including `id`).

- **PUT `/team/{id}`**
  - **Description**: Update an existing team member by ID.
  - **Body**: Same shape as `POST /team`.
  - **Responses**:
    - `200 OK` — Updated member.
    - `404 Not Found` — If the member does not exist.

- **DELETE `/team/{id}`**
  - **Description**: Delete a team member by ID.
  - **Responses**:
    - `200 OK` — `{ "message": "Team member deleted successfully" }`
    - `404 Not Found` — If the member does not exist.

> The backend also exposes legacy `/api/team` and `/api/team/members` endpoints for backward compatibility, but the `/team` routes are the canonical interface.

---

### Frontend `/team` page

- The `/team` page is implemented in `frontend/app/team/page.tsx`.
- It uses the `TeamSection` component, which:
  - Fetches data from `NEXT_PUBLIC_API_BASE_URL + "/team"` on the client.
  - Shows a **loading** spinner while fetching.
  - Shows a subtle **error** pill if the request fails.
  - Renders:
    - Two large, auto‑cycling feature cards.
    - A continuously scrolling marquee of smaller team cards.
  - Is fully responsive (mobile and desktop) and uses the same dark, luxury‑style aesthetic as the original design.

---

### Deployment

#### Backend on Render or Railway

- **Build & runtime**
  - Python environment with `requirements.txt`.
  - Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

- **Environment**
  - Set `FRONTEND_ORIGIN` to your deployed frontend origin (e.g. `https://your-app.vercel.app`) so CORS is correctly locked down.

- **Health check**
  - You can use `GET /team` as a simple health check.

#### Frontend on Vercel

- Import the `frontend/` directory as a Next.js (App Router) project.
- Configure environment variables:
  - `NEXT_PUBLIC_API_BASE_URL` = your FastAPI deployment URL (Render/Railway).
- Vercel will handle build and static optimization automatically via `npm run build`.

---

### Design decisions (short)

- **In‑memory storage**: A simple module‑level dictionary backs the API—fast for local/dev and trivial to reset by restarting the process. This keeps the backend extremely lightweight while still exposing full CRUD semantics.
- **Schema alignment**: Pydantic models include the requested `id`, `name`, `role`, `bio`, `photo_url`, `linkedin_url`, `email`, and `location` fields, plus a couple of optional presentation fields (`quote`, `github`) so the frontend can maintain its rich visual design.
- **Clean separation**: The backend exposes a minimal REST surface under `/team`, while the frontend is responsible purely for rendering and UX. Communication is always via `NEXT_PUBLIC_API_BASE_URL`, which makes the setup portable across local development and production.
- **Deployment‑friendly**: The backend is compatible with containerized platforms (Render/Railway) via a standard Uvicorn command and `$PORT`, and the frontend is configured for Vercel using only stable, widely used dependencies.

