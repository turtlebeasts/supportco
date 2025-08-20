// src/components/Navbar.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { Menu, X } from "lucide-react";
import useActiveSection from "../lib/useActiveSection";

const links = [
  { href: "#services", label: "Services" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  // scroll progress bar
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  // elevate + hide-on-scroll
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 8);
    const delta = y - lastY.current;
    if (Math.abs(delta) > 6) {
      setHidden(delta > 0 && y > 120); // hide when scrolling down past hero
      lastY.current = y;
    }
  });

  // active link
  const active = useActiveSection(links.map((l) => l.href));

  // mobile menu
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => (document.body.style.overflow = prev);
  }, [open]);

  const shadow = useMemo(
    () => (scrolled ? "shadow-[0_10px_40px_rgba(0,0,0,.35)]" : "shadow-none"),
    [scrolled]
  );

  return (
    <>
      {/* top scroll progress */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-cyan-400"
      />

      <motion.header
        initial={false}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className={`fixed inset-x-0 top-0 z-50`}
      >
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`}>
          <div
            className={[
              "mt-2 flex h-14 items-center justify-between rounded-2xl border backdrop-blur-md px-4",
              scrolled
                ? "bg-black/50 border-white/15"
                : "bg-black/30 border-white/10",
              shadow,
            ].join(" ")}
          >
            {/* Brand */}
            <a href="#" className="font-semibold tracking-tight text-cyan-300">
              Support<span className="text-white">Co</span>
            </a>

            {/* Desktop nav */}
            <nav className="relative hidden md:flex items-center gap-6 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-1.5 py-2 text-slate-200/90 hover:text-white relative"
                >
                  {l.label}
                  {/* active underline */}
                  {active === l.href && (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-cyan-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 550,
                        damping: 40,
                      }}
                    />
                  )}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 rounded-xl bg-cyan-500 text-black px-4 py-2 font-medium hover:bg-cyan-400"
              >
                Get a demo
              </a>
            </nav>

            {/* Mobile trigger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-slate-100"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        role="dialog"
        aria-modal={open ? "true" : "false"}
        initial={false}
        animate={{ pointerEvents: open ? "auto" : "none" }}
        className="fixed inset-0 z-[70]"
      >
        {/* Backdrop */}
        <motion.div
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        {/* Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: open ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="absolute right-0 inset-y-0 w-[85%] max-w-sm bg-[#0b1220]/95 border-l border-white/10 shadow-[0_10px_40px_rgba(0,0,0,.6)]"
        >
          <div className="flex items-center justify-between h-14 px-4 border-b border-white/10">
            <div className="font-semibold text-cyan-300">SupportCo</div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-lg hover:bg-white/10"
            >
              <X className="size-6 text-slate-100" />
            </button>
          </div>
          <nav className="px-4 py-4 grid gap-2">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={`rounded-xl border px-4 py-3 text-base ${
                  active === l.href
                    ? "border-cyan-400/40 bg-cyan-400/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-200"
                }`}
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-cyan-500 text-black px-4 py-3 font-medium text-center hover:bg-cyan-400"
            >
              Get a demo
            </a>
          </nav>
          <div className="mt-auto px-4 py-5 border-t border-white/10 text-sm text-slate-300">
            <div className="font-medium text-slate-100">Support</div>
            support@supportco.example · +91 98xx-xxx-xxx
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
