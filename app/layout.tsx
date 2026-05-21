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
  description: "感染症・抗菌薬リファレンスツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 font-[family-name:var(--font-geist-sans)]">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-700">
              InfectiRef
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-gray-600 hover:text-blue-700">感染症</Link>
              <Link href="/antibiotics" className="text-gray-600 hover:text-blue-700">抗菌薬一覧</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-500 space-y-1">
            <p className="font-semibold">免責事項</p>
            <p>本アプリは臨床判断の補助を目的としたリファレンスツールです。最終的な治療方針は担当医の判断に基づいてください。</p>
            <p>情報は定期的に更新していますが、最新のガイドラインを必ず確認してください。本アプリの使用により生じた結果について、開発者は一切の責任を負いません。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
