import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import groups from "@/data/requirements.json";
import nf from "@/data/nonfunctional.json";
import Filter from "./Filter";

export const metadata: Metadata = pageMeta("نیازمندی‌ها", "فهرست کامل نیازمندی‌های سامانه‌ی خودروگرافی با اولویت و پلن: ایجنت اینستاگرام، پنل‌ها، چک‌لیست، حسابداری و سایت.", "/requirements/");

export default function Requirements() {
  return (
    <>
    <section className="sunburst grain relative text-white">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
        <span className="inline-block rounded-full bg-black/30 px-4 py-1 text-sm font-bold">سند نیازمندی‌ها</span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-black">نیازمندی‌های سامانه‌ی <span className="grad-text">خودروگرافی</span></h1>
        <p className="mt-3 max-w-2xl text-white/90 leading-8">اولویت: P0 ضروری · P1 مهم · P2 بعدی. ستون «پلن» کمترین پلنی است که شامل آن می‌شود.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
          {groups.map((g) => (<span key={g.title} className="rounded-full bg-white/15 backdrop-blur px-4 py-1.5">{g.title} · {g.rows.length.toLocaleString("fa-IR")}</span>))}
        </div>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <div><Filter groups={groups} /></div>
      <section className="mt-12">
        <h2 className="text-xl font-black">نیازمندی‌های غیرکارکردی</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {nf.map((n) => (
            <div key={n.title} className="card p-4"><dt className="font-bold">{n.title}</dt><dd className="mt-1 text-sm muted leading-7">{n.text}</dd></div>
          ))}
        </dl>
      </section>
      <p className="mt-10 text-sm"><a href="/prd/" className="text-brand font-bold">← سند کامل PRD</a></p>
    </div>
    </>
  );
}
