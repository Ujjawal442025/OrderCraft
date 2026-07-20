import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes all premium layout animations, mouse tracking systems,
 * micro-interactions, and new summary package workflows for the OrderCraft Contact engine.
 */
export const initContactAnimations = (containerRef) => {
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
          x: x * 0.3,
          y: y * 0.3,
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

    // 3. Hero Entrance Timeline
    const tlHero = gsap.timeline();
    tlHero
      .fromTo(
        ".hero-grid",
        { opacity: 0 },
        { opacity: 0.12, duration: 1.5, ease: "power2.out" },
      )
      .fromTo(
        ".hero-watermark",
        { opacity: 0, y: 60 },
        { opacity: 0.02, y: 0, duration: 1.5, ease: "power3.out" },
        "-=1",
      )
      .fromTo(
        ".hero-title .word",
        { opacity: 0, y: 50, filter: "blur(10px)" },
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

    // 4. Stagger Content Sections on Scroll
    gsap.fromTo(
      ".contact-grid-left",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 75%",
        },
      },
    );

    gsap.fromTo(
      ".contact-grid-right",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 75%",
        },
      },
    );

    // 5. FAQ Section Accordion Reveal
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
          start: "top 75%",
        },
      },
    );

    // 6. Final CTA Reveal
    gsap.fromTo(
      ".cta-content-wrap",
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
        },
      },
    );
  }, containerRef);

  return () => ctx.revert();
};

/**
 * NEW: Initializes the premium dynamic glass summary card animations.
 * Runs instantly when a package parameters injection maps inside the layout view.
 */
export const initSummaryCardAnimation = (cardRef) => {
  if (!cardRef.current) return () => {};

  // Entrance pop (Fade + Blur reveal + Scale shift)
  gsap.fromTo(
    cardRef.current,
    { opacity: 0, y: 15, scale: 0.97, filter: "blur(10px)" },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power3.out",
    },
  );

  // Organic floating micro-breathing engine loop
  const floatTween = gsap.to(cardRef.current, {
    y: -4,
    duration: 2.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  // Seamless subtle light sweep loop over glass surface boundary matching layout timelines
  const sweepElement = cardRef.current.querySelector(".light-sweep");
  let sweepTween;
  if (sweepElement) {
    sweepTween = gsap.fromTo(
      sweepElement,
      { x: "-100%" },
      {
        x: "200%",
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 3,
      },
    );
  }

  // Safe isolated context cleanup
  return () => {
    floatTween.kill();
    if (sweepTween) sweepTween.kill();
  };
};

/**
 * NEW: Toggles layout space expansion heights dynamically for dropdown selectors.
 */
export const animateDropdownToggle = (dropdownRef, isOpen) => {
  if (!dropdownRef.current) return;

  if (isOpen) {
    gsap.fromTo(
      dropdownRef.current,
      { height: 0, opacity: 0, filter: "blur(4px)" },
      {
        height: "auto",
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.35,
        ease: "power2.out",
      },
    );
  } else {
    gsap.to(dropdownRef.current, {
      height: 0,
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.25,
      ease: "power2.in",
    });
  }
};
