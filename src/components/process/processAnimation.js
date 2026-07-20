import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let easesRegistered = false;

/**
 * Registers the custom eases used across the Mission Control dashboard.
 * Safe to call multiple times — only runs once.
 */
export function registerProcessEases() {
  if (easesRegistered) return;
  gsap.registerPlugin(CustomEase, MotionPathPlugin);
  CustomEase.create("pcSoft", "0.16,1,0.3,1");
  CustomEase.create("pcSnap", "0.65,0,0.35,1");
  easesRegistered = true;
}

/** Clamp + remap a value from one range to another. */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  const clamped = Math.min(Math.max(value, inMin), inMax);
  const t = (clamped - inMin) / (inMax - inMin || 1);
  return outMin + t * (outMax - outMin);
}

/** Given overall scroll progress (0-1) and a stage count, returns the active stage index. */
export function mapProgressToStage(progress, stageCount) {
  return Math.min(stageCount - 1, Math.floor(progress * stageCount));
}

/**
 * Animates a DOM node's textContent from its current numeric value up to `endValue`.
 * Used for the live metrics counters (Performance 98, SEO 100, ...).
 */
export function animateCounter(
  el,
  endValue,
  { duration = 1.1, suffix = "", onComplete } = {},
) {
  if (!el) return null;
  const counter = { val: 0 };
  return gsap.to(counter, {
    val: endValue,
    duration,
    ease: "pcSoft",
    onUpdate: () => {
      el.textContent = Math.round(counter.val) + suffix;
    },
    onComplete,
  });
}

/**
 * Builds a looping "data packet" animation that travels along an SVG path,
 * connecting two dashboard panels. Returns a paused timeline the caller controls.
 */
export function createPacketTimeline(
  dotEl,
  pathEl,
  { duration = 1.6, repeatDelay = 1.2 } = {},
) {
  if (!dotEl || !pathEl) return null;
  const tl = gsap.timeline({ repeat: -1, repeatDelay, paused: true });
  tl.set(dotEl, { opacity: 0 })
    .to(dotEl, { opacity: 1, duration: 0.15 })
    .to(
      dotEl,
      {
        motionPath: {
          path: pathEl,
          align: pathEl,
          alignOrigin: [0.5, 0.5],
        },
        duration,
        ease: "pcSnap",
      },
      "<",
    )
    .to(dotEl, { opacity: 0, duration: 0.15 }, `-=0.15`);
  return tl;
}

/** Quick status label for a stage index relative to the currently active stage. */
export function stageStatusLabel(index, activeIndex) {
  if (index < activeIndex) return "✓ Complete";
  if (index === activeIndex) return "Running...";
  return "Waiting...";
}
