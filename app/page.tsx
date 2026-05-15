import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Phone
} from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { QuoteForm } from "@/components/quote-form";
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
  trustBadges
} from "@/lib/site-data";
import { makeWhatsappUrl } from "@/lib/utils";

const defaultWhatsappMessage =
  "Olá, gostaria de solicitar um orçamento para moldes em isopor para fundição. Seguem meus dados: Nome, Empresa, Tipo de Projeto e Prazo.";

const whatsappHref = makeWhatsappUrl(defaultWhatsappMessage);

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Credibility />
      <About />
      <Services />
      <Segments />
      <Structure />
      <Portfolio />
      <Clients />
      <Process />
      <MidCta />
      <Quote />
      <Faq />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="#" className="flex items-center gap-3" aria-label="CMJ Modelação">
          <div className="leading-none">
            <strong className="cmj-wordmark block text-[1.35rem] font-black uppercase text-primary md:text-[1.55rem]">
              CMJ Modelação
            </strong>
            <span className="mt-1 block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Moldes para fundição
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="h-10">
          <Link href="#orcamento">
            Solicitar Orçamento
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <nav className="border-t bg-white lg:hidden" aria-label="Menu mobile">
        <div className="container flex gap-4 overflow-x-auto py-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 text-xs font-bold uppercase text-slate-600">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="industrial-grid relative overflow-hidden bg-slate-50">
      <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[1fr_0.92fr] lg:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 border-l-2 border-accent pl-4">
            {trustBadges.map((badge) => (
              <span key={badge} className="text-xs font-bold uppercase text-slate-700">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-normal text-primary md:text-6xl">
            Moldes em Isopor para Fundição com Precisão Industrial
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            Projetos sob medida para fundição em alumínio, aço e ferro fundido, com estrutura CNC, acabamento técnico e atendimento para empresas de pequeno, médio e grande porte.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                Solicitar orçamento pelo WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#trabalhos">
                Ver trabalhos realizados
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-lg border bg-white shadow-industrial">
            <Image
              src="/portfolio/hero-cnc-molde-isopor.png"
              alt="Moldes em isopor para fundição em ambiente CNC industrial"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 border-l-4 border-accent bg-white p-4 shadow-lg md:left-auto md:w-72">
            <p className="text-xs font-semibold uppercase text-slate-500">Capacidade técnica</p>
            <p className="mt-1 text-sm font-semibold text-primary">CNC Router, Corte a Fio e acabamento para moldes de alta complexidade.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Credibility() {
  return (
    <section className="border-y bg-white py-8">
      <div className="container grid divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
        {credibility.map((item) => (
          <div key={item.label} className="bg-white p-5">
            <p className="text-xs font-bold uppercase text-slate-500">{item.label}</p>
            <h2 className="mt-2 text-xl font-black text-primary">{item.value}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="border-l-2 border-accent pl-3 text-sm font-bold uppercase text-slate-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

function About() {
  return (
    <MotionSection id="sobre">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="bg-primary p-6 text-white md:p-8">
          <p className="text-sm font-bold uppercase text-sky-200">Sobre a CMJ</p>
          <h2 className="mt-3 text-3xl font-black">Modelação industrial para empresas que precisam de precisão.</h2>
          <p className="mt-5 leading-8 text-slate-100">
            A CMJ Modelação é especializada na fabricação de moldes em isopor para fundição, desenvolvendo projetos para alumínio, aço e ferro fundido com foco em precisão, acabamento e qualidade.
          </p>
          <Button asChild variant="accent" className="mt-6">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              Fale com um especialista
            </a>
          </Button>
        </div>
        <div className="border-y">
          {["Automotivo", "Ferramentarias", "Estamparias", "Fundições"].map((item) => (
            <div key={item} className="grid gap-2 border-b py-5 last:border-b-0 sm:grid-cols-[180px_1fr]">
              <h3 className="font-bold text-primary">{item}</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Atendimento técnico para transformar projetos industriais em modelos físicos precisos.
              </p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Services() {
  return (
    <MotionSection id="servicos" className="bg-slate-50">
      <div className="container">
        <SectionIntro
          eyebrow="Serviços"
          title="Soluções em moldes, modelação e acabamento técnico"
          text="Da análise do desenho à finalização do molde, a CMJ atua com foco em viabilidade, precisão e qualidade para processos de fundição."
        />
        <div className="border-t">
          {services.map((service) => (
            <article key={service.title} className="grid gap-4 border-b py-6 md:grid-cols-[260px_1fr_0.85fr]">
              <h3 className="text-lg font-black text-primary">{service.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
              <p className="text-sm font-semibold leading-6 text-slate-800">{service.benefit}</p>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Segments() {
  return (
    <MotionSection>
      <div className="container">
        <SectionIntro
          eyebrow="Para quem atendemos"
          title="Projetos industriais para diferentes segmentos"
          text="Atendemos empresas que precisam transformar projetos técnicos em modelos físicos precisos para processos de fundição."
        />
        <div className="grid gap-px overflow-hidden border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment) => (
            <div key={segment} className="bg-white p-5">
              <span className="font-semibold text-slate-800">{segment}</span>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Structure() {
  return (
    <MotionSection id="estrutura" className="bg-primary text-white">
      <div className="container">
        <SectionIntro
          eyebrow="Estrutura e maquinários"
          title="Estrutura preparada para projetos de diferentes dimensões e complexidades"
          text="A CMJ conta com maquinários CNC e equipamentos de apoio para produção de moldes técnicos com controle dimensional."
        />
        <div className="overflow-hidden border border-white/15">
          {machines.map((machine) => (
            <div key={`${machine.type}-${machine.capacity}`} className="grid border-b border-white/15 bg-white/5 px-4 py-4 last:border-b-0 md:grid-cols-[220px_1fr]">
              <h3 className="font-bold">{machine.type}</h3>
              <p className="text-sm text-slate-200">{machine.capacity}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-4">
          {equipment.map((item) => (
            <div key={item} className="bg-primary px-4 py-3 text-sm font-semibold text-white">
              {item}
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Portfolio() {
  return (
    <MotionSection id="trabalhos">
      <div className="container">
        <SectionIntro
          eyebrow="Trabalhos realizados"
          title="Trabalhos realizados em modelação para fundição"
          text="A galeria foi preparada para receber fotos reais de moldes, peças técnicas e projetos executados pela CMJ."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((item, index) => (
            <article key={item.title} className="overflow-hidden border bg-white">
              <div className="relative aspect-[4/3] bg-slate-900">
                {index === 0 ? (
                  <Image src="/portfolio/hero-cnc-molde-isopor.png" alt={item.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                ) : (
                  <div className="flex h-full items-end bg-slate-100 p-5">
                    <span className="border-l-2 border-accent pl-3 text-sm font-bold text-primary">
                      Foto real do projeto
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase text-accent">{item.category}</p>
                <h3 className="mt-2 font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Clients() {
  const carouselClients = [...clients, ...clients];

  return (
    <MotionSection id="clientes" className="bg-slate-50">
      <div className="container">
        <SectionIntro
          eyebrow="Clientes"
          title="Empresas industriais que já confiaram na CMJ Modelação"
          text="Prova social para reforçar experiência em demandas técnicas de ferramentarias, fundições, estamparias e indústria automotiva."
        />
        <div className="relative overflow-hidden border bg-white py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
          <div className="logo-marquee flex w-max gap-3 px-3" aria-label="Clientes atendidos pela CMJ Modelação">
            {carouselClients.map((client, index) => (
              <ClientLogoMark key={`${client}-${index}`} name={client} muted={index >= clients.length} />
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          As marcas acima representam clientes citados no material institucional. Logos oficiais podem substituir estes nomes quando os arquivos forem fornecidos.
        </p>
      </div>
    </MotionSection>
  );
}

function ClientLogoMark({ name, muted }: { name: string; muted?: boolean }) {
  const compactName = name
    .replace("Grupo ", "")
    .replace("Ferramentaria", "Ferr.")
    .replace("São Francisco", "S. Francisco");

  return (
    <div
      className="flex h-20 w-48 shrink-0 items-center justify-center border bg-slate-50 px-5"
      aria-hidden={muted ? true : undefined}
    >
      <div className="text-center">
        <span className="cmj-wordmark block text-base font-black uppercase text-primary">
          {compactName}
        </span>
        <span className="mt-1 block h-px w-12 bg-accent/70 mx-auto" />
      </div>
    </div>
  );
}

function Process() {
  return (
    <MotionSection>
      <div className="container">
        <SectionIntro
          eyebrow="Processo de atendimento"
          title="Do desenho técnico ao molde finalizado"
          text="Um fluxo objetivo para analisar sua necessidade, estimar prazo e produzir o molde com foco no processo de fundição."
        />
        <div className="border-t">
          {processSteps.map((step, index) => (
            <div key={step.title} className="grid gap-4 border-b py-5 md:grid-cols-[80px_260px_1fr]">
              <span className="text-sm font-black text-accent">0{index + 1}</span>
              <h3 className="font-bold text-primary">{step.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function MidCta() {
  return (
    <section className="bg-primary py-14 text-white">
      <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-black">Precisa de um molde em isopor para fundição?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">Envie seu projeto para análise e receba um orçamento personalizado.</p>
        </div>
        <Button asChild size="lg" variant="accent">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5" />
            Chamar no WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <MotionSection id="orcamento" className="bg-slate-50">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase text-accent">Orçamento</p>
          <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Envie os dados do projeto para análise comercial</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Preencha o formulário com tipo de projeto, material, prazo e informações técnicas. Ao enviar, seus dados abrem no WhatsApp da CMJ com uma mensagem pronta.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Aceita desenho técnico, foto, PDF, DWG, DXF, STEP e arquivos compactados.</p>
            <p className="flex gap-2"><Phone className="h-5 w-5 text-accent" /> Retorno comercial pelo WhatsApp informado no formulário.</p>
          </div>
        </div>
        <QuoteForm />
      </div>
    </MotionSection>
  );
}

function Faq() {
  return (
    <MotionSection>
      <div className="container">
        <SectionIntro eyebrow="FAQ" title="Dúvidas frequentes" text="Respostas rápidas para orientar o envio de projetos e pedidos de orçamento." />
        <div className="mx-auto grid max-w-4xl gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-lg border bg-white p-5">
              <summary className="cursor-pointer font-bold text-primary">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="container grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div>
            <div>
              <strong className="cmj-wordmark block text-2xl font-black uppercase text-white">CMJ Modelação</strong>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Moldes em isopor para fundição</p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
            Empresa especializada em modelação industrial, fabricação de moldes em isopor e projetos sob medida para fundição em alumínio, aço e ferro fundido.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Contato</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>
              WhatsApp:{" "}
              <a className="hover:text-white" href={whatsappHref} target="_blank" rel="noreferrer">
                {contact.whatsapp}
              </a>
            </p>
            <p>
              Telefone:{" "}
              <a className="hover:text-white" href="tel:+551143427908">
                {contact.phone}
              </a>
            </p>
            <p>
              Site:{" "}
              <a className="hover:text-white" href="https://cmj.jpproject.com.br">
                {contact.site}
              </a>
            </p>
            <p>Localização: {contact.location}</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Links rápidos</h3>
          <div className="mt-4 grid gap-2 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-300 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
        © {new Date().getFullYear()} CMJ Modelação. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function WhatsAppFloating() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Solicitar orçamento pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
