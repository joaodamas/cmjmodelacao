"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { AdminBrand } from "./admin-brand";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
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
    <main className="grid min-h-screen bg-ops-sidebar text-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[url('/portfolio/operacao-medicao-molde-eps.jpg')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ops-sidebar via-ops-sidebar/84 to-ops-sidebar/20" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(53,162,255,0.16)_1px,transparent_1px),linear-gradient(rgba(53,162,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ops-accentBright">
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
          <div className="mt-10 border border-ops-sidebarInput bg-ops-card p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)]">
            <p className="font-display text-2xl font-bold">Acesso operacional</p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              MVP de interface. A autenticação real entra com Firebase Auth na próxima fase.
            </p>

            <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm">
                <span className="text-white/70">E-mail</span>
                <input
                  name="email"
                  type="email"
                  defaultValue="operacao@cmj.local"
                  className="h-11 border border-ops-sidebarInput bg-ops-sidebarDeep px-3 text-white outline-none focus:border-ops-accentBright"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-white/70">Senha</span>
                <input
                  name="password"
                  type="password"
                  defaultValue="cmj"
                  className="h-11 border border-ops-sidebarInput bg-ops-sidebarDeep px-3 text-white outline-none focus:border-ops-accentBright"
                />
              </label>
              {error ? <p className="text-sm text-ops-error">{error}</p> : null}
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
