"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { antibiotics } from "@/data/antibiotics"
import { infections } from "@/data/infections"

export default function AntibioticDetail() {
  const params = useParams()
  const ab = antibiotics.find((a) => a.id === params.id)
  const [egfr, setEgfr] = useState(90)

  if (!ab) {
    return <div className="text-center py-12 text-gray-500">抗菌薬が見つかりません</div>
  }

  // Find the matching renal dosing
  const renalDosing = ab.dosing.renalAdjustment.find((rd) => {
    if (rd.gfrMin === -1) return false // HD
    return egfr >= rd.gfrMin && egfr <= rd.gfrMax
  })
  const hdDosing = ab.dosing.renalAdjustment.find((rd) => rd.gfrMin === -1)

  // Related infections
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
    <div>
      <Link href="/antibiotics" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; 抗菌薬一覧に戻る</Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">{ab.name}</h1>
      <p className="text-sm text-gray-500 mb-1">{ab.genericName}</p>
      <div className="flex gap-2 mb-6">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{ab.category}</span>
        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">{ab.route}</span>
      </div>

      {/* スペクトラム */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">抗菌スペクトラム</h2>
        <div className="flex flex-wrap gap-2">
          {ab.spectrum.map((s, i) => (
            <span key={i} className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm italic">{s}</span>
          ))}
        </div>
      </section>

      {/* 標準投与量 */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">標準投与量</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-lg font-medium text-gray-900">
            {ab.dosing.standard.dose} {ab.dosing.standard.route} {ab.dosing.standard.interval}
          </div>
          {ab.dosing.standard.duration && (
            <div className="text-sm text-gray-500 mt-1">期間: {ab.dosing.standard.duration}</div>
          )}
          {ab.dosing.standard.note && (
            <div className="text-sm text-gray-500 mt-1">{ab.dosing.standard.note}</div>
          )}
        </div>
      </section>

      {/* 腎機能別投与量 */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">腎機能別投与量</h2>

        {/* eGFRスライダー */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <label className="block text-sm font-semibold text-blue-800 mb-2">
            eGFR: <span className="text-2xl">{egfr}</span> mL/min/1.73m²
          </label>
          <input
            type="range"
            min="0"
            max="120"
            value={egfr}
            onChange={(e) => setEgfr(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-blue-600 mt-1">
            <span>0</span><span>30</span><span>60</span><span>90</span><span>120</span>
          </div>

          {renalDosing && (
            <div className="mt-3 bg-white rounded-lg p-3 border border-blue-100">
              <div className="text-sm text-gray-600">eGFR {renalDosing.gfrRange} の用量:</div>
              <div className="text-lg font-bold text-gray-900">{renalDosing.dose} {renalDosing.interval}</div>
            </div>
          )}
        </div>

        {/* 全段階テーブル */}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-3 py-2 text-left">eGFR</th>
              <th className="border border-gray-200 px-3 py-2 text-left">用量</th>
              <th className="border border-gray-200 px-3 py-2 text-left">投与間隔</th>
            </tr>
          </thead>
          <tbody>
            {ab.dosing.renalAdjustment.map((rd, i) => {
              const isActive = renalDosing && rd.gfrRange === renalDosing.gfrRange
              return (
                <tr key={i} className={isActive ? "bg-blue-50 font-semibold" : ""}>
                  <td className="border border-gray-200 px-3 py-2">{rd.gfrRange}</td>
                  <td className="border border-gray-200 px-3 py-2">{rd.dose}</td>
                  <td className="border border-gray-200 px-3 py-2">{rd.interval}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {hdDosing && (
          <div className="mt-2 text-sm text-gray-600 bg-gray-50 rounded p-2">
            <span className="font-semibold">透析(HD):</span> {hdDosing.dose} {hdDosing.interval}
          </div>
        )}
      </section>

      {/* モニタリング */}
      {ab.monitoring && ab.monitoring.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-amber-700 mb-2 border-b border-amber-200 pb-1">モニタリング・注意事項</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {ab.monitoring.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </section>
      )}

      {/* 副作用 */}
      {ab.sideEffects && ab.sideEffects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-red-700 mb-2 border-b border-red-200 pb-1">主な副作用</h2>
          <div className="flex flex-wrap gap-2">
            {ab.sideEffects.map((se, i) => (
              <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">{se}</span>
            ))}
          </div>
        </section>
      )}

      {/* 関連感染症 */}
      {relatedInfections.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">関連感染症</h2>
          <div className="flex flex-wrap gap-2">
            {relatedInfections.map((inf) => (
              <Link
                key={inf.id}
                href={`/infection/${inf.id}`}
                className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-sm text-blue-700 hover:border-blue-400 transition"
              >
                {inf.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">参考文献</h2>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
          {ab.references.map((ref) => (
            <li key={ref.id}>
              <span className="text-gray-800">{ref.title}</span>
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">{ref.source}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
