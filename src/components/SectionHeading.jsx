export default function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false,
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-widest text-cyan-300/80">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">{title}</h2>
      {copy && <p className="mt-3 text-slate-300">{copy}</p>}
    </div>
  );
}
