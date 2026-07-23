import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Added for tracking query parameters
import { Instagram, Facebook, Goal } from "lucide-react";
import { initContactAnimations } from "./contactAnimation";
import SEO from "../SEO.jsx";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function Contact() {
  // Simple inline icons for platforms not in lucide-react
  const WhatsAppIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 004.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.44.29.15.46.13.63-.08.17-.2.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
  // Update these with your real profile URLs
  const socialLinks = [
    {
      name: "Whatsapp",
      url: "https://wa.me/918527283407",
      Icon: WhatsAppIcon,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ordercraft21/",
      Icon: Instagram,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/19C7L1T2dH/",
      Icon: Facebook,
    },
  ];

  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  // URL Search Parameters Parsing Protocol
  const [searchParams] = useSearchParams();
  const planQuery = searchParams.get("plan")?.toLowerCase() || "";

  // Updated Mapping Protocol
  const getInitialFormState = () => {
    const baseState = {
      name: "",
      email: "",
      company: "",
      mobile: "",
      service: "",
      budget: "",
      timeline: "",
      source: "",
      currentWebsite: "",
      message: "",
    };

    // Correctly matching your actual pricing tiers

    if (planQuery === "starter") {
      baseState.service = "Web Development";
      baseState.budget = "₹10K";
    } else if (planQuery === "growth") {
      baseState.service = "Web Development";
      baseState.budget = "₹20K-₹30K"; // Adjusted for ₹19,999 tier
    } else if (planQuery === "professional") {
      baseState.service = "AI Automation";
      baseState.budget = "₹30k-₹40K";
    } else if (planQuery === "premium") {
      baseState.service = "Custom Project";
      baseState.budget = "₹50K";
    } else if (planQuery === "enterprise") {
      baseState.service = "Custom Project";
      baseState.budget = "Above 50K";
    }

    return baseState;
  };

  // Form State Orchestration
  const [formData, setFormData] = useState(getInitialFormState);
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success

  // Data Objects
  const servicesList = [
    "Web Development",
    "UI/UX Design",
    "AI Automation",
    "Website Redesign",
    "Custom Project",
  ];

  const budgetsList = [
    "₹10K",
    "₹20K-₹30K",
    "₹30k-₹40K",
    "₹50K",
    "Above 50K",
    "Let's Discuss",
  ];

  const timelineList = [
    "ASAP",
    "Within 1 Month",
    "1-3 Months",
    "Just Exploring",
  ];

  const sourceList = [
    "Google Search",
    "Instagram",
    "LinkedIn",
    "Referral",
    "Other",
  ];

  const faqData = [
    {
      q: "How long does a website take?",
      a: "A standard premium build takes between 4 to 8 weeks depending on systemic scope. High-end bespoke motion layouts integrated with complex 3D or custom automation engines can extend to 12 weeks.",
    },
    {
      q: "How much does a custom website cost?",
      a: "Every system architecture layout we design is explicitly custom-tailored. Pricing ranges adapt completely dynamically depending on dynamic shaders, integrations, and asset scopes needed.",
    },
    {
      q: "Do you redesign existing websites?",
      a: "Yes. We completely dismantle underperforming legacy infrastructure, redesigning the full UI orchestration pipeline to secure faster structural delivery and updated brand frameworks.",
    },
    {
      q: "Can you work with international clients?",
      a: "Absolutely. Our studio works seamlessly across distributed global networks, aligning continuous integration checkpoints dynamically matching standard localized timelines.",
    },
    {
      q: "Do you provide ongoing support?",
      a: "Yes. Every project includes structured post-deployment performance assurance monitoring and continuous scaling support tailored to modern system cycles.",
    },
  ];

  useEffect(() => {
    const cleanup = initContactAnimations(containerRef);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Synchronize component layout if the query path changes without full context rebuilds
  useEffect(() => {
    if (planQuery) {
      setFormData((prev) => {
        const structuralUpdate = { ...prev };
        if (planQuery === "starter") {
          structuralUpdate.service = "Web Development";
          structuralUpdate.budget = "₹10K";
        } else if (planQuery === "growth") {
          structuralUpdate.service = "Web Development";
          structuralUpdate.budget = "₹20K-₹30K"; // Adjusted for ₹19,999 tier
        } else if (planQuery === "professional") {
          structuralUpdate.service = "AI Automation";
          structuralUpdate.budget = "₹30k-₹40K";
        } else if (planQuery === "premium") {
          structuralUpdate.service = "Custom Project";
          structuralUpdate.budget = "₹50K";
        } else if (planQuery === "enterprise") {
          structuralUpdate.service = "Custom Project";
          structuralUpdate.budget = "Above 50K";
        }
        return structuralUpdate;
      });
    }
  }, [planQuery]);

  const handleGlobalMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) return;

    setFormStatus("loading");

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("company", formData.company);
      form.append("mobile", formData.mobile);
      form.append("service", formData.service);
      form.append("budget", formData.budget);
      form.append("timeline", formData.timeline);
      form.append("source", formData.source);
      form.append("currentWebsite", formData.currentWebsite);
      form.append("message", formData.message);
      form.append("selectedPlan", planQuery || "");

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: form,
        mode: "no-cors",
      });

      // Note: with mode "no-cors" the browser gives us an "opaque" response,
      // so we can't read status/text back. If fetch didn't throw, we assume
      // the request reached Google's servers successfully.
      setFormStatus("success");
      setFormData(getInitialFormState());
    } catch (error) {
      console.error(error);
      setFormStatus("idle");
      alert(error.message);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative w-full min-h-screen bg-[#07070c] text-white overflow-hidden font-sans select-none antialiased"
      style={{
        "--global-mx": `${mousePos.x}px`,
        "--global-my": `${mousePos.y}px`,
      }}
    >
      <SEO
        title="Contact Us"
        description="Get in touch with OrderCraft to start your next web development, UI/UX design, or AI automation project. Response within 24 hours."
        path="/contact"
      />
      {/* BACKGROUND GRAPHIC ORNAMENTS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--global-mx)_var(--global-my),rgba(147,51,234,0.06)_0%,transparent_50%)] pointer-events-none z-10" />
      <div className="absolute top-[-5%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-purple-900/10 blur-[130px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-indigo-950/15 blur-[160px] mix-blend-screen pointer-events-none" />

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center px-6 md:px-24 border-b border-purple-950/20 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="hero-particles absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping [animation-duration:4s]" />
          <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        </div>

        <div className="hero-watermark absolute bottom-6 left-12 text-[11vw] font-black tracking-tighter text-purple-900/5 leading-none font-mono uppercase pointer-events-none select-none">
          ODERCRAFT
        </div>

        <div className="relative z-10 max-w-5xl text-center space-y-6">
          <h1 className="hero-title text-4xl md:text-7xl font-light tracking-tight uppercase leading-[1.1]">
            <span className="word inline-block mr-4">Let's</span>
            <span className="word inline-block mr-4">Build</span>
            <span className="word inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-white font-normal">
              Something
            </span>
            <br className="hidden md:inline" />
            <span className="word inline-block text-purple-400/90 font-mono">
              Extraordinary.
            </span>
          </h1>

          <p className="hero-desc max-w-2xl mx-auto text-sm md:text-base text-slate-400 font-light tracking-wide leading-relaxed">
            Have a blueprint in mind or need us to construct one? Initiate
            direct system dialogue with our architectural studio core to
            engineer your next digital framework.
          </p>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center space-y-2 opacity-40">
          <span className="text-[9px] tracking-[0.3em] font-mono text-purple-400 uppercase">
            Initialize Connection
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-purple-500 to-transparent animate-bounce" />
        </div>
      </section>

      {/* SECTION 2: CONTACT SECTION */}
      <section className="contact-section relative w-full py-24 md:py-36 px-6 md:px-24 border-b border-purple-950/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: Premium Contact Form */}
          <div className="contact-grid-left lg:col-span-7 bg-purple-950/5 border border-purple-900/20 rounded-2xl p-8 md:p-12 backdrop-blur-xl relative mouse-spotlight">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.1)_0%,transparent_60%)] pointer-events-none rounded-2xl" />

            <h3 className="text-xl font-light uppercase tracking-wider mb-8 text-slate-200 font-mono">
              // INITIALIZE PROJECT PROTOCOL
            </h3>

            {formStatus === "success" ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="text-4xl text-purple-400 animate-bounce">✦</div>
                <h4 className="text-2xl font-light uppercase tracking-tight">
                  Transmission Secured
                </h4>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                  Your layout parameters have reached our edge network nodes. A
                  design engineer will initialize response sequence within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="space-y-6 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder=" "
                      className="w-full bg-purple-950/10 border border-purple-900/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3 text-xs text-slate-400 pointer-events-none transition-all duration-300 origin-left transform -translate-y-6 scale-75 bg-[#07070c] px-1 group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-6 group-focus:scale-75 group-focus:text-purple-400">
                      Full Name *
                    </label>
                  </div>

                  {/* Email Address */}
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder=" "
                      className="w-full bg-purple-950/10 border border-purple-900/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3 text-xs text-slate-400 pointer-events-none transition-all duration-300 origin-left transform -translate-y-6 scale-75 bg-[#07070c] px-1 group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-6 group-focus:scale-75 group-focus:text-purple-400">
                      Email Address *
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder=" "
                      className="w-full bg-purple-950/10 border border-purple-900/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3 text-xs text-slate-400 pointer-events-none transition-all duration-300 origin-left transform -translate-y-6 scale-75 bg-[#07070c] px-1 group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-6 group-focus:scale-75 group-focus:text-purple-400">
                      Company / Brand
                    </label>
                  </div>

                  {/* Mobile Number */}
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      placeholder=" "
                      className="w-full bg-purple-950/10 border border-purple-900/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3 text-xs text-slate-400 pointer-events-none transition-all duration-300 origin-left transform -translate-y-6 scale-75 bg-[#07070c] px-1 group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-6 group-focus:scale-75 group-focus:text-purple-400">
                      Mobile Number
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Service Required {planQuery && " (Auto-Configured)"}
                    </span>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full bg-[#0a0a12] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-400 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-400"
                    >
                      <option value="">Select operational scope</option>
                      {servicesList.map((srv, idx) => (
                        <option key={idx} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Estimated Budget {planQuery && " (Auto-Configured)"}
                    </span>
                    <select
                      required
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full bg-[#0a0a12] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-400 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-400"
                    >
                      <option value="">Select allocation layout</option>
                      {budgetsList.map((bud, idx) => (
                        <option key={idx} value={bud}>
                          {bud}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Timeline Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Project Timeline
                    </span>
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full bg-[#0a0a12] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-400 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-400"
                    >
                      <option value="">When do you want to start?</option>
                      {timelineList.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* How did you find us Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      How Did You Find Us?
                    </span>
                    <select
                      value={formData.source}
                      onChange={(e) =>
                        setFormData({ ...formData, source: e.target.value })
                      }
                      className="w-full bg-[#0a0a12] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-400 appearance-none cursor-pointer focus:ring-1 focus:ring-purple-400"
                    >
                      <option value="">Select source</option>
                      {sourceList.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Conditional: Current Website URL (only for Website Redesign) */}
                {formData.service === "Website Redesign" && (
                  <div className="relative group animate-fade-in">
                    <input
                      type="text"
                      value={formData.currentWebsite}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentWebsite: e.target.value,
                        })
                      }
                      placeholder=" "
                      className="w-full bg-purple-950/10 border border-purple-900/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 placeholder-transparent"
                    />
                    <label className="absolute left-4 top-3 text-xs text-slate-400 pointer-events-none transition-all duration-300 origin-left transform -translate-y-6 scale-75 bg-[#07070c] px-1 group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-6 group-focus:scale-75 group-focus:text-purple-400">
                      Current Website URL
                    </label>
                  </div>
                )}

                {/* Textarea Description */}
                <div className="relative group">
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder=" "
                    className="w-full bg-purple-950/10 border border-purple-900/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300 placeholder-transparent resize-none"
                  />
                  <label className="absolute left-4 top-3 text-xs text-slate-400 pointer-events-none transition-all duration-300 origin-left transform -translate-y-6 scale-75 bg-[#07070c] px-1 group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-6 group-focus:scale-75 group-focus:text-purple-400">
                    Tell us about your project *
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="btn-magnetic w-full relative inline-flex items-center justify-center px-8 py-4 rounded-xl border border-purple-500/30 bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-transform duration-300 shadow-[0_0_30px_rgba(147,51,234,0.15)] group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    <span className="group-hover:text-white transition-colors duration-300">
                      {formStatus === "loading"
                        ? "Transmitting Data..."
                        : "Start Your Project"}
                    </span>
                    <span className="ml-2 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 font-sans">
                      →
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Agency Information */}
          <div className="contact-grid-right lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
                // STUDIO MATRICES
              </span>
              <h2 className="text-3xl font-light uppercase tracking-tight">
                Let's Build Together
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Prefer immediate declarative email pipelines or want to visit
                our localized server node space? Connect through direct
                coordinates.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-purple-950 bg-purple-950/10 backdrop-blur-md space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  ordercraft21@gmail.com
                </span>
                <div className="text-base text-purple-300 font-mono hover:text-white transition-colors cursor-pointer"></div>
              </div>

              <div className="p-5 rounded-xl border border-purple-950 bg-purple-950/10 backdrop-blur-md space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Global HQ Node
                </span>
                <div className="text-base text-slate-200">India</div>
              </div>

              <div className="p-5 rounded-xl border border-purple-950 bg-purple-950/10 backdrop-blur-md grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    Working Hours
                  </span>
                  <span className="text-sm text-slate-200">
                    Mon - Fri, 9AM - 7PM IST
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    Response Matrix
                  </span>
                  <span className="text-sm text-slate-200">
                    Within 24 Hours
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 font-mono text-[10px] text-emerald-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Accepting New Projects</span>
              </div>
            </div>

            {/* Social Matrix */}
            <div className="pt-6 border-t border-purple-950/40 space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                Social Networks
              </span>
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                {socialLinks.map(({ name, url, Icon }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-purple-950/20 border border-purple-950 hover:border-purple-500/30 text-slate-400 hover:text-purple-400 cursor-pointer transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ */}
      <section className="faq-section relative w-full py-24 md:py-36 px-6 md:px-24 bg-[#05050a] border-b border-purple-950/20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              // RESOLUTION LOGICS
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="faq-item-card mouse-spotlight group p-6 rounded-xl border border-purple-900/20 bg-purple-950/5 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-purple-500/30"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.06)_0%,transparent_50%)] pointer-events-none rounded-xl" />

                  <div className="flex items-center justify-between space-x-4 relative z-10">
                    <h3 className="text-base md:text-lg font-light tracking-wide text-slate-200 group-hover:text-purple-300 transition-colors">
                      {faq.q}
                    </h3>
                    <div className="w-6 h-6 rounded-full border border-purple-800/40 flex items-center justify-center text-xs font-mono text-purple-400 group-hover:border-purple-400 transition-all transform duration-300">
                      <span
                        className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                      >
                        ＋
                      </span>
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-in-out relative z-10 font-light text-sm text-slate-400 leading-relaxed overflow-hidden ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pt-4 mt-2 border-t border-purple-950/40"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: FINAL CTA */}
      <section className="cta-section relative w-full py-32 md:py-44 px-6 md:px-24 text-center overflow-hidden bg-gradient-to-b from-transparent to-[#040407]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75vw] h-[30vw] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />

        <div className="cta-content-wrap max-w-4xl mx-auto space-y-10 relative z-10">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase leading-[1.15]">
            Ready to craft your next <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-white">
              digital experience?
            </span>
          </h2>

          <p className="max-w-md mx-auto text-xs md:text-sm text-slate-400 font-light tracking-wide leading-relaxed">
            Choose your communication layout protocol. Let's arrange immediate
            creative structural blueprints together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="btn-magnetic relative group inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <span className="group-hover:text-white transition-colors duration-300">
                Start Your Project
              </span>
            </button>

            <button className="btn-magnetic relative group inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-purple-900/40 bg-purple-950/20 backdrop-blur-md text-slate-300 hover:text-white font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:border-purple-500/40">
              <span>Schedule a Call</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-purple-950/40 tracking-widest hidden md:block">
          NODE // CON-MODULE-2026
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-purple-950/40 tracking-widest hidden md:block">
          ENCRYPTION // SHADER_SECURE
        </div>
      </section>
    </div>
  );
}
