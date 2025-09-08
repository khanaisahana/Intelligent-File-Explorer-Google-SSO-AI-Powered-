####🚀 Intelligent File Explorer (SSO + AI Powered)

A full-stack file explorer application with Google SSO login, file management, and AI-enhanced features.
Built for the Full Stack Take-Home Assignment – containerized with Docker Compose for one-command deployment.

✨ Features
🔐 Single Sign-On (SSO) via Google OAuth2
📂 File Management – Upload, view, delete files (PDF, DOCX, PPT, images, text, CSV, etc.)
🗂️ Categorization – Auto-group files by type (pdf, doc, ppt, image, etc.)

🪄 AI-Powered Features
Automatic file categorization (Mistral API fallback when extension is unknown)

AI-powered file search

Summarization of file contents (PDF, DOCX, TXT) with popup modal view

☁️ S3-Compatible Storage – Supports MinIO, AWS S3, or any S3 endpoint

🔧 Configurable via .env – no hardcoded credentials

🐳 Dockerized – Run frontend + backend with a single docker-compose up

📜 Swagger API Docs at /docs

🎨 Modern UI – Responsive, clean, and user-friendly

🏗️ Architecture
file-explorer/
│── frontend/          # React app (SSO, file UI, AI integration)
│── backend/           # FastAPI app (auth, file API, AI endpoints)
│── docker-compose.yml # Orchestrates frontend + backend + storage
│── README.md          # Setup instructions
│── design.md          # Architecture, API spec, folder structure
│── ai_usage.md        # AI integration details


Frontend → React (Vite) + Axios + React Router

Backend → FastAPI (Python) with OAuth2, S3 integration, and AI endpoints

Storage → MinIO (default) but configurable to AWS S3

AI → Mistral API for categorization, search, and summarization

⚡ Setup Instructions
1. Clone Repository
git clone https://github.com/your-username/file-explorer.git
cd file-explorer

2. Configure Environment

Create a .env file in the backend directory:

# --- Auth ---
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OAUTH_REDIRECT_URI=http://localhost:8000/auth/callback/google

# --- Storage ---
S3_ENDPOINT=http://minio:9000
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_BUCKET=file-explorer

# --- AI ---
MISTRAL_API_KEY=your-mistral-api-key

3. Start with Docker
docker-compose up --build


Frontend → http://localhost:3000

Backend API → http://localhost:8000/docs

MinIO Console → http://localhost:9001

🔑 Authentication (SSO)

Click “Sign in with Google” on the frontend

After successful login, redirected to the dashboard

Session stored via cookies (withCredentials)

📂 File Features

Upload → Stored in S3 bucket under correct category

View → Opens file directly from S3

Delete → Removes file from S3

Grouping → Files automatically grouped by category in UI

🤖 AI Features

File Categorization

Auto-maps by extension (.pdf → pdf, .ppt → ppt, etc.)

Uses Mistral LLM to detect unknown file types

AI Search

Search query → Mistral-powered semantic search

Results displayed instantly

File Summarization

Generate summary of file contents (PDF/DOCX/TXT)

Displayed in a popup modal

📜 API Endpoints (Backend)
Method	Endpoint	Description
GET	/auth/login/google	Google OAuth2 login
GET	/auth/me	Get current user info
POST	/files/upload-ai	Upload file
GET	/files/files-ai	List files with categories
DELETE	/files/delete/{filename}	Delete file
GET	/files/view/{filename}	View/download file
GET	/files/search-ai/{query}	AI-powered file search
GET	/files/summarize/{filename}	Generate AI summary of file

Swagger docs available at → /docs

📘 Documentation

design.md
 → Architecture, folder structure, API spec

ai_usage.md
 → AI integration details (categorization, search, summarization)

✅ Acceptance Criteria Coverage

✔️ Google SSO

✔️ Upload, view, delete files

✔️ S3-compatible storage (configurable via env)

✔️ REST API with Swagger docs

✔️ Docker Compose end-to-end

✔️ No hardcoded credentials/config

✔️ Documentation included

🌟 Bonus Features

✅ AI-powered file categorization, search & summarization

✅ Metadata support (stored with files in S3)

✅ Modern polished UI with modal summaries

✅ Fully containerized with MinIO integration

🧑‍💻 Author

Developed by Mahadev Hummanagol
📧 [Your Email] | 🌐 [Your GitHub Profile]
