import { PatternCategory } from '../../patterns/enums/pattern-category.enum'
import { PATTERN_GLOSSES_2 } from './pattern-glossary-2'

/**
 * What each template does to the meaning of its root. This is the payload of
 * root-based learning: once a learner knows that مَفْعَل marks a place, every
 * unseen word on that template becomes half-guessable.
 *
 * Example words are all built on ك-ت-ب (writing) where the template allows it,
 * so the learner compares templates against one familiar root.
 */
export interface PatternGloss {
  wazn: string
  category: PatternCategory
  uz: string
  ru: string
  en: string
  exampleWord?: string
  exampleMeaning?: string
}

const PATTERN_GLOSSES_1: readonly PatternGloss[] = [
  // ── participles ────────────────────────────────────────────────
  {
    wazn: 'فاعِل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'Ishni bajaruvchi: “yozuvchi”',
    ru: 'Действующее лицо: «пишущий»',
    en: 'The one doing the action: “writer”',
    exampleWord: 'كاتِب',
    exampleMeaning: 'yozuvchi, kotib'
  },
  {
    wazn: 'فاعِلَة',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'Bajaruvchining ayol shakli yoki mavhum ot',
    ru: 'Женская форма действующего лица',
    en: 'Feminine active participle',
    exampleWord: 'كاتِبَة',
    exampleMeaning: 'yozuvchi (ayol)'
  },
  {
    wazn: 'مَفْعُول',
    category: PatternCategory.PASSIVE_PARTICIPLE,
    uz: 'Ish bajarilgan narsa: “yozilgan”',
    ru: 'Объект действия: «написанный»',
    en: 'The thing acted upon: “written”',
    exampleWord: 'مَكْتُوب',
    exampleMeaning: 'yozilgan, maktub'
  },
  {
    wazn: 'مُفْعِل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'IV bob bajaruvchisi: “imon keltiruvchi”',
    ru: 'Действующее лицо IV породы',
    en: 'Form IV active participle',
    exampleWord: 'مُؤْمِن',
    exampleMeaning: 'mo‘min, imon keltiruvchi'
  },
  {
    wazn: 'مُفْعَل',
    category: PatternCategory.PASSIVE_PARTICIPLE,
    uz: 'IV bob obyekti: “yuborilgan”',
    ru: 'Объект действия IV породы',
    en: 'Form IV passive participle',
    exampleWord: 'مُرْسَل',
    exampleMeaning: 'yuborilgan'
  },
  {
    wazn: 'مُفَعِّل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'II bob bajaruvchisi: “tasdiqlovchi”',
    ru: 'Действующее лицо II породы',
    en: 'Form II active participle',
    exampleWord: 'مُصَدِّق',
    exampleMeaning: 'tasdiqlovchi'
  },
  {
    wazn: 'مُتَفَعِّل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'V bob bajaruvchisi: “kibrlanuvchi”',
    ru: 'Действующее лицо V породы',
    en: 'Form V active participle',
    exampleWord: 'مُتَكَبِّر',
    exampleMeaning: 'kibrlanuvchi'
  },
  {
    wazn: 'مُفْتَعِل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'VIII bob bajaruvchisi',
    ru: 'Действующее лицо VIII породы',
    en: 'Form VIII active participle',
    exampleWord: 'مُفْتَرِي',
    exampleMeaning: 'to‘qib chiqaruvchi'
  },
  {
    wazn: 'مُسْتَفْعِل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'X bob bajaruvchisi: “to‘g‘ri turuvchi”',
    ru: 'Действующее лицо X породы',
    en: 'Form X active participle',
    exampleWord: 'مُسْتَقِيم',
    exampleMeaning: 'to‘g‘ri, mustaqim'
  },

  // ── adjectives and intensives ─────────────────────────────────
  {
    wazn: 'فَعِيل',
    category: PatternCategory.ADJECTIVE,
    uz: 'Barqaror sifat: “bilimdon”, “mehribon”',
    ru: 'Устойчивое качество: «знающий»',
    en: 'A lasting quality: “knowing”, “merciful”',
    exampleWord: 'عَلِيم',
    exampleMeaning: 'bilguvchi, alim'
  },
  {
    wazn: 'فَعُول',
    category: PatternCategory.INTENSIVE,
    uz: 'Kuchaytirilgan sifat: “ko‘p kechiruvchi”',
    ru: 'Усиленное качество: «много прощающий»',
    en: 'Intensified quality: “much-forgiving”',
    exampleWord: 'غَفُور',
    exampleMeaning: 'mag‘firat qiluvchi'
  },
  {
    wazn: 'فَعّال',
    category: PatternCategory.INTENSIVE,
    uz: 'Kuchli mubolag‘a: “doim qiluvchi”',
    ru: 'Сильное усиление: «постоянно делающий»',
    en: 'Strong intensive: “constantly doing”',
    exampleWord: 'غَفّار',
    exampleMeaning: 'juda ko‘p kechiruvchi'
  },
  {
    wazn: 'فَعْلان',
    category: PatternCategory.ADJECTIVE,
    uz: 'O‘tkinchi holat: “och”, “xursand”',
    ru: 'Временное состояние',
    en: 'A temporary state',
    exampleWord: 'رَحْمٰن',
    exampleMeaning: 'Rahmon'
  },
  {
    wazn: 'أَفْعَل',
    category: PatternCategory.COMPARATIVE,
    uz: 'Qiyoslash yoki ustunlik: “kattaroq”, “eng katta”',
    ru: 'Сравнительная и превосходная степень',
    en: 'Comparative or superlative: “greater”, “greatest”',
    exampleWord: 'أَكْبَر',
    exampleMeaning: 'kattaroq, eng katta'
  },
  {
    wazn: 'فُعْلَى',
    category: PatternCategory.COMPARATIVE,
    uz: 'أَفْعَل ning ayol shakli: “eng ulug‘”',
    ru: 'Женская форма превосходной степени',
    en: 'Feminine superlative',
    exampleWord: 'كُبْرَى',
    exampleMeaning: 'eng katta (ayol)'
  },

  // ── place and instrument ──────────────────────────────────────
  {
    wazn: 'مَفْعَل',
    category: PatternCategory.PLACE_OR_TIME,
    uz: 'Ish bajariladigan joy yoki vaqt: “yozish joyi = ofis”',
    ru: 'Место или время действия',
    en: 'Place or time of the action: “office”',
    exampleWord: 'مَكْتَب',
    exampleMeaning: 'ish stoli, ofis'
  },
  {
    wazn: 'مَفْعِل',
    category: PatternCategory.PLACE_OR_TIME,
    uz: 'Joy yoki vaqt oti',
    ru: 'Имя места или времени',
    en: 'Noun of place or time',
    exampleWord: 'مَشْرِق',
    exampleMeaning: 'sharq, chiqish joyi'
  },
  {
    wazn: 'مَفْعَلَة',
    category: PatternCategory.PLACE_OR_TIME,
    uz: 'Joy oti (ayol shaklida): “kutubxona”',
    ru: 'Имя места (женский род)',
    en: 'Noun of place, feminine: “library”',
    exampleWord: 'مَكْتَبَة',
    exampleMeaning: 'kutubxona'
  },
  {
    wazn: 'مِفْعال',
    category: PatternCategory.INSTRUMENT,
    uz: 'Asbob nomi: “kalit”',
    ru: 'Название орудия: «ключ»',
    en: 'Instrument: “key”',
    exampleWord: 'مِفْتاح',
    exampleMeaning: 'kalit'
  },
  {
    wazn: 'مِفْعَل',
    category: PatternCategory.INSTRUMENT,
    uz: 'Asbob nomi',
    ru: 'Название орудия',
    en: 'Instrument noun',
    exampleWord: 'مِيزان',
    exampleMeaning: 'tarozi'
  },

  // ── verbal nouns (masdar) ─────────────────────────────────────
  {
    wazn: 'فَعْل',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Ishning o‘zi (masdar) yoki oddiy ot: “so‘z”',
    ru: 'Отглагольное имя или простое существительное',
    en: 'The action as a noun, or a plain noun: “saying”',
    exampleWord: 'قَوْل',
    exampleMeaning: 'so‘z, gap'
  },
  {
    wazn: 'فِعْل',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Masdar yoki ot: “ilm”',
    ru: 'Отглагольное имя: «знание»',
    en: 'Verbal noun: “knowledge”',
    exampleWord: 'عِلْم',
    exampleMeaning: 'ilm, bilim'
  },
  {
    wazn: 'فُعْل',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Masdar yoki mavhum ot: “kufr”',
    ru: 'Отглагольное имя: «неверие»',
    en: 'Verbal noun: “disbelief”',
    exampleWord: 'كُفْر',
    exampleMeaning: 'kufr, inkor'
  },
  {
    wazn: 'فِعال',
    category: PatternCategory.NOUN,
    uz: 'Ot yoki masdar: “kitob”. Ba’zan singan ko‘plik ham bo‘ladi: رِجال “erkaklar”',
    ru: 'Существительное или масдар: «книга». Иногда ломаное множественное: رِجال',
    en: 'Noun or verbal noun: “book”. Sometimes a broken plural: رِجال “men”',
    exampleWord: 'كِتاب',
    exampleMeaning: 'kitob'
  },
  {
    wazn: 'فَعال',
    category: PatternCategory.NOUN,
    uz: 'Ot yoki masdar: “azob”',
    ru: 'Существительное: «наказание»',
    en: 'Noun: “punishment”',
    exampleWord: 'عَذاب',
    exampleMeaning: 'azob'
  },
  {
    wazn: 'فَعْلَة',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Bir martalik ish yoki ot: “rahmat”',
    ru: 'Однократное действие или имя',
    en: 'A single instance of the action, or a noun',
    exampleWord: 'رَحْمَة',
    exampleMeaning: 'rahmat, mehr'
  },
  {
    wazn: 'تَفْعِيل',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'II bob masdari: “topshirish”',
    ru: 'Масдар II породы',
    en: 'Form II verbal noun',
    exampleWord: 'تَسْلِيم',
    exampleMeaning: 'topshirish, salom berish'
  },
  {
    wazn: 'إِفْعال',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'IV bob masdari: “islom”',
    ru: 'Масдар IV породы',
    en: 'Form IV verbal noun',
    exampleWord: 'إِسْلام',
    exampleMeaning: 'islom, taslim bo‘lish'
  },
  {
    wazn: 'تَفَعُّل',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'V bob masdari',
    ru: 'Масдар V породы',
    en: 'Form V verbal noun',
    exampleWord: 'تَذَكُّر',
    exampleMeaning: 'eslash, ibrat olish'
  },
  {
    wazn: 'افْتِعال',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'VIII bob masdari',
    ru: 'Масдар VIII породы',
    en: 'Form VIII verbal noun',
    exampleWord: 'اخْتِلاف',
    exampleMeaning: 'ixtilof, tafovut'
  },
  {
    wazn: 'اسْتِفْعال',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'X bob masdari: “mag‘firat so‘rash”',
    ru: 'Масдар X породы',
    en: 'Form X verbal noun',
    exampleWord: 'اسْتِغْفار',
    exampleMeaning: 'mag‘firat so‘rash'
  },
  {
    wazn: 'مُفاعَلَة',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'III bob masdari (o‘zaro ish)',
    ru: 'Масдар III породы (взаимное действие)',
    en: 'Form III verbal noun (mutual action)',
    exampleWord: 'مُجادَلَة',
    exampleMeaning: 'bahslashish'
  },
  {
    wazn: 'فِعالَة',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Kasb yoki masdar: “risolat”',
    ru: 'Ремесло или масдар',
    en: 'Craft or verbal noun',
    exampleWord: 'رِسالَة',
    exampleMeaning: 'risola, xabar'
  },

  // ── broken plurals ────────────────────────────────────────────
  {
    wazn: 'أَفْعال',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'Singan ko‘plik: “sohiblar”',
    ru: 'Ломаное множественное число',
    en: 'Broken plural',
    exampleWord: 'أَصْحاب',
    exampleMeaning: 'sohiblar, ahli'
  },
  {
    wazn: 'فُعُول',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'Singan ko‘plik: “chegaralar”',
    ru: 'Ломаное множественное число',
    en: 'Broken plural',
    exampleWord: 'حُدُود',
    exampleMeaning: 'chegaralar, hadlar'
  },
  {
    wazn: 'فُعَلاء',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'Sifatlarning ko‘pligi: “ulamolar”',
    ru: 'Множественное от прилагательных',
    en: 'Plural of adjectives',
    exampleWord: 'عُلَماء',
    exampleMeaning: 'olimlar'
  },
  {
    wazn: 'فَواعِل',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'فاعِل shaklining ko‘pligi',
    ru: 'Множественное от فاعِل',
    en: 'Plural of فاعِل',
    exampleWord: 'قَواعِد',
    exampleMeaning: 'qoidalar, asoslar'
  },

  // ── verb conjugations ─────────────────────────────────────────
  {
    wazn: 'فَعَلَ',
    category: PatternCategory.VERB,
    uz: 'I bob o‘tgan zamon: “qildi”',
    ru: 'I порода, прошедшее время',
    en: 'Form I past tense',
    exampleWord: 'كَتَبَ',
    exampleMeaning: 'yozdi'
  },
  {
    wazn: 'فَعِلَ',
    category: PatternCategory.VERB,
    uz: 'I bob o‘tgan zamon (i unlisi bilan): “bildi”',
    ru: 'I порода, прошедшее время (с кясрой)',
    en: 'Form I past tense (i-vowel)',
    exampleWord: 'عَلِمَ',
    exampleMeaning: 'bildi'
  },
  {
    wazn: 'يَفْعَلُ',
    category: PatternCategory.VERB,
    uz: 'I bob hozirgi-kelasi zamon: “qiladi”',
    ru: 'I порода, настоящее-будущее время',
    en: 'Form I present tense',
    exampleWord: 'يَكْتُبُ',
    exampleMeaning: 'yozadi'
  },
  {
    wazn: 'فَعَّلَ',
    category: PatternCategory.VERB,
    uz: 'II bob: kuchaytirish yoki orttirma nisbat',
    ru: 'II порода: усиление или каузатив',
    en: 'Form II: intensive or causative',
    exampleWord: 'عَلَّمَ',
    exampleMeaning: 'o‘rgatdi'
  },
  {
    wazn: 'فاعَلَ',
    category: PatternCategory.VERB,
    uz: 'III bob: o‘zaro ish qilish',
    ru: 'III порода: взаимное действие',
    en: 'Form III: mutual action',
    exampleWord: 'قاتَلَ',
    exampleMeaning: 'jang qildi'
  },
  {
    wazn: 'أَفْعَلَ',
    category: PatternCategory.VERB,
    uz: 'IV bob: orttirma nisbat “yubordi”',
    ru: 'IV порода: каузатив',
    en: 'Form IV: causative',
    exampleWord: 'أَرْسَلَ',
    exampleMeaning: 'yubordi'
  },
  {
    wazn: 'تَفَعَّلَ',
    category: PatternCategory.VERB,
    uz: 'V bob: o‘zlik nisbati',
    ru: 'V порода: возвратное действие',
    en: 'Form V: reflexive',
    exampleWord: 'تَذَكَّرَ',
    exampleMeaning: 'esladi'
  },
  {
    wazn: 'تَفاعَلَ',
    category: PatternCategory.VERB,
    uz: 'VI bob: o‘zaro va davomli ish',
    ru: 'VI порода: взаимное действие',
    en: 'Form VI: reciprocal',
    exampleWord: 'تَعالَى',
    exampleMeaning: 'oliy bo‘ldi'
  },
  {
    wazn: 'انْفَعَلَ',
    category: PatternCategory.VERB,
    uz: 'VII bob: majhul-o‘zlik nisbati',
    ru: 'VII порода: страдательно-возвратное',
    en: 'Form VII: passive-reflexive',
    exampleWord: 'انْقَلَبَ',
    exampleMeaning: 'ag‘darildi, qaytdi'
  },
  {
    wazn: 'افْتَعَلَ',
    category: PatternCategory.VERB,
    uz: 'VIII bob: o‘zi uchun qilish',
    ru: 'VIII порода: действие для себя',
    en: 'Form VIII: action for oneself',
    exampleWord: 'اتَّبَعَ',
    exampleMeaning: 'ergashdi'
  },
  {
    wazn: 'اسْتَفْعَلَ',
    category: PatternCategory.VERB,
    uz: 'X bob: talab qilish “so‘radi”',
    ru: 'X порода: просьба, поиск',
    en: 'Form X: seeking or requesting',
    exampleWord: 'اسْتَغْفَرَ',
    exampleMeaning: 'mag‘firat so‘radi'
  }
] as const

export const PATTERN_GLOSSES: readonly PatternGloss[] = [...PATTERN_GLOSSES_1, ...PATTERN_GLOSSES_2]
