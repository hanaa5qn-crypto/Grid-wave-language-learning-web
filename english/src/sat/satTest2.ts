// =============================================================================
// Digital SAT — Practice Test 2
// -----------------------------------------------------------------------------
// A full-length, original practice test modeled on the official College Board
// Digital SAT format: two Reading & Writing modules (27 questions each, 32 min)
// followed by two Math modules (22 questions each, 35 min). 54 RW + 44 Math =
// 98 questions. Every item is distinct from Practice Test 1. All math answers
// have been worked and verified.
// =============================================================================
import { SatTest } from '../types';

export const SAT_TEST_2: SatTest = {
  id: 'sat-practice-2',
  title: 'Digital SAT — Practice Test 2',
  source: 'Modeled on the official College Board Digital SAT format (original items).',
  sections: [
    // =========================================================================
    // SECTION 1 — Reading and Writing, Module 1 (27 questions, 32 minutes)
    // =========================================================================
    {
      module: 'Reading and Writing',
      moduleNumber: 1,
      minutes: 32,
      questions: [
        {
          id: 1,
          domain: 'Craft and Structure',
          passage:
            'The desert tortoise spends much of the year underground, retreating into burrows that buffer it against the searing daytime heat and the cold of winter nights. By remaining ______ for long stretches, the tortoise conserves the water and energy it would otherwise expend coping with the surface climate.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['dormant', 'visible', 'aggressive', 'restless'],
          correctIndex: 0,
          explanation:
            '"Dormant" means inactive, which fits a tortoise that stays underground for long stretches to save water and energy. "Visible," "aggressive," and "restless" all contradict the idea of staying still and hidden.',
        },
        {
          id: 2,
          domain: 'Craft and Structure',
          passage:
            'Although critics initially dismissed her debut novel as a minor work, the author\'s reputation grew steadily over the following decades. Today scholars regard the book as a ______ achievement, one that anticipated literary techniques later writers would make famous.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['derivative', 'seminal', 'tentative', 'forgettable'],
          correctIndex: 1,
          explanation:
            '"Seminal" describes a strongly influential work that shapes later developments, matching a book that "anticipated" techniques others made famous. The other options describe works that are unoriginal, hesitant, or unmemorable, which contradicts the praise.',
        },
        {
          id: 3,
          domain: 'Craft and Structure',
          passage:
            'The committee\'s proposal was anything but ______: it laid out, in exhaustive detail, every cost, deadline, and contingency that the project might encounter.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['thorough', 'vague', 'expensive', 'lengthy'],
          correctIndex: 1,
          explanation:
            'The phrase "anything but" signals a contrast with the detailed description that follows. Because the proposal was exhaustive and detailed, it was anything but "vague." "Thorough" and "lengthy" agree with the detail rather than contrasting it.',
        },
        {
          id: 4,
          domain: 'Craft and Structure',
          passage:
            'In her essay on urban design, Jacobs argues that lively neighborhoods arise not from grand master plans but from countless small, uncoordinated decisions by residents and shopkeepers. A vibrant street, she suggests, is ______ rather than imposed.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['cultivated', 'emergent', 'decorative', 'temporary'],
          correctIndex: 1,
          explanation:
            '"Emergent" means arising spontaneously from many small interactions, which directly contrasts with "imposed" and matches "uncoordinated decisions." The other words do not capture the bottom-up, self-organizing quality Jacobs describes.',
        },
        {
          id: 5,
          domain: 'Information and Ideas',
          passage:
            'A team of marine biologists tracked the foraging routes of wandering albatrosses by attaching lightweight GPS loggers to the birds. The data revealed that individual albatrosses repeatedly returned to the same productive ocean patches across multiple trips, even when those patches lay hundreds of kilometers apart.',
          question:
            'Which choice best states the main idea of the text?',
          choices: [
            'Wandering albatrosses choose nesting sites based on the location of food.',
            'GPS loggers are too heavy to be used safely on seabirds.',
            'Individual albatrosses show consistent, site-specific foraging patterns.',
            'Ocean patches rich in food are evenly distributed across the sea.',
          ],
          correctIndex: 2,
          explanation:
            'The text\'s key finding is that individual birds "repeatedly returned to the same productive ocean patches." That points to consistent, site-specific foraging. The other choices add claims about nesting, logger weight, or even distribution that the text does not support.',
        },
        {
          id: 6,
          domain: 'Information and Ideas',
          passage:
            'Historian Lin Zhao notes that the spread of cheap printed pamphlets in the seventeenth century allowed political ideas to circulate far beyond the small circles of the literate elite. Taverns and coffeehouses, she argues, became spaces where pamphlets were read aloud, debated, and passed from hand to hand.',
          question:
            'According to the text, what was one effect of cheap printed pamphlets?',
          choices: [
            'They reduced the number of taverns and coffeehouses.',
            'They limited political discussion to the literate elite.',
            'They helped political ideas reach beyond a narrow elite.',
            'They replaced spoken debate with silent private reading.',
          ],
          correctIndex: 2,
          explanation:
            'The text says pamphlets "allowed political ideas to circulate far beyond the small circles of the literate elite." Choice C restates this. The other choices contradict the passage, which describes ideas spreading widely and being read aloud and debated.',
        },
        {
          id: 7,
          domain: 'Information and Ideas',
          passage:
            'Researchers compared two groups of students preparing for an exam. One group reviewed their notes repeatedly; the other quizzed themselves with practice questions. On a test given a week later, the self-quizzing group recalled significantly more material, suggesting that ______',
          question:
            'Which choice most logically completes the text?',
          choices: [
            'rereading notes is the most effective way to study for an exam.',
            'retrieving information through practice strengthens long-term memory.',
            'the two study methods produce identical results over time.',
            'students should avoid taking practice tests before an exam.',
          ],
          correctIndex: 1,
          explanation:
            'The self-quizzing (retrieval) group remembered more after a week, so the logical conclusion is that retrieval practice strengthens long-term memory. The other options contradict the result or ignore the difference between the two groups.',
        },
        {
          id: 8,
          domain: 'Information and Ideas',
          passage:
            'Volcanic ash, though destructive in the short term, enriches the soil it falls on with minerals such as potassium and phosphorus. Over decades, farmland on the slopes of dormant volcanoes often becomes notably more fertile than comparable land elsewhere. This pattern suggests that ______',
          question:
            'Which choice most logically completes the text?',
          choices: [
            'volcanic eruptions have no lasting effect on agriculture.',
            'farmers should avoid all land near volcanoes.',
            'the long-term effects of ash can offset its initial damage.',
            'potassium and phosphorus are harmful to most crops.',
          ],
          correctIndex: 2,
          explanation:
            'The text contrasts short-term destruction with long-term enrichment, so the logical inference is that the eventual benefits can offset the initial harm. The other choices ignore the fertility benefit or contradict the stated minerals\' usefulness.',
        },
        {
          id: 9,
          domain: 'Information and Ideas',
          passage:
            'Text 1: Economist Dana Okoro contends that minimum-wage increases rarely cause large job losses, because employers absorb higher costs through modest price increases and reduced turnover.\n\nText 2: Economist Felix Brandt acknowledges that small wage increases may be absorbed, but warns that very large increases could push some employers, especially small businesses, to cut hours or staff.',
          question:
            'Based on the texts, how would Brandt (Text 2) most likely respond to Okoro\'s claim in Text 1?',
          choices: [
            'By arguing that minimum-wage increases never affect employment.',
            'By agreeing for modest increases but cautioning about very large ones.',
            'By rejecting the idea that employers can adjust prices at all.',
            'By insisting that turnover costs are irrelevant to employers.',
          ],
          correctIndex: 1,
          explanation:
            'Brandt "acknowledges that small wage increases may be absorbed" but warns about "very large increases." So he would agree with Okoro for modest increases while cautioning about large ones. The other choices misstate Brandt\'s qualified position.',
        },
        {
          id: 10,
          domain: 'Information and Ideas',
          passage:
            'A botanist measured the height of 40 sunflower plants grown under two light conditions. Plants given 14 hours of light per day averaged 182 cm tall, while those given 10 hours averaged 141 cm. All other conditions were held constant.',
          question:
            'Which choice best describes data that would support the conclusion that longer daily light exposure increases sunflower height?',
          choices: [
            'The 10-hour plants and the 14-hour plants reached the same average height.',
            'Plants given even more light, such as 16 hours, averaged taller still.',
            'Plants given 14 hours of light averaged shorter than the 10-hour plants.',
            'Height varied randomly with no relation to light exposure.',
          ],
          correctIndex: 1,
          explanation:
            'If still more light (16 hours) produced even taller plants, the dose-response trend supports the conclusion that more light increases height. The other choices show no effect, a reversed effect, or randomness, none of which supports the claim.',
        },
        {
          id: 11,
          domain: 'Information and Ideas',
          passage:
            'A survey of commuters found that those who biked to work reported higher job satisfaction than those who drove. A journalist concluded that biking to work causes greater job satisfaction.',
          question:
            'Which finding, if true, would most weaken the journalist\'s conclusion?',
          choices: [
            'Bikers and drivers reported the same average commute distance.',
            'People who already feel satisfied at work are more likely to choose to bike.',
            'Biking to work is more common in cities than in rural areas.',
            'The survey included an equal number of bikers and drivers.',
          ],
          correctIndex: 1,
          explanation:
            'If satisfied workers are more likely to choose biking, then satisfaction may cause biking rather than the reverse, undermining the causal claim. The other options are neutral details that do not address the direction of causation.',
        },
        {
          id: 12,
          domain: 'Information and Ideas',
          passage:
            'In studying medieval trade, scholars often rely on surviving merchant ledgers. Yet these documents tend to record only successful transactions; failed deals and informal exchanges rarely appear. As a result, ______',
          question:
            'Which choice most logically completes the text?',
          choices: [
            'merchant ledgers give a complete picture of medieval commerce.',
            'ledgers may overstate how smoothly medieval trade operated.',
            'medieval merchants kept no written records of any kind.',
            'informal exchanges were more common than recorded ones.',
          ],
          correctIndex: 1,
          explanation:
            'Because ledgers record mostly successes and omit failures, they may make trade look smoother than it was. Choice B captures this bias. Choice A contradicts the text; choices C and D overreach beyond what the passage supports.',
        },
        {
          id: 13,
          domain: 'Expression of Ideas',
          passage:
            'While researching urban beekeeping, a student took the following notes:\n• Rooftop hives can help pollinate nearby gardens.\n• City flowers bloom across a long season, giving bees a steady food supply.\n• Some cities now offer permits for rooftop hives.\n• The student wants to emphasize a benefit of urban beekeeping for plants.',
          question:
            'Which choice most effectively uses relevant information from the notes to accomplish the goal?',
          choices: [
            'Some cities now offer permits that allow residents to keep rooftop hives.',
            'City flowers bloom across a long season, providing bees with steady food.',
            'By pollinating nearby gardens, rooftop hives can help city plants thrive.',
            'Urban beekeeping has become a popular hobby in many large cities.',
          ],
          correctIndex: 2,
          explanation:
            'The goal is to emphasize a benefit for plants. Choice C highlights pollination helping plants thrive. Choice B focuses on a benefit for bees, and choices A and D address permits and popularity, not a benefit for plants.',
        },
        {
          id: 14,
          domain: 'Expression of Ideas',
          passage:
            'A writer is drafting a paragraph about the painter Artemisia Gentileschi and wants to introduce her with a sentence that establishes when she worked.',
          question:
            'Which choice most effectively introduces the topic by establishing when the painter worked?',
          choices: [
            'Artemisia Gentileschi, a Baroque painter active in the early 1600s, became known for her dramatic compositions.',
            'Artemisia Gentileschi created many remarkable and beautiful paintings.',
            'Many people today admire the work of Artemisia Gentileschi.',
            'The paintings of Artemisia Gentileschi can be found in museums.',
          ],
          correctIndex: 0,
          explanation:
            'Only choice A states when she worked ("active in the early 1600s"). The other choices describe her or her reception but provide no time frame, so they fail the stated goal.',
        },
        {
          id: 15,
          domain: 'Standard English Conventions',
          passage:
            'The hikers reached the summit just before noon, ______ they paused to eat lunch and admire the valley below.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['where', 'their', 'there', 'wear'],
          correctIndex: 0,
          explanation:
            '"Where" correctly introduces a clause referring to the place (the summit). "Their" is a possessive, "there" is an adverb of place that would leave a comma splice, and "wear" is a verb; none fits the relative-clause structure.',
        },
        {
          id: 16,
          domain: 'Standard English Conventions',
          passage:
            'The novelist, along with her two longtime editors, ______ scheduled to appear at the literary festival next week.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['are', 'is', 'were', 'have been'],
          correctIndex: 1,
          explanation:
            'The subject is the singular "novelist"; the phrase "along with her two longtime editors" is parenthetical and does not change the number. A singular subject takes "is."',
        },
        {
          id: 17,
          domain: 'Standard English Conventions',
          passage:
            'After months of preparation, the orchestra performed flawlessly ______ the conductor took a final bow as the audience rose to its feet.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [', and', ', ', ' ', '; however,'],
          correctIndex: 0,
          explanation:
            'Two independent clauses ("the orchestra performed flawlessly" and "the conductor took a final bow…") must be joined with a comma plus a coordinating conjunction. ", and" does this. A lone comma or no punctuation creates a run-on, and "however" wrongly implies contrast.',
        },
        {
          id: 18,
          domain: 'Standard English Conventions',
          passage:
            'The museum\'s new exhibit features artifacts from three ancient ______ pottery from Mesopotamia, jewelry from Egypt, and tools from the Indus Valley.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['cultures,', 'cultures:', 'cultures;', 'cultures'],
          correctIndex: 1,
          explanation:
            'A colon correctly introduces the list that explains "three ancient cultures." A comma or no punctuation is too weak to introduce the list, and a semicolon would wrongly separate the introductory clause from its own list.',
        },
        {
          id: 19,
          domain: 'Standard English Conventions',
          passage:
            'Each of the participants in the study ______ asked to keep a daily journal of their sleep habits for one month.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['were', 'was', 'have been', 'are'],
          correctIndex: 1,
          explanation:
            '"Each" is a singular subject, so it requires the singular past-tense verb "was." The plural forms "were," "have been," and "are" do not agree with the singular subject.',
        },
        {
          id: 20,
          domain: 'Standard English Conventions',
          passage:
            'The bridge, ______ in 1937, still carries thousands of vehicles across the strait every day.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['completing', 'completed', 'completes', 'will complete'],
          correctIndex: 1,
          explanation:
            'The past participle "completed" forms a reduced passive modifier ("which was completed in 1937"). "Completing," "completes," and "will complete" wrongly suggest the bridge performs the action or use the wrong tense.',
        },
        {
          id: 21,
          domain: 'Expression of Ideas',
          passage:
            'Solar panels generate the most electricity when sunlight strikes them directly. ______ engineers often mount panels on motors that tilt them to follow the sun across the sky.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['Nevertheless,', 'For this reason,', 'In contrast,', 'Similarly,'],
          correctIndex: 1,
          explanation:
            'The second sentence describes a solution that follows from the first sentence\'s fact, so a cause-effect transition like "For this reason" is logical. "Nevertheless" and "In contrast" signal opposition, and "Similarly" signals comparison, none of which fits.',
        },
        {
          id: 22,
          domain: 'Expression of Ideas',
          passage:
            'The new tutoring program improved students\' test scores. ______ it increased their confidence and willingness to ask questions in class.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['However,', 'Moreover,', 'Otherwise,', 'In conclusion,'],
          correctIndex: 1,
          explanation:
            'The second sentence adds a further benefit to the first, so the additive transition "Moreover" fits. "However" and "Otherwise" signal contrast or alternatives, and "In conclusion" wrongly signals a summary.',
        },
        {
          id: 23,
          domain: 'Craft and Structure',
          passage:
            'When the inventor finally unveiled the prototype, the audience\'s reaction was decidedly ______: some gasped in admiration, others frowned in confusion, and a few simply walked away.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['uniform', 'mixed', 'enthusiastic', 'silent'],
          correctIndex: 1,
          explanation:
            'The list of differing responses (admiration, confusion, indifference) shows the reaction was "mixed." "Uniform," "enthusiastic," and "silent" each contradict the variety described.',
        },
        {
          id: 24,
          domain: 'Information and Ideas',
          passage:
            'A study of city parks found that parks with a wide variety of plant species hosted more species of birds and insects than parks dominated by a single type of grass. The researchers concluded that increasing plant diversity could make urban green spaces richer in animal life.',
          question: 'Which finding would most directly support the researchers\' conclusion?',
          choices: [
            'A park that added many new plant species later attracted more bird and insect species.',
            'A park with a single type of grass was the most popular with human visitors.',
            'Parks of all kinds attracted the same number of animal species.',
            'Bird species in the city declined regardless of plant diversity.',
          ],
          correctIndex: 0,
          explanation:
            'A park that gained animal diversity after adding plant species directly supports the claim that increasing plant diversity enriches animal life. The other options are irrelevant to the claim or contradict it.',
        },
        {
          id: 25,
          domain: 'Craft and Structure',
          passage:
            'The senator\'s speech was praised for its clarity, but reviewers noted that its argument, while elegant, rested on a single ______ assumption that, if false, would undermine the entire case.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['trivial', 'crucial', 'obvious', 'minor'],
          correctIndex: 1,
          explanation:
            'Because the assumption could "undermine the entire case" if false, it must be "crucial." "Trivial," "obvious," and "minor" all downplay an assumption the text presents as central.',
        },
        {
          id: 26,
          domain: 'Information and Ideas',
          passage:
            'Paleontologists studying fossilized footprints can estimate how fast an extinct animal moved by measuring the distance between consecutive prints relative to the animal\'s leg length. Longer strides relative to leg length generally indicate faster movement.',
          question: 'Based on the text, what can be concluded about an animal whose footprints show very long strides relative to its leg length?',
          choices: [
            'It was probably moving quickly when it left the prints.',
            'It had unusually short legs for its body size.',
            'It was standing still when the prints were made.',
            'Its footprints cannot be used to estimate speed.',
          ],
          correctIndex: 0,
          explanation:
            'The text states longer strides relative to leg length "generally indicate faster movement," so very long strides suggest the animal was moving quickly. The other choices contradict or ignore this stated relationship.',
        },
        {
          id: 27,
          domain: 'Standard English Conventions',
          passage:
            'The chef prepared three dishes for the contest, and ______ a delicate soup that the judges singled out for special praise.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['it was', 'they were', 'there was', 'these were'],
          correctIndex: 0,
          explanation:
            'The singular phrase "a delicate soup" requires the singular "it was." The plural forms "they were" and "these were" do not agree, and "there was" creates an awkward, unidiomatic construction in this contrast.',
        },
      ],
    },

    // =========================================================================
    // SECTION 2 — Reading and Writing, Module 2 (27 questions, 32 minutes)
    // =========================================================================
    {
      module: 'Reading and Writing',
      moduleNumber: 2,
      minutes: 32,
      questions: [
        {
          id: 28,
          domain: 'Craft and Structure',
          passage:
            'For years the theory was treated as settled, but a series of careful experiments has begun to ______ it, forcing researchers to reconsider conclusions they had long taken for granted.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['confirm', 'undermine', 'ignore', 'publish'],
          correctIndex: 1,
          explanation:
            'Because the experiments force researchers to reconsider settled conclusions, they must "undermine" the theory. "Confirm" is the opposite, while "ignore" and "publish" do not fit the idea of challenging the theory.',
        },
        {
          id: 29,
          domain: 'Craft and Structure',
          passage:
            'The diplomat was known for her ______ manner: she could deliver unwelcome news so gracefully that her counterparts often left the room feeling respected rather than rebuffed.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['tactful', 'blunt', 'careless', 'hostile'],
          correctIndex: 0,
          explanation:
            'Delivering unwelcome news gracefully so others feel respected describes a "tactful" manner. "Blunt," "careless," and "hostile" all contradict the diplomat\'s gentle, considerate approach.',
        },
        {
          id: 30,
          domain: 'Craft and Structure',
          passage:
            'Text 1: Critic Mara Devlin praises the film\'s slow pacing, arguing that its long, quiet scenes give viewers time to absorb the characters\' emotions.\n\nText 2: Critic Tomas Reyes finds the same slow pacing frustrating, claiming that the lingering scenes drain the story of momentum and test the audience\'s patience.',
          question: 'Based on the texts, Devlin and Reyes would most likely agree that the film',
          choices: [
            'has a fast-moving and tightly edited plot.',
            'features slow pacing with long, quiet scenes.',
            'fails to develop its characters\' emotions.',
            'is too short to convey its story fully.',
          ],
          correctIndex: 1,
          explanation:
            'Both critics describe the film\'s "slow pacing" and "long, quiet" or "lingering scenes"; they disagree only about whether this is good. They agree on the factual description in choice B. The other choices misstate or contradict both critics.',
        },
        {
          id: 31,
          domain: 'Information and Ideas',
          passage:
            'Coral reefs depend on tiny algae that live inside coral tissue and supply much of the coral\'s food through photosynthesis. When ocean temperatures rise too high, the coral expels these algae, losing both its color and its main food source in a process called bleaching.',
          question: 'According to the text, what happens when coral expels its algae?',
          choices: [
            'The coral grows faster than before.',
            'The coral loses color and a major food source.',
            'The algae provide the coral with more food.',
            'Ocean temperatures begin to fall.',
          ],
          correctIndex: 1,
          explanation:
            'The text states that expelling the algae causes the coral to lose "both its color and its main food source." Choice B restates this. The other choices contradict the described consequences of bleaching.',
        },
        {
          id: 32,
          domain: 'Information and Ideas',
          passage:
            'A linguist studying a small island community found that younger residents increasingly mixed words from a neighboring language into their everyday speech, while older residents used these borrowed words far less often. The linguist suspected that contact with nearby islands was reshaping the local vocabulary.',
          question: 'Which choice best states the main idea of the text?',
          choices: [
            'Older residents speak more clearly than younger residents.',
            'The neighboring language is about to disappear entirely.',
            'Language contact appears to be changing the community\'s vocabulary.',
            'Younger residents refuse to learn the local language.',
          ],
          correctIndex: 2,
          explanation:
            'The passage describes borrowed words entering speech and the linguist\'s suspicion that contact is "reshaping the local vocabulary." Choice C captures this. The other choices add claims about clarity, language death, or refusal that the text does not support.',
        },
        {
          id: 33,
          domain: 'Information and Ideas',
          passage:
            'Engineers testing a new battery design measured how much charge it retained after repeated cycles of charging and discharging. After 500 cycles, the new battery retained 92 percent of its original capacity, compared with 71 percent for the older design tested under identical conditions.',
          question: 'Which choice best describes the data presented in the text?',
          choices: [
            'The older battery outperformed the new battery after 500 cycles.',
            'Both batteries lost the same amount of capacity after 500 cycles.',
            'The new battery retained more capacity than the older one after 500 cycles.',
            'Neither battery lost any capacity over 500 cycles.',
          ],
          correctIndex: 2,
          explanation:
            'The new battery kept 92 percent versus the older design\'s 71 percent, so the new battery retained more capacity. Choice C is correct; the others contradict the reported numbers.',
        },
        {
          id: 34,
          domain: 'Information and Ideas',
          passage:
            'A psychologist asked volunteers to estimate the length of a film they had just watched. Volunteers who had found the film boring consistently overestimated its length, while those who found it engaging underestimated it. This pattern suggests that ______',
          question: 'Which choice most logically completes the text?',
          choices: [
            'our sense of how much time has passed can depend on engagement.',
            'boring films are always longer than engaging ones.',
            'people cannot estimate the length of any film accurately.',
            'engaging films contain fewer minutes than boring films.',
          ],
          correctIndex: 0,
          explanation:
            'Because perceived duration differed with engagement (boredom stretched time, engagement shrank it), the logical conclusion is that engagement affects our sense of elapsed time. The other choices confuse actual length with perception or overgeneralize.',
        },
        {
          id: 35,
          domain: 'Information and Ideas',
          passage:
            'A researcher claimed that a city\'s new bike lanes had reduced traffic accidents, citing a drop in reported accidents the year after the lanes opened.',
          question: 'Which finding, if true, would most weaken the researcher\'s claim?',
          choices: [
            'Accident reports across the entire region fell by the same percentage that year.',
            'The bike lanes were used by thousands of cyclists each day.',
            'The city spent a large sum installing the bike lanes.',
            'Cyclists reported feeling safer after the lanes were built.',
          ],
          correctIndex: 0,
          explanation:
            'If the whole region saw the same drop, then the decline likely reflects a broad trend, not the bike lanes specifically, weakening the causal claim. The other choices are neutral or actually consistent with the claim.',
        },
        {
          id: 36,
          domain: 'Information and Ideas',
          passage:
            'The following text is from a 19th-century novel. The narrator describes her childhood home.\n\n"The house stood at the end of a lane so overgrown that strangers rarely found it. To me, though, every bend was familiar; I could have walked it blindfolded, naming each tree by the sound the wind made in its branches."',
          question: 'Which choice best describes the narrator\'s attitude toward her childhood home?',
          choices: [
            'She finds it confusing and difficult to navigate.',
            'She knows it so intimately that it feels deeply familiar.',
            'She is eager to leave it behind forever.',
            'She regrets that strangers cannot find it.',
          ],
          correctIndex: 1,
          explanation:
            'The narrator says every bend was familiar and she could walk it blindfolded, naming trees by sound, conveying deep intimacy. Choice B fits. The other choices contradict her evident closeness to the place.',
        },
        {
          id: 37,
          domain: 'Information and Ideas',
          passage:
            'A team of archaeologists argued that an ancient settlement traded with distant regions. To support this claim, they would most need evidence showing that ______',
          question: 'Which choice most logically completes the text?',
          choices: [
            'the settlement\'s buildings were made of local stone.',
            'objects made from materials found only far away were present at the site.',
            'the settlement\'s population grew over several centuries.',
            'the inhabitants farmed crops native to the region.',
          ],
          correctIndex: 1,
          explanation:
            'Evidence of distant trade requires items made from non-local materials at the site. Choice B provides exactly that. Local stone, population growth, and native crops would not demonstrate long-distance trade.',
        },
        {
          id: 38,
          domain: 'Information and Ideas',
          passage:
            'Text 1: Researcher Aiko Sato argues that giving employees flexible hours boosts productivity, since workers can schedule demanding tasks for the times of day when they focus best.\n\nText 2: Researcher Omar Haddad agrees flexibility can help individuals but notes that when team members work on very different schedules, coordinating shared projects becomes harder.',
          question: 'Based on the texts, what is one point on which Sato and Haddad would most likely agree?',
          choices: [
            'Flexible hours always harm overall productivity.',
            'Flexible hours can benefit individual workers.',
            'Coordinating teams is never affected by scheduling.',
            'Employees focus equally well at all times of day.',
          ],
          correctIndex: 1,
          explanation:
            'Sato says flexibility boosts productivity, and Haddad "agrees flexibility can help individuals." Both accept that flexible hours can benefit individuals. The other choices contradict one or both researchers.',
        },
        {
          id: 39,
          domain: 'Expression of Ideas',
          passage:
            'While studying a comet, a student took the following notes:\n• Comets are made largely of ice and dust.\n• As a comet nears the Sun, its ice heats and turns to gas, forming a glowing tail.\n• The tail always points away from the Sun.\n• The student wants to explain why a comet develops a tail.',
          question: 'Which choice most effectively uses the notes to accomplish the goal?',
          choices: [
            'Comets are made largely of ice and dust, with some rock mixed in.',
            'A comet\'s tail always points away from the Sun, no matter its direction.',
            'As a comet nears the Sun, its ice heats and turns to gas, forming a glowing tail.',
            'Comets have fascinated sky watchers for thousands of years.',
          ],
          correctIndex: 2,
          explanation:
            'The goal is to explain why a comet develops a tail. Choice C gives the cause: heating ice turns to gas. Choices A, B, and D describe composition, tail direction, or history, none of which explains the tail\'s formation.',
        },
        {
          id: 40,
          domain: 'Expression of Ideas',
          passage:
            'A student is writing about the composer Florence Price and wants to combine these two sentences:\n"Florence Price was an American composer. She was the first Black woman to have a symphony performed by a major U.S. orchestra."',
          question: 'Which choice most effectively combines the sentences while emphasizing Price\'s historic achievement?',
          choices: [
            'Florence Price, an American composer, was the first Black woman to have a symphony performed by a major U.S. orchestra.',
            'Florence Price was an American composer, and she had a symphony.',
            'An American composer, Florence Price, who composed symphonies, existed.',
            'Florence Price was American, and she was a composer of symphonies.',
          ],
          correctIndex: 0,
          explanation:
            'Choice A combines the sentences smoothly and keeps the historic achievement as the main clause for emphasis. The other choices either omit the achievement or are awkward and lose the key point.',
        },
        {
          id: 41,
          domain: 'Expression of Ideas',
          passage:
            'A short walk can improve mood and sharpen concentration. ______ many workplaces now encourage employees to take brief breaks outdoors during the day.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['Nonetheless,', 'Consequently,', 'In contrast,', 'Meanwhile,'],
          correctIndex: 1,
          explanation:
            'The second sentence is a result of the benefit described in the first, so the cause-effect transition "Consequently" fits. "Nonetheless" and "In contrast" signal opposition, and "Meanwhile" signals simultaneity, neither of which is logical here.',
        },
        {
          id: 42,
          domain: 'Expression of Ideas',
          passage:
            'The new policy was intended to reduce paperwork for small businesses. ______ many owners reported that filing requirements actually became more complicated.',
          question: 'Which choice completes the text with the most logical transition?',
          choices: ['Therefore,', 'However,', 'For example,', 'Similarly,'],
          correctIndex: 1,
          explanation:
            'The outcome (more complicated filing) contradicts the policy\'s intent (less paperwork), so the contrast transition "However" fits. "Therefore" and "Similarly" imply agreement, and "For example" introduces an illustration, none of which is logical.',
        },
        {
          id: 43,
          domain: 'Standard English Conventions',
          passage:
            'The research team published ______ findings in a leading journal after two years of fieldwork.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['its', "it's", 'their', 'there'],
          correctIndex: 0,
          explanation:
            '"Team" is a singular collective noun, so the singular possessive "its" agrees with it. "It\'s" means "it is," "their" is plural, and "there" is not possessive.',
        },
        {
          id: 44,
          domain: 'Standard English Conventions',
          passage:
            'Having trained for months, ______ at the starting line with quiet confidence.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [
            'the starting line was where the runner stood',
            'the runner stood',
            'there was confidence as the runner stood',
            'standing was the runner',
          ],
          correctIndex: 1,
          explanation:
            'The introductory modifier "Having trained for months" must describe the runner, who did the training. Choice B places "the runner" right after the comma, correcting the dangling modifier. The other choices attach the modifier to the wrong noun or are awkward.',
        },
        {
          id: 45,
          domain: 'Standard English Conventions',
          passage:
            'The library extended its hours during finals week ______ students needed more time to study.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [', because', ' because', '; because', ', so'],
          correctIndex: 1,
          explanation:
            'No comma is needed before "because" when the dependent clause follows the main clause and is essential. " because" (no comma) is correct. A comma or semicolon before "because" is unnecessary, and "so" changes the intended cause-effect meaning.',
        },
        {
          id: 46,
          domain: 'Standard English Conventions',
          passage:
            'The committee reviewed the three proposals carefully and chose the one that ______ the community\'s needs most fully.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['address', 'addresses', 'addressing', 'have addressed'],
          correctIndex: 1,
          explanation:
            'The relative pronoun "that" refers to "the one" (singular), so the singular present-tense verb "addresses" agrees. "Address" and "have addressed" are plural, and "addressing" is not a finite verb.',
        },
        {
          id: 47,
          domain: 'Standard English Conventions',
          passage:
            'The garden contained many fragrant ______ roses, lavender, and jasmine among them.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['plants,', 'plants:', 'plants', 'plants;'],
          correctIndex: 1,
          explanation:
            'A colon properly introduces the list ("roses, lavender, and jasmine") that specifies the fragrant plants. A comma or no punctuation is too weak, and a semicolon improperly separates the clause from its explanatory list.',
        },
        {
          id: 48,
          domain: 'Standard English Conventions',
          passage:
            'By the time the rescue team arrived, the stranded hikers ______ a small fire to keep warm.',
          question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['build', 'had built', 'are building', 'will build'],
          correctIndex: 1,
          explanation:
            'The past perfect "had built" correctly shows that the hikers built the fire before the rescue team arrived. The present, present-progressive, and future forms do not match this earlier-past sequence.',
        },
        {
          id: 49,
          domain: 'Craft and Structure',
          passage:
            'The author\'s prose is admirably ______: she conveys complex ideas in short, clear sentences that never waste a word.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['ornate', 'economical', 'confusing', 'careless'],
          correctIndex: 1,
          explanation:
            'Short, clear sentences that "never waste a word" describe "economical" prose. "Ornate" suggests elaborate writing, while "confusing" and "careless" contradict the praise.',
        },
        {
          id: 50,
          domain: 'Information and Ideas',
          passage:
            'A meteorologist explained that warm air can hold more water vapor than cold air. As a result, when a warm, humid air mass cools rapidly, ______',
          question: 'Which choice most logically completes the text?',
          choices: [
            'it can hold even more water vapor than before.',
            'some of its water vapor is likely to condense into clouds or rain.',
            'the air mass becomes warmer and drier.',
            'water vapor disappears from the atmosphere entirely.',
          ],
          correctIndex: 1,
          explanation:
            'If warm air holds more vapor than cold air, then rapid cooling reduces the air\'s capacity, causing excess vapor to condense into clouds or rain. Choice B follows logically; the others contradict the stated principle.',
        },
        {
          id: 51,
          domain: 'Craft and Structure',
          passage:
            'In the passage, the description of the abandoned factory—its broken windows, rusted machinery, and weeds pushing through cracked concrete—primarily serves to',
          question: 'Which choice best states the function of the underlined details in the text as a whole?',
          choices: [
            'establish a mood of decay and neglect.',
            'argue that the factory should be restored.',
            'explain how the machinery once operated.',
            'introduce the factory\'s former owner.',
          ],
          correctIndex: 0,
          explanation:
            'Broken windows, rust, and invasive weeds are sensory details that build a mood of decay and neglect. The passage does not argue for restoration, explain machinery, or introduce an owner, so those functions do not fit.',
        },
        {
          id: 52,
          domain: 'Information and Ideas',
          passage:
            'A nutrition study reported that people who ate breakfast regularly tended to weigh less than those who skipped it. News outlets concluded that eating breakfast causes weight loss.',
          question: 'Which finding, if true, would most weaken the news outlets\' conclusion?',
          choices: [
            'People who already maintain healthy habits are more likely to eat breakfast.',
            'Breakfast foods are widely available in most grocery stores.',
            'The study included participants of many different ages.',
            'Some participants preferred sweet breakfasts over savory ones.',
          ],
          correctIndex: 0,
          explanation:
            'If healthy-habit people are simply more likely to eat breakfast, then the link may reflect other habits rather than breakfast causing weight loss, weakening the causal claim. The other choices are neutral details irrelevant to causation.',
        },
        {
          id: 53,
          domain: 'Information and Ideas',
          passage:
            'A botanist observed that a certain orchid is pollinated only by a single species of moth with an unusually long tongue. The orchid\'s nectar lies at the bottom of a deep, narrow spur that shorter-tongued insects cannot reach.',
          question: 'Based on the text, why is the long-tongued moth essential to this orchid?',
          choices: [
            'It is the only insect that can reach the orchid\'s nectar and pollinate it.',
            'It prevents other insects from visiting the orchid\'s flowers.',
            'It produces nectar that the orchid uses for food.',
            'It shortens the orchid\'s nectar spur over time.',
          ],
          correctIndex: 0,
          explanation:
            'Because only the long-tongued moth can reach the deep nectar, it is the orchid\'s only effective pollinator. Choice A states this. The other choices misdescribe the relationship.',
        },
        {
          id: 54,
          domain: 'Expression of Ideas',
          passage:
            'A student researching renewable energy took these notes:\n• Wind turbines convert moving air into electricity.\n• A single large turbine can power hundreds of homes.\n• Turbines work best in areas with steady, strong winds.\n• The student wants to emphasize the scale of a turbine\'s output.',
          question: 'Which choice most effectively uses the notes to accomplish the goal?',
          choices: [
            'Wind turbines convert the energy of moving air into electricity.',
            'A single large wind turbine can generate enough electricity to power hundreds of homes.',
            'Turbines perform best in areas with steady, strong winds.',
            'Renewable energy has become increasingly popular worldwide.',
          ],
          correctIndex: 1,
          explanation:
            'The goal is to emphasize the scale of output. Choice B highlights powering hundreds of homes. Choices A and C describe how turbines work or where they work best, and D is unrelated to a single turbine\'s output.',
        },
      ],
    },

    // =========================================================================
    // SECTION 3 — Math, Module 1 (22 questions, 35 minutes)
    // =========================================================================
    {
      module: 'Math',
      moduleNumber: 1,
      minutes: 35,
      questions: [
        {
          id: 55,
          domain: 'Algebra',
          question: 'If 5x - 3 = 17, what is the value of x?',
          choices: ['2', '4', '5', '7'],
          correctIndex: 1,
          explanation:
            'Add 3 to both sides: 5x = 20. Divide by 5: x = 4. So the answer is 4.',
        },
        {
          id: 56,
          domain: 'Algebra',
          question:
            'A taxi charges a flat fee of $3.00 plus $2.50 per mile. Which equation gives the total cost C, in dollars, for a ride of m miles?',
          choices: ['C = 3.00m + 2.50', 'C = 2.50m + 3.00', 'C = 5.50m', 'C = 2.50(m + 3.00)'],
          correctIndex: 1,
          explanation:
            'The per-mile charge 2.50 multiplies the miles m, and the flat fee 3.00 is added once: C = 2.50m + 3.00.',
        },
        {
          id: 57,
          domain: 'Algebra',
          question:
            'The line in the xy-plane passes through the points (0, 4) and (2, 10). What is the slope of the line?',
          choices: ['2', '3', '4', '6'],
          correctIndex: 1,
          explanation:
            'Slope = (10 - 4) / (2 - 0) = 6 / 2 = 3.',
        },
        {
          id: 58,
          domain: 'Algebra',
          question:
            'If 3(x + 2) = 2x + 11, what is the value of x?',
          choices: ['3', '5', '7', '9'],
          correctIndex: 1,
          explanation:
            'Expand: 3x + 6 = 2x + 11. Subtract 2x: x + 6 = 11. Subtract 6: x = 5.',
        },
        {
          id: 59,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A jacket originally priced at $80 is on sale for 25% off. What is the sale price, in dollars?',
          choices: ['$20', '$55', '$60', '$65'],
          correctIndex: 2,
          explanation:
            '25% of 80 is 20, so the discount is $20. The sale price is 80 - 20 = $60.',
        },
        {
          id: 60,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A recipe that serves 4 people requires 6 cups of flour. At the same rate, how many cups of flour are needed to serve 10 people?',
          choices: ['12', '15', '18', '20'],
          correctIndex: 1,
          explanation:
            'Flour per person = 6 / 4 = 1.5 cups. For 10 people: 1.5 × 10 = 15 cups.',
        },
        {
          id: 61,
          domain: 'Advanced Math',
          question:
            'What is the value of the expression x² - 4x + 1 when x = 3?',
          choices: ['-2', '-1', '0', '4'],
          correctIndex: 0,
          explanation:
            'Substitute x = 3: 3² - 4(3) + 1 = 9 - 12 + 1 = -2.',
        },
        {
          id: 62,
          domain: 'Advanced Math',
          question:
            'If f(x) = 2x² - x, what is the value of f(-2)?',
          choices: ['6', '8', '10', '12'],
          correctIndex: 2,
          explanation:
            'f(-2) = 2(-2)² - (-2) = 2(4) + 2 = 8 + 2 = 10.',
        },
        {
          id: 63,
          domain: 'Geometry and Trigonometry',
          question:
            'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
          choices: ['10', '12', '14', '48'],
          correctIndex: 0,
          explanation:
            'By the Pythagorean theorem, hypotenuse = √(6² + 8²) = √(36 + 64) = √100 = 10.',
        },
        {
          id: 64,
          domain: 'Geometry and Trigonometry',
          question:
            'A circle has a radius of 5. What is its area? (Use the formula A = πr².)',
          choices: ['10π', '20π', '25π', '50π'],
          correctIndex: 2,
          explanation:
            'Area = πr² = π(5²) = 25π.',
        },
        {
          id: 65,
          domain: 'Algebra',
          question:
            'The solution to the inequality 4x + 7 < 23 is which of the following?',
          choices: ['x < 4', 'x > 4', 'x < 8', 'x > 8'],
          correctIndex: 0,
          explanation:
            'Subtract 7: 4x < 16. Divide by 4: x < 4.',
        },
        {
          id: 66,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'The mean of five numbers is 12. Four of the numbers are 10, 14, 9, and 13. What is the fifth number?',
          choices: ['12', '13', '14', '15'],
          correctIndex: 2,
          explanation:
            'The sum of all five numbers is 5 × 12 = 60. The four known numbers sum to 10 + 14 + 9 + 13 = 46. The fifth number is 60 - 46 = 14.',
        },
        {
          id: 67,
          domain: 'Advanced Math',
          question:
            'Which expression is equivalent to (x + 3)(x - 5)?',
          choices: ['x² - 2x - 15', 'x² + 2x - 15', 'x² - 8x + 15', 'x² - 2x + 15'],
          correctIndex: 0,
          explanation:
            'Expand using FOIL: x² - 5x + 3x - 15 = x² - 2x - 15.',
        },
        {
          id: 68,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'In a class of 30 students, 18 play a sport. What percent of the students play a sport?',
          choices: ['40%', '50%', '60%', '70%'],
          correctIndex: 2,
          explanation:
            '18 / 30 = 0.6, which is 60%.',
        },
        {
          id: 69,
          domain: 'Algebra',
          question:
            'A system of equations is given by y = 2x + 1 and y = -x + 7. What is the x-coordinate of the solution?',
          choices: ['1', '2', '3', '5'],
          correctIndex: 1,
          explanation:
            'Set the expressions equal: 2x + 1 = -x + 7. Add x: 3x + 1 = 7. Subtract 1: 3x = 6, so x = 2.',
        },
        {
          id: 70,
          domain: 'Geometry and Trigonometry',
          question:
            'Two angles of a triangle measure 50° and 65°. What is the measure of the third angle?',
          choices: ['55°', '65°', '75°', '115°'],
          correctIndex: 1,
          explanation:
            'The angles of a triangle sum to 180°. The third angle is 180° - 50° - 65° = 65°.',
        },
        {
          id: 71,
          domain: 'Advanced Math',
          question:
            'If x² = 49 and x < 0, what is the value of x?',
          choices: ['-7', '7', '-49', '49'],
          correctIndex: 0,
          explanation:
            'The solutions to x² = 49 are x = 7 and x = -7. Since x < 0, x = -7.',
        },
        {
          id: 72,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A car travels 150 miles in 3 hours. At this constant rate, how far will it travel in 5 hours?',
          choices: ['200 miles', '225 miles', '250 miles', '300 miles'],
          correctIndex: 2,
          explanation:
            'Speed = 150 / 3 = 50 miles per hour. In 5 hours: 50 × 5 = 250 miles.',
        },
        {
          id: 73,
          domain: 'Algebra',
          question:
            'If 2(x - 4) = 3x + 1, what is the value of x?',
          gridInAnswer: '-9',
          explanation:
            'Expand: 2x - 8 = 3x + 1. Subtract 2x: -8 = x + 1. Subtract 1: x = -9.',
        },
        {
          id: 74,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A bag contains 3 red marbles and 5 blue marbles. If one marble is drawn at random, what is the probability that it is red? Give your answer as a decimal.',
          gridInAnswer: '0.375',
          explanation:
            'There are 3 + 5 = 8 marbles total, 3 of them red. P(red) = 3/8 = 0.375.',
        },
        {
          id: 75,
          domain: 'Advanced Math',
          question:
            'The function g is defined by g(x) = x² - 6x + 9. For what value of x does g(x) = 0?',
          gridInAnswer: '3',
          explanation:
            'Factor: x² - 6x + 9 = (x - 3)². Setting (x - 3)² = 0 gives x = 3.',
        },
        {
          id: 76,
          domain: 'Geometry and Trigonometry',
          question:
            'A rectangle has a length of 12 and a width of 5. What is the length of its diagonal?',
          gridInAnswer: '13',
          explanation:
            'The diagonal is the hypotenuse of a right triangle with legs 12 and 5: √(12² + 5²) = √(144 + 25) = √169 = 13.',
        },
      ],
    },

    // =========================================================================
    // SECTION 4 — Math, Module 2 (22 questions, 35 minutes)
    // =========================================================================
    {
      module: 'Math',
      moduleNumber: 2,
      minutes: 35,
      questions: [
        {
          id: 77,
          domain: 'Algebra',
          question: 'If 7x + 2 = 4x + 20, what is the value of x?',
          choices: ['4', '5', '6', '7'],
          correctIndex: 2,
          explanation:
            'Subtract 4x: 3x + 2 = 20. Subtract 2: 3x = 18. Divide by 3: x = 6.',
        },
        {
          id: 78,
          domain: 'Algebra',
          question:
            'A line passes through (1, 5) and has a slope of 3. What is the y-intercept of the line?',
          choices: ['1', '2', '3', '5'],
          correctIndex: 1,
          explanation:
            'Using y = 3x + b with the point (1, 5): 5 = 3(1) + b, so b = 2. The y-intercept is 2.',
        },
        {
          id: 79,
          domain: 'Advanced Math',
          question:
            'Which of the following is equivalent to (2x³)(4x²)?',
          choices: ['6x⁵', '8x⁵', '8x⁶', '6x⁶'],
          correctIndex: 1,
          explanation:
            'Multiply coefficients: 2 × 4 = 8. Add exponents: x³ × x² = x⁵. The result is 8x⁵.',
        },
        {
          id: 80,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A population of bacteria doubles every hour. If there are 50 bacteria now, how many will there be in 3 hours?',
          choices: ['150', '300', '400', '450'],
          correctIndex: 2,
          explanation:
            'Doubling three times multiplies by 2³ = 8. So 50 × 8 = 400 bacteria.',
        },
        {
          id: 81,
          domain: 'Algebra',
          question:
            'If 0.5x + 4 = 10, what is the value of x?',
          choices: ['8', '10', '12', '14'],
          correctIndex: 2,
          explanation:
            'Subtract 4: 0.5x = 6. Divide by 0.5 (multiply by 2): x = 12.',
        },
        {
          id: 82,
          domain: 'Advanced Math',
          question:
            'What are the solutions to x² - 5x + 6 = 0?',
          choices: ['x = 1 and x = 6', 'x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 5'],
          correctIndex: 1,
          explanation:
            'Factor: (x - 2)(x - 3) = 0, giving x = 2 and x = 3 (since 2 × 3 = 6 and 2 + 3 = 5).',
        },
        {
          id: 83,
          domain: 'Geometry and Trigonometry',
          question:
            'A cube has an edge length of 4. What is its volume?',
          choices: ['12', '16', '48', '64'],
          correctIndex: 3,
          explanation:
            'Volume of a cube = edge³ = 4³ = 64.',
        },
        {
          id: 84,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A survey found that the ratio of students who prefer tea to those who prefer coffee is 2 to 3. If 60 students were surveyed and all chose one drink, how many prefer coffee?',
          choices: ['24', '30', '36', '40'],
          correctIndex: 2,
          explanation:
            'The ratio 2:3 has 5 parts, so each part is 60 / 5 = 12 students. Coffee gets 3 parts: 3 × 12 = 36.',
        },
        {
          id: 85,
          domain: 'Algebra',
          question:
            'If a + b = 12 and a - b = 4, what is the value of a?',
          choices: ['4', '6', '8', '10'],
          correctIndex: 2,
          explanation:
            'Add the two equations: (a + b) + (a - b) = 12 + 4, so 2a = 16 and a = 8.',
        },
        {
          id: 86,
          domain: 'Advanced Math',
          question:
            'If f(x) = x² + 2x, what is f(x + 1) - f(x)?',
          choices: ['2x + 3', '2x + 1', 'x + 3', '2x'],
          correctIndex: 0,
          explanation:
            'f(x + 1) = (x + 1)² + 2(x + 1) = x² + 2x + 1 + 2x + 2 = x² + 4x + 3. Subtract f(x) = x² + 2x: (x² + 4x + 3) - (x² + 2x) = 2x + 3.',
        },
        {
          id: 87,
          domain: 'Geometry and Trigonometry',
          question:
            'In a right triangle, the angle θ has an adjacent side of length 4 and a hypotenuse of length 5. What is cos θ?',
          choices: ['3/5', '4/5', '5/4', '3/4'],
          correctIndex: 1,
          explanation:
            'Cosine = adjacent / hypotenuse = 4 / 5.',
        },
        {
          id: 88,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A scatterplot of study time versus test score shows a strong positive linear association. A line of best fit is y = 8x + 50, where x is hours studied and y is the score. What score does the model predict for 5 hours of study?',
          choices: ['80', '85', '90', '95'],
          correctIndex: 2,
          explanation:
            'Substitute x = 5: y = 8(5) + 50 = 40 + 50 = 90.',
        },
        {
          id: 89,
          domain: 'Algebra',
          question:
            'A phone plan costs $20 per month plus $0.10 per text message. If a customer\'s bill for one month was $35, how many text messages did they send?',
          choices: ['100', '120', '150', '180'],
          correctIndex: 2,
          explanation:
            'Let t be the number of texts. 20 + 0.10t = 35, so 0.10t = 15 and t = 150.',
        },
        {
          id: 90,
          domain: 'Advanced Math',
          question:
            'What is the vertex of the parabola y = (x - 2)² + 3?',
          choices: ['(2, 3)', '(-2, 3)', '(2, -3)', '(3, 2)'],
          correctIndex: 0,
          explanation:
            'In vertex form y = (x - h)² + k, the vertex is (h, k). Here h = 2 and k = 3, so the vertex is (2, 3).',
        },
        {
          id: 91,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A quantity increases from 40 to 50. What is the percent increase?',
          choices: ['10%', '20%', '25%', '40%'],
          correctIndex: 2,
          explanation:
            'The increase is 50 - 40 = 10. Percent increase = 10 / 40 = 0.25 = 25%.',
        },
        {
          id: 92,
          domain: 'Geometry and Trigonometry',
          question:
            'The circumference of a circle is 10π. What is its radius?',
          choices: ['5', '10', '20', '25'],
          correctIndex: 0,
          explanation:
            'Circumference = 2πr, so 2πr = 10π. Dividing by 2π gives r = 5.',
        },
        {
          id: 93,
          domain: 'Algebra',
          question:
            'If 3x - 2y = 12 and y = 3, what is the value of x?',
          choices: ['4', '6', '8', '10'],
          correctIndex: 1,
          explanation:
            'Substitute y = 3: 3x - 2(3) = 12, so 3x - 6 = 12, 3x = 18, and x = 6.',
        },
        {
          id: 94,
          domain: 'Advanced Math',
          question:
            'Which expression is equivalent to (x² - 9) / (x - 3) for x ≠ 3?',
          choices: ['x - 3', 'x + 3', 'x² + 3', 'x - 9'],
          correctIndex: 1,
          explanation:
            'Factor the numerator as a difference of squares: x² - 9 = (x - 3)(x + 3). Canceling (x - 3) leaves x + 3.',
        },
        {
          id: 95,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'The table shows the number of books read by four students: 3, 7, 7, and 11. What is the median number of books read?',
          choices: ['6', '7', '8', '9'],
          correctIndex: 1,
          explanation:
            'With the values ordered as 3, 7, 7, 11, the median is the average of the two middle values: (7 + 7) / 2 = 7.',
        },
        {
          id: 96,
          domain: 'Algebra',
          question:
            'A rectangle\'s length is 3 more than twice its width w. If the perimeter is 36, what is the width w?',
          gridInAnswer: '5',
          explanation:
            'Length = 2w + 3. Perimeter = 2(length + width) = 2((2w + 3) + w) = 2(3w + 3) = 6w + 6 = 36. So 6w = 30 and w = 5.',
        },
        {
          id: 97,
          domain: 'Advanced Math',
          question:
            'If 2^x = 32, what is the value of x?',
          gridInAnswer: '5',
          explanation:
            '32 = 2⁵, so 2^x = 2⁵ means x = 5.',
        },
        {
          id: 98,
          domain: 'Geometry and Trigonometry',
          question:
            'A triangle has a base of 10 and a height of 6. What is its area?',
          gridInAnswer: '30',
          explanation:
            'Area of a triangle = (1/2) × base × height = (1/2)(10)(6) = 30.',
        },
      ],
    },
  ],
};
