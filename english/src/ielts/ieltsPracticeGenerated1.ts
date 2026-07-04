// =============================================================================
// IELTS Academic — Generated Practice Set (Tests 3–7)
// -----------------------------------------------------------------------------
// Five complete IeltsTest objects conforming to the IeltsTest contract in
// ../../types. Content is transcribed from the verified practice-test source
// files under test-prep/ (ielts-listening-tests.md, ielts-reading-tests.md,
// ielts-writing-tests.md, ielts-speaking-tests.md), using source Tests 1–5.
// Each test here has exactly ONE reading passage, ONE listening section, two
// writing tasks, and three speaking parts (rather than the full 3-passage /
// 4-section paper structure used by the hand-authored ieltsTest1/2 files).
// =============================================================================
import { IeltsTest } from '../types';

// -----------------------------------------------------------------------------
// TEST 3 (source Test 1) — Reading: Bioluminescence · Listening: Sports centre
// membership · Writing: internet access / community service · Speaking: hometown
// & daily routine.
// -----------------------------------------------------------------------------
const TEST_3: IeltsTest = {
  id: 'ielts-academic-3',
  title: 'IELTS Practice Test 3',
  module: 'Academic',
  source: 'Generated practice set (verified)',

  reading: [
    {
      number: 1,
      title: 'The Chemistry of Living Light',
      text:
        "Bioluminescence, the production of light by living organisms, is one of nature's most striking chemical tricks. Unlike the light produced by a bulb, which wastes most of its energy as heat, bioluminescent light is remarkably efficient: nearly all of the energy released in the reaction is converted into visible light, with almost none lost as heat. This phenomenon occurs in fireflies, certain fungi, deep-sea fish, and a surprising number of marine bacteria, but it is in the ocean that bioluminescence reaches its greatest diversity. Scientists estimate that more than three-quarters of deep-sea animals, from jellyfish to squid, are capable of producing their own light.\n\nThe chemical basis of bioluminescence involves a molecule called luciferin and an enzyme called luciferase. When luciferin is oxidised in the presence of luciferase, it enters an excited state and then releases energy as a photon of light as it returns to its ground state. Different species use structurally different luciferins, which is why bioluminescent light can appear blue, green, yellow, or even red depending on the organism. Blue and green wavelengths dominate in the ocean because they travel furthest through seawater, making them the most useful colours for communication and hunting in the dark depths.\n\nMarine creatures use bioluminescence for a remarkable range of purposes. The anglerfish dangles a luminous lure above its mouth to attract unsuspecting prey close enough to swallow. Some species of squid release clouds of glowing ink instead of the usual dark ink, confusing predators long enough to escape. The cookie-cutter shark uses light emitted from its underside as a form of camouflage called counter-illumination: by matching the faint light filtering down from the surface, it becomes nearly invisible to predators lurking below. Meanwhile, certain species of ostracods, tiny crustaceans, release synchronised flashes of blue light purely to attract mates, a display so distinctive that experienced observers can identify the species from the pattern of flashes alone.\n\nBioluminescence is not confined to solitary organisms; it also arises through symbiosis. The Hawaiian bobtail squid houses colonies of the bacterium Vibrio fischeri in a specialised light organ. The bacteria receive nutrients and shelter, while the squid uses the bacterial glow for counter-illumination when hunting at night in shallow water. Remarkably, the squid can regulate the intensity of the bacterial light using a kind of internal shutter, adjusting brightness to match the moonlight above so that its silhouette casts no shadow visible to predators below.\n\nResearchers have long been interested in harnessing bioluminescent chemistry for practical use. The gene that codes for luciferase has been isolated and inserted into other organisms, including bacteria and plants, as a way of tracking gene expression in laboratories; when the gene of interest is active, the inserted luciferase gene lights up, giving researchers a visible signal without the need for radioactive tracers. Firefly luciferase, in particular, has become a standard tool in biomedical research, used in everything from studying tumour growth in mice to testing the effectiveness of new antibiotics, since bacteria can be engineered to glow only while alive, providing an instant readout of whether a drug has killed them.\n\nDespite decades of study, many aspects of bioluminescence remain poorly understood. Researchers are still uncertain why the trait evolved independently so many times — current estimates suggest at least forty separate evolutionary origins across different branches of life, an unusually high number for such a complex trait. Some biologists argue this repeated evolution reflects how useful light production is in an ocean where sunlight barely penetrates past a few hundred metres, making any capacity to generate one's own light a significant advantage, whether for hunting, hiding, or communicating in permanent darkness.",
      questions: [
        {
          id: 1,
          type: 'true-false-notgiven',
          prompt:
            'Bioluminescent reactions convert most of their energy into heat rather than light.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            '"nearly all of the energy released in the reaction is converted into visible light, with almost none lost as heat."',
        },
        {
          id: 2,
          type: 'true-false-notgiven',
          prompt: 'More than half of deep-sea animals can produce their own light.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"more than three-quarters of deep-sea animals... are capable of producing their own light" — three-quarters exceeds half.',
        },
        {
          id: 3,
          type: 'true-false-notgiven',
          prompt: 'All bioluminescent organisms use exactly the same luciferin molecule.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation: '"Different species use structurally different luciferins."',
        },
        {
          id: 4,
          type: 'true-false-notgiven',
          prompt:
            'The cookie-cutter shark uses light to make itself harder for predators to see from below.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            'The shark "uses light emitted from its underside as a form of camouflage called counter-illumination... it becomes nearly invisible to predators lurking below."',
        },
        {
          id: 5,
          type: 'true-false-notgiven',
          prompt:
            'Scientists have identified the precise evolutionary reason bioluminescence arose independently so many times.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            '"Researchers are still uncertain why the trait evolved independently so many times," which contradicts the claim.',
        },
        {
          id: 6,
          type: 'summary-completion',
          prompt:
            'The Hawaiian bobtail squid hosts bacteria called ____ inside a light organ.',
          answer: 'Vibrio fischeri',
          explanation: '"colonies of the bacterium Vibrio fischeri in a specialised light organ."',
        },
        {
          id: 7,
          type: 'summary-completion',
          prompt:
            'In exchange for nutrients and shelter, the bacteria provide light that the squid uses for ____ while hunting.',
          answer: 'counter-illumination',
          explanation: '"the squid uses the bacterial glow for counter-illumination when hunting."',
        },
        {
          id: 8,
          type: 'summary-completion',
          prompt:
            'The squid can control the brightness of this light using an internal ____.',
          answer: 'shutter',
          explanation: '"using a kind of internal shutter, adjusting brightness."',
        },
        {
          id: 9,
          type: 'summary-completion',
          prompt:
            'It adjusts the brightness to match the ____ above so it casts no visible shadow.',
          answer: 'moonlight',
          explanation: '"adjusting brightness to match the moonlight above."',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt:
            'Blue and green light dominate bioluminescence in the ocean mainly because',
          options: [
            'they are the easiest colours for luciferase to produce.',
            'they travel the farthest distance through seawater.',
            'predators cannot detect these wavelengths.',
            'they require the least chemical energy to produce.',
          ],
          answer: 'they travel the farthest distance through seawater.',
          explanation:
            '"blue and green wavelengths dominate in the ocean because they travel furthest through seawater."',
        },
        {
          id: 11,
          type: 'multiple-choice',
          prompt:
            'According to the passage, luciferase genes are inserted into other organisms in laboratories in order to',
          options: [
            'cure genetic diseases.',
            'produce new antibiotics.',
            'provide a visible marker of gene activity.',
            'replace radioactive materials in medicine.',
          ],
          answer: 'provide a visible marker of gene activity.',
          explanation:
            '"giving researchers a visible signal without the need for radioactive tracers" (tracking gene expression).',
        },
        {
          id: 12,
          type: 'multiple-choice',
          prompt:
            'Firefly luciferase is used in biomedical research to test antibiotics because',
          options: [
            'it makes bacteria glow only while they remain alive.',
            'it destroys bacteria on contact.',
            'it is cheaper than other laboratory chemicals.',
            'it works only in mammalian cells.',
          ],
          answer: 'it makes bacteria glow only while they remain alive.',
          explanation:
            '"bacteria can be engineered to glow only while alive, providing an instant readout of whether a drug has killed them."',
        },
        {
          id: 13,
          type: 'multiple-choice',
          prompt:
            'What does the passage suggest about the number of independent evolutionary origins of bioluminescence?',
          options: [
            'It is lower than in most other complex traits.',
            'It is unusually high for such a complex trait.',
            'It cannot be estimated with current methods.',
            'It occurred only in marine environments.',
          ],
          answer: 'It is unusually high for such a complex trait.',
          explanation: '"an unusually high number for such a complex trait."',
        },
      ],
    },
  ],

  listening: [
    {
      number: 1,
      title: 'Section 1: Joining Riverside Sports Centre',
      transcript:
        "RECEPTIONIST: Good morning, Riverside Sports Centre, how can I help you?\n\nCALLER: Hi, I'd like to ask about joining the centre. What membership options do you have?\n\nRECEPTIONIST: Sure. We have three types: Basic, which is gym only, that's twenty-eight pounds a month. Then Standard, which adds the swimming pool, that's thirty-nine pounds a month. And Premium, which includes all classes as well, at fifty-two pounds a month.\n\nCALLER: I think Standard would suit me. Do I need to pay a joining fee?\n\nRECEPTIONIST: Yes, there's a one-off joining fee of fifteen pounds, but that's waived if you sign up before the end of July.\n\nCALLER: Oh good, I'll do it today then. Can I take my name first — it's Daniel Foster.\n\nRECEPTIONIST: Thanks, Daniel. Can you spell your surname for me?\n\nCALLER: Yes, F-O-S-T-E-R.\n\nRECEPTIONIST: Great, and a contact number?\n\nCALLER: It's oh-seven-nine-oh-oh, four-four-one, two-two-three.\n\nRECEPTIONIST: Got it. And your date of birth?\n\nCALLER: Third of March, nineteen ninety-four.\n\nRECEPTIONIST: Thank you. Now, do you have a preferred start date?\n\nCALLER: Could I start on the fifteenth of this month?\n\nRECEPTIONIST: That's fine. One more thing — we ask new members to attend an induction session before using the pool. These run every Tuesday evening at seven.\n\nCALLER: That works for me.\n\nRECEPTIONIST: Lovely. I'll also need an emergency contact name.\n\nCALLER: Put down my sister, Claire Foster.\n\nRECEPTIONIST: Perfect. Last thing — how would you like to pay, by card or direct debit?\n\nCALLER: Direct debit, please, that's easier for the monthly payments.\n\nRECEPTIONIST: All set. Welcome to Riverside!",
      questions: [
        {
          id: 1,
          type: 'note-completion',
          prompt: 'Membership type chosen: ____',
          answer: 'Standard',
          explanation: '"I think Standard would suit me."',
        },
        {
          id: 2,
          type: 'note-completion',
          prompt: 'Monthly fee: £____',
          answer: ['39', 'thirty-nine'],
          explanation:
            '"Standard, which adds the swimming pool, that\'s thirty-nine pounds a month."',
        },
        {
          id: 3,
          type: 'note-completion',
          prompt: 'Surname: ____',
          answer: 'Foster',
          explanation: '"Yes, F-O-S-T-E-R."',
        },
        {
          id: 4,
          type: 'note-completion',
          prompt: 'Contact number: ____',
          answer: ['07900 441223', '0790 0441223'],
          explanation:
            '"It\'s oh-seven-nine-oh-oh, four-four-one, two-two-three."',
        },
        {
          id: 5,
          type: 'note-completion',
          prompt: 'Preferred start date: ____',
          answer: ['15th', 'fifteenth', '15'],
          explanation: '"Could I start on the fifteenth of this month?"',
        },
        {
          id: 6,
          type: 'note-completion',
          prompt: 'Induction sessions held: every ____ evening',
          answer: 'Tuesday',
          explanation: '"These run every Tuesday evening at seven."',
        },
        {
          id: 7,
          type: 'note-completion',
          prompt: 'Emergency contact: ____',
          answer: 'Claire Foster',
          explanation: '"Put down my sister, Claire Foster."',
        },
        {
          id: 8,
          type: 'multiple-choice',
          prompt: 'The joining fee will be',
          options: ['charged in full.', 'reduced by half.', 'waived completely.'],
          answer: 'waived completely.',
          explanation:
            '"there\'s a one-off joining fee of fifteen pounds, but that\'s waived if you sign up before the end of July."',
        },
        {
          id: 9,
          type: 'multiple-choice',
          prompt: "Daniel's date of birth is",
          options: ['3 March 1994.', '13 March 1994.', '3 May 1994.'],
          answer: '3 March 1994.',
          explanation: '"Third of March, nineteen ninety-four."',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt: 'Daniel decides to pay by',
          options: ['credit card.', 'direct debit.', 'cash in person.'],
          answer: 'direct debit.',
          explanation:
            '"Direct debit, please, that\'s easier for the monthly payments."',
        },
      ],
    },
  ],

  writing: [
    {
      task: 1,
      prompt:
        'The table below shows the percentage of households with internet access in four countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWords: 150,
      visual:
        'A table showing the percentage of households with internet access in the UK, USA, Brazil, and Nigeria in 2000, 2010, and 2020: UK 22% / 73% / 96%; USA 26% / 71% / 90%; Brazil 3% / 34% / 74%; Nigeria 0.1% / 6% / 32%.',
      modelAnswer:
        'The table illustrates trends in household internet access across the UK, the USA, Brazil, and Nigeria over a twenty-year period from 2000 to 2020.\n\nOverall, all four countries saw substantial growth in internet penetration, although the UK and USA started from a much higher base and maintained a clear lead throughout, while Nigeria consistently lagged furthest behind.\n\nIn 2000, internet access was minimal in the developing countries, with Brazil at just 3% and Nigeria at a negligible 0.1%, compared to roughly a quarter of households in the UK (22%) and the USA (26%). By 2010, all four nations had made significant progress: the UK and USA had risen sharply to 73% and 71% respectively, whereas Brazil reached 34% and Nigeria only 6%.\n\nThis upward trajectory continued into 2020, when the UK reached the highest figure of 96%, ahead of the USA at 90%. Brazil more than doubled its 2010 figure to 74%, and although Nigeria also more than quintupled its rate to 32%, it remained the lowest of the four throughout the period.',
      examinerNotes: [
        'Task Achievement is strong because every key figure and comparison is reported accurately with a clear overview sentence identifying the overall trend and relative positions.',
        'Coherence & Cohesion benefits from logical time-ordered paragraphing and linking phrases ("By 2010", "This upward trajectory").',
        'Lexical Resource shows range with paraphrase ("penetration", "trajectory", "quintupled its rate") avoiding repetition of "increase".',
        'Grammatical Range & Accuracy is demonstrated through varied complex structures (relative clauses, comparatives, participle phrases) with no errors.',
      ],
    },
    {
      task: 2,
      prompt:
        'Some people believe that unpaid community service should be a compulsory part of high school education. Others think students should be free to choose how they spend their free time. Discuss both these views and give your own opinion.',
      minWords: 250,
      modelAnswer:
        'Whether schools should compel students to undertake unpaid community work is a contentious issue. While some argue that mandatory service cultivates civic responsibility, others maintain that adolescents should retain autonomy over their leisure time. This essay will examine both perspectives before presenting my own view.\n\nProponents of compulsory service argue that it instils values that classroom learning cannot. By volunteering at, say, a food bank or an elderly care home, teenagers gain firsthand exposure to social hardship, which fosters empathy and a sense of civic duty. Moreover, such programmes often provide practical skills, from teamwork to time management, that benefit students long after graduation, and they can strengthen ties between schools and their local communities.\n\nOn the other hand, opponents contend that mandating service undermines its very purpose. Volunteering is traditionally rooted in personal choice, and forcing participation may breed resentment rather than genuine altruism. Furthermore, adolescents already face considerable academic pressure, and imposing additional obligations could leave little time for extracurricular pursuits, part-time employment, or simply rest, all of which contribute meaningfully to personal development.\n\nIn my view, a compromise best serves students. Schools could require a modest, flexible number of service hours, perhaps twenty per year, while allowing students to select causes aligned with their own interests, whether environmental conservation, tutoring younger pupils, or hospital volunteering. This approach preserves an element of choice while still guaranteeing that every student gains some exposure to civic engagement before adulthood.\n\nIn conclusion, although mandatory community service offers genuine social and personal benefits, it risks becoming a hollow requirement if implemented too rigidly. A flexible model that balances obligation with choice offers the most sustainable solution for schools seeking to cultivate responsible citizens.',
      examinerNotes: [
        'Task Response fully addresses both views and states a clear, well-developed personal position with a practical compromise.',
        'Coherence & Cohesion is achieved through a logical four-paragraph structure (both views, then opinion, then conclusion) and cohesive devices ("On the other hand", "Furthermore").',
        'Lexical Resource includes topic-specific vocabulary (civic duty, altruism, extracurricular) used naturally.',
        'Grammatical Range & Accuracy shows varied conditionals, passive voice, and subordinate clauses with high accuracy.',
      ],
    },
  ],

  speaking: [
    {
      part: 1,
      title: 'Part 1: Introduction and Interview',
      questions: [
        'Where is your hometown located?',
        'What do you like most about your hometown?',
        'Has your hometown changed much since you were a child?',
        'Would you recommend your hometown to tourists? Why?',
        'What does a typical day look like for you?',
        'Which part of your day do you enjoy the most?',
        'Has your daily routine changed in the last few years?',
        'Do you prefer a fixed routine or a flexible one?',
      ],
      sampleAnswers: [],
    },
    {
      part: 2,
      title: 'Part 2: Individual Long Turn (Cue Card)',
      questions: [
        'Describe a skill you learned that you found difficult at first. You should say:',
        '• what the skill was',
        '• when and why you decided to learn it',
        '• what difficulties you faced',
        '• and explain how you feel about it now',
        'You will have one minute to prepare and should speak for one to two minutes.',
        'Follow-up: Do you think you will keep improving this skill in the future?',
      ],
      sampleAnswers: [
        "One skill I found genuinely challenging was learning to play the guitar, which I picked up about three years ago when a close friend of mine started a small band and encouraged me to join. At first, I was drawn to the idea of performing, but I quickly realised that coordinating my fingers to form chords while strumming in rhythm was far trickier than I'd anticipated. For the first few months, my fingertips were sore, my chord changes were painfully slow, and I frequently felt like giving up altogether. What kept me going was setting myself small, achievable targets — learning one song at a time rather than fixating on becoming an accomplished musician overnight. Gradually, muscle memory kicked in, and what once felt impossibly awkward became almost second nature. Looking back, I feel a real sense of accomplishment, not just because I can now play reasonably well, but because the experience taught me patience and the value of consistent, incremental practice. Nowadays, I genuinely enjoy sitting down with my guitar after a long day; it's become a form of relaxation rather than a chore. I'd say it's one of the more rewarding things I've committed myself to, precisely because it didn't come easily.",
      ],
    },
    {
      part: 3,
      title: 'Part 3: Two-Way Discussion',
      questions: [
        'Why do some people give up when learning a new skill?',
        'Do you think schools should focus more on practical skills or academic knowledge?',
        'How has technology changed the way people learn new skills?',
        'Is it more effective to learn a skill alone or with a teacher/mentor?',
        'Do you think adults find it harder to learn new skills than children? Why?',
        'What role does failure play in the process of mastering a skill?',
      ],
      sampleAnswers: [],
    },
  ],
};

// -----------------------------------------------------------------------------
// TEST 4 (source Test 2) — Reading: The Silk Road's postal relay (yam) system ·
// Listening: Elmwood Wildlife Park tour · Writing: olive oil / excess packaging
// · Speaking: studies-or-work & technology in daily life.
// -----------------------------------------------------------------------------
const TEST_4: IeltsTest = {
  id: 'ielts-academic-4',
  title: 'IELTS Practice Test 4',
  module: 'Academic',
  source: 'Generated practice set (verified)',

  reading: [
    {
      number: 1,
      title: 'Messengers of the Steppe',
      text:
        'Long before the telegraph or the postal stamp, empires stretching across Asia relied on an ingenious network of relay stations to move messages, goods, and officials across enormous distances at remarkable speed. The most celebrated of these systems was the Mongol "yam," established under Genghis Khan in the early thirteenth century and expanded significantly by his successors. The yam consisted of stations spaced roughly a day\'s ride apart along major routes, each stocked with fresh horses, food, and shelter for messengers carrying official business.\n\nA courier riding the yam network did not travel the entire distance on a single horse. Instead, upon reaching each station, he exchanged his tired mount for a fresh one and, if necessary, handed his message to a new rider entirely. This relay method allowed urgent dispatches to cover distances of over 200 miles in a single day, an astonishing figure for the era and one that would not be matched by other communication systems for centuries. Marco Polo, who travelled extensively within the Mongol Empire, wrote admiringly of the system, describing stations so well organised that a messenger could always expect a fresh horse waiting, day or night.\n\nThe yam was not merely a courier service; it was the administrative backbone of the largest contiguous land empire in history. Officials travelling on state business carried a paiza, a metal tablet that functioned as a passport, entitling the bearer to lodging, food, and transport at any station along the route. Paiza were issued in different materials — gold, silver, or bronze — with the material indicating the bearer\'s rank and the level of service to which they were entitled. Without such a tablet, even wealthy merchants could be refused assistance at a station, since the network\'s resources were reserved primarily for state affairs.\n\nMaintaining the yam was expensive and logistically demanding. Local communities along the routes were often required to supply horses, fodder, and labour to keep stations running, an obligation that could be a significant burden, particularly in poorer regions where feeding extra horses meant less grain for the local population. Some historical records suggest that this burden occasionally provoked local resentment, though the empire\'s administrators generally regarded the system\'s benefits — rapid communication, efficient tax collection, and swift troop movement — as justifying the cost.\n\nThe Mongol system was not without precedent. Earlier empires, including the Persian Achaemenid Empire, had developed their own relay networks centuries before, most famously the Royal Road described by the Greek historian Herodotus, along which messages could reportedly be carried from Sardis to Susa, a distance of over 1,600 miles, in about a week. The Mongols, however, expanded the concept to an unprecedented scale, with some estimates suggesting the yam eventually included thousands of stations spanning territory from Korea to Hungary.\n\nThe legacy of the yam extended well beyond the Mongol Empire itself. Successor states in Persia, China, and Russia adapted elements of the system for their own postal networks, and some historians argue that the relay principle influenced the development of later courier systems in medieval Europe, though direct evidence of transmission is scarce. Russia\'s own version, known as the yamskaya gon\'ba, persisted for centuries after the Mongol khanates had faded from power, with relay stations continuing to dot the roads of the Russian Empire well into the modern era, gradually incorporating wheeled carriages alongside horseback riders as road conditions improved.\n\nWhat is clear is that the yam represented a genuine innovation in logistics: a system capable of moving information faster than almost anything else on land until the arrival of steam-powered transport and, eventually, electrical telegraphy in the nineteenth century transformed long-distance communication once again. Modern historians studying the administrative records of the Mongol Empire continue to regard the yam as compelling evidence that pre-industrial states could achieve levels of logistical coordination often assumed to require far more advanced technology, a reminder that organisational ingenuity, rather than technology alone, can determine how quickly information travels across a continent.',
      questions: [
        {
          id: 1,
          type: 'true-false-notgiven',
          prompt: 'Couriers on the yam network changed horses at each relay station.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"upon reaching each station, he exchanged his tired mount for a fresh one."',
        },
        {
          id: 2,
          type: 'true-false-notgiven',
          prompt:
            'The yam network could move urgent messages more than 200 miles in a single day.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"allowed urgent dispatches to cover distances of over 200 miles in a single day."',
        },
        {
          id: 3,
          type: 'true-false-notgiven',
          prompt: 'Marco Polo criticised the organisation of the yam stations.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation: '"Marco Polo... wrote admiringly of the system."',
        },
        {
          id: 4,
          type: 'true-false-notgiven',
          prompt: "All paiza tablets were made of gold regardless of the bearer's rank.",
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation: '"Paiza were issued in different materials — gold, silver, or bronze."',
        },
        {
          id: 5,
          type: 'true-false-notgiven',
          prompt: 'The Persian Royal Road was faster than the Mongol yam system.',
          options: ['True', 'False', 'Not Given'],
          answer: 'Not Given',
          explanation:
            'The passage gives figures for both but never compares their relative speed directly.',
        },
        {
          id: 6,
          type: 'sentence-completion',
          prompt:
            'Local communities were often obligated to provide horses, fodder, and ____ to maintain yam stations.',
          answer: 'labour',
          explanation:
            '"required to supply horses, fodder, and labour to keep stations running."',
        },
        {
          id: 7,
          type: 'sentence-completion',
          prompt: 'A paiza functioned as a kind of ____ that granted access to station resources.',
          answer: 'passport',
          explanation: '"a metal tablet that functioned as a passport."',
        },
        {
          id: 8,
          type: 'sentence-completion',
          prompt:
            'The Persian relay system is best known through the ____ described by Herodotus.',
          answer: 'Royal Road',
          explanation:
            '"most famously the Royal Road described by the Greek historian Herodotus."',
        },
        {
          id: 9,
          type: 'sentence-completion',
          prompt:
            'Steam-powered transport and, later, electrical ____ eventually replaced relay-based communication.',
          answer: 'telegraphy',
          explanation:
            '"electrical telegraphy in the nineteenth century transformed long-distance communication."',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt: 'According to the passage, the yam network was primarily intended to serve',
          options: [
            'wealthy merchants travelling for trade.',
            'ordinary travellers crossing the empire.',
            'state and administrative business.',
            'foreign diplomats visiting the empire.',
          ],
          answer: 'state and administrative business.',
          explanation:
            'It was "the administrative backbone" and merchants without a paiza "could be refused assistance," showing the priority was state affairs.',
        },
        {
          id: 11,
          type: 'multiple-choice',
          prompt: 'What does the passage say about maintaining the yam system?',
          options: [
            'It required no cooperation from local populations.',
            'It was inexpensive compared with other empire-wide projects.',
            'It could place a heavy burden on local communities.',
            'It was funded entirely through taxes on merchants.',
          ],
          answer: 'It could place a heavy burden on local communities.',
          explanation:
            '"an obligation that could be a significant burden, particularly in poorer regions."',
        },
        {
          id: 12,
          type: 'multiple-choice',
          prompt: "The writer mentions the Achaemenid Empire's Royal Road in order to",
          options: [
            'show that the Mongols invented the first relay system.',
            'demonstrate that relay networks had earlier precedents.',
            'argue that Persian systems were more advanced than Mongol ones.',
            'explain why the yam network eventually collapsed.',
          ],
          answer: 'demonstrate that relay networks had earlier precedents.',
          explanation:
            '"Earlier empires... had developed their own relay networks centuries before."',
        },
        {
          id: 13,
          type: 'multiple-choice',
          prompt: "What does the passage suggest about the yam's influence on later systems?",
          options: [
            'It is proven to have directly shaped medieval European courier systems.',
            'It had no impact on any later postal network.',
            'Successor states adapted it, but its influence on Europe is not firmly evidenced.',
            'It was abandoned entirely after the fall of the Mongol Empire.',
          ],
          answer:
            'Successor states adapted it, but its influence on Europe is not firmly evidenced.',
          explanation:
            '"Successor states... adapted elements of the system... though direct evidence of transmission is scarce."',
        },
      ],
    },
  ],

  listening: [
    {
      number: 2,
      title: 'Section 2: Welcome to Elmwood Wildlife Park',
      transcript:
        "GUIDE: Welcome, everyone, to Elmwood Wildlife Park. My name's Sandra and I'll be your guide for the next hour. Before we set off, let me give you a quick overview of the park and a few important points.\n\nThe park is divided into four zones. As you enter, you'll pass through the Wetlands Zone first, home to herons and otters. After that comes the Woodland Zone, where you can see red squirrels and deer — that's usually the most popular area with children. Beyond that is the Meadow Zone, which has our butterfly house, and finally the Highland Zone at the far end, where we keep the wolves and lynx.\n\nPlease note the café is located between the Woodland and Meadow zones, not at the entrance as some maps suggest. It's open until four thirty today.\n\nNow, a few safety points. The wolf enclosure viewing platform can get crowded, so please hold children's hands there. Also, feeding any of the animals is strictly forbidden — we have keepers on hand at set times to do that.\n\nTalking of which, there are three keeper talks today. The otter feeding talk is at eleven, the deer talk is at half past twelve, and the wolf talk, which is the most popular, is at two o'clock — I'd recommend arriving fifteen minutes early for a good spot.\n\nIf you get separated from your group, the meeting point is the fountain near the main entrance, not the gift shop.\n\nOne last thing — the park shuts at five thirty, but the car park gate closes automatically at six, so please don't be late back to your vehicles.\n\nRight, let's begin our walk through the Wetlands Zone.",
      questions: [
        {
          id: 1,
          type: 'note-completion',
          prompt: '____ Zone — herons, otters',
          answer: 'Wetlands',
          explanation:
            "\"you'll pass through the Wetlands Zone first, home to herons and otters.\"",
        },
        {
          id: 2,
          type: 'note-completion',
          prompt: '____ Zone — squirrels, deer',
          answer: 'Woodland',
          explanation:
            '"After that comes the Woodland Zone, where you can see red squirrels and deer."',
        },
        {
          id: 3,
          type: 'note-completion',
          prompt: '____ Zone — butterfly house',
          answer: 'Meadow',
          explanation:
            '"Beyond that is the Meadow Zone, which has our butterfly house."',
        },
        {
          id: 4,
          type: 'note-completion',
          prompt: '____ Zone — wolves, lynx',
          answer: 'Highland',
          explanation:
            '"finally the Highland Zone at the far end, where we keep the wolves and lynx."',
        },
        {
          id: 5,
          type: 'note-completion',
          prompt: 'Café location: between Woodland and ____ zones',
          answer: 'Meadow',
          explanation:
            '"the café is located between the Woodland and Meadow zones."',
        },
        {
          id: 6,
          type: 'short-answer',
          prompt: 'What time does the wolf keeper talk take place?',
          answer: ['two o\'clock', '2 o\'clock', '2pm', '2 pm'],
          explanation:
            '"the wolf talk, which is the most popular, is at two o\'clock."',
        },
        {
          id: 7,
          type: 'short-answer',
          prompt: 'Where should visitors go if separated from their group?',
          answer: ['the fountain', 'fountain'],
          explanation:
            '"the meeting point is the fountain near the main entrance, not the gift shop."',
        },
        {
          id: 8,
          type: 'short-answer',
          prompt: 'What time does the car park gate close?',
          answer: ['six', '6 o\'clock', '6', '6pm'],
          explanation: '"the car park gate closes automatically at six."',
        },
        // ponytail: split "choose TWO" pair; either correct letter accepted in either slot — picking the same one twice scores 2/2, rare enough to accept
        {
          id: 9,
          type: 'multiple-choice',
          prompt: 'Which statement is true according to the talk?',
          options: [
            'Feeding animals is allowed at all times.',
            'The café is at the park entrance.',
            "Visitors should hold children's hands near the wolf platform.",
            'The otter talk is the most popular.',
            'The park itself closes at five thirty.',
          ],
          answer: [
            "Visitors should hold children's hands near the wolf platform.",
            'The park itself closes at five thirty.',
          ],
          explanation:
            '"please hold children\'s hands there [the wolf platform]."',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt: 'Which additional statement is also true according to the talk?',
          options: [
            'Feeding animals is allowed at all times.',
            'The café is at the park entrance.',
            "Visitors should hold children's hands near the wolf platform.",
            'The otter talk is the most popular.',
            'The park itself closes at five thirty.',
          ],
          answer: [
            "Visitors should hold children's hands near the wolf platform.",
            'The park itself closes at five thirty.',
          ],
          explanation: '"the park shuts at five thirty."',
        },
      ],
    },
  ],

  writing: [
    {
      task: 1,
      prompt:
        'The diagram below shows the process of making olive oil. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWords: 150,
      visual:
        'A diagram showing the seven-stage process of making olive oil: 1) olives harvested from trees, by hand or mechanical shaking; 2) transported to a mill and washed to remove leaves and dirt; 3) crushed into a paste using a stone or steel grinder; 4) paste mixed for 20–40 minutes to help oil droplets merge; 5) pressed or passed through a centrifuge to separate oil from water and solid pulp; 6) extracted oil filtered to remove sediment; 7) filtered oil stored in stainless steel tanks before bottling for sale.',
      modelAnswer:
        'The diagram illustrates the seven stages involved in the production of olive oil, from harvesting to bottling.\n\nOverall, the process is linear, moving from the collection of raw olives through several mechanical processing stages before the final product is packaged for consumers.\n\nThe process begins with the harvesting of olives from trees, carried out either manually or through mechanical shaking. These olives are then transported to a mill, where they are washed thoroughly to eliminate leaves and other debris. Following this, the cleaned olives are crushed into a paste using either a traditional stone grinder or a modern steel one.\n\nOnce crushed, the paste undergoes a mixing stage lasting between 20 and 40 minutes, a step designed to allow small oil droplets to merge into larger, more easily extractable ones. Subsequently, the paste is either pressed or spun in a centrifuge, a process that separates the oil from both water and solid pulp.\n\nIn the final two stages, the extracted oil is filtered to remove any remaining sediment, then stored in stainless steel tanks prior to bottling, at which point it becomes ready for retail sale.',
      examinerNotes: [
        'Task Achievement covers every stage accurately in the correct sequence with a clear overview identifying the linear nature of the process.',
        'Coherence & Cohesion uses sequencing language (begins, following this, once, subsequently, in the final stages) to guide the reader smoothly.',
        'Lexical Resource demonstrates precise process vocabulary (centrifuge, sediment, crushed into a paste).',
        'Grammatical Range & Accuracy features accurate passive voice throughout, appropriate for process description, with varied sentence openings.',
      ],
    },
    {
      task: 2,
      prompt:
        'In many countries, the amount of packaging used for consumer goods continues to increase. This is a matter of growing environmental concern. What problems does excessive packaging cause, and what measures could be taken to reduce it?',
      minWords: 250,
      modelAnswer:
        'The steady rise in packaging accompanying consumer products has become a pressing environmental issue in numerous countries. This essay will outline the principal problems this trend creates and then propose several measures to address it.\n\nThe most immediate consequence of excessive packaging is the sheer volume of waste sent to landfill. Much of this material, particularly multi-layered plastics and polystyrene, takes centuries to decompose and frequently ends up polluting oceans and harming marine wildlife. In addition, the production of packaging itself consumes considerable energy and raw materials, from petroleum for plastics to timber for cardboard, thereby contributing to resource depletion and carbon emissions. A further, less obvious problem is that packaging costs are ultimately passed on to consumers, inflating retail prices for goods that would otherwise require minimal wrapping.\n\nSeveral measures could mitigate these problems. Firstly, governments could introduce stricter regulations limiting the amount of packaging manufacturers are permitted to use, similar to plastic bag levies already adopted in countries such as Ireland and the UK. Secondly, businesses should be incentivised, through tax breaks or subsidies, to adopt biodegradable or recyclable materials instead of conventional plastics. Consumers, too, have a role to play: choosing products with minimal packaging and supporting refill schemes, now offered by some supermarkets, can gradually shift market demand. Finally, public education campaigns highlighting the environmental cost of packaging waste could encourage more sustainable purchasing habits from an early age.\n\nIn conclusion, while excessive packaging generates serious environmental and economic problems, a combination of government regulation, corporate responsibility, and informed consumer choice could substantially reduce its impact. Coordinated action across these three levels offers the most realistic path towards meaningful change.',
      examinerNotes: [
        'Task Response addresses both the problems and solutions components fully with well-extended ideas and specific examples (Ireland, UK levies).',
        'Coherence & Cohesion is clear through a problem-then-solution structure with logical connectors (Firstly, Secondly, Finally).',
        'Lexical Resource includes precise collocations (resource depletion, refill schemes, retail prices).',
        'Grammatical Range & Accuracy shows passive constructions, conditionals, and complex noun phrases used accurately.',
      ],
    },
  ],

  speaking: [
    {
      part: 1,
      title: 'Part 1: Introduction and Interview',
      questions: [
        'Are you currently a student or do you work?',
        'What do you like most about your studies/job?',
        'Is there anything you would like to change about your studies/job?',
        'What are your plans for the future in this area?',
        'What piece of technology do you use most often?',
        'How has technology changed the way you communicate with others?',
        'Is there any technology you find difficult to use?',
        'Do you think you rely on technology too much?',
      ],
      sampleAnswers: [],
    },
    {
      part: 2,
      title: 'Part 2: Individual Long Turn (Cue Card)',
      questions: [
        'Describe a piece of technology you use to help with your work or studies. You should say:',
        '• what it is',
        '• how you use it',
        '• how long you have been using it',
        '• and explain how it helps you',
        'You will have one minute to prepare and should speak for one to two minutes.',
        'Follow-up: Do you think you could manage without this technology?',
      ],
      sampleAnswers: [
        "The piece of technology I couldn't do without is my laptop, or more specifically, the note-taking and organisation software installed on it, which I've relied on for roughly four years now, ever since I started university. I use it primarily to keep track of lecture notes, deadlines, and research materials, all synced across a cloud service so I can access everything whether I'm on campus, at home, or travelling. What makes it indispensable isn't just the storage capacity, but the way it lets me tag and cross-reference information — if I'm writing an essay and need to recall something from a lecture three months prior, I can locate it within seconds rather than flipping through notebooks. Before I adopted this system, my notes were scattered across various physical notebooks and loose sheets, and I frequently lost track of important information right before exams. Now, everything is centralised and searchable, which has genuinely reduced my stress levels during busy periods. It's also allowed me to collaborate more efficiently with classmates on group projects, since we can share documents in real time rather than emailing drafts back and forth. Honestly, I think this tool has reshaped not just how I study, but how organised I am as a person more generally.",
      ],
    },
    {
      part: 3,
      title: 'Part 3: Two-Way Discussion',
      questions: [
        'How has technology changed the workplace in recent decades?',
        'Do you think technology creates more jobs than it destroys?',
        'What are the disadvantages of relying heavily on technology at work?',
        'Should schools teach children to use technology from a young age?',
        'How might artificial intelligence change the nature of work in the future?',
        'Do you think older generations struggle more to adapt to new technology?',
      ],
      sampleAnswers: [],
    },
  ],
};

// -----------------------------------------------------------------------------
// TEST 5 (source Test 3) — Reading: Urban Heat Islands · Listening: Urban
// gardening research discussion · Writing: leisure hours / internet & social
// skills · Speaking: neighbourhood & free time.
// -----------------------------------------------------------------------------
const TEST_5: IeltsTest = {
  id: 'ielts-academic-5',
  title: 'IELTS Practice Test 5',
  module: 'Academic',
  source: 'Generated practice set (verified)',

  reading: [
    {
      number: 1,
      title: 'The City That Makes Its Own Weather',
      text:
        'On a warm summer evening, a walk from a city centre to the surrounding countryside can feel like moving between two different climates. This difference, known as the urban heat island effect, describes how cities can be several degrees warmer than the rural areas around them, particularly at night. The phenomenon was first documented scientifically in the early nineteenth century by the amateur meteorologist Luke Howard, who noticed that London\'s temperatures consistently exceeded those of the surrounding countryside, though the underlying causes were not properly understood until much later.\n\nSeveral factors combine to create this effect. Dark surfaces such as asphalt roads and roofing materials absorb far more solar radiation during the day than natural surfaces like grass or soil, and they release this stored heat slowly after sunset, keeping urban air warm well into the night. Meanwhile, the sheer density of buildings alters airflow, trapping warm air between structures in what urban planners sometimes call "urban canyons." Waste heat from vehicles, air conditioning units, and industrial processes adds further warmth directly into the urban atmosphere. Perhaps most significantly, cities typically have far less vegetation than rural areas, and plants cool their surroundings through evapotranspiration, a process by which water evaporating from leaves absorbs heat from the air. Without extensive greenery, cities lose this natural cooling mechanism almost entirely.\n\nThe consequences of urban heat islands extend beyond simple discomfort. Elevated night-time temperatures are strongly associated with increased mortality during heatwaves, since the human body relies on cooler night-time conditions to recover from daytime heat stress. Studies of several major heatwaves have found that urban residents, particularly the elderly and those without access to air conditioning, faced substantially higher risks than residents of surrounding rural areas experiencing the same daytime temperatures. The effect also increases energy demand, as residents run air conditioning more intensively and for longer hours, which in turn generates more waste heat, creating a self-reinforcing cycle.\n\nFortunately, a growing body of research points to practical interventions that can meaningfully reduce urban heat. Reflective or "cool" roofing materials, painted in light colours or coated with reflective compounds, can reduce a building\'s roof temperature by a significant margin compared with standard dark roofing, lowering the need for indoor cooling. Green roofs, covered in vegetation, provide similar benefits while also absorbing rainwater and supporting biodiversity. Perhaps the most cost-effective intervention is simply planting more urban trees: a single mature tree can cool the surrounding air appreciably through shade and evapotranspiration, and neighbourhoods with substantial tree cover have been shown to experience measurably lower peak temperatures than those with sparse greenery.\n\nSome cities have begun to implement heat island mitigation on a large scale. Singapore, often cited as a model, has integrated extensive vertical greenery and rooftop gardens into its building codes, while several cities in the southwestern United States have adopted cool-pavement programmes, coating roads with reflective sealants. Critics note, however, that such measures require sustained investment and maintenance, and that in cities facing severe budget constraints, heat mitigation infrastructure often competes for funding with more immediately visible priorities such as housing and transport, meaning progress in many places remains slower than climate scientists would prefer.\n\nAs global temperatures continue to rise, the urban heat island effect is expected to compound the impact of climate change in cities, since background warming and local heat island effects add together rather than one replacing the other. Urban planners increasingly argue that heat mitigation should be treated not as an optional environmental amenity but as essential public health infrastructure, particularly as extreme heat events become more frequent and severe worldwide. Some public health officials now recommend that cities incorporate heat vulnerability mapping into emergency planning, identifying neighbourhoods where a combination of dense construction, sparse tree cover, and limited access to cooling could leave residents especially exposed during future heatwaves.',
      questions: [
        {
          id: 1,
          type: 'matching-information',
          prompt:
            'Which paragraph explains why plants provide a cooling effect that cities largely lack?',
          options: [
            'Paragraph A',
            'Paragraph B',
            'Paragraph C',
            'Paragraph D',
            'Paragraph E',
            'Paragraph F',
          ],
          answer: 'Paragraph B',
          explanation:
            'Paragraph B (para 2) explains evapotranspiration and cities\' lack of vegetation.',
        },
        {
          id: 2,
          type: 'matching-information',
          prompt:
            'Which paragraph describes specific cities that have implemented large-scale mitigation programmes?',
          options: [
            'Paragraph A',
            'Paragraph B',
            'Paragraph C',
            'Paragraph D',
            'Paragraph E',
            'Paragraph F',
          ],
          answer: 'Paragraph E',
          explanation: 'Paragraph E (para 5) names Singapore and southwestern US cities.',
        },
        {
          id: 3,
          type: 'matching-information',
          prompt:
            'Which paragraph gives a historical note on when the phenomenon was first scientifically documented?',
          options: [
            'Paragraph A',
            'Paragraph B',
            'Paragraph C',
            'Paragraph D',
            'Paragraph E',
            'Paragraph F',
          ],
          answer: 'Paragraph A',
          explanation:
            'Paragraph A (para 1): "first documented scientifically in the early nineteenth century by... Luke Howard."',
        },
        {
          id: 4,
          type: 'matching-information',
          prompt:
            'Which paragraph warns that local heat effects and global warming reinforce one another?',
          options: [
            'Paragraph A',
            'Paragraph B',
            'Paragraph C',
            'Paragraph D',
            'Paragraph E',
            'Paragraph F',
          ],
          answer: 'Paragraph F',
          explanation:
            'Paragraph F (para 6): "background warming and local heat island effects add together rather than one replacing the other."',
        },
        {
          id: 5,
          type: 'true-false-notgiven',
          prompt:
            'Luke Howard fully explained the causes of the urban heat island effect when he first documented it.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            '"though the underlying causes were not properly understood until much later."',
        },
        {
          id: 6,
          type: 'true-false-notgiven',
          prompt:
            'Elderly urban residents without air conditioning face higher heatwave risks than rural residents at the same daytime temperature.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"urban residents, particularly the elderly and those without access to air conditioning, faced substantially higher risks than residents of surrounding rural areas experiencing the same daytime temperatures."',
        },
        {
          id: 7,
          type: 'true-false-notgiven',
          prompt: 'Green roofs provide no benefits beyond cooling.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            '"Green roofs... provide similar benefits while also absorbing rainwater and supporting biodiversity."',
        },
        {
          id: 8,
          type: 'true-false-notgiven',
          prompt: 'Singapore has made vertical greenery part of its building codes.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"Singapore... has integrated extensive vertical greenery and rooftop gardens into its building codes."',
        },
        {
          id: 9,
          type: 'true-false-notgiven',
          prompt:
            'Every city with a cool-pavement programme has eliminated its urban heat island effect.',
          options: ['True', 'False', 'Not Given'],
          answer: 'Not Given',
          explanation:
            'The passage mentions cool-pavement programmes but never claims they eliminate the heat island effect entirely.',
        },
        {
          id: 10,
          type: 'summary-completion',
          prompt: 'Dense buildings trap warm air in structures known as ____.',
          answer: 'urban canyons',
          explanation:
            'trapping warm air between structures in what urban planners sometimes call "urban canyons."',
        },
        {
          id: 11,
          type: 'summary-completion',
          prompt: 'Waste heat also comes from vehicles and ____ units.',
          answer: 'air conditioning',
          explanation:
            '"Waste heat from vehicles, air conditioning units, and industrial processes."',
        },
        {
          id: 12,
          type: 'summary-completion',
          prompt:
            'Because cities lack vegetation, they lose the cooling process called ____.',
          answer: 'evapotranspiration',
          explanation: '"plants cool their surroundings through evapotranspiration."',
        },
        {
          id: 13,
          type: 'summary-completion',
          prompt:
            'This combination of factors can create a cycle in which higher temperatures push up ____, generating even more waste heat.',
          answer: 'energy demand',
          explanation:
            '"The effect also increases energy demand... which in turn generates more waste heat."',
        },
      ],
    },
  ],

  listening: [
    {
      number: 3,
      title: 'Section 3: Discussing an Urban Gardening Project',
      transcript:
        "TUTOR: So, Maya and Josh, tell me how the urban gardening project is coming along.\n\nMAYA: We've made good progress. We decided to focus on rooftop gardens rather than street-level plots, because access is more limited in the city centre.\n\nJOSH: Yes, and we've split the research — I'm looking at the environmental benefits, like reducing the heat-island effect, and Maya's looking at the social benefits, community involvement and so on.\n\nTUTOR: That sounds sensible. What about your data collection method?\n\nMAYA: We're planning to survey residents in three apartment blocks, but Josh thinks interviews would give richer data.\n\nJOSH: Right, surveys are quicker to analyse, but I feel we'll miss the nuance. I'd rather do fewer, longer interviews.\n\nTUTOR: Could you do both — perhaps a short survey to identify candidates, then follow-up interviews with a smaller group?\n\nMAYA: That's actually a great compromise. We hadn't considered combining them.\n\nTUTOR: Good. Now, what's your timeline looking like?\n\nJOSH: We want to finish the survey by the end of next week, then run interviews the week after, and have a draft report ready three weeks from now.\n\nTUTOR: That's realistic. One concern though — have you thought about who owns the rooftops? Access permission could delay things.\n\nMAYA: We hadn't factored that in, actually. We assumed building managers would just let us up there.\n\nTUTOR: I'd get written permission sorted this week, before you start surveying, otherwise you may lose time later.\n\nJOSH: Good point, we'll email the managers today.\n\nTUTOR: Also, for your report, I'd like you to include a cost-benefit section — that's something markers specifically look for in this module.\n\nMAYA: Noted. We'll add that as a new section.\n\nTUTOR: Great. Let's meet again in two weeks to check progress.",
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          prompt: 'The students chose to focus on',
          options: [
            'street-level plots.',
            'rooftop gardens.',
            'balcony gardens.',
          ],
          answer: 'rooftop gardens.',
          explanation:
            '"We decided to focus on rooftop gardens rather than street-level plots."',
        },
        {
          id: 2,
          type: 'multiple-choice',
          prompt: 'Josh is researching',
          options: ['social benefits.', 'financial costs.', 'environmental benefits.'],
          answer: 'environmental benefits.',
          explanation: "\"I'm looking at the environmental benefits.\"",
        },
        {
          id: 3,
          type: 'multiple-choice',
          prompt: 'The tutor suggests the students should',
          options: ['only use surveys.', 'only use interviews.', 'combine surveys and interviews.'],
          answer: 'combine surveys and interviews.',
          explanation:
            '"Could you do both — perhaps a short survey to identify candidates, then follow-up interviews."',
        },
        {
          id: 4,
          type: 'multiple-choice',
          prompt: 'What does the tutor say could delay the project?',
          options: ['lack of funding', 'rooftop access permission', 'bad weather'],
          answer: 'rooftop access permission',
          explanation:
            '"have you thought about who owns the rooftops? Access permission could delay things."',
        },
        {
          id: 5,
          type: 'multiple-choice',
          prompt: 'What does the tutor want added to the report?',
          options: ['a literature review', 'a cost-benefit section', 'a set of photographs'],
          answer: 'a cost-benefit section',
          explanation: "\"I'd like you to include a cost-benefit section.\"",
        },
        {
          id: 6,
          type: 'sentence-completion',
          prompt: 'The survey will target residents in three ____.',
          answer: 'apartment blocks',
          explanation: '"survey residents in three apartment blocks."',
        },
        {
          id: 7,
          type: 'sentence-completion',
          prompt: 'The students plan to finish the survey by the end of ____.',
          answer: 'next week',
          explanation: '"We want to finish the survey by the end of next week."',
        },
        {
          id: 8,
          type: 'sentence-completion',
          prompt: 'Interviews will be run the week after the ____.',
          answer: 'survey',
          explanation: '"run interviews the week after" (the survey, per the timeline order).',
        },
        {
          id: 9,
          type: 'sentence-completion',
          prompt: 'A draft report should be ready in ____ weeks.',
          answer: ['3', 'three'],
          explanation: '"have a draft report ready three weeks from now."',
        },
        {
          id: 10,
          type: 'sentence-completion',
          prompt: 'The tutor and students agree to meet again in ____.',
          answer: 'two weeks',
          explanation: "\"Let's meet again in two weeks to check progress.\"",
        },
      ],
    },
  ],

  writing: [
    {
      task: 1,
      prompt:
        'The bar chart below shows average weekly hours spent on leisure activities by adults in one country, comparing 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWords: 150,
      visual:
        'A bar chart comparing average weekly hours (adults, one country) in 1990 vs 2020: Watching TV 14 → 9; Reading 6 → 3; Socialising in person 8 → 5; Using the internet 0 → 16; Exercising 3 → 5.',
      modelAnswer:
        'The bar chart compares the number of hours per week that adults in one country devoted to five leisure activities in 1990 and 2020.\n\nOverall, the most striking change is the emergence of internet use as the dominant leisure activity, while time spent on more traditional pastimes such as watching television and reading declined markedly over the thirty-year period.\n\nIn 1990, before internet use existed as a leisure category, television dominated free time, occupying 14 hours per week, considerably more than any other activity. Reading and socialising in person followed at 6 and 8 hours respectively, while exercising accounted for just 3 hours.\n\nBy 2020, this pattern had reversed dramatically. Internet use had risen from zero to 16 hours per week, becoming the most time-consuming leisure activity, while television viewing fell to 9 hours and reading dropped by half, to just 3 hours. Socialising in person also declined, from 8 to 5 hours, whereas exercising was the only activity to increase, rising slightly from 3 to 5 hours over the period.',
      examinerNotes: [
        'Task Achievement accurately reports every figure and highlights the key overview trend (rise of internet use, decline of traditional activities) without listing data mechanically.',
        'Coherence & Cohesion is supported by clear paragraphing contrasting 1990 with 2020 and cohesive links ("By 2020, this pattern had reversed").',
        'Lexical Resource shows varied verbs for change (declined, rose, fell, dropped, increase) avoiding repetition.',
        'Grammatical Range & Accuracy includes accurate past perfect and comparative structures throughout.',
      ],
    },
    {
      task: 2,
      prompt:
        'Many people think that the increasing use of the internet for communication has had a negative effect on face-to-face interaction skills. To what extent do you agree or disagree?',
      minWords: 250,
      modelAnswer:
        'The proliferation of internet-based communication, from instant messaging to video calls, has transformed the way people interact. While some argue this shift has eroded traditional face-to-face social skills, I largely agree with this view, though I believe the effect varies considerably depending on how digital tools are used.\n\nThere is compelling evidence that heavy reliance on text-based communication diminishes certain interpersonal competencies. Reading tone, interpreting body language, and responding spontaneously in real time are skills honed through practice, and young people who conduct much of their social life through screens have fewer opportunities to develop them. Studies of teenagers, for instance, have noted increased social anxiety in unmediated settings, suggesting that comfort with typed conversation does not necessarily transfer to in-person exchanges, where pauses, eye contact, and tone all require different competencies.\n\nNevertheless, this negative effect is not universal or inevitable. Video calling, for example, still demands the reading of facial expressions and vocal cues, preserving some elements of face-to-face communication that pure text-based messaging lacks. Moreover, digital platforms have enabled introverted individuals or those living in remote areas to build genuine friendships they might never have formed otherwise, which can subsequently translate into greater confidence in person. The determining factor, therefore, is not the technology itself but how it is balanced against offline interaction.\n\nIn conclusion, I agree that excessive dependence on internet communication can weaken face-to-face social skills, particularly among younger users who have fewer alternative reference points. However, I would qualify this by noting that the internet, used judiciously alongside regular in-person contact, need not be inherently harmful, and can in some cases even facilitate stronger relationships than would otherwise exist.',
      examinerNotes: [
        'Task Response gives a clear, qualified position (largely agree, with nuance) sustained and developed throughout, exactly as an opinion-type question requires.',
        'Coherence & Cohesion progresses logically from supporting evidence to a qualifying counterpoint to a balanced conclusion.',
        'Lexical Resource is sophisticated (proliferation, interpersonal competencies, judiciously) used with precision.',
        'Grammatical Range & Accuracy shows complex subordination and hedging language (need not be, particularly among) handled with control.',
      ],
    },
  ],

  speaking: [
    {
      part: 1,
      title: 'Part 1: Introduction and Interview',
      questions: [
        'Can you describe the neighbourhood you live in?',
        'What facilities are available near your home?',
        'Do you know many of your neighbours?',
        'What would you change about your neighbourhood if you could?',
        'What do you usually do in your free time?',
        'Do you prefer spending free time alone or with others?',
        'Has the way you spend free time changed over the years?',
        'Do you think people today have enough free time?',
      ],
      sampleAnswers: [],
    },
    {
      part: 2,
      title: 'Part 2: Individual Long Turn (Cue Card)',
      questions: [
        'Describe a public place that has been recently improved. You should say:',
        '• what the place is',
        '• what it was like before',
        '• what changes were made',
        '• and explain how you feel about the improvement',
        'You will have one minute to prepare and should speak for one to two minutes.',
        'Follow-up: Do you think local governments invest enough in public spaces?',
      ],
      sampleAnswers: [
        "A public place that's been dramatically transformed near where I live is the riverside park close to my apartment. A few years ago, it was honestly quite neglected — the pathways were cracked, there was barely any lighting, and most people avoided it after dark because it felt unsafe and rundown. About two years ago, the local council undertook a fairly extensive renovation project: they repaved the walking paths, installed proper lighting along the entire riverbank, added exercise equipment, and planted a variety of trees and flower beds to make the space more inviting. They also built a small amphitheatre where community events and outdoor films are occasionally held. The transformation has been remarkable — what used to be an empty, somewhat forgotten stretch of land is now bustling with joggers, families, and elderly residents doing tai chi in the mornings. I feel genuinely delighted about this change, partly because it's given me a pleasant place to unwind after work, but also because it's brought a real sense of community back to the area. Neighbours who previously never interacted now chat regularly at the park. It's a strong reminder of how thoughtful urban planning can significantly improve people's quality of life.",
      ],
    },
    {
      part: 3,
      title: 'Part 3: Two-Way Discussion',
      questions: [
        'Why do you think some public spaces fall into disrepair?',
        'Who should be responsible for maintaining public spaces — the government or local communities?',
        'How do well-designed public spaces benefit a community?',
        'Do you think cities are becoming more or less liveable over time?',
        'What role does public consultation play in urban improvement projects?',
        'How might public spaces need to change to meet future needs?',
      ],
      sampleAnswers: [],
    },
  ],
};

// -----------------------------------------------------------------------------
// TEST 6 (source Test 4) — Reading: Quantum Sensors · Listening: History of
// coffee lecture · Writing: electricity sources / renewable-energy vs
// healthcare spending · Speaking: family & future plans.
// -----------------------------------------------------------------------------
const TEST_6: IeltsTest = {
  id: 'ielts-academic-6',
  title: 'IELTS Practice Test 6',
  module: 'Academic',
  source: 'Generated practice set (verified)',

  reading: [
    {
      number: 1,
      title: 'Sensing the World at the Quantum Scale',
      text:
        'While much public attention on quantum technology has focused on the promise of quantum computers, a quieter revolution is underway in the field of quantum sensing, a technology already being deployed for practical applications far sooner than large-scale quantum computing. Quantum sensors exploit the extraordinary sensitivity of quantum systems — atoms, ions, or engineered defects in crystals — to detect minute changes in physical quantities such as magnetic fields, gravity, and time, often with precision that classical instruments simply cannot match.\n\nAt the heart of many quantum sensors lies a phenomenon called superposition, in which a quantum particle exists in multiple states simultaneously until measured. Because these superposed states are exquisitely sensitive to their surrounding environment, even tiny external influences — a faint magnetic field, a slight change in gravitational pull, a minuscule shift in temperature — can alter the quantum state in ways that are measurable with extreme precision. This sensitivity, which is often a nuisance in quantum computing because it makes quantum bits prone to errors, becomes a powerful asset in sensing applications, where the goal is precisely to detect the smallest possible disturbances.\n\nOne of the most mature applications of quantum sensing involves atomic clocks. Modern atomic clocks measure time by observing the oscillation of electrons within atoms such as caesium or strontium, oscillations that occur at fantastically consistent frequencies. The most advanced optical atomic clocks are now so precise that they would neither gain nor lose a single second over the age of the universe. Such extraordinary precision has practical value beyond simple timekeeping: satellite navigation systems depend on atomic clock accuracy, since even a tiny timing error translates into a significant positioning error on the ground, given that GPS signals travel at the speed of light.\n\nQuantum sensors are also transforming the detection of magnetic fields. Devices known as SQUIDs, or superconducting quantum interference devices, can detect magnetic fields many orders of magnitude weaker than the Earth\'s own magnetic field. This sensitivity has enabled medical researchers to develop magnetoencephalography, a technique that maps brain activity by detecting the faint magnetic fields produced by neural electrical currents, offering doctors a non-invasive window into brain function without the radiation exposure associated with some other imaging techniques.\n\nPerhaps the most geopolitically significant application lies in quantum gravimeters, instruments capable of measuring tiny variations in gravitational pull caused by differences in underground density. Such instruments can, in principle, detect underground structures, mineral deposits, or even tunnels without any need for excavation, since denser materials exert a marginally stronger gravitational pull than the surrounding rock. Mining companies have expressed interest in the technology for prospecting, while some defence analysts have suggested quantum gravimeters could eventually be used to detect submarines, since a submerged submarine creates a tiny but theoretically detectable disturbance in the surrounding gravitational field, though no such system has yet been demonstrated as operationally viable.\n\nDespite this promise, significant engineering challenges remain before quantum sensors see truly widespread civilian and commercial deployment. Many of the most sensitive quantum sensors currently require extreme cooling, cumbersome vacuum chambers, or careful magnetic shielding to function, all of which make them expensive and delicate compared with conventional instruments. Researchers are actively working to miniaturise these systems and make them robust enough for use outside carefully controlled laboratory environments, a shift that would be necessary before quantum sensors could be installed, for example, in handheld devices, ordinary vehicles, or aircraft used for everyday commercial purposes.\n\nGovernment and private funding for quantum sensing has grown substantially in recent years, with several national research programmes explicitly identifying sensing, rather than computing, as the technology most likely to deliver near-term economic returns. Defence agencies in particular have shown strong interest, partly because quantum sensors could offer navigation alternatives that do not depend on GPS satellite signals, which can be jammed or spoofed in contested environments. Inertial quantum sensors, capable of tracking position through extremely precise measurements of acceleration and rotation, are being explored as a potential backup navigation method for ships, aircraft, and submarines operating in areas where satellite signals are unreliable or deliberately denied.',
      questions: [
        {
          id: 1,
          type: 'true-false-notgiven',
          prompt:
            'Quantum sensing technology is likely to reach practical deployment sooner than large-scale quantum computing.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"a quieter revolution is underway in the field of quantum sensing, a technology already being deployed for practical applications far sooner than large-scale quantum computing."',
        },
        {
          id: 2,
          type: 'true-false-notgiven',
          prompt:
            'Sensitivity to environmental disturbance is always a disadvantage in quantum technologies.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            '"This sensitivity, which is often a nuisance in quantum computing... becomes a powerful asset in sensing applications."',
        },
        {
          id: 3,
          type: 'true-false-notgiven',
          prompt:
            'The most advanced optical atomic clocks could run for the entire age of the universe without losing a second.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"so precise that they would neither gain nor lose a single second over the age of the universe."',
        },
        {
          id: 4,
          type: 'true-false-notgiven',
          prompt: 'Quantum gravimeters have already been used operationally to detect submarines.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation: '"though no such system has yet been demonstrated as operationally viable."',
        },
        {
          id: 5,
          type: 'sentence-completion',
          prompt:
            'Quantum sensors rely on a phenomenon called ____, in which a particle exists in multiple states at once.',
          answer: 'superposition',
          explanation:
            '"a phenomenon called superposition, in which a quantum particle exists in multiple states simultaneously."',
        },
        {
          id: 6,
          type: 'sentence-completion',
          prompt: 'SQUIDs can detect magnetic fields far weaker than that of the ____.',
          answer: ['Earth', "Earth's"],
          explanation:
            '"can detect magnetic fields many orders of magnitude weaker than the Earth\'s own magnetic field."',
        },
        {
          id: 7,
          type: 'sentence-completion',
          prompt:
            'Magnetoencephalography maps brain activity by detecting faint magnetic fields from neural ____.',
          answer: 'electrical currents',
          explanation:
            '"detecting the faint magnetic fields produced by neural electrical currents."',
        },
        {
          id: 8,
          type: 'sentence-completion',
          prompt:
            'Many current quantum sensors require extreme cooling or careful magnetic ____ to operate correctly.',
          answer: 'shielding',
          explanation:
            '"extreme cooling, cumbersome vacuum chambers, or careful magnetic shielding."',
        },
        {
          id: 9,
          type: 'multiple-choice',
          prompt:
            'Why is quantum sensitivity considered a "nuisance" in quantum computing but an asset in sensing?',
          options: [
            'It causes errors in computing but allows detection of tiny disturbances in sensing.',
            'It makes computers faster but sensors slower.',
            'It only affects sensors, not computers.',
            'It requires different types of atoms in each application.',
          ],
          answer:
            'It causes errors in computing but allows detection of tiny disturbances in sensing.',
          explanation:
            'It "makes quantum bits prone to errors" in computing; an asset in sensing "where the goal is precisely to detect the smallest possible disturbances."',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt:
            'According to the passage, satellite navigation systems depend on atomic clock accuracy because',
          options: [
            'satellites cannot function without onboard clocks.',
            'a small timing error causes a significant positioning error given the speed of light.',
            'atomic clocks are cheaper than other timing devices.',
            'GPS satellites use caesium fuel to operate.',
          ],
          answer:
            'a small timing error causes a significant positioning error given the speed of light.',
          explanation:
            '"even a tiny timing error translates into a significant positioning error on the ground, given that GPS signals travel at the speed of light."',
        },
        {
          id: 11,
          type: 'multiple-choice',
          prompt:
            'What is the main advantage of magnetoencephalography mentioned in the passage?',
          options: [
            'It is cheaper than all other brain imaging techniques.',
            'It provides a non-invasive view of brain function without radiation exposure.',
            'It can only be used on children.',
            'It replaces the need for atomic clocks in hospitals.',
          ],
          answer: 'It provides a non-invasive view of brain function without radiation exposure.',
          explanation:
            '"offering doctors a non-invasive window into brain function without the radiation exposure associated with some other imaging techniques."',
        },
        {
          id: 12,
          type: 'multiple-choice',
          prompt:
            'What do mining companies and some defence analysts have in common, according to the passage?',
          options: [
            'Both have already deployed operational quantum gravimeter systems.',
            'Both have expressed interest in applications of quantum gravimeters.',
            'Both have rejected quantum sensing technology as impractical.',
            'Both primarily use SQUIDs rather than gravimeters.',
          ],
          answer: 'Both have expressed interest in applications of quantum gravimeters.',
          explanation:
            '"Mining companies have expressed interest... while some defence analysts have suggested..."',
        },
        {
          id: 13,
          type: 'multiple-choice',
          prompt:
            'What does the passage identify as a major barrier to widespread quantum sensor deployment?',
          options: [
            'A lack of scientific interest in the field.',
            'The need for extreme cooling and delicate equipment in many current designs.',
            'Legal restrictions on quantum research.',
            'The absence of any successful applications so far.',
          ],
          answer: 'The need for extreme cooling and delicate equipment in many current designs.',
          explanation:
            '"Many of the most sensitive quantum sensors currently require extreme cooling, cumbersome vacuum chambers, or careful magnetic shielding... which make them expensive and delicate."',
        },
      ],
    },
  ],

  listening: [
    {
      number: 4,
      title: 'Section 4: A History of the Coffee Trade',
      transcript:
        'LECTURER: Today I want to trace the global spread of coffee, from its origins to becoming one of the most traded commodities in the world.\n\nCoffee is believed to have originated in Ethiopia, in a region called Kaffa, where legend says a goatherd named Kaldi noticed his goats became energetic after eating berries from a certain shrub. From there, cultivation spread to Yemen by the fifteenth century, where coffee was first grown commercially and traded through the port of Mocha — which, incidentally, is where the term "mocha" comes from.\n\nBy the sixteenth century, coffee houses had appeared across the Ottoman Empire, and these became important social and intellectual hubs. The drink then reached Europe via Venetian merchants in the early seventeenth century. Initially, some clergy viewed coffee with suspicion, calling it the "bitter invention of Satan," until Pope Clement the Eighth reportedly tasted it and approved of it.\n\nEuropean colonial powers soon began cultivating coffee in their tropical colonies. The Dutch introduced it to Java in the late seventeenth century, and the French brought a single plant to the Caribbean island of Martinique in seventeen twenty-three — remarkably, that one plant is thought to be the ancestor of much of the coffee later grown across Latin America.\n\nBrazil, now the world\'s largest coffee producer, didn\'t begin large-scale cultivation until the eighteenth century, but by the eighteen-hundreds it dominated global supply, aided by slave labour and later by mass immigration of workers from Europe.\n\nToday, coffee is grown in over seventy countries, and the trade supports an estimated twenty-five million farmers worldwide. However, the industry faces challenges: price volatility on commodity markets, and increasingly, climate change, which is shrinking the amount of land suitable for growing high-quality Arabica beans.\n\nNext week, we\'ll examine the rise of fair-trade certification schemes in response to these pressures.',
      questions: [
        {
          id: 1,
          type: 'note-completion',
          prompt: 'Origin: region of ____, Ethiopia',
          answer: 'Kaffa',
          explanation: '"in a region called Kaffa."',
        },
        {
          id: 2,
          type: 'note-completion',
          prompt:
            'First commercial cultivation: ____ (by 15th century), traded via port of Mocha',
          answer: 'Yemen',
          explanation:
            '"cultivation spread to Yemen by the fifteenth century, where coffee was first grown commercially."',
        },
        {
          id: 3,
          type: 'note-completion',
          prompt: '16th century: coffee houses spread across the ____',
          answer: 'Ottoman Empire',
          explanation: '"coffee houses had appeared across the Ottoman Empire."',
        },
        {
          id: 4,
          type: 'note-completion',
          prompt: 'Reached Europe via: ____ merchants',
          answer: 'Venetian',
          explanation: '"The drink then reached Europe via Venetian merchants."',
        },
        {
          id: 5,
          type: 'note-completion',
          prompt: 'Dutch introduced coffee to: ____',
          answer: 'Java',
          explanation: '"The Dutch introduced it to Java in the late seventeenth century."',
        },
        {
          id: 6,
          type: 'note-completion',
          prompt: 'French brought one plant to: ____, in 1723',
          answer: 'Martinique',
          explanation:
            '"the French brought a single plant to the Caribbean island of Martinique in seventeen twenty-three."',
        },
        {
          id: 7,
          type: 'note-completion',
          prompt: 'Number of countries growing coffee today: ____',
          answer: ['over 70', 'over seventy', '70+'],
          explanation: '"coffee is grown in over seventy countries."',
        },
        {
          id: 8,
          type: 'multiple-choice',
          prompt: 'According to legend, Kaldi noticed that his goats',
          options: [
            'avoided a certain shrub.',
            'became energetic after eating berries.',
            'fell asleep near a shrub.',
          ],
          answer: 'became energetic after eating berries.',
          explanation:
            '"his goats became energetic after eating berries from a certain shrub."',
        },
        {
          id: 9,
          type: 'multiple-choice',
          prompt: "Coffee's early reputation among some clergy was",
          options: [
            'positive from the start.',
            'neutral.',
            'negative until Pope Clement the Eighth approved it.',
          ],
          answer: 'negative until Pope Clement the Eighth approved it.',
          explanation:
            '"some clergy viewed coffee with suspicion... until Pope Clement the Eighth reportedly tasted it and approved of it."',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt: 'The lecturer says the coffee industry today is challenged by',
          options: [
            'lack of demand and overproduction.',
            'price volatility and climate change.',
            'government bans and taxation.',
          ],
          answer: 'price volatility and climate change.',
          explanation:
            '"price volatility on commodity markets, and increasingly, climate change."',
        },
      ],
    },
  ],

  writing: [
    {
      task: 1,
      prompt:
        'The pie charts below show the sources of electricity generation in a country in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWords: 150,
      visual:
        'Two pie charts comparing electricity-generation sources in 2000 vs 2020: Coal 55% → 15%; Natural gas 25% → 30%; Nuclear 10% → 10%; Renewables 5% → 40%; Oil 5% → 5%.',
      modelAnswer:
        'The two pie charts compare the proportion of electricity generated from five different energy sources in the years 2000 and 2020.\n\nOverall, the most significant change was a dramatic shift away from coal towards renewable energy, while natural gas increased moderately and both nuclear power and oil remained unchanged.\n\nIn 2000, coal was overwhelmingly the dominant source, accounting for just over half of all electricity generation at 55%. Natural gas was the second-largest contributor at 25%, while nuclear power and renewables made up much smaller shares, at 10% and 5% respectively. Oil contributed the remaining 5%.\n\nBy 2020, this picture had changed considerably. Coal\'s share had fallen sharply to only 15%, while renewables had risen to become the single largest source at 40%, overtaking every other category. Natural gas also grew, albeit more modestly, from 25% to 30%. In contrast, nuclear power remained steady at 10%, and oil\'s contribution stayed constant at 5%, showing no change at all across the two decades.',
      examinerNotes: [
        'Task Achievement identifies the key overview (coal-to-renewables shift) and reports all ten data points precisely without invented figures.',
        'Coherence & Cohesion uses clear temporal paragraphing and cohesive contrast markers ("In contrast", "By 2020, this picture had changed").',
        'Lexical Resource varies the language of change effectively (fallen sharply, risen, grew more modestly, remained steady).',
        'Grammatical Range & Accuracy demonstrates accurate use of past perfect and comparative constructions with no errors.',
      ],
    },
    {
      task: 2,
      prompt:
        'Some people believe that governments should invest heavily in renewable energy even if it means higher taxes, while others think this money would be better spent on more immediate priorities such as healthcare and education. Discuss both these views and give your own opinion.',
      minWords: 250,
      modelAnswer:
        'As governments grapple with limited public budgets, a debate has emerged over whether renewable energy investment should take precedence over more immediate concerns like healthcare and education. This essay will consider both perspectives before offering my own assessment.\n\nAdvocates of prioritising renewable energy argue that climate change poses an existential threat that cannot be postponed. Delaying the transition to solar, wind, and other clean sources risks locking in decades of further fossil fuel dependency, with catastrophic long-term consequences for ecosystems, agriculture, and public health itself. From this perspective, higher taxes today represent a modest price for avoiding far greater costs, both financial and human, in the future.\n\nConversely, those who favour funding healthcare and education point to the urgency of problems affecting citizens right now. Underfunded hospitals and overcrowded classrooms have immediate, measurable impacts on wellbeing and social mobility, whereas the benefits of renewable energy investment, while real, tend to accrue gradually over years or decades. For governments facing pressing shortages of doctors, nurses, and teachers, redirecting funds towards long-term energy infrastructure can seem like a poorly timed misallocation of scarce resources.\n\nIn my opinion, this need not be a strict either-or choice. Many renewable energy projects, such as wind farms, can attract private investment and generate long-term returns that do not solely depend on tax revenue, potentially freeing up public funds for healthcare and education simultaneously. Moreover, viewing environmental and social spending as entirely separate ignores the fact that pollution from fossil fuels itself contributes to rising healthcare costs.\n\nIn conclusion, while both renewable energy and immediate public services deserve substantial investment, a well-designed policy combining private financing for infrastructure with sustained public spending on healthcare and education would serve society better than treating these as competing priorities.',
      examinerNotes: [
        'Task Response thoroughly discusses both views with well-developed supporting reasoning before presenting a clear, integrated personal opinion.',
        'Coherence & Cohesion follows a textbook discussion structure with strong paragraph unity and linking devices (Conversely, Moreover).',
        'Lexical Resource includes precise, topic-appropriate vocabulary (existential threat, social mobility, misallocation).',
        'Grammatical Range & Accuracy shows sophisticated conditional and hypothetical structures (need not be, would serve) used accurately.',
      ],
    },
  ],

  speaking: [
    {
      part: 1,
      title: 'Part 1: Introduction and Interview',
      questions: [
        'How many people are there in your family?',
        'Who are you closest to in your family?',
        'Do you think family relationships have changed in recent generations?',
        'How often do you spend time with your extended family?',
        'What are your plans for the next few years?',
        'Do you prefer to plan ahead or take things as they come?',
        'Has anyone influenced your future plans significantly?',
        'What would you like to achieve by the end of this decade?',
      ],
      sampleAnswers: [],
    },
    {
      part: 2,
      title: 'Part 2: Individual Long Turn (Cue Card)',
      questions: [
        'Describe a person who has influenced your career choice. You should say:',
        '• who this person is',
        '• how you know them',
        '• what they did or said that influenced you',
        '• and explain how this has affected your career path',
        'You will have one minute to prepare and should speak for one to two minutes.',
        'Follow-up: Do you think family members are usually the biggest influence on career choices?',
      ],
      sampleAnswers: [
        "The person who has had the most significant influence on my career choice is actually my high school chemistry teacher, Mr. Patel, whom I studied under for two years before graduating. What struck me about him wasn't just his expertise, but the sheer enthusiasm he brought to every lesson — he had this remarkable ability to make even the driest concepts, like molecular bonding, feel genuinely fascinating. On one occasion, after I'd struggled with a particularly difficult assignment, he stayed behind after class to walk me through it step by step, and he mentioned offhand that he thought I had a natural aptitude for scientific reasoning. That comment stuck with me far more than he probably realised. Up until that point, I'd been fairly undecided about what to study at university, but his encouragement nudged me toward pursuing chemical engineering, which I'm now specialising in. Looking back, I don't think I would have considered this path at all had it not been for his belief in my abilities during a moment when I doubted myself. It's made me appreciate how a single conversation, delivered at the right time, can quietly redirect the entire trajectory of someone's professional life.",
      ],
    },
    {
      part: 3,
      title: 'Part 3: Two-Way Discussion',
      questions: [
        "Who typically has the greatest influence on young people's career choices?",
        'Do you think career guidance in schools is adequate?',
        'Should parents encourage children to pursue stable careers or follow their passions?',
        "How important are role models in shaping a person's professional life?",
        'Do you think it is common for people to change careers later in life nowadays?',
        'How might changing job markets affect the way young people choose careers in the future?',
      ],
      sampleAnswers: [],
    },
  ],
};

// -----------------------------------------------------------------------------
// TEST 7 (source Test 5) — Reading: The Bystander Effect · Listening: Lost
// property at a train station · Writing: international student numbers /
// causes & effects of studying abroad · Speaking: friends & helping others.
// -----------------------------------------------------------------------------
const TEST_7: IeltsTest = {
  id: 'ielts-academic-7',
  title: 'IELTS Practice Test 7',
  module: 'Academic',
  source: 'Generated practice set (verified)',

  reading: [
    {
      number: 1,
      title: 'Why Crowds Can Make Us Less Helpful',
      text:
        'In 1964, the murder of Kitty Genovese in New York City became a pivotal case study in social psychology, not because of the crime itself but because of widespread early reports, later shown to be partly exaggerated, that numerous witnesses failed to intervene or call for help. Regardless of the precise facts of that particular case, the tragedy prompted psychologists John Darley and Bibb Latané to investigate a curious and counterintuitive question: does the presence of other people make individuals less likely to help someone in distress?\n\nDarley and Latané\'s subsequent experiments confirmed a phenomenon now known as the bystander effect. In a series of controlled studies, participants who believed they were the only witness to an emergency, such as someone appearing to have a seizure over an intercom, intervened quickly and at high rates. However, when participants believed multiple other bystanders were also present, they were significantly less likely to help, and those who did help took considerably longer to act. Crucially, this occurred even though participants were not being lazy or callous; many reported genuine distress at the emergency but simply failed to act.\n\nPsychologists identify several mechanisms behind this effect. The first is diffusion of responsibility: when multiple people are present, each individual feels less personally obligated to act, since responsibility is implicitly shared among everyone present. A second factor is what researchers call pluralistic ignorance, in which bystanders look to others\' reactions to interpret an ambiguous situation, and if everyone else appears calm, each individual assumes the situation is not actually an emergency, even though every other bystander may be feeling the same private uncertainty. A third factor, evaluation apprehension, reflects a fear of being judged or embarrassed if one\'s intervention turns out to be unnecessary or is performed incorrectly in front of others.\n\nSubsequent research has refined understanding of when the bystander effect is strongest and when it can be overcome. Meta-analyses conducted decades after Darley and Latané\'s original work confirmed that the basic effect is robust across many types of emergencies, though its magnitude varies considerably depending on the situation. Notably, the effect tends to be weaker in situations of unambiguous, high-danger emergencies, such as a physical assault witnessed directly, compared with ambiguous situations where it is unclear whether help is genuinely needed. Some studies have also found that the effect can be reduced when bystanders know one another personally, since group cohesion appears to counteract diffusion of responsibility to some degree.\n\nUnderstanding the bystander effect has led to practical interventions designed to counteract it. Many emergency response training programmes now specifically teach witnesses to single out one bystander directly — for example, by pointing at a particular individual and issuing a specific instruction such as "you, call an ambulance" — rather than issuing a general appeal to the crowd. This technique interrupts diffusion of responsibility by assigning clear, individual responsibility rather than leaving it ambiguous. Some workplace and university safety programmes have incorporated bystander intervention training more broadly, aiming to teach people to recognise ambiguous situations as potential emergencies and to overcome the social inhibitions that often prevent early action.\n\nCritics have noted that most of the foundational research on the bystander effect was conducted in relatively controlled laboratory settings that may not fully capture the complexity of real-world emergencies, where factors such as physical danger to the potential helper, prior relationships between individuals, and cultural context all play a role. Some researchers have also called for more studies conducted in naturalistic settings, using anonymised video footage of genuine public emergencies, arguing that such data could help clarify how closely laboratory findings generalise to the unpredictable conditions of everyday life. Nonetheless, the bystander effect remains one of the most replicated and influential findings in social psychology, and it continues to inform both academic research and practical public safety training worldwide.',
      questions: [
        {
          id: 1,
          type: 'true-false-notgiven',
          prompt:
            'Early reports about the number of witnesses to the Kitty Genovese case were later shown to be partly exaggerated.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"widespread early reports, later shown to be partly exaggerated, that numerous witnesses failed to intervene."',
        },
        {
          id: 2,
          type: 'true-false-notgiven',
          prompt:
            'Participants who believed they were the only witness to an emergency intervened quickly and at high rates.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            '"participants who believed they were the only witness to an emergency... intervened quickly and at high rates."',
        },
        {
          id: 3,
          type: 'true-false-notgiven',
          prompt:
            "Kitty Genovese's attacker was eventually identified through the psychological research that followed her death.",
          options: ['True', 'False', 'Not Given'],
          answer: 'Not Given',
          explanation:
            'The passage discusses the psychological research prompted by the case but never mentions identification of the attacker.',
        },
        {
          id: 4,
          type: 'true-false-notgiven',
          prompt: 'The bystander effect is equally strong in every type of emergency situation.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation: '"though its magnitude varies considerably depending on the situation."',
        },
        {
          id: 5,
          type: 'summary-completion',
          prompt:
            'Psychologists identify three main mechanisms behind the bystander effect. The first, called ____, means that each bystander feels less personal obligation to act when others are present.',
          answer: 'diffusion of responsibility',
          explanation:
            '"each individual feels less personally obligated to act, since responsibility is implicitly shared."',
        },
        {
          id: 6,
          type: 'summary-completion',
          prompt:
            'The second, called ____, occurs when bystanders look to others to judge whether a situation is really an emergency.',
          answer: 'pluralistic ignorance',
          explanation: '"a second factor is what researchers call pluralistic ignorance."',
        },
        {
          id: 7,
          type: 'summary-completion',
          prompt:
            "The third, called ____, is a fear of being judged if one's help turns out to be unnecessary.",
          answer: 'evaluation apprehension',
          explanation:
            '"reflects a fear of being judged or embarrassed if one\'s intervention turns out to be unnecessary."',
        },
        {
          id: 8,
          type: 'summary-completion',
          prompt:
            'Training programmes teach witnesses to counteract diffusion of responsibility by pointing at a specific bystander and giving a ____, rather than making a general appeal.',
          answer: 'specific instruction',
          explanation:
            'issuing "a specific instruction such as \'you, call an ambulance.\'"',
        },
        {
          id: 9,
          type: 'summary-completion',
          prompt:
            'Critics note that foundational studies on the bystander effect were mostly conducted in controlled ____ settings.',
          answer: 'laboratory',
          explanation: '"conducted in relatively controlled laboratory settings."',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt: 'According to the passage, the bystander effect tends to be weaker in',
          options: [
            'ambiguous situations where it is unclear if help is needed.',
            'unambiguous, high-danger emergencies such as a direct physical assault.',
            'situations involving strangers rather than friends.',
            'laboratory experiments compared with real-world settings.',
          ],
          answer: 'unambiguous, high-danger emergencies such as a direct physical assault.',
          explanation:
            '"the effect tends to be weaker in situations of unambiguous, high-danger emergencies."',
        },
        {
          id: 11,
          type: 'multiple-choice',
          prompt: 'What did some studies find about bystanders who know each other personally?',
          options: [
            'They show a stronger bystander effect than strangers.',
            'The effect can be reduced due to greater group cohesion.',
            'They are more likely to experience evaluation apprehension.',
            'They never intervene in emergencies.',
          ],
          answer: 'The effect can be reduced due to greater group cohesion.',
          explanation:
            '"the effect can be reduced when bystanders know one another personally, since group cohesion appears to counteract diffusion of responsibility."',
        },
        {
          id: 12,
          type: 'multiple-choice',
          prompt:
            'Why do many training programmes teach witnesses to single out one bystander with a specific instruction?',
          options: [
            'To identify who is responsible for causing the emergency.',
            'To reduce the total number of people who respond.',
            'To interrupt diffusion of responsibility by assigning clear individual responsibility.',
            'To test whether the bystander effect will occur.',
          ],
          answer:
            'To interrupt diffusion of responsibility by assigning clear individual responsibility.',
          explanation:
            '"This technique interrupts diffusion of responsibility by assigning clear, individual responsibility."',
        },
        {
          id: 13,
          type: 'multiple-choice',
          prompt:
            "What is the writer's overall assessment of the bystander effect as a psychological finding?",
          options: [
            'It has been largely discredited by later research.',
            'It remains one of the most replicated and influential findings in social psychology.',
            'It applies only to laboratory conditions and not real life.',
            'It has been replaced by newer, unrelated theories.',
          ],
          answer:
            'It remains one of the most replicated and influential findings in social psychology.',
          explanation:
            '"the bystander effect remains one of the most replicated and influential findings in social psychology."',
        },
      ],
    },
  ],

  listening: [
    {
      number: 1,
      title: 'Section 1: Lost Property at the Train Station',
      transcript:
        "STAFF: Lost Property office, how can I help?\n\nPASSENGER: Hi, I think I left my umbrella on a train yesterday evening.\n\nSTAFF: No problem, let's see what we can find. Can you tell me what time you travelled?\n\nPASSENGER: I got on at around six fifteen, from Platform 4.\n\nSTAFF: And which service was that — do you know the destination?\n\nPASSENGER: It was heading to Manchester Piccadilly.\n\nSTAFF: Okay, and can you describe the umbrella?\n\nPASSENGER: It's black with a wooden handle, and it has a small tear near the top.\n\nSTAFF: Right, let me check our log... Yes, actually, we do have a black umbrella handed in yesterday. Can I take your name?\n\nPASSENGER: It's Priya Anand.\n\nSTAFF: Could you spell your first name?\n\nPASSENGER: P-R-I-Y-A.\n\nSTAFF: Thanks. And a phone number in case we need to contact you?\n\nPASSENGER: Zero one six one, seven double eight, three three zero nine.\n\nSTAFF: Got it. Now, to collect the item, you'll need to come to this office with photo ID, and there's a small handling fee of two pounds fifty.\n\nPASSENGER: That's fine. What are your opening hours?\n\nSTAFF: We're open Monday to Saturday, nine till five, but closed on Sundays.\n\nPASSENGER: Great, I'll come tomorrow then, around lunchtime.\n\nSTAFF: Perfect, we'll hold it at the counter for you. Oh, one more thing — items are only kept for thirty days, so it's good you called soon.",
      questions: [
        {
          id: 1,
          type: 'note-completion',
          prompt: 'Item: ____',
          answer: 'Umbrella',
          explanation: '"I think I left my umbrella on a train yesterday evening."',
        },
        {
          id: 2,
          type: 'note-completion',
          prompt: 'Platform boarded: ____',
          answer: ['Platform 4', '4'],
          explanation: '"I got on at around six fifteen, from Platform 4."',
        },
        {
          id: 3,
          type: 'note-completion',
          prompt: 'Destination: ____',
          answer: 'Manchester Piccadilly',
          explanation: '"It was heading to Manchester Piccadilly."',
        },
        {
          id: 4,
          type: 'note-completion',
          prompt: "Passenger's first name: ____",
          answer: 'Priya',
          explanation: '"P-R-I-Y-A."',
        },
        {
          id: 5,
          type: 'note-completion',
          prompt: 'Phone number: ____',
          answer: ['0161 788 3309', '01617883309'],
          explanation:
            '"Zero one six one, seven double eight, three three zero nine."',
        },
        {
          id: 6,
          type: 'note-completion',
          prompt: 'Handling fee: £____',
          answer: ['2.50', 'two pounds fifty'],
          explanation: '"there\'s a small handling fee of two pounds fifty."',
        },
        {
          id: 7,
          type: 'multiple-choice',
          prompt: 'The umbrella is described as',
          options: [
            'blue with a plastic handle.',
            'black with a wooden handle.',
            'black with a small hole in the fabric.',
          ],
          answer: 'black with a wooden handle.',
          explanation:
            '"It\'s black with a wooden handle, and it has a small tear near the top."',
        },
        {
          id: 8,
          type: 'multiple-choice',
          prompt: 'What must the passenger bring to collect the item?',
          options: ['a receipt', 'photo ID', 'the train ticket'],
          answer: 'photo ID',
          explanation: "\"you'll need to come to this office with photo ID.\"",
        },
        {
          id: 9,
          type: 'multiple-choice',
          prompt: 'The office is closed on',
          options: ['Saturdays.', 'Sundays.', 'Mondays.'],
          answer: 'Sundays.',
          explanation:
            "\"We're open Monday to Saturday... but closed on Sundays.\"",
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt: 'Items are kept in lost property for',
          options: ['30 days.', '60 days.', '90 days.'],
          answer: '30 days.',
          explanation: '"items are only kept for thirty days."',
        },
      ],
    },
  ],

  writing: [
    {
      task: 1,
      prompt:
        'The table below shows the number of international students (in thousands) enrolled in universities in four countries in 2005, 2015, and 2025 (projected). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWords: 150,
      visual:
        'A table showing international student numbers (thousands) in Australia, Canada, the UK, and Germany for 2005, 2015, and 2025 (projected): Australia 175/350/550; Canada 80/300/640; UK 300/430/500; Germany 190/250/310.',
      modelAnswer:
        'The table shows the number of international students, measured in thousands, enrolled in universities in Australia, Canada, the UK, and Germany in 2005 and 2015, along with projected figures for 2025.\n\nOverall, international student numbers rose substantially in all four countries over the twenty-year period, with Canada showing by far the most rapid growth and overtaking the UK to become the projected leader by 2025.\n\nIn 2005, the UK hosted the largest number of international students at 300,000, well ahead of Germany (190,000), Australia (175,000), and Canada, which had only 80,000. By 2015, all countries had grown, but Canada\'s figure had multiplied nearly fourfold to 300,000, closing much of the gap on Australia\'s 350,000, while the UK, though still ahead of both at 430,000, saw its lead over Canada narrow considerably.\n\nLooking ahead to 2025, Canada is projected to reach 640,000, overtaking the UK, whose growth is expected to slow to 500,000. Australia is forecast to rise to 550,000, while Germany, despite steady growth throughout, is projected to remain the lowest of the four at 310,000.',
      examinerNotes: [
        'Task Achievement accurately reports and compares all twelve data points, including the projected figures, and identifies the key trend of Canada overtaking the UK.',
        'Coherence & Cohesion organises information clearly by year with appropriate cohesive devices ("Looking ahead to 2025").',
        'Lexical Resource uses varied quantifying and comparative language (multiplied nearly fourfold, drawing level, narrowing considerably).',
        'Grammatical Range & Accuracy includes accurate future/projection forms (is projected to, is expected to, is forecast to) alongside past tense description.',
      ],
    },
    {
      task: 2,
      prompt:
        'An increasing number of students are choosing to study at universities in other countries rather than in their home country. What are the causes of this trend, and do you think it is a positive or negative development?',
      minWords: 250,
      modelAnswer:
        'Studying abroad has become an increasingly popular choice for university students worldwide. This essay will examine the main reasons behind this trend before arguing that, on balance, it represents a positive development.\n\nSeveral factors have driven this shift. Firstly, globalisation has made international qualifications more portable and prestigious, with employers increasingly valuing candidates who have studied and worked across borders. Secondly, some students are drawn by academic reputation, as certain institutions, particularly in the United States, the UK, and Australia, are perceived to offer superior research facilities and teaching quality unavailable at home. Finally, improved access to information and scholarship funding, alongside cheaper international travel, has made overseas study logistically and financially feasible for a far broader range of students than in previous generations.\n\nIn my view, this trend is largely beneficial, both for individuals and for the countries involved. On a personal level, studying abroad exposes students to different cultures, teaching methods, and ways of thinking, fostering adaptability and independence that are difficult to cultivate at home. These experiences often translate into stronger career prospects, as multinational employers increasingly favour candidates with cross-cultural competence and international networks.\n\nAt a societal level, host countries benefit economically from tuition fees and living expenditure, while sending countries gain when graduates return with valuable skills and international connections, a phenomenon often termed "brain circulation" rather than simple brain drain. Admittedly, some concern exists that talented graduates may permanently emigrate, depriving their home countries of expertise, yet this risk can be mitigated through targeted incentive programmes encouraging eventual return.\n\nIn conclusion, while the trend towards overseas study is driven by a combination of globalisation, academic prestige, and improved accessibility, its overall impact is positive, enriching individuals and, in most cases, ultimately benefiting both host and home countries alike.',
      examinerNotes: [
        'Task Response answers both parts of the two-part question (causes, and positive/negative judgement) with well-developed, specific reasoning.',
        'Coherence & Cohesion is maintained through clear causal and evaluative paragraphing with signposting (Firstly, Secondly, Finally, At a societal level).',
        'Lexical Resource includes precise terminology (brain circulation, cross-cultural competence) used accurately.',
        'Grammatical Range & Accuracy demonstrates complex clauses and passive constructions handled with consistent accuracy.',
      ],
    },
  ],

  speaking: [
    {
      part: 1,
      title: 'Part 1: Introduction and Interview',
      questions: [
        'How would you describe your closest friend?',
        'How did you meet your friends?',
        'What do you usually do together with your friends?',
        "Do you think it's important to keep in touch with old friends?",
        'Do you often help family members or friends?',
        'Can you recall a time you helped someone recently?',
        'Do you find it easy or difficult to ask others for help?',
        'Why do you think some people are more willing to help than others?',
      ],
      sampleAnswers: [],
    },
    {
      part: 2,
      title: 'Part 2: Individual Long Turn (Cue Card)',
      questions: [
        'Describe a time you helped a friend or family member solve a problem. You should say:',
        '• who you helped',
        '• what the problem was',
        '• what you did to help',
        '• and explain how the situation turned out',
        'You will have one minute to prepare and should speak for one to two minutes.',
        'Follow-up: Do you generally prefer solving problems by yourself or with others?',
      ],
      sampleAnswers: [
        "Last year, my younger cousin came to me in quite a state of panic because she'd accidentally deleted an entire semester's worth of university assignments from her laptop just days before a major submission deadline. She'd never backed anything up, and understandably, she was convinced everything was irretrievably lost. Since I have a reasonable amount of technical know-how, I sat down with her and began systematically working through recovery options — first checking the recycle bin, then trying a few data recovery programs I'd used before in similar situations. It took the better part of an evening, but we eventually managed to recover about ninety percent of her files, including the crucial assignment drafts. Beyond just fixing the immediate crisis, I also helped her set up an automatic cloud backup system so that a similar disaster couldn't happen again. Seeing the relief on her face when the files reappeared was honestly one of the more satisfying moments I've had recently — there's something genuinely rewarding about using a skill you have to spare someone from real distress. She still occasionally jokes that I saved her degree that night, which is probably a slight exaggeration, but I'm glad I was in a position to help.",
      ],
    },
    {
      part: 3,
      title: 'Part 3: Two-Way Discussion',
      questions: [
        'Why do you think some people are reluctant to ask for help?',
        'Do you think communities today are less supportive than in the past?',
        'What role should technology play in helping people solve everyday problems?',
        "Is it always a good idea to help someone, even if they haven't asked for it?",
        'How does helping others benefit the person giving the help?',
        'Do you think younger generations are more or less willing to help others compared to older generations?',
      ],
      sampleAnswers: [],
    },
  ],
};

export const IELTS_PRACTICE_TESTS_A: IeltsTest[] = [
  TEST_3,
  TEST_4,
  TEST_5,
  TEST_6,
  TEST_7,
];
