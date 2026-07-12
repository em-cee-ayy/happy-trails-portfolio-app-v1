# Happy Trails AI

A high-fidelity, interactive mobile UI mockup for a nature trail recommendation app concept.
Instead of matching hikers to trails by distance and difficulty alone, Happy Trails AI matches
trails to your **cognitive state** using [Attention Restoration Theory](https://en.wikipedia.org/wiki/Attention_restoration_theory)
(Kaplan & Kaplan, 1989) — scoring each trail across the four ART dimensions:
*being away*, *fascination*, *extent*, and *compatibility*.

This is a portfolio design piece: all trail, feed, and profile data is mocked in
[`src/data.ts`](src/data.ts), and the "AI matching" flow is a designed simulation.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) (theme defined inline in `src/index.css`)
- [React Router](https://reactrouter.com) — every screen has a shareable URL
- [Lucide](https://lucide.dev) icons

## Run locally

**Prerequisites:** Node.js 20+

```sh
npm install
npm run dev        # dev server at http://localhost:3000
```

Other scripts:

```sh
npm run lint       # type-check (tsc --noEmit)
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Deploy

The app is a fully static single-page app — no server, no environment variables.

**Vercel:** import the repo, pick the **Vite** framework preset (build `npm run build`,
output `dist`) and deploy. [`vercel.json`](vercel.json) contains the SPA rewrite so
deep links like `/trail/sky_pond` resolve correctly.

Any other static host works the same way — build and serve `dist/` with all routes
rewritten to `index.html`.
