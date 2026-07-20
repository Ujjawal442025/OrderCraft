import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  registerProcessEases,
  mapRange,
  mapProgressToStage,
  animateCounter,
  createPacketTimeline,
  stageStatusLabel,
} from "./processAnimation";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { key: "research", label: "Research", log: "> Connecting client..." },
  { key: "strategy", label: "Strategy", log: "> Gathering requirements..." },
  { key: "design", label: "Design", log: "> Creating wireframes..." },
  { key: "development", label: "Development", log: "> Building interface..." },
  { key: "testing", label: "Testing", log: "> Optimizing performance..." },
  { key: "launch", label: "Launch", log: "> Deploying..." },
];

const VISUAL_STATES = [
  "Blueprint",
  "Wireframe",
  "High-Fidelity UI",
  "Code",
  "Live Website",
];

const METRICS = [
  { key: "performance", label: "Performance", value: 98 },
  { key: "seo", label: "SEO", value: 100 },
  { key: "accessibility", label: "Accessibility", value: 96 },
  { key: "bestPractices", label: "Best Practices", value: 100 },
];

const TECHS = [
  { name: "React", stages: [2, 3] },
  { name: "GSAP", stages: [2, 3] },
  { name: "Three.js", stages: [2] },
  { name: "Node.js", stages: [3] },
  { name: "MongoDB", stages: [3] },
  { name: "Express", stages: [3] },
  { name: "OpenAI", stages: [0, 1] },
  { name: "TailwindCSS", stages: [2, 3] },
];

export default function Process() {
  const sectionRef = useRef(null);
  const dashboardRef = useRef(null);
  const spotlightRef = useRef(null);

  const circleRef = useRef(null);
  const circleLabelRef = useRef(null);
  const stageRowRefs = useRef([]);
  const stageDotRefs = useRef([]);
  const stageStatusRefs = useRef([]);

  const visualRefs = useRef([]);
  const logDotRefs = useRef([]);
  const logTextRefs = useRef([]);

  const techPillRefs = useRef([]);

  const metricBarRefs = useRef([]);
  const metricValueRefs = useRef([]);
  const metricsPlayedRef = useRef(false);

  const packetDotARef = useRef(null);
  const packetDotBRef = useRef(null);
  const pathARef = useRef(null);
  const pathBRef = useRef(null);
  const packetTlA = useRef(null);
  const packetTlB = useRef(null);

  const missionStatusRef = useRef(null);
  const successGlowRef = useRef(null);

  const [activeStage, setActiveStage] = useState(0);
  const [deployed, setDeployed] = useState(false);
  const activeStageRef = useRef(0);
  const deployedRef = useRef(false);

  const CIRCUMFERENCE = 2 * Math.PI * 42;

  const updateDashboard = useCallback(
    (progress) => {
      if (circleRef.current) {
        const offset = CIRCUMFERENCE * (1 - progress);
        circleRef.current.style.strokeDashoffset = String(offset);
      }
      if (circleLabelRef.current) {
        circleLabelRef.current.textContent = `${Math.round(progress * 100)}%`;
      }

      const stageIndex = mapProgressToStage(progress, STAGES.length);
      if (stageIndex !== activeStageRef.current) {
        activeStageRef.current = stageIndex;
        setActiveStage(stageIndex);
      }

      STAGES.forEach((_, i) => {
        const dot = stageDotRefs.current[i];
        const statusEl = stageStatusRefs.current[i];
        if (!dot || !statusEl) return;
        const label = stageStatusLabel(i, stageIndex);
        statusEl.textContent = label;
        dot.classList.toggle("pc-dot-complete", label === "✓ Complete");
        dot.classList.toggle("pc-dot-running", label === "Running...");
        dot.classList.toggle("pc-dot-waiting", label === "Waiting...");
      });

      STAGES.forEach((_, i) => {
        const dot = logDotRefs.current[i];
        const text = logTextRefs.current[i];
        if (!dot || !text) return;
        const label = stageStatusLabel(i, stageIndex);
        dot.classList.toggle("pc-dot-complete", label === "✓ Complete");
        dot.classList.toggle("pc-dot-running", label === "Running...");
        dot.classList.toggle("pc-dot-waiting", label === "Waiting...");
        text.classList.toggle("pc-log-inactive", label === "Waiting...");
      });

      const visualFloat = mapRange(progress, 0, 1, 0, VISUAL_STATES.length - 1);
      visualRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(visualFloat - i);
        const opacity = Math.max(0, 1 - dist * 1.15);
        el.style.opacity = String(opacity);
        el.style.transform = `scale(${0.96 + opacity * 0.04}) translateY(${(1 - opacity) * 10}px)`;
      });

      TECHS.forEach((tech, i) => {
        const el = techPillRefs.current[i];
        if (!el) return;
        el.classList.toggle("pc-pill-active", tech.stages.includes(stageIndex));
      });

      const isDeployed = progress >= 0.995;
      if (isDeployed !== deployedRef.current) {
        deployedRef.current = isDeployed;
        setDeployed(isDeployed);
        if (missionStatusRef.current) {
          missionStatusRef.current.textContent = isDeployed
            ? "PROJECT DEPLOYED"
            : "MISSION IN PROGRESS";
        }
        if (successGlowRef.current) {
          gsap.to(successGlowRef.current, {
            opacity: isDeployed ? 1 : 0,
            duration: 0.8,
            ease: "pcSoft",
          });
        }
      }

      if (progress > 0.86 && !metricsPlayedRef.current) {
        metricsPlayedRef.current = true;
        METRICS.forEach((m, i) => {
          const bar = metricBarRefs.current[i];
          const val = metricValueRefs.current[i];
          if (bar)
            gsap.to(bar, {
              width: `${m.value}%`,
              duration: 1.1,
              ease: "pcSoft",
            });
          if (val) animateCounter(val, m.value, { duration: 1.1 });
        });
      } else if (progress <= 0.86 && metricsPlayedRef.current) {
        metricsPlayedRef.current = false;
        METRICS.forEach((_, i) => {
          const bar = metricBarRefs.current[i];
          const val = metricValueRefs.current[i];
          if (bar) gsap.to(bar, { width: "0%", duration: 0.4, ease: "pcSoft" });
          if (val) val.textContent = "0";
        });
      }
    },
    [CIRCUMFERENCE],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    registerProcessEases();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      packetTlA.current = createPacketTimeline(
        packetDotARef.current,
        pathARef.current,
        { duration: 1.5, repeatDelay: 1.4 },
      );
      packetTlB.current = createPacketTimeline(
        packetDotBRef.current,
        pathBRef.current,
        { duration: 1.5, repeatDelay: 1.8 },
      );

      if (reduceMotion) {
        updateDashboard(1);
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          onUpdate: (self) => updateDashboard(self.progress),
          onEnter: () => {
            packetTlA.current?.play();
            packetTlB.current?.play();
          },
          onLeave: () => {
            packetTlA.current?.pause();
            packetTlB.current?.pause();
          },
          onEnterBack: () => {
            packetTlA.current?.play();
            packetTlB.current?.play();
          },
          onLeaveBack: () => {
            packetTlA.current?.pause();
            packetTlB.current?.pause();
          },
        });
        return () => st.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        packetTlA.current?.play();
        packetTlB.current?.play();
      });

      return () => mm.revert();
    }, section);

    const spotlight = spotlightRef.current;
    const dashboard = dashboardRef.current;
    let spotX, spotY;
    if (
      spotlight &&
      dashboard &&
      !reduceMotion &&
      window.matchMedia("(min-width: 1024px)").matches
    ) {
      spotX = gsap.quickTo(spotlight, "--x", { duration: 0.5, ease: "power3" });
      spotY = gsap.quickTo(spotlight, "--y", { duration: 0.5, ease: "power3" });
      const onMove = (e) => {
        const r = dashboard.getBoundingClientRect();
        spotX(e.clientX - r.left);
        spotY(e.clientY - r.top);
      };
      dashboard.addEventListener("mousemove", onMove);
      ctx.add(() => () => dashboard.removeEventListener("mousemove", onMove));
    }

    return () => {
      packetTlA.current?.kill();
      packetTlB.current?.kill();
      ctx.revert();
    };
  }, [updateDashboard]);

  const attachTilt = useCallback((el) => {
    if (
      !el ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1023px)").matches
    )
      return;
    const rotX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3" });
    const rotY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3" });
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotY(px * 6);
      rotX(-py * 6);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="pc-section relative isolate flex min-h-[100svh] items-center overflow-hidden py-12 md:py-24 lg:py-0"
    >
      <div className="pc-aurora" aria-hidden="true">
        <span className="pc-aurora-blob pc-aurora-1" />
        <span className="pc-aurora-blob pc-aurora-2" />
        <span className="pc-aurora-blob pc-aurora-3" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-6 md:px-8 pb-safe">
        <div className="mx-auto mb-10 max-w-xl text-center md:mb-16">
          <span className="pc-eyebrow">MISSION CONTROL</span>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold md:text-5xl tracking-tight text-white">
            Mission Control
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Every project is monitored, engineered and refined through one
            intelligent workflow.
          </p>
        </div>

        {/* --- DESKTOP HIGH-FIDELITY PANEL GRAPHIC SYSTEM --- */}
        <div
          ref={dashboardRef}
          className="hidden lg:block pc-dashboard"
          style={{ "--x": "50%", "--y": "50%" }}
        >
          <div ref={spotlightRef} className="pc-spotlight" aria-hidden="true" />
          <div className="pc-grid-bg" aria-hidden="true" />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 640"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pcLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="0.5" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="pcPacketGrad">
                <stop offset="0" stopColor="#e9d5ff" />
                <stop offset="1" stopColor="#a855f7" />
              </radialGradient>
            </defs>
            <path
              ref={pathARef}
              d="M300,190 C420,190 420,320 560,320"
              fill="none"
              stroke="url(#pcLineGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            <path
              ref={pathBRef}
              d="M660,320 C800,320 800,190 900,190"
              fill="none"
              stroke="url(#pcLineGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            <circle
              ref={packetDotARef}
              r="4"
              fill="url(#pcPacketGrad)"
              opacity="0"
            />
            <circle
              ref={packetDotBRef}
              r="4"
              fill="url(#pcPacketGrad)"
              opacity="0"
            />
          </svg>

          <div className="pc-layout">
            <div ref={attachTilt} className="pc-panel pc-panel-left">
              <div className="pc-panel-head">
                <span className="pc-panel-title">Project Status</span>
                <span className="pc-live-dot" />
              </div>
              <div className="pc-circle-wrap">
                <svg viewBox="0 0 100 100" className="pc-circle-svg">
                  <circle cx="50" cy="50" r="42" className="pc-circle-track" />
                  <circle
                    ref={circleRef}
                    cx="50"
                    cy="50"
                    r="42"
                    className="pc-circle-value"
                    style={{
                      strokeDasharray: CIRCUMFERENCE,
                      strokeDashoffset: CIRCUMFERENCE,
                    }}
                  />
                </svg>
                <span ref={circleLabelRef} className="pc-circle-label">
                  0%
                </span>
              </div>
              <ul className="pc-stage-list">
                {STAGES.map((stage, i) => (
                  <li
                    key={stage.key}
                    ref={(el) => (stageRowRefs.current[i] = el)}
                    className="pc-stage-row"
                  >
                    <span
                      ref={(el) => (stageDotRefs.current[i] = el)}
                      className="pc-status-dot pc-dot-waiting"
                    />
                    <span className="pc-stage-label">{stage.label}</span>
                    <span
                      ref={(el) => (stageStatusRefs.current[i] = el)}
                      className="pc-stage-status"
                    >
                      Waiting...
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div ref={attachTilt} className="pc-panel pc-panel-center">
              <div className="pc-panel-head">
                <span className="pc-panel-title">Live Preview</span>
                <span ref={missionStatusRef} className="pc-mission-status">
                  MISSION IN PROGRESS
                </span>
              </div>
              <div className="pc-visual-stage">
                {VISUAL_STATES.map((state, i) => (
                  <div
                    key={state}
                    ref={(el) => (visualRefs.current[i] = el)}
                    className="pc-visual-layer"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <VisualMock kind={state} />
                  </div>
                ))}
                <div
                  ref={successGlowRef}
                  className="pc-success-glow"
                  aria-hidden="true"
                />
              </div>
              <div className="pc-visual-caption">
                {VISUAL_STATES.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>

            <div ref={attachTilt} className="pc-panel pc-panel-right">
              <div className="pc-panel-head">
                <span className="pc-panel-title">Real-Time System Log</span>
                <span className="pc-live-dot" />
              </div>
              <ul className="pc-log-list">
                {STAGES.map((stage, i) => (
                  <li key={stage.key} className="pc-log-row">
                    <span
                      ref={(el) => (logDotRefs.current[i] = el)}
                      className="pc-status-dot pc-dot-waiting"
                    />
                    <span
                      ref={(el) => (logTextRefs.current[i] = el)}
                      className="pc-log-text pc-log-inactive"
                    >
                      {stage.log}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div ref={attachTilt} className="pc-panel pc-panel-bottom">
              <div className="pc-panel-head">
                <span className="pc-panel-title">Live Metrics</span>
              </div>
              <div className="pc-metrics-grid">
                {METRICS.map((m, i) => (
                  <div key={m.key} className="pc-metric">
                    <div className="pc-metric-top">
                      <span className="pc-metric-label">{m.label}</span>
                      <span
                        ref={(el) => (metricValueRefs.current[i] = el)}
                        className="pc-metric-value"
                      >
                        0
                      </span>
                    </div>
                    <div className="pc-metric-track">
                      <div
                        ref={(el) => (metricBarRefs.current[i] = el)}
                        className="pc-metric-bar"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pc-tech-row">
                {TECHS.map((tech, i) => (
                  <span
                    key={tech.name}
                    ref={(el) => (techPillRefs.current[i] = el)}
                    className="pc-pill"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE & TABLET LIGHTWEIGHT STORYTELLING TIMELINE --- */}
        <div className="block lg:hidden w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STAGES.map((stage, i) => (
              <div
                key={stage.key}
                className="p-5 rounded-xl border border-purple-500/10 bg-purple-950/5 backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent" />
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
                    <h4 className="text-sm font-mono font-medium tracking-wide text-white uppercase">
                      0{i + 1} . {stage.label}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2 py-0.5 rounded">
                    ACTIVE NODE
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-300 bg-black/40 p-2.5 rounded border border-white/5 whitespace-pre-wrap">
                  {stage.log}
                </p>
              </div>
            ))}
          </div>

          {/* Core Metrics Summary Array for Touch Viewports */}
          <div className="p-5 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-md">
            <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">
              // ENGINE EFFICIENCY METRICS
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {METRICS.map((m) => (
                <div key={m.key} className="space-y-1.5">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="text-slate-400 truncate pr-1">
                      {m.label}
                    </span>
                    <span className="text-white font-semibold">{m.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/5">
              {TECHS.map((tech) => (
                <span
                  key={tech.name}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-slate-400"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{PROCESS_STYLES}</style>
    </section>
  );
}

function VisualMock({ kind }) {
  if (kind === "Blueprint") {
    return (
      <div className="pc-mock pc-mock-blueprint">
        <div
          className="pc-mock-box"
          style={{ width: "70%", height: "18%", top: "10%", left: "15%" }}
        />
        <div
          className="pc-mock-box"
          style={{ width: "40%", height: "12%", top: "36%", left: "15%" }}
        />
        <div
          className="pc-mock-box"
          style={{ width: "40%", height: "40%", top: "52%", left: "15%" }}
        />
        <div
          className="pc-mock-box"
          style={{ width: "25%", height: "40%", top: "52%", left: "60%" }}
        />
      </div>
    );
  }
  if (kind === "Wireframe") {
    return (
      <div className="pc-mock pc-mock-wireframe">
        <div className="pc-mock-line" style={{ width: "55%" }} />
        <div className="pc-mock-line" style={{ width: "80%" }} />
        <div className="pc-mock-line" style={{ width: "35%" }} />
        <div className="pc-mock-grid">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
  if (kind === "High-Fidelity UI") {
    return (
      <div className="pc-mock pc-mock-hifi">
        <div className="pc-mock-nav" />
        <div className="pc-mock-hero" />
        <div className="pc-mock-cards">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
  if (kind === "Code") {
    return (
      <div className="pc-mock pc-mock-code">
        <div
          className="pc-mock-code-line"
          style={{ width: "40%", color: "#c084fc" }}
        />
        <div className="pc-mock-code-line" style={{ width: "70%" }} />
        <div className="pc-mock-code-line" style={{ width: "55%" }} />
        <div
          className="pc-mock-code-line"
          style={{ width: "62%", color: "#5eead4" }}
        />
        <div className="pc-mock-code-line" style={{ width: "30%" }} />
      </div>
    );
  }
  return (
    <div className="pc-mock pc-mock-live">
      <div className="pc-mock-browser-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="pc-mock-live-hero" />
      <div className="pc-mock-live-grid">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

const PROCESS_STYLES = `
.pc-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:.68rem;letter-spacing:.14em;color:#c084fc;border:1px solid rgba(168,85,247,.25);padding:6px 14px;border-radius:999px;}
.pc-aurora{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;}
.pc-aurora-blob{position:absolute;border-radius:50%;filter:blur(70px);opacity:.55;animation:pcAuroraMove 16s ease-in-out infinite;}
.pc-aurora-1{width:420px;height:420px;background:radial-gradient(circle,#7c3aed,transparent 70%);top:-10%;left:-6%;}
.pc-aurora-2{width:380px;height:380px;background:radial-gradient(circle,#a855f7,transparent 70%);bottom:-14%;right:-4%;animation-delay:-5s;}
.pc-aurora-3{width:300px;height:300px;background:radial-gradient(circle,#f472b6,transparent 70%);top:30%;right:20%;animation-delay:-10s;opacity:.3;}
@keyframes pcAuroraMove{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(30px,-20px) scale(1.08);}}

.pc-dashboard{position:relative;width:100%;max-width:1200px;margin:0 auto;border-radius:28px;border:1px solid rgba(168,85,247,.22);background:linear-gradient(180deg,rgba(18,15,28,.9),rgba(10,8,16,.9));box-shadow:0 40px 120px -40px rgba(124,58,237,.45),inset 0 1px 0 rgba(255,255,255,.04);padding:28px;overflow:hidden;perspective:1200px;}
.pc-spotlight{position:absolute;inset:0;pointer-events:none;background:radial-gradient(320px circle at var(--x) var(--y),rgba(168,85,247,.14),transparent 70%);transition:opacity .3s;z-index:1;}
.pc-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(168,85,247,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.06) 1px,transparent 1px);background-size:36px 36px;mask-image:radial-gradient(circle at 50% 40%,black,transparent 85%);}

.pc-layout{position:relative;z-index:2;display:grid;grid-template-columns:280px 1fr 280px;grid-template-areas:"left center right" "bottom bottom bottom";gap:16px;}
.pc-panel-left{grid-area:left;} .pc-panel-center{grid-area:center;} .pc-panel-right{grid-area:right;} .pc-panel-bottom{grid-area:bottom;}

.pc-panel{position:relative;border-radius:18px;border:1px solid rgba(168,85,247,.16);background:rgba(255,255,255,.02);backdrop-filter:blur(14px);padding:20px;transform-style:preserve-3d;will-change:transform;transition:border-color .3s;}
.pc-panel::before{content:"";position:absolute;inset:0;border-radius:18px;padding:1px;background:conic-gradient(from var(--a,0deg),transparent 0%,rgba(168,85,247,.5) 12%,transparent 24%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:pcBorderTrace 6s linear infinite;opacity:.6;pointer-events:none;}
@keyframes pcBorderTrace{to{--a:360deg;}}
.pc-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.pc-panel-title{font-family:var(--font-mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:#a6a1b8;}
.pc-live-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80;animation:pcBlink 1.6s ease-in-out infinite;}
@keyframes pcBlink{0%,100%{opacity:1;}50%{opacity:.25;}}

.pc-circle-wrap{position:relative;width:120px;height:120px;margin:4px auto 22px;}
.pc-circle-svg{width:100%;height:100%;transform:rotate(-90deg);}
.pc-circle-track{fill:none;stroke:rgba(255,255,255,.08);stroke-width:6;}
.pc-circle-value{fill:none;stroke:#a855f7;stroke-width:6;stroke-linecap:round;transition:stroke-dashoffset .1s linear;filter:drop-shadow(0 0 6px rgba(168,85,247,.7));}
.pc-circle-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:600;font-size:1.15rem;}

.pc-stage-list{display:flex;flex-direction:column;gap:12px;}
.pc-stage-row{display:flex;align-items:center;gap:10px;font-size:.82rem;}
.pc-stage-label{flex:1;color:#f2f0f7;}
.pc-stage-status{font-family:var(--font-mono);font-size:.68rem;color:#716c85;}

.pc-status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#4b4560;transition:background .3s,box-shadow .3s;}
.pc-dot-waiting{background:#4b4560;}
.pc-dot-running{background:#facc15;box-shadow:0 0 8px #facc15;animation:pcBlink 1s ease-in-out infinite;}
.pc-dot-complete{background:#4ade80;box-shadow:0 0 8px #4ade80;}

.pc-mission-status{font-family:var(--font-mono);font-size:.62rem;letter-spacing:.08em;color:#c084fc;padding:3px 10px;border:1px solid rgba(168,85,247,.3);border-radius999px;}
.pc-visual-stage{position:relative;height:260px;border-radius:14px;border:1px solid rgba(255,255,255,.06);background:#0a0810;overflow:hidden;}
.pc-visual-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:opacity .1s linear,transform .1s linear;}
.pc-visual-caption{display:flex;justify-content:space-between;margin-top:10px;font-family:var(--font-mono);font-size:.6rem;color:#716c85;text-transform:uppercase;letter-spacing:.06em;}
.pc-success-glow{position:absolute;inset:0;opacity:0;background:radial-gradient(circle at 50% 50%,rgba(168,85,247,.5),transparent 70%);pointer-events:none;}

.pc-mock{position:relative;width:80%;height:80%;}
.pc-mock-box{position:absolute;border:1px dashed rgba(168,85,247,.5);border-radius:4px;}
.pc-mock-wireframe .pc-mock-line{height:8px;background:rgba(255,255,255,.12);border-radius:4px;margin:8px 0;}
.pc-mock-grid{display:flex;gap:8px;margin-top:14px;}
.pc-mock-grid span{flex:1;height:50px;background:rgba(255,255,255,.06);border-radius:6px;}
.pc-mock-hifi .pc-mock-nav{height:14px;width:100%;background:linear-gradient(90deg,#7c3aed,#a855f7);border-radius:4px;opacity:.8;}
.pc-mock-hifi .pc-mock-hero{height:70px;margin-top:10px;border-radius:8px;background:linear-gradient(135deg,rgba(168,85,247,.35),rgba(244,114,182,.2));}
.pc-mock-cards{display:flex;gap:8px;margin-top:10px;}
.pc-mock-cards span{flex:1;height:44px;border-radius:6px;background:rgba(255,255,255,.08);}
.pc-mock-code{font-family:var(--font-mono);font-size:.72rem;color:#a6a1b8;}
.pc-mock-code-line{height:9px;background:currentColor;opacity:.5;border-radius:2px;margin:8px 0;}
.pc-mock-browser-bar{display:flex;gap:5px;margin-bottom:8px;}
.pc-mock-browser-bar span{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.2);}
.pc-mock-live-hero{height:70px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#f472b6);}
.pc-mock-live-grid{display:flex;gap:8px;margin-top:10px;}
.pc-mock-live-grid span{flex:1;height:40px;border-radius:6px;background:rgba(168,85,247,.18);}

.pc-log-list{display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);}
.pc-log-row{display:flex;align-items:flex-start;gap:10px;}
.pc-log-text{font-size:.76rem;color:#e5e2ec;transition:color .3s,opacity .3s;}
.pc-log-inactive{color:#57516b;opacity:.6;}

.pc-metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:22px;}
.pc-metric-top{display:flex;justify-content:space-between;font-size:.72rem;margin-bottom:6px;}
.pc-metric-label{color:#a6a1b8;}
.pc-metric-value{font-family:var(--font-display);color:#f2f0f7;font-weight:600;}
.pc-metric-track{height:5px;border-radius:999px;background:rgba(255,255,255,.07);overflow:hidden;}
.pc-metric-bar{height:100%;border-radius:999px;background:linear-gradient(90deg,#7c3aed,#c084fc);width:0%;}

.pc-tech-row{display:flex;flex-wrap:wrap;gap:8px;}
.pc-pill{font-family:var(--font-mono);font-size:.68rem;padding:5px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.1);color:#716c85;transition:color .3s,border-color .3s,box-shadow .3s;}
.pc-pill-active{color:#c084fc;border-color:rgba(168,85,247,.5);box-shadow:0 0 12px rgba(168,85,247,.35);}

@media(prefers-reduced-motion: reduce){
  .pc-aurora-blob,.pc-live-dot,.pc-dot-running,.pc-panel::before{animation:none;}
}
`;
