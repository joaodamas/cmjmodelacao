# CMJ Modelação - Landing Page

Landing page comercial para geração de leads via WhatsApp e formulário de orçamento.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra:

```text
http://127.0.0.1:3000
```

## Validação

```bash
npm run lint
npm run build
```

## Arquivos principais

- `app/page.tsx`: landing page.
- `lib/site-data.ts`: textos, serviços, clientes, máquinas e FAQ.
- `components/quote-form.tsx`: formulário de orçamento com WhatsApp.
- `components/structured-data.tsx`: JSON-LD de SEO.
- `public/portfolio`: imagens reais do portfólio.
- `DEPLOY-AUDITORIA.md`: instruções de deploy e auditoria.
- `AUDITORIA-TECNICA.md`: checklist técnico de revisão.
- `CHECKLIST-SISTEMA-INTERNO-CMJ.md`: escopo do futuro painel operacional interno da CMJ.

## Tracking

Variáveis opcionais:

```text
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Eventos configurados:

- `whatsapp_click`
- `quote_form_submit`
- `generate_lead`

## Imagens reais

Substitua os placeholders do portfólio adicionando imagens em `public/portfolio` e atualizando as referências em `app/page.tsx` / `lib/site-data.ts`.
