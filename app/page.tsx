"use client"

import { useState } from "react"
import Link from "next/link"
import { infections } from "@/data/infections"
import { antibiotics } from "@/data/antibiotics"

const categoryIcons: Record<string, string> = {
  "呼吸器": "M12 6v6m0 0v6m0-6h6m-6 0H6",
  "尿路": "M19.5 12c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 0 1-3.7 3.7 48.678 48.678 0 0 1-7.324 0 4.006 4.006 0 0 1-3.7-3.7c-.017-.22-.032-.441-.046-.662",
  "皮膚・軟部組織": "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
}

const categoryGradients: Record<string, string> = {
  "呼吸器": "from-blue-500 to-cyan-500",
  "尿路": "from-amber-500 to-yellow-500",
  "皮膚・軟部組織": "from-orange-500 to-red-400",
  "腹腔内": "from-emerald-500 to-green-500",
  "血流": "from-red-500 to-rose-500",
  "心血管": "from-pink-500 to-fuchsia-500",
  "中枢神経": "from-violet-500 to-purple-500",
  "骨・関節": "from-teal-500 to-cyan-600",
  "消化管": "from-lime-500 to-green-400",
}

const categoryBg: Record<string, string> = {
  "呼吸器": "bg-blue-50 border-blue-200/60",
  "尿路": "bg-amber-50 border-amber-200/60",
  "皮膚・軟部組織": "bg-orange-50 border-orange-200/60",
  "腹腔内": "bg-emerald-50 border-emerald-200/60",
  "血流": "bg-red-50 border-red-200/60",
  "心血管": "bg-pink-50 border-pink-200/60",
  "中枢神経": "bg-violet-50 border-violet-200/60",
  "骨・関節": "bg-teal-50 border-teal-200/60",
  "消化管": "bg-lime-50 border-lime-200/60",
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
      {/* Hero search */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="感染症名・菌名・抗菌薬名で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur border border-slate-200 rounded-2xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Antibiotic results */}
      {filteredAntibiotics.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">抗菌薬</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredAntibiotics.map((ab) => (
              <Link
                key={ab.id}
                href={`/antibiotic/${ab.id}`}
                className="group block p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200/60 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100/50 transition-all"
              >
                <div className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{ab.name}</div>
                <div className="text-xs text-slate-500">{ab.genericName}</div>
                <div className="text-xs text-slate-400 mt-1">{ab.description}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Infection cards by category */}
      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1 h-5 rounded-full bg-gradient-to-b ${categoryGradients[cat] || "from-gray-400 to-gray-500"}`} />
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{cat}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredInfections
              .filter((inf) => inf.category === cat)
              .map((inf) => (
                <Link
                  key={inf.id}
                  href={`/infection/${inf.id}`}
                  className={`group block p-4 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 ${categoryBg[inf.category] || "bg-white border-slate-200"}`}
                >
                  <div className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{inf.name}</div>
                  <div className="text-xs text-slate-500 mb-2">{inf.nameEn}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {inf.commonPathogens.slice(0, 3).map((p, i) => (
                      <span key={i} className="text-[10px] bg-white/60 text-slate-600 px-2 py-0.5 rounded-full italic">{p}</span>
                    ))}
                    {inf.commonPathogens.length > 3 && (
                      <span className="text-[10px] bg-white/60 text-slate-400 px-2 py-0.5 rounded-full">+{inf.commonPathogens.length - 3}</span>
                    )}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
