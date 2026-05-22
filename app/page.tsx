"use client"

import { useState } from "react"
import Link from "next/link"
import { infections } from "@/data/infections"
import { antibiotics } from "@/data/antibiotics"
import { CategoryIcon, RouteIcon } from "@/components/icons"

const catAccent: Record<string, string> = {
  "呼吸器": "#3b82f6",
  "尿路": "#f59e0b",
  "皮膚・軟部組織": "#f97316",
  "腹腔内": "#22c55e",
  "血流": "#ef4444",
  "心血管": "#ec4899",
  "中枢神経": "#a855f7",
  "骨・関節": "#14b8a6",
  "消化管": "#84cc16",
}

export default function Home() {
  const [query, setQuery] = useState("")
  const q = query.toLowerCase()

  const filteredInfections = infections.filter(
    (inf) =>
      inf.name.toLowerCase().includes(q) ||
      inf.nameEn.toLowerCase().includes(q) ||
      inf.commonPathogens.some((p) => p.toLowerCase().includes(q)) ||
      inf.category.includes(q)
  )

  const filteredAntibiotics = query.length >= 2
    ? antibiotics.filter(
        (ab) =>
          ab.name.toLowerCase().includes(q) ||
          ab.genericName.toLowerCase().includes(q)
      )
    : []

  const categories = [...new Set(filteredInfections.map((inf) => inf.category))]

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="w-5 h-5" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="感染症・菌名・抗菌薬で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
      </div>

      {/* Antibiotic results */}
      {filteredAntibiotics.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>抗菌薬</div>
          <div className="space-y-1.5">
            {filteredAntibiotics.map((ab) => (
              <Link
                key={ab.id}
                href={`/antibiotic/${ab.id}`}
                className="flex items-center gap-3 p-3 rounded-xl active:scale-[0.98] transition-transform"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${
                  ab.route === "IV" ? "bg-blue-500/20 text-blue-400" :
                  ab.route === "PO" ? "bg-green-500/20 text-green-400" :
                  "bg-purple-500/20 text-purple-400"
                }`}><RouteIcon route={ab.route} className="w-3 h-3" />{ab.route}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{ab.name}</div>
                  <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{ab.description}</div>
                </div>
                <svg className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Infection cards by category */}
      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CategoryIcon category={cat} className="w-4 h-4" />
            <div className="w-1 h-4 rounded-full" style={{ background: catAccent[cat] || "#6b7280" }} />
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{cat}</div>
          </div>
          <div className="space-y-1.5">
            {filteredInfections
              .filter((inf) => inf.category === cat)
              .map((inf) => (
                <Link
                  key={inf.id}
                  href={`/infection/${inf.id}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl active:scale-[0.98] transition-transform"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white">{inf.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{inf.nameEn}</div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {inf.commonPathogens.slice(0, 2).map((p, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full italic" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>{p}</span>
                      ))}
                      {inf.commonPathogens.length > 2 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>+{inf.commonPathogens.length - 2}</span>
                      )}
                    </div>
                  </div>
                  <svg className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
