"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { infections } from "@/data/infections"
import { DrugRegimen } from "@/types"

function RegimenCard({ r, accent = "blue" }: { r: DrugRegimen; accent?: string }) {
  return (
    <div className="bg-white/80 backdrop-blur border border-slate-200/60 rounded-xl p-4 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/antibiotic/${r.antibioticId}`} className="font-bold text-slate-800 hover:text-blue-700 transition-colors">
          {r.antibioticName}
        </Link>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
          accent === "red" ? "bg-red-100 text-red-700" :
          accent === "green" ? "bg-emerald-100 text-emerald-700" :
          "bg-blue-100 text-blue-700"
        }`}>
          {r.referenceTag}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="font-mono font-semibold text-slate-900">{r.regimen.dose}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
          r.regimen.route === "IV" ? "bg-blue-100 text-blue-700" :
          r.regimen.route === "PO" ? "bg-green-100 text-green-700" :
          "bg-purple-100 text-purple-700"
        }`}>{r.regimen.route}</span>
        <span className="text-slate-600">{r.regimen.interval}</span>
      </div>
      {r.regimen.duration && <div className="text-xs text-slate-500 mt-1">{r.regimen.duration}</div>}
      {r.regimen.note && <div className="text-xs text-slate-400 mt-1 leading-relaxed">{r.regimen.note}</div>}
    </div>
  )
}

function RegimenSection({ regimens, title, accent = "blue" }: { regimens: DrugRegimen[]; title: string; accent?: string }) {
  if (regimens.length === 0) return null
  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{title}</h4>
      <div className="space-y-2">
        {regimens.map((r, i) => <RegimenCard key={i} r={r} accent={accent} />)}
      </div>
    </div>
  )
}

function SectionHeader({ children, color = "slate" }: { children: React.ReactNode; color?: string }) {
  const borderColors: Record<string, string> = {
    slate: "border-slate-300",
    red: "border-red-300",
    green: "border-emerald-300",
    blue: "border-blue-300",
    amber: "border-amber-300",
  }
  const textColors: Record<string, string> = {
    slate: "text-slate-800",
    red: "text-red-700",
    green: "text-emerald-700",
    blue: "text-blue-700",
    amber: "text-amber-700",
  }
  return (
    <h2 className={`text-base font-bold ${textColors[color]} mb-3 pb-2 border-b-2 ${borderColors[color]}`}>
      {children}
    </h2>
  )
}

export default function InfectionDetail() {
  const params = useParams()
  const infection = infections.find((inf) => inf.id === params.id)

  if (!infection) {
    return <div className="text-center py-12 text-slate-400">感染症が見つかりません</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        一覧に戻る
      </Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-1">{infection.name}</h1>
      <p className="text-sm text-slate-400 mb-8">{infection.nameEn}</p>

      {/* 想定菌 */}
      <section className="mb-8">
        <SectionHeader>想定菌</SectionHeader>
        <div className="flex flex-wrap gap-2">
          {infection.commonPathogens.map((p, i) => (
            <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm italic font-medium">{p}</span>
          ))}
        </div>
      </section>

      {/* Empiric Therapy */}
      <section className="mb-8 bg-blue-50/50 rounded-2xl p-5 border border-blue-100/60">
        <SectionHeader color="blue">Empiric Therapy</SectionHeader>
        <RegimenSection regimens={infection.empiricTherapy.firstLine} title="第一選択" accent="blue" />
        <RegimenSection regimens={infection.empiricTherapy.alternatives} title="代替" accent="blue" />
      </section>

      {/* Escalation */}
      <section className="mb-8 bg-red-50/50 rounded-2xl p-5 border border-red-100/60">
        <SectionHeader color="red">Escalation</SectionHeader>
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">基準</h4>
          <ul className="space-y-1.5">
            {infection.escalation.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z" /></svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <RegimenSection regimens={infection.escalation.options} title="選択肢" accent="red" />
      </section>

      {/* De-escalation */}
      <section className="mb-8 bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/60">
        <SectionHeader color="green">De-escalation</SectionHeader>
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">基準</h4>
          <ul className="space-y-1.5">
            {infection.deescalation.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" /></svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <RegimenSection regimens={infection.deescalation.options} title="選択肢" accent="green" />
      </section>

      {/* 中止基準 */}
      <section className="mb-8">
        <SectionHeader color="amber">中止基準・治療期間</SectionHeader>
        <ul className="space-y-1.5 mb-4">
          {infection.discontinuation.criteria.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              {c}
            </li>
          ))}
        </ul>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white">
          <div className="text-xs font-medium text-blue-200 uppercase tracking-wider mb-1">標準治療期間</div>
          <div className="text-lg font-bold">{infection.discontinuation.typicalDuration}</div>
        </div>
      </section>

      {/* Notes */}
      {infection.notes && infection.notes.length > 0 && (
        <section className="mb-8 bg-amber-50/50 rounded-2xl p-5 border border-amber-100/60">
          <SectionHeader color="amber">臨床メモ</SectionHeader>
          <ul className="space-y-1.5">
            {infection.notes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* References */}
      <section className="mb-8">
        <SectionHeader>参考文献</SectionHeader>
        <div className="space-y-2">
          {infection.references.map((ref, i) => (
            <div key={ref.id} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">{i + 1}</span>
              <div>
                <span className="text-slate-700">{ref.title}</span>
                <span className="ml-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{ref.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
