import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import credits from "@/data/credits.json";

export const metadata: Metadata = pageMeta("منبع تصاویر", "منبع و مجوز تصاویر نمونه‌ی سایت خودروگرافی.", "/credits/");

export default function Credits() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <h1 className="text-3xl font-black">منبع تصاویر</h1>
      <p className="mt-2 muted leading-8">تصاویر این نسخه‌ی آزمایشی نمونه‌ی آزاد از ویکی‌مدیا کامنز هستند و بعداً با عکس‌های خودروگرافی جایگزین می‌شوند.</p>
      <ul className="mt-8 space-y-3">
        {Object.entries(credits).map(([k, c]) => (
          <li key={k} className="card p-4 text-sm leading-7" dir="ltr">
            <b>{c.file}</b> — {c.author} — {c.license}<br />
            <a className="text-brand" href={c.page} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
