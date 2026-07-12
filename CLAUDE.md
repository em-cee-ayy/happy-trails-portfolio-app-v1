# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A high-fidelity, click-through mobile UI mockup for "Happy Trails AI" — a nature trail recommendation app concept built around Attention Restoration Theory (ART). This is a **design/portfolio artifact**: all trail, feed, and profile data is hard-coded in `src/data.ts`, and the "AI matching" flow is a designed simulation (a timed processing screen plus a simple energy-threshold heuristic in `CheckInScreen`). There is no backend, no env vars, and no real AI integration.

## Commands

- `npm run dev` — Vite dev server on port 3000 (falls back to 3001+ if occupied)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — type-check only (`tsc --noEmit`, strict); there is no separate lint/test runner
- `npm run clean` — remove `dist`

There is no test suite. Deploys as a fully static SPA; `vercel.json` holds the rewrite so deep links resolve (Vercel preset "Vite", output `dist`).

## Architecture

**Routing** ([src/main.tsx](src/main.tsx)): `react-router-dom` `createBrowserRouter` with [layouts/AppShell.tsx](src/layouts/AppShell.tsx) as the single layout route; every screen is a child route (`/`, `/home`, `/trail/:id`, `/hike/:id`, `/processing?trail=<id>`, `/map`, `/feed`, `/profile`, …; `*` redirects to `/`). Navigation state lives in the URL: the selected trail is the `:id` param (`TrailDetailScreen` looks it up in `TRAILS_DATA` and redirects unknown ids to `/no-match`), and `ProcessingScreen` reads `?trail=` then `navigate(..., { replace: true })`s to the detail screen after a mock delay. When adding a screen: create it under `src/screens/`, register the route in `main.tsx`, and add a link to `SCREEN_LINKS` in `SpecSidebar`.

**Shell vs screens.** `AppShell` renders the two-pane presentation: a "Design Specification" sidebar ([components/SpecSidebar.tsx](src/components/SpecSidebar.tsx) — portfolio context + a navigator linking to every screen) and the app viewport ([components/DeviceFrame.tsx](src/components/DeviceFrame.tsx)). The shell owns the camera-sheet open state and decides bottom-nav visibility per route (`NAV_HIDDEN_PATHS` + `/hike/*`). Screens under `src/screens/` are self-contained: they use router hooks (`useNavigate`/`useParams`) directly rather than receiving navigation props.

**Responsive model:** on `lg+` the app renders inside a fixed 393×852 device frame (height clamped to the viewport) beside the sidebar; below `lg` the app IS the viewport and the sidebar becomes a full-screen drawer behind the floating "About this design" toggle (in `AppShell`).

**Scroll/overlay contract:** `DeviceFrame` is the positioning context. `AppShell` puts screens in an `absolute inset-0 overflow-y-auto` wrapper; `BottomNav` and `CameraSheet` are siblings pinned to the frame, so they don't scroll with content. Consequences: screens size themselves with `h-full` and scroll internally; screens visible alongside the nav need `pb-24`-ish clearance; pinned CTA bars use `absolute bottom-16` (not `bottom-0`) so the 64px bottom nav doesn't cover them. Don't make a screen's root a `flex flex-col` if the root itself is the scroll container — flex compresses children instead of overflowing (this bug clipped the Home check-in card once already; see the comment in `HomeScreen`).

**Data model** ([src/types.ts](src/types.ts), [src/data.ts](src/data.ts)): `Trail` carries the four ART dimension scores with explanations, a `matchScore`, `isRestorative`, a `category` (drives Home's filter chips), and `mapPos` (percentage coordinates for pins on `MapScreen`'s stylized SVG map). `FEED_ITEMS` and `PROFILE_STATS` feed the Feed and Profile screens. `TRAILS_DATA[0]` (boulder_creek, low-exertion, high match) and `[1]` (sky_pond, high-exertion, low match) are deliberately contrasted so the check-in flow can demo both outcomes. Every trail card anywhere in the app must reference a real `TRAILS_DATA` id — screens render cards from this data, never hard-coded copies.

## Styling conventions

- Tailwind v4 via `@tailwindcss/vite`; no `tailwind.config.js` — theme (palette + Inter/Playfair Display/JetBrains Mono fonts) is declared with `@theme` in [src/index.css](src/index.css).
- Shared chrome uses `var(--color-*)` arbitrary-value classes (e.g. `bg-[var(--color-paper)]`); some screens (Home, camera sheet) use raw hex like `#2B4A35` instead. Match whichever convention the surrounding file already uses; the IDE's "canonical class" suggestions (`bg-paper`, `h-40`, …) are deliberately not followed to keep files internally consistent.
- `lucide-react` for icons. The `@/*` alias maps to `./src/*` but imports are currently all relative.
