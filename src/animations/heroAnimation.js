import gsap from "gsap";

/**
 * Builds the page-load intro timeline. Everything is transform/opacity
 * driven so it stays on the compositor thread and holds 60fps.
 *
 * refs: an object of DOM node refs produced by Hero.jsx
 */
export function playIntro(refs) {
  const {
    badge,
    lines,
    paragraph,
    buttons,
    trust,
    artworkStage,
    glow,
    rings,
    particles,
  } = refs;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(badge, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(
      lines,
      { yPercent: 115, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
      "-=0.25",
    )
    .fromTo(
      paragraph,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5",
    )
    .fromTo(
      buttons,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      "-=0.45",
    )
    .fromTo(
      trust,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.35",
    )
    .fromTo(
      artworkStage,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power4.out" },
      "-=1.1",
    )
    .fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 1.2 }, "-=0.9")
    .fromTo(
      rings,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.08 },
      "-=0.9",
    )
    .fromTo(particles, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.8");

  return tl;
}

/** Continuous slow float + drift rotation for the logo wrapper. */
export function startFloating(target) {
  return gsap.to(target, {
    y: 18,
    rotate: 2,
    duration: 9,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

/** Continuous breathing glow behind the logo. */
export function startBreathingGlow(target) {
  return gsap.to(target, {
    scale: 1.08,
    opacity: 0.9,
    duration: 4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}
