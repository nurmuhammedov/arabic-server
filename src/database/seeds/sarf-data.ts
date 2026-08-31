import { FormCategory, RootClassCode } from '../../sarf/enums/sarf.enum'

export interface VerbFormSeed {
  code: string
  category: FormCategory
  position: number
  /** Corpus verb-form number, where the Quranic corpus distinguishes it. */
  corpusForm?: number
  pastPattern: string
  presentPattern: string
  masdarPattern?: string
  activeParticiplePattern?: string
  passiveParticiplePattern?: string
  imperativePattern?: string
  meaningUz: string
  meaningRu?: string
  meaningEn?: string
  exampleRoot?: string
  exampleWord?: string
  exampleMeaning?: string
}

/**
 * The 22 abwāb. Explanations are deliberately long and plain-spoken: the learner
 * is an Uzbek speaker who can read the script but has no grammar background, so
 * each bāb is introduced through worked Quranic examples rather than terminology.
 */
export const VERB_FORMS: readonly VerbFormSeed[] = [
  // ── ثلاثي مجرد — the six bare triliteral bābs ────────────────────────────
  {
    code: 'I-a-u',
    category: FormCategory.TRILITERAL_BARE,
    position: 1,
    corpusForm: 1,
    pastPattern: 'فَعَلَ',
    presentPattern: 'يَفْعُلُ',
    masdarPattern: 'فَعْل',
    activeParticiplePattern: 'فاعِل',
    passiveParticiplePattern: 'مَفْعُول',
    imperativePattern: 'اُفْعُلْ',
    exampleRoot: 'نصر',
    exampleWord: 'نَصَرَ يَنْصُرُ',
    exampleMeaning: 'yordam berdi',
    meaningUz:
      'Birinchi bob — “nasara” bobi. Uni shunday tanib olasiz: o‘tgan zamonda o‘rtadagi harf ustida **fatha** (a), hozirgi zamonda **damma** (u) turadi: نَصَرَ → يَنْصُرُ.\n\n' +
      'Diqqat qiling: bu bobning **ma’noga aloqasi yo‘q**. U faqat unlilar tartibini bildiradi. Shuning uchun نَصَرَ (yordam berdi) va قَتَلَ (o‘ldirdi) bir bobda tursa ham, ma’nolari butunlay boshqa. Ya’ni sulosiy mujarradning oltita bobi sizga so‘zning **ma’nosini emas, o‘qilishini** aytadi.\n\n' +
      'Nega baribir kerak? Chunki bu bobni bilmasangiz, يَنْصُرُ ni يَنْصِرُ deb noto‘g‘ri o‘qiysiz. Va Qur’onni to‘g‘ri talaffuz qilish uchun bu shart.\n\n' +
      'Qur’ondagi misollar: نَصَرَ يَنْصُرُ (yordam berdi), خَلَقَ يَخْلُقُ (yaratdi), دَخَلَ يَدْخُلُ (kirdi), كَتَبَ يَكْتُبُ (yozdi).',
    meaningRu:
      'Первая порода, باب نصر: прошедшее с фатхой, настоящее с даммой. Указывает только на огласовку, не на значение.',
    meaningEn: 'Bāb naṣara: fatḥa in the past, ḍamma in the present. Tells you the vowelling, not the meaning.'
  },
  {
    code: 'I-a-i',
    category: FormCategory.TRILITERAL_BARE,
    position: 2,
    corpusForm: 1,
    pastPattern: 'فَعَلَ',
    presentPattern: 'يَفْعِلُ',
    masdarPattern: 'فَعْل',
    activeParticiplePattern: 'فاعِل',
    passiveParticiplePattern: 'مَفْعُول',
    imperativePattern: 'اِفْعِلْ',
    exampleRoot: 'ضرب',
    exampleWord: 'ضَرَبَ يَضْرِبُ',
    exampleMeaning: 'urdi',
    meaningUz:
      'Ikkinchi bob — “daraba” bobi. O‘tgan zamonda **fatha**, hozirgi zamonda **kasra** (i): ضَرَبَ → يَضْرِبُ.\n\n' +
      'Birinchi bobdan farqi bitta harakatda: у yerda يَنْصُرُ, bu yerda يَضْرِبُ. Ko‘rib turganingizdek, o‘tgan zamon ikkalasida bir xil — فَعَلَ. Shuning uchun yangi fe’lni ko‘rganda **hozirgi zamon shaklini ham yodlash kerak**, aks holda qaysi bob ekanini bilolmaysiz. Lug‘atlarda fe’llar shu sababdan juftlik bilan beriladi: ضَرَبَ يَضْرِبُ.\n\n' +
      'Qur’ondagi misollar: ضَرَبَ يَضْرِبُ (urdi, misol keltirdi), عَرَفَ يَعْرِفُ (tanidi), حَمَلَ يَحْمِلُ (ko‘tardi), قَدَرَ يَقْدِرُ (qodir bo‘ldi).',
    meaningRu: 'Вторая порода, باب ضرب: фатха в прошедшем, кясра в настоящем.',
    meaningEn: 'Bāb ḍaraba: fatḥa in the past, kasra in the present.'
  },
  {
    code: 'I-a-a',
    category: FormCategory.TRILITERAL_BARE,
    position: 3,
    corpusForm: 1,
    pastPattern: 'فَعَلَ',
    presentPattern: 'يَفْعَلُ',
    masdarPattern: 'فَعْل',
    activeParticiplePattern: 'فاعِل',
    passiveParticiplePattern: 'مَفْعُول',
    imperativePattern: 'اِفْعَلْ',
    exampleRoot: 'فتح',
    exampleWord: 'فَتَحَ يَفْتَحُ',
    exampleMeaning: 'ochdi',
    meaningUz:
      'Uchinchi bob — “fataha” bobi. Ikkala zamonda ham **fatha**: فَتَحَ → يَفْتَحُ.\n\n' +
      'Bu bobning bir belgisi bor: o‘zakda **halqum harflari** (ء ه ع ح غ خ) bo‘lsa, ko‘pincha shu bobga tushadi. Masalan فَتَحَ da ح bor, ذَهَبَ da ه bor, سَأَلَ da ء bor. Bu qoida emas, lekin kuchli tendensiya — yangi fe’lni ko‘rganingizda taxmin qilishga yordam beradi.\n\n' +
      'Qur’ondagi misollar: فَتَحَ يَفْتَحُ (ochdi), ذَهَبَ يَذْهَبُ (ketdi), سَأَلَ يَسْأَلُ (so‘radi), جَعَلَ يَجْعَلُ (qildi), مَنَعَ يَمْنَعُ (man qildi).',
    meaningRu: 'Третья порода, باب فتح: фатха в обоих временах. Часто при гортанных согласных.',
    meaningEn: 'Bāb fataḥa: fatḥa in both tenses. Common when the root has a guttural letter.'
  },
  {
    code: 'I-i-a',
    category: FormCategory.TRILITERAL_BARE,
    position: 4,
    corpusForm: 1,
    pastPattern: 'فَعِلَ',
    presentPattern: 'يَفْعَلُ',
    masdarPattern: 'فَعَل',
    activeParticiplePattern: 'فاعِل',
    passiveParticiplePattern: 'مَفْعُول',
    imperativePattern: 'اِفْعَلْ',
    exampleRoot: 'علم',
    exampleWord: 'عَلِمَ يَعْلَمُ',
    exampleMeaning: 'bildi',
    meaningUz:
      'To‘rtinchi bob — “alima” bobi. O‘tgan zamonda **kasra**, hozirgi zamonda **fatha**: عَلِمَ → يَعْلَمُ.\n\n' +
      'Bu bobning ma’noviy tendensiyasi bor va u foydali: bu yerda ko‘pincha **holat, tuyg‘u, ichki kechinma** bildiruvchi fe’llar turadi. Bilish, quvonish, g‘amgin bo‘lish, qo‘rqish, kasal bo‘lish — hammasi shu bobda.\n\n' +
      'Ya’ni oltita bobdan faqat shuning ma’noga ozgina bog‘liqligi bor. Boshqalari sof shakl.\n\n' +
      'Qur’ondagi misollar: عَلِمَ يَعْلَمُ (bildi), سَمِعَ يَسْمَعُ (eshitdi), فَرِحَ يَفْرَحُ (xursand bo‘ldi), خَشِيَ يَخْشَى (qo‘rqdi), رَضِيَ يَرْضَى (rozi bo‘ldi), مَرِضَ يَمْرَضُ (kasal bo‘ldi).',
    meaningRu: 'Четвёртая порода, باب علم: кясра в прошедшем, фатха в настоящем. Часто глаголы состояния и чувств.',
    meaningEn: 'Bāb ʿalima: kasra in the past, fatḥa in the present. Often verbs of state and feeling.'
  },
  {
    code: 'I-u-u',
    category: FormCategory.TRILITERAL_BARE,
    position: 5,
    corpusForm: 1,
    pastPattern: 'فَعُلَ',
    presentPattern: 'يَفْعُلُ',
    masdarPattern: 'فَعالَة',
    activeParticiplePattern: 'فَعِيل',
    imperativePattern: 'اُفْعُلْ',
    exampleRoot: 'كرم',
    exampleWord: 'كَرُمَ يَكْرُمُ',
    exampleMeaning: 'karamli bo‘ldi',
    meaningUz:
      'Beshinchi bob — “karuma” bobi. Ikkala zamonda ham **damma**: كَرُمَ → يَكْرُمُ.\n\n' +
      'Bu bob ham ma’noviy: u **tug‘ma, doimiy sifat** bildiradi. Ya’ni “bir marta qildi” emas, “shunday bo‘lib qoldi, shunday xislati bor” degani. Karamli bo‘lish, katta bo‘lish, go‘zal bo‘lish, uzoq bo‘lish — hammasi doimiy xususiyat.\n\n' +
      'Bu bobdan **فَعِيل** qolibida sifat yasaladi: كَرُمَ → كَرِيم (karamli), عَظُمَ → عَظِيم (ulug‘), كَبُرَ → كَبِير (katta). Qur’ondagi Allohning ko‘p sifatlari aynan shu yo‘ldan chiqqan.\n\n' +
      'Qur’ondagi misollar: كَرُمَ (karamli bo‘ldi) → كَرِيم, عَظُمَ (ulug‘ bo‘ldi) → عَظِيم, كَبُرَ يَكْبُرُ (katta bo‘ldi) → كَبِير, بَعُدَ (uzoq bo‘ldi) → بَعِيد.',
    meaningRu: 'Пятая порода, باب كرم: дамма в обоих временах. Обозначает врождённое, постоянное качество.',
    meaningEn: 'Bāb karuma: ḍamma in both tenses. Denotes an innate, permanent quality.'
  },
  {
    code: 'I-i-i',
    category: FormCategory.TRILITERAL_BARE,
    position: 6,
    corpusForm: 1,
    pastPattern: 'فَعِلَ',
    presentPattern: 'يَفْعِلُ',
    masdarPattern: 'فَعْل',
    activeParticiplePattern: 'فاعِل',
    imperativePattern: 'اِفْعِلْ',
    exampleRoot: 'حسب',
    exampleWord: 'حَسِبَ يَحْسِبُ',
    exampleMeaning: 'o‘yladi, hisobladi',
    meaningUz:
      'Oltinchi bob — “hasiba” bobi. Ikkala zamonda ham **kasra**: حَسِبَ → يَحْسِبُ.\n\n' +
      'Bu eng kam uchraydigan bob. Butun arab tilida barmoq bilan sanarli fe’l bor, Qur’onda esa yana kamroq. Shuning uchun uni oxirida o‘rgansangiz ham bo‘ladi — asosiy vaqtingizni birinchi to‘rtta bobga sarflang.\n\n' +
      'Qur’ondagi asosiy misol: حَسِبَ يَحْسِبُ (gumon qildi, hisobladi). Yana: وَرِثَ يَرِثُ (meros oldi), نَعِمَ يَنْعِمُ (ne’matda bo‘ldi).',
    meaningRu: 'Шестая порода, باب حسب: кясра в обоих временах. Самая редкая.',
    meaningEn: 'Bāb ḥasiba: kasra in both tenses. The rarest of the six.'
  },

  // ── ثلاثي مزيد بحرف — one letter added ──────────────────────────────────
  {
    code: 'II',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 7,
    corpusForm: 2,
    pastPattern: 'فَعَّلَ',
    presentPattern: 'يُفَعِّلُ',
    masdarPattern: 'تَفْعِيل',
    activeParticiplePattern: 'مُفَعِّل',
    passiveParticiplePattern: 'مُفَعَّل',
    imperativePattern: 'فَعِّلْ',
    exampleRoot: 'علم',
    exampleWord: 'عَلَّمَ',
    exampleMeaning: 'o‘rgatdi',
    meaningUz:
      'II bob — o‘rtadagi harf **ikkilanadi** (shadda qo‘yiladi): عَلِمَ → عَلَّمَ.\n\n' +
      'Ikki asosiy vazifasi bor:\n\n' +
      '**1. Boshqaga qildirish.** عَلِمَ “bildi” edi, عَلَّمَ “bildirdi, o‘rgatdi” bo‘ldi. Ya’ni ish endi boshqa odamga o‘tadi. نَزَلَ “tushdi” → نَزَّلَ “tushirdi”.\n\n' +
      '**2. Kuchaytirish, ko‘p marta qilish.** كَسَرَ “sindirdi” → كَسَّرَ “parcha-parcha qildi”. قَطَعَ “kesdi” → قَطَّعَ “bo‘lak-bo‘lak qildi”. Ya’ni ish bir marta emas, qayta-qayta yoki kuch bilan bajarilgan.\n\n' +
      'Qaysi biri ekanini kontekst aytadi. Lekin ikkalasida ham asos bitta: **kuch qo‘shilgan**.\n\n' +
      'Qur’ondagi misollar: عَلَّمَ (o‘rgatdi), نَزَّلَ (nozil qildi), كَذَّبَ (yolg‘onga chiqardi), صَدَّقَ (tasdiqladi), بَشَّرَ (xushxabar berdi), سَبَّحَ (tasbih aytdi).',
    meaningRu: 'II порода: удвоение среднего корневого. Каузатив («заставить делать») или усиление.',
    meaningEn: 'Form II: doubled middle radical. Causative or intensive.'
  },
  {
    code: 'III',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 8,
    corpusForm: 3,
    pastPattern: 'فاعَلَ',
    presentPattern: 'يُفاعِلُ',
    masdarPattern: 'مُفاعَلَة',
    activeParticiplePattern: 'مُفاعِل',
    passiveParticiplePattern: 'مُفاعَل',
    imperativePattern: 'فاعِلْ',
    exampleRoot: 'قتل',
    exampleWord: 'قاتَلَ',
    exampleMeaning: 'jang qildi',
    meaningUz:
      'III bob — birinchi harfdan keyin **alif** qo‘shiladi: قَتَلَ → قاتَلَ.\n\n' +
      'Ma’nosi: **ikki tomon bir-biriga qarshi ish qiladi**. Farqni ko‘ring:\n' +
      '- قَتَلَ — “o‘ldirdi”. Bir tomonlama: u o‘ldirdi, u o‘lgan.\n' +
      '- قاتَلَ — “jang qildi”. Ikki tomonlama: ikkalasi ham urishayapti.\n\n' +
      'Yana: كَتَبَ “yozdi” → كاتَبَ “yozishdi, xat almashdi”. سَأَلَ “so‘radi” → ساءَلَ “bir-biridan so‘rashdi”.\n\n' +
      'Ba’zan “ishni birovga qaratib qilish” ma’nosi ham chiqadi, o‘zaro bo‘lmasa ham: جاهَدَ “jihod qildi” (kimgadir qarshi kuch sarfladi).\n\n' +
      'Qur’ondagi misollar: قاتَلَ (jang qildi), جاهَدَ (jihod qildi), نادَى (nido qildi), عاهَدَ (ahdlashdi), جادَلَ (bahslashdi).',
    meaningRu: 'III порода: алиф после первого корневого. Взаимное действие между двумя сторонами.',
    meaningEn: 'Form III: alif after the first radical. Mutual or directed action.'
  },
  {
    code: 'IV',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 9,
    corpusForm: 4,
    pastPattern: 'أَفْعَلَ',
    presentPattern: 'يُفْعِلُ',
    masdarPattern: 'إِفْعال',
    activeParticiplePattern: 'مُفْعِل',
    passiveParticiplePattern: 'مُفْعَل',
    imperativePattern: 'أَفْعِلْ',
    exampleRoot: 'نزل',
    exampleWord: 'أَنْزَلَ',
    exampleMeaning: 'tushirdi, nozil qildi',
    meaningUz:
      'IV bob — boshiga **hamzali alif** qo‘shiladi: نَزَلَ → أَنْزَلَ.\n\n' +
      'Bu Qur’ondagi **eng ko‘p uchraydigan qo‘shimchali bob** (fe’llarning 18% i). Shuning uchun uni yaxshi o‘rganish kerak.\n\n' +
      'Asosiy ma’nosi — **boshqaga qildirish**, xuddi II bob kabi. Lekin II bobda kuch/takror bor, IV bobda esa sof “sabab bo‘ldi” ma’nosi:\n' +
      '- نَزَلَ “tushdi” (o‘zi tushdi) → أَنْزَلَ “tushirdi” (kimdir tushirdi)\n' +
      '- خَرَجَ “chiqdi” → أَخْرَجَ “chiqardi”\n' +
      '- سَلِمَ “omon bo‘ldi” → أَسْلَمَ “topshirdi, taslim bo‘ldi”\n\n' +
      'Ikkinchi ma’nosi — **biror holatga kirish**: أَصْبَحَ “tongni qarshiladi, ertalab bo‘ldi”.\n\n' +
      'Muhim eslatma: IV bobda hozirgi zamon **يُفْعِلُ** bo‘ladi — boshida damma (يُـ), o‘rtada kasra. Bu I bobdan ajratib turadi (يَفْعُلُ). Bu farqni sezish o‘qishda juda kerak.\n\n' +
      'Qur’ondagi misollar: أَنْزَلَ (nozil qildi), أَرْسَلَ (yubordi), أَخْرَجَ (chiqardi), آمَنَ (imon keltirdi), أَسْلَمَ (taslim bo‘ldi), أَطاعَ (itoat qildi).',
    meaningRu:
      'IV порода: хамза в начале. Каузатив — «сделать так, чтобы произошло». Самая частая из усиленных пород в Коране.',
    meaningEn: 'Form IV: prefixed hamza. Causative. The most frequent augmented form in the Quran.'
  },

  // ── ثلاثي مزيد بحرفين — two letters added ───────────────────────────────
  {
    code: 'V',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 10,
    corpusForm: 5,
    pastPattern: 'تَفَعَّلَ',
    presentPattern: 'يَتَفَعَّلُ',
    masdarPattern: 'تَفَعُّل',
    activeParticiplePattern: 'مُتَفَعِّل',
    imperativePattern: 'تَفَعَّلْ',
    exampleRoot: 'ذكر',
    exampleWord: 'تَذَكَّرَ',
    exampleMeaning: 'esladi, ibrat oldi',
    meaningUz:
      'V bob — II bobning boshiga **تَـ** qo‘shilgani: فَعَّلَ → تَفَعَّلَ.\n\n' +
      'Qoida sodda: **II bob ishni boshqaga qiladi, V bob o‘sha ishni o‘ziga qaytaradi.**\n' +
      '- عَلَّمَ “o‘rgatdi” (boshqaga) → تَعَلَّمَ “o‘rgandi” (o‘zi)\n' +
      '- ذَكَّرَ “eslatdi” → تَذَكَّرَ “esladi”\n' +
      '- طَهَّرَ “tozaladi” → تَطَهَّرَ “tozalandi”\n\n' +
      'Ya’ni تَـ qo‘shilsa, ish egasiga qaytadi. Bu juda ishonchli qoida — deyarli har doim ishlaydi.\n\n' +
      'Ba’zan “asta-sekin, harakat bilan qilish” ma’nosi ham qo‘shiladi: تَكَبَّرَ “kibrlandi” (o‘zini katta tutdi).\n\n' +
      'Qur’ondagi misollar: تَذَكَّرَ (esladi), تَوَكَّلَ (tavakkul qildi), تَبَيَّنَ (ravshan bo‘ldi), تَقَبَّلَ (qabul qildi), تَكَبَّرَ (kibrlandi).',
    meaningRu: 'V порода: та- перед II породой. Возвратное значение — действие возвращается на деятеля.',
    meaningEn: 'Form V: ta- prefixed to Form II. Reflexive — the action returns to the doer.'
  },
  {
    code: 'VI',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 11,
    corpusForm: 6,
    pastPattern: 'تَفاعَلَ',
    presentPattern: 'يَتَفاعَلُ',
    masdarPattern: 'تَفاعُل',
    activeParticiplePattern: 'مُتَفاعِل',
    imperativePattern: 'تَفاعَلْ',
    exampleRoot: 'سأل',
    exampleWord: 'تَساءَلَ',
    exampleMeaning: 'bir-biridan so‘rashdi',
    meaningUz:
      'VI bob — III bobning boshiga **تَـ** qo‘shilgani: فاعَلَ → تَفاعَلَ.\n\n' +
      'III bob “ikki tomon bir-biriga qarshi” edi. VI bob esa **ko‘p tomon o‘zaro** ma’nosini beradi, va odatda urushish emas, oddiy o‘zaro ish:\n' +
      '- سَأَلَ “so‘radi” → تَساءَلَ “bir-biridan so‘rashdilar”\n' +
      '- وَصَى “vasiyat qildi” → تَواصَى “bir-biriga vasiyat qilishdi”\n\n' +
      'Yana bir ma’nosi — **o‘zini shunday ko‘rsatish** (aslida unday emas): تَجاهَلَ “bilmaganga oldi”, تَمارَضَ “kasalga soldi”.\n\n' +
      'Qur’onda kam uchraydi (fe’llarning 0.5% i), shuning uchun keyinroq o‘rgansangiz ham bo‘ladi.\n\n' +
      'Qur’ondagi misollar: تَساءَلَ (so‘rashdi), تَواصَى (vasiyatlashdi), تَعالَى (oliy bo‘ldi).',
    meaningRu: 'VI порода: та- перед III породой. Взаимное действие нескольких сторон.',
    meaningEn: 'Form VI: ta- prefixed to Form III. Reciprocal action among several parties.'
  },
  {
    code: 'VII',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 12,
    corpusForm: 7,
    pastPattern: 'انْفَعَلَ',
    presentPattern: 'يَنْفَعِلُ',
    masdarPattern: 'انْفِعال',
    activeParticiplePattern: 'مُنْفَعِل',
    imperativePattern: 'انْفَعِلْ',
    exampleRoot: 'قلب',
    exampleWord: 'انْقَلَبَ',
    exampleMeaning: 'ag‘darildi, qaytdi',
    meaningUz:
      'VII bob — boshiga **اِنْـ** qo‘shiladi: قَلَبَ → انْقَلَبَ.\n\n' +
      'Ma’nosi: **ish o‘z-o‘zidan sodir bo‘ldi**, bajaruvchi aytilmaydi.\n' +
      '- قَلَبَ “ag‘dardi” → انْقَلَبَ “ag‘darildi”\n' +
      '- كَسَرَ “sindirdi” → انْكَسَرَ “sindi”\n' +
      '- شَقَّ “yordi” → انْشَقَّ “yorildi”\n\n' +
      'O‘zbekchada bu “-ildi, -indi” qo‘shimchasiga o‘xshaydi: sindi, yorildi, ochildi.\n\n' +
      'Muhim: bu **majhul nisbat emas**. Majhulda “kim tomonidan” degan savol bor, bu yerda esa yo‘q — narsaning o‘zi shunday bo‘lib qolgan.\n\n' +
      'Qur’onda juda kam (0.3%). Asosiy misollar: انْقَلَبَ (qaytdi), انْشَقَّ (yorildi), انْتَهَى (to‘xtadi).',
    meaningRu: 'VII порода: ин- в начале. Действие происходит само собой, без указания деятеля.',
    meaningEn: 'Form VII: in- prefix. The action happens of itself, with no agent named.'
  },
  {
    code: 'VIII',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 13,
    corpusForm: 8,
    pastPattern: 'افْتَعَلَ',
    presentPattern: 'يَفْتَعِلُ',
    masdarPattern: 'افْتِعال',
    activeParticiplePattern: 'مُفْتَعِل',
    passiveParticiplePattern: 'مُفْتَعَل',
    imperativePattern: 'افْتَعِلْ',
    exampleRoot: 'تبع',
    exampleWord: 'اتَّبَعَ',
    exampleMeaning: 'ergashdi',
    meaningUz:
      'VIII bob — boshiga **اِ** va birinchi harfdan keyin **تَـ** qo‘shiladi: تَبِعَ → اتَّبَعَ.\n\n' +
      'Ma’nosi: **ishni o‘zi uchun, o‘z manfaati yo‘lida qilish**.\n' +
      '- كَسَبَ “ishlab topdi” → اكْتَسَبَ “o‘ziga orttirdi”\n' +
      '- تَبِعَ “ergashdi” → اتَّبَعَ “o‘zi tanlab ergashdi”\n' +
      '- سَمِعَ “eshitdi” → اسْتَمَعَ “diqqat bilan quloq soldi”\n\n' +
      'Ya’ni ish endi tasodifiy emas — bajaruvchi **ataylab, o‘zi xohlab** qilyapti.\n\n' +
      '**Diqqat — imlo qoidasi.** Agar o‘zakning birinchi harfi ت ط د ص ز bo‘lsa, qo‘shilgan ت ular bilan qo‘shilib ketadi:\n' +
      '- تبع → اتَّبَعَ (اتْتَبَعَ emas)\n' +
      '- صبر → اصْطَبَرَ (ت → ط bo‘ldi)\n' +
      '- زكر → ازْدَكَرَ (ت → د bo‘ldi)\n\n' +
      'Buni bilmasangiz, اتَّبَعَ ni ko‘rib o‘zagini topolmaysiz.\n\n' +
      'Qur’ondagi misollar: اتَّبَعَ (ergashdi), اتَّخَذَ (tutdi), اخْتَلَفَ (ixtilof qildi), اسْتَمَعَ (quloq soldi), اشْتَرَى (sotib oldi).',
    meaningRu: 'VIII порода: и- в начале и та после первого корневого. Действие для себя, намеренное.',
    meaningEn: 'Form VIII: i- prefix with infixed ta. Doing something for oneself, deliberately.'
  },
  {
    code: 'IX',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 14,
    corpusForm: 9,
    pastPattern: 'افْعَلَّ',
    presentPattern: 'يَفْعَلُّ',
    masdarPattern: 'افْعِلال',
    activeParticiplePattern: 'مُفْعَلّ',
    imperativePattern: 'افْعَلِلْ',
    exampleRoot: 'سود',
    exampleWord: 'اسْوَدَّ',
    exampleMeaning: 'qorayib ketdi',
    meaningUz:
      'IX bob — oxirgi harf **ikkilanadi**: اسْوَدَّ.\n\n' +
      'Faqat bitta vazifasi bor: **rang va jismoniy nuqson** bildirish.\n' +
      '- سَوْد (qora) → اسْوَدَّ “qorayib ketdi”\n' +
      '- بَيْض (oq) → ابْيَضَّ “oqarib ketdi”\n' +
      '- حَمْر (qizil) → احْمَرَّ “qizarib ketdi”\n' +
      '- عَوْج (egrilik) → اعْوَجَّ “qiyshayib qoldi”\n\n' +
      'Qur’onda atigi **2 ta fe’l**da uchraydi — و اسْوَدَّتْ va ابْيَضَّتْ (yuzlarning qorayishi va oqarishi haqidagi oyatlarda). Ya’ni bu bobni bilish yetadi, chuqur o‘rganish shart emas.',
    meaningRu: 'IX порода: удвоение последнего корневого. Только цвета и физические недостатки.',
    meaningEn: 'Form IX: doubled final radical. Colours and physical defects only.'
  },

  // ── ثلاثي مزيد بثلاثة — three letters added ─────────────────────────────
  {
    code: 'X',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 15,
    corpusForm: 10,
    pastPattern: 'اسْتَفْعَلَ',
    presentPattern: 'يَسْتَفْعِلُ',
    masdarPattern: 'اسْتِفْعال',
    activeParticiplePattern: 'مُسْتَفْعِل',
    passiveParticiplePattern: 'مُسْتَفْعَل',
    imperativePattern: 'اسْتَفْعِلْ',
    exampleRoot: 'غفر',
    exampleWord: 'اسْتَغْفَرَ',
    exampleMeaning: 'mag‘firat so‘radi',
    meaningUz:
      'X bob — boshiga **اِسْتَـ** qo‘shiladi: غَفَرَ → اسْتَغْفَرَ.\n\n' +
      'Bu eng oson taniladigan bob — اِسْتَـ ni ko‘rsangiz, darrov X bob ekanini bilasiz.\n\n' +
      'Asosiy ma’nosi: **so‘rash, talab qilish**.\n' +
      '- غَفَرَ “kechirdi” → اسْتَغْفَرَ “kechirim so‘radi”\n' +
      '- نَصَرَ “yordam berdi” → اسْتَنْصَرَ “yordam so‘radi”\n' +
      '- أَذِنَ “ruxsat berdi” → اسْتَأْذَنَ “ruxsat so‘radi”\n\n' +
      'Ikkinchi ma’nosi — **biror narsani shunday deb hisoblash**:\n' +
      '- كَبُرَ “katta bo‘ldi” → اسْتَكْبَرَ “o‘zini katta sanadi, kibrlandi”\n' +
      '- ضَعُفَ “zaif bo‘ldi” → اسْتَضْعَفَ “zaif deb bildi, ezdi”\n\n' +
      'Uchinchisi — **holatga o‘tish**: اسْتَقامَ “to‘g‘ri turdi, mustaqim bo‘ldi”.\n\n' +
      'Qur’ondagi misollar: اسْتَغْفَرَ (mag‘firat so‘radi), اسْتَكْبَرَ (kibrlandi), اسْتَطاعَ (qodir bo‘ldi), اسْتَجابَ (javob berdi), اسْتَقامَ (mustaqim bo‘ldi).',
    meaningRu: 'X порода: иста- в начале. Просьба, поиск; либо считать кого-то таким.',
    meaningEn: 'Form X: ista- prefix. Seeking or requesting; or deeming something to be so.'
  },
  {
    code: 'XI',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 16,
    pastPattern: 'افْعالَّ',
    presentPattern: 'يَفْعالُّ',
    masdarPattern: 'افْعِيلال',
    exampleRoot: 'حمر',
    exampleWord: 'احْمارَّ',
    exampleMeaning: 'qip-qizil bo‘ldi',
    meaningUz:
      'XI bob — IX bobning kuchaytirilgan shakli: احْمَرَّ → احْمارَّ.\n\n' +
      'Ma’nosi ham o‘sha — rang, lekin **yanada quyuqroq**: احْمَرَّ “qizardi”, احْمارَّ “qip-qizil bo‘lib ketdi”.\n\n' +
      '**Qur’onda umuman uchramaydi.** Uni bilib qo‘yish yetadi — sizga kerak bo‘lmaydi. An’anaviy 22 bobni to‘liq sanash uchun ro‘yxatga kiritilgan.',
    meaningRu: 'XI порода: усиленный вариант IX. В Коране не встречается.',
    meaningEn: 'Form XI: an intensified Form IX. Does not occur in the Quran.'
  },
  {
    code: 'XII',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 17,
    pastPattern: 'افْعَوْعَلَ',
    presentPattern: 'يَفْعَوْعِلُ',
    masdarPattern: 'افْعِيعال',
    exampleRoot: 'عشب',
    exampleWord: 'اعْشَوْشَبَ',
    exampleMeaning: 'o‘t-o‘lan qoplab ketdi',
    meaningUz:
      'XII bob — o‘rtadagi harf takrorlanadi va orasiga و kiradi: اعْشَوْشَبَ.\n\n' +
      'Ma’nosi: **ish juda kuchli, to‘liq darajada sodir bo‘lgan**. اعْشَوْشَبَ — “yer o‘t bilan butunlay qoplandi”.\n\n' +
      '**Qur’onda uchramaydi.** Klassik she’riyat va nasrda kamdan-kam ko‘rinadi. Ro‘yxat to‘liq bo‘lishi uchun kiritildi.',
    meaningRu: 'XII порода: усиление, полнота действия. В Коране не встречается.',
    meaningEn: 'Form XII: intensity and completeness. Does not occur in the Quran.'
  },
  {
    code: 'XIII',
    category: FormCategory.TRILITERAL_AUGMENTED,
    position: 18,
    pastPattern: 'افْعَوَّلَ',
    presentPattern: 'يَفْعَوِّلُ',
    masdarPattern: 'افْعِوّال',
    exampleRoot: 'جلو',
    exampleWord: 'اجْلَوَّذَ',
    exampleMeaning: 'tez yurdi',
    meaningUz:
      'XIII bob — و ikkilanadi: اجْلَوَّذَ.\n\n' +
      'Ma’nosi XII bobga yaqin — **kuchaytirish**.\n\n' +
      '**Qur’onda uchramaydi**, hozirgi arab tilida ham deyarli ishlatilmaydi. Faqat 22 talik ro‘yxat uchun.',
    meaningRu: 'XIII порода: удвоение و, усиление. В Коране не встречается.',
    meaningEn: 'Form XIII: doubled wāw, intensity. Does not occur in the Quran.'
  },

  // ── رباعي — quadriliteral ───────────────────────────────────────────────
  {
    code: 'Q-I',
    category: FormCategory.QUADRILITERAL_BARE,
    position: 19,
    pastPattern: 'فَعْلَلَ',
    presentPattern: 'يُفَعْلِلُ',
    masdarPattern: 'فَعْلَلَة',
    activeParticiplePattern: 'مُفَعْلِل',
    passiveParticiplePattern: 'مُفَعْلَل',
    imperativePattern: 'فَعْلِلْ',
    exampleRoot: 'دحرج',
    exampleWord: 'دَحْرَجَ',
    exampleMeaning: 'dumaladi, ag‘dardi',
    meaningUz:
      'Ruboiy mujarrad — o‘zakda **uch emas, to‘rt harf** bor: دَحْرَجَ (د-ح-ر-ج).\n\n' +
      'Arab tilida ko‘pchilik o‘zak uch harfli, lekin ozgina to‘rt harflisi ham bor. Ular alohida qolibga ega: فَعْلَلَ.\n\n' +
      'Bunday so‘zlar ko‘pincha **tovush yoki takroriy harakat** bildiradi: زَلْزَلَ “silkitdi”, وَسْوَسَ “vasvasa qildi”, دَمْدَمَ “ustiga tushirdi”.\n\n' +
      'Diqqat qiling: ko‘pincha ikki bo‘g‘in takrorlanadi — زَلْ-زَلَ, وَسْ-وَسَ. Bu tanish uchun yaxshi belgi.\n\n' +
      'Qur’ondagi misollar: زَلْزَلَ (silkitdi), وَسْوَسَ (vasvasa qildi), دَمْدَمَ (halok qildi), بَعْثَرَ (ostin-ustun qildi).',
    meaningRu: 'Четырёхбуквенный корень, простая порода. Часто звукоподражание или повторяющееся действие.',
    meaningEn: 'Bare quadriliteral. Often onomatopoeic or denoting repeated motion.'
  },
  {
    code: 'Q-II',
    category: FormCategory.QUADRILITERAL_AUGMENTED,
    position: 20,
    pastPattern: 'تَفَعْلَلَ',
    presentPattern: 'يَتَفَعْلَلُ',
    masdarPattern: 'تَفَعْلُل',
    activeParticiplePattern: 'مُتَفَعْلِل',
    exampleRoot: 'دحرج',
    exampleWord: 'تَدَحْرَجَ',
    exampleMeaning: 'dumalab ketdi',
    meaningUz:
      'Ruboiyning ikkinchi bobi — boshiga **تَـ** qo‘shiladi: دَحْرَجَ → تَدَحْرَجَ.\n\n' +
      'Xuddi V bobdagi kabi: ish egasiga qaytadi. دَحْرَجَ “dumalatdi” → تَدَحْرَجَ “dumalab ketdi” (o‘zi).\n\n' +
      'Qur’onda deyarli yo‘q. Bilib qo‘yish yetarli.',
    meaningRu: 'Четырёхбуквенный с та-: возвратное значение.',
    meaningEn: 'Quadriliteral with ta-: reflexive.'
  },
  {
    code: 'Q-III',
    category: FormCategory.QUADRILITERAL_AUGMENTED,
    position: 21,
    pastPattern: 'افْعَنْلَلَ',
    presentPattern: 'يَفْعَنْلِلُ',
    masdarPattern: 'افْعِنْلال',
    exampleRoot: 'حرجم',
    exampleWord: 'احْرَنْجَمَ',
    exampleMeaning: 'to‘planib qoldi',
    meaningUz:
      'Ruboiyning uchinchi bobi — boshiga **اِ**, o‘rtasiga **ن** qo‘shiladi: احْرَنْجَمَ.\n\n' +
      'Juda kam uchraydigan shakl. **Qur’onda yo‘q.** 22 talik ro‘yxatni to‘ldirish uchun.',
    meaningRu: 'Редкая четырёхбуквенная порода. В Коране не встречается.',
    meaningEn: 'A rare quadriliteral form. Does not occur in the Quran.'
  },
  {
    code: 'Q-IV',
    category: FormCategory.QUADRILITERAL_AUGMENTED,
    position: 22,
    pastPattern: 'افْعَلَلَّ',
    presentPattern: 'يَفْعَلِلُّ',
    masdarPattern: 'افْعِلْلال',
    exampleRoot: 'قشعر',
    exampleWord: 'اقْشَعَرَّ',
    exampleMeaning: 'junjikdi, terisi tikandek bo‘ldi',
    meaningUz:
      'Ruboiyning to‘rtinchi bobi — oxirgi harf ikkilanadi: اقْشَعَرَّ.\n\n' +
      'Qur’onda **bir marta** uchraydi: تَقْشَعِرُّ مِنْهُ جُلُودُ — “undan terilar junjikadi” (Zumar surasi, 23-oyat).\n\n' +
      'Ya’ni bu bobni bilishning amaliy foydasi shu bitta oyat. Lekin an’anaviy 22 talik ro‘yxat aynan shu bilan tugaydi.',
    meaningRu: 'Четырёхбуквенная порода с удвоением. В Коране встречается один раз.',
    meaningEn: 'Quadriliteral with doubled final radical. Occurs once in the Quran.'
  }
]

export interface RootClassSeed {
  code: RootClassCode
  nameAr: string
  nameUz: string
  position: number
  definitionUz: string
  ruleUz: string
  definitionRu?: string
  definitionEn?: string
  exampleRoot?: string
  exampleNote?: string
}

/**
 * The weak-root classes. These are what stop a learner who knows the templates
 * from actually reading: قالَ does not look like فَعَلَ until you know that
 * hollow roots swap their middle letter for an alif.
 */
export const ROOT_CLASSES: readonly RootClassSeed[] = [
  {
    code: RootClassCode.SOUND,
    nameAr: 'صحيح سالم',
    nameUz: 'Sog‘lom o‘zak',
    position: 1,
    exampleRoot: 'كتب',
    exampleNote: 'كَتَبَ — يَكْتُبُ — كاتِب — مَكْتُوب. Hech nima o‘zgarmaydi.',
    definitionUz:
      'O‘zakning uchala harfi ham “kuchli”: orasida و, ي, ء yo‘q va oxirgi ikki harf bir xil emas.\n\n' +
      'Masalan: ك-ت-ب, ن-ص-ر, ذ-ه-ب, ع-ل-م, ج-ع-ل.',
    ruleUz:
      'Bu eng oson sinf — **hech qanday o‘zgarish bo‘lmaydi**. Qolibga qanday solsangiz, shunday chiqadi.\n\n' +
      'كتب + فاعِل = كاتِب\n' +
      'كتب + مَفْعُول = مَكْتُوب\n' +
      'كتب + اِسْتَفْعَلَ = اِسْتَكْتَبَ\n\n' +
      'Shuning uchun sarfni o‘rganishni aynan shu sinfdan boshlash kerak. Qoliplarni sog‘lom o‘zakda mustahkamlab olsangiz, keyin qolgan sinflarni “bu yerda nima o‘zgaradi” deb qo‘shib borasiz.',
    definitionRu: 'Все три корневых согласных сильные: нет و, ي, ء и нет удвоения.',
    definitionEn: 'All three radicals are strong: no و, ي, ء and no doubling.'
  },
  {
    code: RootClassCode.DOUBLED,
    nameAr: 'مضاعف',
    nameUz: 'Ikkilangan o‘zak',
    position: 2,
    exampleRoot: 'ردد',
    exampleNote: 'رَدَدَ emas, **رَدَّ** — ikki د qo‘shilib, shadda bo‘lgan.',
    definitionUz:
      'O‘zakning **ikkinchi va uchinchi harfi bir xil**.\n\n' + 'Masalan: ر-د-د, م-س-س, ظ-ن-ن, ح-ق-ق, ش-د-د, ض-ل-ل.',
    ruleUz:
      'Ikki bir xil harf yonma-yon kelsa, ular **qo‘shilib, ustiga shadda qo‘yiladi**:\n\n' +
      'رَدَدَ → رَدَّ (qaytardi)\n' +
      'مَسَسَ → مَسَّ (tegdi)\n' +
      'ظَنَنَ → ظَنَّ (gumon qildi)\n\n' +
      '**Lekin har doim emas.** Agar ikkinchi harf sukunli bo‘lishi kerak bo‘lsa, qo‘shilish buziladi va ikkalasi ochiq yoziladi:\n' +
      'رَدَدْتُ (“qaytardim”) — bu yerda رَدَّتُ bo‘lmaydi, chunki د sukunli.\n\n' +
      'Shuning uchun bir xil fe’lni goh رَدَّ, goh رَدَدْ shaklida ko‘rasiz. Ikkalasi ham bir o‘zak.',
    definitionRu: 'Второй и третий корневые совпадают: ردد, مسس.',
    definitionEn: 'Second and third radicals are identical: ردد, مسس.'
  },
  {
    code: RootClassCode.HAMZATED,
    nameAr: 'مهموز',
    nameUz: 'Hamzali o‘zak',
    position: 3,
    exampleRoot: 'سأل',
    exampleNote: 'سَأَلَ — يَسْأَلُ. Hamza bor, lekin qoida buzilmaydi — faqat imlosi qiyin.',
    definitionUz:
      'O‘zakning uchta harfidan biri **hamza** (ء) bo‘lgan o‘zak.\n\n' +
      'Qayerda turishiga qarab uch xil:\n' +
      '- Boshida: أ-م-ر (أَمَرَ — buyurdi), أ-ك-ل (أَكَلَ — yedi)\n' +
      '- O‘rtasida: س-أ-ل (سَأَلَ — so‘radi)\n' +
      '- Oxirida: ق-ر-أ (قَرَأَ — o‘qidi), ب-د-أ (بَدَأَ — boshladi)',
    ruleUz:
      'Yaxshi xabar: **hamza kuchli harf**, ya’ni u tushib qolmaydi va o‘zgarmaydi. Qoliblar odatdagidek ishlaydi.\n\n' +
      'Muammo faqat **imloda**: hamza qaysi harf ustida yozilishi (أ, ؤ, ئ, ء) atrofdagi unlilarga bog‘liq.\n\n' +
      'قَرَأَ → يَقْرَأُ → مَقْرُوء\n' +
      'أَمَرَ → يَأْمُرُ → مَأْمُور\n\n' +
      'Bitta muhim istisno: IV bobda ikki hamza yonma-yon kelsa, ular **آ** ga aylanadi:\n' +
      'أَ + أْمَنَ → **آمَنَ** (imon keltirdi)\n' +
      'أَ + أْتَى → **آتَى** (berdi)\n\n' +
      'Shuning uchun آمَنَ ni ko‘rganingizda uning IV bob ekanini va o‘zagi أ-م-ن ekanini bilib olishingiz kerak.',
    definitionRu: 'Один из корневых — хамза: أمر, سأل, قرأ.',
    definitionEn: 'One radical is hamza: أمر, سأل, قرأ.'
  },
  {
    code: RootClassCode.ASSIMILATED,
    nameAr: 'مثال',
    nameUz: 'Birinchi harfi kuchsiz o‘zak',
    position: 4,
    exampleRoot: 'وعد',
    exampleNote: 'وَعَدَ — lekin يَعِدُ. Hozirgi zamonda و **butunlay tushib qolgan**.',
    definitionUz:
      'O‘zakning **birinchi harfi** و yoki ي bo‘lgan o‘zak.\n\n' +
      'Masalan: و-ع-د (va’da berdi), و-ج-د (topdi), و-ق-ي (saqladi), ي-س-ر (oson bo‘ldi).',
    ruleUz:
      'Asosiy qoida: **hozirgi zamonda birinchi و tushib qoladi**.\n\n' +
      'وَعَدَ → يَوْعِدُ emas, **يَعِدُ** (va’da beradi)\n' +
      'وَجَدَ → **يَجِدُ** (topadi)\n' +
      'وَصَلَ → **يَصِلُ** (yetadi)\n\n' +
      'Bu juda muhim, chunki يَعِدُ ni ko‘rib turib, uning و bilan boshlanishini taxmin qilish qiyin. Agar bu qoidani bilmasangiz, lug‘atdan topolmaysiz.\n\n' +
      'VIII bobda esa و butunlay **ت** ga aylanadi:\n' +
      'وقي + اِفْتَعَلَ = اِوْتَقَى emas, **اِتَّقَى** (taqvo qildi)\n' +
      'وصل + اِفْتَعَلَ = **اِتَّصَلَ** (bog‘landi)\n\n' +
      'Qur’ondagi اتَّقَى — eng ko‘p uchraydigan fe’llardan biri, va uning o‘zagi و-ق-ي ekanini aynan shu qoida orqali bilasiz.',
    definitionRu: 'Первый корневой — و или ي. В настоящем времени و обычно выпадает.',
    definitionEn: 'First radical is و or ي; the و usually drops in the present tense.'
  },
  {
    code: RootClassCode.HOLLOW,
    nameAr: 'أجوف',
    nameUz: 'Ichi bo‘sh o‘zak',
    position: 5,
    exampleRoot: 'قول',
    exampleNote: 'قَوَلَ emas, **قالَ** — o‘rtadagi و alifga aylangan.',
    definitionUz:
      'O‘zakning **o‘rtadagi harfi** و yoki ي bo‘lgan o‘zak.\n\n' +
      'Masalan: ق-و-ل (aytdi), ك-و-ن (bo‘ldi), ب-ي-ع (sotdi), ق-و-م (turdi), خ-و-ف (qo‘rqdi).\n\n' +
      'Bu **eng muhim kuchsiz sinf**, chunki Qur’ondagi eng ko‘p uchraydigan fe’llarning bir qismi shu yerda: قالَ (1618 marta), كانَ (1358 marta), شاءَ, جاءَ, خافَ.',
    ruleUz:
      'Asosiy qoida: **o‘rtadagi kuchsiz harf alifga aylanadi**.\n\n' +
      'قَوَلَ → **قالَ** (aytdi)\n' +
      'كَوَنَ → **كانَ** (bo‘ldi)\n' +
      'بَيَعَ → **باعَ** (sotdi)\n\n' +
      'Shuning uchun قالَ ni ko‘rganingizda uning uchta harfli emas, ikki harfli ko‘rinishi sizni aldamasin — o‘zagi ق-و-ل.\n\n' +
      'Hozirgi zamonda asl harf **qaytib keladi**:\n' +
      'قالَ → يَقُولُ (و qaytdi)\n' +
      'باعَ → يَبِيعُ (ي qaytdi)\n\n' +
      'Ya’ni hozirgi zamon shakli sizga qaysi harf yashiringanini aytadi. Bu juda foydali usul.\n\n' +
      'Yana bir muhim narsa: agar oxiri sukunli bo‘lsa, alif **butunlay tushadi**:\n' +
      'قالَ → قُلْتُ (“aytdim”), كانَ → كُنْتُ (“edim”)\n\n' +
      'Shuning uchun قُلْ (“ayt!”) — Qur’onda juda ko‘p uchraydigan bu so‘z aslida ق-و-ل o‘zagidan.',
    definitionRu: 'Средний корневой — و или ي, превращается в алиф: قول → قال.',
    definitionEn: 'Middle radical is و or ي and turns into alif: قول → قال.'
  },
  {
    code: RootClassCode.DEFECTIVE,
    nameAr: 'ناقص',
    nameUz: 'Oxiri kuchsiz o‘zak',
    position: 6,
    exampleRoot: 'دعو',
    exampleNote: 'دَعَوَ emas, **دَعا** — oxirgi و alifga aylangan.',
    definitionUz:
      'O‘zakning **oxirgi harfi** و yoki ي bo‘lgan o‘zak.\n\n' +
      'Masalan: د-ع-و (chaqirdi), ر-م-ي (otdi), ه-د-ي (hidoyat qildi), أ-ت-ي (keldi), ر-أ-ي (ko‘rdi).\n\n' +
      'Bu sinf ham juda katta va Qur’onda ko‘p: هَدَى, أَتَى, رَأَى, دَعا, تَلا.',
    ruleUz:
      'Oxirgi kuchsiz harf **alif yoki alif maqsura** (ى) ga aylanadi:\n\n' +
      'دَعَوَ → **دَعا** (chaqirdi)\n' +
      'هَدَيَ → **هَدَى** (hidoyat qildi)\n' +
      'رَمَيَ → **رَمَى** (otdi)\n\n' +
      'Yozilishida farq bor va u qoidali: **و dan kelsa ا, ي dan kelsa ى** yoziladi.\n' +
      'دعو → دَعا (alif)\n' +
      'هدي → هَدَى (alif maqsura)\n\n' +
      'Bu belgini bilsangiz, so‘zga qarab uning o‘zagida و yoki ي borligini ayta olasiz.\n\n' +
      'Qo‘shimcha qo‘shilganda asl harf qaytadi: دَعا → دَعَوْتُ (“chaqirdim”), هَدَى → هَدَيْتُ (“hidoyat qildim”).',
    definitionRu: 'Последний корневой — و или ي, переходит в алиф: دعو → دعا.',
    definitionEn: 'Final radical is و or ي, becoming alif: دعو → دعا.'
  },
  {
    code: RootClassCode.DOUBLY_WEAK,
    nameAr: 'لفيف',
    nameUz: 'Ikki kuchsiz harfli o‘zak',
    position: 7,
    exampleRoot: 'وقي',
    exampleNote: 'وَقَى — boshida و, oxirida ي. Ikkala qoida birga ishlaydi.',
    definitionUz:
      'O‘zakda **ikkita kuchsiz harf** (و yoki ي) bor.\n\n' +
      'Ikki xil bo‘ladi:\n' +
      '- **Ajratilgan** (لفيف مفروق): birinchi va oxirgi harf kuchsiz, o‘rtasi kuchli — و-ق-ي (saqladi), و-ل-ي (yaqin bo‘ldi)\n' +
      '- **Qo‘shilgan** (لفيف مقرون): o‘rtadagi va oxirgi harf kuchsiz — ط-و-ي (o‘radi), ق-و-ي (kuchli bo‘ldi)',
    ruleUz:
      'Bu eng qiyin sinf, chunki **ikkita qoida bir vaqtda ishlaydi**.\n\n' +
      'Masalan و-ق-ي:\n' +
      '- Birinchi و — “misol” qoidasi bo‘yicha hozirgi zamonda tushadi\n' +
      '- Oxirgi ي — “noqis” qoidasi bo‘yicha alifga aylanadi\n\n' +
      'Natijada: وَقَى → **يَقِي** (saqlaydi). Uch harfdan ikkitasi o‘zgargan.\n\n' +
      'Va VIII bobda: وقي → **اتَّقَى** (taqvo qildi) — bu yerda و ت ga aylangan, ي esa alifga.\n\n' +
      'Shuning uchun اتَّقَى va تَقْوَى kabi so‘zlarning و-ق-ي o‘zagidan ekanini ko‘rish uchun ikkala qoidani ham bilish kerak.\n\n' +
      'Maslahat: bu sinfni **oxirida** o‘rganing. Avval qolgan oltitasini mustahkam bilib oling.',
    definitionRu: 'Два слабых корневых в одном корне: وقي, طوي.',
    definitionEn: 'Two weak radicals in one root: وقي, طوي.'
  }
]
