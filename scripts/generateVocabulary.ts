/*
 * Generates Mongolian translations + example sentences for the German seed words
 * using the same Gemini API the app already uses, then writes src/generatedVocabulary.ts.
 *
 * Run with:  npx tsx scripts/generateVocabulary.ts
 * Optional:  LIMIT=12 npx tsx scripts/generateVocabulary.ts   (only first 12 words, for a quick test)
 */
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import path from 'path';
import { SEED_WORDS, SeedWord } from './seedWords';
import { VocabularyWord } from '../frontend/src/types';

dotenv.config();

const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!KEY || KEY === 'MY_GEMINI_API_KEY') {
  console.error('No GEMINI_API_KEY / GOOGLE_API_KEY configured in .env — aborting.');
  process.exit(2);
}

const ai = new GoogleGenAI({
  apiKey: KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
});

// 20 words/batch keeps total requests under the Gemini free-tier daily cap (~20 req/day).
const BATCH_SIZE = 20;
const MODEL = 'gemini-3.5-flash';
const OUT_PATH = path.join(process.cwd(), 'frontend', 'src', 'generatedVocabulary.ts');

// Load already-generated entries so re-runs only fetch the missing words (resumable).
async function loadExisting(): Promise<Map<string, VocabularyWord>> {
  try {
    const mod = await import(OUT_PATH);
    const arr: VocabularyWord[] = mod.GENERATED_VOCABULARY || [];
    return new Map(arr.map((w) => [w.german.trim().toLowerCase(), w]));
  } catch {
    return new Map();
  }
}

const GENDER_LABEL: Record<string, string> = { der: 'Эрэгтэй', die: 'Эмэгтэй', das: 'Дунд' };

// Build the Mongolian category label shown in the UI from the structured grammar facts.
function categoryFor(w: SeedWord): string {
  switch (w.wordClass) {
    case 'noun':
      return `Нэр үг (${w.article ? GENDER_LABEL[w.article] : 'Нэр үг'} - ${w.level})`;
    case 'verb':
      return `Үйл үг (${w.level})`;
    case 'adjective':
      return `Тэмдэг нэр (${w.level})`;
    case 'adverb':
      return `Дайвар үг (${w.level})`;
    case 'preposition':
      return `Угтвар үг (${w.level})`;
    case 'phrase':
      return `Хэллэг (${w.level})`;
  }
}

interface GeminiEntry {
  german: string;
  mongolian: string;
  exampleGerman: string;
  exampleMongolian: string;
}

async function translateBatch(batch: SeedWord[], attempt = 1): Promise<GeminiEntry[]> {
  const list = batch
    .map((w, i) => {
      const display = w.article ? `${w.article} ${w.german}` : w.german;
      return `${i + 1}. "${w.german}" (${display}, ${w.wordClass}, ${w.level})`;
    })
    .join('\n');

  const prompt = `You are a German→Mongolian lexicographer building a vocabulary dictionary for Mongolian speakers learning German (CEFR A1–B1).

For each German entry below, return:
- "german": echo the exact German headword as given (do not add the article).
- "mongolian": the natural Mongolian meaning. Give 1–3 close synonyms separated by " / " when helpful. Use proper Cyrillic Mongolian.
- "exampleGerman": one short, natural German example sentence at roughly the entry's CEFR level that uses the word.
- "exampleMongolian": an accurate, natural Mongolian translation of that example sentence.

Entries:
${list}

Return a JSON array with one object per entry, in the same order.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              german: { type: Type.STRING },
              mongolian: { type: Type.STRING },
              exampleGerman: { type: Type.STRING },
              exampleMongolian: { type: Type.STRING },
            },
            required: ['german', 'mongolian', 'exampleGerman', 'exampleMongolian'],
          },
        },
      },
    });
    const parsed = JSON.parse(response.text || '[]') as GeminiEntry[];
    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('empty array');
    return parsed;
  } catch (err: any) {
    if (attempt < 3) {
      console.warn(`  batch failed (attempt ${attempt}): ${err?.message || err} — retrying...`);
      await new Promise((r) => setTimeout(r, 1500 * attempt));
      return translateBatch(batch, attempt + 1);
    }
    throw err;
  }
}

function norm(s: string): string {
  return s.trim().toLowerCase();
}

async function main() {
  const limit = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : SEED_WORDS.length;
  const allSeeds = SEED_WORDS.slice(0, limit);

  // Resume: keep words already generated, only fetch the ones still missing.
  const existing = await loadExisting();
  const seeds = allSeeds.filter((s) => !existing.has(s.german.trim().toLowerCase()));
  console.log(
    `Seeds: ${allSeeds.length} total, ${existing.size} already done, ${seeds.length} to generate via ${MODEL} (batch ${BATCH_SIZE}).`,
  );
  if (seeds.length === 0) {
    console.log('Nothing to do — all seed words already generated.');
    return;
  }

  const fresh = new Map<string, VocabularyWord>();
  let failed = 0;

  for (let i = 0; i < seeds.length; i += BATCH_SIZE) {
    const batch = seeds.slice(i, i + BATCH_SIZE);
    process.stdout.write(`  [${i + 1}-${Math.min(i + BATCH_SIZE, seeds.length)}/${seeds.length}] `);
    let entries: GeminiEntry[] = [];
    try {
      entries = await translateBatch(batch);
    } catch (err: any) {
      console.error(`FAILED permanently: ${err?.message || err}`);
      failed += batch.length;
      continue;
    }
    const byGerman = new Map(entries.map((e) => [norm(e.german), e]));
    let ok = 0;
    for (const seed of batch) {
      const e = byGerman.get(norm(seed.german));
      if (!e || !e.mongolian) {
        failed++;
        continue;
      }
      fresh.set(seed.german.trim().toLowerCase(), {
        german: seed.german,
        ...(seed.article ? { article: seed.article } : {}),
        mongolian: e.mongolian.trim(),
        category: categoryFor(seed),
        exampleGerman: e.exampleGerman.trim(),
        exampleMongolian: e.exampleMongolian.trim(),
        wordClass: seed.wordClass,
        level: seed.level,
      });
      ok++;
    }
    console.log(`ok (${ok}/${batch.length})`);
    // Gentle pacing to respect per-minute rate limits.
    if (i + BATCH_SIZE < seeds.length) await new Promise((r) => setTimeout(r, 1200));
  }

  // Merge previously-generated entries with the new ones, ordered by the seed list.
  const merged = new Map<string, VocabularyWord>([...existing, ...fresh]);
  const ordered = allSeeds
    .map((s) => merged.get(s.german.trim().toLowerCase()))
    .filter((w): w is VocabularyWord => Boolean(w));

  if (ordered.length === 0) {
    console.error('No entries available — not writing file.');
    process.exit(1);
  }

  const header = `// AUTO-GENERATED by scripts/generateVocabulary.ts — do not edit by hand.
// German seed words (article/class/level) authored in scripts/seedWords.ts;
// Mongolian meanings + example sentences generated via the Gemini API.
// Regenerate (resumable — only fetches missing words) with:  npx tsx scripts/generateVocabulary.ts
import { VocabularyWord } from './types';

export const GENERATED_VOCABULARY: VocabularyWord[] = ${JSON.stringify(ordered, null, 2)};
`;

  writeFileSync(OUT_PATH, header, 'utf8');
  const stillMissing = allSeeds.length - ordered.length;
  console.log(
    `\nWrote ${ordered.length}/${allSeeds.length} entries to src/generatedVocabulary.ts ` +
      `(+${fresh.size} new this run, ${failed} failed${stillMissing ? `, ${stillMissing} still missing — re-run after quota resets` : ''}).`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
