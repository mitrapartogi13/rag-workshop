import { DocArticle } from "@/components/doc-article";
import { H2, H3, CardGrid, Card } from "@/components/content";
import { Callout } from "@/components/callout";

export default function HomePage() {
  return (
    <DocArticle
      href="/"
      eyebrow="Getting Started"
      title="Welcome to the RAG Workshop👋"
      lead="A hands-on guide to building an AI chatbot that can read your own documents, starting from how Large Language Models work, all the way to a working Retrieval-Augmented Generation (RAG) application powered by SENOPATI."
    >
      <p>
        This is the official material for the <strong>AI / RAG Workshop</strong>{" "}
        delivered by Algorithm and Programming Lab. Every section is designed to be followed in order
        during the live session, while also serving as a reference you can
        revisit afterwards.
      </p>
      <p>
        By the end of the workshop you will have built a real{" "}
        <strong>document-aware chatbot</strong>: upload a PDF (for example an
        academic handbook or a lecture module) and ask questions about it in
        plain language and get answers grounded in that document.
      </p>

      <Callout type="note" title="What you will build">
        A small <strong>FastAPI</strong> web application with a chat interface,
        connected to <strong>SENOPATI</strong>, that upgrades step by step
        into a full RAG system using <strong>ChromaDB</strong> and a local
        embedding model.
      </Callout>

      <H2>What is RAG?</H2>
      <p>
        <strong>Retrieval-Augmented Generation</strong> is a technique that
        improves a Large Language Model by feeding it extra knowledge from an
        external source at the moment it answers. Instead of relying only on what
        the model &quot;memorised&quot; during training, RAG first{" "}
        <em>retrieves</em> the most relevant pieces of your documents and adds
        them to the prompt as context, so the model can <em>generate</em> a
        grounded answer.
      </p>
      <p>This makes answers:</p>
      <ul>
        <li>
          <strong>More factual</strong> — based on real documents instead of the
          model&apos;s best guess.
        </li>
        <li>
          <strong>Easy to update</strong> — just change the source documents, no
          retraining required.
        </li>
        <li>
          <strong>Traceable</strong> — every answer can be linked back to its
          source.
        </li>
      </ul>

      <H2>What You Will Learn</H2>
      <table>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Understand LLMs</td>
            <td>
              Know what an LLM is and the three ways to inject knowledge into it:
              prompt engineering, RAG, and fine-tuning.
            </td>
          </tr>
          <tr>
            <td>Build a chatbot</td>
            <td>
              Connect to the SENOPATI API and serve a chat UI with FastAPI.
            </td>
          </tr>
          <tr>
            <td>Understand RAG</td>
            <td>
              Explain chunking, embeddings, and the role of a vector database.
            </td>
          </tr>
          <tr>
            <td>Implement RAG</td>
            <td>
              Store PDF content in ChromaDB, retrieve relevant chunks, and feed
              them to the model.
            </td>
          </tr>
          <tr>
            <td>Ship a project</td>
            <td>
              Build, test, and demo your own document-aware chatbot end to end.
            </td>
          </tr>
        </tbody>
      </table>

      <H2>Who Is This For?</H2>
      <p>
        The workshop is designed to be approachable, but it will feel most
        comfortable if you:
      </p>
      <ul>
        <li>
          Know the basics of <strong>Python</strong> (variables, functions,
          lists, and dictionaries).
        </li>
        <li>
          Are curious about how tools like ChatGPT, Gemini, and Claude work
          behind the scenes.
        </li>
        <li>
          Want to make an AI assistant answer questions from your own documents.
        </li>
      </ul>

      <H3>Helpful, but not required</H3>
      <ul>
        <li>Basic familiarity with APIs and the JSON format.</li>
        <li>Some experience running a web server or using the terminal.</li>
      </ul>

      <H2>Workshop Modules</H2>
      <p>
        The material is split into five modules that build on each other. Start
        with Module 1 and follow them in order for the best experience.
      </p>

      <CardGrid>
        <Card
          eyebrow="Module 1"
          title="LLM & Knowledge Injection"
          description="How LLMs work, plus prompt engineering, RAG, and fine-tuning."
          href="/modul-1"
        />
        <Card
          eyebrow="Module 2"
          title="Building a Chatbot with SENOPATI"
          description="Get a SENOPATI API key and serve a chat app with FastAPI."
          href="/modul-2"
        />
        <Card
          eyebrow="Module 3"
          title="Understanding RAG"
          description="Chunking, embeddings, and vector stores — the ideas behind RAG."
          href="/modul-3"
        />
        <Card
          eyebrow="Module 4"
          title="Building the RAG Pipeline"
          description="Store, retrieve, and generate: turn the chatbot into a RAG system."
          href="/modul-4"
        />
        <Card
          eyebrow="Module 5"
          title="Hands-on Session"
          description="Build and demo your own document-aware chatbot, with troubleshooting tips."
          href="/modul-5"
        />
      </CardGrid>
    </DocArticle>
  );
}
