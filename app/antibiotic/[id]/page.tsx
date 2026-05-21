"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { antibiotics } from "@/data/antibiotics"
import { infections } from "@/data/infections"

function eGFRColor(value: number) {
  if (value >= 60) return "text-emerald-600"
  if (value >= 30) return "text-amber-600"
  return "text-red-600"
}

function eGFRBg(value: number) {
  if (value >= 60) return "bg-emerald-500"
  if (value >= 30) return "bg-amber-500"
  return "bg-red-500"
}

export default function AntibioticDetail() {
  const params = useParams()
  const ab = antibiotics.find((a) => a.id === params.id)
  const [egfr, setEgfr] = useState(90)

  if (!ab) {
    return <div className="text-center py-12 text-slate-400">抗菌薬が見つかりません</div>
  }

  const renalDosing = ab.dosing.renalAdjustment.find((rd) => {
    if (rd.gfrMin === -1) return false
    return egfr >= rd.gfrMin && egfr <= rd.gfrMax
  })
  const hdDosing = ab.dosing.renalAdjustment.find((rd) => rd.gfrMin === -1)

  const relatedInfections = infections.filter((inf) => {
    const allRegimens = [
      ...inf.empiricTherapy.firstLine,
      ...inf.empiricTherapy.alternatives,
      ...inf.escalation.options,
      ...inf.deescalation.options,
    ]
    return allRegimens.some((r) => r.antibioticId === ab.id)
  })

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/antibiotics" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        抗菌薬一覧に戻る
      </Link>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{ab.name}</h1>
          <p className="text-sm text-slate-400">{ab.genericName}</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 ${
          ab.route === "IV" ? "bg-blue-100 text-blue-700" :
          ab.route === "PO" ? "bg-green-100 text-green-700" :
          "bg-purple-100 text-purple-700"
        }`}>{ab.route}</span>
      </div>

      {/* Description */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 mb-8 text-white">
        <div className="text-sm leading-relaxed">{ab.description}</div>
        <div className="mt-2 text-xs text-slate-400">{ab.category}</div>
      </div>

      {/* スペクトラム */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300">抗菌スペクトラム</h2>
        <div className="flex flex-wrap gap-2">
          {ab.spectrum.map((s, i) => (
            <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1.5 rounded-lg text-sm italic font-medium">{s}</span>
          ))}
        </div>
      </section>

      {/* 標準投与量 */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300">標準投与量</h2>
        <div className="bg-white/80 backdrop-blur border border-slate-200/60 rounded-xl p-5">
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {ab.dosing.standard.dose}
          </div>
          <div className="text-sm text-slate-600 mt-1">
            {ab.dosing.standard.route} {ab.dosing.standard.interval}
          </div>
          {ab.dosing.standard.duration && (
            <div className="text-sm text-slate-500 mt-1">期間: {ab.dosing.standard.duration}</div>
          )}
          {ab.dosing.standard.note && (
            <div className="text-xs text-slate-400 mt-2 bg-slate-50 rounded-lg p-2">{ab.dosing.standard.note}</div>
          )}
        </div>
      </section>

      {/* 腎機能別投与量 */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b-2 border-blue-300">腎機能別投与量</h2>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 mb-4 text-white">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm text-slate-400">eGFR</span>
            <span className={`text-4xl font-bold font-mono ${
              egfr >= 60 ? "text-emerald-400" : egfr >= 30 ? "text-amber-400" : "text-red-400"
            }`}>{egfr}</span>
            <span className="text-sm text-slate-400">mL/min/1.73m²</span>
          </div>

          <input
            type="range"
            min="0"
            max="120"
            value={egfr}
            onChange={(e) => setEgfr(Number(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${eGFRBg(egfr)}`}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0</span><span>15</span><span>30</span><span>60</span><span>90</span><span>120</span>
          </div>

          {renalDosing && (
            <div className="mt-4 bg-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-1">推奨用量 (eGFR {renalDosing.gfrRange})</div>
              <div className="text-xl font-bold font-mono">{renalDosing.dose}</div>
              <div className="text-sm text-slate-300">{renalDosing.interval}</div>
            </div>
          )}
        </div>

        {/* Renal table */}
        <div className="overflow-hidden rounded-xl border border-slate-200/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">eGFR</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">用量</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">投与間隔</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ab.dosing.renalAdjustment.map((rd, i) => {
                const isActive = renalDosing && rd.gfrRange === renalDosing.gfrRange
                return (
                  <tr key={i} className={`transition-colors ${isActive ? "bg-blue-50 font-semibold" : "bg-white hover:bg-slate-50"}`}>
                    <td className="px-4 py-2.5 text-slate-700">{rd.gfrRange}</td>
                    <td className="px-4 py-2.5 text-slate-900 font-mono">{rd.dose}</td>
                    <td className="px-4 py-2.5 text-slate-700">{rd.interval}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {hdDosing && (
          <div className="mt-3 flex items-center gap-2 bg-slate-100 rounded-xl p-3 text-sm">
            <span className="bg-slate-600 text-white text-xs font-bold px-2 py-0.5 rounded">HD</span>
            <span className="text-slate-700 font-mono font-semibold">{hdDosing.dose}</span>
            <span className="text-slate-500">{hdDosing.interval}</span>
          </div>
        )}
      </section>

      {/* モニタリング */}
      {ab.monitoring && ab.monitoring.length > 0 && (
        <section className="mb-8 bg-amber-50/50 rounded-2xl p-5 border border-amber-100/60">
          <h2 className="text-base font-bold text-amber-700 mb-3 pb-2 border-b-2 border-amber-300">モニタリング・注意事項</h2>
          <ul className="space-y-1.5">
            {ab.monitoring.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z" /></svg>
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 副作用 */}
      {ab.sideEffects && ab.sideEffects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-red-700 mb-3 pb-2 border-b-2 border-red-300">主な副作用</h2>
          <div className="flex flex-wrap gap-2">
            {ab.sideEffects.map((se, i) => (
              <span key={i} className="bg-red-50 text-red-700 border border-red-200/60 px-3 py-1.5 rounded-lg text-sm font-medium">{se}</span>
            ))}
          </div>
        </section>
      )}

      {/* 関連感染症 */}
      {relatedInfections.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300">関連感染症</h2>
          <div className="flex flex-wrap gap-2">
            {relatedInfections.map((inf) => (
              <Link
                key={inf.id}
                href={`/infection/${inf.id}`}
                className="bg-white/70 border border-slate-200/60 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                {inf.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300">参考文献</h2>
        <div className="space-y-2">
          {ab.references.map((ref, i) => (
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
