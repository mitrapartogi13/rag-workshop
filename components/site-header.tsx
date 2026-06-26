import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { GitHubIcon, SearchIcon } from "@/components/icons";

const GITHUB_URL = "https://github.com/mitrapartogi13/rag-workshop.git";

/**
 * Sticky top bar: semi-transparent white with a backdrop blur and a single
 * hairline border underneath. Holds the brand lockup, a search affordance,
 * and the repository link.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          <MobileNav />

          <Link href="/" className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-[0.7rem] font-bold text-white">
              AP
            </span>
            <span className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-900">
                AP Lab
              </span>
              <span className="hidden text-sm text-slate-400 sm:inline">
                RAG Workshop
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <SearchBar />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="GitHub repository"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Search affordance styled as a faux input. Functional search is out of scope
 * for the workshop site, so this is a calm placeholder with a keyboard hint —
 * exactly how the Tailwind docs present their search trigger.
 */
function SearchBar() {
  return (
    <button
      type="button"
      className="group flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-2.5 pr-2 text-sm text-slate-400 transition-colors hover:border-slate-300 hover:bg-white sm:w-64"
      aria-label="Search documentation"
    >
      <SearchIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-500" />
      <span className="hidden flex-1 text-left sm:inline">
        Search documentation...
      </span>
      <kbd className="hidden items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 font-mono text-[0.65rem] font-medium text-slate-400 sm:inline-flex">
        Ctrl K
      </kbd>
    </button>
  );
}
