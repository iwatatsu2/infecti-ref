"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { infections } from "@/data/infections"
import { DrugRegimen } from "@/types"

function RegimenTable({ regimens, title }: { regimens: DrugRegimen[]; title: string }) {
  if (regimens.length === 0) return null
  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-600 mb-2">{title}</h4>
      <div className="space-y-2">
        {regimens.map((r, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Link href={`/antibiotic/${r.antibioticId}`} className="font-medium text-blue-700 hover:underline">
                {r.antibioticName}
              </Link>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{r.referenceTag}</span>
            </div>
            <div className="text-sm text-gray-700 mt-1">
              {r.regimen.dose} {r.regimen.route} {r.regimen.interval}
              {r.regimen.duration && <span className="text-gray-500"> ({r.regimen.duration})</span>}
            </div>
            {r.regimen.note && <div className="text-xs text-gray-500 mt-1">{r.regimen.note}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InfectionDetail() {
  const params = useParams()
  const infection = infections.find((inf) => inf.id === params.id)

  if (!infection) {
    return <div className="text-center py-12 text-gray-500">感染症が見つかりません</div>
  }

  return (
    <div>
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; 一覧に戻る</Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">{infection.name}</h1>
      <p className="text-sm text-gray-500 mb-6">{infection.nameEn}</p>

      {/* 想定菌 */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">想定菌</h2>
        <div className="flex flex-wrap gap-2">
          {infection.commonPathogens.map((p, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm italic">{p}</span>
          ))}
        </div>
      </section>

      {/* Empiric Therapy */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 border-b pb-1">Empiric Therapy</h2>
        <RegimenTable regimens={infection.empiricTherapy.firstLine} title="第一選択" />
        <RegimenTable regimens={infection.empiricTherapy.alternatives} title="代替" />
      </section>

      {/* Escalation */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-red-700 mb-3 border-b border-red-200 pb-1">Escalation</h2>
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-600 mb-1">Escalation基準</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {infection.escalation.criteria.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        <RegimenTable regimens={infection.escalation.options} title="Escalation選択肢" />
      </section>

      {/* De-escalation */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-green-700 mb-3 border-b border-green-200 pb-1">De-escalation</h2>
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-600 mb-1">De-escalation基準</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {infection.deescalation.criteria.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        <RegimenTable regimens={infection.deescalation.options} title="De-escalation選択肢" />
      </section>

      {/* 中止基準 */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 border-b pb-1">中止基準・治療期間</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-2">
          {infection.discontinuation.criteria.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
          <span className="font-semibold text-blue-800">標準治療期間:</span>{" "}
          <span className="text-blue-700">{infection.discontinuation.typicalDuration}</span>
        </div>
      </section>

      {/* Notes */}
      {infection.notes && infection.notes.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">臨床メモ</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {infection.notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </section>
      )}

      {/* References */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">参考文献</h2>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
          {infection.references.map((ref) => (
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
