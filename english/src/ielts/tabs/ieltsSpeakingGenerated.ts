// =============================================================================
// IELTS Speaking — full practice tests (Part 1 interview · Part 2 cue card ·
// Part 3 discussion).
// -----------------------------------------------------------------------------
// Authored in the NotebookLM workflow, then verified: every test bundles one
// Part 1, one Part 2 and one Part 3 in exam order, model answers checked for
// Band 8-9 quality and natural register (a Mongolian learner's voice). Crucially,
// the SIX Part-1 topics, the SIX cue cards and the SIX Part-3 discussions are all
// distinct — the previous flat list repeated "hometown" in two Part 1s, which is
// fixed here. Folded into ./IeltsSpeakingTab.tsx, which steps the learner through
// Part 1 → 2 → 3 of whichever test card they open.
// =============================================================================
import type { SpeakingPrompt, SpeakingTest } from './IeltsSpeakingTab';

// Shorthand so each test reads as Part 1 → 2 → 3 below.
const p = (x: SpeakingPrompt): SpeakingPrompt => x;

export const IELTS_SPEAKING_TESTS: SpeakingTest[] = [
  // --- Test 1 — Hometown, skills & learning -------------------------------
  {
    id: 'st-1',
    title: 'Hometown & learning a new skill',
    parts: [
      p({
        id: 's1p1',
        part: 1,
        label: 'Part 1',
        title: 'Hometown & daily life',
        questions: [
          'Where is your hometown, and what is it like?',
          'Do you prefer living in a city or in the countryside? Why?',
          'How do you usually spend your weekends?',
          'Has your daily routine changed much in recent years?',
        ],
        modelAnswer:
          'I am originally from Ulaanbaatar, the capital of Mongolia. It is a busy, fast-growing city, so there is always something happening, though it can get quite crowded. Personally, I prefer city life because everything I need — work, friends, cafés — is close by, and I enjoy the energy of it. At weekends, I usually catch up with friends or go hiking in the hills just outside the city to get some fresh air. My routine has actually changed a fair bit lately, since I now study English in the evenings, which keeps me much busier than before.',
      }),
      p({
        id: 's1p2',
        part: 2,
        label: 'Part 2 (cue card)',
        title: 'Describe a skill you would like to learn',
        questions: [
          'Describe a skill you would like to learn. You should say:',
          '• what the skill is',
          '• why you want to learn it',
          '• how you would learn it',
          '• and explain how this skill would change your life.',
        ],
        modelAnswer:
          'The skill I would most like to learn is how to play the piano. I have always been drawn to music, but I never had the chance to take lessons as a child, so it feels like something I missed out on. I want to learn it mainly because I find playing an instrument incredibly relaxing, and I think it would be a wonderful way to unwind after a stressful day at work. To learn it, I would probably start with online tutorials to grasp the basics, and then, once I could afford it, hire a private teacher to correct my technique and keep me motivated. I believe this skill would change my life in a small but meaningful way: it would give me a creative outlet that has nothing to do with my job, and I imagine that being able to play for my family and friends would bring me a great deal of joy.',
      }),
      p({
        id: 's1p3',
        part: 3,
        label: 'Part 3',
        title: 'Learning & technology — discussion',
        questions: [
          'Do you think people learn new skills more easily today than in the past? Why?',
          'What are the advantages and disadvantages of learning online?',
          'Should governments do more to help adults learn new skills?',
          'How might the way we learn change in the future?',
        ],
        modelAnswer:
          'On the whole, I would say people can learn new skills far more easily nowadays, largely because of the internet. In the past, you often needed access to a specific teacher or institution, whereas today an enormous amount of high-quality material is available for free online. That said, learning online does have its drawbacks — it requires a great deal of self-discipline, and some people miss the structure and feedback that a real classroom provides. As for governments, I firmly believe they should do more, perhaps by funding free retraining programmes, because economies change so quickly that adults frequently need to update their skills to stay employable. Looking ahead, I suspect learning will become increasingly personalised, with artificial intelligence tailoring lessons to each individual’s pace and weaknesses, which could make the whole process much more efficient.',
      }),
    ],
  },

  // --- Test 2 — Reading & people we admire --------------------------------
  // (Part 1 reworked away from "hometown" so it no longer overlaps Test 1.)
  {
    id: 'st-2',
    title: 'Reading & a person you admire',
    parts: [
      p({
        id: 's2p1',
        part: 1,
        label: 'Part 1',
        title: 'Reading & free time',
        questions: [
          'Let’s talk about reading. Do you enjoy reading in your free time?',
          'What kind of books or articles do you like to read?',
          'Do you prefer reading on paper or on a screen? Why?',
          'Did you read a lot when you were a child?',
        ],
        modelAnswer:
          'Yes, I genuinely enjoy reading; it is probably my favourite way to relax. I try to read for about half an hour before bed most nights. These days I mostly read novels in English, partly for pleasure and partly because it is such a painless way to pick up new vocabulary, though I also follow a few news websites to keep up with current affairs. When it comes to the format, I actually prefer paper books — there is something about turning real pages that a screen can’t quite replicate, and it gives my eyes a rest from devices. As a child I read constantly, mainly adventure stories and folk tales, and I think that early habit is the reason I still love books today.',
      }),
      p({
        id: 's2p2',
        part: 2,
        label: 'Part 2 (cue card)',
        title: 'Describe a well-known person you admire',
        questions: [
          'Describe a well-known person you like or admire. You should say:',
          '• who this person is',
          '• what they have done',
          '• why they are well-known',
          '• and explain why you admire this person.',
        ],
        modelAnswer:
          'The well-known person I’d like to talk about is Sir David Attenborough, the British broadcaster and naturalist. He’s spent more than sixty years making documentaries about the natural world, and his voice and films are recognised almost everywhere. What he has done, essentially, is bring the planet’s most remote wildlife into ordinary people’s living rooms, and in recent years he has used that fame to warn the public about climate change and the loss of biodiversity. He’s well-known partly because of the sheer quality of his programmes, but also because he comes across as calm, curious and completely sincere. The reason I admire him so much is that he has used his influence for something far bigger than himself: rather than simply entertaining, he has changed the way millions of people think about the environment, and he’s done it gently, through knowledge rather than fear. I find that combination of expertise and genuine purpose truly inspiring.',
      }),
      p({
        id: 's2p3',
        part: 3,
        label: 'Part 3',
        title: 'Fame & the media — discussion',
        questions: [
          'In your country, what kind of people become famous nowadays?',
          'Do you think the media reports on famous people fairly?',
          'What are the negative impacts of celebrity culture on young people?',
          'Do you think famous people have a responsibility to be good role models?',
        ],
        modelAnswer:
          'These days, I’d say the people who become famous in my country are increasingly those who are active on social media — influencers, singers and athletes — rather than, say, scientists or writers, simply because online platforms reward visibility. As for whether the media report on them fairly, I’m fairly sceptical; coverage often exaggerates scandals because controversy attracts more clicks, so the picture the public receives can be quite distorted. The negative impact on young people worries me the most: constant exposure to carefully edited, glamorous lives can damage teenagers’ self-esteem and create unrealistic expectations about wealth and appearance. On the question of responsibility, I do believe famous people have at least some moral obligation to behave well, because whether they like it or not, young fans imitate them. That said, I don’t think it’s entirely fair to expect them to be flawless; the real solution is to teach young people to view celebrity culture critically rather than to place the whole burden on the celebrities themselves.',
      }),
    ],
  },

  // --- Test 3 — Work, studies & travel ------------------------------------
  {
    id: 'st-3',
    title: 'Work, studies & a memorable journey',
    parts: [
      p({
        id: 's3p1',
        part: 1,
        label: 'Part 1',
        title: 'Work or studies',
        questions: [
          'Do you work, or are you a student?',
          'What do you enjoy most about your work or your studies?',
          'Is there anything you would like to change about it?',
          'Do you prefer working in the morning or later in the day?',
        ],
        modelAnswer:
          'At the moment I’m doing both, really — I work full-time at a marketing company and study English in the evenings. What I enjoy most about my job is the variety; no two days are the same, and I get to be creative when we plan campaigns. If I could change one thing, it would be the amount of time we spend in meetings, because I often feel I could get far more done if my mornings were left free. As for when I work best, I’m definitely a morning person — my mind is sharpest just after a cup of coffee, so I try to tackle the most demanding tasks early and save the routine ones for the afternoon, when my energy starts to dip.',
      }),
      p({
        id: 's3p2',
        part: 2,
        label: 'Part 2 (cue card)',
        title: 'Describe a memorable journey you have taken',
        questions: [
          'Describe a memorable journey or trip you have taken. You should say:',
          '• where you went',
          '• who you went with',
          '• what you did there',
          '• and explain why the journey was so memorable.',
        ],
        modelAnswer:
          'The journey that stands out most clearly in my memory is a trip I took to the Gobi Desert with three close friends a couple of summers ago. We drove for two days in an old jeep, far away from any city, until the landscape became nothing but enormous sand dunes and open sky. During those few days we rode camels at sunrise, climbed the famous singing dunes — which actually hum when the sand shifts — and at night we slept in a traditional ger and watched the most extraordinary night sky I have ever seen, with the Milky Way stretched right across it. What made the journey so memorable wasn’t just the scenery, breathtaking though it was; it was the sense of complete disconnection from ordinary life. With no phone signal and no schedule, we simply talked, laughed and noticed our surroundings, and I came back feeling genuinely refreshed. It reminded me how rare and valuable that kind of stillness has become.',
      }),
      p({
        id: 's3p3',
        part: 3,
        label: 'Part 3',
        title: 'Travel & tourism — discussion',
        questions: [
          'Why do you think people enjoy travelling to other countries?',
          'What benefits does tourism bring to a country?',
          'Can tourism ever harm local communities or the environment?',
          'Do you think people will travel more or less in the future?',
        ],
        modelAnswer:
          'I think people are drawn to travel mainly out of curiosity — there’s a real thrill in experiencing a culture, a cuisine and a way of life entirely different from your own, and it broadens the mind in a way that reading alone cannot. For the host country, the benefits are considerable: tourism creates jobs, brings in foreign currency and can fund the preservation of historic sites. Having said that, it certainly has a darker side. Popular destinations can become overcrowded, local prices rise so much that residents are priced out, and fragile natural sites are sometimes damaged by sheer volume of visitors. As for the future, I suspect people will travel even more as flights remain affordable and middle classes grow worldwide, although I’d like to think it will become more sustainable, with travellers increasingly conscious of their environmental footprint.',
      }),
    ],
  },

  // --- Test 4 — Food, cooking & celebrations ------------------------------
  {
    id: 'st-4',
    title: 'Food & a special celebration',
    parts: [
      p({
        id: 's4p1',
        part: 1,
        label: 'Part 1',
        title: 'Food & cooking',
        questions: [
          'What kind of food do you usually eat?',
          'Do you enjoy cooking? Why or why not?',
          'Has the food people eat in your country changed in recent years?',
          'Do you prefer eating at home or in a restaurant?',
        ],
        modelAnswer:
          'My everyday diet is fairly traditional — Mongolian cooking relies heavily on meat and dairy, so I eat a lot of beef and mutton, often in dumplings or noodle soups. I do enjoy cooking, although I’d describe myself as enthusiastic rather than skilled; I find chopping and stirring quite therapeutic after work, even if the results are sometimes hit-and-miss. Food here has actually changed noticeably in recent years: when I was young there were very few foreign restaurants, whereas now you can find Korean, Italian and Japanese food easily, and younger people in particular have become much more adventurous. On balance I prefer eating at home, because it’s cheaper and I can control exactly what goes into the dish, but I do love going out occasionally as a treat and to try something I couldn’t make myself.',
      }),
      p({
        id: 's4p2',
        part: 2,
        label: 'Part 2 (cue card)',
        title: 'Describe a special meal or celebration you remember',
        questions: [
          'Describe a special meal or celebration you remember. You should say:',
          '• what the occasion was',
          '• who was there',
          '• what food was served',
          '• and explain why you remember it so well.',
        ],
        modelAnswer:
          'The celebration I remember most vividly is Tsagaan Sar, the Mongolian Lunar New Year, two years ago at my grandparents’ home. The whole extended family gathered — my parents, aunts, uncles and a small army of cousins — so the house was packed and wonderfully noisy. The centrepiece, as always, was a huge tower of traditional biscuits called ul boov, and my grandmother had spent days steaming hundreds of buuz, which are little meat dumplings. We also drank airag, fermented mare’s milk, and exchanged gifts according to age, greeting the elders first as a sign of respect. The reason it has stayed with me so clearly is that it was one of the last big gatherings before my grandfather passed away, so it now feels especially precious. Beyond the food, what I treasure is the sense of continuity — the same rituals my great-grandparents would have followed, repeated by us, which gives me a deep feeling of belonging.',
      }),
      p({
        id: 's4p3',
        part: 3,
        label: 'Part 3',
        title: 'Food, health & society — discussion',
        questions: [
          'Why do you think fast food has become so popular?',
          'Whose responsibility is it to encourage people to eat healthily?',
          'How have people’s eating habits changed compared with the past?',
          'Do you think traditional dishes will survive in the future?',
        ],
        modelAnswer:
          'Fast food has boomed largely because modern life is so hurried; it’s cheap, quick and consistent, which suits people who simply don’t have time to cook after a long day. When it comes to encouraging healthier eating, I think responsibility has to be shared. Individuals must obviously make sensible choices, but governments can help through clear food labelling and education in schools, and food companies have a duty not to market junk food aggressively to children. Eating habits have certainly shifted — we now consume far more processed and imported food than previous generations, who ate seasonally and locally almost by necessity. As for tradition, I’m cautiously optimistic that traditional dishes will endure, because they’re tied so closely to national identity and festivals; even as global cuisine spreads, I think families will keep cooking the dishes that carry their heritage, if only for special occasions.',
      }),
    ],
  },

  // --- Test 5 — Technology & communication --------------------------------
  {
    id: 'st-5',
    title: 'Phones, apps & communication',
    parts: [
      p({
        id: 's5p1',
        part: 1,
        label: 'Part 1',
        title: 'Phones & technology',
        questions: [
          'How often do you use your mobile phone?',
          'What do you mainly use it for?',
          'Could you manage for a day without your phone?',
          'Do you think you spend too much time looking at screens?',
        ],
        modelAnswer:
          'Honestly, I use my phone constantly throughout the day — it’s the first thing I reach for in the morning and the last thing I put down at night. I mainly use it for messaging friends, checking the news and, increasingly, for studying, since I do a lot of my English practice through apps. Could I manage a whole day without it? I’d like to say yes, and I have done it occasionally on trips, but I’ll admit I found it surprisingly uncomfortable at first, almost as if I were missing something. That probably answers your last question too: yes, I do think I spend too much time on screens, and it’s something I’m consciously trying to cut down, for example by leaving my phone in another room while I read.',
      }),
      p({
        id: 's5p2',
        part: 2,
        label: 'Part 2 (cue card)',
        title: 'Describe a website or an app you find useful',
        questions: [
          'Describe a website or an app you find useful. You should say:',
          '• what it is',
          '• how you found out about it',
          '• how often you use it',
          '• and explain why you find it so useful.',
        ],
        modelAnswer:
          'The app I’d like to describe is a language-learning app I use to improve my English, which has honestly become part of my daily routine. I came across it through a friend who was preparing for the same exam as me; she swore by it, so I decided to give it a try, and I’ve been hooked ever since. I use it every single day, usually for twenty minutes or so on my commute, working through reading passages, listening exercises and short writing tasks. What makes it so useful is that it adapts to my level and gives me instant feedback — for instance, it points out exactly which grammar mistakes I keep repeating, which a textbook simply can’t do. Beyond the practical side, it has made studying feel almost like a game, with streaks and small rewards that keep me motivated even on days when I’m tired. For a busy person trying to learn a language without a teacher, I genuinely think it’s invaluable.',
      }),
      p({
        id: 's5p3',
        part: 3,
        label: 'Part 3',
        title: 'Technology & communication — discussion',
        questions: [
          'How has technology changed the way people communicate?',
          'Are there any disadvantages to communicating mainly online?',
          'Do older and younger people use technology in different ways?',
          'How do you think communication technology will develop in the future?',
        ],
        modelAnswer:
          'Technology has transformed communication almost beyond recognition; we can now reach someone on the other side of the world instantly and for free, which would have seemed like magic a few decades ago. However, this convenience comes at a cost. When most of our conversations happen through text, we lose tone of voice and body language, so misunderstandings are common, and some people feel paradoxically more isolated despite being constantly connected. There’s a clear generational divide, too: younger people tend to treat these tools intuitively and prefer messaging or video, whereas older generations often favour a phone call and can find new platforms intimidating. Looking forward, I imagine communication will become even more immersive — perhaps through virtual reality that lets us feel as though we’re in the same room — but I do hope we don’t lose the irreplaceable value of meeting face to face.',
      }),
    ],
  },

  // --- Test 6 — Sport, health & the outdoors ------------------------------
  {
    id: 'st-6',
    title: 'Sport, exercise & the outdoors',
    parts: [
      p({
        id: 's6p1',
        part: 1,
        label: 'Part 1',
        title: 'Sport & exercise',
        questions: [
          'Do you do any sports or exercise?',
          'How did you first become interested in it?',
          'Do you prefer exercising alone or with other people?',
          'Is it easy to stay active where you live?',
        ],
        modelAnswer:
          'Yes, I try to stay reasonably active — I go running a few times a week and I’ve recently taken up rock climbing at an indoor gym. I first got into running almost by accident: a colleague invited me to join a charity 5k, and although I struggled to finish, I was hooked by the sense of achievement afterwards. Generally I prefer exercising alone, because running clears my head and gives me time to think, but climbing is the exception, since it’s much safer and more fun with a partner. Staying active where I live is a bit of a mixed bag — the long, harsh winters in Ulaanbaatar make outdoor exercise difficult for several months, so like a lot of people I end up relying on indoor gyms when it’s bitterly cold.',
      }),
      p({
        id: 's6p2',
        part: 2,
        label: 'Part 2 (cue card)',
        title: 'Describe an outdoor place you enjoy spending time in',
        questions: [
          'Describe an outdoor place you enjoy spending time in. You should say:',
          '• where it is',
          '• how often you go there',
          '• what you do there',
          '• and explain why you enjoy it so much.',
        ],
        modelAnswer:
          'The outdoor place I love most is Gorkhi-Terelj National Park, which lies just an hour or so north-east of the city. It’s a stunning landscape of forested hills, dramatic rock formations and a winding river, and despite being so close to Ulaanbaatar it feels like another world entirely. I try to go at least once a month in the warmer half of the year, usually with friends or family. When I’m there I mostly hike up to the viewpoints, have a long picnic by the river, and occasionally stay overnight in a tourist ger camp so I can wake up to the sound of birds rather than traffic. The reason I enjoy it so much is the contrast it offers to my hectic city routine: the air is crisp and clean, my phone is mercifully useless, and a few hours of walking among the pines never fails to reset my mood. It’s become my go-to escape whenever life feels overwhelming.',
      }),
      p({
        id: 's6p3',
        part: 3,
        label: 'Part 3',
        title: 'Health, fitness & city life — discussion',
        questions: [
          'Why do you think some people find it hard to stay fit?',
          'Should governments do more to encourage healthy lifestyles?',
          'What are the advantages of living near parks and green spaces?',
          'Do people in cities exercise more or less than those in the countryside?',
        ],
        modelAnswer:
          'I think many people struggle to stay fit simply because modern life works against it — long working hours, desk jobs and the sheer convenience of unhealthy food all make the easy choice the unhealthy one. I do believe governments should take an active role, not by lecturing people, but by building safe cycle lanes, subsidising sports facilities and keeping public parks well maintained, since making exercise convenient is far more effective than telling people to do it. The benefits of living near green space are well documented: it encourages walking and jogging, improves air quality, and there’s strong evidence that simply being among trees reduces stress and lifts mental health. As for the city-versus-countryside question, it’s an interesting one — rural people are often more active through physical work, whereas city dwellers may exercise more deliberately, joining gyms or running clubs, so I’d say the type of activity differs more than the overall amount.',
      }),
    ],
  },
];
