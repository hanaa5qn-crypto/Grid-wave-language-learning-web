// =============================================================================
// IELTS Academic — Generated Practice Tests 8–12 (Set B)
// -----------------------------------------------------------------------------
// Five complete IeltsTest objects transcribed from the generated practice-test
// markdown sources (source tests 6–10), conforming to the IeltsTest contract
// in ../types. Content (passages, transcripts, prompts, model answers) is
// transcribed verbatim from the source files; only question numbering was
// localised per test/skill.
// =============================================================================
import { IeltsTest } from '../types';

export const IELTS_PRACTICE_TESTS_B: IeltsTest[] = [
  // ===========================================================================
  // TEST 8 (source: Practice Test 6)
  // ===========================================================================
  {
    id: 'ielts-academic-8',
    title: 'IELTS Practice Test 8',
    module: 'Academic',
    source: 'Generated practice set (verified)',

    reading: [
      {
        number: 1,
        title: 'Reading History from the Seabed',
        text:
          "Beneath the surface of the world's oceans, seas, and lakes lies an archive of human history largely untouched until the twentieth century: the wrecks of ships that carried goods, people, and ideas across the globe. Underwater archaeology, the systematic study of submerged sites, emerged as a serious scientific discipline only after the development of self-contained underwater breathing apparatus, commonly known as SCUBA, in the mid-twentieth century, which finally allowed archaeologists rather than only treasure hunters to investigate wrecks directly and methodically.\n\nOne of the field's defining early projects was the excavation of a Bronze Age shipwreck off Uluburun, on the southern coast of modern Turkey, discovered by a sponge diver in 1982 and excavated over more than a decade beginning in 1984. The ship, dated to roughly 1300 BCE, carried an extraordinarily diverse cargo: copper and tin ingots for bronze production, glass ingots, ivory, ostrich eggshells, and manufactured goods from across the eastern Mediterranean, Egypt, and the Near East. The sheer diversity of the cargo transformed historians' understanding of Bronze Age trade, revealing a far more interconnected ancient Mediterranean economy than most scholars had previously assumed, with goods travelling across cultural and political boundaries that were once thought to be far more isolating.\n\nUnlike excavation on land, underwater archaeology presents distinctive technical challenges. Sediment, currents, and marine growth can obscure or damage wrecks, while limited visibility and the physiological constraints of diving restrict how long archaeologists can work at depth during any single dive. Deeper wrecks, often the best preserved because they lie beyond the reach of casual looters and destructive wave action, may require remotely operated vehicles, submersibles, or specialised mixed-gas diving techniques, all of which add considerable cost and complexity compared with a typical land excavation.\n\nPreservation conditions underwater can, paradoxically, be superior to those on land in specific circumstances. Cold, oxygen-poor, or highly saline environments can dramatically slow the decay of organic materials that would quickly disintegrate on land. The Baltic Sea, for example, has yielded remarkably well-preserved wooden shipwrecks, some centuries old, because its cold, low-salinity, low-oxygen waters inhibit the shipworm, a wood-boring mollusc that would otherwise destroy timber hulls within decades in warmer, saltier waters. By contrast, wrecks in warm tropical waters are typically far more degraded, since higher temperatures, ample oxygen, and abundant marine organisms accelerate both biological decay and mechanical damage from wave action and marine life.\n\nUnderwater archaeology has also faced a persistent tension with commercial treasure hunting. Companies specialising in shipwreck recovery, motivated primarily by the value of recoverable artefacts such as gold and silver coins, have at times removed material from wrecks with minimal or no archaeological documentation, destroying contextual information that archaeologists consider essential to understanding a site, such as the precise position of objects relative to one another. This tension has led to significant legal and ethical debate, and organisations such as UNESCO have promoted international conventions intended to protect underwater cultural heritage from commercial exploitation, encouraging in situ preservation of wrecks wherever possible rather than wholesale removal of artefacts.\n\nAdvances in technology continue to expand what is possible in the field. Multibeam sonar mapping allows researchers to survey large areas of seabed rapidly and identify potential wreck sites without physically disturbing them, while photogrammetry, the technique of building detailed three-dimensional models from overlapping photographs, allows archaeologists to create precise digital records of a wreck before any excavation disturbs its original arrangement. These tools have made it possible to document and study far more sites than could ever be excavated using traditional methods alone, ensuring that even wrecks left undisturbed on the seabed can still contribute meaningfully to historical knowledge.",
        questions: [
          {
            id: 1,
            type: 'true-false-notgiven',
            prompt: 'Underwater archaeology only became a rigorous scientific discipline after the development of SCUBA equipment.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: 'The passage states it "emerged as a serious scientific discipline only after the development of... SCUBA."',
          },
          {
            id: 2,
            type: 'true-false-notgiven',
            prompt: 'The Uluburun shipwreck was discovered by a professional archaeologist.',
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: 'It was "discovered by a sponge diver in 1982."',
          },
          {
            id: 3,
            type: 'true-false-notgiven',
            prompt: "The Uluburun wreck's cargo suggested Bronze Age Mediterranean trade was more interconnected than previously believed.",
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: "The passage says it revealed \"a far more interconnected ancient Mediterranean economy than most scholars had previously assumed.\"",
          },
          {
            id: 4,
            type: 'true-false-notgiven',
            prompt: 'Wrecks in warm tropical waters tend to be better preserved than those in cold waters.',
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: '"wrecks in warm tropical waters are typically far more degraded" compared with cold-water wrecks.',
          },
          {
            id: 5,
            type: 'true-false-notgiven',
            prompt: 'UNESCO has promoted conventions encouraging preservation of wrecks in place rather than commercial removal of artefacts.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"encouraging in situ preservation of wrecks wherever possible rather than wholesale removal of artefacts."',
          },
          {
            id: 6,
            type: 'sentence-completion',
            prompt: 'The Uluburun ship was discovered by a ____ in 1982.',
            answer: ['sponge diver', 'a sponge diver'],
            explanation: '"discovered by a sponge diver in 1982."',
          },
          {
            id: 7,
            type: 'sentence-completion',
            prompt: 'In the Baltic Sea, cold and low-salinity water inhibits a wood-boring mollusc known as the ____.',
            answer: 'shipworm',
            explanation: '"inhibit the shipworm, a wood-boring mollusc."',
          },
          {
            id: 8,
            type: 'sentence-completion',
            prompt: 'Commercial treasure hunters have sometimes destroyed ____ information that archaeologists consider essential.',
            answer: 'contextual',
            explanation: 'destroying contextual information that archaeologists consider essential.',
          },
          {
            id: 9,
            type: 'sentence-completion',
            prompt: '____ allows researchers to build three-dimensional models of a wreck from overlapping photographs.',
            answer: 'Photogrammetry',
            explanation: '"photogrammetry, the technique of building detailed three-dimensional models from overlapping photographs."',
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'According to the passage, deeper shipwrecks are often better preserved mainly because',
            options: [
              'they contain more valuable cargo.',
              'they lie beyond the reach of looters and destructive wave action.',
              'cold water always exists at greater depths.',
              'archaeologists reach them more quickly than shallow wrecks.',
            ],
            answer: 'they lie beyond the reach of looters and destructive wave action.',
            explanation: '"often the best preserved because they lie beyond the reach of casual looters and destructive wave action."',
          },
          {
            id: 11,
            type: 'multiple-choice',
            prompt: 'What does the passage say about the tension between archaeologists and treasure-hunting companies?',
            options: [
              'Treasure hunters always work closely with archaeologists.',
              'It has led to legal and ethical debate over underwater cultural heritage.',
              'It has been fully resolved by international law.',
              'It only affects wrecks in the Baltic Sea.',
            ],
            answer: 'It has led to legal and ethical debate over underwater cultural heritage.',
            explanation: '"This tension has led to significant legal and ethical debate."',
          },
          {
            id: 12,
            type: 'multiple-choice',
            prompt: 'What advantage does multibeam sonar mapping provide, according to the passage?',
            options: [
              'It allows large seabed areas to be surveyed quickly without physical disturbance.',
              'It replaces the need for any physical excavation entirely.',
              'It can only be used on wrecks older than 1000 years.',
              'It works only in shallow, tropical waters.',
            ],
            answer: 'It allows large seabed areas to be surveyed quickly without physical disturbance.',
            explanation: '"allows researchers to survey large areas of seabed rapidly and identify potential wreck sites without physically disturbing them."',
          },
          {
            id: 13,
            type: 'multiple-choice',
            prompt: 'What is the overall significance of the technological advances described in the final paragraph?',
            options: [
              'They have made traditional excavation methods obsolete.',
              'They allow more sites to be documented and studied than could be excavated by hand alone.',
              'They have eliminated the need for underwater archaeologists.',
              'They are primarily used to assist treasure-hunting companies.',
            ],
            answer: 'They allow more sites to be documented and studied than could be excavated by hand alone.',
            explanation: '"made it possible to document and study far more sites than could ever be excavated using traditional methods alone."',
          },
        ],
      },
    ],

    listening: [
      {
        number: 2,
        title: "Section 2: The Town's New Recycling Scheme",
        transcript:
          "ANNOUNCER: Now here's an update for residents about the council's new recycling scheme, starting next month.\n\nFrom the first of September, collections will change from a weekly to a fortnightly cycle for general rubbish, but recycling will now be collected every week instead of fortnightly, as it is currently. Garden waste collection remains monthly, on the last Friday of each month.\n\nEach household will be issued a new set of bins: a green bin for garden waste, a blue bin for paper and cardboard, and a black box for glass and plastic. Note that the black box replaces the old grey box — please don't continue using the grey box, as it won't be emptied after September.\n\nIf you don't receive your new bins by the twentieth of August, contact the council's waste team directly, not the general enquiries line, as they can't process bin requests.\n\nThere's also a new rule about bin placement: bins must be placed at the kerbside by seven a.m. on collection day, not the night before, due to concerns about foxes and litter.\n\nFor those in flats without individual bins, communal recycling points will be installed in car parks, and the council recommends checking the signage on each container carefully, since mixed recycling is not accepted at these communal points — items must be sorted into the correct container.\n\nFinally, the council is offering a free composting workshop for anyone interested in reducing garden waste further. This will take place on the twelfth of September at the community hall, starting at ten in the morning.\n\nFor any questions, residents can call the waste team on the number shown on their council tax bill.",
        questions: [
          {
            id: 1,
            type: 'note-completion',
            prompt: 'General rubbish collection frequency (from September): ____',
            answer: 'fortnightly',
            explanation: '"collections will change from a weekly to a fortnightly cycle for general rubbish."',
          },
          {
            id: 2,
            type: 'note-completion',
            prompt: 'Recycling collection frequency (from September): ____',
            answer: ['every week', 'weekly'],
            explanation: '"recycling will now be collected every week instead of fortnightly."',
          },
          {
            id: 3,
            type: 'note-completion',
            prompt: 'Garden waste collected on the last ____ of each month.',
            answer: 'Friday',
            explanation: '"Garden waste collection remains monthly, on the last Friday of each month."',
          },
          {
            id: 4,
            type: 'note-completion',
            prompt: 'New black box is for: glass and ____',
            answer: 'plastic',
            explanation: '"a black box for glass and plastic."',
          },
          {
            id: 5,
            type: 'note-completion',
            prompt: 'Bins must be placed out by ____ on collection day.',
            answer: ['7am', 'seven a.m.', '7 a.m.'],
            explanation: '"bins must be placed at the kerbside by seven a.m. on collection day."',
          },
          {
            id: 6,
            type: 'short-answer',
            prompt: "Who should residents contact if new bins don't arrive by 20 August?",
            answer: 'the waste team',
            explanation: "\"contact the council's waste team directly, not the general enquiries line.\"",
          },
          {
            id: 7,
            type: 'short-answer',
            prompt: 'What is not accepted at communal recycling points?',
            answer: 'mixed recycling',
            explanation: '"mixed recycling is not accepted at these communal points."',
          },
          {
            id: 8,
            type: 'short-answer',
            prompt: 'Where will the composting workshop be held?',
            answer: 'the community hall',
            explanation: '"This will take place on the twelfth of September at the community hall."',
          },
          {
            id: 9,
            type: 'multiple-choice',
            prompt: 'From September, the old grey box will',
            options: [
              'be repaired and returned to households.',
              'no longer be emptied.',
              'still be used alongside the black box.',
            ],
            answer: 'no longer be emptied.',
            explanation: "\"please don't continue using the grey box, as it won't be emptied after September.\"",
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'The composting workshop takes place on',
            options: ['2 September.', '12 September.', '20 September.'],
            answer: '12 September.',
            explanation: '"This will take place on the twelfth of September."',
          },
        ],
      },
    ],

    writing: [
      {
        task: 1,
        prompt:
          'The map below shows the town of Millbrook in 1990 and the same town in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
        visual:
          'Millbrook, 1990: a small town with a central marketplace, a primary school to the north, farmland covering the entire eastern half, a single road connecting the town to the highway in the south, and a river running along the western edge with one small bridge. Millbrook, 2020: the central marketplace has been replaced by a shopping mall; the primary school remains but a new secondary school has been built next to it; the eastern farmland has been converted into a residential housing estate with a new park; two additional roads now connect the town to the highway; a second, larger bridge has been built across the river.',
        modelAnswer:
          "The two maps depict significant changes in the layout of the town of Millbrook between 1990 and 2020.\n\nOverall, the town underwent substantial urban development and expansion, with agricultural land giving way to residential housing and infrastructure being considerably upgraded to accommodate growth.\n\nIn 1990, Millbrook was a small, largely rural town centred around a marketplace, with a single primary school to the north. The entire eastern half of the town consisted of farmland, and access to the highway in the south was limited to a single road. A river ran along the western edge, crossed only by one small bridge.\n\nBy 2020, considerable development had taken place. The central marketplace had been demolished and replaced by a shopping mall, and a new secondary school had been constructed alongside the existing primary school. Most notably, the farmland to the east had been entirely transformed into a residential housing estate, complete with a new park. To support the resulting growth in population and traffic, two additional roads now linked the town to the highway, and a second, larger bridge had been built across the river.",
        examinerNotes: [
          'Task Achievement accurately covers every labelled change between the two maps with a clear overview of the general direction of development.',
          'Coherence & Cohesion separates the two time periods into distinct paragraphs linked by "By 2020, considerable development had taken place."',
          'Lexical Resource uses appropriate spatial and urban-planning vocabulary (residential housing estate, infrastructure, demolished).',
          'Grammatical Range & Accuracy shows accurate past perfect passive constructions ("had been replaced", "had been constructed") appropriate for map-change description.',
        ],
      },
      {
        task: 2,
        prompt:
          'In many cities, rapid urban development has led to the loss of green spaces and historic buildings. What problems does this cause, and what can be done to solve them? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
        modelAnswer:
          "As cities expand to accommodate growing populations, green spaces and historic architecture are frequently sacrificed for new construction. This essay will explore the problems this creates and suggest potential solutions.\n\nThe disappearance of parks and green spaces carries significant consequences for urban residents' physical and mental wellbeing. Without accessible areas for recreation and exercise, city dwellers face higher rates of stress and sedentary lifestyles, while urban biodiversity also suffers as habitats for birds and insects vanish. Equally troubling is the loss of historic buildings, which erodes a city's cultural identity and severs the tangible connection between current residents and their heritage. Once demolished, such structures, often centuries old, can never be authentically replaced, leaving cities increasingly indistinguishable from one another.\n\nSeveral measures could address these issues. Firstly, city planners could implement stricter zoning laws that mandate a minimum proportion of green space in any new development, as several European cities have already done successfully. Secondly, governments could establish heritage protection listings that legally prevent the demolition of architecturally or historically significant buildings, instead encouraging their restoration and adaptive reuse, for instance converting old factories into museums or apartments. Thirdly, financial incentives, such as tax relief, could encourage private developers to incorporate rooftop gardens, public parks, or preserved facades into their projects rather than pursuing purely profit-driven demolition.\n\nUltimately, responsibility lies with a combination of government regulation and developer cooperation. Public pressure, too, plays a valuable role, as communities that actively campaign for heritage preservation and green space often succeed in influencing local planning decisions.\n\nIn conclusion, while unchecked urban development can permanently damage both the environment and cultural heritage of a city, coordinated action through zoning regulation, heritage protection, and incentivised sustainable design offers a realistic path to preserving what makes cities liveable and distinctive.",
        examinerNotes: [
          'Task Response fully addresses both the problems and solutions with specific, well-extended examples (European zoning laws, adaptive reuse).',
          'Coherence & Cohesion uses clear ordinal signposting (Firstly, Secondly, Thirdly) and a strong concluding synthesis.',
          'Lexical Resource includes precise vocabulary (adaptive reuse, zoning laws, sedentary lifestyles).',
          'Grammatical Range & Accuracy demonstrates a wide range of complex sentences, including relative and conditional clauses, used with accuracy.',
        ],
      },
    ],

    speaking: [
      {
        part: 1,
        title: 'Part 1: Introduction and Interview',
        questions: [
          'What is your favourite festival or celebration?',
          'How do people in your country usually celebrate it?',
          'Did your family have any special traditions when you were growing up?',
          'Do you think festivals are as important today as they used to be?',
          'What kind of food do you enjoy most?',
          'Do you prefer eating at home or in restaurants?',
          'Has your diet changed much over the years?',
          'Do you enjoy cooking?',
        ],
        sampleAnswers: [],
      },
      {
        part: 2,
        title: 'Part 2: Individual Long Turn (Cue Card)',
        questions: [
          'Describe a tradition in your country that you enjoy. You should say:',
          '• what the tradition is',
          '• when it takes place',
          '• what people usually do during it',
          '• and explain why you enjoy it',
          'You will have one minute to prepare and should speak for one to two minutes.',
          'Follow-up: Do you think this tradition will still be practised in the future?',
        ],
        sampleAnswers: [
          "One tradition I've always been fond of is the Mid-Autumn Festival, which takes place in my country every year in either September or October, depending on the lunar calendar. It's essentially a harvest celebration, but over generations it's evolved into something much more centred on family reunion and gratitude. On the evening of the festival, families gather together, usually at the grandparents' house, to share a meal and, most importantly, mooncakes — a dense, sweet pastry typically filled with lotus seed paste or red bean paste. After dinner, everyone heads outside to admire the full moon, which is said to be at its brightest and roundest on this particular night. What I love most about it isn't really the food, delicious as it is, but the unhurried, almost ritualistic quality of the evening — there's no rush, no obligation to do anything productive, just an evening set aside purely for being present with the people you care about. In an era where everyone's constantly preoccupied with work and screens, having one evening a year explicitly dedicated to slowing down and reconnecting with family feels remarkably grounding. It's a tradition I hope to continue observing with my own children someday.",
        ],
      },
      {
        part: 3,
        title: 'Part 3: Two-Way Discussion',
        questions: [
          'Why are traditions important to a society?',
          'Do you think globalisation is causing traditional customs to disappear?',
          'Should governments actively work to preserve traditional customs?',
          'How do younger generations feel about traditional practices compared to older generations?',
          'Can new traditions be created, or must they always come from the past?',
          'How might traditions change as societies become more urbanised?',
        ],
        sampleAnswers: [],
      },
    ],
  },

  // ===========================================================================
  // TEST 9 (source: Practice Test 7)
  // ===========================================================================
  {
    id: 'ielts-academic-9',
    title: 'IELTS Practice Test 9',
    module: 'Academic',
    source: 'Generated practice set (verified)',

    reading: [
      {
        number: 1,
        title: 'Putting a Price on the Road',
        text:
          "Traffic congestion imposes enormous costs on modern economies, from lost productivity and wasted fuel to increased air pollution and stress. One policy tool that economists have championed for decades as a solution, though it remains politically contentious, is congestion pricing: charging drivers a fee to enter or drive within particularly congested areas, typically during peak hours. The underlying economic logic is straightforward. Roads, especially in city centres, function as a shared resource that is effectively free at the point of use, and when a valuable resource is provided without a price, demand for it tends to exceed the available supply, resulting in congestion, much as any underpriced good tends to be overused relative to a good priced to reflect its true cost.\n\nSingapore was the first city to implement a large-scale congestion pricing scheme, introducing the Area Licensing Scheme in 1975, which required drivers to purchase a licence to enter the central business district during peak hours. The scheme reduced traffic entering the priced zone substantially within its first year of operation. Singapore has since evolved the system into Electronic Road Pricing, which automatically deducts fees from vehicles' onboard units as they pass under overhead gantries, allowing prices to be adjusted dynamically to maintain a targeted traffic speed, with fees rising when congestion increases and falling when traffic flows more freely.\n\nLondon introduced a congestion charge in 2003, requiring drivers to pay a daily fee to enter central London during business hours. The scheme reduced traffic volumes within the charging zone and generated substantial revenue, which the city dedicated primarily to funding public transport improvements, including additional bus services. Studies conducted after the scheme's introduction found that bus reliability within the zone improved measurably, in part because reduced congestion allowed buses to keep to their timetables more consistently.\n\nDespite such results, congestion pricing schemes have frequently faced significant political resistance before implementation. Critics argue that such schemes disproportionately burden lower-income drivers who may have fewer viable alternatives to driving, since they may live in areas poorly served by public transport or may need vehicles for work that cannot easily be replaced. Proponents counter that revenue from congestion charges can be, and in several cities has been, specifically directed toward improving public transport options, which disproportionately benefits lower-income residents in the long run, and that the alternative — continued severe congestion — imposes its own hidden and regressive costs on everyone, including those who rely on buses stuck in the same traffic.\n\nNew York City became the first major city in the United States to introduce comprehensive congestion pricing, launching its programme for lower Manhattan after extended political and legal disputes that delayed implementation for several years beyond its originally planned start date. Early assessments following implementation suggested reductions in traffic volume and modest improvements in travel times within the priced zone, broadly consistent with outcomes observed in Singapore and London, although economists caution that longer-term data collected over multiple years is generally necessary before drawing firm conclusions about a scheme's lasting effects on travel behaviour and economic activity within the affected area.\n\nEconomists generally regard congestion pricing as an application of a broader concept known as Pigovian taxation, in which a government imposes a price on an activity that generates costs, in this case traffic congestion, borne by third parties who did not choose to incur them. By internalising this externality, congestion pricing schemes theoretically encourage drivers to consider the true social cost of their journey, whether by travelling at a different time, using an alternative mode of transport, or foregoing an unnecessary trip altogether, thereby aligning private incentives more closely with overall economic efficiency for the city as a whole.",
        questions: [
          {
            id: 1,
            type: 'true-false-notgiven',
            prompt: 'Singapore was the first city to implement a large-scale congestion pricing scheme.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"Singapore was the first city to implement a large-scale congestion pricing scheme."',
          },
          {
            id: 2,
            type: 'true-false-notgiven',
            prompt: "London's congestion charge revenue was used primarily to fund new road construction.",
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: 'revenue was "dedicated primarily to funding public transport improvements," not road construction.',
          },
          {
            id: 3,
            type: 'true-false-notgiven',
            prompt: "Bus reliability within London's charging zone improved after the scheme was introduced.",
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"bus reliability within the zone improved measurably."',
          },
          {
            id: 4,
            type: 'true-false-notgiven',
            prompt: "New York City's congestion pricing programme began exactly on its originally planned start date.",
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: '"after extended political and legal disputes that delayed implementation for several years beyond its originally planned start date."',
          },
          {
            id: 5,
            type: 'summary-completion',
            prompt: 'Congestion pricing is grounded in the idea that roads are often provided as a free ____, causing demand to exceed supply.',
            answer: 'resource',
            explanation: '"roads... function as a shared resource that is effectively free at the point of use."',
          },
          {
            id: 6,
            type: 'summary-completion',
            prompt: "Singapore's original scheme, the ____ Scheme introduced in 1975, has since evolved into Electronic Road Pricing.",
            answer: ['Area Licensing', 'the Area Licensing'],
            explanation: '"introducing the Area Licensing Scheme in 1975."',
          },
          {
            id: 7,
            type: 'summary-completion',
            prompt: 'Electronic Road Pricing adjusts fees dynamically using overhead ____.',
            answer: 'gantries',
            explanation: "\"deducts fees from vehicles' onboard units as they pass under overhead gantries.\"",
          },
          {
            id: 8,
            type: 'summary-completion',
            prompt: 'Economists classify congestion pricing as a form of ____ taxation.',
            answer: 'Pigovian',
            explanation: '"economists generally regard congestion pricing as an application of a broader concept known as Pigovian taxation."',
          },
          {
            id: 9,
            type: 'summary-completion',
            prompt: 'This addresses costs imposed on third parties, known as an ____, that are not reflected in the price of an activity.',
            answer: 'externality',
            explanation: '"By internalising this externality."',
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'According to critics mentioned in the passage, congestion pricing schemes may unfairly affect',
            options: [
              'wealthy residents who rarely drive.',
              'lower-income drivers with fewer transport alternatives.',
              'tourists visiting the city centre.',
              'bus companies operating within the zone.',
            ],
            answer: 'lower-income drivers with fewer transport alternatives.',
            explanation: '"such schemes disproportionately burden lower-income drivers who may have fewer viable alternatives to driving."',
          },
          {
            id: 11,
            type: 'multiple-choice',
            prompt: 'What do proponents of congestion pricing argue in response to critics, according to the passage?',
            options: [
              'Congestion charges should be abolished immediately.',
              'Revenue can fund public transport improvements that benefit lower-income residents.',
              'Lower-income drivers should be exempted from all road use.',
              'Congestion has no real economic cost.',
            ],
            answer: 'Revenue can fund public transport improvements that benefit lower-income residents.',
            explanation: '"revenue from congestion charges can be... directed toward improving public transport options, which disproportionately benefits lower-income residents."',
          },
          {
            id: 12,
            type: 'multiple-choice',
            prompt: "Why do economists urge caution in interpreting New York's early results?",
            options: [
              'Because the data contradicts results from Singapore and London.',
              'Because longer-term data is generally needed before drawing firm conclusions.',
              'Because congestion pricing was found to have no effect at all.',
              'Because the scheme was cancelled shortly after launch.',
            ],
            answer: 'Because longer-term data is generally needed before drawing firm conclusions.',
            explanation: '"economists caution that longer-term data collected over multiple years is generally necessary before drawing firm conclusions."',
          },
          {
            id: 13,
            type: 'multiple-choice',
            prompt: 'What is the central idea behind Pigovian taxation as applied to congestion pricing?',
            options: [
              'It punishes drivers for using their own vehicles.',
              'It internalises a cost otherwise borne by third parties, encouraging more efficient behaviour.',
              'It eliminates the need for public transport entirely.',
              'It guarantees free-flowing traffic at all times of day.',
            ],
            answer: 'It internalises a cost otherwise borne by third parties, encouraging more efficient behaviour.',
            explanation: '"By internalising this externality, congestion pricing schemes theoretically encourage drivers to consider the true social cost of their journey... aligning private incentives more closely with overall economic efficiency."',
          },
        ],
      },
    ],

    listening: [
      {
        number: 3,
        title: 'Section 3: Presentation Planning — Energy Storage',
        transcript:
          "TUTOR: Let's discuss your presentation plan on energy storage technologies. What have you decided so far?\nLIAM: We're going to compare three storage methods: lithium-ion batteries, pumped hydro, and hydrogen storage.\nSOPHIE: I wanted to include flywheel storage too, but Liam thought that would make the presentation too broad.\nTUTOR: I'd agree with Liam there — three case studies is more manageable for a fifteen-minute slot.\nLIAM: Right, and we've agreed I'll cover lithium-ion and hydrogen, while Sophie covers pumped hydro.\nTUTOR: How are you structuring the comparison?\nSOPHIE: We're using four criteria: cost, efficiency, scalability, and environmental impact.\nTUTOR: Good choice. Have you found reliable data sources yet?\nLIAM: We're mostly relying on a report from the International Energy Agency, but Sophie found some conflicting figures in an industry white paper.\nSOPHIE: Yes, the efficiency figures for pumped hydro differ quite a bit between sources, so we need to decide which to trust.\nTUTOR: I'd recommend prioritising the IEA data since it's independently reviewed, but mention the discrepancy briefly as a limitation.\nLIAM: That makes sense, we'll add a short note about that.\nTUTOR: What visual aids are you planning?\nSOPHIE: We thought a bar chart comparing costs, and maybe a diagram showing how pumped hydro works.\nTUTOR: Good idea — diagrams help a lot with the hydro system since it's less intuitive than a battery. Now, when is the presentation due?\nLIAM: It's in two weeks, but we need to submit our slides for approval three days before that.\nTUTOR: Right, so let's schedule a rehearsal the day before you submit the slides, so I can give feedback.\nSOPHIE: That would be really helpful, thank you.",
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            prompt: 'Sophie originally wanted to also include',
            options: ['solar panels.', 'flywheel storage.', 'wind turbines.'],
            answer: 'flywheel storage.',
            explanation: 'I wanted to include flywheel storage too.',
          },
          {
            id: 2,
            type: 'multiple-choice',
            prompt: 'Liam will present on',
            options: ['pumped hydro only.', 'lithium-ion and hydrogen.', 'all three technologies.'],
            answer: 'lithium-ion and hydrogen.',
            explanation: "\"I'll cover lithium-ion and hydrogen, while Sophie covers pumped hydro.\"",
          },
          {
            id: 3,
            type: 'multiple-choice',
            prompt: 'The tutor recommends prioritising data from',
            options: ['the industry white paper.', 'student estimates.', 'the International Energy Agency.'],
            answer: 'the International Energy Agency.',
            explanation: "\"I'd recommend prioritising the IEA data since it's independently reviewed.\"",
          },
          {
            id: 4,
            type: 'multiple-choice',
            prompt: 'Diagrams are considered especially useful for explaining',
            options: ['lithium-ion batteries.', 'pumped hydro.', 'hydrogen storage.'],
            answer: 'pumped hydro.',
            explanation: "\"diagrams help a lot with the hydro system since it's less intuitive than a battery.\"",
          },
          {
            id: 5,
            type: 'multiple-choice',
            prompt: 'The rehearsal will be scheduled',
            options: [
              'the day before slide submission.',
              'the day after slide submission.',
              'on the day of the presentation.',
            ],
            answer: 'the day before slide submission.',
            explanation: "\"let's schedule a rehearsal the day before you submit the slides.\"",
          },
          {
            id: 6,
            type: 'sentence-completion',
            prompt: 'The comparison uses four criteria: cost, efficiency, scalability, and ____.',
            answer: 'environmental impact',
            explanation: '"cost, efficiency, scalability, and environmental impact."',
          },
          {
            id: 7,
            type: 'sentence-completion',
            prompt: 'The main data source is a report from the ____.',
            answer: ['International Energy Agency', 'the International Energy Agency'],
            explanation: '"relying on a report from the International Energy Agency."',
          },
          {
            id: 8,
            type: 'sentence-completion',
            prompt: 'The figures that differ between sources relate to ____ for pumped hydro.',
            answer: 'efficiency',
            explanation: '"the efficiency figures for pumped hydro differ quite a bit between sources."',
          },
          {
            id: 9,
            type: 'sentence-completion',
            prompt: 'The presentation is due in ____ weeks.',
            answer: ['2', 'two'],
            explanation: "\"It's in two weeks.\"",
          },
          {
            id: 10,
            type: 'sentence-completion',
            prompt: 'Slides must be submitted ____ days before the presentation.',
            answer: ['3', 'three'],
            explanation: '"we need to submit our slides for approval three days before that."',
          },
        ],
      },
    ],

    writing: [
      {
        task: 1,
        prompt:
          'The line graph below shows the number of road traffic accidents per 100,000 people in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
        visual:
          'A line graph of road traffic accidents per 100,000 people, 2000–2020: Japan 90 (2000), 75 (2005), 55 (2010), 40 (2015), 30 (2020). Sweden 60 (2000), 55 (2005), 45 (2010), 38 (2015), 32 (2020). India 40 (2000), 55 (2005), 70 (2010), 85 (2015), 95 (2020).',
        modelAnswer:
          "The line graph illustrates changes in the rate of road traffic accidents per 100,000 people in Japan, Sweden, and India between 2000 and 2020.\n\nOverall, Japan and Sweden experienced a consistent decline in accident rates over the period, whereas India showed the opposite trend, with accident rates rising steadily throughout the two decades.\n\nIn 2000, Japan recorded the highest accident rate of the three countries at 90 per 100,000 people, compared with 60 in Sweden and just 40 in India. Over the following fifteen years, however, Japan's rate fell steadily, reaching 40 by 2015, while Sweden's declined more gradually from 60 to 38 over the same period.\n\nIndia's trajectory moved in the opposite direction: its rate rose from 40 in 2000 to 55 by 2005, matching Sweden's figure that year, before overtaking it by 2010 and continuing to climb thereafter. By 2020, India's accident rate had reached 95, the highest of the three countries, while Japan's had fallen to just 30 and Sweden's to 32, the two countries converging at similarly low levels.",
        examinerNotes: [
          "Task Achievement accurately tracks all fifteen data points and identifies the crucial crossover point where India overtakes Sweden around 2005.",
          'Coherence & Cohesion uses clear contrast structuring ("Overall... whereas...", "moved in the opposite direction") to organise the two diverging trends.',
          'Lexical Resource varies vocabulary for trends effectively (fell steadily, declined more gradually, rose, climbing, converging).',
          'Grammatical Range & Accuracy shows accurate use of past simple and past perfect for describing sequential change with no errors.',
        ],
      },
      {
        task: 2,
        prompt:
          'Road traffic accidents are a major cause of death and injury in many countries. What are the main causes of road accidents, and what measures could governments take to reduce them? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
        modelAnswer:
          "Road traffic accidents remain a leading cause of death and serious injury worldwide, despite decades of safety campaigns. This essay will identify the primary causes of such accidents and propose government measures to reduce their frequency.\n\nSeveral factors contribute significantly to road accidents. Driver behaviour is arguably the most important, encompassing speeding, distraction from mobile phones, and driving under the influence of alcohol or drugs, all of which impair reaction time and judgement. Poor road infrastructure, including inadequate lighting, potholes, and insufficient signage, particularly in rapidly developing countries, also plays a substantial role. Additionally, the sheer rise in vehicle ownership in many nations has increased traffic density without corresponding improvements to road capacity, creating conditions ripe for collisions.\n\nGovernments can take several concrete steps to address these causes. Stricter enforcement of existing traffic laws, supported by technologies such as speed cameras and breathalyser checkpoints, would likely deter dangerous driving behaviour more effectively than laws alone. Investment in road infrastructure, including better street lighting, clearer signage, and dedicated lanes for cyclists and pedestrians, would reduce the physical hazards that contribute to accidents, particularly in developing regions. Mandatory driver education programmes, renewed periodically rather than granted permanently after a single test, could also ensure that drivers remain aware of evolving road safety standards throughout their driving lives.\n\nFurthermore, public awareness campaigns highlighting the real consequences of reckless driving, similar to those successfully run in Australia and the UK, have proven effective in shifting social attitudes towards safer driving. Combined with harsher penalties for repeat offenders, these measures create both the incentive and the deterrent needed to change behaviour at scale.\n\nIn conclusion, while driver behaviour, poor infrastructure, and rising traffic density all contribute to road accidents, a combination of stricter law enforcement, infrastructure investment, and sustained public education offers governments the most effective means of reducing road deaths and injuries.",
        examinerNotes: [
          'Task Response identifies multiple, well-explained causes and pairs each with a corresponding, realistic solution, fully satisfying the two-part question.',
          'Coherence & Cohesion is strong, with each cause clearly matched to a solution paragraph and appropriate linking language (Furthermore, Combined with).',
          'Lexical Resource includes precise collocations (traffic density, breathalyser checkpoints, reckless driving).',
          'Grammatical Range & Accuracy demonstrates modal verbs and conditional forms (would likely deter, could also ensure) used with control and accuracy.',
        ],
      },
    ],

    speaking: [
      {
        part: 1,
        title: 'Part 1: Introduction and Interview',
        questions: [
          'Do you enjoy travelling?',
          'What was the last trip you took?',
          'Do you prefer travelling alone or with others?',
          'What kind of places do you like to visit?',
          'Are you usually a punctual person?',
          'Do you think punctuality is important?',
          'How do you manage your time when you have a busy schedule?',
          "Has your attitude toward time changed as you've gotten older?",
        ],
        sampleAnswers: [],
      },
      {
        part: 2,
        title: 'Part 2: Individual Long Turn (Cue Card)',
        questions: [
          'Describe an important decision you made that changed your life. You should say:',
          '• what the decision was',
          '• when you made it',
          '• what factors influenced your decision',
          '• and explain how it changed your life',
          'You will have one minute to prepare and should speak for one to two minutes.',
          'Follow-up: Do you generally make decisions quickly or take a long time to decide?',
        ],
        sampleAnswers: [
          "Probably the most significant decision I've made was choosing to move to another city on my own for university rather than staying close to home, which is what most of my friends ended up doing. I made this decision around four years ago, right after finishing secondary school, and it wasn't an easy one — my family was somewhat apprehensive, and honestly, so was I, given that I'd never lived away from my parents before. What ultimately swayed me was the realisation that the university I wanted to attend simply offered a stronger programme in my chosen field, and I didn't want to compromise on my education purely for the sake of comfort or familiarity. Looking back, it's genuinely difficult to overstate how much that decision reshaped who I am. I had to learn to manage my own finances, cook for myself, and navigate an unfamiliar city entirely independently, all of which forced me to mature far more quickly than I would have otherwise. I also built an entirely new social circle from scratch, which taught me a great deal about adaptability. If I'd stayed close to home, I suspect I'd be a considerably less self-reliant person today. It was daunting at the time, but unquestionably the right call.",
        ],
      },
      {
        part: 3,
        title: 'Part 3: Two-Way Discussion',
        questions: [
          'What factors do people usually consider when making important life decisions?',
          'Do you think people today have too many choices compared to previous generations?',
          'Is it better to make decisions based on logic or intuition?',
          "How does the fear of making the wrong decision affect people's choices?",
          "Do you think society puts too much pressure on young people to decide their future early?",
          "How might advice from others help or hinder good decision-making?",
        ],
        sampleAnswers: [],
      },
    ],
  },

  // ===========================================================================
  // TEST 10 (source: Practice Test 8)
  // ===========================================================================
  {
    id: 'ielts-academic-10',
    title: 'IELTS Practice Test 10',
    module: 'Academic',
    source: 'Generated practice set (verified)',

    reading: [
      {
        number: 1,
        title: 'The Invisible Compass',
        text:
          "Every year, countless species undertake extraordinary migratory journeys, from Arctic terns flying pole to pole to sea turtles returning to the exact beach where they hatched years earlier. For many of these species, visual landmarks alone cannot explain such feats of navigation, particularly for animals crossing open ocean or flying at night over featureless terrain. Increasingly, researchers believe the answer lies in magnetoreception, the ability to sense the Earth's magnetic field and use it as a navigational aid, a sense entirely absent from human perception but apparently widespread across the animal kingdom.\n\nThe Earth's magnetic field varies predictably across the globe, both in its intensity and in the angle at which field lines intersect the ground, known as the angle of inclination. This variation means that, in principle, an animal capable of detecting both properties could determine its approximate position on the planet, functioning much like a built-in global positioning system, without needing any external reference points such as stars or landmarks. Sea turtles provide some of the clearest experimental evidence for this ability. Researchers have shown that hatchling turtles, when exposed in laboratory tanks to magnetic fields replicating those found at different points along their migratory route, will orient their swimming in directions consistent with the field's location, even though the turtles have never actually visited those locations.\n\nExactly how animals detect magnetic fields remains one of the more contested questions in sensory biology, with two leading hypotheses currently under active investigation. The first proposes that certain animals possess tiny crystals of magnetite, a naturally magnetic mineral, embedded within specialised cells, which physically twist or move in response to magnetic fields in a manner that could be detected by the nervous system. Magnetite-based receptors have been identified in the beaks of some birds and the tissues of certain fish, lending support to this hypothesis, although the precise mechanism connecting magnetite movement to a nerve signal remains unclear.\n\nThe second hypothesis, known as the radical pair mechanism, proposes a more exotic, quantum-level explanation. According to this theory, magnetic fields influence the behaviour of certain light-sensitive molecules in the eye, altering the chemical outcome of reactions involving pairs of highly reactive molecules called radicals in a way that depends on the surrounding magnetic field's orientation. This mechanism has gained particular support from studies of migratory birds, whose magnetic sense appears to depend on functioning eyesight and exposure to particular wavelengths of light, a dependency that would be difficult to explain under the magnetite hypothesis alone, since magnetite-based sensing should not require light at all. Some researchers now believe that different species, or even the same species, may use both mechanisms for different navigational purposes, such as one for determining direction and another for determining approximate position.\n\nResearch into magnetoreception faces significant practical obstacles. The organs or cells responsible are often minuscule and difficult to isolate without damaging the very structures under investigation, and the magnetic sense itself can be disrupted by minor experimental interventions, such as anaesthesia or exposure to certain artificial electromagnetic fields, complicating efforts to study it directly and consistently across replications. Some laboratories have also reported difficulty replicating earlier findings, a challenge not unique to this field but one that has fuelled ongoing debate over which experimental protocols most reliably isolate a genuine magnetic response from other sensory cues an animal might otherwise use.\n\nNonetheless, the practical implications of this research extend beyond pure curiosity. Human infrastructure, including power lines and mobile communication towers, generates electromagnetic fields that may interfere with the navigational abilities of migratory species, and some conservationists have raised concerns that expanding human electromagnetic infrastructure could disorient migratory animals in ways not yet fully understood or measured, potentially compounding existing threats to already vulnerable migratory populations. As migratory species already face mounting pressure from habitat loss and climate change, researchers argue that understanding and, where possible, mitigating any additional disruption to magnetoreception should be treated as a meaningful, if still poorly quantified, component of broader conservation strategy.",
        questions: [
          {
            id: 1,
            type: 'true-false-notgiven',
            prompt: 'Humans possess a limited form of magnetoreception similar to that of migratory birds.',
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: '"a sense entirely absent from human perception but apparently widespread across the animal kingdom."',
          },
          {
            id: 2,
            type: 'true-false-notgiven',
            prompt: 'Hatchling sea turtles oriented their swimming consistent with magnetic fields they had never actually experienced in nature.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: 'the turtles have never actually visited those locations.',
          },
          {
            id: 3,
            type: 'true-false-notgiven',
            prompt: 'Magnetite-based receptors have been identified in the beaks of some birds.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"Magnetite-based receptors have been identified in the beaks of some birds and the tissues of certain fish."',
          },
          {
            id: 4,
            type: 'true-false-notgiven',
            prompt: 'Scientists have reached full agreement on exactly how animals detect magnetic fields.',
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: '"remains one of the more contested questions in sensory biology, with two leading hypotheses currently under active investigation."',
          },
          {
            id: 5,
            type: 'true-false-notgiven',
            prompt: 'The radical pair mechanism in birds appears to depend on functioning eyesight.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"whose magnetic sense appears to depend on functioning eyesight and exposure to particular wavelengths of light."',
          },
          {
            id: 6,
            type: 'sentence-completion',
            prompt: "The Earth's magnetic field varies in both intensity and the angle at which field lines meet the ground, called the angle of ____.",
            answer: 'inclination',
            explanation: '"the angle at which field lines intersect the ground, known as the angle of inclination."',
          },
          {
            id: 7,
            type: 'sentence-completion',
            prompt: 'One hypothesis suggests animals detect magnetic fields using tiny crystals of a mineral called ____.',
            answer: 'magnetite',
            explanation: '"tiny crystals of magnetite, a naturally magnetic mineral."',
          },
          {
            id: 8,
            type: 'sentence-completion',
            prompt: 'The radical pair mechanism involves reactions between pairs of highly reactive molecules called ____.',
            answer: 'radicals',
            explanation: '"pairs of highly reactive molecules called radicals."',
          },
          {
            id: 9,
            type: 'sentence-completion',
            prompt: 'Human infrastructure such as power lines and mobile communication towers generates ____ fields that may interfere with animal navigation.',
            answer: 'electromagnetic',
            explanation: '"generates electromagnetic fields that may interfere with the navigational abilities of migratory species."',
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'According to the passage, why can visual landmarks alone not explain many migratory feats?',
            options: [
              'Because animals do not use their eyes during migration.',
              'Because many animals cross open ocean or fly at night over featureless terrain.',
              'Because landmarks change too quickly between migrations.',
              'Because only mammals can perceive visual landmarks.',
            ],
            answer: 'Because many animals cross open ocean or fly at night over featureless terrain.',
            explanation: '"particularly for animals crossing open ocean or flying at night over featureless terrain."',
          },
          {
            id: 11,
            type: 'multiple-choice',
            prompt: 'What distinguishes the radical pair mechanism from the magnetite hypothesis, according to the passage?',
            options: [
              'It does not require any sensory organs at all.',
              'It appears to depend on light exposure, unlike magnetite-based sensing.',
              'It has been completely disproven by recent studies.',
              'It only applies to sea turtles, not birds.',
            ],
            answer: 'It appears to depend on light exposure, unlike magnetite-based sensing.',
            explanation: '"a dependency that would be difficult to explain under the magnetite hypothesis alone, since magnetite-based sensing should not require light at all."',
          },
          {
            id: 12,
            type: 'multiple-choice',
            prompt: 'Why is magnetoreception difficult to study directly, according to the passage?',
            options: [
              'Because no animals are known to possess this sense.',
              'Because the relevant structures are minuscule and the sense can be disrupted by minor interventions.',
              'Because researchers lack any interest in the topic.',
              'Because magnetic fields cannot be measured accurately in laboratories.',
            ],
            answer: 'Because the relevant structures are minuscule and the sense can be disrupted by minor interventions.',
            explanation: '"often minuscule and difficult to isolate... the magnetic sense itself can be disrupted by minor experimental interventions."',
          },
          {
            id: 13,
            type: 'multiple-choice',
            prompt: 'What concern do some conservationists raise about human electromagnetic infrastructure?',
            options: [
              'It has already caused the extinction of several migratory species.',
              'It could disorient migratory animals in ways not yet fully understood.',
              'It has completely replaced natural magnetic fields worldwide.',
              'It only affects animals that rely on the magnetite hypothesis.',
            ],
            answer: 'It could disorient migratory animals in ways not yet fully understood.',
            explanation: '"could disorient migratory animals in ways not yet fully understood or measured."',
          },
        ],
      },
    ],

    listening: [
      {
        number: 4,
        title: 'Section 4: The Biology of Bird Migration',
        transcript:
          "LECTURER: This morning I'll be looking at bird migration — specifically, how and why certain species travel such enormous distances each year.\n\nMigration is generally driven by the need to find food and suitable breeding conditions as seasons change. The Arctic tern is the most extreme example we know of: it travels from its breeding grounds in the Arctic all the way to the Antarctic and back again each year, a round trip of around seventy thousand kilometres — the longest migration of any animal on Earth.\n\nHow do birds navigate across such distances without getting lost? Researchers believe several mechanisms are involved. First, many species can detect the Earth's magnetic field, a sense called magnetoreception, which acts like an internal compass. Second, birds use the position of the sun during the day and the pattern of stars at night to orient themselves. Third, and perhaps most surprisingly, some species appear to use smell — certain seabirds can detect chemical cues in the air that help them recognise coastlines and even specific islands.\n\nTiming is also critical. Birds must depart neither too early nor too late, since arriving at breeding grounds before food sources are available can be just as fatal as arriving too late and missing the nesting season. Many species rely on changes in day length, known as photoperiod, to trigger the hormonal changes that prepare their bodies for the journey — including storing fat reserves that can double a bird's body weight before departure.\n\nUnfortunately, migratory birds now face growing threats. Habitat loss at stopover sites — the resting points along migration routes — is a major concern, as is light pollution from cities, which can disorient birds flying at night and lead them off course. Climate change is also shifting the timing of seasons, creating what researchers call a \"mismatch,\" where birds arrive at breeding grounds out of sync with the peak availability of food.\n\nNext week, we'll look at conservation efforts aimed at protecting key stopover habitats along major flyways.",
        questions: [
          {
            id: 1,
            type: 'note-completion',
            prompt: 'Longest migration: ____ (bird), roughly 70,000 km round trip.',
            answer: 'Arctic tern',
            explanation: '"The Arctic tern is the most extreme example... the longest migration of any animal on Earth."',
          },
          {
            id: 2,
            type: 'note-completion',
            prompt: 'Navigation mechanism 1: sensing the ____ (called magnetoreception).',
            answer: ["Earth's magnetic field", 'the magnetic field'],
            explanation: "\"many species can detect the Earth's magnetic field, a sense called magnetoreception.\"",
          },
          {
            id: 3,
            type: 'note-completion',
            prompt: 'Navigation mechanism 2: using the sun and ____.',
            answer: ['stars at night', 'the pattern of stars at night'],
            explanation: '"birds use the position of the sun during the day and the pattern of stars at night."',
          },
          {
            id: 4,
            type: 'note-completion',
            prompt: 'Navigation mechanism 3: some seabirds use their sense of ____.',
            answer: 'smell',
            explanation: '"some species appear to use smell — certain seabirds can detect chemical cues in the air."',
          },
          {
            id: 5,
            type: 'note-completion',
            prompt: 'Trigger for hormonal changes before migration: change in ____.',
            answer: 'day length',
            explanation: '"Many species rely on changes in day length, known as photoperiod."',
          },
          {
            id: 6,
            type: 'note-completion',
            prompt: "Birds store fat reserves that can ____ their body weight before departure.",
            answer: 'double',
            explanation: "\"storing fat reserves that can double a bird's body weight before departure.\"",
          },
          {
            id: 7,
            type: 'multiple-choice',
            prompt: 'According to the lecture, arriving too early at breeding grounds can be',
            options: [
              'beneficial for finding a mate.',
              'as fatal as arriving too late.',
              'irrelevant to survival.',
            ],
            answer: 'as fatal as arriving too late.',
            explanation: '"arriving at breeding grounds before food sources are available can be just as fatal as arriving too late."',
          },
          {
            id: 8,
            type: 'multiple-choice',
            prompt: '"Stopover sites" refers to',
            options: [
              'breeding grounds only.',
              'resting points along migration routes.',
              'the final destination of migration.',
            ],
            answer: 'resting points along migration routes.',
            explanation: '"Habitat loss at stopover sites — the resting points along migration routes."',
          },
          {
            id: 9,
            type: 'multiple-choice',
            prompt: 'Light pollution affects birds by',
            options: [
              'attracting more food sources.',
              'disorienting them at night.',
              'improving their navigation.',
            ],
            answer: 'disorienting them at night.',
            explanation: '"light pollution from cities, which can disorient birds flying at night."',
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'The "mismatch" mentioned refers to',
            options: [
              'birds arriving out of sync with food availability.',
              'two bird species competing for habitat.',
              'a mismatch in bird colouring.',
            ],
            answer: 'birds arriving out of sync with food availability.',
            explanation: '"a \'mismatch,\' where birds arrive at breeding grounds out of sync with the peak availability of food."',
          },
        ],
      },
    ],

    writing: [
      {
        task: 1,
        prompt:
          'The table below shows average monthly household spending (in US dollars) on four categories in one city in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
        visual:
          'Average monthly household spending (USD) by category, one city: Housing $800 (2010) → $1,400 (2020); Food $400 (2010) → $500 (2020); Transport $250 (2010) → $200 (2020); Entertainment $150 (2010) → $220 (2020).',
        modelAnswer:
          "The table presents average monthly household expenditure across four categories, housing, food, transport, and entertainment, in one city in 2010 and 2020.\n\nOverall, spending increased in most categories over the decade, with housing costs rising most dramatically, while transport was the only category to see a decline.\n\nIn 2010, housing was already the largest area of household expenditure at $800 per month, exactly double the amount spent on food ($400). Transport accounted for $250, while entertainment represented the smallest share of the household budget at just $150.\n\nBy 2020, housing costs had risen sharply to $1,400, a 75% increase and by far the largest change of any category, reflecting significant growth in the cost of living. Food expenditure also rose, though more modestly, from $400 to $500, and entertainment spending grew from $150 to $220. Transport costs, in contrast, were the sole category to fall, decreasing from $250 to $200 over the same period, possibly reflecting reduced commuting costs or improved public transport efficiency.",
        examinerNotes: [
          'Task Achievement accurately reports all eight figures, correctly calculates the notable housing increase, and identifies transport as the only declining category.',
          'Coherence & Cohesion clearly separates 2010 and 2020 into distinct paragraphs with a strong overview and contrastive final sentence.',
          'Lexical Resource shows range in describing change (rose sharply, grew, fell, decreasing) and includes accurate percentage calculation.',
          'Grammatical Range & Accuracy is demonstrated by accurate past perfect and comparative structures, including "the sole category to fall".',
        ],
      },
      {
        task: 2,
        prompt:
          'The cost of housing in major cities has risen dramatically in recent decades, making it increasingly difficult for young people to afford their own homes. What are the causes of this problem, and what solutions can you suggest? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
        modelAnswer:
          "In cities around the world, soaring housing costs have placed home ownership increasingly out of reach for younger generations. This essay will examine the underlying causes of this problem before suggesting several practical solutions.\n\nA primary cause is the persistent imbalance between housing supply and demand. As populations concentrate in major urban centres in search of employment, the number of available homes has failed to keep pace, driving prices upward. This shortage is often compounded by restrictive zoning regulations that limit the construction of higher-density housing, effectively constraining supply even further. A second contributing factor is the growing trend of property investment, whereby individuals and companies purchase homes primarily as financial assets rather than places to live, further inflating prices and reducing availability for genuine occupants. Finally, stagnant wage growth relative to rising property values has widened the gap between young people's earnings and the cost of housing.\n\nSeveral measures could help address this crisis. Governments could relax overly restrictive zoning laws to permit the construction of more apartments and multi-unit dwellings, thereby increasing supply in high-demand areas. Additionally, imposing higher taxes on vacant properties or second homes purchased purely for investment could discourage speculative buying and free up housing stock for actual residents. Providing subsidised low-interest mortgages or shared-ownership schemes specifically for first-time buyers, as several countries have piloted, could also make ownership more attainable for those entering the market. Finally, expanding social and affordable housing programmes would offer a safety net for those unable to compete in an increasingly expensive private market.\n\nIn conclusion, the housing affordability crisis facing young people stems from a combination of supply shortages, speculative investment, and wage stagnation. Addressing it effectively will require coordinated government intervention across zoning reform, taxation, and targeted support for first-time buyers.",
        examinerNotes: [
          'Task Response thoroughly explains multiple distinct causes and matches them with specific, realistic solutions, fully satisfying both parts of the prompt.',
          'Coherence & Cohesion is excellent, with a clear cause-then-solution structure and ordinal signposting (A primary cause, A second contributing factor, Finally).',
          'Lexical Resource includes precise economic vocabulary (speculative buying, housing stock, wage stagnation).',
          'Grammatical Range & Accuracy shows sophisticated structures, including relative clauses and conditional forms, used accurately throughout.',
        ],
      },
    ],

    speaking: [
      {
        part: 1,
        title: 'Part 1: Introduction and Interview',
        questions: [
          'Are you interested in art?',
          'Did you learn any art or craft skills as a child?',
          'Do you ever visit art galleries or exhibitions?',
          'Do you think art education is important for children?',
          'Do you enjoy shopping?',
          'Do you prefer shopping online or in physical stores?',
          'How often do you go shopping for non-essential items?',
          'Has the way you shop changed in recent years?',
        ],
        sampleAnswers: [],
      },
      {
        part: 2,
        title: 'Part 2: Individual Long Turn (Cue Card)',
        questions: [
          'Describe a piece of art or a handmade object that you like. You should say:',
          '• what it is',
          '• where you got it or saw it',
          '• what it looks like',
          '• and explain why you like it',
          'You will have one minute to prepare and should speak for one to two minutes.',
          'Follow-up: Do you think handmade objects are more valuable than mass-produced ones?',
        ],
        sampleAnswers: [
          "A handmade object I'm particularly fond of is a small ceramic vase my grandmother gave me, which she made herself decades ago when she used to attend pottery classes in her local community centre. It's not especially large — roughly the size of a teapot — and it has this slightly uneven, imperfect shape that immediately gives away the fact that it wasn't produced by a machine. The glaze is a deep, earthy blue with faint streaks of brown running through it, almost like the colours bled into one another unpredictably during the firing process. What I love most about it isn't really its aesthetic appeal, though I do find it genuinely beautiful, but rather the story attached to it and the fact that my grandmother's hands physically shaped every curve of it. Every time I look at it sitting on my shelf, I'm reminded of the afternoons I spent watching her work at her pottery wheel when I was a child, utterly transfixed by how a shapeless lump of clay could gradually become something so deliberate. In a world increasingly filled with identical, factory-made objects, there's something quietly precious about owning something so distinctly one-of-a-kind, carrying the imprint of a specific person and a specific moment in time.",
        ],
      },
      {
        part: 3,
        title: 'Part 3: Two-Way Discussion',
        questions: [
          'Why do you think some people are willing to pay more for handmade items?',
          'How has mass production changed the way people value objects?',
          'Do you think art should be funded by governments, or left entirely to the private market?',
          "What role does art play in expressing a nation's culture?",
          "Do you think exposure to art from a young age affects a person's creativity later in life?",
          'How might advances in technology, such as AI-generated art, change how we value human-made art?',
        ],
        sampleAnswers: [],
      },
    ],
  },

  // ===========================================================================
  // TEST 11 (source: Practice Test 9)
  // ===========================================================================
  {
    id: 'ielts-academic-11',
    title: 'IELTS Practice Test 11',
    module: 'Academic',
    source: 'Generated practice set (verified)',

    reading: [
      {
        number: 1,
        title: 'Rethinking Distance in the Modern City',
        text:
          "For much of the twentieth century, urban planning in many industrialised countries was built around the assumption that residents would travel considerable distances by car between separate zones dedicated to housing, work, shopping, and leisure. This zoning philosophy, formalised in planning documents and building codes across numerous cities, produced sprawling metropolitan areas where a resident might need to drive many miles simply to buy groceries or reach a workplace. In recent years, a competing vision known as the \"fifteen-minute city\" has gained considerable traction among urban planners and policymakers, proposing that residents should be able to meet most of their daily needs — work, shopping, healthcare, education, and leisure — within a fifteen-minute walk or bicycle ride of their home.\n\nThe concept was popularised by the Franco-Colombian scientist Carlos Moreno, who argued that concentrating essential services within short distances of residential areas could simultaneously reduce car dependency, lower carbon emissions, and improve residents' quality of life by returning time otherwise spent commuting to other activities. Paris, under Mayor Anne Hidalgo, became one of the most prominent cities to formally adopt fifteen-minute city principles as official policy, incorporating the concept into planning strategies aimed at reducing the dominance of cars within the city and reallocating street space toward cyclists, pedestrians, and green space.\n\nProponents argue that the fifteen-minute city model offers numerous benefits beyond reduced emissions. By encouraging walking and cycling for everyday trips, the model may improve public health outcomes, since regular physical activity integrated into daily routines is generally easier to sustain than dedicated exercise regimens requiring separate time commitments. Local businesses, particularly small shops and services, may also benefit from increased foot traffic if residents shift more of their spending toward nearby establishments rather than travelling to distant shopping centres or ordering online. Additionally, proponents contend that neighbourhoods designed around proximity tend to foster stronger community ties, since residents are more likely to encounter neighbours during everyday walks rather than remaining isolated inside vehicles during commutes.\n\nHowever, the concept has also attracted substantial criticism and, in some cases, significant public controversy. Some critics argue that implementing fifteen-minute city principles in already-built cities is far more difficult than in newly planned developments, since retrofitting decades of car-centric infrastructure and rezoning established neighbourhoods requires substantial investment and can face fierce resistance from residents and businesses accustomed to existing arrangements. Perhaps more strikingly, the concept became entangled in a wave of online misinformation, particularly following traffic scheme proposals in the English city of Oxford, with some commentators falsely characterising fifteen-minute city policies as a plan to restrict residents' freedom of movement or confine people to specific zones, despite planners consistently clarifying that the concept concerns the convenient location of amenities rather than any restriction on travel beyond a neighbourhood.\n\nEconomic geographers have also raised more measured concerns, noting that proximity-based planning could unintentionally increase housing costs in well-served neighbourhoods, as increased desirability of areas with abundant nearby amenities drives up property values and potentially displaces lower-income residents who can no longer afford to live there, a phenomenon sometimes described as amenity-driven gentrification. Addressing this concern, some planners argue that fifteen-minute city principles must be paired with deliberate affordable housing policies to ensure the benefits of proximity are distributed across income levels rather than concentrated among wealthier residents.\n\nDespite the controversies, interest in the fifteen-minute city concept continues to spread, with dozens of cities across Europe, North America, and Asia exploring elements of the approach, whether through pilot schemes, updated zoning codes, or infrastructure investment in walking and cycling networks. Whether the model ultimately proves transformative or remains a partially realised planning ideal will likely depend heavily on how effectively individual cities navigate the practical, political, and economic challenges of retrofitting existing urban environments rather than building anew.",
        questions: [
          {
            id: 1,
            type: 'true-false-notgiven',
            prompt: 'Twentieth-century zoning philosophy in many industrialised countries assumed residents would travel considerable distances between separate zones.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"residents would travel considerable distances by car between separate zones dedicated to housing, work, shopping, and leisure."',
          },
          {
            id: 2,
            type: 'true-false-notgiven',
            prompt: 'Carlos Moreno is credited with popularising the fifteen-minute city concept.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"The concept was popularised by the Franco-Colombian scientist Carlos Moreno."',
          },
          {
            id: 3,
            type: 'true-false-notgiven',
            prompt: 'Paris officially rejected fifteen-minute city principles under Mayor Anne Hidalgo.',
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: 'Paris "became one of the most prominent cities to formally adopt fifteen-minute city principles as official policy."',
          },
          {
            id: 4,
            type: 'true-false-notgiven',
            prompt: "Planners have consistently clarified that the concept does not involve restricting residents' travel beyond their neighbourhood.",
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"despite planners consistently clarifying that the concept concerns the convenient location of amenities rather than any restriction on travel."',
          },
          {
            id: 5,
            type: 'true-false-notgiven',
            prompt: 'Every city that has explored fifteen-minute city principles has fully implemented them.',
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: 'the passage says cities are "exploring elements of the approach, whether through pilot schemes," not that all have fully implemented it.',
          },
          {
            id: 6,
            type: 'summary-completion',
            prompt: 'Critics argue that implementing the fifteen-minute city in already-built areas is difficult because it requires retrofitting car-centric infrastructure and ____ established neighbourhoods.',
            answer: 'rezoning',
            explanation: '"retrofitting decades of car-centric infrastructure and rezoning established neighbourhoods."',
          },
          {
            id: 7,
            type: 'summary-completion',
            prompt: 'The concept became linked to online ____, especially after traffic proposals in Oxford.',
            answer: 'misinformation',
            explanation: '"the concept became entangled in a wave of online misinformation."',
          },
          {
            id: 8,
            type: 'summary-completion',
            prompt: 'Economic geographers warn that proximity-based planning could raise housing costs through a process called amenity-driven ____.',
            answer: 'gentrification',
            explanation: '"a phenomenon sometimes described as amenity-driven gentrification."',
          },
          {
            id: 9,
            type: 'summary-completion',
            prompt: 'Some planners argue this must be addressed by pairing the concept with deliberate affordable ____ policies.',
            answer: 'housing',
            explanation: '"deliberate affordable housing policies."',
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'According to the passage, why might the fifteen-minute city model improve public health?',
            options: [
              'It requires residents to join gyms near their homes.',
              'It integrates regular physical activity into daily routines through walking and cycling.',
              'It eliminates the need for healthcare services within neighbourhoods.',
              'It reduces the number of hospitals needed in a city.',
            ],
            answer: 'It integrates regular physical activity into daily routines through walking and cycling.',
            explanation: '"regular physical activity integrated into daily routines is generally easier to sustain."',
          },
          {
            id: 11,
            type: 'multiple-choice',
            prompt: 'What benefit do proponents claim for local businesses under the fifteen-minute city model?',
            options: [
              'They may benefit from increased foot traffic as residents shop nearby.',
              'They will no longer face competition from online retailers.',
              'They will receive direct government subsidies.',
              'They will be required to relocate closer to residential areas.',
            ],
            answer: 'They may benefit from increased foot traffic as residents shop nearby.',
            explanation: '"may also benefit from increased foot traffic if residents shift more of their spending toward nearby establishments."',
          },
          {
            id: 12,
            type: 'multiple-choice',
            prompt: 'What is the main concern raised by economic geographers regarding the model?',
            options: [
              'It will eliminate all local businesses.',
              'It could increase housing costs and displace lower-income residents.',
              'It requires abandoning existing public transport systems.',
              'It will reduce the number of walking and cycling paths.',
            ],
            answer: 'It could increase housing costs and displace lower-income residents.',
            explanation: '"proximity-based planning could unintentionally increase housing costs... potentially displaces lower-income residents."',
          },
          {
            id: 13,
            type: 'multiple-choice',
            prompt: 'What does the passage suggest will determine whether the fifteen-minute city model ultimately succeeds?',
            options: [
              'Whether cities can build entirely new urban areas from scratch.',
              'How effectively cities navigate the challenges of retrofitting existing environments.',
              'Whether online misinformation about the concept increases further.',
              'Whether Carlos Moreno continues to promote the idea publicly.',
            ],
            answer: 'How effectively cities navigate the challenges of retrofitting existing environments.',
            explanation: '"will likely depend heavily on how effectively individual cities navigate the practical, political, and economic challenges of retrofitting existing urban environments."',
          },
        ],
      },
    ],

    listening: [
      {
        number: 1,
        title: 'Section 1: Booking a Broadband Installation',
        transcript:
          "CUSTOMER SERVICE: Thanks for calling BrightLink Broadband, my name's Tom, how can I help?\nCUSTOMER: Hi, I signed up online for the fibre package, and I need to book an installation.\nTOM: Sure, can I take your order reference number?\nCUSTOMER: Yes, it's B-R-eight-two-nine-four.\nTOM: Thanks. And can I confirm the installation address?\nCUSTOMER: It's 14 Aldergrove Road.\nTOM: Great, and what's the postcode?\nCUSTOMER: N-W-three, four-J-J.\nTOM: Perfect. Now, we have some availability next week. Would mornings or afternoons suit you better?\nCUSTOMER: Afternoons are better for me, I work mornings.\nTOM: Okay, we have Wednesday the ninth in the afternoon, or Friday the eleventh in the afternoon.\nCUSTOMER: I'll go with the Friday, please.\nTOM: Great, the engineer will arrive between one and four p.m. You'll get a text reminder the day before.\nCUSTOMER: That's fine. Do I need to be in the whole time?\nTOM: Yes, someone over eighteen must be present for the full appointment window.\nCUSTOMER: No problem, I'll take the afternoon off.\nTOM: Also, the engineer will need access to your telephone master socket — do you know where that is?\nCUSTOMER: I think it's in the hallway.\nTOM: Great, that's usually straightforward then. Lastly, is there anything blocking access to the property, like a locked gate?\nCUSTOMER: No, it's a normal front door, no gate.\nTOM: Perfect, I've booked that in. You'll receive a confirmation email within the hour.",
        questions: [
          {
            id: 1,
            type: 'note-completion',
            prompt: 'Order reference: ____',
            answer: ['BR8294', 'BR-8294'],
            explanation: "\"it's B-R-eight-two-nine-four.\"",
          },
          {
            id: 2,
            type: 'note-completion',
            prompt: 'Installation address: 14 ____ Road',
            answer: 'Aldergrove',
            explanation: "\"It's 14 Aldergrove Road.\"",
          },
          {
            id: 3,
            type: 'note-completion',
            prompt: 'Postcode: ____',
            answer: ['NW3 4JJ', 'NW34JJ'],
            explanation: '"N-W-three, four-J-J."',
          },
          {
            id: 4,
            type: 'note-completion',
            prompt: 'Preferred time of day: ____',
            answer: 'afternoons',
            explanation: "\"Afternoons are better for me, I work mornings.\"",
          },
          {
            id: 5,
            type: 'note-completion',
            prompt: 'Installation date: Friday the ____',
            answer: 'eleventh',
            explanation: "\"Friday the eleventh in the afternoon... I'll go with the Friday.\"",
          },
          {
            id: 6,
            type: 'note-completion',
            prompt: 'Appointment window: between 1 p.m. and ____ p.m.',
            answer: ['4', 'four'],
            explanation: '"the engineer will arrive between one and four p.m."',
          },
          {
            id: 7,
            type: 'note-completion',
            prompt: 'Master socket location: ____',
            answer: 'hallway',
            explanation: '"I think it\'s in the hallway."',
          },
          {
            id: 8,
            type: 'multiple-choice',
            prompt: 'During the appointment, the customer must ensure',
            options: [
              'no one needs to be home.',
              'someone over eighteen is present the whole time.',
              'a child can supervise the engineer.',
            ],
            answer: 'someone over eighteen is present the whole time.',
            explanation: '"someone over eighteen must be present for the full appointment window."',
          },
          {
            id: 9,
            type: 'multiple-choice',
            prompt: 'How will the customer be reminded of the appointment?',
            options: ['by phone call', 'by text message', 'by email only'],
            answer: 'by text message',
            explanation: "\"You'll get a text reminder the day before.\"",
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'Access to the property is',
            options: [
              'blocked by a locked gate.',
              'via a normal front door, no obstruction.',
              'only possible through a rear entrance.',
            ],
            answer: 'via a normal front door, no obstruction.',
            explanation: "\"No, it's a normal front door, no gate.\"",
          },
        ],
      },
    ],

    writing: [
      {
        task: 1,
        prompt:
          'The chart below shows the percentage of adults who reported regularly exercising, broken down by age group, in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
        visual:
          'Percentage of adults exercising regularly, by age group: 18–29: 45% (2000) → 38% (2020); 30–44: 40% (2000) → 35% (2020); 45–59: 30% (2000) → 33% (2020); 60+: 20% (2000) → 42% (2020).',
        modelAnswer:
          "The chart compares the proportion of adults who reported exercising regularly across four age groups in 2000 and 2020.\n\nOverall, exercise participation declined among younger adults over the period, whereas it increased notably among older age groups, most strikingly among those aged 60 and over.\n\nIn 2000, exercise rates were highest among the youngest adults: 45% of those aged 18–29 exercised regularly, compared with 40% of those aged 30–44. Participation was lower among older groups, at 30% for the 45–59 age bracket and just 20% for those aged 60 and above, the lowest figure recorded in either year.\n\nBy 2020, this pattern had shifted considerably. Regular exercise among 18–29 year olds had fallen to 38%, and the 30–44 age group also declined slightly, to 35%. In contrast, the 45–59 group rose marginally to 33%, while the most dramatic change occurred among those aged 60 and over, whose participation rate more than doubled to 42%, making it the highest figure of any age group in 2020, ahead of the 18–29 group's 38%.",
        examinerNotes: [
          'Task Achievement accurately reports all eight percentages and correctly identifies the striking reversal in the 60+ age group.',
          'Coherence & Cohesion is supported by clear year-based paragraphing and a precise overview sentence highlighting the two opposing trends.',
          'Lexical Resource shows a good range of comparative and change vocabulary (declined, increased notably, fallen, rose marginally, more than doubled).',
          'Grammatical Range & Accuracy includes accurate past perfect tense and superlative forms ("the lowest figure recorded", "the highest figure of any age group").',
        ],
      },
      {
        task: 2,
        prompt:
          'In many countries, older people are becoming more active and health-conscious, while younger generations appear to be exercising less than in the past. Why do you think this is happening, and what can be done to encourage healthier lifestyles among young people? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
        modelAnswer:
          "An intriguing generational shift has emerged in recent years, with older adults increasingly embracing exercise while many younger people appear less physically active than their predecessors. This essay will explore the reasons behind this trend and suggest ways to encourage healthier habits among the young.\n\nSeveral factors likely explain this divergence. Older generations, having witnessed the health consequences of sedentary retirement among their own parents, may be more motivated to remain active in order to preserve independence and mobility in later life. Additionally, many retirees now have more leisure time and disposable income to dedicate to structured exercise, such as gym memberships or walking groups. Younger people, by contrast, face mounting academic and professional pressures, alongside the pervasive lure of screen-based entertainment, from social media to video streaming, which consumes hours that might otherwise be spent on physical activity. Urban lifestyles, often centred on desk-based work and long commutes, further limit opportunities for incidental exercise.\n\nTo reverse this trend, several interventions could prove effective. Schools could integrate more enjoyable, less competitive forms of physical activity into the curriculum, moving away from traditional team sports that discourage less athletic students. Employers, similarly, could offer incentives such as subsidised gym memberships or on-site fitness facilities to encourage exercise during working hours. Urban planners could also contribute by designing cities with more cycling paths and pedestrian-friendly spaces, making active transport a convenient default rather than a deliberate effort. Finally, public health campaigns specifically targeting young adults, using social media platforms they already frequent, could help reframe exercise as an enjoyable and social activity rather than an obligation.\n\nIn conclusion, the decline in exercise among young people likely stems from competing pressures and sedentary digital habits, contrasted with older generations' greater time and motivation to stay active. Coordinated efforts from schools, employers, and urban planners could help reverse this imbalance.",
        examinerNotes: [
          'Task Response addresses both the causal question and the solution-oriented question with well-developed, plausible reasoning specific to each generation.',
          'Coherence & Cohesion flows logically from cause to solution with clear paragraph themes and connectors (Additionally, Similarly, Finally).',
          'Lexical Resource includes natural collocations (incidental exercise, sedentary retirement, active transport).',
          'Grammatical Range & Accuracy demonstrates hedging modals (may be, could prove effective) and complex sentence structures used accurately.',
        ],
      },
    ],

    speaking: [
      {
        part: 1,
        title: 'Part 1: Introduction and Interview',
        questions: [
          'What forms of public transport are available where you live?',
          'Do you use public transport often?',
          'What do you like or dislike about public transport in your city?',
          'Do you think public transport will improve in the future?',
          'Are you generally a patient person?',
          'What kinds of situations test your patience the most?',
          'How do you usually pass the time when you have to wait somewhere?',
          'Do you think people today are less patient than in the past?',
        ],
        sampleAnswers: [],
      },
      {
        part: 2,
        title: 'Part 2: Individual Long Turn (Cue Card)',
        questions: [
          'Describe a time you had to wait for something important. You should say:',
          '• what you were waiting for',
          '• how long you had to wait',
          '• how you felt while waiting',
          '• and explain what happened in the end',
          'You will have one minute to prepare and should speak for one to two minutes.',
          'Follow-up: Do you find it harder to wait for good news or bad news?',
        ],
        sampleAnswers: [
          "A particularly memorable instance of having to wait for something important was when I was anticipating the results of a university scholarship application, which took nearly three months to be announced. I'd applied for a fairly competitive scholarship that would have covered a significant portion of my tuition fees, and given how much it would have eased the financial burden on my family, the waiting period felt almost unbearably drawn out. For the first few weeks, I checked my email obsessively, sometimes multiple times an hour, before eventually forcing myself to stop, since it was clearly doing nothing but heightening my anxiety. To distract myself, I threw myself into part-time work and started exercising more regularly, which genuinely helped take my mind off the uncertainty. As the announcement date drew closer, though, the nervousness crept back in, and I distinctly remember barely sleeping the night before the results were due. When the email finally arrived confirming that I'd been awarded the scholarship, the relief was overwhelming — I actually had to read it three times before it sank in properly. Looking back, that period taught me a valuable lesson about managing anxiety productively rather than simply being consumed by it.",
        ],
      },
      {
        part: 3,
        title: 'Part 3: Two-Way Discussion',
        questions: [
          'Why do you think modern society values speed and instant results so highly?',
          'Has technology made people less patient in general?',
          'Are there any benefits to having to wait for things?',
          'Do you think patience is a skill that can be taught, or is it purely a personality trait?',
          "How does the ability to delay gratification affect a person's long-term success?",
          'Do you think future generations will find it even harder to be patient than we do today?',
        ],
        sampleAnswers: [],
      },
    ],
  },

  // ===========================================================================
  // TEST 12 (source: Practice Test 10)
  // ===========================================================================
  {
    id: 'ielts-academic-12',
    title: 'IELTS Practice Test 12',
    module: 'Academic',
    source: 'Generated practice set (verified)',

    reading: [
      {
        number: 1,
        title: 'When a Language Falls Silent',
        text:
          "Linguists estimate that of the roughly 7,000 languages currently spoken worldwide, a substantial proportion — by some estimates, close to half — are at risk of falling out of use within the coming century. A language is generally considered endangered when children in the community stop learning it as a first language, since a language's survival ultimately depends on transmission to new generations rather than merely its use among existing adult speakers. Once intergenerational transmission breaks down, even a language spoken fluently by thousands of older adults can be effectively doomed within a few generations, as speaker numbers inevitably decline through natural mortality without replacement.\n\nLanguage endangerment rarely results from a single cause; rather, it typically emerges from a combination of political, economic, and social pressures. Historically, many governments pursued explicit policies discouraging or outright banning minority and indigenous languages in schools, viewing linguistic uniformity as a tool for national cohesion. Even without explicit prohibition, economic pressures often push speakers of minority languages to adopt dominant languages associated with better employment prospects, higher social status, or broader communication networks, particularly as urbanisation draws rural populations, often the last strongholds of minority languages, into cities where dominant languages predominate.\n\nThe consequences of language loss extend well beyond communication itself. Linguists argue that each language encodes a distinct way of categorising the world, including unique grammatical structures, vocabulary reflecting local ecological knowledge, and oral traditions such as songs, stories, and proverbs that may not translate meaningfully into other languages. When a language disappears, this accumulated cultural and cognitive knowledge is often lost as well, not merely a set of words but frequently generations of accumulated environmental knowledge, since many indigenous languages contain highly specific vocabulary for local plants, animals, and ecological relationships that outside researchers might otherwise never document.\n\nIn response to widespread concern about language loss, revitalisation efforts have emerged across the globe, employing a range of strategies with varying degrees of success. One particularly influential approach, the language nest model, originated in New Zealand in the 1980s as part of efforts to revive the Māori language, immersing young children in early childhood settings staffed entirely by fluent speakers, on the theory that young children can acquire a language most naturally through constant immersion rather than formal instruction. The model has since been adapted for numerous other endangered languages worldwide, including Hawaiian and several indigenous languages in North America, generally with encouraging though variable results depending on the availability of fluent elder speakers to staff such programmes.\n\nAnother notable approach involves documentation projects that aim to create thorough records of endangered languages, including dictionaries, grammars, and extensive recordings of fluent speakers, before a language's last speakers pass away. While documentation alone cannot revive a language as a living, spoken means of everyday communication, linguists argue it preserves crucial information that could support future revitalisation efforts, even generations after a language has ceased to be spoken as anyone's first language, as demonstrated by successful, though rare, cases of linguistic revival from purely documented sources.\n\nCritics of revitalisation efforts sometimes question whether resources devoted to reviving languages with very few remaining speakers might be better directed elsewhere, particularly when a community itself shows limited interest in revival. Advocates respond that language loss is rarely a matter of pure community indifference but rather often reflects the cumulative effect of historical suppression and ongoing economic pressure, and that renewed community interest in revitalisation frequently emerges once practical barriers, such as funding, access to fluent teachers, and institutional support, are meaningfully addressed rather than left for communities to overcome entirely on their own. Ultimately, most linguists agree that no single strategy suits every endangered language, and that successful revitalisation efforts tend to combine documentation, immersive education, and sustained community leadership rather than relying on outside intervention alone.",
        questions: [
          {
            id: 1,
            type: 'true-false-notgiven',
            prompt: 'A language is generally considered endangered once its total number of adult speakers falls below one thousand.',
            options: ['True', 'False', 'Not Given'],
            answer: 'Not Given',
            explanation: 'the passage defines endangerment by loss of intergenerational transmission, not a specific numeric threshold of adult speakers.',
          },
          {
            id: 2,
            type: 'true-false-notgiven',
            prompt: 'Urbanisation can contribute to language endangerment by drawing rural populations into cities dominated by other languages.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"urbanisation draws rural populations, often the last strongholds of minority languages, into cities where dominant languages predominate."',
          },
          {
            id: 3,
            type: 'true-false-notgiven',
            prompt: 'The language nest model originated in New Zealand as part of efforts to revive the Māori language.',
            options: ['True', 'False', 'Not Given'],
            answer: 'True',
            explanation: '"originated in New Zealand in the 1980s as part of efforts to revive the Māori language."',
          },
          {
            id: 4,
            type: 'true-false-notgiven',
            prompt: 'Documentation alone can fully revive a language as a living, everyday spoken language.',
            options: ['True', 'False', 'Not Given'],
            answer: 'False',
            explanation: '"documentation alone cannot revive a language as a living, spoken means of everyday communication."',
          },
          {
            id: 5,
            type: 'sentence-completion',
            prompt: 'A language is generally considered endangered when children stop learning it as a ____.',
            answer: 'first language',
            explanation: '"children in the community stop learning it as a first language."',
          },
          {
            id: 6,
            type: 'sentence-completion',
            prompt: 'Many indigenous languages contain specific vocabulary reflecting local ____ knowledge.',
            answer: 'ecological',
            explanation: '"vocabulary reflecting local ecological knowledge."',
          },
          {
            id: 7,
            type: 'sentence-completion',
            prompt: 'The language nest model immerses young children in settings staffed entirely by ____ speakers.',
            answer: 'fluent',
            explanation: '"staffed entirely by fluent speakers."',
          },
          {
            id: 8,
            type: 'sentence-completion',
            prompt: "Documentation projects create dictionaries, grammars, and recordings before a language's ____ pass away.",
            answer: 'last speakers',
            explanation: "\"before a language's last speakers pass away.\"",
          },
          {
            id: 9,
            type: 'multiple-choice',
            prompt: "According to the passage, what ultimately determines a language's long-term survival?",
            options: [
              'The number of fluent adult speakers currently alive.',
              'Whether it is transmitted to new generations as a first language.',
              'Whether it has a written alphabet.',
              'Whether it is spoken in an urban or rural setting.',
            ],
            answer: 'Whether it is transmitted to new generations as a first language.',
            explanation: "\"a language's survival ultimately depends on transmission to new generations rather than merely its use among existing adult speakers.\"",
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'What does the passage identify as one historical cause of language endangerment?',
            options: [
              'Governments explicitly discouraging or banning minority languages in schools.',
              'A worldwide shortage of language teachers.',
              'Natural disasters destroying entire speaker communities.',
              'The invention of digital communication technology.',
            ],
            answer: 'Governments explicitly discouraging or banning minority languages in schools.',
            explanation: '"many governments pursued explicit policies discouraging or outright banning minority and indigenous languages in schools."',
          },
          {
            id: 11,
            type: 'multiple-choice',
            prompt: 'According to the passage, why do linguists consider language loss significant beyond communication itself?',
            options: [
              'Because it prevents international trade between nations.',
              'Because it often results in the loss of unique cultural knowledge and oral traditions.',
              'Because it eliminates the need for translation services.',
              'Because it only affects grammar, not vocabulary.',
            ],
            answer: 'Because it often results in the loss of unique cultural knowledge and oral traditions.',
            explanation: 'each language encodes a distinct way of categorising the world... this accumulated cultural and cognitive knowledge is often lost as well.',
          },
          {
            id: 12,
            type: 'multiple-choice',
            prompt: 'How do advocates typically respond to critics who question the value of revitalisation efforts?',
            options: [
              'They agree that revitalisation is rarely worthwhile.',
              'They argue that apparent community indifference often reflects historical suppression and ongoing pressure, and interest often grows once barriers are addressed.',
              'They claim that all endangered languages will inevitably disappear regardless of effort.',
              'They argue that documentation projects should be abandoned entirely.',
            ],
            answer: 'They argue that apparent community indifference often reflects historical suppression and ongoing pressure, and interest often grows once barriers are addressed.',
            explanation: 'language loss is rarely a matter of pure community indifference but rather often reflects the cumulative effect of historical suppression and ongoing economic pressure, and renewed community interest frequently emerges once practical barriers are meaningfully addressed.',
          },
          {
            id: 13,
            type: 'multiple-choice',
            prompt: "What does the passage suggest about the language nest model's success across different communities?",
            options: [
              'It has failed in every community where it has been attempted.',
              'Its results are generally encouraging but vary depending on the availability of fluent elder speakers.',
              'It works only for the Māori language and cannot be adapted elsewhere.',
              'It requires no fluent speakers at all to be effective.',
            ],
            answer: 'Its results are generally encouraging but vary depending on the availability of fluent elder speakers.',
            explanation: 'generally with encouraging though variable results depending on the availability of fluent elder speakers to staff such programmes.',
          },
        ],
      },
    ],

    listening: [
      {
        number: 2,
        title: 'Section 2: Museum Volunteer Orientation',
        transcript:
          "VOLUNTEER COORDINATOR: Welcome, everyone, to your first day as volunteers here at Hartley City Museum. I'll run through some key information before we start your training.\n\nFirst, the museum has three volunteer roles you can be assigned to. There's the Front Desk role, greeting visitors and handling ticket enquiries. There's the Gallery Guide role, where you'll walk visitors through exhibits and answer questions. And there's the Collections Support role, which is behind the scenes, helping catalogue and preserve items — that one does require a short additional training course.\n\nYou'll each be given a uniform: a navy polo shirt with the museum logo, and a name badge, which you must wear at all times while on shift. Please note the badge is different from your visitor pass — the visitor pass just gets you into staff areas, whereas the badge identifies you to the public.\n\nIn terms of scheduling, shifts are typically four hours long, and we ask for a minimum commitment of one shift per week for at least three months. You'll book your shifts through our online rota system, not by contacting me directly, as I don't manage the calendar day-to-day.\n\nFor breaks, anyone doing a four-hour shift gets one fifteen-minute break, which can be taken in the volunteer lounge on the second floor — not the staff canteen, which is reserved for paid employees.\n\nA quick note on the Gallery Guide role — before you can guide independently, you'll need to shadow an experienced guide for two full sessions. Only after that will you be added to the solo rota.\n\nFinally, if you ever need to cancel a shift, please give at least forty-eight hours' notice through the rota system so we can arrange cover. Right, let's move on to your induction paperwork.",
        questions: [
          {
            id: 1,
            type: 'note-completion',
            prompt: 'Role requiring extra training: ____ Support',
            answer: 'Collections',
            explanation: '"the Collections Support role... does require a short additional training course."',
          },
          {
            id: 2,
            type: 'note-completion',
            prompt: 'Uniform top: navy ____',
            answer: 'polo shirt',
            explanation: '"a navy polo shirt with the museum logo."',
          },
          {
            id: 3,
            type: 'note-completion',
            prompt: 'Break location: the volunteer ____ (second floor)',
            answer: 'lounge',
            explanation: '"taken in the volunteer lounge on the second floor."',
          },
          {
            id: 4,
            type: 'note-completion',
            prompt: 'Shifts booked via: the online ____ system',
            answer: 'rota',
            explanation: '"book your shifts through our online rota system."',
          },
          {
            id: 5,
            type: 'note-completion',
            prompt: 'Notice needed to cancel a shift: ____ hours',
            answer: ['48', 'forty-eight'],
            explanation: '"please give at least forty-eight hours\' notice."',
          },
          {
            id: 6,
            type: 'short-answer',
            prompt: 'What must volunteers wear at all times on shift?',
            answer: 'the name badge',
            explanation: '"a name badge, which you must wear at all times while on shift."',
          },
          {
            id: 7,
            type: 'short-answer',
            prompt: 'What is the minimum length of volunteering commitment?',
            answer: 'three months',
            explanation: '"a minimum commitment of one shift per week for at least three months."',
          },
          {
            id: 8,
            type: 'short-answer',
            prompt: 'How many sessions must a new Gallery Guide shadow before working solo?',
            answer: ['two', '2'],
            explanation: '"you\'ll need to shadow an experienced guide for two full sessions."',
          },
          {
            id: 9,
            type: 'multiple-choice',
            prompt: 'The badge differs from the visitor pass because',
            options: [
              'the badge gets volunteers into staff areas.',
              'the visitor pass identifies volunteers to the public.',
              'the badge identifies volunteers to the public, unlike the visitor pass.',
            ],
            answer: 'the badge identifies volunteers to the public, unlike the visitor pass.',
            explanation: '"the visitor pass just gets you into staff areas, whereas the badge identifies you to the public."',
          },
          {
            id: 10,
            type: 'multiple-choice',
            prompt: 'Breaks for a four-hour shift are taken in',
            options: ['the staff canteen.', 'the volunteer lounge.', 'the front desk area.'],
            answer: 'the volunteer lounge.',
            explanation: '"taken in the volunteer lounge on the second floor — not the staff canteen."',
          },
        ],
      },
    ],

    writing: [
      {
        task: 1,
        prompt:
          'The table below shows the percentage of total energy consumption from renewable sources in five countries in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
        visual:
          'Renewable energy share of total energy consumption, 2023: Norway 71%; Sweden 52%; Germany 20%; USA 13%; Saudi Arabia 1%.',
        modelAnswer:
          "The table shows the percentage of total energy consumption derived from renewable sources across five countries in 2023.\n\nOverall, there was substantial variation between the countries, with the two Scandinavian nations, Norway and Sweden, relying far more heavily on renewable energy than the other three countries, while Saudi Arabia showed almost no reliance on renewables at all.\n\nNorway recorded by far the highest share of renewable energy consumption, at 71%, meaning that renewables provided the majority of the country's total energy use. Sweden followed with the second-highest figure, at 52%, also indicating that more than half of its energy came from renewable sources.\n\nBy contrast, the remaining three countries relied predominantly on non-renewable energy. Germany derived just 20% of its energy from renewables, less than a third of Norway's proportion, while the USA's figure was lower still, at 13%. Saudi Arabia recorded the lowest share by a considerable margin, at just 1%, indicating an almost total dependence on non-renewable, likely fossil fuel, energy sources.",
        examinerNotes: [
          "Task Achievement accurately reports all five figures and draws valid, data-supported comparisons (Norway's majority reliance, Saudi Arabia's near-total absence of renewables) without inventing any statistics.",
          'Coherence & Cohesion groups countries logically into high-renewable and low-renewable clusters with a clear contrastive link ("By contrast").',
          'Lexical Resource shows precise, varied phrasing (by far the highest, roughly a third of, by a considerable margin).',
          'Grammatical Range & Accuracy includes accurate superlative and comparative structures with correctly calculated proportional language.',
        ],
      },
      {
        task: 2,
        prompt:
          'Some countries generate a much higher proportion of their energy from renewable sources than others. Why do you think this variation exists, and what can be done to encourage greater use of renewable energy worldwide? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
        modelAnswer:
          "The proportion of energy generated from renewable sources varies enormously between countries, from nations approaching total reliance on renewables to others still almost entirely dependent on fossil fuels. This essay will examine the reasons for this disparity and propose measures to encourage wider renewable energy adoption globally.\n\nGeography and natural resource endowment play a decisive role in explaining this variation. Countries such as Norway benefit from abundant hydroelectric potential owing to their mountainous terrain and high rainfall, making renewable energy naturally abundant and economically attractive. Conversely, nations with vast oil and gas reserves, such as Saudi Arabia, have historically had little economic incentive to diversify into renewables, given the profitability and established infrastructure of their existing fossil fuel industries. Economic development also matters: wealthier countries can more readily afford the substantial upfront investment required for wind farms, solar installations, and modernised electricity grids, whereas developing nations often prioritise cheaper, immediately available energy sources to support economic growth.\n\nTo narrow this gap, several measures could be pursued. International financial institutions could offer low-interest loans or grants specifically earmarked for renewable infrastructure in developing countries, lowering the barrier to initial investment. Technology transfer agreements between countries with advanced renewable capabilities and those without could accelerate adoption without requiring costly independent research. Additionally, global carbon pricing mechanisms would make fossil fuels comparatively less attractive, incentivising both governments and private companies to invest in cleaner alternatives. Finally, international cooperation through agreements such as the Paris Accord could establish binding, monitored targets that hold all nations accountable for progress, regardless of their current starting point.\n\nIn conclusion, differences in renewable energy usage largely reflect geography, natural resources, and economic capacity, but through financial support, technology sharing, and binding international agreements, the gap between high- and low-renewable countries could be meaningfully narrowed over time.",
        examinerNotes: [
          'Task Response explains the disparity through multiple well-developed causes (geography, resource endowment, economic capacity) and offers concrete, internationally-scoped solutions.',
          'Coherence & Cohesion moves clearly from cause to solution, with ordinal-style signposting (Additionally, Finally) and a strong concluding synthesis.',
          'Lexical Resource includes precise vocabulary (hydroelectric potential, carbon pricing mechanisms, resource endowment).',
          'Grammatical Range & Accuracy shows accurate conditional and modal structures (would make, could establish) used with control throughout.',
        ],
      },
    ],

    speaking: [
      {
        part: 1,
        title: 'Part 1: Introduction and Interview',
        questions: [
          'Do you consider yourself environmentally conscious?',
          'What environmental problems concern you most?',
          'Do you do anything in your daily life to protect the environment?',
          'Do you think individuals or governments bear more responsibility for the environment?',
          'What do you usually do on weekends?',
          'Do you prefer spending weekends actively or relaxing at home?',
          'Has the way you spend weekends changed since you were younger?',
          'Do you think weekends are long enough?',
        ],
        sampleAnswers: [],
      },
      {
        part: 2,
        title: 'Part 2: Individual Long Turn (Cue Card)',
        questions: [
          'Describe a change you would like to make to improve your neighbourhood. You should say:',
          '• what change you would like to make',
          '• why this change is needed',
          '• how it could be achieved',
          '• and explain how it would benefit the community',
          'You will have one minute to prepare and should speak for one to two minutes.',
          'Follow-up: Do you think ordinary residents can actually influence changes like this?',
        ],
        sampleAnswers: [
          "If I could change one thing about my neighbourhood, it would be to introduce more green spaces, since the area I live in is fairly densely built up with very few parks or trees to speak of. This matters to me because I genuinely believe access to nature, even in small doses, has a meaningful impact on people's mental wellbeing, and currently residents have to travel quite a distance just to find somewhere pleasant to walk or relax outdoors. I think this change could realistically be achieved by converting a few of the underused plots of land scattered around the neighbourhood — there's an abandoned lot near my building, for instance, that's essentially just been left to gather rubbish for years — into small community gardens or pocket parks. It wouldn't require enormous investment, just a willingness from the local council to prioritise it and perhaps some initial community fundraising to get things started. If this were implemented, I think it would benefit the community enormously: elderly residents would have somewhere pleasant to sit outdoors, children would have safe spaces to play, and it would likely encourage neighbours to interact more, fostering a stronger sense of community overall. Frankly, it seems like a fairly achievable improvement with a disproportionately large payoff.",
        ],
      },
      {
        part: 3,
        title: 'Part 3: Two-Way Discussion',
        questions: [
          'What are the biggest challenges facing urban neighbourhoods today?',
          'Should residents have more say in decisions about their local area?',
          "How does the quality of a neighbourhood affect people's overall wellbeing?",
          'Do you think community spirit is declining in modern cities?',
          'What responsibility do local governments have toward improving public infrastructure?',
          'How might neighbourhoods need to adapt to accommodate future population growth?',
        ],
        sampleAnswers: [],
      },
    ],
  },
];
