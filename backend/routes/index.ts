import type { Express } from 'express';
import { registerEvaluateSpeakingRoute } from './evaluate-speaking';
import { registerEvaluateWritingRoute } from './evaluate-writing';
import { registerEvaluateCompositionRoute } from './evaluate-composition';
import { registerPaymentsRoute } from './payments';
import { registerTranslateRoute } from './translate';
import { registerAiQuotaRoute } from './ai-quota';
import { registerSocialRoute } from './social';
import { registerPromoRoute } from './promo';
import { registerTeacherRoute } from './teacher';
import { registerAccountRoute } from './account';
import { registerTrackRoute } from './track';
import { registerTtsRoute } from './tts';
import { registerEnglishReviewRoute } from './english-review';

export function registerApiRoutes(app: Express) {
  registerPaymentsRoute(app);
  registerSocialRoute(app);
  registerPromoRoute(app);
  registerTeacherRoute(app);
  registerAccountRoute(app);
  registerTrackRoute(app);
  registerTtsRoute(app);
  registerAiQuotaRoute(app);
  registerEvaluateWritingRoute(app);
  registerEvaluateCompositionRoute(app);
  registerTranslateRoute(app);
  registerEvaluateSpeakingRoute(app);
  registerEnglishReviewRoute(app);
}
