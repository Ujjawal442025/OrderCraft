import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(" ");

// Helper for random colors
const randomColors = (count: number) => {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0"),
  );
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // We use the specific build from the CDN as it contains the exact effect requested
        // Using native dynamic import which works in modern browsers
        // @ts-ignore
        const module =
          await import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js");
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });

        tubesRef.current = app;
        setIsLoaded(true);

        // Handle resize if the library doesn't automatically
        const handleResize = () => {
          // The library might handle it, but typically we ensure canvas matches container
          // For this specific lib, it likely attaches to window resize or we might need to manually resize
        };

        window.addEventListener("resize", handleResize);

        cleanup = () => {
          window.removeEventListener("resize", handleResize);

          try {
            // Stop any internal render/animation loop the lib exposes
            app.stop?.();
            app.pause?.();
            app.destroy?.();
            app.dispose?.();

            // Dig into common three.js internals in case the lib doesn't
            // expose a top-level destroy method
            app.renderer?.setAnimationLoop?.(null);
            app.renderer?.dispose?.();
            app.scene?.traverse?.((obj: any) => {
              obj.geometry?.dispose?.();
              if (obj.material) {
                const materials = Array.isArray(obj.material)
                  ? obj.material
                  : [obj.material];
                materials.forEach((m: any) => m.dispose?.());
              }
            });
          } catch (e) {
            console.warn("TubesCursor cleanup failed:", e);
          }

          // Force-release the WebGL context so it doesn't count against the
          // browser's context limit (prevents "blank canvas" after a few
          // navigations)
          try {
            const canvas = canvasRef.current;
            const gl =
              canvas?.getContext("webgl2") || canvas?.getContext("webgl");
            gl?.getExtension("WEBGL_lose_context")?.loseContext();
          } catch (e) {
            console.warn("Failed to release WebGL context:", e);
          }

          tubesRef.current = null;
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;

    const colors = randomColors(3);
    const lightsColors = randomColors(4);

    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[400px] overflow-hidden bg-background",
        className,
      )}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: "none" }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

// Default export
export default TubesBackground;
