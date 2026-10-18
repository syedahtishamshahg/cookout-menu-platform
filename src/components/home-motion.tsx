"use client";

import { useEffect, useState } from "react";

export default function HomeMotion() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setProgress(100);
      const done = window.setTimeout(() => setLoading(false), 180);
      return () => window.clearTimeout(done);
    }

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(100, Math.floor(((now - start) / 1050) * 100));
      setProgress(next);
      if (next < 100) frame = window.requestAnimationFrame(tick);
      else window.setTimeout(() => setLoading(false), 180);
    };
    frame = window.requestAnimationFrame(tick);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    document.querySelectorAll(".discovery-card, .category-index > a, .trust-strip > div, .index-section-head").forEach((node) => {
      node.classList.add("motion-reveal");
      observer.observe(node);
    });

    const cursor = document.querySelector<HTMLElement>(".cyber-cursor");
    const ring = document.querySelector<HTMLElement>(".cyber-cursor-ring");
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    const move = (event: MouseEvent) => {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      if (cursor) {
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
        cursor.style.setProperty("--cursor-stretch", String(Math.min(1.5, 1 + Math.hypot(dx, dy) / 45)));
      }
      if (ring) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          ring.style.left = event.clientX + "px";
          ring.style.top = event.clientY + "px";
        });
      }
    };
    const over = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, [role=button]");
      document.body.classList.toggle("cursor-interactive", Boolean(interactive));
    };
    if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
      window.addEventListener("mousemove", move, { passive: true });
      document.addEventListener("mouseover", over, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="cyber-preloader" role="status" aria-label="Loading Cook Out Index">
          <div className="preloader-brand"><span>CO</span> COOK OUT <i>INDEX</i></div>
          <div className="preloader-title">MENU <em>INTELLIGENCE</em></div>
          <div className="preloader-bottom"><span>INDEPENDENT FOOD DATA</span><strong>{String(progress).padStart(2, "0")}<small>%</small></strong></div>
          <div className="preloader-track"><span style={{ width: progress + "%" }} /></div>
        </div>
      )}
      <div className="cyber-cursor" aria-hidden="true" />
      <div className="cyber-cursor-ring" aria-hidden="true" />
    </>
  );
}
