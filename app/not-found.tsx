import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-slate-50">
      <div className="container max-w-2xl py-20">
        <p className="border-l-2 border-accent pl-3 text-sm font-bold uppercase text-slate-600">
          Página não encontrada
        </p>
        <h1 className="mt-4 text-4xl font-black text-primary md:text-5xl">
          O endereço acessado não está disponível.
        </h1>
        <p className="mt-5 leading-7 text-muted-foreground">
          Volte para a página principal da CMJ Modelação para solicitar orçamento ou consultar os serviços de moldes em isopor para fundição.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Voltar para a página principal</Link>
        </Button>
      </div>
    </main>
  );
}
