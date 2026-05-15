"use client";

import { useEffect, useState } from "react";
import { ArrowRight, WhatsappGlyph } from "@/components/icons";
import { whatsappMessages } from "@/lib/site-data";
import { makeWhatsappUrl } from "@/lib/utils";

const wa = makeWhatsappUrl(whatsappMessages.default);

export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 420);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-mobile-cta", show);
    return () => document.body.classList.remove("has-mobile-cta");
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* Bar mobile — só WhatsApp + atalho para o formulário */}
      <div className="mobile-cta-bar">
        <div className="flex items-center gap-2 border border-border bg-white p-2 shadow-industrial">
          <a
            href="#orcamento"
            className="flex h-11 flex-1 items-center justify-center gap-2 border border-border text-sm font-semibold text-primary"
            data-track="form_click_mobile_bar"
          >
            Orçamento
            <ArrowRight className="h-4 w-4 text-accent" />
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 flex-[1.4] items-center justify-center gap-2 bg-accent text-sm font-semibold text-white"
            data-track="whatsapp_click_mobile_bar"
          >
            <WhatsappGlyph className="h-4 w-4" />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Botão flutuante desktop — geometria industrial, sem bolha verde clichê */}
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        aria-label="Solicitar orçamento pelo WhatsApp"
        data-track="whatsapp_click_floating"
        className="group fixed bottom-6 right-6 z-40 hidden items-stretch border border-white/15 bg-graphite text-sm font-semibold text-white shadow-industrial-lg md:inline-flex"
      >
        <span className="flex items-center justify-center bg-[#1fa855] px-3.5">
          <WhatsappGlyph className="h-5 w-5" />
        </span>
        <span className="flex items-center gap-2 px-5 py-3.5">
          Falar agora
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55 group-hover:text-white">
            WhatsApp
          </span>
        </span>
      </a>
    </>
  );
}
