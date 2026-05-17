import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toneForStatus } from "../_lib/types";

export function PanelTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-ops-border bg-gradient-to-r from-ops-surface via-ops-surface to-ops-accentSoft/55 px-5 py-4">
      <div>
        <h2 className="font-display text-lg font-bold text-ops-ink">{title}</h2>
        <p className="mt-1 text-sm text-ops-muted">{subtitle}</p>
      </div>
      <span aria-hidden="true" className="mt-1 h-8 w-1 bg-ops-accent" />
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
  onAction
}: {
  title: string;
  subtitle: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-ops-borderSoft pb-5 md:flex-row md:items-end">
      <div>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ops-accent">
          Central CMJ
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ops-ink">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ops-muted">{subtitle}</p>
      </div>
      <Button variant="accent" onClick={onAction}>
        {action}
      </Button>
    </div>
  );
}

export function OperationalCard({
  label,
  value,
  note,
  tone = "default"
}: {
  label: string;
  value: string;
  note: string;
  tone?: "default" | "warning";
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden border bg-ops-surface p-5 shadow-[0_18px_42px_-32px_rgba(10,43,79,0.9)]",
        "before:absolute before:inset-x-0 before:top-0 before:h-1",
        tone === "warning"
          ? "border-ops-warnBorder before:bg-ops-warnMark"
          : "border-ops-border before:bg-ops-accent"
      )}
    >
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ops-mutedStrong">
        {label}
      </p>
      <strong className="mt-3 block font-display text-3xl text-ops-ink">{value}</strong>
      <p className={cn("mt-4 text-sm", tone === "warning" ? "text-ops-warnInkSoft" : "text-ops-muted")}>
        {note}
      </p>
    </article>
  );
}

export function DataTable({
  title,
  subtitle,
  headers,
  rows
}: {
  title: string;
  subtitle: string;
  headers: string[];
  rows: Array<Array<string | ReactNode>>;
}) {
  return (
    <article className="overflow-hidden border border-ops-border bg-ops-surface shadow-[0_22px_54px_-42px_rgba(10,43,79,0.9)]">
      <PanelTitle title={title} subtitle={subtitle} />
      <div className="max-h-[clamp(320px,calc(100vh-14rem),620px)] overflow-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.12em] text-ops-mutedStrong">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="sticky top-0 z-10 bg-ops-accentPale px-5 py-3 font-semibold shadow-[inset_0_-1px_0_rgba(10,43,79,0.12)]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {rows.map((row, index) => (
              <tr key={index} className="transition-colors hover:bg-ops-accentSoft/65">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "px-5 py-4 text-ops-inkMid",
                      cellIndex === 0 && "font-mono text-xs font-semibold text-ops-accent"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone = toneForStatus(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border bg-ops-surface px-2.5 py-1 text-xs font-semibold",
        tone === "warn" && "border-ops-warnBorder text-ops-warnInkMid",
        tone === "success" && "border-ops-successBorder text-ops-successInk",
        tone === "default" && "border-ops-border text-ops-inkMid"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5",
          tone === "warn" && "bg-ops-warnMark",
          tone === "success" && "bg-[#2f9d68]",
          tone === "default" && "bg-ops-accent"
        )}
      />
      {status}
    </span>
  );
}

export function AdminField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-ops-inkMid">{label}</span>
      <input
        className="h-11 border border-ops-border bg-ops-surface px-3 text-ops-inkSoft outline-none transition-colors placeholder:text-ops-mutedSoft focus:border-ops-accent focus:bg-white"
        placeholder={placeholder}
      />
    </label>
  );
}
