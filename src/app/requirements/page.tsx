import type { Metadata } from "next";
import groups from "@/data/requirements.json";
import nf from "@/data/nonfunctional.json";
import Filter from "./Filter";

export const metadata: Metadata = { title: "نیازمندی‌ها", description: "فهرست کامل نیازمندی‌های سامانه‌ی خودروگرافی با اولویت و پلن." };

export default function Requirements() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12">
      <h1 className="text-3xl font-black">نیازمندی‌های سامانه‌ی خودروگرافی</h1>
      <p className="mt-2 muted leading-7">اولویت: P0 ضروری · P1 مهم · P2 بعدی. ستون «پلن» کمترین پلنی است که شامل آن می‌شود.</p>
      <div className="mt-8"><Filter groups={groups} /></div>
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
  );
}
