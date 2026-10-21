# Rayan Achour — Portfolio

Personal portfolio for Rayan Achour, Senior Software Engineer (Philadelphia, PA).
Built with Next.js 14, TypeScript, Tailwind, shadcn/ui, Framer Motion and Locomotive Scroll.
Forked from [wendoj/developer-portfolio](https://github.com/wendoj/developer-portfolio) and redesigned.

## Editing content

Everything lives in one file: `src/data/content.ts` — hero copy, stats, audience,
services, the AI-automation pitch, process steps, FAQ and contact options.
Components only render what's there. The audience is business owners, so keep
copy plain and outcome-focused.

The portrait is `public/assets/rayan.jpg`.

### Contact form

`src/components/ContactForm.tsx` posts JSON to `NEXT_PUBLIC_FORM_ENDPOINT`
(Formspree / Web3Forms / your own API). If the variable is unset, submitting
opens the visitor's email client with a pre-filled message instead — so the form
works even before you configure anything.

### Portfolio of apps

The section is removed for now. The `Project` type and an empty `projects` array
remain in `content.ts`; add entries and re-add a projects section when there are
apps to show.

Set `NEXT_PUBLIC_SITE_URL` in `.env` once the site has a domain (used for canonical / og:url tags).

## Design system

- **Type**: Instrument Serif (headlines, italic accents) · JetBrains Mono (uppercase labels) · DM Sans (body)
- **Materials** (`src/styles/globals.css`): `.glass`, `.glass-strong`, `.metal`, `.divider-inset`, `.dot-grid`
- **Background**: `.prism` — blurred screen-blended light blobs

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm type-check
pnpm build && pnpm start
```

## Deploy

Vercel works out of the box. A Docker + nginx setup is included (`Dockerfile`, `docker-compose.yml`).
