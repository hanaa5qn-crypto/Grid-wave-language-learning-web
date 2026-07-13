// =============================================================================
// IELTS tabs — shared AI review renderer.
// -----------------------------------------------------------------------------
// Renders the AiReview returned by reviewWriting / reviewSpeaking. All learner-
// facing text (feedbackMessage, explanation, strengths, improvements) is in
// MONGOLIAN; the `improved` answer stays in English. Used by both the Writing
// and Speaking tabs so the feedback layout is identical.
// =============================================================================
import React from 'react';
import { Award, Sparkles, ThumbsUp, Wrench, Info, Volume2, Gauge, Quote } from 'lucide-react';
import { AiReview } from '../../api';
import { useTheme } from '../../../../frontend/src/lib/theme';

export function AiReviewCard({ review }: { review: AiReview }) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  return (
    <div className={gold || aurora ? "rounded-2xl bg-surface-container p-5 space-y-5" : "rounded-2xl bg-ink-raise p-5 space-y-5"}>
      <div className="flex items-start justify-between gap-3">
        <h3 className={gold || aurora ? "text-xl font-space font-light tracking-tight text-on-surface flex items-center gap-2" : "text-xl font-serif font-light tracking-tight text-paper flex items-center gap-2"}>
          <Sparkles className={gold || aurora ? "w-5 h-5 text-on-surface" : "w-5 h-5 text-paper"} />
          {review.feedbackMessage}
        </h3>
        {review.estimate && (
          <span className={gold || aurora ? "shrink-0 inline-flex items-center gap-1.5 rounded-full bg-secondary text-white px-3 py-1.5 font-bold" : "shrink-0 inline-flex items-center gap-1.5 rounded-full bg-paper text-ink px-3 py-1.5 font-bold"}>
            <Award className="w-4 h-4" /> Band {review.estimate}
          </span>
        )}
      </div>

      {review.fallback && (
        <p className={gold || aurora ? "text-xs text-on-surface-variant inline-flex items-center gap-1.5" : "text-xs text-paper-2 inline-flex items-center gap-1.5"}>
          <Info className="w-3.5 h-3.5" /> Энэ үнэлгээг локал жишгээр гаргалаа (AI тохируулаагүй).
        </p>
      )}

      {(review.pronunciation || review.fluency) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {review.pronunciation && (
            <div className={gold || aurora ? "rounded-xl bg-surface-container-high p-4" : "rounded-xl bg-ink-2 p-4"}>
              <h4 className={gold || aurora ? "font-bold mb-2 flex items-center gap-2 text-on-surface" : "font-bold mb-2 flex items-center gap-2 text-paper"}>
                <Volume2 className={gold || aurora ? "w-4 h-4 text-on-surface" : "w-4 h-4 text-paper"} /> Дуудлага
              </h4>
              <p className={gold || aurora ? "text-sm leading-relaxed text-on-surface" : "text-sm leading-relaxed text-paper"}>{review.pronunciation}</p>
            </div>
          )}
          {review.fluency && (
            <div className={gold || aurora ? "rounded-xl bg-surface-container-high p-4" : "rounded-xl bg-ink-2 p-4"}>
              <h4 className={gold || aurora ? "font-bold mb-2 flex items-center gap-2 text-on-surface" : "font-bold mb-2 flex items-center gap-2 text-paper"}>
                <Gauge className={gold || aurora ? "w-4 h-4 text-on-surface" : "w-4 h-4 text-paper"} /> Чөлөөт яриа
              </h4>
              <p className={gold || aurora ? "text-sm leading-relaxed text-on-surface" : "text-sm leading-relaxed text-paper"}>{review.fluency}</p>
            </div>
          )}
        </div>
      )}

      {review.transcript && (
        <div>
          <h4 className={gold || aurora ? "text-sm font-bold text-on-surface-variant uppercase tracking-wide mb-2 flex items-center gap-2" : "text-sm font-bold text-paper-2 uppercase tracking-wide mb-2 flex items-center gap-2"}>
            <Quote className="w-3.5 h-3.5" /> AI-н сонссон бичвэр
          </h4>
          <p className={gold || aurora ? "rounded-xl bg-surface-container-high p-4 leading-relaxed text-on-surface italic" : "rounded-xl bg-ink-2 p-4 leading-relaxed text-paper italic"}>{review.transcript}</p>
        </div>
      )}

      {review.improved && (
        <div>
          <h4 className={gold || aurora ? "text-sm font-bold text-on-surface-variant uppercase tracking-wide mb-2" : "text-sm font-bold text-paper-2 uppercase tracking-wide mb-2"}>
            Сайжруулсан хувилбар (English)
          </h4>
          <article className={gold || aurora ? "rounded-xl bg-surface-container-high p-4 leading-relaxed whitespace-pre-line text-on-surface" : "rounded-xl bg-ink-2 p-4 leading-relaxed whitespace-pre-line text-paper"}>
            {review.improved}
          </article>
        </div>
      )}

      {review.explanation && (
        <div>
          <h4 className={gold || aurora ? "text-sm font-bold text-on-surface-variant uppercase tracking-wide mb-2" : "text-sm font-bold text-paper-2 uppercase tracking-wide mb-2"}>
            Тайлбар
          </h4>
          <p className={gold || aurora ? "leading-relaxed whitespace-pre-line text-on-surface" : "leading-relaxed whitespace-pre-line text-paper"}>{review.explanation}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {review.strengths.length > 0 && (
          <div className={gold || aurora ? "rounded-xl bg-secondary-container/40 border-2 border-secondary p-4" : "rounded-xl bg-paper text-ink p-4"}>
            <h4 className={gold || aurora ? "font-bold mb-2 flex items-center gap-2 text-secondary" : "font-bold mb-2 flex items-center gap-2"}>
              <ThumbsUp className="w-4 h-4" /> Давуу тал
            </h4>
            <ul className={gold || aurora ? "space-y-1.5 text-sm list-disc pl-5 text-on-surface" : "space-y-1.5 text-sm list-disc pl-5"}>
              {review.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {review.improvements.length > 0 && (
          <div className={gold || aurora ? "rounded-xl bg-error-container/40 border-2 border-error p-4" : "rounded-xl bg-ink-2 p-4"}>
            <h4 className={gold || aurora ? "font-bold mb-2 flex items-center gap-2 text-error" : "font-bold mb-2 flex items-center gap-2 text-paper"}>
              <Wrench className={gold || aurora ? "w-4 h-4 text-error" : "w-4 h-4 text-paper"} /> Сайжруулах зүйл
            </h4>
            <ul className={gold || aurora ? "space-y-1.5 text-sm list-disc pl-5 text-on-surface" : "space-y-1.5 text-sm list-disc pl-5 text-paper"}>
              {review.improvements.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
