import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { modul4Quiz } from "@/lib/quizzes";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Module 4: Building the RAG Pipeline",
};

export default function Modul4Page() {
  return (
    <DocArticle
      href="/modul-4"
      eyebrow="Workshop Modules"
      title="Module 4: Building the RAG Pipeline"
      lead="Turn the Gemini chatbot into a document-aware assistant. We build it in three parts — store, retrieve, and generation — testing each part before moving on."
    >
      <p>
        We will implement RAG on top of the chatbot from Module 2, in the order:{" "}
        <strong>store</strong> the PDF, <strong>retrieve</strong> relevant
        chunks, and finally connect retrieval to the LLM for{" "}
        <strong>generation</strong>.
      </p>

      <H2>The Store: Saving a PDF to ChromaDB</H2>
      <p>In this part we build the ability to:</p>
      <ol>
        <li>Receive a PDF file from the user.</li>
        <li>Split its contents into chunks.</li>
        <li>Turn each chunk into a vector (embedding).</li>
        <li>Save them into ChromaDB.</li>
      </ol>

      <H3>Create rag.py (the store part)</H3>
      <p>
        Create a new file named <code>rag.py</code>. For now we only fill it with
        the functions related to <strong>storage</strong>. The retrieve function
        will be added later.
      </p>
      <CodeBlock
        lang="python"
        filename="rag.py"
        code={`import os
import tempfile
import chromadb
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer

COLLECTION_NAME = "documents"

# Global variables so the model and DB connection are not reloaded every time
_model = None
_client = None
_collection = None


def _get_model():
    """Load the embedding model. Runs only once, then cached in _model."""
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def _get_collection():
    """Open a connection to ChromaDB. Runs only once, then cached in _client."""
    global _client, _collection
    if _client is None:
        chroma_path = os.getenv("CHROMA_PATH", "./chroma_db")
        _client = chromadb.PersistentClient(path=chroma_path)
        _collection = _client.get_or_create_collection(COLLECTION_NAME)
    return _collection


def has_documents():
    """Return True if there are already documents stored in ChromaDB."""
    return _get_collection().count() > 0


def process_pdf(file_bytes: bytes) -> int:
    """
    Process a PDF file: read -> split -> embed -> store in ChromaDB.
    Returns the number of chunks successfully stored.
    """
    # Write the PDF bytes to a temporary file because PyPDFLoader needs a path
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    try:
        # Read the PDF into a list of pages
        loader = PyPDFLoader(tmp_path)
        pages = loader.load()

        # Split the text into chunks of ~500 characters.
        # chunk_overlap=50 means the last 50 characters of the previous chunk
        # are repeated at the start of the next chunk, so context is not lost.
        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = splitter.split_documents(pages)

        # Keep only the text of each chunk (drop empty ones)
        texts = [c.page_content for c in chunks if c.page_content.strip()]
        if not texts:
            return 0

        # Turn all texts into vectors at once
        embeddings = _get_model().encode(texts).tolist()

        # Create a unique ID for each chunk
        ids = [f"chunk_{abs(hash(text + str(i)))}" for i, text in enumerate(texts)]

        # Store the text + vectors in ChromaDB
        _get_collection().add(documents=texts, embeddings=embeddings, ids=ids)

        return len(texts)
    finally:
        # Always delete the temporary file, even if an error occurs
        os.unlink(tmp_path)`}
      />
      <Callout type="note" title="Why chunk_overlap?">
        Imagine an important sentence getting cut exactly between two chunks. With
        an overlap of 50 characters, the last 50 characters of the first chunk are
        repeated at the start of the second chunk, so the context is not lost at
        the boundary.
      </Callout>

      <H3>Add the /upload endpoint to main.py</H3>
      <p>
        Open <code>main.py</code> and make three changes.
      </p>
      <p>
        <strong>Change 1 — update the import line</strong> (replace{" "}
        <code>from fastapi import FastAPI, Request</code>):
      </p>
      <CodeBlock
        lang="python"
        code={`from fastapi import FastAPI, Request, UploadFile, File`}
      />
      <p>
        <strong>Change 2 — import from rag.py</strong> (add at the bottom of the
        import section):
      </p>
      <CodeBlock
        lang="python"
        code={`from rag import process_pdf, has_documents`}
      />
      <p>
        <strong>Change 3 — add the /upload endpoint</strong> (add it after the{" "}
        <code>get_index</code> function, before the <code>chat</code> function):
      </p>
      <CodeBlock
        lang="python"
        code={`@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "File must be a PDF"}
    try:
        file_bytes = await file.read()
        chunk_count = process_pdf(file_bytes)
        return {"message": "PDF processed successfully", "chunks": chunk_count}
    except Exception as e:
        print(f"UPLOAD ERROR: {e}")
        return {"error": f"Failed to process PDF: {str(e)}"}`}
      />

      <H3>Run and test the upload</H3>
      <p>Start the server:</p>
      <CodeBlock lang="bash" code={`python main.py`} />
      <p>
        Open <a href="http://localhost:8000" target="_blank" rel="noreferrer">http://localhost:8000</a>, click{" "}
        <strong>&quot;Upload PDF&quot;</strong>, choose a PDF file, and wait for
        the confirmation message:
      </p>
      <CodeBlock
        lang="text"
        code={`filename.pdf processed successfully (47 chunks)`}
      />
      <p>
        If a chunk count appears, the PDF was successfully split, embedded, and
        stored in ChromaDB. A <code>chroma_db/</code> folder will appear
        automatically in your project directory.
      </p>

      <H2>Inspecting ChromaDB</H2>
      <p>
        After uploading, how do we know the data was really stored? We can peek
        directly into ChromaDB using various tools. For now we will use the{" "}
        <a
          href="https://github.com/Algoritma-dan-Pemrograman-ITS/Camin-2026/blob/main/Materi%203/viewer.py"
          target="_blank"
          rel="noreferrer"
        >
          viewer.py
        </a>{" "}
        script.
      </p>

      <H2>The Retrieve: Finding Relevant Chunks</H2>
      <p>
        Now we add the <strong>retrieve</strong> function to <code>rag.py</code>.
        It is called every time the user sends a message; its job is to find the
        most relevant chunks from ChromaDB based on the user&apos;s question.
      </p>

      <H3>Add the retrieve function to rag.py</H3>
      <p>
        Add the following function at the <strong>very bottom</strong> of{" "}
        <code>rag.py</code>:
      </p>
      <CodeBlock
        lang="python"
        filename="rag.py"
        code={`def retrieve(query: str, top_k: int = 3) -> str:
    """
    Find the chunks most relevant to the query from ChromaDB.
    Returns the combined text of the top_k chunks.
    """
    collection = _get_collection()

    # If the database is empty, there is nothing to search
    if collection.count() == 0:
        return ""

    # Turn the user's question into a vector
    query_embedding = _get_model().encode([query]).tolist()

    # Ask ChromaDB to return the n most similar chunks.
    # min() is used so it does not error if there are fewer chunks than top_k.
    n = min(top_k, collection.count())
    results = collection.query(query_embeddings=query_embedding, n_results=n)

    # results["documents"] is a list of lists because queries can be batched;
    # we take [0] because there is only one query.
    chunks = results["documents"][0]

    # Join all chunks into one string separated by blank lines
    return "\\n\\n".join(chunks)`}
      />

      <H3>Test retrieval directly</H3>
      <p>
        Before connecting it to the chatbot, we can test the retrieve function
        directly from the terminal. Create a temporary file{" "}
        <code>test_retrieve.py</code>:
      </p>
      <CodeBlock
        lang="python"
        filename="test_retrieve.py"
        code={`from rag import retrieve

# Replace this with something that exists in the PDF you uploaded
question = "What is a sorting algorithm?"

result = retrieve(question, top_k=3)

print(f"Question: {question}")
print("=" * 50)
print("Most relevant chunks found:")
print(result)`}
      />
      <p>Run it:</p>
      <CodeBlock lang="bash" code={`python test_retrieve.py`} />
      <p>
        If the output shows text snippets from the PDF that are relevant to the
        question, the retrieval system works. If the results are not relevant, try
        rephrasing the question to better match the PDF&apos;s content.
      </p>
      <Callout type="tip" title="Cleanup">
        <code>test_retrieve.py</code> is only for testing. You can delete it once
        you are done.
      </Callout>

      <H2>The Generation: Connecting to the LLM</H2>
      <p>
        This is the final step: feed the retrieval result to Gemini so the
        chatbot&apos;s answers are <strong>based on the PDF contents</strong>, not
        just the model&apos;s general knowledge.
      </p>

      <H3>Update the import in main.py</H3>
      <p>
        Update the import line from <code>rag</code> in <code>main.py</code> to
        add <code>retrieve</code>:
      </p>
      <CodeBlock
        lang="python"
        code={`from rag import process_pdf, retrieve, has_documents`}
      />

      <H3>Modify the chat function in main.py</H3>
      <p>
        Replace the entire existing <code>chat</code> function with this new
        version:
      </p>
      <CodeBlock
        lang="python"
        code={`@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        personality = (
            "Act as an assistant in Competitive Programming.\\n"
            "Be as acknowledgeable in the subject as possible.\\n"
            "Be as annoying as possible. Connect every single prompt to competitive programming.\\n"
            "Even a simple hello should be connected to competitive programming.\\n"
            "Act like you're trying to 'solve' the user's message, even if it's not a problem to solve.\\n"
            "Please use standard LaTeX for math and Markdown for bolding.\\n"
        )

        user_msg = request.message

        if has_documents():
            # RAG mode: documents are stored.
            # Retrieve relevant chunks and insert them as context into the prompt.
            context = retrieve(user_msg)
            prompt = (
                f"{personality}\\n"
                f"Here is the relevant context from the document:\\n{context}\\n\\n"
                f"Question: {user_msg}"
            )
        else:
            # Fallback mode: no documents yet, use a plain prompt.
            prompt = f"{personality}This is your next prompt: {user_msg}"

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {"response": response.text}
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        return {"response": f"Internal Error: {str(e)}"}`}
      />
      <p>
        <strong>What changed?</strong> The <code>chat</code> function now has two
        paths:
      </p>
      <CodeBlock
        lang="text"
        code={`Are there documents in ChromaDB?
    |-- YES -> retrieve() -> combine into prompt -> send to LLM   [RAG MODE]
    |__ NO  -> plain prompt -> send to LLM                        [FALLBACK MODE]`}
      />
      <p>
        The Competitive Programming personality stays in <strong>both</strong>{" "}
        paths; the only difference is whether context from the PDF is present.
      </p>

      <H2>The Final main.py</H2>
      <p>For reference, here is the complete main.py after all the changes:</p>
      <CodeBlock
        lang="python"
        filename="main.py"
        code={`import os
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from google import genai
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

api_key_val = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key_val)

class ChatRequest(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
async def get_index():
    with open("index.html", "r") as f:
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
            "Act as an assistant in Competitive Programming.\\n"
            "Be as acknowledgeable in the subject as possible.\\n"
            "Be as annoying as possible. Connect every single prompt to competitive programming.\\n"
            "Even a simple hello should be connected to competitive programming.\\n"
            "Act like you're trying to 'solve' the user's message, even if it's not a problem to solve.\\n"
            "Please use standard LaTeX for math and Markdown for bolding.\\n"
        )

        user_msg = request.message

        if has_documents():
            context = retrieve(user_msg)
            prompt = (
                f"{personality}\\n"
                f"Here is the relevant context from the document:\\n{context}\\n\\n"
                f"Question: {user_msg}"
            )
        else:
            prompt = f"{personality}This is your next prompt: {user_msg}"

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

      <Callout type="tip" title="Next up">
        The pipeline is complete. Now it&apos;s your turn to build and demo it.
        Continue to <a href="/modul-5">Module 5: Hands-on Session</a>.
      </Callout>
      <H2>Mini Quiz</H2>
      <p>
        Test your understanding of this module. Pick an answer to get instant
        feedback, then see your score at the end — you can redo the quiz anytime.
      </p>
      <Quiz questions={modul4Quiz} />
    </DocArticle>
  );
}
