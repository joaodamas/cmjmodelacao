"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CloseX, MenuBars, WhatsappGlyph } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { contact, navItems, whatsappMessages } from "@/lib/site-data";
import { makeWhatsappUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

const headerWhatsapp = makeWhatsappUrl(whatsappMessages.header);

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Top bar industrial — sempre presente, contraste alto, info de contato + selo B2B */}
      <div className="hidden bg-graphite text-white md:block">
        <div className="container flex h-9 items-center justify-between gap-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/65">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 bg-accent" />
              {contact.location}
            </span>
            <span className="hidden lg:inline">{contact.hours}</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={headerWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
              data-track="whatsapp_click_topbar"
            >
              <WhatsappGlyph className="h-3.5 w-3.5 text-accent" />
              {contact.whatsapp} · WhatsApp
            </a>
            <span className="hidden items-center gap-2 border-l border-white/15 pl-5 text-white/80 lg:inline-flex">
              <span className="inline-block h-1 w-1 bg-accent" />
              Atendimento B2B industrial
            </span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "w-full transition-colors duration-300",
          scrolled
            ? "border-b border-border/80 bg-white/92 backdrop-blur-md shadow-[0_8px_30px_-20px_rgba(8,19,38,0.25)]"
            : "border-b border-border/30 bg-white"
        )}
      >
        <div className="container flex h-[68px] items-center justify-between gap-4">
          <Link href="#" className="flex items-center gap-3" aria-label="CMJ Modelação — início">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center bg-primary text-white font-display text-base font-bold tracking-tight shadow-[0_4px_16px_-4px_rgba(8,19,38,0.4)]"
            >
              CMJ
            </span>
            <span className="leading-tight">
              <strong className="cmj-wordmark block text-[1.05rem] font-bold uppercase text-primary md:text-[1.15rem]">
                CMJ Modelação
              </strong>
              <span className="spec-label block">Moldes em EPS · Fundição</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[0.92rem] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="accent" className="h-10">
              <a
                href={headerWhatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click_header"
              >
                <WhatsappGlyph className="h-4 w-4" />
                Enviar projeto
              </a>
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border border-border bg-white text-primary lg:hidden"
          >
            {open ? <CloseX className="h-5 w-5" /> : <MenuBars className="h-5 w-5" />}
          </button>
        </div>

        {/* Drawer mobile */}
        <div
          className={cn(
            "fixed inset-x-0 top-[68px] z-40 origin-top bg-white transition-all duration-200 lg:hidden",
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          )}
          inert={!open}
        >
          <div className="border-y border-border bg-white shadow-industrial-lg">
            <nav className="container flex flex-col py-3" aria-label="Menu mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border/70 py-3 text-base font-medium text-foreground/90 last:border-b-0"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="font-mono text-xs text-accent">
                    →
                  </span>
                </Link>
              ))}
            </nav>
            <div className="container flex flex-col gap-2 pb-5">
              <Button asChild variant="accent" size="lg" className="w-full">
                <a
                  href={headerWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  data-track="whatsapp_click_header_mobile"
                  onClick={() => setOpen(false)}
                >
                  <WhatsappGlyph className="h-4 w-4" />
                  WhatsApp · {contact.whatsapp}
                </a>
              </Button>
              <p className="mt-2 spec-label text-center">
                {contact.location} · {contact.hours}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
