// src/sections/Services.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Server,
  ShieldCheck,
  Router,
  Headphones,
  Activity,
  Cloud,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

const items = [
  {
    icon: Server,
    title: "Endpoint & Patch Management",
    body: ["Windows/macOS fleet", "Policy baselines", "Zero-day response"],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    body: ["AV/EDR rollouts", "Hardening & CIS", "Audit support"],
  },
  {
    icon: Router,
    title: "Network & Infra",
    body: ["Switching/Wi-Fi", "Firewalls, VPN", "Observability"],
  },
  {
    icon: Headphones,
    title: "Helpdesk & On-site",
    body: ["SLA-backed L1-L3", "Field engineers", "Procurement assist"],
  },
  {
    icon: Activity,
    title: "Monitoring & Incident",
    body: ["24×7 NOC", "Runbooks & escalation", "Post-incident reviews"],
  },
  {
    icon: Cloud,
    title: "Identity & Cloud",
    body: ["SSO/MFA", "M365/Google", "Backup & DR"],
  },
];

export default function Services() {
  const coarse = useCoarsePointer();
  const rm = useReducedMotion();

  return (
    <section id="services" className="relative z-10 py-24 bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: rm ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionHeading
            center
            eyebrow="What we do"
            title="Managed support for modern IT"
            copy="From onboarding a new site to hardening your core — we cover the stack."
          />
        </motion.div>

        {/* Staggered grid entrance */}
        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {items.map((it, i) => (
            <ServiceCard
              key={it.title}
              Icon={it.icon}
              title={it.title}
              points={it.body}
              coarse={coarse}
              rm={rm}
              delay={i * 0.03}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return coarse;
}

function ServiceCard({ Icon, title, points, coarse, rm, delay = 0 }) {
  const [mx, setMx] = useState(0.5); // 0..1
  const [my, setMy] = useState(0.5); // 0..1

  const rotateX = useMemo(() => (coarse ? 0 : (0.5 - my) * 6), [my, coarse]);
  const rotateY = useMemo(() => (coarse ? 0 : (mx - 0.5) * 8), [mx, coarse]);

  const onMove = (e) => {
    if (coarse) return;
    const r = e.currentTarget.getBoundingClientRect();
    setMx((e.clientX - r.left) / r.width);
    setMy((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    if (!coarse) {
      setMx(0.5);
      setMy(0.5);
    }
  };

  // Entrance variants (respect reduced motion)
  const vCard = {
    hidden: {
      opacity: 0,
      y: rm ? 0 : 18,
      scale: rm ? 1 : 0.985,
      filter: rm ? "none" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "none",
      transition: { duration: 0.55, ease: "easeOut", delay },
    },
  };
  const vIcon = {
    hidden: { opacity: 0, scale: rm ? 1 : 0.85, rotate: rm ? 0 : -8 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 26,
        delay: 0.08 + delay,
      },
    },
  };
  const vLi = {
    hidden: { opacity: 0, y: rm ? 0 : 8 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
        delay: 0.12 + delay + i * 0.05,
      },
    }),
  };

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      variants={vCard}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,.45)] p-6 group will-change-transform transform-gpu"
    >
      {/* Cursor-follow cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(160px 160px at ${mx * 100}% ${
            my * 100
          }%, rgba(34,211,238,.12), transparent 60%)`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative"
        variants={{ hidden: {}, show: { transition: { delayChildren: 0.02 } } }}
      >
        <motion.div
          className="inline-flex size-10 items-center justify-center rounded-xl bg-cyan-400/15 ring-1 ring-cyan-300/30"
          variants={vIcon}
          whileHover={{ y: -2, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <Icon className="size-5 text-cyan-300" />
        </motion.div>

        <motion.h3
          className="mt-3 font-medium text-slate-100"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.1 + delay } },
          }}
        >
          {title}
        </motion.h3>

        <ul className="mt-2 text-sm text-slate-300 space-y-1.5">
          {points.map((p, i) => (
            <motion.li key={p} custom={i} variants={vLi}>
              • {p}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Accent underline grows in on reveal */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 + delay }}
        className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent origin-left"
      />

      {/* Subtle ring on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-cyan-300/40 transition-[box-shadow,ring-color] duration-300"
        style={{ boxShadow: "0 10px 30px rgba(14,165,233,.12)" }}
      />
    </motion.article>
  );
}
