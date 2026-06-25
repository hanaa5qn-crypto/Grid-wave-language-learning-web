// =============================================================================
// Vivid Lingua — English track (IELTS + SAT)
// -----------------------------------------------------------------------------
// Shared type contracts for the *separated* English learning module. This file
// is the single source of truth that every sub-module (ielts/, sat/, content/)
// builds against. The German track lives in ../../frontend/src and is untouched;
// this folder is a parallel, self-contained English experience.
// =============================================================================

// ----- Navigation -----------------------------------------------------------
export type EnglishTab =
  | 'home'
  | 'read'
  | 'listen'
  | 'speak'
  | 'write'
  | 'vocab'
  | 'tests'; // IELTS + SAT hub

// CEFR-style band used to organise study content (English uses the same ladder).
export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// ----- Generic multiple-choice question -------------------------------------
export interface MCQ {
  /** Stable id, unique within its parent test/section. */
  id: number;
  /** The question stem shown to the learner. */
  question: string;
  /** Answer options (2–6). */
  choices: string[];
  /** 0-based index of the correct option. */
  correctIndex: number;
  /** Optional explanation shown after answering. */
  explanation?: string;
}

// ----- Core study library (mirrors the German library tabs) ------------------
export interface ReadingItem {
  id: number;
  level: EnglishLevel;
  topic: string;
  title: string;
  /** The passage the learner reads (English). */
  text: string;
  questions: MCQ[];
}

export interface ListeningItem {
  id: number;
  level: EnglishLevel;
  topic: string;
  title: string;
  /** Transcript that is spoken aloud via Web Speech / TTS. */
  transcript: string;
  questions: MCQ[];
}

export interface WritingItem {
  id: number;
  level: EnglishLevel;
  topic: string;
  title: string;
  prompt: string;
  /** Bullet points the answer should cover. */
  points: string[];
  /** A model answer the learner can compare against. */
  modelAnswer: string;
}

export interface SpeakingItem {
  id: number;
  level: EnglishLevel;
  topic: string;
  title: string;
  prompt: string;
  modelAnswer: string;
  /** Useful phrases / sentence frames. */
  tips: string[];
}

// Exam-prep vocabulary with a Mongolian gloss (audience is Mongolian learners).
export interface ExamVocab {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  /** English definition. */
  definition: string;
  /** Mongolian translation / gloss. */
  mongolian: string;
  /** Natural example sentence (English). */
  example: string;
  level: EnglishLevel;
  /** Topical or exam-domain grouping. */
  category: string;
}

export interface VocabWord {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  level: EnglishLevel;
  /** Loose topical grouping for the trainer. */
  category: string;
}

// ============================================================================
// IELTS — real exam structure (Academic + General Training)
// ----------------------------------------------------------------------------
// IELTS question types we model. These cover the genuine task formats used in
// the Reading, Listening and Writing papers.
// ============================================================================
export type IeltsModule = 'Academic' | 'General Training';

export type IeltsQuestionType =
  | 'multiple-choice'
  | 'true-false-notgiven'
  | 'yes-no-notgiven'
  | 'matching-headings'
  | 'matching-information'
  | 'sentence-completion'
  | 'summary-completion'
  | 'short-answer'
  | 'note-completion';

export interface IeltsQuestion {
  id: number;
  type: IeltsQuestionType;
  /** Prompt / stem. For gap-fill, use ____ to mark the blank. */
  prompt: string;
  /** Options for choice / matching question types. */
  options?: string[];
  /**
   * The accepted answer(s). For choice types this is the option text; for
   * completion/short-answer it is the word(s). Multiple acceptable spellings
   * may be supplied.
   */
  answer: string | string[];
  explanation?: string;
}

export interface IeltsReadingPassage {
  /** Passage number within the paper (1–3). */
  number: 1 | 2 | 3;
  title: string;
  /** Full passage, paragraphs separated by \n\n. Paragraphs labelled A, B, C… */
  text: string;
  questions: IeltsQuestion[];
}

export interface IeltsListeningSection {
  /** Section number within the paper (1–4). */
  number: 1 | 2 | 3 | 4;
  title: string;
  /** Spoken transcript (read aloud via TTS in the runner). */
  transcript: string;
  questions: IeltsQuestion[];
}

export interface IeltsWritingTask {
  /** Task 1 or Task 2. */
  task: 1 | 2;
  prompt: string;
  /** Minimum word count (150 for Task 1, 250 for Task 2). */
  minWords: number;
  /** Optional visual description for Academic Task 1 (chart/graph/map). */
  visual?: string;
  modelAnswer: string;
  /** Band-9 examiner notes on what makes the model answer strong. */
  examinerNotes: string[];
}

export interface IeltsSpeakingPart {
  part: 1 | 2 | 3;
  title: string;
  /** Questions / cue-card. Part 2 uses a single cue card with bullet prompts. */
  questions: string[];
  /** Sample band-8+ responses. */
  sampleAnswers: string[];
}

export interface IeltsTest {
  id: string;            // e.g. "ielts-academic-1"
  title: string;        // e.g. "IELTS Academic — Practice Test 1"
  module: IeltsModule;
  /** Provenance note (which authentic test family this mirrors). */
  source: string;
  reading: IeltsReadingPassage[];
  listening: IeltsListeningSection[];
  writing: IeltsWritingTask[];
  speaking: IeltsSpeakingPart[];
}

// IELTS raw-score → band-score conversion (Academic Reading/Listening, /40).
export interface IeltsBandRow {
  minRaw: number; // inclusive
  band: number;   // e.g. 7.5
}

// ============================================================================
// SAT — real Digital SAT structure (Reading & Writing + Math)
// ============================================================================
export type SatModuleName = 'Reading and Writing' | 'Math';

export type SatDomain =
  // Reading & Writing domains
  | 'Information and Ideas'
  | 'Craft and Structure'
  | 'Expression of Ideas'
  | 'Standard English Conventions'
  // Math domains
  | 'Algebra'
  | 'Advanced Math'
  | 'Problem-Solving and Data Analysis'
  | 'Geometry and Trigonometry';

export interface SatQuestion {
  id: number;
  domain: SatDomain;
  /** Stimulus passage / context (Reading & Writing) or problem setup (Math). */
  passage?: string;
  question: string;
  /** 4 options for MCQ. Omit for Math student-produced response (grid-in). */
  choices?: string[];
  /** Index into choices for MCQ, OR the exact string answer for grid-ins. */
  correctIndex?: number;
  /** Grid-in numeric/string answer when there are no choices. */
  gridInAnswer?: string;
  explanation: string;
}

export interface SatSection {
  module: SatModuleName;
  /** Digital SAT is adaptive: Module 1, then Module 2. */
  moduleNumber: 1 | 2;
  /** Time limit in minutes (RW: 32, Math: 35). */
  minutes: number;
  questions: SatQuestion[];
}

export interface SatTest {
  id: string;        // e.g. "sat-practice-1"
  title: string;
  source: string;    // provenance note
  sections: SatSection[];
}

// SAT raw → scaled section score (200–800 per section).
export interface SatScoreRow {
  raw: number;
  reading: number; // scaled RW section score for this raw count
  math: number;    // scaled Math section score for this raw count
}
