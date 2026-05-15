# Checklist de Execução - Sistema Interno CMJ

## Conceito

Construir uma central de operação industrial para a CMJ, não um ERP genérico.

O sistema deve permitir que a gestão entenda em poucos segundos:

- o que entrou;
- o que está em orçamento;
- o que está em produção;
- o que está atrasado;
- o que precisa entregar;
- o que precisa emitir NF;
- o que precisa faturar.

Direção visual: industrial, discreta, técnica e objetiva. Sem dashboard colorido, sem excesso de gráficos, sem módulos artificiais.

## Fluxo operacional principal

1. Recebimento do pedido
2. Análise / orçamento
3. Aprovação
4. Produção
5. Finalização da produção
6. Liberação para entrega
7. Emissão de NF
8. Faturamento
9. Finalizado

## 1. Produto e escopo

- [ ] Definir se o sistema será criado no mesmo repositório ou em um novo projeto separado
- [ ] Definir domínio/subdomínio interno, exemplo: `operacao.cmjmodelacao.com.br`
- [ ] Definir usuários iniciais: administração, produção, financeiro, leitura
- [ ] Definir permissões por perfil
- [ ] Definir se o acesso será apenas com login
- [ ] Confirmar se Supabase será usado como backend principal
- [ ] Confirmar provedor de WhatsApp: Evolution API, Z-API, UltraMsg ou Meta WhatsApp Cloud API
- [ ] Confirmar provedor de OCR: Google Vision, AWS Textract ou Tesseract
- [ ] Confirmar integração com Gmail via OAuth

## 2. Stack recomendada

- [ ] Next.js
- [ ] React
- [ ] TypeScript
- [ ] Tailwind CSS
- [ ] shadcn/ui com customização visual industrial
- [ ] TanStack Query para dados remotos
- [ ] Zustand para estado local simples
- [ ] Supabase Auth
- [ ] Supabase Postgres
- [ ] Supabase Storage para anexos/desenhos
- [ ] Supabase Realtime para atualizações operacionais
- [ ] Deploy na Vercel
- [ ] Banco e storage no Supabase Cloud

## 3. Navegação

Sidebar minimalista:

- [x] Dashboard
- [x] Pedidos
- [x] Produção
- [x] Financeiro
- [x] Faturamento
- [x] Clientes
- [x] Configurações

Regras:

- [x] Não criar menus extras no MVP
- [x] Evitar telas duplicadas
- [x] Priorizar ações rápidas dentro do pedido
- [x] Manter navegação clara para uso diário em chão de fábrica/escritório

## 4. Dashboard operacional

Linha 1 - indicadores discretos:

- [x] Pedidos em andamento
- [x] Produções atrasadas
- [x] Pedidos para faturar
- [x] Entregas da semana

Linha 2 - timeline operacional:

- [x] Últimos pedidos recebidos
- [x] Pedidos em orçamento
- [x] Produções com finalização prevista
- [x] Pedidos aguardando NF
- [x] Pedidos aguardando faturamento

Linha 3 - calendário operacional:

- [x] Entregas
- [ ] Início de produção
- [x] Término previsto de produção
- [x] Vencimentos financeiros
- [x] Alertas de NF

Linha 4 - alertas:

- [x] Pedido vence em até 2 dias
- [x] Pedido atrasado
- [x] Produção atrasada
- [x] NF pendente
- [x] Faturamento pendente
- [x] Cliente sem dados fiscais completos

## 5. Pedidos

Tela principal do sistema: Kanban industrial.

Colunas:

- [x] Recebido
- [x] Orçamento
- [x] Aprovado
- [x] Produção
- [x] Finalização
- [x] Entrega
- [x] NF
- [x] Faturado
- [ ] Finalizado

Card de pedido:

- [x] Número do pedido
- [x] Cliente
- [x] Nome/descrição da peça
- [ ] Tipo de projeto
- [x] Prazo de entrega
- [x] Responsável
- [x] Status atual
- [x] Alerta de prazo
- [x] Valor, quando disponível
- [ ] Anexos/desenhos

Ações rápidas:

- [ ] Abrir pedido
- [ ] Mudar status
- [x] Adicionar observação
- [ ] Enviar WhatsApp
- [ ] Marcar produção iniciada
- [ ] Marcar produção finalizada
- [ ] Liberar entrega
- [ ] Liberar NF
- [ ] Marcar faturado

## 6. Cadastro do pedido

Campos principais:

- [ ] Número interno
- [ ] Cliente
- [ ] Contato do cliente
- [ ] WhatsApp do cliente
- [ ] E-mail do cliente
- [ ] Descrição da peça
- [ ] Tipo de projeto
- [ ] Material de fundição
- [ ] Data de recebimento
- [ ] Prazo solicitado pelo cliente
- [ ] Prazo prometido
- [ ] Valor orçado
- [ ] Valor aprovado
- [ ] Observações comerciais
- [ ] Observações técnicas
- [ ] Arquivos anexos

Campos de produção:

- [ ] Responsável técnico
- [ ] Início previsto
- [ ] Início real
- [ ] Término previsto
- [ ] Término real
- [ ] Status de produção
- [ ] Observações de produção

Campos de entrega:

- [ ] Data prevista de entrega
- [ ] Data real de entrega
- [ ] Forma de entrega
- [ ] Responsável pela liberação

Campos de NF/faturamento:

- [ ] Necessita NF
- [ ] Número da NF
- [ ] Data de emissão
- [ ] Valor faturado
- [ ] Data de vencimento
- [ ] Status de recebimento
- [ ] Data de pagamento

## 7. Produção

- [x] Visão de produção por prazo
- [x] Visão de produção por responsável
- [x] Visão de produção atrasada
- [ ] Lista de pedidos com início previsto
- [x] Lista de pedidos com término previsto
- [ ] Botão para iniciar produção
- [ ] Botão para finalizar produção
- [ ] Registro de observações técnicas
- [ ] Histórico de mudança de status

## 8. Financeiro

Controle operacional, sem complexidade de ERP.

- [x] A faturar
- [x] Contas a receber
- [x] Em atraso
- [x] Recebido no mês
- [x] Previsão próximos 15 dias
- [ ] Marcar como pago
- [ ] Registrar data de pagamento
- [ ] Registrar observação financeira

## 9. Faturamento e NF

NF como etapa operacional.

- [x] Lista de pedidos aguardando NF
- [x] Pedido finalizado em produção gera alerta para NF
- [ ] Registrar número da NF
- [ ] Registrar data de emissão
- [x] Registrar valor faturado
- [ ] Marcar como faturado
- [ ] Enviar alerta para financeiro

## 10. Clientes

- [x] Cadastro de cliente
- [ ] Razão social
- [x] Nome fantasia
- [ ] CNPJ
- [x] Contato principal
- [x] WhatsApp
- [ ] E-mail
- [ ] Endereço
- [ ] Observações
- [x] Histórico de pedidos
- [x] Status fiscal: completo/incompleto

## 11. OCR + Gmail

Fluxo ideal:

1. Gmail recebe e-mail com PDF, desenho ou pedido
2. Sistema identifica anexos
3. OCR extrai texto
4. IA sugere dados do pedido
5. Usuário valida
6. Pedido é criado automaticamente

Campos sugeridos pela IA:

- [ ] Cliente
- [ ] Número do pedido do cliente
- [ ] Data recebida
- [ ] Prazo
- [ ] Descrição da peça
- [ ] Material
- [ ] Observações
- [ ] Arquivos vinculados

Tela de validação:

- [ ] Visualizar e-mail original
- [ ] Visualizar anexos
- [ ] Ver campos sugeridos
- [ ] Corrigir dados
- [ ] Aprovar criação de pedido
- [ ] Rejeitar sugestão

## 12. WhatsApp

Alertas inteligentes, sem spam:

- [ ] Pedido vence amanhã
- [ ] Pedido vence em 2 dias
- [ ] Produção atrasada
- [ ] Pedido aguardando NF
- [ ] Pedido aguardando faturamento
- [ ] Cliente precisa enviar informação

Templates internos:

- [ ] Alerta para responsável de produção
- [ ] Alerta para financeiro
- [ ] Alerta para administração
- [ ] Mensagem para cliente sobre recebimento do pedido
- [ ] Mensagem para cliente sobre pedido em análise
- [ ] Mensagem para cliente sobre finalização/entrega

## 13. Visual e UX

Direção:

- [x] Grafite
- [x] Cinza aço
- [x] Azul petróleo
- [x] Branco quente
- [x] Azul discreto para ação principal
- [ ] Vermelho/âmbar apenas para alerta

Regras visuais:

- [ ] Sem neon
- [ ] Sem glassmorphism
- [ ] Sem gradientes chamativos
- [ ] Sem dashboard colorido
- [ ] Sem excesso de cards
- [ ] Sem charts decorativos
- [x] Usar tabela limpa quando for melhor que card
- [ ] Usar Kanban apenas para fluxo de pedidos
- [ ] Tipografia forte, legível e densa
- [x] Layout com foco em operação diária

## 14. Banco de dados inicial

Tabelas recomendadas:

- [ ] users_profiles
- [ ] clients
- [ ] orders
- [ ] order_files
- [ ] order_status_history
- [ ] production_logs
- [ ] invoice_records
- [ ] payment_records
- [ ] whatsapp_notifications
- [ ] gmail_imports
- [ ] ocr_extractions
- [ ] audit_logs

## 15. MVP - Fase 1

Objetivo: central operacional manual funcionando.

- [x] Login
- [ ] Perfis de usuário
- [x] Dashboard operacional
- [x] Cadastro de clientes
- [x] Cadastro de pedidos
- [x] Kanban de pedidos
- [x] Upload de anexos
- [x] Status operacional
- [x] Prazos e alertas
- [x] Produção básica
- [x] Faturamento básico
- [ ] WhatsApp manual por template

## 16. Fase 2 - Gmail + OCR

- [ ] OAuth Gmail
- [ ] Leitura de e-mails autorizados
- [ ] Captura de anexos
- [ ] OCR
- [ ] Extração com IA
- [ ] Tela de validação
- [ ] Criação automática de pedido após aprovação

## 17. Fase 3 - Financeiro + NF

- [ ] Contas a receber
- [ ] A faturar
- [ ] Registro de NF
- [ ] Vencimentos
- [ ] Pagamentos
- [ ] Relatório operacional mensal

## 18. Fase 4 - Inteligência operacional

- [ ] Previsão de atrasos
- [ ] Gargalos por etapa
- [ ] Tempo médio por status
- [ ] Produtividade por período
- [ ] Clientes recorrentes
- [ ] Pedidos por tipo de peça

## 19. Decisões pendentes

- [ ] Criar em novo repositório ou dentro deste projeto
- [ ] Definir subdomínio interno
- [ ] Definir usuários reais da CMJ
- [ ] Definir fluxo fiscal real da NF
- [ ] Definir ferramenta atual de e-mail
- [ ] Definir provedor WhatsApp
- [ ] Definir se haverá acesso mobile prioritário
- [ ] Definir se clientes terão portal externo no futuro
