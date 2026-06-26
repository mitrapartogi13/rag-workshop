"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SidebarNav } from "@/components/sidebar-nav";
import { CloseIcon, MenuIcon } from "@/components/icons";

/**
 * Hamburger + slide-in drawer for narrow viewports. The desktop layout keeps
 * the sidebar permanently mounted, so this only renders below the `lg`
 * breakpoint. Escape closes it and body scroll is locked while it is open.
 *
 * The overlay is rendered through a portal to `document.body`: the sticky
 * header uses `backdrop-blur`, which establishes a containing block for any
 * fixed-positioned descendant — without the portal the drawer would be
 * clipped to the height of the header.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer = (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm"
      />
      <div className="fixed inset-y-0 left-0 w-72 max-w-[80%] overflow-y-auto border-r border-slate-200 bg-white px-4 py-5">
        <div className="mb-6 flex items-center justify-between px-3">
          <span className="text-sm font-semibold text-slate-900">Navigation</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close navigation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <SidebarNav onNavigate={() => setOpen(false)} />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {open && mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
