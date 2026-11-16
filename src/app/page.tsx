import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ig from "@/data/instagram.json";
import { brand, services, steps, scoreBands, checklist, faqs, sampleReport, stats } from "@/data/site";
import { Counter, Tilt } from "@/components/Client";
import { IconSearch, IconPin, IconStar, IconCar, IconPlay, IconArrow, IconInsta } from "@/components/Icons";

const icons: Record<string, React.ReactNode> = { search: <IconSearch />, pin: <IconPin />, star: <IconStar />, car: <IconCar /> };
const photoFor = ["/photos/engine.jpg", "/photos/lot.jpg", "/photos/interior.jpg", "/photos/mustang.jpg"];
const dot: Record<string, string> = { ok: "bg-emerald-500", warn: "bg-yellow", bad: "bg-crimson" };
const stateLabel: Record<string, string> = { ok: "سالم", warn: "نیاز به توجه", bad: "معیوب" };

function Gauge({ value, size = 200 }: { value: number; size?: number }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} role="img" aria-label={`نمره ${value} از ۱۰۰`}>
      <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#f7ce46" /><stop offset="1" stopColor="#d63b22" /></linearGradient></defs>
      <circle cx="70" cy="70" r={r} fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="13" />
      <circle className="sweep" cx="70" cy="70" r={r} fill="none" stroke="url(#g)" strokeWidth="13" strokeLinecap="round"
        strokeDasharray={`${(value / 100) * c} ${c}`} transform="rotate(-90 70 70)" />
      <text x="70" y="74" textAnchor="middle" fontSize="38" fontWeight="900" fill="currentColor">{value.toLocaleString("fa-IR")}</text>
      <text x="70" y="94" textAnchor="middle" fontSize="10" fill="currentColor" opacity=".6">از ۱۰۰</text>
    </svg>
  );
}

function CarArt() {
  return (
    <svg viewBox="0 0 520 170" className="drive w-full" aria-hidden>
      <g stroke="#fff" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round"><path d="M10 70h70M0 95h60M20 120h50" /></g>
      <path d="M95 118c-14 0-20-4-20-14 0-12 8-18 24-22l48-12c12-14 26-26 44-30 30-8 66-8 96 0 22 6 40 20 56 34l44 10c14 3 24 12 24 26 0 6-4 8-10 8h-14" fill="#14161c" />
      <path d="M150 82l32-6c10-12 22-22 38-26 26-6 56-6 82 0 18 5 32 16 46 30l-28-2z" fill="#f7ce46" opacity=".9" />
      <path d="M120 118h250" stroke="#14161c" strokeWidth="6" />
      <g><circle cx="148" cy="120" r="26" fill="#0d1015" /><circle cx="148" cy="120" r="12" fill="#e6f23a" /><circle cx="388" cy="120" r="26" fill="#0d1015" /><circle cx="388" cy="120" r="12" fill="#e6f23a" /></g>
    </svg>
  );
}

const cta = "rounded-full h-12 px-7 text-base font-extrabold";
const yellow = "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_10px_30px_-10px_rgba(247,206,70,.7)]";
const ghostW = "border-white/70 bg-transparent text-white hover:bg-white/15 hover:text-white";
const Eyebrow = ({ children }: { children: React.ReactNode }) => (<Badge variant="secondary" className="rounded-full px-3 py-1 h-auto text-xs font-extrabold">{children}</Badge>);

export default function Home() {
  const r = sampleReport;
  return (
    <>
      {/* HERO */}
      <section className="sunburst grain relative text-white overflow-hidden">
        <img src="/photos/hero.jpg" alt="" aria-hidden className="kenburns absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity lg:opacity-40 [mask-image:linear-gradient(to_left,transparent,black_60%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-10 lg:pt-24 grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center [&>*]:min-w-0">
          <div>
            <span className="in1 inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur px-4 py-1.5 text-sm font-bold"><span className="w-2 h-2 rounded-full bg-neon animate-pulse" />متخصص آموزش خرید و فروش خودرو</span>
            <div className="in2 wordmark text-[2.7rem] leading-none sm:text-8xl mt-6" dir="ltr">{brand.latin}</div>
            <h1 className="in3 mt-4 text-3xl sm:text-5xl font-black leading-[1.25]">قبل از خرید، <span className="grad-text">خودرو را بخوان</span></h1>
            <p className="in3 mt-5 max-w-xl text-base sm:text-lg text-white/90 leading-8">{brand.description}</p>
            <div className="in4 mt-8 flex flex-wrap gap-3">
              <Button asChild className={`${cta} ${yellow}`}><a href={brand.instagram} target="_blank" rel="noopener noreferrer"><IconInsta />پیام در اینستاگرام</a></Button>
              <Button asChild variant="outline" className={`${cta} ${ghostW}`}><a href="#report">دیدن گزارش نمونه<IconArrow /></a></Button>
            </div>
          </div>
          <div className="relative">
            <Tilt className="in4"><div className="floaty card !bg-white/95 text-ink !border-white/40 p-5 shadow-2xl max-w-sm mx-auto backdrop-blur">
              <div className="flex items-center justify-between text-xs font-bold"><span>گزارش کارشناسی</span><span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5">{r.band}</span></div>
              <div className="grid place-items-center text-ink"><Gauge value={r.score} size={170} /></div>
              <ul className="mt-1 space-y-2 text-sm">
                {r.rows.slice(0, 4).map((x) => (<li key={x.name} className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${dot[x.state]}`} />{x.name}<span className="mr-auto text-xs text-gray-500">{stateLabel[x.state]}</span></li>))}
              </ul>
            </div></Tilt>
            <div className="mt-2 max-w-sm mx-auto"><CarArt /></div>
          </div>
        </div>
        {/* marquee */}
        <div className="relative bg-night text-yellow font-black text-lg py-3 mt-16 overflow-hidden" dir="ltr" aria-hidden>
          <div className="marquee">
            {[0, 1].map((k) => (<div key={k} className="flex shrink-0 gap-10 pr-10">{["کارشناسی خودرو", "خرید غیابی", "خدمات VIP", "گزارش ۰ تا ۱۰۰", "فروش خودرو", "ایجنت ۲۴ ساعته"].map((t) => (<span key={t} className="flex items-center gap-10">{t}<span className="text-brand">◆</span></span>))}</div>))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 -mt-0 pt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.l} className="reveal card p-6 text-center"><div className="text-3xl sm:text-4xl font-black text-brand">{s.n !== undefined ? <Counter to={s.n} suffix={s.suffix} /> : s.v}</div><div className="mt-1 text-sm muted">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-6xl px-4 pt-24 scroll-mt-20">
        <Eyebrow>خدمات</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black">هر چه برای یک خرید مطمئن لازم است</h2>
        <div className="mt-10 snap-row snap-cols-4 no-bar">
          {services.map((s, i) => (
            <Card key={s.title} className="reveal lift press overflow-hidden flex flex-col rounded-3xl py-0 gap-0">
              <div className="photo h-44"><img src={photoFor[i]} alt={s.title} loading="lazy" decoding="async" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-3 right-3 w-12 h-12 rounded-2xl bg-brand text-white grid place-items-center shadow-lg">{icons[s.icon]}</div></div>
              <div className="p-5">
                <h3 className="text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 muted">{s.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-6xl px-4 pt-24 scroll-mt-20">
        <Eyebrow>روند کار</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black">از اولین پیام تا گزارش، چهار قدم</h2>
        <ol className="relative mt-12 grid gap-8 lg:grid-cols-4">
          <div className="hidden lg:block absolute top-6 inset-x-12 h-0.5 bg-gradient-to-l from-brand via-yellow to-brand opacity-50" aria-hidden />
          {steps.map((s) => (
            <li key={s.n} className="reveal relative">
              <span className="relative z-10 grid place-items-center w-12 h-12 rounded-full sunburst-soft text-white text-xl font-black ring-8 ring-[var(--bg)]">{s.n}</span>
              <h3 className="mt-4 font-black text-lg">{s.title}</h3>
              <p className="mt-2 text-sm muted leading-7">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* REPORT */}
      <section id="report" className="mx-auto max-w-6xl px-4 pt-24 scroll-mt-20">
        <Eyebrow>گزارش نمونه</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black">گزارشی که می‌شود به آن اعتماد کرد</h2>
        <p className="mt-2 muted">داده‌ی نمونه برای نمایش؛ گزارش واقعی هر خودرو متفاوت است.</p>
        <div className="reveal mt-10 card overflow-hidden grid lg:grid-cols-[22rem_1fr]">
          <div className="sunburst-soft grain relative text-white p-8 grid place-items-center text-center">
            <div className="relative z-10">
              <div className="text-sm text-white/85">{r.car}</div>
              <div className="my-2 grid place-items-center text-white"><Gauge value={r.score} size={190} /></div>
              <div className="text-2xl font-black">{r.band}</div>
              <p className="mt-2 text-sm text-white/90 leading-7">{r.verdict}</p>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <ul className="divide-y divide-[var(--line)]">
              {r.rows.map((x) => (
                <li key={x.name} className="py-3 flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${dot[x.state]}`} />
                  <span className="font-bold w-36 shrink-0">{x.name}</span>
                  <span className="text-sm muted">{x.note}</span>
                  <span className="mr-auto text-xs font-bold muted hidden sm:inline">{stateLabel[x.state]}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-black">تصاویر ثبت‌شده در بازدید</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[["engine", "موتور"], ["interior", "کابین"], ["mustang", "داشبورد"]].map(([k, l]) => (<figure key={k} className="photo rounded-2xl aspect-square"><img src={`/photos/${k}.jpg`} alt={l} loading="lazy" decoding="async" /><figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 p-2 text-xs text-white font-bold">{l}</figcaption></figure>))}
            </div>
            <h3 className="mt-6 font-black">وزن هر بخش در نمره</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {checklist.map((c) => (
                <li key={c.name} className="grid grid-cols-[7.5rem_1fr_2.2rem] items-center gap-2 text-sm">
                  <span>{c.name}</span>
                  <Progress value={c.weight * 4} className="[&_[data-slot=progress-indicator]]:bg-gradient-to-l [&_[data-slot=progress-indicator]]:from-brand [&_[data-slot=progress-indicator]]:to-yellow" aria-label={c.name} />
                  <span className="muted text-xs">{c.weight.toLocaleString("fa-IR")}٪</span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-3 text-xs">
              {scoreBands.map((b) => (<li key={b.label} className="flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1"><span className={`w-2.5 h-2.5 rounded-full ${b.tone}`} />{b.label} · {b.range}</li>))}
            </ul>
            <p className="mt-4 text-xs muted">اگر ایراد حیاتی ثبت شود، نمره‌ی کل بیشتر از ۵۹ نمی‌شود.</p>
          </div>
        </div>
      </section>

      {/* INSTAGRAM AGENT */}
      <section id="agent" className="mx-auto max-w-6xl px-4 pt-24 scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <Eyebrow>ایجنت اینستاگرام</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black leading-snug">دایرکت بده؛ ایجنت همان لحظه جواب می‌دهد</h2>
            <p className="mt-4 muted leading-8">ایجنت هوشمند خودروگرافی در دایرکت اینستاگرام کار می‌کند: سؤال‌های رایج را پاسخ می‌دهد، اطلاعات خودرو و وقت را می‌گیرد، پرونده می‌سازد و اگر لازم شد گفتگو را به همکار انسانی می‌دهد.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["پاسخ شبانه‌روزی به سؤال‌های رایج", "گرفتن مشخصات خودرو، شهر و زمان بدون فرم طولانی", "ساخت خودکار پرونده و خلاصه‌ی دو خطی برای مدیر", "تحویل به انسان وقتی ایجنت نمی‌داند"].map((x) => (<li key={x} className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-brand text-white grid place-items-center text-xs">✓</span>{x}</li>))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className={`${cta} ${yellow}`}><a href={brand.dm} target="_blank" rel="noopener noreferrer"><IconInsta />شروع در دایرکت</a></Button>
              <Button asChild variant="outline" className={cta}><a href="/tools/#dm">ساخت پیام آماده</a></Button>
            </div>
          </div>
          <div className="reveal mx-auto w-full max-w-sm rounded-[2.2rem] border-[6px] border-night bg-[var(--card)] shadow-2xl overflow-hidden">
            <div className="bg-night text-white px-4 py-3 flex items-center gap-3"><div className="ring"><img src="/brand/avatar.jpg" alt="خودروگرافی" width="150" height="150" className="w-9 h-9 rounded-full object-cover" /></div><div><b className="text-sm">{ig.profile.handle}</b><div className="text-[11px] text-white/60">ایجنت هوشمند · آنلاین</div></div></div>
            <div className="p-4 space-y-3 min-h-80 bg-[var(--bg)] text-sm leading-7">
              {[{ me: true, t: "سلام، کارشناسی تالیسمان ۱۴۰۱ چقدر می‌شود؟" }, { t: "سلام 👋 تعرفه به نوع خودرو و محل بازدید بستگی دارد. شهر شما کجاست؟" }, { me: true, t: "اصفهان" }, { t: "عالی؛ کارشناس را برای اصفهان هماهنگ می‌کنم. چه روزی مناسب است؟" }, { me: true, t: "پنجشنبه صبح" }, { t: "ثبت شد ✅ پرونده‌ی شما ساخته شد و همکارمان تأیید نهایی را می‌فرستد." }].map((m, i) => (
                <div key={i} className={`flex ${m.me ? "justify-start" : "justify-end"}`} style={{ animation: `up .6s ${0.4 + i * 0.7}s both cubic-bezier(.2,.8,.2,1)` }}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 ${m.me ? "bg-brand text-white rounded-br-sm" : "bg-[var(--card)] border border-[var(--line)] rounded-bl-sm"}`}>{m.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[{ t: "ابزار نمره", d: "خودت نمره‌ی خودرو را تخمین بزن", h: "/tools/#score" }, { t: "چک‌لیست بازدید", d: "قبل از دیدن خودرو بخوان", h: "/tools/#guide" }, { t: "دستیار هوشمند", d: "دکمه‌ی چت پایین صفحه", h: "#agent" }].map((x) => (
            <a key={x.t} href={x.h} className="reveal card lift press p-5 flex items-center gap-3"><div><b>{x.t}</b><div className="text-sm muted">{x.d}</div></div><span className="mr-auto text-brand"><IconArrow /></span></a>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section id="instagram" className="mx-auto max-w-6xl px-4 pt-24 scroll-mt-20">
        <Eyebrow>اینستاگرام</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black">خودروگرافی در اینستاگرام</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[21rem_1fr]">
          <div className="reveal card p-6">
            <div className="flex items-center gap-4">
              <div className="ring"><Avatar className="size-16 border-2 border-card"><AvatarImage src="/brand/avatar.jpg" alt="خودروگرافی" /><AvatarFallback>KG</AvatarFallback></Avatar></div>
              <div><div className="font-black">{ig.profile.displayName}</div><a href={brand.instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-sm text-brand font-bold">@{ig.profile.handle}</a></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-brand-soft/60 dark:bg-white/5 p-3"><b className="text-xl">{ig.profile.followers}</b><div className="text-xs muted">دنبال‌کننده</div></div>
              <div className="rounded-2xl bg-brand-soft/60 dark:bg-white/5 p-3"><b className="text-xl">{ig.profile.following.toLocaleString("fa-IR")}</b><div className="text-xs muted">دنبال‌شونده</div></div>
            </div>
            <ul className="mt-5 text-sm muted space-y-1.5 leading-7">{ig.profile.bio.map((b) => <li key={b}>• {b}</li>)}</ul>
            <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
              {ig.profile.highlights.map((h) => (<div key={h} className="text-center shrink-0 w-16"><div className="ring mx-auto w-14 h-14"><div className="w-full h-full rounded-full bg-[var(--card)] grid place-items-center text-brand"><IconStar /></div></div><div className="text-[10px] mt-1 leading-4">{h}</div></div>))}
            </div>
            <Button asChild className={`${cta} ${yellow} w-full mt-6`}><a href={brand.instagram} target="_blank" rel="noopener noreferrer"><IconInsta />مشاهده‌ی پیج</a></Button>
          </div>
          <div>
            <Carousel opts={{ align: "start", direction: "rtl" }} className="px-0">
              <CarouselContent>
                {ig.reels.map((x, i) => (
                  <CarouselItem key={x.url} className="basis-[68%] sm:basis-1/3">
                    <a href={x.url} target="_blank" rel="noopener noreferrer" className="reveal lift press group relative aspect-[9/14] rounded-3xl overflow-hidden text-white bg-night border border-[var(--line)]">
                  <img src={["/photos/hero.jpg","/photos/engine.jpg","/photos/lot.jpg","/photos/interior.jpg","/photos/mustang.jpg","/photos/hero.jpg"][i % 6]} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-brand-dark/20 to-black/10" />
                  <span className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/25 backdrop-blur grid place-items-center group-hover:bg-yellow group-hover:text-ink transition"><IconPlay /></span>
                  <div className="absolute bottom-0 p-4 z-10"><div className="wordmark text-sm" dir="ltr">khodrography</div><div className="font-bold text-sm mt-1 leading-6">{x.title || "ریل خودروگرافی"}</div><div className="text-xs text-white/80 mt-1">{new Date(x.date).toLocaleDateString("fa-IR")}</div></div>
                </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
            <p className="mt-4 text-xs muted">{ig.note} تصاویر کارت‌ها نمونه‌ی آزمایشی‌اند.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pt-24">
        <div className="text-center"><Eyebrow>سؤال‌های رایج</Eyebrow><h2 className="mt-3 text-3xl sm:text-4xl font-black">هرچه می‌خواهی بدانی</h2></div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="reveal rounded-2xl border bg-card px-5 not-last:border-b">
              <AccordionTrigger className="py-5 text-base font-black hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base leading-8 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-24">
        <div className="reveal sunburst grain relative rounded-[2rem] overflow-hidden text-white text-center px-6 py-16">
          <img src="/photos/lot.jpg" alt="" aria-hidden loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-multiply" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black">قبل از پرداخت، نمره‌ی خودرو را ببین</h2>
            <p className="mt-4 text-white/90">در اینستاگرام پیام بده؛ ایجنت ما همین حالا پاسخ می‌دهد.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className={`${cta} ${yellow}`}><a href={brand.instagram} target="_blank" rel="noopener noreferrer"><IconInsta />شروع گفتگو</a></Button>
              <Button asChild variant="outline" className={`${cta} ${ghostW}`}><a href="/demo/">دموی سامانه</a></Button>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[{ h: "/requirements/", t: "نیازمندی‌ها", d: "فهرست کامل با اولویت و پلن" }, { h: "/prd/", t: "PRD و رقبا", d: "فلوچارت، معماری و مقایسه" }, { h: "/wireframe/", t: "وایرفریم", d: "همه‌ی صفحه‌ها در یک نگاه" }].map((x) => (
            <a key={x.h} href={x.h} className="reveal card lift p-5 flex items-center gap-3"><div><b>{x.t}</b><div className="text-sm muted">{x.d}</div></div><span className="mr-auto text-brand"><IconArrow /></span></a>
          ))}
        </div>
      </section>
    </>
  );
}
