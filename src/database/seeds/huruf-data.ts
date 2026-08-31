import { Attachment, GrammarEffect, ParticleCategory } from '../../huruf/enums/huruf.enum'

export interface ParticleSeed {
  arabic: string
  /** Corpus lemma, when it differs from the form shown to the learner. */
  corpusLemma?: string
  transliteration?: string
  category: ParticleCategory
  attachment?: Attachment
  grammarEffect?: GrammarEffect
  shortUz: string
  meaningUz: string
  meaningRu?: string
  meaningEn?: string
  effectNoteUz?: string
  exampleSura?: number
  exampleAyah?: number
  exampleNoteUz?: string
}

/**
 * The function words. Explanations are long and plain on purpose: these are the
 * words that carry the grammar, and a learner who only memorises a one-word
 * gloss for إِنَّ still cannot read a sentence.
 *
 * Frequencies are filled in from the corpus at seed time, not hard-coded here.
 */
export const PARTICLES: readonly ParticleSeed[] = [
  // ── حروف الجر — prepositions ────────────────────────────────────────────
  {
    arabic: 'مِن',
    transliteration: 'min',
    category: ParticleCategory.PREPOSITION,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...dan',
    exampleSura: 113,
    exampleAyah: 2,
    exampleNoteUz: 'مِن شَرِّ — “yomonligidan”. شَرّ so‘zi مِن dan keyin kelgani uchun oxirida kasra: شَرِّ.',
    effectNoteUz: 'Keyingi otni **majrur** qiladi — oxiriga kasra (ِ) yoki tanvin kasra (ٍ) qo‘yiladi.',
    meaningUz:
      'Qur’ondagi **eng ko‘p uchraydigan so‘z**. Asosiy ma’nosi — “...dan”, boshlanish nuqtasi:\n\n' +
      '- مِنَ ٱلْمَسْجِدِ — “masjiddan”\n' +
      '- مِنَ ٱلسَّمَآءِ — “osmondan”\n\n' +
      'Lekin uning yana bir muhim vazifasi bor: **“ba’zisi” ma’nosi**. مِنَ ٱلنَّاسِ — “odamlardan (ba’zilari)”. Qur’onda bu juda ko‘p uchraydi: مِنَ ٱلنَّاسِ مَن يَقُولُ — “odamlardan shundaylari borki, aytadi”.\n\n' +
      'Uchinchisi — **turini bildirish**: خَاتَمٌ مِن ذَهَبٍ “oltindan uzuk”.\n\n' +
      '**Grammatik ta’siri:** keyingi so‘zning oxirini kasraga aylantiradi. Bu tasodifiy emas — barcha jar harflari shunday qiladi. Shuning uchun مِن ni ko‘rsangiz, keyingi so‘z oxirida kasra kutasiz.',
    meaningRu:
      'Предлог «из, от». Также указывает на часть («некоторые из») и на материал. Ставит следующее имя в родительный падеж.',
    meaningEn:
      'Preposition "from". Also marks a part of a whole, and material. Puts the following noun in the genitive.'
  },
  {
    arabic: 'فِي',
    transliteration: 'fī',
    category: ParticleCategory.PREPOSITION,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...da, ichida',
    exampleSura: 2,
    exampleAyah: 10,
    exampleNoteUz: 'فِى قُلُوبِهِم — “qalblarida”. قُلُوب oxirida kasra, chunki فِي dan keyin kelgan.',
    effectNoteUz: 'Keyingi otni **majrur** qiladi — kasra.',
    meaningUz:
      '“...da, ichida” — joy va vaqt bildiradi:\n\n' +
      '- فِى ٱلْأَرْضِ — “yerda”\n' +
      '- فِى يَوْمٍ — “bir kunda”\n\n' +
      'Qur’onda ko‘pincha **ko‘chma ma’noda** ham keladi: فِى قُلُوبِهِم مَّرَضٌ — “qalblarida kasallik bor”. Bu yerda “ichida” jismoniy emas, ruhiy.\n\n' +
      'Yana bir ishlatilishi — **sabab**: “...haqida, ...tufayli”. فِى سَبِيلِ ٱللَّهِ — “Alloh yo‘lida”.',
    meaningRu: 'Предлог «в», о месте и времени, часто переносно. Родительный падеж.',
    meaningEn: 'Preposition "in", of place and time, often figurative. Genitive.'
  },
  {
    arabic: 'عَلَى',
    transliteration: 'ʿalā',
    category: ParticleCategory.PREPOSITION,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...ustida, ...ga',
    exampleSura: 2,
    exampleAyah: 5,
    exampleNoteUz: 'عَلَىٰ هُدًى — “hidoyat ustida”, ya’ni “to‘g‘ri yo‘lda”.',
    effectNoteUz: 'Keyingi otni **majrur** qiladi.',
    meaningUz:
      'Asosiy ma’nosi “ustida”:\n\n' +
      '- عَلَى ٱلْأَرْضِ — “yer ustida”\n\n' +
      'Lekin Qur’onda ko‘proq **ko‘chma** ma’noda: “...da turish, ...ga ega bo‘lish”:\n' +
      '- عَلَىٰ هُدًى مِّن رَّبِّهِمْ — “Rabbilaridan bo‘lgan hidoyat ustida”\n\n' +
      'Uchinchi ma’nosi — **majburiyat, zarar**: عَلَيْهِ “uning zimmasida, uning ziyoniga”. Fotihada عَلَيْهِمْ — “ularga (g‘azab qilingan)”.\n\n' +
      'Diqqat: عَلَى olmosh qo‘shilganda **عَلَيْ** ga aylanadi: عَلَيْهِ، عَلَيْكَ، عَلَيْنا. Bu qoidani bilmasangiz, عَلَيْهِم ni ko‘rib عَلَى ekanini tanimaysiz.',
    meaningRu: 'Предлог «на», часто переносно; также обязанность или ущерб. Родительный падеж.',
    meaningEn: 'Preposition "upon", often figurative; also obligation or detriment. Genitive.'
  },
  {
    arabic: 'إِلَى',
    transliteration: 'ilā',
    category: ParticleCategory.PREPOSITION,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...ga, tomon',
    exampleSura: 2,
    exampleAyah: 14,
    exampleNoteUz: 'إِلَىٰ شَيَٰطِينِهِمْ — “o‘z shaytonlariga (qaytganda)”.',
    effectNoteUz: 'Keyingi otni **majrur** qiladi.',
    meaningUz:
      '“...ga, ...tomon, ...gacha” — **yo‘nalish va chegara**.\n\n' +
      'مِن bilan juftlik hosil qiladi: مِن boshlanish nuqtasi, إِلَى tugash nuqtasi.\n' +
      '- مِنَ ٱلْمَسْجِدِ ٱلْحَرَامِ إِلَى ٱلْمَسْجِدِ ٱلْأَقْصَا — “Masjidul-Haromdan Masjidul-Aqsogacha”\n\n' +
      'Vaqt uchun ham: إِلَىٰ يَوْمِ ٱلْقِيَٰمَةِ — “qiyomat kunigacha”.\n\n' +
      'عَلَى kabi, olmosh qo‘shilganda **إِلَيْ** ga aylanadi: إِلَيْهِ، إِلَيْكَ، إِلَيْنا.',
    meaningRu: 'Предлог «к, до» — направление и предел. Родительный падеж.',
    meaningEn: 'Preposition "to, towards, until" — direction and limit. Genitive.'
  },
  {
    arabic: 'عَن',
    transliteration: 'ʿan',
    category: ParticleCategory.PREPOSITION,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...dan, haqida',
    exampleSura: 2,
    exampleAyah: 217,
    exampleNoteUz: 'يَسْـَٔلُونَكَ عَنِ ٱلشَّهْرِ — “sendan oy haqida so‘raydilar”.',
    effectNoteUz: 'Keyingi otni **majrur** qiladi.',
    meaningUz:
      'Ikkita asosiy ma’nosi bor va ular boshqa-boshqa:\n\n' +
      '**1. “...dan uzoqlashish”** — مِن dan farqi shu: مِن “chiqish”, عَن esa “yuz o‘girib ketish”.\n' +
      '- أَعْرَضَ عَنْهُ — “undan yuz o‘girdi”\n\n' +
      '**2. “...haqida”** — so‘rash, gapirish fe’llari bilan:\n' +
      '- يَسْـَٔلُونَكَ عَنِ ٱلرُّوحِ — “sendan ruh haqida so‘raydilar”\n\n' +
      'Olmosh bilan: عَنْهُ، عَنْكَ، عَنّا (عَن + نا = عَنّا).',
    meaningRu: 'Предлог «от» (удаление) и «о» (тема). Родительный падеж.',
    meaningEn: 'Preposition "away from" and "about". Genitive.'
  },
  {
    arabic: 'بِ',
    transliteration: 'bi-',
    category: ParticleCategory.PREPOSITION,
    attachment: Attachment.PREFIX,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...bilan, ...da',
    exampleSura: 1,
    exampleAyah: 1,
    exampleNoteUz: 'بِسْمِ ٱللَّهِ — “Alloh nomi bilan”. بِ qo‘shilgani uchun اسْم oxirida kasra: بِسْمِ.',
    effectNoteUz: 'Keyingi otga **yopishib yoziladi** va uni **majrur** qiladi.',
    meaningUz:
      'Bu **qo‘shilib yoziladigan** yuklama — alohida so‘z emas, keyingi so‘zning boshiga yopishadi.\n\n' +
      'Ma’nolari ko‘p, eng asosiylari:\n\n' +
      '**1. Vosita, “...bilan”:** بِسْمِ ٱللَّهِ — “Alloh nomi bilan”\n' +
      '**2. Joy, “...da”:** بِمَكَّةَ — “Makkada”\n' +
      '**3. Fe’lni to‘ldirish:** ba’zi fe’llar بِ talab qiladi — آمَنَ بِ “...ga imon keltirdi”, كَفَرَ بِ “...ni inkor qildi”\n\n' +
      '**Muhim:** بِ qo‘shilganda so‘zning boshidagi alif tushib qoladi: اسْم → بِسْمِ (بِاسْمِ emas). Shuning uchun بِسْمِ ni ko‘rib, o‘zagi س-م-و ekanini bilish uchun bu qoidani bilish kerak.',
    meaningRu: 'Слитный предлог «с, посредством, в». Родительный падеж.',
    meaningEn: 'Attached preposition "with, by, in". Genitive.'
  },
  {
    arabic: 'لِ',
    transliteration: 'li-',
    category: ParticleCategory.PREPOSITION,
    attachment: Attachment.PREFIX,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...uchun, ...niki',
    exampleSura: 1,
    exampleAyah: 2,
    exampleNoteUz: 'ٱلْحَمْدُ لِلَّهِ — “hamd Allohga xos”. لِ + ٱللَّه = لِلَّه.',
    effectNoteUz: 'Qo‘shilib yoziladi, keyingi otni **majrur** qiladi.',
    meaningUz:
      'Qo‘shilib yoziladigan yuklama. Ikki asosiy vazifasi:\n\n' +
      '**1. Egalik, “...niki, ...ga xos”:**\n' +
      '- ٱلْحَمْدُ لِلَّهِ — “barcha hamd Allohga xos”\n' +
      '- لَهُ ٱلْمُلْكُ — “mulk Unikidir”\n\n' +
      '**2. Maqsad, “...uchun”:**\n' +
      '- لِتَعْلَمُوا۟ — “bilishingiz uchun”\n\n' +
      'Diqqat: ikkinchi ma’noda **fe’ldan oldin** kelsa, fe’lni **mansub** qiladi (oxiri fathaga o‘tadi va ن tushadi): تَعْلَمُونَ → لِتَعْلَمُوا۟.\n\n' +
      'Yana: لِ + ٱل = لِلْ. Masalan لِلْمُتَّقِينَ — “taqvodorlar uchun”.',
    meaningRu: 'Слитный предлог «для, принадлежит». С глаголом — целевое значение и винительный падеж.',
    meaningEn: 'Attached "for, belonging to". Before a verb it marks purpose and takes the subjunctive.'
  },
  {
    arabic: 'كَ',
    transliteration: 'ka-',
    category: ParticleCategory.PREPOSITION,
    attachment: Attachment.PREFIX,
    grammarEffect: GrammarEffect.GENITIVE,
    shortUz: '...kabi, ...dek',
    exampleSura: 2,
    exampleAyah: 17,
    exampleNoteUz: 'كَمَثَلِ ٱلَّذِى — “o‘shaning misoliga o‘xshaydi”.',
    effectNoteUz: 'Qo‘shilib yoziladi, keyingi otni **majrur** qiladi.',
    meaningUz:
      '“...kabi, ...dek” — o‘xshatish.\n\n' +
      '- كَمَثَلِ ٱلْحِمَارِ — “eshak misolidek”\n' +
      '- كَٱلْحِجَارَةِ — “toshdek”\n\n' +
      'Qur’onda ko‘pincha **masal keltirishda** ishlatiladi: مَثَلُهُمْ كَمَثَلِ... — “ularning misoli ...ning misolidek”.\n\n' +
      'Diqqat: كَ ni olmosh ـكَ (“sening”) bilan chalkashtirmang. Birinchisi so‘z **boshida**, ikkinchisi **oxirida** turadi.',
    meaningRu: 'Слитный предлог «как, подобно». Родительный падеж.',
    meaningEn: 'Attached "like, as". Genitive.'
  },

  // ── أداة التعريف ────────────────────────────────────────────────────────
  {
    arabic: 'ال',
    transliteration: 'al-',
    category: ParticleCategory.DEFINITE_ARTICLE,
    attachment: Attachment.PREFIX,
    shortUz: 'aniqlik artikli (“o‘sha”)',
    exampleSura: 2,
    exampleAyah: 2,
    exampleNoteUz: 'ذَٰلِكَ ٱلْكِتَٰبُ — “o‘sha kitob”. ال bo‘lmasa كِتَابٌ “bir kitob” bo‘lardi.',
    effectNoteUz: 'Otni **aniq** qiladi va tanvinni yo‘qotadi: كِتَابٌ → ٱلْكِتَابُ.',
    meaningUz:
      'Bu **eng ko‘p uchraydigan qo‘shimcha** — Qur’ondagi har 16 bo‘lakdan bittasi.\n\n' +
      'Vazifasi: otni **aniq** qilish. O‘zbekchada bunday artikl yo‘q, lekin farqni his qilish oson:\n' +
      '- كِتَابٌ — “bir kitob” (qaysidir)\n' +
      '- ٱلْكِتَابُ — “o‘sha kitob” (ma’lum, aniq)\n\n' +
      '**Ikki muhim belgisi:**\n\n' +
      '1. ال qo‘shilsa, **tanvin yo‘qoladi**: كِتَابٌ (-un) → ٱلْكِتَابُ (-u). Ya’ni ikki damma bir dammaga aylanadi.\n\n' +
      '2. Ba’zi harflar oldida **ل o‘qilmaydi**, keyingi harf shaddalanadi. Bular “quyosh harflari”: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.\n' +
      '- ٱلشَّمْس — “ash-shams” deb o‘qiladi, “al-shams” emas\n' +
      '- ٱلرَّحْمَٰن — “ar-rahmon”\n\n' +
      'Qolgan harflar “oy harflari” — ular oldida ل o‘qiladi: ٱلْقَمَر “al-qamar”, ٱلْكِتَاب “al-kitab”.',
    meaningRu: 'Определённый артикль. Убирает танвин; перед «солнечными» буквами ل не читается.',
    meaningEn: 'The definite article. Removes nunation; its ل assimilates before "sun letters".'
  },

  // ── حروف العطف — conjunctions ───────────────────────────────────────────
  {
    arabic: 'وَ',
    transliteration: 'wa-',
    category: ParticleCategory.CONJUNCTION,
    attachment: Attachment.PREFIX,
    shortUz: 'va',
    exampleSura: 1,
    exampleAyah: 7,
    exampleNoteUz: 'وَلَا ٱلضَّآلِّينَ — “va adashganlarniki ham emas”.',
    effectNoteUz: 'Bog‘laydi; bog‘langan so‘z oldingisi bilan **bir xil holatda** bo‘ladi.',
    meaningUz:
      '**Qur’ondagi eng ko‘p uchraydigan bo‘lak** — 9594 marta. Har bir sahifada o‘nlab marta.\n\n' +
      'Asosiy vazifasi — oddiy “va”:\n' +
      '- ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ — “osmonlar va yer”\n\n' +
      'Lekin uchta boshqa vazifasi ham bor va ularni bilish kerak:\n\n' +
      '**1. Qasam vovi:** so‘z boshida kelib qasamni bildiradi — وَٱلْعَصْرِ “asr vaqtiga qasam”, وَٱلضُّحَىٰ “chosh vaqtiga qasam”. Bunda keyingi ot **majrur** bo‘ladi.\n\n' +
      '**2. Hol vovi:** “...holida” degan ma’no beradi — وَهُمْ نَآئِمُونَ “ular uxlagan holda”.\n\n' +
      '**3. Yangi gap boshlash:** ko‘p oyatlar وَ bilan boshlanadi, bu “va” emas, shunchaki yangi jumla belgisi.\n\n' +
      'Qaysi biri ekanini kontekst aytadi. Boshlovchi uchun: agar وَ dan keyin ot **kasra** bilan kelsa va gap boshida bo‘lsa — bu qasam.',
    meaningRu: 'Самая частая единица в Коране. «И», а также вав клятвы, вав состояния и начало нового предложения.',
    meaningEn:
      'The most frequent unit in the Quran. "And", plus the oath wāw, the circumstantial wāw, and sentence-initial wāw.'
  },
  {
    arabic: 'فَ',
    transliteration: 'fa-',
    category: ParticleCategory.CONJUNCTION,
    attachment: Attachment.PREFIX,
    shortUz: 'keyin, shuning uchun',
    exampleSura: 2,
    exampleAyah: 22,
    exampleNoteUz: 'فَأَخْرَجَ بِهِۦ — “va shu bilan chiqardi”. فَ ketma-ketlikni bildiradi.',
    effectNoteUz: 'Bog‘laydi; **darhol ketma-ketlik** yoki **natija** ma’nosini qo‘shadi.',
    meaningUz:
      'وَ ga o‘xshaydi, lekin farqi bor va bu farq muhim:\n\n' +
      '- **وَ** — shunchaki “va”, tartib muhim emas\n' +
      '- **فَ** — “keyin darhol”, ya’ni ketma-ketlik bor\n\n' +
      'Misol: جَآءَ زَيْدٌ فَعَمْرٌو — “Zayd keldi, keyin Amr”. Bu yerda Zayd birinchi kelgan.\n\n' +
      'Ikkinchi ma’nosi — **natija, “shuning uchun”**:\n' +
      '- فَٱذْكُرُونِىٓ أَذْكُرْكُمْ — “Meni yod eting, shunda Men sizni yod etaman”\n\n' +
      'Uchinchi ishlatilishi — **shart javobi**: agar gapda إِن (“agar”) bo‘lsa, javob قسمан فَ bilan boshlanadi.',
    meaningRu: 'Соединяет с оттенком немедленной последовательности или следствия.',
    meaningEn: 'Joins with a sense of immediate sequence or consequence.'
  },
  {
    arabic: 'ثُمّ',
    transliteration: 'thumma',
    category: ParticleCategory.CONJUNCTION,
    shortUz: 'so‘ng, keyin',
    exampleSura: 2,
    exampleAyah: 28,
    exampleNoteUz: 'ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ — “so‘ng sizni o‘ldiradi, so‘ng tiriltiradi”.',
    meaningUz:
      '“So‘ng, keyin” — lekin فَ dan farqi **vaqt oralig‘ida**:\n\n' +
      '- فَ — darhol keyin\n' +
      '- ثُمَّ — bir muddat o‘tib keyin\n\n' +
      'Misol: ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ — “so‘ng sizni o‘ldiradi, so‘ng (uzoq vaqtdan keyin) tiriltiradi”. Bu yerda oralarida uzoq vaqt bor, shuning uchun ثُمَّ ishlatilgan.\n\n' +
      'Ya’ni bu uchta bog‘lovchi vaqt masofasi bo‘yicha saf tortadi: **وَ** (tartibsiz) → **فَ** (darhol) → **ثُمَّ** (keyinroq).',
    meaningRu: '«Затем», с промежутком во времени — в отличие от فَ.',
    meaningEn: '"Then", with a gap in time — unlike فَ.'
  },
  {
    arabic: 'أَو',
    transliteration: 'aw',
    category: ParticleCategory.CONJUNCTION,
    shortUz: 'yoki',
    exampleSura: 2,
    exampleAyah: 19,
    exampleNoteUz: 'أَوْ كَصَيِّبٍ — “yoki yomg‘ir kabi”.',
    meaningUz:
      '“Yoki” — tanlov beradi.\n\n' +
      '- أَوْ كَصَيِّبٍ مِّنَ ٱلسَّمَآءِ — “yoki osmondan tushgan jala kabi”\n\n' +
      'أَم bilan farqi: **أَو** oddiy tanlov (“u yoki bu”), **أَم** esa savol ichidagi tanlov (“u mi, bu mi?”).',
    meaningRu: '«Или» — простой выбор.',
    meaningEn: '"Or" — a plain alternative.'
  },
  {
    arabic: 'بَل',
    transliteration: 'bal',
    category: ParticleCategory.CONJUNCTION,
    shortUz: 'yo‘q, balki; aksincha',
    exampleSura: 2,
    exampleAyah: 88,
    exampleNoteUz: 'بَل لَّعَنَهُمُ ٱللَّهُ — “Yo‘q, balki Alloh ularni la’natladi”.',
    meaningUz:
      'Oldingi gapni **rad qilib, to‘g‘risini aytadi**. O‘zbekchada “yo‘q, balki” yoki “aksincha”.\n\n' +
      '- قَالُوا۟ قُلُوبُنَا غُلْفٌۢ ۚ بَل لَّعَنَهُمُ ٱللَّهُ — “Qalblarimiz berk dedilar. Yo‘q, balki Alloh ularni la’natladi”\n\n' +
      'Ya’ni بَل dan oldingi gap **noto‘g‘ri** ekanini bildiradi. Bu Qur’onda munozarada ko‘p ishlatiladi.',
    meaningRu: '«Нет, напротив» — отвергает предыдущее и вводит верное.',
    meaningEn: '"Rather, on the contrary" — rejects what came before.'
  },

  // ── حروف النفي — negation ───────────────────────────────────────────────
  {
    arabic: 'لا',
    transliteration: 'lā',
    category: ParticleCategory.NEGATION,
    shortUz: 'yo‘q; ...ma',
    exampleSura: 2,
    exampleAyah: 2,
    exampleNoteUz: 'لَا رَيْبَ فِيهِ — “unda shubha yo‘q”. رَيْبَ oxirida fatha, chunki لا uni mansub qilgan.',
    effectNoteUz: 'Turiga qarab: ot bilan **mansub**, fe’l bilan odatda o‘zgartirmaydi.',
    meaningUz:
      'Eng keng qo‘llanadigan inkor. Uchta asosiy ishlatilishi:\n\n' +
      '**1. Umumiy inkor (لا النافية للجنس):** “umuman yo‘q”\n' +
      '- لَا رَيْبَ فِيهِ — “unda hech qanday shubha yo‘q”\n' +
      '- لَآ إِلَٰهَ إِلَّا ٱللَّهُ — “Allohdan boshqa iloh yo‘q”\n' +
      'Bunda keyingi ot **fatha** oladi va tanvinsiz bo‘ladi.\n\n' +
      '**2. Hozirgi/kelasi zamon inkori:**\n' +
      '- لَا يَعْلَمُونَ — “bilmaydilar”\n\n' +
      '**3. Taqiq (nahy):** buyruqni man qilish\n' +
      '- لَا تَقْرَبُوا۟ — “yaqinlashmanglar”\n' +
      'Bunda fe’l **majzum** bo‘ladi — oxiridagi ن tushadi.\n\n' +
      'Ikkinchi va uchinchisini ajratish oson: agar “sen/siz” shakli bo‘lsa va ma’no buyruqqa o‘xshasa — bu taqiq.',
    meaningRu: 'Основное отрицание: общее «нет», отрицание настоящего времени и запрет.',
    meaningEn: 'The main negator: absolute "there is no", present-tense negation, and prohibition.'
  },
  {
    arabic: 'ما',
    transliteration: 'mā',
    category: ParticleCategory.NEGATION,
    shortUz: 'nima; ...emas',
    exampleSura: 2,
    exampleAyah: 9,
    exampleNoteUz: 'وَمَا يَخْدَعُونَ إِلَّآ أَنفُسَهُمْ — “o‘zlaridan boshqasini aldamaydilar”.',
    meaningUz:
      'Bu so‘z **ikki butunlay boshqa vazifada** keladi va boshlovchilar ko‘p chalkashadi:\n\n' +
      '**1. Inkor — “...emas”:**\n' +
      '- وَمَا هُم بِمُؤْمِنِينَ — “ular mo‘min emaslar”\n' +
      '- مَا كَانَ — “bo‘lmagan edi”\n\n' +
      '**2. Nisbiy olmosh — “nimaki, o‘sha narsa”:**\n' +
      '- مَا فِى ٱلسَّمَٰوَٰتِ — “osmonlardagi narsa(lar)”\n' +
      '- مَا خَلَقَ — “yaratgan narsasi”\n\n' +
      '**Qanday ajratish kerak?** Oddiy usul: ما dan keyin gap **to‘liq** bo‘lsa va ma’no “...emas” chiqsa — inkor. Agar ما o‘zi gapda **ega yoki to‘ldiruvchi** o‘rnida tursa — nisbiy olmosh.\n\n' +
      'Uchinchi, kamroq: **savol** — “nima?”: مَا ٱلْحَآقَّةُ — “Al-Haaqqa nima?”',
    meaningRu: 'Отрицание «не» и относительное местоимение «то, что». Реже — вопрос «что?».',
    meaningEn: 'Both the negator "not" and the relative "that which". Less often the question "what?".'
  },
  {
    arabic: 'لَم',
    transliteration: 'lam',
    category: ParticleCategory.NEGATION,
    grammarEffect: GrammarEffect.JUSSIVE_VERB,
    shortUz: '...madi (o‘tgan zamon inkori)',
    exampleSura: 112,
    exampleAyah: 3,
    exampleNoteUz: 'لَمْ يَلِدْ وَلَمْ يُولَدْ — “tug‘magan va tug‘ilmagan”. Shakl hozirgi zamon, ma’no o‘tgan.',
    effectNoteUz: 'Keyingi fe’lni **majzum** qiladi (oxiri sukun) va ma’nosini **o‘tgan zamonga** o‘tkazadi.',
    meaningUz:
      'Bu juda muhim va o‘ziga xos: **hozirgi zamon fe’lini o‘tgan zamon inkoriga aylantiradi**.\n\n' +
      '- يَلِدُ “tug‘adi” → لَمْ يَلِدْ “tug‘magan”\n' +
      '- يَعْلَمُ “biladi” → لَمْ يَعْلَمْ “bilmadi”\n\n' +
      'Ya’ni **shakli hozirgi zamon, ma’nosi o‘tgan zamon**. Bu boshlovchini chalkashtiradi — لَمْ يَعْلَمْ ni ko‘rib “bilmaydi” deb tarjima qilib yuborish oson. To‘g‘risi “bilmadi”.\n\n' +
      '**Grammatik ta’siri:** fe’l oxiri **sukun** bo‘ladi (majzum): يَعْلَمُ → يَعْلَمْ. Agar ko‘plik bo‘lsa, oxiridagi ن tushadi: يَعْلَمُونَ → لَمْ يَعْلَمُوا۟.\n\n' +
      'ما كَانَ bilan farqi: ikkalasi ham o‘tgan zamonni inkor qiladi, lekin لَم qisqaroq va Qur’onda ko‘proq.',
    meaningRu: 'Превращает настоящее время в отрицание прошедшего; ставит глагол в усечённое наклонение.',
    meaningEn: 'Turns a present-tense verb into a past negation and puts it in the jussive.'
  },
  {
    arabic: 'لَن',
    transliteration: 'lan',
    category: ParticleCategory.NEGATION,
    grammarEffect: GrammarEffect.ACCUSATIVE_VERB,
    shortUz: 'hech qachon ...maydi',
    exampleSura: 2,
    exampleAyah: 95,
    exampleNoteUz: 'وَلَن يَتَمَنَّوْهُ — “uni hech qachon orzu qilmaydilar”.',
    effectNoteUz: 'Keyingi fe’lni **mansub** qiladi (oxiri fatha; ko‘plikda ن tushadi).',
    meaningUz:
      '**Kelasi zamonni qat’iy inkor qiladi**: “hech qachon ...maydi”.\n\n' +
      '- لَن تَنَالُوا۟ ٱلْبِرَّ — “yaxshilikka hech erisha olmaysizlar”\n\n' +
      'لا bilan farqi kuchda: **لا** oddiy inkor, **لَن** esa “aslo, hech qachon” degan qat’iylik qo‘shadi.\n\n' +
      'لَم bilan juftlik: **لَم** o‘tmishni, **لَن** kelajakni inkor qiladi. Ikkalasini yonma-yon eslab qolish oson.\n\n' +
      '**Grammatik ta’siri:** fe’l oxiri fathaga o‘tadi: يَنَالُ → لَن يَنَالَ. Ko‘plikda ن tushadi: تَنَالُونَ → لَن تَنَالُوا۟.',
    meaningRu: 'Категорическое отрицание будущего; ставит глагол в сослагательное наклонение.',
    meaningEn: 'Emphatic negation of the future; puts the verb in the subjunctive.'
  },

  // ── حروف التوكيد والنصب ─────────────────────────────────────────────────
  {
    arabic: 'إِنّ',
    transliteration: 'inna',
    category: ParticleCategory.EMPHASIS,
    grammarEffect: GrammarEffect.ACCUSATIVE_NOUN,
    shortUz: 'albatta, haqiqatan',
    exampleSura: 2,
    exampleAyah: 6,
    exampleNoteUz: 'إِنَّ ٱلَّذِينَ كَفَرُوا۟ — “albatta, kofir bo‘lganlar...”. ٱلَّذِينَ — إِنّ ning ismi.',
    effectNoteUz: 'Keyingi otni **mansub** (fatha), undan keyingi xabarni **marfu’** (damma) qiladi.',
    meaningUz:
      'Qur’ondagi eng muhim grammatik yuklamalardan biri. Ma’nosi — **ta’kid**: “albatta, haqiqatan, shubhasiz”.\n\n' +
      '- إِنَّ ٱللَّهَ غَفُورٌ رَّحِيمٌ — “Albatta, Alloh mag‘firatli, rahmlidir”\n\n' +
      '**Grammatik ta’siri — bu eng muhimi.** إِنّ gapni ikkiga bo‘ladi:\n' +
      '1. **Ismi** — darhol keyingi ot, **fatha** oladi: ٱللَّهَ (ٱللَّهُ emas!)\n' +
      '2. **Xabari** — undan keyingisi, **damma** oladi: غَفُورٌ\n\n' +
      'Ya’ni إِنَّ ٱللَّهَ غَفُورٌ da ikkita so‘z ikki xil holatda va bu tasodifiy emas.\n\n' +
      'Bu qoidani bilsangiz, oyat o‘qiyotib “nega bu yerda fatha?” degan savolingizga javob topasiz.\n\n' +
      '**Oilasi:** أَنّ، كَأَنّ، لٰكِنّ، لَيْتَ، لَعَلّ — hammasi bir xil ishlaydi. Ularni birga eslab qoling.',
    meaningRu: 'Частица усиления «поистине». Ставит следующее имя в винительный, а сказуемое — в именительный.',
    meaningEn: 'The emphatic "indeed". Puts its noun in the accusative and its predicate in the nominative.'
  },
  {
    arabic: 'أَنّ',
    transliteration: 'anna',
    category: ParticleCategory.EMPHASIS,
    grammarEffect: GrammarEffect.ACCUSATIVE_NOUN,
    shortUz: '...ligini',
    exampleSura: 2,
    exampleAyah: 25,
    exampleNoteUz: 'أَنَّ لَهُمْ جَنَّٰتٍ — “ular uchun jannatlar borligini”.',
    effectNoteUz: 'إِنّ kabi: ismini **mansub**, xabarini **marfu’** qiladi.',
    meaningUz:
      'إِنّ ning “ichkariga qo‘yiladigan” shakli. إِنّ gap boshida, أَنّ esa gap **ichida** keladi.\n\n' +
      'O‘zbekchada “...ligini, ...ini” bilan tarjima qilinadi:\n' +
      '- وَبَشِّرِ ... أَنَّ لَهُمْ جَنَّٰتٍ — “xushxabar ber ... ular uchun jannatlar **borligini**”\n' +
      '- أَعْلَمُ أَنَّ ٱللَّهَ عَلِيمٌ — “Allohning bilguvchi **ekanini** bilaman”\n\n' +
      'Grammatik ta’siri إِنّ bilan bir xil.\n\n' +
      '**Chalkashmaslik uchun:** أَن (bitta ن, shaddasiz) — bu boshqa so‘z, u fe’ldan oldin keladi va uni mansub qiladi. أَنّ (shaddali) — otdan oldin keladi.',
    meaningRu: 'Как إِنّ, но внутри предложения: «что, то, что».',
    meaningEn: 'Like إِنّ but clause-internal: "that".'
  },
  {
    arabic: 'لَعَلّ',
    transliteration: 'laʿalla',
    category: ParticleCategory.EMPHASIS,
    grammarEffect: GrammarEffect.ACCUSATIVE_NOUN,
    shortUz: 'shoyad, ...ishi uchun',
    exampleSura: 2,
    exampleAyah: 21,
    exampleNoteUz: 'لَعَلَّكُمْ تَتَّقُونَ — “toki taqvodor bo‘lasizlar”.',
    effectNoteUz: 'إِنّ oilasidan: ismini **mansub** qiladi.',
    meaningUz:
      '“Shoyad, balki, umid qilinadiki” — **umid va maqsad**.\n\n' +
      'Qur’onda ko‘pincha oyat oxirida keladi va maqsadni bildiradi:\n' +
      '- لَعَلَّكُمْ تَتَّقُونَ — “toki taqvodor bo‘lasizlar”\n' +
      '- لَعَلَّكُمْ تَعْقِلُونَ — “toki aql yuritasizlar”\n' +
      '- لَعَلَّكُمْ تَشْكُرُونَ — “toki shukr qilasizlar”\n\n' +
      'Bu uchtasi Qur’onda juda ko‘p takrorlanadi — ularni yodlab qo‘ysangiz, o‘nlab oyatni darrov tushunasiz.\n\n' +
      'إِنّ oilasidan bo‘lgani uchun ismi mansub bo‘ladi: لَعَلَّكُمْ da ـكُم — uning ismi.',
    meaningRu: '«Быть может, чтобы» — надежда и цель. Из семьи إِنّ.',
    meaningEn: '"Perhaps, so that" — hope and purpose. Part of the إِنّ family.'
  },
  {
    arabic: 'كَأَنّ',
    transliteration: 'kaʾanna',
    category: ParticleCategory.EMPHASIS,
    grammarEffect: GrammarEffect.ACCUSATIVE_NOUN,
    shortUz: 'go‘yo, xuddi',
    exampleSura: 2,
    exampleAyah: 20,
    meaningUz:
      '“Go‘yo, xuddi” — o‘xshatish, lekin كَ dan kuchliroq va butun gapga taalluqli.\n\n' +
      '- كَأَنَّهُمْ خُشُبٌ مُّسَنَّدَةٌ — “go‘yo ular suyab qo‘yilgan yog‘ochlar”\n\n' +
      'كَ (bitta so‘zga o‘xshatish) va كَأَنّ (butun holatga o‘xshatish) farqini his qiling.\n\n' +
      'إِنّ oilasidan — ismi mansub bo‘ladi.',
    meaningRu: '«Как будто» — сравнение целой ситуации. Из семьи إِنّ.',
    meaningEn: '"As though" — comparing a whole situation. Part of the إِنّ family.'
  },
  {
    arabic: 'لٰكِنّ',
    transliteration: 'lākinna',
    category: ParticleCategory.EMPHASIS,
    grammarEffect: GrammarEffect.ACCUSATIVE_NOUN,
    shortUz: 'lekin, biroq',
    exampleSura: 2,
    exampleAyah: 12,
    meaningUz:
      '“Lekin, biroq” — oldingi gapga **qarshi** qo‘yadi.\n\n' +
      '- وَلَٰكِنَّ ٱللَّهَ ذُو فَضْلٍ — “Lekin Alloh fazl egasidir”\n\n' +
      'Shaddasiz لٰكِن ham bor — u oddiy bog‘lovchi, grammatik ta’siri yo‘q. Shaddali لٰكِنّ esa إِنّ oilasidan va ismini mansub qiladi.\n\n' +
      'Bu ikkalasini yozuvda ajratish: **shadda bor-yo‘qligiga** qarang.',
    meaningRu: '«Но, однако». Со шаддой — из семьи إِنّ, ставит имя в винительный.',
    meaningEn: '"But". With shadda it belongs to the إِنّ family and takes the accusative.'
  },

  // ── حروف الشرط — conditionals ───────────────────────────────────────────
  {
    arabic: 'إِن',
    transliteration: 'in',
    category: ParticleCategory.CONDITION,
    grammarEffect: GrammarEffect.JUSSIVE_VERB,
    shortUz: 'agar',
    exampleSura: 2,
    exampleAyah: 23,
    exampleNoteUz: 'وَإِن كُنتُمْ فِى رَيْبٍ — “agar shubhada bo‘lsangiz”.',
    effectNoteUz: 'Shart va javob fe’llarini **majzum** qiladi.',
    meaningUz:
      '“Agar” — **haqiqiy, bo‘lishi mumkin** bo‘lgan shart.\n\n' +
      '- إِن كُنتُمْ صَٰدِقِينَ — “agar rostgo‘y bo‘lsangiz”\n\n' +
      'لَو bilan farqi juda muhim:\n' +
      '- **إِن** — bo‘lishi mumkin: “agar kelsang” (kelishing mumkin)\n' +
      '- **لَو** — bo‘lmagan/bo‘lmaydigan: “agar kelganingda edi” (kelmagansan)\n\n' +
      'Diqqat: إِن ba’zan **inkor** ma’nosida ham keladi (ما o‘rnida): إِنْ هَٰذَآ إِلَّا — “bu faqat ...dir”. Bunda “agar” deb tarjima qilinmaydi.',
    meaningRu: '«Если» — реальное условие. Ставит оба глагола в усечённое наклонение.',
    meaningEn: '"If" — a real condition. Puts both verbs in the jussive.'
  },
  {
    arabic: 'لَو',
    transliteration: 'law',
    category: ParticleCategory.CONDITION,
    shortUz: 'agar ...bo‘lganda edi',
    exampleSura: 2,
    exampleAyah: 20,
    exampleNoteUz: 'وَلَوْ شَآءَ ٱللَّهُ لَذَهَبَ — “Agar Alloh xohlaganda edi, olib ketardi”.',
    meaningUz:
      '**Bo‘lmagan shart** — “agar ...bo‘lganda edi (lekin bo‘lmadi)”.\n\n' +
      '- لَوْ شَآءَ ٱللَّهُ لَهَدَىٰكُمْ — “Agar Alloh xohlaganda edi, sizlarni hidoyat qilardi”\n\n' +
      'Ya’ni gapdan **shart bajarilmagani** anglashiladi.\n\n' +
      '**Belgisi:** لَو ning javobi odatda **لَـ** bilan boshlanadi: لَوْ ... لَـ... Bu juftlikni ko‘rsangiz, darrov “bo‘lganda edi ... bo‘lardi” deb tarjima qilasiz.\n\n' +
      'Fe’llar odatda **o‘tgan zamonda** keladi, garchi ma’no shartli bo‘lsa ham.',
    meaningRu: '«Если бы» — нереальное условие; ответ часто начинается с لَـ.',
    meaningEn: '"If only / had it been" — a counterfactual; the answer usually opens with لَـ.'
  },
  {
    arabic: 'لَوْلا',
    transliteration: 'lawlā',
    category: ParticleCategory.CONDITION,
    shortUz: 'agar ...bo‘lmasa edi',
    exampleSura: 2,
    exampleAyah: 64,
    meaningUz:
      '“Agar ...bo‘lmaganda edi” — **inkor shart**.\n\n' +
      '- فَلَوْلَا فَضْلُ ٱللَّهِ عَلَيْكُمْ ... لَكُنتُم مِّنَ ٱلْخَٰسِرِينَ — “Agar Allohning fazli bo‘lmaganda edi ... ziyon ko‘ruvchilardan bo‘lardingiz”\n\n' +
      'لَو ning inkor shakli deb qarash mumkin: لَو “bo‘lganda edi”, لَوْلا “bo‘lmaganda edi”.\n\n' +
      'Ikkinchi ma’nosi — **tanbeh, “nega ...qilmadingiz?”**: لَوْلَا جَآءُو — “nega keltirmadilar?”',
    meaningRu: '«Если бы не» — отрицательное условие; также упрёк «почему не...?».',
    meaningEn: '"If not for" — a negative condition; also a reproach, "why did they not…?".'
  },
  {
    arabic: 'إِذا',
    transliteration: 'idhā',
    category: ParticleCategory.CONDITION,
    shortUz: 'qachonki',
    exampleSura: 110,
    exampleAyah: 1,
    exampleNoteUz: 'إِذَا جَآءَ نَصْرُ ٱللَّهِ — “Allohning yordami kelganda”.',
    meaningUz:
      '“Qachonki, ...ganda” — **albatta bo‘ladigan** kelajak hodisa.\n\n' +
      '- إِذَا جَآءَ نَصْرُ ٱللَّهِ وَٱلْفَتْحُ — “Allohning yordami va fath kelganda”\n' +
      '- إِذَا ٱلشَّمْسُ كُوِّرَتْ — “Quyosh o‘ralganda”\n\n' +
      'إِن bilan farqi: **إِن** — bo‘lishi noaniq, **إِذا** — bo‘lishi aniq, faqat vaqti noma’lum.\n\n' +
      'Shuning uchun qiyomat haqidagi oyatlarda deyarli doim إِذا ishlatiladi — chunki qiyomat albatta bo‘ladi.\n\n' +
      'Fe’l shakli o‘tgan zamonda bo‘lsa ham, ma’nosi **kelajak**.',
    meaningRu: '«Когда» — о будущем событии, которое непременно произойдёт.',
    meaningEn: '"When" — of a future event taken as certain.'
  },

  // ── الاستفهام — questions ───────────────────────────────────────────────
  {
    arabic: 'هَل',
    transliteration: 'hal',
    category: ParticleCategory.INTERROGATIVE,
    shortUz: '...mi?',
    exampleSura: 76,
    exampleAyah: 1,
    exampleNoteUz: 'هَلْ أَتَىٰ عَلَى ٱلْإِنسَٰنِ — “Insonga ... kelmadimi?”',
    meaningUz:
      '**Ha/yo‘q savoli** — o‘zbekchadagi “-mi” qo‘shimchasi.\n\n' +
      '- هَلْ أَتَىٰ — “keldimi?”\n' +
      '- هَلْ يَسْتَوِى — “tengmi?”\n\n' +
      'Qur’onda ko‘pincha **so‘roq emas, ta’kid** uchun ishlatiladi. هَلْ يَسْتَوِى ٱلْأَعْمَىٰ وَٱلْبَصِيرُ — “ko‘r bilan ko‘rguvchi tengmi?” — bu savol emas, “teng emas!” degani.\n\n' +
      'Bunday savolga arab tilida “istifhom inkoriy” deyiladi va Qur’onda juda ko‘p.',
    meaningRu: 'Вопрос «ли?». В Коране часто риторический — то есть утверждение.',
    meaningEn: 'The yes/no question marker. In the Quran often rhetorical, i.e. an assertion.'
  },
  {
    arabic: 'كَيْف',
    transliteration: 'kayfa',
    category: ParticleCategory.INTERROGATIVE,
    shortUz: 'qanday',
    exampleSura: 2,
    exampleAyah: 28,
    exampleNoteUz: 'كَيْفَ تَكْفُرُونَ بِٱللَّهِ — “Allohni qanday inkor qilasizlar?”',
    meaningUz:
      '“Qanday, qanaqa” — usulni so‘raydi.\n\n' +
      '- كَيْفَ تَكْفُرُونَ بِٱللَّهِ — “Allohni qanday inkor qilasizlar?”\n' +
      '- أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ — “Rabbing qanday qilganini ko‘rmadingmi?”\n\n' +
      'هَل kabi, bu ham ko‘pincha **ta’kid** uchun: “qanday inkor qilasizlar?” = “inkor qilishingiz mumkin emas!”\n\n' +
      'Oxiri doim **fatha**: كَيْفَ.',
    meaningRu: '«Как?» — часто риторически.',
    meaningEn: '"How?" — often rhetorical.'
  },

  // ── الأسماء الموصولة — relatives ────────────────────────────────────────
  {
    arabic: 'الَّذِي',
    transliteration: 'alladhī',
    category: ParticleCategory.RELATIVE,
    shortUz: 'ki, o‘shaki',
    exampleSura: 2,
    exampleAyah: 21,
    exampleNoteUz: 'رَبَّكُمُ ٱلَّذِى خَلَقَكُمْ — “sizni yaratgan Rabbingizga”.',
    meaningUz:
      '**Nisbiy olmosh** — o‘zbekchada “-gan” sifatdoshi yoki “ki” bilan tarjima qilinadi.\n\n' +
      '- ٱلَّذِى خَلَقَكُمْ — “sizni yaratgan (zot)”\n' +
      '- ٱلَّذِينَ ءَامَنُوا۟ — “imon keltirganlar”\n\n' +
      '**Shakllari son va jinsga qarab o‘zgaradi** — bularni yodlash kerak:\n' +
      '- ٱلَّذِى — bir erkak\n' +
      '- ٱلَّتِى — bir ayol\n' +
      '- ٱلَّذِينَ — ko‘p erkak (Qur’onda eng ko‘p)\n' +
      '- ٱللَّٰتِى / ٱللَّٰٓـِٔى — ko‘p ayol\n\n' +
      'ٱلَّذِينَ ءَامَنُوا۟ (“imon keltirganlar”) va ٱلَّذِينَ كَفَرُوا۟ (“kofir bo‘lganlar”) — Qur’onda eng ko‘p takrorlanadigan iboralar. Ularni bir butun sifatida eslab qoling.',
    meaningRu: 'Относительное местоимение «который». Меняется по роду и числу.',
    meaningEn: 'The relative pronoun "who, which". Inflects for gender and number.'
  },
  {
    arabic: 'مَن',
    transliteration: 'man',
    category: ParticleCategory.RELATIVE,
    shortUz: 'kim; kimki',
    exampleSura: 2,
    exampleAyah: 8,
    exampleNoteUz: 'وَمِنَ ٱلنَّاسِ مَن يَقُولُ — “Odamlardan shundaylari borki, aytadi”.',
    meaningUz:
      'ما kabi, bu ham **ikki vazifada** keladi:\n\n' +
      '**1. Nisbiy — “kimki, shundaylarki”** (aql egalari uchun):\n' +
      '- مَن يَقُولُ — “aytadiganlar”\n' +
      '- مَن كَانَ يُرِيدُ — “kim istagan bo‘lsa”\n\n' +
      '**2. Savol — “kim?”**:\n' +
      '- مَن ذَا ٱلَّذِى يَشْفَعُ — “kim shafoat qila oladi?”\n\n' +
      '**ما bilan taqsimot:** مَن — **aqlli** mavjudotlar uchun (odam, farishta, jin). ما — **aqlsiz** narsalar uchun. Bu farqni bilish tarjimani ancha aniqlashtiradi.\n\n' +
      'Diqqat: مَن (fatha, “kim”) va مِن (kasra, “...dan”) — **butunlay boshqa** so‘zlar. Faqat bitta harakat farq qiladi. Bu boshlovchilar uchun eng ko‘p uchraydigan xato.',
    meaningRu: '«Кто» и «тот, кто» — только о разумных. Не путать с مِن «из».',
    meaningEn: '"Who" and "whoever" — for rational beings only. Not to be confused with مِن "from".'
  },

  // ── الاستثناء ───────────────────────────────────────────────────────────
  {
    arabic: 'إِلّا',
    transliteration: 'illā',
    category: ParticleCategory.EXCEPTION,
    shortUz: '...dan boshqa, magar',
    exampleSura: 2,
    exampleAyah: 255,
    exampleNoteUz: 'لَآ إِلَٰهَ إِلَّا هُوَ — “Undan boshqa iloh yo‘q”.',
    meaningUz:
      '“...dan boshqa, magar, faqat” — **istisno**.\n\n' +
      'Eng mashhur ishlatilishi kalimai tavhidda:\n' +
      '- لَآ إِلَٰهَ إِلَّا ٱللَّهُ — “Allohdan boshqa iloh yo‘q”\n\n' +
      'Bu qurilma **لا ... إِلّا** juftligi deb ataladi va u kuchli ta’kid beradi: avval hammasi inkor qilinadi, keyin bittasi istisno qilinadi. Natijada “faqat va faqat” degan ma’no chiqadi.\n\n' +
      'Qur’onda bu naqsh juda ko‘p:\n' +
      '- وَمَا يَخْدَعُونَ إِلَّآ أَنفُسَهُمْ — “o‘zlaridan boshqasini aldamaydilar”\n' +
      '- إِنْ هَٰذَآ إِلَّا سِحْرٌ — “bu sehrdan boshqa narsa emas”\n\n' +
      'Ya’ni **لا/ما ... إِلّا** ni ko‘rsangiz, “faqat” deb tarjima qiling.',
    meaningRu: '«Кроме, только». Конструкция لا ... إِلّا даёт значение «только и исключительно».',
    meaningEn: '"Except, only". The لا … إِلّا frame yields "none but".'
  },

  // ── الاستقبال ───────────────────────────────────────────────────────────
  {
    arabic: 'سَوْف',
    transliteration: 'sawfa',
    category: ParticleCategory.FUTURE,
    shortUz: 'tez orada (kelasi zamon)',
    exampleSura: 102,
    exampleAyah: 3,
    exampleNoteUz: 'كَلَّا سَوْفَ تَعْلَمُونَ — “Yo‘q! Tez orada bilasizlar”.',
    meaningUz:
      'Hozirgi zamon fe’lini **kelasi zamonga** aylantiradi.\n\n' +
      '- تَعْلَمُونَ “bilasizlar” → سَوْفَ تَعْلَمُونَ “bilib olasizlar”\n\n' +
      'Qisqa shakli **سَـ** ham bor va u qo‘shilib yoziladi: سَيَعْلَمُونَ.\n\n' +
      'Farqi: **سَـ** yaqin kelajak, **سَوْفَ** uzoqroq kelajak yoki ta’kidliroq. Qur’onda ogohlantirish oyatlarida ko‘pincha سَوْفَ ishlatiladi.',
    meaningRu: 'Показатель будущего времени; краткая форма — слитная سَـ.',
    meaningEn: 'Future marker; its short form سَـ is written attached.'
  },

  // ── الظروف — adverbs of time and place ──────────────────────────────────
  {
    arabic: 'بَعْد',
    transliteration: 'baʿda',
    category: ParticleCategory.ADVERB,
    shortUz: 'keyin, so‘ng',
    exampleSura: 2,
    exampleAyah: 27,
    meaningUz:
      '“Keyin, so‘ng” — vaqt bildiradi. Odatda **مِن** bilan birga keladi: مِنۢ بَعْدِ.\n\n' +
      '- مِنۢ بَعْدِ مِيثَٰقِهِۦ — “ahdidan keyin”\n\n' +
      'قَبْل (“oldin”) bilan juftlik hosil qiladi. Ikkalasini birga eslang.\n\n' +
      'Diqqat: bu so‘zning o‘zagi ب-ع-د bor, ya’ni u haqiqiy yuklama emas, **ot**. Lekin gapda yuklama vazifasini bajaradi.',
    meaningRu: '«После». Часто в связке مِنۢ بَعْدِ.',
    meaningEn: '"After". Usually in the frame مِنۢ بَعْدِ.'
  },
  {
    arabic: 'مَع',
    transliteration: 'maʿa',
    category: ParticleCategory.ADVERB,
    shortUz: 'bilan, birga',
    exampleSura: 2,
    exampleAyah: 153,
    exampleNoteUz: 'إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ — “Albatta, Alloh sabrlilar bilan birga”.',
    meaningUz:
      '“Bilan, birga” — hamrohlik.\n\n' +
      '- إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ — “Alloh sabr qiluvchilar bilan birga”\n\n' +
      'بِ dan farqi: **بِ** vosita (“qalam bilan yozdim”), **مَعَ** hamrohlik (“do‘stim bilan bordim”).\n\n' +
      'Oxiri doim fatha: مَعَ.',
    meaningRu: '«С, вместе с» — сопровождение, в отличие от инструментального بِ.',
    meaningEn: '"With, together with" — accompaniment, unlike instrumental بِ.'
  },

  // ── الضمائر المتصلة — attached pronouns ─────────────────────────────────
  {
    arabic: 'ـهُ',
    transliteration: '-hu',
    category: ParticleCategory.PRONOUN,
    attachment: Attachment.SUFFIX,
    shortUz: 'uning; uni',
    exampleSura: 112,
    exampleAyah: 4,
    meaningUz:
      'Qo‘shimcha olmosh — **“u, uning, uni”** (bir erkak).\n\n' +
      'Ikki xil ma’no beradi, nimaga qo‘shilishiga qarab:\n\n' +
      '**1. Otga qo‘shilsa — egalik:**\n' +
      '- كِتَاب “kitob” → كِتَابُهُ “uning kitobi”\n' +
      '- رَبّ “Rabb” → رَبُّهُ “uning Rabbi”\n\n' +
      '**2. Fe’lga qo‘shilsa — to‘ldiruvchi:**\n' +
      '- خَلَقَ “yaratdi” → خَلَقَهُ “uni yaratdi”\n\n' +
      'Bu farq muhim: **ot + ـهُ = “uning”**, **fe’l + ـهُ = “uni”**.\n\n' +
      'Yozilishi o‘zgaradi: oldingi harakatga qarab هُ، هِ، هُۥ، هِۦ bo‘lishi mumkin — hammasi bir olmosh.',
    meaningRu: 'Слитное местоимение 3 л. ед. м.: с именем — «его» (принадлежность), с глаголом — «его» (объект).',
    meaningEn: 'Attached 3ms pronoun: on a noun "his", on a verb "him".'
  },
  {
    arabic: 'ـهُم',
    transliteration: '-hum',
    category: ParticleCategory.PRONOUN,
    attachment: Attachment.SUFFIX,
    shortUz: 'ularning; ularni',
    exampleSura: 2,
    exampleAyah: 7,
    meaningUz:
      '**“Ular, ularning, ularni”** (ko‘p erkak).\n\n' +
      '- قُلُوب “qalblar” → قُلُوبِهِمْ “ularning qalblari”\n' +
      '- لَعَنَ “la’natladi” → لَعَنَهُمْ “ularni la’natladi”\n\n' +
      'Oldidagi harakatga qarab هُمْ yoki هِمْ bo‘ladi — kasradan keyin هِمْ.\n\n' +
      'Qur’onda juda ko‘p uchraydi (1454 marta), chunki qavmlar haqida ko‘p gapiriladi.',
    meaningRu: 'Слитное местоимение 3 л. мн. м.: «их».',
    meaningEn: 'Attached 3mp pronoun: "their, them".'
  },
  {
    arabic: 'ـكُم',
    transliteration: '-kum',
    category: ParticleCategory.PRONOUN,
    attachment: Attachment.SUFFIX,
    shortUz: 'sizlarning; sizlarni',
    exampleSura: 2,
    exampleAyah: 21,
    exampleNoteUz: 'رَبَّكُمُ ٱلَّذِى خَلَقَكُمْ — “sizni yaratgan Rabbingiz”. Bir gapda ikki marta.',
    meaningUz:
      '**“Sizlar, sizlarning, sizlarni”** (ko‘p, murojaat).\n\n' +
      '- رَبّ → رَبَّكُمْ “Rabbingiz”\n' +
      '- خَلَقَ → خَلَقَكُمْ “sizni yaratdi”\n\n' +
      'Qur’onda o‘quvchiga murojaat ko‘p bo‘lgani uchun bu olmosh juda tez-tez keladi.\n\n' +
      'لَعَلَّكُمْ (“toki sizlar...”) iborasini alohida eslab qoling — u o‘nlab oyatda takrorlanadi.',
    meaningRu: 'Слитное местоимение 2 л. мн.: «ваш, вас».',
    meaningEn: 'Attached 2mp pronoun: "your, you".'
  },
  {
    arabic: 'ـنا',
    transliteration: '-nā',
    category: ParticleCategory.PRONOUN,
    attachment: Attachment.SUFFIX,
    shortUz: 'bizning; bizni',
    exampleSura: 1,
    exampleAyah: 6,
    exampleNoteUz: 'ٱهْدِنَا — “bizni hidoyat qil”. Fotihada.',
    meaningUz:
      '**“Biz, bizning, bizni”**.\n\n' +
      '- رَبّ → رَبَّنَا “Rabbimiz”\n' +
      '- ٱهْدِ “hidoyat qil” → ٱهْدِنَا “bizni hidoyat qil”\n\n' +
      'Duo oyatlarida juda ko‘p: رَبَّنَآ ءَاتِنَا — “Rabbimiz, bizga ber”.\n\n' +
      'Diqqat: ـنا fe’l **oxirida** “biz qildik” ma’nosini ham berishi mumkin: خَلَقْنَا “biz yaratdik”. Bu holda u olmosh emas, fe’l qo‘shimchasi. Farqini ma’nodan bilib olasiz.',
    meaningRu: 'Слитное местоимение 1 л. мн.: «наш, нас». Также окончание глагола «мы сделали».',
    meaningEn: 'Attached 1p pronoun: "our, us". Also the verb ending "we did".'
  },
  {
    arabic: 'ـكَ',
    transliteration: '-ka',
    category: ParticleCategory.PRONOUN,
    attachment: Attachment.SUFFIX,
    shortUz: 'sening; seni',
    exampleSura: 1,
    exampleAyah: 5,
    exampleNoteUz: 'إِيَّاكَ نَعْبُدُ — “Faqat Senga ibodat qilamiz”.',
    meaningUz:
      '**“Sen, sening, seni”** (bir erkak).\n\n' +
      '- رَبّ → رَبُّكَ “sening Rabbing”\n' +
      '- إِيَّا → إِيَّاكَ “faqat Senga”\n\n' +
      'Qur’onda Payg‘ambarga murojaatda ko‘p: قُل لَّكَ، إِلَيْكَ، عَلَيْكَ.\n\n' +
      'Ayol shakli ـكِ (kasra bilan) — kamroq uchraydi.\n\n' +
      'Diqqat: so‘z **boshidagi** كَ — bu “kabi” degan yuklama, olmosh emas.',
    meaningRu: 'Слитное местоимение 2 л. ед. м.: «твой, тебя».',
    meaningEn: 'Attached 2ms pronoun: "your, you".'
  },

  // ── حروف الجواب ─────────────────────────────────────────────────────────
  {
    arabic: 'بَلَى',
    transliteration: 'balā',
    category: ParticleCategory.ANSWER,
    shortUz: 'yo‘q, aksincha (tasdiq)',
    exampleSura: 2,
    exampleAyah: 81,
    meaningUz:
      'Bu juda o‘ziga xos so‘z — **inkorli savolga ijobiy javob**.\n\n' +
      'Misol: “Rabbingiz emasmi?” degan savolga:\n' +
      '- نَعَمْ desangiz — “ha, emas” degan bo‘lasiz (noto‘g‘ri!)\n' +
      '- بَلَىٰ desangiz — “yo‘q, aksincha, Rabbimizsan” degan bo‘lasiz (to‘g‘ri)\n\n' +
      'Mashhur oyat: أَلَسْتُ بِرَبِّكُمْ ۖ قَالُوا۟ بَلَىٰ — “Men Rabbingiz emasmanmi? Ular: ‘Balo (albatta, Rabbimizsan)’ dedilar”.\n\n' +
      'O‘zbekchada aynan mos so‘z yo‘q. “Yo‘q, aksincha” yoki “albatta shunday” deb tarjima qilinadi.',
    meaningRu: 'Утвердительный ответ на отрицательный вопрос — «нет, напротив, да».',
    meaningEn: 'The affirmative answer to a negative question — "nay, rather, yes".'
  },
  {
    arabic: 'كَلّا',
    transliteration: 'kallā',
    category: ParticleCategory.ANSWER,
    shortUz: 'yo‘q, aslo!',
    exampleSura: 102,
    exampleAyah: 3,
    meaningUz:
      '**Qat’iy rad va tanbeh** — “Yo‘q! Aslo! Bunday emas!”\n\n' +
      '- كَلَّا سَوْفَ تَعْلَمُونَ — “Yo‘q! Tez orada bilasizlar”\n\n' +
      'Bu so‘z faqat Qur’onning **ikkinchi yarmida** (Makkiy suralarda) uchraydi va deyarli har doim ogohlantirish ohangida.\n\n' +
      'Ikki vazifasi bor: oldingi da’voni rad qiladi **va** keyin aytiladiganga diqqatni qaratadi.',
    meaningRu: 'Резкое опровержение — «Нет же! Отнюдь!»',
    meaningEn: 'A sharp rebuttal — "Nay! By no means!"'
  },

  // ── النداء ──────────────────────────────────────────────────────────────
  {
    arabic: 'يا',
    corpusLemma: 'ي',
    transliteration: 'yā',
    category: ParticleCategory.VOCATIVE,
    attachment: Attachment.PREFIX,
    shortUz: 'ey!',
    exampleSura: 2,
    exampleAyah: 21,
    exampleNoteUz: 'يَٰٓأَيُّهَا ٱلنَّاسُ — “Ey odamlar!”',
    meaningUz:
      '**Chaqiruv** — “Ey!”\n\n' +
      'Qur’onda deyarli har doim أَيُّها bilan birga keladi:\n' +
      '- يَٰٓأَيُّهَا ٱلنَّاسُ — “Ey odamlar!”\n' +
      '- يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ — “Ey imon keltirganlar!”\n\n' +
      'Ikkinchisi Qur’onda 89 marta uchraydi va har safar undan keyin **buyruq yoki muhim hukm** keladi. Shuning uchun bu iborani ko‘rsangiz, diqqat qiling.\n\n' +
      'Chaqirilgan ot odatda **damma** oladi: ٱلنَّاسُ.',
    meaningRu: 'Звательная частица «О!». В Коране почти всегда в связке يَٰٓأَيُّهَا.',
    meaningEn: 'The vocative "O!". In the Quran almost always in the frame يَٰٓأَيُّهَا.'
  },

  // ── المصدرية ────────────────────────────────────────────────────────────
  {
    arabic: 'أَن',
    transliteration: 'an',
    category: ParticleCategory.SUBORDINATOR,
    grammarEffect: GrammarEffect.ACCUSATIVE_VERB,
    shortUz: '...moq, ...ligini',
    exampleSura: 2,
    exampleAyah: 26,
    effectNoteUz: 'Keyingi fe’lni **mansub** qiladi: oxiri fatha, ko‘plikda ن tushadi.',
    meaningUz:
      'Fe’lni **otga aylantiradi** — o‘zbekchadagi “-moq” yoki “-ish” kabi.\n\n' +
      '- يَضْرِبَ “uradi” → أَن يَضْرِبَ “urishi, urmoq”\n' +
      '- أَرَادَ أَن يَخْرُجَ — “chiqmoqchi bo‘ldi”\n\n' +
      '**Grammatik ta’siri:** fe’l oxiri fathaga o‘tadi va ko‘plikdagi ن tushadi:\n' +
      '- تَعْلَمُونَ → أَن تَعْلَمُوا۟\n\n' +
      '**Chalkashmaslik uchun:**\n' +
      '- أَن (shaddasiz) — fe’ldan oldin, uni mansub qiladi\n' +
      '- أَنّ (shaddali) — otdan oldin, uni mansub qiladi\n\n' +
      'Ikkalasi bir xil eshitiladi, lekin yozuvda shadda farqni ko‘rsatadi.',
    meaningRu: 'Превращает глагольную фразу в имя; ставит глагол в сослагательное наклонение.',
    meaningEn: 'Turns a verb clause into a noun; puts the verb in the subjunctive.'
  },
  {
    arabic: 'قَد',
    transliteration: 'qad',
    category: ParticleCategory.EMPHASIS,
    shortUz: 'albatta; ba’zan',
    exampleSura: 23,
    exampleAyah: 1,
    exampleNoteUz: 'قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ — “Albatta, mo‘minlar najot topdi”.',
    meaningUz:
      'Bu kichkina so‘z **fe’l zamoniga qarab ikki xil ma’no** beradi — buni bilish shart:\n\n' +
      '**1. O‘tgan zamon fe’li bilan — ta’kid, “albatta, allaqachon”:**\n' +
      '- قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ — “Albatta, mo‘minlar najot topdilar”\n' +
      '- قَدْ سَمِعَ ٱللَّهُ — “Alloh albatta eshitdi”\n\n' +
      '**2. Hozirgi zamon fe’li bilan — ehtimol, “ba’zan”:**\n' +
      '- قَدْ يَعْلَمُ — “ba’zan biladi”\n\n' +
      'Ya’ni **قَد + o‘tgan = kuchli tasdiq**, **قَد + hozirgi = kamaytirish**. Bir xil so‘z, teskari ta’sir.\n\n' +
      'Qur’onda birinchisi ancha ko‘p uchraydi.',
    meaningRu: 'С прошедшим временем — усиление («уже, поистине»), с настоящим — «иногда».',
    meaningEn: 'With the past tense it emphasises ("indeed, already"); with the present it weakens to "sometimes".'
  }
]
