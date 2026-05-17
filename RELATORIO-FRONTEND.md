# Relatório Frontend — CMJ Modelação

**Data:** 2026-05-16
**Escopo:** Landing Page (`app/page.tsx`) e Sistema de Gestão (`app/admin/page.tsx`)
**Objetivo:** Mapear estado atual, identificar pontos fortes e oportunidades concretas de evolução do frontend.

---

## 1. Resumo executivo

| Frente | Estado atual | Maturidade | Próximo salto |
|---|---|---|---|
| **Landing Page** | Pronta para produção, identidade visual forte, conversão via WhatsApp | Alta (8/10) | Validação de formulário, dark/contraste, performance fina |
| **Painel Admin** | MVP visual completo, sem persistência, sem auth real | Baixa-Média (4/10) | Quebrar o arquivo, ligar Firebase, fluxo real de pedidos |
| **Design system** | Tokens existem na landing, mas o admin usa hex hardcoded | Média (5/10) | Unificar tokens em `tailwind.config.ts` |
| **Acessibilidade** | Boa base semântica, lacunas em modais e foco | Média (6/10) | Foco visível, trap no modal, aria-live para alertas |
| **Type-safety / dados** | Tipos locais ao arquivo, mock estático | Baixa | Mover tipos para `lib/types.ts`, plugar API |

A landing está madura e cumpre o papel comercial. O admin é um **wireframe funcional de alta fidelidade** — convincente como demo, mas estruturalmente frágil para virar produto.

---

## 2. Landing Page (`app/page.tsx`)

### 2.1 O que está muito bem feito

- **Identidade visual coerente e diferenciada.** O par "editorial industrial" (mono `font-mono` para rótulos técnicos + `font-display` Sora para títulos + grid com rules e códigos tipo `S/01`, `P/02`, `Q/03`) cria uma linguagem própria. Não parece template.
- **Hero protagonista.** A foto da operação real domina a tela com overlay de gradiente bem calibrado e a `HeroSpec` faixa técnica abaixo entrega 4 specs de impacto sem poluir.
- **Conversão WhatsApp-first inteligente.** [`makeWhatsappUrl`](lib/utils.ts) com mensagens pré-formatadas por contexto (`heroWhatsapp`, `midCtaWhatsapp`, `footerWhatsapp`) reduz fricção. Cada CTA tem `data-track` rastreável.
- **Portfolio assimétrico bem resolvido.** A peça em destaque com imagem sangrando à direita ([app/page.tsx:676](app/page.tsx#L676)) + cards com offset vertical alternado é uma decisão editorial cara de acertar — e ficou boa.
- **SEO sério.** [app/layout.tsx](app/layout.tsx) tem OpenGraph, Twitter card, canonical, manifest, keywords; existem `sitemap.ts`, `robots.ts`, `structured-data.tsx`, `opengraph-image.tsx`. Acima do padrão para o nicho.
- **Tracking robusto.** GTM + GA + Meta Pixel + `firebase-analytics` + `conversion-tracking` plugados condicionalmente por env var.
- **Imagens otimizadas.** `next/image` com `priority` no hero, `sizes` corretos por breakpoint.

### 2.2 Pontos de atenção (prioridade decrescente)

#### A. Formulário de orçamento — validação superficial
[components/quote-form.tsx](components/quote-form.tsx) usa apenas `required` no HTML. Sem máscara de WhatsApp, sem validação de e-mail além do `type="email"`, sem feedback de erro inline. Se o usuário enviar com campo inválido, o navegador mostra balão nativo (inconsistente entre browsers) e ainda assim pode disparar `trackConversion("generate_lead")` indevidamente.

**Ação:** plugar `react-hook-form` + `zod` (ou validação manual leve com state). Mostrar erro abaixo de cada campo. Só disparar `generate_lead` no submit válido.

#### B. Hero — risco de CLS e LCP pesado
A imagem `/portfolio/operacao-medicao-molde-eps.jpg` é o LCP. Verificar se está servida em AVIF/WebP com tamanhos `srcset` adequados. O `min-h-[88vh]` no container do hero pode causar pequeno shift em viewports pequenos antes da imagem carregar.

**Ação:** rodar Lighthouse + WebPageTest mobile. Se LCP > 2.5s, gerar variantes em build (`sharp`) ou cortar a imagem em 1600px de largura máxima.

#### C. `<details>` no FAQ não tem ícone animado consistente
O `+` rotaciona 45° via `group-open:rotate-45` ([app/page.tsx:1263](app/page.tsx#L1263)) — funciona, mas o `details/summary` nativo não anima a abertura do painel. Em projetos com tom editorial assim, a transição de altura pesa.

**Ação:** ou aceitar o snap nativo (defensável) ou trocar por componente controlado com `framer-motion` (já está no projeto via `motion-section`).

#### D. `StickyCTA` precisa ser revisado em viewport com teclado virtual
Em iOS Safari, CTAs fixos no fundo costumam ficar atrás do teclado quando o usuário foca o textarea do orçamento. Vale testar.

#### E. Index de portfolio assume categorias estáveis
[app/page.tsx:577-582](app/page.tsx#L577-L582) calcula contagem por `item.category`. Se vier categoria nova no `site-data`, ela aparece automaticamente — bom. Mas não há ordenação determinística (depende da inserção). Considerar ordenar `indexEntries` por contagem desc ou ordem fixa.

#### F. Acessibilidade — pequenas lacunas
- O hero tem `<dt>/<dd>` sem `<dl>` envolvente (HeroSpec). Tecnicamente inválido.
- Os botões `<details><summary>` no FAQ não anunciam estado expandido para leitores de tela (HTML nativo cuida em parte, mas o `+` decorativo deveria ter `aria-hidden`).
- Vários `Image` têm `alt` descritivo bom; alguns fallbacks (`PortfolioFallback`) não.

---

## 3. Sistema de Gestão (`app/admin/page.tsx`)

### 3.1 O que já entrega bem como MVP visual

- **Hierarquia de informação clara.** Login → sidebar com 7 módulos → header com data/CTA → conteúdo. O usuário entende o sistema na primeira tela.
- **Dashboard com 3 níveis bem resolvidos.** Métricas (KPIs) → Timeline + Calendário → Alertas + Snapshot de produção. É o padrão certo para ops industrial.
- **Kanban de pedidos com 8 colunas representa o pipeline real.** "Recebido → Orçamento → Aprovado → Produção → Finalização → Entrega → NF → Faturado" é exatamente o fluxo da CMJ.
- **Login com split-screen industrial.** A imagem da operação + gradiente azul + grid sutil ([app/admin/page.tsx:320-337](app/admin/page.tsx#L320-L337)) entrega tom de produto interno sério.
- **Componentes auxiliares bem fatorados internamente.** `PageHeader`, `PanelTitle`, `OperationalCard`, `DataTable`, `StatusPill`, `AdminField` — está tudo pronto pra extração.

### 3.2 Pontos críticos (em ordem de prioridade)

#### CRÍTICO-1. Tudo em um único arquivo de 952 linhas
[app/admin/page.tsx](app/admin/page.tsx) concentra 17 componentes, 4 tipos, 7 datasets mock e um modal. Isso:
- Trava o build incremental (qualquer edit recompila tudo).
- Impede code-splitting por rota interna.
- Torna PR review impraticável quando começar a evoluir.
- Bloqueia testes unitários.

**Ação:** estruturar como:
```
app/admin/
  page.tsx                  # shell + roteamento de menu
  _components/
    login-screen.tsx
    admin-brand.tsx
    sidebar.tsx
    header.tsx
    new-order-modal.tsx
    dashboard/
      index.tsx
      metrics-grid.tsx
      timeline-panel.tsx
      calendar-panel.tsx
      alerts-panel.tsx
      production-snapshot.tsx
    orders/
      orders-board.tsx
      order-card.tsx
    production/
      production-page.tsx
    finance/
      finance-page.tsx
    billing/
      billing-page.tsx
    clients/
      clients-page.tsx
  _lib/
    types.ts                # Order, Client, FinanceRow, OrderStatus
    mock-data.ts            # orders, clients, financeRows (até existir API)
    constants.ts            # columns, menu
```

#### CRÍTICO-2. "Autenticação" não autentica nada
[app/admin/page.tsx:305-317](app/admin/page.tsx#L305-L317) aceita qualquer e-mail + senha não vazios. O `useState(false)` é client-side, sem cookie, sem sessão. Recarregar a página derruba. O comentário do próprio código já admite: *"A autenticação real entra com Firebase Auth na próxima fase."*

**Ação:** mesmo antes de plugar Firebase, mover essa decisão para:
- Middleware Next (`middleware.ts`) que protege `/admin/*` por cookie.
- Server Action `signInWithPassword` que valida e seta cookie httpOnly.
- A página `/admin` vira Server Component que checa sessão e redireciona.

Sem isso, o painel está **exposto publicamente** (não há `noindex` impedindo crawl além do `robots: { index: false }` do [layout.tsx](app/admin/layout.tsx) — que só impede indexação, não acesso).

#### CRÍTICO-3. Dados mock no client
`orders`, `clients`, `financeRows` são consts no módulo. Não há leitura nem escrita real. O "Novo pedido" do modal só fecha o modal ([app/admin/page.tsx:838-840](app/admin/page.tsx#L838-L840)).

**Ação:** definir contrato de dados antes do backend:
1. Mover tipos para `lib/types.ts`.
2. Criar adapters em `lib/data/` que hoje retornam mock e amanhã chamam Firebase/Firestore.
3. Substituir `const orders = [...]` por `useOrders()` hook que retorna `{ data, isLoading, error }`.

#### ALTA-1. Modal sem foco/ESC/scroll lock
[app/admin/page.tsx:836-911](app/admin/page.tsx#L836-L911) é um overlay sem:
- `onKeyDown` para ESC.
- Focus trap (Tab sai pro fundo).
- `body { overflow: hidden }` (a página rola atrás).
- `aria-modal="true"` / `role="dialog"`.

**Ação:** trocar por `<Dialog>` do Radix ou implementar com `react-focus-lock` + portal. Padronizar com o `StickyCTA` da landing que já faz isso bem.

#### ALTA-2. Cores hex hardcoded em todo o admin
`#071f3a`, `#35a2ff`, `#0a2540`, `#c7d8ea`, `#5b7189`... aparecem **dezenas de vezes**. A landing usa tokens (`text-primary`, `text-accent`, `bg-graphite`). O admin reinventa a paleta inline.

**Ação:** adicionar ao `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      ops: {
        bg: '#eef4fb',
        surface: '#ffffff',
        ink: '#0a2540',
        muted: '#5b7189',
        border: '#c7d8ea',
        sidebar: '#071f3a',
        sidebarBorder: '#123b66',
        accent: '#0878d8',
        accentSoft: '#35a2ff',
        warn: '#f2cf78',
        warnBg: '#fff8e6',
        warnInk: '#6a4a00',
      }
    }
  }
}
```
Depois um find/replace global. Ganho: dark mode, white-label e consistência viram triviais.

#### ALTA-3. Kanban inviável em mobile
`grid min-w-[1180px] grid-cols-8` ([app/admin/page.tsx:536](app/admin/page.tsx#L536)) força scroll horizontal em qualquer tela < 1180px. Em tablet vertical ou celular, 8 colunas a deslizar é hostil.

**Ação:** dois caminhos:
- (Rápido) Em mobile, virar lista filtrada por status com `<select>` no topo.
- (Bom) Componente híbrido: Kanban em ≥ lg, lista colapsável em < lg.

#### ALTA-4. Tabela `DataTable` aceita `ReactNode` indiscriminado
[app/admin/page.tsx:776-816](app/admin/page.tsx#L776-L816) recebe `rows: Array<Array<string | ReactNode>>` — flexível mas:
- Sem tipagem por coluna (não sabe que coluna 4 é status).
- Sem sort, sem filter, sem paginação.
- Sem empty state ("Nenhum pedido encontrado").
- Sem loading skeleton.

**Ação:** evoluir para `<DataTable<T>>` genérico com `columns: ColumnDef<T>[]` (estilo TanStack Table). Ou trocar por `@tanstack/react-table` direto.

#### MÉDIA-1. `useMemo` sem dependências reais
[app/admin/page.tsx:516-521](app/admin/page.tsx#L516-L521) memoiza `grouped` com `[]` como deps porque `orders` é const de módulo. Quando `orders` virar dado dinâmico, esse memo está errado.

**Ação:** já passar `orders` como prop e usar `[orders]` no array de deps.

#### MÉDIA-2. Inputs sem `id`/`label` em alguns campos
[app/admin/page.tsx:351-365](app/admin/page.tsx#L351-L365) — o login usa `<input>` dentro de `<label>` (ok semanticamente), mas o `AdminField` ([app/admin/page.tsx:913-923](app/admin/page.tsx#L913-L923)) não passa `id`, então o `<label>` envelopa mas screen readers podem se confundir com placeholder vs label.

**Ação:** gerar id estável (`useId()`) e ligar via `htmlFor`/`id`.

#### MÉDIA-3. Status do `StatusPill` lista strings literais
[app/admin/page.tsx:818-834](app/admin/page.tsx#L818-L834) faz `["Em atraso", "A faturar", "Pendente"].includes(status)`. Frágil — basta renomear um status no dataset e o estilo some.

**Ação:** mapear via `Record<Status, "warn" | "success" | "default">` exportado de `lib/types.ts`.

#### MÉDIA-4. Hora/data hardcoded
"15/05 · operação" no header ([app/admin/page.tsx:258](app/admin/page.tsx#L258)) é texto fixo. Em qualquer demo ao vivo isso vira piada.

**Ação:** `new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })` num client component pequeno.

---

## 4. Cross-cutting: o que afeta os dois

### 4.1 Componentes UI base estão subaproveitados
[components/ui/](components/ui/) tem `button`, `card`, `input`, `label`, `select`, `textarea`. O admin **só usa Button** — tudo o mais é `<input className="...">` reinventado. Mesmas tabelas, mesmos pills, mesmos cards reescritos.

**Ação:** padronizar admin sobre os primitives existentes; expandir com `Dialog`, `Table`, `Badge`, `Tabs` (todos do Radix).

### 4.2 Não há tema/dark mode preparado
Tudo é light hardcoded. O cliente industrial usa o admin sob luz forte de galpão (telas muitas vezes em alto brilho) — dark mode tem valor real aqui, não é só preferência.

### 4.3 Mensagens longas de WhatsApp viraram cole-e-edita
[lib/site-data.ts](lib/site-data.ts) (não li, mas inferi do uso) tem `whatsappMessages.hero/midCta/header/footer`. Quando esses textos crescerem, vão ficar inconsistentes. Vale uma função `buildLeadMessage(context: LeadContext)` que monta a partir de blocos reutilizáveis.

### 4.4 Tracking não cobre o admin
O painel não emite nenhum evento (criação de pedido, mudança de status, login). Se o objetivo é métrica de uso interno, falta plugar.

---

## 5. Roteiro recomendado (próximas 4 sprints)

### Sprint 1 — Estrutural (1-2 semanas) — ✅ CONCLUÍDA
1. ✅ Quebrar `app/admin/page.tsx` (952 → 65 linhas, 13 componentes em `_components/`).
2. ✅ Mover tipos para `app/admin/_lib/types.ts` e mocks para `app/admin/_lib/mock-data.ts`.
3. ✅ Adicionar paleta `ops.*` em [tailwind.config.ts](tailwind.config.ts) (33 tokens) e refatorar admin para usar.

### Sprint 2 — Auth + dados Firebase (2 semanas)
4. Firebase Auth: e-mail/senha, server actions, middleware Next com cookie httpOnly.
5. Schema Firestore: coleções `orders`, `clients`, `finance_entries`, `order_events`, `attachments`.
6. Firebase Storage para anexos (desenhos, PDFs, fotos) com regras de acesso por usuário/papel.
7. Substituir mocks por hooks (`useOrders`, `useClients`) com loading/empty/error states.
8. Audit trail: cada mudança de status grava um `order_event` (quem, quando, de→para, nota).

### Sprint 3 — UX produto (1-2 semanas)
7. Modal acessível (Radix Dialog).
8. Form do novo pedido com validação (react-hook-form + zod).
9. Upload real de anexo (Firebase Storage).
10. Drag-and-drop entre colunas do Kanban (`@dnd-kit/core`).

### Sprint 4 — Polimento e produção (1 semana)
11. Validação completa do formulário da landing.
12. Auditoria Lighthouse das duas páginas, ajustar LCP/CLS.
13. Tracking admin (criação, mudança de status, faturamento).
14. Dark mode opcional para o admin.
15. Testes e2e dos fluxos críticos (login, criar pedido, mover status, marcar faturado).

---

## 6. Decisões de design a tomar

| Pergunta | Por quê importa |
|---|---|
| Mobile do admin: lista ou Kanban scroll? | Operação acessa do chão de fábrica? Se sim, mobile precisa ser primeiro-cidadão. |
| Multi-usuário desde já ou single-tenant? | Define schema, papéis (produção, fiscal, comercial) e telemetria. |
| Dark mode é prioridade? | Galpão industrial = sim. Office = depois. |
| Notificações (WhatsApp/e-mail) ao mudar status? | Pode virar diferencial real — cliente recebe "Seu pedido entrou em produção". |

---

## 7. Audit de features industriais — o que estamos perdendo

A indústria de fundição/modelação tem práticas operacionais que ferramentas genéricas (Trello, ClickUp, ERPs grandes) não cobrem bem. Este é o gap mapeado, organizado por **valor para a operação CMJ**.

### Tier 1 — Falta para o fluxo básico funcionar bem

| # | Feature | Por que importa na CMJ | Esforço |
|---|---|---|---|
| F1 | **Anexos centralizados por pedido** | Hoje o campo de anexo existe mas não funciona. Cada pedido precisa carregar desenho, foto, NF, comprovante, croqui revisado. Sem isso a operação volta para WhatsApp+pasta de rede. | Médio (Firebase Storage + UI) |
| F2 | **Histórico/timeline do pedido específico** | Hoje só há timeline geral. O pedido individual precisa ter "quem mudou status, quando, com que nota". Resolve "cadê o pedido X?" sem perguntar pessoa. | Médio (coleção `order_events` no Firestore) |
| F3 | **Comentários/notas no pedido** | Comercial deixa recado para produção ("cliente pediu raio menor na curva interna"). Produção marca observação ("EPS arqueou, refeito"). Pequeno mas crítico. | Baixo |
| F4 | **Versionamento de desenho técnico** | Cliente manda v1, depois revisa e manda v2. Hoje vira confusão. Saber qual está EM PRODUÇÃO evita refazer peça errada. | Médio |
| F5 | **Status com data de entrada** | Não basta "em produção" — precisa de "em produção desde 12/05 · 4 dias". Dispara alarme automático de gargalo. | Baixo |
| F6 | **Audit trail** | Quem aprovou orçamento, quem liberou para produção, quem emitiu NF. Indispensável quando 4+ pessoas usam o sistema. | Baixo (já fica grátis se F2 existir) |

### Tier 2 — Diferencial competitivo (CMJ vira referência no setor)

| # | Feature | Por que importa | Esforço |
|---|---|---|---|
| F7 | **Apontamento de máquina e operador** | Qual CNC, quem operou, quantas horas. Permite calcular custo real e gargalo de equipamento. CMJ tem 5 CNCs — saber quais estão livres vale ouro. | Alto |
| F8 | **Orçamento estruturado (não só valor)** | Quebrar em material + horas-CNC + acabamento + frete + margem. Aprovar parcial. Versionar proposta. Hoje é texto livre. | Alto |
| F9 | **Calendário de máquinas (não só de pedidos)** | "CNC Router 1 está ocupada de 12/05 até 18/05 com pedido #204". Visual de alocação evita superlotar uma máquina e deixar outra ociosa. | Alto |
| F10 | **Notificação WhatsApp ao cliente em mudança de status** | Botão "avisar cliente que entrou em produção" gera link com mensagem montada (`makeWhatsappUrl` já existe). Diferencial brutal — cliente nunca pergunta status. | Baixo (a UX dele já está aqui) |
| F11 | **OEE simplificado das CNCs** | Taxa de utilização das 5 máquinas no mês. Dado que ninguém na concorrência tem. | Médio (depois de F7) |

### Tier 3 — Refinamentos para escala

| # | Feature | Por que importa | Esforço |
|---|---|---|---|
| F12 | **Não-conformidade / refugo** | Registro de peça refeita: motivo, custo, decisão. Vira histórico anti-prejuízo. | Médio |
| F13 | **Templates de mensagem comercial** | Frases prontas que o comercial usa (envio de orçamento, follow-up, fechamento). | Baixo |
| F14 | **Mapa de calor da carteira (4-6 semanas à frente)** | Visualização semanal: quanto trabalho confirmado, onde tem buraco, onde está estourando. | Médio |
| F15 | **Curva ABC de clientes** | Top 10 por receita, ticket médio, frequência. Vira input para política comercial. | Baixo |
| F16 | **OTD (on-time delivery rate)** | % entrega no prazo nos últimos 30/90 dias. Métrica que cliente B2B grande pede em RFQ. | Baixo (após F5 existir) |
| F17 | **Multi-usuário com papéis** | Comercial, produção, financeiro, admin. Cada um vê o que precisa. Firebase Auth + custom claims resolvem. | Médio |
| F18 | **Quick filters / saved views** | "Atrasados hoje", "Para finalizar essa semana", "Sem NF há 5+ dias". | Baixo |
| F19 | **Atalhos de teclado** | Operação rápida do comercial: `N` novo pedido, `/` busca, `→` próxima etapa do card focado. | Médio |

### O que NÃO recomendo importar agora

- **MRP/PCP completo** (Ploft, Bling, Senior, TOTVS) — overkill para 5 CNCs e ~20 pedidos ativos. Custa migração, treinamento e mata a leveza da ferramenta.
- **Apontamento detalhado de ordem de produção** estilo ERP industrial — pesado demais para o porte.
- **Integração contábil em tempo real** — exportar CSV/JSON para o contador é suficiente.
- **Marketplace/portal do cliente** — antes precisa amadurecer o interno.

---

## 8. Melhorias de UI/UX, componente por componente

Análise dirigida pelo pedido específico: **cards e modais**. Cada item lista o estado atual, o problema concreto, a melhoria proposta e o esforço.

### 8.1 Card de pedido no Kanban — [`OrderCard`](app/admin/_components/orders-board.tsx)

**Hoje:** Card branco com borda cinza, mostra `Pedido #ID`, cliente, peça, prazo, responsável, valor. Eventualmente um pill amarelo de alerta. Tudo tipográfico, sem hierarquia visual de urgência.

**Problema:** Bate o olho e leva 3 segundos para entender se está atrasado, no prazo ou folgado. Para um operador escaneando 18 cards isso é muito.

**Melhorias (em ordem de impacto):**
1. **Borda lateral colorida por urgência** (4px) — verde se >5 dias, amarelo se 2-5, vermelho se ≤1 dia ou atrasado. Decisão em 0.3s.
2. **Linha "dias até entrega" no topo** — `D-2`, `Hoje`, `Atrasado +3d`. Linguagem do operador.
3. **Mini-progresso de etapa** — barra 8 segmentos preenchidos até o estado atual. Visualmente conta a história do pedido.
4. **Avatar/inicial do responsável** — círculo pequeno no canto. Reconhecimento facial > leitura.
5. **Contador de anexos** — `📎 3` se houver. Sinal de pedido "rico em info".
6. **Última atividade** — "atualizado há 2h" em mono pequeno. Detecta cards parados.
7. **Hover state com quick actions** — botões `→ próxima etapa`, `Abrir`, `Comentar`. Reduz cliques.
8. **Indicador VIP** — pequena estrela ou tag se cliente está no top 5 de receita (F15).

### 8.2 Modal "Novo pedido" — [`NewOrderModal`](app/admin/_components/new-order-modal.tsx)

**Hoje:** Modal único centralizado, formulário longo (cliente, contato, peça, prazo, material, responsável, observações, anexos), botão "Criar pedido". Já tem ESC, backdrop click e scroll lock (Sprint 1).

**Problema:** Cognitivamente pesado. O operador chega com WhatsApp aberto, foto e medidas — tem que mapear tudo para 6 campos + textarea + anexo. Tudo numa tela. Se errar campo no fim, scroll de volta.

**Melhorias:**
1. **Steps em vez de scroll** — `1. Identificação → 2. Projeto → 3. Anexos → 4. Confirmar`. Reduz peso visual, evita perda no scroll.
2. **Dropzone para arquivo** — arrastar o desenho direto vez de clicar em "Selecionar arquivo".
3. **Preview do anexo** — miniatura do PDF/imagem após selecionar.
4. **Campos vinculados** — cliente é autocomplete da base existente; selecionar cliente já preenche contato. Reduz digitação.
5. **Sugestão de prazo** — input com chips: `+7 dias`, `+15 dias`, `+30 dias` + campo livre.
6. **Salvamento de rascunho** — se o operador fechar antes de submeter, recupera no próximo Open.
7. **Validação inline** — erros abaixo do campo, não balão nativo.
8. **Botão de criar como pedido OU como orçamento** — separa intenção (alguns chegam como "só me dá ideia de preço").

### 8.3 Detail panel de pedido — **NÃO EXISTE HOJE**

**Problema:** Clicar em um card no Kanban não abre nada. Não dá pra ver histórico, anexos, comentários.

**Melhoria — criar novo:**
- **Painel slide-over** (não modal full-screen) à direita ao clicar no card.
- 4 abas: `Visão geral` (dados + status) · `Histórico` (timeline F2) · `Anexos` (F1) · `Comentários` (F3).
- Botão de **avançar status** com confirmação inline (com nota opcional).
- Botão de **avisar cliente via WhatsApp** (F10) — gera link já formatado.

### 8.4 Sidebar — [`AdminSidebar`](app/admin/_components/admin-sidebar.tsx)

**Hoje:** 7 itens texto, 272px de largura fixa. Bom em desktop largo, come 18% da tela em laptop comum.

**Melhorias:**
1. **Colapsável para modo ícone** (toggle no topo) — passa a 64px, libera espaço para Kanban respirar.
2. **Ícone por item** — calibre, package, gear, document, truck etc. Já existem no [components/icons.tsx](components/icons.tsx).
3. **Badge de contagem** — `Pedidos (3)` se há novos não vistos.
4. **Separador entre módulos operacionais e configurações** — visual.

### 8.5 Header — [`AdminHeader`](app/admin/_components/admin-header.tsx)

**Hoje:** Logo + título + data + botão "Novo pedido". Limpo, simples.

**Melhorias:**
1. **Busca global** (`/` foca) — pedido por ID/cliente/peça. Atalho clássico, alto retorno.
2. **Notificações** — sino com badge. Centro de "preciso ver hoje".
3. **Perfil/sessão no canto** — avatar + dropdown com `Sair`. Necessário quando F17 existir.
4. **Breadcrumb** — `Operação / Pedidos / #204` ao abrir detalhe. Orientação no fluxo.

### 8.6 Dashboard — [`Dashboard`](app/admin/_components/dashboard.tsx)

**Hoje:** 4 KPIs estáticos + timeline + calendário + alertas + snapshot. Bom layout, fraco em densidade de insight.

**Melhorias:**
1. **Sparkline nos KPIs** — pequeno gráfico de tendência (últimos 7 dias). Mostra direção, não só valor.
2. **Comparação vs período anterior** — `18 pedidos · +12% vs. semana passada`. Contexto.
3. **Top 3 atrasados** destacados em bloco próprio (não só lista de alertas).
4. **Mini-Gantt da semana** (das máquinas) — F9 light, mesmo sem apontamento real.
5. **Botão "Carteira"** — abre visão de 4 semanas à frente (F14).

### 8.7 Tabelas (`DataTable`) — [`ui-primitives.tsx:62`](app/admin/_components/ui-primitives.tsx#L62)

**Hoje:** Cabeçalho azul, linhas alternadas, sem sort/filter/paginação/empty/loading.

**Melhorias:**
1. **Sticky header** ao rolar.
2. **Sort por coluna** (clicável no header).
3. **Filtros rápidos** no topo (status, período, responsável).
4. **Empty state** — ilustração simples + CTA contextual.
5. **Loading skeleton** — 5-8 linhas cinzas com pulse enquanto carrega.
6. **Hover state** + clique abre o detail panel (8.3).
7. **Action menu** por linha (3-dots) — atalhos contextuais.
8. **Densidade** — toggle "compacto" para quem quer ver 20+ linhas sem scroll.

### 8.8 Pill de status — [`StatusPill`](app/admin/_components/ui-primitives.tsx#L103)

**Hoje:** Pill retangular com cor por tom (default/warn/success). Tom calculado por `toneForStatus()`.

**Melhorias:**
1. **Bolinha colorida + label** em vez de pill com fundo — mais leve em tabelas densas.
2. **Tooltip explicando o que o status significa** — ajuda usuário novo.
3. **Versão "compacta" só com a bolinha** — para colunas estreitas.

### 8.9 Alertas — [`AlertsPanel`](app/admin/_components/dashboard.tsx) (dentro do Dashboard)

**Hoje:** Lista de strings em amarelo. Estático, sem ação.

**Melhorias:**
1. **Tornar acionável** — cada alerta tem um botão `Resolver` ou `Ir para pedido`.
2. **Severidade visual** — vermelho (crítico, atrasado), amarelo (atenção), azul (info).
3. **Dismiss / snooze** — operador marca "vi, não esquece amanhã".
4. **Contagem agregada** — "3 pedidos sem NF há +5 dias" → expande lista.

---

## 9. Recomendação prática: por onde começar (semana 1)

Em ordem decrescente de **retorno / esforço**:

1. **Sidebar colapsável + ícones nos itens** — 2h, ganho imediato de espaço.
2. **OrderCard com borda de urgência + dias-até-entrega + barra de progresso** — meio dia. É o que o operador olha o dia inteiro.
3. **Detail panel (slide-over) ao clicar no card** — 1 dia. Habilita os fluxos de comentário, histórico, anexo.
4. **Status com data de entrada (F5)** — meio dia. Pequena mudança de modelo, alto valor.
5. **Botão "avisar cliente via WhatsApp" no detail panel (F10)** — 2h. Já temos `makeWhatsappUrl`.
6. **Drag-and-drop no Kanban** (`@dnd-kit/core`) — 1 dia. Move status sem abrir modal/painel.

Tudo isso é UI/UX (não depende ainda de Firebase). Em paralelo, alguém pode começar Firebase Auth (Sprint 2) sem bloqueio.

---

## 10. Conclusão

A **landing está madura** e merece manutenção fina (validação, performance, acessibilidade) — não reescrita. A identidade visual é um ativo real do produto, vale preservar e usar como base do admin também.

O **admin é um excelente MVP visual** mas estruturalmente está num ponto onde **continuar acumulando features no arquivo único custa exponencialmente**. A próxima feature deveria ser, primeiro, a quebra em módulos. Depois disso o caminho fica reto: auth real, dados reais, modal acessível, mobile resolvido.

A boa notícia: o vocabulário visual, o fluxo de pedidos (8 estados) e a hierarquia da informação já estão certos. A reengenharia é técnica, não conceitual.
