import { Antibiotic } from "@/types"

export const antibiotics: Antibiotic[] = [
  // ===== ペニシリン系 =====
  {
    id: "abpc",
    name: "アンピシリン",
    genericName: "Ampicillin (ABPC)",
    category: "ペニシリン系",
    route: "IV",
    description: "Listeria・腸球菌に有効な古典的ペニシリン。髄膜炎でのListeraカバーに必須",
    spectrum: ["Streptococcus spp.", "Enterococcus faecalis", "Listeria monocytogenes", "Haemophilus influenzae（一部）"],
    dosing: {
      standard: { dose: "2g", route: "IV", interval: "4-6時間毎" },
      renalAdjustment: [
        { gfrRange: "≥50", gfrMin: 50, gfrMax: 999, dose: "2g", interval: "4-6時間毎" },
        { gfrRange: "10-49", gfrMin: 10, gfrMax: 49, dose: "2g", interval: "6-8時間毎" },
        { gfrRange: "<10", gfrMin: 0, gfrMax: 9, dose: "2g", interval: "12時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "2g", interval: "12時間毎（透析後追加）" },
      ],
    },
    references: [{ id: "ref-abpc-1", title: "ABPC添付文書", source: "添付文書" }],
  },
  {
    id: "abpc-sbt",
    name: "アンピシリン/スルバクタム",
    genericName: "Ampicillin/Sulbactam (ABPC/SBT)",
    category: "ペニシリン系",
    route: "IV",
    description: "嫌気性菌を含む広域カバー。市中感染の万能選手。誤嚥性肺炎の定番",
    spectrum: ["Streptococcus spp.", "MSSA", "E. coli（一部）", "Bacteroides fragilis", "Haemophilus influenzae"],
    dosing: {
      standard: { dose: "3g", route: "IV", interval: "6時間毎" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "3g", interval: "6時間毎" },
        { gfrRange: "15-29", gfrMin: 15, gfrMax: 29, dose: "3g", interval: "12時間毎" },
        { gfrRange: "<15", gfrMin: 0, gfrMax: 14, dose: "3g", interval: "24時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "3g", interval: "24時間毎（透析後追加）" },
      ],
    },
    references: [{ id: "ref-abpc-sbt-1", title: "ユナシン添付文書", source: "添付文書" }],
  },
  {
    id: "pipc-taz",
    name: "ピペラシリン/タゾバクタム",
    genericName: "Piperacillin/Tazobactam (PIPC/TAZ)",
    category: "ペニシリン系",
    route: "IV",
    description: "緑膿菌を含む最広域ペニシリン。重症感染症のempiric therapyの主力",
    spectrum: ["MSSA", "Streptococcus spp.", "Enterococcus faecalis", "E. coli", "Klebsiella spp.", "Pseudomonas aeruginosa", "Bacteroides fragilis"],
    dosing: {
      standard: { dose: "4.5g", route: "IV", interval: "6-8時間毎" },
      renalAdjustment: [
        { gfrRange: "≥40", gfrMin: 40, gfrMax: 999, dose: "4.5g", interval: "6時間毎" },
        { gfrRange: "20-39", gfrMin: 20, gfrMax: 39, dose: "4.5g", interval: "8時間毎" },
        { gfrRange: "<20", gfrMin: 0, gfrMax: 19, dose: "2.25g", interval: "8時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "2.25g", interval: "8時間毎（透析後追加0.75g）" },
      ],
    },
    references: [{ id: "ref-pipc-taz-1", title: "ゾシン添付文書", source: "添付文書" }, { id: "ref-pipc-taz-2", title: "Sanford Guide 2024", source: "Sanford Guide" }],
  },
  {
    id: "ampc",
    name: "アモキシシリン",
    genericName: "Amoxicillin (AMPC)",
    category: "ペニシリン系",
    route: "PO",
    description: "経口ペニシリンの基本薬。肺炎球菌感受性確認後のde-escalationに最適",
    spectrum: ["Streptococcus spp.", "Enterococcus faecalis", "Helicobacter pylori", "Haemophilus influenzae（一部）"],
    dosing: {
      standard: { dose: "500mg", route: "PO", interval: "8時間毎" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "500mg", interval: "8時間毎" },
        { gfrRange: "10-29", gfrMin: 10, gfrMax: 29, dose: "500mg", interval: "12時間毎" },
        { gfrRange: "<10", gfrMin: 0, gfrMax: 9, dose: "500mg", interval: "24時間毎" },
      ],
    },
    references: [{ id: "ref-ampc-1", title: "サワシリン添付文書", source: "添付文書" }],
  },
  {
    id: "ampc-cva",
    name: "アモキシシリン/クラブラン酸",
    genericName: "Amoxicillin/Clavulanate (AMPC/CVA)",
    category: "ペニシリン系",
    route: "PO",
    description: "経口で嫌気性菌までカバー。ABPC/SBTからの経口スイッチの定番",
    spectrum: ["MSSA", "Streptococcus spp.", "Haemophilus influenzae", "Moraxella catarrhalis", "E. coli（一部）", "嫌気性菌"],
    dosing: {
      standard: { dose: "250mg/125mg", route: "PO", interval: "8時間毎" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "250mg/125mg", interval: "8時間毎" },
        { gfrRange: "10-29", gfrMin: 10, gfrMax: 29, dose: "250mg/125mg", interval: "12時間毎" },
        { gfrRange: "<10", gfrMin: 0, gfrMax: 9, dose: "250mg/125mg", interval: "24時間毎" },
      ],
    },
    references: [{ id: "ref-ampc-cva-1", title: "オーグメンチン添付文書", source: "添付文書" }],
  },

  // ===== セフェム系 =====
  {
    id: "cez",
    name: "セファゾリン",
    genericName: "Cefazolin (CEZ)",
    category: "第1世代セフェム系",
    route: "IV",
    description: "MSSA感染症の最適解。周術期予防抗菌薬の第一選択。安全性が高い",
    spectrum: ["MSSA", "Streptococcus spp.", "E. coli", "Klebsiella spp."],
    dosing: {
      standard: { dose: "2g", route: "IV", interval: "8時間毎" },
      renalAdjustment: [
        { gfrRange: "≥35", gfrMin: 35, gfrMax: 999, dose: "2g", interval: "8時間毎" },
        { gfrRange: "11-34", gfrMin: 11, gfrMax: 34, dose: "1g", interval: "12時間毎" },
        { gfrRange: "≤10", gfrMin: 0, gfrMax: 10, dose: "1g", interval: "24時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "1g", interval: "透析後" },
      ],
    },
    references: [{ id: "ref-cez-1", title: "CEZ添付文書", source: "添付文書" }],
  },
  {
    id: "ctr",
    name: "セフトリアキソン",
    genericName: "Ceftriaxone (CTRX)",
    category: "第3世代セフェム系",
    route: "IV",
    description: "1日1回投与で使いやすい万能3世代。腎機能調整不要。外来IVにも",
    spectrum: ["Streptococcus pneumoniae", "Haemophilus influenzae", "Moraxella catarrhalis", "E. coli", "Klebsiella spp.", "Neisseria meningitidis", "Neisseria gonorrhoeae"],
    dosing: {
      standard: { dose: "2g", route: "IV", interval: "24時間毎" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "2g", interval: "24時間毎（調整不要）" },
      ],
    },
    monitoring: ["胆泥形成に注意（長期使用時）"],
    references: [{ id: "ref-ctr-1", title: "ロセフィン添付文書", source: "添付文書" }],
  },
  {
    id: "ctm",
    name: "セフォタキシム",
    genericName: "Cefotaxime (CTM)",
    category: "第3世代セフェム系",
    route: "IV",
    description: "CTRXの代替。胆泥リスクなく新生児にも安全。髄膜炎でも使用",
    spectrum: ["Streptococcus pneumoniae", "E. coli", "Klebsiella spp.", "Neisseria meningitidis"],
    dosing: {
      standard: { dose: "2g", route: "IV", interval: "4-6時間毎" },
      renalAdjustment: [
        { gfrRange: "≥20", gfrMin: 20, gfrMax: 999, dose: "2g", interval: "6-8時間毎" },
        { gfrRange: "<20", gfrMin: 0, gfrMax: 19, dose: "2g", interval: "12時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "1-2g", interval: "透析後" },
      ],
    },
    references: [{ id: "ref-ctm-1", title: "クラフォラン添付文書", source: "添付文書" }],
  },
  {
    id: "caz",
    name: "セフタジジム",
    genericName: "Ceftazidime (CAZ)",
    category: "第3世代セフェム系",
    route: "IV",
    description: "緑膿菌に強い3世代セフェム。グラム陽性菌カバーは弱い",
    spectrum: ["Pseudomonas aeruginosa", "E. coli", "Klebsiella spp.", "Serratia spp."],
    dosing: {
      standard: { dose: "2g", route: "IV", interval: "8時間毎" },
      renalAdjustment: [
        { gfrRange: "≥50", gfrMin: 50, gfrMax: 999, dose: "2g", interval: "8時間毎" },
        { gfrRange: "31-50", gfrMin: 31, gfrMax: 50, dose: "1g", interval: "12時間毎" },
        { gfrRange: "16-30", gfrMin: 16, gfrMax: 30, dose: "1g", interval: "24時間毎" },
        { gfrRange: "≤15", gfrMin: 0, gfrMax: 15, dose: "0.5g", interval: "24時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "1g", interval: "透析後" },
      ],
    },
    references: [{ id: "ref-caz-1", title: "モダシン添付文書", source: "添付文書" }],
  },
  {
    id: "cfpm",
    name: "セフェピム",
    genericName: "Cefepime (CFPM)",
    category: "第4世代セフェム系",
    route: "IV",
    description: "緑膿菌＋グラム陽性菌の広域4世代。発熱性好中球減少症の定番。脳症に注意",
    spectrum: ["MSSA", "Streptococcus pneumoniae", "E. coli", "Klebsiella spp.", "Pseudomonas aeruginosa", "Enterobacter spp."],
    dosing: {
      standard: { dose: "2g", route: "IV", interval: "8-12時間毎" },
      renalAdjustment: [
        { gfrRange: "≥60", gfrMin: 60, gfrMax: 999, dose: "2g", interval: "8時間毎" },
        { gfrRange: "30-59", gfrMin: 30, gfrMax: 59, dose: "2g", interval: "12時間毎" },
        { gfrRange: "11-29", gfrMin: 11, gfrMax: 29, dose: "1g", interval: "12時間毎" },
        { gfrRange: "≤10", gfrMin: 0, gfrMax: 10, dose: "1g", interval: "24時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "1g", interval: "透析後" },
      ],
    },
    monitoring: ["セフェピム脳症に注意（特に腎機能低下時）"],
    references: [{ id: "ref-cfpm-1", title: "マキシピーム添付文書", source: "添付文書" }],
  },
  {
    id: "cephalexin",
    name: "セファレキシン",
    genericName: "Cephalexin (CEX)",
    category: "第1世代セフェム系",
    route: "PO",
    description: "CEZの経口版。蜂窩織炎の外来治療やMSSAのde-escalationに",
    spectrum: ["MSSA", "Streptococcus spp.", "E. coli（一部）"],
    dosing: {
      standard: { dose: "500mg", route: "PO", interval: "6時間毎" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "500mg", interval: "6時間毎" },
        { gfrRange: "10-29", gfrMin: 10, gfrMax: 29, dose: "500mg", interval: "8-12時間毎" },
        { gfrRange: "<10", gfrMin: 0, gfrMax: 9, dose: "250mg", interval: "12時間毎" },
      ],
    },
    references: [{ id: "ref-cex-1", title: "ケフレックス添付文書", source: "添付文書" }],
  },

  // ===== カルバペネム系 =====
  {
    id: "mepm",
    name: "メロペネム",
    genericName: "Meropenem (MEPM)",
    category: "カルバペネム系",
    route: "IV",
    description: "最広域の切り札。ESBL産生菌に確実。痙攣リスクがIPMより低い",
    spectrum: ["MSSA", "Streptococcus spp.", "E. coli", "Klebsiella spp.", "Pseudomonas aeruginosa", "Bacteroides fragilis", "Enterobacter spp.", "Serratia spp."],
    dosing: {
      standard: { dose: "1g", route: "IV", interval: "8時間毎" },
      renalAdjustment: [
        { gfrRange: "≥50", gfrMin: 50, gfrMax: 999, dose: "1g", interval: "8時間毎" },
        { gfrRange: "25-49", gfrMin: 25, gfrMax: 49, dose: "1g", interval: "12時間毎" },
        { gfrRange: "10-24", gfrMin: 10, gfrMax: 24, dose: "0.5g", interval: "12時間毎" },
        { gfrRange: "<10", gfrMin: 0, gfrMax: 9, dose: "0.5g", interval: "24時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "0.5g", interval: "24時間毎（透析後追加）" },
      ],
    },
    references: [{ id: "ref-mepm-1", title: "メロペン添付文書", source: "添付文書" }, { id: "ref-mepm-2", title: "Sanford Guide 2024", source: "Sanford Guide" }],
  },
  {
    id: "drpm",
    name: "ドリペネム",
    genericName: "Doripenem (DRPM)",
    category: "カルバペネム系",
    route: "IV",
    description: "緑膿菌への活性がカルバペネム中最強。延長投与で効果を最大化",
    spectrum: ["MSSA", "E. coli", "Klebsiella spp.", "Pseudomonas aeruginosa", "Bacteroides fragilis"],
    dosing: {
      standard: { dose: "0.5g", route: "IV", interval: "8時間毎", note: "1時間以上かけて点滴" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "0.5g", interval: "8時間毎" },
        { gfrRange: "10-29", gfrMin: 10, gfrMax: 29, dose: "0.25g", interval: "8時間毎" },
        { gfrRange: "<10", gfrMin: 0, gfrMax: 9, dose: "0.25g", interval: "12時間毎" },
      ],
    },
    references: [{ id: "ref-drpm-1", title: "フィニバックス添付文書", source: "添付文書" }],
  },

  // ===== グリコペプチド系 =====
  {
    id: "vcm",
    name: "バンコマイシン",
    genericName: "Vancomycin (VCM)",
    category: "グリコペプチド系",
    route: "IV",
    description: "MRSA治療の標準薬。TDM必須（AUC/MIC管理）。腎毒性に注意",
    spectrum: ["MRSA", "MSSA", "Enterococcus faecalis", "Enterococcus faecium", "Clostridioides difficile（経口のみ）", "Streptococcus pneumoniae（ペニシリン耐性）"],
    dosing: {
      standard: { dose: "15-20mg/kg", route: "IV", interval: "8-12時間毎", note: "トラフ値 15-20μg/mL目標（AUC/MIC 400-600目標）" },
      renalAdjustment: [
        { gfrRange: "≥50", gfrMin: 50, gfrMax: 999, dose: "15-20mg/kg", interval: "8-12時間毎" },
        { gfrRange: "20-49", gfrMin: 20, gfrMax: 49, dose: "15-20mg/kg", interval: "24時間毎" },
        { gfrRange: "<20", gfrMin: 0, gfrMax: 19, dose: "15-20mg/kg", interval: "48-72時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "15-20mg/kg", interval: "透析後（トラフ値で調整）" },
      ],
    },
    monitoring: ["TDM必須：AUC/MIC 400-600目標", "腎機能モニタリング", "Red man syndromeに注意（投与速度）"],
    references: [
      { id: "ref-vcm-1", title: "抗菌薬TDMガイドライン2022", source: "TDMガイドライン 2022" },
      { id: "ref-vcm-2", title: "IDSA MRSA Guidelines 2011", source: "IDSA 2011" },
    ],
  },
  {
    id: "vcm-po",
    name: "バンコマイシン（経口）",
    genericName: "Vancomycin PO",
    category: "グリコペプチド系",
    route: "PO",
    description: "CDI治療専用の経口薬。腸管から吸収されないため全身作用なし",
    spectrum: ["Clostridioides difficile"],
    dosing: {
      standard: { dose: "125mg", route: "PO", interval: "6時間毎", duration: "10日間" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "125mg", interval: "6時間毎（調整不要・吸収されない）" },
      ],
    },
    references: [{ id: "ref-vcm-po-1", title: "IDSA/SHEA CDI Guidelines 2021", source: "IDSA 2021" }],
  },

  // ===== アミノグリコシド系 =====
  {
    id: "gm",
    name: "ゲンタマイシン",
    genericName: "Gentamicin (GM)",
    category: "アミノグリコシド系",
    route: "IV",
    description: "GNRへの殺菌力が強力。腸球菌IEでの相乗効果。腎毒性・聴覚毒性に要注意",
    spectrum: ["E. coli", "Klebsiella spp.", "Pseudomonas aeruginosa", "Enterococcus spp.（相乗効果）"],
    dosing: {
      standard: { dose: "5-7mg/kg", route: "IV", interval: "24時間毎", note: "1日1回投与法推奨" },
      renalAdjustment: [
        { gfrRange: "≥60", gfrMin: 60, gfrMax: 999, dose: "5-7mg/kg", interval: "24時間毎" },
        { gfrRange: "40-59", gfrMin: 40, gfrMax: 59, dose: "5-7mg/kg", interval: "36時間毎" },
        { gfrRange: "20-39", gfrMin: 20, gfrMax: 39, dose: "5-7mg/kg", interval: "48時間毎" },
        { gfrRange: "<20", gfrMin: 0, gfrMax: 19, dose: "TDMに基づき調整", interval: "TDMに基づき調整" },
      ],
    },
    monitoring: ["TDM必須：ピーク値・トラフ値", "腎毒性・聴覚毒性モニタリング"],
    references: [{ id: "ref-gm-1", title: "抗菌薬TDMガイドライン2022", source: "TDMガイドライン 2022" }],
  },

  // ===== フルオロキノロン系 =====
  {
    id: "lvfx",
    name: "レボフロキサシン",
    genericName: "Levofloxacin (LVFX)",
    category: "フルオロキノロン系",
    route: "IV/PO",
    description: "呼吸器キノロン。肺炎球菌＋非定型を1剤でカバー。安易な使用は耐性化に注意",
    spectrum: ["Streptococcus pneumoniae", "Haemophilus influenzae", "Moraxella catarrhalis", "E. coli（一部）", "Klebsiella spp.（一部）", "Legionella pneumophila", "Mycoplasma pneumoniae"],
    dosing: {
      standard: { dose: "500mg", route: "IV/PO", interval: "24時間毎" },
      renalAdjustment: [
        { gfrRange: "≥50", gfrMin: 50, gfrMax: 999, dose: "500mg", interval: "24時間毎" },
        { gfrRange: "20-49", gfrMin: 20, gfrMax: 49, dose: "250mg", interval: "24時間毎" },
        { gfrRange: "<20", gfrMin: 0, gfrMax: 19, dose: "250mg", interval: "48時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "250mg", interval: "48時間毎" },
      ],
    },
    sideEffects: ["腱断裂", "QT延長", "低血糖", "大動脈瘤リスク"],
    references: [{ id: "ref-lvfx-1", title: "クラビット添付文書", source: "添付文書" }],
  },
  {
    id: "cpfx",
    name: "シプロフロキサシン",
    genericName: "Ciprofloxacin (CPFX)",
    category: "フルオロキノロン系",
    route: "IV/PO",
    description: "GNR・緑膿菌に強いキノロン。骨移行性良好。肺炎球菌には弱い",
    spectrum: ["E. coli", "Klebsiella spp.", "Pseudomonas aeruginosa", "Salmonella spp."],
    dosing: {
      standard: { dose: "400mg IV / 500mg PO", route: "IV/PO", interval: "12時間毎（IV）/ 12時間毎（PO）" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "400mg IV / 500mg PO", interval: "12時間毎" },
        { gfrRange: "<30", gfrMin: 0, gfrMax: 29, dose: "200mg IV / 250mg PO", interval: "12時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "200mg IV / 250mg PO", interval: "透析後" },
      ],
    },
    references: [{ id: "ref-cpfx-1", title: "シプロキサン添付文書", source: "添付文書" }],
  },

  // ===== マクロライド系 =====
  {
    id: "azm",
    name: "アジスロマイシン",
    genericName: "Azithromycin (AZM)",
    category: "マクロライド系",
    route: "IV/PO",
    description: "非定型肺炎カバーの定番。3日間投与で7日間効果持続。CAP併用に",
    spectrum: ["Mycoplasma pneumoniae", "Chlamydophila pneumoniae", "Legionella pneumophila", "Haemophilus influenzae", "Moraxella catarrhalis"],
    dosing: {
      standard: { dose: "500mg", route: "IV/PO", interval: "24時間毎", duration: "3-5日間" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "500mg", interval: "24時間毎（調整不要）" },
      ],
    },
    references: [{ id: "ref-azm-1", title: "ジスロマック添付文書", source: "添付文書" }],
  },

  // ===== テトラサイクリン系 =====
  {
    id: "mino",
    name: "ミノサイクリン",
    genericName: "Minocycline (MINO)",
    category: "テトラサイクリン系",
    route: "IV/PO",
    description: "MRSA含む広域カバー。IV/PO両方あり。めまい・色素沈着に注意",
    spectrum: ["MRSA（一部）", "Rickettsia spp.", "Chlamydia spp.", "Mycoplasma pneumoniae"],
    dosing: {
      standard: { dose: "100mg", route: "IV/PO", interval: "12時間毎" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "100mg", interval: "12時間毎（調整不要）" },
      ],
    },
    references: [{ id: "ref-mino-1", title: "ミノマイシン添付文書", source: "添付文書" }],
  },
  {
    id: "doxy",
    name: "ドキシサイクリン",
    genericName: "Doxycycline (DOXY)",
    category: "テトラサイクリン系",
    route: "PO",
    description: "リケッチア・クラミジアの第一選択。腎調整不要で使いやすい経口薬",
    spectrum: ["Rickettsia spp.", "Chlamydia spp.", "Mycoplasma pneumoniae", "MRSA（一部）", "Borrelia burgdorferi"],
    dosing: {
      standard: { dose: "100mg", route: "PO", interval: "12時間毎" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "100mg", interval: "12時間毎（調整不要）" },
      ],
    },
    references: [{ id: "ref-doxy-1", title: "ビブラマイシン添付文書", source: "添付文書" }],
  },

  // ===== メトロニダゾール =====
  {
    id: "mtz",
    name: "メトロニダゾール",
    genericName: "Metronidazole (MNZ)",
    category: "ニトロイミダゾール系",
    route: "IV/PO",
    description: "嫌気性菌の切り札。CDI・腹腔内感染で併用。飲酒厳禁（ジスルフィラム様反応）",
    spectrum: ["Bacteroides fragilis", "Clostridioides difficile", "嫌気性菌全般", "Entamoeba histolytica", "Giardia lamblia"],
    dosing: {
      standard: { dose: "500mg", route: "IV/PO", interval: "8時間毎" },
      renalAdjustment: [
        { gfrRange: "≥10", gfrMin: 10, gfrMax: 999, dose: "500mg", interval: "8時間毎（調整不要）" },
        { gfrRange: "<10", gfrMin: 0, gfrMax: 9, dose: "500mg", interval: "12時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "500mg", interval: "8時間毎（透析で除去される）" },
      ],
    },
    references: [{ id: "ref-mtz-1", title: "フラジール添付文書", source: "添付文書" }],
  },

  // ===== リネゾリド =====
  {
    id: "lzd",
    name: "リネゾリド",
    genericName: "Linezolid (LZD)",
    category: "オキサゾリジノン系",
    route: "IV/PO",
    description: "MRSA/VREに有効でIV=PO同等。肺組織移行性良好。2週超で血小板減少",
    spectrum: ["MRSA", "VRE", "Enterococcus faecium", "Streptococcus pneumoniae（ペニシリン耐性）"],
    dosing: {
      standard: { dose: "600mg", route: "IV/PO", interval: "12時間毎" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "600mg", interval: "12時間毎（調整不要）" },
      ],
    },
    monitoring: ["血小板数（2週間以上で血小板減少リスク）", "末梢神経障害（長期使用）", "セロトニン症候群（SSRI併用注意）"],
    references: [{ id: "ref-lzd-1", title: "ザイボックス添付文書", source: "添付文書" }],
  },

  // ===== ダプトマイシン =====
  {
    id: "dap",
    name: "ダプトマイシン",
    genericName: "Daptomycin (DAP)",
    category: "リポペプチド系",
    route: "IV",
    description: "MRSA菌血症・心内膜炎の代替。肺炎には使用不可（サーファクタントで不活化）",
    spectrum: ["MRSA", "VRE", "MSSA", "Enterococcus faecalis", "Enterococcus faecium"],
    dosing: {
      standard: { dose: "6-10mg/kg", route: "IV", interval: "24時間毎", note: "心内膜炎: 8-10mg/kg, 菌血症: 6mg/kg" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "6-10mg/kg", interval: "24時間毎" },
        { gfrRange: "<30", gfrMin: 0, gfrMax: 29, dose: "6-10mg/kg", interval: "48時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "6-10mg/kg", interval: "48時間毎（透析後）" },
      ],
    },
    monitoring: ["CPK毎週モニタリング", "肺炎には使用不可（サーファクタントで不活化）"],
    references: [{ id: "ref-dap-1", title: "キュビシン添付文書", source: "添付文書" }, { id: "ref-dap-2", title: "IDSA MRSA Guidelines 2011", source: "IDSA 2011" }],
  },

  // ===== ST合剤 =====
  {
    id: "st",
    name: "ST合剤",
    genericName: "Trimethoprim/Sulfamethoxazole (TMP/SMX)",
    category: "葉酸代謝阻害薬",
    route: "IV/PO",
    description: "PCP予防・治療の第一選択。CA-MRSA SSTIにも。高K血症に注意",
    spectrum: ["MRSA（軽症SSTI）", "Pneumocystis jirovecii", "Stenotrophomonas maltophilia", "Nocardia spp.", "E. coli（一部）"],
    dosing: {
      standard: { dose: "TMP 160mg/SMX 800mg（1DS錠）", route: "PO", interval: "12時間毎", note: "PCP: TMP 15-20mg/kg/day分3-4" },
      renalAdjustment: [
        { gfrRange: "≥30", gfrMin: 30, gfrMax: 999, dose: "通常量", interval: "12時間毎" },
        { gfrRange: "15-29", gfrMin: 15, gfrMax: 29, dose: "半量", interval: "12時間毎" },
        { gfrRange: "<15", gfrMin: 0, gfrMax: 14, dose: "推奨されない", interval: "-" },
      ],
    },
    monitoring: ["高カリウム血症", "腎機能", "血球減少"],
    references: [{ id: "ref-st-1", title: "バクタ添付文書", source: "添付文書" }],
  },

  // ===== 抗真菌薬（主要なもの） =====
  {
    id: "mcfg",
    name: "ミカファンギン",
    genericName: "Micafungin (MCFG)",
    category: "キャンディン系",
    route: "IV",
    description: "侵襲性カンジダ症のempiric therapy第一選択。腎・肝調整ほぼ不要",
    spectrum: ["Candida spp.", "Aspergillus spp.（一部）"],
    dosing: {
      standard: { dose: "100-150mg", route: "IV", interval: "24時間毎" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "100-150mg", interval: "24時間毎（調整不要）" },
      ],
    },
    references: [{ id: "ref-mcfg-1", title: "ファンガード添付文書", source: "添付文書" }],
  },
  {
    id: "flcz",
    name: "フルコナゾール",
    genericName: "Fluconazole (FLCZ)",
    category: "アゾール系",
    route: "IV/PO",
    description: "C. albicansのde-escalationに最適。経口で高い生体利用率。薬物相互作用に注意",
    spectrum: ["Candida albicans", "Candida parapsilosis", "Cryptococcus neoformans"],
    dosing: {
      standard: { dose: "400mg（初日800mg）", route: "IV/PO", interval: "24時間毎" },
      renalAdjustment: [
        { gfrRange: "≥50", gfrMin: 50, gfrMax: 999, dose: "通常量", interval: "24時間毎" },
        { gfrRange: "<50", gfrMin: 0, gfrMax: 49, dose: "半量", interval: "24時間毎" },
        { gfrRange: "HD", gfrMin: -1, gfrMax: -1, dose: "通常量", interval: "透析後" },
      ],
    },
    references: [{ id: "ref-flcz-1", title: "ジフルカン添付文書", source: "添付文書" }],
  },

  // ===== クリンダマイシン =====
  {
    id: "cldm",
    name: "クリンダマイシン",
    genericName: "Clindamycin (CLDM)",
    category: "リンコマイシン系",
    route: "IV/PO",
    description: "毒素産生抑制効果あり。壊死性筋膜炎で併用。CDIリスクに注意",
    spectrum: ["MSSA", "Streptococcus spp.", "嫌気性菌（横隔膜より上）", "MRSA（一部・CA-MRSA）"],
    dosing: {
      standard: { dose: "600mg IV / 300mg PO", route: "IV/PO", interval: "8時間毎" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "通常量", interval: "8時間毎（調整不要・肝代謝）" },
      ],
    },
    sideEffects: ["CDIリスク"],
    references: [{ id: "ref-cldm-1", title: "ダラシン添付文書", source: "添付文書" }],
  },

  // ===== フィダキソマイシン =====
  {
    id: "fdx",
    name: "フィダキソマイシン",
    genericName: "Fidaxomicin (FDX)",
    category: "マクロサイクリック系",
    route: "PO",
    description: "CDI治療の新標準。VCM POより再発率が低い。腸内フローラ温存効果",
    spectrum: ["Clostridioides difficile"],
    dosing: {
      standard: { dose: "200mg", route: "PO", interval: "12時間毎", duration: "10日間" },
      renalAdjustment: [
        { gfrRange: "全段階", gfrMin: 0, gfrMax: 999, dose: "200mg", interval: "12時間毎（調整不要）" },
      ],
    },
    references: [{ id: "ref-fdx-1", title: "ダフクリア添付文書", source: "添付文書" }, { id: "ref-fdx-2", title: "IDSA/SHEA CDI Guidelines 2021", source: "IDSA 2021" }],
  },

  // ===== コリスチン =====
  {
    id: "col",
    name: "コリスチン",
    genericName: "Colistin (CL)",
    category: "ポリミキシン系",
    route: "IV",
    description: "多剤耐性GNR（CRE, MDRAB）の最終兵器。腎毒性必発で他に選択肢がない時のみ",
    spectrum: ["多剤耐性グラム陰性菌（MDRAB, CRE）", "Pseudomonas aeruginosa（多剤耐性）", "Acinetobacter baumannii"],
    dosing: {
      standard: { dose: "CBA 2.5-5mg/kg/day", route: "IV", interval: "12時間毎", note: "Loading dose: CBA 5mg/kg" },
      renalAdjustment: [
        { gfrRange: "≥50", gfrMin: 50, gfrMax: 999, dose: "CBA 2.5-5mg/kg/day", interval: "12時間毎" },
        { gfrRange: "30-49", gfrMin: 30, gfrMax: 49, dose: "CBA 2.5mg/kg/day", interval: "12時間毎" },
        { gfrRange: "<30", gfrMin: 0, gfrMax: 29, dose: "CBA 1.5mg/kg/day", interval: "12-24時間毎" },
      ],
    },
    monitoring: ["腎毒性（必発）", "神経毒性"],
    references: [{ id: "ref-col-1", title: "オルドレブ添付文書", source: "添付文書" }],
  },
]
