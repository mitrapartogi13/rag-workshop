import os
import requests
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from rag import process_pdf, retrieve, has_documents

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Senopati Gateway configuration, read from .env
SENOPATI_API_KEY = os.getenv("SENOPATI_API_KEY")
SENOPATI_BASE_URL = os.getenv("SENOPATI_BASE_URL")
MODEL_NAME = os.getenv("MODEL_NAME")

class ChatRequest(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
async def get_index():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "File must be a PDF"}
    try:
        file_bytes = await file.read()
        chunk_count = process_pdf(file_bytes)
        return {"message": "PDF processed successfully", "chunks": chunk_count}
    except Exception as e:
        print(f"UPLOAD ERROR: {e}")
        return {"error": f"Failed to process PDF: {str(e)}"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        personality = (
            "Act as an assistant in Competitive Programming.\n"
            "Be as acknowledgeable in the subject as possible.\n"
            "Be as annoying as possible. Connect every single prompt to competitive programming.\n"
            "Even a simple hello should be connected to competitive programming.\n"
            "Act like you're trying to 'solve' the user's message, even if it's not a problem to solve.\n"
            "Please use standard LaTeX for math and Markdown for bolding."
        )

        user_msg = request.message

        if has_documents():
            context = retrieve(user_msg)
            system_content = f"{personality}\n\nHere is the relevant context from the documents:\n{context}"
        else:
            system_content = personality

        payload = {
            "model": MODEL_NAME,
            "stream": False,
            "messages": [
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_msg}
            ]
        }

        headers = {
            "Authorization": f"Bearer {SENOPATI_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post(SENOPATI_BASE_URL, json=payload, headers=headers)
        response_data = response.json()

        if response.status_code == 200:
            ai_answer = response_data.get("message", {}).get("content", "")
            return {"response": ai_answer}
        else:
            return {"response": f"API Error ({response.status_code}): {response_data}"}
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        return {"response": f"Internal Error: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
