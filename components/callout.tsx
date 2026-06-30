import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutType = "note" | "tip" | "warning";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const STYLES: Record<
  CalloutType,
  { box: string; title: string; body: string; defaultTitle: string }
> = {
  note: {
    box: "border-sky-500 bg-sky-50/50",
    title: "text-sky-900",
    body: "text-sky-800",
    defaultTitle: "Note",
  },
  tip: {
    box: "border-emerald-500 bg-emerald-50/50",
    title: "text-emerald-900",
    body: "text-emerald-800",
    defaultTitle: "Tip",
  },
  warning: {
    box: "border-amber-500 bg-amber-50/50",
    title: "text-amber-900",
    body: "text-amber-800",
    defaultTitle: "Warning",
  },
};

/**
 * Tailwind-style alert: a thin left border, ultra-light tinted background,
 * and small text. No drop shadow, no rounded-3xl, just a quiet aside.
 */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const style = STYLES[type];
  return (
    <div
      className={cn(
        "not-prose my-6 rounded-r-md border-l-4 p-4 text-sm",
        style.box
      )}
    >
      <p className={cn("mb-1 font-semibold", style.title)}>
        {title ?? style.defaultTitle}
      </p>
      <div className={cn("leading-6 [&_a]:underline [&_code]:font-mono", style.body)}>
        {children}
      </div>
    </div>
  );
}
