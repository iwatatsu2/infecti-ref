export type Reference = {
  id: string
  title: string
  source: string // e.g., "IDSA 2019", "JAID/JSC 2019"
  url?: string
}

export type DosingRegimen = {
  dose: string
  route: "IV" | "PO" | "IV/PO"
  interval: string
  duration?: string
  note?: string
}

export type DrugRegimen = {
  antibioticId: string
  antibioticName: string
  regimen: DosingRegimen
  referenceTag: string // e.g., "[IDSA 2019]"
}

export type RenalDosing = {
  gfrRange: string // e.g., "30-59", "<15", "HD"
  gfrMin: number
  gfrMax: number
  dose: string
  interval: string
}

export type Antibiotic = {
  id: string
  name: string
  genericName: string
  category: string // e.g., "ペニシリン系", "セフェム系"
  route: "IV" | "PO" | "IV/PO"
  spectrum: string[]
  dosing: {
    standard: DosingRegimen
    renalAdjustment: RenalDosing[]
  }
  sideEffects?: string[]
  monitoring?: string[]
  references: Reference[]
}

export type Infection = {
  id: string
  name: string
  nameEn: string
  category: string // e.g., "呼吸器", "尿路"
  commonPathogens: string[]
  empiricTherapy: {
    firstLine: DrugRegimen[]
    alternatives: DrugRegimen[]
  }
  escalation: {
    criteria: string[]
    options: DrugRegimen[]
  }
  deescalation: {
    criteria: string[]
    options: DrugRegimen[]
  }
  discontinuation: {
    criteria: string[]
    typicalDuration: string
  }
  notes?: string[]
  references: Reference[]
}
