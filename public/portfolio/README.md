# Portfólio — imagens reais

Coloque aqui as fotos reais dos moldes e trabalhos executados pela CMJ.
A página usa `next/image` com `aspect-[4/3]` ou `aspect-[5/6]` (card destaque).

## Recomendações técnicas

- Formatos: `.webp`, `.jpg` ou `.png` (preferência por `.webp` comprimido).
- Largura ideal: **1600px** (mínimo 1200px). Altura proporcional ao crop 4:3 / 5:6.
- Compressão: 75–82% no `.jpg` ou `.webp` (Squoosh / TinyPNG).
- Evite: fotos escuras, tremidas ou com muita área neutra ao redor.
- Iluminação: luz natural lateral funciona melhor para mostrar relevo do EPS.

## Convenção de nomes

- `molde-isopor-automotivo.webp`
- `molde-fundicao-grande-porte.webp`
- `modelacao-cnc-router.webp`
- `peca-aluminio-modelo-eps.webp`
- `engenharia-reversa-peca-amostra.webp`

## Onde plugar no site

Atualize `lib/site-data.ts` → `portfolio[]`:

```ts
{
  category: "Moldes técnicos",
  title: "Modelo em EPS para componente fundido",
  description: "Geometria sob desenho com cantos vivos e raios controlados…",
  image: "/portfolio/molde-fundicao-grande-porte.webp",
  specs: [
    { label: "Material", value: "EPS técnico" },
    { label: "Fundição", value: "Alumínio" },
    { label: "Acabamento", value: "Refino manual" }
  ]
}
```

Os itens sem `image` cairão automaticamente no `PortfolioFallback`
("Imagem sob solicitação"), com fundo blueprint industrial — não há mais
risco de aparecer placeholder fake.
