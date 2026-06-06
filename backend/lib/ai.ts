import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

export function getAIClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
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
