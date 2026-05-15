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
      <header
        className={cn(
          "w-full transition-colors duration-300",
          scrolled
            ? "border-b border-border/80 bg-white/92 backdrop-blur-md shadow-[0_8px_30px_-20px_rgba(8,19,38,0.25)]"
            : "border-b border-border/30 bg-white"
        )}
      >
        <div className="container flex h-[68px] items-center justify-between gap-4">
          <Link href="#" className="group flex items-center" aria-label="CMJ Modelação — início">
            <span className="leading-none">
              <strong className="cmj-wordmark brand-lockup block text-primary">
                <span className="brand-cmj">CMJ</span>
                <span className="brand-name">Modelação</span>
              </strong>
              <span className="spec-label mt-1 block">Moldes em EPS · Fundição</span>
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
