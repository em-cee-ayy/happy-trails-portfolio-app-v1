# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A high-fidelity, click-through mobile UI mockup for "Happy Trails AI" — a nature trail recommendation app concept built around Attention Restoration Theory (ART). This is a **design/portfolio artifact**, not a production app with real data or backend logic: all trail data is hard-coded in `src/data.ts`, and screen transitions are driven entirely by local React state rather than routing. There is no real AI integration yet — `@google/genai`, `express`, and `dotenv` are scaffolded dependencies from the Google AI Studio template but are currently unused in `src/`.

Originally scaffolded in Google AI Studio (see `metadata.json`, `.env.example` — env vars are injected by AI Studio at runtime, not read from a real `.env.local` in this repo's current state).

## Commands

- `npm run dev` — start Vite dev server on port 3000 (host `0.0.0.0`)
- `npm run build` — production build via Vite
- `npm run preview` — preview the production build
- `npm run lint` — type-check only (`tsc --noEmit`); there is no separate lint/test runner configured
- `npm run clean` — remove `dist` and `server.js`

There is no test suite in this repo.

## Architecture

**Single-page, state-machine navigation.** [src/App.tsx](src/App.tsx) is the entire app shell: it owns one `activeScreen` state value (typed as `ScreenId` in [src/types.ts](src/types.ts)) and conditionally renders one of ~11 screen components based on it. There is no router — "navigation" is just calling `setActiveScreen(...)`. When adding a new screen, add its `ScreenId` variant, add the component under `src/components/`, wire a render branch in `App.tsx`, and add an entry to the "Direct Screen Preset Deck" navigator list in the same file.

**Split-view layout.** `App.tsx` renders two panes side by side on large screens (stacked on mobile): a left "Design Specification" sidebar (scholarly context about ART + a manual screen navigator for jumping directly to any screen during development/demo), and a right pane containing a fixed `393×852` device frame that renders the actual mockup screens. Only the right-hand device frame represents the "real" app UI; the left pane is presentation/portfolio scaffolding and should generally not be touched when working on app screens themselves.

**Shared app-level state lives in `App.tsx`**, not in the screens: `selectedTrail`, `isCameraSheetOpen`, and the live clock (`timeStr`) are all lifted to the top and passed down as props/handlers. Screens are largely presentational and receive callbacks like `onNext`, `onBack`, `onStartHike`, `onSubmit` rather than managing cross-screen state themselves.

**Data model** ([src/types.ts](src/types.ts), [src/data.ts](src/data.ts)): `Trail` objects carry a `matchScore`, `isRestorative` flag, and an array of `ArtDimension` scores (`being away`, `fascination`, `extent`, `compatibility` — the four ART dimensions), each with a 0–100 `score` and human-readable `explanation`. `CognitiveState` models the user's self-reported mental state options shown on the check-in screen. `TRAILS_DATA[0]` (Boulder Creek, low-exertion) and `TRAILS_DATA[1]` (Sky Pond, high-exertion) are deliberately contrasted so the check-in → processing → trail-detail flow can demo different match outcomes: `handleCheckInSubmit` in `App.tsx` picks a trail based on the reported cognitive state (`"wired"` → Sky Pond, everything else → Boulder Creek) purely as a mockup heuristic, not real matching logic.

**Screens** (`src/components/`): `OnboardingScreens.tsx` holds two onboarding steps in one file; the rest are one screen per file (`HomeScreen`, `CheckInScreen`, `ProcessingScreen`, `TrailDetailScreen`, `ActiveHikeScreen`, `PostHikeScreen`, `ComponentsScreen`). `MiscScreens.tsx` bundles `InsightsScreen` and `NoMatchScreen`. `ComponentsScreen` is a living style/component reference sheet, not part of the user-facing flow.

## Styling conventions

- Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js` — theme is defined inline in [src/index.css](src/index.css) using the `@theme` directive).
- Custom CSS variables for the palette (`--color-forest`, `--color-paper`, `--color-pine`, `--color-art-comp`, per-ART-dimension colors, etc.) and fonts (`--font-sans` = Inter, `--font-serif` = Playfair Display, `--font-mono` = JetBrains Mono) are declared there — reference them via `var(--color-*)` or Tailwind arbitrary-value classes like `bg-[var(--color-forest)]`, not raw hex, when touching shared chrome. Screen-local one-off colors are frequently hard-coded as hex (e.g. `#2B4A35`) directly in component classNames instead — match whichever convention the surrounding component already uses rather than mixing both in the same file.
- `lucide-react` for icons, `motion` (Framer Motion successor) is available for animation.
- The `@/*` path alias maps to the repo root (see `tsconfig.json` / `vite.config.ts`).
