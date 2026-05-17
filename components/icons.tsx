import type { SVGProps } from "react";

/**
 * Ícones em traço técnico (vibe blueprint / mechanical drawing).
 * Stroke 1.4, cantos retos, sem rounding extra — feitos para a CMJ.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  width: 20,
  height: 20
};

export function WhatsappGlyph(props: IconProps) {
  // Glyph WhatsApp simplificado, traço técnico
  return (
    <svg {...base} {...props}>
      <path d="M4 20l1.6-4.2A8 8 0 1 1 9 19.6L4 20z" />
      <path d="M9 10.4c.4 1.4 1.6 2.7 3 3.3l1.2-1.1 2 .9c.1 1.3-.9 1.8-1.8 1.8-2.8 0-5.7-2.6-5.7-5.4 0-1 .5-1.9 1.7-1.8l.9 1.9-1.3 1.2z" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h4l1.5 4-2 1.5a10 10 0 0 0 6 6L16 13.5l4 1.5v4a1 1 0 0 1-1 1A14 14 0 0 1 5 5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h13" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowOut(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function CheckMark(props: IconProps) {
  // Sem círculo cliché; só o check com tick lateral
  return (
    <svg {...base} {...props}>
      <path d="M4 13l4 4 12-12" />
      <path d="M3 6h2" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function MenuBars(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h18" />
      <path d="M3 12h12" />
      <path d="M3 17h18" />
    </svg>
  );
}

export function CloseX(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </svg>
  );
}

export function SendGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12l18-8-6 18-3-8-9-2z" />
    </svg>
  );
}

/* Glyphs do processo — feitos para parecerem desenho técnico, não icon-pack */

export function GlyphDocument(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 12h7M9 16h7" />
    </svg>
  );
}

export function GlyphCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      <path d="M10 12l2-5 2 5-2 1z" strokeLinejoin="round" />
    </svg>
  );
}

export function GlyphCaliper(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h18v3l-4 2v3l-4 2v-3l-4-2v-3z" />
      <path d="M7 8v3M11 8v3M15 8v3M19 8v3" />
    </svg>
  );
}

export function GlyphGear(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  );
}

export function GlyphHammer(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 3l7 4-3 5-4-2-2 2 5 5-2 4-7-5 2-2-2-4 4-3z" />
    </svg>
  );
}

export function GlyphTruck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7z" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </svg>
  );
}

export function GlyphPackage(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l9 4v10l-9 4-9-4V7z" />
      <path d="M3 7l9 4 9-4" />
      <path d="M12 11v10" />
    </svg>
  );
}

export function GlyphUsers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15 20c0-2.5 2-4 4-4" />
    </svg>
  );
}

export function GlyphCash(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18v12H3z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 9v6M18 9v6" />
    </svg>
  );
}

export function GlyphPaperclip(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 7l-7 7a3 3 0 0 0 4 4l8-8a5 5 0 0 0-7-7l-9 9a7 7 0 0 0 10 10l5-5" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function SearchGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

export function FilterGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5h18l-7 9v6l-4-2v-4z" />
    </svg>
  );
}

export function AlertGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18v0.5" />
    </svg>
  );
}
