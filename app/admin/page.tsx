"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckMark,
  GlyphCaliper,
  GlyphDocument,
  GlyphGear,
  GlyphPackage,
  GlyphTruck,
  MenuBars
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OrderStatus =
  | "Recebido"
  | "Orçamento"
  | "Aprovado"
  | "Produção"
  | "Finalização"
  | "Entrega"
  | "NF"
  | "Faturado";

type Order = {
  id: string;
  client: string;
  part: string;
  due: string;
  owner: string;
  status: OrderStatus;
  alert?: string;
  value?: string;
};

type Client = {
  name: string;
  contact: string;
  phone: string;
  orders: number;
  fiscal: "Completo" | "Pendente";
  lastOrder: string;
};

type FinanceRow = {
  order: string;
  client: string;
  value: string;
  due: string;
  status: "A faturar" | "Em atraso" | "Recebido" | "A receber";
};

const menu = ["Dashboard", "Pedidos", "Produção", "Financeiro", "Faturamento", "Clientes", "Configurações"];

const orders: Order[] = [
  {
    id: "204",
    client: "Grupo Aethra",
    part: "Molde EPS automotivo",
    due: "18/05",
    owner: "Produção",
    status: "Produção",
    alert: "Prazo curto",
    value: "R$ 18.400"
  },
  {
    id: "203",
    client: "Gestamp",
    part: "Modelo técnico bipartido",
    due: "20/05",
    owner: "Orçamento",
    status: "Orçamento"
  },
  {
    id: "202",
    client: "Fac Tools",
    part: "Peça de grande porte",
    due: "21/05",
    owner: "CNC Router",
    status: "Aprovado",
    value: "R$ 12.900"
  },
  {
    id: "201",
    client: "Itafunge",
    part: "Molde EPS para aço",
    due: "Hoje",
    owner: "Acabamento",
    status: "Finalização",
    alert: "Finalizar hoje"
  },
  {
    id: "200",
    client: "Multimatech",
    part: "Modelo para dispositivo",
    due: "17/05",
    owner: "Expedição",
    status: "Entrega"
  },
  {
    id: "199",
    client: "Hemaval",
    part: "Molde técnico alumínio",
    due: "15/05",
    owner: "Fiscal",
    status: "NF",
    alert: "NF pendente",
    value: "R$ 9.700"
  },
  {
    id: "198",
    client: "JM Ferramentaria",
    part: "Referência física usinada",
    due: "13/05",
    owner: "Financeiro",
    status: "Faturado",
    value: "R$ 7.200"
  }
];

const columns: OrderStatus[] = [
  "Recebido",
  "Orçamento",
  "Aprovado",
  "Produção",
  "Finalização",
  "Entrega",
  "NF",
  "Faturado"
];

const timeline = [
  { status: "Recebido", text: "Pedido #204 entrou com desenho e prazo curto.", time: "08:20" },
  { status: "Produção", text: "Pedido #201 previsto para finalização hoje.", time: "10:45" },
  { status: "Faturamento", text: "Pedido #199 aguardando número da NF.", time: "11:10" },
  { status: "Entrega", text: "Pedido #200 liberado para expedição.", time: "14:00" }
];

const alerts = [
  "Pedido #204 vence em 2 dias",
  "Pedido #199 aguardando emissão de NF",
  "Pedido #201 precisa de conferência final",
  "Cliente Gestamp aguardando retorno de orçamento"
];

const calendar = [
  { day: "15", label: "NF #199", type: "Fiscal" },
  { day: "16", label: "Finalizar #201", type: "Produção" },
  { day: "18", label: "Entrega #204", type: "Entrega" },
  { day: "20", label: "Retorno #203", type: "Orçamento" }
];

const metrics = [
  { label: "Pedidos em andamento", value: "18", note: "6 em produção", icon: GlyphPackage },
  { label: "Produções atrasadas", value: "2", note: "1 crítica", icon: GlyphGear },
  { label: "Pedidos para faturar", value: "4", note: "R$ 38.200", icon: GlyphDocument },
  { label: "Entregas da semana", value: "7", note: "3 até sexta", icon: GlyphTruck }
];

const financeRows: FinanceRow[] = [
  { order: "#204", client: "Grupo Aethra", value: "R$ 18.400", due: "22/05", status: "A receber" },
  { order: "#199", client: "Hemaval", value: "R$ 9.700", due: "NF pendente", status: "A faturar" },
  { order: "#198", client: "JM Ferramentaria", value: "R$ 7.200", due: "13/05", status: "Recebido" },
  { order: "#196", client: "Usicomp", value: "R$ 11.600", due: "10/05", status: "Em atraso" }
];

const clients: Client[] = [
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

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <main className="min-h-screen bg-[#f3f1ec] text-[#18212b]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-black/10 bg-[#1d252e] text-white lg:block">
          <AdminBrand />
          <nav className="px-3 py-5">
            {menu.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveMenu(item)}
                className={cn(
                  "flex w-full items-center justify-between border-l-2 px-4 py-3 text-left text-sm font-medium text-white/65 transition-colors hover:border-[#2784d8] hover:bg-white/5 hover:text-white",
                  activeMenu === item
                    ? "border-[#2784d8] bg-white/8 text-white"
                    : "border-transparent"
                )}
              >
                {item}
                {activeMenu === item ? <span className="h-1.5 w-1.5 bg-[#2784d8]" /> : null}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f8f6f0]/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileMenu((value) => !value)}
                  className="grid h-10 w-10 place-items-center border border-black/15 bg-white lg:hidden"
                  aria-label="Abrir menu"
                >
                  <MenuBars className="h-5 w-5" />
                </button>
                <div>
                  <p className="font-display text-lg font-bold text-[#111820]">Central de Operação</p>
                  <p className="text-xs text-[#607080]">Pedidos, produção, entrega e faturamento.</p>
                </div>
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <span className="border border-black/10 bg-white px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#607080]">
                  15/05 · operação
                </span>
                <Button size="sm" variant="accent">Novo pedido</Button>
              </div>
            </div>
            {mobileMenu ? (
              <nav className="grid border-t border-black/10 bg-[#1d252e] p-3 lg:hidden">
                {menu.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setActiveMenu(item);
                      setMobileMenu(false);
                    }}
                    className="border-b border-white/10 px-3 py-3 text-left text-sm text-white/75 last:border-b-0"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            ) : null}
          </header>

          <div className="px-4 py-6 md:px-6 lg:px-8">
            {activeMenu === "Dashboard" ? <Dashboard /> : null}
            {activeMenu === "Pedidos" ? <OrdersBoard /> : null}
            {activeMenu === "Produção" ? <ProductionPage /> : null}
            {activeMenu === "Financeiro" ? <FinancePage /> : null}
            {activeMenu === "Faturamento" ? <BillingPage /> : null}
            {activeMenu === "Clientes" ? <ClientsPage /> : null}
            {activeMenu === "Configurações" ? (
              <ModulePlaceholder title={activeMenu} />
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (email.trim() && password.trim()) {
      onLogin();
      return;
    }

    setError("Informe e-mail e senha para acessar o painel.");
  }

  return (
    <main className="grid min-h-screen bg-[#171f28] text-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[url('/portfolio/operacao-medicao-molde-eps.jpg')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171f28] via-[#171f28]/80 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2784d8]">
            Sistema interno CMJ
          </p>
          <h1 className="mt-5 max-w-xl font-display text-5xl font-bold leading-tight tracking-tight text-white">
            Central operacional para pedidos, produção e faturamento.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
            Painel criado para mostrar o que entrou, o que está atrasado, o que precisa entregar e
            o que precisa faturar sem transformar a operação em um ERP pesado.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <AdminBrand />
          <div className="mt-10 border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)]">
            <p className="font-display text-2xl font-bold">Acesso operacional</p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              MVP de interface. A autenticação real entra com Supabase Auth na próxima fase.
            </p>

            <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm">
                <span className="text-white/70">E-mail</span>
                <input
                  name="email"
                  type="email"
                  defaultValue="operacao@cmj.local"
                  className="h-11 border border-white/10 bg-black/20 px-3 text-white outline-none focus:border-[#2784d8]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-white/70">Senha</span>
                <input
                  name="password"
                  type="password"
                  defaultValue="cmj"
                  className="h-11 border border-white/10 bg-black/20 px-3 text-white outline-none focus:border-[#2784d8]"
                />
              </label>
              {error ? <p className="text-sm text-[#f5a524]">{error}</p> : null}
              <Button type="submit" variant="accent" className="mt-2 h-12 w-full">
                Entrar no painel
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminBrand() {
  return (
    <div className="border-b border-white/10 p-5">
      <strong className="cmj-wordmark brand-lockup block text-white">
        <span className="brand-cmj">CMJ</span>
        <span className="brand-name">Operação</span>
      </strong>
      <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/45">
        Painel industrial interno
      </p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="border border-black/10 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#607080]">{metric.label}</p>
                  <strong className="mt-3 block font-display text-3xl text-[#111820]">
                    {metric.value}
                  </strong>
                </div>
                <span className="grid h-10 w-10 place-items-center border border-black/10 text-[#2784d8]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm text-[#607080]">{metric.note}</p>
            </article>
          );
        })}
      </section>

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

function TimelinePanel() {
  return (
    <article className="border border-black/10 bg-white">
      <PanelTitle
        title="Timeline operacional"
        subtitle="Movimentos que precisam de atenção no dia."
      />
      <div className="divide-y divide-black/10">
        {timeline.map((item) => (
          <div key={`${item.status}-${item.time}`} className="grid grid-cols-[96px_1fr_56px] gap-4 px-5 py-4">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#2784d8]">
              {item.status}
            </span>
            <p className="text-sm text-[#354353]">{item.text}</p>
            <span className="text-right font-mono text-xs text-[#8a96a3]">{item.time}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function CalendarPanel() {
  return (
    <article className="border border-black/10 bg-white">
      <PanelTitle title="Calendário da semana" subtitle="Entrega, produção, fiscal e orçamento." />
      <div className="grid gap-3 p-5">
        {calendar.map((item) => (
          <div key={item.label} className="grid grid-cols-[48px_1fr] border border-black/10">
            <span className="grid place-items-center bg-[#eef1f3] py-3 font-display text-xl font-bold text-[#111820]">
              {item.day}
            </span>
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-[#111820]">{item.label}</p>
              <p className="mt-1 text-xs text-[#607080]">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function AlertsPanel() {
  return (
    <article className="border border-black/10 bg-white">
      <PanelTitle title="Alertas" subtitle="Sem ruído. Só o que precisa de ação." />
      <div className="grid gap-2 p-5">
        {alerts.map((alert) => (
          <div key={alert} className="flex items-center gap-3 border border-[#ead8aa] bg-[#fff8e8] px-4 py-3 text-sm text-[#5f4a16]">
            <span className="h-2 w-2 bg-[#d99b16]" />
            {alert}
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
    <article className="border border-black/10 bg-white">
      <PanelTitle title="Produção" subtitle="Pedidos na fila ou em execução." />
      <div className="divide-y divide-black/10">
        {productionOrders.map((order) => (
          <div key={order.id} className="grid gap-2 px-5 py-4 md:grid-cols-[88px_1fr_120px] md:items-center">
            <span className="font-mono text-xs text-[#607080]">#{order.id}</span>
            <div>
              <p className="text-sm font-semibold text-[#111820]">{order.part}</p>
              <p className="mt-1 text-xs text-[#607080]">{order.client}</p>
            </div>
            <span className="text-sm text-[#354353]">{order.status}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function OrdersBoard() {
  const grouped = useMemo(() => {
    return columns.map((column) => ({
      column,
      items: orders.filter((order) => order.status === column)
    }));
  }, []);

  return (
    <section className="grid gap-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#111820]">Pedidos</h1>
          <p className="mt-2 text-sm text-[#607080]">
            Fluxo industrial do recebimento ao faturamento.
          </p>
        </div>
        <Button variant="accent">Cadastrar pedido</Button>
      </div>

      <div className="overflow-x-auto pb-3">
        <div className="grid min-w-[1180px] grid-cols-8 gap-3">
          {grouped.map((group) => (
            <div key={group.column} className="border border-black/10 bg-[#ebe9e2]">
              <div className="flex items-center justify-between border-b border-black/10 px-3 py-3">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#354353]">
                  {group.column}
                </span>
                <span className="text-xs text-[#607080]">{group.items.length}</span>
              </div>
              <div className="grid gap-3 p-3">
                {group.items.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <article className="border border-black/10 bg-white p-3 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.7)]">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs font-semibold text-[#2784d8]">Pedido #{order.id}</span>
        {order.alert ? <span className="bg-[#fff3cf] px-2 py-1 text-[0.65rem] text-[#6a4a00]">{order.alert}</span> : null}
      </div>
      <p className="mt-3 text-sm font-semibold text-[#111820]">{order.client}</p>
      <p className="mt-1 text-sm leading-5 text-[#607080]">{order.part}</p>
      <div className="mt-4 grid gap-2 border-t border-black/10 pt-3 text-xs text-[#607080]">
        <span>Entrega: {order.due}</span>
        <span>Resp.: {order.owner}</span>
        {order.value ? <span>Valor: {order.value}</span> : null}
      </div>
    </article>
  );
}

function ProductionPage() {
  const productionOrders = orders.filter((order) =>
    ["Aprovado", "Produção", "Finalização", "Entrega"].includes(order.status)
  );

  return (
    <section className="grid gap-6">
      <PageHeader
        title="Produção"
        subtitle="Fila técnica para acompanhar início, execução, acabamento e liberação."
        action="Registrar produção"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <OperationalCard label="Em produção" value="6" note="2 com prazo curto" />
        <OperationalCard label="Finalizar hoje" value="3" note="Acabamento e conferência" />
        <OperationalCard label="Atrasados" value="2" note="Exigem decisão operacional" tone="warning" />
      </div>

      <article className="border border-black/10 bg-white">
        <PanelTitle title="Fila de produção" subtitle="Pedidos ordenados por urgência operacional." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[#eef1f3] text-xs uppercase tracking-[0.12em] text-[#607080]">
              <tr>
                <th className="px-5 py-3 font-semibold">Pedido</th>
                <th className="px-5 py-3 font-semibold">Cliente / peça</th>
                <th className="px-5 py-3 font-semibold">Etapa</th>
                <th className="px-5 py-3 font-semibold">Responsável</th>
                <th className="px-5 py-3 font-semibold">Prazo</th>
                <th className="px-5 py-3 font-semibold">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {productionOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-4 font-mono text-xs text-[#2784d8]">#{order.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#111820]">{order.client}</p>
                    <p className="mt-1 text-[#607080]">{order.part}</p>
                  </td>
                  <td className="px-5 py-4">{order.status}</td>
                  <td className="px-5 py-4">{order.owner}</td>
                  <td className="px-5 py-4">{order.due}</td>
                  <td className="px-5 py-4">
                    <button className="border border-black/10 px-3 py-2 text-xs font-semibold text-[#354353] hover:border-[#2784d8]">
                      Atualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}

function FinancePage() {
  return (
    <section className="grid gap-6">
      <PageHeader
        title="Financeiro"
        subtitle="Controle simples de recebimento, atraso e previsão dos próximos dias."
        action="Novo lançamento"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <OperationalCard label="A faturar" value="R$ 9.700" note="1 pedido sem NF" />
        <OperationalCard label="Em atraso" value="R$ 11.600" note="1 vencimento aberto" tone="warning" />
        <OperationalCard label="Recebido no mês" value="R$ 42.800" note="5 pedidos pagos" />
        <OperationalCard label="Próx. 15 dias" value="R$ 31.300" note="Previsão de entrada" />
      </div>

      <DataTable
        title="Contas operacionais"
        subtitle="Pedido, cliente, valor, vencimento e situação."
        headers={["Pedido", "Cliente", "Valor", "Vencimento", "Status"]}
        rows={financeRows.map((row) => [
          row.order,
          row.client,
          row.value,
          row.due,
          <StatusPill key={`${row.order}-status`} status={row.status} />
        ])}
      />
    </section>
  );
}

function BillingPage() {
  const billingOrders = orders.filter((order) => ["Finalização", "Entrega", "NF", "Faturado"].includes(order.status));

  return (
    <section className="grid gap-6">
      <PageHeader
        title="Faturamento"
        subtitle="Etapa operacional entre produção finalizada, emissão de NF e baixa financeira."
        action="Registrar NF"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <OperationalCard label="Aguardando NF" value="1" note="Pedido #199" tone="warning" />
        <OperationalCard label="Liberados para entrega" value="2" note="Com produção finalizada" />
        <OperationalCard label="Faturados" value="1" note="Aguardando baixa ou recebido" />
      </div>

      <DataTable
        title="Fila de NF"
        subtitle="Pedidos que saíram da produção e precisam de emissão ou confirmação fiscal."
        headers={["Pedido", "Cliente", "Peça", "Etapa", "Valor"]}
        rows={billingOrders.map((order) => [
          `#${order.id}`,
          order.client,
          order.part,
          order.status,
          order.value ?? "A definir"
        ])}
      />
    </section>
  );
}

function ClientsPage() {
  return (
    <section className="grid gap-6">
      <PageHeader
        title="Clientes"
        subtitle="Base operacional para pedidos, contatos e pendências fiscais."
        action="Cadastrar cliente"
      />

      <DataTable
        title="Clientes industriais"
        subtitle="Informações suficientes para operação, orçamento e faturamento."
        headers={["Cliente", "Contato", "WhatsApp", "Pedidos", "Fiscal", "Último pedido"]}
        rows={clients.map((client) => [
          client.name,
          client.contact,
          client.phone,
          String(client.orders),
          <StatusPill key={`${client.name}-fiscal`} status={client.fiscal} />,
          client.lastOrder
        ])}
      />
    </section>
  );
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action: string }) {
  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#111820]">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607080]">{subtitle}</p>
      </div>
      <Button variant="accent">{action}</Button>
    </div>
  );
}

function OperationalCard({
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
        "border bg-white p-5",
        tone === "warning" ? "border-[#ead8aa]" : "border-black/10"
      )}
    >
      <p className="text-sm text-[#607080]">{label}</p>
      <strong className="mt-3 block font-display text-3xl text-[#111820]">{value}</strong>
      <p className={cn("mt-4 text-sm", tone === "warning" ? "text-[#7a5600]" : "text-[#607080]")}>
        {note}
      </p>
    </article>
  );
}

function DataTable({
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
    <article className="border border-black/10 bg-white">
      <PanelTitle title={title} subtitle={subtitle} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[#eef1f3] text-xs uppercase tracking-[0.12em] text-[#607080]">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-5 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-5 py-4 text-[#354353]">
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

function StatusPill({ status }: { status: string }) {
  const warning = ["Em atraso", "A faturar", "Pendente"].includes(status);
  const success = ["Recebido", "Completo"].includes(status);

  return (
    <span
      className={cn(
        "inline-flex border px-2.5 py-1 text-xs font-semibold",
        warning ? "border-[#ead8aa] bg-[#fff8e8] text-[#6a4a00]" : null,
        success ? "border-[#cce0d2] bg-[#eef8f0] text-[#27643a]" : null,
        !warning && !success ? "border-black/10 bg-[#eef1f3] text-[#354353]" : null
      )}
    >
      {status}
    </span>
  );
}

function ModulePlaceholder({ title }: { title: string }) {
  return (
    <section className="grid min-h-[520px] place-items-center border border-black/10 bg-white p-8 text-center">
      <div className="max-w-md">
        <GlyphCaliper className="mx-auto h-10 w-10 text-[#2784d8]" />
        <h1 className="mt-5 font-display text-3xl font-bold text-[#111820]">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-[#607080]">
          Módulo reservado para a próxima etapa. O MVP começa pelo dashboard operacional e pelo
          Kanban de pedidos.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border border-black/10 px-4 py-2 text-sm text-[#354353]">
          <CheckMark className="h-4 w-4 text-[#2784d8]" />
          Estrutura de navegação criada
        </div>
      </div>
    </section>
  );
}

function PanelTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-black/10 px-5 py-4">
      <h2 className="font-display text-lg font-bold text-[#111820]">{title}</h2>
      <p className="mt-1 text-sm text-[#607080]">{subtitle}</p>
    </div>
  );
}
