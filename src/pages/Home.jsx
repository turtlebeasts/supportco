// src/pages/Home.jsx
import { useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import Scene from "../three/Scene.jsx";
import Container from "../components/Container.jsx";
import Stats from "../sections/Stats.jsx";
import Services from "../sections/Services.jsx";
import Clients from "../sections/Clients.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  // r3f will listen ONLY on this hero overlay, so rotation works in the hero area
  const heroEventsRef = useRef(null);

  return (
    <div className="min-h-dvh relative">
      {/* Fullscreen canvas (visuals only) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* IMPORTANT: pass heroEventsRef as the eventSource */}
        <Scene eventSource={heroEventsRef} autoBase={0.35} />
      </div>

      {/* Non-blocking readability gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(2,6,23,.55),transparent_60%)]" />

      <Navbar />

      <main className="relative z-10">
        {/* ===== HERO (rotation surface + content) ===== */}
        <section className="relative">
          {/* This invisible layer captures drag/scroll for OrbitControls */}
          <div
            ref={heroEventsRef}
            className="absolute inset-0 z-10 pointer-events-auto"
            style={{ touchAction: "none" }} // allow touch rotate/zoom
            aria-hidden
          />
          {/* Content sits above; text ignores pointer so drags go through; buttons opt-in */}
          <div className="relative z-20 pt-28 pb-20 pointer-events-none">
            <Container className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
                We keep your{" "}
                <span className="text-cyan-300">infrastructure</span> running
              </h1>
              <p className="mt-4 text-slate-300 max-w-2xl mx-auto md:mx-0">
                Centralized management, 24×7 monitoring, and on-site support.
                Trusted by
                <span className="text-white font-medium">
                  {" "}
                  50+ corporate sectors
                </span>
                .
              </p>

              <div className="mt-8 flex gap-4 justify-center md:justify-start pointer-events-auto">
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400"
                >
                  Get a demo
                </a>
                <a
                  href="#services"
                  className="px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10"
                >
                  Our services
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  99.95% SLA
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  24×7 NOC
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs">
                  ISO-compliant
                </span>
              </div>
            </Container>
          </div>
        </section>

        {/* ===== Other sections (fully interactive as normal) ===== */}
        <Stats />
        <Services />
        <Clients />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
