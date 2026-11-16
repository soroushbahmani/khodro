import ig from "@/data/instagram.json";
import { brand, services, steps, scoreBands, checklist, faqs } from "@/data/site";

function Gauge({ value }: { value: number }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" className="w-44 h-44" role="img" aria-label={`نمره ${value} از ۱۰۰`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--line)" strokeWidth="14" />
      <circle cx="70" cy="70" r={r} fill="none" stroke="#d63b22" strokeWidth="14" strokeLinecap="round"
        strokeDasharray={`${(value / 100) * c} ${c}`} transform="rotate(-90 70 70)" />
      <text x="70" y="76" textAnchor="middle" fontSize="34" fontWeight="800" fill="currentColor">{value.toLocaleString("fa-IR")}</text>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <section className="sunburst text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="wordmark text-5xl sm:text-7xl" dir="ltr">{brand.latin}</div>
          <h1 className="mt-6 text-3xl sm:text-5xl font-black leading-tight max-w-2xl">{brand.tagline}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">{brand.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-yellow text-ink font-bold px-6 py-3 hover:brightness-95">پیام در اینستاگرام</a>
            <a href="#report" className="rounded-full border border-white/70 px-6 py-3 font-bold hover:bg-white/10">گزارش نمونه</a>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 pt-16 scroll-mt-16">
        <h2 className="text-2xl font-black">خدمات</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.title} className="card p-5">
              <div className="text-3xl" aria-hidden>{s.icon}</div>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm muted leading-7">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-4 pt-16 scroll-mt-16">
        <h2 className="text-2xl font-black">روند کار</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card p-5">
              <span className="inline-grid place-items-center w-9 h-9 rounded-full bg-brand text-white font-black">{s.n}</span>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm muted leading-7">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="report" className="mx-auto max-w-6xl px-4 pt-16 scroll-mt-16">
        <h2 className="text-2xl font-black">گزارش نمونه</h2>
        <p className="mt-2 muted">داده‌ی نمونه برای نمایش؛ گزارش واقعی هر خودرو متفاوت است.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr]">
          <div className="card p-6 grid place-items-center text-center">
            <Gauge value={82} />
            <div className="mt-2 font-black text-lg">خوب</div>
            <ul className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
              {scoreBands.map((b) => (
                <li key={b.label} className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded-full ${b.tone}`} />{b.label} ({b.range})</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-bold">وزن بخش‌های چک‌لیست</h3>
            <ul className="mt-4 space-y-3">
              {checklist.map((c) => (
                <li key={c.name} className="grid grid-cols-[8rem_1fr_2.5rem] items-center gap-3 text-sm">
                  <span>{c.name}</span>
                  <span className="h-2.5 rounded-full bg-[var(--line)] overflow-hidden"><span className="block h-full bg-gradient-to-l from-brand to-yellow" style={{ width: `${c.weight * 4}%` }} /></span>
                  <span className="muted tabular-nums">{c.weight.toLocaleString("fa-IR")}٪</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs muted">اگر ایراد حیاتی ثبت شود، نمره‌ی کل بیشتر از ۵۹ نمی‌شود.</p>
          </div>
        </div>
      </section>

      <section id="instagram" className="mx-auto max-w-6xl px-4 pt-16 scroll-mt-16">
        <h2 className="text-2xl font-black">از اینستاگرام</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-[22rem_1fr]">
          <div className="card p-5">
            <div className="font-black text-lg">{ig.profile.displayName}</div>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-sm text-brand font-bold">@{ig.profile.handle}</a>
            <p className="mt-3 text-sm"><b>{ig.profile.followers}</b> دنبال‌کننده · <b>{ig.profile.following.toLocaleString("fa-IR")}</b> دنبال‌شونده</p>
            <ul className="mt-3 text-sm muted space-y-1 list-disc pr-5">{ig.profile.bio.map((b) => <li key={b}>{b}</li>)}</ul>
            <div className="mt-4 flex flex-wrap gap-2">{ig.profile.highlights.map((h) => <span key={h} className="rounded-full bg-brand-soft text-brand-dark px-3 py-1 text-xs font-bold">{h}</span>)}</div>
          </div>
          <div className="card p-5">
            <h3 className="font-bold">آخرین ریل‌ها</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
              {ig.reels.map((r) => (
                <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-[var(--line)] p-3 hover:border-brand">
                  <span className="muted text-xs">{new Date(r.date).toLocaleDateString("fa-IR")}</span><br />{r.title || "ریل"}</a></li>
              ))}
            </ul>
            <p className="mt-3 text-xs muted">{ig.note}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-2xl font-black">سؤال‌های رایج</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card p-4">
              <summary className="cursor-pointer font-bold">{f.q}</summary>
              <p className="mt-2 muted leading-7">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="card p-8 grid gap-4 sm:grid-cols-3 text-center">
          <a href="/requirements/" className="rounded-xl p-4 hover:bg-brand-soft hover:text-ink"><b>نیازمندی‌ها</b><br /><span className="text-sm muted">فهرست کامل با اولویت و پلن</span></a>
          <a href="/demo/" className="rounded-xl p-4 hover:bg-brand-soft hover:text-ink"><b>دموی کلیکی</b><br /><span className="text-sm muted">پنل مدیر، چت ایجنت، گزارش</span></a>
          <a href="/wireframe/" className="rounded-xl p-4 hover:bg-brand-soft hover:text-ink"><b>وایرفریم</b><br /><span className="text-sm muted">همه‌ی صفحه‌ها در یک نگاه</span></a>
        </div>
      </section>
    </>
  );
}
