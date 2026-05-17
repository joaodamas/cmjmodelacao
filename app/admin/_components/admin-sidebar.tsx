"use client";

import type { ComponentType, SVGProps } from "react";
import {
  ChevronLeft,
  ChevronRight,
  GlyphCaliper,
  GlyphCash,
  GlyphCompass,
  GlyphDocument,
  GlyphGear,
  GlyphPackage,
  GlyphUsers
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { menu } from "../_lib/mock-data";
import type { AdminMenuKey } from "../_lib/types";
import { AdminBrand } from "./admin-brand";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const menuIcons: Record<AdminMenuKey, IconComponent> = {
  Dashboard: GlyphCompass,
  Pedidos: GlyphPackage,
  Produção: GlyphGear,
  Financeiro: GlyphCash,
  Faturamento: GlyphDocument,
  Clientes: GlyphUsers,
  Configurações: GlyphCaliper
};

export function AdminSidebar({
  activeMenu,
  onSelect,
  collapsed,
  onToggleCollapsed
}: {
  activeMenu: AdminMenuKey;
  onSelect: (item: AdminMenuKey) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-ops-sidebarBorder bg-ops-sidebar text-white transition-[width] duration-200 lg:flex",
        collapsed ? "w-[68px]" : "w-[272px]"
      )}
    >
      <div className="relative">
        {collapsed ? <CollapsedBrand /> : <AdminBrand />}
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className="absolute -right-3 top-6 grid h-6 w-6 place-items-center border border-ops-sidebarBorder bg-ops-sidebar text-ops-sidebarMute hover:text-white"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </div>

      <nav className={cn("py-5", collapsed ? "px-2" : "px-3")}>
        {!collapsed ? (
          <p className="px-4 pb-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ops-sidebarMute">
            Módulos
          </p>
        ) : null}
        {menu.map((item) => {
          const Icon = menuIcons[item];
          const isActive = activeMenu === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              title={collapsed ? item : undefined}
              className={cn(
                "group flex w-full items-center border-l-2 text-left text-sm font-medium transition-colors hover:border-ops-accentBright hover:bg-ops-sidebarHover hover:text-white",
                collapsed ? "justify-center px-2 py-3" : "justify-between px-4 py-3",
                isActive
                  ? "border-ops-accentBright bg-gradient-to-r from-ops-sidebarHover to-ops-sidebar text-white shadow-[inset_0_0_0_1px_rgba(53,162,255,0.12)]"
                  : "border-transparent text-white/62"
              )}
            >
              <span className={cn("flex items-center gap-3", collapsed && "gap-0")}>
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-colors",
                    isActive ? "text-ops-accentBright" : "text-white/55 group-hover:text-white"
                  )}
                />
                {!collapsed ? <span>{item}</span> : null}
              </span>
              {!collapsed && isActive ? (
                <span className="h-1.5 w-1.5 bg-ops-accentBright shadow-[0_0_14px_rgba(53,162,255,0.8)]" />
              ) : null}
            </button>
          );
        })}
      </nav>

      {!collapsed ? (
        <div className="mx-3 mt-auto border border-ops-sidebarBorder bg-ops-sidebarDeep p-4">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ops-sidebarMute">
            Operação
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-white">Online</span>
            <span className="inline-flex items-center gap-2 text-xs text-white/70">
              <span className="h-2 w-2 bg-[#2f9d68]" />
              7 pedidos ativos
            </span>
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function CollapsedBrand() {
  return (
    <div className="grid h-[68px] place-items-center border-b border-ops-sidebarBorder">
      <strong className="cmj-wordmark text-base font-bold text-white">CMJ</strong>
    </div>
  );
}

export function AdminMobileMenu({
  open,
  activeMenu,
  onSelect
}: {
  open: boolean;
  activeMenu: AdminMenuKey;
  onSelect: (item: AdminMenuKey) => void;
}) {
  if (!open) return null;
  return (
    <nav className="grid border-t border-ops-sidebarBorder bg-ops-sidebar p-3 shadow-[0_18px_36px_-22px_rgba(0,0,0,0.45)] lg:hidden">
      {menu.map((item) => {
        const Icon = menuIcons[item];
        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={cn(
              "flex items-center gap-3 border-b border-white/10 px-3 py-3 text-left text-sm last:border-b-0",
              activeMenu === item ? "bg-ops-sidebarHover text-white" : "text-white/75"
            )}
          >
            <Icon className="h-4 w-4 text-white/55" />
            {item}
          </button>
        );
      })}
    </nav>
  );
}
