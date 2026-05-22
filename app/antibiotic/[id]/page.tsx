"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { antibiotics } from "@/data/antibiotics"
import { infections } from "@/data/infections"
import { RouteIcon, ShieldIcon } from "@/components/icons"

export default function AntibioticDetail() {
  const params = useParams()
  const ab = antibiotics.find((a) => a.id === params.id)
  const [egfr, setEgfr] = useState(90)

  if (!ab) {
    return <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>抗菌薬が見つかりません</div>
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

  const egfrColor = egfr >= 60 ? "#4ade80" : egfr >= 30 ? "#fbbf24" : "#f87171"
  const egfrBg = egfr >= 60 ? "rgba(34,197,94,0.15)" : egfr >= 30 ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)"

  return (
    <div>
      <Link href="/antibiotics" className="inline-flex items-center gap-1 text-sm mb-4 active:opacity-70" style={{ color: "var(--text-muted)" }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        戻る
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">{ab.name}</h1>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{ab.genericName}</div>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 inline-flex items-center gap-1 ${
          ab.route === "IV" ? "bg-blue-500/20 text-blue-400" :
          ab.route === "PO" ? "bg-green-500/20 text-green-400" :
          "bg-purple-500/20 text-purple-400"
        }`}><RouteIcon route={ab.route} className="w-3.5 h-3.5" />{ab.route}</span>
      </div>

      {/* Description card */}
      <div className="rounded-xl p-3.5 mb-5" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))", border: "1px solid rgba(59,130,246,0.2)" }}>
        <div className="text-sm text-white leading-relaxed">{ab.description}</div>
        <div className="text-[10px] mt-1.5" style={{ color: "var(--text-muted)" }}>{ab.category}</div>
      </div>

      {/* Spectrum */}
      <section className="mb-5">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}><ShieldIcon className="w-4 h-4" />スペクトラム</div>
        <div className="flex flex-wrap gap-1.5">
          {ab.spectrum.map((s, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-lg italic font-medium bg-green-500/10 text-green-400" style={{ border: "1px solid rgba(34,197,94,0.15)" }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Standard dosing */}
      <section className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>標準投与量</div>
        <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="text-xl font-bold font-mono text-white">{ab.dosing.standard.dose}</div>
          <div className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>{ab.dosing.standard.route} {ab.dosing.standard.interval}</div>
          {ab.dosing.standard.duration && <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{ab.dosing.standard.duration}</div>}
          {ab.dosing.standard.note && <div className="text-xs mt-1.5 rounded-lg p-2" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>{ab.dosing.standard.note}</div>}
        </div>
      </section>

      {/* Renal dosing */}
      <section className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>腎機能別投与量</div>

        {/* eGFR slider */}
        <div className="rounded-2xl p-4 mb-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>eGFR</span>
            <span className="text-3xl font-bold font-mono" style={{ color: egfrColor }}>{egfr}</span>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>mL/min/1.73m²</span>
          </div>

          <input
            type="range"
            min="0"
            max="120"
            value={egfr}
            onChange={(e) => setEgfr(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            <span>0</span><span>15</span><span>30</span><span>60</span><span>90</span><span>120</span>
          </div>

          {renalDosing && (
            <div className="mt-3 rounded-xl p-3" style={{ background: egfrBg }}>
              <div className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>eGFR {renalDosing.gfrRange}</div>
              <div className="text-lg font-bold font-mono text-white">{renalDosing.dose}</div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{renalDosing.interval}</div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {ab.dosing.renalAdjustment.map((rd, i) => {
            const isActive = renalDosing && rd.gfrRange === renalDosing.gfrRange
            return (
              <div
                key={i}
                className="flex items-center px-3.5 py-2.5 text-sm"
                style={{
                  background: isActive ? "rgba(59,130,246,0.1)" : "var(--bg-card)",
                  borderBottom: i < ab.dosing.renalAdjustment.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span className="w-16 text-xs font-medium shrink-0" style={{ color: isActive ? "#60a5fa" : "var(--text-muted)" }}>{rd.gfrRange}</span>
                <span className="flex-1 font-mono font-semibold text-white text-sm">{rd.dose}</span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{rd.interval}</span>
              </div>
            )
          })}
        </div>

        {hdDosing && (
          <div className="mt-2 flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">HD</span>
            <span className="font-mono font-semibold text-white text-sm">{hdDosing.dose}</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{hdDosing.interval}</span>
          </div>
        )}
      </section>

      {/* Monitoring */}
      {ab.monitoring && ab.monitoring.length > 0 && (
        <section className="mb-5 rounded-2xl p-4" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div className="text-sm font-bold text-amber-400">モニタリング</div>
          </div>
          <div className="space-y-1.5">
            {ab.monitoring.map((m, i) => (
              <div key={i} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="text-amber-400 mr-1.5">!</span>{m}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Side effects */}
      {ab.sideEffects && ab.sideEffects.length > 0 && (
        <section className="mb-5">
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>副作用</div>
          <div className="flex flex-wrap gap-1.5">
            {ab.sideEffects.map((se, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-lg font-medium bg-red-500/10 text-red-400" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>{se}</span>
            ))}
          </div>
        </section>
      )}

      {/* Related infections */}
      {relatedInfections.length > 0 && (
        <section className="mb-5">
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>関連感染症</div>
          <div className="flex flex-wrap gap-1.5">
            {relatedInfections.map((inf) => (
              <Link
                key={inf.id}
                href={`/infection/${inf.id}`}
                className="text-xs px-3 py-1.5 rounded-lg font-medium text-blue-400 active:opacity-70 transition"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                {inf.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      <section className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>参考文献</div>
        <div className="space-y-2">
          {ab.references.map((ref, i) => (
            <div key={ref.id} className="flex items-start gap-2.5 text-xs">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>{i + 1}</span>
              <div>
                <span style={{ color: "var(--text-secondary)" }}>{ref.title}</span>
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>{ref.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
