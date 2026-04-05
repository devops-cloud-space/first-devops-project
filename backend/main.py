from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Backend is running 🚀"}

@app.post("/process")
def process_text(msg: Message):
    return {
        "original": msg.text,
        "processed": msg.text.upper() + " 🚀"
    }