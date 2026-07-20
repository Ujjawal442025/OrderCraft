import { useEffect, useRef } from "react";

// Vertex / facet-corner coordinates as % of the logo image, measured from
// its actual alpha silhouette so the glints sit on the mark's real points.
export const LOGO_POINTS = [
  { x: 50.4, y: 25.2 }, // top apex
  { x: 25.8, y: 36.7 }, // left-upper vertex
  { x: 75.1, y: 36.7 }, // right-upper vertex
  { x: 25.8, y: 52.4 }, // left-lower vertex
  { x: 75.1, y: 52.4 }, // right-lower vertex
  { x: 48.6, y: 64.2 }, // bottom apex
  { x: 50, y: 33 }, // inner diamond, top point
  { x: 50, y: 47 }, // inner diamond, bottom point
  { x: 49, y: 58 }, // inner facets meeting point
];

const GLINT_RADIUS = 130; // px — how far a point "feels" the cursor
const SHEEN_RADIUS = 260; // px — how far the sheen fades in from

/**
 * Makes the logo's vertices/facets brighten independently as the cursor
 * approaches them, and drives a light-sheen masked to the logo's own alpha
 * shape so the highlight looks like it's catching a specific facet rather
 * than floating on top of a flat rectangle.
 *
 * stageRef: the element exactly the size of the rendered logo image
 * sheenRef: the masked highlight layer, sized/positioned to match stageRef
 * pointRefs: array of refs to the individual point-glint elements, in the
 *   same order as LOGO_POINTS
 */
export default function useLogoFacetGlints(stageRef, sheenRef, pointRefs) {
  const pointer = useRef({ x: -9999, y: -9999 });
  const frame = useRef(null);

  useEffect(() => {
    function handlePointerMove(e) {
      pointer.current = { x: e.clientX, y: e.clientY };
    }

    function tick() {
      const stage = stageRef.current;
      const sheen = sheenRef.current;
      if (!stage) {
        frame.current = requestAnimationFrame(tick);
        return;
      }

      const rect = stage.getBoundingClientRect();
      const { x: clientX, y: clientY } = pointer.current;

      if (rect.width > 0 && sheen) {
        const relX = ((clientX - rect.left) / rect.width) * 100;
        const relY = ((clientY - rect.top) / rect.height) * 100;
        sheen.style.backgroundPosition = `${relX}% ${relY}%`;

        const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
        const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
        const distToBox = Math.sqrt(dx * dx + dy * dy);
        const sheenIntensity = Math.max(0, 1 - distToBox / SHEEN_RADIUS);
        sheen.style.opacity = (sheenIntensity * 0.85).toFixed(3);
      }

      LOGO_POINTS.forEach((p, i) => {
        const el = pointRefs.current[i];
        if (!el || rect.width === 0) return;
        const px = rect.left + (p.x / 100) * rect.width;
        const py = rect.top + (p.y / 100) * rect.height;
        const d = Math.hypot(clientX - px, clientY - py);
        const t = Math.max(0, 1 - d / GLINT_RADIUS);
        const intensity = t * t; // ease-in falloff, feels like a threshold "catch"
        el.style.opacity = intensity.toFixed(3);
        el.style.transform = `scale(${(0.35 + intensity * 0.9).toFixed(3)})`;
      });

      frame.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handlePointerMove);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame.current);
    };
  }, [stageRef, sheenRef, pointRefs]);
}
