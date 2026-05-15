"use client";

import { useEffect, useRef } from "react";
import { trackConversion } from "@/lib/tracking";

export function ConversionTracking() {
  const scrolledToForm = useRef(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a, button") as HTMLElement | null;
      if (!link) return;

      const href = (link.getAttribute("href") || "").toLowerCase();
      const trackAttr = link.getAttribute("data-track");
      const text = link.textContent?.trim().slice(0, 80) || "";

      if (trackAttr) {
        trackConversion(trackAttr, { link_text: text, link_url: href });
        return;
      }

      if (href.includes("wa.me/")) {
        trackConversion("whatsapp_click", { link_text: text, link_url: href });
        return;
      }

      if (href.startsWith("tel:")) {
        trackConversion("phone_click", { link_text: text, link_url: href });
      }
    }

    function onScroll() {
      if (scrolledToForm.current) return;
      const form = document.getElementById("orcamento");
      if (!form) return;
      const rect = form.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) {
        scrolledToForm.current = true;
        trackConversion("scroll_to_form", { section: "orcamento" });
      }
    }

    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
