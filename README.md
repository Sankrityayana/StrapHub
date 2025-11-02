# StrapHub

An opinionated MERN app for learning Bootstrap with lessons, practice challenges, and project tasks. Includes JWT auth, admin CRUD, user progress tracking, and a simple challenge validator.

## Features

- Authentication: register/login with JWT, password hashing
- Role-based access: admin-only mutations for Lessons and Projects
- Lessons and Projects: list, view, create/update/delete (admin)
- User progress: mark lessons/projects complete; dashboard shows progress
- Practice challenges: server-defined rules validate Bootstrap HTML snippets
- Vite + React frontend with React Router and Bootstrap UI

## Tech stack

- Backend: Node.js, Express, Mongoose, JWT, bcrypt, CORS, morgan, dotenv
- Frontend: React (Vite), React Router, Axios, Bootstrap 5, DOMPurify
- DB: MongoDB (Atlas or local)

## Folder structure

```
backend/
	server.js
	routes/
	controllers/
	models/
	config/db.js
	middleware/auth.js
	scripts/seed.js
	.env (create from .env.example)
frontend/
	index.html
	src/
		App.jsx
		pages/
		components/
		context/
		services/
		styles.css
	.env (create from .env.example)
```

## Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (Atlas or local)

## Environment variables

Create these from the provided `.env.example` files.

backend/.env

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=change_me
CLIENT_ORIGIN=http://localhost:5173
```

frontend/.env

```
VITE_API_URL=http://localhost:5000
```

## Quick start (Windows PowerShell)

From the repository root:

```powershell
# 1) Install backend and frontend deps
npm run install:all

# 2) Ensure env files exist
if (!(Test-Path .\backend\.env)) { Copy-Item .\backend\.env.example .\backend\.env }
if (!(Test-Path .\frontend\.env)) { Copy-Item .\frontend\.env.example .\frontend\.env }

# 3) (Optional) Seed sample lessons/projects
npm run seed

# 4) Start both servers (Backend: http://localhost:5000, Frontend: http://localhost:5173)
npm run dev
```

If you change the backend port or host, update `frontend/.env` `VITE_API_URL` accordingly.

## Core API endpoints

Auth
- POST `/api/auth/register` → { name, email, password } => { user, token }
- POST `/api/auth/login` → { email, password } => { user, token }

User & progress (requires Bearer token)
- GET `/api/me` → profile (no password), includes `progress`
- POST `/api/progress/lesson/:lessonId` → mark lesson complete
- DELETE `/api/progress/lesson/:lessonId` → unmark lesson
- POST `/api/progress/project/:projectId` → mark project complete
- DELETE `/api/progress/project/:projectId` → unmark project

Lessons
- GET `/api/lessons` → list lessons
- GET `/api/lessons/:id` → single lesson
- POST `/api/lessons` (admin) → create
- PUT `/api/lessons/:id` (admin) → update
- DELETE `/api/lessons/:id` (admin) → delete

Projects
- GET `/api/projects` → list projects
- GET `/api/projects/:id` → single project
- POST `/api/projects` (admin) → create
- PUT `/api/projects/:id` (admin) → update
- DELETE `/api/projects/:id` (admin) → delete

Practice
- GET `/api/practice` → list available challenges
- POST `/api/practice/validate` → { challengeId, html } => { pass, errors[] }

All admin endpoints require a JWT for a user whose `role` is `admin`.

## Admin access

To use admin-only features in the UI, promote a user in MongoDB by setting `role: "admin"` on their user document. Example Mongo shell snippet:

```js
// In MongoDB Shell or Atlas Console
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } });
```

Alternatively, use MongoDB Compass to edit the document.

## Frontend notes

- The app uses localStorage to persist `{ user, token }` under the key `bl_auth`.
- `VITE_API_URL` controls the backend API base URL.
- Lessons can be viewed in detail; HTML content is sanitized with DOMPurify.
- Dashboard shows your completed lesson/project IDs and names.

## Troubleshooting

- 401/403 on protected routes: ensure you’re logged in and passing the JWT (frontend handles this automatically). For admin APIs, the user must have `role=admin`.
- CORS: confirm `CLIENT_ORIGIN` in backend `.env` matches your frontend URL.
- Mongo connection errors: verify `MONGO_URI` and that your IP is allowed in Atlas.
- Frontend can’t reach API: confirm `VITE_API_URL` matches backend host/port.
- Nodemon restarts too often: consider ignoring frontend files. Example dev script tweak:
	- `nodemon --ignore ../frontend --ext js,json server.js`

## Next steps

- Add ESLint/Prettier and CI
- Add Dockerfiles for production builds
- Expand practice challenges and add test coverage (API + UI)
