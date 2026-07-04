// =============================================================================
// Digital SAT — Practice Test 3 (generated practice set, verified).
// -----------------------------------------------------------------------------
// Structure: 4 sections — Reading & Writing Module 1 (RW Q1–20), Reading &
// Writing Module 2 (RW Q21–40), Math Module 1 (Algebra + Advanced Math, 20 Qs),
// Math Module 2 (Problem-Solving and Data Analysis + Geometry and
// Trigonometry, 20 Qs). Ids are unique 1..80 across the whole test.
// Source: generated question bank (sat-english-questions.md, Set B — 40
// questions; sat-math-questions.md, Set B — 40 questions), each item verified
// with a worked explanation/solution.
// =============================================================================
import { SatTest } from '../types';

export const SAT_TEST_3: SatTest = {
  id: 'sat-practice-3',
  title: 'SAT Practice Test 3',
  source: 'Generated practice set (verified)',
  sections: [
    // =========================================================================
    // SECTION 1 — Reading and Writing, Module 1 (20 questions, 24 minutes)
    // Domain 1: Information and Ideas (Q1–10), Domain 2: Craft and Structure (Q11–20)
    // =========================================================================
    {
      module: 'Reading and Writing',
      moduleNumber: 1,
      minutes: 24,
      questions: [
        {
          id: 1,
          domain: 'Information and Ideas',
          difficulty: 'Easy',
          passage:
            'For decades, the deep sea was assumed to be nearly lifeless below the sunlit zone, since photosynthesis cannot occur without light. The discovery of hydrothermal vents in 1977 overturned this view: dense communities of tube worms, clams, and bacteria thrive around vents, powered not by sunlight but by chemosynthesis, in which bacteria convert vent chemicals into energy. The finding forced biologists to expand their definition of what makes a habitat capable of sustaining life.',
          question: 'Which choice best states the main idea of the text?',
          choices: [
            'Tube worms and clams are the most important organisms living near hydrothermal vents.',
            'The 1977 discovery of vent ecosystems showed that life can flourish without sunlight, broadening ideas about habitability.',
            'Hydrothermal vents were discovered by accident during an unrelated survey of the ocean floor.',
            'Chemosynthesis is a more efficient energy process than photosynthesis.',
          ],
          correctIndex: 1,
          explanation:
            'The passage’s arc is "assumed no life → vents disprove that → definition of habitability expanded"; this choice captures the full arc. The other options fixate on details (species named, discovery circumstance not even described as accidental) or make an efficiency comparison never stated.',
        },
        {
          id: 2,
          domain: 'Information and Ideas',
          difficulty: 'Medium',
          passage:
            'The Federalist Papers were written under a shared pseudonym, "Publius," even though three different authors—Hamilton, Madison, and Jay—contributed essays. Scholars have long debated why the authors chose anonymity. Some argue it was meant to present a unified political front to readers wary of factionalism; others suggest it simply protected the authors from personal attacks. Whatever the motive, the pseudonym has complicated efforts to determine which author wrote certain disputed essays, a puzzle that persists among historians today.',
          question: 'Which choice best describes the central idea of the text?',
          choices: [
            'The Federalist Papers were unpopular when first published in New York newspapers.',
            'Hamilton wrote the majority of the Federalist Papers and deserves the most credit.',
            'The shared pseudonym used by the Federalist Papers’ authors, whatever its purpose, has left a lasting question about individual authorship.',
            'Anonymity was a common practice for all political writing in the eighteenth century.',
          ],
          correctIndex: 2,
          explanation:
            'The passage centers on the puzzle left by shared anonymity, regardless of motive. The other choices introduce unsupported specifics or contradict the passage’s neutrality about who wrote what.',
        },
        {
          id: 3,
          domain: 'Information and Ideas',
          difficulty: 'Medium',
          passage:
            'Urban planners once treated street trees mainly as decoration. Recent research reframes them as infrastructure: a mature tree canopy can lower nearby surface temperatures by several degrees, reduce stormwater runoff by intercepting rainfall, and cut particulate air pollution. Cities that once budgeted tree planting as a cosmetic afterthought are increasingly folding it into capital plans for flood control and public health, alongside sewers and roads.',
          question: 'Which choice best states the main idea?',
          choices: [
            'Street trees are now understood as functional infrastructure with measurable effects on temperature, water, and air quality, not just decoration.',
            'Sewers and roads are less effective than trees at controlling stormwater.',
            'Most cities still refuse to invest in urban tree canopies despite the evidence.',
            'Mature trees are more expensive to maintain than young trees.',
          ],
          correctIndex: 0,
          explanation:
            'This choice directly restates the reframing from decoration to infrastructure with the three effects listed. The other options claim a comparison not made, or contradict/are unsupported by a text that describes cities increasingly investing.',
        },
        {
          id: 4,
          domain: 'Information and Ideas',
          difficulty: 'Medium',
          passage:
            'A researcher tracking a population of arctic foxes noticed that in years following a crash in the lemming population—the foxes’ primary prey—fox litters were smaller and pups left the den later than usual. In years of lemming abundance, litters were larger and pups dispersed earlier.',
          question:
            'Which choice most logically completes the implied conclusion: the timing and size of arctic fox reproduction appears to be ______.',
          choices: [
            'unrelated to any environmental factor',
            'closely tied to the availability of lemmings as a food source',
            'determined solely by the age of the mother fox',
            'fixed by an internal biological clock that does not vary by year',
          ],
          correctIndex: 1,
          explanation:
            'The correlation (lemming crash → smaller/later litters; lemming abundance → larger/earlier litters) directly implies a link to food availability. The other choices contradict the data or introduce factors never mentioned.',
        },
        {
          id: 5,
          domain: 'Information and Ideas',
          difficulty: 'Hard',
          passage:
            'A city’s transit authority reported that ridership on its light-rail line rose 40% the year after fares were cut in half, even though the authority had projected only a 10% rise based on typical fare-elasticity models. Ridership on bus routes serving the same neighborhoods, whose fares were unchanged, rose only 3% that year, roughly matching general population growth.',
          question:
            'Which choice best supports the inference that the fare cut, not some other factor, drove the light-rail ridership surge?',
          choices: [
            'The bus routes, which had no fare change, showed only ordinary growth, while only the light-rail line with the fare cut showed the surge.',
            'The transit authority’s projection models had been accurate in previous years.',
            'Light-rail lines are generally more popular than bus routes in most cities.',
            'The fare cut was announced several months before it took effect.',
          ],
          correctIndex: 0,
          explanation:
            'A controlled-comparison structure (only the fare-cut line spiked; the no-change bus routes tracked background growth) isolates the fare cut as the cause. The other choices don’t address the comparison needed to rule out other causes.',
        },
        {
          id: 6,
          domain: 'Information and Ideas',
          difficulty: 'Medium',
          passage:
            'In a taste test, participants rated an identical wine as noticeably better when told it cost $90 a bottle than when told the same wine cost $10. Brain scans taken during tasting showed greater activity in reward-related regions for the "expensive" label, even though the liquid entering participants’ mouths was chemically identical in both trials.',
          question:
            'Which choice most logically completes the text: the results suggest that price information can ______.',
          choices: [
            'change the actual chemical composition of a beverage',
            'alter a taster’s subjective experience of flavor, independent of the drink itself',
            'only affect people who have no wine-tasting experience',
            'be ignored entirely once tasting begins',
          ],
          correctIndex: 1,
          explanation:
            'The chemically identical liquid plus differing brain response to price label shows perception, not composition, changed. The other choices contradict "chemically identical" or aren’t supported — the effect held for tasters generally and occurred during tasting.',
        },
        {
          id: 7,
          domain: 'Information and Ideas',
          difficulty: 'Medium',
          passage:
            'A historian argues that the printing press accelerated the spread of the Protestant Reformation far more than earlier religious dissent movements had managed to spread on their own.',
          question:
            'Which finding, if true, would most directly support the historian’s claim?',
          choices: [
            'Martin Luther’s Ninety-Five Theses were printed and distributed across German-speaking lands within two months, reaching readers Luther never met.',
            'Handwritten religious pamphlets existed in Europe for centuries before the printing press.',
            'The printing press was also used to print non-religious material, such as almanacs and legal documents.',
            'Some regions of Europe resisted the Reformation regardless of printed material available to them.',
          ],
          correctIndex: 0,
          explanation:
            'This choice shows in concrete quantitative/geographic terms how the press spread one specific reform text faster/farther than personal reach — directly supporting the acceleration claim. The other choices undercut the claim or are irrelevant to religious spread.',
        },
        {
          id: 8,
          domain: 'Information and Ideas',
          difficulty: 'Hard',
          passage:
            'A public health official claims that a new handwashing campaign, not seasonal weather changes, is responsible for a drop in a city’s gastrointestinal illness rate.\n\nMonth · Illness rate (per 10,000) · Campaign active?\nJan · 42 · No\nFeb · 40 · No\nMar · 41 · Yes (started)\nApr · 22 · Yes\nMay · 21 · Yes',
          question:
            'Which statement best uses the table as evidence for the official’s claim?',
          choices: [
            'The illness rate was already declining slightly in January and February, before the campaign began.',
            'The sharpest drop in illness rate occurred in April, the first full month after the campaign began, rather than gradually across all five months.',
            'The illness rate never reached zero during the period shown.',
            'Illness rates are generally higher in winter months than in spring months.',
          ],
          correctIndex: 1,
          explanation:
            'This ties the timing of the steepest decline to the campaign’s start, addressing the "not weather" claim via timing precision. The other choices actually weaken the claim (decline predates campaign) or are irrelevant or support the weather explanation instead.',
        },
        {
          id: 9,
          domain: 'Information and Ideas',
          difficulty: 'Medium',
          passage:
            'A literary critic argues that the narrator of a novel is deliberately unreliable, misleading readers about her own motives.',
          question:
            'Which quotation from the novel would best support the critic’s claim?',
          choices: [
            '"The house stood at the end of a long gravel drive, its windows dark."',
            '"I told them I had stayed home all evening, though of course I hadn’t, and I saw no reason to trouble them with the truth."',
            '"My sister arrived at six, exactly as she always did."',
            '"The town had not changed much since I was a child."',
          ],
          correctIndex: 1,
          explanation:
            'This quotation directly shows the narrator lying to other characters and admitting she conceals truth — direct evidence of unreliability about her own actions/motives. The other choices are neutral descriptive statements with no bearing on reliability.',
        },
        {
          id: 10,
          domain: 'Information and Ideas',
          difficulty: 'Medium',
          passage:
            'A study claims that bilingual children develop certain executive-function skills, such as task-switching, earlier than monolingual peers.',
          question:
            'Which piece of evidence would most strengthen this claim?',
          choices: [
            'Bilingual and monolingual children performed equally well on a memory-recall task unrelated to task-switching.',
            'In a controlled task-switching test, bilingual children outperformed monolingual children of the same age, income level, and schooling.',
            'Bilingual children in the study came from a wide range of countries.',
            'The study included both children and adults as participants.',
          ],
          correctIndex: 1,
          explanation:
            'This is a controlled comparison (matched age/income/schooling) isolating bilingualism as the variable, showing the specific skill (task-switching) advantage claimed. The other choices show no difference on an unrelated task, or don’t address the comparison needed.',
        },
        {
          id: 11,
          domain: 'Craft and Structure',
          difficulty: 'Easy',
          passage:
            'Although the committee’s early drafts of the policy had been met with sharp criticism, the final version, refined through months of feedback, was widely praised as ______, addressing nearly every concern raised by stakeholders.',
          question:
            'Which choice completes the text with the most logical and precise word?',
          choices: ['comprehensive', 'tedious', 'arbitrary', 'fleeting'],
          correctIndex: 0,
          explanation:
            '"Addressing nearly every concern" requires a word meaning thorough; "comprehensive" fits precisely. The other options contradict the described praise and thoroughness.',
        },
        {
          id: 12,
          domain: 'Craft and Structure',
          difficulty: 'Medium',
          passage:
            'The critic conceded that the novel’s prose was elegant but argued that its plot was needlessly ______, weaving in five subplots that were never resolved and ultimately distracted from the central story.',
          question:
            'Which choice completes the text with the most logical and precise word?',
          choices: ['convoluted', 'succinct', 'predictable', 'muted'],
          correctIndex: 0,
          explanation:
            '"Five subplots... never resolved... distracted" signals a tangled, overcomplicated plot — "convoluted." The other options contradict the described complexity/messiness or don’t fit a plot description.',
        },
        {
          id: 13,
          domain: 'Craft and Structure',
          difficulty: 'Medium',
          passage:
            'Despite repeated warnings from engineers that the bridge’s aging supports needed reinforcement, the city council remained ______, postponing the repair budget for three consecutive years until a partial collapse forced immediate action.',
          question:
            'Which choice completes the text with the most logical and precise word?',
          choices: ['diligent', 'complacent', 'meticulous', 'apprehensive'],
          correctIndex: 1,
          explanation:
            'Repeated warnings ignored for years despite risk signals contented inaction — "complacent." The other options describe careful attentiveness (the opposite) or anxiety, neither of which matches the described inaction.',
        },
        {
          id: 14,
          domain: 'Craft and Structure',
          difficulty: 'Hard',
          passage:
            'The diplomat’s statement was carefully ______: it acknowledged the other nation’s grievance without explicitly assigning blame, leaving both sides room to claim the outcome as a partial victory.',
          question:
            'Which choice completes the text with the most logical and precise word?',
          choices: ['hostile', 'equivocal', 'candid', 'impulsive'],
          correctIndex: 1,
          explanation:
            '"Acknowledged... without assigning blame... room for both sides" describes deliberate ambiguity — "equivocal." The other options all describe more direct/definite stances contradicted by the sentence.',
        },
        {
          id: 15,
          domain: 'Craft and Structure',
          difficulty: 'Medium',
          passage:
            'A science writer opens an article by describing a common myth—that goldfish have a three-second memory—then spends the rest of the article citing studies showing goldfish can learn and remember tasks for months.',
          question: 'The main purpose of the opening description of the myth is to',
          choices: [
            'provide a factual claim the rest of the article will build upon.',
            'introduce a widely held misconception that the article will go on to correct with evidence.',
            'criticize earlier scientists who studied goldfish memory.',
            'explain why goldfish are difficult to study in laboratory settings.',
          ],
          correctIndex: 1,
          explanation:
            'The myth is explicitly set up to be corrected by the studies that follow. The first option is wrong because the myth is false, not a fact to build on; the other two aren’t supported.',
        },
        {
          id: 16,
          domain: 'Craft and Structure',
          difficulty: 'Medium',
          passage:
            'An essay on urban design describes a plaza redesigned to include more seating and shade. The next paragraph shifts to city-wide foot-traffic data showing usage increased 60% after the redesign.',
          question: 'What is the primary function of the second paragraph in relation to the first?',
          choices: [
            'It contradicts the claim made in the first paragraph.',
            'It provides quantitative evidence supporting the benefit of the redesign described in the first paragraph.',
            'It introduces an entirely unrelated topic.',
            'It summarizes the essay’s argument before any evidence has been presented.',
          ],
          correctIndex: 1,
          explanation:
            'Foot-traffic data quantitatively backs up the qualitative claim about the redesign’s benefit. The other options misread the relationship (no contradiction), ignore the topical link, or misplace sequencing (evidence follows, not precedes).',
        },
        {
          id: 17,
          domain: 'Craft and Structure',
          difficulty: 'Hard',
          passage:
            'A passage on octopus cognition begins with an anecdote about an octopus in a lab repeatedly unscrewing a jar lid to reach food inside, then moves into a discussion of comparative neuroscience explaining how octopus neurons are distributed through their arms rather than centralized in a single brain.',
          question: 'Which choice best describes the overall structure of the text?',
          choices: [
            'It presents two competing claims and refutes the weaker one.',
            'It opens with a concrete illustrative anecdote, then explains the underlying biological mechanism behind the behavior described.',
            'It compares octopus intelligence unfavorably to that of other cephalopods.',
            'It narrates events in strict chronological order without offering explanation.',
          ],
          correctIndex: 1,
          explanation:
            'Anecdote (jar-opening octopus) followed by mechanism (distributed neurons) is a classic illustration-then-explanation structure. The other choices don’t match — there is no refutation, no unfavorable comparison, and there is explanation, not pure narration.',
        },
        {
          id: 18,
          domain: 'Craft and Structure',
          difficulty: 'Medium',
          passage:
            'Text 1: Some economists argue that a four-day workweek increases productivity per hour worked enough to offset the lost day, citing pilot programs where output held steady or rose.\n\nText 2: Other economists caution that pilot programs are typically run by companies that already volunteer for the trial, meaning results may not generalize to firms with less flexible operations or tighter margins.',
          question:
            'How would the author of Text 2 most likely respond to the pilot-program evidence cited in Text 1?',
          choices: [
            'By agreeing entirely and calling for immediate nationwide adoption.',
            'By questioning whether the trial results can be generalized beyond the self-selected companies that participated.',
            'By arguing that productivity cannot be measured in any workplace.',
            'By claiming that Text 1’s economists fabricated their data.',
          ],
          correctIndex: 1,
          explanation:
            'Text 2’s core point is a generalizability critique of self-selected trial participants — precisely what’s being asked. The other choices misstate Text 2 as agreement, or go beyond/contradict what Text 2 actually argues.',
        },
        {
          id: 19,
          domain: 'Craft and Structure',
          difficulty: 'Medium',
          passage:
            'Text 1: A nutritionist argues that eliminating all refined sugar is essential for long-term health, pointing to its link with insulin resistance.\n\nText 2: A different nutritionist argues that moderate sugar consumption, within an otherwise balanced diet, poses little measurable risk, and that total elimination often leads to disordered eating patterns.',
          question: 'Based on the texts, the two nutritionists would most likely disagree about',
          choices: [
            'whether sugar has any link to insulin resistance at all.',
            'whether complete elimination of sugar is a necessary or a counterproductive strategy for health.',
            'whether diet has any effect on long-term health outcomes.',
            'whether insulin resistance is a serious medical condition.',
          ],
          correctIndex: 1,
          explanation:
            'Both accept some risk framing exists; their actual split is over elimination vs. moderation as strategy. The first option misstates Text 2, which doesn’t deny any link exists; the last two are unsupported extremes neither text raises.',
        },
        {
          id: 20,
          domain: 'Craft and Structure',
          difficulty: 'Hard',
          passage:
            'Text 1: A climate scientist emphasizes that individual behavioral changes, like reducing personal car use, are essential first steps that build public momentum for larger policy change.\n\nText 2: A policy analyst counters that focusing public attention on individual choices distracts from the industrial and regulatory changes needed, and that emphasizing personal behavior can delay systemic action.',
          question: 'Which choice best describes how Text 2 relates to Text 1?',
          choices: [
            'Text 2 provides additional data confirming Text 1’s claim.',
            'Text 2 challenges the value of the strategy that Text 1 endorses, proposing a different priority instead.',
            'Text 2 restates Text 1’s argument using different wording.',
            'Text 2 focuses on a historical period not addressed in Text 1.',
          ],
          correctIndex: 1,
          explanation:
            'Text 2 explicitly counters the value Text 1 places on individual action and offers systemic/regulatory focus instead. The other choices mischaracterize agreement or introduce an unmentioned historical angle.',
        },
      ],
    },

    // =========================================================================
    // SECTION 2 — Reading and Writing, Module 2 (20 questions, 24 minutes)
    // Domain 3: Expression of Ideas (Q21–30), Domain 4: Standard English Conventions (Q31–40)
    // =========================================================================
    {
      module: 'Reading and Writing',
      moduleNumber: 2,
      minutes: 24,
      questions: [
        {
          id: 21,
          domain: 'Expression of Ideas',
          difficulty: 'Medium',
          passage:
            'A student is writing about a scientist and has taken the following notes:\n• Rosalind Franklin produced X-ray diffraction images of DNA, including "Photo 51."\n• Photo 51 was critical evidence for determining DNA’s double-helix structure.\n• Watson and Crick used Franklin’s data, without her knowledge, to build their model.\n• Franklin died in 1958, four years before Watson, Crick, and Wilkins won the Nobel Prize for the DNA structure discovery.',
          question:
            'The student wants to emphasize the contrast between Franklin’s contribution and the recognition she received. Which choice most effectively uses the given information to accomplish this goal?',
          choices: [
            'Rosalind Franklin worked at King’s College London using X-ray diffraction techniques.',
            'Although Franklin’s Photo 51 provided critical evidence for the double-helix model that Watson and Crick built using her data without her knowledge, she died before the Nobel Prize was awarded for the discovery.',
            'Watson, Crick, and Wilkins won the Nobel Prize in 1962 for their work on DNA structure.',
            'X-ray diffraction is a technique used to determine the atomic structure of crystals.',
          ],
          correctIndex: 1,
          explanation:
            'This choice combines the contribution (Photo 51, critical evidence, used without her knowledge) with the lack-of-recognition contrast (died before Nobel) — matching the stated goal precisely. The other choices are isolated facts that don’t build the contrast.',
        },
        {
          id: 22,
          domain: 'Expression of Ideas',
          difficulty: 'Medium',
          passage:
            'A student has taken the following notes on two energy sources:\n• Solar panel costs have fallen roughly 80% over the past decade.\n• Solar output depends on weather and daylight hours, requiring storage or backup power.\n• Nuclear plants provide constant output regardless of weather or time of day.\n• Nuclear plants are expensive and slow to build, often taking over a decade.',
          question:
            'The student wants to contrast the reliability trade-offs of the two energy sources. Which choice best accomplishes this goal?',
          choices: [
            'While solar panels have become far cheaper, their output is weather-dependent, whereas nuclear plants provide constant output but are costly and slow to build.',
            'Solar panel costs have fallen roughly 80% over the past decade.',
            'Nuclear plants are one of several types of power plants used to generate electricity.',
            'Both solar and nuclear power contribute to a country’s overall energy grid.',
          ],
          correctIndex: 0,
          explanation:
            'This choice directly pairs each source’s reliability trade-off (cheap-but-weather-dependent vs. constant-but-costly). The other choices state single unconnected facts, not a contrast.',
        },
        {
          id: 23,
          domain: 'Expression of Ideas',
          difficulty: 'Medium',
          passage:
            'A student has taken the following notes:\n• The Erie Canal opened in 1825, connecting the Hudson River to Lake Erie.\n• Before the canal, shipping goods from the Midwest to New York City took weeks by wagon.\n• After the canal opened, the same trip took days by boat and cost a fraction of the price.\n• New York City became a major shipping hub partly because of this trade route.',
          question:
            'The student wants to explain why the Erie Canal boosted New York City’s economic importance. Which choice best accomplishes this goal?',
          choices: [
            'The Erie Canal opened in 1825 and connected the Hudson River to Lake Erie.',
            'By cutting shipping time and cost dramatically compared to wagon transport, the Erie Canal helped establish New York City as a major shipping hub.',
            'Wagon transport was the primary method of moving goods before 1825.',
            'Lake Erie is one of the five Great Lakes in North America.',
          ],
          correctIndex: 1,
          explanation:
            'This choice links cause (faster/cheaper shipping) to effect (NYC’s rise as hub), matching "explain why." The other choices are standalone facts without the causal link requested.',
        },
        {
          id: 24,
          domain: 'Expression of Ideas',
          difficulty: 'Hard',
          passage:
            'A student has taken the following notes on two studies:\n• Study A found that students who took handwritten notes recalled conceptual material better than those who typed notes.\n• Study B found no significant recall difference between handwritten and typed notes when students were given time to review afterward.\n• Study A’s students were not given review time after note-taking; Study B’s students were.',
          question:
            'The student wants to explain a possible reason the two studies reached different conclusions. Which choice best accomplishes this goal?',
          choices: [
            'Study A found that handwritten notes led to better recall of conceptual material.',
            'The difference in results may stem from the fact that Study A’s students had no review time afterward, while Study B’s did.',
            'Both studies examined the effects of note-taking methods on recall.',
            'Typing and handwriting are two different ways students can take notes.',
          ],
          correctIndex: 1,
          explanation:
            'This choice states the review-time difference as the explanatory factor for the differing results, matching the goal exactly. The other choices just restate individual/shared facts or are generic and unrelated to the explanation goal.',
        },
        {
          id: 25,
          domain: 'Expression of Ideas',
          difficulty: 'Medium',
          passage:
            'A student has taken the following notes:\n• Coral reefs cover less than 1% of the ocean floor.\n• Reefs support roughly 25% of all marine species at some point in their life cycle.\n• Rising ocean temperatures cause coral bleaching, which can kill reefs if prolonged.',
          question:
            'The student wants to highlight the disproportionate ecological importance of coral reefs. Which choice best accomplishes this goal?',
          choices: [
            'Coral bleaching occurs when rising ocean temperatures stress coral for extended periods.',
            'Despite covering less than 1% of the ocean floor, coral reefs support roughly a quarter of all marine species.',
            'Coral reefs are found in tropical and subtropical ocean waters around the world.',
            'Rising ocean temperatures are a documented effect of climate change.',
          ],
          correctIndex: 1,
          explanation:
            'This choice states the small footprint versus large species-support figure together, the core "disproportionate importance" contrast. The other choices are true but don’t address the disproportion goal.',
        },
        {
          id: 26,
          domain: 'Expression of Ideas',
          difficulty: 'Easy',
          passage:
            'The lecture hall was completely full an hour before the talk began. ______, the organizers had to turn away dozens of latecomers at the door.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['Consequently,', 'For example,', 'In contrast,', 'Similarly,'],
          correctIndex: 0,
          explanation:
            'A full hall before the talk logically causes turning latecomers away — cause/result. The other options don’t signal a result relationship (no example, contrast, or similarity is being drawn).',
        },
        {
          id: 27,
          domain: 'Expression of Ideas',
          difficulty: 'Medium',
          passage:
            'The new vaccine showed strong effectiveness against the original virus strain. ______, its effectiveness against a newly emerged variant was significantly lower in early trials.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['Likewise,', 'However,', 'Therefore,', 'In addition,'],
          correctIndex: 1,
          explanation:
            'Strong effectiveness against the original strain versus lower effectiveness against a variant is a contrast — "However." The other options wrongly signal agreement/addition or a conclusion drawn from the first clause.',
        },
        {
          id: 28,
          domain: 'Expression of Ideas',
          difficulty: 'Medium',
          passage:
            'Many coastal cities are raising sea walls to hold back rising tides. ______, some are relocating vulnerable neighborhoods entirely rather than relying on barriers alone.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['As a result,', 'Nevertheless,', 'In addition,', 'For instance,'],
          correctIndex: 2,
          explanation:
            'Relocating is an additional strategy alongside sea walls, not a contradiction or result of them — "In addition." The other options wrongly imply relocation results from sea walls, wrongly imply contradiction, or wrongly imply a specific example follows (a general second strategy follows instead).',
        },
        {
          id: 29,
          domain: 'Expression of Ideas',
          difficulty: 'Hard',
          passage:
            'The company’s quarterly earnings exceeded analyst expectations. ______, its stock price fell 8% after the report, because forward guidance for the next quarter was weaker than investors had hoped.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['Accordingly,', 'Nonetheless,', 'Similarly,', 'Specifically,'],
          correctIndex: 1,
          explanation:
            'Strong earnings but falling stock price is a contrast (unexpected outcome) — "Nonetheless." The other options wrongly imply the drop follows logically, is a specific instance, or signals similarity.',
        },
        {
          id: 30,
          domain: 'Expression of Ideas',
          difficulty: 'Medium',
          passage:
            'The museum’s new wing was designed to be energy-neutral, generating as much power as it consumes through rooftop solar panels. ______, its geothermal heating system reduces reliance on the city’s electrical grid during winter months.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['In addition,', 'Otherwise,', 'By contrast,', 'Instead,'],
          correctIndex: 0,
          explanation:
            'Geothermal heating is a second, additional feature alongside solar, not a contrast — "In addition." The other options wrongly signal alternative/contrast relationships not present.',
        },
        {
          id: 31,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            'The archaeologists uncovered pottery shards near the riverbank ______ they carefully cataloged each piece before transporting it to the lab.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['riverbank, and', 'riverbank; and', 'riverbank and,', 'riverbank, so, and'],
          correctIndex: 0,
          explanation:
            'A comma plus coordinating conjunction correctly joins two independent clauses. The other options wrongly use a semicolon before "and" (semicolons don’t pair with coordinating conjunctions), misplace the comma after "and," or insert an extra unneeded conjunction/comma combination.',
        },
        {
          id: 32,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            'Sentences to combine: "The committee reviewed the proposal for two weeks. They ultimately rejected it due to budget concerns."',
          question: 'Which choice most effectively combines the two sentences?',
          choices: [
            'The committee reviewed the proposal for two weeks, ultimately rejecting it due to budget concerns.',
            'The committee reviewed the proposal for two weeks, they ultimately rejected it due to budget concerns.',
            'The committee reviewed the proposal for two weeks ultimately rejecting it due to budget concerns.',
            'The committee reviewed the proposal for two weeks and, they ultimately rejected it due to budget concerns.',
          ],
          correctIndex: 0,
          explanation:
            'This choice correctly reduces the second clause to a participial phrase ("ultimately rejecting..."), avoiding a run-on. The other choices are a comma splice, lack needed punctuation before the participial phrase (creating a run-on), or awkwardly insert "and," then a comma before a subject.',
        },
        {
          id: 33,
          domain: 'Standard English Conventions',
          difficulty: 'Hard',
          passage:
            'Marie Curie, ______ the first person to win Nobel Prizes in two different sciences, remains one of the most celebrated scientists in history.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['who was', 'was', 'is', 'she was'],
          correctIndex: 0,
          explanation:
            '"Who was" forms a proper non-restrictive relative clause modifying "Marie Curie," leaving "remains" as the sentence’s single main verb. The other options insert a second finite verb or subject-verb pair directly after the comma with no relative pronoun or connector, creating two unconnected main verbs or a comma splice.',
        },
        {
          id: 34,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            'The recipe calls for three ingredients ______ flour, sugar, and butter.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [':', ',', ';', '—and'],
          correctIndex: 0,
          explanation:
            'A colon correctly introduces the list following an independent clause. The other options create a comma-splice-like error before a list needing stronger punctuation, misuse the semicolon (used only between independent clauses or complex list items), or redundantly add "and" with a dash.',
        },
        {
          id: 35,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            'My favorite hiking trail ______ offers stunning views of the valley below.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [
            ', a narrow path that winds along the cliffside,',
            'a narrow path that winds along the cliffside',
            '; a narrow path that winds along the cliffside;',
            ', a narrow path that winds along the cliffside',
          ],
          correctIndex: 0,
          explanation:
            'Commas correctly set off the nonrestrictive appositive "a narrow path that winds along the cliffside" on both sides. The other options omit necessary punctuation (creating a run-on), use semicolons (which don’t correctly bound a mid-sentence appositive), or omit the necessary second comma, leaving the appositive unclosed.',
        },
        {
          id: 36,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            'The collection of rare manuscripts, donated by an anonymous alumnus last spring, ______ now housed in the university’s climate-controlled archive.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['are', 'is', 'were', 'have been'],
          correctIndex: 1,
          explanation:
            'The subject is the singular "collection" (the prepositional phrase "of rare manuscripts" doesn’t change subject number), so it takes the singular verb "is." The other options are all plural or perfect-tense forms mismatched with the singular subject.',
        },
        {
          id: 37,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            'Neither the mayor nor the city council members ______ willing to comment on the leaked budget proposal.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['is', 'was', 'are', 'has been'],
          correctIndex: 2,
          explanation:
            'With "neither...nor," the verb agrees with the nearer subject, "city council members" (plural), so "are" is correct. The other options all use singular-agreeing forms mismatched with the plural nearer subject.',
        },
        {
          id: 38,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            '______, the fossil quickly became the centerpiece of the museum’s new exhibit.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [
            'Having been discovered in a remote quarry,',
            'After discovering it in a remote quarry,',
            'Discovering it in a remote quarry,',
            'To discover it in a remote quarry,',
          ],
          correctIndex: 0,
          explanation:
            '"Having been discovered in a remote quarry" is a passive perfect participle that logically modifies "the fossil" — the fossil is the thing that was discovered. The other options use active participles that illogically imply the fossil discovered something itself, or an infinitive that wrongly implies purpose/intent belonging to the fossil.',
        },
        {
          id: 39,
          domain: 'Standard English Conventions',
          difficulty: 'Hard',
          question: 'Select the option that avoids a misplaced modifier:',
          choices: [
            'Exhausted from the overnight flight, the hotel bed looked especially inviting to the travelers.',
            'Exhausted from the overnight flight, the travelers found the hotel bed especially inviting.',
            'The hotel bed looked especially inviting, exhausted from the overnight flight.',
            'Exhausted from the overnight flight, it seemed to the travelers that the hotel bed was especially inviting.',
          ],
          correctIndex: 1,
          explanation:
            '"Exhausted from the overnight flight" correctly modifies "the travelers," the ones who were actually exhausted. The other options dangle the modifier onto "the hotel bed" or the dummy subject "it," none of which can be exhausted.',
        },
        {
          id: 40,
          domain: 'Standard English Conventions',
          difficulty: 'Medium',
          passage:
            '______, the antique clock still keeps accurate time.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [
            'Built more than a century ago,',
            'Building more than a century ago,',
            'Having built more than a century ago,',
            'To build more than a century ago,',
          ],
          correctIndex: 0,
          explanation:
            '"Built more than a century ago" (passive participle) correctly and logically modifies "the antique clock." The other options wrongly imply the clock is doing the building, that the clock built something, or use an infinitive that doesn’t logically attach to the subject in this context.',
        },
      ],
    },

    // =========================================================================
    // SECTION 3 — Math, Module 1 (20 questions, 32 minutes)
    // Domain 1: Algebra (Q41–50), Domain 2: Advanced Math (Q51–60)
    // =========================================================================
    {
      module: 'Math',
      moduleNumber: 1,
      minutes: 32,
      questions: [
        {
          id: 41,
          domain: 'Algebra',
          difficulty: 'Easy',
          question: 'Solve for x: 3x + 7 = 22',
          choices: ['3', '5', '7', '15'],
          correctIndex: 1,
          explanation: '3x + 7 = 22 → 3x = 15 → x = 5.',
        },
        {
          id: 42,
          domain: 'Algebra',
          difficulty: 'Easy',
          question: 'If 2(x − 3) = 10, what is the value of x?',
          choices: ['5', '7', '8', '11'],
          correctIndex: 2,
          explanation: '2(x − 3) = 10 → x − 3 = 5 → x = 8.',
        },
        {
          id: 43,
          domain: 'Algebra',
          difficulty: 'Medium',
          question:
            'A line passes through the points (2, 5) and (4, 11). What is the value of y when x = 10 on this line?',
          choices: ['23', '26', '29', '32'],
          correctIndex: 2,
          explanation:
            'Slope = (11 − 5)/(4 − 2) = 6/2 = 3. From (2,5), y = 5 + 3(10 − 2) = 5 + 24 = 29.',
        },
        {
          id: 44,
          domain: 'Algebra',
          difficulty: 'Medium',
          question: 'If x + y = 10 and x − y = 4, what is the value of xy?',
          choices: ['16', '21', '24', '28'],
          correctIndex: 1,
          explanation: 'Adding the equations: 2x = 14 → x = 7. Then y = 3. xy = 7(3) = 21.',
        },
        {
          id: 45,
          domain: 'Algebra',
          difficulty: 'Medium',
          question: 'Solve for x: (2x − 1)/3 = x/2 + 1',
          gridInAnswer: '8',
          explanation:
            'Multiply both sides by 6: 2(2x−1) = 3x + 6 → 4x − 2 = 3x + 6 → x = 8. Check: LHS = (16−1)/3 = 5; RHS = 8/2+1 = 5. ✓',
        },
        {
          id: 46,
          domain: 'Algebra',
          difficulty: 'Hard',
          question:
            'How many integer values of x satisfy both 3x − 5 ≤ 2(x + 4) and x > −2?',
          choices: ['13', '14', '15', '16'],
          correctIndex: 2,
          explanation:
            '3x − 5 ≤ 2x + 8 → x ≤ 13. Combined with x > −2: −2 < x ≤ 13. Integers: −1, 0, 1, …, 13 → 15 values.',
        },
        {
          id: 47,
          domain: 'Algebra',
          difficulty: 'Hard',
          question:
            'For what value of k does the system kx + 3y = 6 and 4x + 6y = 20 have no solution?',
          choices: ['1.5', '2', '3', '4'],
          correctIndex: 1,
          explanation:
            'Divide the second equation by 2: 2x + 3y = 10. For no solution, the coefficient ratios must match but the constants must not: k/2 = 3/3 = 1 ⟹ k = 2, while 6 ≠ 10, confirming parallel, non-identical lines.',
        },
        {
          id: 48,
          domain: 'Algebra',
          difficulty: 'Medium',
          question:
            'The function f is defined by f(x) = 2x − 5. If f(a) = 11, what is the value of f(a + 3)?',
          choices: ['14', '17', '19', '21'],
          correctIndex: 1,
          explanation:
            'f(a) = 2a − 5 = 11 → a = 8. f(a+3) = f(11) = 2(11) − 5 = 17. (Equivalently, f(a+3) = f(a) + 2(3) = 11 + 6 = 17.)',
        },
        {
          id: 49,
          domain: 'Algebra',
          difficulty: 'Hard',
          question:
            'One plumber charges a $60 service fee plus $45 per hour. A second plumber charges a $30 service fee plus $55 per hour. For how many hours of work do both plumbers charge the same total amount?',
          choices: ['2', '3', '4', '6'],
          correctIndex: 1,
          explanation: '60 + 45h = 30 + 55h → 30 = 10h → h = 3.',
        },
        {
          id: 50,
          domain: 'Algebra',
          difficulty: 'Easy',
          question: 'Solve for y: 5y − 3 = 3y + 9',
          choices: ['3', '4', '6', '9'],
          correctIndex: 2,
          explanation: '5y − 3 = 3y + 9 → 2y = 12 → y = 6.',
        },
        {
          id: 51,
          domain: 'Advanced Math',
          difficulty: 'Easy',
          question: 'What are all real solutions to x² − 9 = 0?',
          choices: ['3 only', '−3 only', '±3', '±9'],
          correctIndex: 2,
          explanation: 'x² = 9 → x = ±3.',
        },
        {
          id: 52,
          domain: 'Advanced Math',
          difficulty: 'Easy',
          question: 'Simplify: (x³)(x⁴)',
          choices: ['x⁷', 'x¹²', '2x⁷', 'x'],
          correctIndex: 0,
          explanation: 'x³ · x⁴ = x^(3+4) = x⁷.',
        },
        {
          id: 53,
          domain: 'Advanced Math',
          difficulty: 'Medium',
          question: 'What is the product of the solutions to x² − 5x + 6 = 0?',
          choices: ['−6', '−1', '5', '6'],
          correctIndex: 3,
          explanation:
            'Factor: (x − 2)(x − 3) = 0 → roots 2 and 3. Product = 2 × 3 = 6 (also c/a = 6/1).',
        },
        {
          id: 54,
          domain: 'Advanced Math',
          difficulty: 'Medium',
          question: 'If f(x) = x² − 3x + 2, what is the value of f(5)?',
          gridInAnswer: '12',
          explanation: 'f(5) = 5² − 3(5) + 2 = 25 − 15 + 2 = 12.',
        },
        {
          id: 55,
          domain: 'Advanced Math',
          difficulty: 'Medium',
          question: 'Solve for x: 3^(x+1) = 81',
          choices: ['2', '3', '4', '5'],
          correctIndex: 1,
          explanation: '81 = 3⁴, so x + 1 = 4 → x = 3.',
        },
        {
          id: 56,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question: 'Simplify (x² − 4)/(x − 2) for x ≠ 2.',
          choices: ['x + 2', 'x − 2', 'x² − 2', 'x + 4'],
          correctIndex: 0,
          explanation: 'x² − 4 = (x−2)(x+2), so (x²−4)/(x−2) = x + 2.',
        },
        {
          id: 57,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question: 'What is the minimum value of y for the function y = 2(x − 3)² + 5?',
          choices: ['3', '5', '−3', '2'],
          correctIndex: 1,
          explanation: 'Since 2(x−3)² ≥ 0, the minimum occurs at x = 3, giving y = 0 + 5 = 5.',
        },
        {
          id: 58,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question:
            'For what positive value of k does x² + kx + 16 = 0 have exactly one real solution?',
          choices: ['4', '8', '16', '32'],
          correctIndex: 1,
          explanation:
            'Discriminant = k² − 4(1)(16) = k² − 64 = 0 → k² = 64 → k = ±8; positive value is 8.',
        },
        {
          id: 59,
          domain: 'Advanced Math',
          difficulty: 'Medium',
          question: 'Solve for x: 2/x + 1 = 3 (x ≠ 0)',
          choices: ['0.5', '1', '1.5', '2'],
          correctIndex: 1,
          explanation: '2/x = 2 → x = 1.',
        },
        {
          id: 60,
          domain: 'Advanced Math',
          difficulty: 'Hard',
          question:
            'A population grows according to P(t) = 500(1.08)ᵗ, where t is measured in years. To the nearest whole number, what is the population after 2 years?',
          choices: ['540', '560', '583', '608'],
          correctIndex: 2,
          explanation: 'P(2) = 500(1.08)² = 500(1.1664) = 583.2 → 583.',
        },
      ],
    },

    // =========================================================================
    // SECTION 4 — Math, Module 2 (20 questions, 32 minutes)
    // Domain 3: Problem-Solving and Data Analysis (Q61–70), Domain 4: Geometry and Trigonometry (Q71–80)
    // =========================================================================
    {
      module: 'Math',
      moduleNumber: 2,
      minutes: 32,
      questions: [
        {
          id: 61,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Easy',
          question:
            'A recipe requires 3 cups of flour for 2 dozen cookies. How many cups of flour are needed for 5 dozen cookies?',
          choices: ['6', '7', '7.5', '9'],
          correctIndex: 2,
          explanation: '3 cups ÷ 2 dozen = 1.5 cups/dozen. 1.5 × 5 = 7.5 cups.',
        },
        {
          id: 62,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Easy',
          question: 'A shirt priced at $40 is discounted 25%. What is the sale price?',
          choices: ['$25', '$28', '$30', '$32'],
          correctIndex: 2,
          explanation: '40 × (1 − 0.25) = 40 × 0.75 = 30.',
        },
        {
          id: 63,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Medium',
          question:
            'The table shows the distribution of test scores for 10 students.\n\nScore · Frequency\n70 · 2\n80 · 4\n90 · 3\n100 · 1\n\nWhat is the mean score?',
          choices: ['80', '82', '83', '85'],
          correctIndex: 2,
          explanation:
            'Sum = 70(2) + 80(4) + 90(3) + 100(1) = 140 + 320 + 270 + 100 = 830. Mean = 830/10 = 83.',
        },
        {
          id: 64,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Medium',
          question:
            'A bag contains 5 red, 3 blue, and 2 green marbles. If one marble is drawn at random, what is the probability that it is NOT green?',
          choices: ['1/5', '3/5', '4/5', '9/10'],
          correctIndex: 2,
          explanation: 'Non-green marbles = 5 + 3 = 8 out of 10 total. P = 8/10 = 4/5.',
        },
        {
          id: 65,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Medium',
          question:
            'Using the frequency table from the previous item (scores 70×2, 80×4, 90×3, 100×1), what is the median score of the 10 students?',
          gridInAnswer: '80',
          explanation:
            'Ordered list (10 values): 70, 70, 80, 80, 80, 80, 90, 90, 90, 100. Median = average of 5th and 6th values = (80 + 80)/2 = 80.',
        },
        {
          id: 66,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Hard',
          question:
            'A survey of 200 people produced the table below.\n\n· Coffee · No Coffee · Total\nTea · 45 · 35 · 80\nNo Tea · 75 · 45 · 120\nTotal · 120 · 80 · 200\n\nOf the people who prefer coffee, what percent also prefer tea?',
          choices: ['22.5%', '30%', '37.5%', '45%'],
          correctIndex: 2,
          explanation: 'P(tea | coffee) = 45/120 = 0.375 = 37.5%.',
        },
        {
          id: 67,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Hard',
          question:
            'A car travels 240 miles using 8 gallons of gas. At this rate, how many gallons are needed to travel 420 miles?',
          choices: ['12', '14', '15', '16'],
          correctIndex: 1,
          explanation: 'Rate = 240/8 = 30 miles per gallon. 420/30 = 14 gallons.',
        },
        {
          id: 68,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Medium',
          question: 'A stock price rose from $50 to $65. What is the percent increase?',
          choices: ['15%', '23%', '30%', '33%'],
          correctIndex: 2,
          explanation: '(65 − 50)/50 = 15/50 = 0.30 = 30%.',
        },
        {
          id: 69,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Hard',
          question:
            'Data Set A: 48, 49, 50, 51, 52. Data Set B: 20, 35, 50, 65, 80. Both sets have a mean of 50. Which statement is true?',
          choices: [
            'Set A has a greater standard deviation than Set B',
            'Set B has a greater standard deviation than Set A',
            'Set A and Set B have equal standard deviations',
            'The standard deviations cannot be compared',
          ],
          correctIndex: 1,
          explanation:
            'Set B’s values are spread much farther from the mean of 50 than Set A’s values, so Set B has the greater standard deviation.',
        },
        {
          id: 70,
          domain: 'Problem-Solving and Data Analysis',
          difficulty: 'Easy',
          question:
            'A map has a scale of 1 inch = 25 miles. If two cities are 4.5 inches apart on the map, what is the actual distance between them?',
          choices: ['100 miles', '110 miles', '112.5 miles', '125 miles'],
          correctIndex: 2,
          explanation: '4.5 × 25 = 112.5 miles.',
        },
        {
          id: 71,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Easy',
          question: 'A rectangle has length 12 and width 7. What is its area?',
          choices: ['19', '38', '72', '84'],
          correctIndex: 3,
          explanation: 'Area = 12 × 7 = 84.',
        },
        {
          id: 72,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Easy',
          question: 'A circle has radius 6. What is its area, in terms of π?',
          choices: ['6π', '12π', '36π', '72π'],
          correctIndex: 2,
          explanation: 'Area = πr² = π(6²) = 36π.',
        },
        {
          id: 73,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Medium',
          question: 'A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?',
          choices: ['13', '14', '15', '16'],
          correctIndex: 2,
          explanation: 'Hypotenuse = √(9² + 12²) = √(81 + 144) = √225 = 15.',
        },
        {
          id: 74,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Medium',
          question:
            'A cylinder has radius 3 and height 10. If the volume of the cylinder is kπ cubic units, what is the value of k?',
          gridInAnswer: '90',
          explanation: 'V = πr²h = π(3²)(10) = 90π, so k = 90.',
        },
        {
          id: 75,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Medium',
          question: 'In triangle ABC, angle A = 50° and angle B = 65°. What is the measure of angle C?',
          choices: ['55°', '60°', '65°', '70°'],
          correctIndex: 2,
          explanation: '180° − 50° − 65° = 65°.',
        },
        {
          id: 76,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Hard',
          question:
            'In a right triangle, angle θ is opposite a leg of length 5, and the hypotenuse has length 13. What is cos θ?',
          choices: ['5/13', '5/12', '12/13', '12/5'],
          correctIndex: 2,
          explanation:
            'Adjacent leg = √(13² − 5²) = √(169 − 25) = √144 = 12. cos θ = adjacent/hypotenuse = 12/13.',
        },
        {
          id: 77,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Hard',
          question:
            'Two similar triangles have corresponding side lengths in the ratio 2:5. If the area of the smaller triangle is 8, what is the area of the larger triangle?',
          choices: ['20', '25', '40', '50'],
          correctIndex: 3,
          explanation: 'Area ratio = (2/5)² = 4/25. Larger area = 8 ÷ (4/25) = 8 × 25/4 = 50.',
        },
        {
          id: 78,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Medium',
          question:
            'A sector of a circle with radius 10 has a central angle of 72°. What is the area of the sector?',
          choices: ['10π', '20π', '25π', '36π'],
          correctIndex: 1,
          explanation: 'Sector area = (72/360) × π(10²) = (1/5)(100π) = 20π.',
        },
        {
          id: 79,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Hard',
          question: 'For an acute angle θ, sin θ = 3/5. What is tan θ?',
          choices: ['3/5', '3/4', '4/3', '4/5'],
          correctIndex: 1,
          explanation:
            'sin θ = 3/5 corresponds to a 3-4-5 right triangle, so cos θ = 4/5 and tan θ = 3/4.',
        },
        {
          id: 80,
          domain: 'Geometry and Trigonometry',
          difficulty: 'Easy',
          question: 'A square has a perimeter of 32. What is its area?',
          choices: ['16', '32', '56', '64'],
          correctIndex: 3,
          explanation: 'Side = 32/4 = 8. Area = 8² = 64.',
        },
      ],
    },
  ],
};
