import { forwardRef, useCallback, useMemo, useRef } from "react";
import gsap from "gsap";
import useMouseParallax from "../hooks/useMouseParallax.js";
import useLogoFacetGlints, {
  LOGO_POINTS,
} from "../hooks/useLogoFacetGlints.js";
import logo from "../../public/assets/ordercraft-logo.png";

// Depth multipliers per the brief: logo 100%, glow 70%, particles 130%,
// grid 40% (handled globally in Hero.jsx), orbit rings 60%.
const DEPTH = { logo: 1, glow: 0.7, particles: 1.3, rings: 0.6 };

// A handful of tiny, slow-drifting particles. Positions are seeded once.
function useParticleField(count = 10) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${8 + Math.random() * 84}%`,
        left: `${4 + Math.random() * 92}%`,
        size: 1.5 + Math.random() * 2,
        duration: 14 + Math.random() * 12,
        delay: -Math.random() * 20,
        dx: (Math.random() - 0.5) * 60,
        dy: -40 - Math.random() * 60,
      })),
    [count],
  );
}

const HeroArtwork = forwardRef(function HeroArtwork(
  { glowRef, ringsRef, particlesRef, floatRef },
  logoStageRef,
) {
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const particleLayerRef = useRef(null);
  const ringsLayerRef = useRef(null);
  const localGlowRef = useRef(null);
  // glowRef is provided by Hero.jsx so the intro timeline and breathing-glow
  // loop can animate the exact node this component uses for cursor-follow.
  const glowInnerRef = glowRef || localGlowRef;

  const particles = useParticleField();

  const quickRotateX = useRef(null);
  const quickRotateY = useRef(null);
  const quickGlowX = useRef(null);
  const quickGlowY = useRef(null);
  const quickParticlesX = useRef(null);
  const quickParticlesY = useRef(null);
  const quickRingsX = useRef(null);
  const quickRingsY = useRef(null);

  const ensureQuickSetters = useCallback(() => {
    if (!quickRotateX.current && tiltRef.current) {
      quickRotateX.current = gsap.quickTo(tiltRef.current, "rotationX", {
        duration: 0.9,
        ease: "power3.out",
      });
      quickRotateY.current = gsap.quickTo(tiltRef.current, "rotationY", {
        duration: 0.9,
        ease: "power3.out",
      });
    }
    if (!quickGlowX.current && glowInnerRef.current) {
      quickGlowX.current = gsap.quickTo(glowInnerRef.current, "x", {
        duration: 1,
        ease: "power3.out",
      });
      quickGlowY.current = gsap.quickTo(glowInnerRef.current, "y", {
        duration: 1,
        ease: "power3.out",
      });
    }
    if (!quickParticlesX.current && particleLayerRef.current) {
      quickParticlesX.current = gsap.quickTo(particleLayerRef.current, "x", {
        duration: 1.1,
        ease: "power3.out",
      });
      quickParticlesY.current = gsap.quickTo(particleLayerRef.current, "y", {
        duration: 1.1,
        ease: "power3.out",
      });
    }
    if (!quickRingsX.current && ringsLayerRef.current) {
      quickRingsX.current = gsap.quickTo(ringsLayerRef.current, "x", {
        duration: 1,
        ease: "power3.out",
      });
      quickRingsY.current = gsap.quickTo(ringsLayerRef.current, "y", {
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  const handleParallaxUpdate = useCallback(
    (x, y) => {
      ensureQuickSetters();
      // x, y are -1..1. Max rotation: 8deg on Y axis, 6deg on X axis.
      quickRotateY.current?.(x * 8 * DEPTH.logo);
      quickRotateX.current?.(-y * 6 * DEPTH.logo);

      quickGlowX.current?.(x * 40 * DEPTH.glow);
      quickGlowY.current?.(y * 40 * DEPTH.glow);

      quickParticlesX.current?.(x * 40 * DEPTH.particles);
      quickParticlesY.current?.(y * 40 * DEPTH.particles);

      quickRingsX.current?.(x * 40 * DEPTH.rings);
      quickRingsY.current?.(y * 40 * DEPTH.rings);
    },
    [ensureQuickSetters],
  );

  useMouseParallax(stageRef, handleParallaxUpdate);

  const logoBoxRef = useRef(null); // exact size of the rendered logo image
  const sheenRef = useRef(null);
  const pointRefs = useRef([]);
  useLogoFacetGlints(logoBoxRef, sheenRef, pointRefs);

  return (
    <div
      ref={stageRef}
      className="artwork-stage relative flex h-full w-full items-center justify-center"
    >
      {/* Breathing glow, follows cursor at 70% depth */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          ref={glowInnerRef}
          className="h-[70%] w-[70%] rounded-full blur-[40px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(124,58,237,0.28) 45%, transparent 72%)",
          }}
        />
      </div>

      {/* Orbit rings, 60% depth */}
      <div
        ref={(el) => {
          ringsLayerRef.current = el;
          if (ringsRef) ringsRef.current = el;
        }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="orbit-ring r1" />
        <span className="orbit-ring r2" />
        <span className="orbit-ring r3" />
      </div>

      {/* Particles, 130% depth */}
      <div
        ref={(el) => {
          particleLayerRef.current = el;
          if (particlesRef) particlesRef.current = el;
        }}
        className="pointer-events-none absolute inset-0"
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
            }}
          />
        ))}
      </div>

      {/* Floating wrapper (continuous GSAP float animation) */}
      <div ref={floatRef} className="relative">
        {/* Tilt wrapper (mouse-driven 3D rotation) */}
        <div ref={tiltRef} className="artwork-tilt">
          <div
            ref={(el) => {
              logoBoxRef.current = el;
              if (logoStageRef) logoStageRef.current = el;
            }}
            className="relative"
          >
            <img
              src={logo}
              alt="OrderCraft logo"
              draggable={false}
              className="w-[240px] select-none sm:w-[300px] md:w-[340px] lg:w-[400px]"
              style={{
                filter:
                  "drop-shadow(0 30px 60px rgba(124,58,237,0.45)) drop-shadow(0 8px 20px rgba(0,0,0,0.6))",
              }}
            />

            {/* Masked light sheen: clipped to the logo's own alpha shape so
                the highlight reads as one facet catching the light. */}
            <div
              ref={sheenRef}
              className="glint-sheen"
              style={{
                WebkitMaskImage: `url(${logo})`,
                maskImage: `url(${logo})`,
              }}
              aria-hidden
            />

            {/* Per-vertex glints: each facet corner brightens independently
                as the cursor approaches it. */}
            <div className="points-layer" aria-hidden>
              {LOGO_POINTS.map((p, i) => (
                <span
                  key={i}
                  ref={(el) => (pointRefs.current[i] = el)}
                  className="point-glint"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                />
              ))}
            </div>

            {/* Faint HUD circle + glass highlight, purely decorative */}
            <div
              className="pointer-events-none absolute -inset-10 rounded-full border border-white/[0.04]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeroArtwork;
