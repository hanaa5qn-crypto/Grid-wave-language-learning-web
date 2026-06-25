// =============================================================================
// IELTS General Training — Practice Test 1
// -----------------------------------------------------------------------------
// A full, self-contained General Training practice paper conforming exactly to
// the IeltsTest contract in ../types.ts. The reading paper follows the GT
// structure: Section 1 = everyday social texts (notices/ads), Section 2 =
// workplace texts, Section 3 = one longer general-interest passage. Total
// reading questions = 40 (13 / 13 / 14). Listening keeps the standard 4-section
// 40-question format. Writing Task 1 is a letter (not a chart); Task 2 is an
// essay. Speaking has the three standard parts. All passages are original prose
// modelled on the official Cambridge IELTS General Training format.
// =============================================================================
import { IeltsTest } from '../types';

export const IELTS_GENERAL_1: IeltsTest = {
  id: 'ielts-general-1',
  title: 'IELTS General Training — Practice Test 1',
  module: 'General Training',
  source:
    'Modeled on the Cambridge IELTS General Training test format (official structure, original passages).',

  // ===========================================================================
  // READING — Section 1 (everyday social), Section 2 (workplace), Section 3
  // (longer general interest). 13 + 13 + 14 = 40 questions.
  // ===========================================================================
  reading: [
    // -------------------------------------------------------------------------
    // SECTION 1 — everyday social texts (notices / advertisements). 13 Qs.
    // -------------------------------------------------------------------------
    {
      number: 1,
      title: 'Section 1 — Notices and Advertisements',
      text:
        'A. RIVERSIDE COMMUNITY POOL — OPENING HOURS\n' +
        'The pool is open seven days a week. From Monday to Friday the doors open at 6.00 a.m. for lap swimmers and the public session begins at 9.00 a.m. On weekends the pool opens at 8.00 a.m. The last entry is always thirty minutes before closing, and the building closes at 8.00 p.m. on weekdays and 6.00 p.m. on weekends. Lockers require a refundable one-pound coin, so please bring a coin with you. Lessons for children under eight run on Tuesday and Thursday mornings and must be booked at the front desk at least one day in advance.\n\n' +
        'B. SUNDOWN FARMERS’ MARKET\n' +
        'Held in the Town Hall car park every Saturday from 7.30 a.m. until 1.00 p.m., the Sundown Farmers’ Market brings together more than forty local growers and producers. You will find seasonal vegetables, free-range eggs, honey, fresh bread and hand-made cheese. Stallholders accept cash and cards. The market does not operate on public holidays. Dogs on leads are welcome, but please note that the indoor bakery section does not allow animals for hygiene reasons. Parking is free for the first two hours.\n\n' +
        'C. GREENFIELD LIBRARY — MEMBERSHIP\n' +
        'Joining the library is free for anyone who lives, works or studies in the district. Bring one document showing your current address — for example a utility bill or a tenancy agreement. Members may borrow up to twelve items at a time and keep them for three weeks. Items can be renewed twice online unless another member has reserved them. A small charge of ten pence per day applies to overdue books. Children’s memberships are available but must be signed for by a parent or guardian.\n\n' +
        'D. CITY BICYCLE HIRE\n' +
        'Pick up a bicycle from any of our thirty docking stations across the city. The first thirty minutes of every journey are free; after that a charge of one pound applies for each additional thirty minutes. Helmets are not provided, so riders are encouraged to bring their own. Bicycles must be returned to a docking station, not left on the street, or a penalty of twenty pounds will be charged to your account. Riders must be at least sixteen years old and hold a valid payment card.',
      questions: [
        {
          id: 1,
          type: 'true-false-notgiven',
          prompt:
            'The Riverside Community Pool opens at the same time on weekdays and weekends.',
          answer: 'FALSE',
          explanation:
            'Text A states the pool opens at 6.00 a.m. (Mon–Fri) but 8.00 a.m. on weekends, so the opening times differ — FALSE.',
        },
        {
          id: 2,
          type: 'true-false-notgiven',
          prompt: 'A coin is needed to use a locker at the pool.',
          answer: 'TRUE',
          explanation:
            'Text A: "Lockers require a refundable one-pound coin", so this is TRUE.',
        },
        {
          id: 3,
          type: 'true-false-notgiven',
          prompt: 'Swimming lessons for young children can be booked on the day they take place.',
          answer: 'FALSE',
          explanation:
            'Lessons "must be booked at the front desk at least one day in advance", so booking on the same day is not allowed — FALSE.',
        },
        {
          id: 4,
          type: 'true-false-notgiven',
          prompt: 'The farmers’ market is held indoors throughout the year.',
          answer: 'FALSE',
          explanation:
            'Text B says it is held "in the Town Hall car park", which is an outdoor location, so FALSE.',
        },
        {
          id: 5,
          type: 'true-false-notgiven',
          prompt: 'Dogs are allowed in every part of the farmers’ market.',
          answer: 'FALSE',
          explanation:
            'Dogs on leads are welcome, but "the indoor bakery section does not allow animals", so they are not allowed everywhere — FALSE.',
        },
        {
          id: 6,
          type: 'true-false-notgiven',
          prompt: 'Library membership costs a small annual fee.',
          answer: 'FALSE',
          explanation:
            'Text C states "Joining the library is free", so there is no annual fee — FALSE.',
        },
        {
          id: 7,
          type: 'true-false-notgiven',
          prompt: 'Library items may be renewed online unless someone else has reserved them.',
          answer: 'TRUE',
          explanation:
            'Text C: items "can be renewed twice online unless another member has reserved them" — TRUE.',
        },
        {
          id: 8,
          type: 'note-completion',
          prompt:
            'Library: a member may borrow up to ____ items at one time.',
          answer: ['twelve', '12'],
          explanation:
            'Text C states members "may borrow up to twelve items at a time".',
        },
        {
          id: 9,
          type: 'short-answer',
          prompt:
            'How long may a library member keep borrowed items before they are due back?',
          answer: ['three weeks', '3 weeks'],
          explanation:
            'Text C: members may "keep them for three weeks".',
        },
        {
          id: 10,
          type: 'note-completion',
          prompt:
            'City Bicycle Hire: the first ____ minutes of every journey are free of charge.',
          answer: ['thirty', '30'],
          explanation:
            'Text D: "The first thirty minutes of every journey are free".',
        },
        {
          id: 11,
          type: 'true-false-notgiven',
          prompt: 'Riders are given a helmet when they hire a bicycle.',
          answer: 'FALSE',
          explanation:
            'Text D: "Helmets are not provided, so riders are encouraged to bring their own" — FALSE.',
        },
        {
          id: 12,
          type: 'short-answer',
          prompt:
            'What is the minimum age for hiring a city bicycle?',
          answer: ['sixteen', '16', 'sixteen years old'],
          explanation:
            'Text D: "Riders must be at least sixteen years old".',
        },
        {
          id: 13,
          type: 'true-false-notgiven',
          prompt: 'Leaving a hired bicycle on the street results in a charge.',
          answer: 'TRUE',
          explanation:
            'Text D warns of "a penalty of twenty pounds" if bicycles are "left on the street" — TRUE.',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // SECTION 2 — workplace texts. 13 Qs.
    // -------------------------------------------------------------------------
    {
      number: 2,
      title: 'Section 2 — Workplace Information',
      text:
        'A. NEW EMPLOYEE INDUCTION — FIRST WEEK\n' +
        'Welcome to Harbour Logistics. During your first week you will complete an induction programme designed to help you settle in quickly. On day one you will meet your line manager, collect your security pass and set up your computer login with the IT team. By the end of day two you must complete the online health-and-safety module; you cannot enter the warehouse floor until this certificate appears on your staff record. A buddy from your department will be assigned to answer day-to-day questions for your first month. Please keep your security pass visible at all times while on site.\n\n' +
        'B. ANNUAL LEAVE PROCEDURE\n' +
        'Full-time staff are entitled to twenty-five days of paid annual leave each year, in addition to public holidays. Requests must be submitted through the online staff portal at least two weeks before the intended start date. Your line manager will normally respond within three working days. Leave cannot be carried over into the next year except in exceptional circumstances, which must be approved in writing by a department head. During the busy period from November to early January, no more than two members of any team may be on leave at the same time.\n\n' +
        'C. CLAIMING TRAVEL EXPENSES\n' +
        'If your role requires you to travel for work, you may claim the cost of train and bus fares, parking and overnight accommodation. Claims must be supported by original receipts and submitted within one month of the journey. Mileage in a private car is reimbursed at a fixed rate per mile; fuel receipts are not required for mileage claims. Taxi fares are only reimbursed when public transport is unavailable or when you are carrying heavy equipment. All expense claims over one hundred pounds require a manager’s signature before payment.\n\n' +
        'D. REPORTING SICKNESS\n' +
        'If you are unwell and cannot attend work, you must telephone your line manager before 9.30 a.m. on the first day of absence. A text message or email is not sufficient. For absences of up to seven calendar days you may self-certify by completing a short form on your return. For longer absences a medical certificate from a doctor is required. Repeated short absences may trigger a supportive return-to-work conversation, which is intended to identify any help you might need.',
      questions: [
        {
          id: 14,
          type: 'matching-information',
          prompt:
            'Which text section explains what to do if you are too ill to come to work?',
          options: [
            'A — New Employee Induction',
            'B — Annual Leave Procedure',
            'C — Claiming Travel Expenses',
            'D — Reporting Sickness',
          ],
          answer: 'D — Reporting Sickness',
          explanation:
            'Text D, "Reporting Sickness", describes the steps for absence due to illness.',
        },
        {
          id: 15,
          type: 'matching-information',
          prompt:
            'Which text section tells you how far in advance to ask for time off?',
          options: [
            'A — New Employee Induction',
            'B — Annual Leave Procedure',
            'C — Claiming Travel Expenses',
            'D — Reporting Sickness',
          ],
          answer: 'B — Annual Leave Procedure',
          explanation:
            'Text B requires leave requests "at least two weeks before the intended start date".',
        },
        {
          id: 16,
          type: 'matching-information',
          prompt:
            'Which text section mentions a certificate you must obtain before working in a particular area?',
          options: [
            'A — New Employee Induction',
            'B — Annual Leave Procedure',
            'C — Claiming Travel Expenses',
            'D — Reporting Sickness',
          ],
          answer: 'A — New Employee Induction',
          explanation:
            'Text A: you "cannot enter the warehouse floor until this certificate appears on your staff record".',
        },
        {
          id: 17,
          type: 'matching-information',
          prompt:
            'Which text section explains when the cost of a taxi can be paid back?',
          options: [
            'A — New Employee Induction',
            'B — Annual Leave Procedure',
            'C — Claiming Travel Expenses',
            'D — Reporting Sickness',
          ],
          answer: 'C — Claiming Travel Expenses',
          explanation:
            'Text C explains that "Taxi fares are only reimbursed when public transport is unavailable or when you are carrying heavy equipment".',
        },
        {
          id: 18,
          type: 'true-false-notgiven',
          prompt:
            'New employees may begin working in the warehouse before finishing the health-and-safety module.',
          answer: 'FALSE',
          explanation:
            'Text A: "you cannot enter the warehouse floor until this certificate appears on your staff record" — FALSE.',
        },
        {
          id: 19,
          type: 'true-false-notgiven',
          prompt: 'A buddy is provided to help new staff for the first six months.',
          answer: 'FALSE',
          explanation:
            'Text A says a buddy answers questions "for your first month", not six months — FALSE.',
        },
        {
          id: 20,
          type: 'note-completion',
          prompt:
            'Full-time staff receive ____ days of paid annual leave each year, on top of public holidays.',
          answer: ['twenty-five', '25', 'twenty five'],
          explanation:
            'Text B: staff "are entitled to twenty-five days of paid annual leave each year".',
        },
        {
          id: 21,
          type: 'short-answer',
          prompt:
            'Within how long after a journey must travel-expense claims be submitted?',
          answer: ['one month', 'a month', '1 month', 'within one month'],
          explanation:
            'Text C: claims must be "submitted within one month of the journey".',
        },
        {
          id: 22,
          type: 'true-false-notgiven',
          prompt: 'Fuel receipts must be provided when claiming car mileage.',
          answer: 'FALSE',
          explanation:
            'Text C states "fuel receipts are not required for mileage claims" — FALSE.',
        },
        {
          id: 23,
          type: 'sentence-completion',
          prompt:
            'Expense claims over one hundred pounds need a ____ before they can be paid.',
          answer: ['manager’s signature', 'managers signature', 'manager\'s signature', 'signature'],
          explanation:
            'Text C: "All expense claims over one hundred pounds require a manager’s signature before payment."',
        },
        {
          id: 24,
          type: 'true-false-notgiven',
          prompt:
            'An employee may report sickness by sending a text message to their manager.',
          answer: 'FALSE',
          explanation:
            'Text D: "A text message or email is not sufficient"; you must telephone — FALSE.',
        },
        {
          id: 25,
          type: 'note-completion',
          prompt:
            'For absences of up to ____ calendar days, staff may self-certify on their return.',
          answer: ['seven', '7'],
          explanation:
            'Text D: "For absences of up to seven calendar days you may self-certify".',
        },
        {
          id: 26,
          type: 'true-false-notgiven',
          prompt:
            'A doctor’s certificate is needed for an absence longer than seven days.',
          answer: 'TRUE',
          explanation:
            'Text D: "For longer absences a medical certificate from a doctor is required" — TRUE.',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // SECTION 3 — one longer general-interest passage. 14 Qs.
    // Paragraphs labelled A–F so matching-headings can be used.
    // -------------------------------------------------------------------------
    {
      number: 3,
      title: 'Section 3 — The Quiet Return of the Night Train',
      text:
        'A. For much of the twentieth century, the sleeper train was one of the most romantic ways to cross a continent. Passengers boarded in one great city in the evening, settled into a narrow bunk, and woke the next morning in another country, having saved both a hotel bill and a day of travel. Yet by the early 2000s many of these services had quietly disappeared. Cheap flights made it possible to cross the same distance in two hours rather than twelve, and the slow, comfortable carriages were taken out of service one route at a time. Few travellers seemed to mourn them.\n\n' +
        'B. The reasons behind the decline were largely financial. Running a night train is expensive: the carriages are costly to build and maintain, they carry fewer passengers than a daytime service of the same length, and they spend much of the day parked rather than earning money. When budget airlines began offering tickets for less than the price of a sandwich, railway companies struggled to compete. One by one, governments and operators decided that the sleeper was a luxury they could no longer justify, and the routes were closed.\n\n' +
        'C. In the last few years, however, the night train has begun an unexpected return. The change has been driven less by nostalgia than by a growing concern about the environment. A short flight produces far more carbon dioxide per passenger than the equivalent rail journey, and as travellers have become more aware of their impact, some have started to look again at the train. Several European operators have reported that bookings on their remaining sleeper routes have risen sharply, particularly among younger passengers who say they are willing to trade speed for a smaller carbon footprint.\n\n' +
        'D. Governments have noticed this shift in mood. A number of countries have begun to invest public money in reopening cross-border night routes that were closed only a decade or two earlier. New carriages are being ordered, old timetables are being revived, and operators that once competed are now cooperating to run trains that pass through several nations in a single night. Supporters argue that such investment makes sense not only for the climate but also for connecting smaller towns that airports cannot easily serve.\n\n' +
        'E. The revival is not without its difficulties. Building or refurbishing sleeper carriages takes years, and there are far fewer of them in service than there were a generation ago. Different countries use different signalling systems and safety rules, which makes running a single train across many borders surprisingly complicated. Staff must be trained, and tickets that cover several national networks can be awkward to sell through old booking systems. As a result, demand on some routes already outstrips the number of beds available.\n\n' +
        'F. Even so, the mood among supporters is hopeful. They point out that a night train uses time that would otherwise be wasted: a journey that takes place while you sleep costs you no waking hours at all. For business travellers this can mean arriving rested and ready to work; for holidaymakers it can turn the journey itself into part of the adventure. Whether the night train can ever again become an everyday choice rather than an occasional treat will depend on continued investment — but for the first time in decades, the direction of travel is clear.',
      questions: [
        {
          id: 27,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph A.',
          options: [
            'i. A golden age that few people noticed ending',
            'ii. The high cost of keeping sleepers running',
            'iii. An environmental change of heart',
            'iv. Governments step in to help',
            'v. Practical obstacles to the comeback',
            'vi. The hidden value of travelling while asleep',
          ],
          answer: 'i. A golden age that few people noticed ending',
          explanation:
            'Paragraph A describes the romantic heyday of the sleeper and how the services vanished with "few travellers" mourning them.',
        },
        {
          id: 28,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph B.',
          options: [
            'i. A golden age that few people noticed ending',
            'ii. The high cost of keeping sleepers running',
            'iii. An environmental change of heart',
            'iv. Governments step in to help',
            'v. Practical obstacles to the comeback',
            'vi. The hidden value of travelling while asleep',
          ],
          answer: 'ii. The high cost of keeping sleepers running',
          explanation:
            'Paragraph B explains that "the reasons behind the decline were largely financial" — expensive carriages and cheap flights.',
        },
        {
          id: 29,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph C.',
          options: [
            'i. A golden age that few people noticed ending',
            'ii. The high cost of keeping sleepers running',
            'iii. An environmental change of heart',
            'iv. Governments step in to help',
            'v. Practical obstacles to the comeback',
            'vi. The hidden value of travelling while asleep',
          ],
          answer: 'iii. An environmental change of heart',
          explanation:
            'Paragraph C attributes the return to "a growing concern about the environment" and lower carbon emissions.',
        },
        {
          id: 30,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph D.',
          options: [
            'i. A golden age that few people noticed ending',
            'ii. The high cost of keeping sleepers running',
            'iii. An environmental change of heart',
            'iv. Governments step in to help',
            'v. Practical obstacles to the comeback',
            'vi. The hidden value of travelling while asleep',
          ],
          answer: 'iv. Governments step in to help',
          explanation:
            'Paragraph D describes countries investing "public money in reopening cross-border night routes".',
        },
        {
          id: 31,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph E.',
          options: [
            'i. A golden age that few people noticed ending',
            'ii. The high cost of keeping sleepers running',
            'iii. An environmental change of heart',
            'iv. Governments step in to help',
            'v. Practical obstacles to the comeback',
            'vi. The hidden value of travelling while asleep',
          ],
          answer: 'v. Practical obstacles to the comeback',
          explanation:
            'Paragraph E lists difficulties: building carriages takes years, different signalling systems, ticketing problems.',
        },
        {
          id: 32,
          type: 'matching-headings',
          prompt: 'Choose the most suitable heading for Paragraph F.',
          options: [
            'i. A golden age that few people noticed ending',
            'ii. The high cost of keeping sleepers running',
            'iii. An environmental change of heart',
            'iv. Governments step in to help',
            'v. Practical obstacles to the comeback',
            'vi. The hidden value of travelling while asleep',
          ],
          answer: 'vi. The hidden value of travelling while asleep',
          explanation:
            'Paragraph F stresses that a night train "uses time that would otherwise be wasted" because you travel while you sleep.',
        },
        {
          id: 33,
          type: 'multiple-choice',
          prompt: 'According to the passage, why did many sleeper services close in the early 2000s?',
          options: [
            'Passengers complained that the bunks were uncomfortable.',
            'Cheap flights allowed people to make the same trip far more quickly.',
            'Governments banned overnight rail travel for safety reasons.',
            'The trains were too slow to keep to their timetables.',
          ],
          answer: 'Cheap flights allowed people to make the same trip far more quickly.',
          explanation:
            'Paragraph A: "Cheap flights made it possible to cross the same distance in two hours rather than twelve".',
        },
        {
          id: 34,
          type: 'multiple-choice',
          prompt: 'What does the passage say is the main force behind the night train’s recent revival?',
          options: [
            'A wave of nostalgia for old-fashioned travel.',
            'Falling ticket prices on sleeper routes.',
            'Concern about the environmental impact of flying.',
            'A shortage of seats on daytime trains.',
          ],
          answer: 'Concern about the environmental impact of flying.',
          explanation:
            'Paragraph C: the change "has been driven less by nostalgia than by a growing concern about the environment".',
        },
        {
          id: 35,
          type: 'yes-no-notgiven',
          prompt:
            'The writer believes the closure of sleeper services in the past was caused mainly by money problems.',
          answer: 'YES',
          explanation:
            'Paragraph B opens, "The reasons behind the decline were largely financial", which agrees with the statement — YES.',
        },
        {
          id: 36,
          type: 'yes-no-notgiven',
          prompt:
            'The writer claims that older passengers are the main group booking the new sleeper services.',
          answer: 'NO',
          explanation:
            'Paragraph C says bookings have risen "particularly among younger passengers", contradicting the statement — NO.',
        },
        {
          id: 37,
          type: 'yes-no-notgiven',
          prompt:
            'The writer states that night-train tickets are now cheaper than budget air fares.',
          answer: 'NOT GIVEN',
          explanation:
            'The passage compares carbon emissions and past airline prices but does not claim current sleeper tickets are cheaper than flights — NOT GIVEN.',
        },
        {
          id: 38,
          type: 'sentence-completion',
          prompt:
            'Running one train across many borders is complicated because countries use different signalling systems and ____.',
          answer: ['safety rules', 'different safety rules'],
          explanation:
            'Paragraph E: "Different countries use different signalling systems and safety rules".',
        },
        {
          id: 39,
          type: 'sentence-completion',
          prompt:
            'On some routes, demand already exceeds the number of ____ that are available.',
          answer: ['beds', 'beds available'],
          explanation:
            'Paragraph E ends: "demand on some routes already outstrips the number of beds available".',
        },
        {
          id: 40,
          type: 'summary-completion',
          prompt:
            'Summary: Supporters argue that a night train makes good use of time because the journey happens while passengers ____, so it costs them no waking hours.',
          answer: ['sleep', 'are asleep'],
          explanation:
            'Paragraph F: "a journey that takes place while you sleep costs you no waking hours at all".',
        },
      ],
    },
  ],

  // ===========================================================================
  // LISTENING — 4 sections, ~10 questions each (10+10+10+10 = 40).
  // ===========================================================================
  listening: [
    // -------------------------------------------------------------------------
    // SECTION 1 — everyday social conversation (booking / enquiry). 10 Qs.
    // -------------------------------------------------------------------------
    {
      number: 1,
      title: 'Section 1 — Booking a Holiday Cottage',
      transcript:
        'AGENT: Good morning, Lakeside Cottage Holidays, Megan speaking. How can I help you?\n' +
        'CALLER: Hello, I’d like to book a cottage for a short break next month, please.\n' +
        'AGENT: Of course. Can I take your name first?\n' +
        'CALLER: Yes, it’s Daniel Forsythe. That’s F-O-R-S-Y-T-H-E.\n' +
        'AGENT: Thank you, Mr Forsythe. And which dates were you thinking of?\n' +
        'CALLER: We’d like to arrive on the fourteenth of August and stay for four nights.\n' +
        'AGENT: So that’s check-in on the fourteenth, leaving on the eighteenth. How many people will be staying?\n' +
        'CALLER: There will be five of us — two adults and three children.\n' +
        'AGENT: In that case I’d recommend our Willow Cottage. It sleeps six and it has a large garden. The price for four nights at that time of year is four hundred and eighty pounds.\n' +
        'CALLER: That sounds fine. Does that include anything extra?\n' +
        'AGENT: Yes, it includes bed linen and towels, and there’s free parking for two cars. Wi-Fi is also included. The only thing we ask for separately is a refundable deposit of fifty pounds against any damage.\n' +
        'CALLER: All right. Is the cottage near the lake itself?\n' +
        'AGENT: It’s about a ten-minute walk from the water, and the nearest village shop is just across the road, which is very handy. There’s also a footpath that leads directly to the main walking trails.\n' +
        'CALLER: Lovely. One more thing — we’ll be bringing our dog. Is that a problem?\n' +
        'AGENT: Not at all, Willow Cottage is pet-friendly, but we do charge an additional twenty pounds to cover extra cleaning. Please keep the dog off the furniture and out of the bedrooms.\n' +
        'CALLER: That’s no trouble. How would you like me to pay?\n' +
        'AGENT: You can pay the deposit now by card to secure the booking, and the balance is due two weeks before you arrive. I’ll send a confirmation email to you today — could I take your address?\n' +
        'CALLER: It’s daniel.forsythe@webmail.com. And could you send me directions as well? We’ll be driving from the south.\n' +
        'AGENT: Certainly. Leave the motorway at junction twelve and follow the brown tourist signs for about six miles. I’ll include a map in the email.',
      questions: [
        {
          id: 1,
          type: 'note-completion',
          prompt: 'Caller’s surname: ____',
          answer: ['Forsythe', 'FORSYTHE'],
          explanation: 'The caller spells it out: "F-O-R-S-Y-T-H-E."',
        },
        {
          id: 2,
          type: 'note-completion',
          prompt: 'Arrival date: ____ of August',
          answer: ['fourteenth', '14th', '14'],
          explanation: '"We’d like to arrive on the fourteenth of August."',
        },
        {
          id: 3,
          type: 'note-completion',
          prompt: 'Number of nights: ____',
          answer: ['four', '4'],
          explanation: 'The caller wants to "stay for four nights".',
        },
        {
          id: 4,
          type: 'note-completion',
          prompt: 'Total number of guests: ____',
          answer: ['five', '5'],
          explanation: '"There will be five of us — two adults and three children."',
        },
        {
          id: 5,
          type: 'note-completion',
          prompt: 'Recommended cottage name: ____ Cottage',
          answer: ['Willow'],
          explanation: 'The agent recommends "our Willow Cottage".',
        },
        {
          id: 6,
          type: 'note-completion',
          prompt: 'Price for the stay: £____',
          answer: ['480', 'four hundred and eighty', '480 pounds'],
          explanation: '"The price for four nights at that time of year is four hundred and eighty pounds."',
        },
        {
          id: 7,
          type: 'note-completion',
          prompt: 'Refundable damage deposit: £____',
          answer: ['50', 'fifty', 'fifty pounds'],
          explanation: '"a refundable deposit of fifty pounds against any damage."',
        },
        {
          id: 8,
          type: 'multiple-choice',
          prompt: 'How far is the cottage from the lake?',
          options: [
            'Right beside the water',
            'About a ten-minute walk',
            'Six miles away',
            'A short drive',
          ],
          answer: 'About a ten-minute walk',
          explanation: '"It’s about a ten-minute walk from the water."',
        },
        {
          id: 9,
          type: 'note-completion',
          prompt: 'Extra charge for bringing a dog: £____',
          answer: ['20', 'twenty', 'twenty pounds'],
          explanation: '"we do charge an additional twenty pounds to cover extra cleaning."',
        },
        {
          id: 10,
          type: 'short-answer',
          prompt: 'When is the balance of the payment due?',
          answer: ['two weeks before arrival', 'two weeks before you arrive', 'two weeks before'],
          explanation: '"the balance is due two weeks before you arrive."',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // SECTION 2 — monologue: information about a place / event. 10 Qs.
    // -------------------------------------------------------------------------
    {
      number: 2,
      title: 'Section 2 — A Guide to the Community Sports Centre',
      transcript:
        'Hello everyone, and welcome to the Parkview Community Sports Centre. My name is Rachel and I’m the duty manager, so let me give you a quick tour of what we offer before you join up. The centre is open from six in the morning until ten at night on weekdays, and from eight until eight at weekends. As you came in, you passed the reception desk on your right; that’s where you collect your membership card and book any classes.\n\n' +
        'Straight ahead of reception is the main sports hall. We use it for basketball, badminton and five-a-side football, and it can be divided into three smaller courts when several groups want to play at once. To book a court, please speak to reception or use the app; courts can be reserved up to seven days in advance, and we ask that you cancel at least four hours beforehand if your plans change, otherwise we charge a small fee.\n\n' +
        'The swimming pool is downstairs, next to the changing rooms. There are two pools: a twenty-five-metre main pool for lengths, and a smaller, shallower pool that is ideal for young children and beginners. Lessons take place every morning and on Saturday afternoons. Remember that the main pool is reserved for adults only between seven and nine in the evening, so families with children should plan around that.\n\n' +
        'Upstairs you’ll find the fitness suite, which has just been refitted with new running machines and weights. A member of staff is always on hand there, and we strongly recommend that first-time users book a free induction session before using the equipment on their own. The studio next door hosts our class timetable — yoga, spin, dance and circuit training. Most classes are included in your membership, although a few specialist sessions carry a small extra charge.\n\n' +
        'Finally, a few practical points. The car park is free for members for up to two hours; after that you should display your membership card on the dashboard to avoid a charge. We have a small café by the entrance serving drinks and light meals until nine each evening. And please note that lockers are operated by a one-pound coin, which is returned to you when you collect your belongings. If you have any questions during your visit, just ask any member of staff — we’re all happy to help.',
      questions: [
        {
          id: 11,
          type: 'note-completion',
          prompt: 'Weekday opening hours: 6 a.m. until ____ p.m.',
          answer: ['ten', '10', '10 p.m.'],
          explanation: '"open from six in the morning until ten at night on weekdays".',
        },
        {
          id: 12,
          type: 'multiple-choice',
          prompt: 'Where do members collect their membership card?',
          options: ['The fitness suite', 'The reception desk', 'The main sports hall', 'The café'],
          answer: 'The reception desk',
          explanation: '"that’s where you collect your membership card and book any classes."',
        },
        {
          id: 13,
          type: 'note-completion',
          prompt: 'The main sports hall can be divided into ____ smaller courts.',
          answer: ['three', '3'],
          explanation: '"it can be divided into three smaller courts".',
        },
        {
          id: 14,
          type: 'note-completion',
          prompt: 'Courts can be booked up to ____ days in advance.',
          answer: ['seven', '7'],
          explanation: '"courts can be reserved up to seven days in advance".',
        },
        {
          id: 15,
          type: 'short-answer',
          prompt: 'How long before a booking must a court be cancelled to avoid a fee?',
          answer: ['four hours', '4 hours', 'at least four hours'],
          explanation: '"we ask that you cancel at least four hours beforehand".',
        },
        {
          id: 16,
          type: 'note-completion',
          prompt: 'Length of the main swimming pool: ____ metres',
          answer: ['twenty-five', '25', 'twenty five'],
          explanation: '"a twenty-five-metre main pool for lengths".',
        },
        {
          id: 17,
          type: 'multiple-choice',
          prompt: 'When is the main pool reserved for adults only?',
          options: [
            'Every morning',
            'On Saturday afternoons',
            'Between seven and nine in the evening',
            'All day at weekends',
          ],
          answer: 'Between seven and nine in the evening',
          explanation: '"the main pool is reserved for adults only between seven and nine in the evening".',
        },
        {
          id: 18,
          type: 'true-false-notgiven',
          prompt: 'First-time users of the fitness suite are advised to book an induction session.',
          answer: 'TRUE',
          explanation: '"we strongly recommend that first-time users book a free induction session".',
        },
        {
          id: 19,
          type: 'short-answer',
          prompt: 'For how long is the car park free for members?',
          answer: ['two hours', '2 hours', 'up to two hours'],
          explanation: '"The car park is free for members for up to two hours".',
        },
        {
          id: 20,
          type: 'note-completion',
          prompt: 'Lockers are operated by a ____ coin.',
          answer: ['one-pound', 'one pound', '£1', 'pound'],
          explanation: '"lockers are operated by a one-pound coin".',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // SECTION 3 — academic discussion between students/tutor. 10 Qs.
    // -------------------------------------------------------------------------
    {
      number: 3,
      title: 'Section 3 — Planning a Group Research Project',
      transcript:
        'TUTOR: Right, so the two of you are working together on the research project about food waste in the city. Where have you got to?\n' +
        'LEELA: Well, we’ve agreed on the topic, but we’re still deciding how to collect our data.\n' +
        'TUTOR: Good. What options have you considered?\n' +
        'SAM: We thought about three approaches. First, a survey of households; second, interviews with local restaurants; and third, observing what supermarkets throw away.\n' +
        'TUTOR: All sensible. But remember you only have six weeks, so you can’t do everything thoroughly.\n' +
        'LEELA: That’s what we were worried about. I think the household survey is the most practical, because we can send it out online and reach a lot of people quickly.\n' +
        'TUTOR: I agree the survey should be your main method. What about the restaurant interviews?\n' +
        'SAM: We were keen on those, but actually arranging them is hard — managers are busy and many didn’t reply to our emails.\n' +
        'TUTOR: So perhaps keep interviews as a smaller, secondary part. Maybe just two or three restaurants rather than ten. Quality over quantity.\n' +
        'LEELA: That makes sense. And we could drop the supermarket observation, which would take a lot of time for not much data.\n' +
        'TUTOR: Yes, I’d let that one go. Now, about the survey itself — how long is it?\n' +
        'SAM: At the moment it has about twenty-five questions, but I think that’s too many. People give up halfway through.\n' +
        'TUTOR: Definitely. Try to cut it to around ten. Make sure the most important questions come first, in case people stop early.\n' +
        'LEELA: Good idea. Should we offer anything to encourage people to complete it?\n' +
        'TUTOR: A small prize draw can help, but check the university’s ethics rules first — you may need approval before you collect any data at all. Don’t skip that step; projects have been delayed because students forgot it.\n' +
        'SAM: We’ll apply for ethics approval this week, then. How should we divide the work?\n' +
        'TUTOR: I’d suggest one of you leads on designing and sending the survey, and the other organises the interviews and starts reading the background literature. Then you both analyse the results together at the end.\n' +
        'LEELA: I’m happy to take the survey, since I’ve used the online tool before.\n' +
        'SAM: And I’ll handle the interviews and the reading.\n' +
        'TUTOR: Perfect. One last thing — don’t leave the writing until the final week. Start drafting your introduction and method sections as soon as the survey is out, while the details are fresh.',
      questions: [
        {
          id: 21,
          type: 'multiple-choice',
          prompt: 'What is the topic of the students’ research project?',
          options: [
            'Healthy eating in schools',
            'Food waste in the city',
            'The cost of restaurant meals',
            'Supermarket pricing',
          ],
          answer: 'Food waste in the city',
          explanation: 'The tutor says it is "the research project about food waste in the city".',
        },
        {
          id: 22,
          type: 'note-completion',
          prompt: 'Time available for the project: ____ weeks',
          answer: ['six', '6'],
          explanation: '"you only have six weeks".',
        },
        {
          id: 23,
          type: 'multiple-choice',
          prompt: 'Which method do they decide should be their main approach?',
          options: [
            'A household survey',
            'Restaurant interviews',
            'Supermarket observation',
            'Library research',
          ],
          answer: 'A household survey',
          explanation: 'Leela suggests the household survey and the tutor agrees "the survey should be your main method".',
        },
        {
          id: 24,
          type: 'short-answer',
          prompt: 'Why did the students find restaurant interviews difficult to arrange?',
          answer: ['managers were busy', 'managers are busy', 'managers did not reply', 'busy managers'],
          explanation: '"managers are busy and many didn’t reply to our emails."',
        },
        {
          id: 25,
          type: 'multiple-choice',
          prompt: 'What does the tutor advise about the supermarket observation?',
          options: [
            'Make it the main method',
            'Drop it entirely',
            'Do it after the survey',
            'Combine it with interviews',
          ],
          answer: 'Drop it entirely',
          explanation: 'When Leela suggests dropping it, the tutor replies "Yes, I’d let that one go."',
        },
        {
          id: 26,
          type: 'note-completion',
          prompt: 'The survey should be cut to around ____ questions.',
          answer: ['ten', '10'],
          explanation: 'The tutor says, "Try to cut it to around ten."',
        },
        {
          id: 27,
          type: 'sentence-completion',
          prompt: 'The most important questions should come ____ in the survey.',
          answer: ['first', 'at the start', 'at the beginning'],
          explanation: '"Make sure the most important questions come first."',
        },
        {
          id: 28,
          type: 'short-answer',
          prompt: 'What must the students obtain before collecting any data?',
          answer: ['ethics approval', 'ethical approval', 'approval'],
          explanation: 'The tutor warns "you may need approval" under the university’s ethics rules; Sam says "We’ll apply for ethics approval this week."',
        },
        {
          id: 29,
          type: 'multiple-choice',
          prompt: 'Who will take responsibility for the survey?',
          options: ['Sam', 'Leela', 'The tutor', 'Both students equally'],
          answer: 'Leela',
          explanation: 'Leela says, "I’m happy to take the survey, since I’ve used the online tool before."',
        },
        {
          id: 30,
          type: 'short-answer',
          prompt: 'According to the tutor, which sections should the students begin writing early?',
          answer: ['the introduction and method', 'introduction and method', 'introduction and method sections'],
          explanation: '"Start drafting your introduction and method sections as soon as the survey is out."',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // SECTION 4 — academic lecture / talk. 10 Qs.
    // -------------------------------------------------------------------------
    {
      number: 4,
      title: 'Section 4 — A Short Talk on Urban Bees',
      transcript:
        'Good afternoon. Today I want to talk about an unexpected success story in our cities: the bee. When we picture bees, most of us imagine open countryside, fields of flowers and the occasional country beekeeper. Yet over the past twenty years, researchers have discovered that towns and cities can actually be surprisingly good places for bees to live — sometimes better, in fact, than the farmland that surrounds them.\n\n' +
        'To understand why, it helps to look at what bees need. They require three main things: a steady supply of flowers across the seasons, safe places to nest, and an environment free from harmful chemicals. Modern farmland often fails on all three counts. Large fields are frequently planted with a single crop that flowers for only a few weeks, leaving bees with little to eat for the rest of the year. Hedges and wild corners, where bees once nested, have in many places been removed. And the widespread use of pesticides can weaken or kill them.\n\n' +
        'Cities, by contrast, can offer a more varied diet. Parks, gardens, balconies and even roadside verges contain an enormous range of plants, many chosen precisely because they flower at different times. As a result, a city bee may find food from early spring right through to autumn. Gardens are especially valuable: a single street of well-planted gardens can support more species of bee than a large field of one crop.\n\n' +
        'Temperature plays a part too. Cities are generally a little warmer than the surrounding countryside, an effect scientists call the urban heat island. This warmth allows bees to become active earlier in the year and to keep foraging later into the autumn, extending the season in which they can gather food.\n\n' +
        'There are, of course, dangers in the city as well. Traffic, pollution and the loss of green space to building all threaten urban bees. But the good news is that ordinary people can make a real difference. Planting flowers that bloom at different times of year, leaving a patch of the garden a little wild, and avoiding chemical sprays all help. Even a window box can provide a useful stepping stone for a passing bee.\n\n' +
        'Why does any of this matter? Bees are vital pollinators. Roughly one in three mouthfuls of the food we eat depends, directly or indirectly, on insect pollination. By making our cities more welcoming to bees, we are not only helping a fascinating group of insects; we are also protecting part of the system that feeds us. So the next time you see a bee on a city flower, remember that it is doing important work — and that you can help it.',
      questions: [
        {
          id: 31,
          type: 'sentence-completion',
          prompt:
            'Researchers have found that cities can be surprisingly good places for bees, sometimes better than the surrounding ____.',
          answer: ['farmland', 'countryside'],
          explanation: '"sometimes better, in fact, than the farmland that surrounds them."',
        },
        {
          id: 32,
          type: 'note-completion',
          prompt: 'Bees need three main things: a supply of flowers, safe places to ____, and a chemical-free environment.',
          answer: ['nest'],
          explanation: '"safe places to nest, and an environment free from harmful chemicals."',
        },
        {
          id: 33,
          type: 'multiple-choice',
          prompt: 'Why does modern farmland often provide poor food for bees?',
          options: [
            'It is too cold for flowers to grow.',
            'Large fields of one crop flower only for a few weeks.',
            'Farmers deliberately remove all flowers.',
            'There are too many competing insects.',
          ],
          answer: 'Large fields of one crop flower only for a few weeks.',
          explanation: '"Large fields are frequently planted with a single crop that flowers for only a few weeks."',
        },
        {
          id: 34,
          type: 'short-answer',
          prompt: 'Name one chemical threat to bees mentioned in the talk.',
          answer: ['pesticides', 'chemical sprays', 'pesticide'],
          explanation: '"the widespread use of pesticides can weaken or kill them."',
        },
        {
          id: 35,
          type: 'sentence-completion',
          prompt:
            'In cities, bees can find food from early spring right through to ____.',
          answer: ['autumn', 'the autumn'],
          explanation: '"a city bee may find food from early spring right through to autumn."',
        },
        {
          id: 36,
          type: 'note-completion',
          prompt: 'The warming effect that makes cities warmer than the countryside is called the urban ____ island.',
          answer: ['heat'],
          explanation: '"an effect scientists call the urban heat island."',
        },
        {
          id: 37,
          type: 'true-false-notgiven',
          prompt: 'Warmer city temperatures let bees stay active for a longer part of the year.',
          answer: 'TRUE',
          explanation: '"This warmth allows bees to become active earlier... and to keep foraging later into the autumn."',
        },
        {
          id: 38,
          type: 'multiple-choice',
          prompt: 'Which of the following is suggested as a way ordinary people can help city bees?',
          options: [
            'Keeping a beehive on every roof',
            'Leaving a patch of the garden a little wild',
            'Removing all flowers to reduce competition',
            'Spraying gardens regularly with insecticide',
          ],
          answer: 'Leaving a patch of the garden a little wild',
          explanation: '"leaving a patch of the garden a little wild... all help."',
        },
        {
          id: 39,
          type: 'sentence-completion',
          prompt:
            'About one in ____ mouthfuls of our food depends on insect pollination.',
          answer: ['three', '3'],
          explanation: '"Roughly one in three mouthfuls of the food we eat depends... on insect pollination."',
        },
        {
          id: 40,
          type: 'short-answer',
          prompt: 'What important role do bees play in the food system?',
          answer: ['pollination', 'pollinators', 'they pollinate plants', 'pollinating'],
          explanation: '"Bees are vital pollinators" responsible for pollinating much of our food.',
        },
      ],
    },
  ],

  // ===========================================================================
  // WRITING — Task 1 (letter) and Task 2 (essay).
  // ===========================================================================
  writing: [
    {
      task: 1,
      minWords: 150,
      prompt:
        'You recently stayed in a hotel for a short holiday and were not satisfied with your stay. ' +
        'Write a letter to the hotel manager. In your letter:\n' +
        '• give details of when you stayed and which room you had\n' +
        '• explain what went wrong during your stay\n' +
        '• say what you would like the manager to do about it\n\n' +
        'Begin your letter "Dear Sir or Madam,". You do NOT need to write any addresses. Write at least 150 words.',
      modelAnswer:
        'Dear Sir or Madam,\n\n' +
        'I am writing to express my disappointment with a recent stay at your hotel, the Maple Court, and to ask you to put matters right.\n\n' +
        'I stayed at your hotel for three nights, from 12 to 15 June, in Room 214, a double room that I had booked and paid for in advance through your website. I had chosen your hotel because of its excellent online reviews, so I was sorry that the reality did not match my expectations.\n\n' +
        'Unfortunately, several things went wrong during my stay. When I arrived, the room had not been properly cleaned, and there were no clean towels until I telephoned reception twice. More seriously, the air conditioning did not work at all, which made the room uncomfortably hot, and the noise from building work next door began very early each morning and disturbed my sleep.\n\n' +
        'As you can imagine, this was not the relaxing break I had paid for. I would therefore be grateful if you could offer me a partial refund as a gesture of goodwill, and I would appreciate your assurance that these problems will be dealt with so that future guests are not affected.\n\n' +
        'I look forward to hearing from you.\n\n' +
        'Yours faithfully,\n' +
        'James Whitfield',
      examinerNotes: [
        'Uses the correct register for a formal complaint: opens with "Dear Sir or Madam," and closes with "Yours faithfully," which match in formality.',
        'Covers all three bullet points clearly and in order — dates and room, what went wrong, and the requested action — so the task is fully achieved.',
        'Shows a strong range of structures (passives, conditionals such as "I would be grateful if you could", and complex sentences) with no errors that impede communication.',
        'The tone stays polite and reasonable throughout, which is exactly what an examiner expects in a complaint letter at Band 9.',
        'Comfortably exceeds 150 words while remaining concise and on-topic, with logical paragraphing for each stage of the complaint.',
      ],
    },
    {
      task: 2,
      minWords: 250,
      prompt:
        'Some people believe that children should be given homework every day, while others think that homework is unnecessary and that children should be free to relax after school. ' +
        'Discuss both views and give your own opinion.\n\n' +
        'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      modelAnswer:
        'The question of whether children should be set homework on a daily basis is one that divides parents and teachers alike. While some argue that regular homework is essential for academic progress, others maintain that children already work hard at school and deserve their evenings to rest. In my view, homework is valuable, but only when it is reasonable in amount and purpose.\n\n' +
        'Those who support daily homework make a number of convincing points. They argue that practising a skill at home reinforces what has been taught in class, helping information move into long-term memory. A child who solves a few mathematics problems each evening, for example, is likely to understand the method far better than one who only meets it during a single lesson. Supporters also believe that homework teaches discipline and time management, qualities that will serve students well in later life and at work.\n\n' +
        'On the other hand, opponents point out that children spend six or seven hours a day in school and need time to relax, play and spend time with their families. Too much homework, they argue, can cause stress and even turn children against learning altogether. There is also a fairness issue: pupils whose parents cannot help them, or who have no quiet place to study, may be unfairly disadvantaged by heavy homework demands.\n\n' +
        'In my opinion, both sides are partly right, and the solution lies in balance. A small amount of purposeful homework helps children consolidate their learning and develop good habits, but hours of repetitive tasks every night are counterproductive. Schools should therefore set homework that is meaningful and limited, leaving children enough time to rest and enjoy their childhood.',
      examinerNotes: [
        'Fully addresses the task: it discusses both views in separate, balanced paragraphs and states a clear personal position that is maintained throughout.',
        'The essay is logically organised with an introduction, one body paragraph per view, a clear opinion, and a concise conclusion, using cohesive devices ("On the other hand", "There is also") naturally.',
        'Demonstrates a wide lexical range with precise vocabulary such as "reinforces", "consolidate" and "counterproductive", used accurately and appropriately.',
        'Sentence structures are varied and largely error-free, including conditionals and complex subordination, which supports a Band 9 grammatical range and accuracy score.',
        'Each point is developed with a relevant explanation or example (e.g. mathematics practice, the fairness issue), so ideas are well supported rather than merely listed.',
      ],
    },
  ],

  // ===========================================================================
  // SPEAKING — Part 1 interview, Part 2 cue card, Part 3 discussion.
  // ===========================================================================
  speaking: [
    {
      part: 1,
      title: 'Part 1 — Introduction and Interview',
      questions: [
        'Let’s talk about where you live. Do you live in a house or a flat?',
        'What do you like most about the area you live in?',
        'Now let’s talk about free time. What do you usually do in your free time?',
        'Has the way you spend your free time changed since you were a child?',
        'Let’s move on to food. Do you prefer eating at home or in restaurants? Why?',
        'Is there a type of food from another country that you really enjoy?',
      ],
      sampleAnswers: [
        'I live in a flat, actually — it’s a small two-bedroom place on the fourth floor of a fairly modern building. I’ve been there for about three years now, and although it isn’t huge, it suits me well because it’s easy to keep clean and it has a lovely view over the park.',
        'I think what I like most is how convenient it is. There’s a market just around the corner, a couple of good cafes within walking distance, and the bus into the city centre stops right outside. On top of that, the neighbours are friendly, which makes it feel like a real community rather than just a place to sleep.',
        'In my free time I tend to do a mixture of active and relaxing things. I go running a few mornings a week to clear my head, and in the evenings I usually read or catch up with friends. At weekends, if the weather’s good, I love getting out of the city for a long walk in the hills.',
        'Yes, quite a lot. As a child I spent most of my free time playing outside with the other kids on my street, whereas now my free time is more planned and often involves screens — streaming a series or messaging friends online. I do try to balance that with proper outdoor exercise, though.',
        'On the whole I prefer eating at home, mainly because I enjoy cooking and I like knowing exactly what goes into my meals. That said, I do appreciate going out to a restaurant now and then, especially to try dishes that would be too complicated to make myself.',
        'Definitely — I’m a big fan of Japanese food. I love how fresh and carefully prepared it is, and sushi in particular is something I could eat every week. I think what appeals to me is the balance of flavours and the attention to presentation; it feels almost like an art form.',
      ],
    },
    {
      part: 2,
      title: 'Part 2 — Individual Long Turn (Cue Card)',
      questions: [
        'Describe a journey that you remember well. You should say:',
        '• where you went',
        '• who you went with',
        '• how you travelled',
        'and explain why you remember this journey well.',
        'You will have one minute to prepare, and then you should speak for one to two minutes. You can make notes during your preparation time.',
      ],
      sampleAnswers: [
        'I’d like to describe a journey I took a couple of years ago, when I travelled across the north of the country by train with two of my closest friends. We’d been talking about doing a trip together for ages, and one summer we finally booked a four-day rail pass and just went.\n\n' +
        'We started early one morning from the city where we all live and headed towards the coast. Rather than flying, which would have been quicker, we deliberately chose the train because we wanted to see the landscape change slowly as we went — from busy suburbs to open farmland and eventually to dramatic cliffs above the sea. We changed trains three or four times, and at each stop we got off, explored a small town for a few hours, and then caught a later service onwards.\n\n' +
        'The reason I remember this journey so well is partly the scenery, which was genuinely breathtaking, but mostly the time I spent with my friends. Because trains give you long, uninterrupted stretches of time, we ended up having the kind of long, rambling conversations that you rarely have in everyday life. We played cards, shared snacks, laughed at silly things and watched the world go by through the window.\n\n' +
        'Looking back, what made it special wasn’t reaching any particular destination — it was the journey itself. It taught me that travelling slowly can be far more rewarding than rushing, and it’s an experience the three of us still talk about whenever we meet.',
      ],
    },
    {
      part: 3,
      title: 'Part 3 — Two-way Discussion',
      questions: [
        'We’ve been talking about a memorable journey. Now I’d like to discuss travel more generally. Why do you think people enjoy travelling to new places?',
        'Some people say that the journey is more important than the destination. Do you agree?',
        'How has the way people travel changed over the past few decades?',
        'Do you think modern transport has made the world feel smaller? In what ways?',
        'What are the advantages and disadvantages of cheap air travel?',
        'How do you think people will travel in the future?',
      ],
      sampleAnswers: [
        'I think people are drawn to new places mainly out of curiosity. Travelling lets us step outside our routine and see how others live, eat and think, which can be eye-opening. There’s also an element of personal challenge — navigating an unfamiliar city or speaking a foreign language pushes us out of our comfort zone, and most people find that both exciting and rewarding.',
        'To some extent I do agree, though I think it depends on the trip. For a relaxing beach holiday the destination is clearly the point, but for many of the most memorable journeys it really is the travelling itself that matters — the conversations, the scenery and the unexpected moments along the way. Personally, some of my happiest travel memories have nothing to do with where I ended up.',
        'It’s changed enormously. A few decades ago, long-distance travel was expensive and relatively rare, so a trip abroad was a major event that people saved up for. Now, with budget airlines and online booking, flying has become almost ordinary, and far more people travel regularly. Technology has also transformed the experience — we navigate with our phones and book everything in advance instead of relying on guidebooks and local knowledge.',
        'In many ways, yes. You can now reach the other side of the planet in less than a day, and you can speak to people anywhere instantly, so distances that once felt enormous now feel manageable. However, I’d argue the world only feels smaller for those who can afford to travel; for many people, cost and visa restrictions still make it feel very large indeed.',
        'The obvious advantage is access: cheap flights have allowed ordinary families, students and workers to see places that were once the preserve of the wealthy, and they’ve boosted tourism and trade in many regions. The downside, though, is significant. Air travel is a major source of carbon emissions, and very low prices can encourage wasteful, frequent flying. Popular destinations can also suffer from overcrowding, which damages both the environment and local communities.',
        'I suspect we’ll see a real push towards cleaner forms of transport. Electric and hydrogen-powered vehicles are likely to become standard, and I think high-speed and overnight trains may make a comeback for medium-distance trips as people become more conscious of emissions. In the longer term, there’s a lot of talk about autonomous vehicles and even greener aircraft, though I think changing people’s habits will be just as important as inventing new technology.',
      ],
    },
  ],
};
