import { financeRows } from "../_lib/mock-data";
import { DataTable, OperationalCard, PageHeader, StatusPill } from "./ui-primitives";

export function FinancePage() {
  return (
    <section className="grid gap-6">
      <PageHeader
        title="Financeiro"
        subtitle="Controle simples de recebimento, atraso e previsão dos próximos dias."
        action="Novo lançamento"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <OperationalCard label="A faturar" value="R$ 9.700" note="1 pedido sem NF" />
        <OperationalCard
          label="Em atraso"
          value="R$ 11.600"
          note="1 vencimento aberto"
          tone="warning"
        />
        <OperationalCard label="Recebido no mês" value="R$ 42.800" note="5 pedidos pagos" />
        <OperationalCard
          label="Próx. 15 dias"
          value="R$ 31.300"
          note="Previsão de entrada"
        />
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
