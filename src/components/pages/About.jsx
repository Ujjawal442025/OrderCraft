import React, { useEffect, useRef, useState } from "react";
import { initAboutAnimations } from "./aboutAnimation.js";

export default function About() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --------------------------------------------------
  // DATA STRUCURES FOR EASY CONTENT MANAGEMENT
  // --------------------------------------------------
  const philosophyData = [
    {
      title: "Design First",
      desc: "Immersive aesthetics driving structural purpose and spatial identity.",
      icon: "✦",
    },
    {
      title: "Performance Always",
      desc: "Sub-millisecond executions tailored around pure execution efficiency.",
      icon: "⚡",
    },
    {
      title: "Motion Matters",
      desc: "Organic UI choreographies connecting user intent to platform architecture.",
      icon: "⟳",
    },
    {
      title: "Built To Scale",
      desc: "Microservice thinking engineered directly inside modular layouts.",
      icon: "⚏",
    },
  ];

  const statsData = [
    { target: 50, suffix: "+", label: "Premium Deployments" },
    { target: 98, suffix: "%", label: "Lighthouse Performance" },
    { target: 100, suffix: "%", label: "Bespoke UI Infrastructure" },
    { target: 24, suffix: "/7", label: "Continuous Delivery" },
  ];

  const studioData = [
    {
      role: "Founder",
      name: "Piyush Joshi",
      bio: "Leading the studio's creative vision, client strategy, and product direction while ensuring every project reflects premium craftsmanship.",
      img: `${import.meta.env.BASE_URL}assets/Piyush.jpeg`,
    },
    {
      role: "AI Web Developer",
      name: "Mayank",
      bio: "Building intelligent web experiences by integrating AI workflows, automation, and modern frontend technologies into scalable solutions.",
      img: `${import.meta.env.BASE_URL}assets/mayank.jpeg`,
    },
    {
      role: "Full Stack Developer",
      name: "Satyam",
      bio: "Developing robust full-stack applications with seamless integration between modern frontend interfaces and scalable backend systems.",
      img: `${import.meta.env.BASE_URL}assets/Satyam.jpeg`,
    },
    {
      role: "Frontend Developer",
      name: "Ujjawal",
      bio: "Crafting immersive, high-performance interfaces with smooth animations, responsive layouts, and pixel-perfect user experiences.",
      img: `${import.meta.env.BASE_URL}assets/Ujjawal.jpeg`,
    },
    {
      role: "Backend Developer",
      name: "Divit",
      bio: "Engineering secure APIs, databases, and server infrastructure to deliver reliable, scalable, and efficient application performance.",
      img: `${import.meta.env.BASE_URL}assets/Divit.jpeg`,
    },
    {
      role: "Video Editor & Backend Support",
      name: "Bhavik",
      bio: "Creating engaging visual content while supporting backend operations, deployments, and project workflows across the team.",
      img: `${import.meta.env.BASE_URL}assets/Bhavik.jpeg`,
    },
  ];

  const valuesData = [
    {
      title: "Pure Craftsmanship",
      desc: "Rejecting shortcuts. Every single node, token, and line of code is measured meticulously down to the fractional layout unit.",
    },
    {
      title: "Adaptive Innovation",
      desc: "Continuously reshaping framework capabilities. We push web boundaries past traditional declarative structures.",
    },
    {
      title: "Radical Transparency",
      desc: "No smoke, no black boxes. Our systems, performance analytics, and algorithmic architectures are built completely out in the open.",
    },
    {
      title: "Generational Partnerships",
      desc: "We do not build seasonal campaigns. We engineer lasting software frameworks meant to control market shares for years.",
    },
  ];

  const timelineData = [
    {
      year: "2024",
      title: "OrderCraft Founded",
      desc: "Conceived from a structural need to combine raw mechanical engineering with fluid visual art direction.",
    },
    {
      year: "2025",
      title: "The First Milestone Breakout",
      desc: "Deployed full-scale headless commerce layouts managing millions of requests dynamically.",
    },
    {
      year: "2026",
      title: "50+ Global Implementations",
      desc: "Expanding cross-platform design networks into dedicated, real-time spatial web apps.",
    },
    {
      year: "Future Vision",
      title: "Hyper-Immersive Environments",
      desc: "Merging physical UI primitives directly into WebGPU-driven client interfaces.",
    },
  ];

  // Initialize GSAP effects
  useEffect(() => {
    const cleanup = initAboutAnimations(containerRef);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Handle magnetic-style mouse movements for localized container spotlighting
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#07070c] text-white overflow-hidden font-sans select-none antialiased"
      style={{
        "--global-mx": `${mousePos.x}px`,
        "--global-my": `${mousePos.y}px`,
      }}
    >
      {/* GLOBAL BACKGROUND INTERACTIONS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--global-mx)_var(--global-my),rgba(147,51,234,0.08)_0%,transparent_50%)] pointer-events-none z-10" />
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-indigo-950/20 blur-[160px] mix-blend-screen pointer-events-none" />

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center px-6 md:px-24 border-b border-purple-950/20 overflow-hidden">
        {/* Blueprint Grid Overlay */}
        <div className="hero-bg-grid absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Background Glowing Mesh Particles */}
        <div className="hero-particle absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping [animation-duration:3s]" />
        </div>

        {/* Large OrderCraft Watermark */}
        <div className="hero-watermark absolute bottom-8 right-12 text-[12vw] font-black tracking-tighter text-purple-900/5 leading-none font-mono uppercase pointer-events-none select-none">
          ORDERCRAFT
        </div>

        <div className="relative z-10 max-w-5xl text-center space-y-8">
          <h1 className="hero-title text-5xl md:text-8xl font-light tracking-tight uppercase leading-[1.05]">
            <span className="word inline-block mr-4">Crafting</span>
            <span className="word inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-white font-normal">
              Digital
            </span>
            <br className="hidden md:inline" />
            <span className="word inline-block mr-4">Experiences</span>
            <span className="word inline-block font-mono text-purple-400/80">
              With Purpose.
            </span>
          </h1>

          <p className="hero-desc max-w-2xl mx-auto text-base md:text-lg text-slate-400 font-light tracking-wide leading-relaxed">
            We operate at the volatile intersection of algorithmic clarity and
            visceral visual storytelling. OrderCraft builds advanced web
            platforms utilizing blueprint precision architectures.
          </p>
        </div>

        {/* Downward Indicator */}
        <div className="absolute bottom-10 flex flex-col items-center space-y-2 opacity-50">
          <span className="text-[10px] tracking-[0.3em] font-mono text-purple-400 uppercase">
            Scroll Down
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent animate-bounce" />
        </div>
      </section>

      {/* SECTION 2: OUR STORY */}
      <section className="story-section relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase block">
                // ARCHITECTURE & GENESIS
              </span>
              <h2 className="story-text-reveal text-3xl md:text-5xl font-extralight uppercase tracking-tight">
                Why We Engineer <br />
                <span className="text-slate-400 font-normal italic">
                  The Digital Void.
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-400 font-light leading-relaxed text-base md:text-lg">
              <p className="story-text-reveal">
                OrderCraft did not materialize out of standard agency trends. We
                were forged out of systemic frustration with generic web
                standards, uninspired template layers, and identical aesthetic
                architectures.
              </p>
              <p className="story-text-reveal">
                Our mission is to decouple typical web design layout limitations
                from true runtime machine capabilities. We treat standard
                viewport dimensions as spatial canvas zones waiting for
                high-fidelity custom motion logic.
              </p>
              <p className="story-text-reveal font-mono text-sm text-purple-300/80 border-l border-purple-500/40 pl-4 py-1">
                "System design is absolute code choreography. Nothing stands
                still, everything flows."
              </p>
            </div>
          </div>

          {/* Premium Interactive Illustration Container */}
          <div className="story-img-container relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-purple-900/30 bg-purple-950/10 backdrop-blur-md group mouse-spotlight">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />

            {/* Embedded Abstract Interactive Wireframe */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111026_1px,transparent_1px),linear-gradient(to_bottom,#111026_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 mix-blend-overlay" />

            <div className="absolute inset-6 rounded-xl border border-dashed border-purple-500/20 flex items-center justify-center overflow-hidden">
              <div className="absolute w-72 h-72 rounded-full border border-purple-400/10 bg-gradient-to-tr from-purple-900/20 to-indigo-900/10 animate-spin [animation-duration:25s]" />
              <div className="absolute w-48 h-48 rounded-full border border-dashed border-indigo-400/20 animate-spin [animation-duration:15s] direction-reverse" />
              <div className="relative text-center p-8 space-y-2 z-10 transition-transform duration-700 group-hover:scale-105">
                <div className="text-6xl text-purple-400 font-mono tracking-tighter mix-blend-difference">
                  01 / OC
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400 font-mono">
                  Core Blueprint Visualizer Ready
                </div>
              </div>
            </div>

            {/* Light Sweep Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12" />
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR PHILOSOPHY */}
      <section className="philosophy-section relative w-full py-24 md:py-36 px-6 md:px-24 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent border-b border-purple-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              // THE PRINCIPLE ENGINE
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
              Our Core Ideals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyData.map((phi, i) => (
              <div
                key={i}
                className="philosophy-card mouse-spotlight group relative p-8 rounded-xl border border-purple-900/20 bg-purple-950/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40"
              >
                {/* Micro Spotlight Follow Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.12)_0%,transparent_50%)] pointer-events-none rounded-xl" />

                <div className="text-3xl text-purple-400 mb-6 font-mono w-12 h-12 flex items-center justify-center rounded-lg bg-purple-950/40 border border-purple-800/20 shadow-inner group-hover:scale-110 transition-transform">
                  {phi.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-wide">
                  {phi.title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {phi.desc}
                </p>

                {/* Border Tracing Corner Ornaments */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-purple-500/0 group-hover:border-purple-500/60 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-500/0 group-hover:border-purple-500/60 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY ORDERCRAFT (STATS) */}
      <section className="relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20 bg-[#090911]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="space-y-6 lg:col-span-1">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              // METRIC SYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight leading-tight">
              Measurable <br />
              Architectural <br />
              <span className="font-normal text-purple-400">Superiority.</span>
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              We reject arbitrary design configurations. Every metric framework
              we ship passes complex micro-performance thresholds instantly
              visible on global core monitoring graphs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-2">
            {statsData.map((stat, i) => (
              <div
                key={i}
                className="mouse-spotlight relative p-8 rounded-xl border border-purple-950 bg-purple-950/10 backdrop-blur-md flex flex-col justify-between group overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(129,140,248,0.1)_0%,transparent_60%)] pointer-events-none" />
                <div className="text-4xl md:text-6xl font-light font-mono tracking-tight text-white mb-2 flex items-baseline">
                  <span className="stat-number" data-target={stat.target}>
                    0
                  </span>
                  <span className="text-purple-400 text-2xl font-normal ml-0.5">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mt-4 border-t border-purple-900/20 pt-4">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MEET THE STUDIO */}
      <section className="studio-section relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
                // OPERATIONAL AGENTS
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
                Meet The Studio
              </h2>
            </div>
            <p className="text-slate-400 max-w-sm text-sm font-light leading-relaxed">
              A specialized core network of visual developers, math-motion
              specialists, and custom system architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studioData.map((member, i) => (
              <div
                key={i}
                className="studio-card mouse-spotlight group relative rounded-xl border border-purple-900/10 bg-purple-950/5 backdrop-blur-xl overflow-hidden p-4 flex flex-col transition-all duration-500 hover:border-purple-500/30"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(147,51,234,0.08)_0%,transparent_50%)] pointer-events-none" />

                {/* Profile Placeholder Container with Filters */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-slate-900 mb-6 border border-purple-900/20">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale brightness-75 contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-purple-400 uppercase bg-[#07070c]/70 px-2 py-1 rounded border border-purple-500/20">
                    {member.role}
                  </span>
                </div>

                <div className="px-2 pb-2 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-medium tracking-wide text-slate-100">
                      {member.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed mt-2">
                      {member.bio}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 pt-4 mt-4 border-t border-purple-950/40 uppercase tracking-widest">
                    SYSTEMS AUTH // OC-{108 + i}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR VALUES */}
      <section className="values-section relative w-full py-24 md:py-36 px-6 md:px-24 bg-[#05050a] border-b border-purple-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              // SYSTEM LAWS
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
              Our Operational Axioms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valuesData.map((val, i) => (
              <div
                key={i}
                className="value-card relative p-8 md:p-12 rounded-2xl border border-purple-950 bg-gradient-to-br from-purple-950/10 to-transparent backdrop-blur-md overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] pointer-events-none rounded-full" />
                <span className="text-xs font-mono text-purple-500/60 block mb-4 tracking-widest">
                  0{i + 1} / AXIOM
                </span>
                <h3 className="text-2xl font-light tracking-wide text-white mb-4 uppercase">
                  {val.title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TIMELINE */}
      <section className="timeline-section relative w-full py-24 md:py-36 px-6 md:px-24">
        <div className="max-w-3xl mx-auto space-y-16 relative">
          <div className="text-center space-y-4 mb-24">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              // INDEX LOG
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
              The Architectural Path
            </h2>
          </div>

          {/* Central Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[1px] bg-purple-950/50 -translate-x-1/2 pointer-events-none">
            <div className="timeline-line-progress w-full h-full bg-gradient-to-b from-purple-500 via-indigo-400 to-purple-900 origin-top transform scale-y-0" />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16 relative z-10">
            {timelineData.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`timeline-item flex flex-col md:flex-row items-start md:items-center relative w-full ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Central Node Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#07070c] border-2 border-purple-400 -translate-x-1/2 z-20 shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                    {i === timelineData.length - 1 && (
                      <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75" />
                    )}
                  </div>

                  {/* Empty space filler for horizontal symmetry */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <div className="p-6 rounded-xl border border-purple-900/20 bg-purple-950/5 backdrop-blur-md relative group hover:border-purple-500/30 transition-colors">
                      <span className="text-xs font-mono text-purple-400 font-bold tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-medium text-slate-100 mt-1 mb-2 tracking-wide uppercase">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA (ENGAGE LINK) */}
      <section className="cta-section relative w-full py-32 md:py-48 px-6 md:px-24 text-center border-t border-purple-950/20 bg-gradient-to-b from-transparent to-[#040408] overflow-hidden">
        {/* Deep Ambient Aurora Elements */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[35vw] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

        <div className="cta-content max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-4xl md:text-7xl font-light tracking-tight uppercase leading-[1.1]">
            Let’s build something <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-white">
              unforgettable.
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-sm md:text-base text-slate-400 font-light tracking-wide leading-relaxed">
            Connect directly with our engineering core. Let’s architecturalize
            your brand framework into a high-performance vector asset.
          </p>

          {/* Premium Magnetic Button Component */}
          <div className="pt-6">
            <button className="relative group inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {/* Internal Button Glow Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <span className="group-hover:text-white transition-colors duration-300">
                <a
                  href="/contact
                "
                >
                  Initiate Protocol
                </a>
              </span>
              <span className="ml-2 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Minimalist Grid Watermark Coordinates */}
        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-purple-950/60 tracking-widest hidden md:block">
          SYS.LOC // [40.7128° N, 74.0060° W]
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-purple-950/60 tracking-widest hidden md:block">
          STATUS // RUNTIME_ACTIVE
        </div>
      </section>
    </div>
  );
}
