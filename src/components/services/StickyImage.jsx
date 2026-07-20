import React from "react";

export const StickyImage = ({ item, index }) => {
  return (
    <div
      className="absolute inset-0 w-full h-full bg-[#0D0D0D] overflow-hidden sticky-image-layer will-change-transform flex items-center justify-center border border-white/5 rounded-2xl"
      style={{ zIndex: index + 1 }}
    >
      {/* High-End Image Layer (Replaces Abstract SVGs) */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity hover:opacity-75 hover:grayscale-0 transition-all duration-1000 ease-out transform-gpu"
        />
      )}

      {/* Background Volumetric Glow Layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30 blur-2xl pointer-events-none`}
      />

      {/* Clean Overlay Dynamic Tagline */}
      <div className="absolute bottom-8 left-8 z-10">
        <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-mono">
          {item.tagline}
        </span>
      </div>

      {/* Industrial Vignette Film Border Overlay to match high-end agency aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none" />
    </div>
  );
};
