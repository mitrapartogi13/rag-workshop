"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Left-hand navigation: categories rendered as uppercase eyebrows, each with
 * a vertical rule down the link list. The active link picks up the rule in
 * sky and turns the text sky/semibold — a subtle, borrowed-from-Tailwind cue.
 *
 * `onNavigate` lets the mobile drawer close itself after a selection.
 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-8">
      {navGroups.map((group) => (
        <div key={group.title}>
          <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {group.title}
          </h2>
          <ul className="space-y-px border-l border-slate-200">
            {group.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 pr-3 text-sm transition-colors",
                      active
                        ? "border-sky-500 font-semibold text-sky-600"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    )}
                  >
                    {link.navLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
