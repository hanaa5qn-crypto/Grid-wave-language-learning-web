// =============================================================================
// IELTS Academic — Practice Test 2
// -----------------------------------------------------------------------------
// A complete, self-contained Academic test object modelled on the official
// Cambridge IELTS Academic format. Topics are deliberately distinct from
// Practice Test 1: Passage 1 (technology — the history of the lithium-ion
// battery), Passage 2 (biology — the secret life of fungal networks),
// Passage 3 (economics — the behavioural economics of saving). Listening,
// Writing and Speaking follow the genuine four-part / two-task / three-part
// structure. All answers and explanations are included.
// =============================================================================
import { IeltsTest } from '../types';

export const IELTS_TEST_2: IeltsTest = {
  id: 'ielts-academic-2',
  title: 'IELTS Academic — Practice Test 2',
  module: 'Academic',
  source:
    'Modeled on the Cambridge IELTS Academic test format (official structure, original passages).',

  // ===========================================================================
  // READING — 3 passages, 40 questions (13 / 13 / 14)
  // ===========================================================================
  reading: [
    // -----------------------------------------------------------------------
    // PASSAGE 1 — Technology: the lithium-ion battery (Questions 1–13)
    // -----------------------------------------------------------------------
    {
      number: 1,
      title: 'The Long Charge: How the Lithium-Ion Battery Was Born',
      text:
        'Few inventions are as quietly indispensable as the rechargeable battery that sits inside almost every modern phone, laptop and electric car. The lithium-ion cell, which now stores energy for billions of devices, was not the product of a single eureka moment but the result of three decades of incremental work by chemists working on opposite sides of the world. Its history is a reminder that the technologies we take for granted are usually the children of patience rather than genius.\n\n' +
        'The story begins in the early 1970s, when the oil crisis pushed governments and corporations to look for ways of storing energy that did not depend on fossil fuels. A British chemist, M. Stanley Whittingham, working at an American oil company, discovered that lithium ions could slip in and out of the spaces between layers of a material called titanium disulphide. This "intercalation" allowed a battery to be charged and discharged repeatedly. Whittingham\'s cell produced a respectable two volts, but it had a fatal flaw: the pure lithium metal it used was so reactive that the batteries occasionally caught fire. The company quietly shelved the project.\n\n' +
        'Progress resumed in 1980 in a laboratory at the University of Oxford, where John Goodenough reasoned that a metal oxide, rather than a sulphide, might hold lithium ions at a much higher voltage. He and his colleagues showed that lithium cobalt oxide could push the voltage up to four volts while remaining stable. This roughly doubled the energy that a cell of a given size could store. Yet Goodenough\'s cathode still needed a safer partner to replace the dangerous lithium metal on the other side of the cell.\n\n' +
        'That partner came from Japan. Akira Yoshino, working at the Asahi Kasei Corporation in the mid-1980s, replaced the lithium metal with carbon, into which lithium ions could also be inserted. Because no metallic lithium was present, the battery was far less likely to ignite. Yoshino\'s design — a cobalt-oxide cathode and a carbon anode, with ions shuttling between them through a liquid electrolyte — is, in essence, the lithium-ion battery still manufactured today.\n\n' +
        'Commercial production began in 1991, when the electronics giant Sony released the first lithium-ion cells in its camcorders. The timing was fortunate. The 1990s saw an explosion of portable electronics, and only a battery that was light, compact and rechargeable hundreds of times could keep pace. Mobile phones shrank from bricks to pocket-sized objects largely because their power source had become so much more efficient. The battery, in other words, did not merely follow the digital revolution; it made much of it possible.\n\n' +
        'The technology has not stood still. Engineers have steadily reduced the proportion of expensive cobalt, improved safety circuits, and increased the number of times a cell can be recharged before it degrades. The cost of storing a kilowatt-hour of energy fell by roughly ninety per cent between 2010 and 2020, a decline that has made electric vehicles competitive with petrol cars for the first time. Grid-scale batteries, meanwhile, are beginning to store solar and wind energy so that it can be used after dark or when the wind drops.\n\n' +
        'Recognition for the pioneers came late. In 2019, Whittingham, Goodenough and Yoshino shared the Nobel Prize in Chemistry. Goodenough, then ninety-seven, became the oldest person ever to receive a Nobel. The award acknowledged not a flash of inspiration but a relay of careful experiments, each building on the last — a fitting tribute to a device whose great virtue is its steady, reliable accumulation of charge.',
      questions: [
        {
          id: 1,
          type: 'true-false-notgiven',
          prompt:
            'The lithium-ion battery was developed by one scientist working alone.',
          answer: 'FALSE',
          explanation:
            'The passage states it "was not the product of a single eureka moment" but the work of several chemists over three decades, so the statement is FALSE.',
        },
        {
          id: 2,
          type: 'true-false-notgiven',
          prompt:
            'The oil crisis of the early 1970s encouraged research into new ways of storing energy.',
          answer: 'TRUE',
          explanation:
            'Paragraph 2 says the oil crisis "pushed governments and corporations to look for ways of storing energy that did not depend on fossil fuels", which matches the statement.',
        },
        {
          id: 3,
          type: 'true-false-notgiven',
          prompt:
            'Whittingham\'s battery was immediately put into mass production.',
          answer: 'FALSE',
          explanation:
            'The text says the company "quietly shelved the project" because the batteries occasionally caught fire, so it was not put into mass production. FALSE.',
        },
        {
          id: 4,
          type: 'true-false-notgiven',
          prompt:
            'Goodenough discovered his cathode material while working in the United States.',
          answer: 'FALSE',
          explanation:
            'Goodenough did his work "in a laboratory at the University of Oxford", which is in Britain, not the United States. FALSE.',
        },
        {
          id: 5,
          type: 'true-false-notgiven',
          prompt:
            'Yoshino tested his battery design on electric vehicles before it was sold commercially.',
          answer: 'NOT GIVEN',
          explanation:
            'The passage describes Yoshino\'s design but says nothing about him testing it on electric vehicles, so this is NOT GIVEN.',
        },
        {
          id: 6,
          type: 'sentence-completion',
          prompt:
            'Whittingham found that lithium ions could move in and out of the layers of ____ in a process called intercalation.',
          answer: ['titanium disulphide', 'titanium disulfide'],
          explanation:
            'Paragraph 2 states the ions slipped between layers of "titanium disulphide" (both British and American spellings accepted).',
        },
        {
          id: 7,
          type: 'sentence-completion',
          prompt:
            'Goodenough showed that using ____ allowed the voltage of the cell to reach four volts.',
          answer: ['lithium cobalt oxide', 'cobalt oxide'],
          explanation:
            'The text says "lithium cobalt oxide could push the voltage up to four volts".',
        },
        {
          id: 8,
          type: 'sentence-completion',
          prompt:
            'Yoshino made the battery safer by replacing the lithium metal with ____.',
          answer: 'carbon',
          explanation:
            'Yoshino "replaced the lithium metal with carbon", which removed the metallic lithium that caused fires.',
        },
        {
          id: 9,
          type: 'multiple-choice',
          prompt:
            'According to the passage, what was the main advantage of Goodenough\'s metal-oxide cathode over earlier designs?',
          options: [
            'It removed the need for any electrolyte.',
            'It roughly doubled the energy a cell could store.',
            'It made the battery considerably cheaper to produce.',
            'It allowed the battery to be charged far more quickly.',
          ],
          answer: 'It roughly doubled the energy a cell could store.',
          explanation:
            'The passage says the higher voltage "roughly doubled the energy that a cell of a given size could store".',
        },
        {
          id: 10,
          type: 'multiple-choice',
          prompt:
            'Why does the writer describe the timing of Sony\'s 1991 launch as "fortunate"?',
          options: [
            'Competitors had failed to produce a working battery.',
            'Government subsidies were available for new electronics.',
            'Demand for portable electronics was rising rapidly at that time.',
            'The price of cobalt happened to fall sharply that year.',
          ],
          answer: 'Demand for portable electronics was rising rapidly at that time.',
          explanation:
            'The text links the fortunate timing to "an explosion of portable electronics" in the 1990s that needed light, rechargeable batteries.',
        },
        {
          id: 11,
          type: 'summary-completion',
          prompt:
            'Complete the summary: Between 2010 and 2020 the cost of storing a kilowatt-hour of energy fell by about ____ per cent.',
          answer: ['ninety', '90'],
          explanation:
            'Paragraph 6 states the cost "fell by roughly ninety per cent between 2010 and 2020".',
        },
        {
          id: 12,
          type: 'summary-completion',
          prompt:
            'Complete the summary: This price fall made ____ competitive with petrol cars for the first time.',
          answer: ['electric vehicles', 'electric cars'],
          explanation:
            'The same paragraph says the decline "made electric vehicles competitive with petrol cars for the first time".',
        },
        {
          id: 13,
          type: 'short-answer',
          prompt:
            'In what year did the three pioneers share the Nobel Prize in Chemistry? (Answer with a number.)',
          answer: '2019',
          explanation:
            'The final paragraph states that "In 2019, Whittingham, Goodenough and Yoshino shared the Nobel Prize in Chemistry."',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // PASSAGE 2 — Biology: fungal networks (Questions 14–26)
    //   Labelled paragraphs A–F so matching-headings is authentic.
    // -----------------------------------------------------------------------
    {
      number: 2,
      title: 'The Wood Wide Web: How Fungi Connect the Forest',
      text:
        'A  Beneath the floor of almost every forest lies a hidden network so fine that a single teaspoon of soil may contain several kilometres of it. These are the threads of fungi, known as hyphae, which weave themselves around and into the roots of trees. The partnership between fungus and root is called a mycorrhiza, and it is one of the oldest and most successful alliances in the living world. Far from being mere decomposers, these fungi act as the trading partners of the forest, exchanging goods with the plants they touch.\n\n' +
        'B  The arrangement is, at heart, an exchange of nutrients. A tree, using sunlight, manufactures sugars that the fungus cannot make for itself. In return, the fungal threads, which are far thinner than roots and reach into spaces no root could enter, harvest water and minerals such as phosphorus and nitrogen from the soil and pass them back to the tree. A fungus may extend the effective reach of a tree\'s root system many times over. Both partners gain, and neither could flourish so well alone.\n\n' +
        'C  In the 1990s a Canadian ecologist, Suzanne Simard, demonstrated something more surprising still. Using radioactive carbon as a tracer, she showed that sugars could travel through the fungal network from one tree to another. A large birch growing in full sunlight could pass carbon to a young fir shaded beneath it, effectively subsidising a neighbour of a different species. The discovery suggested that a forest was not simply a crowd of individuals competing for light, but in some respects a connected community in which resources were shared.\n\n' +
        'D  Journalists were quick to christen this underground system the "wood wide web", and the phrase captured the public imagination. Some popular accounts went further, describing forests as cooperative superorganisms governed by maternal "mother trees" that deliberately nurtured their offspring. Yet many scientists urge caution. The fact that carbon can move between trees does not prove that trees intend to help one another. The fungus, after all, has its own interests, and may simply be moving sugars to wherever they are most useful to itself.\n\n' +
        'E  More recent research has tried to measure how much really flows through these networks and why. The picture that is emerging is more complicated than the early enthusiasm implied. Transfers between trees are often small, vary enormously from forest to forest, and may flow in whichever direction the fungus, not the tree, dictates. In some experiments the fungus appears to behave almost like a market trader, demanding more sugar from a tree in return for scarce minerals, and rewarding the most generous plants with the best supply. Cooperation and self-interest, it seems, are tangled together underground.\n\n' +
        'F  Whatever the precise mechanism, the practical lessons are clear. Forests are not collections of isolated trees but tightly linked systems, and damaging the soil can sever connections that took decades to form. When a forest is clear-felled, the fungal network is destroyed along with the trees, which is one reason replanted areas can struggle to recover. Some foresters now argue for leaving older trees standing as hubs from which the network — and the next generation of seedlings — can regrow. Understanding what lies beneath the soil, in short, may be as important as understanding what grows above it.',
      questions: [
        {
          id: 14,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph A.',
          options: [
            'i. A hidden partnership beneath the forest floor',
            'ii. The two-way trade of sugars and minerals',
            'iii. Evidence that trees share resources',
            'iv. Doubts about the cooperation story',
            'v. Weighing how much really moves',
            'vi. Why the network matters for forestry',
          ],
          answer: 'i. A hidden partnership beneath the forest floor',
          explanation:
            'Paragraph A introduces the hidden fungal threads and the mycorrhizal partnership, matching heading i.',
        },
        {
          id: 15,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph B.',
          options: [
            'i. A hidden partnership beneath the forest floor',
            'ii. The two-way trade of sugars and minerals',
            'iii. Evidence that trees share resources',
            'iv. Doubts about the cooperation story',
            'v. Weighing how much really moves',
            'vi. Why the network matters for forestry',
          ],
          answer: 'ii. The two-way trade of sugars and minerals',
          explanation:
            'Paragraph B describes the exchange of sugars from the tree for water and minerals from the fungus — heading ii.',
        },
        {
          id: 16,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph C.',
          options: [
            'i. A hidden partnership beneath the forest floor',
            'ii. The two-way trade of sugars and minerals',
            'iii. Evidence that trees share resources',
            'iv. Doubts about the cooperation story',
            'v. Weighing how much really moves',
            'vi. Why the network matters for forestry',
          ],
          answer: 'iii. Evidence that trees share resources',
          explanation:
            'Paragraph C reports Simard\'s tracer experiments showing carbon passing between trees — heading iii.',
        },
        {
          id: 17,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph D.',
          options: [
            'i. A hidden partnership beneath the forest floor',
            'ii. The two-way trade of sugars and minerals',
            'iii. Evidence that trees share resources',
            'iv. Doubts about the cooperation story',
            'v. Weighing how much really moves',
            'vi. Why the network matters for forestry',
          ],
          answer: 'iv. Doubts about the cooperation story',
          explanation:
            'Paragraph D introduces the "wood wide web" label and the scientific caution about claims of deliberate cooperation — heading iv.',
        },
        {
          id: 18,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph E.',
          options: [
            'i. A hidden partnership beneath the forest floor',
            'ii. The two-way trade of sugars and minerals',
            'iii. Evidence that trees share resources',
            'iv. Doubts about the cooperation story',
            'v. Weighing how much really moves',
            'vi. Why the network matters for forestry',
          ],
          answer: 'v. Weighing how much really moves',
          explanation:
            'Paragraph E discusses recent attempts to measure the size and direction of transfers — heading v.',
        },
        {
          id: 19,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph F.',
          options: [
            'i. A hidden partnership beneath the forest floor',
            'ii. The two-way trade of sugars and minerals',
            'iii. Evidence that trees share resources',
            'iv. Doubts about the cooperation story',
            'v. Weighing how much really moves',
            'vi. Why the network matters for forestry',
          ],
          answer: 'vi. Why the network matters for forestry',
          explanation:
            'Paragraph F draws practical conclusions for forestry, including leaving older trees as hubs — heading vi.',
        },
        {
          id: 20,
          type: 'matching-information',
          prompt:
            'Which paragraph contains the following information: a comparison of a fungus to a trader who bargains over prices?',
          options: ['A', 'B', 'C', 'D', 'E', 'F'],
          answer: 'E',
          explanation:
            'Paragraph E says the fungus "appears to behave almost like a market trader, demanding more sugar ... in return for scarce minerals".',
        },
        {
          id: 21,
          type: 'matching-information',
          prompt:
            'Which paragraph contains the following information: a striking statistic about the amount of fungal thread in a small quantity of soil?',
          options: ['A', 'B', 'C', 'D', 'E', 'F'],
          answer: 'A',
          explanation:
            'Paragraph A states that "a single teaspoon of soil may contain several kilometres" of fungal threads.',
        },
        {
          id: 22,
          type: 'matching-information',
          prompt:
            'Which paragraph contains the following information: the consequence of clear-felling for the fungal network?',
          options: ['A', 'B', 'C', 'D', 'E', 'F'],
          answer: 'F',
          explanation:
            'Paragraph F explains that clear-felling destroys the fungal network, which is why replanted areas can struggle to recover.',
        },
        {
          id: 23,
          type: 'true-false-notgiven',
          prompt:
            'Fungal threads can reach into spaces in the soil that tree roots cannot enter.',
          answer: 'TRUE',
          explanation:
            'Paragraph B says the threads "are far thinner than roots and reach into spaces no root could enter".',
        },
        {
          id: 24,
          type: 'true-false-notgiven',
          prompt:
            'Simard used radioactive carbon to track the movement of sugars between trees.',
          answer: 'TRUE',
          explanation:
            'Paragraph C states she used "radioactive carbon as a tracer" to show sugars travelling through the network.',
        },
        {
          id: 25,
          type: 'true-false-notgiven',
          prompt:
            'All scientists now agree that mother trees deliberately feed their own offspring.',
          answer: 'FALSE',
          explanation:
            'Paragraph D says "many scientists urge caution" and that carbon movement "does not prove that trees intend to help one another", contradicting the statement.',
        },
        {
          id: 26,
          type: 'short-answer',
          prompt:
            'What name did journalists give to the underground fungal system? (No more than three words.)',
          answer: ['wood wide web', 'the wood wide web'],
          explanation:
            'Paragraph D states journalists christened the system the "wood wide web".',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // PASSAGE 3 — Economics: behavioural economics of saving (Questions 27–40)
    // -----------------------------------------------------------------------
    {
      number: 3,
      title: 'Saving for Tomorrow: The Behavioural Economics of Pensions',
      text:
        'For most of the twentieth century, economists assumed that people were broadly rational planners. Given accurate information about their incomes and likely lifespans, individuals were expected to calculate how much to set aside each year so as to spread their consumption smoothly across a lifetime. The reality, as anyone who has reached middle age with too little in their pension can attest, is rather different. Across wealthy countries, large numbers of people save far too little for their old age, and many save nothing at all until it is almost too late.\n\n' +
        'The discipline of behavioural economics grew up partly to explain this gap between the textbook saver and the flesh-and-blood one. Its central insight is that human beings are subject to predictable biases. We are present-biased, valuing rewards today far more heavily than equivalent rewards in the distant future, which makes the pleasure of spending now feel more vivid than the comfort of a pension decades away. We are also prone to inertia: faced with a complicated decision, we tend to do nothing, postponing the choice indefinitely. For retirement saving, doing nothing usually means saving nothing.\n\n' +
        'These tendencies might seem to be private failings that governments can do little about. But behavioural economists argue that the way choices are presented — what they call the "choice architecture" — has a powerful effect on what people decide. The classic example concerns the default option. When employees must actively sign up to a workplace pension scheme, participation tends to be low, often below half of those eligible. When, instead, they are automatically enrolled and must actively opt out if they do not wish to take part, participation typically rises above ninety per cent. The decision is exactly the same; only the starting point has changed.\n\n' +
        'The power of defaults lies precisely in human inertia. Because changing the default requires effort, and because most people suspect that the default has been chosen by someone sensible, the path of least resistance becomes the path most people take. Automatic enrolment harnesses a weakness — our reluctance to act — and turns it towards a desirable end. Crucially, it does so without removing anyone\'s freedom: those who genuinely do not want to save can still opt out. For this reason its advocates describe it as a form of "libertarian paternalism", a phrase that tries to capture the idea of gently steering people while leaving the final choice in their hands.\n\n' +
        'A second technique tackles the problem of present bias more directly. A scheme devised by the economists Richard Thaler and Shlomo Benartzi, known as "Save More Tomorrow", invites workers to commit in advance to increasing their pension contributions, but only when they next receive a pay rise. Because the higher contributions are deducted from money the worker has not yet received, the painful sense of taking a cut never arrives. Each rise lifts the saving rate a little, until contributions reach a healthy level. In the firms that first adopted the plan, average saving rates more than tripled over a few years, a result no amount of financial education had been able to achieve.\n\n' +
        'The success of such schemes has not silenced criticism. Some argue that nudging people to save assumes the designer knows what is best, and that for a worker burdened with debt, putting money into a locked pension may not in fact be wise. Others worry that, once governments accept they may shape choices for citizens\' own good, the same logic could be extended to less benign ends. Defenders reply that choice architecture is unavoidable — every form has to have some default — and that it is better to design it thoughtfully than to pretend it does not exist.\n\n' +
        'What is no longer in dispute is that small changes in the way decisions are framed can have large and lasting effects. The behavioural revolution has shifted the question that policymakers ask. Instead of asking only how to give people more information, they now ask how to design the moment of choice so that the easy path and the wise path point in the same direction. For a problem as stubborn as saving for an old age that feels comfortably far away, that shift may prove to be worth more than any lecture on the importance of thrift.',
      questions: [
        {
          id: 27,
          type: 'yes-no-notgiven',
          prompt:
            'The writer believes that traditional economics accurately predicted how much people would save.',
          answer: 'NO',
          explanation:
            'The writer contrasts the "textbook saver" with reality, noting that many people "save far too little", so the writer does NOT agree that traditional economics predicted saving accurately.',
        },
        {
          id: 28,
          type: 'yes-no-notgiven',
          prompt:
            'According to the writer, present bias makes immediate spending feel more attractive than future security.',
          answer: 'YES',
          explanation:
            'Paragraph 2 says present bias makes "the pleasure of spending now feel more vivid than the comfort of a pension decades away", which supports the statement.',
        },
        {
          id: 29,
          type: 'yes-no-notgiven',
          prompt:
            'The writer claims that financial education is the most effective way to raise saving rates.',
          answer: 'NO',
          explanation:
            'Paragraph 5 says the "Save More Tomorrow" plan achieved results "no amount of financial education had been able to achieve", so the writer does not regard education as most effective.',
        },
        {
          id: 30,
          type: 'yes-no-notgiven',
          prompt:
            'The writer thinks choice architecture can be avoided altogether if policymakers wish.',
          answer: 'NO',
          explanation:
            'Paragraph 6 states that defenders argue "choice architecture is unavoidable — every form has to have some default", a view the writer presents approvingly.',
        },
        {
          id: 31,
          type: 'multiple-choice',
          prompt:
            'What does the writer identify as the central insight of behavioural economics?',
          options: [
            'People always act to maximise their long-term wealth.',
            'Human beings are subject to predictable biases.',
            'Governments cannot influence private financial decisions.',
            'Information alone is enough to change behaviour.',
          ],
          answer: 'Human beings are subject to predictable biases.',
          explanation:
            'Paragraph 2 states that "Its central insight is that human beings are subject to predictable biases."',
        },
        {
          id: 32,
          type: 'multiple-choice',
          prompt:
            'Why does automatic enrolment increase participation in pension schemes?',
          options: [
            'It offers larger financial rewards to those who join.',
            'It removes the option of leaving the scheme.',
            'It makes inaction lead to saving rather than not saving.',
            'It requires employers to contribute much more money.',
          ],
          answer: 'It makes inaction lead to saving rather than not saving.',
          explanation:
            'Paragraphs 3–4 explain that the default is changed so that the "path of least resistance" becomes saving; doing nothing now means being enrolled.',
        },
        {
          id: 33,
          type: 'multiple-choice',
          prompt:
            'Why does the "Save More Tomorrow" scheme avoid the feeling of a financial loss?',
          options: [
            'It returns the extra contributions at the end of each year.',
            'The extra contributions come from future pay rises not yet received.',
            'It allows workers to withdraw their savings at any time.',
            'It reduces the amount of tax that workers must pay.',
          ],
          answer: 'The extra contributions come from future pay rises not yet received.',
          explanation:
            'Paragraph 5 notes the higher contributions are "deducted from money the worker has not yet received", so "the painful sense of taking a cut never arrives".',
        },
        {
          id: 34,
          type: 'summary-completion',
          prompt:
            'Complete the summary: When employees must actively join a scheme, participation is often below ____ of those eligible.',
          answer: ['half', 'a half'],
          explanation:
            'Paragraph 3 states participation "tends to be low, often below half of those eligible" under active sign-up.',
        },
        {
          id: 35,
          type: 'summary-completion',
          prompt:
            'Complete the summary: Under automatic enrolment, participation typically rises above ____ per cent.',
          answer: ['ninety', '90'],
          explanation:
            'Paragraph 3 says that with automatic enrolment "participation typically rises above ninety per cent".',
        },
        {
          id: 36,
          type: 'note-completion',
          prompt:
            'Complete the note: Advocates call automatic enrolment a form of "libertarian ____".',
          answer: 'paternalism',
          explanation:
            'Paragraph 4 describes the approach as "libertarian paternalism".',
        },
        {
          id: 37,
          type: 'note-completion',
          prompt:
            'Complete the note: In the first firms to adopt "Save More Tomorrow", average saving rates more than ____ over a few years.',
          answer: ['tripled', 'tripled over a few years'],
          explanation:
            'Paragraph 5 reports that "average saving rates more than tripled over a few years".',
        },
        {
          id: 38,
          type: 'true-false-notgiven',
          prompt:
            'Critics worry that the logic of nudging could be extended to less benign purposes.',
          answer: 'TRUE',
          explanation:
            'Paragraph 6 says critics "worry that ... the same logic could be extended to less benign ends".',
        },
        {
          id: 39,
          type: 'true-false-notgiven',
          prompt:
            'The "Save More Tomorrow" scheme was first proposed by Suzanne Simard.',
          answer: 'FALSE',
          explanation:
            'The scheme was devised by "Richard Thaler and Shlomo Benartzi", not Suzanne Simard (who appears in Passage 2). FALSE.',
        },
        {
          id: 40,
          type: 'multiple-choice',
          prompt:
            'Which best summarises the writer\'s overall conclusion?',
          options: [
            'Saving behaviour cannot be changed by policy.',
            'Designing the moment of choice can matter more than providing information.',
            'People should be forced to save a fixed share of their income.',
            'Behavioural economics has been largely discredited.',
          ],
          answer: 'Designing the moment of choice can matter more than providing information.',
          explanation:
            'The final paragraph argues policymakers now ask "how to design the moment of choice", and that this shift "may prove to be worth more than any lecture", matching this option.',
        },
      ],
    },
  ],

  // ===========================================================================
  // LISTENING — 4 sections, 40 questions (10 / 10 / 10 / 10)
  // ===========================================================================
  listening: [
    // -----------------------------------------------------------------------
    // SECTION 1 — everyday transaction: booking a city cycling tour
    // -----------------------------------------------------------------------
    {
      number: 1,
      title: 'Section 1 — Booking a City Cycling Tour',
      transcript:
        'OPERATOR: Good morning, Riverside Bike Tours, this is Daniel speaking. How can I help you?\n\n' +
        'CALLER: Hi, I\'d like to book a guided cycling tour for next weekend, if that\'s possible.\n\n' +
        'OPERATOR: Of course. Let me take a few details. Could I have your full name, please?\n\n' +
        'CALLER: Yes, it\'s Helen Marsh. That\'s M-A-R-S-H.\n\n' +
        'OPERATOR: Thank you, Helen. And which day were you thinking of?\n\n' +
        'CALLER: We were hoping for Saturday, but I\'ve heard Saturdays get very busy.\n\n' +
        'OPERATOR: They do, yes. On Saturdays we only have the long route left, which is forty kilometres. If you\'d prefer something gentler, Sunday still has spaces on the short route — that one is fifteen kilometres and much flatter.\n\n' +
        'CALLER: Oh, the shorter one sounds better. Let\'s do Sunday then.\n\n' +
        'OPERATOR: Great. The Sunday tour starts at nine thirty in the morning and finishes around one o\'clock, so it lasts about three and a half hours. The meeting point is outside the Old Mill Café on Bridge Street — not at our office, which people sometimes get wrong.\n\n' +
        'CALLER: The Old Mill Café, Bridge Street. Got it. And how much does it cost?\n\n' +
        'OPERATOR: The standard price is thirty-five pounds per person. That includes the bike, a helmet and a bottle of water. If you bring your own bicycle, there\'s a ten-pound discount, so it would be twenty-five.\n\n' +
        'CALLER: We\'ll use your bikes, thanks. There are two of us.\n\n' +
        'OPERATOR: Two people on the standard price, that\'s seventy pounds in total. Now, is there anything I should know — any of you a complete beginner, for instance?\n\n' +
        'CALLER: My friend hasn\'t cycled for years, so a flat route is definitely better for her.\n\n' +
        'OPERATOR: Sunday is ideal, then. One more thing — please wear comfortable shoes and bring a light waterproof jacket, because the path runs along the river and it can be breezy. You don\'t need to bring a lock; the guide carries spares.\n\n' +
        'CALLER: Understood. How do I pay?\n\n' +
        'OPERATOR: You can pay the full amount on the day by card, or pay a deposit now to secure your place. I\'d recommend the deposit, as Sunday tours often fill up. It\'s ten pounds per person.\n\n' +
        'CALLER: I\'ll pay the deposit now. And could you send me a confirmation?\n\n' +
        'OPERATOR: Certainly. What\'s the best email address?\n\n' +
        'CALLER: It\'s helen dot marsh at speedmail dot com.\n\n' +
        'OPERATOR: Lovely. I\'ll send the confirmation straight away, and we\'ll see you and your friend on Sunday at nine thirty.',
      questions: [
        {
          id: 1,
          type: 'note-completion',
          prompt: 'Caller\'s name: Helen ____',
          answer: 'Marsh',
          explanation: 'The caller spells out her surname: "Helen Marsh. That\'s M-A-R-S-H."',
        },
        {
          id: 2,
          type: 'note-completion',
          prompt: 'Day of tour chosen: ____',
          answer: 'Sunday',
          explanation: 'The caller decides "Let\'s do Sunday then" after hearing the short route is available.',
        },
        {
          id: 3,
          type: 'note-completion',
          prompt: 'Length of the chosen route: ____ kilometres',
          answer: ['15', 'fifteen'],
          explanation: 'The Sunday short route "is fifteen kilometres and much flatter".',
        },
        {
          id: 4,
          type: 'note-completion',
          prompt: 'The tour starts at ____ in the morning.',
          answer: ['9.30', '9:30', 'nine thirty', 'half past nine'],
          explanation: 'The operator says "The Sunday tour starts at nine thirty in the morning".',
        },
        {
          id: 5,
          type: 'note-completion',
          prompt: 'Meeting point: outside the ____ on Bridge Street.',
          answer: ['Old Mill Café', 'Old Mill Cafe'],
          explanation: 'The meeting point is "outside the Old Mill Café on Bridge Street".',
        },
        {
          id: 6,
          type: 'note-completion',
          prompt: 'Standard price per person: £____',
          answer: ['35', 'thirty-five'],
          explanation: 'The operator states "The standard price is thirty-five pounds per person."',
        },
        {
          id: 7,
          type: 'note-completion',
          prompt:
            'The standard price includes the bike, a helmet and a bottle of ____.',
          answer: 'water',
          explanation: 'The price "includes the bike, a helmet and a bottle of water".',
        },
        {
          id: 8,
          type: 'multiple-choice',
          prompt: 'Why does the caller choose the Sunday tour?',
          options: [
            'It is cheaper than the Saturday tour.',
            'Her friend would prefer a flat route.',
            'It finishes earlier in the day.',
            'It allows them to use their own bikes.',
          ],
          answer: 'Her friend would prefer a flat route.',
          explanation:
            'The caller says her friend "hasn\'t cycled for years, so a flat route is definitely better for her", and the operator agrees Sunday is ideal.',
        },
        {
          id: 9,
          type: 'multiple-choice',
          prompt: 'What does the operator recommend the callers bring?',
          options: [
            'A bicycle lock',
            'A light waterproof jacket',
            'Their own helmets',
            'A packed lunch',
          ],
          answer: 'A light waterproof jacket',
          explanation:
            'The operator advises bringing "a light waterproof jacket, because the path runs along the river and it can be breezy", and notes a lock is not needed.',
        },
        {
          id: 10,
          type: 'note-completion',
          prompt: 'Deposit paid now per person: £____',
          answer: ['10', 'ten'],
          explanation: 'The deposit "is ten pounds per person", which the caller agrees to pay.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // SECTION 2 — monologue: a talk about a community arts centre
    // -----------------------------------------------------------------------
    {
      number: 2,
      title: 'Section 2 — A Talk About the Harborview Arts Centre',
      transcript:
        'Hello everyone, and welcome to the Harborview Arts Centre. My name is Priya and I\'ll be giving you a short introduction before your tour begins. The centre opened eight years ago in a building that was once a fish-packing warehouse, and we\'ve tried to keep as much of the original character as possible — the exposed brick and the iron beams you can see overhead all date from the 1890s.\n\n' +
        'Let me explain how the building is laid out so you don\'t get lost. As you came in, you passed through the main foyer, where the box office and the café are located. The café, by the way, is open to everyone, not just ticket-holders, and it serves food until eight in the evening. Straight ahead of the foyer is the largest of our three performance spaces, the Main Theatre, which seats four hundred people and hosts our touring productions and concerts.\n\n' +
        'If you turn left out of the foyer, a corridor leads to the Studio, a smaller, more flexible room used for rehearsals and experimental work. Turn right instead, and you\'ll find the Gallery, where we show paintings, photography and sculpture. Admission to the Gallery is always free, and the exhibitions change roughly every six weeks. Upstairs, above the Gallery, are the teaching rooms where our evening classes take place.\n\n' +
        'Now, a few words about what we offer. Many people think of us simply as a place to watch a show, but a large part of our work is educational. We run courses in painting, pottery, photography and creative writing, and this autumn we\'re adding a new course in printmaking, which has proved extremely popular — in fact, it\'s already fully booked, so do put your name on the waiting list if you\'re interested.\n\n' +
        'Our courses are open to all ages, but I should mention that the Saturday morning sessions are designed specifically for children aged six to twelve, while the weekday evening classes are aimed at adults. If you\'re booking for a teenager, the Sunday afternoon workshops are the right choice.\n\n' +
        'A question we\'re often asked is about cost. We try hard to keep the centre affordable. Members pay an annual fee of forty pounds, which gives them a third off all tickets and priority booking for popular events. If you attend more than a handful of performances a year, membership quickly pays for itself.\n\n' +
        'Finally, the centre relies heavily on volunteers. We currently have about sixty of them, helping with everything from front-of-house duties to running workshops. No experience is necessary — full training is provided — and volunteers receive free entry to most of our events as a thank-you. If that appeals to you, there are leaflets at the box office. Right, that\'s enough from me. Your guide for the tour, Marcus, is waiting by the foyer, so please make your way over and enjoy your visit.',
      questions: [
        {
          id: 11,
          type: 'multiple-choice',
          prompt: 'What was the Harborview building originally used for?',
          options: [
            'A concert hall',
            'A fish-packing warehouse',
            'An art school',
            'A railway station',
          ],
          answer: 'A fish-packing warehouse',
          explanation:
            'Priya says the centre opened "in a building that was once a fish-packing warehouse".',
        },
        {
          id: 12,
          type: 'multiple-choice',
          prompt: 'What is true of the café?',
          options: [
            'It is only for ticket-holders.',
            'It is open to everyone.',
            'It closes at six in the evening.',
            'It is located upstairs.',
          ],
          answer: 'It is open to everyone.',
          explanation:
            'The café "is open to everyone, not just ticket-holders, and it serves food until eight in the evening".',
        },
        {
          id: 13,
          type: 'note-completion',
          prompt: 'The Main Theatre seats ____ people.',
          answer: ['400', 'four hundred'],
          explanation: 'The Main Theatre "seats four hundred people".',
        },
        {
          id: 14,
          type: 'note-completion',
          prompt:
            'If you turn left out of the foyer you reach the ____.',
          answer: 'Studio',
          explanation:
            'Turning left "leads to the Studio, a smaller, more flexible room".',
        },
        {
          id: 15,
          type: 'note-completion',
          prompt: 'Admission to the Gallery is always ____.',
          answer: 'free',
          explanation: 'Priya states "Admission to the Gallery is always free".',
        },
        {
          id: 16,
          type: 'note-completion',
          prompt:
            'The Gallery exhibitions change roughly every ____ weeks.',
          answer: ['six', '6'],
          explanation: 'The exhibitions "change roughly every six weeks".',
        },
        {
          id: 17,
          type: 'multiple-choice',
          prompt: 'What is special about the new printmaking course?',
          options: [
            'It is free of charge.',
            'It is already fully booked.',
            'It is only for adults.',
            'It runs on Saturday mornings.',
          ],
          answer: 'It is already fully booked.',
          explanation:
            'The new printmaking course "has proved extremely popular — in fact, it\'s already fully booked".',
        },
        {
          id: 18,
          type: 'matching-information',
          prompt:
            'Which group are the Saturday morning sessions designed for?',
          options: [
            'Children aged six to twelve',
            'Teenagers',
            'Adults',
            'Volunteers',
          ],
          answer: 'Children aged six to twelve',
          explanation:
            'The Saturday morning sessions "are designed specifically for children aged six to twelve".',
        },
        {
          id: 19,
          type: 'note-completion',
          prompt: 'The annual membership fee is £____.',
          answer: ['40', 'forty'],
          explanation: 'Members "pay an annual fee of forty pounds".',
        },
        {
          id: 20,
          type: 'note-completion',
          prompt: 'The centre currently has about ____ volunteers.',
          answer: ['60', 'sixty'],
          explanation: 'Priya says "We currently have about sixty of them".',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // SECTION 3 — academic discussion: two students plan a research project
    // -----------------------------------------------------------------------
    {
      number: 3,
      title: 'Section 3 — Planning a Research Project on Urban Bees',
      transcript:
        'TUTOR: So, Aisha, Tom — you\'ve chosen urban bee populations for your project. Tell me where you\'ve got to.\n\n' +
        'AISHA: Well, we started by reading the literature, and what surprised us is that cities can actually support more species of bee than the surrounding farmland.\n\n' +
        'TUTOR: That does surprise a lot of people. Why do you think that is?\n\n' +
        'TOM: From what we read, it\'s mainly because farmland tends to be a single crop over huge areas, whereas city gardens and parks offer lots of different flowers across the whole season. So there\'s more variety of food.\n\n' +
        'TUTOR: Good. And what exactly are you planning to measure?\n\n' +
        'AISHA: Originally we wanted to count the total number of bees, but we realised that\'s almost impossible to do reliably. So instead we\'re going to focus on the number of different species — the diversity — at each of our sites.\n\n' +
        'TUTOR: A sensible narrowing. How many sites?\n\n' +
        'TOM: We\'ve picked six. Two large parks, two community gardens, and two sites on rooftops, so we can compare ground level with height.\n\n' +
        'TUTOR: And how will you actually identify the bees? That\'s notoriously difficult.\n\n' +
        'AISHA: That was our biggest worry. We didn\'t want to harm them by collecting specimens, so we\'re going to photograph each bee and identify it from the images afterwards using an online database.\n\n' +
        'TUTOR: That\'s a thoughtful, ethical approach, though be warned — photographs can make some species hard to tell apart. You may need an expert to confirm the tricky ones.\n\n' +
        'TOM: We\'ve thought of that. Dr Reyes in the biology department has agreed to check any photographs we\'re unsure about.\n\n' +
        'TUTOR: Excellent. Now, timing matters enormously with bees. When will you do your fieldwork?\n\n' +
        'AISHA: We\'re planning to visit each site once a month from April through to September. Tom suggested doing it more often, but I was worried we wouldn\'t have time to analyse all the data.\n\n' +
        'TUTOR: I think monthly is realistic for a project of this length. One thing — make sure you always record at the same time of day, because bee activity changes a lot between morning and afternoon.\n\n' +
        'TOM: We\'ll go mid-morning each time, between ten and eleven, when it\'s warm enough but not too hot.\n\n' +
        'TUTOR: Perfect. And what about the weather? You can\'t survey bees in the rain.\n\n' +
        'AISHA: No — we\'ll only survey on dry, calm days, and if a visit gets rained off we\'ll reschedule for the following week.\n\n' +
        'TUTOR: Very good. Lastly, how do you plan to present your findings?\n\n' +
        'TOM: We thought a poster for the department open day, plus a short written report.\n\n' +
        'TUTOR: I\'d suggest leading with a clear graph comparing diversity across the three types of site — that\'s your most interesting result, so make it the centrepiece.\n\n' +
        'AISHA: That makes sense. We\'ll build everything around that comparison.',
      questions: [
        {
          id: 21,
          type: 'multiple-choice',
          prompt:
            'According to the students, why can cities support more bee species than farmland?',
          options: [
            'Cities are warmer than the countryside.',
            'City gardens and parks offer a greater variety of flowers.',
            'There are fewer predators in cities.',
            'Farmland uses more pesticides.',
          ],
          answer: 'City gardens and parks offer a greater variety of flowers.',
          explanation:
            'Tom explains farmland tends to be "a single crop", whereas "city gardens and parks offer lots of different flowers across the whole season".',
        },
        {
          id: 22,
          type: 'multiple-choice',
          prompt: 'What did the students decide to measure instead of total bee numbers?',
          options: [
            'The weight of the bees',
            'The number of different species',
            'The distance bees travelled',
            'The amount of honey produced',
          ],
          answer: 'The number of different species',
          explanation:
            'Aisha says counting totals is "almost impossible", so they will "focus on the number of different species — the diversity".',
        },
        {
          id: 23,
          type: 'note-completion',
          prompt: 'Total number of study sites chosen: ____',
          answer: ['six', '6'],
          explanation: 'Tom says "We\'ve picked six" sites.',
        },
        {
          id: 24,
          type: 'note-completion',
          prompt:
            'The students will compare ground level with sites located on ____.',
          answer: ['rooftops', 'roofs'],
          explanation:
            'Two sites are "on rooftops, so we can compare ground level with height".',
        },
        {
          id: 25,
          type: 'multiple-choice',
          prompt: 'How will the students identify the bees?',
          options: [
            'By collecting specimens',
            'By photographing them and using an online database',
            'By recording the sounds they make',
            'By counting them from a distance',
          ],
          answer: 'By photographing them and using an online database',
          explanation:
            'Aisha explains they will "photograph each bee and identify it from the images afterwards using an online database".',
        },
        {
          id: 26,
          type: 'sentence-completion',
          prompt:
            'When the students are unsure about a photograph, ____ has agreed to check it.',
          answer: ['Dr Reyes', 'Reyes'],
          explanation:
            'Tom says "Dr Reyes in the biology department has agreed to check any photographs we\'re unsure about".',
        },
        {
          id: 27,
          type: 'note-completion',
          prompt:
            'Fieldwork frequency: once a ____ from April to September.',
          answer: 'month',
          explanation:
            'They plan to "visit each site once a month from April through to September".',
        },
        {
          id: 28,
          type: 'multiple-choice',
          prompt: 'Why did Aisha disagree with surveying more often?',
          options: [
            'It would cost too much money.',
            'They would not have time to analyse all the data.',
            'The bees would be disturbed.',
            'The tutor had advised against it.',
          ],
          answer: 'They would not have time to analyse all the data.',
          explanation:
            'Aisha "was worried we wouldn\'t have time to analyse all the data" if they surveyed more often than monthly.',
        },
        {
          id: 29,
          type: 'note-completion',
          prompt:
            'They will always record at the same time of day, between ten and ____ in the morning.',
          answer: ['eleven', '11'],
          explanation:
            'Tom says they will go "mid-morning each time, between ten and eleven".',
        },
        {
          id: 30,
          type: 'multiple-choice',
          prompt: 'What does the tutor advise about presenting the findings?',
          options: [
            'To write a long report rather than make a poster',
            'To lead with a graph comparing diversity across site types',
            'To present the results as a slideshow',
            'To leave out the rooftop data',
          ],
          answer: 'To lead with a graph comparing diversity across site types',
          explanation:
            'The tutor suggests "leading with a clear graph comparing diversity across the three types of site" as the centrepiece.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // SECTION 4 — academic lecture: the economics of coffee
    // -----------------------------------------------------------------------
    {
      number: 4,
      title: 'Section 4 — Lecture: The Global Coffee Economy',
      transcript:
        'Good afternoon. Today I want to trace the journey of coffee from the tree to your cup, and to use it as a window onto how global commodity markets work. Coffee is, after oil, one of the most traded commodities on the planet, and it supports the livelihoods of around twenty-five million farming households, the great majority of them smallholders working plots of just a hectare or two.\n\n' +
        'Let\'s begin with the two species that dominate the trade. The first, arabica, accounts for roughly sixty per cent of world production. It is prized for its mild, complex flavour, but it is delicate: it grows best at high altitude and is highly vulnerable to disease and to small changes in temperature. The second species, robusta, is hardier and yields more per tree, but its flavour is harsher, so it is used mainly in instant coffee and in blends. Because arabica is the more fragile crop, it is also the one most threatened by climate change.\n\n' +
        'Now, a striking feature of the coffee market is how little of the final price reaches the farmer. By some estimates, growers receive less than ten per cent of the price you pay in a café. The bulk of the value is added later, in roasting, branding and retailing, all of which usually take place in the importing country rather than where the beans are grown. This imbalance is at the heart of debates about fairness in the trade.\n\n' +
        'A further problem is price volatility. Coffee prices on the international exchanges can swing wildly from one year to the next, driven by weather events such as frost in Brazil, the world\'s largest producer. A single cold night can damage a harvest and send prices soaring; a bumper crop the following year can send them crashing. For a smallholder with no savings, this unpredictability is devastating, because income may halve from one season to the next through no fault of their own.\n\n' +
        'Several responses to these problems have emerged. The best known is fair-trade certification, which guarantees farmers a minimum price regardless of the market, plus an additional premium that communities can spend on schools or clinics. Critics, however, point out that certification has costs of its own and that only a fraction of certified coffee is actually sold at fair-trade prices, the rest being sold on the ordinary market. So the benefits, while real, are smaller than the label might suggest.\n\n' +
        'Another response is to move farmers up the value chain — encouraging them to process and even roast their own beans, so that more of the profit stays in the growing country. This is promising but difficult, since it requires investment, skills and access to distant consumers that individual smallholders rarely possess on their own. Cooperatives, in which many farmers pool their resources, are one way of overcoming this barrier.\n\n' +
        'Finally, we cannot ignore the looming threat of climate change. Studies suggest that the area of land suitable for growing arabica could shrink by as much as half by the middle of this century, as rising temperatures push cultivation to ever higher altitudes — and there is, of course, only so much mountain to climb. Researchers are responding by breeding more heat-tolerant varieties and by rediscovering forgotten wild species that might cope better with a warmer world. Whether these efforts will keep pace with the changing climate is, frankly, one of the most important questions facing the industry. So, to sum up, the humble cup of coffee turns out to be a remarkably good lens through which to examine inequality, risk and environmental change in the global economy.',
      questions: [
        {
          id: 31,
          type: 'note-completion',
          prompt:
            'Coffee supports the livelihoods of about ____ million farming households.',
          answer: ['25', 'twenty-five'],
          explanation:
            'The lecturer says coffee "supports the livelihoods of around twenty-five million farming households".',
        },
        {
          id: 32,
          type: 'note-completion',
          prompt:
            'Arabica accounts for roughly ____ per cent of world production.',
          answer: ['60', 'sixty'],
          explanation: 'Arabica "accounts for roughly sixty per cent of world production".',
        },
        {
          id: 33,
          type: 'multiple-choice',
          prompt: 'Why is robusta used mainly in instant coffee and blends?',
          options: [
            'It is more expensive than arabica.',
            'Its flavour is harsher than arabica\'s.',
            'It grows only at high altitude.',
            'It is more vulnerable to disease.',
          ],
          answer: 'Its flavour is harsher than arabica\'s.',
          explanation:
            'Robusta "is hardier and yields more per tree, but its flavour is harsher, so it is used mainly in instant coffee and in blends".',
        },
        {
          id: 34,
          type: 'note-completion',
          prompt:
            'Growers receive less than ____ per cent of the price paid in a café.',
          answer: ['ten', '10'],
          explanation:
            'The lecturer says "growers receive less than ten per cent of the price you pay in a café".',
        },
        {
          id: 35,
          type: 'sentence-completion',
          prompt:
            'Most of a coffee\'s value is added later, in roasting, branding and ____.',
          answer: ['retailing', 'retail'],
          explanation:
            'The value "is added later, in roasting, branding and retailing".',
        },
        {
          id: 36,
          type: 'multiple-choice',
          prompt: 'What is the main cause of coffee price volatility mentioned in the lecture?',
          options: [
            'Changes in consumer taste',
            'Weather events such as frost in Brazil',
            'New taxes on imports',
            'Shortages of farm labour',
          ],
          answer: 'Weather events such as frost in Brazil',
          explanation:
            'Prices swing "driven by weather events such as frost in Brazil, the world\'s largest producer".',
        },
        {
          id: 37,
          type: 'sentence-completion',
          prompt:
            'Fair-trade certification guarantees farmers a ____ price regardless of the market.',
          answer: 'minimum',
          explanation:
            'Fair-trade certification "guarantees farmers a minimum price regardless of the market".',
        },
        {
          id: 38,
          type: 'multiple-choice',
          prompt: 'What criticism of fair-trade certification does the lecturer mention?',
          options: [
            'It lowers the quality of the coffee.',
            'Only a fraction of certified coffee is actually sold at fair-trade prices.',
            'It is illegal in some countries.',
            'It discourages farmers from joining cooperatives.',
          ],
          answer: 'Only a fraction of certified coffee is actually sold at fair-trade prices.',
          explanation:
            'Critics note that "only a fraction of certified coffee is actually sold at fair-trade prices, the rest being sold on the ordinary market".',
        },
        {
          id: 39,
          type: 'sentence-completion',
          prompt:
            'Farmers can keep more profit by moving up the value chain and joining ____ that pool resources.',
          answer: ['cooperatives', 'co-operatives'],
          explanation:
            'The lecturer says "Cooperatives, in which many farmers pool their resources, are one way of overcoming this barrier."',
        },
        {
          id: 40,
          type: 'note-completion',
          prompt:
            'Studies suggest land suitable for arabica could shrink by as much as ____ by mid-century.',
          answer: ['half', 'a half', '50%'],
          explanation:
            'The lecturer states the suitable area "could shrink by as much as half by the middle of this century".',
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
        'The chart below shows the percentage of households in one European country that owned selected electronic devices in 2005, 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      minWords: 150,
      visual:
        'A grouped bar chart titled "Household ownership of electronic devices (%)". Four device categories on the horizontal axis: Desktop computer, Smartphone, Smart speaker, Tablet. Each category has three bars (2005, 2015, 2025). Desktop computer: 65% in 2005, 48% in 2015, 22% in 2025. Smartphone: 5% in 2005, 78% in 2015, 96% in 2025. Smart speaker: 0% in 2005, 12% in 2015, 58% in 2025. Tablet: 0% in 2005, 40% in 2015, 51% in 2025.',
      modelAnswer:
        'The bar chart compares the proportion of households owning four types of electronic device in a European country at three points in time: 2005, 2015 and 2025.\n\n' +
        'The most striking trend is the rise of the smartphone. Owned by only 5% of households in 2005, it surged to 78% in 2015 and reached almost universal ownership, at 96%, by 2025, making it by far the most common device at the end of the period.\n\n' +
        'In contrast, the desktop computer followed the opposite path. Present in nearly two-thirds of homes (65%) in 2005, its ownership fell to 48% in 2015 and then dropped sharply to just 22% in 2025, as portable devices evidently displaced it.\n\n' +
        'The two newer devices both grew from nothing. Tablets, absent in 2005, climbed to 40% and then to 51% over the following two decades. Smart speakers, also starting at zero, rose modestly to 12% in 2015 before expanding rapidly to 58% by 2025, overtaking tablets in the final year.\n\n' +
        'Overall, while traditional desktop computers declined steadily, mobile and connected devices grew markedly, with the smartphone dominating by 2025.',
      examinerNotes: [
        'Opens with a clear paraphrase of the prompt and does not copy the question wording verbatim.',
        'Selects and groups the key features (rising smartphone, falling desktop, the two new devices) rather than listing every number mechanically.',
        'Includes an overview sentence summarising the main trends, which is essential for a high Task Achievement score.',
        'Uses precise comparative and trend language: "surged", "in contrast", "followed the opposite path", "overtaking".',
        'Comfortably exceeds 150 words and presents all figures accurately, supporting a Band 9 rating.',
      ],
    },
    {
      task: 2,
      prompt:
        'Some people believe that the increasing use of artificial intelligence in the workplace will create more opportunities than it destroys. Others fear it will leave many people without work. Discuss both views and give your own opinion. Write at least 250 words.',
      minWords: 250,
      modelAnswer:
        'The rapid spread of artificial intelligence (AI) into offices, factories and service industries has provoked sharply divided predictions about its effect on employment. While some commentators are confident that AI will ultimately generate more jobs than it removes, others warn of widespread displacement. In my view, both outcomes are likely to occur simultaneously, and the net result will depend heavily on how societies choose to respond.\n\n' +
        'Those who are optimistic point to the history of technological change. Previous innovations, from the power loom to the personal computer, were expected to destroy jobs but in fact created entire new industries and occupations that no one had foreseen. By automating routine tasks, AI frees workers to concentrate on creative, interpersonal and supervisory roles, while generating fresh demand for engineers, data analysts and the many people needed to build and maintain these systems. On this reading, AI is simply the latest tool to raise productivity and, with it, prosperity.\n\n' +
        'The opposing view, however, deserves serious attention. Unlike earlier machines, AI is increasingly able to perform cognitive work that was once thought uniquely human, from drafting documents to diagnosing illness. This means that not only manual labourers but also accountants, translators and customer-service staff may find their roles automated. The danger is that the new jobs created require advanced skills that displaced workers do not possess, leading to a painful mismatch and rising inequality, at least in the short term.\n\n' +
        'In my opinion, the technology itself is neither inherently a creator nor a destroyer of work; the decisive factor is policy. If governments invest heavily in retraining, education and social support, the transition can be managed and the benefits widely shared. If they do not, the gains will accrue to a few while many are left behind. AI, in short, presents an opportunity that will be realised only through deliberate human choices.',
      examinerNotes: [
        'Directly addresses both views and states a clear personal position in the introduction, fulfilling the "discuss both views and give your opinion" instruction.',
        'Each body paragraph develops one side with relevant examples and reasoning, showing strong Coherence and Cohesion.',
        'Uses a wide range of precise vocabulary ("displacement", "cognitive work", "mismatch", "accrue") and complex sentence structures accurately.',
        'The conclusion synthesises the argument rather than merely repeating it, locating the answer in the role of policy.',
        'Well over 250 words with consistent grammatical control, supporting a Band 9 rating.',
      ],
    },
  ],

  // ===========================================================================
  // SPEAKING — 3 parts
  // ===========================================================================
  speaking: [
    {
      part: 1,
      title: 'Part 1 — Introduction and interview (Topic: Technology & daily life)',
      questions: [
        'How often do you use a computer or smartphone in a typical day?',
        'What do you mainly use the internet for?',
        'Do you think you spend too much time looking at screens? Why or why not?',
        'Has technology changed the way you keep in touch with friends and family?',
        'Is there any piece of technology you would find it hard to live without?',
      ],
      sampleAnswers: [
        'Honestly, I use my phone almost constantly — probably from the moment I wake up until I go to bed. It\'s my alarm clock, my map, my way of catching up on the news, so it\'s woven into pretty much everything I do.',
        'Mostly for staying informed and for work. I read articles in the morning, reply to emails throughout the day, and in the evening I tend to relax with a video or a podcast.',
        'I do, to be honest. I\'ve started to notice that I reach for my phone out of habit rather than need, so recently I\'ve been trying to leave it in another room when I\'m studying.',
        'Enormously. My family is spread across three different countries, and a quick video call costs nothing, so we actually speak far more often than my parents\' generation ever did.',
        'Definitely my phone, although I\'m slightly embarrassed to admit it. If I lost it I wouldn\'t just lose contact — I\'d lose my tickets, my photos and half my memory of where I\'m supposed to be.',
      ],
    },
    {
      part: 2,
      title: 'Part 2 — Cue card (long turn)',
      questions: [
        'Describe a skill you learned that has proved useful to you. You should say:',
        '• what the skill is',
        '• how and when you learned it',
        '• how difficult it was to learn',
        'and explain why this skill has been useful to you.',
        'You will have one minute to prepare and should speak for one to two minutes.',
      ],
      sampleAnswers: [
        'The skill I\'d like to talk about is touch-typing — being able to type quickly without looking at the keyboard. It might sound unglamorous, but it has genuinely changed how productive I can be.\n\nI learned it when I was about fifteen. My school ran a short optional course after lessons, and at first I joined mainly because a friend was doing it. We used a free online program that flashed letters on the screen and timed how fast and accurately we responded. For the first couple of weeks it was honestly painful — I was far slower than my old hunt-and-peck method, and it was tempting to give up. But the program insisted you didn\'t look down, and after about a month something clicked and my fingers seemed to know where the keys were on their own.\n\nIn terms of difficulty, the hardest part was the frustration at the beginning rather than the skill itself. It required patience and daily practice, maybe twenty minutes a day, and you had to resist the urge to revert to your old habits.\n\nIt has been useful in almost every part of my life since. At university I could take notes in lectures while still looking at the lecturer, and now I can write emails and reports far faster than most of my colleagues. Because I don\'t have to think about the mechanics of typing, I can concentrate fully on what I actually want to say — and that, I think, is why such a simple skill has turned out to be so valuable.',
      ],
    },
    {
      part: 3,
      title: 'Part 3 — Two-way discussion (Topic: Learning and skills in society)',
      questions: [
        'Do you think practical skills are valued as highly as academic knowledge in your country?',
        'Should schools focus more on teaching skills for the modern workplace?',
        'How has the way people learn new skills changed because of the internet?',
        'Are some skills becoming less important because of technology?',
        'Whose responsibility is it to help adults learn new skills — the individual, employers or the government?',
      ],
      sampleAnswers: [
        'That\'s an interesting question. Traditionally, I\'d say academic qualifications have carried more prestige in my country, but attitudes are shifting. As skilled trades become better paid and harder to fill, people are beginning to see that a good electrician or coder can earn as much as many graduates, so the old hierarchy is starting to break down.',
        'To some extent, yes, although I\'d be cautious. Equipping students with practical, employable skills is obviously valuable, but if schools chase whatever is fashionable in the job market, they risk neglecting the broad thinking skills that allow people to adapt when those jobs inevitably change.',
        'Dramatically. In the past you usually needed a teacher, a class and a fixed timetable. Now, if you want to learn anything from cooking to coding, there\'s almost certainly a free video or course online. The main shift is that learning has become far more self-directed — the difficulty is no longer access but motivation.',
        'Certainly some are. Mental arithmetic and handwriting, for instance, matter less than they once did because we carry calculators and keyboards everywhere. That said, I\'d argue the underlying abilities — numeracy and clear communication — remain essential; it\'s only the manual execution that technology has taken over.',
        'I think it has to be shared. Individuals must take the initiative, but realistically they need support. Employers benefit directly from a skilled workforce, so they should fund training, while governments have a role in providing affordable courses and a safety net for those whose industries are disappearing. Leaving it entirely to the individual would simply widen the gap between the secure and the vulnerable.',
      ],
    },
  ],
};
