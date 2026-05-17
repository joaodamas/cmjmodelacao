"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CloseX,
  GlyphPackage,
  GlyphUsers,
  SearchGlyph
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { clients, orders } from "../_lib/mock-data";
import type { Client, Order } from "../_lib/types";

export type SearchSelection =
  | { type: "order"; order: Order }
  | { type: "client"; client: Client };

type ResultRow =
  | { kind: "order"; order: Order }
  | { kind: "client"; client: Client };

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matches(haystack: string, needle: string) {
  return normalize(haystack).includes(normalize(needle));
}

export function GlobalSearch({
  open,
  onClose,
  onSelect
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (selection: SearchSelection) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [lastQuery, setLastQuery] = useState("");
  const [openLatch, setOpenLatch] = useState(open);
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (query !== lastQuery) {
    setLastQuery(query);
    setActive(0);
  }
  if (openLatch !== open) {
    setOpenLatch(open);
    if (open) {
      setQuery("");
      setActive(0);
    }
  }

  const orderResults = useMemo<Order[]>(() => {
    const q = query.trim();
    if (!q) return orders.slice(0, 5);
    return orders.filter(
      (order) =>
        matches(order.id, q) ||
        matches(order.client, q) ||
        matches(order.part, q) ||
        matches(order.owner, q) ||
        matches(order.status, q)
    );
  }, [query]);

  const clientResults = useMemo<Client[]>(() => {
    const q = query.trim();
    if (!q) return clients.slice(0, 3);
    return clients.filter(
      (client) =>
        matches(client.name, q) ||
        matches(client.contact, q) ||
        matches(client.phone, q) ||
        matches(client.lastOrder, q)
    );
  }, [query]);

  const flatResults = useMemo<ResultRow[]>(
    () => [
      ...orderResults.map((order) => ({ kind: "order" as const, order })),
      ...clientResults.map((client) => ({ kind: "client" as const, client }))
    ],
    [orderResults, clientResults]
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [open]);

  function commit(index: number) {
    const row = flatResults[index];
    if (!row) return;
    if (row.kind === "order") {
      onSelect({ type: "order", order: row.order });
    } else {
      onSelect({ type: "client", client: row.client });
    }
  }

  function handleKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      commit(active);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] grid place-items-start px-4 pt-[12vh] transition-opacity duration-150",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onKeyDown={handleKey}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ops-overlay/65 backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Busca global"
        className={cn(
          "relative w-full max-w-[680px] border border-ops-border bg-ops-page shadow-[0_30px_120px_-30px_rgba(0,0,0,0.55)] transition-transform duration-150",
          open ? "scale-100" : "scale-[0.97]"
        )}
      >
        <div className="flex items-center gap-3 border-b border-ops-border bg-ops-surface px-4 py-3">
          <SearchGlyph className="h-4 w-4 text-ops-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar pedido, cliente, peça…"
            className="flex-1 bg-transparent text-base text-ops-ink outline-none placeholder:text-ops-muted"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center border border-ops-border bg-ops-surface text-ops-inkMid hover:border-ops-accent hover:text-ops-accent"
            aria-label="Fechar busca"
          >
            <CloseX className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {flatResults.length === 0 ? (
            <p className="px-4 py-10 text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ops-muted">
              Nenhum resultado para “{query}”.
            </p>
          ) : (
            <ResultGroups
              orderResults={orderResults}
              clientResults={clientResults}
              active={active}
              setActive={setActive}
              onCommit={commit}
              hasQuery={Boolean(query.trim())}
            />
          )}
        </div>

        <footer className="flex items-center justify-between border-t border-ops-border bg-ops-surface px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ops-muted">
          <span className="flex items-center gap-3">
            <KbdHint label="↑↓" text="Navegar" />
            <KbdHint label="↵" text="Abrir" />
            <KbdHint label="ESC" text="Fechar" />
          </span>
          <span className="hidden md:inline">
            atalhos · <Kbd>/</Kbd> ou <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
          </span>
        </footer>
      </section>
    </div>
  );
}

function ResultGroups({
  orderResults,
  clientResults,
  active,
  setActive,
  onCommit,
  hasQuery
}: {
  orderResults: Order[];
  clientResults: Client[];
  active: number;
  setActive: (index: number) => void;
  onCommit: (index: number) => void;
  hasQuery: boolean;
}) {
  let runningIndex = 0;
  return (
    <div className="grid gap-1 py-2">
      {orderResults.length > 0 ? (
        <GroupHeader
          icon={<GlyphPackage className="h-3.5 w-3.5" />}
          label={hasQuery ? "Pedidos" : "Pedidos recentes"}
          count={orderResults.length}
        />
      ) : null}
      {orderResults.map((order) => {
        const index = runningIndex++;
        return (
          <Row
            key={`o-${order.id}`}
            active={index === active}
            onHover={() => setActive(index)}
            onClick={() => onCommit(index)}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center border border-ops-border bg-ops-accentSoft font-mono text-[0.62rem] font-semibold text-ops-accent">
              #{order.id}
            </span>
            <span className="min-w-0">
              <p className="truncate text-sm font-semibold text-ops-ink">
                {order.priority === "vip" ? (
                  <span className="mr-1 text-ops-accent">★</span>
                ) : null}
                {order.client}
              </p>
              <p className="mt-0.5 truncate text-xs text-ops-muted">
                {order.part} · {order.status}
              </p>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-ops-muted" />
          </Row>
        );
      })}

      {clientResults.length > 0 ? (
        <GroupHeader
          icon={<GlyphUsers className="h-3.5 w-3.5" />}
          label={hasQuery ? "Clientes" : "Clientes ativos"}
          count={clientResults.length}
        />
      ) : null}
      {clientResults.map((client) => {
        const index = runningIndex++;
        return (
          <Row
            key={`c-${client.name}`}
            active={index === active}
            onHover={() => setActive(index)}
            onClick={() => onCommit(index)}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center border border-ops-border bg-ops-accentSoft font-mono text-[0.62rem] font-semibold text-ops-accent">
              {client.name.slice(0, 2).toUpperCase()}
            </span>
            <span className="min-w-0">
              <p className="truncate text-sm font-semibold text-ops-ink">{client.name}</p>
              <p className="mt-0.5 truncate text-xs text-ops-muted">
                {client.contact} · {client.phone}
              </p>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-ops-muted" />
          </Row>
        );
      })}
    </div>
  );
}

function GroupHeader({
  icon,
  label,
  count
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <div className="mt-1 flex items-center justify-between px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ops-muted">
      <span className="flex items-center gap-2">
        <span className="text-ops-accent">{icon}</span>
        {label}
      </span>
      <span>({count})</span>
    </div>
  );
}

function Row({
  active,
  onHover,
  onClick,
  children
}: {
  active: boolean;
  onHover: () => void;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onClick}
      className={cn(
        "grid w-full grid-cols-[28px_1fr_auto] items-center gap-3 border-l-2 px-4 py-2.5 text-left transition-colors",
        active
          ? "border-ops-accent bg-ops-accentSoft"
          : "border-transparent hover:bg-ops-accentSoft/40"
      )}
    >
      {children}
    </button>
  );
}

function KbdHint({ label, text }: { label: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Kbd>{label}</Kbd>
      <span>{text}</span>
    </span>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-grid min-h-[18px] min-w-[18px] place-items-center border border-ops-border bg-ops-surface px-1 font-mono text-[0.62rem] font-semibold tracking-normal text-ops-inkMid">
      {children}
    </span>
  );
}
