import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2, H3, Figure } from "@/components/content";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { modul1Quiz } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Module 1: LLM & Knowledge Injection",
};

export default function Modul1Page() {
  return (
    <DocArticle
      href="/modul-1"
      eyebrow="Workshop Modules"
      title="Module 1: LLM & Knowledge Injection"
      lead="Understand what a Large Language Model is, and the three main ways to give it new knowledge — the foundation for everything we build later.">
      <H2>Introduction to LLMs</H2>
      <p>
        Do you know ChatGPT, Gemini, and Claude? These are all examples of{" "}
        <strong>Large Language Models</strong> (LLMs). An LLM is an artificial
        intelligence model designed to understand and generate human-like text.
        It works by <em>predicting the next word</em> in a sequence based on the
        data it was trained on.
      </p>
      <p>
        LLMs range from <em>proprietary</em> ones like ChatGPT, Gemini, and
        Claude, to <em>open-source</em> ones like Llama, Mistral, and Qwen. In
        this workshop we will build a simple chatbot using an LLM.
      </p>

      <H2>Knowledge Injection</H2>
      <p>
        Before building a chatbot, we need to understand the concept of{" "}
        <strong>knowledge injection</strong> — a set of techniques for giving an
        LLM additional knowledge to improve how it understands and generates
        text. There are three main types:
      </p>
      <ul>
        <li>Prompt Engineering</li>
        <li>Retrieval-Augmented Generation (RAG)</li>
        <li>Fine-tuning</li>
      </ul>

      <H3>Prompt Engineering</H3>
      <p>
        Prompt engineering is the simplest form of knowledge injection: you give
        the LLM instructions (and sometimes context) so it produces the output
        you want.
      </p>
      <p>
        The easiest way to demonstrate this is to ask about a specific
        curriculum rule that is probably <em>not</em> in the LLM&apos;s general
        training data.
      </p>

      <p>
        <strong>1. Without knowledge injection (a plain prompt)</strong>
      </p>
      <Figure
        src="/plain-prompt.jpeg"
        alt="An LLM answering a curriculum question without injected context, giving a vague or generic response."
        caption="Without injected context, the model can only give a vague, generic answer."
        maxWidth={721}
      />

      <p>
        <strong>2. With knowledge injection (via prompt context)</strong>
      </p>
      <p>
        By providing context inside the prompt, we inject new knowledge into the
        LLM&apos;s &quot;short-term memory&quot;.
      </p>
      <blockquote>
        <p>
          <strong>User:</strong> &quot;2023 Curriculum context: &lsquo;The
          Advanced Programming course (IF234201) can be taken if a student has
          passed Introduction to Programming with a minimum grade of C and is
          currently taking or has taken Data Structures.&rsquo; Based on the
          context above, what are the prerequisites for taking Advanced
          Programming?&quot;
        </p>
        <p>
          <strong>LLM:</strong> &quot;Based on the 2023 Curriculum context
          provided, the prerequisites are: having passed Introduction to
          Programming with a minimum grade of C, and currently taking or having
          taken Data Structures.&quot;
        </p>
      </blockquote>

      <p>
        There are several <em>n-shot prompting</em> techniques (providing
        examples inside the prompt) to steer the LLM toward a specific output
        pattern:
      </p>

      <H3>Zero-shot Prompting</H3>
      <p>
        A technique where we provide <strong>no examples at all</strong> and
        directly give the instruction or question. The LLM is expected to answer
        based on the language understanding it learned during training.
      </p>
      <blockquote>
        <p>
          <strong>User:</strong> &quot;Determine the sentiment of the following
          sentence: &lsquo;The service at this restaurant was very satisfying
          and the food was delicious.&rsquo;&quot;
        </p>
        <p>
          <strong>LLM:</strong> &quot;The sentiment of the sentence is
          Positive.&quot;
        </p>
      </blockquote>

      <H3>One-shot Prompting</H3>
      <p>
        A technique where we provide <strong>one example</strong> (an input with
        its expected output) before the real task. This helps the LLM understand
        the specific format or answer pattern we want.
      </p>
      <blockquote>
        <p>
          <strong>User:</strong>
          <br />
          Text: &quot;This movie was very boring and the plot was slow.&quot;
          <br />
          Sentiment: Negative
          <br />
          <br />
          Text: &quot;I really like the design of this latest app
          interface.&quot;
          <br />
          Sentiment:
        </p>
        <p>
          <strong>LLM:</strong> &quot;Positive&quot;
        </p>
      </blockquote>

      <H3>Few-shot Prompting</H3>
      <p>
        A technique where we provide <strong>several examples</strong> (usually
        2 to 5 or more). This is highly recommended for tasks with complex
        patterns, or when we want the LLM to adopt an unusual format or
        classification style.
      </p>
      <blockquote>
        <p>
          <strong>User:</strong>
          <br />
          Review: &quot;The battery drains fast, I regret it.&quot; =&gt;
          Category: Hardware
          <br />
          Review: &quot;The app often crashes when opened.&quot; =&gt; Category:
          Software
          <br />
          Review: &quot;The power button is a bit stiff to press.&quot; =&gt;
          Category: Hardware
          <br />
          Review: &quot;The screen loads very slowly after the update.&quot;
          =&gt; Category:
        </p>
        <p>
          <strong>LLM:</strong> &quot;Software&quot;
        </p>
      </blockquote>

      <H3>Retrieval-Augmented Generation (RAG)</H3>
      <p>
        RAG improves an LLM by dynamically giving it extra knowledge from an
        external database. It works by <em>retrieving</em> information from an
        external source (such as a PDF handbook, a thesis database, or a
        university website) and providing it to the LLM as context.
      </p>
      <Figure
        src="/rag-flow.webp"
        alt="Diagram of the Retrieval-Augmented Generation flow: a user question retrieves relevant data, which is combined into a prompt for the LLM."
        caption="The RAG flow: retrieve relevant data, combine it into the prompt, then let the LLM answer."
      />
      <p>
        <strong>Example RAG flow for a curriculum case:</strong>
      </p>
      <ol>
        <li>
          <strong>User asks:</strong> &quot;What are the prerequisites for
          taking the Web Programming course in Informatics Engineering?&quot;
        </li>
        <li>
          <strong>RAG system:</strong> searches for the keyword &quot;Web
          Programming&quot; in the latest curriculum PDF.
        </li>
        <li>
          <strong>Prompt assembly:</strong> the system combines the search
          result into a prompt —{" "}
          <em>
            &quot;Use the following information to answer: [Data from PDF: The
            Web Programming course (IF234202) can be taken if a student has
            passed Introduction to Programming with a minimum grade of C and is
            currently taking or has taken Data Structures]. Question: What are
            the prerequisites for taking Web Programming?&quot;
          </em>
        </li>
        <li>
          <strong>LLM answers:</strong> &quot;Based on the latest curriculum,
          the prerequisites for Web Programming are: having passed Introduction
          to Programming with a minimum grade of C, and currently taking or
          having taken Data Structures.&quot;
        </li>
      </ol>
      <Callout type="note" title="Without RAG">
        The LLM might instead answer:{" "}
        <em>
          &quot;I don&apos;t have specific information about the detailed 2023
          Informatics curriculum. Advanced courses usually require Algorithms
          and Data Structures, but please check the official academic handbook
          to be sure.&quot;
        </em>{" "}
        — helpful, but vague and not grounded in your document.
      </Callout>

      <H3>Fine-tuning</H3>
      <p>
        Fine-tuning improves an LLM by &quot;retraining&quot; part of the model
        using our own specific dataset. Unlike prompt engineering or RAG, which
        only provide &quot;short-term memory&quot; through context, fine-tuning{" "}
        <strong>permanently changes the model&apos;s neural weights</strong>{" "}
        (long-term memory) so it adopts a new style, format, or knowledge
        domain.
      </p>
      <p>
        <strong>Real-world industry examples:</strong>
      </p>
      <ul>
        <li>
          <strong>Legal / Medical assistants.</strong> General LLMs are good at
          summarising text but often imprecise with highly specific legal or
          medical jargon. Law firms and healthcare institutions fine-tune LLMs
          on hundreds of thousands of their own contracts or historical medical
          records. The result handles advanced terminology and produces drafts
          in the exact professional style of that organisation.
        </li>
        <li>
          <strong>Customer service with a brand persona.</strong> Large
          companies want their AI to answer with their own tone of voice, not
          like a stiff robot. They fine-tune on millions of chat logs from their
          best human agents, so the model naturally shows empathy and offers
          solutions in the company&apos;s standard style.
        </li>
      </ul>

      <H3>When to choose Fine-tuning over RAG?</H3>
      <p>
        Choose <strong>fine-tuning</strong> when you want to change the{" "}
        <em>language style, response format, or instill a certain pattern</em>{" "}
        in the LLM. Choose <strong>RAG</strong> when you simply need the LLM to{" "}
        <em>access up-to-date facts</em> (like schedules and curriculum rules)
        without the expense of retraining the model every term.
      </p>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Memory type</th>
            <th>Best for</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prompt Engineering</td>
            <td>Short-term (in-context)</td>
            <td>Quick instructions, formatting, examples</td>
            <td>Lowest</td>
          </tr>
          <tr>
            <td>RAG</td>
            <td>Short-term (retrieved context)</td>
            <td>Accessing up-to-date or private facts</td>
            <td>Medium</td>
          </tr>
          <tr>
            <td>Fine-tuning</td>
            <td>Long-term (model weights)</td>
            <td>Changing style, format, or domain instinct</td>
            <td>Highest</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="Next up">
        We will use <strong>prompt engineering</strong> first to build a working
        chatbot, then add <strong>RAG</strong> on top of it. Continue to{" "}
        <a href="/modul-2">Module 2: Building a Chatbot with SENOPATI</a>.
      </Callout>
      <H2>Mini Quiz</H2>
      <p>
        Test your understanding of this module. Pick an answer to get instant
        feedback, then see your score at the end — you can redo the quiz
        anytime.
      </p>
      <Quiz questions={modul1Quiz} />
    </DocArticle>
  );
}
