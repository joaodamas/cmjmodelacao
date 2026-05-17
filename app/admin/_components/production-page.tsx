import { orders } from "../_lib/mock-data";
import { OperationalCard, PageHeader, PanelTitle } from "./ui-primitives";

export function ProductionPage({ onNewOrder }: { onNewOrder: () => void }) {
  const productionOrders = orders.filter((order) =>
    ["Aprovado", "Produção", "Finalização", "Entrega"].includes(order.status)
  );

  return (
    <section className="grid gap-6">
      <PageHeader
        title="Produção"
        subtitle="Fila técnica para acompanhar início, execução, acabamento e liberação."
        action="Registrar produção"
        onAction={onNewOrder}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <OperationalCard label="Em produção" value="6" note="2 com prazo curto" />
        <OperationalCard
          label="Finalizar hoje"
          value="3"
          note="Acabamento e conferência"
        />
        <OperationalCard
          label="Atrasados"
          value="2"
          note="Exigem decisão operacional"
          tone="warning"
        />
      </div>

      <article className="overflow-hidden border border-ops-border bg-ops-surface shadow-[0_22px_54px_-42px_rgba(10,43,79,0.9)]">
        <PanelTitle
          title="Fila de produção"
          subtitle="Pedidos ordenados por urgência operacional."
        />
        <div className="max-h-[clamp(340px,calc(100vh-14rem),640px)] overflow-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.12em] text-ops-mutedStrong">
              <tr>
                {["Pedido", "Cliente / peça", "Etapa", "Responsável", "Prazo", "Ação"].map(
                  (header) => (
                    <th
                      key={header}
                      className="sticky top-0 z-10 bg-ops-accentPale px-5 py-3 font-semibold shadow-[inset_0_-1px_0_rgba(10,43,79,0.12)]"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {productionOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-ops-accentSoft/65">
                  <td className="px-5 py-4 font-mono text-xs text-ops-accent">
                    #{order.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ops-ink">{order.client}</p>
                    <p className="mt-1 text-ops-muted">{order.part}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="border border-ops-border bg-ops-accentSoft px-2.5 py-1 text-xs font-semibold text-ops-inkMid">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">{order.owner}</td>
                  <td className="px-5 py-4 font-mono text-xs text-ops-inkMid">{order.due}</td>
                  <td className="px-5 py-4">
                    <button className="border border-ops-border px-3 py-2 text-xs font-semibold text-ops-inkMid hover:border-ops-accent hover:text-ops-accent">
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
