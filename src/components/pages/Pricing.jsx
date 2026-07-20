import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initPricingAnimations,
  handleTiltEffect,
  resetTiltEffect,
} from "./pricingAnimation";
import { gsap } from "gsap";

const Footer = () => (
  <div className="w-full py-10 bg-neutral-950 border-t border-white/5 flex flex-col items-center justify-center text-sm text-neutral-500">
    © 2026 OrderCraft. All rights reserved.
  </div>
);

// --- ALL REQUIRED DATA STORAGE ARRAYS INSTANTIATED FOR MAP() RENDERING ---
const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "₹9,999",
    desc: "Perfect for local businesses establishing premium discovery.",
    popular: false,
    features: [
      "Up to 5 Pages",
      "Mobile Responsive",
      "Basic SEO Optimization",
      "Contact Form Integration",
      "WhatsApp Link Integration",
      "Google Maps Setup",
      "15 Days Post Support",
      "5–7 Days Accelerated Delivery",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹19,999",
    desc: "Engineered for high scaling operations needing lead setups.",
    popular: true,
    features: [
      "Up to 10 Pages",
      "Premium Dynamic UI/UX",
      "Interactive Lead Forms",
      "Integrated Analytics Dash",
      "Meta Pixel & Conversion APIs",
      "Full Blog Ecosystem",
      "Advanced On-Page SEO",
      "1 Month Dedicated Support",
      "7–12 Days Delivery Matrix",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹30,000",
    desc: "Complete architectural freedom with advanced custom engines.",
    popular: false,
    features: [
      "Up to 20 Pages",
      "Fully Custom UI/UX Architecture",
      "Admin Dashboard Layer",
      "Dynamic Booking Infrastructure",
      "Secure Payment Gateway Engine",
      "Advanced Performance Architecture",
      "2 Months Priority Support",
      "10–20 Days Delivery Strategy",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹49,999",
    tagline: "Starting from",
    desc: "Immersive narrative computing driven by creative motion layouts.",
    popular: false,
    features: [
      "Bespoke Premium UI Core",
      "Complex GSAP Motion Framework",
      "Three.js WebGL Incorporations",
      "Custom High-Conversion Landing Suites",
      "Autonomous AI Chatbot Layer",
      "Full CRM Custom Pipelines",
      "3 Months Architectural Support",
      "20–30 System Delivery Plan",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom Quote",
    desc: "Robust enterprise architectures for boundary-breaking initiatives.",
    popular: false,
    features: [
      "Unlimited Structural Scope",
      "Dedicated Strategic Architecture Team",
      "Complex Custom APIs & Systems Integration",
      "Advanced Operational Automations",
      "24/7 SLA Priority Support",
      "Long-term Scalable Partnerships",
    ],
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Pages Available",
    starter: "5 Pages",
    growth: "10 Pages",
    prof: "20 Pages",
    premium: "Custom Layouts",
    enterprise: "Unlimited",
  },
  {
    feature: "UI/UX Design Tier",
    starter: "Tailwind Template",
    growth: "Premium Custom",
    prof: "Bespoke System",
    premium: "Award Winning",
    enterprise: "Immersive Custom",
  },
  {
    feature: "GSAP & WebGL Engine",
    starter: "❌",
    growth: "Basic Motion",
    prof: "Advanced Interactive",
    premium: "Full Immersive",
    enterprise: "Custom Masterpieces",
  },
  {
    feature: "Database & Admin Suite",
    starter: "❌",
    growth: "❌",
    prof: "Comprehensive",
    premium: "Enterprise Custom",
    enterprise: "Full Scaling Matrix",
  },
  {
    feature: "Support SLA Window",
    starter: "15 Days",
    growth: "1 Month",
    prof: "2 Months",
    premium: "3 Months",
    enterprise: "24/7 Dedicated",
  },
];

const ADDONS = [
  {
    title: "Premium Logo Design",
    price: "₹3,999",
    desc: "Bespoke high-fidelity identity assets designed by core creatives.",
  },
  {
    title: "Advanced UI/UX Overhaul",
    price: "₹7,999",
    desc: "Interactive Wireframes, High-fidelity Figma scopes, and component states.",
  },
  {
    title: "Booking Integration",
    price: "₹4,999",
    desc: "Realtime cal-syncing architecture for autonomous conversions.",
  },
  {
    title: "Custom AI Agent Bot",
    price: "₹8,999",
    desc: "Trained context models replying instantly on custom chat pipelines.",
  },
  {
    title: "Advanced SEO Campaigns",
    price: "₹5,999",
    desc: "Deep technical auditing, semantic structuring, and layout rankings.",
  },
  {
    title: "Copywriting Matrix",
    price: "₹4,499",
    desc: "High conversion editorial narratives that keep layouts readable.",
  },
];

const MAINTENANCE_PLANS = [
  {
    name: "Basic Plan",
    price: "₹999/mo",
    offset: 180,
    list: [
      "Weekly Platform Updates",
      "Security Threat Patches",
      "1 System Request Hour",
    ],
  },
  {
    name: "Standard Plan",
    price: "₹2,499/mo",
    offset: 100,
    list: [
      "Bi-Weekly Layout Backups",
      "Core Optimization Audit",
      "5 Engineering Request Hours",
    ],
  },
  {
    name: "Premium System",
    price: "₹4,999/mo",
    offset: 30,
    list: [
      "Real-time Integrity Alerts",
      "Full Continuous Integration",
      "Unlimited Critical Fixes",
    ],
  },
];

const FAQS = [
  {
    q: "How long does a creative project typically take?",
    a: "Depending on your selected architecture (Starter vs Premium), production pipelines spin up layouts within 5 to 30 operational working days.",
  },
  {
    q: "Can I seamlessly upgrade my chosen infrastructure later?",
    a: "Absolutely. Our codebases are written in decoupled structural models, making upgrades to higher tiers modular and efficient.",
  },
  {
    q: "Do you provide hosting and infrastructure management?",
    a: "Yes, we structure completely serverless nodes or provision your dedicated infrastructure through modern optimized pipelines like Vercel and AWS.",
  },
  {
    q: "Is a custom web domain included in standard pricing frameworks?",
    a: "Domains are not directly bundled. However, we setup complete DNS handshakes, cloudflare firewalls, and SSL nodes without extra engineering charges.",
  },
  {
    q: "Can I request custom unique structural features outside tiers?",
    a: "Yes, our models are entirely customizable. Custom integrations map smoothly inside our professional and enterprise frameworks.",
  },
];

export default function Pricing() {
  const mainContainerRef = useRef(null);
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [animatedPrice, setAnimatedPrice] = useState(19999);

  useEffect(() => {
    const ctx = initPricingAnimations(mainContainerRef);
    let start = 0;
    const step = () => {
      start += Math.ceil((19999 - start) / 8);
      if (start >= 19999) {
        setAnimatedPrice(19999);
      } else {
        setAnimatedPrice(start);
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);

    return () => ctx.revert();
  }, []);

  const handlePlanSelection = (e, planName, cardElement) => {
    e.preventDefault();
    const btn = e.currentTarget;

    const tl = gsap.timeline({
      onComplete: () => {
        navigate(`/contact?plan=${encodeURIComponent(planName)}`);
      },
    });

    tl.to(cardElement, {
      scale: 1.04,
      boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)",
      borderColor: "rgba(168, 85, 247, 0.8)",
      duration: 0.2,
      ease: "power2.out",
    })
      .to(
        btn,
        {
          scale: 0.96,
          backgroundColor: "rgba(168, 85, 247, 0.9)",
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        },
        0,
      )
      .to(cardElement, {
        scale: 1,
        filter: "blur(4px)",
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.in",
      });
  };

  return (
    <div
      ref={mainContainerRef}
      className="relative w-full overflow-x-hidden min-h-screen bg-[#07050a] text-white selection:bg-purple-500/30 font-sans"
    >
      {/* --- MASTER BACKGROUND LAYER SUITE --- */}
      <div className="mouse-spotlight pointer-events-none fixed w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] transition-opacity duration-500 z-10" />
      <div className="blueprint-bg pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#1f1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 z-0" />
      <div className="aurora-glow pointer-events-none fixed -top-40 -left-40 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[180px] z-0" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative mt-20  first-line:marker: w-full max-w-7xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-20">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-300 w-fit mb-6 shadow-sm">
            <span>✨ System Matrix 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-purple-400">
            Transparent Pricing.
            <br />
            Premium Digital Experiences.
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl leading-relaxed">
            Choose the perfect plan for your business. Every package is crafted
            to deliver measurable growth, beautiful design and high-performance
            engineering.
          </p>
        </div>

        {/* FLOATING BLUEPRINT ENGINE DASHBOARD */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="hero-dashboard w-full max-w-md bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                System Analytics Preview
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-neutral-400">Current Package</span>
                <span className="text-purple-300 font-bold tracking-wide">
                  Growth Framework
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-neutral-400">Estimated Timeline</span>
                <span className="text-white">7–12 Delivery Days</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-neutral-400">Support Duration</span>
                <span className="text-neutral-200">30 Days Active SLA</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-neutral-400">Core Performance Index</span>
                <span className="text-emerald-400 font-bold">
                  99% Lighthouse
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col items-center">
              <span className="text-xs uppercase text-neutral-400 font-mono mb-1">
                Dynamic Standard Estimate
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-white font-mono bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                ₹{animatedPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE PRICING CARDS ================= */}
      <section className="pricing-cards-section relative w-full max-w-7xl mx-auto px-6 py-20 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              id={`card-${plan.id}`}
              className={`pricing-card relative flex flex-col justify-between p-6 rounded-2xl border bg-neutral-900/40 backdrop-blur-md transition-all duration-300 transform-gpu cursor-default select-none ${
                plan.popular
                  ? "border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.15)]"
                  : "border-white/10"
              }`}
              onMouseMove={(e) => handleTiltEffect(e, e.currentTarget)}
              onMouseLeave={(e) => resetTiltEffect(e.currentTarget)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.4)]">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 min-h-[32px]">
                  {plan.desc}
                </p>
                <div className="mb-6">
                  {plan.tagline && (
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">
                      {plan.tagline}
                    </span>
                  )}
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-purple-300">
                    {plan.price}
                  </span>
                </div>
                <div className="w-full h-px bg-white/5 mb-6" />
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-0.5 font-mono">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={(e) =>
                  handlePlanSelection(
                    e,
                    plan.name,
                    document.getElementById(`card-${plan.id}`),
                  )
                }
                className={`w-full mt-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  plan.popular
                    ? "bg-purple-600 border-purple-500 hover:bg-purple-700 shadow-lg shadow-purple-600/20 text-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-200"
                }`}
              >
                {plan.id === "enterprise"
                  ? "Request Enterprise Quote"
                  : `Start ${plan.name} Plan`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURE COMPARISON MATRIX ================= */}
      <section className="comparison-section relative w-full max-w-5xl mx-auto px-6 py-20 z-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          Complete Architectural Breakdown
        </h2>

        <div className="w-full overflow-x-auto border border-white/10 rounded-2xl bg-neutral-900/30 backdrop-blur-xl">
          <div className="min-w-[800px] w-full text-left border-collapse">
            <div className="grid grid-cols-6 border-b border-white/10 p-4 bg-white/5 text-xs font-bold tracking-widest text-neutral-400 uppercase font-mono">
              <div>Core Pillar</div>
              <div>Starter</div>
              <div>Growth</div>
              <div>Professional</div>
              <div>Premium</div>
              <div>Enterprise</div>
            </div>

            <div className="divide-y divide-white/5">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className="comp-row grid grid-cols-6 p-4 text-xs text-neutral-300 hover:bg-purple-600/10 transition-colors duration-200 items-center"
                >
                  <div className="font-semibold text-white">{row.feature}</div>
                  <div>{row.starter}</div>
                  <div className="text-purple-300 font-medium">
                    {row.growth}
                  </div>
                  <div>{row.prof}</div>
                  <div>{row.premium}</div>
                  <div className="text-indigo-300">{row.enterprise}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADD-ON SERVICES ================= */}
      <section className="addons-section relative w-full max-w-6xl mx-auto px-6 py-20 z-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          Modular Engineering Add-Ons
        </h2>
        <p className="text-center text-xs text-neutral-400 font-mono mb-12 uppercase tracking-widest">
          Inject precise assets into any customized framework
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDONS.map((addon, index) => (
            <div
              key={index}
              className="addon-card p-6 bg-neutral-900/40 border border-white/5 rounded-xl hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(147,51,234,0.1)] transition-all duration-300 flex flex-col justify-between group"
              onMouseMove={(e) => handleTiltEffect(e, e.currentTarget)}
              onMouseLeave={(e) => resetTiltEffect(e.currentTarget)}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {addon.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                    {addon.price}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {addon.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-500 group-hover:text-purple-300 transition-colors duration-300">
                <span>Integrate Module</span>
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MAINTENANCE PLANS ================= */}
      <section className="maintenance-section relative w-full max-w-5xl mx-auto px-6 py-20 z-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          Continuous Optimization Sprints
        </h2>
        <p className="text-center text-xs text-neutral-400 font-mono mb-12 uppercase tracking-widest">
          Keep performance and integrity locked continuously
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MAINTENANCE_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className="p-6 bg-neutral-900/50 border border-white/10 rounded-2xl flex flex-col items-center text-center relative group overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    className="maint-progress stroke-purple-500 transition-all duration-300"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="251.2"
                    data-offset={plan.offset}
                  />
                </svg>
                <div className="absolute font-mono text-[10px] uppercase text-neutral-400 tracking-wider">
                  Metrics
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1">
                {plan.name}
              </h3>
              <span className="text-xl font-mono font-black text-purple-300 mb-6">
                {plan.price}
              </span>

              <ul className="space-y-2 text-xs text-neutral-400 border-t border-white/5 pt-4 w-full text-left">
                {plan.list.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="relative w-full max-w-4xl mx-auto px-6 py-20 z-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          Frequently Answered Inquiries
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-white/10 rounded-xl bg-neutral-900/20 backdrop-blur-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm font-semibold tracking-wide text-neutral-200">
                    {faq.q}
                  </span>
                  <span
                    className={`text-xl transform transition-transform duration-300 text-purple-400 ${isOpen ? "rotate-45" : "rotate-0"}`}
                  >
                    ＋
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-40 border-t border-white/5 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="p-5 text-xs leading-relaxed text-neutral-400 bg-white/[0.01]">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= PREMIUM CALL TO ACTION ================= */}
      <section className="cta-section relative w-full max-w-5xl mx-auto px-6 py-24 z-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <h2 className="cta-heading text-3xl md:text-5xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-purple-400 max-w-3xl mx-auto leading-tight">
          Ready to Build Something Extraordinary?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300 transform hover:-translate-y-0.5">
            Start Your Project
          </button>
          <button className="px-8 py-3.5 bg-neutral-900 border border-white/10 hover:border-white/20 text-neutral-200 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5">
            Schedule a Discovery Call
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
