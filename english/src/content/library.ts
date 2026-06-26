// =============================================================================
// Vivid Lingua — English track · Everyday study library
// -----------------------------------------------------------------------------
// Self-contained study content (NOT the IELTS/SAT exams). Four arrays span the
// full CEFR ladder A1..C2 across daily life, travel, work, study, technology,
// environment and culture. Conforms exactly to the interfaces in ../types.
// =============================================================================

import { ReadingItem, ListeningItem, WritingItem, SpeakingItem } from '../types';

// ----- Reading --------------------------------------------------------------
export const READING_LIBRARY: ReadingItem[] = [
  {
    id: 1,
    level: 'A1',
    topic: 'Daily life',
    title: 'My Morning',
    text:
      'My name is Anna. Every day I wake up at seven o\'clock. First, I drink a glass of water. Then I make breakfast. I like toast with butter and a cup of tea. My brother Tom likes milk and cereal. We eat together in the kitchen. After breakfast, I brush my teeth and put on my shoes. I leave the house at eight o\'clock. I walk to the bus stop. The bus is yellow. It comes at quarter past eight. I sit by the window and look at the trees. I am happy in the morning because the day is new.',
    questions: [
      {
        id: 1,
        question: 'What time does Anna wake up?',
        choices: ['At six o\'clock', 'At seven o\'clock', 'At eight o\'clock', 'At nine o\'clock'],
        correctIndex: 1,
        explanation: 'The text says "Every day I wake up at seven o\'clock."',
      },
      {
        id: 2,
        question: 'What does Tom like for breakfast?',
        choices: ['Toast and tea', 'Milk and cereal', 'Coffee and eggs', 'Fruit and water'],
        correctIndex: 1,
        explanation: '"My brother Tom likes milk and cereal."',
      },
      {
        id: 3,
        question: 'How does Anna travel?',
        choices: ['By car', 'By bike', 'By bus', 'By train'],
        correctIndex: 2,
        explanation: 'She walks to the bus stop and takes the yellow bus.',
      },
    ],
  },
  {
    id: 2,
    level: 'A1',
    topic: 'Daily life',
    title: 'At the Supermarket',
    text:
      'On Saturday, Maria goes to the supermarket. She has a small list. She needs bread, eggs, milk, and apples. The supermarket is big and clean. Maria takes a basket. The bread is near the door. The milk is at the back, in the cold section. The apples are red and green. Maria takes six apples. At the checkout, a man helps her. The total is twelve dollars. Maria pays with a card. She puts the food in a green bag and walks home. The bag is a little heavy, but Maria is strong.',
    questions: [
      {
        id: 1,
        question: 'When does Maria go shopping?',
        choices: ['On Monday', 'On Friday', 'On Saturday', 'On Sunday'],
        correctIndex: 2,
        explanation: '"On Saturday, Maria goes to the supermarket."',
      },
      {
        id: 2,
        question: 'How does Maria pay?',
        choices: ['With cash', 'With a card', 'With a phone', 'With a cheque'],
        correctIndex: 1,
        explanation: '"Maria pays with a card."',
      },
    ],
  },
  {
    id: 3,
    level: 'A2',
    topic: 'Travel',
    title: 'A Weekend in the Mountains',
    text:
      'Last weekend, Daniel and his friends went to the mountains. They left the city early on Saturday morning because the drive took three hours. The weather was cold but sunny, perfect for walking. They stayed in a small wooden cabin near a lake. In the afternoon, they climbed a hill and could see the whole valley below them. It was beautiful. In the evening, they cooked soup and told stories around a fire. Daniel could not sleep at first because the night was so quiet. On Sunday, they walked beside the lake before driving home. Everyone agreed it was a great trip and promised to return next year.',
    questions: [
      {
        id: 1,
        question: 'How long was the drive to the mountains?',
        choices: ['One hour', 'Two hours', 'Three hours', 'Five hours'],
        correctIndex: 2,
        explanation: '"the drive took three hours."',
      },
      {
        id: 2,
        question: 'Where did the friends stay?',
        choices: ['In a hotel', 'In a tent', 'In a wooden cabin', 'In a car'],
        correctIndex: 2,
        explanation: '"They stayed in a small wooden cabin near a lake."',
      },
      {
        id: 3,
        question: 'Why could Daniel not sleep at first?',
        choices: ['It was too hot', 'The night was very quiet', 'He was hungry', 'The cabin was loud'],
        correctIndex: 1,
        explanation: '"Daniel could not sleep at first because the night was so quiet."',
      },
    ],
  },
  {
    id: 4,
    level: 'A2',
    topic: 'Work',
    title: 'My First Day at Work',
    text:
      'Sophie started her new job at a bookshop on Monday. She was nervous but excited. Her manager, Mr Patel, was friendly and showed her around the shop. He explained how to use the cash register and where to find the different sections. In the morning, Sophie helped a customer find a cookbook. The customer was happy and thanked her. At lunchtime, she ate a sandwich with a colleague named Leo, who had worked there for two years. Leo gave her useful advice about dealing with busy weekends. By the end of the day, Sophie felt tired but proud. She knew she would enjoy working with books and meeting new people every day.',
    questions: [
      {
        id: 1,
        question: 'Where does Sophie work?',
        choices: ['In a café', 'In a bookshop', 'In a library', 'In a school'],
        correctIndex: 1,
        explanation: '"Sophie started her new job at a bookshop on Monday."',
      },
      {
        id: 2,
        question: 'Who gave Sophie advice about busy weekends?',
        choices: ['Mr Patel', 'A customer', 'Leo', 'Her sister'],
        correctIndex: 2,
        explanation: 'Leo, a colleague, gave her advice about dealing with busy weekends.',
      },
    ],
  },
  {
    id: 5,
    level: 'A2',
    topic: 'Technology',
    title: 'Learning Online',
    text:
      'These days, many people learn new skills on the internet. You do not need to go to a classroom. Instead, you can watch videos on your phone or computer at home. Carlos wanted to learn how to cook, so he found a free cooking channel online. Every Sunday, he chooses one new recipe and follows the steps in the video. If he does not understand something, he simply pauses the video and watches it again. Last month, he learned how to make pasta, bread, and a fruit cake. His family was very impressed. Carlos says that online learning is cheap, flexible, and fun, and he plans to try a painting course next.',
    questions: [
      {
        id: 1,
        question: 'What did Carlos want to learn?',
        choices: ['Painting', 'Cooking', 'Singing', 'Driving'],
        correctIndex: 1,
        explanation: '"Carlos wanted to learn how to cook."',
      },
      {
        id: 2,
        question: 'What does Carlos do when he does not understand a step?',
        choices: ['He gives up', 'He calls a friend', 'He pauses and watches again', 'He buys a book'],
        correctIndex: 2,
        explanation: '"he simply pauses the video and watches it again."',
      },
      {
        id: 3,
        question: 'According to Carlos, online learning is NOT described as:',
        choices: ['Cheap', 'Flexible', 'Difficult', 'Fun'],
        correctIndex: 2,
        explanation: 'He calls it cheap, flexible, and fun — not difficult.',
      },
    ],
  },
  {
    id: 6,
    level: 'B1',
    topic: 'Environment',
    title: 'The Plastic Problem',
    text:
      'Plastic is cheap, light, and strong, which is why it is used everywhere, from water bottles to food packaging. However, most plastic is designed to be used only once and then thrown away. The problem is that plastic does not break down easily. A single plastic bag can remain in the environment for hundreds of years. Much of it ends up in rivers and oceans, where it harms fish, birds, and other wildlife. Scientists have even found tiny pieces of plastic inside the bodies of sea animals. Fortunately, people are starting to act. Many shops now charge for plastic bags, and some cities have banned plastic straws. Recycling helps too, but experts say the best solution is simply to use less plastic in the first place.',
    questions: [
      {
        id: 1,
        question: 'Why is plastic used everywhere?',
        choices: ['It is colourful', 'It is cheap, light, and strong', 'It is easy to recycle', 'It breaks down quickly'],
        correctIndex: 1,
        explanation: '"Plastic is cheap, light, and strong, which is why it is used everywhere."',
      },
      {
        id: 2,
        question: 'According to the text, how long can a plastic bag remain in the environment?',
        choices: ['A few weeks', 'A few years', 'Hundreds of years', 'It disappears at once'],
        correctIndex: 2,
        explanation: '"A single plastic bag can remain in the environment for hundreds of years."',
      },
      {
        id: 3,
        question: 'What do experts say is the best solution?',
        choices: ['Recycling more', 'Using less plastic', 'Banning all shops', 'Burning plastic'],
        correctIndex: 1,
        explanation: '"the best solution is simply to use less plastic in the first place."',
      },
    ],
  },
  {
    id: 7,
    level: 'B1',
    topic: 'Study',
    title: 'How to Remember More',
    text:
      'Many students complain that they forget what they study soon after reading it. Memory researchers say this is normal, but there are ways to remember more. One powerful method is called spaced repetition. Instead of studying a topic once for many hours, you review it several times over several days. Each time you recall the information, your brain stores it more firmly. Another useful technique is testing yourself. Rather than reading your notes again and again, close the book and try to write down what you remember. This feels harder, but it actually works better. Finally, sleep matters more than most people think: while you sleep, your brain organises the things you learned during the day. So a good night\'s rest can be just as important as an extra hour of study.',
    questions: [
      {
        id: 1,
        question: 'What is "spaced repetition"?',
        choices: ['Studying once for many hours', 'Reviewing material several times over several days', 'Reading aloud quickly', 'Studying only before a test'],
        correctIndex: 1,
        explanation: 'Spaced repetition means reviewing the topic several times over several days.',
      },
      {
        id: 2,
        question: 'Why is testing yourself recommended?',
        choices: ['It is easier than reading', 'It takes less time', 'It helps you remember better even though it feels harder', 'Teachers prefer it'],
        correctIndex: 2,
        explanation: '"This feels harder, but it actually works better."',
      },
      {
        id: 3,
        question: 'What does the brain do during sleep, according to the text?',
        choices: ['It forgets everything', 'It organises what you learned', 'It stops working', 'It studies new topics'],
        correctIndex: 1,
        explanation: '"while you sleep, your brain organises the things you learned during the day."',
      },
    ],
  },
  {
    id: 8,
    level: 'B1',
    topic: 'Culture',
    title: 'The Tradition of Tea',
    text:
      'Tea is the most popular drink in the world after water, and almost every culture has its own way of enjoying it. In Britain, people often add milk and sometimes sugar, and "having a cup of tea" is a way to relax or welcome a guest. In Japan, the tea ceremony is a slow, careful ritual that has been practised for centuries; every movement has meaning. In Morocco, sweet mint tea is poured from high above the glass to create a layer of bubbles, and refusing a cup can seem impolite. In China, where tea was first discovered thousands of years ago, different regions grow different leaves, each with its own flavour. Although the customs vary widely, tea everywhere brings people together and creates a moment of calm in a busy day.',
    questions: [
      {
        id: 1,
        question: 'In which country is tea poured from high above the glass?',
        choices: ['Britain', 'Japan', 'Morocco', 'China'],
        correctIndex: 2,
        explanation: 'In Morocco, sweet mint tea is poured from high above the glass.',
      },
      {
        id: 2,
        question: 'What is true about the Japanese tea ceremony?',
        choices: ['It is fast and casual', 'It is a slow, careful ritual', 'It uses milk and sugar', 'It is a recent invention'],
        correctIndex: 1,
        explanation: '"the tea ceremony is a slow, careful ritual that has been practised for centuries."',
      },
    ],
  },
  {
    id: 9,
    level: 'B1',
    topic: 'Travel',
    title: 'Slow Travel',
    text:
      'For many years, the goal of travel was to see as much as possible in a short time. Tourists would visit five cities in a week, taking photos and rushing on. Recently, however, a different idea has become popular: slow travel. Instead of racing from place to place, slow travellers stay longer in one location and try to live a little like the local people. They shop at neighbourhood markets, learn a few words of the language, and eat where the locals eat. Supporters say this kind of travel is more relaxing and more meaningful. It is also better for the environment, because fewer flights and long journeys mean less pollution. Slow travel may cover less ground, but those who try it often say they understand a place far more deeply.',
    questions: [
      {
        id: 1,
        question: 'What do slow travellers prefer to do?',
        choices: ['Visit many cities quickly', 'Stay longer in one place', 'Avoid local people', 'Take only photos'],
        correctIndex: 1,
        explanation: 'Slow travellers stay longer in one location and live like the locals.',
      },
      {
        id: 2,
        question: 'Why is slow travel better for the environment?',
        choices: ['It uses more flights', 'It involves fewer flights and long journeys', 'It needs more hotels', 'It avoids markets'],
        correctIndex: 1,
        explanation: '"fewer flights and long journeys mean less pollution."',
      },
    ],
  },
  {
    id: 10,
    level: 'B2',
    topic: 'Technology',
    title: 'The Rise of Remote Work',
    text:
      'Not long ago, working from home was a rare privilege offered to only a few employees. Today, it has become a normal part of professional life for millions of people. The shift was accelerated by improvements in technology: fast internet, video calls, and shared online documents have made it possible to collaborate without being in the same building. Many workers welcome the change. They save time and money that they once spent commuting, and they can shape their days around family responsibilities. Employers, too, have noticed benefits, including access to talented people regardless of where they live. Yet remote work is not without drawbacks. Some employees feel isolated, missing the casual conversations of an office, while others struggle to separate their work from their personal lives. As a result, many companies are now experimenting with a hybrid model, asking staff to come in for only part of the week.',
    questions: [
      {
        id: 1,
        question: 'What accelerated the shift to remote work?',
        choices: ['Cheaper offices', 'Improvements in technology', 'Longer holidays', 'Lower salaries'],
        correctIndex: 1,
        explanation: '"The shift was accelerated by improvements in technology."',
      },
      {
        id: 2,
        question: 'Which benefit do employers gain?',
        choices: ['Cheaper electricity', 'Access to talented people regardless of location', 'More office parties', 'Shorter contracts'],
        correctIndex: 1,
        explanation: 'Employers gain access to talented people regardless of where they live.',
      },
      {
        id: 3,
        question: 'What is the "hybrid model"?',
        choices: ['Working only at night', 'Coming to the office part of the week', 'Never going to the office', 'Working two jobs'],
        correctIndex: 1,
        explanation: 'A hybrid model asks staff to come in for only part of the week.',
      },
    ],
  },
  {
    id: 11,
    level: 'B2',
    topic: 'Environment',
    title: 'Cities That Breathe',
    text:
      'As more of the world\'s population moves into cities, urban planners face a difficult question: how can a place full of concrete and traffic remain healthy to live in? One increasingly popular answer is to bring nature back into the city. So-called "green cities" plant trees along streets, create parks within walking distance of every home, and even cover the roofs of buildings with grass and plants. These measures are more than decoration. Trees cool the air on hot days, absorb rainwater that would otherwise flood the streets, and filter out some of the pollution produced by cars. Green spaces also improve mental health; studies repeatedly show that people who live near parks report lower levels of stress. Of course, planting a tree is easier than maintaining it for decades, and space in crowded cities is expensive. Still, planners argue that the long-term savings in health and energy costs make the investment worthwhile.',
    questions: [
      {
        id: 1,
        question: 'What do "green cities" do?',
        choices: ['Ban all cars', 'Bring nature back into the city', 'Build taller towers', 'Remove all parks'],
        correctIndex: 1,
        explanation: 'Green cities plant trees, create parks, and cover roofs with plants.',
      },
      {
        id: 2,
        question: 'Which is NOT given as a benefit of urban trees?',
        choices: ['Cooling the air', 'Absorbing rainwater', 'Filtering pollution', 'Increasing traffic'],
        correctIndex: 3,
        explanation: 'Trees cool air, absorb rainwater, and filter pollution; increasing traffic is not a benefit.',
      },
      {
        id: 3,
        question: 'What challenge of green cities does the text mention?',
        choices: ['Trees grow too fast', 'Maintaining trees and expensive space', 'People dislike parks', 'There is no rain'],
        correctIndex: 1,
        explanation: 'Maintaining trees for decades is hard, and space in crowded cities is expensive.',
      },
    ],
  },
  {
    id: 12,
    level: 'B2',
    topic: 'Work',
    title: 'The Value of Failure',
    text:
      'In many cultures, failure is something to be ashamed of, a sign that a person is not good enough. Yet a growing number of successful entrepreneurs and scientists argue the opposite: that failure is one of the most valuable experiences a person can have. Their reasoning is simple. When everything goes smoothly, we rarely stop to examine why. It is only when a project collapses that we are forced to ask hard questions and learn deep lessons. Some companies have even begun to celebrate intelligent failures, holding meetings where teams openly discuss what went wrong and what they would do differently. The key word, however, is intelligent. There is little to be gained from repeating the same careless mistake. The failures worth valuing are those that come from taking a thoughtful risk and that leave you wiser than before.',
    questions: [
      {
        id: 1,
        question: 'Why do some entrepreneurs value failure?',
        choices: ['It saves money', 'It forces us to ask hard questions and learn', 'It impresses customers', 'It is easy'],
        correctIndex: 1,
        explanation: 'Failure forces us to ask hard questions and learn deep lessons.',
      },
      {
        id: 2,
        question: 'What kind of failure does the text say is worth valuing?',
        choices: ['Careless mistakes', 'Intelligent failures from thoughtful risks', 'Failures that are hidden', 'Repeated mistakes'],
        correctIndex: 1,
        explanation: 'The failures worth valuing come from taking a thoughtful risk.',
      },
    ],
  },
  {
    id: 13,
    level: 'B2',
    topic: 'Culture',
    title: 'Why Stories Survive',
    text:
      'Long before writing existed, human beings told one another stories. Around fires and in caves, our ancestors shared tales of heroes, monsters, and distant lands. It might seem that storytelling is simply entertainment, a pleasant way to pass the time. Researchers, however, believe it served a far deeper purpose. Stories are an efficient way to package information that a group needs to survive. A tale about a hunter who is killed because he ignored a warning teaches caution far more memorably than a plain instruction would. Stories also bind communities together, creating shared values and a sense of common identity. Perhaps this is why, even in an age of screens and constant data, we are still drawn to narratives, whether in novels, films, or the short videos we watch on our phones. The medium changes, but the human appetite for a good story does not.',
    questions: [
      {
        id: 1,
        question: 'According to researchers, what deeper purpose did storytelling serve?',
        choices: ['Only entertainment', 'Packaging information needed to survive', 'Wasting time', 'Replacing writing'],
        correctIndex: 1,
        explanation: 'Stories are an efficient way to package survival information.',
      },
      {
        id: 2,
        question: 'What does the example of the hunter illustrate?',
        choices: ['Hunting is dangerous', 'Stories teach lessons memorably', 'Caves are unsafe', 'Heroes always win'],
        correctIndex: 1,
        explanation: 'The tale teaches caution more memorably than a plain instruction.',
      },
      {
        id: 3,
        question: 'What does the writer say about the modern age of screens?',
        choices: ['People no longer like stories', 'The appetite for stories remains', 'Novels have disappeared', 'Only data matters now'],
        correctIndex: 1,
        explanation: '"the human appetite for a good story does not" change.',
      },
    ],
  },
  {
    id: 14,
    level: 'C1',
    topic: 'Technology',
    title: 'The Attention Economy',
    text:
      'Every time we open an app, we step into a marketplace in which the currency is our attention. The services we treat as free are, in reality, paid for with the minutes and hours we spend staring at them, because that attention can be sold to advertisers. This simple economic fact explains a great deal about the design of modern technology. Features such as infinite scrolling, autoplay, and the small red notification badge are not accidents; they are carefully engineered to keep us engaged for as long as possible. The most sophisticated systems learn from our behaviour, predicting what will hold our gaze and feeding it to us before we even know we want it. Critics warn that this relentless competition for attention comes at a cost, fragmenting our concentration and eroding our capacity for sustained, deep thought. Defenders counter that the same tools connect us, inform us, and entertain us on a scale never before possible. What is beyond dispute is that attention has become one of the most contested resources of our time.',
    questions: [
      {
        id: 1,
        question: 'In the "attention economy", how are free services actually paid for?',
        choices: ['With subscriptions', 'With our attention, sold to advertisers', 'With taxes', 'With donations'],
        correctIndex: 1,
        explanation: 'Attention can be sold to advertisers, which pays for "free" services.',
      },
      {
        id: 2,
        question: 'Why are features like infinite scrolling described as "not accidents"?',
        choices: ['They are cheap to build', 'They are engineered to keep us engaged', 'They are required by law', 'They are unpopular'],
        correctIndex: 1,
        explanation: 'They are carefully engineered to keep us engaged for as long as possible.',
      },
      {
        id: 3,
        question: 'What concern do critics raise?',
        choices: ['Apps are too expensive', 'It fragments concentration and erodes deep thought', 'It connects people too much', 'It uses too little data'],
        correctIndex: 1,
        explanation: 'Critics warn it fragments concentration and erodes our capacity for deep thought.',
      },
    ],
  },
  {
    id: 15,
    level: 'C1',
    topic: 'Environment',
    title: 'Rewilding the Land',
    text:
      'For much of the last century, conservation meant carefully managing nature: deciding which species to protect, which to remove, and how a landscape ought to look. A bolder philosophy, known as rewilding, takes a strikingly different approach. Rather than micromanaging every meadow and forest, rewilders aim to restore natural processes and then, as far as possible, step back. Crucial to this vision is the return of so-called keystone species, animals whose presence reshapes an entire ecosystem. The reintroduction of wolves to one American national park, for instance, altered the behaviour of deer, which in turn allowed trees to recover, riverbanks to stabilise, and countless smaller creatures to return. Such results are striking, yet rewilding is not without controversy. Farmers worry about predators near their livestock, and some ecologists caution that nature rarely returns to a tidy, predictable state. Nevertheless, as evidence of its benefits accumulates, rewilding is gradually moving from the fringes of conservation towards its mainstream.',
    questions: [
      {
        id: 1,
        question: 'How does rewilding differ from traditional conservation?',
        choices: ['It manages nature more closely', 'It restores natural processes and steps back', 'It removes all animals', 'It builds more fences'],
        correctIndex: 1,
        explanation: 'Rewilders restore natural processes and then step back, rather than micromanaging.',
      },
      {
        id: 2,
        question: 'What is a "keystone species"?',
        choices: ['A rare flower', 'An animal whose presence reshapes an ecosystem', 'A type of tree', 'A farm animal'],
        correctIndex: 1,
        explanation: 'Keystone species are animals whose presence reshapes an entire ecosystem.',
      },
      {
        id: 3,
        question: 'Which concern about rewilding is mentioned?',
        choices: ['It is too cheap', 'Farmers worry about predators near livestock', 'It removes all trees', 'It is illegal'],
        correctIndex: 1,
        explanation: 'Farmers worry about predators near their livestock.',
      },
    ],
  },
  {
    id: 16,
    level: 'C1',
    topic: 'Study',
    title: 'The Myth of the Lone Genius',
    text:
      'Popular history loves the image of the lone genius: the solitary thinker who, through sheer brilliance, transforms the world. We picture the inventor alone in a workshop or the scientist struck by sudden inspiration. The truth, as historians of science increasingly emphasise, is considerably messier. Almost every major breakthrough rests on a foundation of earlier work, much of it now forgotten, and most emerges from dense networks of collaboration, correspondence, and competition. Even discoveries credited to a single name were frequently arrived at independently by others at roughly the same time, a pattern so common that it has its own term: multiple discovery. None of this diminishes the achievements of remarkable individuals. It does, however, suggest that progress is less the gift of isolated brilliance than the product of communities that share ideas freely. Recognising this matters, because the policies we adopt — how we fund research, protect ideas, and educate the young — depend heavily on which story we believe.',
    questions: [
      {
        id: 1,
        question: 'What does the writer say about the "lone genius" image?',
        choices: ['It is completely accurate', 'The truth is considerably messier', 'It is unimportant', 'It applies only to artists'],
        correctIndex: 1,
        explanation: 'The truth is messier; breakthroughs rest on earlier work and collaboration.',
      },
      {
        id: 2,
        question: 'What is "multiple discovery"?',
        choices: ['Discovering many things at once', 'Several people reaching the same discovery independently', 'Discovering nothing', 'A type of award'],
        correctIndex: 1,
        explanation: 'Multiple discovery is when others arrive at the same finding independently.',
      },
      {
        id: 3,
        question: 'Why does the writer say this debate matters?',
        choices: ['It is just entertaining', 'It shapes policies on funding, ideas, and education', 'It changes history books only', 'It has no real effect'],
        correctIndex: 1,
        explanation: 'The policies we adopt depend on which story we believe.',
      },
    ],
  },
  {
    id: 17,
    level: 'C2',
    topic: 'Culture',
    title: 'On the Untranslatable',
    text:
      'Anyone who has wrestled with translation eventually confronts a humbling truth: certain words resist being carried across into another tongue. The Portuguese saudade, the German Sehnsucht, the Japanese mono no aware — each gestures towards a knot of feeling that its native speakers grasp instantly yet outsiders can only circle warily. To call such words untranslatable is, strictly speaking, an exaggeration; one can always offer a paraphrase, a sentence, even an essay. What is lost is not the meaning so much as its compression, the way a single syllable can summon an entire structure of feeling sanctioned by a culture\'s history. Some scholars seize upon these terms as evidence that language shapes thought, that the words a community possesses quietly determine what its members can readily perceive. Sceptics retort that human beings everywhere feel the same emotions and simply label them differently. The dispute is unlikely to be resolved, but the untranslatable word endures as a small, stubborn reminder that meaning is woven not only from logic but from the particular textures of a shared life.',
    questions: [
      {
        id: 1,
        question: 'According to the writer, what is actually "lost" with untranslatable words?',
        choices: ['The meaning entirely', 'Their compression and cultural resonance', 'Their spelling', 'Their pronunciation'],
        correctIndex: 1,
        explanation: 'What is lost is the compression and cultural structure of feeling, not the meaning itself.',
      },
      {
        id: 2,
        question: 'How do some scholars interpret untranslatable words?',
        choices: ['As proof that all languages are identical', 'As evidence that language shapes thought', 'As errors of grammar', 'As meaningless sounds'],
        correctIndex: 1,
        explanation: 'Some scholars treat them as evidence that language shapes thought.',
      },
      {
        id: 3,
        question: 'What do the sceptics argue?',
        choices: ['Words determine perception', 'Humans feel the same emotions and just label them differently', 'Translation is impossible', 'Culture is irrelevant'],
        correctIndex: 1,
        explanation: 'Sceptics say everyone feels the same emotions but labels them differently.',
      },
    ],
  },
  {
    id: 18,
    level: 'C2',
    topic: 'Work',
    title: 'The Paradox of Productivity',
    text:
      'Few promises are repeated as confidently, or fulfilled as rarely, as the promise that the latest tool will finally make us productive. Each new device, application, or methodology arrives trailing assurances of time reclaimed, yet the curious sensation of perpetual busyness only seems to intensify. The economist\'s answer points to a phenomenon sometimes called the productivity paradox: gains in efficiency are quietly absorbed by rising expectations rather than translated into leisure. The clerk who once mailed three letters a day is now expected to dispatch three hundred emails; the saved minutes vanish into an ever-expanding sea of obligations. There is, too, a subtler dynamic at work. Tools that fragment our labour into countless small tasks may keep us occupied without ever permitting the unbroken stretches of concentration on which genuinely valuable work depends. The uncomfortable conclusion is that productivity, pursued as an end in itself, can become self-defeating — and that the truly scarce resource is not time, which technology multiplies, but attention, which it tends to scatter.',
    questions: [
      {
        id: 1,
        question: 'What is the "productivity paradox" described here?',
        choices: ['Tools always save time', 'Efficiency gains are absorbed by rising expectations', 'People work less than before', 'Technology fails completely'],
        correctIndex: 1,
        explanation: 'Gains in efficiency are absorbed by rising expectations, not turned into leisure.',
      },
      {
        id: 2,
        question: 'What does the example of the clerk illustrate?',
        choices: ['Letters are obsolete', 'Saved minutes vanish into more obligations', 'Email is unreliable', 'Clerks work less'],
        correctIndex: 1,
        explanation: 'Three letters became three hundred emails; the saved time disappears into new work.',
      },
      {
        id: 3,
        question: 'What does the writer conclude is the truly scarce resource?',
        choices: ['Time', 'Money', 'Attention', 'Tools'],
        correctIndex: 2,
        explanation: 'The scarce resource is attention, which technology tends to scatter.',
      },
    ],
  },
  {
    id: 19,
    level: 'A2',
    topic: 'Daily life',
    title: 'A Busy Saturday',
    text:
      'Saturday is the busiest day for the Garcia family. In the morning, the children have football practice in the park. Their mother, Elena, drives them there and then goes to the market to buy fresh vegetables. Their father, Luis, stays at home to clean the house and do the laundry. At lunch, the whole family eats together. In the afternoon, they often visit the grandparents, who live in the next town. The grandparents always have cake ready and love to hear about the children\'s week. In the evening, everyone is tired but happy. They watch a film together on the sofa, and the children usually fall asleep before it ends. Elena says Saturdays are exhausting, but she would not change them for anything.',
    questions: [
      {
        id: 1,
        question: 'What do the children do on Saturday morning?',
        choices: ['Go to school', 'Have football practice', 'Visit grandparents', 'Watch a film'],
        correctIndex: 1,
        explanation: '"the children have football practice in the park."',
      },
      {
        id: 2,
        question: 'What does Luis do while the others are out?',
        choices: ['He goes to work', 'He cleans the house and does the laundry', 'He plays football', 'He sleeps'],
        correctIndex: 1,
        explanation: '"their father, Luis, stays at home to clean the house and do the laundry."',
      },
    ],
  },
  {
    id: 20,
    level: 'B1',
    topic: 'Technology',
    title: 'Smart Homes',
    text:
      'Imagine a house that turns on the heating before you wake up, dims the lights when you start a film, and reminds you when you are running low on milk. This is the idea behind the smart home. Using small sensors and a central app on your phone, you can control lights, locks, cameras, and even kitchen appliances from anywhere in the world. Supporters say smart homes save energy, because lights and heating switch off automatically when no one is in the room. They can also help elderly people live independently, alerting family members if something seems wrong. However, there are concerns too. Smart devices collect a lot of personal data, and if they are not secure, criminals could break in — not through the door, but through the internet. As with most technology, the benefits are real, but so are the risks.',
    questions: [
      {
        id: 1,
        question: 'How can you control a smart home?',
        choices: ['Only by voice', 'Using sensors and an app on your phone', 'With a remote control only', 'You cannot control it'],
        correctIndex: 1,
        explanation: 'You use small sensors and a central app on your phone.',
      },
      {
        id: 2,
        question: 'How can smart homes help elderly people?',
        choices: ['By cooking for them', 'By alerting family if something seems wrong', 'By replacing doctors', 'By doing exercise'],
        correctIndex: 1,
        explanation: 'They can alert family members if something seems wrong.',
      },
      {
        id: 3,
        question: 'What risk does the text mention?',
        choices: ['Lights are too bright', 'Criminals could break in through the internet', 'Houses become too cold', 'Apps are too cheap'],
        correctIndex: 1,
        explanation: 'If devices are not secure, criminals could break in through the internet.',
      },
    ],
  },
  // --- IELTS Practice Test 1 — Reading (imported) ------------------------
  {
    id: 21,
    level: 'C1',
    topic: 'Environment',
    title: 'The Impact of Urban Green Spaces',
    text:
      'A. In recent decades, city planners have increasingly recognised the necessity of integrating green spaces into urban environments. Parks, public gardens, and tree-lined streets are no longer viewed merely as aesthetic additions but as critical infrastructure that supports public health. Research indicates that regular access to nature significantly lowers stress hormones and mitigates the risk of cardiovascular disease among city dwellers.\n\nB. Beyond human health, urban greenery plays a pivotal role in environmental regulation. Trees act as natural air filters, absorbing pollutants such as nitrogen dioxide and particulate matter. Furthermore, green spaces combat the "urban heat island" effect, a phenomenon where concrete and asphalt absorb and trap heat, making cities noticeably warmer than surrounding rural areas. By providing shade and releasing moisture, parks can lower local temperatures by several degrees.\n\nC. Despite these clear benefits, the equitable distribution of green spaces remains a significant challenge. In many rapidly expanding cities, parks are disproportionately located in affluent neighbourhoods, while lower-income areas face a severe deficit of accessible nature. Urban sociologists argue that this disparity exacerbates existing health inequalities, making the democratisation of urban nature a pressing priority for future city development.',
    questions: [
      {
        id: 1,
        question: 'Matching headings — which heading best fits Paragraph A?',
        choices: [
          'The environmental functions of city greenery',
          'The economic costs of building new parks',
          'The health benefits of urban nature',
          'Unequal access to green spaces',
        ],
        correctIndex: 2,
        explanation:
          'Paragraph A focuses on how access to nature lowers stress hormones and cardiovascular risk — the health benefits.',
      },
      {
        id: 2,
        question: 'Matching headings — which heading best fits Paragraph B?',
        choices: [
          'The environmental functions of city greenery',
          'The economic costs of building new parks',
          'The health benefits of urban nature',
          'Unequal access to green spaces',
        ],
        correctIndex: 0,
        explanation:
          'Paragraph B describes how greenery filters air and cools temperatures — its environmental functions.',
      },
      {
        id: 3,
        question: 'Matching headings — which heading best fits Paragraph C?',
        choices: [
          'The environmental functions of city greenery',
          'The economic costs of building new parks',
          'The health benefits of urban nature',
          'Unequal access to green spaces',
        ],
        correctIndex: 3,
        explanation:
          'Paragraph C discusses parks being concentrated in affluent areas — the unequal distribution of green spaces.',
      },
      {
        id: 4,
        question:
          'True / False / Not Given: Urban green spaces are primarily constructed to make cities look more beautiful.',
        choices: ['True', 'False', 'Not Given'],
        correctIndex: 1,
        explanation:
          'Paragraph A states parks are "no longer viewed merely as aesthetic additions", which contradicts the statement — so FALSE.',
      },
      {
        id: 5,
        question:
          'True / False / Not Given: The "urban heat island" effect causes cities to have higher temperatures than nearby rural regions.',
        choices: ['True', 'False', 'Not Given'],
        correctIndex: 0,
        explanation:
          'Paragraph B says the effect makes "cities noticeably warmer than surrounding rural areas" — so TRUE.',
      },
      {
        id: 6,
        question:
          'True / False / Not Given: The government has pledged increased funding to build parks in lower-income areas.',
        choices: ['True', 'False', 'Not Given'],
        correctIndex: 2,
        explanation:
          'The passage calls the disparity a priority but never mentions any government funding pledge — so NOT GIVEN.',
      },
      {
        id: 7,
        question: 'According to Paragraph B, trees help the environment by:',
        choices: [
          'producing nitrogen dioxide.',
          'cleaning the air of pollutants.',
          'absorbing concrete and asphalt.',
          'warming the surrounding rural areas.',
        ],
        correctIndex: 1,
        explanation:
          '"Trees act as natural air filters, absorbing pollutants such as nitrogen dioxide and particulate matter."',
      },
      {
        id: 8,
        question: 'What is the main problem identified in Paragraph C?',
        choices: [
          'Green spaces are too expensive to maintain.',
          'Sociologists do not understand the benefits of parks.',
          'Parks are mostly concentrated in wealthier neighbourhoods.',
          'Lower-income areas have too many trees.',
        ],
        correctIndex: 2,
        explanation:
          '"Parks are disproportionately located in affluent neighbourhoods, while lower-income areas face a severe deficit."',
      },
    ],
  },
];

// ----- Listening ------------------------------------------------------------
export const LISTENING_LIBRARY: ListeningItem[] = [
  {
    id: 1,
    level: 'A1',
    topic: 'Daily life',
    title: 'Ordering a Coffee',
    transcript:
      'Hello! Good morning. Can I have a coffee, please? Sure. Would you like a small or a large coffee? A large one, please. Would you like milk and sugar? Yes, milk please, but no sugar. Okay. Anything to eat? Just a small piece of chocolate cake, please. That is three dollars and fifty cents. Here you are. Thank you. Have a nice day! You too. Goodbye!',
    questions: [
      {
        id: 1,
        question: 'What size coffee does the customer want?',
        choices: ['Small', 'Medium', 'Large', 'Extra large'],
        correctIndex: 2,
        explanation: '"A large one, please."',
      },
      {
        id: 2,
        question: 'Does the customer want sugar?',
        choices: ['Yes', 'No', 'Only a little', 'They do not say'],
        correctIndex: 1,
        explanation: '"milk please, but no sugar."',
      },
    ],
  },
  {
    id: 2,
    level: 'A1',
    topic: 'Daily life',
    title: 'What Time Is It?',
    transcript:
      'Excuse me, what time is it? It is half past nine. Oh, thank you. Is the library open now? Yes, it opens at nine o\'clock and closes at six in the evening. Great. And where is it? It is next to the post office, on Green Street. Just go straight and turn left. Thank you very much. You are welcome. Have a good day.',
    questions: [
      {
        id: 1,
        question: 'What time is it?',
        choices: ['Nine o\'clock', 'Half past nine', 'Six o\'clock', 'Half past six'],
        correctIndex: 1,
        explanation: '"It is half past nine."',
      },
      {
        id: 2,
        question: 'Where is the library?',
        choices: ['Next to the post office', 'Next to the bank', 'On Blue Street', 'Inside the park'],
        correctIndex: 0,
        explanation: '"It is next to the post office, on Green Street."',
      },
    ],
  },
  {
    id: 3,
    level: 'A2',
    topic: 'Travel',
    title: 'At the Train Station',
    transcript:
      'Good afternoon. I would like a ticket to Manchester, please. Single or return? A return ticket, please. When are you coming back? On Sunday evening. Okay. The next train leaves at two fifteen from platform four. How much is the ticket? It is forty-two pounds. Here is my card. Thank you. Your train arrives in Manchester at four o\'clock. Don\'t forget, the platform can change, so please check the screen. Thank you very much for your help. Have a good journey!',
    questions: [
      {
        id: 1,
        question: 'What kind of ticket does the customer buy?',
        choices: ['A single', 'A return', 'A monthly pass', 'A child ticket'],
        correctIndex: 1,
        explanation: '"A return ticket, please."',
      },
      {
        id: 2,
        question: 'From which platform does the train leave?',
        choices: ['Platform two', 'Platform three', 'Platform four', 'Platform five'],
        correctIndex: 2,
        explanation: '"The next train leaves at two fifteen from platform four."',
      },
      {
        id: 3,
        question: 'What should the customer remember to do?',
        choices: ['Buy food', 'Check the screen for the platform', 'Call a friend', 'Bring a passport'],
        correctIndex: 1,
        explanation: '"the platform can change, so please check the screen."',
      },
    ],
  },
  {
    id: 4,
    level: 'A2',
    topic: 'Work',
    title: 'A Phone Message',
    transcript:
      'Hi, this is a message for Mr Roberts. This is Sandra from the dentist\'s office. I am calling to confirm your appointment on Thursday at three o\'clock. Please remember to arrive ten minutes early to fill in a form. If you need to change the time, please call us back on 555 0192. The office is closed on Wednesday, so please call before then. Thank you, and we look forward to seeing you. Goodbye.',
    questions: [
      {
        id: 1,
        question: 'When is Mr Roberts\'s appointment?',
        choices: ['Wednesday at three', 'Thursday at three', 'Thursday at ten', 'Friday at three'],
        correctIndex: 1,
        explanation: '"your appointment on Thursday at three o\'clock."',
      },
      {
        id: 2,
        question: 'Why should he arrive ten minutes early?',
        choices: ['To pay', 'To fill in a form', 'To park the car', 'To buy a ticket'],
        correctIndex: 1,
        explanation: '"arrive ten minutes early to fill in a form."',
      },
    ],
  },
  {
    id: 5,
    level: 'A2',
    topic: 'Daily life',
    title: 'Making Plans',
    transcript:
      'Hey, are you free this weekend? On Saturday I am busy, but Sunday is good. Great. Do you want to go to the cinema? There is a new comedy film. Sounds fun. What time does it start? The afternoon show is at four o\'clock. Perfect. Should we eat something first? Yes, let\'s meet at the pizza place at two. Okay, I will see you there on Sunday at two. Don\'t be late! I am never late. Well, sometimes you are. See you Sunday!',
    questions: [
      {
        id: 1,
        question: 'Which day are they meeting?',
        choices: ['Saturday', 'Sunday', 'Friday', 'Monday'],
        correctIndex: 1,
        explanation: '"On Saturday I am busy, but Sunday is good."',
      },
      {
        id: 2,
        question: 'What will they do before the film?',
        choices: ['Go shopping', 'Eat pizza', 'Play football', 'Visit a museum'],
        correctIndex: 1,
        explanation: '"let\'s meet at the pizza place at two."',
      },
    ],
  },
  {
    id: 6,
    level: 'B1',
    topic: 'Study',
    title: 'A Library Tour',
    transcript:
      'Welcome, everyone, to the university library. Let me give you a quick tour. On the ground floor, you will find the help desk, the computers, and the printing area. This floor can be a little noisy, so it is fine to talk quietly here. If you need silence, go up to the second floor, which is our quiet study zone. Talking is not allowed there at all. You can borrow up to ten books at a time, and you keep them for three weeks. If you return a book late, there is a small fine of twenty pence per day. To borrow anything, you simply need your student card. Are there any questions before we continue?',
    questions: [
      {
        id: 1,
        question: 'Where is the quiet study zone?',
        choices: ['The ground floor', 'The first floor', 'The second floor', 'The basement'],
        correctIndex: 2,
        explanation: '"go up to the second floor, which is our quiet study zone."',
      },
      {
        id: 2,
        question: 'How many books can you borrow at one time?',
        choices: ['Three', 'Five', 'Ten', 'Twenty'],
        correctIndex: 2,
        explanation: '"You can borrow up to ten books at a time."',
      },
      {
        id: 3,
        question: 'What do you need to borrow books?',
        choices: ['Cash', 'A passport', 'Your student card', 'A library map'],
        correctIndex: 2,
        explanation: '"you simply need your student card."',
      },
    ],
  },
  {
    id: 7,
    level: 'B1',
    topic: 'Environment',
    title: 'A Weather Forecast',
    transcript:
      'And now for the weather. Today will start cloudy across most of the country, with light rain in the north during the morning. By the afternoon, the clouds should clear in the south, and we will see some pleasant sunshine, with temperatures reaching about eighteen degrees. The north will stay cooler, around twelve degrees. Tomorrow, however, brings a change. A band of heavy rain will move in from the west overnight, and strong winds are expected along the coast. If you are planning to travel tomorrow, please take care and allow extra time. The weekend looks much brighter, with dry, sunny weather returning by Saturday.',
    questions: [
      {
        id: 1,
        question: 'What is the weather like in the north this morning?',
        choices: ['Sunny', 'Light rain', 'Snow', 'Fog'],
        correctIndex: 1,
        explanation: '"with light rain in the north during the morning."',
      },
      {
        id: 2,
        question: 'What is expected tomorrow?',
        choices: ['Heavy rain and strong winds', 'Snow everywhere', 'Hot sunshine', 'No change'],
        correctIndex: 0,
        explanation: '"heavy rain will move in... and strong winds are expected along the coast."',
      },
      {
        id: 3,
        question: 'When will sunny weather return?',
        choices: ['Tomorrow', 'By Saturday', 'Next month', 'Tonight'],
        correctIndex: 1,
        explanation: '"dry, sunny weather returning by Saturday."',
      },
    ],
  },
  {
    id: 8,
    level: 'B1',
    topic: 'Culture',
    title: 'A Museum Announcement',
    transcript:
      'Good morning, and welcome to the City History Museum. We would like to remind visitors of a few things to make your visit enjoyable. Photography is welcome in most areas, but please do not use flash, as it can damage the older paintings. The special exhibition on ancient Egypt is on the first floor and requires a separate ticket, which you can buy at the main desk. Our café on the ground floor is open until five o\'clock and serves hot meals and drinks. Finally, please note that the east wing is closed today for cleaning. We hope you enjoy your visit, and our staff in red jackets are always happy to help.',
    questions: [
      {
        id: 1,
        question: 'What are visitors asked not to use?',
        choices: ['Bags', 'Flash photography', 'Phones', 'Pens'],
        correctIndex: 1,
        explanation: '"please do not use flash, as it can damage the older paintings."',
      },
      {
        id: 2,
        question: 'What is true about the Egypt exhibition?',
        choices: ['It is free', 'It needs a separate ticket', 'It is closed', 'It is outside'],
        correctIndex: 1,
        explanation: 'The special exhibition requires a separate ticket.',
      },
    ],
  },
  {
    id: 9,
    level: 'B2',
    topic: 'Technology',
    title: 'A Podcast on Passwords',
    transcript:
      'Welcome back to the show. Today we are talking about online security, and specifically passwords. Now, most of us know we should not use "password" or "123456", yet these are still among the most common passwords in the world. The advice used to be to create something complicated with symbols and numbers, but experts have changed their minds. They now recommend using a passphrase: three or four random words strung together, like "purple turtle window coffee". This is actually much harder for a computer to guess, yet easier for a human to remember. The other golden rule is never to use the same password twice. If one website is hacked, criminals will try that password everywhere else. A password manager can store them all safely, so you only have to remember one.',
    questions: [
      {
        id: 1,
        question: 'What do experts now recommend instead of complicated passwords?',
        choices: ['Short passwords', 'A passphrase of random words', 'Using your name', 'No password at all'],
        correctIndex: 1,
        explanation: 'They recommend a passphrase: three or four random words.',
      },
      {
        id: 2,
        question: 'Why should you not reuse the same password?',
        choices: ['It is too long', 'If one site is hacked, criminals try it elsewhere', 'It is hard to type', 'Websites forbid it'],
        correctIndex: 1,
        explanation: 'If one website is hacked, criminals try that password everywhere else.',
      },
      {
        id: 3,
        question: 'What does a password manager do?',
        choices: ['Deletes passwords', 'Stores them safely so you remember one', 'Shares passwords', 'Changes them daily'],
        correctIndex: 1,
        explanation: 'A password manager stores them all safely, so you only remember one.',
      },
    ],
  },
  {
    id: 10,
    level: 'B2',
    topic: 'Work',
    title: 'A Job Interview Tip',
    transcript:
      'So, you have an interview coming up, and you want to make a strong impression. Here is one tip that many candidates overlook: prepare your own questions to ask the interviewer. At the end of almost every interview, you will be asked, "Do you have any questions for us?" Saying "No, I think you covered everything" is a missed opportunity. Instead, ask something thoughtful, such as what a typical week looks like, or how the team measures success. This shows genuine interest and helps you decide whether the job is right for you. Avoid asking only about salary and holidays in the first interview, as it can seem that you only care about the benefits. Remember, the interview is a two-way conversation, not an exam.',
    questions: [
      {
        id: 1,
        question: 'What tip does the speaker give?',
        choices: ['Arrive late', 'Prepare your own questions to ask', 'Wear bright colours', 'Talk about salary first'],
        correctIndex: 1,
        explanation: '"prepare your own questions to ask the interviewer."',
      },
      {
        id: 2,
        question: 'What should you avoid in a first interview?',
        choices: ['Smiling', 'Asking only about salary and holidays', 'Being polite', 'Asking about the team'],
        correctIndex: 1,
        explanation: '"Avoid asking only about salary and holidays in the first interview."',
      },
    ],
  },
  {
    id: 11,
    level: 'B2',
    topic: 'Travel',
    title: 'An Airport Announcement',
    transcript:
      'May I have your attention, please. This is an announcement for passengers travelling on flight BA204 to New York. We regret to inform you that this flight has been delayed by approximately two hours due to bad weather at the destination. The new departure time is expected to be sixteen forty-five. Passengers are kindly asked to remain in the departure lounge, where regular updates will be provided. We apologise for any inconvenience caused. Passengers holding business-class tickets may use the lounge on the upper floor, where complimentary refreshments are available. Boarding will be announced shortly before departure. Thank you for your patience and understanding.',
    questions: [
      {
        id: 1,
        question: 'Why is the flight delayed?',
        choices: ['A technical fault', 'Bad weather at the destination', 'A strike', 'Too many passengers'],
        correctIndex: 1,
        explanation: '"this flight has been delayed... due to bad weather at the destination."',
      },
      {
        id: 2,
        question: 'How long is the delay?',
        choices: ['About one hour', 'About two hours', 'About four hours', 'No delay'],
        correctIndex: 1,
        explanation: '"delayed by approximately two hours."',
      },
      {
        id: 3,
        question: 'Who can use the upper-floor lounge?',
        choices: ['Everyone', 'Business-class ticket holders', 'Children only', 'Staff only'],
        correctIndex: 1,
        explanation: 'Passengers holding business-class tickets may use the upper-floor lounge.',
      },
    ],
  },
  {
    id: 12,
    level: 'C1',
    topic: 'Environment',
    title: 'A Talk on Food Waste',
    transcript:
      'Let me share a statistic that still astonishes me. Roughly a third of all the food produced in the world is never eaten. It is lost in the fields, spoiled in transport, or simply thrown away in our kitchens. Now, consider what that means. We use enormous quantities of water, land, and energy to grow this food, and all of those resources are wasted along with it. If global food waste were a country, it would be the third-largest producer of greenhouse gases on the planet. The encouraging news is that this is one of the easier problems to tackle. Unlike some environmental challenges, no new technology is required. Planning our shopping, storing food properly, and being a little less fussy about the appearance of fruit and vegetables can make a real difference, both at home and in the supermarket.',
    questions: [
      {
        id: 1,
        question: 'How much of the world\'s food is never eaten?',
        choices: ['About a tenth', 'About a quarter', 'About a third', 'About a half'],
        correctIndex: 2,
        explanation: '"Roughly a third of all the food produced in the world is never eaten."',
      },
      {
        id: 2,
        question: 'What comparison does the speaker make about greenhouse gases?',
        choices: ['Food waste produces none', 'Food waste would be the third-largest producer', 'Food waste is the smallest source', 'Food waste cannot be measured'],
        correctIndex: 1,
        explanation: 'As a country, food waste would be the third-largest producer of greenhouse gases.',
      },
      {
        id: 3,
        question: 'Why is the speaker optimistic about this problem?',
        choices: ['It needs new technology', 'It is impossible to solve', 'No new technology is required', 'Only governments can act'],
        correctIndex: 2,
        explanation: '"Unlike some environmental challenges, no new technology is required."',
      },
    ],
  },
  {
    id: 13,
    level: 'C1',
    topic: 'Culture',
    title: 'A Lecture on Music and Memory',
    transcript:
      'Have you ever heard a song from your teenage years and felt instantly transported back in time? This is not your imagination. Researchers have found that music has a remarkable power to unlock memories, and there are good reasons for this. When we listen to a song, especially during emotional periods of our lives, the brain links the melody to the events and feelings of that moment. Years later, the music acts as a key, reopening those stored experiences. This effect is so strong that it is now being used to help patients with severe memory loss. Even when other memories have faded, a familiar tune can sometimes bring a person back to themselves, allowing them to sing, smile, and reconnect with their past. It is a striking reminder that memory is not stored in neat files, but woven through with emotion and sound.',
    questions: [
      {
        id: 1,
        question: 'Why does music unlock memories?',
        choices: ['It is loud', 'The brain links melody to events and feelings', 'It is repetitive', 'It is always happy'],
        correctIndex: 1,
        explanation: 'The brain links the melody to the events and feelings of that moment.',
      },
      {
        id: 2,
        question: 'How is this effect being used medically?',
        choices: ['To cure deafness', 'To help patients with severe memory loss', 'To teach children maths', 'To lower blood pressure'],
        correctIndex: 1,
        explanation: 'It is used to help patients with severe memory loss reconnect with their past.',
      },
    ],
  },
  {
    id: 14,
    level: 'C1',
    topic: 'Study',
    title: 'Advice on Public Speaking',
    transcript:
      'Most people, when asked about their greatest fears, place public speaking somewhere near the top, often above heights and even, remarkably, death. If that sounds like you, here is the first thing to understand: nerves are not your enemy. That rush of adrenaline you feel is your body preparing you to perform, and experienced speakers learn to channel it rather than fight it. The second piece of advice is perhaps the most useful of all: shift your focus away from yourself and towards your audience. Anxiety thrives when we worry about how we appear. The moment you become genuinely concerned with whether your listeners understand and benefit from your message, much of that self-consciousness falls away. Finally, practise aloud, on your feet, ideally in front of someone. Rehearsing silently in your head is comforting but, unfortunately, almost useless.',
    questions: [
      {
        id: 1,
        question: 'What does the speaker say about nerves?',
        choices: ['They ruin every speech', 'They are not your enemy and can be channelled', 'They should be hidden', 'They mean you should not speak'],
        correctIndex: 1,
        explanation: '"nerves are not your enemy" — experienced speakers channel the adrenaline.',
      },
      {
        id: 2,
        question: 'What is the main way to reduce anxiety, according to the talk?',
        choices: ['Focus on yourself', 'Shift focus to the audience', 'Speak very fast', 'Avoid eye contact'],
        correctIndex: 1,
        explanation: 'Shifting focus towards the audience reduces self-consciousness.',
      },
      {
        id: 3,
        question: 'What does the speaker say about rehearsing silently?',
        choices: ['It is the best method', 'It is comforting but almost useless', 'It is forbidden', 'It is dangerous'],
        correctIndex: 1,
        explanation: '"Rehearsing silently in your head is comforting but, unfortunately, almost useless."',
      },
    ],
  },
  {
    id: 15,
    level: 'C2',
    topic: 'Technology',
    title: 'A Debate on Automation',
    transcript:
      'The argument that machines will take all our jobs is as old as the machines themselves, and it has, so far, been consistently wrong. When automatic looms appeared, weavers protested, yet employment in textiles eventually grew. The pattern recurs: a technology destroys certain tasks while creating others that nobody anticipated. The more interesting question, then, is not whether automation eliminates work, but how it redistributes it, and who bears the cost of the transition. For while economies adjust over decades, individual workers live in years. A coal miner whose job vanishes is unlikely to be consoled by the abstract promise that new roles will emerge somewhere, for someone, eventually. The genuine challenge is therefore less technological than political: how to ensure that the productivity gains, which are real and substantial, are shared in a way that does not leave entire communities stranded by progress they did not choose.',
    questions: [
      {
        id: 1,
        question: 'What historical pattern does the speaker describe?',
        choices: ['Machines always end employment', 'Technology destroys some tasks but creates others', 'Workers never protest', 'No jobs ever change'],
        correctIndex: 1,
        explanation: 'A technology destroys certain tasks while creating others nobody anticipated.',
      },
      {
        id: 2,
        question: 'Why does the speaker mention the coal miner?',
        choices: ['To praise coal', 'To show economies never adjust', 'To show individuals suffer even if economies adjust', 'To recommend mining'],
        correctIndex: 2,
        explanation: 'Economies adjust over decades, but individual workers live in years.',
      },
      {
        id: 3,
        question: 'The speaker says the genuine challenge is mainly:',
        choices: ['Technological', 'Political — how gains are shared', 'Impossible', 'Imaginary'],
        correctIndex: 1,
        explanation: '"The genuine challenge is therefore less technological than political."',
      },
    ],
  },
  {
    id: 16,
    level: 'C2',
    topic: 'Culture',
    title: 'On the Decline of Boredom',
    transcript:
      'There was a time, not so long ago, when waiting was simply part of life. We queued, we sat on trains, we lingered in waiting rooms, and in those idle minutes our minds were left to their own devices. Today, of course, such moments have all but vanished, swallowed by the bright rectangle in our pockets. At first glance, this seems an unambiguous gain. Why endure tedium when entertainment is always to hand? Yet a number of psychologists have begun, somewhat counterintuitively, to mourn the loss of boredom. It was precisely in those undemanding stretches, they argue, that the mind would wander, make unexpected connections, and stumble upon ideas. Creativity, it turns out, is rarely summoned on command; it tends to arrive in the gaps. If that is so, then a life with no room for boredom may be, paradoxically, a life with less room for original thought.',
    questions: [
      {
        id: 1,
        question: 'What has "swallowed" our idle moments?',
        choices: ['Longer working hours', 'The smartphone', 'Public transport', 'Reading'],
        correctIndex: 1,
        explanation: 'Idle moments are "swallowed by the bright rectangle in our pockets" — the phone.',
      },
      {
        id: 2,
        question: 'Why do some psychologists "mourn the loss of boredom"?',
        choices: ['It was relaxing', 'Boredom let the mind wander and find ideas', 'It saved money', 'It was traditional'],
        correctIndex: 1,
        explanation: 'In idle stretches the mind wandered and stumbled upon ideas.',
      },
      {
        id: 3,
        question: 'What is the speaker\'s paradoxical conclusion?',
        choices: ['Boredom is always bad', 'A life with no boredom may have less original thought', 'Phones improve creativity', 'Waiting is pointless'],
        correctIndex: 1,
        explanation: 'A life with no room for boredom may have less room for original thought.',
      },
    ],
  },
  {
    id: 17,
    level: 'A2',
    topic: 'Daily life',
    title: 'A Recipe for Pancakes',
    transcript:
      'Today I will show you how to make simple pancakes. You need flour, milk, one egg, and a little salt. First, put two cups of flour in a bowl. Next, add the egg and slowly pour in the milk while you mix. Keep mixing until there are no lumps. Now heat a pan and add a little oil. Pour some of the mixture into the hot pan. Wait about two minutes, then turn the pancake over. When both sides are golden brown, it is ready. You can eat your pancakes with sugar, fruit, or honey. Enjoy!',
    questions: [
      {
        id: 1,
        question: 'How many eggs do you need?',
        choices: ['One', 'Two', 'Three', 'None'],
        correctIndex: 0,
        explanation: '"You need flour, milk, one egg, and a little salt."',
      },
      {
        id: 2,
        question: 'When is the pancake ready?',
        choices: ['When it is white', 'When both sides are golden brown', 'After ten minutes', 'When it is cold'],
        correctIndex: 1,
        explanation: '"When both sides are golden brown, it is ready."',
      },
    ],
  },
  {
    id: 18,
    level: 'B1',
    topic: 'Work',
    title: 'A Voicemail About a Meeting',
    transcript:
      'Hi Tom, it\'s Rachel. I\'m calling about tomorrow\'s team meeting. There\'s been a small change. We\'re going to move it from ten o\'clock to eleven, because the meeting room is being used in the morning. Also, could you bring the printed copies of the budget report? I tried to print them, but the printer on our floor is broken again. About fifteen copies should be enough. Oh, and Sarah from the design team will join us this time, so we might run a bit longer than usual. Let me know if eleven doesn\'t work for you. Thanks, and see you tomorrow. Bye!',
    questions: [
      {
        id: 1,
        question: 'What time will the meeting now start?',
        choices: ['Nine o\'clock', 'Ten o\'clock', 'Eleven o\'clock', 'Twelve o\'clock'],
        correctIndex: 2,
        explanation: '"move it from ten o\'clock to eleven."',
      },
      {
        id: 2,
        question: 'What does Rachel ask Tom to bring?',
        choices: ['Coffee', 'Printed copies of the budget report', 'His laptop', 'Lunch'],
        correctIndex: 1,
        explanation: '"could you bring the printed copies of the budget report?"',
      },
      {
        id: 3,
        question: 'Why might the meeting run longer?',
        choices: ['The room is small', 'Sarah from design will join', 'The printer is broken', 'It starts late'],
        correctIndex: 1,
        explanation: '"Sarah from the design team will join us... so we might run a bit longer."',
      },
    ],
  },
  // --- IELTS Practice Test 1 — Listening (imported) ---------------------
  {
    id: 19,
    level: 'B2',
    topic: 'Housing',
    title: 'Renting an Apartment',
    transcript:
      'Good morning, City Housing Agency. How can I help you? Hello, I’m calling to ask about renting an apartment near the university. Certainly. Are you looking for a single or a shared apartment? A shared one, please — I’d like to share with one other person. Okay. We have a nice two-bedroom apartment available on Station Road. The rent is 650 dollars per month, which includes water, but electricity is extra. That sounds good. Is it furnished? Yes, it comes with basic furniture, a fridge, and a newly installed microwave. However, you will need to bring your own bed-linen. Great. Is there a bus stop nearby? Yes, the bus stop is just a five-minute walk away, right next to the local supermarket. Perfect. When can I view it? I can show it to you on Thursday afternoon at three o’clock. That works for me. My name is David Smith. Thank you, David. See you on Thursday.',
    questions: [
      {
        id: 1,
        question: 'What type of apartment does the caller want?',
        choices: ['A single apartment', 'A shared apartment', 'A studio apartment', 'A family house'],
        correctIndex: 1,
        explanation: '"A shared one, please — I’d like to share with one other person."',
      },
      {
        id: 2,
        question: 'On which road is the apartment located?',
        choices: ['Station Road', 'Green Road', 'Park Road', 'Main Road'],
        correctIndex: 0,
        explanation: '"We have a nice two-bedroom apartment available on Station Road."',
      },
      {
        id: 3,
        question: 'How much is the monthly rent?',
        choices: ['$560', '$650', '$615', '$660'],
        correctIndex: 1,
        explanation: '"The rent is 650 dollars per month, which includes water."',
      },
      {
        id: 4,
        question: 'Which appliance was recently installed?',
        choices: ['A dishwasher', 'A microwave', 'An oven', 'A washing machine'],
        correctIndex: 1,
        explanation: '"a fridge, and a newly installed microwave."',
      },
      {
        id: 5,
        question: 'What must the tenant provide themselves?',
        choices: ['Furniture', 'A fridge', 'Bed-linen', 'A microwave'],
        correctIndex: 2,
        explanation: '"you will need to bring your own bed-linen."',
      },
      {
        id: 6,
        question: 'Which utility is included in the rent?',
        choices: ['Electricity', 'Water', 'Internet'],
        correctIndex: 1,
        explanation: '"which includes water, but electricity is extra."',
      },
      {
        id: 7,
        question: 'What is located right next to the bus stop?',
        choices: ['The university', 'The apartment building', 'A supermarket'],
        correctIndex: 2,
        explanation: '"the bus stop is just a five-minute walk away, right next to the local supermarket."',
      },
      {
        id: 8,
        question: 'When is the apartment viewing scheduled?',
        choices: ['Tuesday afternoon', 'Thursday afternoon', 'Friday afternoon'],
        correctIndex: 1,
        explanation: '"I can show it to you on Thursday afternoon at three o’clock."',
      },
    ],
  },
];

// ----- Writing --------------------------------------------------------------
export const WRITING_LIBRARY: WritingItem[] = [
  {
    id: 1,
    level: 'A1',
    topic: 'Daily life',
    title: 'Introduce Yourself',
    prompt: 'Write a short paragraph introducing yourself to a new classmate.',
    points: [
      'Say your name and where you are from.',
      'Say how old you are or what you do.',
      'Mention one hobby you enjoy.',
    ],
    modelAnswer:
      'Hello! My name is Lena and I am from Spain. I am twenty years old and I am a student. I study art at college. In my free time, I like drawing and listening to music. I also enjoy walking with my dog in the park. I am happy to meet you, and I hope we can be friends. What is your name and where are you from?',
  },
  {
    id: 2,
    level: 'A1',
    topic: 'Travel',
    title: 'A Postcard',
    prompt: 'Write a short postcard to a friend while you are on holiday.',
    points: [
      'Say where you are.',
      'Describe the weather.',
      'Say what you are doing.',
    ],
    modelAnswer:
      'Dear Sam, I am in Italy! The weather is sunny and very warm. The food here is delicious, and I eat pizza every day. Today I am at the beach with my family. The sea is blue and clean. Tomorrow we will visit an old castle. I am having a great time, but I miss you. See you soon! Love, Mia.',
  },
  {
    id: 3,
    level: 'A2',
    topic: 'Daily life',
    title: 'My Weekend',
    prompt: 'Write about what you did last weekend.',
    points: [
      'Say what you did on Saturday.',
      'Say what you did on Sunday.',
      'Say how you felt about the weekend.',
    ],
    modelAnswer:
      'Last weekend was busy but fun. On Saturday morning, I cleaned my room and did some shopping. In the afternoon, I met my friends at a café, and we talked for hours. On Sunday, I stayed at home because it was raining. I cooked a big lunch for my family and then watched two films on the sofa. In the evening, I read a book and went to bed early. It was a relaxing weekend, and I felt ready for the new week.',
  },
  {
    id: 4,
    level: 'A2',
    topic: 'Work',
    title: 'An Email to a Colleague',
    prompt: 'Write a short email to a colleague to ask for help with a task.',
    points: [
      'Greet your colleague politely.',
      'Explain what you need help with.',
      'Suggest a time to meet and thank them.',
    ],
    modelAnswer:
      'Hi Daniel, I hope you are well. I am working on the monthly sales report, but I am not sure how to use the new system. You explained it last week, and I think you understand it better than I do. Could you help me for about twenty minutes? Maybe we could meet tomorrow after lunch, around two o\'clock. Please let me know if that time is okay for you. Thank you very much for your help. Best wishes, Anna.',
  },
  {
    id: 5,
    level: 'B1',
    topic: 'Technology',
    title: 'Phones in the Classroom',
    prompt: 'Some schools ban mobile phones in class. Write a short text giving your opinion.',
    points: [
      'State whether you agree or disagree.',
      'Give one reason to support your view.',
      'Mention the other side and give a conclusion.',
    ],
    modelAnswer:
      'In my opinion, banning mobile phones in class is a good idea. The main reason is that phones are very distracting. When a phone buzzes, students stop listening and check their messages, so they miss important information. Without phones, students pay more attention and learn better. Of course, some people argue that phones can be useful tools for research and quick translations. This is true, but teachers can allow phones only for special tasks. Overall, I believe a general ban, with a few exceptions, helps students concentrate and makes the classroom calmer.',
  },
  {
    id: 6,
    level: 'B1',
    topic: 'Environment',
    title: 'Helping the Environment',
    prompt: 'Write about three things people can do to protect the environment.',
    points: [
      'Describe one thing to do at home.',
      'Describe one thing to do when travelling.',
      'Describe one thing to do when shopping.',
    ],
    modelAnswer:
      'There are many simple things we can do to protect the environment. At home, we can save energy by switching off lights when we leave a room and by not wasting water. This is easy and also saves money. When travelling, we can walk, cycle, or take public transport instead of driving everywhere. This reduces pollution and keeps us healthy. Finally, when we go shopping, we can bring our own bags and choose products with less plastic packaging. If everyone makes these small changes, together we can make a big difference for the planet.',
  },
  {
    id: 7,
    level: 'B2',
    topic: 'Study',
    title: 'Studying Abroad',
    prompt: 'Discuss the advantages and disadvantages of studying in another country.',
    points: [
      'Describe two clear advantages.',
      'Describe one or two disadvantages.',
      'Give a balanced conclusion.',
    ],
    modelAnswer:
      'Studying abroad has become increasingly popular, and it offers significant benefits. Firstly, it is an excellent way to learn a language, since students are surrounded by it every day and must use it constantly. Secondly, living in a foreign country builds independence and confidence; far from home, students learn to solve problems and adapt to new situations on their own. However, there are also drawbacks. The cost can be very high, including tuition, accommodation, and travel. In addition, some students suffer from homesickness and may feel lonely at first. On balance, though, I believe the advantages outweigh the disadvantages. The skills and experiences gained abroad often shape a person for life, making the challenges well worth facing.',
  },
  {
    id: 8,
    level: 'B2',
    topic: 'Work',
    title: 'The Four-Day Week',
    prompt: 'Some companies are introducing a four-day working week. Discuss whether this is a good idea.',
    points: [
      'Explain the possible benefits for workers.',
      'Explain the possible benefits or risks for companies.',
      'State your own opinion clearly.',
    ],
    modelAnswer:
      'The idea of a four-day working week is attracting growing interest, and for good reason. For workers, the most obvious benefit is an improved work-life balance. An extra day off allows people to rest, spend time with family, or pursue hobbies, which can reduce stress and prevent burnout. For companies, the picture is more complex. Some fear that less time will mean less output, yet several trials have shown the opposite: well-rested employees are often more focused and productive. There are risks, of course, particularly for businesses that must serve customers five or more days a week. In my view, the four-day week is a promising idea that deserves serious testing. While it may not suit every industry, the evidence so far suggests that fewer, more focused hours can benefit both employees and employers alike.',
  },
  {
    id: 9,
    level: 'B2',
    topic: 'Culture',
    title: 'A Film Review',
    prompt: 'Write a review of a film you have seen recently for a website.',
    points: [
      'Briefly describe the story without spoilers.',
      'Comment on the acting and the visuals.',
      'Recommend the film, or not, and explain why.',
    ],
    modelAnswer:
      'Last weekend I watched a film called "The Long Road Home", and I am still thinking about it. The story follows a young woman who travels across the country to find her grandmother\'s old house, meeting unforgettable characters along the way. I will not reveal the ending, but it is both surprising and moving. The acting is outstanding, especially the lead performance, which feels completely genuine. The visuals are equally impressive; the wide shots of the countryside are simply beautiful. If I had one criticism, it would be that the middle section is a little slow. Even so, I would strongly recommend this film to anyone who enjoys a thoughtful, emotional story. It is the kind of film that stays with you long after the credits roll.',
  },
  {
    id: 10,
    level: 'C1',
    topic: 'Technology',
    title: 'Social Media and Society',
    prompt: 'To what extent has social media improved the way we communicate? Discuss.',
    points: [
      'Acknowledge the genuine benefits of social media.',
      'Examine the drawbacks and unintended consequences.',
      'Reach a nuanced, well-supported conclusion.',
    ],
    modelAnswer:
      'Few inventions have transformed daily communication as profoundly as social media, yet whether that transformation represents an improvement is far from straightforward. On the positive side, these platforms have collapsed distance, enabling friends and families separated by oceans to share their lives almost instantly. They have also given a voice to those once excluded from public debate, allowing movements to form and ideas to spread with remarkable speed. Nevertheless, the same tools carry real costs. The pressure to present a flawless life can damage self-esteem, while algorithms that reward outrage often deepen division rather than understanding. Moreover, the sheer volume of communication can feel hollow, substituting frequent contact for genuine connection. In conclusion, social media has undeniably expanded how and with whom we communicate, but quantity is not the same as quality. Whether it improves communication ultimately depends less on the technology itself than on the discipline and intention with which we choose to use it.',
  },
  {
    id: 11,
    level: 'C1',
    topic: 'Environment',
    title: 'Individual Action vs. Government Action',
    prompt: 'Some argue that fighting climate change is the responsibility of governments, not individuals. Discuss this view.',
    points: [
      'Present the argument that governments hold the real power.',
      'Present the argument that individual action also matters.',
      'Offer your own reasoned position.',
    ],
    modelAnswer:
      'When it comes to climate change, a common debate concerns where responsibility truly lies. Those who emphasise government action make a compelling case. Only governments can pass laws, regulate industries, and invest in clean energy on the scale the crisis demands; the choices of a single household are negligible by comparison. From this perspective, focusing on individual behaviour can even be a distraction, conveniently shifting blame away from the most powerful actors. Yet to dismiss individual action entirely seems mistaken. Personal choices, when multiplied across millions, do influence markets, and, just as importantly, they shape the culture and political pressure that ultimately push governments to act. The two are not rivals but partners. My own view is that the dichotomy itself is false. Meaningful progress will require bold policy and engaged citizens reinforcing one another. To insist on one while neglecting the other is to misunderstand how social change has always occurred.',
  },
  {
    id: 12,
    level: 'C2',
    topic: 'Culture',
    title: 'The Value of the Humanities',
    prompt: 'In an age dominated by science and technology, are subjects such as literature, history and philosophy still worth studying? Argue your case.',
    points: [
      'Address the practical case against the humanities.',
      'Build a persuasive case for their enduring value.',
      'Conclude with a confident, sophisticated position.',
    ],
    modelAnswer:
      'It has become almost fashionable to question the worth of the humanities. In a world that prizes measurable outcomes and technical skill, subjects such as literature, history and philosophy can appear, to the impatient eye, as pleasant luxuries we can no longer afford. The argument is not without force: a degree in engineering yields a tangible product in a way that an essay on a forgotten poet does not. And yet this view rests on an impoverished notion of value. The humanities do not teach us how to build a bridge; they teach us why a bridge might be worth building, and for whom. They cultivate the capacity to interpret evidence, to weigh competing claims, and to imagine experiences unlike our own, faculties indispensable to any functioning democracy. Technology, moreover, poses questions it cannot itself answer: what is a good life, what do we owe one another, where lie the limits of what we ought to do. To abandon the disciplines that have wrestled with such questions for millennia would not be a triumph of progress but an act of collective forgetting. The humanities endure, then, not in spite of our technological age, but precisely because of it.',
  },
  {
    id: 13,
    level: 'A2',
    topic: 'Travel',
    title: 'A Place I Want to Visit',
    prompt: 'Write about a place you would like to visit in the future.',
    points: [
      'Say which place you want to visit.',
      'Explain why you want to go there.',
      'Say what you would do there.',
    ],
    modelAnswer:
      'One day, I would like to visit Japan. I want to go there because I love the culture, the food, and the beautiful gardens. I have seen many photos of Tokyo at night, and the bright lights look amazing. First, I would visit the famous temples in Kyoto, which are very old and peaceful. Then I would try real Japanese food, like sushi and ramen. I would also like to see the cherry blossom trees in spring. I hope I can save enough money to travel to Japan in a few years. It is my dream trip.',
  },
  {
    id: 14,
    level: 'B1',
    topic: 'Daily life',
    title: 'A Complaint Email',
    prompt: 'You bought a product online that arrived damaged. Write an email to the company.',
    points: [
      'Explain what you bought and when.',
      'Describe the problem clearly.',
      'Say what you want the company to do.',
    ],
    modelAnswer:
      'Dear Customer Service, I am writing to complain about an order I received from your website. On 3 May, I bought a blue coffee machine, with the order number 48217. Unfortunately, when the package arrived two days ago, the machine was damaged. The glass jug was broken, and there were cracks on the side of the box. I was very disappointed, because I paid for next-day delivery and the product was expensive. I would like you to send me a new coffee machine as soon as possible, or give me a full refund. Please reply to this email and tell me how you will solve this problem. I look forward to your response. Yours faithfully, James Carter.',
  },
];

// ----- Speaking -------------------------------------------------------------
export const SPEAKING_LIBRARY: SpeakingItem[] = [
  {
    id: 1,
    level: 'A1',
    topic: 'Daily life',
    title: 'Talk About Your Family',
    prompt: 'Tell me about your family. Who is in your family?',
    modelAnswer:
      'There are four people in my family: my mother, my father, my sister, and me. My mother is a teacher and my father works in a shop. My sister is younger than me. She is twelve years old. We have a cat called Milo. I love my family very much. At the weekend, we eat dinner together and play games.',
    tips: [
      'Start with: "There are ... people in my family."',
      'Use simple jobs: "My mother is a ... / My father works in a ..."',
      'Describe ages: "My brother is ... years old."',
      'End with a feeling: "I love my family very much."',
    ],
  },
  {
    id: 2,
    level: 'A1',
    topic: 'Daily life',
    title: 'Your Daily Routine',
    prompt: 'What do you do every day? Describe your typical day.',
    modelAnswer:
      'Every day, I get up at seven o\'clock. I have breakfast and then I go to work by bus. I start work at nine and finish at five. In the evening, I cook dinner and watch television. Sometimes I call my friends. I go to bed at about eleven o\'clock. On weekends, I sleep more and relax at home.',
    tips: [
      'Use time words: "First, ... Then, ... After that, ..."',
      'Say times: "I get up at seven o\'clock."',
      'Use the present simple: "I go, I have, I start."',
      'Add a weekend sentence to show contrast.',
    ],
  },
  {
    id: 3,
    level: 'A2',
    topic: 'Travel',
    title: 'Describe a Holiday',
    prompt: 'Tell me about a holiday you enjoyed. Where did you go and what did you do?',
    modelAnswer:
      'Last summer, I went to the seaside with my best friend. We stayed in a small hotel near the beach for one week. Every morning, we swam in the sea and lay in the sun. In the afternoons, we explored the old town and ate ice cream. One evening, we took a boat trip and saw a beautiful sunset. The weather was warm and the people were friendly. It was a wonderful holiday, and I would love to go back.',
    tips: [
      'Use the past simple: "I went, I stayed, we swam."',
      'Set the scene: "Last summer, I went to ..."',
      'Describe activities in order: morning, afternoon, evening.',
      'Finish with an opinion: "It was a wonderful holiday."',
    ],
  },
  {
    id: 4,
    level: 'A2',
    topic: 'Daily life',
    title: 'Your Favourite Food',
    prompt: 'What is your favourite food? Describe it and say why you like it.',
    modelAnswer:
      'My favourite food is pasta, especially with tomato sauce and cheese. I like it because it is delicious and easy to make. My grandmother taught me how to cook it when I was young, so it reminds me of her. I usually eat pasta once a week, often on Sundays. I also enjoy adding fresh vegetables and a little garlic. For me, a warm bowl of pasta is the perfect comfort food after a long day.',
    tips: [
      'State your choice clearly: "My favourite food is ..."',
      'Give reasons with "because": "I like it because ..."',
      'Add a personal memory to make it interesting.',
      'Say how often you eat it: "I usually eat it ..."',
    ],
  },
  {
    id: 5,
    level: 'B1',
    topic: 'Work',
    title: 'Describe Your Job or Studies',
    prompt: 'Tell me about your job or what you are studying. What do you like about it?',
    modelAnswer:
      'I am currently studying computer science at university. I chose this subject because I have always been curious about how technology works. A typical day involves attending lectures, working on coding projects, and meeting my study group in the library. What I enjoy most is solving problems; when a program finally works after hours of effort, the feeling is fantastic. The course can be challenging, especially around exam time, but it is very rewarding. In the future, I hope to work as a software developer for a company that builds useful apps.',
    tips: [
      'Use the present continuous for current studies: "I am studying ..."',
      'Explain your reasons: "I chose this because ..."',
      'Describe a typical day to add detail.',
      'Mention the future: "In the future, I hope to ..."',
    ],
  },
  {
    id: 6,
    level: 'B1',
    topic: 'Technology',
    title: 'Technology in Your Life',
    prompt: 'How do you use technology in your daily life? Is it helpful or a problem?',
    modelAnswer:
      'Technology plays a big role in my daily life. I use my phone to check messages, read the news, and find my way around the city with maps. For studying, I watch online videos and use apps to learn new words. In general, I think technology is very helpful because it saves time and connects me with friends who live far away. However, it can also be a problem. Sometimes I spend too long scrolling on social media and waste time. To avoid this, I try to turn off notifications in the evening so that I can relax properly.',
    tips: [
      'Give specific examples: "I use my phone to ..."',
      'Balance your answer: mention both good and bad sides.',
      'Use linking words: "However, ... In general, ..."',
      'Suggest a solution to show deeper thinking.',
    ],
  },
  {
    id: 7,
    level: 'B2',
    topic: 'Environment',
    title: 'Discuss Environmental Problems',
    prompt: 'What do you think is the most serious environmental problem today, and what can be done about it?',
    modelAnswer:
      'In my opinion, one of the most serious environmental problems we face is air pollution, particularly in large cities. Traffic and factories release harmful gases that damage people\'s health and contribute to climate change. The consequences are serious, ranging from breathing problems to a warmer planet. However, I believe there are practical solutions. Governments could invest more in clean public transport and encourage cycling by building safe bike lanes. On a personal level, people can choose to drive less and support companies that act responsibly. While no single action will solve the problem overnight, a combination of political will and individual effort could make a real difference over time.',
    tips: [
      'State your choice and justify it: "one of the most serious problems is ..."',
      'Explain causes and consequences clearly.',
      'Offer solutions at two levels: government and individual.',
      'Use cautious language: "could", "might", "a combination of ..."',
    ],
  },
  {
    id: 8,
    level: 'B2',
    topic: 'Culture',
    title: 'Traditions and Change',
    prompt: 'Are traditions important, or should societies move on from them? Give your view.',
    modelAnswer:
      'This is a question I find genuinely interesting, because I can see both sides. On the one hand, traditions are valuable. They give people a sense of identity and belonging, connecting us to our ancestors and to one another. Festivals, family customs, and local food all make life richer and more meaningful. On the other hand, some traditions can hold a society back, especially if they are unfair or no longer make sense in the modern world. The key, I think, is balance. Societies should respect and preserve the traditions that bring people together, while having the courage to let go of those that cause harm. In short, tradition and progress do not have to be enemies; the best path keeps what is good and gently updates the rest.',
    tips: [
      'Signal a balanced view: "I can see both sides."',
      'Use "On the one hand ... On the other hand ..."',
      'Give concrete examples of traditions.',
      'Reach a clear personal conclusion.',
    ],
  },
  {
    id: 9,
    level: 'C1',
    topic: 'Study',
    title: 'The Purpose of Education',
    prompt: 'What do you think is the main purpose of education? Should it prepare people for jobs, or develop them as individuals?',
    modelAnswer:
      'It is tempting to frame education as a choice between two goals: equipping people for the workplace or nurturing them as rounded individuals. In reality, I would argue that this is a false opposition. Of course, education must give people the practical skills they need to earn a living; ignoring employability would be naive, particularly for those who cannot rely on family wealth. Yet to reduce education to mere job training is to miss its deeper purpose. A good education should teach people to think critically, to question assumptions, and to appreciate ideas beyond their immediate usefulness. These very qualities, ironically, are also what employers increasingly value, since the jobs of the future will reward adaptability over narrow expertise. Ultimately, the most successful education does both at once: it opens the mind while also opening doors.',
    tips: [
      'Challenge the question: "this is a false opposition."',
      'Concede the practical point before developing your own.',
      'Use sophisticated linkers: "Yet", "Ultimately", "ironically".',
      'Tie the two ideas together in your conclusion.',
    ],
  },
  {
    id: 10,
    level: 'C1',
    topic: 'Technology',
    title: 'Artificial Intelligence',
    prompt: 'How do you feel about the rapid development of artificial intelligence? Are you optimistic or concerned?',
    modelAnswer:
      'My feelings about artificial intelligence are, I admit, a mixture of excitement and caution. On the optimistic side, the potential benefits are enormous. AI is already helping doctors detect diseases earlier, assisting scientists in their research, and freeing ordinary people from tedious, repetitive tasks. Used wisely, it could dramatically improve the quality of countless lives. At the same time, I would be foolish to ignore the risks. There are legitimate concerns about jobs being displaced, about bias being built into important decisions, and about powerful tools falling into the wrong hands. What reassures me, ultimately, is that these outcomes are not predetermined; they depend on the choices we make. The technology itself is neutral. The crucial task, therefore, is to put in place sensible rules and a strong sense of responsibility before the technology races too far ahead of our ability to govern it.',
    tips: [
      'Acknowledge mixed feelings to sound balanced and natural.',
      'Give concrete examples of both benefits and risks.',
      'Use hedging language: "There are legitimate concerns ..."',
      'End by stressing human responsibility and choice.',
    ],
  },
  {
    id: 11,
    level: 'C2',
    topic: 'Culture',
    title: 'The Role of Art',
    prompt: 'Some say art is a luxury; others say it is essential to human life. What is your view?',
    modelAnswer:
      'The notion that art is a mere luxury, pleasant but ultimately dispensable, strikes me as one of those tidy claims that dissolve under scrutiny. It is true that no one ever starved for want of a symphony, and in moments of genuine crisis, bread will always come before ballet. Yet to conclude from this that art is inessential is to confuse the urgent with the important. Consider that no human society, however impoverished, has ever existed without it: the cave paintings of our distant ancestors predate the wheel. Art is how we make sense of suffering, celebrate joy, and communicate what plain language cannot reach. It is the means by which a culture remembers itself and a stranger glimpses a life unlike his own. Far from being a decorative extra, art is among the deepest expressions of what it means to be human. We may survive without it, but I doubt we would remain entirely ourselves.',
    tips: [
      'Open by questioning the premise of the prompt.',
      'Concede a partial truth before dismantling it.',
      'Use vivid, memorable examples: "cave paintings predate the wheel."',
      'Close with a quotable, resonant final line.',
    ],
  },
  {
    id: 12,
    level: 'C2',
    topic: 'Work',
    title: 'Success and Its Meaning',
    prompt: 'How do you define success? Has society\'s definition of success changed?',
    modelAnswer:
      'Success is one of those words we invoke constantly yet rarely pause to examine. Conventionally, it is measured in the familiar currencies of wealth, status, and professional advancement, and I would not pretend these things are unimportant; financial security buys freedom, and recognition can be deeply satisfying. And yet, defined solely in these terms, success has a way of receding the moment we approach it, since there is always more to acquire and someone further ahead. For that reason, I am drawn to a quieter definition: success as the alignment between how one lives and what one genuinely values. By that measure, a person of modest means who spends their days meaningfully may be more successful than a wealthy executive who feels hollow. I do sense that society is slowly rediscovering this older wisdom, as a generation worn down by relentless striving begins to ask not merely how to get ahead, but what, in the end, getting ahead is actually for.',
    tips: [
      'Examine the word itself before answering.',
      'Acknowledge conventional success fairly before reframing it.',
      'Offer your own richer definition with a vivid contrast.',
      'Comment on how society\'s view is shifting to add depth.',
    ],
  },
];
