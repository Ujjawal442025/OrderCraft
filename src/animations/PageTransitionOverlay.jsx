import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  LOGO_NODES,
  LOGO_EDGES,
  CONSTRUCTION_LINES,
  CONSTRUCTION_LABELS,
} from "./blueprintData.js";
import { buildPageTransition } from "./pageTransitionTimeline.js";

/**
 * Full-screen construction overlay. Renders once near the root of the app.
 * Exposes `play(onCovered)` via ref — call it whenever the route is about
 * to change; it runs the full deconstruct → collapse → draw → construct
 * sequence and calls `onCovered` at the moment the screen is fully hidden,
 * which is the correct moment to actually swap the mounted page.
 */
const PageTransitionOverlay = forwardRef(function PageTransitionOverlay(
  { contentRef },
  ref,
) {
  const overlayRootRef = useRef(null);
  const washRef = useRef(null);
  const gridRef = useRef(null);
  const nodeRef = useRef(null);
  const logoGroupRef = useRef(null);
  const sweepRef = useRef(null);
  const lineRefs = useRef([]);
  const labelRefs = useRef([]);
  const logoLineRefs = useRef([]);
  const runningTl = useRef(null);

  useImperativeHandle(ref, () => ({
    play(onCovered) {
      runningTl.current?.kill();
      runningTl.current = buildPageTransition(
        {
          overlayRoot: overlayRootRef.current,
          contentRoot: contentRef.current,
          wash: washRef.current,
          grid: gridRef.current,
          lines: lineRefs.current,
          labels: labelRefs.current,
          node: nodeRef.current,
          logoGroup: logoGroupRef.current,
          logoLines: logoLineRefs.current,
          sweep: sweepRef.current,
        },
        onCovered,
      );
    },
  }));

  return (
    <div
      ref={overlayRootRef}
      className="fixed inset-0 z-[999]"
      style={{ pointerEvents: "none" }}
    >
      {/* solid wash behind the logo once the page has fully collapsed */}
      <div
        ref={washRef}
        className="absolute inset-0 bg-[#050505]"
        style={{ opacity: 0 }}
      />

      {/* construction grid */}
      <div
        ref={gridRef}
        className="bg-grid absolute inset-0"
        style={{ opacity: 0 }}
      />

      {/* axis-aligned construction lines */}
      {CONSTRUCTION_LINES.map((l, i) => (
        <div
          key={i}
          ref={(el) => (lineRefs.current[i] = el)}
          className="absolute bg-purple-light/70"
          style={
            l.axis === "h"
              ? {
                  top: `${l.top}%`,
                  left: `${l.left}%`,
                  width: `${l.w}%`,
                  height: "1px",
                  opacity: 0,
                }
              : {
                  top: `${l.top}%`,
                  left: `${l.left}%`,
                  height: `${l.h}%`,
                  width: "1px",
                  opacity: 0,
                }
          }
        />
      ))}

      {/* tiny construction labels */}
      {CONSTRUCTION_LABELS.map((lbl, i) => (
        <span
          key={i}
          ref={(el) => (labelRefs.current[i] = el)}
          className="absolute font-mono text-[10px] tracking-[0.25em] text-purple-light/70"
          style={{
            top: `${lbl.top}%`,
            left: `${lbl.left}%`,
            transform: lbl.align === "right" ? "translateX(-100%)" : "none",
            opacity: 0,
          }}
        >
          {lbl.text}
        </span>
      ))}

      {/* central construction node — everything collapses into this */}
      <div
        ref={nodeRef}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.9) 0%, rgba(124,58,237,0.4) 45%, transparent 75%)",
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        }}
      />

      {/* the mark itself, drawn stroke by stroke */}
      <div
        ref={logoGroupRef}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          {LOGO_EDGES.map(([a, b], i) => {
            const p1 = LOGO_NODES[a];
            const p2 = LOGO_NODES[b];
            return (
              <line
                key={i}
                ref={(el) => (logoLineRefs.current[i] = el)}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#C084FC"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* light sweep across the completed mark */}
        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-y-0 left-1/2 w-8 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
            mixBlendMode: "screen",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
});

export default PageTransitionOverlay;
