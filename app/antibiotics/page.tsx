"use client"

import { useState } from "react"
import Link from "next/link"
import { antibiotics } from "@/data/antibiotics"

const categoryGradients: Record<string, string> = {
  "ペニシリン系": "from-blue-500 to-blue-600",
  "第1世代セフェム系": "from-cyan-500 to-cyan-600",
  "第3世代セフェム系": "from-teal-500 to-teal-600",
  "第4世代セフェム系": "from-emerald-500 to-emerald-600",
  "カルバペネム系": "from-red-500 to-red-600",
  "グリコペプチド系": "from-purple-500 to-purple-600",
  "アミノグリコシド系": "from-amber-500 to-amber-600",
  "フルオロキノロン系": "from-orange-500 to-orange-600",
  "マクロライド系": "from-pink-500 to-pink-600",
  "テトラサイクリン系": "from-lime-500 to-lime-600",
  "ニトロイミダゾール系": "from-indigo-500 to-indigo-600",
  "オキサゾリジノン系": "from-violet-500 to-violet-600",
  "リポペプチド系": "from-fuchsia-500 to-fuchsia-600",
  "葉酸代謝阻害薬": "from-rose-500 to-rose-600",
  "キャンディン系": "from-sky-500 to-sky-600",
  "アゾール系": "from-cyan-600 to-blue-600",
  "リンコマイシン系": "from-slate-500 to-slate-600",
  "マクロサイクリック系": "from-green-500 to-green-600",
  "ポリミキシン系": "from-stone-500 to-stone-600",
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
      <h1 className="text-3xl font-bold text-slate-900 mb-2">抗菌薬一覧</h1>
      <p className="text-sm text-slate-400 mb-6">{antibiotics.length}種の抗菌薬・抗真菌薬</p>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="抗菌薬名・系統名・特徴で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur border border-slate-200 rounded-2xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all placeholder:text-slate-400"
        />
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1 h-5 rounded-full bg-gradient-to-b ${categoryGradients[cat] || "from-gray-400 to-gray-500"}`} />
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{cat}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered
              .filter((ab) => ab.category === cat)
              .map((ab) => (
                <Link
                  key={ab.id}
                  href={`/antibiotic/${ab.id}`}
                  className="group block p-4 bg-white/70 backdrop-blur rounded-xl border border-slate-200/60 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{ab.name}</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      ab.route === "IV" ? "bg-blue-100 text-blue-700" :
                      ab.route === "PO" ? "bg-green-100 text-green-700" :
                      "bg-purple-100 text-purple-700"
                    }`}>{ab.route}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-1.5">{ab.genericName}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{ab.description}</div>
                  <div className="text-[10px] text-slate-400 mt-2 font-mono">
                    {ab.dosing.standard.dose} {ab.dosing.standard.interval}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
