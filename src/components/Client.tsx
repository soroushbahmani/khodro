"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IconHome, IconGrid, IconReport, IconInsta, IconDoc } from "./Icons";

export function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const f = () => { const h = document.documentElement; setW((h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100); };
    f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f);
  }, []);
  return <div aria-hidden className="fixed top-0 inset-x-0 h-[3px] z-[60] origin-right"><div className="h-full bg-gradient-to-l from-yellow via-brand-2 to-brand" style={{ width: `${w}%`, transition: "width .1s linear", marginInlineStart: 0 }} /></div>;
}

export function Counter({ to, suffix = "", fa = true }: { to: number; suffix?: string; fa?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => { const k = Math.min(1, (t - t0) / 1400); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{(fa ? v.toLocaleString("fa-IR") : v)}{suffix}</span>;
}

export function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} onPointerUp={leave} className={className} style={{ transition: "transform .25s ease-out", willChange: "transform" }}>{children}</div>;
}

const tabs = [
  { href: "/", hash: "", label: "خانه", icon: <IconHome /> },
  { href: "/#services", hash: "#services", label: "خدمات", icon: <IconGrid /> },
  { href: "/tools/", hash: "", label: "ابزارها", icon: <IconReport /> },
  { href: "/#instagram", hash: "#instagram", label: "اینستا", icon: <IconInsta /> },
  { href: "/requirements/", hash: "", label: "نیازمندی", icon: <IconDoc /> },
];

export function BottomNav() {
  const path = usePathname();
  const [active, setActive] = useState("");
  useEffect(() => {
    if (path !== "/") return;
    const ids = ["services", "report", "instagram"];
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); }); if (scrollY < 200) setActive(""); }, { rootMargin: "-40% 0px -50% 0px" });
    ids.forEach((i) => { const el = document.getElementById(i); if (el) io.observe(el); });
    const top = () => { if (scrollY < 200) setActive(""); };
    addEventListener("scroll", top, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", top); };
  }, [path]);
  const isOn = (t: (typeof tabs)[number]) => (t.href.startsWith("/requirements") ? path.startsWith("/requirements") : t.href.startsWith("/tools") ? path.startsWith("/tools") : path === "/" && t.hash === active);
  return (
    <nav aria-label="ناوبری موبایل" className="md:hidden fixed bottom-0 inset-x-0 z-50 px-3 pb-[max(.6rem,env(safe-area-inset-bottom))]">
      <ul className="mx-auto max-w-md grid grid-cols-5 rounded-[1.6rem] bg-night/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] p-1.5 text-white">
        {tabs.map((t) => {
          const on = isOn(t);
          return (
            <li key={t.label}>
              <a href={t.href} onClick={() => { try { navigator.vibrate?.(8); } catch {} }} aria-current={on ? "page" : undefined}
                 className={`flex flex-col items-center gap-0.5 py-2 rounded-2xl text-[10.5px] font-bold transition active:scale-90 ${on ? "bg-brand text-white" : "text-white/65"}`}>
                <span className={`transition-transform ${on ? "scale-110" : ""}`}>{t.icon}</span>{t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
