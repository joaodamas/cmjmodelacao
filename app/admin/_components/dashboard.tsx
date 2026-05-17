import { alerts, calendar, metrics, orders, timeline } from "../_lib/mock-data";
import { cn } from "@/lib/utils";
import { AlertGlyph, CheckMark } from "@/components/icons";
import { PanelTitle } from "./ui-primitives";

export function Dashboard() {
  return (
    <div className="grid gap-6">
      <MetricsGrid />

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <TimelinePanel />
        <CalendarPanel />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AlertsPanel />
        <ProductionSnapshot />
      </section>
    </div>
  );
}

function MetricsGrid() {
  const metricMeta = [
    { trend: "+12%", label: "vs. semana", fill: "w-[72%]", tone: "good" },
    { trend: "-1", label: "desde ontem", fill: "w-[34%]", tone: "warn" },
    { trend: "R$ 38k", label: "em aberto", fill: "w-[58%]", tone: "default" },
    { trend: "3", label: "ate sexta", fill: "w-[44%]", tone: "default" }
  ] as const;

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const meta = metricMeta[index];
        return (
          <article
            key={metric.label}
            className="relative overflow-hidden border border-ops-border bg-ops-surface p-5 shadow-[0_18px_44px_-34px_rgba(10,43,79,0.9)]"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-ops-accent" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ops-mutedStrong">
                  {metric.label}
                </p>
                <strong className="mt-3 block font-display text-3xl text-ops-ink">
                  {metric.value}
                </strong>
              </div>
              <span className="grid h-11 w-11 place-items-center border border-ops-border bg-ops-accentSoft text-ops-accent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.72)]">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4 h-1.5 bg-ops-borderSoft">
              <span
                className={cn(
                  "block h-full",
                  meta.fill,
                  meta.tone === "warn" ? "bg-ops-warnMark" : "bg-ops-accent"
                )}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-ops-muted">{metric.note}</p>
              <span
                className={cn(
                  "border px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em]",
                  meta.tone === "warn"
                    ? "border-ops-warnBorder bg-ops-warnBg text-ops-warnInkMid"
                    : "border-ops-border bg-ops-accentSoft text-ops-accent"
                )}
              >
                {meta.trend} {meta.label}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function TimelinePanel() {
  return (
    <article className="overflow-hidden border border-ops-border bg-ops-surface shadow-[0_22px_54px_-42px_rgba(10,43,79,0.9)]">
      <PanelTitle
        title="Timeline operacional"
        subtitle="Movimentos que precisam de atenção no dia."
      />
      <div className="divide-y divide-black/10">
        {timeline.map((item) => (
          <div
            key={`${item.status}-${item.time}`}
            className="grid grid-cols-[86px_1fr_56px] gap-4 px-5 py-4 transition-colors hover:bg-ops-accentSoft/60"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-ops-accent" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ops-accent">
                {item.status}
              </span>
            </div>
            <p className="text-sm text-ops-inkMid">{item.text}</p>
            <span className="text-right font-mono text-xs text-ops-mutedSoft">{item.time}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function CalendarPanel() {
  return (
    <article className="overflow-hidden border border-ops-border bg-ops-surface shadow-[0_22px_54px_-42px_rgba(10,43,79,0.9)]">
      <PanelTitle
        title="Calendário da semana"
        subtitle="Entrega, produção, fiscal e orçamento."
      />
      <div className="grid gap-3 p-5">
        {calendar.map((item, index) => (
          <div
            key={item.label}
            className="grid grid-cols-[56px_1fr_auto] items-center border border-ops-border bg-ops-surface transition-colors hover:border-ops-borderMid hover:bg-ops-accentSoft/45"
          >
            <span className="grid place-items-center self-stretch bg-ops-accentPale py-3 font-display text-xl font-bold text-ops-card">
              {item.day}
            </span>
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-ops-ink">{item.label}</p>
              <p className="mt-1 text-xs text-ops-muted">{item.type}</p>
            </div>
            <span
              className={cn(
                "mr-4 h-2 w-2",
                index === 0 ? "bg-ops-warnMark" : "bg-ops-accent"
              )}
            />
          </div>
        ))}
      </div>
    </article>
  );
}

function AlertsPanel() {
  return (
    <article className="overflow-hidden border border-ops-border bg-ops-surface shadow-[0_22px_54px_-42px_rgba(10,43,79,0.9)]">
      <PanelTitle title="Alertas" subtitle="Sem ruído. Só o que precisa de ação." />
      <div className="grid gap-2 p-5">
        {alerts.map((alert) => (
          <div
            key={alert}
            className="grid grid-cols-[34px_1fr_auto] items-center gap-3 border border-ops-warnBorder bg-ops-warnBg px-3 py-3 text-sm text-ops-warnInk"
          >
            <span className="grid h-8 w-8 place-items-center border border-ops-warnBorder bg-white/55 text-ops-warnInkMid">
              <AlertGlyph className="h-4 w-4" />
            </span>
            <span>{alert}</span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ops-warnInkSoft">
              ação
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ProductionSnapshot() {
  const productionOrders = orders.filter((order) =>
    ["Aprovado", "Produção", "Finalização"].includes(order.status)
  );

  return (
    <article className="overflow-hidden border border-ops-border bg-ops-surface shadow-[0_22px_54px_-42px_rgba(10,43,79,0.9)]">
      <PanelTitle title="Produção" subtitle="Pedidos na fila ou em execução." />
      <div className="divide-y divide-black/10">
        {productionOrders.map((order) => (
          <div
            key={order.id}
            className="grid gap-2 px-5 py-4 transition-colors hover:bg-ops-accentSoft/60 md:grid-cols-[88px_1fr_120px_32px] md:items-center"
          >
            <span className="font-mono text-xs text-ops-muted">#{order.id}</span>
            <div>
              <p className="text-sm font-semibold text-ops-ink">{order.part}</p>
              <p className="mt-1 text-xs text-ops-muted">{order.client}</p>
            </div>
            <span className="border border-ops-border bg-ops-accentSoft px-2 py-1 text-center text-xs font-semibold text-ops-inkMid">
              {order.status}
            </span>
            <CheckMark className="hidden h-4 w-4 text-ops-accent md:block" />
          </div>
        ))}
      </div>
    </article>
  );
}
