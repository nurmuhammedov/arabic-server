import { RootClassCode } from '../../sarf/enums/sarf.enum'

const WEAK = new Set(['و', 'ي'])
const HAMZA = new Set(['ء', 'أ', 'إ', 'آ', 'ؤ', 'ئ', 'ٱ'])

/**
 * Decides which weak-root class a root belongs to, in order of how much the
 * class disturbs the surface form. A root can qualify for two classes — أتي is
 * both hamzated and defective — so the more disruptive feature wins, which is
 * the one a learner has to compensate for when reading.
 *
 * Returns null for non-triliteral roots; the classical classes only describe
 * three-letter roots.
 */
export const classifyRoot = (radicals: string): RootClassCode | null => {
  const chars = [...radicals]
  if (chars.length !== 3) return null

  const weakPositions = chars.flatMap((char, index) => (WEAK.has(char) ? [index] : []))

  if (weakPositions.length >= 2) return RootClassCode.DOUBLY_WEAK
  if (chars[1] === chars[2]) return RootClassCode.DOUBLED
  if (weakPositions.includes(1)) return RootClassCode.HOLLOW
  if (weakPositions.includes(2)) return RootClassCode.DEFECTIVE
  if (weakPositions.includes(0)) return RootClassCode.ASSIMILATED
  if (chars.some((char) => HAMZA.has(char))) return RootClassCode.HAMZATED

  return RootClassCode.SOUND
}
