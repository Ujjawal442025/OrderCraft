import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initTestimonialAnimations = (containerRef) => {
  if (!containerRef.current) return null;

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray(".constellation-card");
    const statCards = gsap.utils.toArray(".stat-card");
    const ctaSection = containerRef.current.querySelector(".testimonials-cta");
    const ctaButtons =
      containerRef.current.querySelectorAll(".cta-btn-magnetic");

    // 1. Entrance Reveal Animation (ScrollTrigger)
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 0.85,
        y: 60,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: {
          amount: 0.6,
          from: "center",
        },
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".constellation-container",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // 2. Idle Floating Motion (Subtle 2-4px offset with unique offsets to avoid synchronization)
    cards.forEach((card, index) => {
      const randomY = 3 + (index % 3) * 1.5;
      const randomX = 2 + (index % 2) * 1;
      const duration = 4 + (index % 4) * 0.8;

      gsap.to(card, {
        y: `+=${randomY}`,
        x: `+=${randomX}`,
        rotation: () => (index % 2 === 0 ? 0.3 : -0.3),
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3,
      });
    });

    // 3. Stat Cards Number Count-Up Animation
    statCards.forEach((stat) => {
      const numberEl = stat.querySelector(".stat-number");
      if (numberEl) {
        const targetValue = parseFloat(numberEl.getAttribute("data-target"));
        const suffix = numberEl.getAttribute("data-suffix") || "";
        const isDecimal = numberEl.getAttribute("data-decimal") === "true";

        const obj = { value: 0 };
        gsap.to(obj, {
          value: targetValue,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            numberEl.textContent = isDecimal
              ? obj.value.toFixed(0) + suffix
              : Math.floor(obj.value) + suffix;
          },
        });
      }
    });

    // 4. Interactive 3D Card Tilt & Spotlight Effect (QuickSetter)
    cards.forEach((card) => {
      const glowSetterX = gsap.quickSetter(card, "--mouse-x", "px");
      const glowSetterY = gsap.quickSetter(card, "--mouse-y", "px");
      const tiltXSetter = gsap.quickSetter(card, "rotationX", "deg");
      const tiltYSetter = gsap.quickSetter(card, "rotationY", "deg");

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Map mouse position coordinates to CSS custom properties for glass reflections
        glowSetterX(x);
        glowSetterY(y);

        // Map cursor delta from center to subtle 3D rotation limits
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 6; // Max 6 deg tilt
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          scale: card.classList.contains("featured-card") ? 1.02 : 1.05,
          z: 20,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          z: 0,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    // 5. Magnetic Hover on bottom CTA Buttons
    ctaButtons.forEach((btn) => {
      const handleBtnMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.4,
          y: y * 0.4,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleBtnLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", handleBtnMove);
      btn.addEventListener("mouseleave", handleBtnLeave);
    });

    // 6. Random Periodic Light Sweeps across constellations
    const triggerRandomSweep = () => {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      if (randomCard) {
        const sweepEl = randomCard.querySelector(".light-sweep");
        if (sweepEl) {
          gsap.fromTo(
            sweepEl,
            { xPercent: -100 },
            { xPercent: 150, duration: 1.8, ease: "power2.inOut" },
          );
        }
      }
    };
    const sweepInterval = setInterval(triggerRandomSweep, 7000);

    return () => {
      clearInterval(sweepInterval);
    };
  }, containerRef);

  return () => ctx.revert();
};
