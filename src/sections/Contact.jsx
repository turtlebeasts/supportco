import SectionHeading from "../components/SectionHeading.jsx";

export default function Contact() {
  function onSubmit(e) {
    e.preventDefault();
    alert("Demo form — wire to your backend or form service.");
  }

  return (
    <section id="contact" className="bg-black relative z-10 py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Get in touch"
          title="Let’s talk about your environment"
          copy="Tell us about your sites, endpoints and SLAs. We’ll propose a rollout plan."
        />

        <form onSubmit={onSubmit} className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card p-6 grid gap-4">
            <div>
              <label className="text-sm">Name</label>
              <input
                className="mt-1 w-full rounded-xl border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400"
                placeholder="Your name"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="text-sm">Phone</label>
                <input
                  className="mt-1 w-full rounded-xl border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400"
                  placeholder="+91 ..."
                />
              </div>
            </div>
            <div>
              <label className="text-sm">Company</label>
              <input
                className="mt-1 w-full rounded-xl border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400"
                placeholder="Acme Ltd"
              />
            </div>
            <div>
              <label className="text-sm">What do you need?</label>
              <textarea
                rows="5"
                className="mt-1 w-full rounded-xl border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400"
                placeholder="e.g., 800 endpoints, 3 sites, M365, VPN, EDR rollout"
              />
            </div>
            <button className="justify-self-start px-5 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400">
              Request a demo
            </button>
            <p className="text-xs text-slate-400">
              This is a demo form. Hook up your backend or a form service later.
            </p>
          </div>

          <div className="card p-6 grid gap-4">
            <div>
              <div className="font-medium">Head Office</div>
              <p className="mt-1 text-sm text-slate-300">
                NOC Tower, Industrial Estate, City
              </p>
            </div>
            <div>
              <div className="font-medium">Support</div>
              <p className="mt-1 text-sm text-slate-300">
                support@supportco.example · +91 98xx-xxx-xxx
              </p>
            </div>
            <div>
              <div className="font-medium">Hours</div>
              <p className="mt-1 text-sm text-slate-300">
                Mon–Sat 9:00–19:00 · 24×7 on-call
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              We sign NDAs, follow least-privilege and log all admin actions.
              ISO-aligned processes.
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
