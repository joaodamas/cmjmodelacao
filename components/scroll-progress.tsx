"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, h.scrollTop / total)) : 0;
      el.style.transform = `scaleX(${progress})`;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
