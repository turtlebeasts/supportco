import SectionHeading from "../components/SectionHeading.jsx";

const logos = [
  "Acme Bank",
  "Globex",
  "Initech",
  "Umbrella",
  "Soylent",
  "Stark Industries",
  "Wonka",
  "Wayne Corp",
  "Hooli",
  "Massive Dynamic",
];

// Reusable track
function Track({ dir = "left", duration = 28 }) {
  const row = [...logos, ...logos]; // seamless loop
  return (
    <div
      className={`marquee-row ${
        dir === "right" ? "marquee-right" : "marquee-left"
      }`}
      style={{ animationDuration: `${duration}s` }}
    >
      <div className="marquee-track">
        {row.map((name, i) => (
          <div
            key={`${dir}-${i}`}
            className="h-12 px-5 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-sm text-slate-200 whitespace-nowrap"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section id="clients" className="card-strong relative z-10 py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Trusted by teams"
          title="Across industries"
          copy="Finance, healthcare, logistics, retail, manufacturing and more."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Track dir="left" duration={28} />
          <Track dir="right" duration={28} />
        </div>
      </div>
    </section>
  );
}
