import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

export function getAIClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      if (process.env.GOOGLE_API_KEY) {
        delete process.env.GOOGLE_API_KEY;
      }
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } else {
      console.warn('GEMINI_API_KEY environment variable is not configured. Falling back to local rule-based evaluations.');
    }
  }
  return aiClient;
}

export async function generateContentWithRetry(
  ai: GoogleGenAI,
  options: Parameters<GoogleGenAI['models']['generateContent']>[0]
): ReturnType<GoogleGenAI['models']['generateContent']> {
  const maxRetries = 3;
  let delay = 500;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(options);
    } catch (err: any) {
      const isTransient = err.status === 503 || err.status === 500 || err.status === 429 ||
                          (err.message && (err.message.includes('503') || err.message.includes('500') || err.message.includes('temporary') || err.message.includes('resource exhausted') || err.message.includes('demand')));
      if (isTransient && attempt < maxRetries) {
        console.warn(`Gemini API returned transient error (status ${err.status || 'unknown'}). Retrying attempt ${attempt}/${maxRetries} in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw err;
      }
    }
  }
  throw new Error('Failed after max retries');
}
