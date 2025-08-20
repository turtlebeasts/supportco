import Container from "./Container.jsx";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <Container className="py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold text-cyan-300">SupportCo</div>
          <p className="mt-2 text-sm text-slate-300">
            Enterprise technical support — proactive, secure, reliable.
          </p>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <ul className="mt-2 text-sm text-slate-300">
            <li>support@supportco.example</li>
            <li>+91 98xx-xxx-xxx</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-2 text-sm text-slate-300">
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </Container>
      <div className="text-center py-6 text-xs text-slate-500">
        © {new Date().getFullYear()} SupportCo. All rights reserved.
      </div>
    </footer>
  );
}
