import Link from "next/link";
import type { DocLink } from "@/lib/nav";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

/**
 * Previous / next links pinned to the bottom of each page, matching the
 * sequential reading flow of the Tailwind docs.
 */
export function Pagination({
  prev,
  next,
}: {
  prev: DocLink | null;
  next: DocLink | null;
}) {
  return (
    <nav className="mt-16 flex items-stretch justify-between gap-4 border-t border-slate-200 pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start gap-1 rounded-md text-sm"
        >
          <span className="text-xs font-medium text-slate-400">Previous</span>
          <span className="inline-flex items-center gap-1 font-medium text-slate-700 transition-colors group-hover:text-sky-600">
            <ChevronLeftIcon className="h-4 w-4" />
            {prev.navLabel}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-md text-right text-sm"
        >
          <span className="text-xs font-medium text-slate-400">Next</span>
          <span className="inline-flex items-center gap-1 font-medium text-slate-700 transition-colors group-hover:text-sky-600">
            {next.navLabel}
            <ChevronRightIcon className="h-4 w-4" />
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
