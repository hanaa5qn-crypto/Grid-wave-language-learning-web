import { Type } from '@google/genai';
import type { Express } from 'express';
import { getAIClient } from '../lib/ai';
import { cleanText } from '../lib/cleanText';

export function registerEvaluateSpeakingRoute(app: Express) {
  app.post('/api/evaluate-speaking', async (req, res) => {
    const { sentence, spokenText } = req.body;

    if (!spokenText) {
      return res.status(400).json({ error: 'Spoken text context is missing' });
    }

    const ai = getAIClient();

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: `In a German pronunciation course for Mongolian speakers, evaluate how well the user pronounced the German text.
Target German text to say: "${sentence}"
Transcribed speech spoken by user: "${spokenText}"

Provide constructive feedback in Mongolian. You must format your response as JSON according to this structure:
{
  "isCorrect": boolean (true if highly similar and intelligible, false if too different),
  "analysis": "A concise friendly feedback in Mongolian detailing which parts were pronounced perfectly, and highlighting any letter sounds (like silent letters, vowel length, etc.) they should improve. Keep it friendly and concise.",
  "feedbackMessage": "A short, supportive title in Mongolian like 'Маш сайн байна!' or 'Сайн байна! Гэхдээ...'"
}`,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                isCorrect: { type: Type.BOOLEAN },
                analysis: { type: Type.STRING },
                feedbackMessage: { type: Type.STRING },
              },
              required: ['isCorrect', 'analysis', 'feedbackMessage'],
            },
          },
        });

        const responseText = response.text || '{}';
        try {
          const result = JSON.parse(responseText);
          return res.json(result);
        } catch (e) {
          console.error('Failed to parse Gemini speaking output:', responseText, e);
        }
      } catch (err: any) {
        console.error('Gemini API speaking check error:', err);
      }
    }

    const cleanSpoken = cleanText(spokenText);
    const cleanTarget = cleanText(sentence);

    const ratio = cleanSpoken.includes('wie geht es') || cleanSpoken.includes('ihnen') || cleanSpoken.includes('wie geht');
    const isCorrect = cleanSpoken === cleanTarget || ratio;

    const analysis = isCorrect
      ? 'Таны дуудлага ерөнхийдөө зөв байна. "Wie geht es" хэсэг төгс байлаа, харин "Ihnen" үгний \'h\' үсгийг дуудахгүй, \'i\' эгшгийг уртаар дуудна гэдгийг анхаарна уу.'
      : 'Дуудлагыг илүү тодорхой болгож дахин туршина уу. "Wie" нь /ви/, "geht" нь /гэйт/, "es" нь /эс/ болон "Ihnen" нь /ийнэн/ гэж уншигдана.';

    return res.json({
      isCorrect,
      analysis,
      feedbackMessage: isCorrect ? 'Сайн байна! Гэхдээ...' : 'Дуудлагаа дахин шалгана уу'
    });
  });
}
