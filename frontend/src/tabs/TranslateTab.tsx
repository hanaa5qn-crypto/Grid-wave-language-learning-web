import React, { useState } from 'react';
import {
  Volume2, AlertCircle, Lightbulb, ArrowRight, Sparkles, Languages,
} from 'lucide-react';

interface TranslateTabProps {
  aiUsable: boolean;
  renderPlanLockCard: (title: string, description: string, requiredPlan: 'pro' | 'max') => React.ReactNode;
  aiLockDesc: (feature: string) => string;
  renderAiTeaserBanner: () => React.ReactNode;
  aiAuthHeaders: () => Promise<Record<string, string>>;
  refreshAiQuota: () => Promise<void>;
  setAiQuota: (quota: { plan: string; limit: number | null; used: number; remaining: number | null }) => void;
  speakGerman: (text: string, speedMultiplier?: number) => void;
}

export function TranslateTab({
  aiUsable,
  renderPlanLockCard,
  aiLockDesc,
  renderAiTeaserBanner,
  aiAuthHeaders,
  refreshAiQuota,
  setAiQuota,
  speakGerman,
}: TranslateTabProps) {
  // Dedicated Professional Translator states
  const [translationInput, setTranslationInput] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState<{
    translation: string;
    detectedLanguage: string;
    pronunciation: string;
    grammarExplanation: string;
    words: Array<{
      word: string;
      baseForm: string;
      partOfSpeech: string;
      translation: string;
      explanation: string;
    }>;
    examples: Array<{
      german: string;
      mongolian: string;
    }>;
  } | null>(null);
  const [translationError, setTranslationError] = useState<string | null>(null);

  const translateText = async (textToTranslate?: string) => {
    const targetText = textToTranslate !== undefined ? textToTranslate : translationInput;
    if (!targetText.trim()) return;

    setTranslationLoading(true);
    setTranslationError(null);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await aiAuthHeaders()) },
        body: JSON.stringify({ text: targetText })
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        if (errBody?.quota) setAiQuota(errBody.quota);
        throw new Error(errBody?.error || 'Орчуулгын серверээс алдаа ирлээ.');
      }

      const data = await response.json();
      setTranslationResult(data);
    } catch (err: any) {
      console.error(err);
      setTranslationError(err?.message || 'Орчуулга түр амжилтгүй боллоо. Сүлжээгээ шалгаад хэсэг хугацааны дараа дахин оролдоно уу.');
    } finally {
      setTranslationLoading(false);
      refreshAiQuota();
    }
  };

  // Tab: Орчуулагч (Professional Translation & Lingua Helper)
  // AI translator: Free/Pro spend monthly teaser uses, Max is unlimited.
  // Once the teaser runs out the upgrade card replaces the workspace.
  if (!aiUsable) {
    return (
      <div className="max-w-2xl mx-auto w-full pb-24 animate-fade-in">
        {renderPlanLockCard(
          'AI Орчуулагч',
          aiLockDesc('Дүрмийн задаргаатай ухаалаг орчуулагч'),
          'max',
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-24 animate-fade-in font-sans">
      <div className="lg:col-span-12">{renderAiTeaserBanner()}</div>

      {/* Left Side: Translation Workspace */}
      <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
        <div className="rounded-xl p-6 md:p-8 border-2 border-ink-line block-shadow relative">

          {/* Neon top accent */}
          <div className="absolute top-0 left-0 w-full h-[5px] bg-paper rounded-t-xl"></div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-paper fill-paper-2 animate-pulse" />
              <h2 className="text-2xl font-light text-paper font-serif">
                Орчуулагч
              </h2>
            </div>
            <span className="text-[11px] font-serif font-extrabold bg-ink-raise text-paper-2 px-3 py-1 rounded-full border border-ink-line uppercase tracking-widest">
              PRO
            </span>
          </div>

          <p className="text-xs text-paper-2 mb-4 leading-relaxed font-sans">
            Энгийн орчуулгын системүүд шиг шууд холбож орчуулахгүй, энэхүү ухаалаг систем нь өгүүлбэрийн зүй, үгс тус бүрийн хувирал, дуудлагыг дүрмийн тайлбартай хамт гаргаж заах сургалтын зориулалттай.
          </p>

          <div className="relative">
            <textarea
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              placeholder="Орчуулах герман эсвэл монгол өгүүлбэрээ энд бичнэ үү..."
              className="w-full min-h-[120px] bg-ink-raise border-2 border-ink-line font-bold rounded-xl p-4 text-md text-paper focus:border-ink-line outline-none transition-all placeholder:text-paper-3 resize-none shadow-inner"
            />
            {translationInput && (
              <button
                onClick={() => setTranslationInput('')}
                className="absolute right-3 top-3 text-[12px] text-paper-3 font-bold border border-ink-line bg-ink-raise hover:bg-ink-2 px-2.5 py-1 rounded-md transition-all cursor-pointer"
                title="Арилгах"
              >
                Цэвэрлэх
              </button>
            )}
          </div>

          {/* Sample Phrases cards */}
          <div className="mt-4">
            <p className="text-xs font-bold text-paper-3 font-serif mb-2 uppercase">Туршиж үзэх жишээ өгүүлбэрүүд:</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setTranslationInput('Ich trinke jeden Morgen eine große Tasse Kaffee in der Küche.');
                  translateText('Ich trinke jeden Morgen eine große Tasse Kaffee in der Küche.');
                }}
                className="text-left py-2 px-3 bg-ink-raise border border-ink-line rounded-lg hover:border-ink-line text-xs font-semibold hover:bg-ink-2 text-paper-2 transition-all flex justify-between items-center group cursor-pointer"
              >
                <span>🇩🇪 "Ich trinke jeden Morgen eine große Tasse Kaffee in der Küche."</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-paper" />
              </button>
              <button
                onClick={() => {
                  setTranslationInput('Өнөөдөр цаг агаар сайхан байгаа тул бид цэцэрлэгт хүрээлэнд зугаална.');
                  translateText('Өнөөдөр цаг агаар сайхан байгаа тул бид цэцэрлэгт хүрээлэнд зугаална.');
                }}
                className="text-left py-2 px-3 bg-ink-raise border border-ink-line rounded-lg hover:border-ink-line text-xs font-semibold hover:bg-ink-2 text-paper-2 transition-all flex justify-between items-center group cursor-pointer"
              >
                <span>🇲🇳 "Өнөөдөр цаг агаар сайхан байгаа тул бид цэцэрлэгт хүрээлэнд зугаална."</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-paper" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => translateText()}
              disabled={translationLoading || !translationInput.trim()}
              className="px-6 py-3 border-2 border-ink-line text-sm font-bold bg-ink-raise text-paper-2 rounded-xl hover:bg-ink-raise transition-all cursor-pointer block-shadow flex items-center gap-2 border-ink-line disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {translationLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-ink-line border-t-transparent rounded-full animate-spin"></div>
                  Орчуулж байна...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-current text-paper" />
                  Нэгдсэн Орчуулга Хийх
                </>
              )}
            </button>
          </div>

          {translationError && (
            <div className="mt-4 p-4 border border-ink-line bg-ink-raise rounded-xl text-paper-2 text-xs font-bold leading-relaxed flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-paper shrink-0" />
              <span>{translationError}</span>
            </div>
          )}

        </div>
      </div>

      {/* Right Side: Translation Details & Deep Linguistic breakdown */}
      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">

        {translationLoading ? (
          <div className="rounded-xl border-2 border-ink-line p-8 block-shadow h-[400px] flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-ink-line border-t-amber-500 rounded-full animate-spin"></div>
              <Sparkles className="w-6 h-6 text-paper absolute inset-0 m-auto animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-paper font-serif mb-2">Герман Хэлний Үйлчилгээ</h3>
            <p className="text-xs text-paper-2 max-w-xs leading-normal">
              Өгүүлбэрийг орчуулж, үгс бүрийн үндсэн хэлбэрийг олох болон хэл зүйн бүтцийг судалж байна.
            </p>
          </div>
        ) : translationResult ? (
          <div className="flex flex-col gap-6 animate-scale-up">

            {/* Translation Core Card */}
            <div className="rounded-xl border-2 border-ink-line p-6 block-shadow">
              <div className="flex justify-between items-center pb-3 border-b border-ink-line mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-paper-2 bg-ink-raise px-2.5 py-1 rounded-md border border-ink-line">
                  Илэрсэн хэл: {translationResult.detectedLanguage === 'German' ? '🇩🇪 Герман' : '🇲🇳 Монгол'}
                </span>
                <div className="flex gap-2">
                  {translationResult.detectedLanguage === 'German' || translationResult.detectedLanguage === 'german' ? (
                    <button
                      onClick={() => speakGerman(translationInput)}
                      className="w-8 h-8 rounded-full bg-ink-raise border border-ink-line hover:bg-ink-2 flex items-center justify-center text-paper-2 cursor-pointer"
                      title="Германаар уншуулах"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => speakGerman(translationResult.translation)}
                      className="w-8 h-8 rounded-full bg-ink-raise border border-ink-line hover:bg-ink-2 flex items-center justify-center text-paper-2 cursor-pointer"
                      title="Орчуулгыг германаар уншуулах"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-paper-3 font-serif tracking-wide mb-1">Гүйцэтгэсэн Орчуулга:</p>
                <p className="text-lg font-black text-paper leading-snug">
                  {translationResult.translation}
                </p>
              </div>

              {translationResult.pronunciation && (
                <div className="mb-1 p-3 bg-ink-raise border border-ink-line rounded-lg">
                  <p className="text-[10px] uppercase font-bold text-paper-3 font-serif tracking-wide mb-0.5">Унших удирдамж:</p>
                  <code className="text-xs font-mono font-bold text-paper-2 bg-ink-raise px-1.5 py-0.5 rounded border border-ink-line">
                    {translationResult.pronunciation}
                  </code>
                </div>
              )}
            </div>

            {/* Linguistic Grammar Explanation Card */}
            <div className="rounded-xl border-2 border-ink-line p-6 block-shadow">
              <h3 className="text-sm font-medium text-paper-2 font-serif mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-paper fill-paper-2 animate-pulse" />
                БҮТЭЦ & ДҮРМИЙН ТАЙЛБАР:
              </h3>
              <p className="text-xs leading-relaxed text-paper-2 font-sans">
                {translationResult.grammarExplanation}
              </p>
            </div>

            {/* Vocabulary Parsing List */}
            <div className="rounded-xl border-2 border-ink-line p-6 block-shadow">
              <h3 className="text-sm font-medium text-paper-2 font-serif mb-4 pb-2 border-b border-ink-line uppercase tracking-wider">
                Үгсийн бүтэц (Дэлгэрэнгүй):
              </h3>
              <div className="flex flex-col gap-3">
                {translationResult.words && translationResult.words.map((w, index) => (
                  <div key={index} className="flex flex-col gap-1 p-2.5 bg-ink-raise border border-ink-line rounded-lg text-xs hover:border-ink-line transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-paper">{w.word}</span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-ink-raise text-paper-2">
                        {w.partOfSpeech}
                      </span>
                    </div>
                    <div className="text-[11px] text-paper-2 flex justify-between mt-1">
                      <span>Толь бичгийн хэлбэр: <strong className="text-paper-2">{w.baseForm}</strong></span>
                      <span>= <strong className="text-paper">{w.translation}</strong></span>
                    </div>
                    <p className="text-[10.5px] text-paper-3 leading-normal mt-1 border-t border-dashed border-ink-line pt-1">
                      {w.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Context Examples */}
            {translationResult.examples && translationResult.examples.length > 0 && (
              <div className="rounded-xl border-2 border-ink-line p-6 block-shadow">
                <h3 className="text-sm font-medium text-paper font-serif mb-3 uppercase tracking-wider">
                  Холбогдох Жишээнүүд:
                </h3>
                <div className="space-y-3">
                  {translationResult.examples.map((ex, idx) => (
                    <div key={idx} className="p-3 bg-ink-raise rounded-xl border border-ink-line">
                      <p className="text-xs font-bold text-paper-2">🇩🇪 {ex.german}</p>
                      <p className="text-xs text-paper-2 mt-1">🇲🇳 {ex.mongolian}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="rounded-xl border-2 border-ink-line p-8 block-shadow h-[320px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="w-16 h-16 rounded-full bg-ink-raise border border-ink-line flex items-center justify-center text-paper-2 mb-4 transition-all group-hover:scale-110">
              <Languages className="w-8 h-8 text-paper" />
            </div>
            <h3 className="text-lg font-bold text-paper font-serif mb-2">Үгийн Шинжилгээ Ба Орчуулга</h3>
            <p className="text-xs text-paper-2 max-w-xs leading-normal font-sans">
              Зүүн талбар дахь өгүүлбэрийг орчуулсны дараа энд дэлгэрэнгүй толь бичиг, дуудлагын зөвлөмжүүд болон дүрэм харагдах болно.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
