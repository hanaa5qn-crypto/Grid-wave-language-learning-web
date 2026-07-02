// =============================================================================
// Vivid Lingua — English track · IELTS listening expansion, set B (B1–B2)
// -----------------------------------------------------------------------------
// 30 new listening items for the B1–B2 band, ids 141–175 (15 × B1, 15 × B2).
// Transcripts are written in British English for Azure neural voice
// en-GB-SoniaNeural and follow IELTS Section 2/3 conventions: announcements,
// guided tours, orientation talks, and dialogues (speaker turns marked with
// "—"). Not merged into any library index — import directly where needed.
// =============================================================================
import type { ListeningItem } from '../types';

export const IELTS_EXP_LISTENING_B: ListeningItem[] = [
  {
    id: 141,
    level: 'B1',
    topic: 'Community',
    title: 'Volunteering at an Animal Shelter',
    transcript:
      "Good morning, everyone, and welcome to Willow Farm Animal Shelter. My name's Grace, and I'll be showing you around today. We currently look after forty-two dogs and about thirty cats, so there's always plenty to do. Your shift was originally going to start at nine, but because of the vet's visit this morning, we've moved it to half past nine instead. Please wear the blue apron by the entrance — that identifies you as a volunteer. Your main jobs will be feeding the animals, cleaning the kennels, and walking the dogs in pairs, never alone, for safety reasons. We ask new volunteers to commit to at least three months, because the animals need consistency. If you have questions during the tour, just raise your hand. Let's start with the cat room, through this door on the left.",
    questions: [
      {
        id: 1,
        question: "What time will today's shift actually begin?",
        choices: ['Half past nine', "Nine o'clock", "Ten o'clock", 'Half past ten'],
        correctIndex: 0,
        explanation: "\"we've moved it to half past nine instead\"",
      },
      {
        id: 2,
        question: 'Why should dogs always be walked in pairs, according to Grace?',
        choices: ['Because they misbehave alone', 'For safety reasons', "Because there aren't enough leads", 'Because it is shelter policy for new dogs only'],
        correctIndex: 1,
        explanation: '"walking the dogs in pairs, never alone, for safety reasons."',
      },
      {
        id: 3,
        question: 'What is the minimum length of time new volunteers must commit to?',
        choices: ['One month', 'Six weeks', 'Three months', 'One year'],
        correctIndex: 2,
        explanation: '"We ask new volunteers to commit to at least three months"',
      },
    ],
  },
  {
    id: 142,
    level: 'B1',
    topic: 'Careers',
    title: 'A Campus Job Fair Announcement',
    transcript:
      "Attention, students! The Autumn Job Fair will now take place in the Sports Hall, not the Library as originally printed on your timetable, because of expected high numbers. Over sixty companies will be attending, including three major banks and several tech start-ups. Doors open at eleven o'clock, though we recommend arriving by half past ten to avoid the queue. Bring at least five copies of your CV and dress smartly, as some employers will conduct short interviews on the spot. There's a free workshop on writing cover letters at ten, in Room 4B, for anyone who wants extra preparation. Refreshments will be provided throughout the afternoon, and the event finishes at four. Remember, your student card is required for entry, so don't leave it in your room. We hope to see you all there!",
    questions: [
      {
        id: 1,
        question: 'Where will the job fair now be held?',
        choices: ['The Library', 'Room 4B', 'The main hall', 'The Sports Hall'],
        correctIndex: 3,
        explanation: '"The Autumn Job Fair will now take place in the Sports Hall, not the Library as originally printed"',
      },
      {
        id: 2,
        question: 'How many copies of their CV should students bring?',
        choices: ['At least five', 'At least three', 'Exactly ten', 'Only one'],
        correctIndex: 0,
        explanation: '"Bring at least five copies of your CV"',
      },
      {
        id: 3,
        question: 'What is required for entry to the job fair?',
        choices: ['A printed invitation', 'A student card', 'A completed CV', 'A workshop ticket'],
        correctIndex: 1,
        explanation: '"your student card is required for entry"',
      },
    ],
  },
  {
    id: 143,
    level: 'B1',
    topic: 'Finance',
    title: 'Opening a Bank Account',
    transcript:
      "— Good afternoon, Riverside Bank, how can I help? — Hi, I'd like to open a student account, please. — Of course. Are you currently enrolled at a university? — Yes, I started at Denton College last month. — Great, then you'll qualify for our student account with no monthly fee. We'll also need proof of address — a recent utility bill or a letter from your college will do. — I only have my college letter with me. — That's fine, we accept that. Originally we'd ask you to come into a branch, but you can now upload documents through our app instead. — Oh, that's much easier. How long does approval usually take? — Normally about three working days, though it can occasionally take up to a week. — Perfect, thank you. — You're welcome. We'll email you the link shortly.",
    questions: [
      {
        id: 1,
        question: 'What document does the caller use as proof of address?',
        choices: ['A utility bill', 'A bank statement', 'A letter from her college', 'A passport'],
        correctIndex: 2,
        explanation: '"I only have my college letter with me. — That\'s fine, we accept that."',
      },
      {
        id: 2,
        question: 'How can the caller now submit her documents?',
        choices: ['By post', 'In person at a branch', 'By fax', "Through the bank's app"],
        correctIndex: 3,
        explanation: "\"Originally we'd ask you to come into a branch, but you can now upload documents through our app instead.\"",
      },
      {
        id: 3,
        question: 'How long does approval usually take?',
        choices: ['About three working days', 'One working day', 'Two weeks', 'Immediately'],
        correctIndex: 0,
        explanation: '"Normally about three working days, though it can occasionally take up to a week."',
      },
    ],
  },
  {
    id: 144,
    level: 'B1',
    topic: 'Transport',
    title: 'A Podcast on Cycling to Work',
    transcript:
      "Welcome back to Everyday Green, the podcast about small changes that make a big difference. Today I want to talk about cycling to work. I started six months ago, mostly because parking near my office had become impossible to find. At first, I only cycled twice a week, but now I do it almost every day, rain or shine. The journey takes about twenty-five minutes, which is actually quicker than the bus during rush hour. I invested in a good waterproof jacket, and honestly, that made the biggest difference to my comfort. Some people worry about safety, and I understand that — busy roads can feel frightening at first. My advice is to start with quieter routes and build confidence gradually. It's also worth checking whether your workplace offers a bike-to-work scheme, since mine covered half the cost of my bicycle.",
    questions: [
      {
        id: 1,
        question: 'Why did the speaker start cycling to work?',
        choices: ['To save money on the bus', 'Parking near the office had become impossible to find', 'Her doctor recommended more exercise', 'Her workplace made it compulsory'],
        correctIndex: 1,
        explanation: '"mostly because parking near my office had become impossible to find"',
      },
      {
        id: 2,
        question: "What made the biggest difference to the speaker's comfort?",
        choices: ['A new bicycle', 'Choosing a quieter route', 'A good waterproof jacket', 'Cycling only twice a week'],
        correctIndex: 2,
        explanation: '"I invested in a good waterproof jacket, and honestly, that made the biggest difference to my comfort."',
      },
      {
        id: 3,
        question: "What did the speaker's workplace scheme cover?",
        choices: ['The full cost of a bicycle', 'Waterproof clothing', 'Bus fares', "Half the cost of the speaker's bicycle"],
        correctIndex: 3,
        explanation: '"mine covered half the cost of my bicycle"',
      },
    ],
  },
  {
    id: 145,
    level: 'B1',
    topic: 'Travel',
    title: 'A Guided Walking Tour of the Old Town',
    transcript:
      "Welcome to the Old Town walking tour. My name is Daniel, and over the next ninety minutes I'll show you some of the city's oldest buildings. We were planning to begin at the cathedral, but it's closed for restoration this week, so instead we'll start here, at the old market square, which dates back to the fourteenth century. Notice the clock tower on your right — it's been keeping time for the town for over three hundred years. As we walk, please stay on the pavement, since the cobblestones can be slippery when wet. We'll pass the old prison, now a small museum, and finish at the riverside gardens, where you're welcome to take photographs. The tour is free, but donations for the local heritage fund are appreciated. If anyone needs to rest, just let me know and we can slow down.",
    questions: [
      {
        id: 1,
        question: 'Why does the tour not begin at the cathedral?',
        choices: ["It's closed for restoration", "It's too far away", 'It opens later in the day', "Photography isn't allowed there"],
        correctIndex: 0,
        explanation: "\"We were planning to begin at the cathedral, but it's closed for restoration this week\"",
      },
      {
        id: 2,
        question: 'What should visitors be careful of on the tour?',
        choices: ['Traffic near the market square', 'Slippery cobblestones when wet', 'Pickpockets near the prison', 'Steep steps at the clock tower'],
        correctIndex: 1,
        explanation: '"the cobblestones can be slippery when wet"',
      },
      {
        id: 3,
        question: 'How much does the tour cost?',
        choices: ['Ten pounds', 'Five pounds, payable at the start', 'It is free, though donations are appreciated', 'Fifteen pounds for adults'],
        correctIndex: 2,
        explanation: '"The tour is free, but donations for the local heritage fund are appreciated."',
      },
    ],
  },
  {
    id: 146,
    level: 'B1',
    topic: 'Travel',
    title: 'Renting a Car',
    transcript:
      "— Sunshine Car Hire, good morning. — Hello, I'd like to rent a car for next weekend. — Certainly. What dates were you thinking? — Saturday the eleventh to Monday the thirteenth. — We have a small hatchback available for thirty-five pounds a day, or a family car for fifty. — I'll take the hatchback, please. Is insurance included? — Basic insurance is included, but there's an extra charge of eight pounds a day for full cover, which I'd recommend. — Okay, I'll add that. I originally wanted to collect the car from the airport, but could I pick it up from the city centre branch instead? — Yes, that's no problem at all, and it's actually a bit cheaper too. — Great. What do I need to bring? — Just your driving licence and a credit card for the deposit. — Perfect, thank you very much.",
    questions: [
      {
        id: 1,
        question: 'How much extra does full insurance cover cost per day?',
        choices: ['Thirty-five pounds', 'Fifty pounds', 'Free of charge', 'Eight pounds'],
        correctIndex: 3,
        explanation: '"there\'s an extra charge of eight pounds a day for full cover"',
      },
      {
        id: 2,
        question: 'Where will the customer now collect the car?',
        choices: ['The city centre branch', 'The airport', 'Her home address', 'The train station'],
        correctIndex: 0,
        explanation: "\"could I pick it up from the city centre branch instead? — Yes, that's no problem at all\"",
      },
      {
        id: 3,
        question: 'What must the customer bring when collecting the car?',
        choices: ['Only a credit card', 'A driving licence and a credit card', 'A passport and cash', 'Proof of address'],
        correctIndex: 1,
        explanation: '"Just your driving licence and a credit card for the deposit."',
      },
    ],
  },
  {
    id: 147,
    level: 'B1',
    topic: 'Environment',
    title: 'A Talk on Recycling at Home',
    transcript:
      "Thanks for coming to tonight's session on household recycling. Many people think recycling is complicated, but really it comes down to a few simple habits. First, always rinse containers before putting them in the recycling bin — food residue can contaminate an entire batch. Second, remember that not all plastics are the same; check the small number inside the triangle symbol, because only certain types are accepted by our local council. Paper and cardboard should be kept dry and flattened to save space. Glass, interestingly, can be recycled endlessly without losing quality, which isn't true of plastic. If you're unsure about an item, our council website has a searchable list. Collection day in this area was recently changed from Tuesday to Thursday, so please check your calendar. Finally, composting food waste can reduce your general rubbish by almost a third.",
    questions: [
      {
        id: 1,
        question: 'What should be done to containers before recycling them?',
        choices: ['They should be crushed', 'They should be labelled', 'They should be rinsed', 'They should be sorted by colour'],
        correctIndex: 2,
        explanation: '"always rinse containers before putting them in the recycling bin"',
      },
      {
        id: 2,
        question: 'Which day is the new collection day in this area?',
        choices: ['Monday', 'Wednesday', 'Tuesday', 'Thursday'],
        correctIndex: 3,
        explanation: '"Collection day in this area was recently changed from Tuesday to Thursday"',
      },
      {
        id: 3,
        question: 'By how much can composting reduce general rubbish?',
        choices: ['Almost a third', 'Almost half', 'A tenth', 'Completely'],
        correctIndex: 0,
        explanation: '"composting food waste can reduce your general rubbish by almost a third"',
      },
    ],
  },
  {
    id: 148,
    level: 'B1',
    topic: 'Work',
    title: 'A Phone Call About an Internship',
    transcript:
      "— Hello, this is Mia calling about the marketing internship. — Hi Mia, thanks for calling. Yes, we received your application last week. — Great. I wanted to ask about the start date. — It was advertised as starting the first of July, but we've had to push it back to the fifteenth, due to office renovations. — That's fine, I'm flexible. Is the internship still six weeks long? — Yes, six weeks, Monday to Thursday, and it's paid at ten pounds an hour. — Will I be working with the social media team? — Mostly, yes, though you'll also help with our monthly newsletter. — Sounds perfect. Do I need to bring anything on the first day? — Just some identification and a notebook. We'll send full details by email tomorrow. — Thank you so much, I'm really looking forward to it.",
    questions: [
      {
        id: 1,
        question: 'When will the internship actually start?',
        choices: ['The first of July', 'The fifteenth of July', 'The first of August', 'The following Monday'],
        correctIndex: 1,
        explanation: "\"we've had to push it back to the fifteenth, due to office renovations\"",
      },
      {
        id: 2,
        question: 'How much is the internship paid?',
        choices: ['Eight pounds an hour', 'It is unpaid', 'Ten pounds an hour', 'Twelve pounds an hour'],
        correctIndex: 2,
        explanation: '"it\'s paid at ten pounds an hour"',
      },
      {
        id: 3,
        question: 'Besides social media, what else will Mia help with?',
        choices: ['The company website', 'Customer service calls', 'Staff training', 'The monthly newsletter'],
        correctIndex: 3,
        explanation: '"you\'ll also help with our monthly newsletter"',
      },
    ],
  },
  {
    id: 149,
    level: 'B1',
    topic: 'Community',
    title: 'A Community Garden Meeting',
    transcript:
      "Good evening, everyone, thank you for joining our first community garden meeting. As you know, the council has given us the empty plot behind the library to turn into a shared garden. We originally hoped to start planting in March, but the soil needed more preparation than expected, so we'll now begin in April instead. We currently have eighteen households signed up, and there's room for a few more. Each family will look after one small bed, while some areas, like the herb patch, will be shared by everyone. Tools will be kept in the new shed, which was donated by a local hardware shop. We're also planning a compost area near the fence. Meetings will happen on the first Sunday of every month, and everyone is welcome to bring ideas. Let's take a short break now, then walk over to see the plot itself.",
    questions: [
      {
        id: 1,
        question: 'When will planting actually begin?',
        choices: ['April', 'March', 'May', 'June'],
        correctIndex: 0,
        explanation: "\"we originally hoped to start planting in March, but the soil needed more preparation than expected, so we'll now begin in April instead\"",
      },
      {
        id: 2,
        question: 'How many households are currently signed up?',
        choices: ['Twelve', 'Eighteen', 'Twenty', 'Eight'],
        correctIndex: 1,
        explanation: '"We currently have eighteen households signed up"',
      },
      {
        id: 3,
        question: 'Who will use the herb patch?',
        choices: ['No one yet', 'Only committee members', 'It will be shared by everyone', 'Only the household nearest the fence'],
        correctIndex: 2,
        explanation: '"some areas, like the herb patch, will be shared by everyone"',
      },
    ],
  },
  {
    id: 150,
    level: 'B1',
    topic: 'Community',
    title: 'A Road Closure Radio Notice',
    transcript:
      "And now for a local travel update. Mill Road will be closed to traffic from Monday to Friday this week because of essential gas pipe repairs. The closure was originally planned for next month, but engineers found a leak that needs urgent attention. Diversions will be in place via Church Street and Park Avenue, and drivers should expect delays of around fifteen minutes during peak hours. Buses on route number seven will be rerouted along the same diversion, and two stops near the school will be temporarily suspended. Pedestrians and cyclists can still use the road, though a small section of the pavement will be fenced off for safety. The council apologises for any inconvenience and expects the work to be finished by Friday evening, weather permitting. For further updates, visit the council website or listen to this station tomorrow morning.",
    questions: [
      {
        id: 1,
        question: 'When was the road closure originally planned to happen?',
        choices: ['This week', 'Next week', 'Last month', 'Next month'],
        correctIndex: 3,
        explanation: '"The closure was originally planned for next month, but engineers found a leak that needs urgent attention."',
      },
      {
        id: 2,
        question: 'Roughly how long are delays expected during peak hours?',
        choices: ['Around fifteen minutes', 'Around five minutes', 'Around thirty minutes', 'There will be no delays'],
        correctIndex: 0,
        explanation: '"drivers should expect delays of around fifteen minutes during peak hours"',
      },
      {
        id: 3,
        question: 'Who can still use Mill Road during the closure?',
        choices: ['Only buses', 'Pedestrians and cyclists', 'Only emergency vehicles', 'No one at all'],
        correctIndex: 1,
        explanation: '"Pedestrians and cyclists can still use the road"',
      },
    ],
  },
  {
    id: 151,
    level: 'B1',
    topic: 'Health',
    title: 'A First Aid Course Introduction',
    transcript:
      "Welcome to the two-day First Aid course. I'm James, and I'll be your instructor for today and tomorrow. This course was originally going to cover only basic bandaging, but we've expanded it to include CPR training as well, so you're getting excellent value. We'll break for lunch at half past twelve, and there's a small café just across the car park if you didn't bring food. Please switch your phones to silent, since we'll be practising in small groups and need to concentrate. Each of you will receive a workbook and a certificate at the end, provided you attend both days. This morning we'll focus on treating cuts and burns, and after lunch we'll move on to recovery position and choking. If anyone has a medical condition I should know about, please mention it privately during the break.",
    questions: [
      {
        id: 1,
        question: "What has been added to the course that wasn't originally planned?",
        choices: ['A written exam', 'A visit to a hospital', 'CPR training', 'An extra day'],
        correctIndex: 2,
        explanation: "\"This course was originally going to cover only basic bandaging, but we've expanded it to include CPR training as well\"",
      },
      {
        id: 2,
        question: 'What is required to receive a certificate?',
        choices: ['Passing a test', 'Bringing your own workbook', 'Paying an extra fee', 'Attending both days'],
        correctIndex: 3,
        explanation: '"you will receive a workbook and a certificate at the end, provided you attend both days"',
      },
      {
        id: 3,
        question: 'What will the group study this morning?',
        choices: ['Treating cuts and burns', 'Recovery position', 'Choking', 'CPR technique'],
        correctIndex: 0,
        explanation: '"This morning we\'ll focus on treating cuts and burns"',
      },
    ],
  },
  {
    id: 152,
    level: 'B1',
    topic: 'Community',
    title: 'A Language Exchange Meetup',
    transcript:
      "Hi everyone, welcome to this week's language exchange evening at the Riverside Café. Normally we meet upstairs, but because the room is being redecorated, we're downstairs tonight instead — just follow the signs. The idea is simple: you'll spend twenty minutes speaking English, then twenty minutes speaking your partner's language, whether that's Spanish, French, or German. We have about thirty people tonight, which is one of our biggest turnouts yet. Name badges are on the table by the door, so please write your name and the languages you speak. There's no charge for the event itself, though drinks are, of course, at your own expense. If you enjoy tonight, we meet every second Wednesday of the month. Let's begin by finding a partner who's learning your native language, and we'll ring this bell when it's time to switch.",
    questions: [
      {
        id: 1,
        question: "Why is tonight's meetup downstairs instead of upstairs?",
        choices: ['It is a bigger room', 'The upstairs room is being redecorated', 'There is a private party upstairs', 'The lift is broken'],
        correctIndex: 1,
        explanation: "\"because the room is being redecorated, we're downstairs tonight instead\"",
      },
      {
        id: 2,
        question: 'How often does the language exchange normally meet?',
        choices: ['Every Wednesday', 'Once a month', 'Every second Wednesday of the month', 'Every Friday'],
        correctIndex: 2,
        explanation: '"we meet every second Wednesday of the month"',
      },
      {
        id: 3,
        question: 'What must attendees pay for themselves?',
        choices: ['Name badges', 'Entry to the café', 'Nothing at all', 'Drinks'],
        correctIndex: 3,
        explanation: '"drinks are, of course, at your own expense"',
      },
    ],
  },
  {
    id: 153,
    level: 'B1',
    topic: 'Community',
    title: 'A Neighbourhood Noise Complaint Call',
    transcript:
      "— Hello, council noise team, how can I help? — Hi, I'd like to report loud music from the flat next door. — I see. Has this happened before? — Yes, actually, it usually happens on Fridays, but last night it continued until two in the morning on a Tuesday. — I understand. Could I take your address, please? — It's fourteen Elm Street, flat B. — Thank you. We'll send an officer to speak with your neighbour this week, rather than tonight, since it's not currently happening. — That's fine. Will they know I made the complaint? — No, your details stay confidential. — That's good to hear. What happens if it continues after that? — If it happens again, we can issue a formal warning, and eventually a fine. — Okay, thank you for your help.",
    questions: [
      {
        id: 1,
        question: 'When did the noise actually happen this time?',
        choices: ['Tuesday night, until two in the morning', 'Friday night, until midnight', 'Saturday afternoon', 'Sunday morning'],
        correctIndex: 0,
        explanation: '"it usually happens on Fridays, but last night it continued until two in the morning on a Tuesday"',
      },
      {
        id: 2,
        question: "When will an officer speak to the neighbour?",
        choices: ['Tonight', 'This week', 'Next month', 'Immediately after the call'],
        correctIndex: 1,
        explanation: "\"We'll send an officer to speak with your neighbour this week, rather than tonight\"",
      },
      {
        id: 3,
        question: "What happens if the noise continues after the officer's visit?",
        choices: ['Nothing further can be done', 'The neighbour is evicted immediately', 'A formal warning can be issued', 'The caller must move out'],
        correctIndex: 2,
        explanation: '"If it happens again, we can issue a formal warning, and eventually a fine."',
      },
    ],
  },
  {
    id: 154,
    level: 'B1',
    topic: 'Finance',
    title: 'Saving Money as a Student',
    transcript:
      "Today I want to share a few tips on saving money as a student, based on my own experience. When I first started university, I spent far too much on takeaway coffee — almost fifteen pounds a week, which adds up quickly. Switching to a reusable cup and making coffee at home saved me nearly sixty pounds a month. Second, always check for a student discount before buying anything; many shops offer ten to twenty percent off, even if it isn't advertised clearly. Third, cooking in batches on Sundays meant I rarely ordered takeaway during the week. I also joined the library instead of buying textbooks, which saved hundreds of pounds over the year. Originally I planned to get a part-time job in my first term, but I found that budgeting carefully meant I didn't need one until my second year.",
    questions: [
      {
        id: 1,
        question: 'How much did switching to home-made coffee save per month?',
        choices: ['Fifteen pounds', 'Twenty pounds', 'Thirty pounds', 'Nearly sixty pounds'],
        correctIndex: 3,
        explanation: '"Switching to a reusable cup and making coffee at home saved me nearly sixty pounds a month."',
      },
      {
        id: 2,
        question: 'When did the speaker actually get a part-time job?',
        choices: ['Not until the second year', 'In the first term', 'Before starting university', 'In the first week'],
        correctIndex: 0,
        explanation: "\"Originally I planned to get a part-time job in my first term, but I found that budgeting carefully meant I didn't need one until my second year.\"",
      },
      {
        id: 3,
        question: 'What discount range do many shops offer students?',
        choices: ['Five to ten percent', 'Ten to twenty percent', 'Twenty-five to thirty percent', 'Fifty percent'],
        correctIndex: 1,
        explanation: '"many shops offer ten to twenty percent off"',
      },
    ],
  },
  {
    id: 155,
    level: 'B1',
    topic: 'Food',
    title: 'A Cookery Competition Announcement',
    transcript:
      "Attention all contestants! The Riverside Cookery Competition will begin in fifteen minutes, not at eleven as originally scheduled, because two judges were delayed in traffic. Please make sure your workstation is clean and that all ingredients are labelled clearly. You'll have ninety minutes to prepare a three-course meal using the mystery basket provided. Remember, each dish will be judged on taste, presentation, and creativity, so don't rush the plating. There are twelve contestants competing today, and the winner will receive a two-hundred-pound prize plus a feature in the local newspaper. If you need extra utensils, our volunteers are wearing green aprons and are happy to help. Please note that phones must be switched off during cooking, as they can distract other contestants. Good luck to everyone, and let's begin when the bell rings in a moment.",
    questions: [
      {
        id: 1,
        question: 'Why has the competition start time changed?',
        choices: ["The kitchen wasn't ready", 'Contestants arrived late', 'Two judges were delayed in traffic', 'There was a fire alarm'],
        correctIndex: 2,
        explanation: '"not at eleven as originally scheduled, because two judges were delayed in traffic"',
      },
      {
        id: 2,
        question: 'What will the winner receive?',
        choices: ['A cookery book', 'A trophy only', 'A trip abroad', 'Two hundred pounds and a newspaper feature'],
        correctIndex: 3,
        explanation: '"the winner will receive a two-hundred-pound prize plus a feature in the local newspaper"',
      },
      {
        id: 3,
        question: 'How can contestants recognise the volunteers?',
        choices: ['They wear green aprons', 'They wear blue hats', 'They carry clipboards', 'They wear name badges'],
        correctIndex: 0,
        explanation: '"our volunteers are wearing green aprons"',
      },
    ],
  },
  {
    id: 161,
    level: 'B2',
    topic: 'Work',
    title: 'A Podcast on Remote Work',
    transcript:
      "Welcome back to Career Talk. Today we're discussing remote work with productivity coach Anna Reyes. — Thanks for having me. I think remote work genuinely suits some people better than others. — Interesting, could you explain? — Well, extroverts often struggle without office interaction, whereas people who focus best alone tend to thrive. Personally, I was sceptical at first, assuming productivity would drop, but studies actually show many employees get more done at home, partly because they avoid commuting and office interruptions. That said, it isn't perfect — collaboration on creative projects can suffer without face-to-face contact. My company originally planned a full return to the office this year, but after employee feedback, we've settled on a hybrid model instead, with three days at home and two in the office. I'd say the biggest lesson is that flexibility matters more than location. Ultimately, businesses that adapt will keep their best staff.",
    questions: [
      {
        id: 1,
        question: "What is Anna's overall opinion about remote work?",
        choices: ['It suits everyone equally', 'It suits some people better than others', 'It should be banned for creative teams', 'It always reduces productivity'],
        correctIndex: 1,
        explanation: '"I think remote work genuinely suits some people better than others."',
      },
      {
        id: 2,
        question: 'What did Anna originally assume about remote work productivity?',
        choices: ['That it would stay the same', 'That it would increase immediately', 'That productivity would drop', 'That it would only affect extroverts'],
        correctIndex: 2,
        explanation: '"I was sceptical at first, assuming productivity would drop"',
      },
      {
        id: 3,
        question: "What arrangement has Anna's company settled on?",
        choices: ['A full return to the office', 'Fully remote work with no office', 'Four days at home, one in the office', 'A hybrid model with three days at home and two in the office'],
        correctIndex: 3,
        explanation: "\"we've settled on a hybrid model instead, with three days at home and two in the office\"",
      },
    ],
  },
  {
    id: 162,
    level: 'B2',
    topic: 'Education',
    title: 'A Lecture Preview: Marketing Basics',
    transcript:
      "Good morning, and welcome to Introduction to Marketing. Before we begin the syllabus, let me explain how this module differs from what's listed in the printed handbook. Originally, assessment was going to be a single exam worth one hundred percent, but the department has since changed this to fifty percent coursework and fifty percent exam, which I think actually benefits most students, since it rewards steady effort rather than last-minute cramming. Over the next twelve weeks, we'll cover branding, consumer behaviour, and digital advertising, roughly four weeks on each. In my opinion, digital advertising is the most valuable section for your future careers, given how quickly the industry is changing. Compared to previous years, we've also added a group project, where you'll design a campaign for a real local business. Lectures are on Mondays, and the smaller seminar groups meet on Wednesdays. Please read chapter one before our next session.",
    questions: [
      {
        id: 1,
        question: 'How will the module actually be assessed?',
        choices: ['Fifty percent coursework and fifty percent exam', 'One hundred percent exam', 'One hundred percent coursework', 'Weekly quizzes only'],
        correctIndex: 0,
        explanation: '"Originally, assessment was going to be a single exam worth one hundred percent, but the department has since changed this to fifty percent coursework and fifty percent exam"',
      },
      {
        id: 2,
        question: 'Why does the lecturer think digital advertising is the most valuable section?',
        choices: ['Because it requires no coursework', 'Because the industry is changing so quickly', 'Because it is the shortest section', 'Because past students found it easiest'],
        correctIndex: 1,
        explanation: '"In my opinion, digital advertising is the most valuable section for your future careers, given how quickly the industry is changing."',
      },
      {
        id: 3,
        question: "What is new about this year's module compared to previous years?",
        choices: ['A final exam', 'Weekly readings', 'A group project designing a campaign for a real business', 'An overseas trip'],
        correctIndex: 2,
        explanation: "\"we've also added a group project, where you'll design a campaign for a real local business\"",
      },
    ],
  },
  {
    id: 163,
    level: 'B2',
    topic: 'Sport',
    title: 'An Interview with a Marathon Runner',
    transcript:
      "— Congratulations on completing your tenth marathon last weekend. How did it feel? — Honestly, tougher than I expected. I'd trained for a time under three hours, but strong winds meant I finished in three hours and twelve minutes instead. — Are you disappointed with that? — Not really. I used to think finishing time was everything, but now I care more about consistency and enjoying the run. — What's changed in your training approach over the years? — When I started, I ran almost every day, which actually led to injuries. Now I train five days a week and rest properly, and I've stayed injury-free for two years. — Would you recommend marathon running to beginners? — Definitely, though I'd say start with shorter races first. A half marathon teaches you pacing without the same physical strain. — Great advice. Thanks for joining us today. — My pleasure, thanks for having me.",
    questions: [
      {
        id: 1,
        question: "What was the runner's actual finishing time?",
        choices: ['Under three hours', 'Two hours fifty minutes', 'Three hours exactly', 'Three hours and twelve minutes'],
        correctIndex: 3,
        explanation: '"strong winds meant I finished in three hours and twelve minutes instead"',
      },
      {
        id: 2,
        question: 'How does the runner now feel about finishing times?',
        choices: ['Consistency and enjoyment matter more than the exact time', 'A fast time is still the only thing that matters', 'He no longer wants to race at all', 'He regrets not training harder'],
        correctIndex: 0,
        explanation: '"I used to think finishing time was everything, but now I care more about consistency and enjoying the run."',
      },
      {
        id: 3,
        question: 'What does the runner recommend for beginners?',
        choices: ['Running every day without rest', 'Starting with a half marathon first', 'Skipping shorter races entirely', 'Training alone rather than in a group'],
        correctIndex: 1,
        explanation: '"I\'d say start with shorter races first. A half marathon teaches you pacing without the same physical strain."',
      },
    ],
  },
  {
    id: 164,
    level: 'B2',
    topic: 'Technology',
    title: 'A Talk on Electric Cars',
    transcript:
      "Tonight I'd like to compare electric and petrol cars, since so many of you have asked about switching. Electric vehicles are often praised for producing no exhaust emissions, which is certainly true while driving, though manufacturing the batteries does create pollution elsewhere. In my view, the environmental benefit still outweighs this over the car's lifetime, especially as electricity grids use more renewable energy. Cost is another major factor: electric cars are more expensive to buy, sometimes by ten thousand pounds or more, but cheaper to run, since charging costs far less than petrol. I originally assumed charging would be inconvenient, but with a home charger, most people simply plug in overnight. Public charging points, however, remain limited in rural areas, which is a genuine drawback. Compared to five years ago, driving range has roughly doubled, addressing one of the biggest early concerns. Overall, I believe electric cars make sense for most drivers now, though not yet for everyone.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's overall view on electric cars?",
        choices: ['They are not yet practical for anyone', 'They pollute more than petrol cars overall', 'They make sense for most drivers now, though not everyone', 'They are only suitable for rural drivers'],
        correctIndex: 2,
        explanation: '"Overall, I believe electric cars make sense for most drivers now, though not yet for everyone."',
      },
      {
        id: 2,
        question: 'What did the speaker originally assume about charging?',
        choices: ['That it would be cheaper than petrol', 'That most drivers would need public chargers', 'That home charging would be impossible', 'That charging would be inconvenient'],
        correctIndex: 3,
        explanation: '"I originally assumed charging would be inconvenient, but with a home charger, most people simply plug in overnight."',
      },
      {
        id: 3,
        question: 'How has driving range changed compared to five years ago?',
        choices: ['It has roughly doubled', 'It has stayed the same', 'It has decreased slightly', 'It has tripled'],
        correctIndex: 0,
        explanation: '"Compared to five years ago, driving range has roughly doubled"',
      },
    ],
  },
  {
    id: 165,
    level: 'B2',
    topic: 'Environment',
    title: 'A Documentary Preview on Coral Reefs',
    transcript:
      "Coming up this evening, our new documentary explores the coral reefs of the Pacific Ocean. Filmed over eighteen months, the team originally planned to focus entirely on tropical fish, but as filming progressed, they discovered a more urgent story: rising sea temperatures are bleaching reefs at an alarming rate. In some regions, over sixty percent of coral has already been lost. The documentary compares healthy reefs, vibrant with colour and life, against bleached areas that appear almost lifeless. Marine biologist Dr Sarah Cole, who features throughout, argues that reducing carbon emissions is the only long-term solution, though local efforts, like limiting tourist boat numbers, can help in the short term. What makes this film particularly moving, in my opinion, is its balance between scientific detail and genuinely beautiful footage. It's not simply a warning; it's also a celebration of what remains. Join us at nine o'clock tonight for this hour-long special.",
    questions: [
      {
        id: 1,
        question: 'What was the documentary originally going to focus on?',
        choices: ['Rising sea temperatures', 'Tropical fish', 'Tourist boats', 'Carbon emissions'],
        correctIndex: 1,
        explanation: '"the team originally planned to focus entirely on tropical fish, but as filming progressed, they discovered a more urgent story"',
      },
      {
        id: 2,
        question: 'According to Dr Sarah Cole, what is the only long-term solution?',
        choices: ['Limiting tourist boat numbers', 'Building artificial reefs', 'Reducing carbon emissions', 'Banning all fishing'],
        correctIndex: 2,
        explanation: '"argues that reducing carbon emissions is the only long-term solution, though local efforts, like limiting tourist boat numbers, can help in the short term"',
      },
      {
        id: 3,
        question: 'What does the narrator find particularly moving about the film?',
        choices: ['Its focus purely on statistics', 'Its length', 'Its focus only on warnings', 'Its balance between scientific detail and beautiful footage'],
        correctIndex: 3,
        explanation: '"What makes this film particularly moving, in my opinion, is its balance between scientific detail and genuinely beautiful footage."',
      },
    ],
  },
  {
    id: 166,
    level: 'B2',
    topic: 'Community',
    title: 'A City Council Meeting on Bike Lanes',
    transcript:
      "Good evening, and thank you for attending tonight's council meeting on the proposed bike lanes for the town centre. The original plan involved removing forty parking spaces along the high street, but after concerns from local shop owners, the council has revised this to just fifteen spaces, with the rest relocated to a nearby car park. Supporters argue the lanes will reduce traffic and encourage healthier travel, pointing to similar projects in other towns that cut congestion by nearly twenty percent. Critics, however, worry that fewer parking spaces will hurt small businesses that depend on passing trade. Personally, I think a trial period would resolve this disagreement fairly — implement the lanes for six months and measure the actual impact on both traffic and sales. The council has, in fact, agreed to exactly that, with a review scheduled for next spring. Construction is expected to begin in September, weather permitting, and will take roughly six weeks to complete.",
    questions: [
      {
        id: 1,
        question: 'How many parking spaces will actually be removed?',
        choices: ['Fifteen', 'Forty', 'Twenty-five', 'None'],
        correctIndex: 0,
        explanation: '"after concerns from local shop owners, the council has revised this to just fifteen spaces"',
      },
      {
        id: 2,
        question: 'What solution does the speaker personally propose?',
        choices: ['Cancelling the bike lane project entirely', 'A trial period to measure the actual impact', 'Removing all parking permanently', 'Building the lanes only on weekends'],
        correctIndex: 1,
        explanation: '"Personally, I think a trial period would resolve this disagreement fairly — implement the lanes for six months and measure the actual impact"',
      },
      {
        id: 3,
        question: 'When is construction expected to begin?',
        choices: ['Next spring', 'Immediately', 'September', 'Next winter'],
        correctIndex: 2,
        explanation: '"Construction is expected to begin in September, weather permitting"',
      },
    ],
  },
  {
    id: 167,
    level: 'B2',
    topic: 'Lifestyle',
    title: 'A Podcast on Minimalist Living',
    transcript:
      "Welcome to Simple Living, the podcast about owning less and living more. I switched to a minimalist lifestyle three years ago, and people often assume it means living with almost nothing, which isn't quite accurate. For me, it simply means keeping only what I genuinely use or love, and getting rid of the rest. I started by decluttering my wardrobe, which originally had over two hundred items; I now own around fifty, and I dress just as well, if not better. Some critics argue minimalism is only possible for wealthy people who can easily replace things later, and I think there's some truth to that concern. However, the core idea — spending on experiences rather than possessions — can benefit almost anyone, regardless of income. Compared to my old lifestyle, I now spend less time cleaning and shopping, and considerably more time outdoors. Next week, I'll talk about applying these same principles to your digital life, including emails and apps.",
    questions: [
      {
        id: 1,
        question: 'How many items does the speaker now own in her wardrobe, compared with before?',
        choices: ['Two hundred, up from fifty', 'The same as before', 'Twenty, down from one hundred', 'About fifty, down from over two hundred'],
        correctIndex: 3,
        explanation: '"my wardrobe, which originally had over two hundred items; I now own around fifty"',
      },
      {
        id: 2,
        question: 'What does the speaker think of the criticism that minimalism is only for wealthy people?',
        choices: ['She thinks there is some truth to it', 'She thinks it is completely wrong', 'She refuses to discuss it', 'She thinks it applies only to men'],
        correctIndex: 0,
        explanation: '"I think there\'s some truth to that concern"',
      },
      {
        id: 3,
        question: "What topic will next week's episode cover?",
        choices: ['Wardrobe organisation', 'Applying minimalism to digital life', 'Minimalist cooking', 'Minimalist home design'],
        correctIndex: 1,
        explanation: "\"Next week, I'll talk about applying these same principles to your digital life\"",
      },
    ],
  },
  {
    id: 168,
    level: 'B2',
    topic: 'Environment',
    title: 'A Radio Feature on Urban Beekeeping',
    transcript:
      "This week's environment feature looks at urban beekeeping, a hobby that's grown rapidly across our city. — So, Tom, how did you get started? — Almost by accident, actually. A friend gave me a beginner's hive kit for my fortieth birthday, and three years later I now manage six hives on rooftops around the city. — Isn't it dangerous keeping bees so close to people? — Less than most assume. Bees are generally calm unless provoked, and I always give neighbours plenty of notice before installing a new hive. — What's the biggest challenge? — Honestly, I expected weather to be the main issue, but it's actually disease and mites that cause the most losses. Compared to rural beekeeping, urban bees often do surprisingly well, since city gardens offer varied flowers almost year-round. — Any advice for beginners? — Start with one hive, join a local association, and don't rush to add honey production; focus on keeping the colony healthy first. — Fascinating stuff, Tom, thank you.",
    questions: [
      {
        id: 1,
        question: 'How did Tom first get into beekeeping?',
        choices: ['He took a council course', 'He inherited hives from a relative', "A friend gave him a beginner's hive kit", 'He read about it online'],
        correctIndex: 2,
        explanation: '"A friend gave me a beginner\'s hive kit for my fortieth birthday"',
      },
      {
        id: 2,
        question: 'What did Tom find to be the biggest actual challenge?',
        choices: ['Neighbours complaining', 'Lack of flowers in the city', 'Weather', 'Disease and mites'],
        correctIndex: 3,
        explanation: "\"I expected weather to be the main issue, but it's actually disease and mites that cause the most losses\"",
      },
      {
        id: 3,
        question: 'What advice does Tom give beginners?',
        choices: ['Start with one hive and join a local association', 'Start with six hives immediately', 'Focus on honey production first', 'Avoid joining beekeeping groups'],
        correctIndex: 0,
        explanation: "\"Start with one hive, join a local association, and don't rush to add honey production\"",
      },
    ],
  },
  {
    id: 169,
    level: 'B2',
    topic: 'Education',
    title: 'Study Abroad Exchange Programmes',
    transcript:
      "Good afternoon, and welcome to this information session on study abroad exchange programmes. Many students assume that studying abroad is mainly about improving language skills, and while that's certainly one benefit, I'd argue the greater value lies in adapting to unfamiliar academic systems and cultures. Our university currently partners with universities in twelve countries, and applications originally closed in March, but we've extended the deadline to the end of April due to high demand this year. A full year abroad is available, though most students choose a single semester, which is easier to fit around part-time jobs and other commitments. Funding can come from the Erasmus-style grant scheme, which covers roughly seventy percent of typical costs. Compared to staying on our home campus, students who study abroad generally report stronger problem-solving skills and confidence, according to our latest graduate survey. If you're considering this route, I strongly recommend speaking to a returning student before deciding, since their experience is often more useful than any brochure.",
    questions: [
      {
        id: 1,
        question: 'What does the speaker believe is the greater value of studying abroad?',
        choices: ['Improving language skills', 'Adapting to unfamiliar academic systems and cultures', 'Making the CV look better', 'Avoiding tuition fees'],
        correctIndex: 1,
        explanation: "\"I'd argue the greater value lies in adapting to unfamiliar academic systems and cultures\"",
      },
      {
        id: 2,
        question: 'When is the application deadline now?',
        choices: ['The end of March', 'The middle of March', 'The end of April', 'The end of May'],
        correctIndex: 2,
        explanation: "\"applications originally closed in March, but we've extended the deadline to the end of April\"",
      },
      {
        id: 3,
        question: 'Roughly what percentage of typical costs does the grant scheme cover?',
        choices: ['One hundred percent', 'Fifty percent', 'Thirty percent', 'Seventy percent'],
        correctIndex: 3,
        explanation: '"which covers roughly seventy percent of typical costs"',
      },
    ],
  },
  {
    id: 170,
    level: 'B2',
    topic: 'Business',
    title: 'Running a Food Truck',
    transcript:
      "— You've been running your food truck for two years now. What made you leave your office job? — Honestly, I was tired of routine, and I'd always loved cooking, so it felt like a natural, if risky, decision. — Was it as difficult as people say? — Tougher than I expected, financially. I originally budgeted five thousand pounds to start, but between the truck itself and kitchen equipment, it ended up closer to twelve thousand. — What's the biggest advantage over owning a restaurant? — Flexibility, definitely. If a location isn't working, I can simply drive somewhere else the next day, whereas a restaurant is fixed in one spot. — And the downsides? — Weather affects everything. A rainy weekend can halve my usual takings compared to a sunny one. — Would you recommend this to others? — Yes, but only if they can handle unpredictable income, because some months are excellent and others are genuinely tight. — Thanks for sharing your story with us today.",
    questions: [
      {
        id: 1,
        question: 'How much did starting the food truck actually cost?',
        choices: ['Close to twelve thousand pounds', 'Exactly five thousand pounds', 'Around twenty thousand pounds', 'Under two thousand pounds'],
        correctIndex: 0,
        explanation: '"I originally budgeted five thousand pounds to start, but between the truck itself and kitchen equipment, it ended up closer to twelve thousand."',
      },
      {
        id: 2,
        question: 'What does the owner see as the biggest advantage over a restaurant?',
        choices: ['Lower food costs', 'Flexibility to move location', 'Guaranteed daily income', 'Less competition'],
        correctIndex: 1,
        explanation: '"Flexibility, definitely. If a location isn\'t working, I can simply drive somewhere else the next day, whereas a restaurant is fixed in one spot."',
      },
      {
        id: 3,
        question: 'What effect can a rainy weekend have on takings?',
        choices: ['No effect at all', 'It can double takings', 'It can halve takings', 'It stops the truck from opening'],
        correctIndex: 2,
        explanation: '"A rainy weekend can halve my usual takings compared to a sunny one."',
      },
    ],
  },
  {
    id: 171,
    level: 'B2',
    topic: 'Environment',
    title: 'A Talk on Solar Panels for Homes',
    transcript:
      "This evening I want to explain whether solar panels are worth the investment for an average household. The upfront cost has fallen considerably; ten years ago, a typical installation cost around twelve thousand pounds, whereas today it's closer to six thousand. In my opinion, this drop makes solar far more accessible than many homeowners realise. Panels typically pay for themselves within eight to ten years through reduced energy bills, though this depends heavily on how much direct sunlight your roof receives. I originally assumed cloudy climates made solar pointless, but panels still generate meaningful electricity on overcast days, just less than on sunny ones. Compared to simply buying green energy from a supplier, generating your own power gives you more control and, eventually, lower costs. One common misconception is that panels require constant cleaning; in reality, rainfall keeps most panels reasonably clean without any extra effort. For anyone considering the switch, I'd recommend getting at least three quotes before choosing an installer.",
    questions: [
      {
        id: 1,
        question: 'How much does a typical installation cost today, compared with ten years ago?',
        choices: ['The same as ten years ago', 'More than ten years ago', 'Twelve thousand pounds, unchanged', 'About six thousand pounds, down from around twelve thousand'],
        correctIndex: 3,
        explanation: "\"ten years ago, a typical installation cost around twelve thousand pounds, whereas today it's closer to six thousand\"",
      },
      {
        id: 2,
        question: 'What did the speaker originally assume about cloudy climates?',
        choices: ['That solar panels would be pointless there', 'That panels would work better there', 'That installation would be cheaper there', "That panels wouldn't need cleaning there"],
        correctIndex: 0,
        explanation: '"I originally assumed cloudy climates made solar pointless, but panels still generate meaningful electricity on overcast days"',
      },
      {
        id: 3,
        question: 'According to the speaker, what actually keeps solar panels clean?',
        choices: ['Monthly professional cleaning', 'Rainfall', 'A built-in wiper system', 'Regular scrubbing by the homeowner'],
        correctIndex: 1,
        explanation: '"in reality, rainfall keeps most panels reasonably clean without any extra effort"',
      },
    ],
  },
  {
    id: 172,
    level: 'B2',
    topic: 'Consumer',
    title: 'A Consumer Programme on Online Reviews',
    transcript:
      "Tonight's consumer programme investigates how reliable online reviews really are. Our research team originally intended to focus only on restaurant reviews, but we quickly found similar problems across hotels, electronics, and even online courses. Roughly one in five reviews we examined showed signs of being fake, either overly positive or suspiciously generic in wording. Consumer expert Priya Shah argues that star ratings alone are misleading; instead, she recommends reading the most recent reviews rather than the overall average, since a business's quality can change significantly over time. Compared to five years ago, review platforms now use better detection software, though determined fraudsters still find ways around it. Personally, I think verified purchase badges make the biggest difference, since they at least confirm the reviewer actually bought the product. Our advice tonight is simple: look for detailed, specific comments rather than short generic praise, and always check a handful of critical reviews before making a decision. Stay with us after the break for more.",
    questions: [
      {
        id: 1,
        question: 'What did the research team originally plan to investigate?',
        choices: ['Hotel reviews only', 'All online reviews equally', 'Restaurant reviews only', 'Electronics reviews only'],
        correctIndex: 2,
        explanation: '"Our research team originally intended to focus only on restaurant reviews, but we quickly found similar problems across hotels, electronics, and even online courses."',
      },
      {
        id: 2,
        question: 'What does Priya Shah recommend instead of trusting the overall star rating?',
        choices: ['Ignoring reviews completely', 'Reading only five-star reviews', 'Contacting the seller directly', 'Reading the most recent reviews'],
        correctIndex: 3,
        explanation: '"she recommends reading the most recent reviews rather than the overall average"',
      },
      {
        id: 3,
        question: 'What does the presenter personally think makes the biggest difference to review reliability?',
        choices: ['Verified purchase badges', 'Star ratings', 'The length of the review', 'The number of comments'],
        correctIndex: 0,
        explanation: '"Personally, I think verified purchase badges make the biggest difference"',
      },
    ],
  },
  {
    id: 173,
    level: 'B2',
    topic: 'Lifestyle',
    title: 'A Talk on Digital Detox Weekends',
    transcript:
      "Good afternoon, everyone. Today's workshop is about digital detox weekends, something I began trying eighteen months ago after realising I checked my phone over a hundred times a day. Originally, I planned a full week without any screens, but I found that unrealistic alongside work commitments, so I settled on just weekends instead, which has proven far more sustainable. The first attempt was genuinely uncomfortable; I felt anxious without notifications, which surprised me at the time. However, by the third weekend, I noticed I was reading more, sleeping better, and generally feeling calmer. Critics sometimes argue that avoiding phones is impractical in a connected world, and I understand that concern, particularly for people who rely on phones for work. My response is that a detox doesn't need to be extreme; even switching off notifications for a few hours makes a noticeable difference. Compared to when I started, I now genuinely look forward to these screen-free weekends rather than dreading them.",
    questions: [
      {
        id: 1,
        question: 'What did the speaker originally plan, before settling on weekends only?',
        choices: ['A single day without screens', 'A full week without any screens', 'One hour a day without screens', 'No plan at all, just spontaneous breaks'],
        correctIndex: 1,
        explanation: '"Originally, I planned a full week without any screens, but I found that unrealistic alongside work commitments, so I settled on just weekends instead"',
      },
      {
        id: 2,
        question: 'How did the speaker feel during the first attempt?',
        choices: ['Completely relaxed', 'Bored', 'Genuinely uncomfortable and anxious', 'Excited and confident'],
        correctIndex: 2,
        explanation: '"The first attempt was genuinely uncomfortable; I felt anxious without notifications"',
      },
      {
        id: 3,
        question: 'What is the speaker\'s response to critics who say a detox is impractical?',
        choices: ['She agrees and has stopped doing it', 'A detox must be extreme to work', 'Detoxing is only for people without jobs', "A detox doesn't need to be extreme; even a few hours without notifications helps"],
        correctIndex: 3,
        explanation: "\"My response is that a detox doesn't need to be extreme; even switching off notifications for a few hours makes a noticeable difference.\"",
      },
    ],
  },
  {
    id: 174,
    level: 'B2',
    topic: 'Culture',
    title: 'A Music Festival Announcement',
    transcript:
      "Good afternoon, festival-goers! We have a small change to today's schedule. The headline act was originally due to perform on the Main Stage at eight o'clock, but due to a technical issue with the sound equipment, they'll now perform on the Riverside Stage at half past eight instead. We apologise for any inconvenience this causes. In the meantime, please enjoy the acoustic set currently underway on the Main Stage, which many of you seem to be thoroughly enjoying already. Food stalls remain open until midnight, and we'd particularly recommend the local cheese stall, which has been extremely popular today, selling out twice already. For anyone concerned about the earlier rain, we're pleased to report the forecast for this evening looks considerably better, with clear skies expected. Lost property can be collected from the information tent near the main entrance. Finally, please remember to stay hydrated, and free water refill stations are available throughout the site. Enjoy the rest of the festival!",
    questions: [
      {
        id: 1,
        question: 'Where will the headline act now perform?',
        choices: ['The Riverside Stage', 'The Main Stage', 'The acoustic tent', 'They have been cancelled'],
        correctIndex: 0,
        explanation: "\"due to a technical issue with the sound equipment, they'll now perform on the Riverside Stage at half past eight instead\"",
      },
      {
        id: 2,
        question: 'What has happened to the cheese stall today?',
        choices: ['It has closed early', 'It has sold out twice already', 'It has moved location', 'It has run out of change'],
        correctIndex: 1,
        explanation: '"the local cheese stall, which has been extremely popular today, selling out twice already"',
      },
      {
        id: 3,
        question: 'What is the weather forecast for this evening?',
        choices: ['More heavy rain', 'Strong winds', 'Considerably better, with clear skies', 'Unchanged from this morning'],
        correctIndex: 2,
        explanation: '"the forecast for this evening looks considerably better, with clear skies expected"',
      },
    ],
  },
  {
    id: 175,
    level: 'B2',
    topic: 'Nature',
    title: 'An Interview with a Wildlife Photographer',
    transcript:
      "— Your new exhibition focuses on snow leopards. What drew you to such an elusive animal? — Honestly, their rarity was part of the appeal. I'd originally planned to photograph tigers for this project, but after a conversation with a conservationist friend, I realised snow leopards were far less documented, and needed the attention more. — How long did the project take? — Nearly four years, spread across several trips to the mountains. Some visits produced almost nothing usable, which was frustrating, but patience is essential in this work. — What's the most rewarding part of wildlife photography for you? — Honestly, it's less about the final image and more about witnessing behaviour so few people ever see. Though, of course, a striking photograph does help people care about conservation in a way statistics rarely achieve. — Any advice for aspiring photographers? — Learn the animal's habits before worrying about equipment; understanding behaviour matters far more than having the most expensive camera. — Thank you for sharing these incredible images with us.",
    questions: [
      {
        id: 1,
        question: 'What animal did the photographer originally plan to photograph?',
        choices: ['Wolves', 'Elephants', 'Snow leopards', 'Tigers'],
        correctIndex: 3,
        explanation: "\"I'd originally planned to photograph tigers for this project, but after a conversation with a conservationist friend, I realised snow leopards were far less documented\"",
      },
      {
        id: 2,
        question: 'How long did the snow leopard project take?',
        choices: ['Nearly four years', 'About one year', 'Six months', 'Ten years'],
        correctIndex: 0,
        explanation: '"Nearly four years, spread across several trips to the mountains."',
      },
      {
        id: 3,
        question: 'What does the photographer say is most rewarding about the work?',
        choices: ['Winning photography awards', 'Witnessing behaviour so few people ever see', 'Travelling to remote places', 'Selling prints of the images'],
        correctIndex: 1,
        explanation: "\"it's less about the final image and more about witnessing behaviour so few people ever see\"",
      },
    ],
  },
];
