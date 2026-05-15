"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackConversion } from "@/lib/tracking";
import { makeWhatsappUrl } from "@/lib/utils";

export function QuoteForm() {
  const [material, setMaterial] = useState("");
  const [projectType, setProjectType] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("arquivo") as File | null;
    const data = {
      nome: String(formData.get("nome") || ""),
      empresa: String(formData.get("empresa") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      email: String(formData.get("email") || ""),
      prazo: String(formData.get("prazo") || ""),
      mensagem: String(formData.get("mensagem") || "")
    };

    const message = [
      "Olá, gostaria de solicitar um orçamento para moldes em isopor para fundição.",
      `Nome: ${data.nome}`,
      `Empresa: ${data.empresa}`,
      `WhatsApp: ${data.whatsapp}`,
      `E-mail: ${data.email}`,
      `Tipo de Projeto: ${projectType || "Não informado"}`,
      `Material de fundição: ${material || "Não informado"}`,
      `Prazo: ${data.prazo}`,
      file?.name ? `Arquivo selecionado: ${file.name} (vou anexar no WhatsApp)` : "Arquivo: não anexado",
      data.mensagem ? `Mensagem: ${data.mensagem}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    trackConversion("quote_form_submit", {
      project_type: projectType || "não informado",
      foundry_material: material || "não informado",
      has_file: Boolean(file?.name)
    });
    trackConversion("generate_lead", {
      lead_source: "quote_form_whatsapp"
    });

    window.open(makeWhatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border bg-white p-5 shadow-industrial md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nome" htmlFor="nome">
          <Input id="nome" name="nome" autoComplete="name" required />
        </Field>
        <Field label="Empresa" htmlFor="empresa">
          <Input id="empresa" name="empresa" autoComplete="organization" required />
        </Field>
        <Field label="WhatsApp" htmlFor="whatsapp">
          <Input id="whatsapp" name="whatsapp" inputMode="tel" autoComplete="tel" required />
        </Field>
        <Field label="E-mail" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Tipo de projeto" htmlFor="tipo">
          <Select value={projectType} onValueChange={setProjectType} required>
            <SelectTrigger id="tipo">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Molde em isopor para fundição">Molde em isopor para fundição</SelectItem>
              <SelectItem value="Modelação industrial">Modelação industrial</SelectItem>
              <SelectItem value="Peça técnica sob medida">Peça técnica sob medida</SelectItem>
              <SelectItem value="Projeto especial">Projeto especial</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Material de fundicao" htmlFor="material">
          <Select value={material} onValueChange={setMaterial} required>
            <SelectTrigger id="material">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alumínio">Alumínio</SelectItem>
              <SelectItem value="Aço">Aço</SelectItem>
              <SelectItem value="Ferro Fundido">Ferro Fundido</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Prazo desejado" htmlFor="prazo">
          <Input id="prazo" name="prazo" placeholder="Ex.: 15 dias, urgente, a definir" />
        </Field>
        <Field label="Desenho ou projeto" htmlFor="arquivo">
          <Input id="arquivo" name="arquivo" type="file" accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.zip,.rar,.jpg,.png" />
        </Field>
      </div>
      <Field label="Mensagem" htmlFor="mensagem">
        <Textarea id="mensagem" name="mensagem" placeholder="Descreva dimensões, aplicação, material e informações relevantes." />
      </Field>
      <Button type="submit" size="lg" className="w-full md:w-fit" variant="accent">
        <Send className="h-4 w-4" />
        Enviar dados pelo WhatsApp
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        O arquivo selecionado não é enviado automaticamente pelo site. Após abrir o WhatsApp, anexe o desenho na conversa para análise técnica.
      </p>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
