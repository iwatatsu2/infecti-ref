"use client"

import { useState } from "react"
import Link from "next/link"
import { infections } from "@/data/infections"
import { antibiotics } from "@/data/antibiotics"

const categoryColors: Record<string, string> = {
  "呼吸器": "bg-blue-100 text-blue-800",
  "尿路": "bg-yellow-100 text-yellow-800",
  "皮膚・軟部組織": "bg-orange-100 text-orange-800",
  "腹腔内": "bg-green-100 text-green-800",
  "血流": "bg-red-100 text-red-800",
  "心血管": "bg-pink-100 text-pink-800",
  "中枢神経": "bg-purple-100 text-purple-800",
  "骨・関節": "bg-teal-100 text-teal-800",
  "消化管": "bg-amber-100 text-amber-800",
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
      <div className="mb-6">
        <input
          type="text"
          placeholder="感染症名・菌名・抗菌薬名で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredAntibiotics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">抗菌薬</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredAntibiotics.map((ab) => (
              <Link
                key={ab.id}
                href={`/antibiotic/${ab.id}`}
                className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition"
              >
                <div className="font-medium text-blue-700">{ab.name}</div>
                <div className="text-xs text-gray-500">{ab.genericName}</div>
                <div className="text-xs text-gray-400 mt-1">{ab.category} / {ab.route}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredInfections
              .filter((inf) => inf.category === cat)
              .map((inf) => (
                <Link
                  key={inf.id}
                  href={`/infection/${inf.id}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[inf.category] || "bg-gray-100 text-gray-800"}`}>
                      {inf.category}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-900">{inf.name}</div>
                  <div className="text-xs text-gray-500">{inf.nameEn}</div>
                  <div className="text-xs text-gray-400 mt-2 line-clamp-1">
                    想定菌: {inf.commonPathogens.slice(0, 3).join(", ")}...
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
