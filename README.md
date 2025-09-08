# 🚀 Intelligent File Explorer (SSO + AI Powered)

A full-stack file explorer application with Google SSO login, file management, and AI-enhanced features.  
Built for the Full Stack Take-Home Assignment – containerized with Docker Compose for one-command deployment.

---

## ✨ Features

### 🔐 Authentication
- Single Sign-On (SSO) via Google OAuth2

### 📂 File Management
- Upload, view, delete files (PDF, DOCX, PPT, images, text, CSV, etc.)
- Auto-group files by type (pdf, doc, ppt, image, etc.)

### 🪄 AI-Powered Features
- Automatic file categorization (Mistral API fallback when extension is unknown)
- AI-powered file search
- Summarization of file contents (PDF, DOCX, TXT) with popup modal view

### ☁️ Storage
- S3-Compatible Storage – Supports MinIO, AWS S3, or any S3 endpoint

### 🔧 Configurable
- `.env` based configuration – no hardcoded credentials

### 🐳 Dockerized
- Run frontend + backend with a single `docker-compose up`

### 📜 Documentation
- Swagger API Docs at `/docs`

### 🎨 Modern UI
- Responsive, clean, and user-friendly
<img width="1920" height="1080" alt="Screenshot (83)" src="https://github.com/user-attachments/assets/ef3fbd9e-6c5a-4b66-b516-d124fd7519fb" />
<img width="1920" height="1080" alt="Screenshot (84)" src="https://github.com/user-attachments/assets/27dfb69c-1cef-4325-b87c-e3aec1a6144b" />
<img width="1920" height="1080" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/a714e711-e739-4e8e-a65c-3fe444697e29" />
<img width="1920" height="1080" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/2960ddfe-d744-4238-9194-72f2dc5046f6" />
<img width="1920" height="1080" alt="Screenshot (87)" src="https://github.com/user-attachments/assets/849cf76a-61ff-4c02-b07e-b0561f2ffcfc" />
<img width="1920" height="1080" alt="Screenshot (88)" src="https://github.com/user-attachments/assets/2133599e-e809-4405-b26f-9a0290cb4c99" />
<img width="1920" height="1080" alt="Screenshot (89)" src="https://github.com/user-attachments/assets/036d5823-54c9-42dd-8a5b-2a0aed8b7159" />
<img width="1920" height="1080" alt="Screenshot (90)" src="https://github.com/user-attachments/assets/025489a6-a429-429c-882e-6d7fbad570ad" />
<img width="1920" height="1080" alt="Screenshot (91)" src="https://github.com/user-attachments/assets/077f300e-2ae8-40f9-83a1-dca856c1fff2" />




---

## 🏗️ Architecture

```
file-explorer/
│── frontend/          # React app (SSO, file UI, AI integration)
│── backend/           # FastAPI app (auth, file API, AI endpoints)
│── docker-compose.yml # Orchestrates frontend + backend + storage
│── README.md          # Setup instructions
│── design.md          # Architecture, API spec, folder structure
│── ai_usage.md        # AI integration details
```

- **Frontend** → React (Vite) + Axios + React Router  
- **Backend** → FastAPI (Python) with OAuth2, S3 integration, and AI endpoints  
- **Storage** → MinIO (default) but configurable to AWS S3  
- **AI** → Mistral API for categorization, search, and summarization  

---

## ⚡ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/file-explorer.git
cd file-explorer
```

### 2. Configure Environment
Create a `.env` file in the `backend` directory:

```bash
# --- Auth ---
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/callback/google
SECRET_KEY=supersecret
FRONTEND_URL=http://localhost:5174

# --- Storage ---
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET=files

# --- AI ---
MISTRAL_API_KEY=your-mistral-api-key
```

### 3. Start with Docker
```bash
docker-compose up --build
```

- **Frontend** → http://localhost:3000  
- **Backend API** → http://localhost:8000/docs  
- **MinIO Console** → http://localhost:9001  

---

## 🔑 Authentication (SSO)

- Click **“Sign in with Google”** on the frontend  
- After successful login, redirected to the dashboard  
- Session stored via cookies (`withCredentials`)  

---

## 📂 File Features

- **Upload** → Stored in S3 bucket under correct category  
- **View** → Opens file directly from S3  
- **Delete** → Removes file from S3  
- **Grouping** → Files automatically grouped by category in UI  

---

## 🤖 AI Features

### File Categorization
- Auto-maps by extension (`.pdf → pdf`, `.ppt → ppt`, etc.)  
- Uses **Mistral LLM** to detect unknown file types  

### AI Search
- Semantic search powered by **Mistral API**  
- Results displayed instantly  

### File Summarization
- Generates summary of file contents (**PDF / DOCX / TXT**)  
- Displayed in a popup modal  

---

## 📜 API Endpoints (Backend)

| Method | Endpoint                       | Description                    |
|--------|--------------------------------|--------------------------------|
| GET    | `/auth/login/google`           | Google OAuth2 login            |
| GET    | `/auth/me`                     | Get current user info          |
| POST   | `/files/upload-ai`             | Upload file                    |
| GET    | `/files/files-ai`              | List files with categories     |
| DELETE | `/files/delete/{filename}`     | Delete file                    |
| GET    | `/files/view/{filename}`       | View/download file             |
| GET    | `/files/search-ai/{query}`     | AI-powered file search         |
| GET    | `/files/summarize/{filename}`  | Generate AI summary of file    |

➡️ Swagger docs available at → `/docs`

---

## 📘 Documentation

- **design.md** → Architecture, folder structure, API spec  
- **ai_usage.md** → AI integration details (categorization, search, summarization)  

---

## ✅ Acceptance Criteria Coverage

✔️ Google SSO  
✔️ Upload, view, delete files  
✔️ S3-compatible storage (configurable via env)  
✔️ REST API with Swagger docs  
✔️ Docker Compose end-to-end  
✔️ No hardcoded credentials/config  
✔️ Documentation included  

---

## 🌟 Bonus Features

✅ AI-powered file categorization, search & summarization  
✅ Metadata support (stored with files in S3)  
✅ Modern polished UI with modal summaries  
✅ Fully containerized with MinIO integration  

---

## 🧑‍💻 Author

Developed by **Sahana Khanai**
