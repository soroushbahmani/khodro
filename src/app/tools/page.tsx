import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ScoreTool, MessageTool, Guide } from "./Tools";

export const metadata: Metadata = pageMeta("ابزارهای هوشمند", "محاسبه‌ی نمره‌ی خودرو، ساخت پیام دایرکت و چک‌لیست بازدید پیش از خرید؛ همه‌چیز روی گوشی خودت اجرا می‌شود.", "/tools/");

export default function Tools() {
  return (
    <>
      <section className="sunburst grain relative text-white">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14">
          <span className="inline-block rounded-full bg-black/30 px-4 py-1 text-sm font-bold">ابزارها</span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black">ابزارهای <span className="grad-text">هوشمند</span> خودروگرافی</h1>
          <p className="mt-3 max-w-2xl text-white/90 leading-8">قبل از خرید خودت بسنج، پیامت را آماده کن و در دایرکت اینستاگرام بفرست. همه‌چیز روی گوشی خودت اجرا می‌شود و هیچ داده‌ای ارسال نمی‌شود.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 space-y-20 pt-14">
        <section id="score" className="scroll-mt-20"><span className="eyebrow">۱ · نمره‌ی خودرو</span><h2 className="mt-3 mb-6 text-2xl sm:text-3xl font-black">خودرویی که می‌خواهی بخری چند می‌شود؟</h2><ScoreTool /></section>
        <section id="dm" className="scroll-mt-20"><span className="eyebrow">۲ · پیام دایرکت</span><h2 className="mt-3 mb-6 text-2xl sm:text-3xl font-black">پیام را آماده کن، ایجنت اینستاگرام سریع‌تر پاسخ می‌دهد</h2><MessageTool /></section>
        <section id="guide" className="scroll-mt-20"><span className="eyebrow">۳ · راهنما</span><h2 className="mt-3 mb-6 text-2xl sm:text-3xl font-black">چک‌لیست بازدید پیش از خرید</h2><Guide /></section>
      </div>
    </>
  );
}
