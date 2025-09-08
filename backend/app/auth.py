import os
import httpx
from fastapi import APIRouter, Request, Response
from fastapi.responses import RedirectResponse, JSONResponse
from itsdangerous import URLSafeSerializer
from dotenv import load_dotenv

# Load environment variables from .env
# Load .env from project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env"))



router = APIRouter()
serializer = URLSafeSerializer(os.getenv("SECRET_KEY", "supersecret"))

GOOGLE_CLIENT_ID=os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/callback/google")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5174")



OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
TOKEN_URL = "https://oauth2.googleapis.com/token"
USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"
SCOPES = "openid email profile"


@router.get("/login/google")
async def login_google():
    print("GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID)
    print("GOOGLE_CLIENT_SECRET:", GOOGLE_CLIENT_SECRET)
    print("GOOGLE_REDIRECT_URI:", GOOGLE_REDIRECT_URI)

    url = (
        f"{OAUTH_URL}?response_type=code"
        f"&client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        f"&scope={SCOPES}&access_type=offline&prompt=consent"
    )
    return RedirectResponse(url)



@router.get("/callback/google")
async def callback_google(code: str):
    async with httpx.AsyncClient() as client:
        token_resp = await client.post(
            TOKEN_URL,
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        token_data = token_resp.json()

        # Check for error in token_data
        if "access_token" not in token_data:
            return JSONResponse({"error": "Failed to get access token", "details": token_data}, status_code=400)

        userinfo_resp = await client.get(
            USERINFO_URL,
            headers={"Authorization": f"Bearer {token_data['access_token']}"},
        )
        userinfo = userinfo_resp.json()

    # Generate session token
    session_token = serializer.dumps({"email": userinfo["email"], "name": userinfo.get("name")})

    # Redirect to frontend dashboard with cookie
    response = RedirectResponse(url=f"{FRONTEND_URL}/dashboard")
    response.set_cookie(
        key="session",
        value=session_token,
        httponly=True,
        samesite="lax",
        secure=False  # must be False for HTTP during dev
    )
    return response



@router.get("/me")
async def me(request: Request):
    session_cookie = request.cookies.get("session")
    if not session_cookie:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)

    try:
        user = serializer.loads(session_cookie)
        return user
    except Exception:
        return JSONResponse({"error": "Invalid session"}, status_code=401)


@router.post("/logout")
async def logout(response: Response):
    # Clear the session cookie
    response.delete_cookie("session")
    # Redirect user back to login page
    return RedirectResponse(url="http://localhost:5174/", status_code=303)
