import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  featuredProjects,
  processSteps,
} from "../featured-work/featuredProjects";
import SEO from "../Seo.jsx";
// Register GreenSock Plugins
gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);
  const heroRef = useRef(null);
  const timelineSectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Spotlight Tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: e.clientX - 150,
          y: e.clientY - 150,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Premium GSAP Animations Core
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal Animation
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-watermark", {
          opacity: 0,
          scale: 1.15,
          duration: 2.2,
          ease: "power3.out",
        })
        .from(
          ".hero-sub",
          {
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1.5",
        )
        .from(
          ".hero-title .word-split",
          {
            opacity: 0,
            y: 80,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1.2",
        )
        .from(
          ".blueprint-grid-line",
          {
            scaleX: 0,
            transformOrigin: "left center",
            stagger: 0.15,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "-=1.5",
        )
        .from(
          ".hero-particle",
          {
            opacity: 0,
            y: "random(-100, 100)",
            stagger: 0.05,
            duration: 2,
            ease: "power2.out",
          },
          "-=1.0",
        );

      // 2. ScrollTrigger Scroll-Progress Accent Line
      gsap.fromTo(
        ".scroll-progress-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      // 3. Project Reveals (Alternating Animation States)
      const projectRows = gsap.utils.toArray(".project-row-item");
      projectRows.forEach((row) => {
        const imageFrame = row.querySelector(".project-image-frame");
        const contentBox = row.querySelector(".project-content-box");
        const cardsGlow = row.querySelector(".card-bg-glow");

        // Reveal row blocks
        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top bottom-=15%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        rowTl
          .fromTo(
            imageFrame,
            { opacity: 0, y: 100, scale: 0.93 },
            { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out" },
          )
          .fromTo(
            contentBox,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
            "-=1.0",
          )
          .fromTo(
            cardsGlow,
            { opacity: 0, scale: 0.8 },
            { opacity: 0.35, scale: 1, duration: 1.8, ease: "power2.out" },
            "-=0.8",
          );

        // Subtle Parallax Scroll Speed for Images
        gsap.to(imageFrame.querySelector("img"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 4. Horizontal Timeline Sequence Alignment
      const timelineNodes = gsap.utils.toArray(".timeline-step-node");
      const timelineProgressLine = document.querySelector(
        ".timeline-blue-line-progress",
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: "top bottom-=10%",
            end: "center center",
            scrub: 1.2,
          },
        })
        .fromTo(
          timelineProgressLine,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
        )
        .fromTo(
          timelineNodes,
          {
            filter: "grayscale(100%) brightness(50%)",
            scale: 0.9,
            opacity: 0.4,
          },
          {
            filter: "grayscale(0%) brightness(100%)",
            scale: 1.05,
            opacity: 1,
            stagger: 0.3,
          },
          0,
        );

      // 5. Final CTA Entrance Visuals
      gsap.from(".cta-title", {
        opacity: 0,
        y: 80,
        scrollTrigger: {
          trigger: ".cta-trigger-box",
          start: "top bottom-=10%",
          toggleActions: "play none none reverse",
        },
        duration: 1.4,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden text-white selection:bg-purple-600/30 font-sans"
    >
      <SEO
        title="Work"
        description="Get in touch with OrderCraft to start your next web development, UI/UX design, or AI automation project. Response within 24 hours."
        path="/work"
      />
      {/* GLOBAL HIGH-FIDELITY ATMOSPHERES */}
      {/* 1. Global Subtle Mouse Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] rounded-full bg-radial-gradient from-purple-600/5 via-transparent to-transparent blur-3xl z-30"
      />
      {/* 2. Left Scroll-Progress Indicator Line */}
      <div className="fixed top-0 left-0 w-[2px] h-full bg-white/[0.03] z-40">
        <div className="scroll-progress-line w-full bg-gradient-to-b from-[#7C3AED] via-[#EC4899] to-transparent h-full origin-top transform-gpu" />
      </div>
      {/* 3. Volumetric Analog Noise Layer */}
      <div className="pointer-events-none fixed inset-0 w-full h-full bg-noise opacity-[0.015] z-40" />

      {/* ==========================================
          SECTION 1: HERO VIEWPORT (100vh)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex flex-col justify-center px-8 lg:px-24 border-b border-white/[0.03]"
      >
        {/* Giant Watermark Logo */}
        <div className="hero-watermark absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[14vw] font-black tracking-tighter text-white/[0.015] font-mono leading-none uppercase select-none">
            ORDERCRAFT
          </span>
        </div>

        {/* Blueprint Lines Background Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="blueprint-grid-line absolute top-1/4 left-0 w-full h-[1px] bg-white/[0.02]" />
          <div className="blueprint-grid-line absolute top-2/3 left-0 w-full h-[1px] bg-white/[0.02]" />
          <div className="blueprint-grid-line absolute left-1/3 top-0 w-[1px] h-full bg-white/[0.02]" />
          <div className="blueprint-grid-line absolute left-2/3 top-0 w-[1px] h-full bg-white/[0.02]" />
        </div>

        {/* Hero Tiny Floating Blueprints */}
        <div className="absolute top-24 left-1/4 hero-particle pointer-events-none text-[10px] font-mono text-purple-500/20 uppercase tracking-widest hidden lg:block">
          // SYS_LOADED_2026
        </div>
        <div className="absolute bottom-24 right-1/4 hero-particle pointer-events-none text-[10px] font-mono text-purple-500/20 uppercase tracking-widest hidden lg:block">
          // 60FPS_L_ENGINE
        </div>

        <div className="relative max-w-4xl z-10 flex flex-col text-left">
          {/* Subtle tag */}
          <span className="hero-sub text-xs font-semibold tracking-[0.4em] text-[#A855F7] uppercase mb-6 block">
            // SELECTED SHOWCASE PORTFOLIO
          </span>

          {/* Splitting title headers for elegant word staggering */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-9xl font-light tracking-tight leading-none text-white uppercase mb-8">
            <span className="word-split inline-block mr-4">Selected</span>
            <span className="word-split inline-block bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#3B82F6] bg-clip-text text-transparent font-bold">
              Work
            </span>
          </h1>

          <p className="hero-sub text-[#BDBDBD] text-base lg:text-2xl font-light leading-relaxed max-w-2xl">
            Crafting state-of-the-art interactive digital experiences that blend
            boundary-pushing strategy, structural design, and flawless motion
            engineering.
          </p>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-8 left-8 lg:left-24 z-10 flex items-center gap-3 text-xs tracking-widest text-white/40 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* ==========================================
          SECTION 2: FEATURED PROJECTS GRID (Alternating Layout)
          ========================================== */}
      <section className="relative w-full py-32 lg:py-48 px-6 lg:px-24 z-10 flex flex-col gap-40 lg:gap-64">
        {featuredProjects.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={project.id}
              className={`project-row-item flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-24 relative`}
            >
              {/* Background ambient lighting anchor point */}
              <div
                className={`card-bg-glow absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br ${project.gradient} blur-[120px] pointer-events-none -z-10`}
                style={{ top: "10%", left: isEven ? "5%" : "60%" }}
              />

              {/* PROJECT IMAGE CONTAINER */}
              <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden rounded-2xl relative border border-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] project-image-frame group transform-gpu cursor-pointer">
                {/* Visual Glow overlay inside image card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Hardware Parallax Image */}
                <img
                  src={project.imageSrc || project.image}
                  alt={project.title || project.name}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-out transform-gpu"
                />

                {/* Floating Absolute Project Badge Indicator */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.status || "Completed"}
                </div>

                <div className="absolute top-6 right-6 z-20 text-xs font-mono text-white/30">
                  {project.year}
                </div>
              </div>

              {/* PROJECT CONTENT CARD */}
              <div className="project-content-box w-full lg:w-1/2 flex flex-col items-start text-left relative z-10">
                {/* Floating Big Row Index */}
                <div className="text-[9vw] font-black text-white/[0.015] font-mono select-none pointer-events-none absolute -top-12 -left-4 z-0">
                  {project.id}
                </div>

                <span className="text-[10px] font-bold tracking-[0.3em] text-purple-400 uppercase mb-4 relative z-10 font-mono">
                  // {project.category || project.industry}
                </span>

                <h3 className="text-3xl lg:text-6xl font-light tracking-tight text-white mb-6 uppercase group relative cursor-default">
                  {project.title || project.name}
                </h3>

                <p className="text-[#BDBDBD] text-base lg:text-lg font-light leading-relaxed mb-8 max-w-xl">
                  {project.description}
                </p>

                {/* Interactive Glass pills technology chips */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {project.tech.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white/70 bg-white/[0.03] border border-white/5 hover:border-white/20 hover:text-white hover:scale-105 hover:rotate-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 select-none transform-gpu"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Two-part Interactive Actions Button Panel */}
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Magnetic Primary Action */}
                  <a
                    href={project.caseUrl || project.projectUrl}
                    className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/10 overflow-hidden bg-black/40 hover:border-purple-500/30 transition-colors duration-500 transform-gpu"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-white relative z-10">
                      View Case Study
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-white transform group-hover:translate-x-1.5 transition-transform duration-300 relative z-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>

                  {/* Secondary Mirror Action */}
                  <a
                    href={project.liveUrl || project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300"
                  >
                    <span>Visit Live Website</span>
                    <svg
                      className="w-3 h-3 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ==========================================
          SECTION 3: PROJECT TIMELINE (Horizontal Showcase)
          ========================================== */}
      <section
        ref={timelineSectionRef}
        className="relative w-full py-32 lg:py-48 bg-black/20 border-y border-white/[0.03] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col items-start text-left mb-24">
            <span className="text-[10px] font-bold tracking-[0.4em] text-purple-400 uppercase mb-4 font-mono">
              // DESIGN-ENGINEERING MATRIX
            </span>
            <h2 className="text-3xl lg:text-5xl font-light tracking-tight text-white uppercase">
              Our Creative Process
            </h2>
          </div>

          {/* Timeline track nodes */}
          <div className="relative w-full pt-12 pb-16">
            {/* Base Background Blueprint Line */}
            <div className="absolute top-[48px] left-0 w-full h-[1px] bg-white/[0.05]" />
            {/* GSAP Progress Line */}
            <div className="timeline-blue-line-progress absolute top-[48px] left-0 w-full h-[1.5px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left transform-gpu" />

            {/* Horizontal Nodes Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 relative z-10 mt-1">
              {processSteps.map((stepItem, sIdx) => (
                <div
                  key={sIdx}
                  className="timeline-step-node flex flex-col items-start text-left group transform-gpu"
                >
                  {/* Glowing Node Button */}
                  <div className="w-7 h-7 rounded-full bg-[#050505] border-2 border-white/10 group-hover:border-purple-500 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transform-gpu">
                    <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-purple-500 transition-colors duration-300" />
                  </div>

                  <span className="text-[11px] font-bold text-purple-400 font-mono tracking-widest mb-1.5 block">
                    STEP // {stepItem.step}
                  </span>
                  <h4 className="text-xl font-medium text-white mb-3 tracking-wide">
                    {stepItem.name}
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed font-light max-w-[200px]">
                    {stepItem.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: COMPREHENSIVE ACTION CALL (CTA)
          ========================================== */}
      <section className="cta-trigger-box relative w-full h-[80vh] flex flex-col items-center justify-center px-6 text-center border-b border-white/[0.02]">
        {/* Background breathing logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[25vw] font-black text-white/[0.005] select-none tracking-tighter uppercase">
            OC
          </span>
        </div>

        {/* Dynamic Abstract Aurora backdrops */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[130px] top-1/4 left-1/4 -z-10 animate-pulse pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[130px] bottom-1/4 right-1/4 -z-10 animate-pulse pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col items-center gap-8">
          <span className="text-xs font-semibold tracking-[0.4em] text-purple-400 uppercase font-mono">
            // NEXT PHASE INITIATION
          </span>

          <h2 className="cta-title text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-none">
            Ready to build your <br />
            <span className="font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              next experience?
            </span>
          </h2>

          <p className="text-white/40 text-base md:text-lg max-w-lg mb-4 font-light leading-relaxed">
            Let's construct a flawless, high-performance digital gateway. We
            design and deliver custom systems optimized for ultimate speed,
            aesthetics, and user conversions.
          </p>

          {/* Heavy high-end CTA Button with custom magnet styling wrapper */}
          <button className="group relative flex items-center justify-center px-10 py-5 rounded-full overflow-hidden bg-white text-black font-semibold tracking-widest text-xs uppercase shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] hover:scale-105 active:scale-95 transition-all duration-500 transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="relative z-10 flex items-center gap-2 mix-blend-difference text-white font-bold">
              <a href="/contact">Initiate Project</a>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
