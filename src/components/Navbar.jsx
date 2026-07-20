import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoMark from "../../public/assets/ordercraft-logo.png";

const LINKS = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Pricing", to: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const linkRefs = useRef([]);
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  function handleLinkHover(index) {
    const el = linkRefs.current[index];
    const nav = navRef.current;
    if (!el || !nav) return;
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setPill({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
    setHovered(index);
  }

  function handleNavLeave() {
    setHovered(null);
    setPill((p) => ({ ...p, opacity: 0 }));
  }

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-2 md:px-8 md:pt-6"
    >
      {/* Main Glassmorphic Container */}
      <div
        className={`flex w-full max-w-[1250px] items-center justify-between gap-4 rounded-3xl border px-4 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-500 ease-out md:px-5 ${
          scrolled
            ? "border-white/10 bg-black/40 shadow-[0_12px_40px_0_rgba(0,0,0,0.2)]"
            : "border-white/5 bg-white/[0.03]"
        }`}
      >
        {/* Logo with scale micro-interaction */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <motion.span
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-15 w-12 items-center justify-center"
          >
            <img
              src={logoMark}
              alt="OrderCraft"
              draggable={false}
              className="relative z-10 h-full w-full select-none object-contain transition-transform duration-500 ease-out group-hover:rotate-6"
            />
          </motion.span>
          <span className="text-[20px] font-semibold tracking-tight text-ink-primary">
            OrderCraft
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          ref={navRef}
          onMouseLeave={handleNavLeave}
          className="relative hidden items-center gap-1 md:flex"
        >
          {/* Animated Hover Pill Background */}
          <span
            className="pointer-events-none absolute inset-y-0 rounded-full bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out"
            style={{
              left: pill.left,
              width: pill.width,
              opacity: pill.opacity,
            }}
          />
          {LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              ref={(el) => (linkRefs.current[i] = el)}
              to={link.to}
              onMouseEnter={() => handleLinkHover(i)}
              className={({ isActive }) =>
                `relative z-10 rounded-full text-[15px] px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                  hovered === i || isActive
                    ? "text-white"
                    : "text-ink-secondary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button with advanced micro-interactions */}
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/contact"
            className="btn-primary group hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-sm transition-all duration-300 hover:bg-white/90 hover:shadow-md md:inline-flex"
          >
            <span>Let&rsquo;s Talk</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-110"
            />
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="rounded-xl p-2 text-ink-primary hover:bg-white/5 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* Mobile Drawer with matching glassmorphism */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-[76px] rounded-2xl border border-white/10 bg-black/60 px-6 py-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 * i,
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-secondary transition-colors duration-300 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 * LINKS.length,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-md transition-transform active:scale-95"
                >
                  <span>Let&rsquo;s Talk</span>
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
