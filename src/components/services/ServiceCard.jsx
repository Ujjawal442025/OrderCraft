import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const ServiceCard = ({ item }) => {
  return (
    // Har ek section pure 100vh capture karega scroll trigger boundary frame ke liye
    <div className="w-full h-screen flex flex-col justify-center px-8 lg:px-20 relative service-card-wrapper border-b border-white/[0.02]">
      {/* Giant Background Floating Visual Index Number */}
      <div className="absolute top-16 right-16 text-[16vw] font-light text-white/[0.015] select-none tracking-tighter font-mono pointer-events-none animate-text-node">
        {item.id}
      </div>

      <div className="max-w-xl flex flex-col items-start text-left relative z-10">
        {/* Dynamic Service Segment Identity Tag */}
        <span className="text-xs font-semibold tracking-[0.3em] text-[#A855F7] uppercase mb-6 block animate-text-node">
          // {item.tagline}
        </span>

        {/* Master Headline Section */}
        <h2 className="text-4xl lg:text-6xl font-light text-white tracking-tight mb-8 animate-text-node relative group cursor-default">
          {item.title}
          <span className="absolute bottom-[-8px] left-0 w-20 h-[2px] bg-gradient-to-r from-[#7C3AED] to-transparent transition-all duration-700 group-hover:w-full" />
        </h2>

        {/* Rich Description Body */}
        <p className="text-[#BDBDBD] text-base lg:text-lg font-light leading-relaxed mb-8 animate-text-node">
          {item.description}
        </p>

        {/* Feature Check Matrices */}
        <ul className="space-y-4 mb-12 w-full animate-text-node">
          {item.features.map((feat, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-[#7A7A7A] hover:text-white transition-colors duration-300 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#8B5CF6] transition-colors" />
              {feat}
            </li>
          ))}
        </ul>

        {/* Premium Magnetic Action Module Container */}
        <motion.button
          className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 overflow-hidden bg-[#0D0D0D] transition-colors duration-300 animate-text-node"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#A855F7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="text-sm font-medium text-white tracking-wide relative z-10">
            Discover Framework
          </span>
          <div className="relative z-10 p-1 rounded-full bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-45">
            <ArrowUpRight size={14} />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
