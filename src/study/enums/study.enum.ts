/** Memory is direction-specific: recognising a word does not mean you can produce it. */
export enum StudyDirection {
  /** Arabic shown, recall the meaning. */
  RECOGNIZE = 'RECOGNIZE',
  /** Meaning shown, produce the Arabic. */
  PRODUCE = 'PRODUCE',
  /** Word shown, identify its root. */
  ROOT = 'ROOT',
  /** Audio played, recall the meaning. */
  LISTEN = 'LISTEN'
}

/** Mirrors the ts-fsrs `State` enum; stored as a string for readability in the database. */
export enum CardState {
  NEW = 'NEW',
  LEARNING = 'LEARNING',
  REVIEW = 'REVIEW',
  RELEARNING = 'RELEARNING'
}

/** Mirrors the ts-fsrs `Rating` enum. */
export enum ReviewGrade {
  AGAIN = 1,
  HARD = 2,
  GOOD = 3,
  EASY = 4
}
