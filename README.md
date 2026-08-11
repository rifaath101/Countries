# Where in the World?

A REST Countries explorer: browse all countries, search by name, filter by region, and drill into a country's details — including its border countries, which you can click through to keep exploring. Supports light and dark mode.

## Features

- **Browse** every country as a card showing its flag, population, region, and capital.
- **Search** countries by name.
- **Filter** by region via a dropdown.
- **Country detail view** with native name, population, region, sub-region, capital, top-level domain, currencies, and languages.
- **Border countries** shown as clickable pills that navigate to that country's own detail view.
- **Light/dark mode** toggle in the header.
- **Responsive layout** from mobile up through desktop.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) as the build tool and dev server
- [Tailwind CSS v4](https://tailwindcss.com/) for styling, using the CSS-first config (`@import "tailwindcss"` in `src/index.css`, no `tailwind.config.js`)
- [ESLint](https://eslint.org/) with `typescript-eslint` for linting

Country data is served from a local JSON file (`src/store/data.json`) rather than a live API call.

## Project Structure

```
src/
├── App.tsx                    # Root component; renders Header + Main
├── main.tsx                   # React entry point
├── index.css                  # Tailwind import, dark mode variant, global styles
├── components/
│   ├── Header.tsx              # Title + light/dark mode toggle
│   ├── Main.tsx                 # Fetches country data, switches between list and detail views
│   ├── CountryList.tsx        # Search, region filter, and the grid of country cards
│   └── CountryInfo.tsx        # Single-country detail view with border-country navigation
├── store/
│   └── data.json              # Local country dataset
└── types/
    └── country.ts              # Country, Currency, Language, and RegionalBlocs types
```

## How It's Built

- `Main.tsx` loads the country data on mount and holds the currently selected country in state. It renders `CountryList` when no country is selected, or `CountryInfo` for the selected country — including that country's resolved border countries (matched by `alpha3Code` against the full country list).
- `CountryList.tsx` owns the search query and region filter state, and derives the filtered set of countries to render as cards.
- `CountryInfo.tsx` renders the selected country's details and its border-country pills; clicking a pill selects that country and re-renders the detail view for it.
- Dark mode is implemented via Tailwind's class-based `dark:` variant (`@custom-variant dark` in `index.css`). `Header.tsx` toggles a `dark` class on the root `<html>` element, and components style themselves accordingly with `dark:` utility classes.

## Getting Started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # Type-check and build for production
npm run preview   # Preview the production build locally
npm run lint       # Run ESLint
```
