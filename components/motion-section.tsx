"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /**
   * Reveal pattern: uma única linha técnica horizontal cresce na borda
   * superior da seção quando ela entra na viewport — referência a régua
   * de calibração, não animação de marketing.
   */
  reveal?: "rule" | "none";
};

export function MotionSection({ children, className, id, reveal = "rule" }: MotionSectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reveal !== "rule") return;
    const el = ref.current?.querySelector<HTMLElement>("[data-scan-rule]");
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.revealed = "true";
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal]);

  return (
    <section ref={ref} id={id} className={cn("relative section-padding", className)}>
      {reveal === "rule" ? (
        <span aria-hidden="true" data-scan-rule className="scan-rule" />
      ) : null}
      {children}
    </section>
  );
}
