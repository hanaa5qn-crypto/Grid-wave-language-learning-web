import type { Express } from 'express';
import { registerEvaluateSpeakingRoute } from './evaluate-speaking';
import { registerEvaluateWritingRoute } from './evaluate-writing';
import { registerTranslateRoute } from './translate';

export function registerApiRoutes(app: Express) {
  registerEvaluateWritingRoute(app);
  registerTranslateRoute(app);
  registerEvaluateSpeakingRoute(app);
}
