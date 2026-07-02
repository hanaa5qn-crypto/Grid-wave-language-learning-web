// =============================================================================
// Vivid Lingua — English track · IELTS Listening expansion (A1–A2)
// -----------------------------------------------------------------------------
// Mass-produced, verified A1–A2 listening bank (ids 101–135). British English
// transcripts written for the Azure neural voice en-GB-SoniaNeural, in the
// IELTS Section-1 style (transactional dialogues and short announcements).
// Conforms exactly to the ListeningItem interface in ../types.
// =============================================================================

import type { ListeningItem } from '../types';

export const IELTS_EXP_LISTENING_A: ListeningItem[] = [
  // ----- A1 (ids 101–117) ----------------------------------------------------
  {
    id: 101,
    level: 'A1',
    topic: 'Health',
    title: 'At the Doctor\'s',
    transcript:
      'Good morning. I have an appointment with Doctor Green. — What is your name, please? — Peter Lang. — Thank you, Mr Lang. Please take a seat. The doctor will see you in ten minutes, in Room 5. The pharmacy is in Room 3. — Doctor Green: Hello, Mr Lang. What is the problem? — I have a headache and a sore throat. — Let\'s check your temperature. It is thirty-eight degrees. Please take this medicine two times a day, after meals, and come back in one week if needed. — Thank you, Doctor.',
    questions: [
      { id: 1, question: 'Which room does Doctor Green see Peter in?', choices: ['Room 5', 'Room 3', 'Room 8', 'Room 10'], correctIndex: 0, explanation: '"in Room 5."' },
      { id: 2, question: 'What is Peter\'s temperature?', choices: ['Thirty-six degrees', 'Thirty-eight degrees', 'Forty degrees', 'Thirty-nine degrees'], correctIndex: 1, explanation: '"It is thirty-eight degrees."' },
      { id: 3, question: 'How often should Peter take the medicine?', choices: ['Once a day', 'Three times a day', 'Two times a day', 'Four times a day'], correctIndex: 2, explanation: '"two times a day"' },
    ],
  },
  {
    id: 102,
    level: 'A1',
    topic: 'Transport',
    title: 'Buying a Bus Ticket',
    transcript:
      'Hello, I would like a ticket to Riverside, please. — Single or return? — Return, please. — That is four pounds fifty. — Here you are. — Thank you. The bus leaves from Stop 2 at half past ten. — Is Stop 2 near here? — Yes, it is just outside, next to the café. — Thank you very much. — You are welcome. Have a safe trip!',
    questions: [
      { id: 1, question: 'Where does the bus to Riverside leave from?', choices: ['Stop 5', 'Stop 3', 'Stop 1', 'Stop 2'], correctIndex: 3, explanation: '"leaves from Stop 2."' },
      { id: 2, question: 'How much is the return ticket?', choices: ['Four pounds fifty', 'Five pounds', 'Four pounds', 'Three pounds fifty'], correctIndex: 0, explanation: '"That is four pounds fifty."' },
      { id: 3, question: 'What time does the bus leave?', choices: ['Ten o\'clock', 'Half past ten', 'Quarter past ten', 'Eleven o\'clock'], correctIndex: 1, explanation: '"at half past ten."' },
    ],
  },
  {
    id: 103,
    level: 'A1',
    topic: 'Travel',
    title: 'A Hotel Check-in',
    transcript:
      'Good evening. Welcome to Park Hotel. Do you have a booking? — Yes, the name is Sara Kim. — One moment... yes, a single room for two nights. — That\'s right. — Your room is number 214, on the second floor. Breakfast is from seven to nine in the morning. — Is there wifi in the room? — Yes, the password is on the desk. Here is your key. — Thank you very much. — Enjoy your stay!',
    questions: [
      { id: 1, question: 'What is Sara\'s room number?', choices: ['114', '241', '214', '412'], correctIndex: 2, explanation: '"Your room is number 214"' },
      { id: 2, question: 'How many nights does Sara stay?', choices: ['One night', 'Three nights', 'Four nights', 'Two nights'], correctIndex: 3, explanation: '"a single room for two nights."' },
      { id: 3, question: 'When is breakfast served?', choices: ['Seven to nine', 'Eight to ten', 'Six to eight', 'Seven to eight'], correctIndex: 0, explanation: '"Breakfast is from seven to nine in the morning."' },
    ],
  },
  {
    id: 104,
    level: 'A1',
    topic: 'Daily life',
    title: 'My Daily Routine',
    transcript:
      'My name is Lucy. I wake up at seven o\'clock every day. First, I have a shower and get dressed. Then I eat breakfast — usually toast and orange juice. I leave home at eight fifteen and walk to work. I start work at nine o\'clock. At one o\'clock, I have lunch with my colleagues. I finish work at five o\'clock and go home by bus. In the evening, I cook dinner and watch television. I go to bed at eleven o\'clock.',
    questions: [
      { id: 1, question: 'What time does Lucy start work?', choices: ['Eight fifteen', 'Nine o\'clock', 'Seven o\'clock', 'Five o\'clock'], correctIndex: 1, explanation: '"I start work at nine o\'clock."' },
      { id: 2, question: 'What time does Lucy finish work?', choices: ['Nine o\'clock', 'One o\'clock', 'Five o\'clock', 'Eleven o\'clock'], correctIndex: 2, explanation: '"I finish work at five o\'clock"' },
      { id: 3, question: 'What time does Lucy go to bed?', choices: ['Eight o\'clock', 'Nine o\'clock', 'Ten o\'clock', 'Eleven o\'clock'], correctIndex: 3, explanation: '"I go to bed at eleven o\'clock."' },
    ],
  },
  {
    id: 105,
    level: 'A1',
    topic: 'Shopping',
    title: 'At the Supermarket',
    transcript:
      'Excuse me, where can I find rice? — It\'s in aisle three, next to the pasta. — Thank you. Do you sell fresh bread? — Yes, the bakery is at the front, near the entrance. — Great, one more thing — is there a discount on eggs today? — Yes, a box of eggs is one pound twenty instead of one pound fifty. — Wonderful, I\'ll take two boxes. — That\'s two pounds forty. Anything else? — No, that\'s all, thank you.',
    questions: [
      { id: 1, question: 'Where is the rice?', choices: ['Aisle three', 'Aisle one', 'Near the entrance', 'At the back'], correctIndex: 0, explanation: '"It\'s in aisle three"' },
      { id: 2, question: 'What is the discounted price of a box of eggs?', choices: ['One pound fifty', 'One pound twenty', 'Two pounds forty', 'One pound'], correctIndex: 1, explanation: '"one pound twenty instead of one pound fifty."' },
      { id: 3, question: 'Where is the bakery?', choices: ['In aisle three', 'Next to the pasta', 'Near the entrance', 'At the back'], correctIndex: 2, explanation: '"the bakery is at the front, near the entrance."' },
    ],
  },
  {
    id: 106,
    level: 'A1',
    topic: 'Announcements',
    title: 'An Opening Hours Announcement',
    transcript:
      'Good morning, shoppers. Welcome to Greenfield Mall. Please note our opening hours: Monday to Friday, we are open from nine in the morning until eight in the evening. On Saturday, we open one hour later, at ten o\'clock, and close at seven. On Sunday, the mall is open from eleven until five. The information desk is on the ground floor, next to the main entrance. Thank you for shopping with us today, and enjoy your visit.',
    questions: [
      { id: 1, question: 'What time does the mall open on Saturday?', choices: ['Nine o\'clock', 'Eight o\'clock', 'Eleven o\'clock', 'Ten o\'clock'], correctIndex: 3, explanation: '"On Saturday, we open one hour later, at ten o\'clock"' },
      { id: 2, question: 'What time does the mall close on Sunday?', choices: ['Five o\'clock', 'Seven o\'clock', 'Eight o\'clock', 'Eleven o\'clock'], correctIndex: 0, explanation: '"the mall is open from eleven until five."' },
      { id: 3, question: 'Where is the information desk?', choices: ['First floor', 'Ground floor, next to the entrance', 'Second floor', 'Outside the mall'], correctIndex: 1, explanation: '"The information desk is on the ground floor, next to the main entrance."' },
    ],
  },
  {
    id: 107,
    level: 'A1',
    topic: 'Social life',
    title: 'A Birthday Invitation',
    transcript:
      'Hi Emma, it\'s my birthday next Saturday. Would you like to come to my party? — Of course! What time should I come? — The party starts at four o\'clock, at my house on Hill Street. — Should I bring anything? — Just bring your good mood! Oh, and we\'re having pizza and a chocolate cake. — Sounds great, I\'ll be there. Should I bring a present? — You don\'t have to, but flowers are always nice. — Okay, see you on Saturday at four!',
    questions: [
      { id: 1, question: 'Where is the party?', choices: ['At school', 'At a restaurant', 'At the house on Hill Street', 'At the park'], correctIndex: 2, explanation: '"at my house on Hill Street."' },
      { id: 2, question: 'What food will they have?', choices: ['Sandwiches', 'Soup', 'Fruit salad', 'Pizza and chocolate cake'], correctIndex: 3, explanation: '"we\'re having pizza and a chocolate cake."' },
      { id: 3, question: 'What time does the party start?', choices: ['Four o\'clock', 'Five o\'clock', 'Three o\'clock', 'Six o\'clock'], correctIndex: 0, explanation: '"The party starts at four o\'clock"' },
    ],
  },
  {
    id: 108,
    level: 'A1',
    topic: 'Directions',
    title: 'Directions to the Bank',
    transcript:
      'Excuse me, how do I get to the bank? — Go straight ahead and turn right at the bakery. — Turn right at the bakery, okay. — Then walk past the park, and the bank is on the left, next to the chemist. — Is it far? — No, it\'s about five minutes on foot. — Thank you very much. — You\'re welcome. Oh, and the bank closes at half past four today.',
    questions: [
      { id: 1, question: 'Where should you turn right?', choices: ['At the park', 'At the chemist', 'At the bakery', 'At the bank'], correctIndex: 1, explanation: '"turn right at the bakery."' },
      { id: 2, question: 'What is the bank next to?', choices: ['The bakery', 'The park', 'The chemist', 'The station'], correctIndex: 2, explanation: '"the bank is on the left, next to the chemist."' },
      { id: 3, question: 'What time does the bank close today?', choices: ['Four o\'clock', 'Five o\'clock', 'Half past three', 'Half past four'], correctIndex: 3, explanation: '"the bank closes at half past four today."' },
    ],
  },
  {
    id: 109,
    level: 'A1',
    topic: 'Errands',
    title: 'At the Post Office',
    transcript:
      'Good afternoon. I would like to send this parcel to Spain. — Okay, let\'s weigh it... it is two kilograms. — How much will it cost? — By standard post, it is six pounds. By express post, it is eleven pounds and arrives in two days. — I\'ll take the express, please. — Sure. Do you need stamps too? — Yes, five stamps, please. — That\'s eleven pounds for the parcel, plus two pounds fifty for the stamps.',
    questions: [
      { id: 1, question: 'How much does the parcel weigh?', choices: ['Two kilograms', 'One kilogram', 'Three kilograms', 'Five kilograms'], correctIndex: 0, explanation: '"it is two kilograms."' },
      { id: 2, question: 'How much is the express post?', choices: ['Six pounds', 'Eleven pounds', 'Two pounds fifty', 'Five pounds'], correctIndex: 1, explanation: '"By express post, it is eleven pounds"' },
      { id: 3, question: 'How many stamps does the customer buy?', choices: ['Two', 'Six', 'Five', 'Eleven'], correctIndex: 2, explanation: '"five stamps, please."' },
    ],
  },
  {
    id: 110,
    level: 'A1',
    topic: 'Weather',
    title: 'Today\'s Weather',
    transcript:
      'Good morning! Here is today\'s weather. This morning, it is cloudy with a little rain. By midday, the rain will stop and the sun will come out. The temperature will be sixteen degrees in the afternoon. In the evening, it will get cooler, around ten degrees, so bring a jacket if you go out. Tomorrow will be sunny all day. That\'s all from the weather team — have a good day!',
    questions: [
      { id: 1, question: 'What is the weather like in the morning?', choices: ['Sunny', 'Hot', 'Snowy', 'Cloudy with a little rain'], correctIndex: 3, explanation: '"This morning, it is cloudy with a little rain."' },
      { id: 2, question: 'What is the temperature in the afternoon?', choices: ['Sixteen degrees', 'Ten degrees', 'Twenty degrees', 'Six degrees'], correctIndex: 0, explanation: '"The temperature will be sixteen degrees in the afternoon."' },
      { id: 3, question: 'What will the weather be like tomorrow?', choices: ['Rainy', 'Sunny all day', 'Cloudy', 'Cold and windy'], correctIndex: 1, explanation: '"Tomorrow will be sunny all day."' },
    ],
  },
  {
    id: 111,
    level: 'A1',
    topic: 'Everyday problems',
    title: 'A Lost Umbrella',
    transcript:
      'Excuse me, I think I lost my umbrella here yesterday. — What colour is it? — It\'s blue, with white spots. — Let me check... yes, we have a blue umbrella here. — Oh wonderful, thank you! — Can I have your name, please? — It\'s Daniel Cho. — Okay, Mr Cho, please sign this paper. — Thank you so much. Where did you find it? — A cleaner found it near the café on the second floor.',
    questions: [
      { id: 1, question: 'What colour is the umbrella?', choices: ['Black', 'Red', 'Blue with white spots', 'Green'], correctIndex: 2, explanation: '"It\'s blue, with white spots."' },
      { id: 2, question: 'What is the customer\'s name?', choices: ['David Cho', 'Daniel Kim', 'Daniel Choi', 'Daniel Cho'], correctIndex: 3, explanation: '"It\'s Daniel Cho."' },
      { id: 3, question: 'Where was the umbrella found?', choices: ['Near the café', 'In the car park', 'At the entrance', 'On the first floor'], correctIndex: 0, explanation: '"A cleaner found it near the café on the second floor."' },
    ],
  },
  {
    id: 112,
    level: 'A1',
    topic: 'Social life',
    title: 'Meeting a New Classmate',
    transcript:
      'Hi, are you new here? — Yes, I am. My name is Sofia. — Nice to meet you, Sofia. I\'m Jack. Where are you from? — I\'m from Madrid, in Spain. — Cool! What is your favourite subject? — I like art the most, and I don\'t like maths very much. — I love maths! Do you want to sit next to me in class? — Yes, please, that would be great. — Great, our next class is Room 12, upstairs.',
    questions: [
      { id: 1, question: 'Where is Sofia from?', choices: ['Barcelona', 'Madrid', 'Lisbon', 'Rome'], correctIndex: 1, explanation: '"I\'m from Madrid, in Spain."' },
      { id: 2, question: 'What is Sofia\'s favourite subject?', choices: ['Maths', 'Science', 'Art', 'History'], correctIndex: 2, explanation: '"I like art the most"' },
      { id: 3, question: 'Where is their next class?', choices: ['Room 2', 'Room 21', 'Room 20', 'Room 12'], correctIndex: 3, explanation: '"our next class is Room 12, upstairs."' },
    ],
  },
  {
    id: 113,
    level: 'A1',
    topic: 'Food',
    title: 'Ordering Pizza by Phone',
    transcript:
      'Hello, Mario\'s Pizza, how can I help? — Hi, I\'d like to order a large pepperoni pizza, please. — Sure. Anything to drink? — Yes, one bottle of cola, please. — Okay. That\'s twelve pounds for the pizza and two pounds for the cola. Would you like delivery or collection? — Delivery, please. My address is 14 Elm Street. — No problem. It will arrive in about thirty minutes. — Thank you very much. — You\'re welcome, enjoy your pizza!',
    questions: [
      { id: 1, question: 'What size pizza does the customer order?', choices: ['Large', 'Medium', 'Small', 'Extra large'], correctIndex: 0, explanation: '"a large pepperoni pizza, please."' },
      { id: 2, question: 'What is the address for delivery?', choices: ['40 Elm Street', '14 Elm Street', '14 Elm Road', '41 Elm Street'], correctIndex: 1, explanation: '"My address is 14 Elm Street."' },
      { id: 3, question: 'How long will delivery take?', choices: ['Twelve minutes', 'Twenty minutes', 'Thirty minutes', 'Two minutes'], correctIndex: 2, explanation: '"It will arrive in about thirty minutes."' },
    ],
  },
  {
    id: 114,
    level: 'A1',
    topic: 'School',
    title: 'A School Trip Notice',
    transcript:
      'Attention, students! Next Friday, Year Seven will go on a school trip to the science museum. Please bring a packed lunch and wear your school jumper. The bus leaves school at half past eight, so arrive by quarter past eight. The trip costs five pounds, which you must pay to your teacher by Wednesday. We will return to school at four o\'clock. Please bring a permission letter signed by a parent.',
    questions: [
      { id: 1, question: 'What time does the bus leave?', choices: ['Eight o\'clock', 'Quarter past eight', 'Nine o\'clock', 'Half past eight'], correctIndex: 3, explanation: '"The bus leaves school at half past eight"' },
      { id: 2, question: 'How much does the trip cost?', choices: ['Five pounds', 'Eight pounds', 'Four pounds', 'Fifteen pounds'], correctIndex: 0, explanation: '"The trip costs five pounds"' },
      { id: 3, question: 'By when must students pay?', choices: ['Friday', 'Wednesday', 'Monday', 'Thursday'], correctIndex: 1, explanation: '"which you must pay to your teacher by Wednesday."' },
    ],
  },
  {
    id: 115,
    level: 'A1',
    topic: 'Leisure',
    title: 'At the Swimming Pool',
    transcript:
      'Hello, one ticket for the swimming pool, please. — Is it your first visit? — Yes, it is. — Okay, that\'s three pounds fifty for an adult. The changing rooms are downstairs, and lockers cost one pound. — Thank you. What time does the pool close? — We close at eight o\'clock tonight, but the last entry is at seven. — Understood. Is there a café here? — Yes, it\'s next to the entrance, on your right.',
    questions: [
      { id: 1, question: 'How much does a locker cost?', choices: ['Three pounds fifty', 'Eight pounds', 'Seven pounds', 'One pound'], correctIndex: 2, explanation: '"lockers cost one pound."' },
      { id: 2, question: 'What time is the last entry?', choices: ['Eight o\'clock', 'Three o\'clock', 'Six o\'clock', 'Seven o\'clock'], correctIndex: 3, explanation: '"the last entry is at seven."' },
      { id: 3, question: 'Where is the café?', choices: ['Next to the entrance', 'Downstairs', 'In the car park', 'Upstairs'], correctIndex: 0, explanation: '"it\'s next to the entrance, on your right."' },
    ],
  },
  {
    id: 116,
    level: 'A1',
    topic: 'Shopping',
    title: 'Buying Shoes',
    transcript:
      'Hi, I\'m looking for running shoes. — What size are you? — I\'m a size seven. — Let me check... here you are, in blue and in grey. — I like the grey ones. Can I try them on? — Of course. How do they feel? — A little tight. Do you have size eight? — Yes, one moment... here you go. — Perfect, these fit well. How much are they? — They are forty-five pounds, but today there is ten percent off.',
    questions: [
      { id: 1, question: 'What colour shoes does the customer choose?', choices: ['Black', 'Grey', 'White', 'Blue'], correctIndex: 1, explanation: '"I like the grey ones."' },
      { id: 2, question: 'What size does the customer finally need?', choices: ['Six', 'Seven', 'Eight', 'Nine'], correctIndex: 2, explanation: '"Do you have size eight? ... here you go."' },
      { id: 3, question: 'How much do the shoes cost before the discount?', choices: ['Ten pounds', 'Fifteen pounds', 'Forty pounds', 'Forty-five pounds'], correctIndex: 3, explanation: '"They are forty-five pounds"' },
    ],
  },
  {
    id: 117,
    level: 'A1',
    topic: 'Transport',
    title: 'A Taxi Ride',
    transcript:
      'Good evening, where would you like to go? — To the airport, please, Terminal Two. — No problem. That will take about twenty-five minutes. — Great. How much will it cost? — Around eighteen pounds, but it depends on the traffic. — Okay, that\'s fine. Can you take Bridge Road? It\'s usually faster. — Sure, no problem. Here we are, Terminal Two. That\'s seventeen pounds fifty. — Here\'s twenty pounds, please keep the change.',
    questions: [
      { id: 1, question: 'Which terminal does the passenger go to?', choices: ['Terminal Two', 'Terminal One', 'Terminal Three', 'Terminal Four'], correctIndex: 0, explanation: '"Terminal Two."' },
      { id: 2, question: 'About how long does the journey take?', choices: ['Fifteen minutes', 'Twenty-five minutes', 'Thirty-five minutes', 'Ten minutes'], correctIndex: 1, explanation: '"That will take about twenty-five minutes."' },
      { id: 3, question: 'How much does the passenger actually pay for the fare?', choices: ['Eighteen pounds', 'Twenty pounds', 'Seventeen pounds fifty', 'Twenty-five pounds'], correctIndex: 2, explanation: '"That\'s seventeen pounds fifty."' },
    ],
  },

  // ----- A2 (ids 121–135) -----------------------------------------------------
  {
    id: 121,
    level: 'A2',
    topic: 'Health',
    title: 'A Doctor\'s Appointment Reminder',
    transcript:
      'Hello, this message is for Mrs Kate Wilson. This is the Riverside Health Centre calling to remind you about your appointment with Doctor Patel next Tuesday at eleven fifteen in the morning. Please arrive fifteen minutes early to complete a short form at reception. If you cannot attend, please call us before Monday at five o\'clock so we can offer the slot to another patient. Remember to bring your insurance card and a list of any medicines you are currently taking. We look forward to seeing you. Goodbye.',
    questions: [
      { id: 1, question: 'When is the appointment?', choices: ['Monday at five', 'Tuesday at nine', 'Tuesday at ten', 'Tuesday at eleven fifteen'], correctIndex: 3, explanation: '"appointment with Doctor Patel next Tuesday at eleven fifteen"' },
      { id: 2, question: 'How early should Mrs Wilson arrive?', choices: ['Fifteen minutes early', 'Five minutes early', 'Thirty minutes early', 'On time'], correctIndex: 0, explanation: '"Please arrive fifteen minutes early"' },
      { id: 3, question: 'By when must she cancel if she cannot attend?', choices: ['Tuesday morning', 'Monday at five o\'clock', 'Wednesday', 'Sunday'], correctIndex: 1, explanation: '"please call us before Monday at five o\'clock"' },
    ],
  },
  {
    id: 122,
    level: 'A2',
    topic: 'Leisure',
    title: 'Planning a Picnic',
    transcript:
      'Hey, are we still going for a picnic on Saturday? — Yes! I checked the weather, and it should be sunny and warm. — Great, where shall we meet? — Let\'s meet at the park gate at half past eleven, near the fountain. — Okay. I\'ll bring sandwiches and some fruit. — Perfect, I\'ll bring a blanket and some juice. Should we invite Tom too? — Good idea, I already messaged him, and he said he\'ll come at twelve, after his football practice. — Great, see you Saturday at half past eleven, then!',
    questions: [
      { id: 1, question: 'Where will they meet?', choices: ['At the café', 'At the bus stop', 'Near the fountain by the park gate', 'At Tom\'s house'], correctIndex: 2, explanation: '"meet at the park gate at half past eleven, near the fountain."' },
      { id: 2, question: 'What will one person bring?', choices: ['A radio', 'A tent', 'Chairs', 'A blanket and juice'], correctIndex: 3, explanation: '"I\'ll bring a blanket and some juice."' },
      { id: 3, question: 'When will Tom arrive?', choices: ['At twelve, after football practice', 'At half past eleven', 'At one o\'clock', 'Before everyone else'], correctIndex: 0, explanation: '"he\'ll come at twelve, after his football practice."' },
    ],
  },
  {
    id: 123,
    level: 'A2',
    topic: 'Health',
    title: 'A New Gym Member',
    transcript:
      'Hello, I\'d like to join the gym, please. — Great, we have two options: a monthly plan for twenty-five pounds, or an annual plan for two hundred and forty pounds, which saves you money. — I\'ll start with the monthly plan. — Sure. The gym is open from six in the morning until eleven at night, every day. We also offer free yoga classes on Wednesday evenings at seven. — That sounds good. Do I need to bring anything? — Just a towel and trainers. Your membership card will be ready in about ten minutes.',
    questions: [
      { id: 1, question: 'Which plan does the customer choose?', choices: ['The annual plan', 'The monthly plan', 'A free trial', 'A weekly plan'], correctIndex: 1, explanation: '"I\'ll start with the monthly plan."' },
      { id: 2, question: 'When are the free yoga classes?', choices: ['Monday mornings', 'Friday evenings', 'Wednesday evenings at seven', 'Sunday afternoons'], correctIndex: 2, explanation: '"free yoga classes on Wednesday evenings at seven."' },
      { id: 3, question: 'How long until the membership card is ready?', choices: ['One hour', 'Twenty-five minutes', 'One day', 'About ten minutes'], correctIndex: 3, explanation: '"Your membership card will be ready in about ten minutes."' },
    ],
  },
  {
    id: 124,
    level: 'A2',
    topic: 'Travel',
    title: 'At the Airport Check-in Desk',
    transcript:
      'Good morning, can I see your passport and ticket, please? — Here you are. I\'m flying to Berlin. — Thank you. Do you have any bags to check in? — Yes, one suitcase. — Okay, please put it on the scale... it\'s twenty-one kilograms, which is fine, the limit is twenty-three. Your gate is number fourteen, and boarding starts at nine forty-five. — Thank you. Where is gate fourteen? — Go through security, then turn left, it\'s near the coffee shop. — Great, thank you very much. — Have a safe flight!',
    questions: [
      { id: 1, question: 'How much does the suitcase weigh?', choices: ['Twenty-one kilograms', 'Twenty-three kilograms', 'Fourteen kilograms', 'Nine kilograms'], correctIndex: 0, explanation: '"it\'s twenty-one kilograms"' },
      { id: 2, question: 'What time does boarding start?', choices: ['Nine o\'clock', 'Nine forty-five', 'Eleven o\'clock', 'Ten fifteen'], correctIndex: 1, explanation: '"boarding starts at nine forty-five."' },
      { id: 3, question: 'Where is gate fourteen?', choices: ['Before security', 'Next to the check-in desk', 'Near the coffee shop, after security', 'Outside the terminal'], correctIndex: 2, explanation: '"Go through security, then turn left, it\'s near the coffee shop."' },
    ],
  },
  {
    id: 125,
    level: 'A2',
    topic: 'Hobbies',
    title: 'A Cooking Class Voicemail',
    transcript:
      'Hi, this is Chef Marco calling about your booking for the Italian cooking class. The class will take place this Thursday evening, from six until eight thirty, at our kitchen studio on Baker Street. We will be making fresh pasta and a tomato sauce, so please wear clothes you don\'t mind getting a little messy. The course costs thirty-five pounds, which includes all ingredients and a recipe book to take home. If you have any allergies, please let us know before Wednesday. Looking forward to seeing you there. Bye for now.',
    questions: [
      { id: 1, question: 'What time does the class start?', choices: ['Eight thirty', 'Five o\'clock', 'Seven o\'clock', 'Six o\'clock'], correctIndex: 3, explanation: '"from six until eight thirty"' },
      { id: 2, question: 'What will they cook?', choices: ['Fresh pasta and tomato sauce', 'Pizza', 'Soup', 'Bread and cake'], correctIndex: 0, explanation: '"We will be making fresh pasta and a tomato sauce"' },
      { id: 3, question: 'What does the course price include?', choices: ['Only the food', 'Ingredients and a recipe book', 'A chef\'s hat', 'Transport'], correctIndex: 1, explanation: '"includes all ingredients and a recipe book to take home."' },
    ],
  },
  {
    id: 126,
    level: 'A2',
    topic: 'Shopping',
    title: 'A Weekend Market Announcement',
    transcript:
      'Good morning, everyone, and welcome to the Riverside Weekend Market. Today we have over fifty stalls selling fresh fruit, vegetables, cheese, and handmade crafts. The market runs from eight until three, and from midday there will be live music near the main entrance. If you get hungry, the food stalls are at the back, next to the car park, and most meals cost between four and seven pounds. Please remember that dogs must stay on a lead. Enjoy your visit, and don\'t forget the market returns next weekend too.',
    questions: [
      { id: 1, question: 'Where is the live music?', choices: ['At the food stalls', 'In the car park', 'Near the main entrance', 'Outside the market'], correctIndex: 2, explanation: '"live music near the main entrance."' },
      { id: 2, question: 'Where are the food stalls?', choices: ['Near the entrance', 'In the middle of the market', 'By the fruit stalls', 'At the back, next to the car park'], correctIndex: 3, explanation: '"the food stalls are at the back, next to the car park"' },
      { id: 3, question: 'What time does the market close?', choices: ['Three o\'clock', 'Eight o\'clock', 'Midday', 'Five o\'clock'], correctIndex: 0, explanation: '"The market runs from eight until three"' },
    ],
  },
  {
    id: 127,
    level: 'A2',
    topic: 'Travel',
    title: 'Booking a Hotel Room',
    transcript:
      'Good afternoon, Lakeview Hotel, how can I help? — Hello, I\'d like to book a double room for three nights, from Friday to Monday. — Let me check... yes, we have a room available on the fourth floor for ninety pounds a night. — Does that include breakfast? — No, breakfast is an extra eight pounds per person, per day. — Okay, I\'ll take the room without breakfast, please. — Great, can I have your name and a phone number? — It\'s Anna Petrov, 07700 900123. — Thank you, Mrs Petrov, your room is booked. We look forward to welcoming you on Friday.',
    questions: [
      { id: 1, question: 'How many nights does Anna book?', choices: ['Two nights', 'Three nights', 'Four nights', 'One night'], correctIndex: 1, explanation: '"a double room for three nights"' },
      { id: 2, question: 'How much is the room per night?', choices: ['Eight pounds', 'Ninety pounds', 'Ninety-eight pounds', 'Eight pounds fifty'], correctIndex: 2, explanation: '"a room available on the fourth floor for ninety pounds a night."' },
      { id: 3, question: 'Does Anna\'s booking include breakfast?', choices: ['Yes, for free', 'Yes, for two people', 'Only on Fridays', 'No, she books without breakfast'], correctIndex: 3, explanation: '"I\'ll take the room without breakfast, please."' },
    ],
  },
  {
    id: 128,
    level: 'A2',
    topic: 'Shopping',
    title: 'A Bicycle for Sale',
    transcript:
      'Hi, I\'m calling about the bicycle you\'re selling online. — Yes, hello! It\'s a blue mountain bike, about two years old, in very good condition. — How much are you asking for it? — I listed it for eighty pounds, but I could accept seventy-five. — That sounds fair. Does it come with a lock? — Yes, and a helmet too, if you want them. — Great, when can I come and see it? — I\'m free tomorrow after five o\'clock, or anytime on Saturday. — Tomorrow at five works for me. Where do you live? — On Maple Avenue, number nine.',
    questions: [
      { id: 1, question: 'What colour is the bicycle?', choices: ['Blue', 'Red', 'Black', 'Green'], correctIndex: 0, explanation: '"It\'s a blue mountain bike"' },
      { id: 2, question: 'What price will the seller accept?', choices: ['Eighty pounds', 'Seventy-five pounds', 'Nine pounds', 'Fifty pounds'], correctIndex: 1, explanation: '"I could accept seventy-five."' },
      { id: 3, question: 'When will the buyer come to see the bike?', choices: ['Today', 'On Sunday', 'Tomorrow after five o\'clock', 'Next week'], correctIndex: 2, explanation: '"Tomorrow at five works for me."' },
    ],
  },
  {
    id: 129,
    level: 'A2',
    topic: 'Health',
    title: 'Visiting the Dentist',
    transcript:
      'Good morning, Mrs Ahmed, please come in and sit down. — Thank you, Doctor. I have some pain in my back tooth. — Let\'s have a look... I can see a small hole, so we will need to fill it today. — Will it hurt? — I\'ll give you a small injection first, so you won\'t feel much. This will take about twenty minutes. — Okay, thank you. — After the filling, please don\'t eat anything for one hour, and avoid very cold or hot food today. Your next check-up should be in six months.',
    questions: [
      { id: 1, question: 'How long will the filling take?', choices: ['One hour', 'Ten minutes', 'Six months', 'About twenty minutes'], correctIndex: 3, explanation: '"This will take about twenty minutes."' },
      { id: 2, question: 'How long should Mrs Ahmed wait before eating?', choices: ['One hour', 'Twenty minutes', 'Six months', 'Two hours'], correctIndex: 0, explanation: '"please don\'t eat anything for one hour"' },
      { id: 3, question: 'When should her next check-up be?', choices: ['In one month', 'In six months', 'Next week', 'In one year'], correctIndex: 1, explanation: '"Your next check-up should be in six months."' },
    ],
  },
  {
    id: 130,
    level: 'A2',
    topic: 'Travel',
    title: 'A City Bus Tour',
    transcript:
      'Welcome aboard the City Explorer bus tour. Our journey today will take about ninety minutes, and we will stop at four famous places: the old castle, the cathedral, the harbour, and the central market. Our first stop, the castle, is just five minutes away. You can get off at any stop and catch a later bus, since tickets are valid all day. Please remember your bag when you leave the bus. Photos are welcome, but please don\'t use flash near the cathedral windows. Enjoy the tour, and thank you for choosing City Explorer!',
    questions: [
      { id: 1, question: 'How long does the tour take?', choices: ['Sixty minutes', 'Thirty minutes', 'About ninety minutes', 'Two hours'], correctIndex: 2, explanation: '"take about ninety minutes"' },
      { id: 2, question: 'How far away is the first stop?', choices: ['Ninety minutes', 'Four stops', 'Fifteen minutes', 'Five minutes'], correctIndex: 3, explanation: '"the castle, is just five minutes away."' },
      { id: 3, question: 'Where should passengers not use flash photography?', choices: ['Near the cathedral windows', 'At the harbour', 'Inside the castle', 'At the market'], correctIndex: 0, explanation: '"please don\'t use flash near the cathedral windows."' },
    ],
  },
  {
    id: 131,
    level: 'A2',
    topic: 'Shopping',
    title: 'Returning a Jacket',
    transcript:
      'Hello, I\'d like to return this jacket, please. I bought it last week, but it\'s too small. — Do you have the receipt? — Yes, here it is. — Thank you. Would you like a refund or an exchange for a bigger size? — I\'d like to exchange it for a large, please. — Let me check... yes, we have one large left, in the same colour. — Perfect. — There\'s no price difference, so you don\'t need to pay anything extra. Here is your new jacket and your receipt. — Thank you so much for your help.',
    questions: [
      { id: 1, question: 'Why does the customer want to return the jacket?', choices: ['It is the wrong colour', 'It is too small', 'It is damaged', 'It is too expensive'], correctIndex: 1, explanation: '"it\'s too small."' },
      { id: 2, question: 'What does the customer want instead of a refund?', choices: ['A different colour', 'A credit note', 'An exchange for a large size', 'Store credit'], correctIndex: 2, explanation: '"I\'d like to exchange it for a large, please."' },
      { id: 3, question: 'Does the customer pay extra money?', choices: ['Yes, a small fee', 'Yes, the full price again', 'Yes, for the receipt', 'No, there is no price difference'], correctIndex: 3, explanation: '"There\'s no price difference, so you don\'t need to pay anything extra."' },
    ],
  },
  {
    id: 132,
    level: 'A2',
    topic: 'Work',
    title: 'A Student\'s First Day at Work',
    transcript:
      'Welcome to the office, Ben! I\'m glad you could start today. — Thank you, I\'m excited to be here. — Let me show you around. Your desk is over there, next to the window, and your computer is already set up. — Great, thank you. — Lunch break is from twelve thirty until one fifteen, and there\'s a small kitchen on this floor if you want to make coffee. — Sounds good. Who should I ask if I have questions? — Just ask Laura, she sits next to you, she\'s been here for three years and knows everything. — Thanks, I will.',
    questions: [
      { id: 1, question: 'Where is Ben\'s desk?', choices: ['Next to the window', 'Near the kitchen', 'By the door', 'Upstairs'], correctIndex: 0, explanation: '"Your desk is over there, next to the window"' },
      { id: 2, question: 'What time does lunch break start?', choices: ['One o\'clock', 'Twelve thirty', 'One fifteen', 'Twelve o\'clock'], correctIndex: 1, explanation: '"Lunch break is from twelve thirty until one fifteen"' },
      { id: 3, question: 'Who should Ben ask if he has questions?', choices: ['The manager', 'The receptionist', 'Laura', 'Nobody, he should look online'], correctIndex: 2, explanation: '"Just ask Laura, she sits next to you"' },
    ],
  },
  {
    id: 133,
    level: 'A2',
    topic: 'Travel',
    title: 'A Ferry Timetable Announcement',
    transcript:
      'Good afternoon, passengers. The next ferry to Bell Island will depart from Pier 3 at half past two this afternoon. The crossing takes about forty minutes. Please arrive at the pier fifteen minutes before departure with your ticket ready. Due to strong winds, the four o\'clock ferry has been cancelled, so please take either the two thirty service or the later one at six o\'clock. Foot passengers should board from the front gate, while vehicles should use the side entrance. Thank you for your patience, and we apologise for any inconvenience.',
    questions: [
      { id: 1, question: 'How long does the crossing take?', choices: ['Fifteen minutes', 'Two hours', 'Sixty minutes', 'About forty minutes'], correctIndex: 3, explanation: '"The crossing takes about forty minutes."' },
      { id: 2, question: 'Which ferry has been cancelled?', choices: ['The four o\'clock ferry', 'The two thirty ferry', 'The six o\'clock ferry', 'The morning ferry'], correctIndex: 0, explanation: '"the four o\'clock ferry has been cancelled"' },
      { id: 3, question: 'Where should foot passengers board?', choices: ['The side entrance', 'The front gate', 'Pier 3 car park', 'The ticket office'], correctIndex: 1, explanation: '"Foot passengers should board from the front gate"' },
    ],
  },
  {
    id: 134,
    level: 'A2',
    topic: 'Social life',
    title: 'Inviting a Friend to the Cinema',
    transcript:
      'Hey, do you want to see a film this Friday? — Maybe, what\'s on? — There\'s a new adventure film at seven o\'clock, or a comedy at nine fifteen. — Let\'s do the earlier one, I have work early on Saturday. — Okay, seven o\'clock it is. Tickets are eight pounds fifty each, or twelve pounds for two if we book online. — Let\'s book online, then, it\'s cheaper. — Great, I\'ll book it now. Should we eat before or after? — Let\'s grab a burger before, around six o\'clock, near the cinema. — Perfect, see you at six on Friday, then!',
    questions: [
      { id: 1, question: 'Which film do they choose?', choices: ['The comedy at nine fifteen', 'A film at ten', 'The adventure film at seven', 'No film'], correctIndex: 2, explanation: '"Let\'s do the earlier one" ... "seven o\'clock it is."' },
      { id: 2, question: 'How will they buy the tickets to save money?', choices: ['Pay in cash at the door', 'Use a student discount', 'Buy separately', 'Book online for twelve pounds'], correctIndex: 3, explanation: '"twelve pounds for two if we book online... Let\'s book online, then, it\'s cheaper."' },
      { id: 3, question: 'What time will they eat before the film?', choices: ['Six o\'clock', 'Seven o\'clock', 'Nine fifteen', 'Five o\'clock'], correctIndex: 0, explanation: '"Let\'s grab a burger before, around six o\'clock"' },
    ],
  },
  {
    id: 135,
    level: 'A2',
    topic: 'Everyday problems',
    title: 'A Lost Phone at the Café',
    transcript:
      'Excuse me, I think I left my phone here about an hour ago. — What does it look like? — It\'s a black phone with a red case, and there\'s a small crack on the screen. — Let me ask the staff... yes, someone found a phone like that under table six. — Oh, thank goodness! — Can you tell me the passcode, just to check it\'s really yours? — Yes, it\'s four two nine one. — That\'s correct. Here you go. — Thank you so much, I was worried I\'d lost it forever. — No problem, we\'re just glad you came back for it.',
    questions: [
      { id: 1, question: 'What colour is the phone case?', choices: ['Blue', 'Red', 'Black', 'White'], correctIndex: 1, explanation: '"It\'s a black phone with a red case"' },
      { id: 2, question: 'Where was the phone found?', choices: ['Under table two', 'Behind the counter', 'Under table six', 'Near the door'], correctIndex: 2, explanation: '"someone found a phone like that under table six."' },
      { id: 3, question: 'What is the phone\'s passcode?', choices: ['Nine two four one', 'Two four nine one', 'One nine two four', 'Four two nine one'], correctIndex: 3, explanation: '"it\'s four two nine one."' },
    ],
  },
];
