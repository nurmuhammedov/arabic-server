/** What job a function word does in a sentence. */
export enum ParticleCategory {
  /** حرف جر — puts the following noun in the genitive: مِن، فِي، عَلَى. */
  PREPOSITION = 'PREPOSITION',
  /** حرف عطف — joins two things: وَ، فَ، ثُمّ، أَو. */
  CONJUNCTION = 'CONJUNCTION',
  /** حرف نفي — negates: لا، ما، لَم، لَن. */
  NEGATION = 'NEGATION',
  /** حرف شرط — sets a condition: إِن، لَو، لَوْلا. */
  CONDITION = 'CONDITION',
  /** حرف توكيد ونصب — emphasises and governs: إِنّ، أَنّ، لَعَلّ، كَأَنّ. */
  EMPHASIS = 'EMPHASIS',
  /** حرف استفهام — asks: هَل، أَ، ما، مَن، كَيْف. */
  INTERROGATIVE = 'INTERROGATIVE',
  /** ضمير — stands for a noun: هُوَ، ـهُ، ـكُم، ـنا. */
  PRONOUN = 'PRONOUN',
  /** اسم إشارة — points at something: ذا، ذٰلِكَ، هٰؤُلاء. */
  DEMONSTRATIVE = 'DEMONSTRATIVE',
  /** اسم موصول — introduces a clause: الَّذِي، ما، مَن. */
  RELATIVE = 'RELATIVE',
  /** أداة استثناء — excepts: إِلّا، غَيْر. */
  EXCEPTION = 'EXCEPTION',
  /** حرف نداء — calls: يا، أَيُّها. */
  VOCATIVE = 'VOCATIVE',
  /** حرف استقبال — marks the future: سَـ، سَوْف. */
  FUTURE = 'FUTURE',
  /** ظرف — locates in time or place: بَعْد، قَبْل، عِنْد، بَيْن. */
  ADVERB = 'ADVERB',
  /** أداة تعريف — the definite article ال. */
  DEFINITE_ARTICLE = 'DEFINITE_ARTICLE',
  /** حرف مصدري ونصب — turns a verb clause into a noun: أَن، كَي. */
  SUBORDINATOR = 'SUBORDINATOR',
  /** حرف جواب — answers: بَلَى، نَعَم، كَلّا. */
  ANSWER = 'ANSWER',
  OTHER = 'OTHER'
}

/** Whether the word stands alone or is written joined to its neighbour. */
export enum Attachment {
  /** Written as its own word: مِن، إِنّ، الَّذِي. */
  STANDALONE = 'STANDALONE',
  /** Glued to the front of the next word: وَ، ال، بِ، لِ، فَ، سَـ. */
  PREFIX = 'PREFIX',
  /** Glued to the end of the previous word: ـهُ، ـكُم، ـنا. */
  SUFFIX = 'SUFFIX'
}

/**
 * The case or mood a particle forces on what follows — its عمل. This is the
 * single most useful thing to know about a particle, because it is how Arabic
 * marks who did what to whom.
 */
export enum GrammarEffect {
  /** Following noun takes kasra — مَجْرُور. */
  GENITIVE = 'GENITIVE',
  /** Following noun takes fatha — مَنْصُوب. */
  ACCUSATIVE_NOUN = 'ACCUSATIVE_NOUN',
  /** Following noun takes damma — مَرْفُوع. */
  NOMINATIVE_NOUN = 'NOMINATIVE_NOUN',
  /** Following present verb takes fatha — مَنْصُوب. */
  ACCUSATIVE_VERB = 'ACCUSATIVE_VERB',
  /** Following present verb takes sukun — مَجْزُوم. */
  JUSSIVE_VERB = 'JUSSIVE_VERB',
  /** Changes nothing that is written. */
  NONE = 'NONE'
}
