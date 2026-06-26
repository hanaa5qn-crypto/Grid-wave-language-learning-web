// =============================================================================
// SAT — Reading & Writing practice tab.
// -----------------------------------------------------------------------------
// Pulls every Reading & Writing question out of SAT_TESTS (sections where
// module === 'Reading and Writing') and folds in a few original drills, then
// groups them by the four RW domains with a domain filter. Each item renders a
// passage + 4-choice MCQ that grades in place with a worked explanation, via the
// shared SatPracticeCard.
// =============================================================================
import React, { useMemo, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { SAT_TESTS } from '../satTests';
import { SatQuestion, SatDomain } from '../../types';
import { SatPracticeCard, DomainFilter, FreePracticeLock, gateFreePractice } from './satQuizKit';

// The four Reading & Writing domains, in their official testing order.
const RW_DOMAINS: SatDomain[] = [
  'Information and Ideas',
  'Craft and Structure',
  'Expression of Ideas',
  'Standard English Conventions',
];

// A few original RW drills to supplement the test bank (ids kept high to avoid
// colliding with the test questions when both are listed).
const RW_DRILLS: SatQuestion[] = [
  {
    id: 90001,
    domain: 'Craft and Structure',
    passage:
      'Although the new policy was ostensibly designed to benefit small farmers, its provisions overwhelmingly favored large agricultural corporations, leaving independent growers with little real support.',
    question:
      'As used in the text, what does the word "ostensibly" most nearly mean?',
    choices: ['Secretly', 'Apparently', 'Permanently', 'Reluctantly'],
    correctIndex: 1,
    explanation:
      '"Ostensibly" means in a way that appears or is claimed to be true but may not be. The contrast ("Although ... its provisions overwhelmingly favored large corporations") signals that the stated purpose differs from the actual effect, so "apparently" fits best.',
  },
  {
    id: 90002,
    domain: 'Information and Ideas',
    passage:
      'A study tracked two groups of city pigeons over three years. The first group nested near busy intersections; the second nested in quiet parks. Researchers found that pigeons from the busy intersections solved novel food-access puzzles 40 percent faster than the park pigeons.',
    question:
      'Which choice best states the main conclusion supported by the text?',
    choices: [
      'Pigeons prefer to nest near busy intersections.',
      'Park environments are healthier for pigeons than city streets.',
      'Exposure to a more complex environment may be associated with stronger problem-solving in pigeons.',
      'All pigeons can solve food-access puzzles equally well.',
    ],
    correctIndex: 2,
    explanation:
      'The data link the busier (more complex) environment to faster puzzle-solving. Choice C is the cautious conclusion the evidence supports. A, B, and D either go beyond the data or contradict it.',
  },
  {
    id: 90003,
    domain: 'Standard English Conventions',
    passage:
      'The committee reviewed the proposal carefully ____ it approved the budget only after several revisions.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [', and', ', but', '; however', ', so'],
    correctIndex: 0,
    explanation:
      'Two independent clauses ("The committee reviewed ..." and "it approved ...") joined by a coordinating conjunction take a comma before the conjunction. The ideas add to each other rather than contrast, so ", and" is correct. ", but" and "; however" wrongly signal contrast; ", so" implies cause that the sentence does not support.',
  },
  {
    id: 90004,
    domain: 'Expression of Ideas',
    passage:
      'A student is writing a report and wants to introduce a statistic. Note 1: A 2022 survey covered 1,200 households. Note 2: 68 percent reported recycling weekly. Note 3: The figure was up from 51 percent in 2015.',
    question:
      'The student wants to emphasize the change in recycling rates over time. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      'A 2022 survey covered 1,200 households.',
      'In a 2022 survey, 68 percent of households reported recycling weekly.',
      'Weekly recycling rose from 51 percent of households in 2015 to 68 percent in 2022.',
      'Recycling is an increasingly common household habit.',
    ],
    correctIndex: 2,
    explanation:
      'The goal is to emphasize change over time, so the answer must include both years and both percentages. Only choice C contrasts 51 percent (2015) with 68 percent (2022). The others give a single snapshot or a vague claim.',
  },
  // --- Practice Test 1 — Reading & Writing module (imported) --------------
  {
    id: 90005,
    domain: 'Craft and Structure',
    passage:
      'Many critics considered the new science fiction film to be entirely ________, noting that it lacked any original concepts or innovative storytelling techniques that the acclaimed director was previously known for.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['derivative', 'groundbreaking', 'obscure', 'intricate'],
    correctIndex: 0,
    explanation:
      '"Derivative" describes a work that imitates others and lacks originality, matching the critics’ complaint that the film had no original concepts.',
  },
  {
    id: 90006,
    domain: 'Craft and Structure',
    passage:
      'The Venus flytrap is a carnivorous plant native to subtropical wetlands on the East Coast of the United States. When an insect crawls along the leaves and contacts the tiny hairs, the trap prepares to close. If a second hair is contacted within twenty seconds, the plant’s leaves snap shut, effectively trapping the prey to be digested.',
    question: 'Which choice best describes the main purpose of the text?',
    choices: [
      'To argue that carnivorous plants are endangered in their native habitats.',
      'To explain the specific biological mechanism by which the Venus flytrap captures its prey.',
      'To compare the Venus flytrap’s hunting efficiency to that of other carnivorous plants.',
      'To describe the specific weather conditions required for the Venus flytrap to thrive.',
    ],
    correctIndex: 1,
    explanation:
      'The passage steps through how the trap detects an insect and snaps shut, so its purpose is to explain the capturing mechanism.',
  },
  {
    id: 90007,
    domain: 'Information and Ideas',
    passage:
      'In 1928, Alexander Fleming returned from a vacation to find that a petri dish of Staphylococcus bacteria had been contaminated by a mold called Penicillium notatum. He observed that the mold had prevented the normal growth of the bacteria in its immediate vicinity. This accidental observation eventually led to the development of penicillin, the world’s first widely used antibiotic, which has since saved countless lives.',
    question: 'What is the central idea of the text?',
    choices: [
      'Fleming intentionally cultivated mold in order to study its destructive effects on bacteria.',
      'Penicillin remains the only effective antibiotic used in modern medical treatments.',
      'A serendipitous event in a laboratory led to a life-saving medical breakthrough.',
      'Staphylococcus bacteria are highly resistant to mold if left unchecked in a laboratory.',
    ],
    correctIndex: 2,
    explanation:
      'The text frames the contamination as accidental ("returned from a vacation to find") and traces it to penicillin, so the central idea is that a chance event led to a breakthrough.',
  },
  {
    id: 90008,
    domain: 'Information and Ideas',
    passage:
      'Researchers surveyed 500 college students about their primary study environments. The survey showed that 45% preferred the library, 30% preferred their dorm rooms, 15% preferred coffee shops, and 10% preferred studying outdoors. A researcher hypothesizes that the library is the most popular study location because it offers a centralized, distraction-free atmosphere.',
    question: 'Which finding from the survey best supports the researcher’s claim?',
    choices: [
      'More students prefer the library than any other single study location.',
      'Coffee shops are significantly less popular than dorm rooms.',
      'Outdoor studying is the least common preference among the surveyed students.',
      'Students who study in dorm rooms generally achieve higher grades.',
    ],
    correctIndex: 0,
    explanation:
      'The claim is that the library is the most popular location; the 45% figure (the highest of the four) directly supports that.',
  },
  {
    id: 90009,
    domain: 'Information and Ideas',
    passage:
      'During the Industrial Revolution, the introduction of steam-powered machinery drastically increased manufacturing efficiency. Factories could produce textiles at a fraction of the previous cost and time. However, this shift also led to significant changes in labor dynamics, as skilled artisans and weavers found their manual techniques replaced by mechanized, assembly-line processes. Therefore, it is reasonable to conclude that the Industrial Revolution ________.',
    question: 'Which choice most logically completes the text?',
    choices: [
      'improved the standard of living and wages for all skilled artisans.',
      'had a profound impact on both production rates and traditional employment methods.',
      'caused a sudden decrease in the overall global demand for textiles.',
      'eliminated the need for human labor entirely in the manufacturing sector.',
    ],
    correctIndex: 1,
    explanation:
      'The passage describes both higher production and the displacement of artisans, so the conclusion must cover both effects — choice B.',
  },
  {
    id: 90010,
    domain: 'Standard English Conventions',
    passage:
      'The artist’s latest exhibition features a series of massive, vibrant murals depicting urban ______ many critics have praised the collection for its bold use of color and unconventional perspective.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['landscapes,', 'landscapes;', 'landscapes and', 'landscapes because'],
    correctIndex: 1,
    explanation:
      'Two independent clauses with no coordinating conjunction must be separated by a semicolon, so "landscapes;" is correct. A comma would create a splice.',
  },
  {
    id: 90011,
    domain: 'Standard English Conventions',
    passage:
      'The committee of urban planners and architects ______ responsible for approving the new downtown revitalization project, ensuring that the blueprints meet all modern sustainability standards.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['are', 'is', 'were', 'have been'],
    correctIndex: 1,
    explanation:
      '"Committee" is a singular collective noun acting as one body, so it takes the singular verb "is".',
  },
  {
    id: 90012,
    domain: 'Standard English Conventions',
    passage:
      'Before the invention of the magnetic compass, ancient mariners navigated primarily by the stars. This celestial method, however, was highly dependent on the weather, as heavy cloud cover would completely obscure ______ view of the night sky.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['its', 'his', 'their', 'one’s'],
    correctIndex: 2,
    explanation:
      'The pronoun refers to the plural antecedent "mariners", so the plural possessive "their" is correct.',
  },
  {
    id: 90013,
    domain: 'Expression of Ideas',
    passage:
      'Solar panels are an excellent source of renewable energy, significantly reducing a household’s long-term reliance on fossil fuels. __________, the initial installation cost can be quite high, which deters some homeowners from making the switch.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: ['Moreover', 'Consequently', 'However', 'Indeed'],
    correctIndex: 2,
    explanation:
      'The second sentence contrasts a benefit with a drawback, so the contrasting transition "However" is correct.',
  },
  {
    id: 90014,
    domain: 'Expression of Ideas',
    passage:
      'A student is writing an essay about the planet Jupiter and wants to emphasize its most famous atmospheric feature. Notes: Jupiter is the largest planet in our solar system; it is a gas giant composed mostly of hydrogen and helium; the Great Red Spot is a massive storm that has raged for centuries; Jupiter has 95 officially recognized moons.',
    question:
      'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      'Composed mostly of hydrogen and helium, Jupiter is by far the largest planet in the solar system.',
      'Along with its 95 officially recognized moons, Jupiter is widely known as a gas giant.',
      'Jupiter’s atmosphere is home to the Great Red Spot, a massive, centuries-old storm.',
      'The largest planet in our solar system is Jupiter, which possesses a storm and dozens of moons.',
    ],
    correctIndex: 2,
    explanation:
      'The goal is to emphasize the famous atmospheric feature; only choice C names and focuses on the Great Red Spot.',
  },
];

export default function SatReadingWritingTab({ allContent, onUpgrade }: { allContent: boolean; onUpgrade: () => void }) {
  const [domain, setDomain] = useState<SatDomain | 'all'>('all');

  // Collect all RW questions from the test bank plus the original drills.
  const all = useMemo<SatQuestion[]>(() => {
    const fromTests = SAT_TESTS.flatMap((t) =>
      t.sections
        .filter((s) => s.module === 'Reading and Writing')
        .flatMap((s) => s.questions),
    );
    return [...fromTests, ...RW_DRILLS];
  }, []);

  const visible = useMemo(
    () => (domain === 'all' ? all : all.filter((q) => q.domain === domain)),
    [all, domain],
  );

  // Group the visible questions by domain for sectioned display.
  const groups = useMemo(() => {
    return RW_DOMAINS.map((d) => ({
      domain: d,
      questions: visible.filter((q) => q.domain === d),
    })).filter((g) => g.questions.length > 0);
  }, [visible]);

  // Free = one taste domain; the rest is Pro. Gated against the full set so the
  // domain filter can't unlock a paid domain (see gateFreePractice).
  const { freeDomain, hiddenCount } = gateFreePractice(all, RW_DOMAINS, allContent);
  const shownGroups = allContent ? groups : groups.filter((g) => g.domain === freeDomain);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-paper" /> Reading & Writing
        </h2>
        <p className="text-paper-2 mt-1">
          Дөрвөн домэйнаар ангилсан {all.length} дасгал — богино эх бичвэр уншаад
          хариулж, тайлбарыг үзээрэй.
        </p>
      </div>

      <DomainFilter domains={RW_DOMAINS} active={domain} onChange={setDomain} />

      {groups.length === 0 ? (
        <p className="text-paper-2">Энэ домэйнд асуулт алга байна.</p>
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
