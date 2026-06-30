import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3, Figure } from "@/components/content";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { modul2Quiz } from "@/lib/quizzes";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Module 2: Building a Chatbot with SENOPATI",
};

export default function Modul2Page() {
  return (
    <DocArticle
      href="/modul-2"
      eyebrow="Workshop Modules"
      title="Module 2: Building a Chatbot with SENOPATI"
      lead="Get a SENOPATI API key, set up your local environment, and serve a working chat application with FastAPI your first real LLM-powered app.">
      <p>
        To build a chatbot using an LLM, we need an <strong>API key</strong> to
        access the model. In this module we will use <strong>SENOPATI</strong>{" "}
        as our LLM. Below are the steps to get a SENOPATI API key and use it.
      </p>

      <H2>Getting a SENOPATI API Key</H2>

      <H3>Wait for the instructor to give you the API Key :)</H3>
      <p>
        Open your browser and go to{" "}
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noreferrer">
          Google AI Studio
        </a>
        .
      </p>
      <Callout type="warning" title="Keep your key secret">
        An API key is a credential. Never commit it to a public repository and
        never paste it directly into shared code. We will store it in a separate{" "}
        <code>.env</code> file in the next step.
      </Callout>

      <H2>Setting Up the Environment</H2>
      <p>
        Before running any code, we need to prepare a working folder and install
        the libraries required to run the Python server.
      </p>

      <H3>Install Python</H3>
      <p>
        Check whether it&apos;s already available by opening a terminal
        (in VS Code: <strong>Terminal &gt; New Terminal</strong>) and running:
      </p>
      <CodeBlock lang="bash" code={`python --version`} />
      <p>
        If you see an error instead of a version number (e.g.{" "}
        <code>3.11.x</code>), download and install Python from{" "}
        <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer">
          python.org/downloads
        </a>
        . On Windows, make sure to check{" "}
        <strong>&quot;Add python.exe to PATH&quot;</strong> during setup, then
        restart your terminal afterwards.
      </p>

      <H3>Install the libraries</H3>
      <p>
        Open a terminal or command prompt in your project directory and run:
      </p>
      <CodeBlock
        lang="bash"
        code={`pip install fastapi uvicorn requests pydantic python-dotenv`}
      />
      <p>
        Here&apos;s what each library is for:
      </p>
      <ul>
        <li>
          <code>fastapi</code> — the web framework used to build the{" "}
          <code>/chat</code> API endpoint and serve the page.
        </li>
        <li>
          <code>uvicorn</code> — the ASGI server that actually runs the
          FastAPI app (called via <code>uvicorn.run(...)</code>).
        </li>
        <li>
          <code>requests</code> — used to send the HTTP request to the
          SENOPATI gateway from the <code>/chat</code> endpoint.
        </li>
        <li>
          <code>pydantic</code> — provides <code>BaseModel</code>, used to
          validate the incoming chat request body.
        </li>
        <li>
          <code>python-dotenv</code> — loads variables from the{" "}
          <code>.env</code> file (via <code>load_dotenv()</code>) so the API
          key and model settings stay out of the code.
        </li>
      </ul>

      <H3>Create the .env file</H3>
      <p>
        Create a new file named <code>.env</code> in the same folder. This file
        stores your API key so it is not exposed inside the program code. Its
        content is:
      </p>
      <CodeBlock
        lang="bash"
        filename=".env"
        code={`SENOPATI_API_KEY=PASTE_SENOPATI_KEY_HERE\nSENOPATI_BASE_URL=https://proxy.lab-alpro.com/v1/chat\nMODEL_NAME=qwen3.5:9b
        `}
      />

      <H2>The Backend (main.py)</H2>
      <p>
        Create a file named <code>main.py</code> and add the following code.
        This is the &quot;brain&quot; that connects the user interface to the
        SENOPATI AI.
      </p>
      <CodeBlock
        lang="python"
        filename="main.py"
        code={`import os
import requests
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

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

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # System persona for the Competitive Programming assistant
        personality = (
            "Act as an assistant in Competitive Programming.\\n"
            "Be as acknowledgeable in the subject as possible.\\n"
            "Be as annoying as possible. Connect every single prompt to competitive programming.\\n"
            "Even a simple hello should be connected to competitive programming.\\n"
            "Act like you're trying to 'solve' the user's message, even if it's not a problem to solve.\\n"
            "Please use standard LaTeX for math and Markdown for bolding."
        )

        user_msg = request.message
        system_content = personality

        # Assemble the payload for the /v1/chat endpoint
        payload = {
            "model": MODEL_NAME,
            "stream": False,
            "messages": [
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_msg}
            ]
        }

        # Set the authorization header
        headers = {
            "Authorization": f"Bearer {SENOPATI_API_KEY}",
            "Content-Type": "application/json"
        }

        # Send the request to Senopati
        response = requests.post(SENOPATI_BASE_URL, json=payload, headers=headers)
        response_data = response.json()

        # Handle the API response
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
    uvicorn.run(app, host="localhost", port=8000)`}
      />
      <H2>The Frontend (index.html)</H2>
      <p>
        Create a file named <code>index.html</code> in the same folder. You can
        use the ready-made template provided here:
      </p>
      <ul>
        <li>
          <a href="/index.html" download>
            index.html template
          </a>
        </li>
      </ul>

      <H2>Running the Application</H2>
      <ol>
        <li>
          Make sure your folder contains three main files: <code>main.py</code>,{" "}
          <code>index.html</code>, and <code>.env</code>.
        </li>
        <li>Start the server from the terminal with:</li>
      </ol>
      <CodeBlock lang="bash" code={`python main.py`} />
      <ol start={3}>
        <li>
          Open your browser and visit{" "}
          <a href="http://localhost:8000" target="_blank" rel="noreferrer">
            http://localhost:8000
          </a>
          .
        </li>
      </ol>
      <Figure
        src="/app-result-modul-2.webp"
        alt="The running chatbot web interface in the browser."
        caption="The running chatbot, served by FastAPI at localhost:8000."
        maxWidth={480}
      />

      <Callout type="tip" title="Next up">
        Your chatbot works, but it only knows what the model already learned.
        Next we will teach it to read <em>your</em> documents. Continue to{" "}
        <a href="/modul-3">Module 3: Understanding RAG</a>.
      </Callout>
      <H2>Mini Quiz</H2>
      <p>
        Test your understanding of this module. Pick an answer to get instant
        feedback, then see your score at the end — you can redo the quiz
        anytime.
      </p>
      <Quiz questions={modul2Quiz} />
    </DocArticle>
  );
}
