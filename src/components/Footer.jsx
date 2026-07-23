import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const WhatsAppIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 004.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.44.29.15.46.13.63-.08.17-.2.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
  // Update these with your real profile URLs
  const socialLinks = [
    {
      name: "Whatsapp",
      url: "https://wa.me/918527283407",
      Icon: WhatsAppIcon,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ordercraft21/",
      Icon: Instagram,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/19C7L1T2dH/",
      Icon: Facebook,
    },
  ];

  const containerRef = useRef(null);
  const headlineMaskRef = useRef(null);
  const ctaRef = useRef(null);
  const brandRef = useRef(null);
  const gridColumnsRef = useRef([]);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Entrance Timeline triggered on Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // 1. Headline Mask Reveal (Y-translate from 100% hidden inside parent clip-path)
      tl.fromTo(
        headlineMaskRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.2, ease: "power4.out" },
      )
        // 2. CTA Button Fade & Slide Up
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7",
        )
        // 3. Huge ORDERCRAFT Wordmark Mask Reveal
        .fromTo(
          brandRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
          "-=0.6",
        )
        // 4. Grid Columns Staggered Stagger Fade
        .fromTo(
          gridColumnsRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        // 5. Bottom Bar Fade
        .fromTo(
          bottomBarRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle Magnetic Hover Effect for Primary CTA
  const handleCtaMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCtaMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-black font-sans"
    >
      {/* Subtle Purple Ambient Lighting (Non-decorative, background depth only) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#A855F7] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />

      {/* ==========================================
          FIRST SCREEN / HERO SECTION (80–100vh)
         ========================================== */}
      <div className="min-h-[85vh] lg:min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-12 relative z-10">
        {/* Top Spacer to balance viewport geometry */}
        <div className="w-full hidden md:block" />

        {/* Editorial Headline & CTA Block */}
        <div className="max-w-6xl my-auto pt-12 md:pt-0">
          {/* Mask container for overflow clipping during reveal */}
          <div className="overflow-hidden py-2">
            <h2
              ref={headlineMaskRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05] text-white/90 max-w-5xl"
            >
              Let’s build something <br className="hidden sm:block" />
              <span className="font-serif italic text-white/60">
                people remember.
              </span>
            </h2>
          </div>

          {/* Magnetic Primary CTA */}
          <div ref={ctaRef} className="mt-10 md:mt-14 inline-block">
            <a
              href="#contact"
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              className="group relative inline-flex items-center gap-4 text-lg md:text-xl font-medium tracking-wide text-white no-underline py-2 pr-6 transition-opacity duration-300 hover:opacity-80"
            >
              <Link to="contact" className="relative">
                Start a Project
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-out" />
              </Link>
              <span className="text-xl md:text-2xl transform group-hover:translate-x-2 transition-transform duration-400 ease-out">
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Huge ORDERCRAFT Wordmark (Hero Typography Element) */}
        <div className="w-full overflow-hidden mt-16 lg:mt-0 pt-8 border-b border-white/10">
          <h1
            ref={brandRef}
            className="text-[14vw] font-black tracking-tighter leading-[0.8] uppercase text-white/95 select-none pointer-events-none text-center lg:text-left -ml-[0.02em]"
          >
            ORDERCRAFT
          </h1>
        </div>
      </div>

      {/* ==========================================
          INFORMATIONAL FOUR-COLUMN LAYOUT
         ========================================== */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-16 lg:py-24 relative z-10 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: About (Span 4) */}
          <div
            ref={(el) => (gridColumnsRef.current[0] = el)}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono mb-6 block">
              01 // About
            </span>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-sm">
              OrderCraft creates premium digital experiences through strategy,
              design, motion and development.
            </p>
          </div>

          {/* Column 2: Navigation (Span 3) */}
          <div
            ref={(el) => (gridColumnsRef.current[1] = el)}
            className="lg:col-span-3"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono mb-6 block">
              02 // Navigation
            </span>
            <ul className="space-y-3 p-0 m-0 list-none">
              {["Home", "Projects", "Services", "About", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`${item.toLowerCase()}`}
                      className="group inline-flex items-center text-lg text-white/70 hover:text-white no-underline transition-colors duration-300"
                    >
                      <span className="relative">
                        {item}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 3: Social (Span 2) */}
          <div
            ref={(el) => (gridColumnsRef.current[2] = el)}
            className="lg:col-span-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono mb-6 block">
              03 // Social
            </span>
            <ul className="space-y-3 p-0 m-0 list-none">
              {socialLinks.map(({ name, url, Icon }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded bg-purple-950/20 border border-purple-950 hover:border-purple-500/30 text-slate-400 hover:text-purple-400 cursor-pointer transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{name}</span>
                </a>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact (Span 3) */}
          <div
            ref={(el) => (gridColumnsRef.current[3] = el)}
            className="lg:col-span-3 flex flex-col"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono mb-6 block">
              04 // Contact
            </span>
            <a
              href="mailto:hello@ordercraft.dev"
              className="group text-lg md:text-xl text-white/90 hover:text-white no-underline transition-colors duration-300 mb-2 inline-block"
            >
              <span className="relative">
                ordercraft21@gmail.com
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </a>
            <span className="text-sm text-white/40 font-light mt-1">
              Available Worldwide
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          BOTTOM BAR
         ========================================== */}
      <div
        ref={bottomBarRef}
        className="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40 tracking-wider uppercase relative z-10"
      >
        <div>&copy;2026 OrderCraft</div>
        <div className="sm:text-right">Built with React &amp; GSAP</div>
      </div>
    </footer>
  );
};
