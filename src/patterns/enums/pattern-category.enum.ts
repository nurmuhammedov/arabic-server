export enum PatternCategory {
  /** اسم الفاعل — the one performing the action: كاتِب "writer". */
  ACTIVE_PARTICIPLE = 'ACTIVE_PARTICIPLE',
  /** اسم المفعول — the thing acted upon: مَكْتُوب "written". */
  PASSIVE_PARTICIPLE = 'PASSIVE_PARTICIPLE',
  /** المصدر — the action itself as a noun: كِتابَة "writing". */
  VERBAL_NOUN = 'VERBAL_NOUN',
  /** اسم المكان / الزمان — place or time of the action: مَكْتَب "office". */
  PLACE_OR_TIME = 'PLACE_OR_TIME',
  /** الصفة المشبهة — a lasting quality: عَلِيم "knowing". */
  ADJECTIVE = 'ADJECTIVE',
  /** صيغة المبالغة — intensified doer: غَفّار "ever-forgiving". */
  INTENSIVE = 'INTENSIVE',
  /** اسم التفضيل — comparative or superlative: أَكْبَر "greater". */
  COMPARATIVE = 'COMPARATIVE',
  /** اسم الآلة — the instrument: مِفْتاح "key". */
  INSTRUMENT = 'INSTRUMENT',
  /** Verb conjugation templates: فَعَلَ, يَفْعَلُ, أَفْعَلَ … */
  VERB = 'VERB',
  /** جمع التكسير — broken plural: أَصْحاب. */
  BROKEN_PLURAL = 'BROKEN_PLURAL',
  /** A plain noun template with no predictable derivational meaning. */
  NOUN = 'NOUN',
  OTHER = 'OTHER'
}
