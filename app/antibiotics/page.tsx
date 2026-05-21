"use client"

import { useState } from "react"
import Link from "next/link"
import { antibiotics } from "@/data/antibiotics"

export default function AntibioticsPage() {
  const [query, setQuery] = useState("")
  const q = query.toLowerCase()

  const filtered = antibiotics.filter(
    (ab) =>
      ab.name.toLowerCase().includes(q) ||
      ab.genericName.toLowerCase().includes(q) ||
      ab.category.toLowerCase().includes(q)
  )

  const categories = [...new Set(filtered.map((ab) => ab.category))]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">抗菌薬一覧</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="抗菌薬名・系統名で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filtered
              .filter((ab) => ab.category === cat)
              .map((ab) => (
                <Link
                  key={ab.id}
                  href={`/antibiotic/${ab.id}`}
                  className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition"
                >
                  <div className="font-medium text-blue-700">{ab.name}</div>
                  <div className="text-xs text-gray-500">{ab.genericName}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {ab.route} / {ab.dosing.standard.dose} {ab.dosing.standard.interval}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
