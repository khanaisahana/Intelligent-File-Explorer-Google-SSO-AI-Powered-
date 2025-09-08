# 📐 Design Document

## 🏗️ Architecture Overview

The Intelligent File Explorer is designed as an **n-tier application** with clear separation of concerns:

- **Frontend (React + Vite)**  
  Handles UI, Google SSO authentication flow, file upload, listing, deletion, and AI interactions.

- **Backend (FastAPI + Python)**  
  Provides REST APIs for authentication, file management, AI-powered endpoints, and S3 integration.

- **Storage (MinIO / AWS S3)**  
  Stores files with metadata and categories. Supports pluggable S3-compatible storage.

- **AI Layer (Mistral API)**  
  Used for file categorization, semantic search, and text summarization.

---

## 📂 Folder Structure

```
file-explorer/
│── frontend/              # React app (UI + SSO + File explorer)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Dashboard, Login, File Explorer pages
│   │   ├── services/      # Axios API calls
│   │   └── App.jsx
│   └── vite.config.js
│
│── backend/               # FastAPI backend
│   ├── app/
│   │   ├── main.py        # Entry point
│   │   ├── auth/          # Google OAuth2 logic
│   │   ├── routes/        # API routes (files, AI, auth)
│   │   ├── services/      # S3, AI, utils
│   │   └── models/        # Pydantic models
│   └── requirements.txt
│
│── docker-compose.yml     # Orchestrates services
│── design.md              # Architecture, API spec
│── ai_usage.md            # AI integration details
│── README.md              # Main documentation
```

---

## 📜 API Specification

### Authentication
- `GET /auth/login/google` → Initiates Google OAuth2 login
- `GET /auth/me` → Returns current user info

### File Management
- `POST /files/upload-ai` → Uploads file and auto-categorizes
- `GET /files/files-ai` → Lists files with categories
- `DELETE /files/delete/{filename}` → Deletes file
- `GET /files/view/{filename}` → Downloads file

### AI Features
- `GET /files/search-ai/{query}` → Semantic search using AI
- `GET /files/summarize/{filename}` → Summarizes file contents

➡️ Swagger documentation available at `/docs`
