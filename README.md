# OrderCraft — Hero Section

A premium, cinematic hero section for the OrderCraft agency, built with React (Vite), Tailwind CSS, and GSAP.

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL. Build for production with `npm run build`.

## Structure

```
src/
  components/
    Navbar.jsx        sticky glass navbar with scroll transition
    Hero.jsx           composes the whole section, owns the GSAP intro timeline
    HeroArtwork.jsx    the logo staged in glass space: glow, orbit rings, particles, mouse tilt
    Button.jsx         primary / secondary button variants
  hooks/
    useMouseParallax.js   eased pointer tracking, reports values via callback (no re-renders)
  animations/
    heroAnimation.js      GSAP timelines: page-load intro, floating loop, breathing glow
  styles/
    hero.css           design tokens, atmosphere layers (grid/noise/vignette), keyframes
public/
  assets/
    ordercraft-logo.png
```

## Notes

- All continuous motion (floating, breathing glow, mouse tilt, orbit rings) is driven by
  `transform` and `opacity` only, so it stays on the compositor thread.
- The mouse-parallax hook never touches React state — it feeds `gsap.quickTo` setters
  directly to avoid a re-render on every animation frame.
- `prefers-reduced-motion` is respected globally in `hero.css`.
- Only the hero is implemented here, per the brief. Wire `Hero` into your page/router as needed.
