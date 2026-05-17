import { orders } from "../_lib/mock-data";
import { DataTable, OperationalCard, PageHeader } from "./ui-primitives";

export function BillingPage() {
  const billingOrders = orders.filter((order) =>
    ["Finalização", "Entrega", "NF", "Faturado"].includes(order.status)
  );

  return (
    <section className="grid gap-6">
      <PageHeader
        title="Faturamento"
        subtitle="Etapa operacional entre produção finalizada, emissão de NF e baixa financeira."
        action="Registrar NF"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <OperationalCard
          label="Aguardando NF"
          value="1"
          note="Pedido #199"
          tone="warning"
        />
        <OperationalCard
          label="Liberados para entrega"
          value="2"
          note="Com produção finalizada"
        />
        <OperationalCard
          label="Faturados"
          value="1"
          note="Aguardando baixa ou recebido"
        />
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
