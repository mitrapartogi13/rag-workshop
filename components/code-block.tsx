"use client";

import { useMemo, useState } from "react";
import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "@/components/icons";

type CodeBlockProps = {
  code: string;
  lang?: string;
  /** Optional label shown in the top bar; defaults to the language name. */
  filename?: string;
};

/**
 * Dark code preview in the Tailwind/Shiki style: a thin top bar carrying the
 * language badge and a copy button, with syntax-highlighted body below.
 */
export function CodeBlock({ code, lang = "text", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlight(code.trimEnd(), lang), [code, lang]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code.trimEnd());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. non-secure context); fail quietly.
    }
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-700/60 bg-slate-800/40 px-4 py-2">
        <span className="font-mono text-xs font-medium text-slate-400">
          {filename ?? lang}
        </span>
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            copied
              ? "text-emerald-400"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
          )}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[0.8125rem] leading-relaxed">
        <code
          className="font-mono text-slate-200"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}
