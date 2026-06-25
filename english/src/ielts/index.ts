// Barrel for the IELTS module. The IELTS sub-agent fills ieltsTests.ts with
// real practice tests and IeltsTestRunner.tsx with the player UI, keeping these
// exact export names so EnglishApp stays decoupled.
export { IELTS_TESTS, ieltsBandScore } from './ieltsTests';
export { default as IeltsTestRunner } from './IeltsTestRunner';
