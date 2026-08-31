import { PatternCategory } from '../../patterns/enums/pattern-category.enum'
import type { PatternGloss } from './pattern-glossary'

/**
 * The second batch of templates, taken in order of how much Quranic text each
 * one carries. A few entries are not separate templates at all but the spelling
 * a weak root forces on a familiar one; they are labelled as such so a learner
 * meeting آمَنَ knows to file it under أَفْعَلَ.
 */
export const PATTERN_GLOSSES_2: readonly PatternGloss[] = [
  // ── nouns ──────────────────────────────────────────────────────
  {
    wazn: 'فَعَل',
    category: PatternCategory.NOUN,
    uz: 'Sodda ot: bir narsaning o‘z nomi',
    ru: 'Простое существительное',
    en: 'Plain noun',
    exampleWord: 'مَلَك',
    exampleMeaning: 'farishta'
  },
  {
    wazn: 'فُعْلان',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Ishning nomi yoki holat: “o‘qish”, “poklik”',
    ru: 'Отглагольное имя, состояние',
    en: 'Verbal noun or state',
    exampleWord: 'قُرْءان',
    exampleMeaning: 'o‘qish, Qur’on'
  },
  {
    wazn: 'فِعْلَة',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Bir marta bajarilgan ish yoki uning natijasi',
    ru: 'Однократное действие или его плод',
    en: 'A single instance of the action',
    exampleWord: 'نِعْمَة',
    exampleMeaning: 'ne’mat'
  },
  {
    wazn: 'فُعُل',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'Ko‘plik yoki juft a’zo nomi',
    ru: 'Множественное число, парный орган',
    en: 'Plural, often a paired body part',
    exampleWord: 'أُذُن',
    exampleMeaning: 'quloq'
  },
  {
    wazn: 'فَعَلَة',
    category: PatternCategory.NOUN,
    uz: 'Bittalik ot: turdan bir dona',
    ru: 'Единичный предмет из рода',
    en: 'A single unit of a kind',
    exampleWord: 'شَجَرَة',
    exampleMeaning: 'daraxt'
  },
  {
    wazn: 'فَعِلّ',
    category: PatternCategory.ADJECTIVE,
    uz: 'Doimiy sifat; illatli o‘zakda oxirgi ي qo‘shaloq bo‘ladi',
    ru: 'Постоянное качество',
    en: 'Lasting quality',
    exampleWord: 'وَلِيّ',
    exampleMeaning: 'do‘st, homiy'
  },
  {
    wazn: 'فُعال',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Kasallik, ovoz yoki chiqindi nomlari ko‘p uchraydigan qolip',
    ru: 'Болезнь, звук, остаток',
    en: 'Illness, sound or residue',
    exampleWord: 'تُراب',
    exampleMeaning: 'tuproq'
  },
  {
    wazn: 'فَعِّلَة',
    category: PatternCategory.ADJECTIVE,
    uz: 'Sifatning ayol shakli, o‘rta harfi qo‘shaloq',
    ru: 'Женская форма качества',
    en: 'Feminine of an emphatic quality',
    exampleWord: 'بَيِّنَة',
    exampleMeaning: 'aniq hujjat'
  },
  {
    wazn: 'فَعِيلَة',
    category: PatternCategory.ADJECTIVE,
    uz: 'Doimiy sifatning ayol shakli',
    ru: 'Женская форма постоянного качества',
    en: 'Feminine lasting quality',
    exampleWord: 'مَدِينَة',
    exampleMeaning: 'shahar'
  },
  {
    wazn: 'فُعًل',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Illatli o‘zakdan yasalgan ishning nomi',
    ru: 'Отглагольное имя от слабого корня',
    en: 'Verbal noun from a weak root',
    exampleWord: 'هُدًى',
    exampleMeaning: 'hidoyat'
  },
  {
    wazn: 'فَعِل',
    category: PatternCategory.ADJECTIVE,
    uz: 'Vaqtinchalik holat bildiruvchi sifat',
    ru: 'Временное состояние',
    en: 'Temporary state',
    exampleWord: 'مَلِك',
    exampleMeaning: 'podshoh'
  },
  {
    wazn: 'فِعْلان',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Ishning nomi yoki uning egasi',
    ru: 'Отглагольное имя или носитель',
    en: 'Verbal noun or bearer',
    exampleWord: 'إِنسان',
    exampleMeaning: 'inson'
  },
  {
    wazn: 'فَعالَة',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Kasb, holat yoki mavhum tushuncha nomi',
    ru: 'Ремесло, состояние, отвлечённое понятие',
    en: 'Craft, state or abstract notion',
    exampleWord: 'شَهادَة',
    exampleMeaning: 'guvohlik'
  },
  {
    wazn: 'فُعْلَة',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Bir bo‘lak yoki bir marta bajarilgan ish',
    ru: 'Часть или однократное действие',
    en: 'A portion or single instance',
    exampleWord: 'سُورَة',
    exampleMeaning: 'sura'
  },
  {
    wazn: 'فَعُلّ',
    category: PatternCategory.ADJECTIVE,
    uz: 'Kuchli, doimiy sifat',
    ru: 'Сильное постоянное качество',
    en: 'Strong lasting quality',
    exampleWord: 'عَدُوّ',
    exampleMeaning: 'dushman'
  },
  {
    wazn: 'فَعُل',
    category: PatternCategory.NOUN,
    uz: 'Sodda ot, o‘rta harfi dammali',
    ru: 'Простое имя с даммой',
    en: 'Plain noun with damma',
    exampleWord: 'رَجُل',
    exampleMeaning: 'erkak'
  },
  {
    wazn: 'مَفِعل',
    category: PatternCategory.PLACE_OR_TIME,
    uz: 'Illatli o‘zakdan joy yoki borar o‘rin',
    ru: 'Место от слабого корня',
    en: 'Place from a weak root',
    exampleWord: 'مَصِير',
    exampleMeaning: 'borar joy, oqibat'
  },
  {
    wazn: 'مُفاعِل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'III bobning bajaruvchisi: kimgadir qarshi yoki kim bilandir birga ish qiluvchi',
    ru: 'Действующее лицо III породы',
    en: 'Doer of Form III',
    exampleWord: 'مُنافِق',
    exampleMeaning: 'munofiq'
  },
  {
    wazn: 'مُفْعِلَة',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'IV bob bajaruvchisining ayol shakli',
    ru: 'Женское действующее лицо IV породы',
    en: 'Feminine doer of Form IV',
    exampleWord: 'مُؤْمِنَة',
    exampleMeaning: 'mo‘mina'
  },
  {
    wazn: 'فَعِلَة',
    category: PatternCategory.NOUN,
    uz: 'Bittalik ot, o‘rta harfi kasrali',
    ru: 'Единичное имя с касрой',
    en: 'Single unit with kasra',
    exampleWord: 'كَلِمَة',
    exampleMeaning: 'so‘z'
  },
  {
    wazn: 'فِيعال',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'IV bob masdari; illatli o‘zakda ي paydo bo‘ladi',
    ru: 'Масдар IV породы от слабого корня',
    en: 'Form IV verbal noun from a weak root',
    exampleWord: 'إِيمان',
    exampleMeaning: 'iymon'
  },
  {
    wazn: 'مُفَعَّل',
    category: PatternCategory.PASSIVE_PARTICIPLE,
    uz: 'II bobda ish tushgan narsa: “yaqinlashtirilgan”',
    ru: 'Претерпевающее лицо II породы',
    en: 'Object of Form II',
    exampleWord: 'مُقَرَّب',
    exampleMeaning: 'yaqinlashtirilgan'
  },
  {
    wazn: 'فِعَل',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'Siniq ko‘plik yoki sodda ot',
    ru: 'Ломаное множественное',
    en: 'Broken plural or plain noun',
    exampleWord: 'عِنَب',
    exampleMeaning: 'uzum'
  },
  {
    wazn: 'مَفاعِل',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'مَفْعَل qolipidagi joy otlarining ko‘pligi',
    ru: 'Множественное от имён места',
    en: 'Plural of place nouns',
    exampleWord: 'مَنافِع',
    exampleMeaning: 'manfaatlar'
  },
  {
    wazn: 'مَفْعِلَة',
    category: PatternCategory.PLACE_OR_TIME,
    uz: 'Ishning nomi yoki uning joyi, ayol shaklida',
    ru: 'Имя действия или места, женский род',
    en: 'Action or place, feminine',
    exampleWord: 'مَغْفِرَة',
    exampleMeaning: 'mag‘firat'
  },
  {
    wazn: 'فِعْلَى',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Mavhum ot, oxiri alif maqsura',
    ru: 'Отвлечённое имя',
    en: 'Abstract noun',
    exampleWord: 'ذِكْرَى',
    exampleMeaning: 'eslatma'
  },
  {
    wazn: 'فُعُلَة',
    category: PatternCategory.NOUN,
    uz: 'Bittalik ot, ikki dammali',
    ru: 'Единичное имя с двумя даммами',
    en: 'Single unit with two dammas',
    exampleWord: 'ظُلُمَة',
    exampleMeaning: 'zulmat'
  },
  {
    wazn: 'فَعائِل',
    category: PatternCategory.BROKEN_PLURAL,
    uz: 'فَعِيلَة va shunga o‘xshash otlarning siniq ko‘pligi',
    ru: 'Ломаное множественное от فَعِيلَة',
    en: 'Broken plural of فَعِيلَة nouns',
    exampleWord: 'خَزائِن',
    exampleMeaning: 'xazinalar'
  },
  {
    wazn: 'مُفَعَّلَة',
    category: PatternCategory.PASSIVE_PARTICIPLE,
    uz: 'II bobda ish tushgan narsaning ayol shakli',
    ru: 'Женская форма претерпевающего II породы',
    en: 'Feminine object of Form II',
    exampleWord: 'مُطَهَّرَة',
    exampleMeaning: 'poklangan'
  },
  {
    wazn: 'مَفْعُولَة',
    category: PatternCategory.PASSIVE_PARTICIPLE,
    uz: 'Ish tushgan narsaning ayol shakli',
    ru: 'Женская форма претерпевающего',
    en: 'Feminine passive participle',
    exampleWord: 'مَعْدُودَة',
    exampleMeaning: 'sanoqli'
  },
  {
    wazn: 'مِفْعِيل',
    category: PatternCategory.INSTRUMENT,
    uz: 'Asbob yoki doimiy holat egasi',
    ru: 'Орудие или носитель состояния',
    en: 'Instrument or bearer of a state',
    exampleWord: 'مِسْكِين',
    exampleMeaning: 'miskin'
  },
  {
    wazn: 'فَعْلَى',
    category: PatternCategory.VERBAL_NOUN,
    uz: 'Mavhum ot, oxiri alif maqsura',
    ru: 'Отвлечённое имя',
    en: 'Abstract noun',
    exampleWord: 'دَعْوَى',
    exampleMeaning: 'da’vo'
  },
  {
    wazn: 'مُفْتَعل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'VIII bobning bajaruvchisi',
    ru: 'Действующее лицо VIII породы',
    en: 'Doer of Form VIII',
    exampleWord: 'مُهْتَدي',
    exampleMeaning: 'hidoyat topgan'
  },
  {
    wazn: 'فَعْلاء',
    category: PatternCategory.ADJECTIVE,
    uz: 'Sifatning ayol shakli yoki mavhum ot',
    ru: 'Женская форма качества',
    en: 'Feminine adjective or abstract noun',
    exampleWord: 'فَحْشاء',
    exampleMeaning: 'fahsh, buzuqlik'
  },
  {
    wazn: 'فَعِّل',
    category: PatternCategory.ADJECTIVE,
    uz: 'O‘rta harfi qo‘shaloq sifat',
    ru: 'Качество с удвоенной серединой',
    en: 'Quality with a doubled middle',
    exampleWord: 'طَيِّب',
    exampleMeaning: 'pok, yoqimli'
  },
  {
    wazn: 'فَيْعال',
    category: PatternCategory.NOUN,
    uz: 'Kamdan-kam uchraydigan ot qolipi',
    ru: 'Редкий именной шаблон',
    en: 'A rare noun template',
    exampleWord: 'شَيْطان',
    exampleMeaning: 'shayton'
  },
  {
    wazn: 'فَعَّل',
    category: PatternCategory.NOUN,
    uz: 'O‘rta harfi qo‘shaloq sodda ot',
    ru: 'Имя с удвоенной серединой',
    en: 'Noun with a doubled middle',
    exampleWord: 'أَوَّل',
    exampleMeaning: 'birinchi'
  },
  {
    wazn: 'فاعَل',
    category: PatternCategory.NOUN,
    uz: 'Ot, o‘rtasi fathali',
    ru: 'Имя с фатхой в середине',
    en: 'Noun with a middle fatha',
    exampleWord: 'عالَم',
    exampleMeaning: 'olam'
  },
  {
    wazn: 'فَعَلًا',
    category: PatternCategory.NOUN,
    uz: 'Tanvinli ravish shakli',
    ru: 'Наречная форма с танвином',
    en: 'Adverbial form with tanwin',
    exampleWord: 'أَبَدًا',
    exampleMeaning: 'abadiy, hech qachon'
  },
  {
    wazn: 'افْعَلَت',
    category: PatternCategory.NOUN,
    uz: 'Bog‘lanishda yozilgan ot shakli',
    ru: 'Имя в сопряжённом написании',
    en: 'A noun in construct spelling',
    exampleWord: 'امْرَأَت',
    exampleMeaning: 'ayol'
  },
  {
    wazn: 'فُعَلّ',
    category: PatternCategory.NOUN,
    uz: 'Kichraytirish shakli: “o‘g‘ilcham”',
    ru: 'Уменьшительная форма',
    en: 'Diminutive form',
    exampleWord: 'بُنَىّ',
    exampleMeaning: 'o‘g‘ilcham'
  },

  // ── verbs ──────────────────────────────────────────────────────
  {
    wazn: 'يَفْعُلُ',
    category: PatternCategory.VERB,
    uz: 'I bobning hozirgi zamoni, o‘rtasi dammali',
    ru: 'Настоящее I породы с даммой',
    en: 'Form I present with damma',
    exampleWord: 'يَنصُرُ',
    exampleMeaning: 'yordam beradi'
  },
  {
    wazn: 'يَفْعِلُ',
    category: PatternCategory.VERB,
    uz: 'I bobning hozirgi zamoni, o‘rtasi kasrali',
    ru: 'Настоящее I породы с касрой',
    en: 'Form I present with kasra',
    exampleWord: 'يَضْرِبُ',
    exampleMeaning: 'uradi'
  },
  {
    wazn: 'أُفْعِلُ',
    category: PatternCategory.VERB,
    uz: 'IV bobning majhuli: ish uning ustida bajarilgan',
    ru: 'Страдательный залог IV породы',
    en: 'Form IV passive',
    exampleWord: 'أُدْخِلَ',
    exampleMeaning: 'kiritildi'
  },
  {
    wazn: 'فُعِّلَ',
    category: PatternCategory.VERB,
    uz: 'II bobning majhuli',
    ru: 'Страдательный залог II породы',
    en: 'Form II passive',
    exampleWord: 'بُشِّرَ',
    exampleMeaning: 'xushxabar berildi'
  },
  {
    wazn: 'فِعْلَ',
    category: PatternCategory.VERB,
    uz: 'O‘zgarmas maqtov va qoralash fe’llari',
    ru: 'Застывшие глаголы похвалы и порицания',
    en: 'Frozen verbs of praise and blame',
    exampleWord: 'نِعْمَ',
    exampleMeaning: 'naqadar yaxshi'
  },
  {
    wazn: 'يُفْعِلُ',
    category: PatternCategory.VERB,
    uz: 'IV bobning hozirgi zamoni',
    ru: 'Настоящее IV породы',
    en: 'Form IV present',
    exampleWord: 'يُنزِلُ',
    exampleMeaning: 'tushiradi'
  },
  {
    wazn: 'فَعَلَتْ',
    category: PatternCategory.VERB,
    uz: 'I bobning o‘tgan zamoni, ayol shaxs',
    ru: 'Прошедшее I породы, женский род',
    en: 'Form I past, feminine',
    exampleWord: 'مَلَكَتْ',
    exampleMeaning: 'egalik qildi'
  },
  {
    wazn: 'يَتَفَعَّلُ',
    category: PatternCategory.VERB,
    uz: 'V bobning hozirgi zamoni: ishni o‘ziga qaratish',
    ru: 'Настоящее V породы',
    en: 'Form V present',
    exampleWord: 'يَتَفَكَّرُ',
    exampleMeaning: 'tafakkur qiladi'
  },
  {
    wazn: 'فُعِلَ',
    category: PatternCategory.VERB,
    uz: 'I bobning majhuli: bajaruvchi aytilmaydi',
    ru: 'Страдательный залог I породы',
    en: 'Form I passive',
    exampleWord: 'قُطِعَ',
    exampleMeaning: 'kesildi'
  },
  {
    wazn: 'يُفَعِّلُ',
    category: PatternCategory.VERB,
    uz: 'II bobning hozirgi zamoni: kuchaytirish yoki qildirish',
    ru: 'Настоящее II породы',
    en: 'Form II present',
    exampleWord: 'يُدَبِّرُ',
    exampleMeaning: 'tadbir qiladi'
  },
  {
    wazn: 'يُفاعِلُ',
    category: PatternCategory.VERB,
    uz: 'III bobning hozirgi zamoni',
    ru: 'Настоящее III породы',
    en: 'Form III present',
    exampleWord: 'يُضاعِفُ',
    exampleMeaning: 'ikki barobar qiladi'
  },
  {
    wazn: 'يُفْعَلُ',
    category: PatternCategory.VERB,
    uz: 'IV bobning majhul hozirgi zamoni',
    ru: 'Страдательное настоящее IV породы',
    en: 'Form IV passive present',
    exampleWord: 'يُنظَرُ',
    exampleMeaning: 'muhlat beriladi'
  },
  {
    wazn: 'يَسْتَفْعِلُ',
    category: PatternCategory.VERB,
    uz: 'X bobning hozirgi zamoni: talab qilish',
    ru: 'Настоящее X породы',
    en: 'Form X present',
    exampleWord: 'يَسْتَغْفِرُ',
    exampleMeaning: 'mag‘firat so‘raydi'
  },
  {
    wazn: 'أَفْعَلَتْ',
    category: PatternCategory.VERB,
    uz: 'IV bobning o‘tgan zamoni, ayol shaxs',
    ru: 'Прошедшее IV породы, женский род',
    en: 'Form IV past, feminine',
    exampleWord: 'أَرْضَعَتْ',
    exampleMeaning: 'emizdi'
  },
  {
    wazn: 'فُعِّلَتْ',
    category: PatternCategory.VERB,
    uz: 'II bobning majhuli, ayol shaxs',
    ru: 'Страдательный II породы, женский род',
    en: 'Form II passive, feminine',
    exampleWord: 'زُوِّجَتْ',
    exampleMeaning: 'juftlashtirildi'
  },
  {
    wazn: 'اسْتُفْعِلَ',
    category: PatternCategory.VERB,
    uz: 'X bobning majhuli',
    ru: 'Страдательный залог X породы',
    en: 'Form X passive',
    exampleWord: 'اسْتُهْزِئَ',
    exampleMeaning: 'masxara qilindi'
  },
  {
    wazn: 'فُعِلَتْ',
    category: PatternCategory.VERB,
    uz: 'I bobning majhuli, ayol shaxs',
    ru: 'Страдательный I породы, женский род',
    en: 'Form I passive, feminine',
    exampleWord: 'مُلِئَتْ',
    exampleMeaning: 'to‘ldirildi'
  },
  {
    wazn: 'تَفْعَلُ',
    category: PatternCategory.VERB,
    uz: 'I bobning hozirgi zamoni, ikkinchi shaxs yoki ayol',
    ru: 'Настоящее I породы, 2-е лицо',
    en: 'Form I present, second person',
    exampleWord: 'تَزْرَعُ',
    exampleMeaning: 'ekasan'
  },
  {
    wazn: 'يَفْتَعِلُ',
    category: PatternCategory.VERB,
    uz: 'VIII bobning hozirgi zamoni',
    ru: 'Настоящее VIII породы',
    en: 'Form VIII present',
    exampleWord: 'يَنتَظِرُ',
    exampleMeaning: 'kutadi'
  },
  {
    wazn: 'يَتَفاعَلُ',
    category: PatternCategory.VERB,
    uz: 'VI bobning hozirgi zamoni: o‘zaro ish',
    ru: 'Настоящее VI породы',
    en: 'Form VI present',
    exampleWord: 'يَتَساءَلُ',
    exampleMeaning: 'bir-biridan so‘rashadi'
  },
  {
    wazn: 'تُفْعِلُ',
    category: PatternCategory.VERB,
    uz: 'IV bobning hozirgi zamoni, ikkinchi shaxs',
    ru: 'Настоящее IV породы, 2-е лицо',
    en: 'Form IV present, second person',
    exampleWord: 'تُنكِحُ',
    exampleMeaning: 'nikohlaysan'
  },
  {
    wazn: 'تَفْعِلُ',
    category: PatternCategory.VERB,
    uz: 'I bobning hozirgi zamoni, o‘rtasi kasrali',
    ru: 'Настоящее I породы с касрой',
    en: 'Form I present with kasra',
    exampleWord: 'تَدْرِي',
    exampleMeaning: 'bilasan'
  },
  {
    wazn: 'فُوعِلَ',
    category: PatternCategory.VERB,
    uz: 'III bobning majhuli',
    ru: 'Страдательный залог III породы',
    en: 'Form III passive',
    exampleWord: 'أُوذِيَ',
    exampleMeaning: 'ozor berildi'
  },
  {
    wazn: 'فَعْلَ',
    category: PatternCategory.VERB,
    uz: '“Emas” ma’nosidagi o‘zgarmas fe’l',
    ru: 'Застывший глагол отрицания',
    en: 'A frozen verb of negation',
    exampleWord: 'لَيْسَ',
    exampleMeaning: 'emas'
  },
  {
    wazn: 'يَفْعُلا۟',
    category: PatternCategory.VERB,
    uz: 'I bobning hozirgi zamoni, oxiri illatli',
    ru: 'Настоящее I породы со слабым концом',
    en: 'Form I present with a weak final radical',
    exampleWord: 'يَرْجُوا۟',
    exampleMeaning: 'umid qiladi'
  },

  // ── spellings a weak root forces on a familiar template ─────────
  {
    wazn: 'فعَلَ',
    category: PatternCategory.VERB,
    uz: 'أَفْعَلَ ning yozilish shakli: o‘zak boshidagi hamza آ ga qo‘shilib ketgan',
    ru: 'Написание أَفْعَلَ при начальной хамзе',
    en: 'A spelling of أَفْعَلَ where the initial hamza merges',
    exampleWord: 'آمَنَ',
    exampleMeaning: 'iymon keltirdi'
  },
  {
    wazn: 'فعِل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'فاعِل ning yozilish shakli, boshida آ',
    ru: 'Написание فاعِل с آ',
    en: 'A spelling of فاعِل with آ',
    exampleWord: 'آخِر',
    exampleMeaning: 'oxirgi'
  },
  {
    wazn: 'فعَل',
    category: PatternCategory.COMPARATIVE,
    uz: 'أَفْعَل ning yozilish shakli, boshida آ',
    ru: 'Написание أَفْعَل с آ',
    en: 'A spelling of أَفْعَل with آ',
    exampleWord: 'آخَر',
    exampleMeaning: 'boshqa'
  },
  {
    wazn: 'افَّعَلَ',
    category: PatternCategory.VERB,
    uz: 'افْتَعَلَ ning yozilish shakli: ت o‘zak harfiga singib ketgan',
    ru: 'Написание افْتَعَلَ с ассимиляцией ت',
    en: 'A spelling of افْتَعَلَ where ت assimilates',
    exampleWord: 'اتَّبَعَ',
    exampleMeaning: 'ergashdi'
  },
  {
    wazn: 'مُفِعل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'مُفْعِل ning yozilish shakli, o‘rta harfi illatli',
    ru: 'Написание مُفْعِل со слабой серединой',
    en: 'A spelling of مُفْعِل with a weak middle',
    exampleWord: 'مُبِين',
    exampleMeaning: 'ochiq-oydin'
  },
  {
    wazn: 'فِعٰل',
    category: PatternCategory.NOUN,
    uz: 'فِعال ning yozilish shakli, alif harf ustida yoziladi',
    ru: 'Написание فِعال с надстрочным алифом',
    en: 'A spelling of فِعال with a dagger alif',
    exampleWord: 'إِلٰه',
    exampleMeaning: 'iloh'
  },
  {
    wazn: 'فَعْلٰن',
    category: PatternCategory.ADJECTIVE,
    uz: 'فَعْلان ning yozilish shakli, alif harf ustida yoziladi',
    ru: 'Написание فَعْلان с надстрочным алифом',
    en: 'A spelling of فَعْلان with a dagger alif',
    exampleWord: 'رَحْمٰن',
    exampleMeaning: 'rahmon'
  },
  {
    wazn: 'فاعل',
    category: PatternCategory.ACTIVE_PARTICIPLE,
    uz: 'فاعِل ning yozilish shakli, oxirgi harfi illatli',
    ru: 'Написание فاعِل со слабым концом',
    en: 'A spelling of فاعِل with a weak final radical',
    exampleWord: 'باقي',
    exampleMeaning: 'boqiy'
  },
  {
    wazn: 'أَفۢعَلَ',
    category: PatternCategory.VERB,
    uz: 'أَفْعَلَ ning yozilish shakli, ichida kichik nun',
    ru: 'Написание أَفْعَلَ с малым нуном',
    en: 'A spelling of أَفْعَلَ with a small nūn',
    exampleWord: 'أَنۢبَتَ',
    exampleMeaning: 'o‘stirdi'
  }
]
