"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = { id: string; text: string; priority: string; plan: string };
type Group = { title: string; rows: Row[] };

const tone: Record<string, string> = { P0: "bg-primary text-primary-foreground", P1: "bg-accent text-accent-foreground", P2: "bg-emerald-600 text-white" };
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
      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup type="single" value={p} onValueChange={(v) => v && setP(v)} aria-label="فیلتر اولویت" variant="outline" className="flex-wrap">
          {["all", "P0", "P1", "P2"].map((k) => (
            <ToggleGroupItem key={k} value={k} className="rounded-full h-10 px-4 font-bold data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">{k === "all" ? "همه" : `${k} · ${label[k]}`}</ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جست‌وجو در نیازمندی‌ها…" aria-label="جست‌وجو" className="h-10 rounded-full sm:mr-auto sm:w-64 text-base" />
      </div>
      <p className="mt-3 text-sm muted" aria-live="polite">{count.toLocaleString("fa-IR")} از {total.toLocaleString("fa-IR")} نیازمندی</p>
      {shown.length === 0 && <Card className="mt-6 p-8 text-center muted">موردی پیدا نشد.</Card>}
      {shown.map((g) => (
        <section key={g.title} className="mt-8">
          <h2 className="text-xl font-black">{g.title}</h2>
          <Card className="mt-3 rounded-3xl py-0 overflow-hidden gap-0">
            <Table>
              <TableHeader><TableRow><TableHead className="w-20 text-start">شناسه</TableHead><TableHead className="text-start">نیازمندی</TableHead><TableHead className="w-32 text-start">اولویت</TableHead><TableHead className="w-44 text-start">پلن</TableHead></TableRow></TableHeader>
              <TableBody>
                {g.rows.map((r) => (
                  <TableRow key={r.id} className="align-top">
                    <TableCell className="font-mono text-xs" dir="ltr">{r.id}</TableCell>
                    <TableCell className="whitespace-normal leading-7">{r.text}</TableCell>
                    <TableCell><Badge className={`rounded-full ${tone[r.priority]}`}>{r.priority} · {label[r.priority]}</Badge></TableCell>
                    <TableCell className="whitespace-normal">{r.plan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      ))}
    </div>
  );
}
