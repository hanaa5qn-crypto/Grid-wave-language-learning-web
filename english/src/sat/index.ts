// Barrel for the SAT module. The SAT sub-agent fills satTests.ts with real
// Digital SAT practice tests and SatTestRunner.tsx with the player UI, keeping
// these exact export names so EnglishApp stays decoupled.
export { SAT_TESTS, satScaledScore } from './satTests';
export { default as SatTestRunner } from './SatTestRunner';
