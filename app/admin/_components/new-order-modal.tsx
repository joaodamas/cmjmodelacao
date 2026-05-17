"use client";

import { FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AdminField } from "./ui-primitives";

export function NewOrderModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ops-overlay/72 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-order-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-ops-modalBorder bg-ops-page shadow-[0_30px_120px_-50px_rgba(0,0,0,0.85)]">
        <div className="flex items-start justify-between gap-5 border-b border-ops-border bg-ops-surface px-6 py-5">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ops-accent">
              Cadastro operacional
            </p>
            <h2
              id="new-order-title"
              className="mt-2 font-display text-2xl font-bold text-ops-ink"
            >
              Novo pedido
            </h2>
            <p className="mt-2 text-sm text-ops-muted">
              Entrada mínima para abrir análise, orçamento ou produção.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center border border-ops-border bg-ops-surface text-ops-inkMid hover:border-ops-accent hover:text-ops-accent"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        <form className="grid gap-6 p-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Cliente" placeholder="Ex.: Grupo Aethra" />
            <AdminField label="Contato / responsável" placeholder="Ex.: Compras técnicas" />
            <AdminField label="Peça / projeto" placeholder="Ex.: Molde EPS automotivo" />
            <AdminField label="Prazo solicitado" placeholder="Ex.: 20/05/2026" />
            <AdminField label="Material de fundição" placeholder="Alumínio, aço, ferro fundido..." />
            <AdminField label="Responsável interno" placeholder="Produção, CNC Router, orçamento..." />
          </div>

          <label className="grid gap-2 text-sm">
            <span className="font-semibold text-ops-inkMid">Observações técnicas</span>
            <textarea
              rows={5}
              className="border border-ops-border bg-ops-surface px-3 py-3 text-ops-inkSoft outline-none focus:border-ops-accent"
              placeholder="Descreva geometria, dimensões, arquivo recebido, referência física, urgência e pontos críticos."
            />
          </label>

          <div className="grid gap-3 border border-ops-border bg-ops-surface p-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold text-ops-ink">Anexos do pedido</p>
              <p className="mt-1 text-sm text-ops-muted">
                Campo visual preparado para desenhos, PDF, DXF, STEP ou fotos. Storage entra com Firebase Storage.
              </p>
            </div>
            <button
              type="button"
              className="border border-ops-border px-4 py-2 text-sm font-semibold text-ops-inkMid hover:border-ops-accent hover:text-ops-accent"
            >
              Selecionar arquivo
            </button>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-ops-border pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="accent">
              Criar pedido
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
