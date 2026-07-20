import React, { useRef, useEffect } from "react";

export const ProjectImage = ({ project, index }) => {
  const boundingRef = useRef(null);

  useEffect(() => {
    const card = boundingRef.current;
    if (!card || window.innerWidth < 1024) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);

      card.style.setProperty("--mx", `${x * 12}deg`);
      card.style.setProperty("--my", `${y * -12}deg`);
      card.style.setProperty("--px", `${x * 25}px`);
      card.style.setProperty("--py", `${y * 25}px`);
    };

    const handleMouseLeave = () => {
      card.style.setProperty("--mx", "0deg");
      card.style.setProperty("--my", "0deg");
      card.style.setProperty("--px", "0px");
      card.style.setProperty("--py", "0px");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={boundingRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center canvas-composition-wrapper will-change-transform perspective-[1500px]"
      style={{
        zIndex: 10 - index,
        "--mx": "0deg",
        "--my": "0deg",
        "--px": "0px",
        "--py": "0px",
      }}
    >
      {/* LAYER 6: Background Ambient Glow */}
      <div
        className={`absolute w-[110%] h-[110%] bg-gradient-to-tr ${project.gradient} opacity-60 blur-3xl rounded-full transition-all duration-1000 pointer-events-none`}
        style={{
          transform:
            "translate3d(calc(var(--px) * 0.4), calc(var(--py) * 0.4), 0)",
        }}
      />
      <div
        className="absolute w-[65%] h-[65%] rounded-full opacity-40 mix-blend-screen filter blur-[100px] pointer-events-none animate-[breathGlow_8s_ease-in-out_infinite_alternate]"
        style={{ backgroundColor: project.glowColor }}
      />

      {/* LAYER 7: Orbit Wireframes */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-95"
        style={{
          transform:
            "translate3d(calc(var(--px) * 0.5), calc(var(--py) * 0.5), 0) rotate(15deg)",
        }}
      >
        <div className="absolute border border-dashed border-white rounded-full w-[105%] aspect-square animate-[spin_50s_linear_infinite]" />
        <div className="absolute border border-white rounded-full w-[80%] aspect-square opacity-40 animate-[spin_35s_linear_infinite_reverse]" />
      </div>

      {/* COMPOSITION INTERACTIVES INNER FRAME */}
      <div
        className="relative w-[85%] aspect-[14/10] flex items-center justify-center transition-transform duration-300 ease-out preserve-3d"
        style={{ transform: "rotateX(var(--my)) rotateY(var(--mx))" }}
      >
        {/* LAYER 1: Main Project Mockup Device Canvas Frame */}
        <div
          className="absolute inset-0 w-full h-full bg-[#0d0d0d] rounded-xl overflow-hidden border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] main-device-mockup animate-[floatDevice_6s_ease-in-out_infinite_alternate] preserve-3d"
          style={{ transform: "translate3d(0, 0, 20px)" }}
        >
          {/* Browser Control Bar Header */}
          <div className="w-full h-6 bg-[#161616] border-b border-white/5 flex items-center px-4 gap-1.5 z-20 relative">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-32 h-3 bg-white/5 rounded mx-auto" />
          </div>

          {/* CONTENT HOUSING UNIT */}
          <div className="relative w-full  bg-[#0A0A0A] overflow-hidden">
            {/* 🔴 WORK IMAGE ELEMENT - DYNAMICALLY REPLACES ABSTRACT CODE MOCKUP 🔴 */}
            {project.imageSrc ? (
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.95]"
              />
            ) : (
              /* If no asset path is supplied yet, render the beautiful animated placeholder layout cleanly */
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[10px] font-mono tracking-widest text-white/30">
                    ORDERCRAFT // PLATFORM ARCHIVE
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-white/60">
                    EST. 2026
                  </span>
                </div>
                <div className="my-auto flex flex-col gap-2 items-start">
                  <div className="h-8 w-2/3 bg-gradient-to-r from-white/10 to-transparent rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/5 rounded" />
                </div>
              </div>
            )}

            {/* OPTIONAL 🎬 VIDEO LAYER CONFIGURATION ALTERNATIVE:
            <video 
              src={project.videoSrc} 
              autoPlay muted loop playsInline 
              className="w-full h-full object-cover"
            /> 
            */}

            {/* LAYER 5: Light Sweep Overlay Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[lightSweep_7s_ease-in-out_infinite] z-10 pointer-events-none" />
          </div>
        </div>

        {/* LAYER 2: Glassmorphism Analytics Card */}
        <div
          className="absolute bottom-[-5%] right-[-5%] w-52 p-4 rounded-xl border border-white/10 bg-white/[0.01] backdrop-blur-xl shadow-2xl glass-analytics-card transform will-change-transform animate-[floatCard_5.5s_ease-in-out_infinite_alternate] z-20"
          style={{
            transform:
              "translate3d(calc(var(--px) * 1.15), calc(var(--py) * 1.15), 60px)",
          }}
        >
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1 font-mono">
            // SIGNAL PERFORMANCE
          </p>
          <h4 className="text-2xl font-light text-white tracking-tight leading-none mb-1">
            {project.metrics.primary}
          </h4>
          <p className="text-[10px] text-white/60 font-light">
            {project.metrics.label}
          </p>
          <div className="w-full h-[2px] bg-white/5 mt-3 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-gradient-to-r from-white/40 to-transparent rounded-full animate-[fillMetrics_3s_ease-out_infinite]" />
          </div>
        </div>

        {/* LAYER 3: Orbiting Technology Badges */}
        <div
          className="absolute top-[-8%] left-[-5%] flex flex-col gap-2 pointer-events-none z-20"
          style={{
            transform:
              "translate3d(calc(var(--px) * 1.35), calc(var(--py) * 1.35), 80px)",
          }}
        >
          {project.tech.slice(0, 2).map((t, i) => (
            <div
              key={t}
              className="px-3 py-1.5 rounded-md border border-white/5 bg-[#0e0e0e]/90 shadow-lg text-[10px] font-mono tracking-widest text-white/60 uppercase orbit-chip transform transition-all duration-300 hover:scale-105 hover:border-white/20 hover:text-white"
              style={{
                animation: `floatBadge ${5 + i}s ease-in-out infinite alternate`,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* LAYER 4: Interaction Hint */}
        <div className="absolute top-[45%] right-[40%] pointer-events-none z-30 animate-[virtualCursor_6s_ease-in-out_infinite]">
          <div className="w-3 h-3 rounded-full bg-white/80 filter blur-[0.5px] relative">
            <div className="absolute inset-0 rounded-full border border-white/50 animate-ping scale-150" />
          </div>
        </div>
      </div>
    </div>
  );
};
