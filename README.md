# Loyaltify Marketing Site

Single-page marketing experience for Loyaltify built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui primitives. The project is optimized for fast iteration, localization, and marketing integrations such as analytics, cookie management, and demo-request flows.

## Prerequisites
- Node.js 18+
- npm (ships with Node)

## Local Development
```bash
npm install        # install dependencies
npm run dev        # start Vite dev server on http://localhost:5173
```

## Available Scripts
- `npm run dev` - start the development server with hot reloading.
- `npm run build` - generate a production-ready bundle in `dist/`.
- `npm run build:dev` - build bundle using development mode flags.
- `npm run preview` - preview the production bundle locally.
- `npm run lint` - run ESLint across the entire codebase.

## Project Structure
- `src/` - React application source (pages, components, hooks, contexts).
- `public/` - static assets copied as-is to the build output.
- `index.html` - root HTML template and SEO metadata.
- `tailwind.config.ts` / `postcss.config.js` - styling configuration.

## Conventions
- Components live under `src/components`, grouped by feature.
- Hooks and context providers are colocated in `src/hooks` and `src/contexts` respectively.
- Styling relies on Tailwind CSS utility classes with a custom design token layer defined in `tailwind.config.ts`.
- Translations are managed by `LanguageContext` with keys following the `section.subsection.label` pattern.

## Deployment
1. Build the project (`npm run build`).
2. Deploy the contents of the `dist/` directory to your hosting provider or CDN (Vercel, Netlify, Cloudflare Pages, etc.).
3. Ensure environment-specific variables (analytics IDs, API URLs) are configured via your host's dashboard or injected at runtime.
