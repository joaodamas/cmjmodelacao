# Checklist de Execução - Landing Page CMJ Modelação

## 1. Base técnica
- [x] Criar projeto com Next.js
- [x] Configurar React
- [x] Configurar TypeScript
- [x] Configurar Tailwind CSS
- [x] Criar componentes no padrão shadcn/ui
- [x] Instalar e usar Framer Motion
- [x] Criar estrutura organizada de componentes
- [x] Separar dados em arrays/objetos reutilizáveis
- [x] Garantir layout responsivo mobile-first
- [x] Rodar lint sem erros
- [x] Rodar build de produção sem erros

## 2. Estrutura da landing page
- [x] Header com logo, menu e CTA de orçamento
- [x] Menu mobile com navegação por âncoras
- [x] Logo textual sem ícone lateral no header e footer
- [x] Hero section com título, subtítulo, CTAs e selos de credibilidade
- [x] Bloco de credibilidade com diferenciais técnicos
- [x] Seção Sobre a CMJ
- [x] Seção Serviços com layout técnico, descrição e benefício
- [x] Seção Para quem atendemos
- [x] Seção Estrutura e maquinários
- [x] Seção Portfólio / Trabalhos realizados
- [x] Seção Clientes com carrossel de marcas
- [x] Processo de atendimento em passo a passo
- [x] CTA intermediária
- [x] Formulário de orçamento
- [x] FAQ
- [x] Footer completo
- [x] Botão fixo de WhatsApp

## 3. Conversão e WhatsApp
- [x] Configurar CTAs para WhatsApp
- [x] Configurar botão fixo de WhatsApp
- [x] Criar mensagem pré-preenchida para solicitação de orçamento
- [x] Criar formulário com redirecionamento para WhatsApp
- [x] Incluir campos comerciais essenciais
- [x] Incluir campo de upload/anexo de desenho ou projeto
- [ ] Validar mensagem final do WhatsApp com a equipe comercial
- [ ] Definir se os dados também serão salvos em banco, CRM, e-mail ou planilha

## 4. Conteúdo e copywriting
- [x] Revisar título principal
- [x] Revisar subtítulo do hero
- [x] Melhorar texto institucional da CMJ
- [x] Criar copy para serviços
- [x] Criar copy para segmentos atendidos
- [x] Criar copy para estrutura e maquinários
- [x] Criar copy para processo de atendimento
- [x] Criar FAQ
- [x] Criar chamadas comerciais para orçamento
- [ ] Validar nomes de clientes com autorização de uso
- [ ] Revisar todos os textos com a equipe da CMJ antes da publicação

## 5. Visual, identidade e imagens
- [x] Definir estética industrial B2B moderna
- [x] Aplicar paleta com azul escuro, branco, cinza e azul vivo
- [x] Criar imagem hero industrial provisória
- [x] Criar áreas para portfólio visual
- [x] Criar área de clientes em carrossel
- [x] Reduzir aparência de template/IA com layout menos dependente de cards e ícones
- [x] Refinar animações para uso mais discreto
- [ ] Inserir fotos reais dos moldes em `public/portfolio`
- [ ] Substituir placeholders da galeria por imagens reais
- [ ] Inserir logos reais dos clientes, se disponíveis
- [ ] Validar qualidade e enquadramento das imagens em mobile

## 6. SEO
- [x] Configurar title: `CMJ Modelação | Moldes em Isopor para Fundição`
- [x] Configurar meta description
- [x] Configurar keywords estratégicas
- [x] Configurar Open Graph básico
- [x] Configurar canonical
- [x] Configurar idioma `pt-BR`
- [ ] Criar favicon real da CMJ
- [x] Criar favicon textual provisório da CMJ
- [x] Criar imagem Open Graph específica para compartilhamento
- [x] Criar sitemap em `/sitemap.xml`
- [x] Criar robots em `/robots.txt`
- [x] Preparar arquivo `.env.example` para rastreamento
- [x] Adicionar dados estruturados JSON-LD de empresa local
- [x] Adicionar dados estruturados JSON-LD de FAQ
- [x] Criar manifest básico do site
- [x] Criar página 404 personalizada
- [x] Criar README operacional
- [ ] Validar indexação após deploy

## 7. Analytics, mídia e rastreamento
- [x] Preparar Google Analytics via variável de ambiente
- [x] Preparar Google Tag Manager via variável de ambiente
- [x] Preparar Meta Pixel via variável de ambiente
- [x] Integrar Firebase Analytics
- [x] Validar build com Firebase Analytics
- [ ] Confirmar estratégia final: Firebase Analytics, GA/GTM ou ambos
- [x] Configurar eventos de conversão para clique no WhatsApp
- [x] Configurar evento de envio do formulário
- [ ] Testar eventos no Tag Assistant / Meta Pixel Helper

## 8. Performance e acessibilidade
- [x] Usar `next/image` para imagem principal
- [x] Configurar imagens otimizadas
- [x] Criar labels no formulário
- [x] Adicionar textos alternativos em imagens
- [x] Garantir foco acessível em botões e campos
- [x] Validar build estático
- [x] Respeitar preferência de redução de movimento no carrossel
- [x] Criar instruções para otimização/substituição de imagens reais
- [x] Adicionar headers básicos de segurança no Next
- [ ] Rodar Lighthouse após inserir imagens reais
- [ ] Ajustar peso das imagens reais antes do deploy
- [ ] Testar navegação em dispositivos móveis reais

## 9. Deploy
- [x] Criar ou confirmar repositório Git
- [x] Criar `.gitignore` para preparar repositório/deploy
- [x] Criar guia de deploy e auditoria
- [x] Criar checklist técnico de auditoria
- [ ] Subir projeto para GitHub/GitLab/Bitbucket
- [ ] Importar projeto na Vercel
- [ ] Configurar variáveis de ambiente na Vercel
- [ ] Rodar primeiro deploy de produção
- [ ] Configurar domínio `www.cmjmodelacao.com.br`
- [ ] Configurar redirecionamento de domínio raiz para `www`, se aplicável
- [ ] Validar SSL
- [ ] Testar formulário e WhatsApp em produção

## 10. Checklist final de publicação
- [ ] Conferir telefone e WhatsApp
- [ ] Conferir endereço/localização
- [ ] Conferir todos os links do menu
- [ ] Conferir CTAs em desktop e mobile
- [x] Tornar contatos do footer clicáveis
- [ ] Conferir imagens reais do portfólio
- [ ] Conferir clientes/logos
- [ ] Conferir SEO no HTML final
- [ ] Conferir tags de tracking
- [ ] Fazer teste completo de orçamento
- [ ] Aprovação final da CMJ
- [ ] Publicar campanhas de Meta Ads / Google Ads
