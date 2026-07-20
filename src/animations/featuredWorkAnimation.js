import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initFeaturedWorkAnimation = (
  container,
  leftCanvas,
  rightExhibit,
  progressBar,
) => {
  if (!container || !leftCanvas || !rightExhibit) return null;

  const compositions = leftCanvas.querySelectorAll(
    ".canvas-composition-wrapper",
  );
  const cards = rightExhibit.querySelectorAll(".editorial-card-wrapper");

  // Master timeline allocating deep scroll real-estate
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=350%", // Locks layout over 4.5x viewport scale
      pin: true,
      scrub: 1.1, // Smooth dampening lag for high-end kinetic control
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Linearly fill the custom desktop timeline track indicator
        if (progressBar) {
          gsap.to(progressBar, {
            scaleY: self.progress,
            duration: 0.1,
            ease: "none",
          });
        }
      },
    },
  });

  // Base state: Lock all background cards and canvases down flat
  compositions.forEach((comp, idx) => {
    if (idx === 0) return;
    gsap.set(comp, { autoAlpha: 0, scale: 0.85, filter: "blur(15px)" });
    gsap.set(comp.querySelector(".glass-analytics-card"), {
      x: 60,
      opacity: 0,
    });
    gsap.set(comp.querySelectorAll(".orbit-chip"), { scale: 0, opacity: 0 });
    gsap.set(cards[idx].querySelectorAll(".split-char-node"), { y: "105%" });
    gsap.set(cards[idx].querySelectorAll(".fade-up-node"), {
      y: 30,
      opacity: 0,
    });
  });

  // Structural sequence orchestration across project iterations
  for (let i = 0; i < compositions.length - 1; i++) {
    const currentComp = compositions[i];
    const nextComp = compositions[i + 1];
    const currentCard = cards[i];
    const nextCard = cards[i + 1];

    const stepTl = gsap.timeline();

    stepTl
      // 1. Fade out the outgoing text blocks
      .to(
        currentCard.querySelectorAll(".fade-up-node"),
        { y: -20, opacity: 0, stagger: 0.02, duration: 0.5 },
        0,
      )
      .to(
        currentCard.querySelectorAll(".split-char-node"),
        { y: "-105%", stagger: 0.01, duration: 0.6, ease: "power3.in" },
        0,
      )

      // 2. Animate the outgoing visual canvas composition
      .to(
        currentComp.querySelector(".main-device-mockup"),
        {
          scale: 0.9,
          filter: "blur(10px) brightness(0.3)",
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        currentComp.querySelector(".glass-analytics-card"),
        { x: -40, opacity: 0, duration: 0.8 },
        0,
      )
      .to(currentComp, { autoAlpha: 0, duration: 1, ease: "power2.inOut" }, 0.2)

      // 3. Reveal the incoming visual canvas composition
      .to(nextComp, { autoAlpha: 1, duration: 1, ease: "power2.inOut" }, 0.2)
      .fromTo(
        nextComp,
        { scale: 0.9, filter: "blur(15px)" },
        { scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        0.2,
      )
      .to(
        nextComp.querySelector(".glass-analytics-card"),
        { x: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" },
        0.5,
      )
      .to(
        nextComp.querySelectorAll(".orbit-chip"),
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        0.6,
      )

      // 4. Text entrance reveals with synchronized letter splits
      .to(
        nextCard.querySelectorAll(".split-char-node"),
        { y: "0%", stagger: 0.01, duration: 0.8, ease: "power4.out" },
        0.5,
      )
      .to(
        nextCard.querySelectorAll(".fade-up-node"),
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.8, ease: "power3.out" },
        0.6,
      )

      // 5. Anchor pause spacer before allowing the scroll layout to cycle next
      .to({}, { duration: 0.6 });

    masterTl.add(stepTl);
  }

  return masterTl;
};
