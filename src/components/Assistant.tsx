"use client";
import { useEffect, useRef, useState } from "react";
import { brand, faqs, services } from "@/data/site";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

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
  const toDm = async (text: string) => { try { await navigator.clipboard.writeText(text); toast.success("متن کپی شد؛ در دایرکت پیست کن"); } catch {} window.open(brand.dm, "_blank", "noopener"); };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="دستیار هوشمند" className={`fixed z-[55] left-4 bottom-24 md:bottom-6 press grid place-items-center w-14 h-14 rounded-full bg-brand text-white shadow-[0_12px_30px_-8px_rgba(214,59,34,.8)] ${open ? "scale-0" : ""} transition-transform`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 11h.01M12 11h.01M15 11h.01"/></svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon animate-ping opacity-70" />
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" showCloseButton={false} className="h-[88dvh] md:h-[34rem] md:w-[24rem] md:inset-x-auto md:bottom-6 md:left-6 md:rounded-3xl md:border rounded-t-3xl gap-0 p-0 overflow-hidden">
          <SheetTitle className="sr-only">دستیار هوشمند خودروگرافی</SheetTitle>
          <SheetDescription className="sr-only">گفتگو با دستیار آزمایشی و ساخت پیام دایرکت</SheetDescription>
          <div className="sunburst-soft text-white px-4 pt-4 pb-3 flex items-center gap-3">
            <Avatar className="size-10 border-2 border-white/60"><AvatarImage src="/brand/avatar.jpg" alt="" /><AvatarFallback>KG</AvatarFallback></Avatar>
            <div><b>دستیار {brand.name}</b><div className="text-xs text-white/85 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neon" />آنلاین · نسخه‌ی آزمایشی</div></div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="بستن" className="mr-auto rounded-full bg-black/25 text-white hover:bg-black/40 hover:text-white text-xl">×</Button>
          </div>
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-4 space-y-3" aria-live="polite">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-start" : "justify-end"}`} style={{ animation: "up .3s both" }}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-7 whitespace-pre-line ${m.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted border rounded-bl-sm"}`}>
                    {m.text}
                    {m.cta && <Button onClick={() => toDm(m.text.includes("خلاصه") ? summary(slots) : "سلام، می‌خواهم درباره‌ی خدمات خودروگرافی بپرسم.")} className="mt-3 w-full rounded-full font-extrabold bg-accent text-accent-foreground hover:bg-accent/90">ارسال در دایرکت اینستاگرام</Button>}
                  </div>
                </div>
              ))}
              {typing && <div className="flex justify-end"><div className="rounded-2xl bg-muted border px-4 py-3 flex gap-1">{[0, 1, 2].map((k) => <span key={k} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${k * 0.15}s` }} />)}</div></div>}
              <div ref={end} />
            </div>
          </ScrollArea>
          {msgs.length < 3 && <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-bar">{chips.map((c) => <Button key={c} variant="outline" size="sm" onClick={() => send(c)} className="shrink-0 rounded-full text-xs font-bold h-8">{c}</Button>)}</div>}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] border-t flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="پیامت را بنویس…" aria-label="پیام" className="h-11 rounded-full text-base" />
            <Button type="submit" className="h-11 rounded-full px-5 font-extrabold bg-accent text-accent-foreground hover:bg-accent/90">ارسال</Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
