import type { Express } from 'express';
import { registerEvaluateSpeakingRoute } from './evaluate-speaking';
import { registerEvaluateWritingRoute } from './evaluate-writing';
import { registerEvaluateCompositionRoute } from './evaluate-composition';
import { registerPaymentsRoute } from './payments';
import { registerTranslateRoute } from './translate';

export function registerApiRoutes(app: Express) {
  registerPaymentsRoute(app);
  registerEvaluateWritingRoute(app);
  registerEvaluateCompositionRoute(app);
  registerTranslateRoute(app);
  registerEvaluateSpeakingRoute(app);
}
