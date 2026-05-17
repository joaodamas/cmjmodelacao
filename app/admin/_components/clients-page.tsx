import { clients } from "../_lib/mock-data";
import { DataTable, OperationalCard, PageHeader, StatusPill } from "./ui-primitives";

export function ClientsPage() {
  const totalOrders = clients.reduce((sum, client) => sum + client.orders, 0);
  const pendingFiscal = clients.filter((client) => client.fiscal !== "Completo").length;

  return (
    <section className="grid gap-6">
      <PageHeader
        title="Clientes"
        subtitle="Base operacional para pedidos, contatos e pendências fiscais."
        action="Cadastrar cliente"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <OperationalCard
          label="Clientes ativos"
          value={String(clients.length)}
          note="Com histórico operacional recente"
        />
        <OperationalCard
          label="Pedidos vinculados"
          value={String(totalOrders)}
          note="Somatório da carteira cadastrada"
        />
        <OperationalCard
          label="Pendência fiscal"
          value={String(pendingFiscal)}
          note="Cadastros que precisam de revisão"
          tone={pendingFiscal > 0 ? "warning" : "default"}
        />
      </div>

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
