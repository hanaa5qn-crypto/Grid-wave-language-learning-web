import type { Express } from 'express';
import { registerEvaluateSpeakingRoute } from './evaluate-speaking';
import { registerEvaluateWritingRoute } from './evaluate-writing';
import { registerEvaluateCompositionRoute } from './evaluate-composition';
import { registerTranslateRoute } from './translate';

export function registerApiRoutes(app: Express) {
  registerEvaluateWritingRoute(app);
  registerEvaluateCompositionRoute(app);
  registerTranslateRoute(app);
  registerEvaluateSpeakingRoute(app);
}
