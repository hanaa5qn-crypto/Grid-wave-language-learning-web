// =============================================================================
// Digital SAT — Practice Test 1 (original items, modeled on the College Board
// Digital SAT format).
// -----------------------------------------------------------------------------
// Structure: 4 sections — Reading & Writing Module 1, Reading & Writing Module 2,
// Math Module 1, Math Module 2. RW modules hold 27 short discrete questions each
// (54 total); Math modules hold 22 questions each (44 total) — 98 questions per
// test, matching the real Digital SAT. Ids are unique 1..98 across the whole test.
// =============================================================================
import { SatTest } from '../types';

export const SAT_TEST_1: SatTest = {
  id: 'sat-practice-1',
  title: 'Digital SAT — Practice Test 1',
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
            'Marine biologist Dr. Lena Ortiz noticed that the reef she studied seemed unusually ______ after the storm: fish that had once darted in every direction now clustered tightly around the few coral heads left standing.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['barren', 'vibrant', 'concentrated', 'colorful'],
          correctIndex: 2,
          explanation:
            'The clue is that fish now "clustered tightly around the few coral heads left standing." "Concentrated" matches this gathering into a small area. "Barren" ignores that fish are present; "vibrant" and "colorful" describe liveliness, not clustering.',
        },
        {
          id: 2,
          domain: 'Craft and Structure',
          passage:
            'The committee praised the proposal’s ______ structure: every section flowed into the next, and no point was raised without first being carefully prepared by the one before it.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['coherent', 'ornate', 'tentative', 'abrupt'],
          correctIndex: 0,
          explanation:
            '"Every section flowed into the next" describes logical connectedness, which is the meaning of "coherent." "Ornate" means decorated; "tentative" means hesitant; "abrupt" means sudden — the opposite of smooth flow.',
        },
        {
          id: 3,
          domain: 'Craft and Structure',
          passage:
            'Although the novel was marketed as a lighthearted comedy, critics found its humor strangely ______, noting how often a joke gave way to genuine grief.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['predictable', 'melancholy', 'exaggerated', 'repetitive'],
          correctIndex: 1,
          explanation:
            'The text contrasts "comedy" with "a joke gave way to genuine grief," so the humor carries sadness. "Melancholy" means sorrowful, fitting the contrast. The other options do not capture the shift to grief.',
        },
        {
          id: 4,
          domain: 'Craft and Structure',
          passage:
            'In her memoir, the engineer recalls being told that her ideas were too ______ to fund, yet within a decade nearly every untested notion she had proposed became standard practice.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['conventional', 'speculative', 'expensive', 'modest'],
          correctIndex: 1,
          explanation:
            'Her ideas were "untested" and "too ___ to fund," then later proven — they were unproven and theoretical at first. "Speculative" means based on conjecture rather than evidence. "Conventional" is the opposite of untested.',
        },
        {
          id: 5,
          domain: 'Craft and Structure',
          passage:
            'The following text is from Kate Chopin’s 1899 novel The Awakening. Edna, the protagonist, reflects on her changing sense of self.\n\n"A certain light was beginning to dawn dimly within her—the light which, showing the way, forbids it. At that early period it served but to bewilder her. It moved her to dreams, to thoughtfulness, to the shadowy anguish which had overcome her."',
          question: 'Which choice best describes the function of the underlined phrase "showing the way, forbids it"?',
          choices: [
            'It emphasizes that Edna has already chosen a clear course of action.',
            'It captures a paradox in Edna’s new awareness: it reveals a path she is not yet free to take.',
            'It suggests that Edna’s insight is false and will soon fade.',
            'It indicates that other characters are preventing Edna from acting.',
          ],
          correctIndex: 1,
          explanation:
            'The phrase pairs "showing the way" with "forbids it," a paradox: the dawning awareness reveals a possibility Edna cannot yet pursue, which is why it "bewilders" her. The passage gives no clear chosen course (A), no sign the insight is false (C), and no other characters (D).',
        },
        {
          id: 6,
          domain: 'Information and Ideas',
          passage:
            'A researcher measured how quickly two strains of bacteria, A and B, grew in identical nutrient broth. Strain A doubled every 20 minutes; strain B doubled every 35 minutes. Both began with the same small number of cells.',
          question:
            'Which choice best states the main conclusion supported by the data described?',
          choices: [
            'Strain B is more resistant to antibiotics than strain A.',
            'Strain A reproduces faster than strain B under these conditions.',
            'The nutrient broth favors strain B over strain A.',
            'Both strains stop growing after a fixed period.',
          ],
          correctIndex: 1,
          explanation:
            'A shorter doubling time (20 min vs. 35 min) means strain A multiplies faster. Antibiotic resistance (A) and a stopping point (D) are not discussed, and the broth was identical, so it does not favor B (C).',
        },
        {
          id: 7,
          domain: 'Information and Ideas',
          passage:
            'Archaeologists uncovered a 3,000-year-old storehouse containing thousands of clay seals but almost no written tablets. In neighboring sites of the same era, tablets are common. The team proposed that this community recorded transactions on perishable materials such as parchment, which rarely survives.',
          question:
            'Which finding, if true, would most strongly support the team’s proposal?',
          choices: [
            'The clay seals bear impressions of cords and folded surfaces consistent with sealed parchment documents.',
            'The storehouse was larger than those at neighboring sites.',
            'The clay used for the seals was imported from a distant region.',
            'No metal tools were found anywhere at the site.',
          ],
          correctIndex: 0,
          explanation:
            'Seals showing impressions of cords and folded parchment would be direct physical evidence that perishable documents once existed there, supporting the proposal. Storehouse size (B), clay origin (C), and absent tools (D) say nothing about perishable records.',
        },
        {
          id: 8,
          domain: 'Information and Ideas',
          passage:
            'Text 1: Economist Hararu argues that remote work raises productivity because employees avoid commutes and control their own schedules.\n\nText 2: Sociologist Veld counters that productivity gains from remote work fade over time as informal collaboration—the unplanned hallway conversations that spark ideas—disappears.',
          question:
            'Based on the texts, how would Veld (Text 2) most likely respond to the claim in Text 1?',
          choices: [
            'By agreeing that schedule control is the main driver of productivity.',
            'By arguing that early gains may not last because collaboration suffers.',
            'By denying that commuting affects productivity at all.',
            'By proposing that employees should never return to offices.',
          ],
          correctIndex: 1,
          explanation:
            'Veld concedes there are gains but says they "fade over time" as collaboration disappears — so Veld would say the early gains may not last. Veld does not endorse Text 1’s driver (A), dismiss commuting (C), or call for permanent remote work (D).',
        },
        {
          id: 9,
          domain: 'Information and Ideas',
          passage:
            'A study tracked the reading speed of 200 adults before and after a six-week course in skimming techniques. Average reading speed rose from 220 to 340 words per minute, while comprehension scores on a follow-up quiz remained essentially unchanged.',
          question:
            'Which choice best describes the relationship the data reveal?',
          choices: [
            'Faster reading came at the cost of much lower comprehension.',
            'Reading speed increased substantially while comprehension held steady.',
            'Comprehension improved more than reading speed.',
            'Neither reading speed nor comprehension changed.',
          ],
          correctIndex: 1,
          explanation:
            'Speed rose from 220 to 340 wpm (a substantial increase) while comprehension "remained essentially unchanged" — it held steady. The data show no drop in comprehension (A), no comprehension gain (C), and a clear speed change (D).',
        },
        {
          id: 10,
          domain: 'Information and Ideas',
          passage:
            'The naturalist John Muir wrote extensively about the Sierra Nevada. He believed wilderness had value beyond its usefulness to people, insisting that forests deserved protection for their own sake, not merely as sources of timber or recreation.',
          question:
            'Which quotation from Muir, if added, would best illustrate the claim made in the text?',
          choices: [
            '"The mountains are fountains of men as well as of rivers."',
            '"In every walk with nature one receives far more than he seeks."',
            '"A tree is worth more standing in its grove than felled for our use."',
            '"The clearest way into the Universe is through a forest wilderness."',
          ],
          correctIndex: 2,
          explanation:
            'The claim is that forests deserve protection "for their own sake, not merely as sources of timber." The quotation valuing a tree "standing" over "felled for our use" directly illustrates that intrinsic-value argument. The others praise nature’s benefits to people, which is what the claim sets aside.',
        },
        {
          id: 11,
          domain: 'Expression of Ideas',
          passage:
            'While researching urban beekeeping, a student took these notes:\n• Rooftop hives in cities can produce honey.\n• City flowers bloom across many months because gardens vary.\n• A longer bloom season gives bees more foraging time.\n• More foraging time can mean larger honey yields.',
          question:
            'The student wants to explain why city hives may yield a lot of honey. Which choice most effectively uses the notes to accomplish this goal?',
          choices: [
            'Rooftop hives are located in cities, where honey can be produced.',
            'City gardens vary, and bees forage; both facts relate to honey.',
            'Because varied city gardens bloom for many months, bees there have a long foraging season, which can lead to larger honey yields.',
            'Honey yields can be larger, and city flowers bloom in many months.',
          ],
          correctIndex: 2,
          explanation:
            'Choice C links the chain of notes—varied gardens → long bloom season → more foraging → larger yields—to answer "why." The other choices restate isolated facts without connecting them into the explanation the student wants.',
        },
        {
          id: 12,
          domain: 'Expression of Ideas',
          passage:
            'A writer is drafting a paragraph about a composer.\nSentence to revise: "The composer wrote symphonies. She also wrote film scores. Her film scores won several awards."',
          question:
            'Which choice most effectively combines the sentences into one clear sentence?',
          choices: [
            'The composer wrote symphonies, and she wrote film scores, and they won several awards.',
            'In addition to symphonies, the composer wrote award-winning film scores.',
            'The composer wrote symphonies; she also wrote film scores that won awards too.',
            'Writing symphonies, the composer’s film scores won several awards.',
          ],
          correctIndex: 1,
          explanation:
            'Choice B combines all three ideas concisely and clearly. Choice A is a stringy run-on of "and"s; C is wordy with a redundant "too"; D is a misplaced modifier suggesting the film scores wrote symphonies.',
        },
        {
          id: 13,
          domain: 'Expression of Ideas',
          passage:
            'Two sentences from a report:\n"The new bridge cut the average commute by twelve minutes. ______, traffic accidents at the old crossing dropped by nearly half."',
          question:
            'Which choice completes the text with the most logical transition?',
          choices: ['However', 'In addition', 'For example', 'Nevertheless'],
          correctIndex: 1,
          explanation:
            'Both sentences describe positive outcomes of the bridge, so an additive transition is needed. "In addition" signals another benefit. "However" and "Nevertheless" signal contrast; "For example" would require the second sentence to be an instance of the first, which it is not.',
        },
        {
          id: 14,
          domain: 'Expression of Ideas',
          passage:
            'From an essay on photography:\n"Early cameras required long exposures, so subjects had to hold perfectly still. ______, portrait sitters often used hidden braces to steady their heads."',
          question:
            'Which choice completes the text with the most logical transition?',
          choices: ['Nevertheless', 'As a result', 'In contrast', 'Meanwhile'],
          correctIndex: 1,
          explanation:
            'Needing to hold still caused sitters to use braces — a cause-and-effect relationship. "As a result" expresses this. The other transitions signal contrast or simultaneity, which do not fit a cause-effect link.',
        },
        {
          id: 15,
          domain: 'Standard English Conventions',
          passage:
            'After months of testing, the team finally released the software update, ______ fixed dozens of long-standing bugs.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['which', 'and it', 'that', 'it'],
          correctIndex: 0,
          explanation:
            'The clause adds nonessential information about the update and follows a comma, so the relative pronoun "which" is correct. "It" (D) creates a comma splice, "and it" (B) is wordy and would need different punctuation, and "that" (C) introduces an essential clause without the needed comma.',
        },
        {
          id: 16,
          domain: 'Standard English Conventions',
          passage:
            'The orchestra’s newest members, all of ______ trained at the same conservatory, brought a strikingly unified sound to the ensemble.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['who', 'whom', 'which', 'them'],
          correctIndex: 1,
          explanation:
            'The pronoun is the object of the preposition "of," so the objective form "whom" is correct ("all of whom"). "Who" is subjective; "which" is for things, not people; "them" cannot introduce the relative clause.',
        },
        {
          id: 17,
          domain: 'Standard English Conventions',
          passage:
            'Each of the volunteers who signed up for the cleanup ______ expected to bring a pair of gloves and a reusable bag.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['are', 'were', 'is', 'have been'],
          correctIndex: 2,
          explanation:
            'The subject is "Each," which is singular and takes a singular verb, so "is" is correct. The intervening phrase "of the volunteers who signed up" does not change the subject. "Are," "were," and "have been" are plural forms.',
        },
        {
          id: 18,
          domain: 'Standard English Conventions',
          passage:
            'The museum extended its hours for the popular exhibit ______ visitors lined up before dawn to see the rare manuscripts.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [', and', '; however,', ': ', ', '],
          correctIndex: 0,
          explanation:
            'Two independent clauses ("The museum extended its hours…" and "visitors lined up…") must be joined by a comma plus a coordinating conjunction, so ", and" is correct. "; however," needs a comma after it but would still be a fragment join here, ": " misuses the colon, and ", " alone creates a comma splice.',
        },
        {
          id: 19,
          domain: 'Standard English Conventions',
          passage:
            'The committee reviewed the architect’s plans and approved ______ without requesting a single change.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['it', 'them', 'they', 'those ones'],
          correctIndex: 1,
          explanation:
            'The pronoun refers to "plans," which is plural, and it functions as a direct object, so "them" is correct. "It" is singular, "they" is subjective, and "those ones" is nonstandard.',
        },
        {
          id: 20,
          domain: 'Standard English Conventions',
          passage:
            'Having rehearsed for weeks, ______ on opening night flowed without a single missed cue.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [
            'the performance the cast gave',
            'the cast gave a performance that',
            'the cast’s performance',
            'it was the cast that gave a performance which',
          ],
          correctIndex: 1,
          explanation:
            'The opening modifier "Having rehearsed for weeks" must describe the cast — the ones who rehearsed. Choice B places "the cast" right after the comma, correctly. The other options make "the performance" the subject, illogically implying the performance rehearsed itself.',
        },
        {
          id: 21,
          domain: 'Standard English Conventions',
          passage:
            'The startup’s success depended on three factors: a clear market need, a dedicated team, ______ enough funding to last two years.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['and', ', and', 'as well as having', 'plus'],
          correctIndex: 1,
          explanation:
            'A list of three items uses commas between items, including the comma before the final "and" (the serial comma), so ", and" is correct. "And" alone omits the needed comma; "as well as having" and "plus" break the parallel three-item list structure.',
        },
        {
          id: 22,
          domain: 'Craft and Structure',
          passage:
            'A skeptic might dismiss folk remedies as mere superstition. Yet many traditional plant-based treatments contain compounds that modern pharmacology has since isolated and verified as genuinely active.',
          question: 'As used in the text, what does the word "active" most nearly mean?',
          choices: ['energetic', 'effective', 'restless', 'current'],
          correctIndex: 1,
          explanation:
            'Compounds verified by pharmacology as "active" are those that actually work — that are "effective." "Energetic" and "restless" describe behavior, and "current" means present-day, none of which fit a medicinal compound.',
        },
        {
          id: 23,
          domain: 'Craft and Structure',
          passage:
            'The editor’s revisions were anything but heavy-handed; she made only the lightest of changes, trimming a redundant word here, smoothing an awkward phrase there.',
          question: 'As used in the text, what does the phrase "heavy-handed" most nearly mean?',
          choices: ['physically strong', 'clumsy and excessive', 'slow and careful', 'generous'],
          correctIndex: 1,
          explanation:
            'The text contrasts "heavy-handed" with "the lightest of changes," so heavy-handed means overdoing it — clumsy and excessive. The other options do not capture the sense of overbearing intervention being denied.',
        },
        {
          id: 24,
          domain: 'Information and Ideas',
          passage:
            'In a controlled trial, gardeners who played recorded birdsong near their seedlings reported faster growth. However, those gardens also received more frequent watering, since the gardeners visited more often to change the recordings.',
          question:
            'Which choice best describes a weakness in concluding that birdsong caused the faster growth?',
          choices: [
            'The seedlings were not actually measured for height.',
            'Increased watering, not birdsong, may explain the faster growth.',
            'Birdsong is known to harm plants.',
            'The trial included too many gardeners.',
          ],
          correctIndex: 1,
          explanation:
            'The gardens with birdsong also got more water, so watering is a confounding variable that could explain the growth instead of the birdsong. The text does not say seedlings went unmeasured (A), that birdsong harms plants (C), or that the sample was too large (D).',
        },
        {
          id: 25,
          domain: 'Information and Ideas',
          passage:
            'Researchers compared two teaching methods. Group X learned vocabulary through spaced review sessions; Group Y crammed the same words in one long session. A week later, Group X recalled 78% of the words and Group Y recalled 41%.',
          question:
            'Which statement is best supported by the results?',
          choices: [
            'Cramming produces better long-term recall than spaced review.',
            'Spaced review led to better week-later recall than cramming did.',
            'Both methods produced identical recall after a week.',
            'Group Y studied for fewer total minutes than Group X.',
          ],
          correctIndex: 1,
          explanation:
            'After a week, the spaced-review group recalled far more (78% vs. 41%), supporting that spaced review produced better delayed recall. This contradicts A and C, and total study time was equal ("the same words"), not addressed by D.',
        },
        {
          id: 26,
          domain: 'Craft and Structure',
          passage:
            'The poet’s later work abandoned strict rhyme entirely, embracing instead a loose, conversational free verse that mirrored the rhythms of ordinary speech.',
          question:
            'Which choice best states the main idea of the text?',
          choices: [
            'The poet’s later work shifted from strict rhyme to speech-like free verse.',
            'The poet stopped writing poetry altogether.',
            'Ordinary speech is more poetic than rhymed verse.',
            'The poet’s early work was more popular than the later work.',
          ],
          correctIndex: 0,
          explanation:
            'The sentence describes a change — abandoning rhyme for conversational free verse — which choice A summarizes. The text does not say the poet quit (B), rank speech over rhyme generally (C), or compare popularity (D).',
        },
        {
          id: 27,
          domain: 'Expression of Ideas',
          passage:
            'A student is writing about a coral restoration project and has these notes:\n• Volunteers grew coral fragments in underwater nurseries.\n• Healthy fragments were later transplanted onto damaged reefs.\n• After two years, fish populations on the restored reefs rose by 60%.',
          question:
            'The student wants to emphasize a measurable result of the project. Which choice best uses the notes to accomplish this goal?',
          choices: [
            'Volunteers grew coral fragments in underwater nurseries before transplanting them.',
            'Two years after fragments were transplanted onto damaged reefs, fish populations there rose by 60%.',
            'The project involved nurseries, transplanting, and fish.',
            'Coral restoration is an activity that volunteers can take part in.',
          ],
          correctIndex: 1,
          explanation:
            'A "measurable result" is best captured by the 60% rise in fish populations, which choice B foregrounds with its specific figure and timeframe. The other choices describe the process or speak generally without highlighting a measured outcome.',
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
            'Far from being ______, the desert at night teems with activity: foxes, owls, and insects emerge once the punishing daytime heat finally relents.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['lifeless', 'crowded', 'humid', 'silent'],
          correctIndex: 0,
          explanation:
            '"Far from being ___" sets up a contrast with "teems with activity," so the blank needs the opposite of lively — "lifeless." "Crowded" matches activity rather than contrasting it; "humid" and "silent" are not directly contradicted by the list of active animals.',
        },
        {
          id: 29,
          domain: 'Craft and Structure',
          passage:
            'The diplomat was known for her ______ remarks; she could convey disapproval so subtly that listeners often realized only later that they had been criticized.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['blunt', 'understated', 'lengthy', 'cheerful'],
          correctIndex: 1,
          explanation:
            'Conveying disapproval "so subtly" that it goes unnoticed at first describes "understated" remarks. "Blunt" is the opposite of subtle; "lengthy" and "cheerful" do not relate to subtlety of criticism.',
        },
        {
          id: 30,
          domain: 'Craft and Structure',
          passage:
            'Critics initially viewed the architect’s curved, irregular buildings as ______, but the same forms are now celebrated as visionary and widely imitated.',
          question:
            'Which choice completes the text with the most logical and precise word or phrase?',
          choices: ['flawless', 'eccentric', 'traditional', 'affordable'],
          correctIndex: 1,
          explanation:
            'The contrast "initially viewed as ___, but now celebrated as visionary" needs an initially negative judgment. "Eccentric" (odd, unconventional) fits that early skepticism. "Flawless" and "traditional" are not negative criticisms, and "affordable" is unrelated.',
        },
        {
          id: 31,
          domain: 'Information and Ideas',
          passage:
            'The following text is adapted from Mary Shelley’s 1818 novel Frankenstein. Victor Frankenstein describes his state of mind.\n\n"I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body. For this I had deprived myself of rest and health. I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart."',
          question:
            'Which choice best describes the shift that occurs in the text?',
          choices: [
            'From scientific curiosity to financial worry.',
            'From intense longing to sudden revulsion.',
            'From physical exhaustion to renewed energy.',
            'From doubt about the project to confidence in it.',
          ],
          correctIndex: 1,
          explanation:
            'Victor first describes desiring his goal "with an ardour" (intense longing), then, once finished, feeling "horror and disgust" (revulsion). That is the shift in B. There is no mention of finances (A), renewed energy (C), or growing confidence (D).',
        },
        {
          id: 32,
          domain: 'Information and Ideas',
          passage:
            'A team studied whether adding reflective white roofs to buildings lowers indoor temperatures. In a summer trial, buildings with white roofs averaged 4°C cooler indoors than identical buildings with dark roofs.',
          question:
            'Which choice best states the conclusion supported by the data?',
          choices: [
            'White roofs increase indoor temperatures in summer.',
            'White roofs had no measurable effect on indoor temperature.',
            'White roofs were associated with cooler indoor temperatures in summer.',
            'Dark roofs are cheaper to install than white roofs.',
          ],
          correctIndex: 2,
          explanation:
            'Buildings with white roofs were 4°C cooler, so white roofs were associated with lower indoor temperatures. This contradicts A and B, and the study says nothing about installation cost (D).',
        },
        {
          id: 33,
          domain: 'Information and Ideas',
          passage:
            'Text 1: Historian Park contends that the printing press spread literacy mainly by making books cheaper, putting them within reach of ordinary households.\n\nText 2: Historian Ngo emphasizes instead that printing standardized spelling and grammar, which made reading easier to learn in the first place.',
          question:
            'Based on the texts, Park and Ngo would most likely agree with which statement?',
          choices: [
            'The printing press played an important role in spreading literacy.',
            'Cheaper books were the only cause of rising literacy.',
            'Standardized spelling had no effect on learning to read.',
            'Literacy was already widespread before the printing press.',
          ],
          correctIndex: 0,
          explanation:
            'Both historians credit the printing press with spreading literacy, differing only on the mechanism, so they agree on its importance (A). Each would reject the other’s being the "only" cause (B), Ngo rejects C, and neither claims pre-existing widespread literacy (D).',
        },
        {
          id: 34,
          domain: 'Information and Ideas',
          passage:
            'A botanist hypothesized that a certain vine grows toward sound. To test this, she played a steady tone from one side of each plant for three weeks while keeping light, water, and temperature equal on both sides.',
          question:
            'Which result would most strongly support the botanist’s hypothesis?',
          choices: [
            'The vines grew equally in all directions.',
            'The vines grew noticeably toward the side where the tone played.',
            'The vines grew toward the brightest light source.',
            'The vines grew more slowly than vines in a separate garden.',
          ],
          correctIndex: 1,
          explanation:
            'If the vines grew toward the tone, with light and other factors held equal, sound is the only differing variable that could explain the direction — supporting the hypothesis. Equal growth (A) refutes it; light (C) was held equal; overall speed (D) is irrelevant to direction.',
        },
        {
          id: 35,
          domain: 'Information and Ideas',
          passage:
            'The essayist argued that curiosity, not raw talent, is the strongest predictor of long-term achievement, because curious people keep learning long after others have stopped.',
          question: 'Which choice best states the main claim of the text?',
          choices: [
            'Talent is irrelevant to achievement.',
            'Curiosity predicts long-term achievement better than talent does.',
            'Curious people are born more talented than others.',
            'Achievement is impossible without formal education.',
          ],
          correctIndex: 1,
          explanation:
            'The essayist claims curiosity is a stronger predictor of achievement than talent. Choice B captures this. The text says curiosity beats talent, not that talent is "irrelevant" (A); it does not equate curiosity with innate talent (C) or mention formal education (D).',
        },
        {
          id: 36,
          domain: 'Information and Ideas',
          passage:
            'A consumer group tested twelve brands of rechargeable batteries. The five most expensive brands lasted, on average, 410 charge cycles, while the five cheapest lasted 395 cycles—a difference the group called "negligible for most users."',
          question:
            'Which statement is best supported by the data?',
          choices: [
            'Expensive batteries last far longer than cheap ones.',
            'The most expensive batteries lasted only slightly longer than the cheapest.',
            'Cheap batteries cannot be recharged.',
            'Battery price has no relationship to performance whatsoever.',
          ],
          correctIndex: 1,
          explanation:
            '410 versus 395 cycles is a small gap the group itself called "negligible," so the costlier batteries lasted only slightly longer (B). The gap is not large (A), cheap batteries clearly recharge (C), and a small consistent difference does not prove "no relationship whatsoever" (D).',
        },
        {
          id: 37,
          domain: 'Expression of Ideas',
          passage:
            'A student researching tide pools compiled these notes:\n• Tide pools form in rocky shorelines at low tide.\n• Creatures there endure rapid changes in temperature and salinity.\n• Many tide-pool animals can survive being briefly exposed to air.\n• This toughness lets them live where few other species can.',
          question:
            'The student wants to highlight why tide-pool creatures are notably hardy. Which choice best uses the notes to accomplish this goal?',
          choices: [
            'Tide pools form at low tide in rocky shorelines.',
            'Because tide-pool animals endure swings in temperature and salinity and even brief air exposure, they can live where few other species survive.',
            'Some animals live in tide pools, which form at low tide.',
            'Tide-pool animals are notable, and tide pools are rocky.',
          ],
          correctIndex: 1,
          explanation:
            'Choice B ties the hardships (temperature, salinity, air exposure) to the conclusion that the animals thrive where few others can, directly explaining their hardiness. The other choices describe location or restate facts without making the point about toughness.',
        },
        {
          id: 38,
          domain: 'Expression of Ideas',
          passage:
            'Sentences to combine:\n"The library digitized its rare maps. The maps are now available online. Anyone can study them from home."',
          question:
            'Which choice most effectively combines the sentences into one clear sentence?',
          choices: [
            'The library digitized its rare maps, which are now available online for anyone to study from home.',
            'The library digitized its rare maps, and the maps are online, and people study them.',
            'Digitized by the library, anyone can now study the rare maps from home online.',
            'The library digitized its rare maps; they are online; study them from home.',
          ],
          correctIndex: 0,
          explanation:
            'Choice A combines all three ideas smoothly with a relative clause. Choice B is a stringy run-on; C dangles the modifier "Digitized by the library" so it seems to describe "anyone"; D is choppy and shifts to a command.',
        },
        {
          id: 39,
          domain: 'Expression of Ideas',
          passage:
            'From a science article:\n"The probe collected data for eleven years, far longer than its planned two-year mission. ______, engineers had to invent new ways to keep its aging instruments running."',
          question:
            'Which choice completes the text with the most logical transition?',
          choices: ['Consequently', 'Nonetheless', 'For instance', 'Similarly'],
          correctIndex: 0,
          explanation:
            'The probe lasting far beyond plan caused engineers to improvise — a cause-and-effect relationship that "Consequently" expresses. "Nonetheless" signals contrast, "For instance" an example, and "Similarly" a likeness, none of which fit.',
        },
        {
          id: 40,
          domain: 'Expression of Ideas',
          passage:
            'From a history essay:\n"The treaty ended the immediate fighting. ______, it left several border disputes unresolved, and these would spark conflict again within a generation."',
          question:
            'Which choice completes the text with the most logical transition?',
          choices: ['Therefore', 'However', 'Likewise', 'In short'],
          correctIndex: 1,
          explanation:
            'The treaty ended fighting (positive) but left disputes that caused future conflict (negative) — a contrast best signaled by "However." "Therefore" and "Likewise" imply continuation or similarity, and "In short" introduces a summary, none of which fit the reversal.',
        },
        {
          id: 41,
          domain: 'Standard English Conventions',
          passage:
            'The chef garnished each plate with microgreens, ______ added both color and a peppery bite to the dish.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['they', 'which', 'and', 'that'],
          correctIndex: 1,
          explanation:
            'A nonessential clause after a comma describing the microgreens needs the relative pronoun "which." "They" creates a comma splice, "and" would need a different structure, and "that" introduces an essential clause without the comma.',
        },
        {
          id: 42,
          domain: 'Standard English Conventions',
          passage:
            'Neither the lead actor nor the supporting performers ______ available for the early rehearsal on Monday.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['was', 'is', 'were', 'has been'],
          correctIndex: 2,
          explanation:
            'In "neither…nor" constructions, the verb agrees with the nearer subject, which here is the plural "performers," so "were" is correct. "Was," "is," and "has been" are singular and would clash with "performers."',
        },
        {
          id: 43,
          domain: 'Standard English Conventions',
          passage:
            'The research station, ______ located on a remote Antarctic plateau, relies entirely on solar and wind power during the long summer days.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['its', 'it’s', 'its’', 'it is'],
          correctIndex: 1,
          explanation:
            'The sentence needs "it is," and the contraction "it’s" supplies it: "the research station, it’s located…" reads as "it is located." "Its" is possessive, "its’" is not a word, and "it is" spelled out would make the nonessential aside awkward where the contraction is standard.',
        },
        {
          id: 44,
          domain: 'Standard English Conventions',
          passage:
            'By the time the volunteers arrived, the flood ______ already swept away most of the temporary barriers.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['has', 'had', 'have', 'having'],
          correctIndex: 1,
          explanation:
            'An action completed before another past event ("By the time the volunteers arrived") requires the past perfect "had swept." "Has" is present perfect, "have" disagrees with the singular "flood," and "having" is nonfinite and cannot serve as the main verb.',
        },
        {
          id: 45,
          domain: 'Standard English Conventions',
          passage:
            'The hikers reached the summit at dawn ______ they paused to watch the sun rise over the valley.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [', where', ', and where', 'where', ', there'],
          correctIndex: 0,
          explanation:
            'A nonessential clause describing the summit, set off by a comma and introduced by "where," is correct: ", where they paused…". "Where" with no comma (C) makes the clause essential and changes the meaning, ", and where" is redundant, and ", there" creates a comma splice.',
        },
        {
          id: 46,
          domain: 'Standard English Conventions',
          passage:
            'The novelist’s three best-known books—a mystery, a memoir, and a collection of essays—______ all written within a single remarkably productive decade.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: ['was', 'is', 'were', 'has been'],
          correctIndex: 2,
          explanation:
            'The subject is "books," which is plural, so the plural verb "were" is correct. The dash-enclosed list does not change the subject. "Was," "is," and "has been" are singular.',
        },
        {
          id: 47,
          domain: 'Standard English Conventions',
          passage:
            'To prepare for the marathon, ______ a strict schedule of long runs, rest days, and careful nutrition.',
          question:
            'Which choice completes the text so that it conforms to the conventions of Standard English?',
          choices: [
            'a strict schedule was followed by the runner',
            'the runner followed',
            'the schedule was strict for the runner who followed',
            'it was the runner who followed',
          ],
          correctIndex: 1,
          explanation:
            'The introductory phrase "To prepare for the marathon" must describe the runner, the one preparing. Choice B puts "the runner" right after the comma. The other choices make a schedule or "it" the subject, leaving the modifier dangling.',
        },
        {
          id: 48,
          domain: 'Craft and Structure',
          passage:
            'The senator’s speech was praised for its candor; rather than dodge the difficult question, she addressed it head-on, admitting the policy’s flaws as readily as its strengths.',
          question: 'As used in the text, what does the word "candor" most nearly mean?',
          choices: ['humor', 'frankness', 'caution', 'eloquence'],
          correctIndex: 1,
          explanation:
            'The senator did not dodge the question and openly "admitt[ed] the policy’s flaws," which is honest, frank behavior — the meaning of "candor." "Humor," "caution," and "eloquence" do not capture this directness and honesty.',
        },
        {
          id: 49,
          domain: 'Craft and Structure',
          passage:
            'The bridge’s design is deceptively simple. Beneath its plain exterior lies an intricate network of cables, each calibrated to bear a precise share of the load.',
          question: 'As used in the text, what does the word "deceptively" most nearly mean?',
          choices: [
            'in a way that misleads',
            'in a dishonest manner',
            'attractively',
            'temporarily',
          ],
          correctIndex: 0,
          explanation:
            'The design "looks" simple but actually hides intricate engineering, so "deceptively" means in a way that misleads the eye. The bridge is not dishonest (B), and "attractively" (C) and "temporarily" (D) do not fit the contrast between appearance and reality.',
        },
        {
          id: 50,
          domain: 'Information and Ideas',
          passage:
            'A city installed sensors that dimmed streetlights when no motion was detected. Over a year, the city’s energy use for street lighting fell by 30%, while reported nighttime accidents stayed the same as the previous year.',
          question:
            'Which choice is best supported by the information given?',
          choices: [
            'The motion-sensing lights reduced energy use without a measured rise in accidents.',
            'The motion-sensing lights caused more accidents.',
            'Energy use rose after the sensors were installed.',
            'The sensors failed to detect any motion.',
          ],
          correctIndex: 0,
          explanation:
            'Energy use dropped 30% and accidents "stayed the same," so the system cut energy without a measured increase in accidents (A). This contradicts B and C, and the lights still detected motion to dim (D).',
        },
        {
          id: 51,
          domain: 'Information and Ideas',
          passage:
            'In a reading study, students who annotated texts by hand scored higher on comprehension tests than students who only highlighted. The researchers suggested that writing notes forces deeper processing of the material.',
          question:
            'Which finding would most weaken the researchers’ suggested explanation?',
          choices: [
            'Hand-annotating students also happened to spend twice as long with the texts.',
            'Highlighting students used brightly colored markers.',
            'Both groups read the same passages.',
            'The comprehension test was multiple choice.',
          ],
          correctIndex: 0,
          explanation:
            'If the annotating group also spent twice as long reading, the extra time—not deeper processing—could explain their higher scores, weakening the explanation. The marker color (B), identical passages (C), and test format (D) do not undermine the claim.',
        },
        {
          id: 52,
          domain: 'Information and Ideas',
          passage:
            'The poet Emily Dickinson rarely published during her lifetime, yet she wrote nearly 1,800 poems, most discovered only after her death. Her reputation as a major American poet rests almost entirely on this posthumous discovery.',
          question:
            'Which detail from the text best supports the idea that Dickinson’s fame came mainly after she died?',
          choices: [
            'She wrote nearly 1,800 poems.',
            'Most of her poems were discovered only after her death.',
            'She rarely published during her lifetime.',
            'She is considered a major American poet.',
          ],
          correctIndex: 1,
          explanation:
            'That most poems were "discovered only after her death" directly supports the claim that her fame is posthumous. The total count (A) and her status (D) do not address timing, and rarely publishing (C) is closer but does not by itself establish that recognition came after death.',
        },
        {
          id: 53,
          domain: 'Expression of Ideas',
          passage:
            'A student gathered these notes for a profile:\n• Dr. Amani designs prosthetic limbs.\n• Her newest design uses lightweight carbon fiber.\n• The carbon-fiber limb weighs half as much as earlier models.\n• Lighter limbs reduce fatigue for the people who wear them.',
          question:
            'The student wants to explain a benefit of Dr. Amani’s newest design. Which choice best uses the notes to accomplish this goal?',
          choices: [
            'Dr. Amani designs prosthetic limbs from various materials.',
            'Dr. Amani’s newest limb, made of carbon fiber, weighs half as much as earlier models, reducing fatigue for wearers.',
            'Carbon fiber is lightweight, and Dr. Amani is a designer.',
            'Dr. Amani designs limbs, and people wear them.',
          ],
          correctIndex: 1,
          explanation:
            'Choice B connects the new design’s lighter weight to its benefit—less fatigue for wearers—which is exactly the benefit the student wants to explain. The other choices list facts without identifying the benefit.',
        },
        {
          id: 54,
          domain: 'Expression of Ideas',
          passage:
            'From an essay on volcanoes:\n"Lava flows can destroy everything in their path. ______, the volcanic soil they leave behind is among the most fertile on Earth, drawing farmers back within a generation."',
          question:
            'Which choice completes the text with the most logical transition?',
          choices: ['Therefore', 'Yet', 'Likewise', 'In addition'],
          correctIndex: 1,
          explanation:
            'Destruction (negative) is contrasted with the fertile soil that follows (positive), a reversal best signaled by "Yet." "Therefore," "Likewise," and "In addition" all imply continuation or similarity rather than contrast.',
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
          question: 'If 3x + 7 = 22, what is the value of x?',
          choices: ['3', '5', '7', '15'],
          correctIndex: 1,
          explanation:
            'Subtract 7 from both sides: 3x = 22 − 7 = 15. Divide by 3: x = 5.',
        },
        {
          id: 56,
          domain: 'Algebra',
          question:
            'A taxi charges a flat fee of $3.00 plus $2.00 per mile. Which equation gives the total cost c, in dollars, for a ride of m miles?',
          choices: ['c = 3m + 2', 'c = 2m + 3', 'c = 5m', 'c = 2m − 3'],
          correctIndex: 1,
          explanation:
            'The flat fee $3.00 is constant and the per-mile charge $2.00 multiplies the miles m, giving c = 2m + 3. Choice A swaps the coefficients; C ignores the structure; D subtracts the fee incorrectly.',
        },
        {
          id: 57,
          domain: 'Algebra',
          question: 'The line y = −2x + 5 is graphed in the xy-plane. What is the slope of the line?',
          choices: ['−2', '2', '5', '−5'],
          correctIndex: 0,
          explanation:
            'In slope-intercept form y = mx + b, the slope is m. Here m = −2, so the slope is −2. The value 5 is the y-intercept, not the slope.',
        },
        {
          id: 58,
          domain: 'Algebra',
          question:
            'If 5(x − 2) = 3x + 4, what is the value of x?',
          choices: ['3', '5', '7', '9'],
          correctIndex: 2,
          explanation:
            'Distribute: 5x − 10 = 3x + 4. Subtract 3x: 2x − 10 = 4. Add 10: 2x = 14. Divide by 2: x = 7.',
        },
        {
          id: 59,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A shirt originally priced at $40 is on sale for 25% off. What is the sale price, in dollars?',
          choices: ['$10', '$15', '$30', '$32'],
          correctIndex: 2,
          explanation:
            '25% of $40 is 0.25 × 40 = $10 off, so the sale price is 40 − 10 = $30. Choice A is the discount amount, not the price.',
        },
        {
          id: 60,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'The ratio of cats to dogs at a shelter is 3 to 5. If there are 15 cats, how many dogs are there?',
          choices: ['9', '20', '25', '5'],
          correctIndex: 2,
          explanation:
            'The ratio 3:5 with 15 cats means each ratio unit equals 15 ÷ 3 = 5 animals. Dogs = 5 units × 5 = 25. So there are 25 dogs.',
        },
        {
          id: 61,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A car travels 150 miles in 3 hours at a constant speed. At this rate, how many miles will it travel in 5 hours?',
          choices: ['200', '250', '300', '450'],
          correctIndex: 1,
          explanation:
            'The speed is 150 ÷ 3 = 50 miles per hour. In 5 hours it travels 50 × 5 = 250 miles.',
        },
        {
          id: 62,
          domain: 'Advanced Math',
          question: 'What is the value of (x² − 9) when x = 4?',
          choices: ['7', '5', '16', '25'],
          correctIndex: 0,
          explanation:
            'Substitute x = 4: 4² − 9 = 16 − 9 = 7.',
        },
        {
          id: 63,
          domain: 'Advanced Math',
          question:
            'If f(x) = 2x² − 3x + 1, what is f(3)?',
          choices: ['10', '7', '13', '19'],
          correctIndex: 0,
          explanation:
            'f(3) = 2(3²) − 3(3) + 1 = 2(9) − 9 + 1 = 18 − 9 + 1 = 10.',
        },
        {
          id: 64,
          domain: 'Advanced Math',
          question:
            'The expression x² + 7x + 12 can be factored as which of the following?',
          choices: ['(x + 3)(x + 4)', '(x + 2)(x + 6)', '(x + 1)(x + 12)', '(x + 5)(x + 2)'],
          correctIndex: 0,
          explanation:
            'Find two numbers that multiply to 12 and add to 7: 3 and 4. So x² + 7x + 12 = (x + 3)(x + 4). Checking: 3 × 4 = 12 and 3 + 4 = 7.',
        },
        {
          id: 65,
          domain: 'Geometry and Trigonometry',
          question:
            'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
          choices: ['10', '12', '14', '48'],
          correctIndex: 0,
          explanation:
            'By the Pythagorean theorem, hypotenuse = √(6² + 8²) = √(36 + 64) = √100 = 10.',
        },
        {
          id: 66,
          domain: 'Geometry and Trigonometry',
          question:
            'A circle has a radius of 5. What is its area? (Use A = πr².)',
          choices: ['10π', '25π', '5π', '50π'],
          correctIndex: 1,
          explanation:
            'Area = πr² = π(5²) = 25π. Choice A uses the diameter’s relation incorrectly; the area is 25π.',
        },
        {
          id: 67,
          domain: 'Geometry and Trigonometry',
          question:
            'Two angles of a triangle measure 50° and 60°. What is the measure of the third angle?',
          choices: ['60°', '70°', '80°', '110°'],
          correctIndex: 1,
          explanation:
            'The angles of a triangle sum to 180°. The third angle = 180 − (50 + 60) = 180 − 110 = 70°.',
        },
        {
          id: 68,
          domain: 'Algebra',
          question:
            'A system of equations is given: y = x + 1 and y = 2x − 3. What is the x-coordinate of the solution?',
          choices: ['2', '4', '5', '−2'],
          correctIndex: 1,
          explanation:
            'Set the expressions equal: x + 1 = 2x − 3. Subtract x: 1 = x − 3. Add 3: x = 4.',
        },
        {
          id: 69,
          domain: 'Algebra',
          question:
            'If 2(3x − 4) + 5 = 27, what is the value of x?',
          choices: ['3', '4', '5', '6'],
          correctIndex: 2,
          explanation:
            'Distribute: 6x − 8 + 5 = 27, so 6x − 3 = 27. Add 3: 6x = 30. Divide by 6: x = 5.',
        },
        {
          id: 70,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'In a class of 30 students, 18 play a sport. What percent of the students play a sport?',
          choices: ['40%', '50%', '60%', '72%'],
          correctIndex: 2,
          explanation:
            '18 out of 30 is 18 ÷ 30 = 0.6 = 60%.',
        },
        {
          id: 71,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'The mean of five numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?',
          choices: ['10', '12', '14', '16'],
          correctIndex: 1,
          explanation:
            'The five numbers sum to 5 × 12 = 60. The four known numbers sum to 8 + 10 + 14 + 16 = 48. The fifth number = 60 − 48 = 12.',
        },
        {
          id: 72,
          domain: 'Advanced Math',
          question:
            'If x² = 49 and x is negative, what is the value of x?',
          choices: ['7', '−7', '−49', '49'],
          correctIndex: 1,
          explanation:
            'The solutions to x² = 49 are x = 7 and x = −7. Since x is negative, x = −7.',
        },
        {
          id: 73,
          domain: 'Advanced Math',
          question:
            'Which of the following is equivalent to (x + 3)²?',
          choices: [
            'x² + 9',
            'x² + 6x + 9',
            'x² + 3x + 9',
            'x² + 6x + 6',
          ],
          correctIndex: 1,
          explanation:
            '(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9.',
        },
        {
          id: 74,
          domain: 'Geometry and Trigonometry',
          question:
            'A rectangle has a length of 9 and a width of 4. What is its perimeter?',
          choices: ['13', '26', '36', '40'],
          correctIndex: 1,
          explanation:
            'Perimeter = 2(length + width) = 2(9 + 4) = 2(13) = 26. Choice C (36) is the area, not the perimeter.',
        },
        {
          id: 75,
          domain: 'Algebra',
          question:
            'A grid-in: If 4x − 9 = 11, what is the value of x?',
          gridInAnswer: '5',
          explanation:
            'Add 9 to both sides: 4x = 20. Divide by 4: x = 5.',
        },
        {
          id: 76,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A grid-in: A recipe that serves 4 people requires 6 cups of flour. How many cups of flour are needed to serve 10 people, keeping the same ratio?',
          gridInAnswer: '15',
          explanation:
            'Flour per person = 6 ÷ 4 = 1.5 cups. For 10 people: 1.5 × 10 = 15 cups.',
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
          question:
            'A line passes through the points (0, 2) and (3, 11). What is the slope of the line?',
          choices: ['3', '9', '1/3', '13/3'],
          correctIndex: 0,
          explanation:
            'Slope = (11 − 2) / (3 − 0) = 9 / 3 = 3.',
        },
        {
          id: 78,
          domain: 'Algebra',
          question:
            'If 3x + 2y = 18 and x = 4, what is the value of y?',
          choices: ['2', '3', '4', '6'],
          correctIndex: 1,
          explanation:
            'Substitute x = 4: 3(4) + 2y = 18, so 12 + 2y = 18. Then 2y = 6 and y = 3.',
        },
        {
          id: 79,
          domain: 'Algebra',
          question:
            'The inequality 2x − 5 > 7 is given. Which of the following is the solution?',
          choices: ['x > 6', 'x < 6', 'x > 1', 'x < 1'],
          correctIndex: 0,
          explanation:
            'Add 5 to both sides: 2x > 12. Divide by 2: x > 6.',
        },
        {
          id: 80,
          domain: 'Advanced Math',
          question:
            'What are the solutions to the equation x² − 5x + 6 = 0?',
          choices: ['x = 2 and x = 3', 'x = 1 and x = 6', 'x = −2 and x = −3', 'x = 5 and x = 6'],
          correctIndex: 0,
          explanation:
            'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0, so x = 2 or x = 3. Check: 2 × 3 = 6 and 2 + 3 = 5, matching the equation.',
        },
        {
          id: 81,
          domain: 'Advanced Math',
          question:
            'If g(x) = x² + 4x, what is g(−2)?',
          choices: ['−4', '0', '4', '12'],
          correctIndex: 0,
          explanation:
            'g(−2) = (−2)² + 4(−2) = 4 − 8 = −4.',
        },
        {
          id: 82,
          domain: 'Advanced Math',
          question:
            'The expression (2x³)(3x²) is equivalent to which of the following?',
          choices: ['6x⁵', '5x⁵', '6x⁶', '5x⁶'],
          correctIndex: 0,
          explanation:
            'Multiply coefficients: 2 × 3 = 6. Add exponents of like bases: x³ × x² = x⁵. So the product is 6x⁵.',
        },
        {
          id: 83,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A population of bacteria doubles every hour. If it starts at 100 bacteria, how many will there be after 3 hours?',
          choices: ['300', '600', '800', '1000'],
          correctIndex: 2,
          explanation:
            'Doubling each hour: after 1 hour 200, after 2 hours 400, after 3 hours 800. (Equivalently 100 × 2³ = 100 × 8 = 800.)',
        },
        {
          id: 84,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A store sells pens for $1.20 each. If sales tax is 5%, what is the total cost of one pen including tax?',
          choices: ['$1.20', '$1.25', '$1.26', '$1.30'],
          correctIndex: 2,
          explanation:
            'Tax = 5% of $1.20 = 0.05 × 1.20 = $0.06. Total = 1.20 + 0.06 = $1.26.',
        },
        {
          id: 85,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'The table shows a linear relationship. When x = 1, y = 5; when x = 2, y = 8; when x = 3, y = 11. What is y when x = 5?',
          choices: ['14', '15', '17', '20'],
          correctIndex: 2,
          explanation:
            'y increases by 3 each time x increases by 1, so y = 3x + 2. When x = 5: y = 3(5) + 2 = 17. (Check: x = 1 gives 5, correct.)',
        },
        {
          id: 86,
          domain: 'Geometry and Trigonometry',
          question:
            'A cube has an edge length of 4. What is its volume?',
          choices: ['16', '48', '64', '96'],
          correctIndex: 2,
          explanation:
            'Volume of a cube = edge³ = 4³ = 64.',
        },
        {
          id: 87,
          domain: 'Geometry and Trigonometry',
          question:
            'In a right triangle, the angle θ has an opposite side of length 3 and a hypotenuse of length 5. What is sin θ?',
          choices: ['3/5', '4/5', '5/3', '3/4'],
          correctIndex: 0,
          explanation:
            'sin θ = opposite / hypotenuse = 3 / 5.',
        },
        {
          id: 88,
          domain: 'Geometry and Trigonometry',
          question:
            'A circle has a circumference of 12π. What is its radius? (Use C = 2πr.)',
          choices: ['3', '6', '12', '24'],
          correctIndex: 1,
          explanation:
            'C = 2πr, so 12π = 2πr. Divide both sides by 2π: r = 6.',
        },
        {
          id: 89,
          domain: 'Algebra',
          question:
            'If 7 − 2x = 3x − 8, what is the value of x?',
          choices: ['1', '3', '5', '−3'],
          correctIndex: 1,
          explanation:
            'Add 2x to both sides: 7 = 5x − 8. Add 8: 15 = 5x. Divide by 5: x = 3.',
        },
        {
          id: 90,
          domain: 'Algebra',
          question:
            'A phone plan costs $20 per month plus $0.10 per text message. If a customer’s bill for one month is $35, how many text messages did they send?',
          choices: ['100', '150', '200', '350'],
          correctIndex: 1,
          explanation:
            'Texting cost = 35 − 20 = $15. At $0.10 per text, number of texts = 15 ÷ 0.10 = 150.',
        },
        {
          id: 91,
          domain: 'Advanced Math',
          question:
            'Which of the following is equivalent to (x² − 4) / (x − 2), for x ≠ 2?',
          choices: ['x − 2', 'x + 2', 'x² − 2', 'x + 4'],
          correctIndex: 1,
          explanation:
            'Factor the numerator as a difference of squares: x² − 4 = (x − 2)(x + 2). Cancel (x − 2): the expression equals x + 2.',
        },
        {
          id: 92,
          domain: 'Advanced Math',
          question:
            'The function h(x) = 3ˣ is given. What is h(2)?',
          choices: ['6', '8', '9', '12'],
          correctIndex: 2,
          explanation:
            'h(2) = 3² = 9.',
        },
        {
          id: 93,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A bag contains 4 red marbles and 6 blue marbles. If one marble is drawn at random, what is the probability that it is red?',
          choices: ['2/5', '3/5', '1/4', '4/6'],
          correctIndex: 0,
          explanation:
            'There are 4 + 6 = 10 marbles total, 4 of which are red. P(red) = 4/10 = 2/5.',
        },
        {
          id: 94,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A quantity increases from 80 to 100. What is the percent increase?',
          choices: ['20%', '25%', '80%', '125%'],
          correctIndex: 1,
          explanation:
            'Percent increase = (increase / original) × 100 = (20 / 80) × 100 = 25%.',
        },
        {
          id: 95,
          domain: 'Geometry and Trigonometry',
          question:
            'A triangle has a base of 10 and a height of 6. What is its area?',
          choices: ['16', '30', '60', '24'],
          correctIndex: 1,
          explanation:
            'Area of a triangle = (1/2) × base × height = (1/2)(10)(6) = 30.',
        },
        {
          id: 96,
          domain: 'Advanced Math',
          question:
            'A grid-in: If (x + 1)² = 16 and x is positive, what is the value of x?',
          gridInAnswer: '3',
          explanation:
            'Take the square root: x + 1 = ±4. Since x is positive, x + 1 = 4, so x = 3. (The negative root gives x = −5, which is rejected.)',
        },
        {
          id: 97,
          domain: 'Algebra',
          question:
            'A grid-in: The equation of a line is y = 4x − 7. What is the value of y when x = 3?',
          gridInAnswer: '5',
          explanation:
            'Substitute x = 3: y = 4(3) − 7 = 12 − 7 = 5.',
        },
        {
          id: 98,
          domain: 'Problem-Solving and Data Analysis',
          question:
            'A grid-in: A jacket is discounted by 20% to a sale price of $48. What was the original price, in dollars?',
          gridInAnswer: '60',
          explanation:
            'After a 20% discount, the sale price is 80% of the original: 0.80 × original = 48. So original = 48 ÷ 0.80 = 60.',
        },
      ],
    },
  ],
};
