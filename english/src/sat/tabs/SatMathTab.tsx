// =============================================================================
// SAT — Math practice tab.
// -----------------------------------------------------------------------------
// Pulls every Math question out of SAT_TESTS (sections where module === 'Math')
// and folds in a few original drills, then groups them by the four Math domains
// with a domain filter. The shared SatPracticeCard handles BOTH multiple-choice
// items (choices + correctIndex) and grid-in items (no choices → text input
// compared case/space-insensitively to gridInAnswer), with worked explanations.
// =============================================================================
import React, { useMemo, useState } from 'react';
import { Sigma } from 'lucide-react';
import { SAT_TESTS } from '../satTests';
import { SatQuestion, SatDomain } from '../../types';
import { SatPracticeCard, DomainFilter, FreePracticeLock, gateFreePractice } from './satQuizKit';

// The four Math domains, in their official testing order.
const MATH_DOMAINS: SatDomain[] = [
  'Algebra',
  'Advanced Math',
  'Problem-Solving and Data Analysis',
  'Geometry and Trigonometry',
];

// A few original Math drills to supplement the test bank, including a grid-in.
const MATH_DRILLS: SatQuestion[] = [
  {
    id: 91001,
    domain: 'Algebra',
    question: 'If 3x − 7 = 2x + 5, what is the value of x?',
    choices: ['−2', '5', '12', '−12'],
    correctIndex: 2,
    explanation:
      'Subtract 2x from both sides: x − 7 = 5. Add 7 to both sides: x = 12.',
  },
  {
    id: 91002,
    domain: 'Algebra',
    question:
      'A line passes through the points (0, 4) and (2, 10). What is the slope of the line?',
    choices: ['2', '3', '6', '7'],
    correctIndex: 1,
    explanation:
      'Slope = (y2 − y1) / (x2 − x1) = (10 − 4) / (2 − 0) = 6 / 2 = 3.',
  },
  {
    id: 91003,
    domain: 'Advanced Math',
    question:
      'If f(x) = x² − 5x + 6, what is one value of x for which f(x) = 0? (Grid-in)',
    gridInAnswer: '2',
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3). The zeros are x = 2 and x = 3. Either 2 or 3 is a valid grid-in answer; this drill checks 2.',
  },
  {
    id: 91004,
    domain: 'Problem-Solving and Data Analysis',
    question:
      'A jacket originally priced at $80 is on sale for 25 percent off. What is the sale price, in dollars? (Grid-in)',
    gridInAnswer: '60',
    explanation:
      '25 percent of 80 is 0.25 × 80 = 20. The sale price is 80 − 20 = 60 dollars.',
  },
  {
    id: 91005,
    domain: 'Geometry and Trigonometry',
    question:
      'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
    choices: ['10', '12', '14', '48'],
    correctIndex: 0,
    explanation:
      'By the Pythagorean theorem, hypotenuse = √(6² + 8²) = √(36 + 64) = √100 = 10.',
  },
  // --- Practice Test 1 — Math module (imported) ---------------------------
  {
    id: 91006,
    domain: 'Algebra',
    question:
      'A fitness center charges a $50 one-time initiation fee plus $30 per month for a membership. If Alex has spent a total of $260 on his membership, how many months has he been a member?',
    choices: ['5', '6', '7', '8'],
    correctIndex: 2,
    explanation:
      'Subtract the $50 fee from $260 to get $210, then divide by $30 per month: 210 / 30 = 7 months.',
  },
  {
    id: 91007,
    domain: 'Algebra',
    question:
      'If 2x + y = 10 and x − y = 2, what is the value of x? (Grid-in)',
    gridInAnswer: '4',
    explanation:
      'Add the two equations: (2x + x) + (y − y) = 10 + 2, giving 3x = 12, so x = 4.',
  },
  {
    id: 91008,
    domain: 'Advanced Math',
    question: 'Which of the following expressions is equivalent to x² − 10x + 24?',
    choices: ['(x − 4)(x + 6)', '(x − 6)(x − 4)', '(x + 6)(x + 4)', '(x − 12)(x + 2)'],
    correctIndex: 1,
    explanation:
      'The numbers −6 and −4 multiply to +24 and add to −10, so x² − 10x + 24 = (x − 6)(x − 4).',
  },
  {
    id: 91009,
    domain: 'Advanced Math',
    question:
      'A population of 200 rabbits doubles every 4 years. According to this exponential growth model, how many rabbits will there be after 12 years? (Grid-in)',
    gridInAnswer: '1600',
    explanation:
      'The population doubles 3 times in 12 years (12 / 4 = 3): 200 × 2³ = 200 × 8 = 1600.',
  },
  {
    id: 91010,
    domain: 'Advanced Math',
    question:
      'What is the y-intercept of the graph of the equation y = 3x² − 5x + 7 in the xy-plane?',
    choices: ['(0, 7)', '(7, 0)', '(0, −5)', '(−5, 7)'],
    correctIndex: 0,
    explanation:
      'The y-intercept occurs where x = 0; substituting gives y = 7, so the point is (0, 7).',
  },
  {
    id: 91011,
    domain: 'Problem-Solving and Data Analysis',
    question:
      'A winter jacket is on sale for 25% off its original price. If the sale price is $60, what was the original price of the jacket?',
    choices: ['$75', '$80', '$85', '$100'],
    correctIndex: 1,
    explanation:
      'The sale price is 75% of the original (0.75x = 60); dividing 60 by 0.75 gives $80.',
  },
  {
    id: 91012,
    domain: 'Problem-Solving and Data Analysis',
    question:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. If one marble is drawn at random, what is the probability that it is blue? (Grid-in, as a decimal)',
    gridInAnswer: '0.3',
    explanation:
      'There are 3 blue marbles out of 10 total: 3 / 10 = 0.3.',
  },
  {
    id: 91013,
    domain: 'Geometry and Trigonometry',
    question:
      'In right triangle ABC, the right angle is at vertex B. If sin(A) = 3/5, what is the value of cos(C)?',
    choices: ['3/5', '4/5', '3/4', '5/3'],
    correctIndex: 0,
    explanation:
      'Angles A and C are complementary (A + C = 90°), and the sine of an angle equals the cosine of its complement, so cos(C) = sin(A) = 3/5.',
  },
  {
    id: 91014,
    domain: 'Geometry and Trigonometry',
    question:
      'A right circular cylinder has a radius of 4 inches and a height of 5 inches. The volume can be expressed as kπ cubic inches. What is the value of k? (Grid-in)',
    gridInAnswer: '80',
    explanation:
      'Volume = πr²h = π × 4² × 5 = π × 16 × 5 = 80π, so k = 80.',
  },
  {
    id: 91015,
    domain: 'Geometry and Trigonometry',
    question:
      'Lines l and m are parallel and are intersected by a transversal t. If one of the acute angles formed measures 40°, what is the measure of one of the obtuse angles formed?',
    choices: ['40°', '50°', '140°', '180°'],
    correctIndex: 2,
    explanation:
      'An acute and an obtuse angle formed here are supplementary, so 180° − 40° = 140°.',
  },
];

export default function SatMathTab({ allContent, onUpgrade }: { allContent: boolean; onUpgrade: () => void }) {
  const [domain, setDomain] = useState<SatDomain | 'all'>('all');

  // Collect all Math questions from the test bank plus the original drills.
  const all = useMemo<SatQuestion[]>(() => {
    const fromTests = SAT_TESTS.flatMap((t) =>
      t.sections
        .filter((s) => s.module === 'Math')
        .flatMap((s) => s.questions),
    );
    return [...fromTests, ...MATH_DRILLS];
  }, []);

  const visible = useMemo(
    () => (domain === 'all' ? all : all.filter((q) => q.domain === domain)),
    [all, domain],
  );

  // Group the visible questions by domain for sectioned display.
  const groups = useMemo(() => {
    return MATH_DOMAINS.map((d) => ({
      domain: d,
      questions: visible.filter((q) => q.domain === d),
    })).filter((g) => g.questions.length > 0);
  }, [visible]);

  // Free = one taste domain; the rest is Pro. Gated against the full set so the
  // domain filter can't unlock a paid domain (see gateFreePractice).
  const { freeDomain, hiddenCount } = gateFreePractice(all, MATH_DOMAINS, allContent);
  const shownGroups = allContent ? groups : groups.filter((g) => g.domain === freeDomain);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2">
          <Sigma className="w-6 h-6 text-paper" /> Math
        </h2>
        <p className="text-paper-2 mt-1">
          Дөрвөн домэйнаар ангилсан {all.length} дасгал — сонголттой болон нөхөх
          (grid-in) бодлогууд, бодолтын тайлбартай.
        </p>
      </div>

      <DomainFilter domains={MATH_DOMAINS} active={domain} onChange={setDomain} />

      {groups.length === 0 ? (
        <p className="text-paper-2">Энэ домэйнд бодлого алга байна.</p>
      ) : (
        <div className="space-y-8">
          {shownGroups.map((g) => (
            <section key={g.domain} className="space-y-4">
              <h3 className="text-lg font-bold text-paper flex items-center gap-2">
                <span className="h-5 w-1.5 rounded-full bg-paper" />
                {g.domain}
                <span className="text-sm font-normal text-paper-2">
                  · {g.questions.length}
                </span>
              </h3>
              <div className="space-y-4">
                {g.questions.map((q, i) => (
                  <SatPracticeCard key={q.id} q={q} index={i} />
                ))}
              </div>
            </section>
          ))}
          {hiddenCount > 0 && <FreePracticeLock hiddenCount={hiddenCount} onUpgrade={onUpgrade} />}
        </div>
      )}
    </div>
  );
}
