# Orchard Home Gnome — Complete Project Defence Brief

**What this document is:** a full written breakdown of the Orchard Home Gnome system — what it is, what it means, what it does, and how it is built — written so it can be used directly as study material for a final-year project defence.

**Version described:** `orchard-home-gnome` v1.0.0, exactly as it exists in this repository today (November 2026 build).

**How to read the markings**

- ✅ **Verified** — I checked this against the source code, configuration, or a command I actually ran.
- ⚠️ **Confirm yourself** — this is about your institution, your proposal, your report, or a claim that needs a real citation. Do not present it as fact until you have checked it.
- 🧠 **Explanation to learn** — background knowledge you should be able to explain in your own words.

**Suggested use:** read Sections 1–7 to be able to talk about the project in plain language, Section 8 to survive the domain questions, Sections 9–17 for the technical questions, Sections 18–20 to be honest about weaknesses before the panel finds them, then rehearse with Sections 21–24 (questions, demo script, numbers, claims to avoid).

> **One rule before you start:** never quote a statistic about Zambia, food insecurity, urban farming, or smartphone ownership that you cannot cite. This document deliberately contains **no invented statistics**. Where a number would strengthen the argument, the section tells you what to source and from where. A wrong number is the fastest way to lose a defence; "I did not measure that, and here is how I would" is a strong answer.

---

## Table of contents

1. [The project in one line, 30 seconds, and 2 minutes](#1-the-project-in-one-line-30-seconds-and-2-minutes)
2. [The problem it addresses](#2-the-problem-it-addresses)
3. [What the system is, and what its name means](#3-what-the-system-is-and-what-its-name-means)
4. [Objectives](#4-objectives)
5. [Target users and realistic scenarios](#5-target-users-and-realistic-scenarios)
6. [Scope: what is in, what is deliberately out](#6-scope-what-is-in-what-is-deliberately-out)
7. [Feature-by-feature walkthrough](#7-feature-by-feature-walkthrough)
8. [The domain knowledge inside the app](#8-the-domain-knowledge-inside-the-app)
9. [System architecture](#9-system-architecture)
10. [Data model](#10-data-model)
11. [Business logic and algorithms](#11-business-logic-and-algorithms)
12. [Technology choices and why](#12-technology-choices-and-why)
13. [Progressive Web App and offline design](#13-progressive-web-app-and-offline-design)
14. [Interface and design system](#14-interface-and-design-system)
15. [Accessibility](#15-accessibility)
16. [Performance and build measurements](#16-performance-and-build-measurements)
17. [Security and privacy](#17-security-and-privacy)
18. [What has actually been verified](#18-what-has-actually-been-verified)
19. [Limitations and threats to validity](#19-limitations-and-threats-to-validity)
20. [Future work](#20-future-work)
21. [Likely defence questions with model answers](#21-likely-defence-questions-with-model-answers)
22. [Demo script](#22-demo-script)
23. [Numbers you can quote](#23-numbers-you-can-quote)
24. [Claims to avoid, and what to say instead](#24-claims-to-avoid-and-what-to-say-instead)
25. [Glossary](#25-glossary)
26. [File map](#26-file-map)
27. [A ten-slide defence outline](#27-a-ten-slide-defence-outline)
28. [Final checklist](#28-final-checklist)

---

## 1. The project in one line, 30 seconds, and 2 minutes

### One line

> Orchard Home Gnome is an offline-first web app that teaches a Zambian household how to grow food at home — nine plant guides, a short guided learning path, and progress that is saved on the device.

### 30-second version

> Many households in Zambia have a doorstep, a balcony, or a small yard, but not much gardening knowledge and not always reliable internet. Orchard Home Gnome is a mobile-first web app that gives practical, locally framed growing guides for nine crops — from tomatoes and kale to dwarf fruit trees — plus a short learning path that walks a beginner through the basics one step at a time. It installs to the phone's home screen like an app, works with no connection after the first visit, and saves progress on the device, so it never asks for an account or personal data. It is built with React, TypeScript and Vite, and shipped as a Progressive Web App.

### 2-minute version

> The project started from a simple observation: advice about growing food is everywhere, but it is scattered, written for commercial farms or for temperate climates, and it usually assumes you are online. For someone with five pots on a concrete slab, the real questions are narrower — how much sun does this need, how big a container, when do I water, how do I know it is ready to pick, and what actually grows well here?
>
> Orchard Home Gnome answers those questions in one place. The library holds nine plant guides: four fruit trees (plum, peach, apple, pomegranate) and five smaller crops (tomato, kale, bush beans, mint, basil). Each guide contains a materials list, five planting steps, four care notes, four harvest signs, a local tip, a Zambia-specific note, and the sources it was written from. A filtering and search screen lets someone find a plant by category or by typing what they have in mind.
>
> On top of the library there is a learning path of ten steps. It opens with the three things that decide whether a plant lives — light, drainage, and steady watering — then moves through tomato, growing in small spaces, mint, a six-question quiz, a growth-stage demonstration, kale, plum, apple, and harvest. Lessons unlock in order, so a complete beginner is never dropped into the middle of the content. Completing a step awards experience points, and completing something on consecutive days builds a streak. Both are small motivational devices, not the point of the app.
>
> Technically it is a single-page React application written in TypeScript, built with Vite, and delivered as a Progressive Web App. There is no server and no database: all content is compiled into the app as typed data, and all progress lives in one versioned localStorage record on the device. That was a deliberate decision. It removes hosting cost, removes account friction, removes the risk of leaking personal data, and — most importantly for the context — makes the app fully usable with no connection. The trade-off is that progress does not follow the user between devices, and I state that openly.
>
> I verified the production build and the linter both pass, and the built app precaches about 680 KiB of assets so it runs offline. I did not run a user study, and the growing content has not yet been reviewed by an extension officer, so those are the two things I would do next and I will be explicit about them.

---

## 2. The problem it addresses

### 2.1 The problem, stated carefully

The project addresses an **information and accessibility gap**, not a food-supply gap:

1. **Knowledge is fragmented and poorly matched to the setting.** Gardening information online is mostly written for large plots, commercial production, or temperate climates. A beginner with containers, a courtyard, or a 3 × 3 m yard has to translate it themselves.
2. **Generic advice ignores local conditions.** Zambia's altitude, rainfall pattern, and temperature range change what grows where. Highland areas such as the Copperbelt and parts of Lusaka Province behave very differently from the hot, dry valleys.
3. **Connectivity and data cost are real constraints.** A guide that needs a live connection is unreliable exactly when someone is standing next to a dry plant. Offline access is a functional requirement, not a bonus.
4. **Account friction kills completion.** Asking a first-time user to register before reading anything loses a large share of them, and it creates a data-protection obligation the project does not need.
5. **Beginning gardeners do not know the order to learn things in.** A pile of articles is not a curriculum. Light → drainage → watering → one easy crop → containers → harvest is a sequence; a list of pages is not.

### 2.2 Why these nine crops

✅ The nine crops were chosen to cover three useful groups at household scale:

| Group | Crops | Why they are in the app |
|---|---|---|
| Fruit trees | Plum, peach, apple, pomegranate | Long-term, high-value, and genuinely grown in Zambian gardens; dwarf/container forms make them relevant to small plots |
| Vegetables | Tomato, kale, bush beans | Fast feedback, everyday food, feasible in pots and beds |
| Herbs | Mint, basil | Small containers, low risk for a first attempt, useful in the kitchen |

This gives a beginner a **fast win** (mint, basil, kale), a **medium project** (tomato, beans), and an **ambitious project** (a fruit tree), which is a better learning curve than nine crops of the same difficulty.

### 2.3 What you may and may not claim about the problem

⚠️ **You may say:** the app is designed for households with limited space, limited connectivity, and no gardening background; the content is written in plain English and framed for Zambian conditions.

⚠️ **You may not say** things like "70% of Zambian households grow food" or "food insecurity affects X million Zambians" unless you have the citation in your report. If you need a figure, source it from one of these and cite the exact table and year:

- Zambia Statistics Agency (ZamStats) — census and living-conditions surveys
- FAO / FAOSTAT — food security and production data
- World Bank Open Data — urbanisation, internet and mobile penetration
- Ministry of Agriculture / Zambia Agriculture Research Institute — extension material and crop recommendations

Put the citation in your slides, not just in your report. Panels do ask "where is that number from?"

---

## 3. What the system is, and what its name means

### 3.1 Definition

✅ **Orchard Home Gnome is a client-side, offline-capable educational Progressive Web App.** It contains:

- a **content library** of nine plant-growing guides;
- a **linear learning path** of ten steps with lessons, a quiz, and a growth demonstration;
- a **progress and motivation layer** (experience points, streaks, completion state) persisted on the device;
- **supporting tools**: a small-space light finder, a harvest reference, a materials checklist, install guidance, and an about/sources screen.

It has **no backend, no accounts, no database, no analytics, and no third-party runtime requests.**

### 3.2 The name

The name is a design statement, and you should be able to explain each word:

- **Orchard** — the ambition: not just herbs on a windowsill, but fruit trees and a productive household plot.
- **Home** — the scale: household, doorstep, balcony, courtyard. Not a farm.
- **Gnome** — the guide. The app has a small hand-drawn gnome mascot who appears in the welcome screen, the home screen, empty states, and the quiz result. A gnome is a garden helper: friendly, non-judgemental, slightly comic. That tone is intentional, because beginner gardeners abandon apps that make them feel tested.

⚠️ This is an interpretation of the design intent. If your report gives a different origin for the name, use your report's version — but keep the "friendly garden guide" framing, because it matches the product.

### 3.3 The thesis in one sentence

> A beginner with a small space is best served by a small, trustworthy, offline set of guides plus a short guided sequence — not by a search engine, and not by an account.

Everything in the build follows from that sentence. When a panel asks "why is feature X missing?", the answer is usually "because it would have broken that sentence".

---

## 4. Objectives

⚠️ **These are reconstructed from what the system actually does.** Your submitted proposal and report contain the official wording. Copy the official objectives into your slides; use these only to check that what you built matches what you promised. If the report lists four objectives and this lists five, the report wins.

### 4.1 General objective

To design and develop an offline-capable, mobile-first digital guide that helps Zambian households with limited space and limited gardening experience grow food at home, and to evaluate the feasibility of delivering such a guide without a backend or user accounts.

### 4.2 Specific objectives (as realised in the build)

| # | Objective | How the build satisfies it | Where to point |
|---|---|---|---|
| 1 | Compile practical growing guidance for locally relevant crops | 9 guides × (materials, 5 planting steps, 4 care notes, 4 harvest signs, tip, local note, sources) | `src/data/plants.ts` |
| 2 | Present the content so a beginner can find what they need quickly | Library with category filters + text search; plant detail pages; separate planting/care screens | `LibraryScreen`, `PlantDetailsScreen` |
| 3 | Provide a structured learning sequence rather than a content dump | 10-node path with sequential unlocking, 8 lessons with checks, quiz | `learningPath`, `LearningPath` |
| 4 | Make the app usable without a connection | PWA with precached assets, self-hosted fonts, no runtime API calls | `vite.config.ts`, `dist/sw.js` |
| 5 | Avoid accounts and protect user privacy | No backend; single local progress record; no analytics or third-party calls | `GameContext`, absence of network code |
| 6 | Support small urban spaces explicitly | Light finder, container-volume guidance, small-space lesson | `SmallSpaceScreen` |
| 7 | Verify that the delivered system builds and runs correctly | `tsc -b && vite build` passes; `oxlint` clean; manual walkthrough | Section 18 |

### 4.3 Non-objectives (say these out loud — it protects you)

The project did **not** aim to: diagnose plant diseases from photographs; give site-specific agronomic prescriptions; replace an extension officer; provide e-commerce for seeds; sync data across devices; or prove a measurable yield increase. Those are legitimate future work, not gaps in the submitted scope.

---

## 5. Target users and realistic scenarios

### 5.1 Primary persona

**"Beginner household grower"** — an adult in a Zambian town or city with a doorstep, balcony, courtyard, or small yard. Has a phone, often the main or only internet device. Has grown something before, or has watched someone grow something, but does not know why a plant died. Wants food for the household and something to do with the space. Does not want to create an account to read a page.

### 5.2 Secondary personas

- **The parent/guardian growing with children** — needs short, safe, concrete steps.
- **The new home owner with bare ground** — needs the light/drainage/soil basics and tree spacing.
- **The student or renter in a flat** — containers only; needs volume and light guidance.
- **The enthusiastic but overwhelmed learner** — needs the ordered path, not the library.

### 5.3 Three concrete scenarios (use these in the demo)

1. **"I have a shady balcony and 30 minutes."** → Small Space screen → pick "Bright shade" → app suggests mint and explains why. Then Library → Herbs → Mint.
2. **"I want tomatoes but I killed the last ones."** → Home → continue path → Tomato lesson (light, drainage, watering) → open the tomato guide → planting steps → care notes.
3. **"My plum tree has fruit — when do I pick it?"** → Harvest screen → Plum tab → colour, firmness, scent, and the "fruit lifts with a gentle twist" cue.

### 5.4 What the app assumes about the user

✅ Plain-English literacy; a browser from the last few years; JavaScript enabled; permission to install (optional); and enough storage for ~1 MB of cached assets. It does **not** assume a fast connection after first load, a modern flagship phone, or any technical knowledge.

---

## 6. Scope: what is in, what is deliberately out

| In scope (built) | Out of scope (and why) |
|---|---|
| 9 plant guides with cited sources | Photography (kept to SVG art for offline size and licensing) |
| 10-step learning path, 8 lessons, 1 quiz | Adaptive/AI tutoring (needs a backend, data, and evaluation) |
| XP, streak, completion state | Leaderboards or social features (needs accounts and moderation) |
| Local-only progress | Cloud sync (would require a server and data protection work) |
| Light finder, harvest reference, checklist | Crop calendar by agro-ecological zone (needs regional data and validation) |
| Installable PWA + offline shell | Native Android/iOS builds (adds store overhead for no feature gain here) |
| English UI | Bemba/Nyanja/Tonga localisation (needs translation and review) |
| Sources + verification flags | Agronomist sign-off (recommended next step, not claimed) |

This table is defence gold: it converts "you didn't do X" into "X was scoped out for these reasons, and here is where it sits in future work".

---

## 7. Feature-by-feature walkthrough

✅ Thirteen screens/routes. Below, each feature with **what the user sees**, **what it does technically**, and **the defence point**.

### 7.1 Welcome screen — route `/`

Outside the main layout, full-bleed. Introduces the premise with the mascot, a "what you can grow" strip (vegetables, herbs, fruit trees, small spaces welcome), and three value cards: **match the plant to your light**, **learn one small step at a time**, and **keep the guide in your pocket** (install + offline + progress on your device). Then a primary call to action into the app. The footer reads "Independent student prototype · Zambia · 2026".

- **Defence point:** the first screen makes the product's three promises before asking for anything: it fits your space, it teaches in steps, and it works without a signal.

### 7.2 Home / dashboard — route `/home`

Time-aware greeting ("Good morning"), the current date in `en-GB` format, a **daily field note**, a "continue where you left off" card pointing at the next unlocked step, quick links to the other sections, and a compact progress summary (steps completed, XP, streak).

- **Daily field note** is chosen deterministically: the day index (`floor(now / 86,400,000)`) modulo 4 picks one of four notes. Same note for everyone that day, changes at local midnight, needs no storage and no network.
- **Defence point:** this is a genuine algorithm choice, not a random tip. It is reproducible and testable, and it never shows the same note twice in a row within a four-day cycle.

### 7.3 Library — route `/library`

All nine plants as cards (generative SVG art + name + botanical name + one-line "best for"). Category filters: All, Fruit trees, Vegetables, Herbs. A search box matches against name, botanical name, category, tagline, and "best for" text, case-insensitively. Results count is announced politely. Empty state offers a reset.

- **Defence point:** two retrieval paths — browse by category for someone who does not know what they want, search for someone who does. At nine records the linear scan is trivially fast; the design is ready for more.

### 7.4 Plant details — route `/plant/:plantId`

Hero art, quick facts (light, water, container size, time to harvest), the local note, and entry points to the planting and care screens. Unknown IDs fall through to the not-found screen.

- **Defence point:** the guide is split into *decide* (details), *do* (planting), and *maintain* (care), because those happen at different times.

### 7.5 Planting guide — route `/plant/:plantId/planting`

A materials checklist (interactive, with a progress bar), then five numbered steps with detail, then a closing tip.

- ⚠️ The checklist is **component state only** — it resets when you leave the screen. That is a deliberate simplification (it is a shopping list you use once), but say so if asked rather than being caught by it.

### 7.6 Care guide — route `/plant/:plantId/care`

Four care notes, each tagged with a kind (`sun`, `water`, `soil`, `prune`, `watch`, `container`) that maps to an icon, plus general guidance. This is the "ongoing maintenance" surface.

### 7.7 Small space — route `/small-space`

A three-level light finder: **Full sun** (6+ hours, suggests tomato, beans, basil, pomegranate), **Part sun** (3–6 hours or dappled, suggests mint, kale, basil), and **Bright shade** (mostly shade, suggests mint and is honest that most food crops want more sun). Selecting a level shows which crops suit it and why, plus container-volume bands:

- Herbs: roughly 5–10 litres
- One vegetable: roughly 12–20 litres
- Dwarf fruit tree: roughly 30–60 litres

Plus practical notes on drainage holes, saucers, weight, and watering frequency in containers.

- **Defence point:** this is the screen that makes the "small space" claim real. It converts space and light into a plant decision.

### 7.8 Growth — route `/growth`

A five-stage tomato demonstration driven by buttons — "A small beginning", "The first green signal", "Building the engine", "The promise of fruit", "The harvest approaches" — each with a stage illustration, what is happening, and what to do. Visiting all five marks the "growth" step complete and awards 15 XP once.

- ⚠️ **Important honesty point:** this is a *teaching sequence*, not a simulation or a harvest-date predictor. It does not model temperature, day length, or variety. Say that before the panel says it.
- ⚠️ The per-stage "visited" highlighting is session state; the completion and XP persist. After a reload, the tabs look fresh but the step stays completed.

### 7.9 Harvest — route `/harvest`

A crop switcher across all nine crops (a button group labelled "Choose a crop"), each listing four harvest signs plus pick-and-store guidance. Pick methods are keyed by plant art type, so related crops share consistent advice.

- **Defence point:** harvest is where beginners waste food — picking too early, too late, or damaging the plant. It gets its own screen and its own lesson slot in the path.

### 7.10 Quiz — route `/quiz`

Six multiple-choice questions with immediate feedback and an explanation after each answer. Final score screen with pass/fail, best score, and a retry option. Pass mark is 4 out of 6 (two-thirds). Passing the first time awards 40 XP and marks the quiz step complete; later passes award nothing.

- **Defence point:** retrieval practice with feedback, low stakes, unlimited retries. The XP is a one-time nudge, not a farming incentive.

### 7.11 Lesson — route `/lesson/:lessonId`

Eight lessons, each with 2–3 short notes, one inline check question, feedback with an explanation, and a completion panel awarding XP. Locked lessons redirect rather than render.

- **Defence point:** microlearning — the path labels lessons at around two minutes, which is the unit that survives a commute.

### 7.12 About — route `/about`

Project explanation, the **assumptions behind the content**, a **"What to ask before you plant"** section (the questions a grower should put to a local nursery or extension officer), a deduplicated list of sources (10 unique URLs), a progress reset with a confirmation dialog, and version information ("prototype v1.0").

- **Defence point:** this screen is your ethics and honesty statement inside the product. It also means the app never presents itself as more certain than it is.

### 7.13 Not found — route `*`

Friendly dead end with a route back to Home. Matters because hash routing can be mistyped.

### 7.14 Cross-cutting features

- **Install prompt** — captures `beforeinstallprompt`, shows an install button, hides it when already installed (standalone display mode), and gives manual "Add to Home Screen" instructions on iOS, which does not fire the event.
- **Progress bar** — reusable, with proper ARIA progressbar semantics.
- **Scroll reveal** — sections fade in via `IntersectionObserver`, with a `MutationObserver` so newly rendered cards are also observed. Disabled entirely under `prefers-reduced-motion` or when the API is missing.
- **Scroll manager** — restores top-of-page on route change and honours hash anchors.
- **Skip link + focus management** — jump to main content, with `tabIndex={-1}` on `<main>` so focus actually lands.
- **Reset flow** — native `<dialog>` with `showModal()`, explicit confirmation, and a full return to defaults.

---

## 8. The domain knowledge inside the app

🧠 You will be asked content questions, not just code questions. This section is the horticulture you must be able to defend. Everything here is written in the app's own terms.

### 8.1 The three basics the app teaches first

1. **Light.** Watch the spot across a day before planting. Most food crops want 4–6 hours of direct sun; fruiting crops (tomato, fruit trees) want 6–8; leafy crops and mint tolerate part shade. "Full sun" in a courtyard usually means the middle of the day, not morning only.
2. **Drainage.** Every container needs holes; a saucer must not hold standing water. Roots in waterlogged soil suffocate and rot, and this kills more container plants than under-watering.
3. **Steady watering.** Check a few centimetres down with a finger before watering. Water slowly at the base until it runs out the bottom, preferably in the morning. Wet leaves overnight invite disease.

### 8.2 Containers and volumes

| Crop | Suggested container | Spacing / support |
|---|---|---|
| Mint | 8–10 L | 20–30 cm; keep contained, it spreads |
| Basil | 5–8 L | 20–25 cm |
| Kale | 15–20 L | ~30 cm |
| Bush beans | 15–20 L | 20–25 cm; beans fix their own nitrogen |
| Tomato | 12–15 L minimum | Stake or cage; remove lower leaves near soil |
| Dwarf plum / peach | 40–50 L | 3–4 m if in ground |
| Dwarf apple | 50–60 L | Needs a compatible pollination partner |
| Pomegranate | 30–40 L | Hot, sunny, very free-draining |

### 8.3 The crop-specific points you should be able to state

- **Tomato** — full sun, rich free-draining soil, consistent water to avoid blossom-end rot and splitting; staking; watch for blight in wet weather. Cooler dry months are kinder than heavy rain.
- **Kale** — tolerant and productive; harvest outer leaves from the bottom, leaving the crown to keep growing; net early against caterpillars; afternoon shade helps in hot lowland areas.
- **Bush beans** — warm-season, reliable water, no tall support needed; pick young and often to keep pods coming.
- **Mint** — the beginner's win: shade-tolerant, thirsty, vigorous; best in its own pot because it spreads by runners.
- **Basil** — full sun, well-drained, dislikes heavy rain and cold; pinch flower buds to keep leaves coming; harvest tips, never more than about a third at once.
- **Plum** — needs winter chill, so best suited to cooler highland areas; fruit ripens by colour, firmness, scent, and the way it releases from the branch; net against birds; prune in dry weather.
- **Peach** — self-fertile, so one tree can crop; thin heavy fruit sets; watch peach leaf curl in wet weather; open-centred pruning improves light and airflow.
- **Apple** — most varieties need a **second, compatible variety** flowering at the same time to pollinate; without it you get flowers and no fruit. Keep the graft union above soil level.
- **Pomegranate** — the heat lover: full sun, sharp drainage, tolerant of dry spells once established; uneven watering causes fruit splitting; harvest when the skin colours and the fruit sounds metallic when tapped.

### 8.4 Zambian framing, stated honestly

✅ The app's position is: **plant at the start of the rains as a sensible default, then adjust for your area.** It explicitly does not claim a national calendar, because altitude, rainfall, soil, and microclimate vary too much.

Each plant has a Zambia note, and each plant record carries a `needsHumanVerification` list — the specific statements a local extension officer or experienced grower should confirm. Examples of what those flags cover: whether a given fruit tree will get enough chill hours in a particular region; whether a variety is available locally; whether a pest timing claim holds in that agro-ecological zone.

- **Defence point:** the app encodes its own uncertainty. That is stronger than pretending the content is final.

### 8.5 Where the content came from

✅ Ten unique sources are cited across the nine guides, deduplicated by URL on the About screen:

- RHS growing guides (plums, peaches, apples, tomatoes, kale, herbs, containers)
- Raintree Nursery pomegranate growing guide
- One Zambia-specific source on growing apples (a commercial home-care blog)

⚠️ **Be ready for this question:** "Only one of your sources is Zambian, and it is a blog — how is this local?" The honest, strong answer: "The horticultural fundamentals come from a recognised institution; the Zambian framing is limited and explicitly flagged per plant, and validating it with extension officers is the next step." Do not claim agronomic validation you have not done. If you can, add one or two official Zambian extension sources before the defence and say you did.

### 8.6 Learning-design principles the build maps to

Say "maps to", not "proven to improve outcomes":

| Principle | Where it appears |
|---|---|
| Microlearning | 8 short lessons, 2–3 notes each |
| Sequencing / prerequisite gating | Linear unlock on the 10-node path |
| Retrieval practice with feedback | One inline check per lesson; 6-question quiz with explanations |
| Low-stakes retry | Unlimited quiz retries; XP awarded only once |
| Progressive disclosure | Details → planting → care; path before full library |
| Scaffolding | Light finder and volume bands turn an open question into a choice |
| Light gamification | XP, streak, completion badges — no competition, no punishment |
| Reducing cognitive load | One decision per screen; short paragraphs; plain language |

---

## 9. System architecture

### 9.1 Shape

```
┌──────────────────────────────────────────────────────────────┐
│  Static hosting (HTTPS)  —  index.html + hashed JS/CSS + PWA │
└───────────────────────────────┬──────────────────────────────┘
                                │ first load, then Service Worker cache
┌───────────────────────────────▼──────────────────────────────┐
│  React 19 single-page application (client-side rendering)    │
│                                                              │
│  main.tsx → <App/> → <HashRouter>                            │
│                        ├── /            Welcome (no layout)   │
│                        └── AppLayout (header, main, bottom nav)│
│                              ├── 12 routed screens           │
│                              └── shared components            │
│                                                              │
│  <GameProvider>  ── ProgressState + actions ── localStorage   │
│  Typed content modules (plants, lessons, path, quiz)          │
│  Hand-written CSS design system (~7,000 lines)                │
└──────────────────────────────────────────────────────────────┘
```

✅ **Layers, in order of dependency:**

1. **Entry** — `src/main.tsx` mounts React into `#root` and imports the global stylesheet.
2. **Provider** — `GameProvider` loads progress once, exposes state and actions, and writes on every change.
3. **Routing** — `HashRouter` with 13 routes; `/` renders outside the app shell.
4. **Layout** — `AppLayout` supplies skip link, header, `<main>`, bottom navigation.
5. **Screens** — one component per route, responsible for composition and local UI state.
6. **Components** — presentational and behavioural pieces (cards, path, art, install, reveal).
7. **Data** — typed TS modules, the de facto content layer.
8. **Styling** — one stylesheet with custom properties, breakpoints, and reduced-motion handling.

### 9.2 Data flow

- **Content** flows one way: typed modules → screens → DOM. It is read-only at runtime.
- **Progress** flows: user event → context action → state update → `useEffect` write to localStorage → re-render of subscribers.
- **Ephemeral UI state** (open filters, quiz answers in progress, checklist ticks, growth tab) stays in component state and is intentionally not persisted.
- **No network calls at runtime.** No `fetch`, no XHR, no third-party scripts, no remote fonts. Verified by inspection of `src/`.

### 9.3 Architectural pattern

It is a **layered client-side application with a single shared state container**, closest to a small Flux/Context architecture:

- one source of truth for persistent state;
- pure-ish action functions that derive the next state;
- components that read state and dispatch intent;
- content separated from presentation;
- no side effects outside persistence.

### 9.4 Why no backend is an architecture decision, not a shortcut

| Requirement | Consequence |
|---|---|
| Works offline in low-connectivity settings | Content must ship with the app; no server dependency |
| No accounts, minimal personal data | No identity, no auth, no user table, no breach surface |
| Zero hosting cost for a student project | Static hosting only |
| Fast first interaction | No API round trips or loading states |
| Deterministic, testable behaviour | All logic is local and synchronous |

The cost is stated plainly: **no sync, no multi-device, no server-side backup, no remote content updates without a new build.**

---

## 10. Data model

### 10.1 Persistent state

✅ One record, key `orchard-home-gnome-progress-v1`, with a `version: 1` field for future migrations.

```ts
interface ProgressState {
  version: number;               // schema version, currently 1
  xp: number;                    // total experience points
  streak: number;                // consecutive active days
  lastActiveDate: string | null; // 'YYYY-MM-DD' local time, or null before any activity
  completedLessons: string[];    // lesson ids, plus 'quiz' and 'growth' when done
  quizBest: number;              // highest quiz score achieved
  quizCompleted: boolean;        // quiz passed at least once
  growthStages: number[];        // stages visited: 1..5
}
```

Design notes worth defending:

- **`completedLessons` is a string array, not a map.** Small n, easy to serialise, and `includes` lookups are trivial. It also lets a non-lesson step (`quiz`, `growth`) share the same completion mechanism.
- **`quizBest` is monotonic** — retakes can never lower it.
- **`quizCompleted` exists alongside the `'quiz'` entry in `completedLessons`.** That is deliberate redundancy: XP uses the boolean, while unlocking and progress use the array. The only way they can disagree is a hand-edited record.
- **Dates are local `YYYY-MM-DD` strings**, not timestamps or UTC. Streaks are a human-calendar concept; using UTC would break for users whose evening is the next UTC day.
- **`version` exists even though nothing migrates yet.** Adding it later would mean guessing at old records; adding it now is free.

### 10.2 Loading and validation

✅ The loader is defensive by design:

1. No stored value → return defaults (first run is not an error).
2. `JSON.parse` inside `try/catch` → corrupt JSON returns defaults, never crashes the app.
3. Per-field type guards: `xp` and `streak` are floored at zero with `Math.max`; `completedLessons` must be an array and is filtered to strings; `growthStages` must be an array and is filtered to numbers; `quizBest` must be a number; `lastActiveDate` must be a string or becomes `null`.
4. Missing fields fall back individually, so a partial record still yields a usable state.
5. Saves are wrapped in `try/catch` too — private-browsing quota errors degrade to session-only progress instead of breaking the UI.

⚠️ Two honest caveats to state before anyone audits the code: numeric values are floored but **not range-checked**, so a hand-edited `quizBest` of 99 or a `growthStages` value outside 1–5 is accepted on load (the growth action itself does validate on write); and `version` is always stamped as `1` without being compared to the stored value, so there is no real migration path yet. Both are fine for a single-player prototype and would need tightening if progress were ever trusted by a server.

- **Defence point:** this is the project's data-integrity story. There is no server to validate against, so the client validates its own persisted data on every load.

### 10.3 Plant content model

✅ `Plant` (one record per crop) groups fields as:

| Group | Fields |
|---|---|
| Identity | `id`, `name`, `botanicalName`, `category` (`'Fruit tree'` / `'Vegetable'` / `'Herb'`) |
| Positioning | `tagline`, `summary`, `bestFor`, `difficulty` (`'Easy'` / `'Medium'` / `'Patient'`) |
| Quick facts | `sun`, `water`, `space`, `container`, `harvestTime`, `season` |
| Visual identity | `palette` (background, foliage, foliageLight, fruit, fruitLight, pot), `art` (which SVG template) |
| Guidance | `materials[]`, `steps[]` (`title` + `body`), `care[]` (`title` + `body` + `kind`), `harvestSigns[]`, `tip` |
| Localisation & trust | `zambiaNote`, `sources[]`, `needsHumanVerification[]` |

The `palette` + `art` pair is what makes the illustration system work: **five art templates** (tree, tomato, kale, bean, herb) are parameterised by colour, so nine distinct-looking plants come from five drawings and zero image files.

### 10.4 Learning content model

```ts
interface PathNode {
  id: string;                 // matches a lesson node, or 'quiz' / 'growth'
  type: 'story' | 'plant' | 'skill' | 'quiz' | 'demo' | 'harvest';
  title: string;
  shortTitle: string;
  description: string;
  duration: string;           // display copy, e.g. '2 min'
  xp: number;
  route: string;              // '/lesson/intro', '/quiz', '/growth', ...
  accent: 'leaf' | 'sun' | 'berry' | 'sky' | 'clay';
  icon: string;               // seed | tomato | pot | mint | quiz | growth | kale | plum | apple | basket
}

interface LessonContent {
  nodeId: string;             // joins to PathNode.id
  guidePlantId?: string;      // optional linked plant guide
  kicker: string;
  intro: string;
  notes: { title: string; body: string }[];
  check: { question: string; options: string[]; correctIndex: number; explanation: string };
  finishMessage: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;       // index into options
  explanation: string;
}
```

✅ Relationship: `learningPath` is the ordered spine (10 nodes); `lessonContent` holds the 8 teachable lessons; quiz and growth are path nodes served by their own screens. `isLessonUnlocked` and `pathProgress` both work off `learningPath`, so the path is the single source of ordering truth.

---

## 11. Business logic and algorithms

### 11.1 Sequential unlocking

✅ Rule: node at index *i* is unlocked if *i* = 0, or if the previous node's id is in `completedLessons`. Completed nodes are always open. Anything else is locked.

```
unlocked(id):
  i = learningPath.findIndex(node => node.id === id)
  if i <= 0: return true
  return completedLessons.includes(learningPath[i - 1].id)
```

- Cost: O(n) with n = 10, run on render. No indexing complexity justified.
- **Enforcement is on the lesson route**, which redirects when locked. Library, harvest, small-space, quiz, and growth remain directly reachable by design — the path is a recommended sequence, not a prison. The path screen even says the guides stay open.
- **Defence answer if challenged:** "The lock exists to protect a beginner from starting in the middle, not to restrict access to information. Gating the reference content would have made the app worse."

### 11.2 XP award rules

✅ Per node:

| Node | XP |
|---|---|
| Introduction | 10 |
| Tomato | 20 |
| Small space | 20 |
| Mint | 15 |
| Quiz | 40 |
| Growth | 15 |
| Kale | 20 |
| Plum | 25 |
| Apple | 30 |
| Harvest | 25 |
| **Total available** | **220** |

- XP is awarded **once per step**. `completeLesson` returns early if the id is already in `completedLessons`, so replays cannot farm points.
- The quiz is the single largest award (40) because it is the only step that verifies recall across the whole path.
- **Defence answer:** XP weights completion, not speed or correctness beyond the pass mark. There is no penalty for a wrong answer, which matters for a beginner audience.

### 11.3 Streak state machine

✅ On a completion event (lesson completion, first quiz pass, growth completion):

| Condition on `lastActiveDate` | New streak |
|---|---|
| today | unchanged (already counted today) |
| yesterday | `streak + 1` |
| anything else / empty | `1` |

`lastActiveDate` is then set to today. Dates are local-time day keys.

- ✅ **Honest gap:** opening the app does not advance the streak — only a completion does. That is defensible (a streak should mean "did something"), but it means the label must not promise "open daily". If asked, say exactly that.
- ✅ **Honest gap:** the streak trusts the device clock. There is no server time to check against, and no reward beyond a number, so the incentive to cheat is negligible.

### 11.4 Quiz scoring

✅ Six questions, each worth one point. Pass threshold is computed as `ceil(total × 2/3)` = **4 of 6**. One retake-friendly detail: `quizBest` keeps the maximum.

- A first pass sets `quizCompleted`, appends `'quiz'` to `completedLessons`, advances the streak, and awards 40 XP. Later passes only raise `quizBest` — no XP, no streak change.
- A failed attempt stores nothing except an unchanged best score.
- ⚠️ The display constant `QUIZ_PASS_MARK = 4` and the computed threshold agree today. If the question bank grows, the computed threshold adapts automatically but the displayed copy would need updating. Know this if someone audits the code.

### 11.5 Growth demonstration completion

✅ Stage visits are stored as an array of integers 1–5. When all five are present, the step is marked complete and 15 XP is awarded once. Invalid stage numbers are rejected by a guard and by the loader's sanitiser.

- Set semantics are implemented with `includes`, which is fine for five items and avoids duplicate entries.

### 11.6 Daily field note rotation

✅ `dayIndex = Math.floor(Date.now() / 86_400_000)`, then `dayIndex % 4` selects one of four notes.

- Deterministic: same day, same note, for every user.
- No storage, no network, no hydration mismatch.
- Changes at **UTC** day boundaries, not local midnight, because the epoch division is UTC — a small, honest imperfection. It is worth mentioning before anyone notices: a local-midnight version would need the local date, which the app already computes for streaks.

### 11.7 Library filter and search

✅ Category is an exact match on `plant.category`; search is a case-insensitive substring test over name, botanical name, category, tagline, and best-for text. Results are `filter(...)` over an array of nine. The visible count is announced through a polite live region; the empty state offers a clear reset.

- At this size, no debouncing, indexing, or fuzzy matching is warranted. If the library grew to hundreds, the answer is a precomputed lowercase search string and possibly a worker — say that as future work, not as a defect today.

### 11.8 Derived values

✅ Progress is `completedLessons`-based: `pathProgress` counts completed nodes over `learningPath.length` (10), so the bar reaches 100% only after the final step. XP, streak, and completion are stored; progress percentages, next-step selection, and unlock states are derived on render and never persisted. That avoids stale, contradictory copies.

---

## 12. Technology choices and why

### 12.1 Stack summary

| Layer | Choice | Version ✅ |
|---|---|---|
| UI library | React + React DOM | 19.3.1 |
| Routing | react-router-dom (`HashRouter`) | 7.18.5 |
| Language | TypeScript | ~7.0.2 |
| Build tool | Vite + `@vitejs/plugin-react` | 8.3.5 / 6.1.2 |
| PWA | vite-plugin-pwa (Workbox) | 2.0.0 |
| Icons | lucide-react | 1.66.0 |
| Linting | oxlint | 1.89.0 |
| Styling | Hand-written CSS (custom properties, no framework) | — |
| Fonts | Fraunces + Nunito Sans, self-hosted WOFF2 | — |

### 12.2 React 19 — justification

- Component model fits a screen-per-route, data-driven content app.
- Huge ecosystem and documentation, which matters for a project that must be explainable and maintainable.
- Hooks give local UI state and effects without a state library.
- Context is sufficient for one small global object; Redux/Zustand would be unjustified ceremony.
- **Counter-question you should expect: "Why not plain HTML/CSS/JS?"** Answer: the app has 13 routes, shared layout, a persisted state machine, and repeated card/path/art components. Plain JS would mean hand-rolling routing and re-rendering, which is more custom code to defend, not less. React is the smaller total system here.

### 12.3 TypeScript — justification and an honest caveat

- Content is data-heavy; interfaces catch malformed plant/lesson records at build time.
- Renaming a field surfaces every use site.
- `tsc -b` runs as part of `npm run build`, so a type error fails the build rather than shipping.
- ✅ There is **no `any`**, no `@ts-ignore`, and no `@ts-expect-error` anywhere in `src/`.
- ⚠️ **Caveat to state before you are asked:** `strict` is **not** enabled in `tsconfig.app.json`. Type checking is real but not maximal; enabling `strict` is a listed hardening step. Saying this yourself is far better than being caught claiming "fully strict TypeScript".

### 12.4 Vite — justification

- Instant dev server with HMR.
- Production build emits hashed assets, which makes long-term caching safe.
- First-class PWA plugin, and the build output reports gzip sizes.
- Modern target (`es2022`) keeps output small for current phones without transpiling for a decade of old browsers.

### 12.5 HashRouter — justification

✅ Routes are hash-based (`./#/home`, `#/plant/tomato`).

- Static hosting with **no server rewrite rules** works: a deep link never asks the server for `/plant/tomato`, so there is no 404 to configure.
- Combined with `base: './'`, the app can be served from a subfolder or opened from a static file host without path assumptions.
- Works naturally with the PWA `navigateFallback` to `index.html`.
- **Trade-off:** URLs contain `#`, which is less pretty and slightly worse for SEO. For an app whose content lives behind a hash and which is not a marketing site, that is acceptable.
- **Expected question: "Why not BrowserRouter?"** Because it requires host configuration (rewrite all paths to `index.html`) and breaks on naive static hosting. HashRouter removes an entire class of deployment failure for a student project.

### 12.6 localStorage instead of a database

- The only persistent data is a handful of scalars and short arrays — well under 1 KB.
- Synchronous, universally supported, no dependency, no network, no privacy exposure.
- **Expected question: "What about security of localStorage?"** It is not a security boundary and is readable by any script on the origin. There is nothing sensitive stored: no name, no email, no location. The worst case is a tampered XP number in a single-player learning app.
- **Expected question: "What happens in private browsing?"** Writes may throw; they are caught, and the app continues with in-memory progress for that session.
- **Expected question: "What if the user clears site data?"** Progress is lost. This is disclosed in the About screen and in the README.

### 12.7 PWA instead of a native app

| Factor | PWA | Native |
|---|---|---|
| Install | Add to Home Screen, no store | Store listing, review, fees |
| Updates | Automatic on next load | Store release cycle |
| Offline | Service worker precache | Bundled |
| Size | ~1 MB cached | Tens of MB |
| Device APIs | Limited | Full |
| Effort for one student | One plugin + manifest | Two codebases or a cross-platform toolchain |

The app needs none of the native-only APIs. The PWA path delivers install + offline with the stack already in use.

### 12.8 No CSS framework

- The design is specific (warm paper background, botanical palette, hand-drawn art). A utility framework would add a dependency and a build step while still needing custom CSS for the distinctive parts.
- Custom properties give a real token system: colours, spacing, radii, shadows, page width.
- Cost: ~7,000 lines of CSS in one file is large. **Say this honestly:** it works and is organised by section, but splitting it per component or adopting CSS Modules would improve maintainability.

### 12.9 Self-hosted fonts

✅ Two families, WOFF2, served from the app: Fraunces (display serif) and Nunito Sans (body).

- No Google Fonts request → no third-party data leakage, no dependency on an external host, and fonts work offline.
- Cost: ~117 KiB of font files in the precache. Acceptable for two families with the weights actually used.
- `font-display: swap` is set so text paints immediately rather than waiting.

### 12.10 oxlint

- Very fast (353 ms over 34 files in this environment), zero-config-ish, and enforces React rules that matter here — `rules-of-hooks` as an error.
- ✅ Current result: **0 warnings, 0 errors**.
- It is a linter, not a type checker, so it complements `tsc` rather than replacing it.

---

## 13. Progressive Web App and offline design

### 13.1 Configuration ✅

| Setting | Value | Why |
|---|---|---|
| `registerType` | `autoUpdate` | Users get fixes without a manual update prompt |
| Strategy | `generateSW` (Workbox) | Simple precache-first app with no runtime API |
| `globPatterns` | js, css, html, svg, png, woff2 | Everything the app needs to render |
| Precache | 19 entries, ~680 KiB | All shell + content + fonts + icons |
| `navigateFallback` | `index.html` | Offline deep links still boot the SPA |
| `start_url` | `./#/home` | Opens on the dashboard when installed |
| Display | `standalone` | No browser chrome when installed |
| Theme / background | `#1f5d43` / `#fbf7ee` | Matches the UI; avoids a white flash |
| Icons | 192, 512, maskable 512 | Android adaptive icon support |
| `cleanupOutdatedCaches`, `clientsClaim`, `skipWaiting` | enabled | Clean upgrades, immediate control |

### 13.2 What offline actually means here

- **First load requires a connection** (or a local server). After that, the service worker serves the app shell and all assets from cache.
- **Every feature works offline**, because there are no runtime network calls at all — including search, lessons, quiz, and progress.
- **Progress is unaffected** by connectivity; it never leaves the device.
- ✅ I verified the build emits `dist/sw.js`, `dist/workbox-*.js`, `dist/registerSW.js`, and `dist/manifest.webmanifest`, with 19 precached entries reported by the build.

### 13.3 Honest caveats

- A service worker requires **HTTPS or localhost**. Opening `index.html` directly from the filesystem will not register one.
- `autoUpdate` + `skipWaiting` means a new version can take control while a session is open. For this app the risk is cosmetic (a screen re-renders with new copy), not data loss, because state is separate from assets.
- iOS Safari supports installation but does not fire `beforeinstallprompt`, so the app shows manual instructions instead of a button.
- Offline-first means content updates require a new deployment — there is no remote content channel.

---

## 14. Interface and design system

### 14.1 Visual language ✅

- **Palette:** deep green primary (`#1f5d43`), warm paper background (`#fbf7ee`), with leaf, sun, berry, sky, and clay accents. Earthy and botanical rather than corporate.
- **Type:** Fraunces for headings (warm, slightly old-fashioned, garden-book feel), Nunito Sans for body (highly legible at small sizes).
- **Art:** hand-written inline SVG — a gnome with multiple poses and five plant templates parameterised by palette. No raster images except app icons.
- **Shape and depth:** generous radii, soft shadows, card-based layout.

### 14.2 Why SVG art instead of photographs

| SVG | Photos |
|---|---|
| A few KB total | Hundreds of KB to MBs |
| Scales crisply on any screen | Needs multiple resolutions |
| No licensing questions | Needs licensed or original images |
| Works offline and in precache cheaply | Bloats the cache |
| Consistent style across nine crops | Hard to source consistently |

**Be honest:** photographs would be more informative for identifying plants and pests. The art is a deliberate trade-off for size, licensing, and offline budget. `useId` is used for unique gradient IDs so repeated SVGs do not collide.

### 14.3 Layout and responsiveness ✅

- Mobile-first, single column on phones, expanding to multi-column card grids on wider screens.
- Five breakpoints: **1180, 1050, 940, 760, 520 px**, plus a reduced-motion block.
- Bottom navigation on small screens (thumb reach); header navigation on larger ones.
- Maximum page width and readable measure caps (`~64ch`) so lines do not run long.
- Minimum supported width: 320 px.

### 14.4 Content and tone

- Plain English, second person, short sentences, no jargon without explanation.
- The mascot is warm and non-judgemental; failure is treated as normal ("plants die; here is what to check").
- Numbers are concrete (litres, centimetres, hours) because vague advice is unusable.
- Every plant names its sources, and the About screen lists the content's assumptions — the interface itself carries the epistemic honesty.

---

## 15. Accessibility

✅ Implemented features, each of which you should be able to point to:

| Feature | Implementation |
|---|---|
| Skip link | First focusable element; jumps to `#main` |
| Focus target | `<main id="main" tabIndex={-1}>` so focus actually moves |
| Landmarks | `header`, `nav`, `main`, `footer` semantics |
| Visible focus | Global `:focus-visible` outline; checklist rows highlight when their input is focused |
| Progress semantics | `role="progressbar"` with `aria-valuenow/min/max` and a label |
| Toggle state | `aria-pressed` on selectable option buttons |
| Live updates | Polite live regions for quiz feedback, library result counts, and status messages |
| Dialog | Native `<dialog>` with `showModal()`, labelled by its heading, Escape to close |
| Decorative art | `aria-hidden="true"` on ornamental SVGs, with text alternatives where the art carries meaning |
| Screen-reader text | `.sr-only` utility for context that is visual-only |
| Reduced motion | CSS block collapses animation/transition durations; `ScrollReveal` also checks the media query and the API before enabling |
| Keyboard | All interactive controls are native `button`/`a`/`input`; no click-only divs |
| Contrast | Dark green on warm off-white for body text; accent colours used for large text and shapes |

⚠️ **What is not claimed:** no formal WCAG audit, no automated axe/Lighthouse accessibility score recorded, and no testing with screen-reader users. If asked "is it accessible?", answer: "It implements keyboard, focus, live-region, dialog, and reduced-motion support, but it has not been formally audited — that is future work." That is a complete and credible answer.

---

## 16. Performance and build measurements

### 16.1 Commands ✅

| Command | Result |
|---|---|
| `npm run build` (`tsc -b && vite build`) | **Exit 0**, "✓ built in 10.01s" |
| `npm run lint` (`oxlint`) | **0 warnings, 0 errors**, 34 files, 116 rules, 353 ms |

### 16.2 Production output ✅

| Artifact | Raw | Gzip |
|---|---|---|
| `index-*.js` | 440.53 kB | 131.10 kB |
| `index-*.css` | 94.80 kB | 17.80 kB |
| Fraunces WOFF2 | 67.30 kB | — (already compressed) |
| Nunito Sans WOFF2 | 49.64 kB | — |
| PWA precache | 19 entries | 680.54 KiB total |

Also emitted: `sw.js`, `workbox-*.js`, `registerSW.js`, `manifest.webmanifest`, favicon set, and three PWA icons.

### 16.3 What those numbers mean

- **~131 kB of gzipped JavaScript** is the main cost. It is a single chunk — all routes are in one bundle. Route-level code splitting would cut the first load, and it is the obvious next optimisation.
- **~18 kB gzipped CSS** is small for a design system of this size.
- **~117 kB of fonts** is the largest single asset group after JS. Both files are already Latin subsets (`fraunces-latin`, `nunito-sans-latin`), so the remaining optimisation would be dropping a weight or falling back to system fonts, not subsetting.
- **Zero runtime network requests** after load means no API latency, no loading spinners, and no failure states to design for.
- **Offline after first visit** thanks to the ~680 KiB precache.

### 16.4 Honest performance statement

I have **measurements of the build**, not field performance data. I did not run Lighthouse, did not measure LCP/CLS/INP on a real mid-range Android phone, and did not test on a slow 3G profile. Say: "The bundle is 131 kB gzipped and fully precached; I have not profiled runtime performance on low-end devices, which is a limitation." Do not claim a Lighthouse score you have not recorded.

---

## 17. Security and privacy

### 17.1 Attack surface

✅ The app is static files plus client-side JavaScript. There is **no server, no API, no authentication, no database, and no user-generated content**, which removes most classic vulnerability classes: SQL injection, broken access control, session fixation, server-side request forgery, credential stuffing.

### 17.2 Specific controls and checks

| Concern | Status |
|---|---|
| Cross-site scripting | ✅ React escapes interpolated content by default; **no `dangerouslySetInnerHTML`, no `innerHTML`, no `eval`** anywhere in `src/` |
| Untrusted input | ✅ There is no free-text input that is stored or rendered as markup; the only inputs are filters and checkboxes |
| Persisted data tampering | ⚠️ localStorage is editable by the user. Accepted: single-player progress with no reward, no privilege, no other user affected |
| Data leakage | ✅ No analytics, no third-party scripts, no remote fonts, no cookies; nothing is transmitted |
| Outbound links | ✅ External source links use `target="_blank"` with `rel="noreferrer"` |
| Secrets | ✅ No API keys, tokens, or credentials in the codebase |
| Supply chain | ⚠️ ~443 package entries in the lockfile. Not audited in this session; `npm audit` and Dependabot are the recommended controls |
| Transport | ⚠️ HTTPS is provided by the host, not the app. A service worker requires it |
| Content Security Policy | ⚠️ None configured. Static hosts can add one; it is a listed hardening step |
| Progress reset | ✅ Requires explicit confirmation in a modal |

### 17.3 Privacy position

The app collects **nothing**: no accounts, no personal details, no location, no usage events, no device identifiers. Progress stays in the browser's local storage for that origin. This is a defensible and unusually clean privacy posture for a data-protection conversation, and it follows directly from the no-backend architecture.

**The trade-off to state:** without analytics, the project cannot report engagement metrics (how many users returned, which screens were used). That was an explicit choice in favour of privacy and simplicity.

### 17.4 The one honest security caveat

Because progress is entirely client-side, a determined user can set their XP to any number. That is not a vulnerability in this design, because XP grants no access, no content, and no standing — but say it before someone frames it as a flaw.

---

## 18. What has actually been verified

✅ **Done, with results:**

1. **Full source review** — every screen, component, context, data module, configuration file, and the entire stylesheet.
2. **Production build** — `npm run build` completed with exit code 0 in 10.01 s, generating the JS/CSS/font/PWA artifacts listed in Section 16.
3. **Lint** — `npm run lint` reported 0 warnings and 0 errors across 34 files.
4. **PWA output inspection** — service worker, Workbox runtime, registration script, manifest, and icon set all present in `dist/`.
5. **Static inspection for risky patterns** — no `any`, no `@ts-ignore`, no `dangerouslySetInnerHTML`, no `innerHTML`, no runtime `fetch` in `src/`.

⚠️ **Not done — say so plainly:**

- **No automated tests.** There is no test runner, no test script, and zero test files. All logic verification is by reading and manual use.
- **No user study, no usability test, no SUS score, no pre/post knowledge measurement.**
- **No agronomist or extension-officer review** of the content.
- **No Lighthouse or accessibility audit**, no real-device performance profiling.
- **No cross-browser test matrix** recorded (Chromium-based development environment).
- **No deployment** to a public URL is evidenced in the repository.

**How to phrase this:** "Verification covered the build, type checking, linting, and the PWA artifacts. Functional behaviour was checked manually. The project has no automated test suite and no user evaluation, which are its two main methodological limitations."

---

## 19. Limitations and threats to validity

State these before the panel does. Each has a "so what" and a "next step".

### 19.1 Technical limitations

| # | Limitation | Consequence | Next step |
|---|---|---|---|
| 1 | No automated tests | Regressions rely on manual checking | Add Vitest + React Testing Library for unlock/XP/streak/quiz and storage sanitiser |
| 2 | localStorage only | No sync, no backup; clearing site data loses progress | Optional export/import, or an account-backed sync layer |
| 3 | Progress is per-browser | Phone and laptop do not share state | Same as above |
| 4 | Single JS bundle (440 kB raw) | Slower first load on weak networks | Route-level `lazy()` + Suspense |
| 5 | `strict` not enabled in TS | Some null/undefined classes unchecked | Enable `strict` and fix fallout |
| 6 | ~7,000-line single stylesheet | Harder to navigate and safely change | Split per component/CSS Modules |
| 7 | Streak advances only on completion | "Daily streak" label can mislead | Rename, or count app open as activity |
| 8 | Growth tab highlight is session-only | Looks reset after reload though completion persists | Persist visited stages in context |
| 9 | Materials checklist not persisted | Resets on navigation | Persist per-plant checklist if desired |
| 10 | Fixed quiz order, six items, no bank | Memorisation after retakes | Randomise from a larger bank |
| 11 | Field note rotates on UTC day | Note can change mid-evening locally | Use local date key |
| 12 | English only, hard-coded strings | Not accessible to non-English speakers | i18n extraction + translation review |
| 13 | No CSP | Weaker defence-in-depth on the host | Add CSP at the static host |
| 14 | No analytics | No engagement evidence | Consent-based, privacy-preserving metrics |

### 19.2 Content and methodological limitations

| # | Limitation | Why it matters | Next step |
|---|---|---|---|
| 15 | Content not expert-reviewed | Advice could be wrong for a specific area | Extension-officer review; resolve every `needsHumanVerification` flag |
| 16 | Only one Zambia-specific source, and it is a commercial blog | "Local" claim is thin | Add official extension/ZARI material and cite it |
| 17 | No agro-ecological zone logic | Advice is general, not site-specific | Region/altitude/rainfall inputs and a validated calendar |
| 18 | No user evaluation | Cannot claim usability or learning gains | Task-based usability with 5–8 growers + pre/post quiz |
| 19 | Growth sequence is illustrative, not a model | Could be misread as a harvest predictor | Label clearly in-app; model degree-days in future |
| 20 | No real photography | Harder to identify plants and problems | Licensed photo set with lazy loading |
| 21 | No offline content updates | Fixes require a new build | Remote content channel with versioned cache |

### 19.3 Threats to validity (the academic framing)

- **Construct validity:** XP and streak measure *engagement with the app*, not *gardening competence*. Do not present them as learning outcomes.
- **External validity:** nine crops and one climate framing do not generalise to all Zambian households or all crops.
- **Internal validity:** without a control group or pre/post measurement, any improvement a user reports cannot be attributed to the app.
- **Reliability:** no automated tests, so repeated verification depends on a human repeating the same manual steps.

---

## 20. Future work

Ordered by value-per-effort, so you can answer "what would you do with three more months?" convincingly.

**Immediate (days–weeks)**

1. Add automated tests for the core logic: unlock order, XP idempotency, streak transitions, quiz threshold, storage sanitiser.
2. Enable TypeScript `strict`; fix resulting errors.
3. Route-level code splitting to cut the initial bundle.
4. Subset fonts to Latin to reduce the precache.
5. Add a CSP and run `npm audit`.

**Short term (one semester)**

6. Expert review of all content; clear every `needsHumanVerification` flag and record who verified what.
7. Add official Zambian extension sources; replace the commercial-blog dependency.
8. Usability study with 5–8 target users: task completion, error points, SUS, plus a short pre/post knowledge quiz.
9. Lighthouse + axe audit; fix findings; test on a low-end Android device.
10. Randomised quiz drawn from a larger question bank; persist growth stage visits; rename or re-define the streak.

**Medium term**

11. Localisation into Bemba, Nyanja, and Tonga with reviewed translations.
12. Region-aware planting calendar driven by agro-ecological zone, altitude, and rainfall.
13. Optional account + sync, with a real privacy impact assessment.
14. Photo and short-video content, lazily loaded and cached on demand.
15. Content management so an extension officer can update guidance without a developer.

**Longer term**

16. Offline diagnostics: a guided symptom checklist ("yellow leaves, wet soil") rather than AI photo diagnosis.
17. Community features (shared plots, questions to an officer) — only with moderation and a backend.
18. Measure real outcomes: yield, retention, and behaviour change over a season.

---

## 21. Likely defence questions with model answers

Answer in the first person, keep it to 20–40 seconds, and stop. If you do not know, say "I did not measure that — here is how I would."

**1. What is the project about, in one sentence?**
"An offline-first web app that teaches a Zambian household to grow food in a small space — nine plant guides, a short guided learning path, and progress saved on the device with no account."

**2. What problem does it solve?**
"Fragmented, non-local, connection-dependent gardening advice, plus the friction of accounts. It packages practical guidance for small spaces into one offline app and sequences it for a beginner."

**3. Why these nine crops?**
"They cover three levels: fast wins (mint, basil, kale), medium projects (tomato, beans), and ambitious long-term projects (plum, peach, apple, pomegranate). That gives a beginner a progression rather than nine equally hard guides."

**4. How is this different from a blog or a YouTube channel?**
"Three ways: it works offline, it is structured as a sequence rather than a feed, and every claim carries its source plus an explicit list of what still needs local verification. A video cannot do the last two."

**5. What is your original contribution?**
"Not a new algorithm. It is the design and implementation of a locally framed, offline-first, account-free learning product for small-space growing, plus the content model that carries sources and verification flags alongside the advice. I am careful not to overclaim novelty."

**6. Why no database or backend?**
"Because the requirements did not need one. Content is static and ships with the app; progress is under a kilobyte and never leaves the device. A backend would add cost, latency, an account system, and a data-protection obligation, and it would break the offline requirement. The trade-off is no sync, which I state openly."

**7. Why React instead of plain HTML and JavaScript?**
"Thirteen routes, a shared layout, a persisted state machine, and repeating card/path/art components. With plain JS I would hand-roll routing and rendering, which is more custom code to maintain and defend. React is the smaller total system here."

**8. Why TypeScript?**
"The app is mostly structured content. Interfaces catch malformed plant and lesson records at build time, and renaming a field surfaces every use. The build runs `tsc` first, so type errors fail the build. One honest caveat: `strict` is not enabled yet — that is on my hardening list."

**9. Why hash routing?**
"Static hosting with no rewrite rules. A deep link never asks the server for a nested path, so there is no 404 configuration and no deployment failure mode. The cost is `#` in URLs, which matters for SEO but not for an installed app."

**10. How does offline work?**
"A service worker precaches the app shell, content, fonts, icons, and CSS — 19 entries, about 680 KiB. After the first visit there are no network calls at all, because content is compiled in, so every feature works offline. It needs HTTPS or localhost, and iOS needs a manual Add to Home Screen."

**11. How is progress stored, and what happens if it is corrupted?**
"One versioned localStorage record. On load it is parsed in a try/catch, every field is type-checked and sanitised, and anything invalid falls back to a default per field. Saves are also guarded, so a quota error in private browsing degrades to session-only progress instead of crashing."

**12. Can a user cheat their XP?**
"Yes — localStorage is editable, and there is no server. XP grants no access or privilege, so it is not a security boundary; it is a personal progress indicator. If XP ever unlocked something valuable, progress would have to be server-validated."

**13. How do you know the content is correct?**
"I cite ten sources, mostly RHS growing guides plus a pomegranate guide and one Zambian source, and each plant carries `needsHumanVerification` flags for the claims that depend on local conditions. It has not been reviewed by an extension officer yet — that is the most important next step, and I am not claiming it as validated."

**14. Your sources are not Zambian. How is this local?**
"Partly, and I am explicit about that. The horticultural fundamentals are international; the local framing is the Zambia note per plant, the seasonality caveat, and the small-space/container guidance. Strengthening the local evidence base is future work, and I would start with official extension material."

**15. What is your methodology?**
"Requirements and content research, then an iterative design-and-build prototype, then verification of the build and manual functional checks. It is a design-science-style artefact with content curation, not an experimental study. I did not run a user evaluation, so I cannot claim measured usability or learning gains."

**16. How would you evaluate it properly?**
"Task-based usability testing with 5–8 target growers — find a crop for a shady balcony, start the path, check a harvest sign — measuring completion, time, errors, and SUS. Plus a pre/post knowledge quiz for learning, an expert content review for accuracy, and Lighthouse/axe for technical quality."

**17. What was the hardest technical problem?**
"Keeping persistent state honest: one record, a schema version, defensive parsing, and idempotent XP and streak rules so replays cannot award twice. The unlock logic then becomes a simple lookup over the ordered path, which is why ordering lives in exactly one place."

**18. What are the biggest weaknesses?**
"No automated tests and no user evaluation, plus content that has not been expert-reviewed. Technically, one 440 kB bundle, a non-strict TS config, and a very large single stylesheet. I have a prioritised fix list for each."

**19. What would you do differently?**
"I would write tests alongside the game logic from the start rather than after, and I would get three or four growers to use a paper prototype before building the path, because the ordering and the XP model are product decisions that user feedback should have shaped earlier."

**20. How would this scale to thousands of users or hundreds of crops?**
"Content scales trivially — it is typed data, and the library already filters over it. The parts that would need work are the single bundle, the localStorage model if cross-device progress is wanted, and content governance so advice stays accurate. A backend would only enter for sync, accounts, or remote content updates."

**21. Is it accessible?**
"It has a skip link with real focus management, semantic landmarks, visible focus, ARIA progressbar and pressed states, polite live regions, a native dialog, reduced-motion support, and keyboard-operable controls throughout. It has not had a formal WCAG audit or screen-reader testing, which I would do next."

**22. What about data protection?**
"Nothing is collected. No accounts, no analytics, no cookies, no third-party scripts, and self-hosted fonts, so no request leaves the device. The only stored data is progress on that browser, and the user can reset it from the About screen."

**23. Which SDGs does this relate to?**
"It aligns most directly with SDG 2 (Zero Hunger) and SDG 12 (Responsible Consumption and Production), with a link to SDG 11 for urban resilience. I present that as alignment, not as demonstrated impact."

**24. What happens when a new version is deployed?**
"`autoUpdate` with `skipWaiting` and `clientsClaim` means the new service worker takes over and outdated caches are cleaned. Content updates require a new build, because there is no remote content channel."

**25. If you had one more month, what would you build?**
"Tests, an expert content review, and a small usability study — in that order. They close the two biggest gaps and they are cheap. After that, localisation and a region-aware planting calendar."

**26. Why should this be accepted as a final-year project?**
"It defines a real problem, reviews the domain, makes and justifies a coherent set of engineering decisions, delivers a working artefact that I verified builds and runs, and is explicit about what it does not prove. The limitations are documented and the next steps are prioritised."

---

## 22. Demo script

⚠️ Rehearse this. Time it. Have the app already installed and already warmed once so the service worker is active.

**Before you start:** run `npm run build && npm run preview` (or use the deployed URL), open it once, and leave it on the Home screen. Have a second tab ready with DevTools → Application → Service Workers for the offline proof.

| Time | Screen | Say |
|---|---|---|
| 0:00 | Welcome | "This is the first screen. Before asking for anything, it teaches the three variables that decide whether a plant lives: light, drainage, steady watering." |
| 0:40 | Home | "Progress, streak, and a daily field note. The note is chosen by the day index modulo four, so it is deterministic and needs no network." |
| 1:10 | Path | "Ten steps, unlocked in order. The lock exists so a beginner does not start in the middle — the reference guides stay open regardless." |
| 1:50 | Lesson (intro) | "Sixty to ninety seconds. Two notes and one check with an explanation. Completing it awards XP once and advances the streak." |
| 2:40 | Library | "Nine crops. Filter by fruit, vegetable, herb — or search. The count is announced to screen readers." |
| 3:10 | Plant detail → planting → care | "Decide, do, maintain. Materials, five steps, four care notes, four harvest signs, sources, and the specific claims still to verify locally." |
| 4:00 | Small space | "Choose your light level, get crops that fit and the container volume you need. This is what makes the small-space claim concrete." |
| 4:40 | Quiz | "Six questions, pass mark four. Immediate feedback with an explanation, unlimited retries, XP only on the first pass." |
| 5:20 | Harvest | "Harvest is where beginners lose food, so it has its own screen and its own step — colour, firmness, scent, and how the fruit releases." |
| 6:00 | Offline proof | Switch DevTools to Offline, reload. "Everything still works, because nothing is fetched at runtime." |
| 6:30 | Install + About | Show install state; About screen: "sources, the assumptions behind the content, and what still needs verification." |
| 7:00 | Close | "Verified build and lint, no automated tests and no user study — those are the next steps, and here they are." |

**If the demo breaks:** do not debug live. Say "I will show that after the session", switch to a screenshot, and keep the narrative moving. A calm recovery reads as competence.

---

## 23. Numbers you can quote

✅ All of these are from the repository or from commands run in this session.

| Fact | Number |
|---|---|
| Plant guides | 9 (4 fruit trees, 3 vegetables, 2 herbs) |
| Learning-path steps | 10 |
| Teachable lessons | 8 |
| Quiz questions / pass mark | 6 / 4 (two-thirds) |
| Maximum XP on the path | 220 |
| Largest single XP award | Quiz, 40 |
| Growth demonstration stages | 5 |
| SVG plant templates | 5, parameterised by palette |
| Unique cited sources | 10 |
| Routes | 13 |
| Source files (TS/TSX) | 32, ~6,100 lines |
| Stylesheet | ~7,000 lines, 5 breakpoints + reduced motion |
| Font families | 2, self-hosted WOFF2 (~117 KiB total) |
| Build time | 10.01 s |
| JS bundle | 440.53 kB raw / 131.10 kB gzip |
| CSS bundle | 94.80 kB raw / 17.80 kB gzip |
| PWA precache | 19 entries / 680.54 KiB |
| Lint | 0 warnings, 0 errors (34 files, 116 rules, 353 ms) |
| Automated tests | 0 |
| Runtime network requests | 0 |
| Cookies / trackers / accounts | 0 / 0 / 0 |

---

## 24. Claims to avoid, and what to say instead

| ❌ Do not say | ✅ Say instead |
|---|---|
| "It increases food security / yields." | "It is designed to support household growing; impact has not been measured." |
| "It is validated by experts." | "It is sourced and flagged for expert verification; review is the next step." |
| "It is fully accessible." | "It implements keyboard, focus, ARIA, dialog, and reduced-motion support; no formal audit yet." |
| "It is fully tested." | "The build and lint pass and behaviour was checked manually; there is no automated test suite." |
| "It works on all devices." | "It targets modern mobile browsers; installation and offline need HTTPS and service-worker support." |
| "Users love it." | "I have not run a user study yet." |
| "The streak makes users return daily." | "The streak is a motivational device that advances on completion; its effect is unmeasured." |
| "The growth screen simulates plant growth." | "It is an illustrative five-stage teaching sequence, not a growth model." |
| "AI-powered." | Nothing in the app is AI; do not borrow the term. |
| "70% of Zambians…" (unsourced) | Cite ZamStats/FAO/World Bank with a year, or omit the figure. |
| "Novel algorithm." | "The contribution is the design, content model, and offline architecture, not a new algorithm." |
| "It is production-ready." | "It is a working v1.0 prototype with a documented hardening list." |

---

## 25. Glossary

- **PWA (Progressive Web App)** — a web app that can be installed to the home screen and work offline via a service worker and manifest.
- **Service worker** — a background script that intercepts requests and serves cached assets.
- **Precache** — assets downloaded and stored at install time so they are available offline.
- **Workbox** — the library that generates the service worker's caching logic.
- **Manifest** — JSON describing app name, icons, colours, display mode, and start URL.
- **SPA (Single-Page Application)** — one HTML document; JavaScript swaps views instead of loading pages.
- **Client-side rendering** — the browser builds the UI from JavaScript rather than receiving finished HTML.
- **HashRouter** — routing that keeps the path after `#`, so the server is never asked for nested paths.
- **Context** — React's mechanism for sharing state without passing props through every level.
- **localStorage** — a synchronous key/value store in the browser, scoped to an origin, persisting until cleared.
- **Schema version** — a field recording the shape of stored data so future changes can migrate old records.
- **Idempotent** — an operation that produces the same result if repeated; here, XP is awarded only once per step.
- **Derived state** — a value computed from stored state rather than saved separately (e.g. progress percentage).
- **Optimistic UI** — updating the interface before confirmation from a server; not used here, since there is no server.
- **IntersectionObserver** — browser API that reports when an element enters the viewport (used for scroll reveal).
- **MutationObserver** — browser API that reports DOM changes (used so newly rendered cards also get revealed).
- **`aria-live`** — marks a region whose changes should be announced by a screen reader.
- **`aria-pressed`** — exposes a toggle button's on/off state.
- **`prefers-reduced-motion`** — an OS-level user setting the app honours by reducing animation.
- **Standalone display mode** — the installed app runs without browser chrome.
- **Gzip** — compression applied by the server; the number that matters for transfer size.
- **Tree shaking / code splitting** — build techniques to remove or defer code; the latter is a listed optimisation here.
- **`needsHumanVerification`** — this project's per-plant list of claims that require local expert confirmation.
- **Agro-ecological zone** — a region classified by climate and soil, which determines what grows well there.
- **Chill hours** — cumulative cold exposure some fruit trees need to break dormancy and fruit.
- **Graft union** — the join between rootstock and fruiting variety; must stay above soil level.
- **Blossom-end rot** — a tomato disorder from calcium delivery problems, usually caused by uneven watering.

---

## 26. File map

✅ For navigating your own code under questioning.

| Path | Responsibility |
|---|---|
| `package.json` | Dependencies, scripts: `dev`, `build`, `lint`, `preview`, `icons` |
| `vite.config.ts` | React plugin, relative base, PWA manifest and Workbox config, build target |
| `tsconfig*.json` | Project references; app config with unused-symbol checks and `verbatimModuleSyntax` |
| `.oxlintrc.json` | Lint plugins and rules (`rules-of-hooks` as error) |
| `index.html` | Root document, meta tags, mount point |
| `src/main.tsx` | React entry; mounts the app; imports global CSS |
| `src/App.tsx` | Router, route table, scroll manager, reveal wrapper |
| `src/contexts/GameContext.tsx` | State, storage load/save, XP, streak, quiz, growth, reset |
| `src/contexts/game-context.ts` | Context object and TypeScript types |
| `src/contexts/useGame.ts` | Guarded consumer hook |
| `src/data/plants.ts` | 9 plant records + lookup helpers + categories |
| `src/data/lessons.ts` | Learning path, 8 lessons, 6 quiz questions, pass mark |
| `src/screens/WelcomeScreen.tsx` | First-run introduction outside the app shell |
| `src/screens/HomeScreen.tsx` | Dashboard, greeting, daily note, next step, summary |
| `src/screens/LibraryScreen.tsx` | Category filter + search over plants |
| `src/screens/PlantDetailsScreen.tsx` | Quick facts, local note, entry points |
| `src/screens/PlantingGuideScreen.tsx` | Materials checklist + five steps |
| `src/screens/CareGuideScreen.tsx` | Four tagged care notes |
| `src/screens/SmallSpaceScreen.tsx` | Light finder + container volumes |
| `src/screens/GrowthScreen.tsx` | Five-stage teaching sequence |
| `src/screens/HarvestScreen.tsx` | Per-crop harvest signs and picking guidance |
| `src/screens/QuizScreen.tsx` | Six-question quiz with feedback and result |
| `src/screens/LessonScreen.tsx` | Lesson notes, check, completion award |
| `src/screens/AboutScreen.tsx` | Sources, assumptions, reset, version |
| `src/screens/NotFoundScreen.tsx` | Fallback route |
| `src/components/AppLayout.tsx` | Skip link, header, main, bottom nav |
| `src/components/AppHeader.tsx` | Branding, nav, install entry point |
| `src/components/BottomNav.tsx` | Mobile navigation |
| `src/components/LearningPath.tsx` | Path cards, lock/unlock rendering |
| `src/components/PlantCard.tsx` | Library card |
| `src/components/PlantArt.tsx` | Five parameterised SVG plant illustrations |
| `src/components/Gnome.tsx` | Mascot poses, inline SVG |
| `src/components/ProgressBar.tsx` | Accessible progress indicator |
| `src/components/PageIntro.tsx` | Shared page heading block |
| `src/components/PathIcon.tsx` | Path node icon mapping |
| `src/components/InstallButton.tsx` | Install prompt, standalone detection, iOS instructions |
| `src/components/ScrollReveal.tsx` | Intersection + mutation observers, reduced-motion aware |
| `src/index.css` | Design tokens, components, layout, breakpoints, reduced motion |
| `src/index.css` `@font-face` | Two self-hosted WOFF2 families |
| `public/` | Icons, favicon, static assets |
| `scripts/generate-icons.mjs` | Renders the SVG mark to PNG icons via headless Chrome/Edge |
| `README.md` | Project overview, features, scripts, content caveats |
| `dist/` | Build output: hashed assets, manifest, service worker |

---

## 27. A ten-slide defence outline

1. **Title** — project name, your name, supervisor, institution, date.
2. **Problem** — the information/accessibility gap; small spaces, low connectivity, no accounts. (Cite any statistics.)
3. **Objectives** — general + specific, taken from your report.
4. **Related work / gap** — blogs, YouTube, extension services, generic gardening apps; what they do not do offline or locally.
5. **Methodology** — content research → design → build → verify; note the prototype/design-science framing.
6. **The artefact** — three screenshots: Home/path, a plant guide, small space. One sentence each.
7. **Architecture** — the diagram from Section 9.1; emphasise no backend, offline, local state.
8. **Key decisions** — PWA, HashRouter, localStorage, TypeScript, SVG art; one line of justification each and one trade-off each.
9. **Verification & limitations** — build/lint results, precache numbers, and the honest list (no tests, no user study, no expert review).
10. **Future work & close** — the prioritised list; then one sentence on what the project contributes.

Keep slides visual and sparse; put the detail in what you say. Panels forgive simple slides, not a presenter reading them.

---

## 28. Final checklist

**The night before**

- [ ] `npm ci && npm run build` succeeds from a clean install.
- [ ] `npm run lint` is clean.
- [ ] `npm run preview` opens the app; do one full pass through every screen.
- [ ] Complete one lesson, pass the quiz, visit all growth stages, then reload — confirm XP and completion persist.
- [ ] Test the reset dialog and confirm it returns everything to defaults.
- [ ] Demo the offline mode once (DevTools → Offline → reload).
- [ ] Re-read Sections 19 and 24 so no limitation is a surprise.
- [ ] Check every statistic in your slides has a citation.
- [ ] Have a backup: deployed URL, local `dist/`, screenshots, and a video capture.

**In the room**

- [ ] Open on the Welcome screen, app already installed.
- [ ] Speak the one-line summary before touching the keyboard.
- [ ] Name one trade-off for every decision you present.
- [ ] Say "I did not measure that" instead of guessing.
- [ ] Close with the contribution and the next step, not with an apology.

---

*This brief describes the repository as built. It deliberately separates verified facts (✅) from items that require your own confirmation or citation (⚠️). Do not present the ⚠️ items as established findings.*
