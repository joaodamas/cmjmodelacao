import { CheckMark, GlyphCaliper } from "@/components/icons";

export function ModulePlaceholder({ title }: { title: string }) {
  return (
    <section className="grid min-h-[520px] place-items-center overflow-hidden border border-ops-border bg-ops-surface p-8 text-center shadow-[0_22px_54px_-42px_rgba(10,43,79,0.9)]">
      <div className="max-w-md">
        <span className="mx-auto grid h-16 w-16 place-items-center border border-ops-border bg-ops-accentSoft text-ops-accent">
          <GlyphCaliper className="h-8 w-8" />
        </span>
        <p className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ops-accent">
          Módulo planejado
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ops-ink">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-ops-muted">
          Módulo reservado para a próxima etapa. O MVP começa pelo dashboard operacional e pelo
          Kanban de pedidos.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border border-ops-border bg-ops-accentSoft px-4 py-2 text-sm text-ops-inkMid">
          <CheckMark className="h-4 w-4 text-ops-accent" />
          Estrutura de navegação criada
        </div>
      </div>
    </section>
  );
}
