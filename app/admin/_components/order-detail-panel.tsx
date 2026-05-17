"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRight,
  CloseX,
  GlyphCompass,
  GlyphDocument,
  GlyphGear,
  GlyphHammer,
  GlyphPackage,
  GlyphPaperclip,
  GlyphTruck,
  Plus,
  SendGlyph,
  WhatsappGlyph
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn, makeClientWhatsappUrl } from "@/lib/utils";
import {
  attachmentsForOrder,
  columns,
  commentsForOrder,
  eventsForOrder,
  findClientByName
} from "../_lib/mock-data";
import {
  formatDueLabel,
  progressIndex,
  urgencyTone,
  type Order,
  type OrderEventType
} from "../_lib/types";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Tab = "overview" | "history" | "attachments" | "comments";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Visão geral" },
  { id: "history", label: "Histórico" },
  { id: "attachments", label: "Anexos" },
  { id: "comments", label: "Comentários" }
];

const urgencyChip: Record<
  ReturnType<typeof urgencyTone>,
  { wrapper: string; text: string }
> = {
  ok: { wrapper: "border-[#bfe0cf] bg-[#e8f7ee]", text: "text-[#1f6644]" },
  warn: { wrapper: "border-ops-warnBorder bg-ops-warnBg", text: "text-ops-warnInk" },
  critical: { wrapper: "border-[#f0bcbc] bg-[#fde8e8]", text: "text-[#7a1f1f]" }
};

const eventIcon: Record<OrderEventType, IconComponent> = {
  created: GlyphPackage,
  status: GlyphGear,
  comment: GlyphDocument,
  attachment: GlyphPaperclip,
  note: GlyphHammer,
  system: GlyphCompass
};

export function OrderDetailPanel({
  order,
  onClose
}: {
  order: Order | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!order) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [order, onClose]);

  const open = order !== null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 grid place-items-center px-4 py-6 transition-opacity duration-200",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ops-overlay/65 backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={order ? `order-title-${order.id}` : undefined}
        className={cn(
          "relative flex max-h-[92vh] w-full max-w-[960px] flex-col border border-ops-border bg-ops-page shadow-[0_30px_120px_-30px_rgba(0,0,0,0.55)] transition-transform duration-200 ease-out",
          open ? "scale-100" : "scale-[0.97]"
        )}
      >
        {order ? <PanelBody key={order.id} order={order} onClose={onClose} /> : null}
      </section>
    </div>
  );
}

function PanelBody({
  order,
  onClose
}: {
  order: Order;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const events = useMemo(() => eventsForOrder(order.id), [order.id]);
  const attachments = useMemo(() => attachmentsForOrder(order.id), [order.id]);
  const comments = useMemo(() => commentsForOrder(order.id), [order.id]);

  const tone = urgencyTone(order.daysUntilDue);
  const chip = urgencyChip[tone];
  const stepIndex = progressIndex(order.status, columns);
  const totalSteps = columns.length;
  const nextStatus = stepIndex < totalSteps - 1 ? columns[stepIndex + 1] : null;

  const tabCounts: Record<Tab, number | null> = {
    overview: null,
    history: events.length,
    attachments: attachments.length,
    comments: comments.length
  };

  const client = findClientByName(order.client);
  const clientMessage = [
    `Olá! Sou da CMJ Modelação. Atualização do pedido #${order.id} (${order.part}):`,
    "",
    `Etapa atual: ${order.status}.`,
    `Previsão: ${order.due} (${formatDueLabel(order.daysUntilDue)}).`,
    "",
    "Qualquer dúvida, é só responder por aqui."
  ].join("\n");
  const notifyHref = makeClientWhatsappUrl(client?.phone, clientMessage);

  return (
    <>
      <header className="border-b border-ops-border bg-ops-surface px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ops-accent">
              Pedido em detalhe
            </p>
            <h2
              id={`order-title-${order.id}`}
              className="mt-2 flex items-center gap-2 font-display text-2xl font-bold text-ops-ink"
            >
              {order.priority === "vip" ? (
                <span className="text-ops-accent" aria-label="Cliente prioritário">
                  ★
                </span>
              ) : null}
              #{order.id} · {order.client}
            </h2>
            <p className="mt-1 truncate text-sm text-ops-muted">{order.part}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center border border-ops-border bg-ops-surface text-ops-inkMid hover:border-ops-accent hover:text-ops-accent"
            aria-label="Fechar painel"
          >
            <CloseX className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ops-muted">
              Etapa
            </span>
            <span className="font-semibold text-ops-ink">{order.status}</span>
          </Chip>
          <Chip>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ops-muted">
              Há
            </span>
            <span className="font-semibold text-ops-ink">{order.statusSince}</span>
          </Chip>
          <span
            className={cn(
              "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.1em]",
              chip.wrapper,
              chip.text
            )}
          >
            {formatDueLabel(order.daysUntilDue)} · {order.due}
          </span>
          {order.value ? (
            <Chip>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ops-muted">
                Valor
              </span>
              <span className="font-semibold text-ops-ink">{order.value}</span>
            </Chip>
          ) : null}
          <Chip>
            <span
              className="inline-flex h-5 min-w-5 items-center justify-center border border-ops-border bg-ops-accentSoft px-1 font-mono text-[0.6rem] font-semibold text-ops-accent"
            >
              {order.ownerInitials}
            </span>
            <span className="text-ops-inkMid">{order.owner}</span>
          </Chip>
        </div>

        <Progress current={stepIndex} total={totalSteps} />
      </header>

      <nav className="flex border-b border-ops-border bg-ops-surface px-6">
        {tabs.map((entry) => {
          const count = tabCounts[entry.id];
          const isActive = tab === entry.id;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setTab(entry.id)}
              className={cn(
                "relative px-3 py-3 text-sm font-medium transition-colors",
                isActive ? "text-ops-ink" : "text-ops-muted hover:text-ops-inkMid"
              )}
            >
              {entry.label}
              {count !== null ? (
                <span className="ml-1.5 font-mono text-[0.7rem] text-ops-muted">({count})</span>
              ) : null}
              {isActive ? (
                <span className="absolute inset-x-3 -bottom-px h-0.5 bg-ops-accent" />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {tab === "overview" ? <OverviewTab order={order} /> : null}
        {tab === "history" ? <HistoryTab events={events} /> : null}
        {tab === "attachments" ? <AttachmentsTab attachments={attachments} /> : null}
        {tab === "comments" ? <CommentsTab comments={comments} /> : null}
      </div>

      <footer className="border-t border-ops-border bg-ops-surface px-6 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <a
            href={notifyHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-ops-border bg-ops-surface px-4 py-2 text-sm font-semibold text-ops-inkMid transition-colors hover:border-ops-accent hover:text-ops-accent"
            data-track="admin_whatsapp_client_notify"
          >
            <WhatsappGlyph className="h-4 w-4" />
            Avisar cliente · WhatsApp
          </a>
          {nextStatus ? (
            <Button variant="accent">
              Avançar para {nextStatus}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ops-muted">
              Fluxo concluído
            </span>
          )}
        </div>
      </footer>
    </>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-ops-border bg-ops-surface px-2.5 py-1 text-xs">
      {children}
    </span>
  );
}

function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Etapa ${current + 1} de ${total}`}
      className="mt-4 flex gap-[3px]"
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn("h-1.5 flex-1", i <= current ? "bg-ops-accent" : "bg-ops-border")}
        />
      ))}
    </div>
  );
}

function OverviewTab({ order }: { order: Order }) {
  return (
    <div className="grid gap-5">
      <Section title="Dados rápidos">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border border-ops-border bg-ops-surface p-4 text-sm md:grid-cols-3">
          <Field label="Prazo">{order.due}</Field>
          <Field label="Status atual">{order.status}</Field>
          <Field label="Há">{order.statusSince}</Field>
          <Field label="Responsável">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 min-w-5 items-center justify-center border border-ops-border bg-ops-accentSoft px-1 font-mono text-[0.6rem] font-semibold text-ops-accent">
                {order.ownerInitials}
              </span>
              {order.owner}
            </span>
          </Field>
          <Field label="Atualizado">{order.updatedAt}</Field>
          <Field label="Anexos">{order.attachments}</Field>
          {order.value ? <Field label="Valor">{order.value}</Field> : null}
          {order.alert ? <Field label="Alerta">{order.alert}</Field> : null}
        </dl>
      </Section>

      <Section title="Peça / projeto">
        <p className="border border-ops-border bg-ops-surface p-4 text-sm leading-7 text-ops-inkMid">
          {order.part}
        </p>
      </Section>
    </div>
  );
}

function HistoryTab({ events }: { events: ReturnType<typeof eventsForOrder> }) {
  if (events.length === 0) {
    return <EmptyState text="Nenhum evento registrado ainda." />;
  }
  return (
    <ol className="grid gap-2">
      {events.map((event) => {
        const Icon = eventIcon[event.type];
        return (
          <li
            key={event.id}
            className="grid grid-cols-[28px_1fr_auto] items-start gap-3 border border-ops-border bg-ops-surface px-4 py-3"
          >
            <span className="mt-0.5 grid h-7 w-7 place-items-center border border-ops-border bg-ops-accentSoft text-ops-accent">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-6 text-ops-inkMid">{event.text}</p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ops-muted">
                {event.by} · {event.byInitials}
              </p>
            </div>
            <span className="whitespace-nowrap font-mono text-[0.7rem] text-ops-muted">
              {event.at}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function AttachmentsTab({
  attachments
}: {
  attachments: ReturnType<typeof attachmentsForOrder>;
}) {
  return (
    <div className="grid gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-2 border border-dashed border-ops-borderMid bg-ops-surface/60 px-4 py-6 text-sm font-medium text-ops-inkMid transition-colors hover:border-ops-accent hover:text-ops-accent"
      >
        <Plus className="h-4 w-4" />
        Adicionar anexo
        <span className="ml-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ops-muted">
          (Firebase Storage)
        </span>
      </button>

      {attachments.length === 0 ? (
        <EmptyState text="Nenhum anexo neste pedido ainda." />
      ) : (
        <ul className="grid gap-2">
          {attachments.map((file) => (
            <li
              key={file.id}
              className="grid grid-cols-[28px_1fr_auto] items-center gap-3 border border-ops-border bg-ops-surface px-4 py-3"
            >
              <span className="grid h-7 w-7 place-items-center border border-ops-border bg-ops-accentSoft text-ops-accent">
                <GlyphPaperclip className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ops-ink">{file.name}</p>
                <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ops-muted">
                  {file.kind} · {file.size} · {file.by} · {file.uploadedAt}
                </p>
              </div>
              <button
                type="button"
                className="border border-ops-border px-3 py-1.5 text-xs font-semibold text-ops-inkMid hover:border-ops-accent hover:text-ops-accent"
              >
                Abrir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CommentsTab({ comments }: { comments: ReturnType<typeof commentsForOrder> }) {
  return (
    <div className="grid gap-4">
      {comments.length === 0 ? (
        <EmptyState text="Nenhum comentário ainda. Use o campo abaixo para deixar o primeiro." />
      ) : (
        <ul className="grid gap-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="grid grid-cols-[36px_1fr] gap-3 border border-ops-border bg-ops-surface px-4 py-3"
            >
              <span className="grid h-9 w-9 place-items-center border border-ops-border bg-ops-accentSoft font-mono text-[0.65rem] font-semibold text-ops-accent">
                {comment.byInitials}
              </span>
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-ops-ink">{comment.by}</p>
                  <span className="font-mono text-[0.65rem] text-ops-muted">{comment.at}</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-ops-inkMid">{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form
        className="grid gap-2 border border-ops-border bg-ops-surface p-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-ops-inkMid">Novo comentário</span>
          <textarea
            rows={3}
            placeholder="Deixe um recado para a operação. Persistência entra com Firestore."
            className="border border-ops-border bg-ops-surface px-3 py-2 text-sm text-ops-inkSoft outline-none focus:border-ops-accent"
          />
        </label>
        <div className="flex justify-end">
          <Button type="submit" variant="accent">
            <SendGlyph className="h-4 w-4" />
            Comentar
          </Button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ops-muted">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ops-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-ops-ink">{children}</dd>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="border border-dashed border-ops-borderMid bg-ops-surface/60 px-4 py-8 text-center">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ops-muted">
        {text}
      </p>
    </div>
  );
}
