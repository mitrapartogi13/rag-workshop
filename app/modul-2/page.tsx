import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3, Figure } from "@/components/content";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { modul2Quiz } from "@/lib/quizzes";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Module 2: Building a Chatbot with Gemini",
};

export default function Modul2Page() {
  return (
    <DocArticle
      href="/modul-2"
      eyebrow="Workshop Modules"
      title="Module 2: Building a Chatbot with Gemini"
      lead="Get a Google Gemini API key, set up your local environment, and serve a working chat application with FastAPI — your first real LLM-powered app."
    >
      <p>
        To build a chatbot using an LLM, we need an <strong>API key</strong> to
        access the model. In this module we will use <strong>Google Gemini</strong>{" "}
        as our LLM. Below are the steps to get a Gemini API key and use it.
      </p>

      <H2>Getting a Gemini API Key</H2>

      <H3>Step 1: Open Google AI Studio</H3>
      <p>
        Open your browser and go to{" "}
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noreferrer"
        >
          Google AI Studio
        </a>
        .
      </p>

      <H3>Step 2: Sign in with Google</H3>
      <p>
        Click <strong>&quot;Sign in with Google&quot;</strong> and log in with
        your Google account.
      </p>

      <H3>Step 3: Create an API Key</H3>
      <p>
        After signing in you will land on the API Key page. Click{" "}
        <strong>&quot;Create API Key&quot;</strong> to generate a new key.
      </p>
      <Figure
        src="https://github.com/user-attachments/assets/3805c43f-fd9b-42ae-8594-252de2b22f66"
        alt="The Google AI Studio screen showing the Create API Key button."
        caption="Google AI Studio — the Create API Key button."
      />

      <H3>Step 4: Choose a Google Cloud Project</H3>
      <p>
        If you already have a Google Cloud project, you can select it. Otherwise,
        click <strong>&quot;Create new project&quot;</strong> to make a new one.
      </p>
      <Figure
        src="https://github.com/user-attachments/assets/48227bd5-833e-4c44-a56d-94d28b0669f6"
        alt="Selecting an existing Google Cloud project."
        maxWidth={521}
      />
      <Figure
        src="https://github.com/user-attachments/assets/8992d6e5-543c-4ca5-9602-babf07fd8ad5"
        alt="Creating a new Google Cloud project for the API key."
        caption="Pick an existing project, or create a new one."
        maxWidth={514}
      />

      <H3>Step 5: Copy the API Key</H3>
      <p>
        Once the key is created, click <strong>&quot;Copy&quot;</strong> to copy
        it. Store it somewhere safe and <strong>do not share it</strong> with
        anyone.
      </p>
      <Figure
        src="https://github.com/user-attachments/assets/b51ae4d1-fada-4974-8c60-0e876c44910a"
        alt="The Copy button next to the generated API key."
        maxWidth={240}
      />
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

      <H3>Install the libraries</H3>
      <p>
        Open a terminal or command prompt in your project directory and run:
      </p>
      <CodeBlock
        lang="bash"
        code={`pip install fastapi uvicorn google-genai python-dotenv`}
      />

      <H3>Create the .env file</H3>
      <p>
        Create a new file named <code>.env</code> in the same folder. This file
        stores your API key so it is not exposed inside the program code. Its
        content is:
      </p>
      <CodeBlock
        lang="bash"
        filename=".env"
        code={`GEMINI_API_KEY=PASTE_YOUR_COPIED_API_KEY_HERE`}
      />

      <H2>The Backend (main.py)</H2>
      <p>
        Create a file named <code>main.py</code> and add the following code. This
        is the &quot;brain&quot; that connects the user interface to the Gemini AI
        model.
      </p>
      <CodeBlock
        lang="python"
        filename="main.py"
        code={`import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from google import genai
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

api_key_val = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key_val)

class ChatRequest(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
async def get_index():
    with open("index.html", "r") as f:
        return f.read()

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        prompt = """Act as an assistant in Competitive Programming.\\n
        Be as acknowledgeable in the subject as possible.\\n
        Be as annoying as possible. Connect every single prompt to competitive programming.\\n
        Even a simple hello should be connected to competitive programming.\\n
        Act like you're trying to "solve" the user's message, even if it's not a problem to solve.\\n
        Please use standard LaTeX for math and Markdown for bolding.\\n
        This is your next prompt: """
        user_msg = request.message
        prompt += user_msg

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {"response": response.text}
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        return {"response": f"Internal Error: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)`}
      />
      <Callout type="note" title="Explore other models">
        You can explore the available Gemini models in the{" "}
        <a
          href="https://ai.google.dev/gemini-api/docs/models"
          target="_blank"
          rel="noreferrer"
        >
          official model list
        </a>
        . Here we use <code>gemini-2.5-flash</code>, which is fast and free-tier
        friendly.
      </Callout>

      <H2>The Frontend (index.html)</H2>
      <p>
        Create a file named <code>index.html</code> in the same folder. You can
        use the ready-made template provided here:
      </p>
      <ul>
        <li>
          <a
            href="https://github.com/Algoritma-dan-Pemrograman-ITS/Camin-2026/blob/main/Materi%203/index.html"
            target="_blank"
            rel="noreferrer"
          >
            index.html template (GitHub)
          </a>
        </li>
      </ul>

      <H2>Running the Application</H2>
      <ol>
        <li>
          Make sure your folder contains three main files:{" "}
          <code>main.py</code>, <code>index.html</code>, and <code>.env</code>.
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
        src="https://github.com/user-attachments/assets/45e3a97c-a1b1-4e87-ba18-61fe3c44f041"
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
        feedback, then see your score at the end — you can redo the quiz anytime.
      </p>
      <Quiz questions={modul2Quiz} />
    </DocArticle>
  );
}
