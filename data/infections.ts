import { Infection } from "@/types"

export const infections: Infection[] = [
  // ===== 1. 市中肺炎 (CAP) =====
  {
    id: "cap",
    name: "市中肺炎",
    nameEn: "Community-Acquired Pneumonia (CAP)",
    category: "呼吸器",
    commonPathogens: [
      "Streptococcus pneumoniae（肺炎球菌）",
      "Haemophilus influenzae（インフルエンザ桿菌）",
      "Moraxella catarrhalis（モラクセラ・カタラーリス）",
      "Mycoplasma pneumoniae（マイコプラズマ）",
      "Chlamydophila pneumoniae（クラミドフィラ）",
      "Legionella pneumophila（レジオネラ）",
      "インフルエンザウイルス（二次感染）",
    ],
    empiricTherapy: {
      firstLine: [
        // 入院（非ICU）
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "24時間毎", duration: "5-7日間", note: "入院: + AZM併用" },
          referenceTag: "[IDSA/ATS 2019]",
          recommendationStrength: "Strong",
          evidenceLevel: "High",
        },
        {
          antibioticId: "azm",
          antibioticName: "アジスロマイシン",
          regimen: { dose: "500mg→250mg", route: "IV/PO", interval: "24時間毎", duration: "初日500mg, 2日目以降250mg（計5日間）", note: "非定型カバー併用" },
          referenceTag: "[IDSA/ATS 2019]",
        },
        // 外来（併存疾患なし）
        {
          antibioticId: "ampc",
          antibioticName: "アモキシシリン",
          regimen: { dose: "1g", route: "PO", interval: "8時間毎", duration: "5日間", note: "外来・併存疾患なし" },
          referenceTag: "[IDSA/ATS 2019]",
          recommendationStrength: "Strong",
          evidenceLevel: "Moderate",
        },
      ],
      alternatives: [
        // 外来代替
        {
          antibioticId: "doxy",
          antibioticName: "ドキシサイクリン",
          regimen: { dose: "100mg", route: "PO", interval: "12時間毎", duration: "5日間", note: "外来・マクロライド代替（非定型カバー）" },
          referenceTag: "[IDSA/ATS 2019]",
        },
        // 外来（併存疾患あり）
        {
          antibioticId: "ampc-cva",
          antibioticName: "アモキシシリン/クラブラン酸",
          regimen: { dose: "1錠", route: "PO", interval: "8時間毎", duration: "5日間", note: "外来・併存疾患あり: + AZMまたはDOXY併用" },
          referenceTag: "[IDSA/ATS 2019]",
        },
        {
          antibioticId: "lvfx",
          antibioticName: "レボフロキサシン",
          regimen: { dose: "500mg", route: "IV/PO", interval: "24時間毎", duration: "5-7日間", note: "呼吸器キノロン単剤" },
          referenceTag: "[IDSA/ATS 2019]",
          warningNote: "FQ温存推奨: 他の選択肢がある場合は使用を控える",
        },
        {
          antibioticId: "abpc-sbt",
          antibioticName: "アンピシリン/スルバクタム",
          regimen: { dose: "3g", route: "IV", interval: "6時間毎", duration: "5-7日間", note: "入院: + AZM併用" },
          referenceTag: "[JAID/JSC 2019]",
        },
      ],
    },
    escalation: {
      criteria: [
        "48-72時間で臨床的改善なし",
        "培養で耐性菌検出（PRSP, ESBL産生菌等）",
        "重症化（ICU入室、人工呼吸器管理）",
        "膿胸・肺膿瘍合併",
      ],
      options: [
        {
          antibioticId: "pipc-taz",
          antibioticName: "ピペラシリン/タゾバクタム",
          regimen: { dose: "4.5g", route: "IV", interval: "6時間毎" },
          referenceTag: "[IDSA/ATS 2019]",
        },
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "1g", route: "IV", interval: "8時間毎", note: "ESBL産生菌疑い・重症時" },
          referenceTag: "[IDSA/ATS 2019]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "培養結果で感受性が判明",
        "臨床的改善（解熱、CRP低下、呼吸状態改善）",
        "48-72時間の経過で安定",
      ],
      options: [
        {
          antibioticId: "ampc",
          antibioticName: "アモキシシリン",
          regimen: { dose: "500mg", route: "PO", interval: "8時間毎", note: "肺炎球菌感受性確認後" },
          referenceTag: "[IDSA/ATS 2019]",
        },
        {
          antibioticId: "ampc-cva",
          antibioticName: "アモキシシリン/クラブラン酸",
          regimen: { dose: "250mg/125mg", route: "PO", interval: "8時間毎" },
          referenceTag: "[JAID/JSC 2019]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "臨床的安定（解熱≥48時間、経口摂取可能、バイタル安定）",
        "治療期間5日間以上経過",
        "プロカルシトニン<0.25ng/mL（使用している場合）",
      ],
      typicalDuration: "5-7日間（最短5日間）",
    },
    notes: [
      "インフルエンザ流行期: ウイルス性肺炎に細菌性肺炎の合併を考慮。オセルタミビル＋抗菌薬の併用を検討",
      "外来治療は併存疾患の有無で治療戦略が異なる（COPD, 糖尿病, 心不全, 肝腎疾患等）",
    ],
    references: [
      { id: "cap-ref-1", title: "Metlay JP, et al. Diagnosis and Treatment of Adults with CAP. Am J Respir Crit Care Med. 2019;200(7):e45-e67", source: "IDSA/ATS 2019" },
      { id: "cap-ref-2", title: "JAID/JSC感染症治療ガイド2019 呼吸器感染症", source: "JAID/JSC 2019" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 2. 院内肺炎 (HAP/VAP) =====
  {
    id: "hap",
    name: "院内肺炎 / 人工呼吸器関連肺炎",
    nameEn: "Hospital-Acquired / Ventilator-Associated Pneumonia (HAP/VAP)",
    category: "呼吸器",
    commonPathogens: [
      "Pseudomonas aeruginosa（緑膿菌）",
      "MRSA（メチシリン耐性黄色ブドウ球菌）",
      "Klebsiella pneumoniae（肺炎桿菌）",
      "Acinetobacter baumannii（アシネトバクター）",
      "Enterobacter spp.（エンテロバクター属）",
      "E. coli（大腸菌・ESBL産生含む）",
      "Stenotrophomonas maltophilia（ステノトロホモナス）",
    ],
    empiricTherapy: {
      firstLine: [
        {
          antibioticId: "pipc-taz",
          antibioticName: "ピペラシリン/タゾバクタム",
          regimen: { dose: "4.5g", route: "IV", interval: "6時間毎" },
          referenceTag: "[IDSA/ATS 2016]",
        },
        {
          antibioticId: "vcm",
          antibioticName: "バンコマイシン",
          regimen: { dose: "15-20mg/kg", route: "IV", interval: "8-12時間毎", note: "MRSAリスク因子ある場合に追加" },
          referenceTag: "[IDSA/ATS 2016]",
        },
      ],
      alternatives: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "1g", route: "IV", interval: "8時間毎", note: "ESBL/耐性菌リスク高い場合" },
          referenceTag: "[IDSA/ATS 2016]",
        },
        {
          antibioticId: "cfpm",
          antibioticName: "セフェピム",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", note: "+ VCM" },
          referenceTag: "[IDSA/ATS 2016]",
        },
      ],
    },
    escalation: {
      criteria: [
        "48-72時間で改善なし",
        "多剤耐性菌（MDRAB, CRE等）検出",
        "敗血症性ショック合併",
        "MRSAリスク因子: MRSA既往、IV drug use、最近の抗菌薬使用、MRSA保菌",
      ],
      options: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", note: "高用量延長投与（3時間かけて投与）" },
          referenceTag: "[Sanford Guide]",
        },
        {
          antibioticId: "col",
          antibioticName: "コリスチン",
          regimen: { dose: "CBA 2.5-5mg/kg/day", route: "IV", interval: "12時間毎", note: "MDRABやCRE時" },
          referenceTag: "[IDSA/ATS 2016]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "培養結果判明後48-72時間で積極的にde-escalation",
        "MRSA培養陰性→VCM中止",
        "感受性に基づき狭域スペクトラムへ",
      ],
      options: [
        {
          antibioticId: "cez",
          antibioticName: "セファゾリン",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", note: "MSSA確認後" },
          referenceTag: "[IDSA/ATS 2016]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "治療期間7日間を目安",
        "臨床的改善（解熱、白血球正常化、酸素需要減少）",
        "プロカルシトニンガイド下で短縮可能",
      ],
      typicalDuration: "7日間",
    },
    notes: [
      "VAP: 多剤耐性GNRリスクがある場合、二剤GNRカバー（例: MEPM + CPFX or AMK）を考慮",
      "アミノグリコシド単剤はHAP/VAPの治療として不適切（単剤使用不可）",
      "MRSAリスク層別化: リスク因子なし＋MRSA保菌陰性ならVCM不要",
    ],
    references: [
      { id: "hap-ref-1", title: "Kalil AC, et al. Management of Adults With HAP and VAP. Clin Infect Dis. 2016;63(5):e61-e111", source: "IDSA/ATS 2016" },
      { id: "hap-ref-2", title: "日本版敗血症診療ガイドライン J-SSCG 2024", source: "J-SSCG 2024" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 3. 尿路感染症 =====
  {
    id: "uti",
    name: "尿路感染症",
    nameEn: "Urinary Tract Infection (UTI)",
    category: "尿路",
    commonPathogens: [
      "E. coli（大腸菌・最多70-95%）",
      "Klebsiella pneumoniae（肺炎桿菌）",
      "Proteus mirabilis（プロテウス・ミラビリス）",
      "Enterococcus faecalis（腸球菌）",
      "Staphylococcus saprophyticus（腐性ブドウ球菌・若年女性）",
      "Pseudomonas aeruginosa（緑膿菌・複雑性）",
    ],
    empiricTherapy: {
      firstLine: [
        // 単純性膀胱炎
        {
          antibioticId: "fosfomycin",
          antibioticName: "ホスホマイシン",
          regimen: { dose: "3g", route: "PO", interval: "単回投与", duration: "単回", note: "単純性膀胱炎・第一選択" },
          referenceTag: "[IDSA 2011]",
          recommendationStrength: "Strong",
          evidenceLevel: "Moderate",
        },
        // 腎盂腎炎・複雑性
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "1-2g", route: "IV", interval: "24時間毎", duration: "7-14日間", note: "複雑性・腎盂腎炎" },
          referenceTag: "[IDSA 2010]",
        },
      ],
      alternatives: [
        {
          antibioticId: "lvfx",
          antibioticName: "レボフロキサシン",
          regimen: { dose: "500mg", route: "IV/PO", interval: "24時間毎", duration: "5-7日間", note: "軽症・経口可能な場合" },
          referenceTag: "[IDSA 2010]",
          warningNote: "FQ温存推奨: 単純性膀胱炎でのFQ使用は可能な限り避ける（耐性誘導・CDIリスク）",
        },
        {
          antibioticId: "abpc-sbt",
          antibioticName: "アンピシリン/スルバクタム",
          regimen: { dose: "3g", route: "IV", interval: "6時間毎", note: "Enterococcus疑い" },
          referenceTag: "[JAID/JSC 2019]",
        },
      ],
    },
    escalation: {
      criteria: [
        "48-72時間で改善なし",
        "ESBL産生菌検出",
        "敗血症合併",
        "閉塞性尿路感染（ドレナージが必要）",
      ],
      options: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "1g", route: "IV", interval: "8時間毎", note: "ESBL産生菌" },
          referenceTag: "[IDSA 2010]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "培養感受性結果に基づきスイッチ",
        "臨床的改善後に経口薬へ変更",
        "解熱48時間後に経口スイッチ可能",
      ],
      options: [
        {
          antibioticId: "lvfx",
          antibioticName: "レボフロキサシン",
          regimen: { dose: "500mg", route: "PO", interval: "24時間毎", note: "感受性確認後" },
          referenceTag: "[IDSA 2010]",
        },
        {
          antibioticId: "ampc-cva",
          antibioticName: "アモキシシリン/クラブラン酸",
          regimen: { dose: "250mg/125mg", route: "PO", interval: "8時間毎" },
          referenceTag: "[JAID/JSC 2019]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "単純性膀胱炎: 3日間で十分",
        "腎盂腎炎: 臨床的改善＋解熱",
        "複雑性: 原因除去（カテーテル抜去、閉塞解除）後",
      ],
      typicalDuration: "単純性膀胱炎3日間 / 腎盂腎炎7-14日間 / 複雑性10-14日間",
    },
    notes: [
      "単純性膀胱炎第一選択: ホスホマイシン3g単回、ST合剤3日間、ニトロフラントイン5日間（日本未発売）",
      "無症候性細菌尿は妊婦・泌尿器科手術前以外は治療不要",
      "FQは単純性膀胱炎には原則使用しない（IDSA: FQは他に選択肢がない場合に限定）",
      "複雑性UTI: カテーテル関連の場合はカテーテル交換/抜去が重要",
    ],
    references: [
      { id: "uti-ref-1", title: "Gupta K, et al. International Clinical Practice Guidelines for UTI. Clin Infect Dis. 2011;52(5):e103-e120", source: "IDSA 2011" },
      { id: "uti-ref-2", title: "JAID/JSC感染症治療ガイド2019 尿路感染症", source: "JAID/JSC 2019" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 4. 皮膚軟部組織感染症 =====
  {
    id: "ssti",
    name: "皮膚軟部組織感染症",
    nameEn: "Skin and Soft Tissue Infection (SSTI)",
    category: "皮膚・軟部組織",
    commonPathogens: [
      "Streptococcus pyogenes（A群溶血性連鎖球菌・GAS）",
      "Staphylococcus aureus（黄色ブドウ球菌・MSSA/MRSA）",
      "嫌気性菌（壊死性筋膜炎）",
      "グラム陰性桿菌（糖尿病足感染）",
    ],
    empiricTherapy: {
      firstLine: [
        // 非膿瘍性（蜂窩織炎・丹毒）
        {
          antibioticId: "cez",
          antibioticName: "セファゾリン",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", duration: "5-7日間", note: "非膿瘍性（蜂窩織炎）: GAS/MSSA カバー" },
          referenceTag: "[IDSA 2014]",
        },
      ],
      alternatives: [
        // 膿瘍性（MRSA考慮）
        {
          antibioticId: "vcm",
          antibioticName: "バンコマイシン",
          regimen: { dose: "15-20mg/kg", route: "IV", interval: "8-12時間毎", note: "膿瘍性・MRSA疑い（切開排膿 + 抗菌薬）" },
          referenceTag: "[IDSA 2014]",
        },
        {
          antibioticId: "cephalexin",
          antibioticName: "セファレキシン",
          regimen: { dose: "500mg", route: "PO", interval: "6時間毎", duration: "5-7日間", note: "軽症蜂窩織炎（外来治療）" },
          referenceTag: "[IDSA 2014]",
        },
      ],
    },
    escalation: {
      criteria: [
        "壊死性筋膜炎が疑われる（急速進行、激痛、皮膚壊死、クレピタス）",
        "48時間で改善なし",
        "敗血症合併",
      ],
      options: [
        {
          antibioticId: "pipc-taz",
          antibioticName: "ピペラシリン/タゾバクタム",
          regimen: { dose: "4.5g", route: "IV", interval: "6時間毎", note: "壊死性筋膜炎: + VCM + CLDM" },
          referenceTag: "[IDSA 2014]",
        },
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "1g", route: "IV", interval: "8時間毎", note: "壊死性筋膜炎: + VCM + CLDM" },
          referenceTag: "[IDSA 2014]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "培養結果に基づき狭域化",
        "MSSA確認→CEZ、経口可能→セファレキシン",
        "臨床的改善後に経口スイッチ",
      ],
      options: [
        {
          antibioticId: "cephalexin",
          antibioticName: "セファレキシン",
          regimen: { dose: "500mg", route: "PO", interval: "6時間毎" },
          referenceTag: "[IDSA 2014]",
        },
        {
          antibioticId: "st",
          antibioticName: "ST合剤",
          regimen: { dose: "TMP 160mg/SMX 800mg", route: "PO", interval: "12時間毎", note: "MRSA SSTI（膿瘍ドレナージ後）" },
          referenceTag: "[IDSA 2014]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "臨床的改善（発赤縮小、解熱、疼痛軽減）",
        "壊死性筋膜炎: 全てのデブリードマン完了＋全身状態安定",
      ],
      typicalDuration: "蜂窩織炎5-7日間 / 壊死性筋膜炎はソースコントロール次第",
    },
    notes: [
      "【重要】壊死性筋膜炎は外科的緊急（surgical emergency）。抗菌薬より緊急デブリードマンが最優先",
      "膿瘍性 vs 非膿瘍性で治療戦略が異なる。膿瘍性は切開排膿が第一",
      "CLDM追加の理由: 毒素産生抑制（GAS, MSSA）",
      "日本ではCA-MRSAの割合は欧米より低い（5-10%程度）が、膿瘍・再発例では考慮",
    ],
    references: [
      { id: "ssti-ref-1", title: "Stevens DL, et al. Practice Guidelines for SSTI. Clin Infect Dis. 2014;59(2):e10-e52", source: "IDSA 2014" },
      { id: "ssti-ref-2", title: "JAID/JSC感染症治療ガイド2019 皮膚軟部組織感染症", source: "JAID/JSC 2019" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 5. 腹腔内感染症 =====
  {
    id: "iai",
    name: "腹腔内感染症",
    nameEn: "Intra-Abdominal Infection (IAI)",
    category: "腹腔内",
    commonPathogens: [
      "E. coli（大腸菌）",
      "Klebsiella spp.（クレブシエラ属）",
      "Bacteroides fragilis（バクテロイデス・フラジリス）",
      "Enterococcus spp.（腸球菌属）",
      "Streptococcus spp.（連鎖球菌属）",
      "Pseudomonas aeruginosa（緑膿菌・院内発症）",
    ],
    empiricTherapy: {
      firstLine: [
        {
          antibioticId: "abpc-sbt",
          antibioticName: "アンピシリン/スルバクタム",
          regimen: { dose: "3g", route: "IV", interval: "6時間毎", note: "軽症〜中等症・市中発症" },
          referenceTag: "[SIS/IDSA 2010]",
          warningNote: "E.coli耐性率上昇に注意: 地域の感受性パターンを確認。耐性率>20%なら代替薬を考慮",
        },
      ],
      alternatives: [
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "24時間毎", note: "+ メトロニダゾール 500mg q8h" },
          referenceTag: "[SIS/IDSA 2010]",
        },
        {
          antibioticId: "pipc-taz",
          antibioticName: "ピペラシリン/タゾバクタム",
          regimen: { dose: "4.5g", route: "IV", interval: "6時間毎", note: "中等症〜重症" },
          referenceTag: "[SIS/IDSA 2010]",
        },
      ],
    },
    escalation: {
      criteria: [
        "ソースコントロール不十分",
        "院内発症（耐性菌リスク高）",
        "ESBL産生菌・Pseudomonas検出",
        "敗血症性ショック",
      ],
      options: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "1g", route: "IV", interval: "8時間毎" },
          referenceTag: "[SIS/IDSA 2010]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "ソースコントロール成功後",
        "培養結果に基づき狭域化",
        "臨床的改善",
      ],
      options: [
        {
          antibioticId: "ampc-cva",
          antibioticName: "アモキシシリン/クラブラン酸",
          regimen: { dose: "250mg/125mg", route: "PO", interval: "8時間毎", note: "経口スイッチ" },
          referenceTag: "[SIS/IDSA 2010]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "ソースコントロール成功＋臨床的改善",
        "解熱、白血球正常化、経口摂取再開",
        "STOP-IT trial: ソースコントロール後4日間で十分（従来の長期投与と差なし）",
      ],
      typicalDuration: "ソースコントロール後4日間（STOP-IT trial）",
    },
    notes: [
      "ソースコントロール（ドレナージ・手術）が最重要。抗菌薬のみでは治癒困難",
      "重症度層別化: 軽症市中発症→ABPC/SBT、重症/院内発症→PIPC/TAZ or MEPM",
      "MRSAリスク（最近の入院・抗菌薬使用）がある場合はVCM追加を考慮",
      "Candidaリスク（免疫不全、長期抗菌薬、上部消化管穿孔）がある場合は抗真菌薬追加を考慮",
    ],
    references: [
      { id: "iai-ref-1", title: "Solomkin JS, et al. Diagnosis and Management of Complicated IAI. Clin Infect Dis. 2010;50(2):133-164", source: "SIS/IDSA 2010" },
      { id: "iai-ref-2", title: "Sawyer RG, et al. Trial of Short-Course Antimicrobial Therapy for IAI (STOP-IT). N Engl J Med. 2015;372(21):1996-2005", source: "NEJM 2015" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 6. 血流感染症（菌血症） =====
  {
    id: "bsi",
    name: "血流感染症（菌血症）",
    nameEn: "Bloodstream Infection (BSI)",
    category: "血流",
    commonPathogens: [
      "E. coli（大腸菌）",
      "Staphylococcus aureus（黄色ブドウ球菌・MSSA/MRSA）",
      "Klebsiella pneumoniae（肺炎桿菌）",
      "Enterococcus spp.（腸球菌属）",
      "Streptococcus spp.（連鎖球菌属）",
      "Pseudomonas aeruginosa（緑膿菌）",
      "Candida spp.（カンジダ属・カテーテル関連）",
    ],
    empiricTherapy: {
      firstLine: [
        {
          antibioticId: "pipc-taz",
          antibioticName: "ピペラシリン/タゾバクタム",
          regimen: { dose: "4.5g", route: "IV", interval: "6時間毎" },
          referenceTag: "[J-SSCG 2024]",
        },
        {
          antibioticId: "vcm",
          antibioticName: "バンコマイシン",
          regimen: { dose: "15-20mg/kg", route: "IV", interval: "8-12時間毎", note: "MRSA/腸球菌カバーが必要な場合" },
          referenceTag: "[J-SSCG 2024]",
        },
      ],
      alternatives: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "1g", route: "IV", interval: "8時間毎", note: "重症・耐性菌リスク" },
          referenceTag: "[J-SSCG 2024]",
        },
      ],
    },
    escalation: {
      criteria: [
        "敗血症性ショック",
        "持続菌血症（フォローアップ血培陽性）",
        "多剤耐性菌検出",
        "感染性心内膜炎合併疑い",
      ],
      options: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "1-2g", route: "IV", interval: "8時間毎" },
          referenceTag: "[J-SSCG 2024]",
        },
        {
          antibioticId: "dap",
          antibioticName: "ダプトマイシン",
          regimen: { dose: "8-10mg/kg", route: "IV", interval: "24時間毎", note: "MRSA菌血症でVCM効果不十分時" },
          referenceTag: "[IDSA 2011]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "血培結果判明後は速やかにde-escalation",
        "フォローアップ血培陰性確認",
        "感染源コントロール確認",
      ],
      options: [
        {
          antibioticId: "cez",
          antibioticName: "セファゾリン",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", note: "MSSA菌血症" },
          referenceTag: "[IDSA 2011]",
        },
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "24時間毎", note: "感受性GNR" },
          referenceTag: "[Sanford Guide]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "感染源除去（カテーテル抜去等）",
        "フォローアップ血培陰性",
        "解熱＋臨床的改善",
      ],
      typicalDuration: "非複雑性GNR 7日間 / S. aureus菌血症 最低14日間（心内膜炎除外後）/ カテーテル関連 抜去後7-14日間",
    },
    notes: [
      "S. aureus菌血症は必ず心エコーで心内膜炎を除外",
      "フォローアップ血培（48-72時間後）は必須",
      "カテーテル関連BSIは可能な限りカテーテル抜去",
    ],
    references: [
      { id: "bsi-ref-1", title: "日本版敗血症診療ガイドライン J-SSCG 2024", source: "J-SSCG 2024" },
      { id: "bsi-ref-2", title: "Liu C, et al. MRSA Guidelines. Clin Infect Dis. 2011;52(3):e18-e55", source: "IDSA 2011" },
      { id: "bsi-ref-3", title: "Mermel LA, et al. IDSA Guidelines for Intravascular Catheter-Related Infection. Clin Infect Dis. 2009;49(1):1-45", source: "IDSA 2009" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 7. 感染性心内膜炎 =====
  {
    id: "ie",
    name: "感染性心内膜炎",
    nameEn: "Infective Endocarditis (IE)",
    category: "心血管",
    commonPathogens: [
      "Staphylococcus aureus（黄色ブドウ球菌・最多）",
      "Streptococcus viridans group（緑色連鎖球菌群）",
      "Enterococcus faecalis（腸球菌）",
      "HACEK group（ハチェック群）",
      "Coagulase-negative Staphylococci（コアグラーゼ陰性ブドウ球菌・人工弁）",
    ],
    empiricTherapy: {
      firstLine: [
        {
          antibioticId: "vcm",
          antibioticName: "バンコマイシン",
          regimen: { dose: "15-20mg/kg", route: "IV", interval: "8-12時間毎" },
          referenceTag: "[AHA 2015]",
        },
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "12時間毎", note: "自己弁で安定している場合" },
          referenceTag: "[AHA 2015]",
        },
      ],
      alternatives: [
        {
          antibioticId: "dap",
          antibioticName: "ダプトマイシン",
          regimen: { dose: "8-10mg/kg", route: "IV", interval: "24時間毎", note: "VCM不耐・MRSAでMIC>1" },
          referenceTag: "[AHA 2015]",
        },
      ],
    },
    escalation: {
      criteria: [
        "持続菌血症（7日以上）",
        "心不全の増悪（弁破壊）",
        "塞栓症の反復",
        "人工弁心内膜炎",
      ],
      options: [
        {
          antibioticId: "dap",
          antibioticName: "ダプトマイシン",
          regimen: { dose: "10mg/kg", route: "IV", interval: "24時間毎", note: "VCMからのスイッチ" },
          referenceTag: "[AHA 2015]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "血培結果に基づく標的治療への変更",
        "Viridans group Strep→PCN感受性に応じた選択",
        "MSSA→CEZ（VCMより予後良好）",
        "E. faecalis→ABPC + CTRX（腎毒性回避）",
      ],
      options: [
        {
          antibioticId: "cez",
          antibioticName: "セファゾリン",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", note: "MSSA IE: 6週間。VCMより優先", duration: "6週間" },
          referenceTag: "[AHA 2015]",
          recommendationStrength: "Strong",
          evidenceLevel: "Moderate",
        },
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "24時間毎", note: "Viridans Strep（PCN MIC≤0.12）: 4週間", duration: "4週間" },
          referenceTag: "[AHA 2015]",
        },
        {
          antibioticId: "abpc",
          antibioticName: "アンピシリン",
          regimen: { dose: "2g", route: "IV", interval: "4時間毎", note: "E. faecalis IE: + CTRX 2g q12h（6週間）。ゲンタマイシン不要で腎毒性回避", duration: "6週間" },
          referenceTag: "[ESC 2023]",
        },
        {
          antibioticId: "pcg",
          antibioticName: "ペニシリンG",
          regimen: { dose: "1800-2400万単位/日", route: "IV", interval: "持続投与 or 4時間毎", note: "Viridans Strep（PCN高度感受性）: 4週間", duration: "4週間" },
          referenceTag: "[AHA 2015]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "所定の治療期間を完遂",
        "フォローアップ血培持続陰性",
        "臨床的安定",
      ],
      typicalDuration: "自己弁4-6週間 / 人工弁6週間以上",
    },
    notes: [
      "手術適応: 心不全、コントロール不良な感染、塞栓予防（大きな疣贅）",
      "MSSA IEではCEZがVCMより予後良好（必ずCEZへde-escalation）",
      "E. faecalis IE: ABPC + CTRX が標準治療（ESC 2023推奨。ゲンタマイシン併用の腎毒性を回避）",
      "Viridans strep: PCN MIC ≤0.12→PCG or CTRX 4週間、MIC 0.12-0.5→PCG + GM 2週間 + CTRX 4週間",
    ],
    references: [
      { id: "ie-ref-1", title: "Baddour LM, et al. AHA Scientific Statement on IE. Circulation. 2015;132(15):1435-1486", source: "AHA 2015" },
      { id: "ie-ref-2", title: "Delgado V, et al. 2023 ESC Guidelines for the management of endocarditis. Eur Heart J. 2023;44(39):3948-4042", source: "ESC 2023" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 8. 細菌性髄膜炎 =====
  {
    id: "meningitis",
    name: "細菌性髄膜炎",
    nameEn: "Bacterial Meningitis",
    category: "中枢神経",
    commonPathogens: [
      "Streptococcus pneumoniae（肺炎球菌・成人最多）",
      "Neisseria meningitidis（髄膜炎菌）",
      "Listeria monocytogenes（リステリア・高齢者/免疫不全）",
      "Haemophilus influenzae type b（インフルエンザ桿菌b型）",
      "Group B Streptococcus（B群連鎖球菌・新生児）",
    ],
    empiricTherapy: {
      firstLine: [
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "12時間毎" },
          referenceTag: "[IDSA 2004]",
        },
        {
          antibioticId: "vcm",
          antibioticName: "バンコマイシン",
          regimen: { dose: "15-20mg/kg", route: "IV", interval: "8-12時間毎", note: "PRSP カバー" },
          referenceTag: "[IDSA 2004]",
        },
        {
          antibioticId: "abpc",
          antibioticName: "アンピシリン",
          regimen: { dose: "2g", route: "IV", interval: "4時間毎", note: "50歳以上・免疫不全（Listeria カバー）" },
          referenceTag: "[IDSA 2004]",
        },
      ],
      alternatives: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", note: "セフェムアレルギー時" },
          referenceTag: "[IDSA 2004]",
        },
      ],
    },
    escalation: {
      criteria: [
        "48時間で臨床的改善なし",
        "髄液培養で耐性菌",
        "脳膿瘍・硬膜下膿瘍合併",
      ],
      options: [
        {
          antibioticId: "mepm",
          antibioticName: "メロペネム",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎" },
          referenceTag: "[IDSA 2004]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "髄液培養・感受性結果に基づく",
        "肺炎球菌: PCN MIC ≤0.06→PCG or ABPC（VCM中止可）",
        "肺炎球菌: PCN MIC 0.12-1.0→CTRX継続（VCM中止可、CTX MIC≤0.5の場合）",
        "肺炎球菌: PCN MIC ≥2.0→VCM + CTRX継続",
        "髄膜炎菌→CTRX単剤 or PCG",
      ],
      options: [
        {
          antibioticId: "pcg",
          antibioticName: "ペニシリンG",
          regimen: { dose: "2400万単位/日", route: "IV", interval: "4時間毎分割", note: "肺炎球菌（PCN MIC≤0.06）" },
          referenceTag: "[IDSA 2004]",
        },
        {
          antibioticId: "abpc",
          antibioticName: "アンピシリン",
          regimen: { dose: "2g", route: "IV", interval: "4時間毎", note: "ペニシリン感受性肺炎球菌 or Listeria" },
          referenceTag: "[IDSA 2004]",
        },
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "12時間毎", note: "髄膜炎菌 or 肺炎球菌（PCN中等度耐性）" },
          referenceTag: "[IDSA 2004]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "所定の治療期間を完遂",
        "臨床的改善",
        "髄液所見の正常化は必須ではない",
      ],
      typicalDuration: "髄膜炎菌7日間 / 肺炎球菌10-14日間 / Listeria 21日間以上 / GBS 14-21日間",
    },
    notes: [
      "【重要】デキサメタゾン 0.15mg/kg q6h × 4日間を抗菌薬初回投与の直前または同時に開始（肺炎球菌疑い）。予後改善のエビデンスあり",
      "治療開始前の髄液検査が最重要だが、検査のために抗菌薬投与を遅らせてはならない（30分以内に投与）",
      "年齢別カバー: 50歳以上・免疫不全ではListeria カバー（ABPC追加）が必須",
      "PCN MICに基づくde-escalationが重要（MIC≤0.06: PCG可、MIC 0.12-1.0: CTRX継続、MIC≥2.0: VCM+CTRX）",
    ],
    references: [
      { id: "men-ref-1", title: "Tunkel AR, et al. Practice Guidelines for Bacterial Meningitis. Clin Infect Dis. 2004;39(9):1267-1284", source: "IDSA 2004" },
      { id: "men-ref-2", title: "van de Beek D, et al. Clinical Features and Prognostic Factors in Adults with Bacterial Meningitis. N Engl J Med. 2004;351(18):1849-1859", source: "NEJM 2004" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 9. 骨・関節感染症 =====
  {
    id: "bji",
    name: "骨・関節感染症",
    nameEn: "Bone and Joint Infection",
    category: "骨・関節",
    commonPathogens: [
      "Staphylococcus aureus（黄色ブドウ球菌・最多）",
      "Coagulase-negative Staphylococci（コアグラーゼ陰性ブドウ球菌・人工関節）",
      "Streptococcus spp.（連鎖球菌属）",
      "E. coli（大腸菌）",
      "Pseudomonas aeruginosa（緑膿菌・IV drug user）",
    ],
    empiricTherapy: {
      firstLine: [
        {
          antibioticId: "cez",
          antibioticName: "セファゾリン",
          regimen: { dose: "2g", route: "IV", interval: "8時間毎", note: "MSSA疑い" },
          referenceTag: "[IDSA 2015]",
        },
        {
          antibioticId: "vcm",
          antibioticName: "バンコマイシン",
          regimen: { dose: "15-20mg/kg", route: "IV", interval: "8-12時間毎", note: "MRSAリスク" },
          referenceTag: "[IDSA 2015]",
        },
      ],
      alternatives: [
        {
          antibioticId: "ctr",
          antibioticName: "セフトリアキソン",
          regimen: { dose: "2g", route: "IV", interval: "24時間毎", note: "GNR疑い" },
          referenceTag: "[IDSA 2015]",
        },
      ],
    },
    escalation: {
      criteria: [
        "培養で耐性菌検出",
        "治療反応不良",
        "人工関節感染（バイオフィルム形成）",
      ],
      options: [
        {
          antibioticId: "dap",
          antibioticName: "ダプトマイシン",
          regimen: { dose: "8-10mg/kg", route: "IV", interval: "24時間毎", note: "MRSA骨髄炎" },
          referenceTag: "[IDSA 2015]",
        },
        {
          antibioticId: "lzd",
          antibioticName: "リネゾリド",
          regimen: { dose: "600mg", route: "IV/PO", interval: "12時間毎", note: "経口スイッチ可能" },
          referenceTag: "[IDSA 2015]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "培養感受性に基づく",
        "臨床的改善後に経口スイッチ（OVIVA trial）",
      ],
      options: [
        {
          antibioticId: "cephalexin",
          antibioticName: "セファレキシン",
          regimen: { dose: "500mg", route: "PO", interval: "6時間毎", note: "MSSA, 経口スイッチ" },
          referenceTag: "[OVIVA trial]",
        },
        {
          antibioticId: "lvfx",
          antibioticName: "レボフロキサシン",
          regimen: { dose: "500mg", route: "PO", interval: "24時間毎", note: "GNR, 骨移行性良好" },
          referenceTag: "[IDSA 2015]",
        },
      ],
    },
    discontinuation: {
      criteria: [
        "所定の治療期間を完遂",
        "CRP・ESR改善傾向",
        "臨床的改善",
      ],
      typicalDuration: "化膿性関節炎2-4週間 / 骨髄炎6週間 / 人工関節感染6週間-3ヶ月",
    },
    notes: [
      "OVIVA trial: 骨・関節感染症で早期経口スイッチ（1週間IV後）は静注継続と非劣性",
      "人工関節感染では外科的介入（デブリードマン、入替え）が重要",
    ],
    references: [
      { id: "bji-ref-1", title: "Osmon DR, et al. IDSA Guidelines for Prosthetic Joint Infection. Clin Infect Dis. 2013;56(1):e1-e25", source: "IDSA 2015" },
      { id: "bji-ref-2", title: "Li HK, et al. Oral versus IV Antibiotics for Bone and Joint Infection (OVIVA). N Engl J Med. 2019;380(5):425-436", source: "OVIVA/NEJM 2019" },
    ],
    lastReviewed: "2026-05-22",
  },

  // ===== 10. CDI =====
  {
    id: "cdi",
    name: "Clostridioides difficile感染症",
    nameEn: "Clostridioides difficile Infection (CDI)",
    category: "消化管",
    commonPathogens: [
      "Clostridioides difficile（クロストリディオイデス・ディフィシル）",
    ],
    empiricTherapy: {
      firstLine: [
        {
          antibioticId: "fdx",
          antibioticName: "フィダキソマイシン",
          regimen: { dose: "200mg", route: "PO", interval: "12時間毎", duration: "10日間", note: "初発・再発ともに第一選択" },
          referenceTag: "[IDSA/SHEA 2021]",
        },
      ],
      alternatives: [
        {
          antibioticId: "vcm-po",
          antibioticName: "バンコマイシン（経口）",
          regimen: { dose: "125mg", route: "PO", interval: "6時間毎", duration: "10日間" },
          referenceTag: "[IDSA/SHEA 2021]",
        },
      ],
    },
    escalation: {
      criteria: [
        "劇症型CDI（低血圧、イレウス、巨大結腸症）",
        "白血球≥15,000、Cr上昇",
        "経口投与不能",
        "劇症型は外科コンサルト必須（大腸全摘の適応評価）",
      ],
      options: [
        {
          antibioticId: "vcm-po",
          antibioticName: "バンコマイシン（経口/経管 + 注腸）",
          regimen: { dose: "500mg", route: "PO", interval: "6時間毎", note: "劇症型: 経口/経管 500mg q6h + 注腸 500mg/100mL NS q6h + MNZ IV" },
          referenceTag: "[IDSA/SHEA 2021]",
        },
        {
          antibioticId: "mtz",
          antibioticName: "メトロニダゾール",
          regimen: { dose: "500mg", route: "IV", interval: "8時間毎", note: "劇症型でVCM経口に追加（必須）" },
          referenceTag: "[IDSA/SHEA 2021]",
        },
      ],
    },
    deescalation: {
      criteria: [
        "CDIではde-escalationの概念は一般的ではない",
        "原因となった抗菌薬の中止が最重要",
      ],
      options: [],
    },
    discontinuation: {
      criteria: [
        "下痢の改善（形のある便に回復）",
        "10日間の治療完遂",
        "治癒判定にCDトキシン再検は不要",
      ],
      typicalDuration: "10日間（初発）/ 再発はテーパリング/パルス療法",
    },
    notes: [
      "原因抗菌薬の中止が最も重要な治療介入",
      "FDXは劇症型CDIに対するエビデンスが限定的。劇症型ではVCM高用量（経口+注腸）+ MNZ IVが標準",
      "再発パスウェイ: 1回目再発→FDX（extended-pulsed: 200mg q12h 5日→200mg 1日おき20日間）",
      "2回目以降再発→ベズロトキスマブ（抗トキシンB抗体）の追加を考慮",
      "3回以上再発→糞便微生物移植（FMT）を考慮",
      "検査陽性でも無症候性であれば治療不要（保菌）",
    ],
    references: [
      { id: "cdi-ref-1", title: "Johnson S, et al. Clinical Practice Guideline by IDSA and SHEA: 2021 Focused Update on CDI in Adults. Clin Infect Dis. 2021;73(5):e1029-e1044", source: "IDSA/SHEA 2021" },
      { id: "cdi-ref-2", title: "McDonald LC, et al. Clinical Practice Guidelines for CDI. Clin Infect Dis. 2018;66(7):e1-e48", source: "IDSA/SHEA 2018" },
    ],
    lastReviewed: "2026-05-22",
  },
]
