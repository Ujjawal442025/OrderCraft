import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const ProjectCard = ({ project }) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Elastic Spring configuration for premium magnetic pull effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 12, stiffness: 140, mass: 0.5 };
  const elasticX = useSpring(x, springConfig);
  const elasticY = useSpring(y, springConfig);

  // Keeps text element slightly lagging inside the button for an elastic multi-plane feeling
  const textX = useTransform(elasticX, (v) => v * 0.35);
  const textY = useTransform(elasticY, (v) => v * 0.35);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();

    // Calculate distance from cursor to the center of the magnetic button boundary
    x.set(clientX - (left + width / 2));
    y.set(clientY - (top + height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 lg:px-16 relative editorial-card-wrapper">
      {/* Giant Ambient Index Counter Element */}
      <div className="absolute top-12 right-12 text-[14vw] font-extralight text-white/[0.015] font-mono tracking-tighter select-none pointer-events-none決 fade-up-node">
        {project.id}
      </div>

      <div className="max-w-md flex flex-col items-start text-left pt-16">
        {/* Category Tagline Element Block */}
        <div className="overflow-hidden mb-3">
          <span className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase block fade-up-node">
            // {project.category}
          </span>
        </div>

        {/* Headline Layer Array featuring Interactive Character Splits */}
        <h3 className="text-4xl lg:text-6xl font-extralight text-white tracking-tight mb-6 cursor-default relative group select-none">
          <div className="flex flex-wrap overflow-hidden py-1">
            {project.title.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="mr-3 flex overflow-hidden relative">
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-block transform will-change-transform split-char-node transition-transform duration-500 ease-out group-hover:text-white/40"
                    style={{ transitionDelay: `${(wIdx * 2 + cIdx) * 15}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
          {/* Decorative Underline Micro Animation Layer */}
          <span className="absolute bottom-[-6px] left-0 w-12 h-[1px] bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-white/40" />
        </h3>

        {/* Narrative Project Synopsis Text Field */}
        <p className="text-white/60 text-sm lg:text-base font-light leading-relaxed mb-8 fade-up-node">
          {project.description}
        </p>

        {/* Technical Framework Stack Configuration Meta Badges */}
        <div className="flex flex-wrap gap-2 mb-10 w-full fade-up-node">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-white/40 border border-white/5 rounded bg-white/[0.01] transition-colors duration-300 hover:text-white/80 hover:border-white/10 cursor-default"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Hyperlink Integration Outer Frame Wrapper Module */}
        <a
          href={project.projectUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-full z-30"
        >
          {/* Framer Motion Elastic Physics Vector Box Anchor */}
          <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ x: elasticX, y: elasticY }}
            className="relative"
          >
            <motion.button
              style={{ x: textX, y: textY }}
              className="group/btn relative flex items-center gap-5 px-6 py-3 rounded-full border border-white/10 bg-[#070707] overflow-hidden transition-all duration-300 shadow-xl"
            >
              {/* Dynamic Liquid Shimmer Underlay Membrane */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.04] to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/80 group-hover/btn:text-white transition-colors">
                View Case Study
              </span>

              <div className="relative p-1 rounded-full text-white/60 group-hover/btn:text-white transform transition-transform duration-500 group-hover/btn:translate-x-1.5">
                <ArrowRight size={12} />
              </div>
            </motion.button>
          </motion.div>
        </a>
      </div>
    </div>
  );
};
