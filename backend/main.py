from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from backend.audio_analysis import analyze_audio
import os
import shutil
import uuid

app = FastAPI(
    title="Nexora VoiceGuard AI",
    description="AI-powered voice integrity analysis"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Nexora VoiceGuard AI Backend is running",
        "status": "active"
    }


@app.post("/analyze-audio")
async def analyze_audio_endpoint(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(
        (".wav", ".mp3", ".ogg", ".m4a")
    ):
        return {
            "status": "error",
            "message": "Unsupported audio format"
        }

    file_extension = file.filename.split(".")[-1]
    temp_filename = f"{uuid.uuid4()}.{file_extension}"
    temp_path = os.path.join(UPLOAD_DIR, temp_filename)

    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = analyze_audio(temp_path)

        return result

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)