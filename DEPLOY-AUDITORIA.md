# Deploy e Auditoria - CMJ Modelação

## Variáveis de ambiente

Configure na Vercel somente os IDs que serão usados:

```text
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

O Firebase Analytics já está configurado no código com o projeto `cmjmodelacao-jpproject`.

## Deploy na Vercel

1. Criar ou confirmar um repositório Git.
2. Subir o projeto para GitHub, GitLab ou Bitbucket.
3. Importar o repositório na Vercel.
4. Confirmar:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output: padrão da Vercel
5. Inserir variáveis de ambiente, se houver.
6. Publicar.
7. Apontar `www.cmjmodelacao.com.br` para a Vercel.
8. Validar SSL e redirecionamento do domínio raiz.

## Eventos de conversão

Eventos configurados:

- `whatsapp_click`: clique em qualquer link para o WhatsApp da CMJ.
- `quote_form_submit`: envio do formulário de orçamento.
- `generate_lead`: lead gerado pelo formulário.

Os eventos são enviados para:

- `dataLayer`, quando GTM estiver ativo.
- `gtag`, quando GA estiver ativo.
- `fbq`, quando Meta Pixel estiver ativo.
- Firebase Analytics, quando suportado pelo navegador.

## Auditoria pós-deploy

1. Abrir a home em desktop e mobile.
2. Testar links do menu.
3. Testar todos os CTAs de WhatsApp.
4. Enviar o formulário com dados reais de teste.
5. Validar evento `whatsapp_click` no Tag Assistant.
6. Validar evento `quote_form_submit` no Tag Assistant.
7. Validar evento `Lead` no Meta Pixel Helper.
8. Conferir `/sitemap.xml`.
9. Conferir `/robots.txt`.
10. Conferir compartilhamento com a imagem Open Graph.
11. Rodar Lighthouse.
12. Corrigir imagens pesadas antes de campanhas.
