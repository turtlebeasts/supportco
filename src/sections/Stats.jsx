import SectionHeading from "../components/SectionHeading.jsx";

const stats = [
  { k: "99.95%", v: "SLA Uptime" },
  { k: "24×7", v: "NOC Monitoring" },
  { k: "50+", v: "Corporate Sectors" },
  { k: "10k+", v: "Endpoints Managed" },
];

export default function Stats() {
  return (
    <section className="relative z-10 py-16 card-strong">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Trusted operations"
          title="Numbers that matter"
          copy="We pair proactive monitoring with on-site expertise."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="card p-6 text-center">
              <div className="text-3xl font-semibold text-cyan-300">{s.k}</div>
              <div className="mt-1 text-sm text-slate-300">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
