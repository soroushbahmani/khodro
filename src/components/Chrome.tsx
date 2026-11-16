import Link from "next/link";
import { brand } from "@/data/site";
import { IconInsta } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/#services", label: "خدمات" },
  { href: "/#process", label: "روند کار" },
  { href: "/#report", label: "گزارش نمونه" },
  { href: "/tools/", label: "ابزارها" },
  { href: "/#instagram", label: "اینستاگرام" },
  { href: "/requirements/", label: "نیازمندی‌ها" },
];
const docs = [
  { href: "/prd/", label: "PRD و رقبا" },
  { href: "/demo/", label: "دمو" },
  { href: "/wireframe/", label: "وایرفریم" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-night/80 backdrop-blur-xl text-white border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 md:h-16 flex items-center gap-6">
        <Link href="/" className="wordmark text-2xl shrink-0" aria-label={brand.name} dir="ltr">{brand.latin}</Link>
        <nav aria-label="منوی اصلی" className="hidden md:flex gap-1 overflow-x-auto text-sm whitespace-nowrap [scrollbar-width:none] min-w-0">
          {[...nav, ...docs].map((n) => (
            <Button key={n.href} asChild variant="ghost" size="sm" className="rounded-full text-white/75 hover:text-white hover:bg-white/10 h-9 px-3 text-sm"><a href={n.href}>{n.label}</a></Button>
          ))}
        </nav>
        <div className="mr-auto flex items-center gap-1"><ThemeToggle className="text-white" /><Button asChild className="rounded-full h-9 px-4 font-extrabold bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap"><a href={brand.instagram} target="_blank" rel="noopener noreferrer"><IconInsta />پیام بده</a></Button></div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-night text-white/70 mt-24 overflow-hidden">
      <div className="sunburst-soft h-2" />
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-6 grid gap-10 sm:grid-cols-3 text-sm">
        <div>
          <div className="wordmark text-4xl" dir="ltr">{brand.latin}</div>
          <p className="mt-3 leading-7">{brand.name} — {brand.tagline}.<br />{brand.description}</p>
        </div>
        <div>
          <b className="text-white">سایت</b>
          <ul className="mt-3 space-y-2">{nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-yellow">{n.label}</a></li>)}</ul>
        </div>
        <div>
          <b className="text-white">سند پروژه</b>
          <ul className="mt-3 space-y-2"><li><a href="/credits/" className="hover:text-yellow">منبع تصاویر</a></li>{docs.map((n) => <li key={n.href}><a href={n.href} className="hover:text-yellow">{n.label}</a></li>)}</ul>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className="mt-4 inline-flex items-center gap-2 hover:text-yellow"><IconInsta />{brand.handle}</a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10"><Separator className="bg-white/10" /><p className="mt-5 text-xs text-white/50 flex flex-wrap gap-x-4 gap-y-1">© ۱۴۰۵ خودروگرافی · نسخه‌ی آزمایشی<a href="/credits/" className="hover:text-yellow">منبع تصاویر</a><a href="/kit/" className="hover:text-yellow">کیت رابط</a></p></div>
    </footer>
  );
}
