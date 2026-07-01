/**
 * Mini-quiz question banks, one array per module.
 *
 * Each question has four options, a single correct `answer` (index), and an
 * `explanation` written to explain the correct answer. The Quiz component
 * frames it either as confirmation (when right) or as a correction (when
 * wrong), so one explanation field serves both cases.
 */

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const modul1Quiz: QuizQuestion[] = [
  {
    question: "What does the abbreviation LLM stand for?",
    options: [
      "Large Language Model",
      "Long Logic Machine",
      "Linear Learning Method",
      "Layered Language Memory",
    ],
    answer: 0,
    explanation:
      "LLM stands for Large Language Model, an AI model trained to understand and generate human-like text.",
  },
  {
    question: "How does an LLM fundamentally generate text?",
    options: [
      "By searching the internet in real time",
      "By predicting the next word in a sequence",
      "By copying sentences from its training data",
      "By following hand-written grammar rules",
    ],
    answer: 1,
    explanation:
      "An LLM works by predicting the next word (token) based on the sequence so far, learned from its training data.",
  },
  {
    question: "Which of these is an open-source LLM family?",
    options: ["ChatGPT", "Grok", "Llama", "Claude"],
    answer: 2,
    explanation:
      "Llama (along with Mistral and Qwen) is open-source. ChatGPT, Grok, and Claude are proprietary models.",
  },
  {
    question: "Which knowledge-injection method is the simplest?",
    options: ["Fine-tuning", "RAG", "Prompt Engineering", "Pre-training"],
    answer: 2,
    explanation:
      "Prompt engineering is the simplest method: you just give the model instructions (and sometimes context) in the prompt.",
  },
  {
    question: "What does zero-shot prompting mean?",
    options: [
      "Giving no examples, just the instruction or question",
      "Giving exactly one example",
      "Giving several examples",
      "Retraining the model from scratch",
    ],
    answer: 0,
    explanation:
      "Zero-shot prompting provides no examples at all; the model answers using only the understanding it gained during training.",
  },
  {
    question: "In few-shot prompting, how many examples do you typically provide?",
    options: ["None", "Exactly one", "Several (around 2–5 or more)", "Hundreds"],
    answer: 2,
    explanation:
      "Few-shot prompting gives several examples (usually 2–5 or more), which helps with complex or unusual output patterns.",
  },
  {
    question: "How does RAG inject knowledge into an LLM?",
    options: [
      "By changing the model's internal weights",
      "By retrieving external information and adding it as context",
      "By increasing the model's size",
      "By translating the prompt into another language",
    ],
    answer: 1,
    explanation:
      "RAG retrieves relevant information from an external source and supplies it to the LLM as context at answer time.",
  },
  {
    question: "Which method permanently changes the model's neural weights?",
    options: ["Prompt Engineering", "RAG", "Fine-tuning", "Few-shot prompting"],
    answer: 2,
    explanation:
      "Fine-tuning retrains part of the model, permanently changing its weights (its long-term memory).",
  },
  {
    question: "When should you prefer RAG over fine-tuning?",
    options: [
      "When you want to change the model's writing style",
      "When you need access to up-to-date or private facts without retraining",
      "When you want to make the model smaller",
      "When you have no documents at all",
    ],
    answer: 1,
    explanation:
      "RAG is ideal when you just need the model to access current or private facts cheaply, without retraining every time data changes.",
  },
  {
    question: "Knowledge injected through prompt context acts as the model's…",
    options: [
      "Short-term memory",
      "Long-term memory",
      "Permanent training data",
      "Hardware cache",
    ],
    answer: 0,
    explanation:
      "Context placed in the prompt behaves like short-term memory: it influences only that request, unlike fine-tuning's long-term changes.",
  },
];

export const modul2Quiz: QuizQuestion[] = [
  {
    question: "Where do you get the SENOPATI API key in this workshop?",
    options: [
      "Google AI Studio",
      "From the instructor",
      "ChromaDB dashboard",
      "The Python terminal",
    ],
    answer: 1,
    explanation:
      "SENOPATI is a shared gateway set up for the workshop, so the instructor hands out the API key directly.",
  },
  {
    question: "Why is the API key stored in a .env file?",
    options: [
      "To make the code run faster",
      "To keep the key out of the source code so it isn't exposed",
      "Because SENOPATI requires that exact filename",
      "To translate the key into another format",
    ],
    answer: 1,
    explanation:
      "A .env file keeps secrets out of your code, so the key isn't exposed or accidentally committed to a repository.",
  },
  {
    question:
      "Which set of libraries is installed for the basic (non-RAG) chatbot?",
    options: [
      "chromadb, pypdf, sentence-transformers",
      "numpy, pandas, scikit-learn",
      "fastapi, uvicorn, requests, pydantic, python-dotenv",
      "flask, django, requests",
    ],
    answer: 2,
    explanation:
      "The basic chatbot needs fastapi and uvicorn (the server), requests (to call SENOPATI), pydantic (request models), and python-dotenv (to read .env).",
  },
  {
    question: "What is the role of main.py?",
    options: [
      "It stores the API key",
      "It is the backend that connects the user interface to the SENOPATI model",
      "It is the chat front-end",
      "It is the vector database",
    ],
    answer: 1,
    explanation:
      "main.py is the FastAPI backend, the 'brain' that links the web interface to the SENOPATI-hosted model.",
  },
  {
    question: "Which .env variable holds the model name used in the workshop code?",
    options: ["MODEL_NAME", "SENOPATI_BASE_URL", "GEMINI_API_KEY", "APP_MODEL"],
    answer: 0,
    explanation:
      "MODEL_NAME (set to qwen3.5:9b in the workshop) is read from .env and sent as the model field in the request payload.",
  },
  {
    question: "What does load_dotenv() do?",
    options: [
      "Starts the web server",
      "Loads variables from the .env file into the environment",
      "Downloads the SENOPATI model",
      "Connects to ChromaDB",
    ],
    answer: 1,
    explanation:
      "load_dotenv() reads the .env file and loads its values (like SENOPATI_API_KEY) into environment variables.",
  },
  {
    question: "Why is CORS middleware added to the FastAPI app?",
    options: [
      "To encrypt the API key",
      "To allow the browser front-end to call the backend API",
      "To speed up PDF parsing",
      "To limit the number of users",
    ],
    answer: 1,
    explanation:
      "CORS middleware lets the browser-based front-end make cross-origin requests to the API without being blocked.",
  },
  {
    question: "Which command starts the server?",
    options: ["pip install main", "python main.py", "uvicorn start", "npm run dev"],
    answer: 1,
    explanation:
      "Running python main.py launches the app (the script calls uvicorn.run internally on port 8000).",
  },
  {
    question: "Which address do you open in the browser to use the app?",
    options: [
      "http://localhost:3000",
      "http://localhost:8000",
      "http://127.0.0.1:5000",
      "http://localhost:8080",
    ],
    answer: 1,
    explanation:
      "The server runs on port 8000, so you visit http://localhost:8000.",
  },
  {
    question: "How should you treat your API key?",
    options: [
      "Share it so teammates can reuse it",
      "Paste it directly into main.py",
      "Keep it secret and never commit it publicly",
      "Post it in the chat for backup",
    ],
    answer: 2,
    explanation:
      "An API key is a credential. Keep it secret, store it in .env, and never push it to a public repository.",
  },
];

export const modul3Quiz: QuizQuestion[] = [
  {
    question: "Why do we split a document into chunks?",
    options: [
      "To make the PDF file smaller on disk",
      "Because an LLM has a limit on how much text it can process at once",
      "To translate the document automatically",
      "Because ChromaDB only accepts images",
    ],
    answer: 1,
    explanation:
      "LLMs can only process a limited amount of text at once, so long documents are split into smaller, focused chunks.",
  },
  {
    question: "Roughly what chunk size does the material suggest?",
    options: ["~50 characters", "~500 characters", "~5,000 characters", "~50,000 characters"],
    answer: 1,
    explanation:
      "The material uses chunks of about ~500 characters, balancing enough context with precise retrieval.",
  },
  {
    question: "What is an embedding?",
    options: [
      "A compressed copy of the PDF",
      "A vector (list of numbers) that represents the meaning of text",
      "A summary written by the LLM",
      "A type of API key",
    ],
    answer: 1,
    explanation:
      "An embedding turns text into a vector of numbers, so a computer can compare meanings mathematically.",
  },
  {
    question: "Two chunks about similar topics produce vectors that are…",
    options: [
      "Far apart",
      "Close to each other",
      "Exactly identical",
      "Always zero",
    ],
    answer: 1,
    explanation:
      "Similar meanings map to vectors that are close together; unrelated text maps to vectors that are far apart.",
  },
  {
    question: "What is ChromaDB used for?",
    options: [
      "Serving the web page",
      "Storing vectors and finding the most similar ones",
      "Calling the SENOPATI API",
      "Reading PDF files",
    ],
    answer: 1,
    explanation:
      "ChromaDB is a vector database: it stores chunk embeddings and finds the chunks most similar to a query.",
  },
  {
    question: "When a user asks a question, what happens to it first?",
    options: [
      "It is sent straight to SENOPATI",
      "It is turned into a vector to search ChromaDB",
      "It is saved to the .env file",
      "It is split into chunks",
    ],
    answer: 1,
    explanation:
      "The question is converted into a vector, then ChromaDB finds the chunks whose vectors are closest to it.",
  },
  {
    question: "Which library provides PyPDFLoader?",
    options: [
      "langchain-community",
      "sentence-transformers",
      "python-multipart",
      "chromadb",
    ],
    answer: 0,
    explanation:
      "PyPDFLoader comes from langchain-community (and relies on pypdf as the underlying PDF engine).",
  },
  {
    question: "Which library provides the embedding model all-MiniLM-L6-v2?",
    options: ["pypdf", "sentence-transformers", "fastapi", "uvicorn"],
    answer: 1,
    explanation:
      "sentence-transformers provides all-MiniLM-L6-v2, which runs locally and needs no API key.",
  },
  {
    question: "When does the ~90 MB embedding model get downloaded?",
    options: [
      "During pip install",
      "The first time it is actually used",
      "Every time the server starts",
      "Only when you upload a PDF larger than 90 MB",
    ],
    answer: 1,
    explanation:
      "The model downloads on first use (not during install), so an internet connection is needed the first time you run it.",
  },
  {
    question: "Why is python-multipart required?",
    options: [
      "To connect to SENOPATI",
      "So FastAPI can accept file uploads",
      "To split text into chunks",
      "To store vectors",
    ],
    answer: 1,
    explanation:
      "FastAPI needs python-multipart to handle multipart form data, which is how the PDF file upload is sent.",
  },
];

export const modul4Quiz: QuizQuestion[] = [
  {
    question: "What are the three parts of the RAG pipeline, in order?",
    options: [
      "Store, retrieve, generation",
      "Generation, store, retrieve",
      "Retrieve, generation, store",
      "Upload, train, deploy",
    ],
    answer: 0,
    explanation:
      "We build it as store (save the PDF), retrieve (find relevant chunks), then generation (feed them to the LLM).",
  },
  {
    question: "What does process_pdf() return?",
    options: [
      "The full text of the PDF",
      "The number of chunks successfully stored",
      "A list of vectors",
      "The SENOPATI response",
    ],
    answer: 1,
    explanation:
      "process_pdf() returns the count of chunks it stored in ChromaDB, which the /upload endpoint reports back.",
  },
  {
    question: "Why is the uploaded PDF written to a temporary file?",
    options: [
      "To back it up permanently",
      "Because PyPDFLoader needs a file path to read from",
      "To compress it",
      "To send it to SENOPATI",
    ],
    answer: 1,
    explanation:
      "PyPDFLoader reads from a path, so the uploaded bytes are written to a temp file (then deleted in the finally block).",
  },
  {
    question: "What does chunk_overlap=50 accomplish?",
    options: [
      "It deletes 50 characters from each chunk",
      "It repeats the last 50 characters of the previous chunk so context isn't lost at the boundary",
      "It limits the document to 50 chunks",
      "It sets the embedding dimension to 50",
    ],
    answer: 1,
    explanation:
      "Overlap repeats the previous chunk's last 50 characters at the start of the next, so sentences split at a boundary keep their context.",
  },
  {
    question: "What does has_documents() check?",
    options: [
      "Whether the .env file exists",
      "Whether ChromaDB already has stored documents (count > 0)",
      "Whether the user is logged in",
      "Whether SENOPATI is reachable",
    ],
    answer: 1,
    explanation:
      "has_documents() returns True when the ChromaDB collection contains at least one stored chunk.",
  },
  {
    question: "In retrieve(), what does the top_k parameter control?",
    options: [
      "The chunk size",
      "How many of the most similar chunks to return",
      "The number of PDFs allowed",
      "The SENOPATI temperature",
    ],
    answer: 1,
    explanation:
      "top_k sets how many of the closest-matching chunks retrieve() returns (default 3).",
  },
  {
    question: "Why does retrieve() use min(top_k, collection.count())?",
    options: [
      "To make retrieval faster",
      "To avoid an error when there are fewer chunks than top_k",
      "To skip empty chunks",
      "To sort the results",
    ],
    answer: 1,
    explanation:
      "Using min() prevents requesting more results than exist, which would otherwise cause an error on small documents.",
  },
  {
    question: "When documents are stored, what does the chat function do?",
    options: [
      "Ignores the documents",
      "Retrieves relevant chunks and inserts them into the prompt (RAG mode)",
      "Retrains the model",
      "Deletes the collection",
    ],
    answer: 1,
    explanation:
      "In RAG mode, chat() calls retrieve(), adds the chunks as context, then asks SENOPATI to answer using that context.",
  },
  {
    question: "What happens when no documents have been uploaded yet?",
    options: [
      "The server crashes",
      "The chatbot falls back to a plain prompt (fallback mode)",
      "It uploads a default PDF",
      "It returns an empty answer",
    ],
    answer: 1,
    explanation:
      "With no stored documents, chat() uses the plain personality prompt, the normal chatbot behaviour (fallback mode).",
  },
  {
    question: "How are the retrieved chunks combined before going into the prompt?",
    options: [
      "Joined into one string separated by blank lines",
      "Averaged into a single vector",
      "Sent as separate API calls",
      "Stored back into ChromaDB",
    ],
    answer: 0,
    explanation:
      'retrieve() joins the chunks with "\\n\\n".join(chunks), producing one context string separated by blank lines.',
  },
];

export const modul5Quiz: QuizQuestion[] = [
  {
    question: "Which files make up the finished project?",
    options: [
      "only main.py",
      "main.py, rag.py, index.html, .env (plus chroma_db, created automatically)",
      "index.html and style.css",
      "app.py and requirements.txt",
    ],
    answer: 1,
    explanation:
      "The project is main.py, rag.py, index.html, and .env; the chroma_db/ folder is created automatically on the first upload.",
  },
  {
    question: "How do you clear the knowledge base to start fresh?",
    options: [
      "Restart the computer",
      "Delete the chroma_db folder",
      "Delete main.py",
      "Remove the API key",
    ],
    answer: 1,
    explanation:
      "Stop the server and delete the chroma_db/ folder; it is recreated automatically the next time you upload a PDF.",
  },
  {
    question: "A ModuleNotFoundError usually means…",
    options: [
      "Your API key is wrong",
      "A required library is not installed",
      "The PDF is too large",
      "Port 8000 is busy",
    ],
    answer: 1,
    explanation:
      "ModuleNotFoundError means a dependency is missing, so re-run the pip install commands from the setup steps.",
  },
  {
    question: "The app seems frozen on the first upload. The most likely reason is…",
    options: [
      "The ~90 MB embedding model is downloading",
      "SENOPATI is offline",
      "The PDF has too many pages",
      "ChromaDB is corrupted",
    ],
    answer: 0,
    explanation:
      "On first use, sentence-transformers downloads the ~90 MB model. Wait for it to finish and ensure you have internet.",
  },
  {
    question: 'The error "File must be a PDF" means…',
    options: [
      "The PDF is password protected",
      "You uploaded a file that isn't a PDF",
      "ChromaDB is full",
      "The API key expired",
    ],
    answer: 1,
    explanation:
      "The /upload endpoint checks the content type and rejects anything that isn't a real .pdf file.",
  },
  {
    question: "If answers ignore the PDF content, the likely cause is…",
    options: [
      "No documents were stored, or retrieval found nothing useful",
      "The browser cache",
      "The wrong SENOPATI model",
      "A missing index.html",
    ],
    answer: 0,
    explanation:
      "If nothing was uploaded (or retrieval found no good match), there is no context, so the model answers from general knowledge. Upload first and rephrase the question.",
  },
  {
    question: 'An "Address already in use" error on port 8000 means…',
    options: [
      "Another server is already running on that port",
      "The PDF is locked",
      "The API key is invalid",
      "ChromaDB needs an upgrade",
    ],
    answer: 0,
    explanation:
      "Port 8000 is taken by another process. Stop that process, or change the port in uvicorn.run.",
  },
  {
    question: "Which is one of the suggested extension challenges?",
    options: [
      "Show the source page numbers used for each answer",
      "Remove the .env file",
      "Disable retrieval entirely",
      "Switch from Python to Java",
    ],
    answer: 0,
    explanation:
      "Showing source page numbers (citations) is a suggested extension, making each answer traceable to the PDF.",
  },
  {
    question: "Which temporary file did you use to test retrieval on its own?",
    options: ["viewer.py", "test_retrieve.py", "rag.py", "setup.py"],
    answer: 1,
    explanation:
      "test_retrieve.py lets you call retrieve() directly from the terminal before wiring it into the chatbot.",
  },
  {
    question: "Which is a valid completion criterion before the demo?",
    options: [
      "The chatbot loads and indexes a document without errors",
      "The code uses no functions",
      "The PDF is larger than 100 MB",
      "The API key is printed to the screen",
    ],
    answer: 0,
    explanation:
      "A finished project should index a document cleanly, give relevant answers, and be runnable again from scratch.",
  },
];
