import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import auth router
import app.auth as auth


app = FastAPI(title="File Explorer Backend")

# Add session middleware
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY", "supersecret"),
    session_cookie="session",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5174")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes
app.include_router(auth.router, prefix="/auth", tags=["auth"])

from app.files import router as files_router
app.include_router(files_router, prefix="/files", tags=["files"])







@app.get("/")
def root():
    return {"message": "Backend running 🚀"}


# ✅ Make it runnable via python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",   # module:instance
        host="0.0.0.0", # so you can use localhost
        port=8000,
        reload=True
    )
