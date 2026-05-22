"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { infections } from "@/data/infections"
import { DrugRegimen } from "@/types"
import { BacteriaIcon, ArrowUpIcon, ArrowDownIcon, StopIcon, RouteIcon } from "@/components/icons"

function DrugCard({ r }: { r: DrugRegimen }) {
  return (
    <Link
      href={`/antibiotic/${r.antibioticId}`}
      className="block p-3.5 rounded-xl active:scale-[0.98] transition-transform"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-white text-sm">{r.antibioticName}</div>
        <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0 bg-blue-500/15 text-blue-400 font-medium">{r.referenceTag}</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="font-mono font-bold text-white text-sm">{r.regimen.dose}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold inline-flex items-center gap-0.5 ${
          r.regimen.route === "IV" ? "bg-blue-500/20 text-blue-400" :
          r.regimen.route === "PO" ? "bg-green-500/20 text-green-400" :
          "bg-purple-500/20 text-purple-400"
        }`}><RouteIcon route={r.regimen.route} className="w-3 h-3" />{r.regimen.route}</span>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{r.regimen.interval}</span>
      </div>
      {r.regimen.duration && <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{r.regimen.duration}</div>}
      {r.regimen.note && <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{r.regimen.note}</div>}
    </Link>
  )
}

function Section({ title, accent, icon, children }: { title: string; accent: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const colors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    blue: { bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.15)", text: "#60a5fa", dot: "#3b82f6" },
    red: { bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.15)", text: "#f87171", dot: "#ef4444" },
    green: { bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.15)", text: "#4ade80", dot: "#22c55e" },
    amber: { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.15)", text: "#fbbf24", dot: "#f59e0b" },
    slate: { bg: "transparent", border: "var(--border)", text: "var(--text-primary)", dot: "var(--text-muted)" },
  }
  const c = colors[accent] || colors.slate
  return (
    <section className="mb-5 rounded-2xl p-4" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <div className="flex items-center gap-2 mb-3">
        {icon || <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />}
        <h2 className="text-sm font-bold" style={{ color: c.text }}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function InfectionDetail() {
  const params = useParams()
  const infection = infections.find((inf) => inf.id === params.id)

  if (!infection) {
    return <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>感染症が見つかりません</div>
  }

  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-1 text-sm mb-4 active:opacity-70" style={{ color: "var(--text-muted)" }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        戻る
      </Link>

      <h1 className="text-2xl font-bold text-white mb-0.5">{infection.name}</h1>
      <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>{infection.nameEn}</p>

      {/* 想定菌 */}
      <Section title="想定菌" accent="slate" icon={<BacteriaIcon className="w-4 h-4" />}>
        <div className="flex flex-wrap gap-1.5">
          {infection.commonPathogens.map((p, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-lg italic font-medium" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>{p}</span>
          ))}
        </div>
      </Section>

      {/* Empiric Therapy */}
      <Section title="Empiric Therapy" accent="blue">
        {infection.empiricTherapy.firstLine.length > 0 && (
          <>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>第一選択</div>
            <div className="space-y-1.5 mb-3">
              {infection.empiricTherapy.firstLine.map((r, i) => <DrugCard key={i} r={r} />)}
            </div>
          </>
        )}
        {infection.empiricTherapy.alternatives.length > 0 && (
          <>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>代替</div>
            <div className="space-y-1.5">
              {infection.empiricTherapy.alternatives.map((r, i) => <DrugCard key={i} r={r} />)}
            </div>
          </>
        )}
      </Section>

      {/* Escalation */}
      <Section title="Escalation" accent="red" icon={<ArrowUpIcon className="w-4 h-4 text-red-400" />}>
        <div className="space-y-1.5 mb-3">
          {infection.escalation.criteria.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="text-red-400 mt-0.5">!</span> {c}
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {infection.escalation.options.map((r, i) => <DrugCard key={i} r={r} />)}
        </div>
      </Section>

      {/* De-escalation */}
      <Section title="De-escalation" accent="green" icon={<ArrowDownIcon className="w-4 h-4 text-green-400" />}>
        <div className="space-y-1.5 mb-3">
          {infection.deescalation.criteria.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="text-green-400 mt-0.5">↓</span> {c}
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {infection.deescalation.options.map((r, i) => <DrugCard key={i} r={r} />)}
        </div>
      </Section>

      {/* 中止基準 */}
      <Section title="中止基準" accent="amber" icon={<StopIcon className="w-4 h-4 text-amber-400" />}>
        <div className="space-y-1.5 mb-3">
          {infection.discontinuation.criteria.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="text-amber-400 mt-0.5">✓</span> {c}
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-200 mb-0.5">標準治療期間</div>
          <div className="text-base font-bold text-white">{infection.discontinuation.typicalDuration}</div>
        </div>
      </Section>

      {/* Notes */}
      {infection.notes && infection.notes.length > 0 && (
        <Section title="臨床メモ" accent="amber">
          <div className="space-y-1.5">
            {infection.notes.map((n, i) => (
              <div key={i} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="text-amber-400 mr-1.5">→</span>{n}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* References */}
      <section className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>参考文献</div>
        <div className="space-y-2">
          {infection.references.map((ref, i) => (
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
