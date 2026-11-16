import Link from "next/link";
import { brand } from "@/data/site";
import { IconInsta } from "./Icons";

const nav = [
  { href: "/#services", label: "خدمات" },
  { href: "/#process", label: "روند کار" },
  { href: "/#report", label: "گزارش نمونه" },
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
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
        <Link href="/" className="wordmark text-2xl shrink-0" aria-label={brand.name} dir="ltr">{brand.latin}</Link>
        <nav aria-label="منوی اصلی" className="flex gap-1 overflow-x-auto text-sm whitespace-nowrap [scrollbar-width:none]">
          {[...nav, ...docs].map((n) => (
            <a key={n.href} href={n.href} className="px-3 py-2 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition">{n.label}</a>
          ))}
        </nav>
        <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-yellow !py-2 !px-4 text-sm mr-auto hidden md:inline-flex"><IconInsta />پیام بده</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-night text-white/70 mt-24 overflow-hidden">
      <div className="sunburst-soft h-2" />
      <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 sm:grid-cols-3 text-sm">
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
          <ul className="mt-3 space-y-2">{docs.map((n) => <li key={n.href}><a href={n.href} className="hover:text-yellow">{n.label}</a></li>)}</ul>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className="mt-4 inline-flex items-center gap-2 hover:text-yellow"><IconInsta />{brand.handle}</a>
        </div>
      </div>
    </footer>
  );
}
