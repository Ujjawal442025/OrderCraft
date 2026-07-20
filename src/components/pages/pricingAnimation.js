import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes all premium visual animations and micro-interactions for the OrderCraft Pricing Page.
 * Returns a GSAP Context instance for safe component-unmount cleanups.
 */
export const initPricingAnimations = (containerRef) => {
  const ctx = gsap.context(() => {
    // 1. Mouse Follow Spotlight & Parallax Depth Tracking
    const spotlight = containerRef.current.querySelector(".mouse-spotlight");
    const blueprint = containerRef.current.querySelector(".blueprint-bg");
    const aurora = containerRef.current.querySelector(".aurora-glow");

    if (spotlight) {
      const setSpotlightX = gsap.quickSetter(spotlight, "x", "px");
      const setSpotlightY = gsap.quickSetter(spotlight, "y", "px");

      window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        setSpotlightX(clientX - 150);
        setSpotlightY(clientY - 150);

        // Premium Layered Parallax Depth Offset
        if (blueprint) {
          gsap.to(blueprint, {
            x: (clientX - window.innerWidth / 2) * 0.015,
            y: (clientY - window.innerHeight / 2) * 0.015,
            duration: 0.8,
            ease: "power2.out",
          });
        }
        if (aurora) {
          gsap.to(aurora, {
            x: (clientX - window.innerWidth / 2) * -0.02,
            y: (clientY - window.innerHeight / 2) * -0.02,
            duration: 1.2,
            ease: "power2.out",
          });
        }
      });
    }

    // 2. Floating Hero Dashboard Micro-Breathing Animation
    const heroDashboard = containerRef.current.querySelector(".hero-dashboard");
    if (heroDashboard) {
      gsap.to(heroDashboard, {
        y: -15,
        rotationZ: 0.5,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // 3. Stagger Reveal for Core Pricing Cards with Lens Visibility
    const cards = containerRef.current.querySelectorAll(".pricing-card");
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".pricing-cards-section",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // Focus visibility scrolling layout (Dim neighbor elements organically)
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { filter: "brightness(0.7) blur(1px)" },
          {
            filter: "brightness(1.1) blur(0px)",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }

    // 4. Feature Comparison Matrix Interactive Rows Reveal
    const compRows = containerRef.current.querySelectorAll(".comp-row");
    if (compRows.length) {
      gsap.fromTo(
        compRows,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".comparison-section",
            start: "top 70%",
          },
        },
      );
    }

    // 5. Add-On Cards Sequential Sweep Reveal
    const addonCards = containerRef.current.querySelectorAll(".addon-card");
    if (addonCards.length) {
      gsap.fromTo(
        addonCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".addons-section",
            start: "top 75%",
          },
        },
      );
    }

    // 6. Maintenance Plan Circular Progress Metric Setup
    const progressCircles =
      containerRef.current.querySelectorAll(".maint-progress");
    progressCircles.forEach((circle) => {
      const targetOffset = circle.getAttribute("data-offset");
      gsap.fromTo(
        circle,
        { strokeDashoffset: 251.2 },
        {
          strokeDashoffset: targetOffset,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".maintenance-section",
            start: "top 75%",
          },
        },
      );
    });

    // 7. Premium Call-To-Action Heading & Magnetic Elements Pulsing
    const ctaHeader = containerRef.current.querySelector(".cta-heading");
    if (ctaHeader) {
      gsap.fromTo(
        ctaHeader,
        { scale: 0.95, filter: "blur(4px)", opacity: 0 },
        {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%",
          },
        },
      );
    }
  }, containerRef);

  return ctx;
};

/**
 * Handles custom dynamic 3D Card Tilting based on high-performance transforms.
 */
export const handleTiltEffect = (e, element) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xc = rect.width / 2;
  const yc = rect.height / 2;

  const angleX = (yc - y) / 12;
  const angleY = (x - xc) / 12;

  gsap.to(element, {
    rotationX: angleX,
    rotationY: angleY,
    scale: 1.02,
    perspective: 1000,
    duration: 0.3,
    ease: "power2.out",
  });
};

/**
 * Resets custom 3D Card Tilting smoothly to native parameters.
 */
export const resetTiltEffect = (element) => {
  gsap.to(element, {
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    duration: 0.4,
    ease: "power2.out",
  });
};
