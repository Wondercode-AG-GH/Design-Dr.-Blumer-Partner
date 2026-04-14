# Tellian Capital — Premium Desktop Website

Horizontal-scrolling Swiss luxury wealth management website for Tellian Capital (formerly Dr. Blumer & Partner). Built with React 18, Vite, TailwindCSS 4, Mapbox GL JS and Motion (Framer Motion).

## Architecture

**Six sections** scroll horizontally on desktop (≥ 1024px), vertically on tablet / mobile:

1. **Hero** — Headline, intro copy, primary CTA
2. **Anlagephilosophie** — Quote reveal over full-bleed image
3. **Vermögensverwaltung** — 5-step process timeline
4. **Anlagestrategien** — Top-Down / Bottom-Up visualization
5. **Über uns** — Editorial intro + 8-portrait team filmstrip
6. **Kontakt** — Address, form, Mapbox map in modal overlay

**Breakpoints**
- Mobile: `< 768px`
- Tablet: `768 – 1023px`
- Desktop: `≥ 1024px`

**Scroll model**
- Desktop: custom lerp-based horizontal hijack (`useHorizontalScroll`)
- Tablet / Mobile: native vertical scroll with IntersectionObserver-driven fade-ins

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with your Mapbox token (see below)
cp .env.local.example .env.local   # if example exists, otherwise create manually

# 3. Start dev server
npm run dev                         # http://localhost:5173
```

## Mapbox Token

The Kontakt section uses Mapbox GL JS. A public token is required in `.env.local`:

```
VITE_MAPBOX_TOKEN=pk.eyJ1...
```

Get a free token at [account.mapbox.com/access-tokens](https://account.mapbox.com/access-tokens/). `.env.local` is gitignored — never commit your token.

After creating / updating `.env.local`, **restart the dev server** — Vite only reads env files on startup.

## Build

```bash
npm run build        # production build → dist/
npm run preview      # preview built output locally
```

## Project Structure

```
src/
  app/
    App.tsx                     # Main app, horizontal + vertical layouts
    layout.ts                   # Per-breakpoint layout tokens + SPACING system
    components/
      Navigation.tsx            # Sidebar (desktop) + hamburger (mobile)
      DotNavigation.tsx         # Bottom-center dot nav with labels
      ScrollAnimations.tsx      # ScrollFade, ParallaxText, HeroExpandingImage
      useHorizontalScroll.ts    # Lerp-based horizontal scroll hook
      useBreakpoint.ts          # Responsive breakpoint detection
      CtaButton.tsx             # Swiss-luxury ghost CTA button
      Section2Anlagephilosophie.tsx
      Section3Timeline.tsx
      Section4TopDownBottomUp.tsx
      Section4CoreSatellite.tsx
      Section5UeberTellian.tsx
      Section6Kontakt.tsx       # Includes MapOverlay (portal-rendered modal)
      Timeline.tsx
    styles/
      index.css, theme.css, tailwind.css, fonts.css
    assets/                     # Figma-exported images
  main.tsx                      # React entry
```

## Tech Stack

- **React 18** + TypeScript
- **Vite 6** — dev server and build
- **TailwindCSS 4** (via `@tailwindcss/vite`)
- **Mapbox GL JS 3** — Kontakt map
- **Motion** (Framer Motion) — UI transitions
- **Radix UI** (via shadcn/ui) — headless primitives
- **MUI** — selective components

## License / Figma Origin

Originally exported from [Premium Desktop Website Design](https://www.figma.com/design/ok8WM9qS7ROf7Ao08h0hB8/Premium-Desktop-Website-Design) via Figma Make.
