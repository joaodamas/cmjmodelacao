"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "./_components/admin-header";
import { AdminMobileMenu, AdminSidebar } from "./_components/admin-sidebar";
import { BillingPage } from "./_components/billing-page";
import { ClientsPage } from "./_components/clients-page";
import { Dashboard } from "./_components/dashboard";
import { FinancePage } from "./_components/finance-page";
import { GlobalSearch, type SearchSelection } from "./_components/global-search";
import { LoginScreen } from "./_components/login-screen";
import { ModulePlaceholder } from "./_components/module-placeholder";
import { NewOrderModal } from "./_components/new-order-modal";
import { OrderDetailPanel } from "./_components/order-detail-panel";
import { OrdersBoard } from "./_components/orders-board";
import { ProductionPage } from "./_components/production-page";
import type { AdminMenuKey, Order } from "./_lib/types";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState<AdminMenuKey>("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modal, setModal] = useState<"new-order" | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      const ctrlK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (ctrlK) {
        event.preventDefault();
        setSearchOpen(true);
        return;
      }
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [authenticated]);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  function handleSelect(item: AdminMenuKey) {
    setActiveMenu(item);
    setMobileMenu(false);
  }

  function handleSearchSelect(selection: SearchSelection) {
    setSearchOpen(false);
    if (selection.type === "order") {
      setSelectedOrder(selection.order);
    } else {
      setActiveMenu("Clientes");
    }
  }

  return (
    <main className="min-h-screen bg-ops-bg text-ops-inkSoft">
      <div className="flex min-h-screen">
        <AdminSidebar
          activeMenu={activeMenu}
          onSelect={handleSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((value) => !value)}
        />

        <section className="min-w-0 flex-1">
          <AdminHeader
            onToggleMobileMenu={() => setMobileMenu((value) => !value)}
            onNewOrder={() => setModal("new-order")}
            onOpenSearch={() => setSearchOpen(true)}
          />
          <AdminMobileMenu
            open={mobileMenu}
            activeMenu={activeMenu}
            onSelect={handleSelect}
          />

          <div className="min-h-[calc(100vh-4rem)] bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(238,244,251,0.9))] px-4 py-6 md:px-6 lg:px-8">
            {activeMenu === "Dashboard" ? <Dashboard /> : null}
            {activeMenu === "Pedidos" ? (
              <OrdersBoard
                onNewOrder={() => setModal("new-order")}
                onSelectOrder={setSelectedOrder}
              />
            ) : null}
            {activeMenu === "Produção" ? (
              <ProductionPage onNewOrder={() => setModal("new-order")} />
            ) : null}
            {activeMenu === "Financeiro" ? <FinancePage /> : null}
            {activeMenu === "Faturamento" ? <BillingPage /> : null}
            {activeMenu === "Clientes" ? <ClientsPage /> : null}
            {activeMenu === "Configurações" ? (
              <ModulePlaceholder title={activeMenu} />
            ) : null}
          </div>
        </section>
      </div>
      {modal === "new-order" ? <NewOrderModal onClose={() => setModal(null)} /> : null}
      <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      <GlobalSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSearchSelect}
      />
    </main>
  );
}
