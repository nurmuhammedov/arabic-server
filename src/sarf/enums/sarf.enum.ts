/** The four families the classical curriculum splits the 22 abwāb into. */
export enum FormCategory {
  /** ثلاثي مجرد — bare triliteral, 6 bābs distinguished only by their vowels. */
  TRILITERAL_BARE = 'TRILITERAL_BARE',
  /** ثلاثي مزيد — triliteral with 1–3 letters added, 12 bābs. */
  TRILITERAL_AUGMENTED = 'TRILITERAL_AUGMENTED',
  /** رباعي مجرد — bare quadriliteral, 1 bāb. */
  QUADRILITERAL_BARE = 'QUADRILITERAL_BARE',
  /** رباعي مزيد — augmented quadriliteral, 3 bābs. */
  QUADRILITERAL_AUGMENTED = 'QUADRILITERAL_AUGMENTED'
}

/**
 * How a root behaves under conjugation. Weak letters (و ي ء) and doubled
 * radicals change the surface form, which is why a learner who knows only the
 * templates still stumbles on قالَ or وَعَدَ until they know the class.
 */
export enum RootClassCode {
  /** صحيح سالم — no weak letter, no doubling, no hamza. */
  SOUND = 'SOUND',
  /** مضاعف — second and third radicals identical: ردد, مسس. */
  DOUBLED = 'DOUBLED',
  /** مهموز — one radical is hamza: أمر, سأل, قرأ. */
  HAMZATED = 'HAMZATED',
  /** مثال — first radical is و or ي: وعد, يسر. */
  ASSIMILATED = 'ASSIMILATED',
  /** أجوف — middle radical is و or ي: قول, بيع. */
  HOLLOW = 'HOLLOW',
  /** ناقص — final radical is و or ي: دعو, رمي. */
  DEFECTIVE = 'DEFECTIVE',
  /** لفيف — two weak radicals: وقي, طوي. */
  DOUBLY_WEAK = 'DOUBLY_WEAK'
}
