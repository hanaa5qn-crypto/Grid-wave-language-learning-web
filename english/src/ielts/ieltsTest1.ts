// =============================================================================
// IELTS Academic — Practice Test 1
// -----------------------------------------------------------------------------
// A complete, self-contained Academic IELTS test object conforming to the
// IeltsTest contract in ../types. Structure mirrors the official paper:
//   • Reading  : 3 passages, 40 questions total (13 / 13 / 14)
//   • Listening: 4 sections, 40 questions total (10 each)
//   • Writing  : 2 tasks (Task 1 = 150 words, Task 2 = 250 words)
//   • Speaking : 3 parts (interview, cue card, discussion)
// Passages are original prose written in the academic register, with paragraphs
// separated by \n\n and labelled A, B, C… where matching-headings is used.
// =============================================================================
import { IeltsTest } from '../types';

export const IELTS_TEST_1: IeltsTest = {
  id: 'ielts-academic-1',
  title: 'IELTS Academic — Practice Test 1',
  module: 'Academic',
  source:
    'Modeled on the Cambridge IELTS Academic test format (official structure, original passages).',

  // ===========================================================================
  // READING — 3 passages, 40 questions (13 + 13 + 14)
  // ===========================================================================
  reading: [
    // ---------------------------------------------------------------------
    // PASSAGE 1 — Science / natural history. Questions 1–13.
    // ---------------------------------------------------------------------
    {
      number: 1,
      title: 'The Secret Life of the Honeybee',
      text:
        'A\nFew insects have been studied as closely, or admired as widely, as the western honeybee, Apis mellifera. For thousands of years humans have harvested its honey, yet only in the last century have scientists begun to understand the extraordinary social machinery that produces it. A single colony may contain as many as sixty thousand bees, almost all of them sterile female workers, together with a single egg-laying queen and a few hundred male drones whose only function is reproduction. What fascinates researchers is not the size of the colony but the way in which tens of thousands of tiny brains, none of them in charge, combine to act as if guided by a single intelligence.\n\nB\nThe most celebrated example of this collective behaviour is the so-called waggle dance, first decoded by the Austrian ethologist Karl von Frisch in the 1940s. When a foraging bee discovers a rich source of nectar, it returns to the darkened hive and performs a looping figure-of-eight pattern on the vertical surface of the comb. The angle of the central, waggling run relative to the vertical encodes the direction of the food in relation to the sun, while the duration of the waggle indicates the distance. Watching nest-mates read this information in complete darkness and then fly directly to the target, von Frisch concluded that bees possess a symbolic language — a claim so bold that it took decades to win full acceptance.\n\nC\nDirection and distance are not the only things a returning forager communicates. The vigour of the dance, and the number of times it is repeated, advertise the quality of the find: a particularly sweet or abundant source provokes a longer, more energetic performance and so recruits more bees. In this way the colony continuously adjusts the proportion of its workforce devoted to each flower patch, concentrating effort where the reward is greatest. No individual bee compares the available options; the comparison emerges automatically from thousands of independent decisions, a phenomenon biologists call swarm intelligence.\n\nD\nThe same distributed decision-making governs one of the most dramatic events in the life of a colony: the choice of a new home. When a hive becomes overcrowded, roughly half the bees leave with the old queen and gather as a swarm on a nearby branch. From this temporary cluster, several hundred scout bees fly out to inspect potential cavities. Each scout that finds a promising site returns and dances for it, and the better the site, the longer she dances. Other scouts visit the advertised locations and, if impressed, add their own dances. Gradually a consensus builds until one site attracts an overwhelming majority, and the entire swarm lifts off together. Remarkably, experiments by the American biologist Thomas Seeley have shown that swarms almost always select the objectively best cavity available, even when the differences between sites are subtle.\n\nE\nUnderlying all of this is an exquisite sensitivity to chemistry. Bees communicate not only by movement but through pheromones — airborne chemical signals that coordinate behaviour across the whole colony. The queen continuously releases a blend of substances, sometimes called queen substance, that suppresses the development of rival queens and reassures the workers that she is alive and healthy. Should she die or be removed, the disappearance of this scent is detected within hours, and the workers immediately begin raising replacement queens from ordinary larvae. Alarm pheromones, by contrast, spread panic and aggression in seconds, mobilising guards to defend the nest.\n\nF\nThe sophistication of these systems has not protected honeybees from a modern crisis. Since the early years of this century, beekeepers across Europe and North America have reported sudden, large-scale losses, a syndrome that came to be known as colony collapse disorder. The causes are still debated, but most researchers now point to a combination of pressures rather than a single villain: parasitic mites, viral infections, the loss of wildflower habitat, and exposure to certain agricultural pesticides. Because honeybees pollinate a large share of the crops humans eat, their decline is not merely a problem for naturalists. It is a reminder that the quiet, collective intelligence of the hive underpins far more of our world than most of us ever notice.',
      questions: [
        // Matching headings (paragraphs A–F): Q1–Q6
        {
          id: 1,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph A.',
          options: [
            'i. How bees choose where to live',
            'ii. A tiny insect with a collective mind',
            'iii. Chemical messages within the hive',
            'iv. Reading direction and distance from a dance',
            'v. A modern threat to the colony',
            'vi. Advertising the value of a discovery',
          ],
          answer: 'ii. A tiny insect with a collective mind',
          explanation:
            'Paragraph A introduces the colony as tens of thousands of brains acting "as if guided by a single intelligence" — the idea of a collective mind.',
        },
        {
          id: 2,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph B.',
          options: [
            'i. How bees choose where to live',
            'ii. A tiny insect with a collective mind',
            'iii. Chemical messages within the hive',
            'iv. Reading direction and distance from a dance',
            'v. A modern threat to the colony',
            'vi. Advertising the value of a discovery',
          ],
          answer: 'iv. Reading direction and distance from a dance',
          explanation:
            'Paragraph B explains von Frisch’s waggle dance: the angle encodes direction and the waggle duration encodes distance.',
        },
        {
          id: 3,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph C.',
          options: [
            'i. How bees choose where to live',
            'ii. A tiny insect with a collective mind',
            'iii. Chemical messages within the hive',
            'iv. Reading direction and distance from a dance',
            'v. A modern threat to the colony',
            'vi. Advertising the value of a discovery',
          ],
          answer: 'vi. Advertising the value of a discovery',
          explanation:
            'Paragraph C describes how the vigour and repetition of the dance advertise the quality of a food source, recruiting more bees.',
        },
        {
          id: 4,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph D.',
          options: [
            'i. How bees choose where to live',
            'ii. A tiny insect with a collective mind',
            'iii. Chemical messages within the hive',
            'iv. Reading direction and distance from a dance',
            'v. A modern threat to the colony',
            'vi. Advertising the value of a discovery',
          ],
          answer: 'i. How bees choose where to live',
          explanation:
            'Paragraph D is about swarming and how scout bees collectively select the best new nest cavity.',
        },
        {
          id: 5,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph E.',
          options: [
            'i. How bees choose where to live',
            'ii. A tiny insect with a collective mind',
            'iii. Chemical messages within the hive',
            'iv. Reading direction and distance from a dance',
            'v. A modern threat to the colony',
            'vi. Advertising the value of a discovery',
          ],
          answer: 'iii. Chemical messages within the hive',
          explanation:
            'Paragraph E discusses pheromones — queen substance and alarm pheromones — i.e. chemical communication.',
        },
        {
          id: 6,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph F.',
          options: [
            'i. How bees choose where to live',
            'ii. A tiny insect with a collective mind',
            'iii. Chemical messages within the hive',
            'iv. Reading direction and distance from a dance',
            'v. A modern threat to the colony',
            'vi. Advertising the value of a discovery',
          ],
          answer: 'v. A modern threat to the colony',
          explanation:
            'Paragraph F covers colony collapse disorder, the modern crisis threatening honeybees.',
        },
        // True / False / Not Given: Q7–Q10
        {
          id: 7,
          type: 'true-false-notgiven',
          prompt:
            'Most of the bees in a colony are female workers that cannot reproduce.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            'Paragraph A states the colony is "almost all of them sterile female workers".',
        },
        {
          id: 8,
          type: 'true-false-notgiven',
          prompt:
            'Von Frisch’s interpretation of the waggle dance was accepted immediately by other scientists.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            'Paragraph B says the claim "took decades to win full acceptance", so it was not accepted immediately.',
        },
        {
          id: 9,
          type: 'true-false-notgiven',
          prompt:
            'A single experienced bee weighs up all the available food sources before the colony decides.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            'Paragraph C states "No individual bee compares the available options"; the comparison emerges from many independent decisions.',
        },
        {
          id: 10,
          type: 'true-false-notgiven',
          prompt:
            'Honeybees produce more honey today than they did a century ago.',
          options: ['True', 'False', 'Not Given'],
          answer: 'Not Given',
          explanation:
            'The passage never compares modern and historical honey yields, so this cannot be confirmed or denied.',
        },
        // Summary completion (ONE WORD): Q11–Q13
        {
          id: 11,
          type: 'summary-completion',
          prompt:
            'When a hive is overcrowded, about half the bees leave with the old queen and form a ____ on a nearby branch.',
          answer: 'swarm',
          explanation:
            'Paragraph D: the departing bees "gather as a swarm on a nearby branch".',
        },
        {
          id: 12,
          type: 'summary-completion',
          prompt:
            'Special bees called ____ fly out to inspect possible new homes and dance for the best ones.',
          answer: ['scouts', 'scout bees'],
          explanation:
            'Paragraph D refers to "several hundred scout bees" that inspect potential cavities.',
        },
        {
          id: 13,
          type: 'summary-completion',
          prompt:
            'The chemical released by the queen, sometimes called queen ____, stops rival queens from developing.',
          answer: 'substance',
          explanation:
            'Paragraph E names this blend "queen substance", which "suppresses the development of rival queens".',
        },
      ],
    },

    // ---------------------------------------------------------------------
    // PASSAGE 2 — History / technology. Questions 14–26.
    // ---------------------------------------------------------------------
    {
      number: 2,
      title: 'The Printing Revolution',
      text:
        'When Johannes Gutenberg produced his first printed Bible in the German city of Mainz around 1455, he can have had little idea that he was setting in motion one of the most consequential transformations in human history. Gutenberg was a goldsmith by training, and his genius lay less in any single invention than in the combination of several existing techniques into a working system. He adapted the screw press already used for crushing grapes and olives, devised a metal alloy that could be cast into reusable individual letters, and formulated an oil-based ink that adhered to metal type. Together these elements made it possible, for the first time in Europe, to reproduce text quickly, accurately and in large quantities.\n\nBefore Gutenberg, books in Europe were copied by hand, usually by monks labouring in monastery workrooms. A single Bible might take a skilled scribe well over a year to complete, and the cost of such a manuscript was enormous, placing books beyond the reach of all but the wealthiest institutions and individuals. Printing changed this arithmetic almost overnight. A printer could produce hundreds of identical copies in the time it had once taken to make one, and the price of a book fell accordingly. Within fifty years of Gutenberg’s first Bible, presses had been established in more than two hundred and fifty European towns, and an estimated twenty million books had been printed — more than all the scribes of Europe had managed to copy in the preceding thousand years.\n\nThe consequences of this sudden abundance were profound and, to contemporaries, often unsettling. Ideas could now travel faster and further than ever before, and they could no longer be easily controlled. When the German friar Martin Luther pinned his criticisms of the Catholic Church to a church door in 1517, his arguments were swiftly printed and reprinted, spreading across the continent within weeks. Historians widely agree that the Protestant Reformation, which permanently divided Western Christianity, would have been impossible without the printing press. Authorities that had once controlled knowledge by controlling a handful of manuscripts now faced a torrent of cheap pamphlets they could not contain.\n\nPrinting also helped to standardise languages. When texts were copied by hand, spelling and grammar varied from region to region and even from scribe to scribe. Printers, however, needed to sell their books across the widest possible market, and so they tended to favour consistent spellings and a single dialect. Over time, the version of a language that appeared in print came to be regarded as the correct one, while regional variations were gradually relegated to the status of mere accents. In this way the press quietly shaped the national languages that we recognise today.\n\nPerhaps most importantly, the press accelerated the accumulation of knowledge itself. Scientists and scholars could now read one another’s work, build upon it, and circulate their findings to a wide audience without fear that an error introduced by a careless copyist would corrupt the text. The same diagram or table could be reproduced exactly in thousands of copies, allowing readers in distant cities to examine identical evidence. Many historians argue that the scientific revolution of the sixteenth and seventeenth centuries depended on precisely this reliability and reach. The printing press, in short, did not merely make books cheaper; it changed the very speed at which human understanding could grow.',
      questions: [
        // Multiple choice: Q14–Q16
        {
          id: 14,
          type: 'multiple-choice',
          prompt:
            'According to the passage, Gutenberg’s main achievement was that he',
          options: [
            'invented the screw press from scratch.',
            'combined several existing techniques into a working system.',
            'was the first person to produce ink.',
            'trained large numbers of monks to copy books.',
          ],
          answer:
            'combined several existing techniques into a working system.',
          explanation:
            'Paragraph 1: his genius lay in "the combination of several existing techniques into a working system".',
        },
        {
          id: 15,
          type: 'multiple-choice',
          prompt:
            'Before printing, books in Europe were expensive mainly because',
          options: [
            'paper was extremely scarce.',
            'they were copied slowly by hand.',
            'few people could read them.',
            'monasteries refused to share them.',
          ],
          answer: 'they were copied slowly by hand.',
          explanation:
            'Paragraph 2: books were copied by hand and "a single Bible might take a skilled scribe well over a year", making them enormously costly.',
        },
        {
          id: 16,
          type: 'multiple-choice',
          prompt:
            'The writer suggests that the spread of Luther’s ideas shows that printing',
          options: [
            'was mainly used for religious texts.',
            'made it hard for authorities to control information.',
            'was opposed by the Catholic Church from the start.',
            'was slower than handwritten copying.',
          ],
          answer:
            'made it hard for authorities to control information.',
          explanation:
            'Paragraph 3: ideas "could no longer be easily controlled", and authorities "faced a torrent of cheap pamphlets they could not contain".',
        },
        // Sentence completion (NO MORE THAN TWO WORDS): Q17–Q21
        {
          id: 17,
          type: 'sentence-completion',
          prompt:
            'Gutenberg adapted the ____ that was already used to crush grapes and olives.',
          answer: ['screw press', 'press'],
          explanation:
            'Paragraph 1: "He adapted the screw press already used for crushing grapes and olives".',
        },
        {
          id: 18,
          type: 'sentence-completion',
          prompt:
            'He developed an oil-based ____ that would stick to metal type.',
          answer: 'ink',
          explanation:
            'Paragraph 1: "an oil-based ink that adhered to metal type".',
        },
        {
          id: 19,
          type: 'sentence-completion',
          prompt:
            'Within fifty years, presses had appeared in more than 250 European ____.',
          answer: 'towns',
          explanation:
            'Paragraph 2: presses had been established in "more than two hundred and fifty European towns".',
        },
        {
          id: 20,
          type: 'sentence-completion',
          prompt:
            'Because printers sold across a wide market, the printed form of a language came to be seen as the ____ one.',
          answer: 'correct',
          explanation:
            'Paragraph 4: the printed version "came to be regarded as the correct one".',
        },
        {
          id: 21,
          type: 'sentence-completion',
          prompt:
            'Printing allowed the same diagram or ____ to be reproduced exactly in thousands of copies.',
          answer: 'table',
          explanation:
            'Paragraph 5: "The same diagram or table could be reproduced exactly in thousands of copies".',
        },
        // True / False / Not Given: Q22–Q26
        {
          id: 22,
          type: 'true-false-notgiven',
          prompt:
            'A hand-copied Bible could take a skilled scribe more than a year to finish.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            'Paragraph 2: "A single Bible might take a skilled scribe well over a year to complete".',
        },
        {
          id: 23,
          type: 'true-false-notgiven',
          prompt:
            'More books were printed in the fifty years after Gutenberg than European scribes had copied in the previous thousand years.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            'Paragraph 2: about twenty million books were printed, "more than all the scribes of Europe had managed to copy in the preceding thousand years".',
        },
        {
          id: 24,
          type: 'true-false-notgiven',
          prompt:
            'Gutenberg personally supported Martin Luther’s religious reforms.',
          options: ['True', 'False', 'Not Given'],
          answer: 'Not Given',
          explanation:
            'The passage gives no information about Gutenberg’s personal religious or political views; he died long before 1517.',
        },
        {
          id: 25,
          type: 'true-false-notgiven',
          prompt:
            'Printers generally preferred to keep many different regional spellings in their books.',
          options: ['True', 'False', 'Not Given'],
          answer: 'False',
          explanation:
            'Paragraph 4: printers "tended to favour consistent spellings and a single dialect", not many regional variants.',
        },
        {
          id: 26,
          type: 'true-false-notgiven',
          prompt:
            'Some historians link the scientific revolution to the reliability of printed texts.',
          options: ['True', 'False', 'Not Given'],
          answer: 'True',
          explanation:
            'Paragraph 5: "Many historians argue that the scientific revolution... depended on precisely this reliability and reach".',
        },
      ],
    },

    // ---------------------------------------------------------------------
    // PASSAGE 3 — Environment / social science. Questions 27–40.
    // ---------------------------------------------------------------------
    {
      number: 3,
      title: 'Rethinking the City: The Rise of Urban Green Space',
      text:
        'For most of the twentieth century, the dominant vision of the modern city was one of concrete, steel and traffic. Parks and gardens were valued, when they were valued at all, as pleasant amenities — places to relax at the weekend rather than essential components of urban infrastructure. In the past two decades, however, that view has changed dramatically. Faced with rising temperatures, worsening air quality and mounting evidence about the effects of urban life on mental health, planners and politicians have begun to treat green space not as a luxury but as a necessity, on a par with roads, water pipes and electricity cables.\n\nThe scientific case for urban greenery has grown steadily stronger. Trees and vegetation cool cities through shade and through evapotranspiration, the process by which plants release water vapour and so lower the surrounding air temperature. During heatwaves, well-planted neighbourhoods can be several degrees cooler than treeless ones nearby, a difference that is far from trivial when extreme heat is among the deadliest of all weather hazards. Vegetation also filters airborne pollutants and absorbs rainwater that would otherwise overwhelm drains, reducing the risk of flash flooding. A growing body of medical research, meanwhile, links access to green space with lower rates of anxiety and depression, faster recovery from illness, and greater overall wellbeing.\n\nYet recognising the value of green space is not the same as distributing it fairly. Studies in numerous cities have revealed a striking pattern: wealthier districts tend to enjoy far more tree cover and parkland than poorer ones, even though it is often the poorer neighbourhoods, with their denser housing and fewer private gardens, that would benefit most. This inequality is not accidental. It reflects decades of decisions about where to invest, and it means that the residents most exposed to heat and pollution are frequently those with the least access to the natural features that might protect them. Addressing this imbalance has become a central goal of a movement sometimes called green justice.\n\nCities are experimenting with a wide range of solutions. Some, such as Singapore, have pursued an ambitious policy of integrating vegetation into the fabric of buildings themselves, encouraging green roofs, planted walls and sky gardens so that greenery climbs upward where ground-level space is scarce. Others have concentrated on reclaiming land from cars: Paris, for example, has converted stretches of riverside expressway into pedestrian parks, while cities across the world have transformed disused railway lines into elevated walkways lined with native plants. Such projects are popular with residents, but they are not without controversy.\n\nThe most frequently raised concern is a phenomenon known as green gentrification. When a neighbourhood gains an attractive new park or tree-lined avenue, it often becomes more desirable, and property prices and rents tend to rise. The very residents the improvement was meant to help may then find themselves priced out and forced to move elsewhere, leaving the new amenity to be enjoyed by wealthier newcomers. Researchers stress that this outcome is not inevitable, but avoiding it requires deliberate measures — protections for affordable housing, for instance — to be put in place alongside the greenery itself.\n\nThere is also the practical question of maintenance. A park or street tree is not a one-off purchase but a living thing that must be watered, pruned and cared for over decades. Newly planted trees are especially vulnerable, and in many cities a significant proportion die within their first few years for lack of attention. Experts argue that the true measure of a city’s commitment to green space is not how many trees it plants in a single photogenic campaign, but how many it manages to keep alive over the long term. The future of the green city, in other words, may depend less on grand gestures than on patient, unglamorous stewardship.',
      questions: [
        // Matching information (which paragraph contains…): Q27–Q31
        {
          id: 27,
          type: 'matching-information',
          prompt:
            'Which paragraph mentions a city that builds greenery into the structure of its buildings?',
          options: [
            'Paragraph 1',
            'Paragraph 2',
            'Paragraph 3',
            'Paragraph 4',
            'Paragraph 5',
            'Paragraph 6',
          ],
          answer: 'Paragraph 4',
          explanation:
            'Paragraph 4 cites Singapore integrating vegetation into buildings via green roofs, planted walls and sky gardens.',
        },
        {
          id: 28,
          type: 'matching-information',
          prompt:
            'Which paragraph explains the process by which plants lower air temperature?',
          options: [
            'Paragraph 1',
            'Paragraph 2',
            'Paragraph 3',
            'Paragraph 4',
            'Paragraph 5',
            'Paragraph 6',
          ],
          answer: 'Paragraph 2',
          explanation:
            'Paragraph 2 describes evapotranspiration, by which plants release water vapour and cool the air.',
        },
        {
          id: 29,
          type: 'matching-information',
          prompt:
            'Which paragraph describes how new green areas can force existing residents to leave?',
          options: [
            'Paragraph 1',
            'Paragraph 2',
            'Paragraph 3',
            'Paragraph 4',
            'Paragraph 5',
            'Paragraph 6',
          ],
          answer: 'Paragraph 5',
          explanation:
            'Paragraph 5 explains green gentrification, where rising rents price out the original residents.',
        },
        {
          id: 30,
          type: 'matching-information',
          prompt:
            'Which paragraph notes that wealthier areas often have more parks than poorer ones?',
          options: [
            'Paragraph 1',
            'Paragraph 2',
            'Paragraph 3',
            'Paragraph 4',
            'Paragraph 5',
            'Paragraph 6',
          ],
          answer: 'Paragraph 3',
          explanation:
            'Paragraph 3 reports that wealthier districts enjoy far more tree cover and parkland than poorer ones.',
        },
        {
          id: 31,
          type: 'matching-information',
          prompt:
            'Which paragraph argues that keeping trees alive matters more than planting them?',
          options: [
            'Paragraph 1',
            'Paragraph 2',
            'Paragraph 3',
            'Paragraph 4',
            'Paragraph 5',
            'Paragraph 6',
          ],
          answer: 'Paragraph 6',
          explanation:
            'Paragraph 6 says the true measure is "how many it manages to keep alive over the long term", not how many are planted.',
        },
        // Yes / No / Not Given (writer’s views): Q32–Q36
        {
          id: 32,
          type: 'yes-no-notgiven',
          prompt:
            'The writer believes green space should now be regarded as essential urban infrastructure.',
          options: ['Yes', 'No', 'Not Given'],
          answer: 'Yes',
          explanation:
            'Paragraph 1: planners now treat green space "not as a luxury but as a necessity, on a par with roads, water pipes and electricity cables".',
        },
        {
          id: 33,
          type: 'yes-no-notgiven',
          prompt:
            'The writer thinks the unequal distribution of green space happened largely by chance.',
          options: ['Yes', 'No', 'Not Given'],
          answer: 'No',
          explanation:
            'Paragraph 3 states "This inequality is not accidental" — it reflects deliberate investment decisions.',
        },
        {
          id: 34,
          type: 'yes-no-notgiven',
          prompt:
            'The writer considers green gentrification an unavoidable result of new parks.',
          options: ['Yes', 'No', 'Not Given'],
          answer: 'No',
          explanation:
            'Paragraph 5: researchers "stress that this outcome is not inevitable" if protective measures are taken.',
        },
        {
          id: 35,
          type: 'yes-no-notgiven',
          prompt:
            'The writer claims that Singapore’s approach is superior to that of Paris.',
          options: ['Yes', 'No', 'Not Given'],
          answer: 'Not Given',
          explanation:
            'Both cities are given as examples of different solutions; the writer makes no comparison ranking one above the other.',
        },
        {
          id: 36,
          type: 'yes-no-notgiven',
          prompt:
            'The writer feels that maintaining green space is a serious long-term challenge.',
          options: ['Yes', 'No', 'Not Given'],
          answer: 'Yes',
          explanation:
            'Paragraph 6 emphasises that trees must be cared for over decades and that long-term stewardship is what truly counts.',
        },
        // Short answer (NO MORE THAN THREE WORDS): Q37–Q38
        {
          id: 37,
          type: 'short-answer',
          prompt:
            'What term describes the movement aimed at distributing green space more fairly?',
          answer: 'green justice',
          explanation:
            'Paragraph 3: addressing the imbalance "has become a central goal of a movement sometimes called green justice".',
        },
        {
          id: 38,
          type: 'short-answer',
          prompt:
            'Which European city turned riverside expressway into pedestrian parks?',
          answer: 'Paris',
          explanation:
            'Paragraph 4: "Paris... has converted stretches of riverside expressway into pedestrian parks".',
        },
        // Note completion (ONE WORD): Q39–Q40
        {
          id: 39,
          type: 'note-completion',
          prompt:
            'Benefits of urban vegetation: cooling, cleaner air, and the absorption of ____ that would otherwise flood drains.',
          answer: ['rainwater', 'water'],
          explanation:
            'Paragraph 2: vegetation "absorbs rainwater that would otherwise overwhelm drains".',
        },
        {
          id: 40,
          type: 'note-completion',
          prompt:
            'A common risk: many newly planted trees ____ within their first few years if neglected.',
          answer: 'die',
          explanation:
            'Paragraph 6: "a significant proportion die within their first few years for lack of attention".',
        },
      ],
    },
  ],

  // ===========================================================================
  // LISTENING — 4 sections, 40 questions (10 each)
  // ===========================================================================
  listening: [
    // ---------------------------------------------------------------------
    // SECTION 1 — Everyday social: booking a community hall. Q1–Q10.
    // ---------------------------------------------------------------------
    {
      number: 1,
      title: 'Section 1: Booking the Community Hall',
      transcript:
        'RECEPTIONIST: Good morning, Riverside Community Centre, Megan speaking. How can I help?\n\nCALLER: Oh, hello. I’d like to book a hall for a children’s birthday party, if that’s possible.\n\nRECEPTIONIST: Of course. Could I take a few details? First, your name, please.\n\nCALLER: Yes, it’s Daniel Forster. That’s F-O-R-S-T-E-R.\n\nRECEPTIONIST: Lovely, thank you, Mr Forster. And which date were you thinking of?\n\nCALLER: It would be Saturday the fourteenth of June.\n\nRECEPTIONIST: Let me check. Yes, that Saturday is free. We have two rooms available: the Garden Room, which holds up to thirty people, and the larger Oak Hall, which holds eighty.\n\nCALLER: I think the Garden Room will be plenty — we’re expecting about twenty-five guests.\n\nRECEPTIONIST: The Garden Room it is. It’s available from nine in the morning until six in the evening. How long would you like it for?\n\nCALLER: We’d need it from two until five in the afternoon, so three hours.\n\nRECEPTIONIST: That’s fine. The Garden Room costs twelve pounds an hour, so that comes to thirty-six pounds for the three hours. There’s also a refundable deposit of twenty pounds, which you get back after the event as long as there’s no damage.\n\nCALLER: That sounds reasonable. Does the room have tables and chairs?\n\nRECEPTIONIST: Yes, tables and chairs are included in the price, and so is use of the small kitchen next door. If you’d like, we can also provide a sound system for music — that’s an extra five pounds.\n\nCALLER: Oh yes, please add the sound system. The children will want to dance.\n\nRECEPTIONIST: No problem. One more thing — do you need parking? We have a free car park, but on Saturdays it can get busy, so I’d recommend telling your guests to arrive early.\n\nCALLER: Good to know, thanks. And how do I pay?\n\nRECEPTIONIST: You can pay the deposit now over the phone by card to secure the booking, and the balance on the day. Could I take a contact number for you?\n\nCALLER: Certainly. It’s oh-seven-seven-double-six, three-two-one, nine-eight-four.\n\nRECEPTIONIST: Let me read that back: oh-seven-seven-six-six, three-two-one, nine-eight-four. Perfect. Your booking reference is GR-also that’s G for Garden-four-five-one. We’ll send a confirmation email if you give me your address.\n\nCALLER: It’s danforster, all one word, at mailbox dot com.\n\nRECEPTIONIST: Wonderful. You’re all booked in, Mr Forster. We look forward to seeing you on the fourteenth.',
      questions: [
        {
          id: 1,
          type: 'note-completion',
          prompt: 'Caller’s surname: ____',
          answer: 'Forster',
          explanation:
            'The caller spells it out: "F-O-R-S-T-E-R".',
        },
        {
          id: 2,
          type: 'note-completion',
          prompt: 'Type of event: a children’s ____ party',
          answer: 'birthday',
          explanation:
            'The caller wants to book a hall "for a children’s birthday party".',
        },
        {
          id: 3,
          type: 'note-completion',
          prompt: 'Date of booking: Saturday the ____ of June',
          answer: ['fourteenth', '14th', '14'],
          explanation:
            'The caller says "Saturday the fourteenth of June".',
        },
        {
          id: 4,
          type: 'multiple-choice',
          prompt: 'Which room does the caller choose?',
          options: ['The Oak Hall', 'The Garden Room', 'The kitchen', 'The car park'],
          answer: 'The Garden Room',
          explanation:
            'For about twenty-five guests, the caller says "the Garden Room will be plenty".',
        },
        {
          id: 5,
          type: 'note-completion',
          prompt: 'Time required: from 2 pm until ____ pm',
          answer: ['5', 'five', '5 pm'],
          explanation:
            '"We’d need it from two until five in the afternoon".',
        },
        {
          id: 6,
          type: 'note-completion',
          prompt: 'Cost of the room: £____ per hour',
          answer: ['12', 'twelve'],
          explanation:
            '"The Garden Room costs twelve pounds an hour".',
        },
        {
          id: 7,
          type: 'note-completion',
          prompt: 'Refundable deposit: £____',
          answer: ['20', 'twenty'],
          explanation:
            '"There’s also a refundable deposit of twenty pounds".',
        },
        {
          id: 8,
          type: 'multiple-choice',
          prompt: 'What does the caller add for an extra charge?',
          options: ['A kitchen', 'Extra chairs', 'A sound system', 'Decorations'],
          answer: 'A sound system',
          explanation:
            'The caller asks to add the sound system for an extra five pounds.',
        },
        {
          id: 9,
          type: 'note-completion',
          prompt: 'Advice for guests: arrive early because the ____ gets busy on Saturdays.',
          answer: ['car park', 'parking', 'carpark'],
          explanation:
            'The receptionist warns the free car park "can get busy" on Saturdays.',
        },
        {
          id: 10,
          type: 'note-completion',
          prompt: 'Booking reference: GR-____',
          answer: ['451', 'four-five-one', '4 5 1'],
          explanation:
            'The reference is given as "G for Garden-four-five-one", i.e. GR-451.',
        },
      ],
    },

    // ---------------------------------------------------------------------
    // SECTION 2 — Monologue: museum tour information. Q11–Q20.
    // ---------------------------------------------------------------------
    {
      number: 2,
      title: 'Section 2: Welcome to the Maritime Museum',
      transcript:
        'Good afternoon, everyone, and welcome to the City Maritime Museum. My name is Robert, and I’ll be giving you a short introduction before you explore on your own. Let me start with a little practical information, and then I’ll tell you about the highlights you really shouldn’t miss.\n\nFirst, opening hours. We’re open every day except Monday, from ten in the morning until five in the afternoon, although on Thursdays we stay open late, until eight, for our evening events. Entry to the main galleries is free, but the special exhibition on the top floor does carry a charge of eight pounds for adults and four pounds for children.\n\nNow, the building itself is arranged over three floors. The ground floor is where you are now, and it’s devoted to the age of sail — wooden ships, navigation instruments, and the story of the great trading voyages. On the first floor you’ll find our collection on the age of steam, including a magnificent model of an early steamship that took our craftspeople over two years to build. The second, or top, floor houses the special exhibition, which this season is all about life beneath the waves: deep-sea exploration and the strange creatures of the ocean depths.\n\nThere are a few things I’d particularly recommend. If you have children with you, do visit the Discovery Zone on the ground floor, just past the gift shop. It’s a hands-on area where younger visitors can tie sailors’ knots, send messages in code, and even steer a ship’s wheel. It’s extremely popular, so it can get crowded around lunchtime — I’d suggest going either early or after two o’clock.\n\nFor those interested in history, our most famous object is the ship’s log of the Northern Star, a vessel that was lost in the Arctic in 1847. The log was recovered fifty years later and is the only surviving record of the expedition. You’ll find it in a special glass case in the centre of the first-floor gallery.\n\nA practical note about photography: you’re very welcome to take photographs throughout the museum, but please switch off your flash, as it can damage some of the older documents. And if you’d like a guided tour rather than exploring alone, free tours leave from this spot every hour on the hour, and they last about forty-five minutes.\n\nFinally, when you need a break, our café is on the first floor, overlooking the harbour, and it serves hot meals until half past three. The gift shop, as I mentioned, is here on the ground floor near the entrance. That’s everything from me — please do enjoy your visit, and don’t hesitate to ask any of our staff, in their blue uniforms, if you have questions.',
      questions: [
        {
          id: 11,
          type: 'multiple-choice',
          prompt: 'On which day is the museum closed?',
          options: ['Sunday', 'Monday', 'Thursday', 'Saturday'],
          answer: 'Monday',
          explanation:
            '"We’re open every day except Monday".',
        },
        {
          id: 12,
          type: 'note-completion',
          prompt: 'On Thursdays the museum stays open late until ____ pm.',
          answer: ['8', 'eight', '8 pm'],
          explanation:
            '"On Thursdays we stay open late, until eight".',
        },
        {
          id: 13,
          type: 'note-completion',
          prompt: 'Adult ticket for the special exhibition: £____',
          answer: ['8', 'eight'],
          explanation:
            'The special exhibition costs "eight pounds for adults".',
        },
        {
          id: 14,
          type: 'matching-information',
          prompt: 'On which floor is the collection about the age of steam?',
          options: ['Ground floor', 'First floor', 'Second floor', 'Basement'],
          answer: 'First floor',
          explanation:
            '"On the first floor you’ll find our collection on the age of steam".',
        },
        {
          id: 15,
          type: 'note-completion',
          prompt: 'The model steamship took craftspeople over ____ years to build.',
          answer: ['2', 'two'],
          explanation:
            'The model "took our craftspeople over two years to build".',
        },
        {
          id: 16,
          type: 'note-completion',
          prompt: 'This season’s special exhibition is about life beneath the ____.',
          answer: ['waves', 'sea', 'ocean'],
          explanation:
            'The exhibition "is all about life beneath the waves".',
        },
        {
          id: 17,
          type: 'multiple-choice',
          prompt: 'What can children do in the Discovery Zone?',
          options: [
            'Watch a film about ships',
            'Tie knots and steer a ship’s wheel',
            'Build model steamships',
            'Paint pictures of the sea',
          ],
          answer: 'Tie knots and steer a ship’s wheel',
          explanation:
            'In the Discovery Zone children "can tie sailors’ knots... and even steer a ship’s wheel".',
        },
        {
          id: 18,
          type: 'note-completion',
          prompt:
            'The museum’s most famous object is the ship’s ____ of the Northern Star.',
          answer: 'log',
          explanation:
            'The most famous object is "the ship’s log of the Northern Star".',
        },
        {
          id: 19,
          type: 'note-completion',
          prompt:
            'Visitors may take photographs but must turn off the ____.',
          answer: 'flash',
          explanation:
            '"Please switch off your flash, as it can damage some of the older documents".',
        },
        {
          id: 20,
          type: 'note-completion',
          prompt: 'Free guided tours leave every hour and last about ____ minutes.',
          answer: ['45', 'forty-five'],
          explanation:
            'Free tours "last about forty-five minutes".',
        },
      ],
    },

    // ---------------------------------------------------------------------
    // SECTION 3 — Academic discussion: two students + tutor on a project. Q21–Q30.
    // ---------------------------------------------------------------------
    {
      number: 3,
      title: 'Section 3: Discussing a Research Project',
      transcript:
        'TUTOR: Right, so you two are working together on the field-study project about urban birds. How’s it coming along?\n\nLEILA: Quite well, I think. We’ve decided to focus on how bird populations differ between the city centre and the suburbs.\n\nTOM: Yes, our main research question is whether there are fewer species in the busy centre because of noise and pollution.\n\nTUTOR: That’s a sensible focus. How are you planning to collect your data?\n\nLEILA: We’re going to do what’s called a point count. Basically, you stand in one place for ten minutes and record every bird you see or hear.\n\nTUTOR: Good. And how many points are you using?\n\nTOM: We started with twenty, but we realised that wasn’t enough to be reliable, so we’ve increased it to forty — twenty in the centre and twenty in the suburbs.\n\nTUTOR: That’s a wise decision. A larger sample will make your results much more convincing. Now, one thing to be careful about with point counts is the time of day. When are you doing them?\n\nLEILA: Early morning, around dawn, because that’s when birds are most active and singing.\n\nTUTOR: Exactly right. If you counted in the afternoon you’d miss a lot of activity. What about the weather?\n\nTOM: We hadn’t really thought about that.\n\nTUTOR: It matters more than you’d expect. Avoid windy or rainy days, because birds are quieter and harder to detect, which could bias your figures. Stick to calm, dry mornings.\n\nLEILA: That’s really helpful. We’ll add that to our method.\n\nTUTOR: Now, how will you actually identify the birds? Some of them can be tricky.\n\nTOM: We’re both reasonably good at recognising them by sight, but the songs are harder. So we’re going to record the sounds on a phone app and check anything we’re unsure about afterwards.\n\nTUTOR: That’s a sound approach — no pun intended. Just make sure you note the time and location of each recording so you can match it up later. Have you thought about how you’ll present your results?\n\nLEILA: We were going to use a simple bar chart comparing the number of species in each area.\n\nTUTOR: A bar chart is fine for a first look, but I’d encourage you to go further and use a statistical test to show whether the difference is significant, not just apparent. Otherwise a critic could say the gap is down to chance.\n\nTOM: We did cover one of those in the statistics module — the t-test, was it?\n\nTUTOR: That would work well here, yes. One last thing: when is your deadline?\n\nLEILA: The written report is due in five weeks, but we want to finish the fieldwork in the first three so we have plenty of time to analyse the data.\n\nTUTOR: Very sensible. Don’t leave the analysis to the last minute — that’s where most students come unstuck.',
      questions: [
        {
          id: 21,
          type: 'multiple-choice',
          prompt: 'The students’ project compares bird populations between',
          options: [
            'two different cities.',
            'the city centre and the suburbs.',
            'parks and gardens.',
            'summer and winter.',
          ],
          answer: 'the city centre and the suburbs.',
          explanation:
            'Leila: "how bird populations differ between the city centre and the suburbs".',
        },
        {
          id: 22,
          type: 'note-completion',
          prompt:
            'Their data-collection method is called a ____ count.',
          answer: 'point',
          explanation:
            'Leila describes "a point count" where you stand still for ten minutes.',
        },
        {
          id: 23,
          type: 'note-completion',
          prompt:
            'For each count, you stand in one place for ____ minutes.',
          answer: ['10', 'ten'],
          explanation:
            '"You stand in one place for ten minutes".',
        },
        {
          id: 24,
          type: 'note-completion',
          prompt:
            'They increased the number of points from twenty to ____.',
          answer: ['40', 'forty'],
          explanation:
            'Tom: "we’ve increased it to forty".',
        },
        {
          id: 25,
          type: 'multiple-choice',
          prompt: 'When will the students carry out their counts?',
          options: [
            'In the afternoon',
            'At midday',
            'Early morning, around dawn',
            'In the evening',
          ],
          answer: 'Early morning, around dawn',
          explanation:
            'Leila: "Early morning, around dawn, because that’s when birds are most active".',
        },
        {
          id: 26,
          type: 'multiple-choice',
          prompt: 'What does the tutor advise about the weather?',
          options: [
            'Count only in light rain',
            'Avoid windy or rainy days',
            'Wait for cloudy days',
            'The weather does not matter',
          ],
          answer: 'Avoid windy or rainy days',
          explanation:
            'The tutor says to "Avoid windy or rainy days, because birds are quieter and harder to detect".',
        },
        {
          id: 27,
          type: 'note-completion',
          prompt:
            'To identify difficult bird songs, they will record sounds using a phone ____.',
          answer: 'app',
          explanation:
            'Tom: "we’re going to record the sounds on a phone app".',
        },
        {
          id: 28,
          type: 'note-completion',
          prompt:
            'For each recording they should note the time and the ____.',
          answer: 'location',
          explanation:
            'The tutor: "make sure you note the time and location of each recording".',
        },
        {
          id: 29,
          type: 'note-completion',
          prompt:
            'The tutor recommends using a statistical ____ to check whether the difference is significant.',
          answer: 'test',
          explanation:
            'The tutor advises using "a statistical test to show whether the difference is significant"; they name the t-test.',
        },
        {
          id: 30,
          type: 'note-completion',
          prompt:
            'The written report is due in ____ weeks.',
          answer: ['5', 'five'],
          explanation:
            'Leila: "The written report is due in five weeks".',
        },
      ],
    },

    // ---------------------------------------------------------------------
    // SECTION 4 — Academic lecture: sleep. Q31–Q40.
    // ---------------------------------------------------------------------
    {
      number: 4,
      title: 'Section 4: The Science of Sleep',
      transcript:
        'In today’s lecture I want to look at sleep — something we all do, yet something that science is only now beginning to understand. For a long time, sleep was regarded as a passive state, a kind of switching-off of the brain. We now know that this picture is completely wrong. Far from shutting down, the sleeping brain is intensely active, carrying out essential work that simply cannot be done while we are awake.\n\nLet’s start with the structure of sleep. A night’s sleep is not uniform; it moves through a repeating cycle that lasts roughly ninety minutes, and within each cycle we pass through several distinct stages. These fall into two broad categories. The first is non-REM sleep, which includes the deepest, most restorative phases. The second is REM sleep — REM standing for rapid eye movement — which is the stage most strongly associated with vivid dreaming. Over the course of a night we typically complete four or five of these cycles.\n\nWhy do we need all this? Research over the past two decades has identified several crucial functions. The first is memory. During deep non-REM sleep, the brain appears to replay and consolidate the experiences of the day, transferring them from temporary storage into more permanent form. Students who sleep well after studying remember far more than those who stay awake — which is one reason why pulling an all-nighter before an exam is, scientifically speaking, a poor strategy.\n\nThe second function is physical restoration. During deep sleep, the body releases growth hormone, repairs tissues, and strengthens the immune system. This is why people who are ill often feel an overwhelming need to sleep — the body is, quite literally, healing itself.\n\nA third and more recently discovered function concerns cleaning. In 2013, researchers found that during sleep the spaces between brain cells widen, allowing fluid to flush out waste products that accumulate during waking hours. One of these waste products is a protein linked to Alzheimer’s disease, which has led some scientists to suspect a connection between chronic poor sleep and long-term brain health.\n\nGiven all this, it is worrying that modern societies are, on average, sleeping less than they used to. Several factors are responsible. Artificial light, and especially the blue light emitted by screens, suppresses the hormone melatonin, which the body uses to signal that it is time to sleep. Caffeine, consumed late in the day, can linger in the system for many hours. And the simple cultural habit of treating sleep as wasted time encourages people to sacrifice it in favour of work or entertainment.\n\nThe consequences of insufficient sleep are far more serious than mere tiredness. In the short term, it impairs concentration, mood and judgement; studies show that being awake for nineteen hours can affect performance as much as being mildly intoxicated. In the long term, persistent sleep deprivation has been linked to obesity, heart disease, diabetes and weakened immunity. So the advice that researchers give is refreshingly simple: most adults need between seven and nine hours a night, a regular schedule helps enormously, and the hour before bed is best spent away from bright screens.',
      questions: [
        {
          id: 31,
          type: 'note-completion',
          prompt:
            'Sleep used to be regarded as a ____ state in which the brain switched off.',
          answer: 'passive',
          explanation:
            '"For a long time, sleep was regarded as a passive state".',
        },
        {
          id: 32,
          type: 'note-completion',
          prompt:
            'A complete sleep cycle lasts roughly ____ minutes.',
          answer: ['90', 'ninety'],
          explanation:
            'The cycle "lasts roughly ninety minutes".',
        },
        {
          id: 33,
          type: 'note-completion',
          prompt:
            'REM stands for rapid eye ____.',
          answer: 'movement',
          explanation:
            '"REM standing for rapid eye movement".',
        },
        {
          id: 34,
          type: 'note-completion',
          prompt:
            'Over a night we typically complete four or ____ cycles.',
          answer: ['5', 'five'],
          explanation:
            '"We typically complete four or five of these cycles".',
        },
        {
          id: 35,
          type: 'multiple-choice',
          prompt: 'During deep non-REM sleep, the brain mainly',
          options: [
            'produces vivid dreams.',
            'consolidates the day’s memories.',
            'shuts down completely.',
            'increases caffeine levels.',
          ],
          answer: 'consolidates the day’s memories.',
          explanation:
            'During deep non-REM sleep the brain "replay[s] and consolidate[s] the experiences of the day".',
        },
        {
          id: 36,
          type: 'note-completion',
          prompt:
            'During deep sleep the body releases growth ____ and repairs tissues.',
          answer: 'hormone',
          explanation:
            '"During deep sleep, the body releases growth hormone, repairs tissues".',
        },
        {
          id: 37,
          type: 'note-completion',
          prompt:
            'In 2013, researchers found sleep helps flush ____ products from the brain.',
          answer: 'waste',
          explanation:
            'Sleep allows fluid "to flush out waste products that accumulate during waking hours".',
        },
        {
          id: 38,
          type: 'note-completion',
          prompt:
            'The blue light from screens suppresses the hormone ____.',
          answer: 'melatonin',
          explanation:
            'Blue light "suppresses the hormone melatonin".',
        },
        {
          id: 39,
          type: 'multiple-choice',
          prompt: 'Being awake for nineteen hours can affect performance like',
          options: [
            'drinking too much coffee.',
            'being mildly intoxicated.',
            'a heavy meal.',
            'intense exercise.',
          ],
          answer: 'being mildly intoxicated.',
          explanation:
            'Being awake nineteen hours "can affect performance as much as being mildly intoxicated".',
        },
        {
          id: 40,
          type: 'note-completion',
          prompt:
            'Most adults need between ____ and nine hours of sleep a night.',
          answer: ['7', 'seven'],
          explanation:
            '"Most adults need between seven and nine hours a night".',
        },
      ],
    },
  ],

  // ===========================================================================
  // WRITING — 2 tasks
  // ===========================================================================
  writing: [
    {
      task: 1,
      prompt:
        'The chart below shows the percentage of households in a European country that owned selected electronic devices in 2005 and in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      minWords: 150,
      visual:
        'A grouped bar chart comparing household ownership (%) of four devices in 2005 vs 2020. Smartphone: 8% in 2005, 92% in 2020. Laptop computer: 25% in 2005, 78% in 2020. Desktop computer: 65% in 2005, 30% in 2020. Television: 96% in 2005, 89% in 2020.',
      modelAnswer:
        'The bar chart compares the proportion of households in one European country that owned four electronic devices in 2005 and 2020.\n\nOverall, ownership of portable devices rose dramatically over the period, whereas the share of households with a desktop computer fell sharply. The television remained the most widely owned device throughout, despite a slight decline.\n\nThe most striking change concerns the smartphone. In 2005, only 8% of households owned one, but by 2020 this figure had surged to 92%, making it almost as common as the television. Laptop ownership followed a similar upward trend, climbing from a quarter of households (25%) to more than three-quarters (78%).\n\nIn contrast, the desktop computer moved in the opposite direction. Having been present in roughly two-thirds of homes (65%) in 2005, it was owned by less than a third (30%) by 2020, presumably as portable alternatives replaced it. Television ownership, meanwhile, was already very high at 96% in 2005 and edged down only marginally to 89%, remaining near-universal.\n\nIn short, the period saw a clear shift away from fixed equipment towards mobile technology, while the television held on to its dominant position.',
      examinerNotes: [
        'Opens with an accurate paraphrase of the prompt rather than copying it, satisfying Task Achievement.',
        'Includes a clear overview paragraph that identifies the main trends without listing every figure — essential for Band 7 and above.',
        'Selects and groups the key data logically (rising portable devices vs falling desktop) and supports each point with precise figures and percentages.',
        'Uses a range of comparative and trend language (surged, climbed, edged down, in contrast) with accurate grammar, demonstrating lexical and grammatical range.',
        'Stays objective and within scope: it describes the data and offers only a cautious inference ("presumably"), never inventing reasons not shown in the chart.',
      ],
    },
    {
      task: 2,
      prompt:
        'Some people believe that universities should focus on providing students with the knowledge and skills needed for their future careers. Others argue that the main purpose of university is to develop students as individuals and as citizens. Discuss both views and give your own opinion.',
      minWords: 250,
      modelAnswer:
        'The proper purpose of a university has long been contested. While some maintain that higher education should chiefly equip students with practical, job-related skills, others insist that its deeper mission is to cultivate well-rounded individuals and responsible citizens. In my view, although employability matters, the two aims are complementary rather than opposed, and the broader goal should not be sacrificed.\n\nThose who favour a career-focused model make a compelling economic argument. Students invest considerable time and money in their degrees, and many do so precisely to improve their employment prospects. Courses in fields such as engineering, medicine and computing demand specialised technical competence, and graduates who lack it are poorly served. From this perspective, a university that ignores the labour market fails the very people it claims to help, leaving them with debt but few marketable abilities.\n\nNevertheless, the opposing view captures something a narrow vocational approach overlooks. University is often the first time young people encounter unfamiliar ideas, debate openly with peers from different backgrounds, and learn to think critically and independently. These capacities — analysing evidence, tolerating disagreement, reasoning ethically — are precisely what democratic societies depend upon. A graduate who can write efficient code but cannot evaluate an argument or weigh competing values is, arguably, only half educated.\n\nIn my opinion, this is a false dichotomy. The most valuable graduates are those who possess both technical expertise and the breadth of mind to apply it wisely. A well-designed degree can teach practical skills while also fostering curiosity, communication and judgement; indeed, the flexible thinkers that employers increasingly say they want are produced precisely by a broader education.\n\nIn conclusion, while universities should certainly prepare students for work, they must not be reduced to mere training centres. Their enduring value lies in developing capable professionals who are also thoughtful, engaged citizens.',
      examinerNotes: [
        'Directly addresses both views and states a clear personal position in the introduction, fully responding to a "discuss both views and give your opinion" task.',
        'Devotes a balanced body paragraph to each view with relevant, developed reasoning and concrete examples (engineering/medicine; critical thinking, debate).',
        'Presents an explicit, well-argued opinion that synthesises both sides rather than simply repeating them — characteristic of Band 9 task response.',
        'Demonstrates a wide range of precise vocabulary (vocational, dichotomy, employability, cultivate) and varied complex sentence structures used accurately.',
        'Uses logical cohesion (Those who favour…, Nevertheless…, In my opinion…, In conclusion…) so the argument is easy to follow, and comfortably exceeds the 250-word minimum.',
      ],
    },
  ],

  // ===========================================================================
  // SPEAKING — 3 parts
  // ===========================================================================
  speaking: [
    {
      part: 1,
      title: 'Part 1: Introduction and Interview',
      questions: [
        'Let’s talk about where you live. Do you live in a house or an apartment?',
        'What do you like most about your neighbourhood?',
        'Now let’s talk about food. What kind of food do you enjoy eating?',
        'Do you prefer to cook at home or eat out? Why?',
        'Let’s move on to free time. What do you usually do at the weekend?',
        'Has the way you spend your free time changed since you were a child?',
      ],
      sampleAnswers: [
        'I live in a fairly small apartment on the fourth floor of a modern building near the city centre. It’s compact, but it has everything I need and a lovely balcony where I can sit in the evenings.',
        'What I appreciate most is how convenient it is. There’s a little market just around the corner, a couple of good cafés, and a park within walking distance, so I rarely need to travel far for the essentials.',
        'I’m quite an adventurous eater, to be honest. I love trying dishes from different cultures, but if I had to choose a favourite, it would probably be a simple homemade pasta — something comforting and familiar.',
        'I generally prefer cooking at home, mainly because I can control exactly what goes into the meal and it works out much cheaper. That said, I do enjoy eating out occasionally as a treat, especially with friends.',
        'At the weekend I like to strike a balance between being active and relaxing. On Saturday mornings I usually go for a run or meet friends for coffee, and on Sundays I tend to slow down and catch up on reading.',
        'Yes, quite a lot, actually. As a child I spent almost all my free time playing outdoors with the neighbours, whereas now my hobbies are a bit quieter — reading, cooking, the occasional film. I suppose that’s a natural part of growing up.',
      ],
    },
    {
      part: 2,
      title: 'Part 2: Individual Long Turn (Cue Card)',
      questions: [
        'Describe a skill you would like to learn. You should say:',
        '• what the skill is',
        '• why you would like to learn it',
        '• how you would go about learning it',
        '• and explain how this skill might be useful to you in the future.',
        'You will have one minute to prepare and should speak for one to two minutes.',
      ],
      sampleAnswers: [
        'The skill I’d most like to learn is playing the piano. It’s something I’ve wanted to do for years, but I’ve never quite found the time, so it feels like the perfect answer to this question.\n\nThe reason I’m drawn to the piano is partly emotional. I find music genuinely moving, and there’s something almost magical about being able to sit down and produce a beautiful piece of music with your own hands. I also think it would be a wonderful way to unwind after a busy day — a kind of meditation, really, that has nothing to do with screens or work.\n\nAs for how I’d go about it, I’d probably start with a combination of online lessons and a weekly session with a proper teacher. I’ve heard that having a real person to correct your technique early on is invaluable, because bad habits are very hard to undo later. I’d also need to be disciplined about practising a little every day, even just twenty minutes, since I know consistency matters far more than the occasional long session.\n\nIn terms of how it might be useful in the future, I think the benefits go well beyond the music itself. Learning an instrument is supposed to be excellent for the brain — it improves concentration, memory and patience. And on a social level, being able to play would let me join in at gatherings or perhaps even play with other musicians one day. So although it’s mainly a personal ambition, I suspect it would enrich my life in all sorts of unexpected ways.',
      ],
    },
    {
      part: 3,
      title: 'Part 3: Two-Way Discussion',
      questions: [
        'We’ve been talking about learning a skill. Let’s consider this more broadly. Why do you think some skills are harder to learn as an adult than as a child?',
        'Do you think schools focus enough on practical skills, or too much on academic subjects?',
        'How has technology changed the way people learn new skills?',
        'Some people say that natural talent matters more than hard work. What is your view?',
        'Do you think governments should fund adult education, or should individuals pay for it themselves?',
      ],
      sampleAnswers: [
        'I think the main reason is that children’s brains are simply more flexible — what scientists call plasticity. Languages are the classic example: a child can pick up a second language almost effortlessly, whereas an adult has to study hard. Adults also tend to be more self-conscious about making mistakes, and that fear of looking foolish can really hold them back.',
        'In my experience, schools still lean too heavily towards academic subjects at the expense of practical ones. Things like managing money, cooking a basic meal or understanding a contract are essential for adult life, yet many people leave school without them. I’d argue for a better balance, where exams matter but life skills are taken seriously too.',
        'Technology has been transformative, mostly for the better. You can now learn almost anything from free videos and online courses, often from world-class experts, without leaving home. The downside is that it requires a lot of self-discipline, and there’s so much information that it can be overwhelming and hard to know what to trust.',
        'I’d say both matter, but hard work is ultimately more decisive. Natural talent might give someone a head start, but it counts for little without sustained effort. We’ve all seen gifted people who never fulfil their potential because they don’t apply themselves, and determined people who outstrip them through sheer persistence.',
        'I believe there’s a strong case for government support, at least partially. A society where people keep learning throughout their lives is more adaptable and more productive, which benefits everyone, not just the individual. That said, I think a shared model is fairest — perhaps subsidised courses, where the state and the learner each contribute something.',
      ],
    },
  ],
};
