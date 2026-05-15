"use client";

import { FormEvent, useState } from "react";
import { SendGlyph } from "@/components/icons";
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
  const [segment, setSegment] = useState("");
  const [hasDrawing, setHasDrawing] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("arquivo") as File | null;
    const data = {
      nome: String(formData.get("nome") || ""),
      empresa: String(formData.get("empresa") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      email: String(formData.get("email") || ""),
      dimensoes: String(formData.get("dimensoes") || ""),
      prazo: String(formData.get("prazo") || ""),
      mensagem: String(formData.get("mensagem") || "")
    };

    const message = [
      "Olá, gostaria de solicitar um orçamento técnico para molde em isopor para fundição.",
      "",
      `• Nome: ${data.nome}`,
      `• Empresa: ${data.empresa}`,
      `• WhatsApp: ${data.whatsapp}`,
      `• E-mail: ${data.email}`,
      `• Segmento: ${segment || "Não informado"}`,
      `• Tipo de molde: ${projectType || "Não informado"}`,
      `• Material de fundição: ${material || "Não informado"}`,
      data.dimensoes ? `• Dimensões aproximadas: ${data.dimensoes}` : null,
      data.prazo ? `• Prazo desejado: ${data.prazo}` : null,
      hasDrawing ? `• Possui desenho técnico: ${hasDrawing}` : null,
      file?.name
        ? `• Arquivo selecionado: ${file.name} (vou anexar aqui no WhatsApp)`
        : "• Arquivo: ainda não anexado",
      data.mensagem ? "" : null,
      data.mensagem ? `Detalhes: ${data.mensagem}` : null
    ]
      .filter((line) => line !== null)
      .join("\n");

    trackConversion("quote_form_submit", {
      project_type: projectType || "não informado",
      foundry_material: material || "não informado",
      segment: segment || "não informado",
      has_drawing: hasDrawing || "não informado",
      has_file: Boolean(file?.name)
    });
    trackConversion("generate_lead", {
      lead_source: "quote_form_whatsapp"
    });

    window.open(makeWhatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="corner-ticks relative grid gap-5 border border-border bg-white p-6 shadow-industrial md:p-8"
    >
      <header className="flex items-start justify-between border-b border-border pb-5">
        <div>
          <p className="spec-label">Form · F/01</p>
          <h3 className="mt-2 font-display text-lg font-bold text-primary">
            Solicitação de orçamento técnico
          </h3>
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/45">
          Etapa 1 / 1
        </span>
      </header>

      <p className="text-xs leading-6 text-foreground/55">
        Quanto mais informações você enviar, mais precisa será a análise inicial. Campos com{" "}
        <span className="text-accent">*</span> são obrigatórios.
      </p>

      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="spec-label col-span-full mt-1">Identificação</legend>
        <Field label="Nome*" htmlFor="nome">
          <Input id="nome" name="nome" autoComplete="name" required />
        </Field>
        <Field label="Empresa*" htmlFor="empresa">
          <Input id="empresa" name="empresa" autoComplete="organization" required />
        </Field>
        <Field label="WhatsApp*" htmlFor="whatsapp">
          <Input
            id="whatsapp"
            name="whatsapp"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 9 0000-0000"
            required
          />
        </Field>
        <Field label="E-mail corporativo*" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Segmento da empresa" htmlFor="segmento">
          <Select value={segment} onValueChange={setSegment}>
            <SelectTrigger id="segmento">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fundição">Fundição</SelectItem>
              <SelectItem value="Ferramentaria">Ferramentaria</SelectItem>
              <SelectItem value="Estamparia">Estamparia</SelectItem>
              <SelectItem value="Indústria automotiva">Indústria automotiva</SelectItem>
              <SelectItem value="Engenharia / Projetos">Engenharia / Projetos</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 border-t border-border pt-5 md:grid-cols-2">
        <legend className="spec-label col-span-full mt-1">Projeto</legend>
        <Field label="Tipo de molde*" htmlFor="tipo">
          <Select value={projectType} onValueChange={setProjectType} required>
            <SelectTrigger id="tipo">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Molde em isopor para fundição">
                Molde em isopor para fundição
              </SelectItem>
              <SelectItem value="Modelação industrial sob medida">
                Modelação industrial sob medida
              </SelectItem>
              <SelectItem value="Peça técnica / componente">
                Peça técnica / componente
              </SelectItem>
              <SelectItem value="Reposição / engenharia reversa">
                Reposição / engenharia reversa
              </SelectItem>
              <SelectItem value="Projeto especial / outro">
                Projeto especial / outro
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Material de fundição*" htmlFor="material">
          <Select value={material} onValueChange={setMaterial} required>
            <SelectTrigger id="material">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alumínio">Alumínio</SelectItem>
              <SelectItem value="Aço">Aço</SelectItem>
              <SelectItem value="Ferro Fundido">Ferro Fundido</SelectItem>
              <SelectItem value="Outro / a definir">Outro / a definir</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Dimensões aproximadas" htmlFor="dimensoes">
          <Input
            id="dimensoes"
            name="dimensoes"
            placeholder="Ex.: 800 × 600 × 250 mm"
            autoComplete="off"
          />
        </Field>
        <Field label="Prazo desejado" htmlFor="prazo">
          <Input
            id="prazo"
            name="prazo"
            placeholder="Ex.: 15 dias úteis, urgente, a definir"
          />
        </Field>
        <Field label="Possui desenho técnico?" htmlFor="desenho">
          <Select value={hasDrawing} onValueChange={setHasDrawing}>
            <SelectTrigger id="desenho">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sim, CAD/3D">Sim, CAD / 3D</SelectItem>
              <SelectItem value="Sim, em 2D / PDF">Sim, em 2D / PDF</SelectItem>
              <SelectItem value="Apenas foto / peça-amostra">Apenas foto / peça-amostra</SelectItem>
              <SelectItem value="Não, somente medidas">Não, somente medidas</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Desenho ou projeto" htmlFor="arquivo">
          <Input
            id="arquivo"
            name="arquivo"
            type="file"
            accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.zip,.rar,.jpg,.jpeg,.png"
          />
        </Field>
      </fieldset>

      <Field label="Detalhes adicionais" htmlFor="mensagem">
        <Textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="Descreva aplicação, complexidade, raios críticos, tolerâncias importantes, série esperada — o que ajudar a CMJ a entender o seu processo."
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-border pt-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-sm text-xs leading-5 text-foreground/55">
          Ao enviar, o WhatsApp da CMJ abre com sua solicitação organizada. Anexe o desenho na
          conversa para análise técnica.
        </p>
        <Button
          type="submit"
          size="lg"
          variant="accent"
          className="h-12 md:w-fit"
          data-track="quote_form_submit_button"
        >
          <SendGlyph className="h-4 w-4" />
          Enviar pelo WhatsApp
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.06em] text-foreground/70">
        {label}
      </Label>
      {children}
    </div>
  );
}
