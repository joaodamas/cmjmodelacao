"use client";

import { useSyncExternalStore } from "react";
import { MenuBars, SearchGlyph } from "@/components/icons";
import { Button } from "@/components/ui/button";

function formatOperationDate(date: Date) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function subscribeNoop() {
  return () => {};
}

export function AdminHeader({
  onToggleMobileMenu,
  onNewOrder,
  onOpenSearch
}: {
  onToggleMobileMenu: () => void;
  onNewOrder: () => void;
  onOpenSearch: () => void;
}) {
  const today = useSyncExternalStore(
    subscribeNoop,
    () => formatOperationDate(new Date()),
    () => null
  );

  return (
    <header className="sticky top-0 z-30 border-b border-ops-border bg-ops-page/92 shadow-[0_14px_34px_-30px_rgba(10,43,79,0.85)] backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="grid h-10 w-10 place-items-center border border-ops-border bg-ops-surface text-ops-ink lg:hidden"
            aria-label="Abrir menu"
          >
            <MenuBars className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display text-lg font-bold text-ops-ink">Central de Operação</p>
              <span className="hidden border border-ops-successBorder bg-ops-successBg px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ops-successInk sm:inline">
                ativo
              </span>
            </div>
            <p className="text-xs text-ops-muted">Pedidos, produção, entrega e faturamento.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="group flex items-center gap-2 border border-ops-border bg-ops-surface px-3 py-2 text-xs text-ops-muted transition-colors hover:border-ops-accent hover:text-ops-accent md:min-w-[240px]"
            aria-label="Abrir busca global"
          >
            <SearchGlyph className="h-4 w-4" />
            <span className="hidden md:inline">Buscar pedido, cliente, peça…</span>
            <span className="ml-auto hidden items-center gap-1 md:flex">
              <kbd className="inline-grid min-h-[18px] min-w-[18px] place-items-center border border-ops-border bg-ops-page px-1 font-mono text-[0.62rem] text-ops-inkMid group-hover:border-ops-accent">
                /
              </kbd>
            </span>
          </button>
          <span className="hidden border border-ops-border bg-ops-surface px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ops-muted md:inline">
            {today ?? "--/--"} · operação
          </span>
          <Button size="sm" variant="accent" onClick={onNewOrder}>
            Novo pedido
          </Button>
        </div>
      </div>
    </header>
  );
}
