"use client";
import { useEffect, useRef, useState } from "react";
import { brand, faqs, services } from "@/data/site";

type Msg = { from: "bot" | "me"; text: string; cta?: boolean };
type Slots = { car?: string; city?: string; service?: string };

const fa = (s: string) => s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[يى]/g, "ی").replace(/ك/g, "ک");
const has = (t: string, ...w: string[]) => w.some((x) => t.includes(x));
const chips = ["می‌خواهم خودرو را کارشناسی کنم", "خرید غیابی", "نمره چطور محاسبه می‌شود؟", "تعرفه چقدر است؟"];

export function summary(s: Slots) {
  return `سلام، درخواست دارم.\nخدمت: ${s.service || "—"}\nخودرو: ${s.car || "—"}\nشهر: ${s.city || "—"}`;
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: `سلام 👋 من دستیار هوشمند ${brand.name} هستم. درباره‌ی کارشناسی، خرید غیابی یا نمره‌ی خودرو بپرس. (پاسخ‌ها آزمایشی و قاعده‌محورند؛ ایجنت اصلی در اینستاگرام کار می‌کند.)` }]);
  const [slots, setSlots] = useState<Slots>({});
  const [step, setStep] = useState<"" | "car" | "city" | "service">("");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [msgs, typing, open]);
  useEffect(() => { document.body.style.overflow = open && matchMedia("(max-width:767px)").matches ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const say = (text: string, cta = false) => { setTyping(true); setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { from: "bot", text, cta }]); }, 650); };

  const reply = (raw: string) => {
    const t = fa(raw);
    if (step === "car") { const n = { ...slots, car: raw }; setSlots(n); setStep("city"); return say("در کدام شهر است؟"); }
    if (step === "city") { const n = { ...slots, city: raw }; setSlots(n); setStep("service"); return say("کدام خدمت را می‌خواهی؟ (کارشناسی / خرید غیابی / VIP / فروش)"); }
    if (step === "service") {
      const sv = has(t, "غیابی") ? "خرید غیابی" : has(t, "vip", "VIP", "وی") ? "خدمات VIP" : has(t, "فروش") ? "مشاوره‌ی فروش" : "کارشناسی و بازدید";
      const n = { ...slots, service: sv }; setSlots(n); setStep("");
      return say(`عالی! خلاصه‌ی درخواستت آماده شد:\n\n${summary(n)}\n\nدکمه‌ی زیر متن را کپی می‌کند و دایرکت اینستاگرام را باز می‌کند؛ فقط ارسال را بزن.`, true);
    }
    if (has(t, "کارشناسی", "بازدید", "ثبت", "وقت", "درخواست")) { setStep("car"); return say("خوشحال می‌شوم. اول بگو خودرو چیست؟ (مدل و سال)"); }
    if (has(t, "غیابی")) return say("در خرید غیابی کارشناس ما به‌جای تو بازدید می‌کند و گزارش مصور با نمره می‌دهد. اگر خواستی بنویس «ثبت درخواست».");
    if (has(t, "نمره", "امتیاز", "محاسبه")) return say("چک‌لیست ۸ بخش دارد (موتور ۲۵٪، بدنه ۲۰٪، گیربکس ۱۵٪ و…). سالم کامل، نیمه‌سالم نصف و معیوب صفر؛ ایراد حیاتی نمره را به ۵۹ محدود می‌کند. در صفحه‌ی «ابزارها» خودت هم محاسبه کن.");
    if (has(t, "تعرفه", "قیمت", "هزینه", "چند")) return say(faqs[3].a);
    if (has(t, "vip", "VIP", "وی")) return say(services[2].text);
    if (has(t, "فروش")) return say(services[3].text);
    if (has(t, "اینستا", "دایرکت", "پیج")) return say("ایجنت خودروگرافی در دایرکت اینستاگرام پاسخ می‌دهد و پرونده‌ی تو را می‌سازد. دکمه‌ی «دایرکت» را بزن.", true);
    if (has(t, "سلام", "درود")) return say("سلام! چطور کمکت کنم؟");
    return say("این را مطمئن نیستم؛ همکارم در دایرکت اینستاگرام دقیق پاسخ می‌دهد.", true);
  };

  const send = (text: string) => { const v = text.trim(); if (!v) return; setMsgs((m) => [...m, { from: "me", text: v }]); setInput(""); reply(v); };
  const toDm = async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} window.open(brand.dm, "_blank", "noopener"); };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="دستیار هوشمند" className={`fixed z-[55] left-4 bottom-24 md:bottom-6 press grid place-items-center w-14 h-14 rounded-full bg-brand text-white shadow-[0_12px_30px_-8px_rgba(214,59,34,.8)] ${open ? "scale-0" : ""} transition-transform`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 11h.01M12 11h.01M15 11h.01"/></svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon animate-ping opacity-70" />
      </button>
      {open && (
        <div role="dialog" aria-label="دستیار هوشمند" className="fixed inset-0 z-[70] md:inset-auto md:left-6 md:bottom-6 md:w-[24rem] md:h-[34rem] flex flex-col bg-[var(--card)] md:rounded-3xl md:border border-[var(--line)] shadow-2xl overflow-hidden" style={{ animation: "up .35s both cubic-bezier(.2,.8,.2,1)" }}>
          <div className="sunburst-soft text-white px-4 pt-[max(.75rem,env(safe-area-inset-top))] pb-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/30 grid place-items-center wordmark text-sm" dir="ltr">kg</div>
            <div><b>دستیار {brand.name}</b><div className="text-xs text-white/85 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neon" />آنلاین · نسخه‌ی آزمایشی</div></div>
            <button onClick={() => setOpen(false)} aria-label="بستن" className="mr-auto w-10 h-10 rounded-full bg-black/25 text-xl press">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-bar" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-start" : "justify-end"}`} style={{ animation: "up .3s both" }}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-7 whitespace-pre-line ${m.from === "me" ? "bg-brand text-white rounded-br-sm" : "bg-[var(--bg)] border border-[var(--line)] rounded-bl-sm"}`}>
                  {m.text}
                  {m.cta && <button onClick={() => toDm(m.text.includes("خلاصه") ? summary(slots) : "سلام، می‌خواهم درباره‌ی خدمات خودروگرافی بپرسم.")} className="btn btn-yellow !py-2 !px-4 !text-sm mt-3 w-full justify-center">ارسال در دایرکت اینستاگرام</button>}
                </div>
              </div>
            ))}
            {typing && <div className="flex justify-end"><div className="rounded-2xl bg-[var(--bg)] border border-[var(--line)] px-4 py-3 flex gap-1">{[0, 1, 2].map((k) => <span key={k} className="w-2 h-2 rounded-full bg-brand animate-bounce" style={{ animationDelay: `${k * 0.15}s` }} />)}</div></div>}
            <div ref={end} />
          </div>
          {msgs.length < 3 && <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-bar">{chips.map((c) => <button key={c} onClick={() => send(c)} className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold press">{c}</button>)}</div>}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] border-t border-[var(--line)] flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="پیامت را بنویس…" aria-label="پیام" className="flex-1 min-w-0 rounded-full bg-[var(--bg)] border border-[var(--line)] px-4 py-3 text-base" />
            <button className="btn btn-yellow !px-5 !py-3" aria-label="ارسال">ارسال</button>
          </form>
        </div>
      )}
    </>
  );
}
