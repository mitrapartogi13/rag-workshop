import type { ReactNode } from "react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

/**
 * Section headings that auto-generate an anchor id from their text. The id is
 * what the "On this page" sidebar links to, and the hover `#` affordance
 * mirrors the Tailwind docs.
 *
 * Children are intentionally typed as `string` so the slug and the visible
 * text always stay in sync.
 */

function AnchoredHeading({
  level,
  children,
}: {
  level: 2 | 3;
  children: string;
}) {
  const id = slugify(children);
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="group scroll-mt-24">
      {children}
      <a
        href={`#${id}`}
        className="ml-2 font-normal text-slate-300 no-underline opacity-0 transition-opacity hover:text-sky-500 group-hover:opacity-100"
        aria-label={`Direct link to section "${children}"`}
      >
        #
      </a>
    </Tag>
  );
}

export function H2({ children }: { children: string }) {
  return <AnchoredHeading level={2}>{children}</AnchoredHeading>;
}

export function H3({ children }: { children: string }) {
  return <AnchoredHeading level={3}>{children}</AnchoredHeading>;
}

/**
 * A simple bordered card grid for linking out to related pages. Flat borders
 * and a quiet hover tint, deliberately not a glowing gradient card.
 */
export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">{children}</div>
  );
}

/**
 * A captioned figure for the screenshots and diagrams pulled from the source
 * material. Uses a plain <img> (these are remote documentation assets of
 * varying sizes) wrapped in a thin border, optionally capped so small UI
 * snippets are not upscaled into blur.
 */
export function Figure({
  src,
  alt,
  caption,
  maxWidth,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: number;
}) {
  return (
    <figure className="not-prose my-6">
      <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto block h-auto w-full"
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Card({
  title,
  description,
  href,
  eyebrow,
}: {
  title: string;
  description: string;
  href: string;
  eyebrow?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-slate-200 p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {eyebrow}
        </span>
      ) : null}
      <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-sky-600">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}
