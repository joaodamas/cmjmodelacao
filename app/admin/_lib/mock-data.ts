import {
  GlyphDocument,
  GlyphGear,
  GlyphPackage,
  GlyphTruck
} from "@/components/icons";
import type {
  AdminMenuKey,
  CalendarEntry,
  Client,
  FinanceRow,
  Metric,
  Order,
  OrderAttachment,
  OrderComment,
  OrderEvent,
  OrderStatus,
  TimelineEntry
} from "./types";

export const menu: AdminMenuKey[] = [
  "Dashboard",
  "Pedidos",
  "Produção",
  "Financeiro",
  "Faturamento",
  "Clientes",
  "Configurações"
];

export const columns: OrderStatus[] = [
  "Recebido",
  "Orçamento",
  "Aprovado",
  "Produção",
  "Finalização",
  "Entrega",
  "NF",
  "Faturado"
];

export const orders: Order[] = [
  {
    id: "204",
    client: "Grupo Aethra",
    part: "Molde EPS automotivo",
    due: "18/05",
    daysUntilDue: 2,
    owner: "Produção",
    ownerInitials: "PR",
    status: "Produção",
    statusSince: "há 3 dias",
    updatedAt: "há 2h",
    attachments: 4,
    alert: "Prazo curto",
    value: "R$ 18.400",
    priority: "vip"
  },
  {
    id: "203",
    client: "Gestamp",
    part: "Modelo técnico bipartido",
    due: "20/05",
    daysUntilDue: 4,
    owner: "Orçamento",
    ownerInitials: "OR",
    status: "Orçamento",
    statusSince: "há 1 dia",
    updatedAt: "há 6h",
    attachments: 2,
    priority: "vip"
  },
  {
    id: "202",
    client: "Fac Tools",
    part: "Peça de grande porte",
    due: "21/05",
    daysUntilDue: 5,
    owner: "CNC Router",
    ownerInitials: "CR",
    status: "Aprovado",
    statusSince: "há 6h",
    updatedAt: "há 6h",
    attachments: 3,
    value: "R$ 12.900"
  },
  {
    id: "201",
    client: "Itafunge",
    part: "Molde EPS para aço",
    due: "Hoje",
    daysUntilDue: 0,
    owner: "Acabamento",
    ownerInitials: "AC",
    status: "Finalização",
    statusSince: "há 12h",
    updatedAt: "há 45min",
    attachments: 5,
    alert: "Finalizar hoje"
  },
  {
    id: "200",
    client: "Multimatech",
    part: "Modelo para dispositivo",
    due: "17/05",
    daysUntilDue: 1,
    owner: "Expedição",
    ownerInitials: "EX",
    status: "Entrega",
    statusSince: "há 4h",
    updatedAt: "há 4h",
    attachments: 2
  },
  {
    id: "199",
    client: "Hemaval",
    part: "Molde técnico alumínio",
    due: "15/05",
    daysUntilDue: -1,
    owner: "Fiscal",
    ownerInitials: "FI",
    status: "NF",
    statusSince: "há 2 dias",
    updatedAt: "há 1d",
    attachments: 3,
    alert: "NF pendente",
    value: "R$ 9.700"
  },
  {
    id: "198",
    client: "JM Ferramentaria",
    part: "Referência física usinada",
    due: "13/05",
    daysUntilDue: -3,
    owner: "Financeiro",
    ownerInitials: "FN",
    status: "Faturado",
    statusSince: "há 4 dias",
    updatedAt: "há 2d",
    attachments: 6,
    value: "R$ 7.200"
  }
];

export const timeline: TimelineEntry[] = [
  { status: "Recebido", text: "Pedido #204 entrou com desenho e prazo curto.", time: "08:20" },
  { status: "Produção", text: "Pedido #201 previsto para finalização hoje.", time: "10:45" },
  { status: "Faturamento", text: "Pedido #199 aguardando número da NF.", time: "11:10" },
  { status: "Entrega", text: "Pedido #200 liberado para expedição.", time: "14:00" }
];

export const alerts: string[] = [
  "Pedido #204 vence em 2 dias",
  "Pedido #199 aguardando emissão de NF",
  "Pedido #201 precisa de conferência final",
  "Cliente Gestamp aguardando retorno de orçamento"
];

export const calendar: CalendarEntry[] = [
  { day: "15", label: "NF #199", type: "Fiscal" },
  { day: "16", label: "Finalizar #201", type: "Produção" },
  { day: "18", label: "Entrega #204", type: "Entrega" },
  { day: "20", label: "Retorno #203", type: "Orçamento" }
];

export const metrics: Metric[] = [
  { label: "Pedidos em andamento", value: "18", note: "6 em produção", icon: GlyphPackage },
  { label: "Produções atrasadas", value: "2", note: "1 crítica", icon: GlyphGear },
  { label: "Pedidos para faturar", value: "4", note: "R$ 38.200", icon: GlyphDocument },
  { label: "Entregas da semana", value: "7", note: "3 até sexta", icon: GlyphTruck }
];

export const financeRows: FinanceRow[] = [
  { order: "#204", client: "Grupo Aethra", value: "R$ 18.400", due: "22/05", status: "A receber" },
  { order: "#199", client: "Hemaval", value: "R$ 9.700", due: "NF pendente", status: "A faturar" },
  { order: "#198", client: "JM Ferramentaria", value: "R$ 7.200", due: "13/05", status: "Recebido" },
  { order: "#196", client: "Usicomp", value: "R$ 11.600", due: "10/05", status: "Em atraso" }
];

export const clients: Client[] = [
  {
    name: "Grupo Aethra",
    contact: "Compras técnicas",
    phone: "(11) 90000-2040",
    orders: 14,
    fiscal: "Completo",
    lastOrder: "#204"
  },
  {
    name: "Gestamp",
    contact: "Engenharia",
    phone: "(11) 90000-2030",
    orders: 9,
    fiscal: "Completo",
    lastOrder: "#203"
  },
  {
    name: "Hemaval",
    contact: "Fiscal",
    phone: "(11) 90000-1990",
    orders: 5,
    fiscal: "Pendente",
    lastOrder: "#199"
  },
  {
    name: "JM Ferramentaria",
    contact: "Produção",
    phone: "(11) 90000-1980",
    orders: 7,
    fiscal: "Completo",
    lastOrder: "#198"
  }
];

const defaultEvents = (orderId: string): OrderEvent[] => [
  {
    id: `${orderId}-e1`,
    at: "há 4 dias",
    by: "Comercial",
    byInitials: "CM",
    type: "created",
    text: "Pedido criado a partir de contato no WhatsApp."
  },
  {
    id: `${orderId}-e2`,
    at: "há 2 dias",
    by: "Orçamento",
    byInitials: "OR",
    type: "status",
    text: "Movido para Aprovado · cliente confirmou proposta."
  }
];

export const orderEvents: Record<string, OrderEvent[]> = {
  "204": [
    {
      id: "204-e1",
      at: "há 5 dias",
      by: "Comercial",
      byInitials: "CM",
      type: "created",
      text: "Pedido criado · cliente enviou STEP por WhatsApp."
    },
    {
      id: "204-e2",
      at: "há 4 dias",
      by: "Orçamento",
      byInitials: "OR",
      type: "comment",
      text: "Orçamento técnico enviado: R$ 18.400 com prazo de 5 dias úteis."
    },
    {
      id: "204-e3",
      at: "há 3 dias",
      by: "Comercial",
      byInitials: "CM",
      type: "status",
      text: "Aprovado pelo cliente · liberado para CNC Router 02."
    },
    {
      id: "204-e4",
      at: "há 3 dias",
      by: "Produção",
      byInitials: "PR",
      type: "status",
      text: "Entrou em produção · usinagem iniciada."
    },
    {
      id: "204-e5",
      at: "há 2h",
      by: "Produção",
      byInitials: "PR",
      type: "comment",
      text: "Desbaste 70% concluído. Acabamento previsto para amanhã."
    }
  ],
  "201": [
    {
      id: "201-e1",
      at: "há 6 dias",
      by: "Comercial",
      byInitials: "CM",
      type: "created",
      text: "Pedido criado · molde para aço fundido."
    },
    {
      id: "201-e2",
      at: "há 5 dias",
      by: "Produção",
      byInitials: "PR",
      type: "status",
      text: "Entrou em produção."
    },
    {
      id: "201-e3",
      at: "há 12h",
      by: "Acabamento",
      byInitials: "AC",
      type: "status",
      text: "Movido para Finalização · conferência dimensional em andamento."
    },
    {
      id: "201-e4",
      at: "há 45min",
      by: "Acabamento",
      byInitials: "AC",
      type: "comment",
      text: "Raios internos refinados. Pronto para liberação após dupla checagem."
    }
  ],
  "199": [
    {
      id: "199-e1",
      at: "há 8 dias",
      by: "Comercial",
      byInitials: "CM",
      type: "created",
      text: "Pedido criado para Hemaval."
    },
    {
      id: "199-e2",
      at: "há 6 dias",
      by: "Produção",
      byInitials: "PR",
      type: "status",
      text: "Entrou em produção · molde técnico alumínio."
    },
    {
      id: "199-e3",
      at: "há 3 dias",
      by: "Expedição",
      byInitials: "EX",
      type: "status",
      text: "Entregue ao cliente. Aguardando emissão de NF."
    },
    {
      id: "199-e4",
      at: "há 1 dia",
      by: "Fiscal",
      byInitials: "FI",
      type: "note",
      text: "Cliente solicitou desdobramento da NF em duas etapas. Aguardando confirmação."
    }
  ]
};

export function eventsForOrder(orderId: string): OrderEvent[] {
  return orderEvents[orderId] ?? defaultEvents(orderId);
}

export const orderAttachments: Record<string, OrderAttachment[]> = {
  "204": [
    { id: "204-a1", name: "molde-automotivo-v3.step", size: "12.4 MB", kind: "step", uploadedAt: "há 5d", by: "Cliente" },
    { id: "204-a2", name: "desenho-tecnico-rev2.pdf", size: "2.1 MB", kind: "pdf", uploadedAt: "há 5d", by: "Cliente" },
    { id: "204-a3", name: "foto-peca-amostra.jpg", size: "3.6 MB", kind: "image", uploadedAt: "há 4d", by: "Comercial" },
    { id: "204-a4", name: "checagem-dimensional.pdf", size: "1.2 MB", kind: "pdf", uploadedAt: "há 1d", by: "Produção" }
  ],
  "201": [
    { id: "201-a1", name: "molde-aco-v1.dwg", size: "4.8 MB", kind: "drawing", uploadedAt: "há 6d", by: "Cliente" },
    { id: "201-a2", name: "croqui-revisao.pdf", size: "780 KB", kind: "pdf", uploadedAt: "há 5d", by: "Engenharia" },
    { id: "201-a3", name: "operacao-cnc-01.jpg", size: "2.9 MB", kind: "image", uploadedAt: "há 2d", by: "Produção" },
    { id: "201-a4", name: "operacao-cnc-02.jpg", size: "3.1 MB", kind: "image", uploadedAt: "há 2d", by: "Produção" },
    { id: "201-a5", name: "acabamento-detalhe.jpg", size: "2.4 MB", kind: "image", uploadedAt: "há 1d", by: "Acabamento" }
  ],
  "199": [
    { id: "199-a1", name: "molde-aluminio.step", size: "9.2 MB", kind: "step", uploadedAt: "há 8d", by: "Cliente" },
    { id: "199-a2", name: "comprovante-entrega.pdf", size: "1.0 MB", kind: "pdf", uploadedAt: "há 3d", by: "Expedição" },
    { id: "199-a3", name: "nota-pendencia.pdf", size: "420 KB", kind: "pdf", uploadedAt: "há 1d", by: "Fiscal" }
  ]
};

export function attachmentsForOrder(orderId: string): OrderAttachment[] {
  return orderAttachments[orderId] ?? [];
}

export const orderComments: Record<string, OrderComment[]> = {
  "204": [
    {
      id: "204-c1",
      at: "há 1 dia",
      by: "Engenharia",
      byInitials: "EN",
      text: "Cliente pediu raio mínimo de 4mm na curva interna. Confirmar com produção antes do acabamento."
    },
    {
      id: "204-c2",
      at: "há 4h",
      by: "Produção",
      byInitials: "PR",
      text: "Raio respeitado. Vou enviar foto após desbaste final."
    }
  ],
  "201": [
    {
      id: "201-c1",
      at: "há 6h",
      by: "Comercial",
      byInitials: "CM",
      text: "Cliente aguarda entrega hoje. Confirmar até 16h se está liberado."
    }
  ]
};

export function commentsForOrder(orderId: string): OrderComment[] {
  return orderComments[orderId] ?? [];
}

export function findClientByName(name: string): Client | undefined {
  return clients.find((client) => client.name === name);
}
