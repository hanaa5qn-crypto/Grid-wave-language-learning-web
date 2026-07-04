// =============================================================================
// Digital SAT — Practice Test 4, "Hardest Set" (generated practice set, verified).
// -----------------------------------------------------------------------------
// A single Math module of the 15 hardest-tier questions from
// sat-math-hardest-set.md, each of which escalates a [Hard]-tagged item from
// the main question bank (sat-math-questions.md) using multi-step mechanics.
// The SatQuestion difficulty union has no "Hardest" tier, so all items are
// tagged 'Hard'; the escalation origin is noted in each explanation because
// the source itself frames every item that way.
// =============================================================================
import { SatTest } from '../types';

export const SAT_TEST_4: SatTest = {
  id: 'sat-practice-4',
  title: 'SAT Math — Hardest Set',
  source: 'Generated practice set (verified) — escalates the hardest-tier items from the main question bank.',
  sections: [
    {
      module: 'Math',
      moduleNumber: 1,
      minutes: 35,
      questions: [
        {
          id: 1,
          domain: 'Algebra',
          difficulty: 'Hard',
          question: 'How many integer values of x satisfy 3x − 5 < 2x + 8 < 5x − 1?',
          choices: ['7', '8', '9', '10'],
          correctIndex: 2,
          explanation:
            'Escalates practice item A6 (compound inequality, integer count). Split into two: (i) 3x − 5 < 2x + 8 → x < 13. (ii) 2x + 8 < 5x − 1 → 9 < 3x → x > 3. Combined: 3 < x < 13. Integers: 4, 5, 6, 7, 8, 9, 10, 11, 12 → 9 values.',
        },
        {
          id: 2,
          domain: 'Algebra',
          difficulty: 'Hard',
          question:
            'The system of equations kx + 4y = 20 and 9x + 6y = 30 has infinitely many solutions. What is the value of k times the y-intercept of the line kx + 4y = 20?',
          choices: ['20', '24', '30', '36'],
          correctIndex: 2,
          explanation:
            'Escalates practice item A7 (system with no/infinite solutions, derived quantity). For infinitely many solutions the three ratios of corresponding coefficients/constants must all be equal: k/9 = 4/6 = 20/30. Since 4/6 = 20/30 = 2/3, set k/9 = 2/3 → k = 6. The y-intercept of kx + 4y = 20 is at x = 0: 4y = 20 → y = 5. k × (y-intercept) = 6 × 5 = 30.',
        },
        {
          id: 3,
          domain: 'Algebra',
          difficulty: 'Hard',
          question:
            'Company A charges a flat fee of $F plus $35 per hour. Company B charges a flat fee of $75 plus $25 per hour. For a 6-hour job, the two companies charge the same total amount. What is that total amount, in dollars?',
          choices: ['150', '210', '225', '240'],
          correctIndex: 2,
          explanation:
            'Escalates practice item A9 (linear cost equality, parameter + derived total). Set the two total charges equal for h = 6 hours: F + 35(6) = 75 + 25(6) → F + 210 = 225 → F = 15. The common total charge is F + 210 = 15 + 210 = 225 (equivalently, directly 75 + 150 = 225).',
        },
        {
          id: 4,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question:
            'The expression (x² − 4x − 12)/(x² − 36) is equivalent to (x + a)/(x + b) for x ≠ 6 and x ≠ −6, where a and b are constants. What is the value of a + b?',
          choices: ['4', '6', '8', '10'],
          correctIndex: 2,
          explanation:
            'Escalates practice item B6 (rational expression simplification, parametric form). Factor both quadratics: x² − 4x − 12 = (x − 6)(x + 2); x² − 36 = (x − 6)(x + 6). Cancel the common factor (x − 6), valid since x ≠ 6: the expression reduces to (x + 2)/(x + 6). So a = 2, b = 6, and a + b = 8.',
        },
        {
          id: 5,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question:
            'f(x) = −4(x + 1)² + 9. Let g(x) = f(3x − 2). What is the x-coordinate of the vertex of the graph of g?',
          gridInAnswer: '1/3',
          explanation:
            'Escalates practice item B7 (vertex form, composition/transformation). g(x) = f(3x − 2) reaches its extreme value exactly where the inner expression matches f’s vertex input, i.e., where 3x − 2 = −1 (since f’s vertex is at x = −1). Solving: 3x = 1 → x = 1/3.',
        },
        {
          id: 6,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question:
            'The equation x² − kx + (k + 3) = 0 has two real solutions r and s such that r + s = 2rs. What is the value of k?',
          choices: ['−6', '−3', '3', '6'],
          correctIndex: 0,
          explanation:
            'Escalates practice item B8 (discriminant condition combined with Vieta’s). By Vieta’s formulas: r + s = k, rs = k + 3. Given r + s = 2rs: k = 2(k + 3) = 2k + 6 → −k = 6 → k = −6. Discriminant with b = −k = 6, c = k + 3 = −3: 6² − 4(1)(−3) = 36 + 12 = 48 > 0, confirming real roots exist.',
        },
        {
          id: 7,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question:
            'A bacteria population doubles every 8 hours and can be modeled by P(t) = P₀(a)ᵗ, where t is measured in hours. What is the value of a, rounded to the nearest hundredth?',
          choices: ['1.03', '1.09', '1.19', '2.00'],
          correctIndex: 1,
          explanation:
            'Escalates practice item B10 (exponential growth, unknown rate). Doubling every 8 hours means a⁸ = 2, so a = 2^(1/8) ≈ 1.0905 ≈ 1.09.',
        },
        {
          id: 8,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Hard',
          question:
            'A survey of 300 people is partially summarized below.\n\n· Active · Inactive · Total\nPhone · ? · 60 · 180\nTablet · 90 · ? · 120\nTotal · 210 · 90 · 300\n\nOf the people who do NOT use a tablet, what percent have an inactive subscription?',
          choices: ['20%', '25%', '33.3%', '40%'],
          correctIndex: 2,
          explanation:
            'Escalates practice item C6 (two-way table, conditional probability of a complement). Fill in missing cells using row/column totals: Phone-Active = 180 − 60 = 120; Tablet-Inactive = 120 − 90 = 30. Check: Active total = 120 + 90 = 210 ✓; Inactive total = 60 + 30 = 90 ✓. "Not tablet" = Phone (total 180), of whom 60 are inactive: 60/180 = 1/3 ≈ 33.3%.',
        },
        {
          id: 9,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Hard',
          question:
            'A printer can print 150 pages in 4 minutes; a second printer can print 210 pages in 6 minutes. If both printers work together at their respective constant rates, how many minutes (to the nearest whole minute) will it take to print 800 pages?',
          choices: ['9', '10', '11', '12'],
          correctIndex: 2,
          explanation:
            'Escalates practice item C7 (rate/proportion, combined-rate derivation). Unit rates: printer 1 = 150/4 = 37.5 pages/min; printer 2 = 210/6 = 35 pages/min. Combined rate = 72.5 pages/min. Time for 800 pages = 800/72.5 ≈ 11.03 → 11 minutes.',
        },
        {
          id: 10,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Hard',
          question:
            'A data set has 5 values with a mean of 20 and a standard deviation of 4. A sixth value, equal to 20, is added to the set. Which of the following must be true about the new data set’s standard deviation, compared to the original?',
          choices: [
            'It increases',
            'It decreases',
            'It stays exactly the same',
            'It cannot be determined without knowing the other four values',
          ],
          correctIndex: 1,
          explanation:
            'Escalates practice item C9 (standard deviation reasoning, point added to a set). Since the original standard deviation is 4 (not 0), the five original values are not all equal to the mean. Adding a sixth value exactly equal to the mean contributes a squared deviation of 0 while increasing the count — this strictly lowers the variance, and therefore the standard deviation, regardless of the specific configuration of the other four values.',
        },
        {
          id: 11,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Hard',
          question:
            'In a right triangle, sin θ = 12/13 for an acute angle θ. If φ = 90° − θ, what is the value of sin φ + cos φ?',
          choices: ['5/13', '12/13', '17/13', '25/13'],
          correctIndex: 2,
          explanation:
            'Escalates practice item D6 (trig ratio, complementary-angle identity). sin θ = 12/13 means (5-12-13 triangle) cos θ = 5/13. Since φ = 90° − θ, sin φ = cos θ = 5/13 and cos φ = sin θ = 12/13. Sum: 5/13 + 12/13 = 17/13.',
        },
        {
          id: 12,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Hard',
          question:
            'Two similar triangles have areas 45 and 80. The perimeter of the smaller triangle is 24. What is the perimeter of the larger triangle?',
          choices: ['24', '30', '32', '36'],
          correctIndex: 2,
          explanation:
            'Escalates practice item D7 (similar figures, ratio must be derived from area first). Ratio of areas = 45/80 = 9/16. Since area ratio = (side ratio)², side ratio (small : large) = 3 : 4. Perimeter scales linearly, so large perimeter = 24 × (4/3) = 32.',
        },
        {
          id: 13,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Hard',
          question:
            'If cos θ = −7/25 and θ is in the second quadrant (90° < θ < 180°), what is tan θ?',
          choices: ['−24/7', '24/7', '−7/24', '7/24'],
          correctIndex: 0,
          explanation:
            'Escalates practice item D9 (trig identity with quadrant sign reasoning). Using sin²θ + cos²θ = 1: sin θ = √(1 − 49/625) = √(576/625) = 24/25. In quadrant II, sine is positive, so sin θ = +24/25. tan θ = sin θ / cos θ = (24/25)/(−7/25) = −24/7.',
        },
        {
          id: 14,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Hard',
          question:
            'A circle is defined by the equation x² + y² − 6x + 4y = 12. If (h, k) is the center of the circle and r is its radius, what is the value of h + k + r?',
          choices: ['4', '5', '6', '7'],
          correctIndex: 2,
          explanation:
            'Escalates the Geometry domain’s circle theme via completing the square. x² − 6x + y² + 4y = 12 → (x² − 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4 → (x − 3)² + (y + 2)² = 25. Center (h, k) = (3, −2), radius r = 5. h + k + r = 3 + (−2) + 5 = 6.',
        },
        {
          id: 15,
          domain: 'Algebra',
          difficulty: 'Hard',
          question:
            'The system of equations ax + by = 12 and 2ax + 8y = 24 has infinitely many solutions, where a and b are nonzero constants. What is the value of b?',
          choices: ['2', '4', '6', '8'],
          correctIndex: 1,
          explanation:
            'Escalates practice item A7 again (system with infinitely many solutions, answer independent of the free parameter). For infinitely many solutions, the second equation must be a scalar multiple of the first: 2ax = m(ax) forces m = 2 (since a ≠ 0). Matching the y-coefficients: 8 = m·b = 2b → b = 4. Check constants: 24 = m(12) = 24 ✓. The value of b does not depend on a — this holds for every nonzero a.',
        },
      ],
    },
  ],
};
