import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { featuredProjects } from "./featuredProjects";
import { ProjectImage } from "./ProjectImage";
import { ProjectCard } from "./ProjectCard";
import { initFeaturedWorkAnimation } from "../../animations/featuredWorkAnimation";

export const FeaturedWork = () => {
  const containerRef = useRef(null);
  const leftCanvasRef = useRef(null);
  const rightExhibitRef = useRef(null);
  const trackBarRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const animationInstance = initFeaturedWorkAnimation(
          containerRef.current,
          leftCanvasRef.current,
          rightExhibitRef.current,
          trackBarRef.current,
        );
        return () => {
          if (animationInstance?.scrollTrigger)
            animationInstance.scrollTrigger.kill();
          animationInstance?.kill();
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-hidden flex flex-col border-t border-white/5 select-none pb-safe"
      id="featured-work"
    >
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <div className="w-full mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-16 pt-16 lg:pt-24 lg:-mb-20 relative z-30 bg-[#050505]">
        <span className="text-[10px] font-mono tracking-[0.5em] text-[#A855F7] uppercase block mb-3">
          // ARCHIVE OF EXCELLENCE
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-tight text-white uppercase font-sans">
          Selected{" "}
          <span className="text-white/40 italic font-serif lowercase">
            projects
          </span>
        </h2>
      </div>

      {/* --- DESKTOP MATRIX DISPLAY PANEL ROW (UNTOUCHED) --- */}
      <div className="hidden lg:flex w-full flex-col lg:flex-row relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,transparent_40%,#000000_90%)] pointer-events-none z-10" />

        <div
          ref={leftCanvasRef}
          className="w-full lg:w-[58%] h-screen lg:sticky lg:top-0 flex items-center justify-center lg:p-16 z-20 overflow-hidden"
        >
          <div className="relative w-full h-full max-w-[640px] aspect-[4/4] flex items-center justify-center">
            {featuredProjects.map((project, index) => (
              <ProjectImage key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        <div
          ref={rightExhibitRef}
          className="w-full lg:w-[42%] h-screen relative lg:sticky lg:top-0 z-20 overflow-hidden border-l border-white/[0.03]"
        >
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="absolute inset-0 w-full h-full flex items-center bg-transparent editorial-card-container"
              style={{ zIndex: featuredProjects.length - index }}
            >
              <ProjectCard project={project} />
            </div>
          ))}

          <div className="absolute right-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-white/10 flex flex-col justify-between items-center py-2 z-30">
            <span className="text-[8px] font-mono text-white/30 tracking-widest">
              01
            </span>
            <div className="relative w-[1px] h-24 bg-white/5 overflow-hidden">
              <div
                ref={trackBarRef}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/60 to-white/10 origin-top scale-y-0 will-change-transform"
              />
            </div>
            <span className="text-[8px] font-mono text-white/30 tracking-widest">
              04
            </span>
          </div>
        </div>
      </div>

      {/* --- MOBILE & TABLET DEDICATED STACKED TIMELINE --- */}
      <div className="block lg:hidden w-full px-4 sm:px-6 py-12 space-y-12 z-20">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            className="w-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden flex flex-col"
          >
            <div className="w-full aspect-square relative bg-neutral-900 overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
              <div className="w-full h-full max-w-[400px] flex items-center justify-center">
                <ProjectImage project={project} index={0} forcedActive={true} />
              </div>
              <span className="absolute top-4 right-4 font-mono text-[10px] text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                CASE_0{index + 1}
              </span>
            </div>

            <div className="p-6 bg-black/40 backdrop-blur-md">
              <ProjectCard project={project} mobileMode={true} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
