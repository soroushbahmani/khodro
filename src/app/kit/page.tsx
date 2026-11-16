import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import KitDemo from "./KitDemo";

export const metadata: Metadata = pageMeta("کیت رابط کاربری", "همه‌ی المان‌های رابط کاربری سایت خودروگرافی در یک صفحه: دکمه، فرم، جدول، آکاردئون، تب، نشان و…", "/kit/");

export default function Kit() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-12">
      <h1 className="text-3xl sm:text-4xl font-black">کیت رابط کاربری خودروگرافی</h1>
      <p className="mt-2 muted leading-8">همه‌ی المان‌های پایه (shadcn/ui با رنگ و فونت برند) در یک صفحه؛ مرجع طراحی برای پنل ادمین و صفحه‌های بعدی.</p>
      <KitDemo />
    </div>
  );
}
