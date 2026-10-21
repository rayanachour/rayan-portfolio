# Rayan — Business Portfolio

Business-focused portfolio for a solo engineer offering practical websites and
AI automation.
Built with Next.js 14, TypeScript, Tailwind, shadcn/ui, and Framer Motion.
Forked from [wendoj/developer-portfolio](https://github.com/wendoj/developer-portfolio) and redesigned.

## Editing content

Everything lives in one file: `src/data/content.ts` — hero copy, audience,
services, the AI-automation examples, process steps, FAQ and contact options.
Components only render what's there. The audience is business owners, so keep
copy plain and outcome-focused.

### Contact form

`src/components/ContactForm.tsx` posts JSON to `NEXT_PUBLIC_FORM_ENDPOINT`
(Formspree / Web3Forms / your own API). If the variable is unset, the action
clearly opens a pre-filled email draft and does not claim delivery.

Set `NEXT_PUBLIC_SCHEDULING_URL` to a real scheduler URL to change the primary
CTA from “Request a discovery call” to “Book a discovery call.”

Set `NEXT_PUBLIC_SITE_URL` once the site has a domain (used for canonical and
social-preview metadata).

## Design system

- **Type**: Instrument Serif (headlines, italic accents) · JetBrains Mono (uppercase labels) · DM Sans (body)
- **Palette**: forest surfaces, emerald actions, sage secondary accents
- **Materials** (`src/styles/globals.css`): `.glass`, `.glass-strong`, `.glass-frost`, `.divider-inset`, `.dot-grid`
- **Background**: `.prism` — static radial gradients for smooth scrolling

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm type-check
pnpm build && pnpm start
```

## Deploy

Vercel works out of the box. A Docker + nginx setup is included (`Dockerfile`, `docker-compose.yml`).
