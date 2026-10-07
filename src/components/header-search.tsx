"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const outside = (event: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    if (q) window.location.assign("/search/?q=" + encodeURIComponent(q));
  }

  return <div className="header-search-wrap" ref={rootRef}>
    <button type="button" className="new-search-link" aria-label="Open search" aria-expanded={open} onClick={() => setOpen(v => !v)}>⌕</button>
    {open && <form className="header-search-form" onSubmit={submit}>
      <span aria-hidden="true">⌕</span>
      <input autoFocus name="q" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Cook Out..." aria-label="Search Cook Out" />
      <button type="button" aria-label="Close search" onClick={() => setOpen(false)}>×</button>
    </form>}
  </div>;
}