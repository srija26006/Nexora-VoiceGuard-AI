from fastapi import FastAPI

app = FastAPI(title="Nexora VoiceGuard AI")

@app.get("/")
def home():
    return {
        "message": "Nexora VoiceGuard AI is running",
        "status": "active"
    }
