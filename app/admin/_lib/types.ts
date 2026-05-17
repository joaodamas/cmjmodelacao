import type { ComponentType, SVGProps } from "react";

export type OrderStatus =
  | "Recebido"
  | "Orçamento"
  | "Aprovado"
  | "Produção"
  | "Finalização"
  | "Entrega"
  | "NF"
  | "Faturado";

export type Order = {
  id: string;
  client: string;
  part: string;
  due: string;
  daysUntilDue: number;
  owner: string;
  ownerInitials: string;
  status: OrderStatus;
  statusSince: string;
  updatedAt: string;
  attachments: number;
  alert?: string;
  value?: string;
  priority?: "vip" | "normal";
};

export type UrgencyTone = "ok" | "warn" | "critical";

export function urgencyTone(daysUntilDue: number): UrgencyTone {
  if (daysUntilDue <= 1) return "critical";
  if (daysUntilDue <= 5) return "warn";
  return "ok";
}

export function formatDueLabel(daysUntilDue: number): string {
  if (daysUntilDue < 0) return `Atrasado +${Math.abs(daysUntilDue)}d`;
  if (daysUntilDue === 0) return "Hoje";
  if (daysUntilDue === 1) return "D-1 · amanhã";
  return `D-${daysUntilDue}`;
}

export function progressIndex(
  status: OrderStatus,
  columns: readonly OrderStatus[]
): number {
  return Math.max(0, columns.indexOf(status));
}

export type Client = {
  name: string;
  contact: string;
  phone: string;
  orders: number;
  fiscal: "Completo" | "Pendente";
  lastOrder: string;
};

export type FinanceStatus = "A faturar" | "Em atraso" | "Recebido" | "A receber";

export type FinanceRow = {
  order: string;
  client: string;
  value: string;
  due: string;
  status: FinanceStatus;
};

export type TimelineEntry = {
  status: string;
  text: string;
  time: string;
};

export type CalendarEntry = {
  day: string;
  label: string;
  type: string;
};

export type Metric = {
  label: string;
  value: string;
  note: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type OrderEventType = "created" | "status" | "comment" | "attachment" | "note" | "system";

export type OrderEvent = {
  id: string;
  at: string;
  by: string;
  byInitials: string;
  type: OrderEventType;
  text: string;
};

export type AttachmentKind = "drawing" | "pdf" | "image" | "step" | "other";

export type OrderAttachment = {
  id: string;
  name: string;
  size: string;
  kind: AttachmentKind;
  uploadedAt: string;
  by: string;
};

export type OrderComment = {
  id: string;
  at: string;
  by: string;
  byInitials: string;
  text: string;
};

export type AdminMenuKey =
  | "Dashboard"
  | "Pedidos"
  | "Produção"
  | "Financeiro"
  | "Faturamento"
  | "Clientes"
  | "Configurações";

export type StatusTone = "default" | "warn" | "success";

export function toneForStatus(status: string): StatusTone {
  if (["Em atraso", "A faturar", "Pendente"].includes(status)) return "warn";
  if (["Recebido", "Completo"].includes(status)) return "success";
  return "default";
}
