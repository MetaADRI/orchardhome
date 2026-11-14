# Orchard Home Gnome

An offline-first gardening guide for Zambian homes. Orchard Home Gnome combines short lessons, a practical plant library, a tomato growth simulation and a harvest reference with local-storage progress.

## Features

- Guided learning path with lessons, quick checks, XP and daily streaks
- Nine plant guides covering fruit, vegetables and herbs
- Planting, care, small-space and harvest references
- Six-question knowledge checkpoint
- Installable PWA with offline app-shell caching
- Progress stored only in the browser; no account, analytics or server
- Responsive layouts, keyboard focus states and reduced-motion support

## Development

```powershell
npm install
npm run dev
```

## Checks

```powershell
npm run lint
npm run build
npm run preview
```

## PWA icons

The generated icons in `public/` can be rebuilt with:

```powershell
npm run icons
```

The icon script uses a locally installed Chrome or Edge browser to render the SVG artwork to PNG. Set `CHROME_PATH` if the browser is installed elsewhere.

## Content notes

- Guidance is general and does not claim one planting calendar for all of Zambia.
- Local altitude, rainfall, soil and nursery advice should take priority.
- The growth demo is a simulation, not a harvest-date predictor.
- Fruit-tree success depends on suitable low-chill varieties and local conditions.
- Sources used for each plant guide are listed on its detail page and in the app's About screen.

This is an original student prototype, not a commercial horticultural service.
