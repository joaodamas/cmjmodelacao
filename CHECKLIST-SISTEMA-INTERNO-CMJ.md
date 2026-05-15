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

- [ ] Dashboard
- [ ] Pedidos
- [ ] Produção
- [ ] Financeiro
- [ ] Faturamento
- [ ] Clientes
- [ ] Configurações

Regras:

- [ ] Não criar menus extras no MVP
- [ ] Evitar telas duplicadas
- [ ] Priorizar ações rápidas dentro do pedido
- [ ] Manter navegação clara para uso diário em chão de fábrica/escritório

## 4. Dashboard operacional

Linha 1 - indicadores discretos:

- [ ] Pedidos em andamento
- [ ] Produções atrasadas
- [ ] Pedidos para faturar
- [ ] Entregas da semana

Linha 2 - timeline operacional:

- [ ] Últimos pedidos recebidos
- [ ] Pedidos em orçamento
- [ ] Produções com finalização prevista
- [ ] Pedidos aguardando NF
- [ ] Pedidos aguardando faturamento

Linha 3 - calendário operacional:

- [ ] Entregas
- [ ] Início de produção
- [ ] Término previsto de produção
- [ ] Vencimentos financeiros
- [ ] Alertas de NF

Linha 4 - alertas:

- [ ] Pedido vence em até 2 dias
- [ ] Pedido atrasado
- [ ] Produção atrasada
- [ ] NF pendente
- [ ] Faturamento pendente
- [ ] Cliente sem dados fiscais completos

## 5. Pedidos

Tela principal do sistema: Kanban industrial.

Colunas:

- [ ] Recebido
- [ ] Orçamento
- [ ] Aprovado
- [ ] Produção
- [ ] Finalização
- [ ] Entrega
- [ ] NF
- [ ] Faturado
- [ ] Finalizado

Card de pedido:

- [ ] Número do pedido
- [ ] Cliente
- [ ] Nome/descrição da peça
- [ ] Tipo de projeto
- [ ] Prazo de entrega
- [ ] Responsável
- [ ] Status atual
- [ ] Alerta de prazo
- [ ] Valor, quando disponível
- [ ] Anexos/desenhos

Ações rápidas:

- [ ] Abrir pedido
- [ ] Mudar status
- [ ] Adicionar observação
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

- [ ] Visão de produção por prazo
- [ ] Visão de produção por responsável
- [ ] Visão de produção atrasada
- [ ] Lista de pedidos com início previsto
- [ ] Lista de pedidos com término previsto
- [ ] Botão para iniciar produção
- [ ] Botão para finalizar produção
- [ ] Registro de observações técnicas
- [ ] Histórico de mudança de status

## 8. Financeiro

Controle operacional, sem complexidade de ERP.

- [ ] A faturar
- [ ] Contas a receber
- [ ] Em atraso
- [ ] Recebido no mês
- [ ] Previsão próximos 15 dias
- [ ] Marcar como pago
- [ ] Registrar data de pagamento
- [ ] Registrar observação financeira

## 9. Faturamento e NF

NF como etapa operacional.

- [ ] Lista de pedidos aguardando NF
- [ ] Pedido finalizado em produção gera alerta para NF
- [ ] Registrar número da NF
- [ ] Registrar data de emissão
- [ ] Registrar valor faturado
- [ ] Marcar como faturado
- [ ] Enviar alerta para financeiro

## 10. Clientes

- [ ] Cadastro de cliente
- [ ] Razão social
- [ ] Nome fantasia
- [ ] CNPJ
- [ ] Contato principal
- [ ] WhatsApp
- [ ] E-mail
- [ ] Endereço
- [ ] Observações
- [ ] Histórico de pedidos
- [ ] Status fiscal: completo/incompleto

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

- [ ] Grafite
- [ ] Cinza aço
- [ ] Azul petróleo
- [ ] Branco quente
- [ ] Azul discreto para ação principal
- [ ] Vermelho/âmbar apenas para alerta

Regras visuais:

- [ ] Sem neon
- [ ] Sem glassmorphism
- [ ] Sem gradientes chamativos
- [ ] Sem dashboard colorido
- [ ] Sem excesso de cards
- [ ] Sem charts decorativos
- [ ] Usar tabela limpa quando for melhor que card
- [ ] Usar Kanban apenas para fluxo de pedidos
- [ ] Tipografia forte, legível e densa
- [ ] Layout com foco em operação diária

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

- [ ] Login
- [ ] Perfis de usuário
- [ ] Dashboard operacional
- [ ] Cadastro de clientes
- [ ] Cadastro de pedidos
- [ ] Kanban de pedidos
- [ ] Upload de anexos
- [ ] Status operacional
- [ ] Prazos e alertas
- [ ] Produção básica
- [ ] Faturamento básico
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

