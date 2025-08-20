import { motion } from "motion/react";
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
  return (
    <section id="services" className="bg-black relative z-10 py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="What we do"
          title="Managed support for modern IT"
          copy="From onboarding a new site to hardening your core — we cover the stack."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="card p-6"
            >
              <it.icon className="size-6 text-cyan-300" />
              <h3 className="mt-3 font-medium">{it.title}</h3>
              <ul className="mt-2 text-sm text-slate-300 space-y-1.5">
                {it.body.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
