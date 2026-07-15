## 🥾 Happy Trails Interactive Portfolio App

**trail recommendations that read your nervous system, not just your fitness level**

![Status](https://img.shields.io/badge/status-prototype-yellow)
![Stack](https://img.shields.io/badge/stack-Next.js%20%C2%B7%20FastAPI%20%C2%B7%20Pinecone-B8D96E)

---

## about

Every trail has a psychological fingerprint. Happy Trails AI is a Waze × AllTrails hiking app that recommends hikes based on your cognitive and nervous system state - not just distance, difficulty, or star ratings.

Built on **Attention Restoration Theory** (Kaplan & Kaplan), Stress Inoculation Theory, and embodied cognition research, the app scores trails on how well they actually restore attention and regulate the nervous system. Then, it matches that profile to how you're feeling _today_ (not the usual static fitness level).

The right hike for a sleepy, burned-out worker needing attention restoration is not the same as the right hike for someone seeking creative stimulation. Happy Trails AI is built to know the difference.

---

## tech stack

- **Next.js** - frontend application
- **FastAPI** - backend recommendation engine
- **Anthropic API (Claude)** - interprets check-in state, analyzes trail review sentiment
- **Pinecone** - vector database of trails (embedded with ART scores, sensory complexity, environment type)
- **Mapbox** - routing, trailhead navigation, dynamic conditions
- **Supabase** - user data, post-hike insight history
- **Google Cloud** - infrastructure/hosting

---

## features

- Cognitive/nervous system check-in before trip planning (energy, mental load, intention)
- Trail recommendations ranked by **Attention Restoration Score** (fascination, extent, being-away, compatibility) - not just stars + difficulty
- Sensory complexity scoring per trail (canopy cover, water presence, elevation change, crowd level)
- Review sentiment analysis - trail reviews scored for emotional tone and restoration language
- Waze-style dynamic routing (conditions, safety flags, time-of-day recommendations)
- AI-generated trail mood imagery + ambient environment preview per recommendation
- Post-hike insight capture - "how did this trail serve your brain today?" feeds back into personalization over time

---

## quick start

**current state:** Happy Trails AI exists as a fully designed, interactive prototype (8 screens + state/component library) - the recommendation flow and UI are mapped out; the FastAPI backend and Pinecone vector search are in active development.

**to view the prototype:**

```
[ coming soon ]
```

**coming soon — once the functional build lands:**

```bash
# frontend
npm install
npm run dev

# backend
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## file map

```
 |-- tailwind.config.js
 |-- app
 | |-- layout.tsx
 | |-- api
 | | |-- aim-chat
 | | | |-- route.ts
 | | |-- classify-state
 | | | |-- route.ts
 | | |-- cognitive-load
 | | | |-- route.ts
 | |-- page.tsx
 | |-- globals.css
 |-- tsconfig.tsbuildinfo
 |-- next.config.js
 |-- next-env.d.ts
 |-- README.md
 |-- components
 | |-- Desktop.tsx
 | |-- StartMenu.tsx
 | |-- Taskbar.tsx
 | |-- WindowsLogo.tsx
 | |-- Window.tsx
 | |-- FriendlyTip.tsx
 | |-- DesktopIcon.tsx
 | |-- windows
 | | |-- AIMChat.tsx
 | | |-- AIMBuddyList.tsx
 | | |-- SOCiHighlights.tsx
 | | |-- Resume.tsx
 | | |-- Contact.tsx
 | | |-- WorkExplorer.tsx
 | | |-- GovernanceFramework.tsx
 | | |-- WhatsNew.tsx
 | | |-- BrainLab.tsx
 | | |-- SpillTheBeans.tsx
 | | |-- Welcome.tsx
 | | |-- SystemMapWindow.tsx
 | |-- SystemLoopStrip.tsx
 |-- public
 | |-- Mariah-Anderson-resume.pdf
 | |-- updates
 | |-- case-studies
 | | |-- brainmode
 | | |-- happytrails
 | | |-- abrc
 | | |-- phantomprd
 |-- package-lock.json
 |-- package.json
 |-- lib
 | |-- aimSounds.ts
 | |-- trivia.ts
 | |-- updates.ts
 | |-- claude.ts
 | |-- soci.ts
 | |-- aimContext.ts
 | |-- caseStudies.ts
 |-- tsconfig.json
 |-- declarations.d.ts
 |-- postcss.config.js
```

---

## roadmap

- [ ] stand up Pinecone vector DB with curated trail dataset (50–100 trails for v1)
- [ ] wire FastAPI recommendation engine to Claude for state interpretation
- [ ] integrate Mapbox for live routing
- [ ] connect review sentiment analysis pipeline
- [ ] post-hike feedback loop → personalization model

---

## part of a 4-piece portfolio

Happy Trails AI is one layer of a connected system exploring one thesis - **sense → classify → adapt → learn** — across 4 pieces:

🧠 [BrainMode](#) (interface layer) · 🥾 **Happy Trails AI** (environment layer) · 🎨 [ABRC](#) (design system layer) · 📋 [The Phantom PRD](#) (governance layer)

---

## author

**Mariah Anderson** - Sr. Product Engineer, building toward AI Product Leadership
