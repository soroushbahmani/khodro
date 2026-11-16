"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brand, checklist } from "@/data/site";
const copy = async (t: string, msg = "متن کپی شد") => { try { await navigator.clipboard.writeText(t); toast.success(msg); } catch { toast.error("کپی نشد؛ متن را دستی انتخاب کن."); } };
const yellow = "rounded-full h-12 text-base font-extrabold bg-accent text-accent-foreground hover:bg-accent/90";

type St = "ok" | "warn" | "bad";
const label: Record<St, string> = { ok: "سالم", warn: "نیمه", bad: "معیوب" };
const tone: Record<St, string> = { ok: "data-[state=on]:bg-emerald-600 data-[state=on]:text-white", warn: "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground", bad: "data-[state=on]:bg-crimson data-[state=on]:text-white" };
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
      <Card className="rounded-3xl py-0 gap-0 overflow-hidden"><ul className="divide-y">
        {checklist.map((it) => (
          <li key={it.name} className="p-4 flex flex-wrap items-center gap-3">
            <div className="min-w-32"><b>{it.name}</b><div className="text-xs muted">وزن {it.weight.toLocaleString("fa-IR")}٪{critical.includes(it.name) ? " · حیاتی" : ""}</div></div>
            <ToggleGroup type="single" value={s[it.name]} onValueChange={(v) => { if (v) { setS({ ...s, [it.name]: v as St }); try { navigator.vibrate?.(6); } catch {} } }} aria-label={it.name} className="mr-auto">
              {(["ok", "warn", "bad"] as St[]).map((k) => (
                <ToggleGroupItem key={k} value={k} className={`rounded-full px-4 h-10 font-bold ${tone[k]}`}>{label[k]}</ToggleGroupItem>
              ))}
            </ToggleGroup>
          </li>
        ))}
      </ul></Card>
      <Card className="p-6 text-center lg:sticky lg:top-24 self-start rounded-3xl gap-0">
        <svg viewBox="0 0 140 140" className="w-44 h-44 mx-auto" role="img" aria-label={`نمره ${r.n}`}>
          <circle cx="70" cy="70" r="52" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="13" />
          <circle cx="70" cy="70" r="52" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${(r.n / 100) * c} ${c}`} transform="rotate(-90 70 70)" style={{ transition: "all .5s cubic-bezier(.2,.8,.2,1)" }} />
          <text x="70" y="76" textAnchor="middle" fontSize="38" fontWeight="900" fill="currentColor">{r.n.toLocaleString("fa-IR")}</text>
        </svg>
        <div className="text-2xl font-black" style={{ color }}>{band(r.n)}</div>
        <p className="mt-2 text-sm muted leading-7">{advice(r.n, r.crit)}</p>
        <Button asChild className={`${yellow} w-full mt-5`}><a href={brand.dm} target="_blank" rel="noopener noreferrer">کارشناسی دقیق در دایرکت</a></Button>
        <p className="mt-3 text-[11px] muted">محاسبه‌ی تخمینی بر اساس مشاهده‌ی خودت است و جای کارشناسی را نمی‌گیرد.</p>
      </Card>
    </div>
  );
}

const services = ["کارشناسی و بازدید", "خرید غیابی", "خدمات VIP", "مشاوره‌ی فروش"];
export function MessageTool() {
  const [f, setF] = useState({ name: "", car: "", city: "", service: services[0], note: "" });
    const text = `سلام${f.name ? `، من ${f.name}` : ""}.\nخدمت: ${f.service}\nخودرو: ${f.car || "—"}\nشهر: ${f.city || "—"}${f.note ? `\nتوضیح: ${f.note}` : ""}`;
  const inp = "h-12 rounded-2xl text-base md:text-base";
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5 gap-4 rounded-3xl">
        <div className="grid gap-2"><Label htmlFor="n">نام</Label><Input id="n" className={inp} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="c">خودرو (مدل و سال)</Label><Input id="c" className={inp} value={f.car} onChange={(e) => setF({ ...f, car: e.target.value })} placeholder="مثلاً تالیسمان ۱۴۰۱" /></div>
        <div className="grid gap-2"><Label htmlFor="ct">شهر</Label><Input id="ct" className={inp} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} /></div>
        <div className="grid gap-2"><Label>خدمت</Label>
          <Select value={f.service} onValueChange={(v) => setF({ ...f, service: v })} dir="rtl"><SelectTrigger className="h-12 w-full rounded-2xl"><SelectValue /></SelectTrigger><SelectContent>{services.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></div>
        <div className="grid gap-2"><Label htmlFor="nt">توضیح (اختیاری)</Label><Textarea id="nt" rows={2} className="rounded-2xl text-base" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></div>
      </Card>
      <Card className="p-5 gap-0 rounded-3xl">
        <div className="text-xs muted font-bold">پیش‌نمایش پیام دایرکت</div>
        <div className="mt-3 rounded-2xl rounded-br-sm bg-primary text-primary-foreground p-4 text-sm leading-7 whitespace-pre-line">{text}</div>
        <div className="mt-auto pt-5 grid gap-3">
          <Button variant="outline" className="rounded-full h-12 text-base font-bold" onClick={() => copy(text)}>کپی متن</Button>
          <Button asChild className={yellow}><a href={brand.dm} target="_blank" rel="noopener noreferrer" onClick={() => copy(text, "کپی شد؛ در دایرکت پیست کن")}>کپی و باز کردن دایرکت</a></Button>
        </div>
      </Card>
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
      <Progress value={(done / total) * 100} className="h-2 [&_[data-slot=progress-indicator]]:bg-gradient-to-l [&_[data-slot=progress-indicator]]:from-brand [&_[data-slot=progress-indicator]]:to-yellow" aria-label="پیشرفت چک‌لیست" />
      <p className="mt-2 text-sm muted">{done.toLocaleString("fa-IR")} از {total.toLocaleString("fa-IR")} مورد انجام شد</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {guide.map((g) => (
          <Card key={g.t} className="p-5 gap-0 rounded-3xl"><b>{g.t}</b>
            <ul className="mt-3 space-y-1">{g.i.map((x) => (
              <li key={x}><label className="flex items-start gap-3 py-2 cursor-pointer text-sm leading-6"><Checkbox checked={!!on[x]} onCheckedChange={(v) => setOn({ ...on, [x]: v === true })} className="mt-1 size-5" /><span className={on[x] ? "line-through muted" : ""}>{x}</span></label></li>
            ))}</ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
