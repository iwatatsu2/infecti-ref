// 感染症カテゴリアイコン
export function LungsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8" />
      <path d="M6.8 10C5.2 10 3 11.5 3 15c0 3 1.5 5 4 5 1.5 0 3-1 4-2.5L12 16" />
      <path d="M17.2 10C18.8 10 21 11.5 21 15c0 3-1.5 5-4 5-1.5 0-3-1-4-2.5L12 16" />
    </svg>
  )
}

export function KidneyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 18c-2.2 0-4-2.7-4-6s1.8-6 4-6c1.5 0 2.8 1 3.5 2.5L12 10l.5-1.5C13.2 7 14.5 6 16 6c2.2 0 4 2.7 4 6s-1.8 6-4 6c-1.5 0-2.8-1-3.5-2.5L12 14l-.5 1.5C10.8 17 9.5 18 8 18z" />
    </svg>
  )
}

export function SkinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c0-4 2-8 8-8s8 4 8 8" />
      <path d="M4 12c0 4 2 8 8 8s8-4 8-8" />
      <path d="M4 12h16" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="15" r="1" fill="currentColor" />
    </svg>
  )
}

export function AbdomenIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="13" rx="7" ry="8" />
      <path d="M9 11c0 1.5 1.3 3 3 3s3-1.5 3-3" />
    </svg>
  )
}

export function BloodIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l-4 8c-1.3 2.5-.5 5.5 2 7a4.8 4.8 0 004 0c2.5-1.5 3.3-4.5 2-7L12 2z" />
    </svg>
  )
}

export function HeartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      <path d="M12 13l-2-2" />
      <path d="M12 13l2-2" />
    </svg>
  )
}

export function BrainIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a5 5 0 00-4.8 3.5A4 4 0 004 9.5C4 12 5 14 7 15v4a2 2 0 002 2h6a2 2 0 002-2v-4c2-1 3-3 3-5.5a4 4 0 00-3.2-4A5 5 0 0012 2z" />
      <path d="M12 2v19" />
    </svg>
  )
}

export function BoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5a2 2 0 012-2 2 2 0 012 2c0 .7-.3 1.3-.8 1.7L12 12l3.8-5.3A2 2 0 0115 5a2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2c-.3 0-.7-.1-1-.2L12 12l4 5.2c.3-.1.7-.2 1-.2a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2c0-.7.3-1.3.8-1.7L12 12l-3.8 5.3c.5.4.8 1 .8 1.7a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2c.3 0 .7.1 1 .2L12 12 8 6.8c-.3.1-.7.2-1 .2a2 2 0 01-2-2z" />
    </svg>
  )
}

export function GutIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2H7c-1.1 0-2 .9-2 2v0c0 1.1.9 2 2 2h2c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2H7" />
      <path d="M13 7c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h-2c-1.1 0-2 .9-2 2v0c0 1.1.9 2 2 2h2c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h-2" />
    </svg>
  )
}

// 投与経路アイコン
export function IVIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6" />
      <path d="M8 4h8" />
      <rect x="9" y="8" width="6" height="8" rx="1" />
      <path d="M12 16v6" />
    </svg>
  )
}

export function PillIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="8" rx="4" />
      <path d="M12 8v8" />
    </svg>
  )
}

// セクション用アイコン
export function ArrowUpIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  )
}

export function ArrowDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  )
}

export function StopIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  )
}

export function BacteriaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v5" />
      <path d="M12 17v5" />
      <path d="M2 12h5" />
      <path d="M17 12h5" />
      <path d="M4.93 4.93l3.54 3.54" />
      <path d="M15.54 15.54l3.54 3.54" />
      <path d="M4.93 19.07l3.54-3.54" />
      <path d="M15.54 8.46l3.54-3.54" />
    </svg>
  )
}

export function ShieldIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5.5-3.8 10-8 12-4.2-2-8-6.5-8-12V6l8-4z" />
    </svg>
  )
}

// カテゴリ→アイコンマッピング
export const categoryIconMap: Record<string, React.FC<{ className?: string }>> = {
  "呼吸器": LungsIcon,
  "尿路": KidneyIcon,
  "皮膚・軟部組織": SkinIcon,
  "腹腔内": AbdomenIcon,
  "血流": BloodIcon,
  "心血管": HeartIcon,
  "中枢神経": BrainIcon,
  "骨・関節": BoneIcon,
  "消化管": GutIcon,
}

export function CategoryIcon({ category, className = "w-4 h-4" }: { category: string; className?: string }) {
  const Icon = categoryIconMap[category]
  if (!Icon) return null
  return <Icon className={className} />
}

export function RouteIcon({ route, className = "w-3.5 h-3.5" }: { route: string; className?: string }) {
  if (route === "PO") return <PillIcon className={className} />
  return <IVIcon className={className} />
}
