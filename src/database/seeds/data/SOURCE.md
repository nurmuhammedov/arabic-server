# Source data

## quran-morphology.txt

Quranic Arabic Corpus, morphological annotation version 0.4 — by Kais Dukes,
University of Leeds. Released under the GNU General Public License.

- Project: https://corpus.quran.com/
- This copy: https://github.com/mustafa0x/quran-morphology (fork of corpus v0.4)

Format, one tab-separated row per morphological segment:

```
sura:ayah:word:segment <TAB> arabic <TAB> pos <TAB> features
1:1:1:2                     سْمِ      N       ROOT:سمو|LEM:اسْم|M|GEN
```

`pos` is `N` (nominal), `V` (verb) or `P` (particle). Features are pipe-separated;
`KEY:VALUE` pairs carry `ROOT`, `LEM` and `VF` (verb form I–X), bare tags carry
grammatical categories (`PREF`, `SUFF`, `GEN`, `3MS`, `ACT_PCPL`, …).

Totals: 130,030 segments, 77,992 standalone (non-affix) segments,
4,763 distinct lemmas, 1,651 distinct roots.

## Glosses

Uzbek, Russian and English glosses in `glossary.ts` are authored for this project
and start life as `DRAFT`. They must be reviewed by someone competent in Quranic
Arabic before being marked `VERIFIED`; the admin UI exposes that workflow.
