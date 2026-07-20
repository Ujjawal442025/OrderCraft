import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const containerRef = useRef(null);
  const backgroundGlowRef = useRef(null);
  const objectsGridRef = useRef(null);
  const formTerminalRef = useRef(null);

  const [activePrompt, setActivePrompt] = useState(
    "Tap to generate a new design parameter vision...",
  );
  const [activeQuote, setActiveQuote] = useState(
    "Click to load studio memory insights.",
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });

  const isFormOpenRef = useRef(isFormOpen);
  useEffect(() => {
    isFormOpenRef.current = isFormOpen;
  }, [isFormOpen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    const entranceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=10%",
        toggleActions: "play none none none",
      },
    });

    entranceTimeline.fromTo(
      container.querySelectorAll(".premium-node"),
      {
        opacity: 0,
        y: 30,
        scale: 0.98,
        filter: "blur(4px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.04,
        ease: "power2.out",
      },
    );

    const floatAnimations = [];
    const floatNodes = container.querySelectorAll(".premium-node");

    // Execute complex animation layers exclusively on desktop monitors
    mm.add("(min-width: 1024px)", () => {
      floatNodes.forEach((node, i) => {
        if (node.classList.contains("form-terminal-node")) return;

        const anim = gsap.to(node, {
          y: "+=12",
          rotation: i % 2 === 0 ? 1.2 : -1.2,
          duration: 4 + (i % 2) * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        });
        floatAnimations.push(anim);
      });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = container.getBoundingClientRect();
        const localX = clientX - left;
        const localY = clientY - top;

        gsap.to(backgroundGlowRef.current, {
          x: localX - width / 2,
          y: localY - height / 2,
          duration: 1.4,
          ease: "power2.out",
        });

        floatNodes.forEach((node) => {
          if (
            isFormOpenRef.current &&
            node.classList.contains("form-terminal-node")
          )
            return;

          const factor = 0.015;
          const targetX = (clientX - window.innerWidth / 2) * factor;
          const targetY = (clientY - window.innerHeight / 2) * factor;

          gsap.to(node, {
            x: targetX,
            y: targetY,
            overwrite: "auto",
            duration: 0.8,
            ease: "power2.out",
          });
        });
      };

      container.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
    });

    return () => {
      mm.revert();
      entranceTimeline.kill();
      floatAnimations.forEach((anim) => anim.kill());
    };
  }, []);

  const handleNodeHover = (e, color) => {
    if (window.innerWidth < 1024) return; // Prevent performance thrashing on mobile viewports
    if (isFormOpen && e.currentTarget.classList.contains("form-terminal-node"))
      return;
    gsap.to(e.currentTarget, {
      scale: 1.02,
      borderColor: `${color}40`,
      boxShadow: `0 12px 30px ${color}05`,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleNodeLeave = (e) => {
    if (window.innerWidth < 1024) return;
    if (isFormOpen && e.currentTarget.classList.contains("form-terminal-node"))
      return;
    gsap.to(e.currentTarget, {
      scale: 1,
      borderColor: "rgba(255,255,255,0.06)",
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden py-16 md:py-24 px-6 sm:px-8 md:px-16 border-t border-white/5"
    >
      {/* ATMOSPHERE BACKDROPS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#000000_90%)] pointer-events-none z-10" />
      <div
        ref={backgroundGlowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 w-[320px] sm:w-[600px] lg:w-[800px] h-[320px] sm:h-[600px] lg:h-[800px] bg-purple-600/5 rounded-full filter blur-[80px] lg:blur-[120px] pointer-events-none z-0 transform-gpu"
      />

      {/* TOP META */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-white/5 pb-6 text-[11px] sm:text-xs tracking-wider text-white/40 font-medium">
        <div>Creative Studio Playground</div>
        <div>Active Environment</div>
      </div>

      {/* MAIN CARDS GRID */}
      <div
        ref={objectsGridRef}
        className="relative z-20 my-auto w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch py-10 md:py-12"
      >
        {/* INTERACTIVE CARDS */}
        <div
          onMouseEnter={(e) => handleNodeHover(e, "#a855f7")}
          onMouseLeave={handleNodeLeave}
          className="premium-node bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md flex flex-col justify-center"
        >
          <h3 className="text-white font-normal text-lg sm:text-xl tracking-tight">
            Interactive Lab
          </h3>
          <p className="text-white/50 text-xs sm:text-sm mt-3 leading-relaxed">
            Explore interactive layouts built with smooth physics, custom
            acceleration profiles, and real-time state changes.
          </p>
        </div>

        <div
          onClick={() => {
            const quotes = [
              "Simplicity is ultimate sophistication.",
              "Design is how it works.",
              "Make it simple, but significant.",
            ];
            setActiveQuote(quotes[Math.floor(Math.random() * quotes.length)]);
          }}
          onMouseEnter={(e) => handleNodeHover(e, "#eab308")}
          onMouseLeave={handleNodeLeave}
          className="premium-node bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md cursor-pointer flex flex-col justify-center min-h-[140px]"
        >
          <h3 className="text-white font-normal text-lg sm:text-xl tracking-tight">
            Studio Memory
          </h3>
          <p className="text-white/70 text-xs sm:text-sm font-medium mt-4 italic leading-relaxed">
            "{activeQuote}"
          </p>
        </div>

        {/* CONTACT TERMINAL */}
        <div
          ref={formTerminalRef}
          onMouseEnter={(e) => handleNodeHover(e, "#c084fc")}
          onMouseLeave={handleNodeLeave}
          onClick={() => {
            if (!isFormOpen) setIsFormOpen(true);
          }}
          className={`premium-node form-terminal-node bg-white/[0.02] border backdrop-blur-xl rounded-2xl p-6 sm:p-8 transition-all duration-300 sm:col-span-2 flex flex-col justify-center min-h-[220px] ${
            isFormOpen
              ? "border-purple-500/30 shadow-[0_15px_40px_rgba(168,85,247,0.1)] cursor-default"
              : "border-white/5 cursor-pointer"
          }`}
        >
          {!isFormOpen ? (
            <div className="flex flex-col justify-between h-full gap-4">
              <div>
                <h3 className="text-white font-normal text-xl sm:text-2xl tracking-tight">
                  Let's Build Together
                </h3>
                <p className="text-white/50 text-xs sm:text-sm mt-2 leading-relaxed">
                  Ready to kick off a project? Click below to send a direct
                  request to our workspace team.
                </p>
              </div>
              <button className="w-full py-3.5 sm:py-4 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-purple-500 hover:text-white transition-colors cursor-pointer border-0 shadow-md active:scale-[0.98] duration-200">
                Start Communication
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsFormOpen(false);
              }}
              className="flex flex-col gap-4 text-sm w-full"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-white/40 tracking-wide font-medium text-xs">
                  New Project Inquiry
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFormOpen(false);
                  }}
                  className="text-rose-400 hover:text-rose-300 cursor-pointer font-medium text-xs min-h-[32px] flex items-center px-2"
                >
                  [ Close ]
                </span>
              </div>

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Your email address"
                className="bg-black/40 border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-purple-500 transition-colors min-h-[44px]"
              />

              <textarea
                rows={2}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us about your project parameters..."
                className="bg-black/40 border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-purple-500 transition-colors resize-none min-h-[64px]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-medium text-xs tracking-wider uppercase hover:bg-purple-500 transition-colors cursor-pointer border-0 min-h-[44px]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* LINK MODULES */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={(e) => handleNodeHover(e, "#0077b5")}
          onMouseLeave={handleNodeLeave}
          className="premium-node block bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md no-underline flex flex-col justify-center min-h-[120px]"
        >
          <h3 className="text-white font-normal text-lg sm:text-xl tracking-tight">
            LinkedIn →
          </h3>
          <p className="text-white/40 text-xs sm:text-sm mt-2">
            Follow our business announcements.
          </p>
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={(e) => handleNodeHover(e, "#ffffff")}
          onMouseLeave={handleNodeLeave}
          className="premium-node block bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md no-underline flex flex-col justify-center min-h-[120px]"
        >
          <h3 className="text-white font-normal text-lg sm:text-xl tracking-tight">
            GitHub →
          </h3>
          <p className="text-white/40 text-xs sm:text-sm mt-2">
            Browse open-source resources.
          </p>
        </a>

        <div
          onClick={() => {
            const prompts = [
              "Design custom layout configurations.",
              "Optimize system application performance.",
              "Refine luxury platform aesthetics.",
            ];
            setActivePrompt(
              prompts[Math.floor(Math.random() * prompts.length)],
            );
          }}
          onMouseEnter={(e) => handleNodeHover(e, "#3b82f6")}
          onMouseLeave={handleNodeLeave}
          className="premium-node bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md cursor-pointer sm:col-span-2 flex flex-col justify-center min-h-[140px]"
        >
          <h3 className="text-white font-normal text-lg sm:text-xl tracking-tight">
            Vision Engine
          </h3>
          <p className="text-white/60 text-xs sm:text-sm mt-3 bg-black/30 p-4 rounded-xl border border-white/5 italic leading-relaxed">
            "{activePrompt}"
          </p>
        </div>
      </div>

      {/* CORE IDENTITY SIGNATURE & COMPLIANCE NAV */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center mt-auto border-t border-white/5 pt-10">
        <h2 className="text-[14vw] sm:text-[13vw] font-black tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white/[0.06] to-transparent select-none leading-none pointer-events-none">
          ORDERCRAFT
        </h2>

        {/* BOTTOM METADATA BAR WITH REGULATORY LINKS */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 mt-6 text-[11px] sm:text-xs text-white/30 tracking-wider font-medium">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            Workspace ©2026 // Bespoke Production
          </div>

          {/* Compliance Sub-Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 order-1 lg:order-2">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors duration-300 no-underline py-2"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors duration-300 no-underline py-2"
            >
              Terms of Service
            </Link>
            <button
              onClick={() => alert("Cookie settings panel placeholder")}
              className="bg-transparent border-0 p-0 text-[11px] sm:text-xs text-white/30 tracking-wider font-medium hover:text-white transition-colors duration-300 cursor-pointer outline-none py-2"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
