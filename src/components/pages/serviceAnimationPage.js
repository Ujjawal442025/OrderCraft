import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initServiceAnimations = (containerRef) => {
  if (!containerRef.current) return null;

  const ctx = gsap.context(() => {
    // 1. Mouse-Follow Spotlights
    const spotlights =
      containerRef.current.querySelectorAll(".mouse-spotlight");
    if (spotlights.length > 0) {
      const handleMouseMove = (e) => {
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
      };
      window.addEventListener("mousemove", handleMouseMove);
    }

    // 2. Magnetic Buttons
    const magneticButtons =
      containerRef.current.querySelectorAll(".btn-magnetic");
    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      });
    });

    // 3. Hero Animation Timeline
    const tlHero = gsap.timeline();
    tlHero
      .fromTo(
        ".hero-grid",
        { opacity: 0 },
        { opacity: 0.12, duration: 1.5, ease: "power2.out" },
      )
      .fromTo(
        ".hero-watermark",
        { opacity: 0, y: 80 },
        { opacity: 0.02, y: 0, duration: 1.5, ease: "power3.out" },
        "-=1",
      )
      .fromTo(
        ".hero-title .word",
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.08,
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
        ".hero-particles",
        { opacity: 0 },
        { opacity: 0.4, duration: 2 },
        "-=0.8",
      );

    // 4. Services Overview Cards Stagger
    gsap.fromTo(
      ".overview-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".overview-section",
          start: "top 75%",
        },
      },
    );

    // 5. Image Parallax Effects
    const parallaxContainers = [
      ".webdev-section",
      ".uiux-section",
      ".automation-section",
    ];
    parallaxContainers.forEach((sectionSelector) => {
      gsap.fromTo(
        `${sectionSelector} .parallax-img`,
        { yPercent: 8 },
        {
          yPercent: -8,
          scrollTrigger: {
            trigger: sectionSelector,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    // 6. Section Feature Staggers
    const sections = [
      ".webdev-section",
      ".uiux-section",
      ".automation-section",
    ];
    sections.forEach((sec) => {
      gsap.fromTo(
        `${sec} .feature-item`,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 70%",
          },
        },
      );
    });

    // 7. Tech Stack Infinite Horizontal Conveyor
    const marqueeTrack = containerRef.current.querySelector(".conveyor-track");
    if (marqueeTrack) {
      const marqueeItems = marqueeTrack.querySelectorAll(".conveyor-card");
      const totalWidth = marqueeTrack.scrollWidth / 2;

      const marqueeTween = gsap.to(marqueeTrack, {
        x: -totalWidth,
        duration: 35,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      // Hover interaction slowdown
      marqueeTrack.addEventListener("mouseenter", () => {
        gsap.to(marqueeTween, {
          timeScale: 0.15,
          duration: 1.2,
          ease: "power2.out",
        });
      });

      marqueeTrack.addEventListener("mouseleave", () => {
        gsap.to(marqueeTween, {
          timeScale: 1,
          duration: 1.5,
          ease: "power2.inOut",
        });
      });

      // Individual Card Dynamic Magnetic Hover & Rotation
      marqueeItems.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            x: x * 0.15,
            y: y * 0.15 - 10,
            scale: 1.04,
            rotationZ: x * 0.03,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        });
      });
    }

    // 8. FAQ Cards Stagger
    gsap.fromTo(
      ".faq-item-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
        },
      },
    );

    // 9. Final CTA Entrance
    gsap.fromTo(
      ".cta-content-wrap",
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 85%",
        },
      },
    );
  }, containerRef);

  return () => ctx.revert();
};
