# Audit do Site Loyaltify (Performance, SEO, Responsividade)

## Visao geral
- App React + Vite + TS + Tailwind, rotas principal (`/`, `/en`, `/pt`) e paginas de demo/legal em `src/pages`.
- UI nao foi alterada; apenas foram adicionados comentarios `TODO` em `src/components/Hero.tsx`, `src/components/AdminFeatureShowcase.tsx` e `src/components/FeatureShowcase.tsx` para sinalizar pontos de otimizacao.
- Contexto de idioma (`LanguageProvider`) define `document.documentElement.lang` no cliente, mas o HTML inicial permanece `lang="en"`.

## Performance
- Imagens pesadas (tamanho em bytes): `src/assets/admin-segmentation.jpg` 1.21MB, `admin-notifications.jpg` 1.17MB, `admin-metrics.jpg` 1.03MB, `admin-multiunit.jpg` 1.19MB, `feature-cashback.jpg` 1.09MB, `feature-promotions.jpg` 1.07MB, `feature-subscription.jpg` 0.39MB, `logo-webgest.png` 193KB. Todas carregam na home; no `AdminFeatureShowcase` os quatro JPGs sao montados ao mesmo tempo (sem `loading="lazy"`), mesmo quando ocultos.
- Hero carrega `Logo3DCanvas` (`react-three/fiber` + `@react-three/drei`) logo no primeiro paint; para mobile/conexoes lentas isso adiciona GPU e payload consideraveis para um efeito decorativo.
- Efeito de parallax do hero (`src/components/Hero.tsx`) adiciona `scroll` listener sem throttle/debounce e sem respeitar `prefers-reduced-motion`, podendo gerar jank em mobile.
- Dependencias nao utilizadas: `@tanstack/react-query` esta presente via `QueryClientProvider`, mas nao ha `useQuery`/`useMutation` na base (`rg` sem resultados). Isso injeta JS extra no bundle sem uso aparente.
- Snippet do Google Analytics em `index.html` usa ID placeholder `G-XXXXXXXXXX`; hoje gera chamadas externas sem coleta valida e antes de consentimento granular (pode afetar nota de privacidade/perf).
- Backgrounds e animacoes (ScrollReveal, gradientes, blur) estao em varias secoes; em devices low-end isso pode elevar CPU/bateria. Avaliar condicionar animacoes a viewport/visibilidade para reduzir trabalho offscreen.

## SEO
- Metadados so existem em `index.html` e `src/pages/PoliticaCookies.tsx` (via `Helmet`). Paginas `/demo`, `/terms-of-service`, `/privacy-policy`, `/politica-cookies` (EN) e `/404` rendem sem `<title>`/`<meta name="description">` especificos da rota/idioma.
- Canonical e OG/Twitter apontam para `https://yourdomain.com/…` e imagens `og-image.png`/`logo.png` que nao existem no projeto; risco de cartas sociais quebradas e sinal misto para buscadores.
- Estrutura multi-idioma nao exposta em SEO: nao ha `hreflang` entre `/` (pt-BR) e `/en`, nem metadados/structured data diferenciados por idioma; `html lang` inicial e sempre `en`.
- Structured data em `index.html` usa telefone placeholder `+1-XXX-XXX-XXXX`, sem endereco/localidade completos, nem `contactPoint` em pt/en. BreadcrumbList e adicionado via JS (`src/components/Breadcrumbs.tsx`), mas nao ha validacao de dados da pagina (nome exibido = slug capitalizado).
- Headings principais: home tem H1, legal pages tambem; porem faltam titulos/meta unicos por rota para evitar duplicidade de SERP.
- Alt texts: logos/clientes estao com `alt`; backgrounds decorativos ficam fora de `img`. Manter ao adicionar novas midias.

## Responsividade
- Header (`src/components/Header.tsx`) centraliza o menu com `absolute left-1/2`; em larguras entre 1024–1280px pode colidir com o logo e o bloco de botoes/language toggle. Validar navegacao nesses breakpoints.
- Hero: `min-h-screen` com texto 5xl/7xl, 3D canvas e CTA unica. Em 430/393/375px ha risco do CTA descer abaixo da dobra e do parallax causar jitter. Conferir sobreposicao com o header fixo.
- FeatureShowcase/AdminFeatureShowcase: imagens fixas em `h-[600px]` e grade `lg:grid-cols-2`; em mobile/tablet os blocos empilham, mas a altura alta pode gerar scroll longo e cortes em viewports curtas. Testar 768px e 430px para overflow horizontal/vertical.
- Demo page (`src/pages/demo.tsx`): grid quebra para coluna unica abaixo de `lg`; o header fixo + background animado podem reduzir contraste em telas menores. Verificar espacos em 1024/768/430.
- Politica de Cookies: texto extenso com listas; conferir legibilidade e espaçamento em 375/393px (listas com `list-disc` podem encostar nas bordas).
- TrustBar/Footer: wraps corretamente, mas vale checar gaps e alinhamento de logos no mobile (<=430px) para evitar compressao excessiva.

## Sugestoes futuras
- Otimizar midias: converter JPGs grandes para WebP/AVIF, gerar variantes responsivas (`srcset`/`sizes`) e aplicar `loading="lazy"`/IntersectionObserver para as galerias de features/admin.
- Home hero: avaliar substituicao/adiamento do `Logo3DCanvas` para mobile (ou so apos interacao), e limitar o parallax respeitando `prefers-reduced-motion` + throttle para scroll.
- SEO por rota/idioma: adicionar `<Helmet>` (ou similar) em cada pagina com `title`/`description` coerentes pt/en, canonicals corretos, hreflang entre `/` e `/en`, OG/Twitter com assets reais.
- Clean-up de dependencias: remover ou lazy carregar `@tanstack/react-query` enquanto nao houver queries reais.
- Observabilidade: rodar Lighthouse/Pagespeed em conexao "Slow 3G" para `/` e `/en`, e validar structured data (org/software/localbusiness/breadcrumb) no Rich Results para ajustar campos faltantes.
