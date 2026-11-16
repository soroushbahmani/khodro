import Link from "next/link";
import { brand } from "@/data/site";

const nav = [
  { href: "/#services", label: "خدمات" },
  { href: "/#process", label: "روند کار" },
  { href: "/#report", label: "گزارش نمونه" },
  { href: "/requirements/", label: "نیازمندی‌ها" },
  { href: "/prd/", label: "PRD و رقبا" },
  { href: "/demo/", label: "دمو" },
  { href: "/wireframe/", label: "وایرفریم" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-night/95 backdrop-blur text-white border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-6">
        <Link href="/" className="wordmark text-xl" aria-label={brand.name}>{brand.latin}</Link>
        <nav aria-label="منوی اصلی" className="flex gap-4 overflow-x-auto text-sm whitespace-nowrap">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="py-2 text-white/80 hover:text-yellow">{n.label}</a>
          ))}
        </nav>
        <a href={brand.instagram} target="_blank" rel="noopener noreferrer"
           className="mr-auto hidden sm:inline-block rounded-full bg-brand px-4 py-1.5 text-sm font-bold hover:bg-brand-dark">اینستاگرام</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-white/70 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <div className="wordmark text-2xl">{brand.latin}</div>
          <p className="mt-2">{brand.name} — {brand.tagline}</p>
        </div>
        <div>
          <b className="text-white">صفحه‌ها</b>
          <ul className="mt-2 space-y-1">
            {nav.slice(3).map((n) => <li key={n.href}><a href={n.href} className="hover:text-yellow">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <b className="text-white">ارتباط</b>
          <p className="mt-2"><a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-yellow" dir="ltr">{brand.handle}</a></p>
        </div>
      </div>
    </footer>
  );
}
