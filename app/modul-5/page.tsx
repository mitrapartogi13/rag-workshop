import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3 } from "@/components/content";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { modul5Quiz } from "@/lib/quizzes";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Module 5: Hands-on Session",
};

export default function Modul5Page() {
  return (
    <DocArticle
      href="/modul-5"
      eyebrow="Workshop Modules"
      title="Module 5: Hands-on Session"
      lead="Your turn. Build, run, and demo your own document-aware chatbot end to end, with a recap of the moving parts, common errors, and challenges to push further.">
      <p>
        This is the practical session. Instead of reading along, you will{" "}
        <strong>build</strong>. The goal is clear: by the end, you have a
        working RAG chatbot that answers questions based on a document of your
        choice.
      </p>

      <Callout type="note" title="Session format">
        This module is hands-on. Open your editor and follow each step yourself.
        The facilitator will move around to help if you get stuck.
      </Callout>

      <H2>What You Are Building</H2>
      <p>Your application should be able to:</p>
      <ul>
        <li>Accept a PDF upload from the user.</li>
        <li>Automatically build a knowledge base from that document.</li>
        <li>Answer questions in natural language, grounded in the PDF.</li>
        <li>Fall back to a normal chatbot when no document is uploaded.</li>
      </ul>

      <H3>The moving parts</H3>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Role</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>main.py</code>
            </td>
            <td>FastAPI server: serves the UI, /upload and /chat endpoints.</td>
            <td>Modules 2 &amp; 4</td>
          </tr>
          <tr>
            <td>
              <code>rag.py</code>
            </td>
            <td>RAG logic: process_pdf, has_documents, retrieve.</td>
            <td>Module 4</td>
          </tr>
          <tr>
            <td>
              <code>index.html</code>
            </td>
            <td>Chat + upload front-end.</td>
            <td>Module 2</td>
          </tr>
          <tr>
            <td>
              <code>.env</code>
            </td>
            <td>Stores your SENOPATI_API_KEY and gateway settings.</td>
            <td>Module 2</td>
          </tr>
          <tr>
            <td>
              <code>chroma_db/</code>
            </td>
            <td>Vector database (created automatically).</td>
            <td>Module 4</td>
          </tr>
        </tbody>
      </table>

      <H2>Step-by-Step Recap</H2>
      <p>If you are starting fresh, here is the whole flow condensed:</p>
      <ol>
        <li>
          Create the project folder and the <code>.env</code> file with your
          SENOPATI API key (<a href="/modul-2">Module 2</a>).
        </li>
        <li>Install all dependencies:</li>
      </ol>
      <CodeBlock
        lang="bash"
        code={`pip install fastapi uvicorn requests pydantic python-dotenv
pip install langchain-community langchain-text-splitters pypdf chromadb sentence-transformers python-multipart`}
      />
      <ol start={3}>
        <li>
          Add <code>main.py</code>, <code>rag.py</code>, and{" "}
          <code>index.html</code> (<a href="/modul-4">Module 4</a>).
        </li>
        <li>Run the server and open the app:</li>
      </ol>
      <CodeBlock lang="bash" code={`python main.py`} />
      <ol start={5}>
        <li>Upload a PDF, then start asking questions about it.</li>
      </ol>

      <H2>Try It Yourself</H2>
      <p>Work through these tasks to confirm your RAG system really works:</p>
      <ul>
        <li>
          Upload a PDF of your choice: a handbook, lecture notes, or a short
          paper.
        </li>
        <li>
          Ask <strong>three questions</strong> that can be answered from the
          PDF, and check that the answers match the document.
        </li>
        <li>
          Ask <strong>one question that is not</strong> in the PDF, and observe
          how the model responds.
        </li>
        <li>
          Delete the <code>chroma_db/</code> folder, restart, and confirm the
          chatbot falls back to normal (non-RAG) mode.
        </li>
      </ul>
      <Callout type="tip" title="Start fresh">
        To clear your knowledge base, stop the server and delete the{" "}
        <code>chroma_db/</code> folder (Windows: delete it in File Explorer;
        macOS/Linux: <code>rm -rf chroma_db</code>). It will be recreated on the
        next upload.
      </Callout>

      <H2>Troubleshooting</H2>
      <p>
        The most common issues during the hands-on session, and how to fix them:
      </p>
      <table>
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Likely cause</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>ModuleNotFoundError</code>
            </td>
            <td>A library is not installed.</td>
            <td>Re-run the pip install commands above.</td>
          </tr>
          <tr>
            <td>App seems frozen on first upload/chat</td>
            <td>The ~90&nbsp;MB embedding model is downloading.</td>
            <td>Wait for the first-run download; ensure internet is on.</td>
          </tr>
          <tr>
            <td>
              <code>Internal Error</code> about the API key
            </td>
            <td>Missing or wrong SENOPATI_API_KEY.</td>
            <td>
              Check <code>.env</code> (no quotes, no spaces) and that the key is
              valid.
            </td>
          </tr>
          <tr>
            <td>&quot;File must be a PDF&quot;</td>
            <td>You uploaded a non-PDF file.</td>
            <td>
              Upload a real <code>.pdf</code> file.
            </td>
          </tr>
          <tr>
            <td>Answers ignore the PDF</td>
            <td>No documents stored, or retrieval found nothing useful.</td>
            <td>
              Upload first; rephrase the question to match the PDF wording.
            </td>
          </tr>
          <tr>
            <td>
              <code>Address already in use</code> (port 8000)
            </td>
            <td>Another server is still running.</td>
            <td>Stop the other process, or change the port in uvicorn.run.</td>
          </tr>
        </tbody>
      </table>

      <H2>Extension Challenges</H2>
      <p>
        This is the core of the hands-on session, not optional bonus work.
        Pick <strong>at least two</strong> challenges and implement them in
        your own project; mix an easy one with a harder one if you are unsure
        where to start.
      </p>
      <table>
        <thead>
          <tr>
            <th>Challenge</th>
            <th>Difficulty</th>
            <th>~Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Change the persona.</strong> Replace the Competitive
              Programming personality with one that fits your own use case.
            </td>
            <td>Easy</td>
            <td>10 to 15 min</td>
          </tr>
          <tr>
            <td>
              <strong>Add a reset button.</strong> Create a{" "}
              <code>/reset</code> endpoint that clears the ChromaDB collection
              without deleting files manually.
            </td>
            <td>Easy</td>
            <td>15 to 20 min</td>
          </tr>
          <tr>
            <td>
              <strong>Tune retrieval.</strong> Experiment with{" "}
              <code>chunk_size</code>, <code>chunk_overlap</code>, and{" "}
              <code>top_k</code> and observe how the answers change.
            </td>
            <td>Medium</td>
            <td>20 to 30 min</td>
          </tr>
          <tr>
            <td>
              <strong>Show sources.</strong> Return the page numbers of the
              chunks used, so each answer can be traced back to the PDF.
            </td>
            <td>Medium</td>
            <td>25 to 35 min</td>
          </tr>
          <tr>
            <td>
              <strong>Multiple documents.</strong> Allow uploading several
              PDFs and searching across all of them.
            </td>
            <td>Hard</td>
            <td>30 to 45 min</td>
          </tr>
        </tbody>
      </table>
      <p>
        Already used the viewer in Module 4? Re-run it after each challenge to
        confirm your changes actually affected what is stored or retrieved.
      </p>

      <H2>Completion Checklist</H2>
      <p>Before the demo, make sure your project meets these criteria:</p>
      <ul>
        <li>The chatbot loads and indexes a document without errors.</li>
        <li>Answers are relevant to the contents of the document.</li>
        <li>
          The bot behaves reasonably when the information is not in the
          document.
        </li>
        <li>The code is tidy and can be run again from scratch.</li>
      </ul>

      <Callout type="note" title="Congratulations!">
        You have completed the workshop, from understanding LLMs and knowledge
        injection all the way to a working, document-aware RAG chatbot. Keep
        experimenting and build something useful!
      </Callout>
      <H2>Mini Quiz</H2>
      <p>
        A final check before you go. Pick an answer to get instant feedback,
        then see your score at the end. You can redo the quiz anytime.
      </p>
      <Quiz questions={modul5Quiz} />
    </DocArticle>
  );
}
