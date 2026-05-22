import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfectiRef",
  description: "感染症・抗菌薬リファレンス",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "InfectiRef" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f1117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-geist-sans)]" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(15,17,23,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderColor: "var(--border)" }}>
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">InfectiRef</span>
            </Link>
            <nav className="flex gap-1">
              <Link href="/" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ color: "var(--text-secondary)" }}>
                感染症
              </Link>
              <Link href="/antibiotics" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ color: "var(--text-secondary)" }}>
                抗菌薬
              </Link>
              <Link href="/about" className="px-2 py-1.5 rounded-lg text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-2xl mx-auto px-4 py-4 text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
            <p className="font-semibold" style={{ color: "var(--text-secondary)" }}>免責事項</p>
            <p>本アプリは臨床判断の補助を目的としたリファレンスツールです。最終的な治療方針は担当医の判断に基づいてください。</p>
            <p>本アプリの使用により生じた結果について開発者は一切の責任を負いません。最新のガイドラインを必ず確認してください。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
