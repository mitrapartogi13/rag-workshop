"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

/**
 * Right-hand "On this page" table of contents.
 *
 * Rather than threading heading metadata through props, we read the rendered
 * DOM after each navigation; every H2/H3 emitted by the content components
 * carries an id, so we collect those and track which section is currently in
 * view with a lightweight scroll listener.
 */
export function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]")
    );

    setHeadings(
      nodes.map((node) => ({
        id: node.id,
        text: node.textContent?.replace(/#$/, "").trim() ?? "",
        level: node.tagName === "H3" ? 3 : 2,
      }))
    );

    function onScroll() {
      let current = "";
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= 120) {
          current = node.id;
        }
      }
      setActiveId(current || (nodes[0]?.id ?? ""));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        On this page
      </h2>
      <ul className="space-y-2 border-l border-slate-200 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(heading.level === 3 && "ml-3")}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l py-0.5 pl-4 transition-colors",
                activeId === heading.id
                  ? "border-sky-500 font-medium text-sky-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
