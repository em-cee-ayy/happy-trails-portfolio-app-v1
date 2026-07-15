# Handoff: Happy Trails AI

A hiking app ("happy trails AI") — AllTrails-adjacent with an AI-first posture. Community trail alerts, live-map hike tracking, bird ID (audio), plant ID (camera), and a live parking-availability view sit beside standard trail discovery, trail detail, profile, and a social feed.

---

## About the design files

The files in this bundle are **design references written as an HTML + React (Babel-in-browser) prototype**. They are not production code.

Your job is to **recreate these screens inside the target codebase's existing environment** — likely React Native, SwiftUI, or Kotlin/Jetpack Compose for mobile — using its established patterns, navigation, component library, and state management. If no environment exists yet, pick whatever best fits the product (React Native or SwiftUI are both reasonable for a mobile-first hiking app).

Do not copy the inline styles or the single-HTML structure verbatim. Treat the tokens, layouts, typography, and copy as the source of truth; ship them idiomatically in the real app.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, iconography, interactions, and copy are in place. Recreate pixel-close. If the target codebase has a design system, map these tokens to it rather than re-introducing hard-coded values.

---

## Design tokens

### Color
| Token | Hex | Usage |
|---|---|---|
| `ink` | `#1E2817` | Body text on cream, deepest accent |
| `forest` | `#2D3A1F` | Primary button bg, headings |
| `moss` | `#4A6B42` | Primary brand green, active states, location dot |
| `leaf` | `#6B8E4E` | Decorative greens, secondary route stroke |
| `sage` | `#A9B89A` | Muted backgrounds, map terrain |
| `cream` | `#F4EFE0` | Warm paper bg |
| `paper` | `#FBF8F1` | Lighter paper bg (trail detail, sheets) |
| `shell` | `#EFEAD8` | Base app bg |
| `bone` | `#FFFFFF` | Card bg |
| `terracotta` | `#D97757` | Accent (FAB, emphasized CTAs, saved bookmark) |
| `coral` | `#E8A87C` | Soft accent, liked heart, route glow |
| `amber` | `#E8B04A` | Stars, summit marker, warning |
| `red` | `#C84A3C` | Danger (bear alerts) |
| `sky` | `#8AAED2` | Water/ice alerts, info |
| `ink60/40/20/10/05` | rgba(30,40,23, .6/.4/.2/.1/.05) | Secondary / tertiary text, dividers, hairlines |

### Typography
- **Display / headings:** `Instrument Serif` — used for h1-style screen titles, trail names, key numbers. Italic `<em>` used for colored accent words (e.g., "Trail *alerts*").
- **UI:** `Inter` — weights 400/500/600/700/800. Body 13–14, labels 11–12, caption/uppercase 10–11 w/ `letter-spacing: 0.8–1px` and `text-transform: uppercase`.
- Status bar uses system font stack.

### Radius scale
`xs 8 · sm 12 · md 16 · lg 20 · xl 28 · pill 9999`

### Shadow scale
- `card`: `0 1px 2px rgba(0,0,0,0.04), 0 8px 20px rgba(30,40,23,0.06)`
- `float`: `0 4px 12px rgba(0,0,0,0.08), 0 18px 40px rgba(30,40,23,0.12)`
- `pill`: `0 1px 2px rgba(0,0,0,0.06), 0 6px 16px rgba(30,40,23,0.08)`

### Iconography
Custom 24×24 outline icons, 1.75 stroke, round caps/joins. Filenames in `src/icons.jsx`. Replace with the target platform's icon library (SF Symbols / Material / Feather / lucide) matching the same weight + rounded style.

### Imagery
All photography is sourced from Unsplash for prototype purposes — do **not** ship those URLs. See `src/tokens.jsx` → `PHOTOS` for the full list and replace with licensed assets.

---

## Global structure

- **Device:** iPhone 14-class frame; design canvas is 393 × 852.
- **Status bar:** Custom per screen so it can tint black over paper, white over photography. Real app should use the platform's status-bar API.
- **Tab bar:** 5 slots — Trails (home), Alerts, center FAB (Scan — opens camera/mic action sheet), Feed (social), Profile.
- **Navigation:** Screen-level in `src/app.jsx` via a single `route` string. Real app: stack navigator with modals for Drop Pin and Scan.
- **Tweaks panel:** Runtime controls to switch home variants and accent/font — ignore in production.

---

## Screens

### 1. Onboarding (`Onboarding` in `screens-profile.jsx`)
Three full-bleed photo slides with overlay copy and a Skip link. Paging dots at bottom. Finish → Home.

### 2. Home — three variants (`HomeA/B/C` in `screens-home.jsx`)
Ship **HomeA (Editorial)** as default.
- **A Editorial:** Featured trail hero card + curated list of trails with thumbnail, difficulty chip, distance/time/elevation line, star rating.
- **B Map-first:** Map dominant, carousel of nearby trail cards overlaid at bottom.
- **C Gallery:** Magazine-style full-bleed hero, "happy trails" wordmark in Instrument Serif 34/36 top-left with 24px top padding, circular avatar top-right.
Header pattern: serif wordmark left, search + avatar right.

### 3. Trail detail (`TrailDetail` in `screens-trail.jsx`)
Hero photo 420px tall with long soft gradient fading into `paper` (stops 0/0.28 → 22/0 → 45/0 → 55/paper@0 → 80/paper@80 → 100/paper). Title stack (park kicker + serif trail name) sits `bottom: 130`. Glass circular buttons (back, share, bookmark) over hero. Stats grid (Distance / Duration / Elev. / Level) on a white card pulled up by `marginTop: -40`. Sections below: rating stars + avatars, description copy, elevation SVG chart, community alert chips, sticky bottom CTA row (primary "Start hike" 56px forest pill + secondary route-preview square — both currently call the same start handler).

### 4. Live hike (`LiveHike` in `screens-trail.jsx`)
Aerial mountain photo bg + translucent topo contour overlay (mix-blend screen). Route polyline drawn as a glowing coral ribbon with dashed "future" segment; circular start marker, pulsing current-position disc, amber summit pin with "Summit" label. Top chrome: back button, condition pill `12°C · Clear · 8mph NW` with sun icon (GPS dot prefix), layers button. Bottom sheet (dark forest-tinted glass): large timer, Distance/Pace/Elev stats, pause/lap buttons. Timer persists across reload via `localStorage`.

### 5. Community Alerts (`CommunityAlerts` in `screens-ai.jsx`) — hero screen
Stylized topo map (upper region only, bounded `bottom: 340` so pins never overlap the sheet). Filter chips: All / Wildlife / Closures / Trail hazards / Weather — filter drives both pin rendering and the header counter. Pins are tapered teardrops with alert-type icon inside and a report-count badge. Selected pin gets bigger + bolder. Card at the bottom shows selected alert's icon, title, distance/time/reports, reporter row ("Still there?" confirm CTA), Reroute / Share / Bookmark actions. Orange FAB bottom-right opens the Drop Pin sheet.

### 6. Drop Pin sheet (`DropPinSheet` in `screens-ai.jsx`)
Bottom sheet, scrim'd backdrop blur. "Drop an *alert*" serif title. 4×2 grid of alert types (Bear / Snake / Moose / Closed / Water / Fallen tree / Ice / Other). Note textarea, Submit button.

### 7. Bird ID (`BirdID` in `screens-ai.jsx`)
Forest-green gradient screen. Central animated waveform responding to "listening" state (tap to toggle). On ID: ascii waveform fades to a Photo + common/scientific name + confidence % + habitat/range copy + "Save to log" / "Hear again" buttons.

### 8. Plant ID (`PlantID` in `screens-ai.jsx`)
Camera viewfinder simulation with corner reticles. Tap shutter → scanning animation (horizontal sweep line + "Analyzing…"). Result card slides up with photo, common/scientific name, edibility/toxicity badges, family, bloom season, similar species thumbnails.

### 9. Live Parking (`LiveParking` in `screens-ai.jsx`)
Map with 3 trailhead parking lots showing live capacity (green/amber/red). List below: lot name, `12/45 spots`, occupancy bar, hourly pattern sparkline, last-updated timestamp, walking distance to trailhead.

### 10. Profile (`Profile` in `screens-profile.jsx`)
Hero with user avatar + cover photo. Big stat row: Trails / Distance / Elev. Monthly challenge progress ring. Badge grid, recent-hikes list.

### 11. Social feed (`Social` in `screens-profile.jsx`)
Stories rail (gradient ring for unwatched, + button on own). Feed of trail posts — avatar, user/trail/time, photo, action row: heart button (toggles coral fill + increments count), comment, share, bookmark button right-aligned (toggles terracotta fill). Tag row below.

---

## Interactions & behavior

- **Tab bar** navigates between Trails / Alerts / Scan / Feed / Profile.
- **Trail card tap** → TrailDetail with that trail.
- **Start hike / Route preview** → LiveHike.
- **Live hike timer** runs at 1Hz, toggled via pause button; value persisted in `localStorage` so refresh preserves session.
- **Alert filter chips** filter both map pins and the header count; selected pin falls back to the first alert in the current filter when the previous selection is filtered out.
- **Alert pin tap** → sheet updates to that alert.
- **Drop pin FAB** → sheet. Submit returns to alerts (in a real app: POST to reports API + optimistic add).
- **Bird ID listen toggle** → 2s scanning animation, then result card.
- **Plant ID shutter** → 2s scan line animation, then result card.
- **Social heart / bookmark** — per-post local state toggles icon fill + color; count increments optimistically.
- **Onboarding** auto-advance or Skip → home.
- **Navigation transitions:** screens fade in ~120ms. Sheets slide up w/ `cubic-bezier(.2,.9,.3,1)` 300ms.

## State management
Small and scope-local; nothing ever needs to be lifted beyond the screen. In a real app:
- `user`, `recentTrails`, `savedTrails`, `currentHike`, `alertFeed`, `sightings` are the candidate stores.
- `currentHike` (timer + track points) should persist across app lifecycle (background, cold start).

## Files in this bundle

```
Happy Trails AI.html      Entry HTML; wires up React+Babel, imports each screen file
ios-frame.jsx             iPhone bezel starter (from design tooling)
design-canvas.jsx         Design-canvas starter (unused at runtime if shipping the prototype directly)
src/
  tokens.jsx              Color, radius, shadow, photo tokens → window.TOKENS / PHOTOS
  icons.jsx               Custom outline icon set → window.Icons
  shared.jsx              StatusBar, TabBar, Screen, Chip, GlassPill, Stars, Photo, ConditionPill
  screens-home.jsx        HomeA / HomeB / HomeC
  screens-trail.jsx       TrailDetail, LiveHike, ElevationChart, AlertChip
  screens-ai.jsx          CommunityAlerts, DropPinSheet, BirdID, PlantID, LiveParking
  screens-profile.jsx     Profile, Social, Onboarding
  app.jsx                 RootApp — nav, tweaks panel, screen switcher
```

Open `Happy Trails AI.html` to view all screens. The toolbar has a "Screens" menu to jump between them and a Tweaks panel for the home-variant / accent / font toggles.

## Open questions for the dev team

- Map provider (Mapbox / MapLibre / Apple Maps / Google) — affects pin styling + contour availability.
- Bird & plant models — on-device (Core ML / TFLite) vs server. Latency budget shown in the prototype is ≤2s.
- Live parking data source — park service API, partner sensor feed, or community pings only?
- Offline mode for downloaded trails + route tracking is implied by AllTrails parity but not mocked here.
