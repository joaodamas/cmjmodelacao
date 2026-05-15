import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckMark,
  GlyphCaliper,
  GlyphCompass,
  GlyphDocument,
  GlyphGear,
  GlyphHammer,
  GlyphTruck,
  PhoneGlyph,
  SendGlyph,
  WhatsappGlyph
} from "@/components/icons";
import { MotionSection } from "@/components/motion-section";
import { QuoteForm } from "@/components/quote-form";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteHeader } from "@/components/site-header";
import { StickyCTA } from "@/components/sticky-cta";
import { Button } from "@/components/ui/button";
import {
  clients,
  contact,
  credibility,
  equipment,
  faqs,
  machines,
  navItems,
  portfolio,
  processSteps,
  segments,
  services,
  whatsappMessages
} from "@/lib/site-data";
import { cn, makeWhatsappUrl } from "@/lib/utils";

const heroWhatsapp = makeWhatsappUrl(whatsappMessages.hero);
const midCtaWhatsapp = makeWhatsappUrl(whatsappMessages.midCta);
const footerWhatsapp = makeWhatsappUrl(whatsappMessages.footer);

const processIcons = [GlyphDocument, GlyphCompass, GlyphCaliper, GlyphGear, GlyphHammer, GlyphTruck];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen bg-white">
        <SiteHeader />
        <Hero />
        <CredibilityBand />
        <About />
        <Services />
        <Segments />
        <Structure />
        <Portfolio />
        <Clients />
        <Process />
        <Quality />
        <AcceptedInputs />
        <MidCta />
        <Quote />
        <Faq />
        <Footer />
      </main>
      <StickyCTA />
    </>
  );
}

/* ─────────────────────── HERO ─────────────────────── */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-graphite text-white">
      {/* Imagem fullscreen como protagonista */}
      <div className="absolute inset-0">
        <Image
          src="/portfolio/operacao-medicao-molde-eps.jpg"
          alt="Operadores conferindo medidas em molde de EPS de grande porte na fábrica da CMJ Modelação"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay escuro institucional — protagonista é a peça, não a UI */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"
          aria-hidden="true"
        />
      </div>

      {/* Conteúdo do hero */}
      <div className="container relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 md:min-h-[92vh] md:pb-20 md:pt-40">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/55">
            CMJ Modelação · São Bernardo do Campo/SP
          </p>
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tightest text-white md:text-[4rem] lg:text-[4.6rem]">
            Moldes em EPS para fundição produzidos sob{" "}
            <span className="text-accent">projeto técnico</span>.
          </h1>

          <p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-white/75">
            Modelação industrial para fundições, ferramentarias e indústrias automotivas. Estrutura
            CNC própria. Produção a partir de desenho técnico, medida ou referência física da
            peça.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent" className="h-13 px-7">
              <a
                href={heroWhatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click_hero"
              >
                <WhatsappGlyph className="h-5 w-5" />
                Enviar projeto para análise
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-white/30 px-6 text-white hover:border-white hover:bg-white/5"
            >
              <Link href="#trabalhos" data-track="view_works_click">
                Ver trabalhos realizados
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Faixa técnica inferior — sobreposta à foto, sem cards */}
      <div className="relative border-t border-white/15 bg-black/55 backdrop-blur-sm">
        <div className="container grid grid-cols-2 gap-x-8 gap-y-3 py-5 md:grid-cols-4 md:py-6">
          <HeroSpec label="Materiais" value="Alumínio · Aço · Ferro" />
          <HeroSpec label="Estrutura" value="5 CNCs · Corte a fio" />
          <HeroSpec label="Curso útil" value="4,2 × 1,65 × 1,3 m" />
          <HeroSpec label="Entrada" value="CAD · Foto · Medidas" />
        </div>
      </div>
    </section>
  );
}

function HeroSpec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">{label}</dt>
      <dd className="mt-1.5 font-display text-[0.95rem] font-semibold leading-tight text-white md:text-[1rem]">
        {value}
      </dd>
    </div>
  );
}

/* ─────────────────────── CREDIBILIDADE ─────────────────────── */

function CredibilityBand() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container grid divide-border md:grid-cols-2 md:divide-x lg:grid-cols-4">
        {credibility.map((item) => (
          <div key={item.label} className="flex flex-col gap-3 border-t border-border px-1 py-8 md:border-t-0 md:px-6 lg:first:pl-0 lg:last:pr-0">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
                {item.index}
              </span>
              <span className="spec-label">{item.label}</span>
            </div>
            <h3 className="font-display text-lg font-bold leading-snug text-primary">
              {item.value}
            </h3>
            <p className="text-sm leading-6 text-foreground/65">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── SOBRE ─────────────────────── */

function About() {
  return (
    <MotionSection id="sobre">
      <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
        <div className="relative">
          <span className="eyebrow">A CMJ Modelação</span>
          <h2 className="tech-rule mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tightest text-primary md:text-[2.5rem]">
            Modelos físicos que entram bem no processo de fundição.
          </h2>
          <div className="mt-10 space-y-5 text-[1rem] leading-8 text-foreground/75">
            <p>
              A CMJ atua na fabricação de moldes em isopor para processos de fundição, atendendo
              demandas técnicas de empresas que precisam transformar desenhos, medidas ou
              referências em modelos físicos bem acabados.
            </p>
            <p>
              Com estrutura CNC própria e experiência em peças industriais, a empresa atende
              projetos para alumínio, aço e ferro fundido, sempre com foco em leitura técnica,
              acabamento e viabilidade produtiva.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-foreground/75">
              <CheckMark className="h-4 w-4 text-accent" /> CAD, foto ou medida
            </span>
            <span className="inline-flex items-center gap-2 text-foreground/75">
              <CheckMark className="h-4 w-4 text-accent" /> Atendimento direto
            </span>
            <span className="inline-flex items-center gap-2 text-foreground/75">
              <CheckMark className="h-4 w-4 text-accent" /> Análise sem compromisso
            </span>
          </div>
        </div>

        <div className="border-t-2 border-primary">
          <FactRow code="A/01" title="Para quem">
            Fundições, ferramentarias, estamparias, indústria automotiva, engenharia e fabricantes
            de dispositivos.
          </FactRow>
          <FactRow code="A/02" title="Como trabalhamos">
            Análise técnica do desenho, modelagem em CNC Router, refino manual e conferência
            dimensional antes da entrega.
          </FactRow>
          <FactRow code="A/03" title="O que entregamos">
            Modelo em EPS pronto para o processo de fundição do cliente, com acabamento
            controlado.
          </FactRow>
          <FactRow code="A/04" title="Por que confiar">
            Estrutura CNC própria, atendimento direto com a produção e foco em viabilidade real do
            molde.
          </FactRow>
        </div>
      </div>
    </MotionSection>
  );
}

function FactRow({
  code,
  title,
  children
}: {
  code: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[60px_minmax(0,1fr)] gap-5 border-b border-border py-6 md:grid-cols-[80px_minmax(0,180px)_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-7">
      <span className="font-mono text-[0.78rem] font-semibold tracking-[0.18em] text-accent">
        {code}
      </span>
      <h3 className="col-span-2 font-display text-[1.1rem] font-semibold leading-tight text-primary md:col-span-1">
        {title}
      </h3>
      <p className="col-span-2 text-[0.95rem] leading-7 text-foreground/70 md:col-span-1">
        {children}
      </p>
    </div>
  );
}

/* ─────────────────────── SERVIÇOS ─────────────────────── */

function Services() {
  return (
    <MotionSection id="servicos">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Catálogo de serviços</span>
            <h2 className="tech-rule mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-tightest text-primary md:text-[2.5rem]">
              O que produzimos em EPS para o processo de fundição.
            </h2>
            <p className="mt-9 max-w-xl text-[0.98rem] leading-7 text-foreground/65">
              Cada linha cobre uma necessidade concreta de chão de fábrica — do molde técnico
              comum à demanda especial com engenharia reversa.
            </p>
          </div>
          <Link
            href="#orcamento"
            className="hidden items-center gap-2 self-end font-display text-sm font-semibold text-primary hover:text-accent md:inline-flex"
          >
            Pedir orçamento de qualquer serviço
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Catálogo editorial — sem cards, sem caixas. Apenas linhas técnicas. */}
        <div className="mt-14 border-t-2 border-primary">
          {/* Header da tabela (apenas desktop) */}
          <div className="hidden grid-cols-[80px_minmax(0,2.6fr)_minmax(0,3fr)_minmax(0,2fr)] gap-8 border-b border-border py-3 spec-label !text-foreground/55 lg:grid">
            <span>Ref.</span>
            <span>Serviço</span>
            <span>Quando se aplica</span>
            <span>Aplicação prática</span>
          </div>

          {services.map((service, i) => (
            <article
              key={service.title}
              className="group grid grid-cols-1 gap-3 border-b border-border py-7 transition-colors hover:bg-secondary/40 lg:grid-cols-[80px_minmax(0,2.6fr)_minmax(0,3fr)_minmax(0,2fr)] lg:gap-8 lg:py-8"
            >
              <div className="flex items-baseline gap-3 lg:block">
                <span className="font-mono text-[0.85rem] font-semibold tracking-[0.18em] text-accent">
                  S/{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/45 lg:hidden">
                  Serviço
                </span>
              </div>

              <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-primary lg:text-[1.25rem]">
                {service.title}
              </h3>

              <p className="text-[0.95rem] leading-7 text-foreground/70">{service.problem}</p>

              <div className="border-l border-accent/50 pl-4 lg:border-l-0 lg:border-t-2 lg:border-accent/40 lg:pl-0 lg:pt-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/55">
                  Aplicação
                </p>
                <p className="mt-1.5 text-[0.92rem] leading-6 text-foreground/85">
                  {service.application}
                </p>
              </div>
            </article>
          ))}

          {/* Linha final com CTA — fecha a tabela como um catálogo de verdade */}
          <div className="flex flex-col gap-3 border-b border-border bg-secondary/40 py-7 md:flex-row md:items-center md:justify-between md:gap-8 md:py-6">
            <p className="font-display text-[1rem] font-semibold text-primary">
              Seu serviço não está listado? A CMJ avalia projetos especiais sob desenho.
            </p>
            <Button asChild variant="default" className="md:self-auto">
              <a
                href={heroWhatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click_services_cta"
              >
                Enviar projeto para análise
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────────── SEGMENTOS ─────────────────────── */

function Segments() {
  return (
    <MotionSection id="segmentos" className="surface-noise">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Segmentos atendidos</span>
            <h2 className="tech-rule mt-5 font-display text-3xl font-semibold leading-[1.04] tracking-tightest text-primary md:text-[2.5rem]">
              Indústrias que usam moldes em EPS para resolver o processo.
            </h2>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55 md:text-right">
            06 setores · atendimento B2B
          </p>
        </div>

        <div className="mt-14 border-t-2 border-primary">
          {segments.map((segment, i) => (
            <article
              key={segment.title}
              className="group grid grid-cols-[60px_minmax(0,1fr)] gap-5 border-b border-border py-7 transition-colors hover:bg-white/60 md:grid-cols-[80px_minmax(0,260px)_minmax(0,1fr)_60px] md:items-baseline md:gap-8 md:py-8"
            >
              <span className="font-mono text-[0.85rem] font-semibold tracking-[0.18em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-2 font-display text-[1.15rem] font-semibold leading-tight text-primary md:col-span-1">
                {segment.title}
              </h3>
              <p className="col-span-2 text-[0.95rem] leading-7 text-foreground/70 md:col-span-1">
                {segment.need}
              </p>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/45 group-hover:text-accent md:inline md:text-right">
                Atendido →
              </span>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────────── ESTRUTURA / MAQUINÁRIO ─────────────────────── */

function Structure() {
  return (
    <MotionSection id="estrutura" className="relative overflow-hidden concrete-texture text-white">
      <div className="container relative">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow !text-accent">Capacidade produtiva</span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.04] tracking-tightest text-white md:text-[2.7rem]">
              Dimensões, faixas de peça e recursos produtivos disponíveis.
            </h2>
            <p className="mt-9 max-w-xl text-[0.98rem] leading-7 text-white/70">
              Estrutura CNC própria preparada para projetos técnicos e industriais — de pequenas
              peças de geometria controlada a modelos de grande porte para fundição em alumínio,
              aço e ferro fundido.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-px overflow-hidden border border-white/15 bg-white/10 md:max-w-sm">
            <Stat value="4,2 m" label="Y máx · corte a fio" />
            <Stat value="1,65 m" label="X máx · router" />
            <Stat value="1,3 m" label="Z máx · corte a fio" />
          </div>
        </div>

        {/* Matriz de capacidade — DIFERENCIAL: o que cada faixa permite produzir */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
            <p className="spec-label !text-white/55">O que produzimos por faixa de tamanho</p>
            <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/45 md:block">
              03 faixas · uma estrutura
            </p>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            <CapabilityCell
              tier="01"
              size="Pequenas peças"
              range="Até 800 × 800 × 500 mm"
              examples="Componentes técnicos, dispositivos, moldes seriados de baixo volume."
              foundry="Alumínio · Aço"
            />
            <CapabilityCell
              tier="02"
              size="Peças médias"
              range="Até 2.500 × 1.500 × 750 mm"
              examples="Modelos automotivos, peças industriais com geometria complexa."
              foundry="Alumínio · Aço · Ferro"
              highlight
            />
            <CapabilityCell
              tier="03"
              size="Grande porte"
              range="Até 4.200 × 1.650 × 1.300 mm"
              examples="Cabeçotes, bases, conjuntos modelados (volumes acima de 50 m³)."
              foundry="Ferro fundido · Aço"
            />
          </div>
        </div>

        {/* Tabela técnica — INFO: especificação de cada máquina */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
            <p className="spec-label !text-white/55">Maquinário CNC instalado</p>
            <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/45 md:block">
              05 máquinas · capacidade útil em mm
            </p>
          </div>
          <div className="overflow-hidden border-x border-b border-white/10 bg-white/[0.03]">
            <div className="hidden grid-cols-[80px_1fr_1.2fr_120px] gap-4 border-b border-white/10 px-5 py-3 spec-label !text-white/55 md:grid">
              <span>Ref.</span>
              <span>Equipamento</span>
              <span>Capacidade útil</span>
              <span className="text-right">Eixos</span>
            </div>
            {machines.map((machine, i) => (
              <div
                key={`${machine.type}-${i}`}
                className="grid gap-2 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[80px_1fr_1.2fr_120px] md:items-center md:gap-4"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
                  M/{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[1.05rem] font-semibold text-white">
                  {machine.type}
                </span>
                <span className="font-mono text-sm tracking-[0.04em] text-white/85">
                  {machine.capacity}
                </span>
                <span className="font-mono text-xs text-white/55 md:text-right">{machine.axes}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipamentos de apoio */}
        <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
          {equipment.map((item, i) => (
            <div key={item} className="bg-graphite px-5 py-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
                Apoio · A/{String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-graphite px-4 py-4 text-center">
      <p className="font-display text-xl font-bold text-white">{value}</p>
      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
    </div>
  );
}

function CapabilityCell({
  tier,
  size,
  range,
  examples,
  foundry,
  highlight
}: {
  tier: string;
  size: string;
  range: string;
  examples: string;
  foundry: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-5 px-6 py-7 md:px-7 md:py-8",
        highlight ? "bg-graphite ring-1 ring-accent/40" : "bg-graphite"
      )}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.8rem] font-semibold tracking-[0.2em] text-accent">
          {tier}
        </span>
        {highlight ? (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
            Mais demandado
          </span>
        ) : null}
      </div>
      <div>
        <h3 className="font-display text-[1.25rem] font-semibold text-white">{size}</h3>
        <p className="mt-2 font-mono text-[0.78rem] tracking-[0.04em] text-white/75">{range}</p>
      </div>
      <p className="text-[0.92rem] leading-7 text-white/65">{examples}</p>
      <div className="mt-auto border-t border-white/10 pt-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">
          Fundição típica
        </p>
        <p className="mt-1 font-display text-sm font-semibold text-white">{foundry}</p>
      </div>
    </div>
  );
}

/* ─────────────────────── PORTFÓLIO ─────────────────────── */

function Portfolio() {
  const [feature, ...rest] = portfolio;

  // Índice de categorias com contagem real
  const indexCounts = portfolio.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const indexEntries = Object.entries(indexCounts);

  return (
    <section id="trabalhos" className="relative section-padding">
      <span aria-hidden="true" data-scan-rule className="scan-rule" />

      <div className="container">
        {/* Cabeçalho de catálogo */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">Trabalhos realizados</span>
            <h2 className="tech-rule mt-5 font-display text-3xl font-semibold leading-[1.04] tracking-tightest text-primary md:text-[2.7rem]">
              Catálogo técnico CMJ · projetos, CAD e produção em EPS.
            </h2>
          </div>
          <div className="border-l-2 border-accent pl-5 lg:max-w-md">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55">
              Índice
            </p>
            <ul className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {indexEntries.map(([cat, count]) => (
                <li
                  key={cat}
                  className="inline-flex items-baseline gap-2 font-display text-[0.95rem] font-semibold text-primary"
                >
                  {cat}
                  <span className="font-mono text-[0.7rem] font-normal text-foreground/45">
                    ({String(count).padStart(2, "0")})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Peça em destaque — composição editorial assimétrica:
            texto à esquerda, imagem central dominante que sangra à direita,
            coluna lateral com rótulo vertical. */}
        <article className="relative mt-16 border-t-2 border-primary pt-10">
          {/* Rótulo vertical lateral (somente desktop) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 top-12 hidden font-mono text-[0.65rem] uppercase tracking-[0.4em] text-foreground/35 lg:block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Projeto em destaque · {feature.category}
          </span>

          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
            {/* Coluna de texto + specs */}
            <div className="flex flex-col justify-between gap-10">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
                  Peça P/01 · {feature.category}
                </p>
                <h3 className="mt-4 font-display text-[1.6rem] font-semibold leading-[1.1] tracking-tight text-primary md:text-[2rem]">
                  {feature.title}
                </h3>
                <p className="mt-6 max-w-md text-[1rem] leading-7 text-foreground/70">
                  {feature.description}
                </p>
              </div>

              {feature.specs && (
                <dl className="border-t border-border pt-5">
                  {feature.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline justify-between border-b border-border py-3"
                    >
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/55">
                        {s.label}
                      </dt>
                      <dd className="font-display text-[0.95rem] font-semibold text-primary">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <a
                href={heroWhatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click_portfolio_feature"
                className="inline-flex items-center gap-3 self-start border-b border-primary pb-1 font-display text-sm font-semibold text-primary hover:border-accent hover:text-accent"
              >
                Orçar um projeto similar
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Imagem dominante — quebra o grid e sangra à direita até a borda da viewport */}
            <div className="relative aspect-[4/3] overflow-hidden bg-graphite md:aspect-[16/10] lg:-mr-8 lg:aspect-auto lg:min-h-[620px] 2xl:-mr-[calc((100vw-1240px)/2+2rem)]">
              {feature.image ? (
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <PortfolioFallback category={feature.category} />
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/45 via-black/5 to-transparent"
                aria-hidden="true"
              />

              {/* Overlay técnico denso, canto inferior */}
              <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-black/55 px-5 py-4 backdrop-blur-sm md:px-7 md:py-5">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/65">
                  <span>EPS usinado em CNC</span>
                  <span className="hidden h-1 w-1 self-center bg-accent md:inline-block" />
                  <span>Acabamento manual</span>
                  <span className="hidden h-1 w-1 self-center bg-accent md:inline-block" />
                  <span>Produção interna · CMJ</span>
                </div>
              </div>

              <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                <span className="h-1 w-1 bg-accent" />
                P/01
              </span>
            </div>
          </div>
        </article>

        {/* Cards restantes — 2 colunas com offset vertical alternado (assimetria editorial) */}
        <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-y-20">
          {rest.map((item, i) => {
            const isOffset = i % 2 === 1;
            return (
              <article
                key={item.title}
                className={cn(
                  "group flex flex-col",
                  isOffset && "lg:mt-20"
                )}
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-graphite">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PortfolioFallback category={item.category} />
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    P/{String(i + 2).padStart(2, "0")} · {item.category}
                  </div>
                  {/* Overlay técnico inferior — info densa, estilo legenda de catálogo */}
                  <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-black/55 px-4 py-3 backdrop-blur-sm">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/70">
                      {item.specs?.map((s) => s.value).join(" · ") ?? "Modelação CMJ"}
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t-2 border-primary pt-5">
                  <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-foreground/65">
                    {item.description}
                  </p>
                  {item.specs && (
                    <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-4">
                      {item.specs.map((s) => (
                        <div key={s.label}>
                          <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/50">
                            {s.label}
                          </dt>
                          <dd className="mt-0.5 font-display text-sm font-semibold text-primary">
                            {s.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t-2 border-primary pt-8 md:flex-row md:items-center">
          <p className="max-w-2xl text-sm leading-7 text-foreground/60">
            Outras peças e projetos podem ser enviados por WhatsApp conforme o tipo de fundição
            que você está orçando. Peças sob NDA não são publicadas.
          </p>
          <Button asChild variant="default">
            <a
              href={heroWhatsapp}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click_portfolio_more"
            >
              Pedir mais referências
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PortfolioFallback({ category }: { category: string }) {
  return (
    <div className="relative flex h-full items-end justify-between bg-gradient-to-br from-graphite via-graphite to-primary p-5">
      <div className="absolute inset-0 blueprint-grid-dark opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="spec-label !text-white/55">{category}</p>
        <p className="mt-2 font-display text-base font-semibold text-white">
          Imagem sob solicitação
        </p>
      </div>
      <GlyphGear className="relative h-10 w-10 text-white/30" aria-hidden="true" />
    </div>
  );
}

/* ─────────────────────── CLIENTES ─────────────────────── */

function Clients() {
  return (
    <section id="clientes" className="border-y border-border bg-white py-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-14">
          <div className="md:max-w-sm">
            <span className="eyebrow">Clientes industriais</span>
            <h2 className="mt-4 font-display text-[1.4rem] font-semibold leading-tight text-primary">
              Empresas atendidas em projetos de modelação, ferramentaria e fundição.
            </h2>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/45 md:text-right">
            {String(clients.length).padStart(2, "0")} empresas listadas
          </p>
        </div>

        {/* Mural industrial — placas técnicas, grayscale, sem marquee */}
        <ul className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {clients.map((client) => (
            <li
              key={client}
              className="group relative flex h-24 items-center justify-center bg-white px-5 transition-colors hover:bg-secondary/60"
            >
              <span className="cmj-wordmark text-center text-[0.9rem] font-bold uppercase tracking-[0.06em] text-foreground/55 transition-colors group-hover:text-primary">
                {client}
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/25"
              >
                ·
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────── PROCESSO ─────────────────────── */

function Process() {
  return (
    <section id="processo" className="relative surface-noise section-padding">
      <span aria-hidden="true" data-scan-rule className="scan-rule" />

      <div className="container">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Operação</span>
            <h2 className="tech-rule mt-5 font-display text-3xl font-semibold leading-[1.04] tracking-tightest text-primary md:text-[2.7rem]">
              Como um projeto vira um molde em EPS.
            </h2>
            <p className="mt-9 max-w-xl text-[0.98rem] leading-7 text-foreground/65">
              Cada projeto passa por seis etapas técnicas, do recebimento do desenho à conferência
              dimensional antes da entrega. Sem caixa-preta: o cliente acompanha o que está
              acontecendo na peça dele.
            </p>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55">
            06 etapas · fluxo padrão
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          {/* Coluna esquerda: foto real da fábrica + bloco editorial */}
          <div className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite shadow-industrial-lg">
              <Image
                src="/portfolio/acabamento-manual-molde-grande.jpg"
                alt="Operadores realizando acabamento e conferência em modelo de grande porte em EPS na CMJ Modelação"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent mix-blend-multiply"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-graphite/90 px-5 py-4 backdrop-blur-sm">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/55">
                  Chão de fábrica · CMJ
                </p>
                <p className="mt-1 font-display text-[0.95rem] font-semibold text-white">
                  Medição e acabamento em modelo EPS de grande porte.
                </p>
              </div>
              <span className="absolute right-4 top-4 inline-flex items-center gap-2 border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                Operação interna
              </span>
            </div>

            <div className="mt-6 border-l-[3px] border-accent pl-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/55">
                Entrada típica do projeto
              </p>
              <p className="mt-2 font-display text-[1rem] font-semibold text-primary">
                Desenho técnico · foto da peça · medidas · peça-amostra
              </p>
            </div>
          </div>

          {/* Coluna direita: lista editorial dos 6 passos */}
          <ol className="border-t-2 border-primary">
            {processSteps.map((step, i) => {
              const Icon = processIcons[i] ?? GlyphDocument;
              return (
                <li
                  key={step.number}
                  className="grid grid-cols-[60px_minmax(0,1fr)_24px] items-start gap-5 border-b border-border py-7 md:grid-cols-[80px_minmax(0,1fr)_28px] md:gap-6 md:py-8"
                >
                  <span className="font-mono text-[1.3rem] font-semibold tracking-[0.04em] text-accent md:text-[1.5rem]">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.15rem] font-semibold leading-snug text-primary md:text-[1.25rem]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[0.95rem] leading-7 text-foreground/65">
                      {step.text}
                    </p>
                  </div>
                  <Icon className="h-6 w-6 text-foreground/40" aria-hidden="true" />
                </li>
              );
            })}
            <li className="flex flex-col gap-3 py-7 md:flex-row md:items-center md:justify-between">
              <p className="font-display text-[1rem] font-semibold text-primary">
                Da entrada do desenho à entrega do modelo — sem etapas escondidas.
              </p>
              <Button asChild variant="default">
                <a
                  href={heroWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  data-track="whatsapp_click_process_cta"
                >
                  Iniciar pelo passo 01
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CONTROLE E ACABAMENTO ─────────────────────── */

function Quality() {
  const checks = [
    {
      code: "Q/01",
      title: "Conferência dimensional",
      text: "Checagem de medidas principais, regiões de encaixe e proporções críticas antes da liberação."
    },
    {
      code: "Q/02",
      title: "Acabamento manual",
      text: "Refino de cantos, superfícies, raios e detalhes que o CNC não resolve sozinho."
    },
    {
      code: "Q/03",
      title: "Leitura técnica da peça",
      text: "Avaliação de geometria, aplicação, material de fundição e necessidade de sobre-medida."
    },
    {
      code: "Q/04",
      title: "Entrega pronta para fundição",
      text: "Modelo preparado para seguir ao processo do cliente com menos ajuste no chão da fundição."
    }
  ];

  return (
    <section id="qualidade" className="relative overflow-hidden bg-graphite text-white section-padding">
      <div className="container grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16">
        <div>
          <span className="eyebrow !text-accent">Controle e acabamento</span>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.04] tracking-tightest text-white md:text-[2.7rem]">
            O molde só sai quando a peça faz sentido para o processo de fundição.
          </h2>
          <p className="mt-9 max-w-2xl text-[0.98rem] leading-7 text-white/68">
            A etapa final combina conferência dimensional, acabamento manual e análise técnica
            sobre o uso da peça. O objetivo é entregar um modelo em EPS limpo, legível e pronto
            para avançar no processo industrial do cliente.
          </p>

          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
            {checks.map((item) => (
              <article key={item.code} className="bg-graphite px-6 py-6">
                <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  {item.code}
                </p>
                <h3 className="mt-4 font-display text-[1.12rem] font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-7 text-white/62">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <figure className="relative lg:mt-10">
          <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-industrial-lg">
            <Image
              src="/portfolio/acabamento-manual-molde-grande.jpg"
              alt="Operadores da CMJ realizando conferência e acabamento em molde EPS de grande porte"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-black/55 px-5 py-4 backdrop-blur-sm">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
                Foto real · operação CMJ
              </p>
              <p className="mt-1 font-display text-[0.98rem] font-semibold text-white">
                Medição, ajuste e acabamento antes da entrega.
              </p>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* ─────────────────────── O QUE RECEBEMOS ─────────────────────── */

function AcceptedInputs() {
  const inputs: { code: string; label: string; note: string }[] = [
    { code: "I/01", label: "Desenho técnico", note: "PDF, 2D ou ficha de projeto." },
    { code: "I/02", label: "Arquivo CAD 3D", note: "STEP · STP · IGES · DWG · DXF." },
    { code: "I/03", label: "Foto da peça", note: "Várias vistas + escala/referência." },
    { code: "I/04", label: "Medidas anotadas", note: "Croqui à mão ou planilha." },
    { code: "I/05", label: "Peça-amostra física", note: "Para engenharia reversa simples." },
    { code: "I/06", label: "Referência industrial", note: "Peça similar do catálogo do cliente." }
  ];

  return (
    <section id="entradas" className="relative surface-noise section-padding">
      <span aria-hidden="true" data-scan-rule className="scan-rule" />
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Entrada do projeto</span>
            <h2 className="tech-rule mt-5 font-display text-3xl font-semibold leading-[1.04] tracking-tightest text-primary md:text-[2.5rem]">
              O que basta para a CMJ avaliar o orçamento.
            </h2>
            <p className="mt-9 max-w-xl text-[0.98rem] leading-7 text-foreground/65">
              Não é preciso ter desenho técnico pronto. Aceitamos qualquer combinação de entradas
              abaixo — quanto mais informação clara da peça, mais precisa fica a análise inicial.
            </p>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55 md:text-right">
            Formatos aceitos · seis entradas
          </p>
        </div>

        <ul className="mt-14 grid gap-px border-y border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {inputs.map((item) => (
            <li
              key={item.code}
              className="group flex items-start gap-4 bg-white px-6 py-6 transition-colors hover:bg-secondary/50"
            >
              <span className="mt-1 font-mono text-[0.78rem] font-semibold tracking-[0.18em] text-accent">
                {item.code}
              </span>
              <div>
                <p className="font-display text-[1.05rem] font-semibold leading-tight text-primary">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[0.88rem] leading-6 text-foreground/65">{item.note}</p>
              </div>
              <span aria-hidden="true" className="ml-auto self-center text-accent">
                <CheckMark className="h-4 w-4" />
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-sm leading-7 text-foreground/55">
          Quanto mais detalhes técnicos forem enviados — material de fundição, dimensões
          aproximadas, prazo e aplicação da peça — mais precisa será a análise inicial.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────── MID CTA ─────────────────────── */

function MidCta() {
  return (
    <section className="relative overflow-hidden concrete-texture text-white">
      <div className="container relative grid gap-10 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-24">
        <div>
          <span className="eyebrow !text-accent">Próximo passo</span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tightest text-white md:text-[2.6rem]">
            Tem um projeto para fundição e precisa transformá-lo em modelo físico?
          </h2>
          <p className="mt-7 max-w-2xl text-[1rem] leading-8 text-white/75">
            Envie o desenho, foto ou medidas da peça. A CMJ avalia a viabilidade técnica e retorna
            com uma proposta de orçamento — sem compromisso.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Button asChild size="lg" variant="accent" className="h-13 w-full px-7 md:w-auto">
            <a
              href={midCtaWhatsapp}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click_mid_cta"
            >
              <WhatsappGlyph className="h-5 w-5" />
              Enviar projeto para orçamento
            </a>
          </Button>
          <Link
            href="#orcamento"
            className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Preferir formulário? Ir para o orçamento técnico →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── ORÇAMENTO ─────────────────────── */

function Quote() {
  return (
    <MotionSection id="orcamento" className="surface-noise">
      <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow">Solicitação de orçamento técnico</span>
          <h2 className="tech-rule mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tightest text-primary md:text-[2.4rem]">
            Envie os dados do projeto para análise comercial.
          </h2>
          <p className="mt-9 max-w-md text-[1rem] leading-7 text-foreground/70">
            Quanto mais informações você enviar, mais precisa será a análise inicial. Ao concluir,
            o formulário abre o WhatsApp da CMJ com tudo organizado.
          </p>

          <ul className="mt-8 divide-y divide-border border-y border-border text-sm text-foreground/80">
            <AnalysisInput code="E/01" title="Desenho técnico ou CAD">
              PDF, DWG, DXF, STEP, STP, IGES ou arquivo compactado.
            </AnalysisInput>
            <AnalysisInput code="E/02" title="Foto da peça ou referência física">
              Imagens de diferentes ângulos ajudam quando não existe desenho pronto.
            </AnalysisInput>
            <AnalysisInput code="E/03" title="Dimensões principais">
              Comprimento, largura, altura, espessuras críticas e regiões de encaixe.
            </AnalysisInput>
            <AnalysisInput code="E/04" title="Material de fundição">
              Alumínio, aço, ferro fundido ou material ainda a definir.
            </AnalysisInput>
            <AnalysisInput code="E/05" title="Prazo e aplicação da peça">
              Urgência, uso final e contexto do processo industrial.
            </AnalysisInput>
          </ul>

          <div className="mt-10 border-t border-border pt-6 text-sm text-foreground/65">
            <p>
              Prefere WhatsApp direto?{" "}
              <a
                className="font-semibold text-primary underline-offset-4 hover:underline"
                href={midCtaWhatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click_form_aside"
              >
                {contact.whatsapp}
              </a>
            </p>
          </div>
        </div>
        <QuoteForm />
      </div>
    </MotionSection>
  );
}

function AnalysisInput({
  code,
  title,
  children
}: {
  code: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[58px_minmax(0,1fr)] gap-4 py-4">
      <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
        {code}
      </span>
      <span>
        <strong className="block font-display text-[0.98rem] font-semibold leading-tight text-primary">
          {title}
        </strong>
        <span className="mt-1.5 block text-[0.88rem] leading-6 text-foreground/62">
          {children}
        </span>
      </span>
    </li>
  );
}

/* ─────────────────────── FAQ ─────────────────────── */

function Faq() {
  return (
    <MotionSection id="faq">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="tech-rule mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tightest text-primary md:text-[2.4rem]">
              Antes de enviar o projeto, respostas rápidas.
            </h2>
            <p className="mt-9 max-w-md text-[0.95rem] leading-7 text-foreground/65">
              Se a sua dúvida não estiver aqui, o WhatsApp resolve em poucos minutos —
              normalmente respondemos com uma análise técnica preliminar no mesmo dia.
            </p>
          </div>
          <div className="grid divide-y divide-border border-y border-border">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                className="group py-5"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="font-display text-[1.05rem] font-semibold text-primary">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center border border-border text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────────── FOOTER ─────────────────────── */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-graphite pt-20 text-white">
      <div className="container relative grid gap-12 pb-12 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <span
            aria-hidden="true"
            className="mb-5 inline-flex h-10 w-10 items-center justify-center bg-white text-primary font-display text-base font-bold"
          >
            CMJ
          </span>
          <strong className="cmj-wordmark block text-xl font-bold uppercase text-white">
            CMJ Modelação
          </strong>
          <p className="mt-2 spec-label !text-white/55">Moldes em isopor para fundição</p>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
            Modelação industrial em EPS para processos de fundição em alumínio, aço e ferro
            fundido, com estrutura CNC própria em São Bernardo do Campo/SP.
          </p>
        </div>

        <div>
          <p className="spec-label !text-white/45">Contato</p>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li>
              <a
                href={footerWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                data-track="whatsapp_click_footer"
              >
                WhatsApp · {contact.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="text-white/55">{contact.hours}</li>
          </ul>
        </div>

        <div>
          <p className="spec-label !text-white/45">Localização</p>
          <p className="mt-5 text-sm leading-7 text-white/80">
            {contact.location}
            <br />
            {contact.region}
          </p>
          <p className="mt-3 text-xs text-white/45">
            Atendimento a clientes de toda a Grande SP e demais estados sob combinação.
          </p>
        </div>

        <div>
          <p className="spec-label !text-white/45">Navegação</p>
          <ul className="mt-5 grid gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/50 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} CMJ Modelação. Modelos em EPS para fundição industrial.
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">
            CNPJ sob solicitação · Site: {contact.site}
          </p>
        </div>
      </div>
    </footer>
  );
}
