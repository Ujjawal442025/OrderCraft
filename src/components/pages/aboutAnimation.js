import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAboutAnimations = (containerRef) => {
  if (!containerRef.current) return null;

  const ctx = gsap.context(() => {
    // 1. Mouse Follow Spotlight & Glows
    const spotlights =
      containerRef.current.querySelectorAll(".mouse-spotlight");
    if (spotlights.length > 0) {
      window.addEventListener("mousemove", (e) => {
        spotlights.forEach((spot) => {
          const rect = spot.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(spot, {
            "--x": `${x}px`,
            "--y": `${y}px`,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }

    // 2. Hero Section Animations
    const tlHero = gsap.timeline();
    tlHero
      .fromTo(
        ".hero-bg-grid",
        { opacity: 0 },
        { opacity: 0.15, duration: 1.5, ease: "power2.out" },
      )
      .fromTo(
        ".hero-watermark",
        { opacity: 0, y: 50 },
        { opacity: 0.03, y: 0, duration: 1.5, ease: "power3.out" },
        "-=1",
      )
      .fromTo(
        ".hero-title .word",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=1.2",
      )
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        ".hero-particle",
        { opacity: 0 },
        { opacity: 0.4, duration: 2, ease: "power2.out" },
        "-=0.8",
      );

    // 3. Story Section Parallax & Reveal
    gsap.fromTo(
      ".story-img-container",
      { yPercent: 10 },
      {
        yPercent: -10,
        scrollTrigger: {
          trigger: ".story-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    gsap.fromTo(
      ".story-text-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".story-section",
          start: "top 80%",
        },
      },
    );

    // 4. Philosophy Cards Stagger
    gsap.fromTo(
      ".philosophy-card",
      { opacity: 0, y: 50, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 75%",
        },
      },
    );

    // 5. Statistics Number Counters
    const stats = containerRef.current.querySelectorAll(".stat-number");
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"), 10);
      gsap.fromTo(
        stat,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: "power3.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
        },
      );
    });

    // 6. Studio Cards Horizontal Scroll / Layout Reveal
    gsap.fromTo(
      ".studio-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".studio-section",
          start: "top 75%",
        },
      },
    );

    // 7. Values Reveal
    gsap.fromTo(
      ".value-card",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 75%",
        },
      },
    );

    // 8. Timeline Progress Drawing
    gsap.fromTo(
      ".timeline-line-progress",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 60%",
          end: "bottom 70%",
          scrub: true,
        },
      },
    );

    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40) },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 50%",
        },
      },
    );

    // 9. CTA Text & Button Reveal
    gsap.fromTo(
      ".cta-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
        },
      },
    );
  }, containerRef);

  return () => ctx.revert();
};
