import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3, Figure } from "@/components/content";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { modul3Quiz } from "@/lib/quizzes";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Module 3: Understanding RAG",
};

export default function Modul3Page() {
  return (
    <DocArticle
      href="/modul-3"
      eyebrow="Workshop Modules"
      title="Module 3: Understanding RAG"
      lead="The ideas behind a document-aware chatbot — chunking, embeddings, and vector stores — plus the libraries we need before we start coding."
    >
      <Figure
        src="https://github.com/user-attachments/assets/43cf4a65-725f-4db6-9d04-5441fabf486b"
        alt="Illustration of a RAG chatbot answering questions based on a document."
      />
      <p>
        In this part we will upgrade the chatbot from Module 2 so it can{" "}
        <strong>read and understand the contents of a PDF</strong>. After the
        upgrade, a user can upload a PDF (for example an academic handbook, a
        lecture module, or a paper) and the chatbot will answer questions based
        on that PDF.
      </p>
      <p>
        We will build it <strong>step by step</strong> — not all at once — so each
        part can be understood and tested before moving on to the next.
      </p>

      <H2>Core Concepts to Understand</H2>
      <p>
        Before we start coding, let&apos;s understand the three main processes
        behind RAG.
      </p>

      <H3>1. Chunking (Splitting the Document)</H3>
      <p>
        A PDF can be very long. An LLM cannot read the entire document at once
        because there is a limit to how much text it can process. The solution:
        split the document into <strong>chunks</strong> (small pieces) of about
        ~500 characters, and store each chunk separately.
      </p>
      <CodeBlock
        lang="text"
        code={`[PDF Page 1] ->  [Chunk 1: "Chapter 1. Introduction..."]
                 [Chunk 2: "...definition of an algorithm..."]
                 [Chunk 3: "...time complexity..."]
[PDF Page 2] ->  [Chunk 4: "Chapter 2. Sorting..."]
                 ...`}
      />

      <H3>2. Embedding (Turning Text into Numbers)</H3>
      <p>
        A computer cannot directly compare two sentences to know which ones are
        &quot;similar&quot;. So each chunk is turned into a{" "}
        <strong>vector</strong> (a list of numbers) using an embedding model.
        Chunks with similar topics produce vectors that are mathematically close
        to each other.
      </p>
      <CodeBlock
        lang="text"
        code={`"sorting algorithm"     -> [0.12, -0.45, 0.87, ...]   <-- close (similar)
"data ordering method"  -> [0.14, -0.43, 0.85, ...]   <-- close (similar)
"fried rice recipe"     -> [-0.91, 0.23, -0.12, ...]  <-- far (not similar)`}
      />

      <H3>3. Vector Store (Vector Database)</H3>
      <p>
        All the vectors from every chunk are stored in <strong>ChromaDB</strong>,
        a database built for storing vectors. When a user asks a question, the
        question is also turned into a vector, and ChromaDB finds the chunks whose
        vectors are closest (most relevant) to that question.
      </p>

      <H3>The Complete RAG Flow</H3>
      <CodeBlock
        lang="text"
        code={`[WHEN UPLOADING A PDF]
PDF -> split into chunks -> each chunk becomes a vector -> store in ChromaDB

[WHEN THE USER CHATS]
User question -> turn into a vector -> find the most similar chunks in ChromaDB
-> combine chunks into the prompt -> send to Gemini -> answer`}
      />

      <H2>Final File Structure</H2>
      <p>After all the steps are done, your project folder will contain:</p>
      <CodeBlock
        lang="text"
        code={`Materi 3/
├── main.py          <- backend (modified)
├── rag.py           <- RAG logic (new file)
├── index.html       <- frontend (modified)
├── .env             <- API key (unchanged)
└── chroma_db/       <- vector database folder (created automatically)`}
      />

      <H2>Install the Additional Libraries</H2>
      <p>Run the following command in your project folder:</p>
      <CodeBlock
        lang="bash"
        code={`pip install langchain-community langchain-text-splitters pypdf chromadb sentence-transformers python-multipart`}
      />
      <p>A short explanation of each library:</p>
      <table>
        <thead>
          <tr>
            <th>Library</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>langchain-community</code>
            </td>
            <td>
              Provides <code>PyPDFLoader</code> for reading PDF files.
            </td>
          </tr>
          <tr>
            <td>
              <code>langchain-text-splitters</code>
            </td>
            <td>
              Provides <code>RecursiveCharacterTextSplitter</code> for splitting
              text into chunks.
            </td>
          </tr>
          <tr>
            <td>
              <code>pypdf</code>
            </td>
            <td>
              Required by <code>PyPDFLoader</code> as the PDF reading engine.
            </td>
          </tr>
          <tr>
            <td>
              <code>chromadb</code>
            </td>
            <td>The vector database that stores chunk embeddings.</td>
          </tr>
          <tr>
            <td>
              <code>sentence-transformers</code>
            </td>
            <td>
              The <code>all-MiniLM-L6-v2</code> embedding model (runs locally, no
              API key needed).
            </td>
          </tr>
          <tr>
            <td>
              <code>python-multipart</code>
            </td>
            <td>Required by FastAPI to accept file uploads.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="note" title="First-run download">
        The <code>sentence-transformers</code> library will download an AI model
        of about ~90&nbsp;MB the <strong>first time it is used</strong> (not
        during install). Make sure you have an internet connection the first time
        you run the server.
      </Callout>

      <Callout type="tip" title="Next up">
        Now that you understand the pieces, let&apos;s build them. Continue to{" "}
        <a href="/modul-4">Module 4: Building the RAG Pipeline</a>.
      </Callout>
      <H2>Mini Quiz</H2>
      <p>
        Test your understanding of this module. Pick an answer to get instant
        feedback, then see your score at the end — you can redo the quiz anytime.
      </p>
      <Quiz questions={modul3Quiz} />
    </DocArticle>
  );
}
