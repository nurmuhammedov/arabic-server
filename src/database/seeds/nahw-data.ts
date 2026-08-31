import { NahwTopicKind } from '../../nahw/enums/nahw.enum'

export interface NahwTopicSeed {
  slug: string
  titleAr: string
  titleUz: string
  kind: NahwTopicKind
  position: number
  summaryUz: string
  summaryRu?: string
  summaryEn?: string
  bodyUz: string
  exampleSura?: number
  exampleAyah?: number
  exampleNoteUz?: string
}

/**
 * The naḥw curriculum. Ṣarf tells the learner what a word is; these lessons tell
 * them what it is doing. Written plainly and built on Quranic sentences the
 * learner has already met elsewhere in the app.
 */
export const NAHW_TOPICS: readonly NahwTopicSeed[] = [
  // ── الإعراب — the case system ────────────────────────────────────────────
  {
    slug: 'irab',
    titleAr: 'الإعراب',
    titleUz: 'I’rob — so‘z oxiridagi harakat nima uchun?',
    kind: NahwTopicKind.CASE,
    position: 1,
    summaryUz: 'Arab tilida so‘zning oxiridagi harakat bezak emas — u so‘zning gapdagi vazifasini bildiradi.',
    summaryRu: 'Окончание слова в арабском — не украшение, оно показывает его роль в предложении.',
    summaryEn: 'A word ending in Arabic is not decoration; it marks the word’s job in the sentence.',
    exampleSura: 2,
    exampleAyah: 6,
    exampleNoteUz:
      'إِنَّ ٱلَّذِينَ كَفَرُوا۟ — ٱلَّذِينَ bu yerda إِنّ tufayli mansub holatda. Agar إِنّ bo‘lmaganda, u marfu’ bo‘lardi.',
    bodyUz:
      'Bu butun nahvning kaliti, shuning uchun shoshilmay o‘qing.\n\n' +
      'O‘zbek tilida so‘zning vazifasini **qo‘shimcha** ko‘rsatadi: “Ali**ni** ko‘rdim”, “Ali**ga** berdim”, “Ali keldi”. Har xil qo‘shimcha — har xil vazifa.\n\n' +
      'Arab tilida ham xuddi shunday, faqat qo‘shimcha emas — **oxirgi harakat** o‘zgaradi:\n' +
      '- زَيْدٌ (damma) — Zayd ish qiluvchi\n' +
      '- زَيْدًا (fatha) — Zaydga ish qilindi\n' +
      '- زَيْدٍ (kasra) — Zaydning, Zayddan\n\n' +
      '**Mana shu nima uchun muhim.** Ikkita gapni solishtiring:\n' +
      '- قَتَلَ زَيْدٌ عَمْرًا — “Zayd Amrni o‘ldirdi”\n' +
      '- قَتَلَ زَيْدًا عَمْرٌو — “Amr Zaydni o‘ldirdi”\n\n' +
      'So‘zlar bir xil, tartib bir xil. Faqat harakatlar almashdi — va **ma’no teskari bo‘ldi**. Kim o‘ldirgani faqat harakatdan bilinadi.\n\n' +
      'Ya’ni: **butun lug‘atni bilsangiz ham, i’robni bilmasangiz, oyatni noto‘g‘ri tushunishingiz mumkin.** Sarf sizga so‘zni beradi, nahv esa gapni.\n\n' +
      'To‘rtta holat bor:\n' +
      '- **مرفوع** (marfu’) — damma. Ish qiluvchi.\n' +
      '- **منصوب** (mansub) — fatha. Ish tushgan narsa.\n' +
      '- **مجرور** (majrur) — kasra. Ko‘makchidan keyin, egalikda.\n' +
      '- **مجزوم** (majzum) — sukun. Faqat fe’lda.\n\n' +
      'Keyingi darslarda har birini alohida ko‘ramiz. Yaxshi xabar shuki, **holatni nima keltirib chiqarganini** bilsangiz, harakatni yodlash shart emas — o‘zi kelib chiqadi.'
  },
  {
    slug: 'majrur',
    titleAr: 'المجرور',
    titleUz: 'Majrur — kasrali holat',
    kind: NahwTopicKind.CASE,
    position: 2,
    summaryUz: 'Eng oson holat: ko‘makchidan keyin va egalik zanjirining ikkinchi qismida kasra keladi.',
    summaryRu: 'Родительный падеж: после предлога и во второй части идафы.',
    summaryEn: 'The genitive: after a preposition and as the second half of a possession chain.',
    exampleSura: 1,
    exampleAyah: 1,
    exampleNoteUz:
      'بِسْمِ ٱللَّهِ — ikkalasi ham kasrali. اسْم — بِ tufayli, ٱللَّه — izofa tufayli. Bitta iborada ikki sabab.',
    bodyUz:
      'Buni birinchi o‘rgansangiz to‘g‘ri bo‘ladi, chunki **eng oson va eng ko‘p uchraydi** — Qur’ondagi otlarning eng katta qismi majrur.\n\n' +
      'Majrur bo‘lishning **atigi ikkita sababi** bor:\n\n' +
      '**1. Ko‘makchidan keyin (حرف جر).** مِن، فِي، عَلَى، إِلَى، عَن، بِ، لِ، كَ — bulardan keyin kelgan ot doim kasrali:\n' +
      '- فِى ٱلْأَرْضِ — “yerda”\n' +
      '- مِنَ ٱلسَّمَآءِ — “osmondan”\n' +
      '- بِسْمِ — “nomi bilan”\n\n' +
      '**2. Izofada ikkinchi so‘z (مضاف إليه).** Ikki ot yonma-yon kelib “...ning ...i” ma’nosini bersa, ikkinchisi kasrali:\n' +
      '- كِتَابُ ٱللَّهِ — “Allohning kitobi”\n' +
      '- رَبِّ ٱلْعَٰلَمِينَ — “olamlarning Rabbi”\n\n' +
      '**Amaliy foyda.** Oyat o‘qiyotib kasrali so‘z ko‘rsangiz, orqaga qarang: yo ko‘makchi bor, yo oldingi so‘z bilan izofa. Uchinchi ehtimol yo‘q.\n\n' +
      'Belgisi odatda **kasra** (ِ) yoki **tanvin kasra** (ٍ). Lekin ko‘plikda va ba’zi shakllarda kasra o‘rniga **يـ** keladi:\n' +
      '- ٱلْمُتَّقِينَ — “taqvodorlarning” (ٱلْمُتَّقُونَ emas)\n' +
      '- ٱلْعَٰلَمِينَ — “olamlarning”\n\n' +
      'Shuning uchun ـِينَ bilan tugagan so‘z ko‘rsangiz, u majrur (yoki mansub) — marfu’ emas.'
  },
  {
    slug: 'marfu',
    titleAr: 'المرفوع',
    titleUz: 'Marfu’ — dammali holat',
    kind: NahwTopicKind.CASE,
    position: 3,
    summaryUz: 'Ish qiluvchi va gapning egasi dammali bo‘ladi. Bu otning “tinch” holati.',
    summaryRu: 'Именительный падеж: деятель и подлежащее.',
    summaryEn: 'The nominative: the doer and the topic of a sentence.',
    exampleSura: 112,
    exampleAyah: 1,
    exampleNoteUz: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ — ٱللَّهُ va أَحَدٌ ikkalasi ham dammali: biri ega, biri xabar.',
    bodyUz:
      'Marfu’ — otning **asosiy, tinch** holati. Hech kim unga ta’sir qilmasa, ot shu holatda turadi.\n\n' +
      'Uchta asosiy o‘rinda keladi:\n\n' +
      '**1. Fe’lning bajaruvchisi (فاعِل):**\n' +
      '- قَالَ ٱللَّهُ — “Alloh aytdi”. Kim aytdi? ٱللَّهُ — shuning uchun dammali.\n' +
      '- جَآءَ ٱلْحَقُّ — “haq keldi”\n\n' +
      '**2. Ot gapning egasi (مُبْتَدَأ) va xabari (خَبَر):**\n' +
      '- ٱللَّهُ أَحَدٌ — “Alloh yagonadir”. Ikkalasi ham dammali.\n' +
      '- ٱلْحَمْدُ لِلَّهِ — “hamd Allohga xos”. ٱلْحَمْدُ dammali (ega), لِلَّهِ kasrali (لِ tufayli).\n\n' +
      '**3. Hozirgi zamon fe’li**, agar oldida nasb yoki jazm qiluvchi narsa bo‘lmasa: يَعْلَمُ (oxirida damma).\n\n' +
      'Belgisi: **damma** (ُ) yoki **tanvin damma** (ٌ). Ko‘plikda **ونَ**:\n' +
      '- ٱلْمُؤْمِنُونَ — “mo‘minlar” (ega bo‘lganda)\n' +
      '- ٱلْمُؤْمِنِينَ — “mo‘minlarni/ning” (mansub yoki majrur)\n\n' +
      'Bu **ونَ / ينَ** farqi juda foydali: bir qarashda so‘zning vazifasini aytib beradi.'
  },
  {
    slug: 'mansub',
    titleAr: 'المنصوب',
    titleUz: 'Mansub — fathali holat',
    kind: NahwTopicKind.CASE,
    position: 4,
    summaryUz: 'Ish tushgan narsa, payt-holat bildiruvchilar va إِنّ boshqargan ot fathali bo‘ladi.',
    summaryRu: 'Винительный падеж: прямое дополнение, обстоятельства, имя إِنّ.',
    summaryEn: 'The accusative: the object, adverbials, and what إِنّ governs.',
    exampleSura: 1,
    exampleAyah: 5,
    exampleNoteUz: 'إِيَّاكَ نَعْبُدُ — إِيَّاكَ oldinga chiqarilgan mansub to‘ldiruvchi: “faqat Senga”.',
    bodyUz:
      'Mansub — “kimgadir/nimagadir ish tushdi” holati. Sabablari ko‘proq, lekin uchtasi asosiy:\n\n' +
      '**1. Fe’lning to‘ldiruvchisi (مَفْعُول بِه) — eng ko‘p uchraydigani:**\n' +
      '- خَلَقَ ٱلْإِنسَٰنَ — “insonni yaratdi”. Kimni yaratdi? ٱلْإِنسَٰنَ — fathali.\n' +
      '- أَنزَلَ ٱلْكِتَٰبَ — “kitobni nozil qildi”\n\n' +
      '**2. إِنّ va uning oilasidan keyin:**\n' +
      '- إِنَّ ٱللَّهَ — “albatta, Alloh”. Odatda ٱللَّهُ dammali bo‘lardi, lekin إِنّ uni fathaga aylantirdi.\n' +
      'Shuning uchun إِنَّ ٱللَّهَ ni ko‘rganingizda “nega fatha?” degan savol tug‘ilmaydi — sababi oldida turibdi.\n\n' +
      '**3. Payt, o‘rin, holat bildiruvchilar (ظرف، حال):**\n' +
      '- يَوْمَ ٱلْقِيَٰمَةِ — “qiyomat kunida”\n' +
      '- خَٰلِدِينَ فِيهَا — “unda abadiy qoluvchi holda”\n\n' +
      'Belgisi: **fatha** (َ) yoki **tanvin fatha** (ً). Ko‘plikda مرفوع dan farqli ravishda **ينَ**: ٱلصَّٰبِرِينَ.\n\n' +
      '**Diqqat:** ayol ko‘pligi (ـات bilan tugaydigan) mansub bo‘lganda fatha emas, **kasra** oladi: ٱلصَّٰلِحَٰتِ. Bu istisno va uni bilib qo‘yish kerak.'
  },
  {
    slug: 'majzum',
    titleAr: 'المجزوم',
    titleUz: 'Majzum — sukunli holat (faqat fe’lda)',
    kind: NahwTopicKind.CASE,
    position: 5,
    summaryUz: 'لَم, لا (taqiq) va shart yuklamalaridan keyin fe’l oxiri sukun bo‘ladi yoki ن tushadi.',
    summaryRu: 'Усечённое наклонение глагола после لَم, запретительного لا и условных частиц.',
    summaryEn: 'The jussive: a present verb after لَم, prohibitive لا and the conditionals.',
    exampleSura: 112,
    exampleAyah: 3,
    exampleNoteUz: 'لَمْ يَلِدْ وَلَمْ يُولَدْ — ikkala fe’l ham sukunli, chunki oldida لَم turibdi.',
    bodyUz:
      'Bu holat **faqat hozirgi zamon fe’liga** tegishli — otga hech qachon tegishli emas.\n\n' +
      'Uchta narsa fe’lni majzum qiladi:\n\n' +
      '**1. لَم** — o‘tgan zamon inkori:\n' +
      '- يَلِدُ → لَمْ يَلِدْ “tug‘magan”\n\n' +
      '**2. لا** — taqiq (buyruqni man qilish):\n' +
      '- تَقْرَبُوا → لَا تَقْرَبُوا۟ “yaqinlashmanglar”\n\n' +
      '**3. Shart yuklamalari** (إِن va boshqalar) — ular **ikkala** fe’lni ham majzum qiladi:\n' +
      '- إِن تَنصُرُوا۟ ٱللَّهَ يَنصُرْكُمْ — “agar Allohga yordam bersangiz, U sizga yordam beradi”\n' +
      'Bu yerda تَنصُرُوا۟ va يَنصُرْ ikkalasi ham majzum.\n\n' +
      '**Belgisi ikki xil:**\n' +
      '- Yolg‘iz fe’lda — oxirida **sukun**: يَعْلَمُ → يَعْلَمْ\n' +
      '- Ko‘plikda — oxiridagi **ن tushadi**: تَعْلَمُونَ → تَعْلَمُوا۟\n\n' +
      'Shu ن ning bor-yo‘qligi juda ko‘p narsani aytadi. تَعْلَمُونَ — oddiy hikoya. تَعْلَمُوا۟ — oldida albatta biror yuklama bor, uni topish kerak.'
  },

  // ── الجمل — sentence shapes ─────────────────────────────────────────────
  {
    slug: 'jumla-ismiyya',
    titleAr: 'الجملة الاسمية',
    titleUz: 'Ot gap — ega va xabar',
    kind: NahwTopicKind.SENTENCE,
    position: 6,
    summaryUz: 'Fe’lsiz gap: “Alloh — yagona”. Ikkala qism ham dammali bo‘ladi.',
    summaryRu: 'Именное предложение без глагола: подлежащее и сказуемое, оба в именительном.',
    summaryEn: 'A verbless sentence: topic and comment, both nominative.',
    exampleSura: 112,
    exampleAyah: 2,
    exampleNoteUz: 'ٱللَّهُ ٱلصَّمَدُ — “Alloh — Somaddir”. Fe’l yo‘q, lekin gap to‘liq.',
    bodyUz:
      'Arab tilida gap **fe’lsiz** ham bo‘lishi mumkin. O‘zbekchada bunda “...dir” yoki tire qo‘yamiz:\n\n' +
      '- ٱللَّهُ أَحَدٌ — “Alloh — yagona(dir)”\n' +
      '- ٱلْحَمْدُ لِلَّهِ — “hamd — Allohga xos”\n\n' +
      'Bunday gap ikki qismdan iborat:\n' +
      '- **مُبْتَدَأ** (mubtada) — ega, gap nima haqida. Odatda **aniq** (ال bilan) va **dammali**.\n' +
      '- **خَبَر** (xabar) — u haqda aytilayotgan narsa. Odatda **noaniq** va **dammali**.\n\n' +
      'ٱللَّهُ أَحَدٌ da: ٱللَّهُ ega (aniq), أَحَدٌ xabar (tanvinli, noaniq). Ikkalasi ham dammali.\n\n' +
      '**Qanday tanib olish kerak?** Gap **ot bilan boshlansa** va fe’l bo‘lmasa — bu ot gap.\n\n' +
      '**Muhim ogohlantirish:** aniqlik farqiga qarang.\n' +
      '- ٱلْكِتَابُ كَبِيرٌ — “kitob — katta” (gap)\n' +
      '- ٱلْكِتَابُ ٱلْكَبِيرُ — “katta kitob” (gap emas, shunchaki ibora!)\n\n' +
      'Ikkinchisida ikkala so‘z ham aniq, shuning uchun ikkinchisi xabar emas, **sifat**. Bu farqni sezmaslik boshlovchining eng ko‘p xatosi.\n\n' +
      'Xabar bitta so‘z bo‘lishi shart emas — u ko‘makchili ibora ham bo‘ladi: ٱلْحَمْدُ **لِلَّهِ**.'
  },
  {
    slug: 'jumla-filiyya',
    titleAr: 'الجملة الفعلية',
    titleUz: 'Fe’l gap — fe’l, bajaruvchi, to‘ldiruvchi',
    kind: NahwTopicKind.SENTENCE,
    position: 7,
    summaryUz: 'Fe’l bilan boshlanadi. Tartib odatda: fe’l → kim qildi → nimani qildi.',
    summaryRu: 'Глагольное предложение: глагол, деятель, дополнение.',
    summaryEn: 'A verbal sentence: verb, then doer, then object.',
    exampleSura: 2,
    exampleAyah: 29,
    exampleNoteUz: 'خَلَقَ لَكُم مَّا فِى ٱلْأَرْضِ — fe’l birinchi, bajaruvchi (U) fe’l ichida yashiringan.',
    bodyUz:
      'Arab tilida gap odatda **fe’l bilan boshlanadi** — bu o‘zbekchadan asosiy farq.\n\n' +
      'Tartib: **fe’l → bajaruvchi → to‘ldiruvchi**\n' +
      '- خَلَقَ ٱللَّهُ ٱلسَّمَٰوَٰتِ — “Alloh osmonlarni yaratdi”\n' +
      '  - خَلَقَ — fe’l (“yaratdi”)\n' +
      '  - ٱللَّهُ — bajaruvchi, **dammali**\n' +
      '  - ٱلسَّمَٰوَٰتِ — to‘ldiruvchi, **mansub**\n\n' +
      'O‘zbekchaga o‘girganda tartib teskari bo‘ladi: “Alloh osmonlarni yaratdi”. Shuning uchun tarjima qilishda avval fe’lni topib, keyin kim qilganini qidirish kerak.\n\n' +
      '**Ikki muhim qoida:**\n\n' +
      '**1. Bajaruvchi ko‘pincha fe’l ichida yashiringan.** يَعْلَمُونَ — “ular biladilar”. Bu yerda alohida so‘z yo‘q, “ular” fe’lning ونَ qismida.\n\n' +
      '**2. Fe’l bajaruvchidan oldin kelsa, birlikda qoladi**, bajaruvchi ko‘plik bo‘lsa ham:\n' +
      '- قَالَ ٱلْمُؤْمِنُونَ — “mo‘minlar aytdilar” (قَالُوا۟ emas, قَالَ)\n\n' +
      'Bu g‘alati tuyuladi, lekin qoida shunday. Aksincha, ot oldin kelsa, fe’l moslashadi: ٱلْمُؤْمِنُونَ قَالُوا۟.'
  },

  // ── التراكيب — constructions ────────────────────────────────────────────
  {
    slug: 'idafa',
    titleAr: 'الإضافة',
    titleUz: 'Izofa — “...ning ...i”',
    kind: NahwTopicKind.STRUCTURE,
    position: 8,
    summaryUz: 'Ikki ot yonma-yon: birinchisi ال olmaydi, ikkinchisi doim kasrali.',
    summaryRu: 'Идафа: первое имя без артикля, второе — в родительном падеже.',
    summaryEn: 'The possession chain: the first noun takes no article, the second is genitive.',
    exampleSura: 1,
    exampleAyah: 2,
    exampleNoteUz: 'رَبِّ ٱلْعَٰلَمِينَ — “olamlarning Rabbi”. رَبّ da ال yo‘q, ٱلْعَٰلَمِينَ kasrali.',
    bodyUz:
      'Bu Qur’onda juda ko‘p uchraydigan qurilma. O‘zbekchada “...ning ...i” bilan beriladi.\n\n' +
      '- كِتَابُ ٱللَّهِ — “Allohning kitobi”\n' +
      '- رَبِّ ٱلْعَٰلَمِينَ — “olamlarning Rabbi”\n' +
      '- يَوْمِ ٱلدِّينِ — “din kuni”\n\n' +
      '**Ikkita qoida bor va ikkalasi ham qat’iy:**\n\n' +
      '**1. Birinchi so‘z (مُضاف) ال olmaydi va tanvin olmaydi.**\n' +
      'كِتَابُ ٱللَّهِ to‘g‘ri. ٱلْكِتَابُ ٱللَّهِ noto‘g‘ri, كِتَابٌ ٱللَّهِ ham noto‘g‘ri.\n\n' +
      '**2. Ikkinchi so‘z (مُضاف إِلَيْه) doim kasrali.**\n' +
      'Sababi qanday bo‘lishidan qat’i nazar.\n\n' +
      '**Nima uchun bu foydali?** Chunki bu sizga **ikkita narsani darrov aytadi**:\n' +
      '- Agar ot **ال siz va tanvinsiz** bo‘lsa — keyingi so‘zga qarang, izofa bo‘lishi mumkin.\n' +
      '- Agar ot **kasrali** bo‘lsa va oldida ko‘makchi bo‘lmasa — bu izofaning ikkinchi qismi.\n\n' +
      '**Zanjir bo‘lishi ham mumkin:**\n' +
      '- مَٰلِكِ يَوْمِ ٱلدِّينِ — “din kunining egasi”. Uchta so‘z, oxirgi ikkitasi kasrali.\n\n' +
      'Fotihaning o‘zida uchta izofa bor: رَبِّ ٱلْعَٰلَمِينَ، مَٰلِكِ يَوْمِ ٱلدِّينِ، صِرَٰطَ ٱلَّذِينَ.'
  },
  {
    slug: 'nat',
    titleAr: 'النعت',
    titleUz: 'Sifat — otga to‘rt tomondan moslashadi',
    kind: NahwTopicKind.STRUCTURE,
    position: 9,
    summaryUz: 'Sifat o‘zi ta’riflayotgan otga holat, son, jins va aniqlikda mos keladi.',
    summaryRu: 'Определение согласуется с определяемым в падеже, числе, роде и определённости.',
    summaryEn: 'An adjective agrees with its noun in case, number, gender and definiteness.',
    exampleSura: 1,
    exampleAyah: 7,
    exampleNoteUz: 'ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ — ikkalasi ham aniq va mansub. Shuning uchun bu sifat, xabar emas.',
    bodyUz:
      'Sifat arab tilida **otdan keyin** keladi (o‘zbekchada oldin: “to‘g‘ri yo‘l” → ٱلصِّرَٰط ٱلْمُسْتَقِيم).\n\n' +
      'Va u otga **to‘rt tomondan** moslashadi:\n\n' +
      '**1. Holat** — ot dammali bo‘lsa sifat ham dammali, mansub bo‘lsa mansub.\n' +
      '**2. Son** — birlik/ikkilik/ko‘plik.\n' +
      '**3. Jins** — erkak/ayol.\n' +
      '**4. Aniqlik** — ot ال bilan bo‘lsa, sifat ham ال bilan.\n\n' +
      'Misol: ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ\n' +
      '- ikkalasi ham **mansub** (fatha)\n' +
      '- ikkalasi ham **birlik**\n' +
      '- ikkalasi ham **erkak**\n' +
      '- ikkalasi ham **aniq** (ال bilan)\n\n' +
      'To‘rttasi mos — demak bu sifat.\n\n' +
      '**Bu qoidaning amaliy foydasi katta.** Ikki otni ko‘rganingizda, ular sifatmi yoki ot gapmi degan savolga javob beradi:\n' +
      '- ٱلْبَيْتُ كَبِيرٌ — aniqlikda mos emas (biri ال li, biri tanvinli) → **gap**: “uy katta”\n' +
      '- ٱلْبَيْتُ ٱلْكَبِيرُ — hamma narsa mos → **ibora**: “katta uy”\n\n' +
      'Ya’ni ال ning bor-yo‘qligi gap bilan iborani ajratadi.\n\n' +
      '**Bitta istisno:** aqlsiz narsalarning ko‘pligi **ayol birligi** kabi sifatlanadi:\n' +
      '- ءَايَٰتٌ بَيِّنَٰتٌ — “aniq oyatlar”, lekin ayol birligi shakli ham ishlatiladi.'
  },
  {
    slug: 'atf',
    titleAr: 'العطف',
    titleUz: 'Atf — «va» bilan bog‘langan so‘z',
    kind: NahwTopicKind.STRUCTURE,
    position: 10,
    summaryUz: 'وَ yoki فَ bilan bog‘langan so‘z o‘zidan oldingi so‘zning holatini takrorlaydi.',
    summaryRu: 'Слово, присоединённое союзом, принимает падеж предшествующего слова.',
    summaryEn: 'A word joined by a conjunction copies the case of the word it is joined to.',
    exampleSura: 21,
    exampleAyah: 16,
    exampleNoteUz:
      'ٱلسَّمَآءَ وَٱلْأَرْضَ — ikkalasi ham mansub, chunki ikkalasi ham خَلَقْنَا ning to‘ldiruvchisi. وَ birinchisining holatini ikkinchisiga uzatdi.',
    bodyUz:
      'Arabchada **وَ** («va») va **فَ** («keyin») so‘zlarni bir-biriga ulaydi. Ulangan so‘z **o‘zi ulangan so‘z bilan bir xil holatda** bo‘ladi.\n\n' +
      'Buni shunday tasavvur qiling: birinchi so‘zga qanday harakat berilgan bo‘lsa, وَ o‘sha harakatni keyingisiga ham olib o‘tadi. O‘zi hech narsani o‘zgartirmaydi — faqat **uzatadi**.\n\n' +
      'Misol: خَلَقْنَا ٱلسَّمَآءَ وَٱلْأَرْضَ — “osmonni **va** yerni yaratdik”.\n' +
      '- ٱلسَّمَآءَ mansub, chunki u fe’lning to‘ldiruvchisi\n' +
      '- ٱلْأَرْضَ ham mansub — sababi وَ uni birinchisiga ulagan\n\n' +
      '**Buni sifat bilan adashtirmang.** Ikkalasi ham oldingi so‘zning holatini takrorlaydi, lekin ma’nosi butunlay boshqa:\n\n' +
      '- ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ — **sifat**: bitta narsa, ikkinchi so‘z birinchisini ta’riflaydi (“to‘g‘ri yo‘l”)\n' +
      '- ٱلسَّمَآءَ وَٱلْأَرْضَ — **atf**: ikkita alohida narsa (“osmon va yer”)\n\n' +
      'Ajratish oson: **وَ bo‘lsa — atf, bo‘lmasa — sifat.** Yer osmonni ta’riflamaydi; u butunlay boshqa narsa.\n\n' +
      'Jar harfidan keyin ham xuddi shunday ishlaydi: ب dan keyingi ot majrur bo‘lsa, وَ bilan unga ulangan so‘z ham majrur bo‘ladi.\n\n' +
      '**Diqqat:** oyat boshidagi وَ ko‘pincha so‘zni emas, **butun gapni** oldingi gapga ulaydi. Unday paytda u keyingi so‘zning holatiga ta’sir qilmaydi — so‘z gapdagi o‘z vazifasiga qarab harakat oladi.'
  },
  {
    slug: 'kana-inna',
    titleAr: 'كان وإنّ',
    titleUz: 'كانَ va إِنّ — ot gapni o‘zgartiradigan ikki oila',
    kind: NahwTopicKind.STRUCTURE,
    position: 11,
    summaryUz: 'Ikkalasi ham ot gapga kiradi, lekin qarama-qarshi ta’sir qiladi.',
    summaryRu: 'كان и إنّ входят в именное предложение и меняют падежи противоположным образом.',
    summaryEn: 'كان and إنّ enter a nominal sentence and change its cases in opposite ways.',
    exampleSura: 2,
    exampleAyah: 20,
    exampleNoteUz: 'إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ — ٱللَّهَ mansub (إِنّ ismi), قَدِيرٌ marfu’ (xabari).',
    bodyUz:
      'Ot gap oddiy holatda **ikkala qismi ham dammali** edi: ٱللَّهُ قَدِيرٌ.\n\n' +
      'Ikkita narsa bu muvozanatni buzadi va ular **teskari** ishlaydi — shuning uchun birga o‘rganish kerak.\n\n' +
      '**إِنّ oilasi** (إِنّ، أَنّ، كَأَنّ، لٰكِنّ، لَيْتَ، لَعَلّ):\n' +
      '- Birinchi so‘zni **mansub** qiladi\n' +
      '- Ikkinchisini **marfu’** qoldiradi\n' +
      '- إِنَّ ٱللَّهَ قَدِيرٌ — ٱللَّهَ fatha, قَدِيرٌ damma\n\n' +
      '**كانَ oilasi** (كانَ، أَصْبَحَ، لَيْسَ، ما زالَ va boshqalar):\n' +
      '- Birinchi so‘zni **marfu’** qoldiradi\n' +
      '- Ikkinchisini **mansub** qiladi\n' +
      '- كَانَ ٱللَّهُ غَفُورًا — ٱللَّهُ damma, غَفُورًا fatha\n\n' +
      '**Yodda saqlash usuli:** ikkalasi bir-birining ko‘zgusi.\n' +
      '- إِنّ — **fatha, keyin damma**\n' +
      '- كانَ — **damma, keyin fatha**\n\n' +
      'Bu Qur’onda juda ko‘p uchraydi. كَانَ ٱللَّهُ ... عَلِيمًا حَكِيمًا shaklidagi oyat oxirlari o‘nlab marta takrorlanadi — va u yerdagi fatha aynan كانَ tufayli.'
  },

  // ── الوظائف — roles ─────────────────────────────────────────────────────
  {
    slug: 'fail',
    titleAr: 'الفاعل',
    titleUz: 'Foil — ishni kim qildi',
    kind: NahwTopicKind.ROLE,
    position: 12,
    summaryUz: 'Fe’ldan keyingi dammali ot — ishni bajargan kishi.',
    summaryRu: 'Деятель: имя в именительном падеже после глагола.',
    summaryEn: 'The doer: the nominative noun after a verb.',
    exampleSura: 110,
    exampleAyah: 1,
    exampleNoteUz:
      'إِذَا جَآءَ نَصْرُ ٱللَّهِ — نَصْرُ dammali, chunki u “kelgan” narsa. Keyin ٱللَّهِ izofa bilan kasrali.',
    bodyUz:
      'Foil — **ishni bajargan** ot. Uchta belgisi bor:\n\n' +
      '1. Fe’ldan **keyin** keladi\n' +
      '2. Doim **marfu’** (dammali)\n' +
      '3. Ko‘pincha fe’l ichida **yashiringan** bo‘ladi\n\n' +
      '- جَآءَ ٱلْحَقُّ — “haq keldi”. Kim keldi? ٱلْحَقُّ.\n' +
      '- قَالَ رَبُّكَ — “Rabbing aytdi”. Kim aytdi? رَبُّ.\n\n' +
      '**Yashirin foil.** Ko‘p fe’llarda alohida so‘z yo‘q:\n' +
      '- يَعْلَمُونَ — “ular biladilar”. “Ular” fe’lning ونَ qismida.\n' +
      '- قُلْ — “ayt (sen)”. “Sen” umuman yozilmagan.\n\n' +
      'Shuning uchun fe’ldan keyin dammali ot ko‘rmasangiz, foil yashiringan degani — gapni tashlab ketmang.\n\n' +
      '**Majhul nisbatda foil yo‘q.** أُنزِلَ ٱلْقُرْءَانُ — “Qur’on nozil qilindi”. Bu yerda ٱلْقُرْءَانُ dammali, lekin u foil emas — u نائِب الفاعِل (“foil o‘rnini bosuvchi”). Kim nozil qilgani aytilmagan.\n\n' +
      'Farqi fe’l shaklida: أَنزَلَ (faol) va أُنزِلَ (majhul) — boshidagi harakat farq qiladi.'
  },
  {
    slug: 'maful-bih',
    titleAr: 'المفعول به',
    titleUz: 'Maf’ul bih — ish kimga/nimaga tushdi',
    kind: NahwTopicKind.ROLE,
    position: 13,
    summaryUz: 'Fe’lning to‘ldiruvchisi, doim mansub (fathali).',
    summaryRu: 'Прямое дополнение: всегда в винительном падеже.',
    summaryEn: 'The direct object: always accusative.',
    exampleSura: 96,
    exampleAyah: 2,
    exampleNoteUz: 'خَلَقَ ٱلْإِنسَٰنَ مِنْ عَلَقٍ — ٱلْإِنسَٰنَ fathali, chunki yaratilgan narsa u.',
    bodyUz:
      'Maf’ul bih — ish **tushgan** narsa. Doim **mansub** (fathali).\n\n' +
      '- خَلَقَ ٱلْإِنسَٰنَ — “insonni yaratdi”\n' +
      '- أَنزَلَ ٱلْكِتَٰبَ — “kitobni nozil qildi”\n' +
      '- ٱهْدِنَا — “bizni hidoyat qil” (ـنا — qo‘shimcha maf’ul)\n\n' +
      '**Foil bilan farqi faqat harakatda.** Ikkalasi ham fe’ldan keyin turadi:\n' +
      '- قَتَلَ زَيْدٌ عَمْرًا — dammali زَيْدٌ o‘ldirdi, fathali عَمْرًا o‘ldirildi\n\n' +
      'Agar bu ikki harakatni almashtirsangiz, kim kimni o‘ldirgani teskari bo‘ladi. **Mana shuning uchun i’rob kerak.**\n\n' +
      '**Olmosh bo‘lgan maf’ul.** Ko‘pincha to‘ldiruvchi alohida so‘z emas, fe’lga qo‘shilgan olmosh bo‘ladi:\n' +
      '- خَلَقَهُ — “uni yaratdi”\n' +
      '- ٱهْدِنَا — “bizni hidoyat qil”\n' +
      '- يَعْلَمُهُمْ — “ularni biladi”\n\n' +
      'Bu holda harakat ko‘rinmaydi, lekin vazifa o‘sha.\n\n' +
      '**Ba’zi fe’llar ikkita maf’ul oladi:**\n' +
      '- ءَاتَىٰهُ ٱلْمُلْكَ — “unga mulkni berdi”. Ikkalasi ham maf’ul: ـهُ va ٱلْمُلْكَ.'
  },
  {
    slug: 'mubtada-khabar',
    titleAr: 'المبتدأ والخبر',
    titleUz: 'Mubtada va xabar — ot gapning ikki qismi',
    kind: NahwTopicKind.ROLE,
    position: 14,
    summaryUz: 'Ega odatda aniq, xabar odatda noaniq. Ikkalasi ham dammali.',
    summaryRu: 'Подлежащее обычно определённое, сказуемое — неопределённое; оба в именительном.',
    summaryEn: 'The topic is usually definite, the comment indefinite; both are nominative.',
    exampleSura: 2,
    exampleAyah: 2,
    exampleNoteUz:
      'ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ فِيهِ — ذَٰلِكَ ega, ٱلْكِتَٰبُ uning sifati, keyin yangi gap boshlanadi.',
    bodyUz:
      'Ot gapning ikki qismini ajratish — nahvdagi eng amaliy ko‘nikma.\n\n' +
      '**Mubtada (ega)** — gap nima haqida:\n' +
      '- odatda **aniq** (ال bilan yoki atoqli ot yoki olmosh)\n' +
      '- **dammali**\n' +
      '- gap boshida turadi\n\n' +
      '**Xabar** — ega haqida aytilayotgan narsa:\n' +
      '- odatda **noaniq** (tanvinli)\n' +
      '- **dammali**\n\n' +
      'ٱللَّهُ أَحَدٌ: ٱللَّهُ ega (aniq), أَحَدٌ xabar (tanvinli).\n\n' +
      '**Xabar har doim bitta so‘z emas.** U quyidagilar ham bo‘lishi mumkin:\n' +
      '- ko‘makchili ibora: ٱلْحَمْدُ **لِلَّهِ**\n' +
      '- butun gap: ٱلَّذِينَ ءَامَنُوا۟ **لَهُمْ أَجْرٌ**\n\n' +
      '**Tartib almashishi mumkin.** Agar xabar ko‘makchili ibora bo‘lsa, u oldinga chiqadi:\n' +
      '- لَهُ ٱلْمُلْكُ — “mulk Unikidir” (لَهُ xabar, ٱلْمُلْكُ ega)\n' +
      '- فِى قُلُوبِهِم مَّرَضٌ — “qalblarida kasallik bor”\n\n' +
      'Bu holda dammali so‘zni topib, uni ega deb bilasiz — tartibga qaramay.'
  },
  {
    slug: 'mudaf-ilayh',
    titleAr: 'المضاف إليه',
    titleUz: 'Muzof ilayh — izofaning ikkinchi qismi',
    kind: NahwTopicKind.ROLE,
    position: 15,
    summaryUz: 'Izofada ikkinchi ot: ko‘makchisiz kasrali bo‘lsa, deyarli doim shu.',
    summaryRu: 'Второе имя идафы: в родительном падеже без предлога.',
    summaryEn: 'The possessor in a chain: genitive without any preposition.',
    exampleSura: 1,
    exampleAyah: 4,
    exampleNoteUz: 'مَٰلِكِ يَوْمِ ٱلدِّينِ — uch qavatli izofa. يَوْمِ ham muzof, ham muzof ilayh.',
    bodyUz:
      'Majrur bo‘lishning ikkinchi sababi (birinchisi — ko‘makchi).\n\n' +
      'Agar ot **kasrali** bo‘lsa-yu, oldida **ko‘makchi bo‘lmasa** — bu deyarli har doim muzof ilayh:\n' +
      '- كِتَابُ ٱللَّهِ — ٱللَّهِ kasrali, oldida ko‘makchi yo‘q → muzof ilayh\n' +
      '- رَسُولُ ٱللَّهِ — “Allohning rasuli”\n\n' +
      '**Zanjir bo‘lishi mumkin va Qur’onda ko‘p:**\n' +
      'مَٰلِكِ يَوْمِ ٱلدِّينِ — “din kunining egasi”\n' +
      '- مَٰلِكِ — muzof (birinchi)\n' +
      '- يَوْمِ — bir vaqtning o‘zida **muzof ilayh** (oldingisiga) va **muzof** (keyingisiga)\n' +
      '- ٱلدِّينِ — muzof ilayh (oxirgi)\n\n' +
      'Ya’ni oxirgisidan boshqa hammasi ikki vazifani bajaradi.\n\n' +
      '**Qanday tekshirish kerak?** Ikki ot yonma-yon kelsa:\n' +
      '- Birinchisida **ال yo‘q va tanvin yo‘q**, ikkinchisi **kasrali** → izofa\n' +
      '- Ikkalasi ham **ال bilan** va bir xil holatda → sifat\n\n' +
      'Bu ikkisini ajratish oyat tarjimasini butunlay o‘zgartiradi: كِتَابُ ٱللَّهِ “Allohning kitobi”, ٱلْكِتَابُ ٱلْكَرِيمُ “ulug‘ kitob”.'
  }
]
