import { useEffect, useRef } from "react";
import { MousePointer2 } from "lucide-react";
import gsap from "gsap";
import Button from "./Button.jsx";
import HeroArtwork from "./HeroArtwork.jsx";
import TubesBackground from "./TubeCursor.tsx"; // Ensure this matches your component path
import {
  playIntro,
  startFloating,
  startBreathingGlow,
} from "../animations/heroAnimation.js";
import { Link } from "react-router-dom";

const AVATAR_COLORS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
];

export default function Hero() {
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const paragraphRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const trustRef = useRef(null);

  const artworkStageRef = useRef(null);
  const glowRef = useRef(null);
  const ringsRef = useRef(null);
  const particlesRef = useRef(null);
  const floatRef = useRef(null);

  useEffect(() => {
    // Structural Animation Scoping Pipeline
    const mm = gsap.matchMedia();
    let introTimeline;
    let floatTween;
    let glowTween;

    introTimeline = playIntro({
      badge: badgeRef.current,
      lines: [line1Ref.current, line2Ref.current, line3Ref.current],
      paragraph: paragraphRef.current,
      buttons: [primaryBtnRef.current, secondaryBtnRef.current],
      trust: trustRef.current,
      artworkStage: artworkStageRef.current,
      glow: glowRef.current,
      rings: ringsRef.current,
      particles: particlesRef.current,
    });

    // Execute heavy calculations exclusively on desktop frames
    mm.add("(min-width: 1024px)", () => {
      floatTween = startFloating(floatRef.current);
      glowTween = startBreathingGlow(glowRef.current);
    });

    return () => {
      mm.revert();
      if (introTimeline) introTimeline.kill();
      if (floatTween) floatTween.kill();
      if (glowTween) glowTween.kill();
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full mt-10 flex-col overflow-hidden bg-bg">
      {/* 3D INTERACTIVE TUBES BACKGROUND */}
      <TubesBackground className="w-full h-full min-h-screen">
        <div className="relative z-10 flex flex-col min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-0">
          {/* ATMOSPHERE BACKDROPS */}
          <div
            className="bg-stars pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="bg-grid pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="bg-noise pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="bg-vignette pointer-events-none absolute inset-0"
            aria-hidden
          />

          {/* CORE WRAPPER - Split 50/50 on large screens */}
          <div className="relative z-10 mx-auto flex w-full flex-1 flex-col items-center justify-center gap-12 pt-24 pb-12 lg:flex-row lg:gap-0 lg:pt-0 lg:pb-0 lg:pl-28">
            {/* LEFT COMPONENT: Typography & Copy */}
            <div className="w-full text-center lg:w-1/3 lg:max-w-none lg:py-0 lg:text-left order-1 pointer-events-auto">
              <span
                ref={badgeRef}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.18em] text-ink-secondary uppercase"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-purple-light animate-pulse" />
                DIGITAL EXPERIENCE AGENCY
              </span>

              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-semibold leading-[1.15] lg:leading-[1.08] tracking-tight text-ink-primary">
                <span className="line-mask">
                  <span ref={line1Ref} className="line-inner">
                    We design.
                  </span>
                </span>
                <span className="line-mask">
                  <span ref={line2Ref} className="line-inner">
                    We build.
                  </span>
                </span>
                <span className="line-mask">
                  <span ref={line3Ref} className="line-inner">
                    We{" "}
                    <em className="bg-gradient-to-r from-purple-light via-purple-core to-white bg-clip-text font-serif italic text-transparent">
                      craft
                    </em>{" "}
                    digital experiences.
                  </span>
                </span>
              </h1>

              <p
                ref={paragraphRef}
                className="mx-auto mt-6 max-w-md text-sm sm:text-base leading-relaxed text-ink-secondary lg:mx-0 px-2 sm:px-0"
              >
                OrderCraft builds premium websites, AI-powered digital products
                and unforgettable digital experiences that help ambitious
                businesses grow.
              </p>

              {/* Action Triggers */}
              <div className="mt-8 flex flex-row items-center justify-center gap-4 lg:justify-start">
                <span ref={primaryBtnRef} className="flex-1 sm:flex-none">
                  <Link
                    to="/contact"
                    variant="primary"
                    className="w-full bg-purple-600 px-4 py-3 rounded-3xl flex gap-4 sm:w-auto"
                  >
                    Start a Project
                  </Link>
                </span>
                <span ref={secondaryBtnRef} className="flex-1 sm:flex-none">
                  <Link
                    to="/work"
                    variant="secondary"
                    className="w-full bg-purple-600 px-4
                     py-3 rounded-3xl sm:w-auto"
                  >
                    View Our Work
                  </Link>
                </span>
              </div>

              {/* Trust Validation */}
              <div
                ref={trustRef}
                className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <div className="flex -space-x-2.5">
                  {AVATAR_COLORS.map((img, i) => (
                    <img
                      src={img}
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-bg"
                    />
                  ))}
                </div>
                <p className="text-[13px] text-ink-muted">
                  Trusted by{" "}
                  <span className="text-ink-secondary">20+ businesses</span>
                </p>
              </div>
            </div>

            {/* RIGHT COMPONENT: Artwork Canvas Placement */}
            <div
              ref={artworkStageRef}
              className="flex h-[280px] sm:h-[360px] md:h-[420px] w-full items-center justify-center py-4 lg:h-[640px] lg:w-1/2 lg:py-0 order-2 pointer-events-auto"
            >
              <div className="scale-75 sm:scale-90 md:scale-100 transition-transform duration-300">
                <HeroArtwork
                  glowRef={glowRef}
                  ringsRef={ringsRef}
                  particlesRef={particlesRef}
                  floatRef={floatRef}
                />
              </div>
            </div>
          </div>

          {/* Navigation Scroll Indicator Component */}
          <div className="relative z-10 mt-auto mb-8 flex flex-col items-center gap-2.5 self-center pointer-events-auto">
            <MousePointer2 size={14} className="text-ink-muted" />
            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/15 p-1.5">
              <span className="scroll-wheel" />
            </div>
            <p className="text-[11px] tracking-[0.14em] text-ink-muted">
              SCROLL TO EXPLORE
            </p>
          </div>
        </div>
      </TubesBackground>
    </section>
  );
}
