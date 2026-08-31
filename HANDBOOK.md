# Handbook

Written to be read first when picking this project back up. It covers what the
system is, why it is built the way it is, the traps that have already cost a
day, and what is left to do.

Two repositories, both on `main`, both deployed:

| | Repository | Runs at |
| --- | --- | --- |
| API | `nurmuhammedov/arabic-server` — NestJS 11, TypeORM | `arabic-server.fly.dev` |
| Web | `nurmuhammedov/arabic` — React 19, Vite | `arab-tilim.vercel.app` |
| Data | — | Neon Postgres 17, project `arabic`, database `neondb` |

Admin account: `admin`. Deployment steps live in [DEPLOY.md](./DEPLOY.md).

---

## 1. What the product is

A vocabulary trainer for **Quranic Arabic only**, aimed at Uzbek speakers who
can read the alphabet but do not know the words. Every lemma in the Quran is in
the database — 4,763 of them under 1,651 roots — and the teaching idea is that
a word is a **root poured into a pattern**, so learning roots and templates
lets a learner guess words they have never met.

Glosses are Uzbek, Russian and English, all three mandatory. Explanations are
deliberately plain-spoken and long rather than terse grammar labels; the user
asked for "qishloqcha" — village-plain — prose.

An admin curates the shared dictionary and can hand decks to students; a
student can also add private words of their own.

---

## 2. What is in the database

Run `pnpm seed` to rebuild it from the vendored corpus. It takes about nine
minutes locally, well under a minute against Neon.

| Table | Rows | Notes |
| --- | --- | --- |
| `words` | 4,763 | every Quranic lemma; 2,300 glossed |
| `word_occurrences` | 74,685 | every verse position of every word |
| `ayahs` | 6,236 | full text, reconstructed from corpus segments |
| `roots` | 1,651 | 471 with a meaning |
| `patterns` | 399 | 123 described |
| `irab_examples` | 20,787 | the naḥw drill |
| `nahw_topics` | 15 | lessons |
| `particles` | 45 | the ḥurūf module |
| `verb_forms` | 22 | abwāb |
| `root_classes` | 7 | ṣaḥīḥ, muḍāʿaf, ajwaf … |

**Gloss coverage: 2,300 of 4,763 lemmas, which is 96.0% of running Quranic
text.** The remaining 2,463 are the long tail — 505 appear twice or more, 1,958
appear exactly once. Each further batch of 500 buys less: the 1300 batch added
2.6 points of coverage, the 1800 batch 1.7.

Glosses live in `src/database/seeds/glossary-{300,550,800,1050,1300,1800}.ts`,
aggregated by `glossary.ts`. Root meanings are in `root-glossary-2.ts`.

### Adding the next 500 glosses

Do **not** type the Arabic by hand. Dump the heaviest unglossed lemmas straight
from the database and pair them positionally with hand-written glosses, because
hand-typed Arabic reintroduces the shadda-ordering mismatch described below.

```sql
select w.arabic, w.pos, r.radicals, r.meaning_uz, w.frequency
from words w left join roots r on r.id = w.root_id
where w.source = 'QURAN' and (w.uz is null or w.uz = '')
order by w.frequency desc, w.arabic limit 500;
```

Then run `pnpm exec ts-node src/database/seeds/check-glossary.ts`, which reports
duplicates and keys that match nothing. It must show zero of both.

---

## 3. Modules

Each grammar module has data, an API and screens, and each was built to answer
a question the learner actually has.

**Study (`src/study`)** — FSRS via `ts-fsrs`, chosen over SM-2 for roughly a
quarter fewer reviews at the same retention. Recognition is scheduled first;
the produce direction unlocks once a recognise card reaches review with
stability of at least ten days. Words with no gloss are held out of the queue,
since there would be nothing to show as the answer.

**Ṣarf (`src/sarf`)** — the 22 abwāb and 7 weak-root classes. Roots are
classified mechanically. The six bare-triliteral bābs are recovered by reading
the middle-radical vowel off perfect and imperfect forms, because the corpus
tags them all as `VF:1`; that lands 184 of 669 Form I verbs, and weak roots are
left unassigned rather than guessed.

**Ḥurūf (`src/huruf`)** — 45 function words, each with its meaning and its
ʿamal, the case or mood it forces. They cover 60,499 of 130,030 segments, 46.5%
of the Quran, from 45 items — the best ratio in the project.

**Naḥw (`src/nahw`)** — 15 lessons plus an iʿrāb drill built from real verses.

**Patterns (`src/patterns`)** — templates grouped by what the shape *does*
rather than how often it appears, with a drill whose distractors come from
other families, so the learner chooses between meanings rather than spellings.

### Numbers that shaped the curriculum

Measured with `pnpm analyze:morphology`, and worth keeping honest about:

- **32.7% of Quran tokens are rootless particles** — only 134 lemmas, and ṣarf
  never touches them.
- Verbs are 25.9% of tokens, nouns 52.4%.
- **Roots cap out at 67.3% coverage.** So "learn the 22 abwāb and everything
  opens up" is overstated; the honest framing is meaning = root + pattern +
  drift.
- **Templates touch only 45.8% of tokens.** Of the part they do touch, 10
  templates cover 63%, 30 cover 82%, 50 cover 89%.
- Form I alone accounts for 131 distinct shapes because its masdar is
  unpredictable. Every other bāb is tidy.

---

## 4. Traps

Each of these was found the hard way. All of them failed silently.

### Shadda ordering

The corpus writes shadda **before** the vowel (U+0651 then U+064E); typing
produces the reverse. `canonicalArabic()` applies NFC to both sides of every
comparison. Without it about a tenth of glossary keys quietly match nothing.

### CRLF destroys the corpus

`core.autocrlf` rewrites `quran-morphology.txt` on checkout, and its last
column ends the line, so every lemma and tag comes back with a carriage return
attached. The seed then reads 4,777 lemmas instead of 4,763, matches none of
the common particles, and produces 155 iʿrāb drills instead of 20,787 — with no
error anywhere.

`.gitattributes` marks `src/database/seeds/data/*` as `-text`, and the parser
splits on `/\r?\n/`. **After any fresh checkout, confirm the seed logs 4,763
lemmas and 60,499 particle tokens before trusting the run.**

### The seed can double the table

`seedWords` must keep its `repo.delete({ source: WordSource.QURAN })`. Dropping
that line silently doubles `words` to 9,526 and the only symptom is the count.
Check `words = 4763` after every reseed.

### Verified glosses survive a reseed, drafts do not

`seedWords` reads VERIFIED rows back before it clears the catalogue and
re-applies them afterwards. Without that, one reseed would undo every review
and the admin review queue would be pointless. Drafts come from the glossary
files, so edit those rather than the database.

### Bulk inserts

`word_occurrences` and `irab_examples` go through `unnest` with array
parameters. The ORM path took 283 seconds for 75k rows because of the
bind-parameter count.

### There are no migrations

Production runs with `synchronize: false` and no migration files exist. The
schema is created by pointing a **development-mode** run at the target database
once; the seed itself never creates tables. This is how Neon was set up and how
any new environment has to be.

---

## 5. Grammar judgement in the iʿrāb harvester

`src/database/seeds/harvest-irab.ts` decides why each word carries its ending.
Four heuristics had to be tightened because the naive reading taught things
that are simply wrong. If the drill ever looks wrong again, start here.

- **Iḍāfa needs a bare first noun.** Two definite nouns in a row is a naʿt, not
  a possession chain — otherwise `ٱلرَّحْمَٰنِ` after `ٱللَّهِ` is taught as iḍāfa.
- **A maʿṭūf is not a naʿt.** A word carrying وَ or فَ whose neighbour shares its
  case is coordinated, not descriptive: the earth does not describe the sky.
  Where the word two back is also in that case the anchor is ambiguous — 2:22
  joins the sky to the earth, not to the bed between them — so no anchor is
  claimed.
- **A mubtadaʾ is normally definite.** Without that check, verse-initial
  particles the corpus happens to tag as nouns (`رُّبَ` in 15:2) get taught as
  topics. This cut TOPIC from 347 to 109, all genuine.
- **Vocatives and ẓarfs are dropped, not guessed.** `يَٰٓأَيُّهَا` after a verb of
  speech and `مَعَهُمْ` after any verb are accusative for their own reasons; the
  object rule mislabelled 605 of them. Detected via the VOC, ATT, LOC and T
  flags.

كانَ is checked before the generic verb branches, since its ism is not a fāʿil
and its khabar is not a mafʿūl.

### Template spellings

616 templates was an artefact. The corpus spells one template several ways —
sukūn is often left off, a trailing short vowel is a mood or case marker — so
يُفْعِلُ, يُفعِل and يُفْعِلْ were three rows. `waznKey` and `canonicalWazns` in
`parse-corpus.ts` collapse them onto the best-attested spelling. The key carries
a verb/noun discriminator, because that trailing vowel is the only thing
separating أَفْعَلَ "he informed" from أَفْعَل "greater"; without it the seed aborts
on a duplicate-key check.

---

## 6. Frontend notes

- **One origin.** Over HTTPS the client asks for a relative `/api` path, and
  Vercel rewrites it to Fly. That keeps the auth cookies first-party and CORS
  out of the picture entirely. Plain-HTTP development still reaches the API on
  port 8080.
- **Never set `VITE_BASE_URL` in the Vercel dashboard.** Project environment
  variables override `.env.production`. A stale one pointing at a dead Render
  backend made every request hang forever, and the app sat on "Ma'lumotlar
  yuklanmoqda" with no error, because `isLoading` only clears when the `me`
  thunk settles. **When the app hangs on that loader, check what host the
  profile request actually goes to before anything else.**
- **PWA only exists in a build.** `devOptions.enabled` is false, so `pnpm dev`
  serves no service worker and nothing is installable. Test with
  `pnpm build && pnpm preview`.
- **Installing requires HTTPS.** A LAN address will never offer it. For phone
  testing use a tunnel (`cloudflared tunnel --url http://localhost:7070`);
  tunnel domains are already in `allowedHosts`, and the proxy has an error
  listener because a client hanging up mid-request would otherwise crash the
  preview server.
- **A maskable icon is cropped to the middle 80%.** It needs its own padded
  artwork; reusing the full-bleed icon makes Android zoom into it.
- An installed PWA keeps its name and icon from install time and caches the old
  bundle. After a deploy that changes either, uninstall and reinstall.

---

## 7. Things that were deliberately not done

- **The Arabic keyboard is untouched by request.** `src/shared/lib/arabic-mapper.ts`
  and `arabic-keyboard-modal.tsx` are exactly as the user wrote them. An earlier
  pass added NFC normalisation to `parseArabicText`, which reorders shadda
  against its vowel and visibly changed what typing produced; the user asked for
  it back. The combination table was never edited.

  Real bugs remain and the user knows: backspace deletes two characters and
  flashes a false "Latin only" error, a real Arabic keyboard or a paste loses
  its last letter, `allah` yields `َلَّح`, and the s+h digraph makes it impossible
  to type س followed by ه. **Do not touch these files without being asked.**

---

## 8. What is left

Roughly in order of value:

1. **Review the 2,300 draft glosses.** Nothing is VERIFIED yet. The queue is at
   `/superadmin/dictionary/review` and walks drafts one at a time.
2. **The remaining 2,463 glosses**, 500 at a time, worth about two more points
   of coverage in total.
3. **ROOT and LISTEN study directions.** Both exist in the enum; nothing
   schedules them. LISTEN also needs audio, and `words.audio_file_id` is a
   column nobody writes to.
4. **Admin assignment.** A student can enrol themselves in a deck, but an admin
   cannot yet hand a deck or a word to a particular student, which the agreed
   scope calls for.
5. **Describe more templates.** 123 of 399; the rest are mostly rare shapes.

---

## 9. Commands

```
pnpm seed                     rebuild the database from the corpus
pnpm run create-admin <u> <p> create an admin (registration only makes students)
pnpm run make-admin <u>       promote an existing account
pnpm analyze:morphology       the corpus statistics quoted above
pnpm exec ts-node src/database/seeds/check-glossary.ts
```

Frontend: `pnpm dev` (port 7070), `pnpm build`, `pnpm preview`.

Both repositories: `pnpm run typecheck` and `pnpm run lint` must stay clean.
