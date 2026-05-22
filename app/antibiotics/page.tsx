"use client"

import { useState } from "react"
import Link from "next/link"
import { antibiotics } from "@/data/antibiotics"
import { RouteIcon } from "@/components/icons"

const catColors: Record<string, string> = {
  "ペニシリン系": "#3b82f6",
  "第1世代セフェム系": "#06b6d4",
  "第3世代セフェム系": "#14b8a6",
  "第4世代セフェム系": "#10b981",
  "カルバペネム系": "#ef4444",
  "グリコペプチド系": "#a855f7",
  "アミノグリコシド系": "#f59e0b",
  "フルオロキノロン系": "#f97316",
  "マクロライド系": "#ec4899",
  "テトラサイクリン系": "#84cc16",
  "ニトロイミダゾール系": "#6366f1",
  "オキサゾリジノン系": "#8b5cf6",
  "リポペプチド系": "#d946ef",
  "葉酸代謝阻害薬": "#f43f5e",
  "キャンディン系": "#0ea5e9",
  "アゾール系": "#0891b2",
  "リンコマイシン系": "#64748b",
  "マクロサイクリック系": "#22c55e",
  "ポリミキシン系": "#78716c",
}

export default function AntibioticsPage() {
  const [query, setQuery] = useState("")
  const q = query.toLowerCase()

  const filtered = antibiotics.filter(
    (ab) =>
      ab.name.toLowerCase().includes(q) ||
      ab.genericName.toLowerCase().includes(q) ||
      ab.category.toLowerCase().includes(q) ||
      ab.description.toLowerCase().includes(q)
  )

  const categories = [...new Set(filtered.map((ab) => ab.category))]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">抗菌薬一覧</h1>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{antibiotics.length}種</p>

      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="w-5 h-5" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="薬名・系統・特徴で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 rounded-full" style={{ background: catColors[cat] || "#6b7280" }} />
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{cat}</div>
          </div>
          <div className="space-y-1.5">
            {filtered
              .filter((ab) => ab.category === cat)
              .map((ab) => (
                <Link
                  key={ab.id}
                  href={`/antibiotic/${ab.id}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl active:scale-[0.98] transition-transform"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 inline-flex items-center gap-0.5 ${
                    ab.route === "IV" ? "bg-blue-500/20 text-blue-400" :
                    ab.route === "PO" ? "bg-green-500/20 text-green-400" :
                    "bg-purple-500/20 text-purple-400"
                  }`}><RouteIcon route={ab.route} className="w-3 h-3" />{ab.route}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{ab.name}</div>
                    <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{ab.genericName}</div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>{ab.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono text-xs text-white">{ab.dosing.standard.dose}</div>
                    <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{ab.dosing.standard.interval}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
