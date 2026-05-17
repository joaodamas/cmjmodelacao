# Documentação do Sistema Interno CMJ

## 1. Visão geral

O projeto atual da CMJ Modelação contém duas frentes principais:

1. **Site institucional público**, usado para apresentação da empresa, captação de orçamento e comunicação comercial.
2. **Sistema interno administrativo**, acessado em `/admin`, usado como MVP visual e operacional para centralizar pedidos, produção, faturamento, financeiro e clientes.

Este documento descreve principalmente o **sistema interno CMJ**, porque ele concentra os módulos de operação que foram evoluídos nas últimas etapas.

O objetivo do sistema interno é dar à equipe uma visão rápida de:

- quais pedidos entraram;
- em que etapa cada pedido está;
- quais pedidos estão atrasados ou próximos do prazo;
- o que está em produção;
- o que precisa faturar;
- quais clientes estão ativos;
- quais pendências fiscais ou financeiras precisam de ação.

A proposta não é começar como um ERP pesado. A ideia é um painel operacional enxuto, com navegação rápida, visual profissional e dados organizados para a rotina industrial da CMJ.

## 2. Linguagem e tecnologias

O sistema foi construído com:

- **TypeScript** como linguagem principal.
- **React** para a interface.
- **Next.js App Router** como framework de aplicação.
- **Tailwind CSS** para estilização.
- **ESLint** para validação estática.
- **Firebase** já presente como dependência e referência de arquitetura futura.
- **@dnd-kit/core** para drag-and-drop no Kanban de pedidos.

Arquivos principais de configuração:

- `package.json`: scripts, dependências e metadados do projeto.
- `tsconfig.json`: configuração TypeScript.
- `tailwind.config.ts`: tokens visuais, cores, fontes, sombras e tema.
- `eslint.config.mjs`: configuração de lint.
- `firebase.json`: configuração preparada para deploy/hospedagem Firebase.

Scripts úteis:

```bash
npm run dev
npx tsc --noEmit
npm run lint
npm run build
```

## 3. Estrutura geral do projeto

Estrutura mais relevante:

```text
app/
  admin/
    page.tsx
    layout.tsx
    _components/
    _lib/
  page.tsx
components/
  icons.tsx
  ui/
lib/
public/
tailwind.config.ts
```

### 3.1 Área pública

A rota pública principal fica em:

```text
app/page.tsx
```

Ela representa o site institucional da CMJ.

### 3.2 Área administrativa

A rota interna fica em:

```text
app/admin/page.tsx
```

Essa página é um componente client-side e controla o estado principal da aplicação interna:

- autenticação simulada;
- menu ativo;
- menu mobile;
- sidebar recolhida ou expandida;
- modal de novo pedido;
- pedido selecionado;
- abertura da busca global.

## 4. Como o admin está construído

O admin foi separado em componentes por responsabilidade.

### 4.1 Página raiz do admin

Arquivo:

```text
app/admin/page.tsx
```

Responsabilidades:

- exibe `LoginScreen` se o usuário ainda não estiver autenticado;
- renderiza `AdminSidebar` no desktop;
- renderiza `AdminHeader` no topo;
- renderiza `AdminMobileMenu` em telas menores;
- alterna os módulos principais conforme `activeMenu`;
- abre o modal `NewOrderModal`;
- abre o painel `OrderDetailPanel`;
- abre a busca `GlobalSearch`;
- registra atalhos globais `/`, `Ctrl+K` e `Cmd+K` para abrir a busca.

Fluxo básico:

```text
LoginScreen
  -> AdminPage autenticado
    -> Sidebar/Header
    -> módulo ativo
    -> modais e painéis globais
```

### 4.2 Componentes de layout

Arquivos:

```text
app/admin/_components/admin-brand.tsx
app/admin/_components/admin-header.tsx
app/admin/_components/admin-sidebar.tsx
```

Eles formam a estrutura visual do sistema:

- marca CMJ Operação;
- navegação lateral;
- navegação mobile;
- botão de novo pedido;
- botão da busca global;
- indicador de operação ativa;
- opção de recolher/expandir sidebar.

### 4.3 Componentes primitivos

Arquivo:

```text
app/admin/_components/ui-primitives.tsx
```

Componentes compartilhados:

- `PanelTitle`: cabeçalho de painéis internos.
- `PageHeader`: título e ação principal das páginas.
- `OperationalCard`: card de indicador operacional.
- `DataTable`: tabela base com cabeçalho sticky, scroll interno e hover.
- `StatusPill`: status visual com bolinha e tom por situação.
- `AdminField`: campo padrão para formulários internos.

Esses componentes reduzem duplicação e mantêm consistência visual entre Financeiro, Faturamento, Clientes, Produção e Dashboard.

## 5. Módulos existentes no admin

O menu principal possui:

```text
Dashboard
Pedidos
Produção
Financeiro
Faturamento
Clientes
Configurações
```

Os nomes são tipados em:

```text
app/admin/_lib/types.ts
```

E listados em:

```text
app/admin/_lib/mock-data.ts
```

## 6. Dashboard

Arquivo:

```text
app/admin/_components/dashboard.tsx
```

O Dashboard é a visão inicial da operação.

Ele mostra:

- indicadores principais;
- timeline operacional do dia;
- calendário da semana;
- alertas;
- snapshot de produção.

### 6.1 Indicadores

Os cards principais mostram:

- pedidos em andamento;
- produções atrasadas;
- pedidos para faturar;
- entregas da semana.

Cada card tem:

- ícone;
- valor;
- nota operacional;
- barra visual de intensidade/progresso;
- badge de contexto.

### 6.2 Timeline

Mostra movimentos recentes, por exemplo:

- pedido recebido;
- pedido em produção;
- faturamento aguardando NF;
- entrega liberada.

### 6.3 Calendário

Mostra eventos próximos da semana:

- NF pendente;
- finalização;
- entrega;
- retorno de orçamento.

### 6.4 Alertas

Mostra itens que exigem ação, como:

- pedido perto do vencimento;
- NF pendente;
- pedido que precisa de conferência;
- cliente aguardando retorno.

### 6.5 Produção

Mostra pedidos em etapa produtiva, com:

- ID do pedido;
- peça/projeto;
- cliente;
- status atual.

## 7. Pedidos e Kanban

Arquivo:

```text
app/admin/_components/orders-board.tsx
```

O módulo Pedidos é o coração operacional do sistema.

Ele exibe um Kanban com as etapas:

```text
Recebido
Orçamento
Aprovado
Produção
Finalização
Entrega
NF
Faturado
```

Essas etapas representam o fluxo completo:

```text
Pedido recebido
  -> orçamento
  -> aprovado
  -> produção
  -> finalização
  -> entrega
  -> nota fiscal
  -> faturado
```

### 7.1 Cards de pedido

Cada card mostra:

- número do pedido;
- cliente;
- peça ou projeto;
- prazo;
- alerta, quando existir;
- prioridade VIP, quando existir;
- responsável;
- quantidade de anexos;
- valor, quando disponível;
- barra de progresso conforme etapa.

### 7.2 Drag-and-drop

O Kanban usa `@dnd-kit/core`.

Comportamento atual:

- o usuário arrasta o card;
- solta em outra coluna;
- o status do pedido é atualizado no estado local;
- `statusSince` e `updatedAt` passam para `agora`.

Hoje essa mudança ainda é local, ou seja, não persiste em banco.

### 7.3 Filtros rápidos

Filtros existentes:

- Atrasados;
- Hoje;
- Próx. 5 dias;
- VIP;
- Com alerta.

Funcionamento:

- os filtros são multi-seleção;
- a combinação usa regra AND;
- contagens são calculadas sobre o total atual, não sobre a lista filtrada;
- filtros com contagem zero ficam desabilitados;
- botão Limpar aparece apenas quando há filtro ativo.

Exemplo:

```text
Atrasados + VIP
  -> mostra somente pedidos atrasados que também são VIP
```

## 8. Busca global

Arquivo:

```text
app/admin/_components/global-search.tsx
```

A busca global funciona como uma command palette.

Atalhos:

- `/`;
- `Ctrl+K`;
- `Cmd+K`.

Ela busca em duas categorias:

### 8.1 Pedidos

Campos pesquisados:

- ID;
- cliente;
- peça;
- responsável;
- status.

### 8.2 Clientes

Campos pesquisados:

- nome;
- contato;
- telefone;
- último pedido.

### 8.3 Sem digitar nada

Quando o usuário abre a busca sem query, o sistema mostra:

- pedidos recentes;
- clientes ativos.

### 8.4 Normalização

A busca usa normalização Unicode:

```ts
normalize("NFD")
```

E remove diacríticos.

Na prática:

```text
aethra -> encontra Grupo Aethra
molde -> encontra Molde EPS automotivo
```

### 8.5 Navegação

Suporta:

- seta para cima;
- seta para baixo;
- Enter para abrir;
- ESC para fechar;
- hover sincronizado com seleção visual;
- fechamento por backdrop.

### 8.6 Destinos

Ao selecionar um pedido:

```text
Busca global
  -> fecha palette
  -> abre OrderDetailPanel
```

Ao selecionar um cliente:

```text
Busca global
  -> fecha palette
  -> navega para Clientes
```

## 9. Detalhe do pedido

Arquivo:

```text
app/admin/_components/order-detail-panel.tsx
```

O painel de detalhe abre como modal central.

Ele mostra:

- cabeçalho do pedido;
- cliente;
- peça;
- etapa atual;
- prazo;
- valor;
- responsável;
- progresso por etapa;
- abas internas.

### 9.1 Abas

Abas existentes:

```text
Visão geral
Histórico
Anexos
Comentários
```

### 9.2 Visão geral

Mostra dados rápidos:

- prazo;
- status atual;
- tempo na etapa;
- responsável;
- última atualização;
- quantidade de anexos;
- valor;
- alerta.

### 9.3 Histórico

Mostra eventos do pedido:

- criação;
- mudança de status;
- comentários;
- notas;
- anexos.

### 9.4 Anexos

Mostra arquivos vinculados ao pedido:

- nome;
- tamanho;
- tipo;
- quem enviou;
- quando enviou.

Também há um botão visual para adicionar anexo. A persistência futura indicada é Firebase Storage.

### 9.5 Comentários

Mostra comentários internos e um formulário visual para novo comentário. A persistência futura indicada é Firestore.

### 9.6 WhatsApp

O painel gera um link para avisar o cliente via WhatsApp, usando:

```text
makeClientWhatsappUrl
```

O texto já inclui:

- número do pedido;
- peça;
- etapa atual;
- previsão.

## 10. Produção

Arquivo:

```text
app/admin/_components/production-page.tsx
```

Mostra uma visão focada na fila produtiva.

Inclui:

- cards operacionais;
- tabela de produção;
- pedido;
- cliente/peça;
- etapa;
- responsável;
- prazo;
- ação.

Pedidos incluídos:

```text
Aprovado
Produção
Finalização
Entrega
```

## 11. Financeiro

Arquivo:

```text
app/admin/_components/finance-page.tsx
```

Mostra:

- a faturar;
- em atraso;
- recebido no mês;
- previsão dos próximos 15 dias;
- tabela de contas operacionais.

Tabela:

```text
Pedido
Cliente
Valor
Vencimento
Status
```

Status usados:

```text
A receber
A faturar
Recebido
Em atraso
```

## 12. Faturamento

Arquivo:

```text
app/admin/_components/billing-page.tsx
```

Mostra a etapa entre produção finalizada, entrega, emissão de nota e baixa.

Inclui:

- aguardando NF;
- liberados para entrega;
- faturados;
- fila de NF.

Pedidos incluídos na fila:

```text
Finalização
Entrega
NF
Faturado
```

Tabela:

```text
Pedido
Cliente
Peça
Etapa
Valor
```

## 13. Clientes

Arquivo:

```text
app/admin/_components/clients-page.tsx
```

Mostra:

- clientes ativos;
- pedidos vinculados;
- pendência fiscal;
- tabela de clientes industriais.

Tabela:

```text
Cliente
Contato
WhatsApp
Pedidos
Fiscal
Último pedido
```

O módulo já serve como base para:

- cadastro de clientes;
- consulta rápida;
- vínculo com pedidos;
- checagem fiscal.

## 14. Configurações

Arquivo:

```text
app/admin/_components/module-placeholder.tsx
```

Hoje é um placeholder visual.

Ele indica que o módulo está planejado, mas ainda não implementado.

Pode evoluir para:

- usuários;
- permissões;
- etapas do Kanban;
- responsáveis internos;
- preferências de notificação;
- integrações;
- parâmetros fiscais.

## 15. Novo pedido

Arquivo:

```text
app/admin/_components/new-order-modal.tsx
```

O modal de novo pedido possui:

- cliente;
- contato/responsável;
- peça/projeto;
- prazo solicitado;
- material de fundição;
- responsável interno;
- observações técnicas;
- área visual para anexos;
- botões cancelar e criar pedido.

Hoje o formulário é visual e fecha no submit. Ainda não persiste os dados.

Fluxo atual:

```text
Botão Novo pedido
  -> abre NewOrderModal
  -> usuário preenche dados
  -> submit
  -> modal fecha
```

Fluxo futuro:

```text
Submit
  -> validação
  -> criação no Firestore
  -> upload de anexos no Firebase Storage
  -> atualização do Kanban
  -> registro no histórico do pedido
```

## 16. Dados atuais

Os dados atuais são mockados em:

```text
app/admin/_lib/mock-data.ts
```

Esse arquivo contém:

- menu;
- colunas do Kanban;
- pedidos;
- timeline;
- alertas;
- calendário;
- métricas;
- financeiro;
- clientes;
- eventos de pedido;
- anexos;
- comentários.

As tipagens ficam em:

```text
app/admin/_lib/types.ts
```

Principais tipos:

- `OrderStatus`;
- `Order`;
- `Client`;
- `FinanceRow`;
- `TimelineEntry`;
- `CalendarEntry`;
- `Metric`;
- `OrderEvent`;
- `OrderAttachment`;
- `OrderComment`;
- `AdminMenuKey`.

## 17. Fluxos principais do sistema

### 17.1 Acesso

```text
/admin
  -> LoginScreen
  -> valida e-mail/senha não vazios
  -> entra no painel
```

Observação: a autenticação é simulada no frontend. Firebase Auth está previsto para uma fase futura.

### 17.2 Navegação por menu

```text
Sidebar/Header mobile
  -> seleciona módulo
  -> activeMenu muda
  -> componente correspondente renderiza
```

### 17.3 Pedido no Kanban

```text
Pedidos
  -> usuário arrasta card
  -> solta em outra coluna
  -> status local do pedido muda
```

### 17.4 Abrir detalhe do pedido

```text
Card do pedido
  -> clique
  -> selectedOrder recebe pedido
  -> OrderDetailPanel abre
```

Também pode acontecer via busca global:

```text
/ ou Ctrl+K
  -> digita pedido/cliente/peça
  -> Enter
  -> abre detalhe do pedido
```

### 17.5 Cliente via busca

```text
Busca global
  -> seleciona cliente
  -> activeMenu = Clientes
  -> módulo Clientes abre
```

### 17.6 Novo pedido

```text
Novo pedido
  -> abre modal
  -> preenche formulário
  -> criar pedido
  -> fecha modal
```

Hoje ainda sem persistência.

## 18. De onde vai para onde

Mapa simplificado:

```text
Login
  -> Dashboard

Dashboard
  -> leitura geral da operação

Pedidos
  -> Kanban
  -> detalhe do pedido
  -> alterar etapa por drag-and-drop

Produção
  -> fila técnica
  -> acompanhamento operacional

Financeiro
  -> contas
  -> recebimentos
  -> atrasos

Faturamento
  -> fila de NF
  -> pedidos liberados
  -> faturados

Clientes
  -> base de clientes
  -> contatos
  -> pendências fiscais

Busca global
  -> pedido: abre detalhe
  -> cliente: abre módulo Clientes

Novo pedido
  -> modal de cadastro
  -> futuramente cria registro no banco
```

## 19. Estado atual: o que já existe

Já existe:

- layout administrativo responsivo;
- login visual;
- dashboard operacional;
- Kanban de pedidos;
- drag-and-drop entre etapas;
- filtros rápidos no Kanban;
- busca global com teclado;
- modal de detalhe do pedido;
- abas de histórico, anexos e comentários;
- link de WhatsApp para cliente;
- modal de novo pedido;
- módulos de produção, financeiro, faturamento e clientes;
- tabela compartilhada com sticky header;
- componentes visuais padronizados;
- tipagem TypeScript para as entidades principais;
- dados mockados suficientes para validar fluxo e interface.

## 20. O que ainda falta para virar sistema real

### 20.1 Persistência

Hoje os dados são estáticos ou estado local.

Falta conectar:

- Firestore para pedidos, clientes, comentários e eventos;
- Firebase Storage para anexos;
- Firebase Auth para autenticação real.

### 20.2 CRUD real

Falta implementar:

- criar pedido persistente;
- editar pedido;
- excluir/cancelar pedido;
- criar cliente;
- editar cliente;
- atualizar financeiro;
- registrar NF;
- adicionar comentários reais;
- subir anexos reais.

### 20.3 Permissões

Perfis prováveis:

- administrador;
- comercial;
- produção;
- financeiro/fiscal;
- leitura.

### 20.4 Auditoria

Registrar:

- quem alterou;
- o que alterou;
- quando alterou;
- de qual etapa para qual etapa.

### 20.5 Integrações

Possíveis integrações:

- WhatsApp;
- e-mail;
- Google Drive;
- emissão fiscal;
- planilhas;
- calendário;
- notificações internas.

## 21. Sugestão de modelo de dados futuro

### 21.1 Pedido

```ts
type Order = {
  id: string;
  clientId: string;
  clientName: string;
  part: string;
  status: OrderStatus;
  dueDate: string;
  ownerId: string;
  priority: "normal" | "vip";
  value?: number;
  alert?: string;
  createdAt: string;
  updatedAt: string;
};
```

### 21.2 Cliente

```ts
type Client = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email?: string;
  fiscalStatus: "Completo" | "Pendente";
  createdAt: string;
  updatedAt: string;
};
```

### 21.3 Evento do pedido

```ts
type OrderEvent = {
  id: string;
  orderId: string;
  type: "created" | "status" | "comment" | "attachment" | "note" | "system";
  text: string;
  byUserId: string;
  createdAt: string;
};
```

### 21.4 Anexo

```ts
type OrderAttachment = {
  id: string;
  orderId: string;
  name: string;
  storagePath: string;
  size: number;
  kind: string;
  uploadedBy: string;
  uploadedAt: string;
};
```

## 22. Prioridades recomendadas para próxima fase

Ordem sugerida:

1. Conectar Firebase Auth.
2. Criar estrutura Firestore para pedidos e clientes.
3. Fazer o Kanban ler pedidos do banco.
4. Persistir mudança de etapa por drag-and-drop.
5. Fazer o modal de novo pedido criar pedido real.
6. Fazer comentários persistirem no pedido.
7. Implementar upload de anexos no Firebase Storage.
8. Criar CRUD de clientes.
9. Criar módulo financeiro real com vencimentos.
10. Criar registro de NF/faturamento.
11. Implementar permissões por perfil.
12. Criar auditoria de alterações.

## 23. Resumo executivo

O sistema interno atual já entrega uma experiência completa de MVP visual:

- mostra a operação;
- organiza pedidos por etapa;
- permite buscar rapidamente;
- abre detalhe rico do pedido;
- mostra produção, financeiro, faturamento e clientes;
- tem interface consistente e profissional;
- está preparado para evoluir para persistência real com Firebase.

O próximo salto não é visual. O próximo salto é transformar os dados mockados em dados reais, com autenticação, banco, storage, permissões e histórico auditável.
