import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(CustomEase, DrawSVGPlugin);

// OrderCraft's signature ease: quick departure, long confident arrival.
// Registered once, reused everywhere in the transition for a consistent feel.
CustomEase.create("ocCraft", "M0,0 C0.32,0 0.14,1 1,1");

// Turn the whole thing faster/slower from one dial without touching the
// choreography below. 1 = spec durations as written (~3.7s + hold).
const SPEED = 1;
const d = (seconds) => seconds * SPEED;

/**
 * Builds (and returns, unplayed) the full 4-phase construction timeline.
 * `onCovered` fires the instant the screen is fully hidden — that's where
 * the caller should swap the route, since nothing behind the overlay is
 * visible at that point.
 */
export function buildPageTransition(refs, onCovered) {
  const {
    overlayRoot,
    contentRoot,
    wash,
    grid,
    lines,
    labels,
    node,
    logoGroup,
    logoLines,
    sweep,
  } = refs;

  const tl = gsap.timeline({ defaults: { ease: "ocCraft" } });

  tl.set(overlayRoot, { pointerEvents: "auto" });

  // ---------------------------------------------------------------
  // PHASE 1 — Deconstruction (0.8s)
  // The live page desaturates and flattens; blueprint scaffolding
  // materializes on top of it. Nothing disappears instantly.
  // ---------------------------------------------------------------
  tl.to(
    contentRoot,
    {
      filter: "grayscale(1) contrast(1.15) brightness(0.75) blur(1.5px)",
      scale: 0.97,
      duration: d(0.8),
      ease: "power2.inOut",
    },
    0,
  )
    .to(grid, { opacity: 1, duration: d(0.8), ease: "power2.out" }, 0)
    .fromTo(
      lines,
      { opacity: 0, scaleX: 0, scaleY: 0 },
      { opacity: 1, scaleX: 1, scaleY: 1, duration: d(0.5), stagger: 0.025 },
      d(0.1),
    )
    .fromTo(
      labels,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: d(0.35), stagger: 0.05 },
      d(0.3),
    );

  // ---------------------------------------------------------------
  // PHASE 2 — Blueprint collapse (0.7s)
  // Every construction line travels inward and the page compresses
  // into a single glowing node at screen center.
  // ---------------------------------------------------------------
  const phase2Start = d(0.8);

  tl.to(
    contentRoot,
    {
      opacity: 0,
      scale: 0.9,
      filter: "grayscale(1) blur(6px) brightness(0.4)",
      duration: d(0.7),
    },
    phase2Start,
  )
    .to(
      lines,
      {
        x: (_, el) => {
          const r = el.getBoundingClientRect();
          return window.innerWidth / 2 - (r.left + r.width / 2);
        },
        y: (_, el) => {
          const r = el.getBoundingClientRect();
          return window.innerHeight / 2 - (r.top + r.height / 2);
        },
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        duration: d(0.6),
        stagger: 0.02,
      },
      phase2Start,
    )
    .to(grid, { opacity: 0, duration: d(0.5) }, phase2Start)
    .to(labels, { opacity: 0, duration: d(0.25) }, phase2Start)
    .to(
      node,
      { scale: 1, opacity: 1, duration: d(0.6), ease: "power3.out" },
      phase2Start + d(0.15),
    )
    .to(wash, { opacity: 1, duration: d(0.35) }, phase2Start + d(0.35))
    .call(() => onCovered?.(), null, phase2Start + d(0.7));

  // ---------------------------------------------------------------
  // PHASE 3 — Logo formation (1.0s + ~300ms hold)
  // The construction node draws the OrderCraft mark stroke by stroke.
  // ---------------------------------------------------------------
  const phase3Start = phase2Start + d(0.7);

  tl.to(logoGroup, { opacity: 1, duration: d(0.15) }, phase3Start)
    .fromTo(
      logoLines,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: d(0.7),
        stagger: 0.045,
        ease: "power2.inOut",
      },
      phase3Start,
    )
    .to(
      node,
      { scale: 1.3, opacity: 0.5, duration: d(0.5), ease: "power2.inOut" },
      phase3Start + d(0.15),
    )
    // soft glow pulse + light sweep once the mark is complete
    .to(
      logoGroup,
      {
        filter: "drop-shadow(0 0 18px rgba(168,85,247,0.85))",
        duration: d(0.3),
      },
      phase3Start + d(0.7),
    )
    .fromTo(
      sweep,
      { xPercent: -160, opacity: 0 },
      { xPercent: 160, opacity: 1, duration: d(0.5), ease: "power1.inOut" },
      phase3Start + d(0.65),
    )
    .to(sweep, { opacity: 0, duration: d(0.2) }, phase3Start + d(1.05))
    // ~300ms hold on the completed mark before construction begins
    .to({}, { duration: d(0.3) });

  // ---------------------------------------------------------------
  // PHASE 4 — New page construction (1.2s)
  // The logo becomes the origin point; the new page (already swapped
  // in behind the wash during Phase 2) assembles into view.
  // ---------------------------------------------------------------
  const phase4Start = phase3Start + d(1.0) + d(0.3);

  tl.to(logoGroup, { opacity: 0, scale: 1.15, duration: d(0.35) }, phase4Start)
    .to(node, { scale: 0, opacity: 0, duration: d(0.35) }, phase4Start)
    .to(grid, { opacity: 0.6, duration: d(0.01) }, phase4Start + d(0.15))
    .to(
      wash,
      { opacity: 0, duration: d(0.55), ease: "power2.inOut" },
      phase4Start + d(0.2),
    )
    .set(
      contentRoot,
      {
        filter: "grayscale(1) blur(6px) brightness(0.4)",
        scale: 0.9,
        opacity: 0,
      },
      phase4Start + d(0.2),
    )
    .to(
      contentRoot,
      {
        opacity: 1,
        scale: 1,
        filter: "grayscale(0) blur(0px) brightness(1)",
        duration: d(0.8),
        ease: "power3.out",
      },
      phase4Start + d(0.3),
    )
    .to(grid, { opacity: 0, duration: d(0.4) }, phase4Start + d(0.6))

    // -----------------------------------------------------------
    // PHASE 5 — Micro details / handoff
    // Overlay steps aside; the new page's own ambient motion
    // (particles, hover glow, cursor interaction) is already live
    // underneath since it's a normal mounted React page.
    // -----------------------------------------------------------
    .set(overlayRoot, { pointerEvents: "none" })
    .set(contentRoot, { clearProps: "filter,scale,opacity" })
    .set([lines, labels, logoLines], { clearProps: "all" }, "<")
    .set(node, { scale: 0, opacity: 0 }, "<")
    .set(logoGroup, { opacity: 0, scale: 1, filter: "none" }, "<");

  return tl;
}
