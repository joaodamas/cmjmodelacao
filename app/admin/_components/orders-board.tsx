"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent
} from "@dnd-kit/core";
import { AlertGlyph, FilterGlyph, GlyphPaperclip } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { columns, orders as seedOrders } from "../_lib/mock-data";
import {
  formatDueLabel,
  progressIndex,
  urgencyTone,
  type Order,
  type OrderStatus
} from "../_lib/types";

type FilterKey = "atrasados" | "hoje" | "proxCinco" | "vip" | "alerta";

const filterDefs: { key: FilterKey; label: string; test: (order: Order) => boolean }[] = [
  { key: "atrasados", label: "Atrasados", test: (o) => o.daysUntilDue < 0 },
  { key: "hoje", label: "Hoje", test: (o) => o.daysUntilDue === 0 },
  { key: "proxCinco", label: "Próx. 5 dias", test: (o) => o.daysUntilDue >= 0 && o.daysUntilDue <= 5 },
  { key: "vip", label: "VIP", test: (o) => o.priority === "vip" },
  { key: "alerta", label: "Com alerta", test: (o) => Boolean(o.alert) }
];

export function OrdersBoard({
  onNewOrder,
  onSelectOrder
}: {
  onNewOrder: () => void;
  onSelectOrder: (order: Order) => void;
}) {
  const [items, setItems] = useState<Order[]>(seedOrders);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  );

  const filteredItems = useMemo(() => {
    if (activeFilters.size === 0) return items;
    const tests = filterDefs.filter((f) => activeFilters.has(f.key)).map((f) => f.test);
    return items.filter((order) => tests.every((test) => test(order)));
  }, [items, activeFilters]);

  const filterCounts = useMemo(() => {
    const counts = {} as Record<FilterKey, number>;
    for (const def of filterDefs) {
      counts[def.key] = items.filter(def.test).length;
    }
    return counts;
  }, [items]);

  const grouped = useMemo(
    () =>
      columns.map((column) => ({
        column,
        items: filteredItems.filter((order) => order.status === column)
      })),
    [filteredItems]
  );

  function toggleFilter(key: FilterKey) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function clearFilters() {
    setActiveFilters(new Set());
  }

  const draggedOrder = useMemo(
    () => (draggedId ? items.find((order) => order.id === draggedId) ?? null : null),
    [draggedId, items]
  );

  function handleDragStart(event: DragStartEvent) {
    setDraggedId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setDraggedId(null);
    const { active, over } = event;
    if (!over) return;
    const nextStatus = over.id as OrderStatus;
    setItems((prev) =>
      prev.map((order) =>
        order.id === active.id && order.status !== nextStatus
          ? { ...order, status: nextStatus, statusSince: "agora", updatedAt: "agora" }
          : order
      )
    );
  }

  const total = items.length;
  const visible = filteredItems.length;
  const filtered = activeFilters.size > 0;

  return (
    <section className="grid gap-5">
      <div className="flex flex-col justify-between gap-4 border-b border-ops-borderSoft pb-5 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ops-accent">
            Carteira operacional
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ops-ink">Pedidos</h1>
          <p className="mt-2 text-sm text-ops-muted">
            Fluxo industrial do recebimento ao faturamento.{" "}
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ops-muted">
              · arraste para mudar etapa
            </span>
          </p>
        </div>
        <Button variant="accent" onClick={onNewOrder}>
          Cadastrar pedido
        </Button>
      </div>

      <FilterBar
        activeFilters={activeFilters}
        counts={filterCounts}
        onToggle={toggleFilter}
        onClear={clearFilters}
        visible={visible}
        total={total}
        filtered={filtered}
      />

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="overflow-x-auto pb-3">
          <div className="grid min-w-[1180px] grid-cols-8 gap-3">
            {grouped.map((group) => (
              <DroppableColumn key={group.column} status={group.column} count={group.items.length}>
                {group.items.map((order) => (
                  <DraggableCard
                    key={order.id}
                    order={order}
                    isDraggingPlaceholder={draggedId === order.id}
                    onSelect={onSelectOrder}
                  />
                ))}
                {group.items.length === 0 ? (
                  <p className="border border-dashed border-ops-borderMid bg-ops-surface/60 px-3 py-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ops-muted">
                    Solte aqui
                  </p>
                ) : null}
              </DroppableColumn>
            ))}
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {draggedOrder ? (
            <div className="rotate-[-1.5deg] opacity-95">
              <OrderCardVisual order={draggedOrder} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}

function FilterBar({
  activeFilters,
  counts,
  onToggle,
  onClear,
  visible,
  total,
  filtered
}: {
  activeFilters: Set<FilterKey>;
  counts: Record<FilterKey, number>;
  onToggle: (key: FilterKey) => void;
  onClear: () => void;
  visible: number;
  total: number;
  filtered: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border border-ops-border bg-ops-surface px-3 py-2.5 shadow-[0_18px_42px_-34px_rgba(10,43,79,0.9)]">
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ops-muted">
        <FilterGlyph className="h-3.5 w-3.5" />
        Filtros
      </span>
      {filterDefs.map((def) => {
        const isActive = activeFilters.has(def.key);
        const isAlertFilter = def.key === "atrasados" || def.key === "alerta";
        return (
          <button
            key={def.key}
            type="button"
            onClick={() => onToggle(def.key)}
            disabled={counts[def.key] === 0}
            className={cn(
              "inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium transition-colors",
              isActive
                ? "border-ops-accent bg-ops-accent text-white"
                : "border-ops-border bg-ops-surface text-ops-inkMid hover:border-ops-accent hover:text-ops-accent",
              counts[def.key] === 0 && "cursor-not-allowed opacity-40 hover:border-ops-border hover:text-ops-inkMid"
            )}
          >
            {isAlertFilter && !isActive ? (
              <AlertGlyph className="h-3 w-3 text-ops-warnMark" />
            ) : null}
            {def.label}
            <span
              className={cn(
                "inline-grid min-h-[16px] min-w-[16px] place-items-center border px-1 font-mono text-[0.6rem] font-semibold",
                isActive ? "border-white/30 bg-white/15 text-white" : "border-ops-border bg-ops-page text-ops-muted"
              )}
            >
              {counts[def.key]}
            </span>
          </button>
        );
      })}
      <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ops-muted">
        Mostrando {String(visible).padStart(2, "0")} de {String(total).padStart(2, "0")}
      </span>
      {filtered ? (
        <button
          type="button"
          onClick={onClear}
          className="border border-ops-border bg-ops-surface px-2.5 py-1 text-xs font-semibold text-ops-inkMid hover:border-ops-accent hover:text-ops-accent"
        >
          Limpar
        </button>
      ) : null}
    </div>
  );
}

function DroppableColumn({
  status,
  count,
  children
}: {
  status: OrderStatus;
  count: number;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "overflow-hidden border bg-ops-accentFaint transition-colors shadow-[0_18px_42px_-36px_rgba(10,43,79,0.9)]",
        isOver ? "border-ops-accent ring-2 ring-ops-accent/40" : "border-ops-border"
      )}
    >
      <div className="flex items-center justify-between border-b border-ops-border bg-ops-surface px-3 py-3">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ops-inkMid">
          {status}
        </span>
        <span className="border border-ops-borderMid bg-ops-surface px-2 py-0.5 text-xs text-ops-muted">
          {count}
        </span>
      </div>
      <div className="grid gap-3 p-3">{children}</div>
    </div>
  );
}

function DraggableCard({
  order,
  isDraggingPlaceholder,
  onSelect
}: {
  order: Order;
  isDraggingPlaceholder: boolean;
  onSelect: (order: Order) => void;
}) {
  const { setNodeRef, attributes, listeners } = useDraggable({ id: order.id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn("cursor-grab active:cursor-grabbing", isDraggingPlaceholder && "opacity-30")}
    >
      <OrderCardVisual order={order} onSelect={onSelect} />
    </div>
  );
}

const urgencyStyles: Record<
  ReturnType<typeof urgencyTone>,
  { rail: string; tag: string; tagText: string }
> = {
  ok: {
    rail: "bg-[#3aa775]",
    tag: "border-[#bfe0cf] bg-[#e8f7ee]",
    tagText: "text-[#1f6644]"
  },
  warn: {
    rail: "bg-ops-warnMark",
    tag: "border-ops-warnBorder bg-ops-warnBg",
    tagText: "text-ops-warnInk"
  },
  critical: {
    rail: "bg-[#d04848]",
    tag: "border-[#f0bcbc] bg-[#fde8e8]",
    tagText: "text-[#7a1f1f]"
  }
};

function OrderCardVisual({
  order,
  onSelect
}: {
  order: Order;
  onSelect?: (order: Order) => void;
}) {
  const tone = urgencyTone(order.daysUntilDue);
  const styles = urgencyStyles[tone];
  const stepIndex = progressIndex(order.status, columns);
  const totalSteps = columns.length;
  const interactive = Boolean(onSelect);

  return (
    <article
      onClick={onSelect ? () => onSelect(order) : undefined}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(order);
              }
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Abrir pedido ${order.id}, ${order.client}` : undefined}
      className={cn(
        "group relative overflow-hidden border border-ops-border bg-ops-surface shadow-[0_12px_32px_-28px_rgba(10,43,79,0.9)] transition-shadow",
        interactive
          ? "cursor-pointer hover:border-ops-accent hover:shadow-[0_18px_40px_-22px_rgba(10,43,79,0.5)] focus:border-ops-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ops-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ops-accentFaint"
          : "shadow-[0_22px_48px_-18px_rgba(10,43,79,0.55)]"
      )}
    >
      <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1", styles.rail)} />

      <div className="pl-4 pr-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold text-ops-accent">#{order.id}</span>
          <span
            className={cn(
              "border px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em]",
              styles.tag,
              styles.tagText
            )}
          >
            {formatDueLabel(order.daysUntilDue)}
          </span>
        </div>

        <p className="mt-2.5 flex items-center gap-1.5 text-sm font-semibold text-ops-ink">
          {order.priority === "vip" ? (
            <span title="Cliente prioritário" aria-label="Cliente prioritário" className="text-ops-accent">
              ★
            </span>
          ) : null}
          {order.client}
        </p>
        <p className="mt-0.5 text-[0.82rem] leading-5 text-ops-muted">{order.part}</p>

        <ProgressBar current={stepIndex} total={totalSteps} />

        {order.alert ? (
          <p className="mt-2 inline-flex items-center gap-1.5 border border-ops-warnBorder bg-ops-warnBg px-2 py-1 text-[0.65rem] font-medium text-ops-warnInkMid">
            <span className="h-1.5 w-1.5 bg-ops-warnMark" />
            {order.alert}
          </p>
        ) : null}

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-ops-borderSoft pt-2.5 text-[0.7rem] text-ops-muted">
          <span
            title={`Responsável: ${order.owner}`}
            className="inline-flex h-6 min-w-6 items-center justify-center border border-ops-border bg-ops-accentSoft px-1.5 font-mono text-[0.62rem] font-semibold text-ops-accent"
          >
            {order.ownerInitials}
          </span>
          <span className="font-mono">{order.statusSince}</span>
          {order.attachments > 0 ? (
            <span className="inline-flex items-center gap-1 font-mono">
              <GlyphPaperclip className="h-3 w-3" />
              {order.attachments}
            </span>
          ) : null}
          {order.value ? (
            <span className="ml-auto font-mono font-semibold text-ops-inkMid">{order.value}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Etapa ${current + 1} de ${total}`}
      className="mt-2.5 flex gap-[2px]"
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn("h-1 flex-1", i <= current ? "bg-ops-accent" : "bg-ops-border")}
        />
      ))}
    </div>
  );
}
