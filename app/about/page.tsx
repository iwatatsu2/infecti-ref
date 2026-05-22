"use client"

import Link from "next/link"

const links = [
  { label: "公式サイト", url: "https://driwatatsu.readdy.co", icon: "🌐" },
  { label: "Instagram", url: "https://www.instagram.com/dr.iwatatsu/", icon: "📷" },
  { label: "X (Twitter)", url: "https://x.com/KenKyu1019799", icon: "𝕏" },
  { label: "note", url: "https://note.com/dr_iwatatsu", icon: "📝" },
  { label: "医療アプリまとめ", url: "https://medapp-market.vercel.app/", icon: "🏥" },
  { label: "antaaスライド", url: "https://slide.antaa.jp/profile/mtzDnleJ6DYJ", icon: "📊" },
]

export default function AboutPage() {
  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-1 text-sm mb-6 active:opacity-70" style={{ color: "var(--text-muted)" }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        戻る
      </Link>

      {/* Profile */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
          🩺
        </div>
        <h1 className="text-2xl font-bold text-white">Dr. いわたつ</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>糖尿病・内分泌 専門医・指導医</p>
      </div>

      {/* About */}
      <div className="rounded-2xl p-4 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-bold text-white mb-2">このアプリについて</h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          InfectiRefは、臨床現場で感染症の治療方針を素早く確認するためのリファレンスアプリです。
          感染症ごとの想定菌・エンピリック治療・escalation/de-escalation基準・腎機能別投与量を、ガイドラインに基づいて整理しています。
        </p>
      </div>

      {/* Data sources */}
      <div className="rounded-2xl p-4 mb-6" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}>
        <h2 className="text-sm font-bold text-blue-400 mb-2">参考ガイドライン</h2>
        <ul className="space-y-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
          <li>• JAID/JSC感染症治療ガイド 2019</li>
          <li>• IDSA/ATS Guidelines</li>
          <li>• Sanford Guide to Antimicrobial Therapy</li>
          <li>• 日本版敗血症診療ガイドライン（J-SSCG）2024</li>
          <li>• 抗菌薬TDMガイドライン 2022</li>
          <li>• 各抗菌薬添付文書（PMDA）</li>
        </ul>
      </div>

      {/* Links */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>リンク</h2>
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl active:scale-[0.98] transition-transform"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm font-medium text-white flex-1">{link.label}</span>
              <svg className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl p-4" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
        <h2 className="text-sm font-bold text-amber-400 mb-2">免責事項</h2>
        <div className="text-xs space-y-1.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>本アプリは臨床判断の補助を目的としたリファレンスツールです。</p>
          <p>最終的な治療方針は担当医の判断に基づいてください。</p>
          <p>情報は定期的に更新していますが、最新のガイドラインを必ず確認してください。</p>
          <p>本アプリの使用により生じた結果について、開発者は一切の責任を負いません。</p>
        </div>
      </div>
    </div>
  )
}
