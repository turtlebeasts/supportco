// src/lib/useActiveSection.js
import { useEffect, useState } from "react";

export default function useActiveSection(
  ids = [],
  { rootMargin = "-40% 0px -50% 0px" } = {}
) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids.map((id) => document.querySelector(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { root: null, rootMargin, threshold: [0, 0.3, 0.6, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(","), rootMargin]);
  return active;
}
