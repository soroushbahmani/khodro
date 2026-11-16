"use client";
import { useMemo, useState } from "react";
import { brand, checklist } from "@/data/site";

type St = "ok" | "warn" | "bad";
const label: Record<St, string> = { ok: "سالم", warn: "نیمه", bad: "معیوب" };
const tone: Record<St, string> = { ok: "bg-emerald-600 text-white", warn: "bg-yellow text-ink", bad: "bg-crimson text-white" };
const val: Record<St, number> = { ok: 1, warn: 0.5, bad: 0 };
const critical = ["موتور", "گیربکس و گاردان"];

function band(n: number) { return n >= 90 ? "عالی" : n >= 75 ? "خوب" : n >= 60 ? "متوسط" : "پرریسک"; }
function advice(n: number, crit: boolean) {
  if (crit) return "ایراد حیاتی دارد؛ پیش از خرید حتماً کارشناسی تخصصی انجام بده یا کنار بگذار.";
  if (n >= 90) return "وضعیت عالی؛ خرید با خیال راحت‌تر.";
  if (n >= 75) return "خوب؛ روی ایرادهای کوچک مذاکره کن.";
  if (n >= 60) return "متوسط؛ هزینه‌ی تعمیر را در قیمت لحاظ کن.";
  return "پرریسک؛ بدون کارشناسی دقیق نخر.";
}

export function ScoreTool() {
  const [s, setS] = useState<Record<string, St>>(Object.fromEntries(checklist.map((c) => [c.name, "ok" as St])));
  const r = useMemo(() => {
    let t = 0; checklist.forEach((c) => (t += c.weight * val[s[c.name]]));
    const crit = critical.some((c) => s[c] === "bad");
    const n = Math.round(crit ? Math.min(t, 59) : t);
    return { n, crit };
  }, [s]);
  const color = r.n >= 75 ? "#16a34a" : r.n >= 60 ? "#f7ce46" : "#be123c";
  const c = 2 * Math.PI * 52;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <ul className="card divide-y divide-[var(--line)]">
        {checklist.map((it) => (
          <li key={it.name} className="p-4 flex flex-wrap items-center gap-3">
            <div className="min-w-32"><b>{it.name}</b><div className="text-xs muted">وزن {it.weight.toLocaleString("fa-IR")}٪{critical.includes(it.name) ? " · حیاتی" : ""}</div></div>
            <div className="mr-auto flex gap-1.5" role="radiogroup" aria-label={it.name}>
              {(["ok", "warn", "bad"] as St[]).map((k) => (
                <button key={k} role="radio" aria-checked={s[it.name] === k} onClick={() => { setS({ ...s, [it.name]: k }); try { navigator.vibrate?.(6); } catch {} }}
                  className={`px-3.5 py-2 rounded-full text-sm font-bold press border border-[var(--line)] ${s[it.name] === k ? tone[k] + " border-transparent" : ""}`}>{label[k]}</button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="card p-6 text-center lg:sticky lg:top-24 self-start">
        <svg viewBox="0 0 140 140" className="w-44 h-44 mx-auto" role="img" aria-label={`نمره ${r.n}`}>
          <circle cx="70" cy="70" r="52" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="13" />
          <circle cx="70" cy="70" r="52" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${(r.n / 100) * c} ${c}`} transform="rotate(-90 70 70)" style={{ transition: "all .5s cubic-bezier(.2,.8,.2,1)" }} />
          <text x="70" y="76" textAnchor="middle" fontSize="38" fontWeight="900" fill="currentColor">{r.n.toLocaleString("fa-IR")}</text>
        </svg>
        <div className="text-2xl font-black" style={{ color }}>{band(r.n)}</div>
        <p className="mt-2 text-sm muted leading-7">{advice(r.n, r.crit)}</p>
        <a href={brand.dm} target="_blank" rel="noopener noreferrer" className="btn btn-yellow w-full justify-center mt-5">کارشناسی دقیق در دایرکت</a>
        <p className="mt-3 text-[11px] muted">محاسبه‌ی تخمینی بر اساس مشاهده‌ی خودت است و جای کارشناسی را نمی‌گیرد.</p>
      </div>
    </div>
  );
}

const services = ["کارشناسی و بازدید", "خرید غیابی", "خدمات VIP", "مشاوره‌ی فروش"];
export function MessageTool() {
  const [f, setF] = useState({ name: "", car: "", city: "", service: services[0], note: "" });
  const [done, setDone] = useState(false);
  const text = `سلام${f.name ? `، من ${f.name}` : ""}.\nخدمت: ${f.service}\nخودرو: ${f.car || "—"}\nشهر: ${f.city || "—"}${f.note ? `\nتوضیح: ${f.note}` : ""}`;
  const inp = "w-full rounded-2xl bg-[var(--bg)] border border-[var(--line)] px-4 py-3 text-base";
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-5 space-y-3">
        <label className="block text-sm font-bold">نام<input className={inp + " mt-1"} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label className="block text-sm font-bold">خودرو (مدل و سال)<input className={inp + " mt-1"} value={f.car} onChange={(e) => setF({ ...f, car: e.target.value })} placeholder="مثلاً تالیسمان ۱۴۰۱" /></label>
        <label className="block text-sm font-bold">شهر<input className={inp + " mt-1"} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} /></label>
        <label className="block text-sm font-bold">خدمت<select className={inp + " mt-1"} value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })}>{services.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="block text-sm font-bold">توضیح (اختیاری)<textarea className={inp + " mt-1"} rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></label>
      </div>
      <div className="card p-5 flex flex-col">
        <div className="text-xs muted font-bold">پیش‌نمایش پیام دایرکت</div>
        <div className="mt-3 rounded-2xl rounded-br-sm bg-brand text-white p-4 text-sm leading-7 whitespace-pre-line">{text}</div>
        <div className="mt-auto pt-5 grid gap-3">
          <button onClick={async () => { try { await navigator.clipboard.writeText(text); } catch {} setDone(true); setTimeout(() => setDone(false), 2000); }} className="btn btn-ghost !text-[var(--fg)] !border-[var(--line)] justify-center">{done ? "کپی شد ✓" : "کپی متن"}</button>
          <a href={brand.dm} target="_blank" rel="noopener noreferrer" onClick={() => { try { navigator.clipboard.writeText(text); } catch {} }} className="btn btn-yellow justify-center">کپی و باز کردن دایرکت</a>
        </div>
      </div>
    </div>
  );
}

const guide = [
  { t: "پیش از بازدید", i: ["شماره‌ی شاسی و موتور را با کارت مقایسه کن", "سوابق بیمه و خلافی را بخواه", "ساعت بازدید را روز و نور کافی بگذار"] },
  { t: "بدنه و رنگ", i: ["اختلاف رنگ و فاصله‌ی ناهمگون درزها", "لکه‌ی زنگ زیر پرده‌ها و کف", "ضخامت رنگ در صورت امکان"] },
  { t: "موتور و گیربکس", i: ["استارت سرد را ببین", "رنگ و بوی روغن، نشتی", "تعویض دنده در تست جاده"] },
  { t: "مدارک", i: ["مطابقت نام و پلاک", "سند و کارت", "عدم توقیف"] },
];
export function Guide() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const total = guide.reduce((n, g) => n + g.i.length, 0), done = Object.values(on).filter(Boolean).length;
  return (
    <div>
      <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden"><div className="h-full bg-gradient-to-l from-brand to-yellow transition-all" style={{ width: `${(done / total) * 100}%` }} /></div>
      <p className="mt-2 text-sm muted">{done.toLocaleString("fa-IR")} از {total.toLocaleString("fa-IR")} مورد انجام شد</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {guide.map((g) => (
          <div key={g.t} className="card p-5"><b>{g.t}</b>
            <ul className="mt-3 space-y-1">{g.i.map((x) => (
              <li key={x}><label className="flex items-start gap-3 py-2 cursor-pointer text-sm leading-6"><input type="checkbox" checked={!!on[x]} onChange={(e) => setOn({ ...on, [x]: e.target.checked })} className="mt-1 w-5 h-5 accent-[#d63b22]" /><span className={on[x] ? "line-through muted" : ""}>{x}</span></label></li>
            ))}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
