import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FinalCTA = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonGroupRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const primaryBtnTextRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const backgroundGlowRef = useRef(null);

  const [hasAssembled, setHasAssembled] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. FIXED MASTER TIMELINE & TOGGLE ACTIONS
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom-=10%", // Triggers slightly before it enters the screen fully
        toggleActions: "play none none none", // Ensures it plays properly on scroll enter
        onLeaveBack: () => setHasAssembled(false),
      },
    });

    // Animate blueprint fragments converging
    masterTimeline.fromTo(
      section.querySelectorAll(".fragment-node"),
      {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -150 : 150),
        y: (i) => (i < 3 ? -120 : 120),
        scale: 0.6,
        filter: "blur(12px)",
      },
      {
        opacity: 0.8,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
        stagger: 0.04,
        ease: "power3.out",
      },
    );

    // Draw the SVG Logo path outlines dynamically
    masterTimeline.fromTo(
      section.querySelectorAll(".logo-stroke-path"),
      { strokeDashoffset: 400, strokeDasharray: 400, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.4, ease: "power2.inOut" },
      "-=0.8",
    );

    // Flash/Glow peak state assembly celebration
    masterTimeline.to(logoWrapperRef.current, {
      filter: "drop-shadow(0 0 30px rgba(168, 85, 247, 0.85))",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });

    // Morph assembled logo into background structural watermark state
    masterTimeline.to(logoWrapperRef.current, {
      scale: 2.3,
      opacity: 0.04,
      y: 40,
      filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
      duration: 1.6,
      ease: "power4.inOut",
      onComplete: () => setHasAssembled(true),
    });

    // 2. TYPOGRAPHIC SPLIT TEXT REVEALS
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word-token");
      masterTimeline.fromTo(
        words,
        { y: "130%", opacity: 0, rotateX: 25 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.5",
      );
    }

    masterTimeline.fromTo(
      [subtitleRef.current, buttonGroupRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      "-=0.4",
    );

    // 3. CONTINUOUS AMBIENT IDLE FLOATING
    const idleAnim = gsap.to(section.querySelectorAll(".floating-fragment"), {
      y: "-=30",
      rotation: "max(12)",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.15,
    });

    // 4. MOUSE SPOTLIGHT ENGINE
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = section.getBoundingClientRect();
      const localX = clientX - left;
      const localY = clientY - top;

      gsap.to(backgroundGlowRef.current, {
        x: localX - width / 2,
        y: localY - height / 2,
        duration: 1.4,
        ease: "power2.out",
      });

      gsap.to(section.querySelectorAll(".interactive-shard"), {
        x: (i) => (clientX - window.innerWidth / 2) * (0.025 * (i + 1)),
        y: (i) => (clientY - window.innerHeight / 2) * (0.025 * (i + 1)),
        duration: 0.9,
        ease: "power1.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);

    // 5. MAGNETIC BUTTON BINDERS
    const setupMagneticButton = (buttonEl, textEl) => {
      if (!buttonEl) return;

      const onBtnMove = (e) => {
        const rect = buttonEl.getBoundingClientRect();
        const mX = e.clientX - rect.left - rect.width / 2;
        const mY = e.clientY - rect.top - rect.height / 2;

        gsap.to(buttonEl, {
          x: mX * 0.45,
          y: mY * 0.45,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out",
        });

        if (textEl) {
          gsap.to(textEl, {
            x: mX * 0.2,
            y: mY * 0.2,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      const onBtnLeave = () => {
        gsap.to([buttonEl, textEl], {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        });
      };

      buttonEl.addEventListener("mousemove", onBtnMove);
      buttonEl.addEventListener("mouseleave", onBtnLeave);
    };

    setupMagneticButton(primaryBtnRef.current, primaryBtnTextRef.current);
    setupMagneticButton(secondaryBtnRef.current, null);

    // CLEANUP EVERYTHING PROPERLY
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      idleAnim.kill();
      masterTimeline.kill();
      if (masterTimeline.scrollTrigger) {
        masterTimeline.scrollTrigger.kill();
      }
    };
  }, []);

  const handlePrimaryHoverInit = () => {
    gsap.to(sectionRef.current.querySelectorAll(".fragment-node"), {
      scale: 1.2,
      filter: "drop-shadow(0 0 15px rgba(168, 85, 247, 0.5))",
      duration: 0.4,
      stagger: 0.015,
      ease: "power2.out",
    });
    gsap.to(logoWrapperRef.current, {
      opacity: 0.08,
      scale: 2.35,
      duration: 0.5,
    });
  };

  const handlePrimaryHoverExit = () => {
    gsap.to(sectionRef.current.querySelectorAll(".fragment-node"), {
      scale: 1,
      filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(logoWrapperRef.current, {
      opacity: 0.04,
      scale: 2.2,
      duration: 0.5,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[120vh] bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-32 select-none"
      id="climax-cta"
    >
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-40 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#000000_90%)] pointer-events-none z-30" />

      <div
        ref={backgroundGlowRef}
        className="absolute w-[650px] h-[650px] bg-gradient-to-tr from-purple-600/10 via-indigo-600/5 to-transparent rounded-full filter blur-[100px] pointer-events-none z-10 transform-gpu mix-blend-screen"
      />

      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
        <div className="fragment-node floating-fragment interactive-shard absolute top-[18%] left-[13%] w-20 h-[1px] bg-purple-500/20" />
        <div className="fragment-node floating-fragment interactive-shard absolute top-[23%] left-[16%] w-2.5 h-2.5 border border-white/10 rounded-full" />
        <div className="fragment-node floating-fragment interactive-shard absolute top-[68%] left-[10%] font-mono text-[7px] text-white/10 tracking-widest">
          // REASSM_CORE_V2
        </div>
        <div className="fragment-node floating-fragment interactive-shard absolute top-[13%] right-[18%] w-28 h-[1px] bg-indigo-500/20 rotate-45" />
        <div className="fragment-node floating-fragment interactive-shard absolute top-[32%] right-[10%] w-3.5 h-3.5 border border-purple-500/20 rotate-12" />
        <div className="fragment-node floating-fragment interactive-shard absolute bottom-[22%] right-[16%] font-mono text-[7px] text-white/10">
          // CLIMAX_REVISIT
        </div>
      </div>

      <div
        ref={logoWrapperRef}
        className="absolute w-44 h-44 z-10 transform-gpu pointer-events-none flex items-center justify-center transition-shadow duration-500"
      >
        <svg
          className="w-full h-full stroke-purple-400 fill-none"
          viewBox="0 0 100 100"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path
            className="logo-stroke-path"
            d="M20,20 L80,20 L80,80 L20,80 Z"
          />
          <path
            className="logo-stroke-path"
            d="M35,35 L65,35 L65,65 L35,65 Z"
          />
          <line className="logo-stroke-path" x1="50" y1="10" x2="50" y2="90" />
          <line className="logo-stroke-path" x1="10" y1="50" x2="90" y2="50" />
          <circle
            className="logo-stroke-path"
            cx="50"
            cy="50"
            r="4"
            fill="#a855f7"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto w-full text-center px-6 relative z-30 pointer-events-auto flex flex-col items-center">
        <div className="overflow-hidden h-6 mb-4 flex items-center justify-center">
          <span
            className={`text-[10px] font-mono tracking-[0.6em] text-purple-400 uppercase transition-transform duration-700 ease-out transform-gpu ${hasAssembled ? "translate-y-0" : "-translate-y-full"}`}
          >
            // THE CLIMAX CONVERGENCE
          </span>
        </div>

        <h2
          ref={headlineRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tighter uppercase leading-[1.05] max-w-3xl flex flex-wrap justify-center gap-x-4 gap-y-1 perspective-[800px]"
        >
          {"Ready to craft your next digital masterpiece?"
            .split(" ")
            .map((word, index) => (
              <span key={index} className="inline-block overflow-hidden pb-2">
                <span className="inline-block transform-gpu word-token opacity-0确定 will-change-transform">
                  {word}
                </span>
              </span>
            ))}
        </h2>

        <p
          ref={subtitleRef}
          className="mt-8 text-sm sm:text-base text-white/40 font-light max-w-xl font-sans leading-relaxed tracking-wide opacity-0"
        >
          From strategy to launch, we craft bespoke digital experiences that
          inspire, perform, and establish absolute market authority.
        </p>

        <div
          ref={buttonGroupRef}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6 opacity-0 transform-gpu z-40"
        >
          <a
            href="/contact"
            ref={primaryBtnRef}
            onMouseEnter={handlePrimaryHoverInit}
            onMouseLeave={handlePrimaryHoverExit}
            className="relative px-8 py-4 bg-white text-black font-mono text-[10px] tracking-[0.25em] uppercase rounded-full shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-shadow duration-500 overflow-hidden transform-gpu select-none border-0 outline-none cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform-gpu" />
            <span
              ref={primaryBtnTextRef}
              className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300 transform-gpu"
            >
              Start Your Project
              <span className="inline-block transform group-hover:translate-x-1.5 group-hover:rotate-45 transition-transform duration-300 ease-out text-xs">
                →
              </span>
            </span>
          </a>

          <button
            ref={secondaryBtnRef}
            className="px-8 py-4 bg-white/[0.02] hover:bg-white/[0.05] text-white font-mono text-[10px] tracking-[0.25em] uppercase rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 transform-gpu select-none outline-none cursor-pointer"
          >
            Book Discovery Call
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 font-mono text-[8px] text-white/10 tracking-[0.4em] uppercase pointer-events-none z-10">
        ORDERCRAFT SYNDICATE ©2026 // ALL RIGHTS RESERVED
      </div>
    </section>
  );
};
