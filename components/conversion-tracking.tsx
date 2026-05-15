"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/tracking";

export function ConversionTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");
      const href = link?.getAttribute("href") || "";

      if (href.includes("wa.me/5511958190776")) {
        trackConversion("whatsapp_click", {
          link_text: link?.textContent?.trim().slice(0, 80) || "whatsapp",
          link_url: href
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
