import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { initTestimonialAnimations } from "./testimonialAnimation";

export default function Testimonials() {
  const containerRef = useRef(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });

  const testimonials = [
    {
      id: "featured",
      isFeatured: true,
      name: "Sarah Jenkins",
      position: "VP of Product",
      company: "Aetheris Labs",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
      quote:
        "OrderCraft has completely transformed how we build digital interfaces. Their rigorous attention to micro-interactions combined with an engineering-first architecture helped us deliver our next-gen system months ahead of schedule. The visual storytelling they integrated is absolute masterclass.",
      result: "REDUCED TIME-TO-MARKET BY 42%",
      gridClass:
        "lg:col-span-8 lg:row-span-2 lg:col-start-3 lg:row-start-2 z-30",
    },
    {
      id: "const-1",
      isFeatured: false,
      name: "Marcus Vance",
      position: "Technical Director",
      company: "Hyperion Dev",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      quote:
        "Exceptional clean code coupled with elite-tier visual artistry. Their integration structure is incredibly robust.",
      result: "+180% RENDER PERFORMANCE",
      gridClass:
        "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:translate-y-8 z-20",
    },
    {
      id: "const-2",
      isFeatured: false,
      name: "Elena Rostova",
      position: "Lead UX Architect",
      company: "Novus Interactive",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
      quote:
        "The interactive experience they built is flawless. It holds 60 FPS effortlessly across devices.",
      result: "99.9% ACCESSIBILITY COMPLIANCE",
      gridClass:
        "lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:-translate-y-4 z-20",
    },
    {
      id: "const-3",
      isFeatured: false,
      name: "Devon Takahashi",
      position: "Chief Innovation Officer",
      company: "Apex Digital",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
      quote:
        "Their process brought a fresh perspective. Our platform bounce rate dropped immediately post-deployment.",
      result: "-35% PLATFORM BOUNCE RATE",
      gridClass:
        "lg:col-span-4 lg:col-start-1 lg:row-start-4 lg:-translate-y-12 z-20",
    },
    {
      id: "const-4",
      isFeatured: false,
      name: "Chloe Devereaux",
      position: "Brand Director",
      company: "Vanguard Luxe",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
      quote:
        "Pure luxury in the digital space. The visual fidelity and premium blueprint aesthetic are stunning.",
      result: "+240% USER ENGAGEMENT",
      gridClass:
        "lg:col-span-4 lg:col-start-9 lg:row-start-4 lg:translate-y-6 z-20",
    },
    {
      id: "const-5",
      isFeatured: false,
      name: "Liam Sterling",
      position: "Founder",
      company: "Krypton Scale",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
      quote:
        "Uncompromising standard of creative output. OrderCraft is in a league of their own.",
      result: "10x SCALE CAPABILITY",
      gridClass:
        "lg:col-span-4 lg:col-start-5 lg:row-start-5 lg:-translate-y-10 z-20",
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cleanup = initTestimonialAnimations(containerRef);
        return () => {
          if (cleanup) cleanup();
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleGlobalMouseMove = (e) => {
    if (
      !containerRef.current ||
      window.matchMedia("(max-width: 1023px)").matches
    )
      return;
    const rect = containerRef.current.getBoundingClientRect();
    setGlobalMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative w-full bg-[#07070c] py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden border-b border-purple-950/20 perspective-1000 antialiased pb-safe"
      style={{
        "--global-x": `${globalMouse.x}px`,
        "--global-y": `${globalMouse.y}px`,
      }}
    >
      <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_var(--global-x)_var(--global-y),rgba(147,51,234,0.06)_0%,transparent_50%)] pointer-events-none z-10" />
      <div className="absolute top-[30%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[55vw] h-[55vw] rounded-full bg-purple-950/15 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#13112b_1px,transparent_1px),linear-gradient(to_bottom,#13112b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none mix-blend-overlay" />

      <div className="max-w-5xl mx-auto text-center mb-16 lg:mb-24 space-y-4 relative z-20">
        <span className="text-xs font-mono text-purple-400 tracking-[0.4em] uppercase block">
          // CLIENT REVIEWS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extralight tracking-tight uppercase text-white leading-tight">
          What Our <br />
          <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-white font-normal">
            Clients Say
          </span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-6 relative z-20 select-none pb-12">
        {testimonials.map((card) => {
          const isDimmed = hoveredCardId !== null && hoveredCardId !== card.id;

          return (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-500 ease-out preserve-3d ${
                card.isFeatured
                  ? "p-6 sm:p-8 md:p-12 border-purple-500/20 bg-purple-950/10 shadow-[0_30px_70px_rgba(139,92,246,0.1)]"
                  : "p-6 md:p-8 border-purple-900/10 bg-purple-950/5"
              } ${card.gridClass} ${
                isDimmed
                  ? "lg:opacity-40 lg:scale-[0.98] lg:blur-[1px]"
                  : "opacity-100"
              }`}
              style={{
                "--mouse-x": "50%",
                "--mouse-y": "50%",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(168,85,247,0.08)_0%,transparent_60%)] pointer-events-none rounded-2xl" />
              <div className="absolute top-0 left-0 w-2 h-[1px] bg-purple-500/30" />
              <div className="absolute top-0 left-0 h-2 w-[1px] bg-purple-500/30" />
              <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-purple-500/30" />
              <div className="absolute bottom-0 right-0 h-2 w-[1px] bg-purple-500/30" />

              <div className="absolute top-3 right-3 flex items-center space-x-1.5 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span className="text-[8px] font-mono text-slate-500 tracking-wider">
                  {card.isFeatured ? "SYS_PRIMARY" : "NODE_ACTIVE"}
                </span>
              </div>

              <div className="space-y-5 relative z-10 pointer-events-none">
                <div className="flex items-center space-x-1">
                  {[...Array(card.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-purple-400/90 fill-purple-400/30"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p
                  className={`font-sans font-light leading-relaxed text-slate-200 ${
                    card.isFeatured
                      ? "text-base sm:text-lg md:text-2xl tracking-wide"
                      : "text-xs sm:text-sm text-slate-300"
                  }`}
                >
                  "{card.quote}"
                </p>

                <div className="pt-3 border-t border-purple-950/40 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-purple-400 tracking-widest">
                    {card.result}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-3 relative z-10 pointer-events-none">
                <img
                  src={card.avatar}
                  alt={card.name}
                  className="w-10 h-10 rounded-full object-cover border border-purple-500/20"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    {card.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {card.position} at{" "}
                    <span className="text-purple-400/90 font-mono">
                      {card.company}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 relative z-20">
        {[
          {
            label: "Client Satisfaction",
            value: 98,
            suffix: "%",
            code: "SYS_SAT_INDEX",
          },
          {
            label: "Projects Delivered",
            value: 50,
            suffix: "+",
            code: "SYS_PROJ_COUNT",
          },
          {
            label: "Average Response",
            value: 24,
            suffix: " Hours",
            code: "SYS_RESP_TIME",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="group relative p-6 rounded-xl border border-purple-900/10 bg-purple-950/5 backdrop-blur-md"
          >
            <div className="relative z-10 flex flex-col justify-between space-y-3">
              <span className="text-[8px] font-mono text-purple-400/80 tracking-widest uppercase">
                // {stat.code}
              </span>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                  {stat.value}
                  {stat.suffix}
                </div>
                <h3 className="text-xs font-light text-slate-400 tracking-wide mt-1">
                  {stat.label}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
