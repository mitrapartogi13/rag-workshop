import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/sidebar-nav";
import { OnThisPage } from "@/components/on-this-page";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RAG Workshop — AP Lab",
    template: "%s — RAG Workshop",
  },
  description:
    "Retrieval-Augmented Generation (RAG) workshop documentation: from LLM fundamentals and knowledge injection to building a document-aware chatbot with SENOPATI and ChromaDB. Hosted by AP Lab.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-sans">
        <SiteHeader />

        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[16rem_minmax(0,1fr)_16rem]">
            {/* Left sidebar — fixed width, independently scrollable */}
            <aside className="hidden lg:block">
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-2">
                <SidebarNav />
              </div>
            </aside>

            {/* Center column — readable measure, capped width */}
            <main className="min-w-0">
              <div className="mx-auto max-w-3xl xl:mx-0">{children}</div>
            </main>

            {/* Right sidebar — table of contents */}
            <aside className="hidden xl:block">
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-10 pl-2">
                <OnThisPage />
              </div>
            </aside>
          </div>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200">
      <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} AP Lab — RAG Workshop materials.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/mitrapartogi13/rag-workshop"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
