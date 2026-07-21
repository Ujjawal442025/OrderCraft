import React, { useEffect, useRef, useState } from "react";
import { servicesData } from "./services/servicesData";
import { ServiceCard } from "./services/ServiceCard";
import { StickyImage } from "./services/StickyImage";
import { initServicesAnimation } from "../animations/servicesAnimation";
import gsap from "gsap";
export const Services = () => {
  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const animationInstance = initServicesAnimation(
          containerRef.current,
          rightPanelRef.current,
          imageContainerRef.current,
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
      className="relative w-full bg-[#050505] overflow-hidden flex flex-col lg:flex-row border-t border-white/5"
      id="services"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(124,58,237,0.04),transparent_50%)] pointer-events-none" />

      {/* --- DESKTOP RENDER BLUEPRINT (UNTOUCHED) --- */}
      <div className="hidden lg:flex w-full lg:w-[70%] h-screen lg:sticky lg:top-0 items-center justify-center lg:p-16 z-20">
        <div
          ref={imageContainerRef}
          className="relative w-full h-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]"
        >
          {servicesData.map((item, index) => (
            <StickyImage key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <div
        ref={rightPanelRef}
        className="hidden lg:block w-full lg:w-[55%] h-screen relative lg:sticky lg:top-0 z-10 overflow-hidden"
      >
        {servicesData.map((item, index) => (
          <div
            key={item.id}
            className="absolute inset-0 w-full h-full flex items-center service-card-container"
            style={{ zIndex: servicesData.length - index }}
          >
            <ServiceCard item={item} />
          </div>
        ))}
      </div>

      {/* --- PREMIUM MOBILE & TABLET TOUCH INTERACTION ACCORDION --- */}
      <div className="block lg:hidden w-full px-4 sm:px-6 py-16 z-30 space-y-4">
        <div className="mb-8">
          <span className="text-[10px] font-mono tracking-[0.4em] text-[#A855F7] uppercase block mb-2">
            // CAPABILITIES
          </span>
          <h2 className="text-3xl font-extralight tracking-tight text-white uppercase">
            Our Core Services
          </h2>
        </div>

        {servicesData.map((item, index) => {
          const isOpen = activeMobileIndex === index;
          return (
            <div
              key={item.id}
              onClick={() => setActiveMobileIndex(index)}
              className={`w-full rounded-xl border transition-all duration-500 overflow-hidden ${
                isOpen
                  ? "bg-purple-950/10 border-purple-500/30 shadow-lg"
                  : "bg-white/[0.01] border-white/5"
              }`}
            >
              <div className="p-5 flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-purple-400/70">
                    0{index + 1}
                  </span>
                  <h3 className="text-base font-light tracking-wide text-white">
                    {item.title || item.name}
                  </h3>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 border-purple-400" : ""}`}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[600px] opacity-100 border-t border-white/5" : "max-h-0 opacity-0 pointer-events-none"}`}
              >
                <div className="p-5 space-y-5 bg-black/20">
                  <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/5">
                    <img
                      src={item.image || "/api/placeholder/400/250"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="prose prose-invert text-xs sm:text-sm text-slate-400 leading-relaxed">
                    <ServiceCard item={item} mobileMode={true} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
