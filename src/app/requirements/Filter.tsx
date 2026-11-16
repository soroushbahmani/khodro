"use client";
import { useMemo, useState } from "react";

type Row = { id: string; text: string; priority: string; plan: string };
type Group = { title: string; rows: Row[] };

const tone: Record<string, string> = { P0: "bg-brand text-white", P1: "bg-yellow text-ink", P2: "bg-emerald-600 text-white" };
const label: Record<string, string> = { P0: "ضروری", P1: "مهم", P2: "بعدی" };

export default function Filter({ groups }: { groups: Group[] }) {
  const [p, setP] = useState("all");
  const [q, setQ] = useState("");
  const total = groups.reduce((n, g) => n + g.rows.length, 0);
  const shown = useMemo(
    () => groups.map((g) => ({ ...g, rows: g.rows.filter((r) => (p === "all" || r.priority === p) && (!q || (r.id + r.text + r.plan).includes(q))) })).filter((g) => g.rows.length),
    [groups, p, q]
  );
  const count = shown.reduce((n, g) => n + g.rows.length, 0);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="فیلتر اولویت">
        {["all", "P0", "P1", "P2"].map((k) => (
          <button key={k} onClick={() => setP(k)} aria-pressed={p === k}
            className={`rounded-full px-4 py-1.5 text-sm font-bold border ${p === k ? "bg-brand text-white border-brand" : "card"}`}>
            {k === "all" ? "همه" : `${k} · ${label[k]}`}
          </button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جست‌وجو در نیازمندی‌ها…" aria-label="جست‌وجو"
          className="card px-4 py-1.5 text-sm mr-auto w-full sm:w-64" />
      </div>
      <p className="mt-3 text-sm muted" aria-live="polite">{count.toLocaleString("fa-IR")} از {total.toLocaleString("fa-IR")} نیازمندی</p>
      {shown.map((g) => (
        <section key={g.title} className="mt-8">
          <h2 className="text-xl font-black">{g.title}</h2>
          <div className="mt-3 card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-right muted border-b border-[var(--line)]"><th className="p-3 w-20">شناسه</th><th className="p-3">نیازمندی</th><th className="p-3 w-28">اولویت</th><th className="p-3 w-40">پلن</th></tr></thead>
              <tbody>
                {g.rows.map((r) => (
                  <tr key={r.id} className="border-b border-[var(--line)] last:border-0 align-top">
                    <td className="p-3 font-mono text-xs" dir="ltr">{r.id}</td>
                    <td className="p-3 leading-7">{r.text}</td>
                    <td className="p-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${tone[r.priority]}`}>{r.priority} · {label[r.priority]}</span></td>
                    <td className="p-3">{r.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
