// Arabic signs, harakat, superscript alef, Quranic annotation marks and tatweel.
const DIACRITIC = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/
const DIACRITICS = new RegExp(DIACRITIC.source, 'g')

/**
 * Canonical form for every Arabic string entering or leaving the system. The
 * corpus writes shadda before the vowel; NFC reorders combining marks by
 * combining class, which puts them in the order stored rows and glossary keys
 * use. Text typed through the virtual keyboard arrives in the corpus order, so
 * without this a search for a word carrying shadda matches nothing.
 */
export const canonicalArabic = (value: string): string => value.normalize('NFC')

/** Strip vowel marks and normalise letter variants so search and matching are stable. */
export const normalizeArabic = (value: string): string =>
  value
    .replace(DIACRITICS, '')
    .replace(/[آأإٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim()

export { DIACRITIC, DIACRITICS }
