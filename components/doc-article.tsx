import type { ReactNode } from "react";
import { getAdjacentPages } from "@/lib/nav";
import { Pagination } from "@/components/pagination";

type DocArticleProps = {
  /** Current route — used to compute prev/next pagination. */
  href: string;
  /** Small category label above the title. */
  eyebrow?: string;
  title: string;
  /** Intro sentence rendered larger than body copy. */
  lead?: string;
  children: ReactNode;
};

/**
 * Shared page chrome: eyebrow + title + lead, the prose body, and the
 * previous/next footer. The long list of `prose-*` modifiers reproduces the
 * Tailwind docs reading experience — slate-900 headings, slate-700 body,
 * sky links, and quiet inline code without backtick pseudo-elements.
 */
export function DocArticle({
  href,
  eyebrow,
  title,
  lead,
  children,
}: DocArticleProps) {
  const { prev, next } = getAdjacentPages(href);

  return (
    <article className="py-10 xl:py-12">
      <header className="mb-8">
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold text-sky-600">{eyebrow}</p>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 text-lg leading-7 text-slate-600">{lead}</p>
        ) : null}
      </header>

      <div
        className="
          prose prose-slate max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900
          prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2 prose-h2:text-xl
          prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg
          prose-p:text-slate-700 prose-p:leading-7
          prose-li:text-slate-700 prose-li:my-1
          prose-a:font-medium prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:font-semibold prose-strong:text-slate-900
          prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-medium prose-code:text-slate-800
          prose-code:before:content-none prose-code:after:content-none
        "
      >
        {children}
      </div>

      <Pagination prev={prev} next={next} />
    </article>
  );
}
