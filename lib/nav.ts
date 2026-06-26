/**
 * Single source of truth for the documentation navigation.
 *
 * `navGroups` drives the left sidebar (grouped categories) while the
 * flattened `allPages` list powers the previous/next pagination at the
 * bottom of every page.
 */

export type DocLink = {
  /** Long, descriptive page title shown as the <h1>. */
  title: string;
  /** Shorter label used inside the sidebar list. */
  navLabel: string;
  /** Route path. */
  href: string;
};

export type NavGroup = {
  title: string;
  links: DocLink[];
};

export const navGroups: NavGroup[] = [
  {
    title: "Getting Started",
    links: [
      {
        title: "Welcome to the RAG Workshop",
        navLabel: "Home / Welcome",
        href: "/",
      },
    ],
  },
  {
    title: "Workshop Modules",
    links: [
      {
        title: "Module 1: LLM & Knowledge Injection",
        navLabel: "1. LLM & Knowledge Injection",
        href: "/modul-1",
      },
      {
        title: "Module 2: Building a Chatbot with Gemini",
        navLabel: "2. Chatbot with Gemini",
        href: "/modul-2",
      },
      {
        title: "Module 3: Understanding RAG",
        navLabel: "3. Understanding RAG",
        href: "/modul-3",
      },
      {
        title: "Module 4: Building the RAG Pipeline",
        navLabel: "4. Building the RAG Pipeline",
        href: "/modul-4",
      },
      {
        title: "Module 5: Hands-on Session",
        navLabel: "5. Hands-on Session",
        href: "/modul-5",
      },
    ],
  },
];

/** Flat, ordered list of every page for sequential navigation. */
export const allPages: DocLink[] = navGroups.flatMap((group) => group.links);

/** Return the previous and next page relative to the given href. */
export function getAdjacentPages(href: string): {
  prev: DocLink | null;
  next: DocLink | null;
} {
  const index = allPages.findIndex((page) => page.href === href);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? allPages[index - 1] : null,
    next: index < allPages.length - 1 ? allPages[index + 1] : null,
  };
}
