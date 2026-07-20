import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initServicesAnimation = (
  container,
  rightPanel,
  imageContainer,
) => {
  if (!container || !rightPanel || !imageContainer) return null;

  const cardContainers = rightPanel.querySelectorAll(".service-card-container");
  const images = imageContainer.querySelectorAll(".sticky-image-layer");

  // Master timeline allocating clean scroll space
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${window.innerHeight * (cardContainers.length - 2)}`,
      pin: true,
      scrub: 1, // High quality damping to match luxury user speeds
      invalidateOnRefresh: true,
      anticipatePin: 1,
      pinSpacing: true,
    },
  });

  // Initialize: Hide all text nodes and image clips for layers 2 and 3
  cardContainers.forEach((container, index) => {
    if (index === 0) return;
    gsap.set(container.querySelectorAll(".animate-text-node"), {
      opacity: 0,
      y: 40,
    });
  });

  // Build the unified transition engine step by step
  for (let i = 0; i < cardContainers.length - 1; i++) {
    const currentText =
      cardContainers[i].querySelectorAll(".animate-text-node");
    const nextText =
      cardContainers[i + 1].querySelectorAll(".animate-text-node");
    const currentImg = images[i];
    const nextImg = images[i + 1];

    masterTl
      // 1. Fade out active text panel upwards
      .to(currentText, {
        y: -40,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power2.in",
      })
      // 2. Simultaneously mask-reveal next image layer (Keep your original great clipPath)
      .fromTo(
        nextImg,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          scale: 1.15,
          filter: "blur(8px)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.6", // overlap smoothly
      )
      // 3. Simultaneously dim out background image layer
      .to(
        currentImg,
        {
          scale: 0.9,
          filter: "blur(4px) brightness(0.3)",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=1.2",
      )
      // 4. Cleanly fade up the next text nodes into position
      .to(
        nextText,
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // Small pause spacer duration before allowed to hit the next track loop
      .to({}, { duration: 0.4 });
  }

  return masterTl;
};
