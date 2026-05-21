import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfectiRef - 感染症リファレンス",
  description: "感染症・抗菌薬リファレンスツール for Clinicians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 font-[family-name:var(--font-geist-sans)]">
        <header className="glass sticky top-0 z-50 border-b border-white/20 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text">InfectiRef</span>
            </Link>
            <nav className="flex gap-1">
              <Link href="/" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all">
                感染症
              </Link>
              <Link href="/antibiotics" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all">
                抗菌薬
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
          {children}
        </main>
        <footer className="mt-auto border-t border-slate-200/60 bg-white/50">
          <div className="max-w-5xl mx-auto px-4 py-5 text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-500">免責事項</p>
            <p>本アプリは臨床判断の補助を目的としたリファレンスツールです。最終的な治療方針は担当医の判断に基づいてください。</p>
            <p>情報は定期的に更新していますが、最新のガイドラインを必ず確認してください。本アプリの使用により生じた結果について、開発者は一切の責任を負いません。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
