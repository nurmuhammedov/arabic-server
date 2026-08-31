/** The four states a word can be in — الإعراب. */
export enum IrabCase {
  /** مرفوع — damma. The doer, the subject of a nominal sentence, the predicate. */
  NOMINATIVE = 'NOMINATIVE',
  /** منصوب — fatha. The object, adverbs, and what إِنّ governs. */
  ACCUSATIVE = 'ACCUSATIVE',
  /** مجرور — kasra. After a preposition, and the second half of a possession chain. */
  GENITIVE = 'GENITIVE',
  /** مجزوم — sukun. A present verb after لَم, لا الناهية and the conditionals. */
  JUSSIVE = 'JUSSIVE',
  /** منصوب (فعل) — fatha on a present verb, after أَن, لَن, كَي. */
  SUBJUNCTIVE = 'SUBJUNCTIVE',
  /** مرفوع (فعل) — the default state of a present verb. */
  INDICATIVE = 'INDICATIVE'
}

/**
 * Why a word carries the ending it does. This is the whole point of naḥw: the
 * ending is never decoration, something in the sentence put it there.
 */
export enum IrabCause {
  /** Preceded by a preposition, attached or standalone. */
  PREPOSITION = 'PREPOSITION',
  /** Second half of a possession chain — مُضاف إِلَيْه. */
  IDAFA = 'IDAFA',
  /** Governed by إِنّ or one of its sisters. */
  INNA = 'INNA',
  /** Inside كانَ and its sisters: the ism stays marfūʿ, the khabar turns manṣūb. */
  KANA = 'KANA',
  /** Direct object of a verb — مَفْعُول بِه. */
  OBJECT = 'OBJECT',
  /** Doer of a verb — فاعِل. */
  SUBJECT = 'SUBJECT',
  /** Subject of a nominal sentence — مُبْتَدَأ. */
  TOPIC = 'TOPIC',
  /** An adjective copying the case of the noun before it — نَعْت. */
  ADJECTIVE = 'ADJECTIVE',
  /** Joined by وَ or فَ to an earlier word and copying its case — مَعْطُوف. */
  CONJUNCTION = 'CONJUNCTION',
  UNKNOWN = 'UNKNOWN'
}

/** How a naḥw lesson is framed in the curriculum. */
export enum NahwTopicKind {
  /** The case system itself. */
  CASE = 'CASE',
  /** A sentence shape: nominal, verbal. */
  SENTENCE = 'SENTENCE',
  /** A construction: idafa, adjective agreement, kana and its sisters. */
  STRUCTURE = 'STRUCTURE',
  /** A grammatical role: fa'il, maf'ul bihi, mubtada', khabar. */
  ROLE = 'ROLE'
}
