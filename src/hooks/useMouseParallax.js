import { useEffect, useRef } from "react";

/**
 * Tracks pointer position relative to a target element and reports a
 * smoothly-interpolated (lerped) value between -1 and 1 on each axis via
 * `onUpdate`. Deliberately does NOT return React state: the whole point of
 * this hook is a 60fps loop, and pushing every frame through setState would
 * force a re-render per tick. Consumers should feed the values straight into
 * GSAP (gsap.quickTo) or a ref's style.transform instead.
 *
 * The raw pointer delta is heavy and "premium" feeling by design: it never
 * snaps to the cursor, it eases toward it every animation frame.
 */
export default function useMouseParallax(targetRef, onUpdate, { ease = 0.08 } = {}) {
  const raw = useRef({ x: 0, y: 0 });
  const eased = useRef({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    function handlePointerMove(e) {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize to -1 / 1 range across the whole viewport so the effect
      // feels connected to the page, not just the artwork box.
      raw.current.x = (e.clientX - cx) / (window.innerWidth / 2);
      raw.current.y = (e.clientY - cy) / (window.innerHeight / 2);
    }

    function handlePointerLeave() {
      raw.current = { x: 0, y: 0 };
    }

    function tick() {
      eased.current.x += (raw.current.x - eased.current.x) * ease;
      eased.current.y += (raw.current.y - eased.current.y) * ease;
      onUpdate(eased.current.x, eased.current.y);
      frame.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(frame.current);
    };
  }, [targetRef, onUpdate, ease]);
}
