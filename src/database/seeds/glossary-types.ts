/**
 * Uzbek / Russian / English glosses for Quranic lemmas.
 *
 * Keys are the vocalised lemma as the Quranic Arabic Corpus spells it, compared
 * after NFC canonicalisation — the corpus writes shadda before the vowel while
 * hand-typed text writes it after. Run `check-glossary.ts` after editing.
 *
 * Verbs are glossed with infinitives, the convention Uzbek and Russian
 * dictionaries use, even though the Arabic lemma is a 3rd-person past form.
 *
 * Everything here is seeded as DRAFT and must be reviewed before it is marked
 * VERIFIED. See data/SOURCE.md.
 */
export type Gloss = readonly [lemma: string, uz: string, ru: string, en: string]
