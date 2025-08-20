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

function Track({ startOffset = 0 }) {
  // duplicate content so it loops seamlessly
  const row = [...logos, ...logos];
  return (
    <div
      className="marquee-row"
      style={{ transform: `translateX(${startOffset}%)` }}
    >
      <div className="marquee-track">
        {row.map((name, i) => (
          <div
            key={i}
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
          <Track startOffset={0} />
          <Track startOffset={-50} />
        </div>
      </div>
    </section>
  );
}
