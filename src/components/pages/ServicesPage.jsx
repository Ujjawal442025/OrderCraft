import React, { useEffect, useRef, useState } from "react";
import { initServiceAnimations } from "./serviceAnimationPage";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  const overviewCards = [
    {
      title: "Web Development",
      anchor: "#webdev",
      desc: "High-fidelity frontends built with blueprint precision and reactive structural components.",
      num: "01",
    },
    {
      title: "UI/UX Design",
      anchor: "#uiux",
      desc: "Interactive spatial canvas designs centered around modular logic and continuous brand flow.",
      num: "02",
    },
    {
      title: "AI Automation",
      anchor: "#automation",
      desc: "Seamless architectural pipelines linking autonomous context nodes straight to production.",
      num: "03",
    },
  ];

  const webDevFeatures = [
    "Custom Websites",
    "Landing Pages",
    "Ecommerce Integration",
    "CMS Architectures",
    "Performance Optimization",
    "SEO Ready",
    "Responsive Design",
  ];

  const webDevTech = [
    "React",
    "Next.js",
    "Vite",
    "TailwindCSS",
    "GSAP",
    "Three.js",
  ];

  const uiuxFeatures = [
    "User Research",
    "Wireframing",
    "Prototyping",
    "Design Systems",
    "Responsive Interfaces",
    "Accessibility Mapping",
    "Microinteractions",
  ];

  const uiuxTools = ["Figma", "Principle", "Adobe Suite", "Rive", "Spline"];

  const aiFeatures = [
    "AI Chatbots",
    "Workflow Automation",
    "CRM Integration",
    "Lead Generation",
    "API Integrations",
    "Business Automation",
    "Scheduling Systems",
  ];

  const aiTech = ["OpenAI", "Python", "Node.js", "LangChain", "VectorDB"];

  const conveyorTech = [
    { name: "React", tag: "Component Architecture" },
    { name: "GSAP", tag: "Motion Orchestration" },
    { name: "Three.js", tag: "Spatial WebGL Shaders" },
    { name: "TailwindCSS", tag: "Utility Layouts" },
    { name: "Node.js", tag: "Runtime Environment" },
    { name: "Express", tag: "Microservice APIs" },
    { name: "MongoDB", tag: "Database Systems" },
    { name: "OpenAI", tag: "Large Language Logic" },
    { name: "Framer Motion", tag: "React Physics" },
    { name: "Firebase", tag: "Realtime Backend" },
    { name: "Vercel", tag: "Edge CDN Delivery" },
    { name: "Docker", tag: "System Isolation" },
  ];

  const faqData = [
    {
      q: "How long does a project take?",
      a: "Standard development builds generally run between 4 to 8 weeks. Complex spatial experiences with 3D elements or extensive AI workflow automation setups may require up to 12 weeks of engineering.",
    },
    {
      q: "How much does a custom website cost?",
      a: "Every codebase is handcrafted to address specific brand performance and layout criteria. Our pricing scales directly with the depth of the animations, shader complexity, and dynamic integrations needed.",
    },
    {
      q: "Do you redesign existing websites?",
      a: "Yes. We completely rebuild outdated application architectures, applying a modern glassmorphic look, improving core performance Web Vitals, and deploying dynamic layouts.",
    },
    {
      q: "Do you provide ongoing support?",
      a: "Absolutely. We provide dedicated support agreements post-launch, covering core platform maintenance, performance audits, and subsequent system scaling.",
    },
    {
      q: "Can AI be integrated into existing systems?",
      a: "Yes. We build custom API connectors and microservices to run intelligence pipelines, automated chatbots, and autonomous processing directly inside your current workflow.",
    },
  ];

  useEffect(() => {
    const cleanup = initServiceAnimations(containerRef);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleScrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
      {/* GLOBAL GLOW EFFECTS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--global-mx)_var(--global-my),rgba(147,51,234,0.06)_0%,transparent_50%)] pointer-events-none z-10" />
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-purple-900/10 blur-[130px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-indigo-950/15 blur-[150px] mix-blend-screen pointer-events-none" />

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center px-6 md:px-24 border-b border-purple-950/20 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="hero-particles absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping [animation-duration:3.5s]" />
        </div>

        <div className="hero-watermark absolute bottom-8 right-12 text-[12vw] font-black tracking-tighter text-purple-900/5 leading-none font-mono uppercase pointer-events-none select-none">
          SERVICES
        </div>

        <div className="relative z-10 max-w-5xl text-center space-y-6">
          <h1 className="hero-title text-5xl md:text-8xl font-light tracking-tight uppercase leading-[1.05]">
            <span className="word inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-white font-normal">
              Our
            </span>
            <span className="word inline-block font-mono text-purple-400/90">
              Services.
            </span>
          </h1>

          <p className="hero-desc max-w-2xl mx-auto text-sm md:text-base text-slate-400 font-light tracking-wide leading-relaxed">
            We design, develop, and automate advanced digital architectures that
            empower ambitious brands to claim undisputed visual authority
            online.
          </p>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center space-y-2 opacity-40">
          <span className="text-[9px] tracking-[0.3em] font-mono text-purple-400 uppercase">
            Explore Capabilities
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-purple-500 to-transparent animate-bounce" />
        </div>
      </section>

      {/* SECTION 2: SERVICES OVERVIEW */}
      <section className="overview-section relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              // PROTOCOL OVERVIEW
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
              Capabilities Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overviewCards.map((card, i) => (
              <div
                key={i}
                onClick={() => handleScrollToSection(card.anchor)}
                className="overview-card mouse-spotlight group relative p-8 rounded-xl border border-purple-900/20 bg-purple-950/5 backdrop-blur-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.12)_0%,transparent_50%)] pointer-events-none rounded-xl" />
                <span className="text-xs font-mono text-purple-500 block mb-6">
                  {card.num} / PROTOCOL
                </span>
                <h3 className="text-2xl font-medium mb-3 tracking-wide text-slate-100">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                  {card.desc}
                </p>
                <span className="text-xs font-mono text-purple-400/80 group-hover:text-purple-400 transition-colors flex items-center space-x-2">
                  <span>DEPLOY BLUEPRINT</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WEB DEVELOPMENT */}
      <section
        id="webdev"
        className="webdev-section relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-purple-900/30 bg-purple-950/10 backdrop-blur-md group mouse-spotlight">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111026_1px,transparent_1px),linear-gradient(to_bottom,#111026_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 mix-blend-overlay" />

            <div className="absolute inset-6 rounded-xl border border-dashed border-purple-500/20 overflow-hidden flex items-center justify-center">
              <div className="parallax-img absolute w-80 h-80 rounded-lg border border-purple-500/10 bg-gradient-to-tr from-purple-950/40 via-transparent to-indigo-950/30 flex flex-col justify-between p-6">
                <div className="flex justify-between items-center border-b border-purple-950/60 pb-3">
                  <span className="text-[10px] font-mono text-purple-400">
                    ENGINE_LOG_OC_01
                  </span>
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-purple-500/20 rounded" />
                  <div className="h-2 w-1/2 bg-purple-500/10 rounded" />
                  <div className="h-2 w-5/6 bg-purple-500/20 rounded" />
                </div>
                <span className="text-[9px] font-mono text-slate-500">
                  RUNTIME // SUCCESSFUL
                </span>
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12" />
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase block">
                // CAPABILITY 01
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
                Web Development
              </h2>
            </div>

            <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
              We engineer performant layout standards from scratch. No clunky
              template overhead, no boilerplate layout restrictions. Just raw,
              pure functional code choreographed around fast rendering systems
              and pixel-perfect transitions.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {webDevFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="feature-item flex items-center space-x-2 text-slate-300"
                >
                  <span className="text-purple-400 font-mono text-[10px]">
                    ✦
                  </span>
                  <span className="text-sm font-light">{feat}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-purple-950/40">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                Primary Core Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {webDevTech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-purple-950/20 border border-purple-950 text-slate-400 hover:text-purple-300 hover:border-purple-500/30 cursor-default transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleScrollToSection("#cta")}
                className="btn-magnetic relative group inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-purple-500/30 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase font-bold overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <span className="group-hover:text-white transition-colors duration-300">
                  Assemble Web Engine
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: UI/UX DESIGN */}
      <section
        id="uiux"
        className="uiux-section relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20 bg-[#05050a]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-3">
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase block">
                // CAPABILITY 02
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
                UI/UX Design
              </h2>
            </div>

            <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
              Digital platform systems must perform naturally. We structure
              custom UI layouts on comprehensive behavioral mapping patterns,
              clean spatial lines, and strict brand design systems to keep
              interfaces highly engaging and balanced.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {uiuxFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="feature-item flex items-center space-x-2 text-slate-300"
                >
                  <span className="text-purple-400 font-mono text-[10px]">
                    ✦
                  </span>
                  <span className="text-sm font-light">{feat}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-purple-950/40">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                Design Instruments
              </span>
              <div className="flex flex-wrap gap-2">
                {uiuxTools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-purple-950/20 border border-purple-950 text-slate-400 hover:text-purple-300 hover:border-purple-500/30 cursor-default transition-all"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleScrollToSection("#cta")}
                className="btn-magnetic relative group inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-purple-500/30 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase font-bold overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <span className="group-hover:text-white transition-colors duration-300">
                  Request UI System
                </span>
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-purple-900/30 bg-purple-950/10 backdrop-blur-md group mouse-spotlight lg:order-2 order-1">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111026_1px,transparent_1px),linear-gradient(to_bottom,#111026_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 mix-blend-overlay" />

            <div className="absolute inset-6 rounded-xl border border-dashed border-purple-500/20 overflow-hidden flex items-center justify-center">
              <div className="parallax-img absolute w-80 h-80 rounded-full border border-purple-500/10 bg-gradient-to-br from-indigo-950/40 via-transparent to-purple-950/30 flex flex-col justify-between p-6">
                <div className="flex justify-between items-center border-b border-purple-950/60 pb-3">
                  <span className="text-[10px] font-mono text-purple-400">
                    DESIGN_LOG_OC_02
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                </div>
                <div className="space-y-2 flex flex-col items-center justify-center flex-grow">
                  <div className="h-10 w-10 border border-purple-400/20 rounded-full animate-pulse" />
                  <div className="text-[9px] font-mono text-purple-300">
                    CANVAS_SCALE_100
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">
                  VECTOR // SECURE
                </span>
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12" />
          </div>
        </div>
      </section>

      {/* SECTION 5: AI AUTOMATION */}
      <section
        id="automation"
        className="automation-section relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-purple-900/30 bg-purple-950/10 backdrop-blur-md group mouse-spotlight">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111026_1px,transparent_1px),linear-gradient(to_bottom,#111026_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 mix-blend-overlay" />

            <div className="absolute inset-6 rounded-xl border border-dashed border-purple-500/20 overflow-hidden flex items-center justify-center">
              <div className="parallax-img absolute w-80 h-80 rounded-lg border border-purple-500/10 bg-gradient-to-tr from-purple-950/40 via-transparent to-indigo-950/30 flex flex-col justify-between p-6">
                <div className="flex justify-between items-center border-b border-purple-950/60 pb-3">
                  <span className="text-[10px] font-mono text-purple-400">
                    AI_CORE_LOG_OC_03
                  </span>
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                </div>
                <div className="space-y-4 font-mono text-[9px] text-purple-300/80">
                  <div>&gt; INITIATING AUTOMATION SEQUENCE</div>
                  <div>&gt; VECTOR_DB CONNECTED</div>
                  <div>&gt; NODE_STATUS: DEPLOYED</div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">
                  AUTOMATION // SECURE
                </span>
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12" />
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase block">
                // CAPABILITY 03
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
                AI Automation
              </h2>
            </div>

            <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
              Bridge operations with machine intelligence. We link custom LLM
              logic and programmatic workflows directly inside your web
              application platforms, cutting friction while maintaining reliable
              runtime security.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {aiFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="feature-item flex items-center space-x-2 text-slate-300"
                >
                  <span className="text-purple-400 font-mono text-[10px]">
                    ✦
                  </span>
                  <span className="text-sm font-light">{feat}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-purple-950/40">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                AI Intelligence Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {aiTech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-purple-950/20 border border-purple-950 text-slate-400 hover:text-purple-300 hover:border-purple-500/30 cursor-default transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleScrollToSection("#cta")}
                className="btn-magnetic relative group inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-purple-500/30 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase font-bold overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <span className="group-hover:text-white transition-colors duration-300">
                  Deploy Intelligent Node
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TECHNOLOGY CONVEYOR */}
      <section className="relative w-full py-28 md:py-40 border-b border-purple-950/20 overflow-hidden bg-[#06060b]">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vw] rounded-full bg-purple-900/10 blur-[140px] mix-blend-screen pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-24 mb-16 text-center space-y-4">
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
            // STACK DEPLOYMENT SYSTEM
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
            Built With Modern Technologies
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-400 font-light leading-relaxed">
            We combine industry-leading technologies with thoughtful engineering
            to craft fast, scalable, and unforgettable digital experiences.
          </p>
        </div>

        <div className="relative w-full overflow-hidden select-none py-6 pointer-events-auto">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#06060b] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#06060b] to-transparent z-20 pointer-events-none" />

          <div className="conveyor-track flex gap-6 w-max will-change-transform">
            {[...conveyorTech, ...conveyorTech].map((tech, i) => (
              <div
                key={i}
                className="conveyor-card mouse-spotlight group relative w-64 p-6 rounded-xl border border-purple-900/15 bg-purple-950/5 backdrop-blur-xl transition-shadow hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] will-change-transform cursor-grab active:cursor-grabbing"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.1)_0%,transparent_50%)] pointer-events-none rounded-xl" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12 pointer-events-none" />

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-800/30 flex items-center justify-center font-mono text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                    {tech.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-slate-200 group-hover:text-purple-300 transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wide mt-0.5">
                      {tech.tag}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="faq-section relative w-full py-24 md:py-36 px-6 md:px-24 bg-[#05050a] border-b border-purple-950/20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              // SYSTEM INQUIRIES
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="faq-item-card mouse-spotlight group p-6 rounded-xl border border-purple-900/20 bg-purple-950/5 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-purple-500/30"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.06)_0%,transparent_50%)] pointer-events-none rounded-xl" />

                  <div className="flex items-center justify-between space-x-4 relative z-10">
                    <h3 className="text-base md:text-lg font-light tracking-wide text-slate-200 group-hover:text-purple-300 transition-colors">
                      {faq.q}
                    </h3>
                    <div className="w-6 h-6 rounded-full border border-purple-800/40 flex items-center justify-center text-xs font-mono text-purple-400 group-hover:border-purple-400 transition-all transform duration-300">
                      <span
                        className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                      >
                        ＋
                      </span>
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-in-out relative z-10 font-light text-sm text-slate-400 leading-relaxed overflow-hidden ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pt-4 mt-2 border-t border-purple-950/40"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA */}
      <section
        id="cta"
        className="cta-section relative w-full py-32 md:py-48 px-6 md:px-24 text-center overflow-hidden bg-gradient-to-b from-transparent to-[#040407]"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[35vw] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />

        <div className="cta-content-wrap max-w-4xl mx-auto space-y-10 relative z-10">
          <h2 className="text-4xl md:text-7xl font-light tracking-tight uppercase leading-[1.1]">
            Let’s build something <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-white">
              extraordinary.
            </span>
          </h2>

          <p className="max-w-md mx-auto text-xs md:text-sm text-slate-400 font-light tracking-wide leading-relaxed">
            Initiate communication sequence with our visual development core.
            Let's engineer your custom digital solution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="btn-magnetic relative group inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <span className="group-hover:text-white transition-colors duration-300">
                Start Your Project
              </span>
            </button>

            <button className="btn-magnetic relative group inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-purple-900/40 bg-purple-950/20 backdrop-blur-md text-slate-300 hover:text-white font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:border-purple-500/40">
              <span>View Our Work</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-purple-950/40 tracking-widest hidden md:block">
          SYS.BLUE // DEPLOY_MODULE_2026
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-purple-950/40 tracking-widest hidden md:block">
          NODE // SERVICES_PRODUCTION_BUILD
        </div>
      </section>
    </div>
  );
}
