// =============================================================================
// SAT — machine-generated practice bank (Math + Reading & Writing).
// -----------------------------------------------------------------------------
// Original Digital SAT items produced via Google NotebookLM, then verified by
// independently SOLVING every question (answers corrected/confirmed), tagged
// Easy/Medium/Hard and ordered easy→hard within each domain. Folded into the
// practice tabs alongside MATH_DRILLS / RW_DRILLS. ids: math 92001+, RW 93001+,
// clear of the full-test ids (1-98) and existing drills (91001+).
// =============================================================================
import { SatQuestion } from '../types';

export const SAT_GEN_MATH: SatQuestion[] = [
  {
    "id": 92001,
    "domain": "Algebra",
    "difficulty": "Easy",
    "question": "If 3x + 7 = 22, what is the value of 3x?",
    "choices": [
      "5",
      "15",
      "19",
      "29"
    ],
    "correctIndex": 1,
    "explanation": "To find the value of 3x, subtract 7 from both sides of the equation. 22 - 7 = 15. Therefore, 3x = 15."
  },
  {
    "id": 92002,
    "domain": "Algebra",
    "difficulty": "Easy",
    "question": "A tree grows at a constant rate of 2 feet per year. If the tree is initially 5 feet tall, what will its height be, in feet, after 4 years?",
    "gridInAnswer": "13",
    "explanation": "The height of the tree can be modeled by the expression 2t + 5, where t is the number of years. Plugging in t = 4 gives 2(4) + 5 = 8 + 5 = 13 feet."
  },
  {
    "id": 92003,
    "domain": "Algebra",
    "difficulty": "Medium",
    "question": "A company sells custom t-shirts. They charge a flat design fee of $45 plus $12 per t-shirt. If a customer's total bill is $345, how many t-shirts did they order?",
    "gridInAnswer": "25",
    "explanation": "Let x represent the number of t-shirts ordered. The total cost can be modeled by the equation 12x + 45 = 345. Subtracting 45 from both sides gives 12x = 300. Dividing both sides by 12 yields x = 25."
  },
  {
    "id": 92004,
    "domain": "Algebra",
    "difficulty": "Medium",
    "question": "The system of equations is given by 3x - 2y = 12 and x + 4y = -10. What is the value of x + y?",
    "choices": [
      "-1",
      "1",
      "-5",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "You can solve the system using substitution. Isolate x in the second equation: x = -10 - 4y. Substitute this into the first equation: 3(-10 - 4y) - 2y = 12, which simplifies to -30 - 12y - 2y = 12. Combining like terms gives -14y = 42, so y = -3. Plug y = -3 back into x = -10 - 4y to find x: x = -10 - 4(-3) = -10 + 12 = 2. Finally, calculate x + y = 2 + (-3) = -1."
  },
  {
    "id": 92005,
    "domain": "Algebra",
    "difficulty": "Hard",
    "question": "The system of equations ax + 3y = 7 and 5x - by = -14 has \ninfinitely many solutions. What is the value of a/b?",
    "choices": [
      "-5/12",
      "-12/5",
      "5/12",
      "12/5"
    ],
    "correctIndex": 0,
    "explanation": "For a system of two linear equations to have infinitely many\nsolutions, the two equations must be equivalent. This means the coefficients of \nthe second equation must be a constant multiple of the first. Since the constant\nterm -14 is -2 times 7, we multiply the entire first equation by -2 to get -2ax \n- 6y = -14. Setting the corresponding coefficients equal gives 5 = -2a and -b = \n-6. Solving these gives a = -2.5 and b = 6. The value of a/b is -2.5 / 6, which \nsimplifies to -5/12."
  },
  {
    "id": 92006,
    "domain": "Algebra",
    "difficulty": "Hard",
    "question": "If |2x - 5| = |3x + 1|, what is the greatest possible value of \nx?",
    "gridInAnswer": "4/5",
    "explanation": "An absolute value equation |A| = |B| implies that either A =\nB or A = -B. Case 1: 2x - 5 = 3x + 1. Subtracting 2x from both sides gives -5 = \nx + 1, so x = -6. Case 2: 2x - 5 = -(3x + 1). Distributing the negative gives 2x\n- 5 = -3x - 1. Adding 3x to both sides yields 5x - 5 = -1. Adding 5 gives 5x = \n4, so x = 4/5. The two possible values for x are -6 and 4/5. The greatest \npossible value is 4/5 (or 0.8)."
  },
  {
    "id": 92007,
    "domain": "Advanced Math",
    "difficulty": "Easy",
    "question": "Which of the following expressions is equivalent to (x^3)(x^4)?",
    "choices": [
      "x^7",
      "x^12",
      "2x^7",
      "2x^12"
    ],
    "correctIndex": 0,
    "explanation": "When multiplying two exponential terms with the same base, you add their exponents. Therefore, x^3 multiplied by x^4 is x^(3+4), which equals x^7."
  },
  {
    "id": 92008,
    "domain": "Advanced Math",
    "difficulty": "Easy",
    "question": "What is the positive solution to the equation x^2 - 16 = 0?",
    "gridInAnswer": "4",
    "explanation": "Add 16 to both sides of the equation to get x^2 = 16. Taking the square root of both sides gives x = 4 or x = -4. The positive solution is 4."
  },
  {
    "id": 92009,
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "question": "A certain radioactive isotope has a half-life of 15 days. If the initial sample contains 800 grams, which of the following functions A(t) models the amount of the isotope remaining, in grams, after t days?",
    "choices": [
      "A(t) = 800(0.5)^{15t}",
      "A(t) = 800(0.5)^{t/15}",
      "A(t) = 800(2)^{t/15}",
      "A(t) = 15(0.5)^{800t}"
    ],
    "correctIndex": 1,
    "explanation": "The formula for exponential decay based on half-life is A(t) = Initial_Amount * (0.5)^(t / half_life). Given the initial amount is 800 grams and the half-life is 15 days, substituting these values yields A(t) = 800(0.5)^{t/15}."
  },
  {
    "id": 92010,
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "question": "What is the sum of the solutions to the equation 2x^2 - 12x + 10 = 0?",
    "choices": [
      "-6",
      "5",
      "6",
      "10"
    ],
    "correctIndex": 2,
    "explanation": "Divide the entire equation by 2 to simplify it to x^2 - 6x + 5 = 0. This factors to (x - 1)(x - 5) = 0. The solutions are x = 1 and x = 5, and their sum is 1 + 5 = 6. Alternatively, you can use the sum of roots formula for a quadratic equation ax^2 + bx + c = 0, which is -b/a. Here, -(-12)/2 = 12/2 = 6."
  },
  {
    "id": 92011,
    "domain": "Advanced Math",
    "difficulty": "Hard",
    "question": "The quadratic function f is defined by f(x) = -2(x - h)^2 + k, \nwhere h and k are constants. The graph of y = f(x) in the xy-plane passes \nthrough the points (3, 5) and (7, 5). If the maximum value of f(x) is 13, what \nis the value of f(2)?",
    "choices": [
      "-5",
      "5",
      "-18",
      "31"
    ],
    "correctIndex": 0,
    "explanation": "Because the points (3, 5) and (7, 5) have the same y-value, \nthe x-coordinate of the vertex (h) must lie exactly halfway between x = 3 and x \n= 7. Thus, h = (3 + 7) / 2 = 5. The maximum value of the function is given by \nthe y-coordinate of the vertex, which is k. Therefore, k = 13. The function is \nf(x) = -2(x - 5)^2 + 13. To find f(2), substitute x = 2 into the function: f(2) \n= -2(2 - 5)^2 + 13 = -2(-3)^2 + 13 = -2(9) + 13 = -18 + 13 = -5."
  },
  {
    "id": 92012,
    "domain": "Advanced Math",
    "difficulty": "Hard",
    "question": "If x > 1 and the expression sqrt(x * cbrt(x)) / (x^(1/4)) is \nequal to x^a, what is the value of a?",
    "choices": [
      "5/12",
      "7/12",
      "1/6",
      "3/8"
    ],
    "correctIndex": 0,
    "explanation": "First, rewrite the terms in the numerator using fractional \nexponents. The term inside the square root is x * x^(1/3). Using exponent rules,\nthis is x^(1 + 1/3) = x^(4/3). The square root of x^(4/3) is (x^(4/3))^(1/2) = \nx^(4/6) = x^(2/3). The denominator is x^(1/4). To divide x^(2/3) by x^(1/4), \nsubtract the exponents: 2/3 - 1/4. Finding a common denominator of 12, we get \n8/12 - 3/12 = 5/12. Therefore, x^a = x^(5/12), so a = 5/12."
  },
  {
    "id": 92013,
    "domain": "Problem-Solving and Data Analysis",
    "difficulty": "Easy",
    "question": "A recipe calls for 200 grams of sugar. If a baker wants to increase the amount of sugar by 10%, how many grams of sugar should the baker use?",
    "choices": [
      "20",
      "190",
      "210",
      "220"
    ],
    "correctIndex": 3,
    "explanation": "First, find 10% of 200 by multiplying 200 by 0.10, which equals 20. Then, add this increase to the original amount: 200 + 20 = 220 grams."
  },
  {
    "id": 92014,
    "domain": "Problem-Solving and Data Analysis",
    "difficulty": "Easy",
    "question": "In a fruit basket, the ratio of apples to oranges is 3 to 2. If there are 15 apples, how many oranges are in the basket?",
    "choices": [
      "5",
      "10",
      "20",
      "25"
    ],
    "correctIndex": 1,
    "explanation": "Set up a proportion using the ratio of apples to oranges: 3/2 = 15/x. Cross-multiplying yields 3x = 30. Dividing both sides by 3 gives x = 10."
  },
  {
    "id": 92015,
    "domain": "Problem-Solving and Data Analysis",
    "difficulty": "Medium",
    "question": "A bookstore buys a textbook for $60 and marks up the price by 40% for retail sale. During a clearance event, the store applies a 20% discount to the retail price. What is the final clearance price of the textbook?",
    "choices": [
      "$67.20",
      "$72.00",
      "$76.80",
      "$84.00"
    ],
    "correctIndex": 0,
    "explanation": "First, calculate the retail price after the 40% markup: $60 * 1.40 = $84. Next, apply the 20% clearance discount to this new retail price. A 20% discount means the book is sold for 80% of its price, so $84 * 0.80 = $67.20."
  },
  {
    "id": 92016,
    "domain": "Problem-Solving and Data Analysis",
    "difficulty": "Medium",
    "question": "A local library conducted a survey of 150 patrons about their preferred book genre. The results showed that 60 patrons prefer fiction, 40 prefer non-fiction, and 50 prefer mystery. Of the patrons who prefer fiction, 15 are teenagers. If a patron who prefers fiction is selected at random, what is the probability that the patron is a teenager?",
    "choices": [
      "1/10",
      "1/4",
      "3/10",
      "2/5"
    ],
    "correctIndex": 1,
    "explanation": "The problem asks for the probability given that the randomly selected patron prefers fiction. This condition restricts our total pool to only the 60 fiction lovers. Out of those 60 patrons, 15 are teenagers. The probability is therefore 15 / 60, which simplifies to 1/4."
  },
  {
    "id": 92017,
    "domain": "Problem-Solving and Data Analysis",
    "difficulty": "Hard",
    "question": "A company's revenue increased by 15% from 2020 to 2021, \ndecreased by 20% from 2021 to 2022, and then increased by p% from 2022 to 2023. \nIf the company's revenue in 2023 was exactly the same as its revenue in 2020, \nwhat is the value of p, rounded to the nearest tenth?",
    "choices": [
      "5.0",
      "8.0",
      "8.7",
      "10.0"
    ],
    "correctIndex": 2,
    "explanation": "Let R be the revenue in 2020. The 2021 revenue is 1.15R. The\n2022 revenue is 1.15R * (1 - 0.20) = 1.15R * 0.80 = 0.92R. The 2023 revenue is \n0.92R * (1 + p/100). We are told the 2023 revenue equals the 2020 revenue, so \n0.92R * (1 + p/100) = R. Dividing both sides by R gives 0.92 * (1 + p/100) = 1. \nSolving for 1 + p/100 yields 1 / 0.92, which is approximately 1.08695. \nSubtracting 1 gives p/100 = 0.08695, so p = 8.695. Rounded to the nearest tenth,\nthis is 8.7."
  },
  {
    "id": 92018,
    "domain": "Problem-Solving and Data Analysis",
    "difficulty": "Hard",
    "question": "A data set consists of 20 distinct positive integers. The mean \nof the data set is 45. If the largest integer in the data set is increased by 10\nand the smallest integer is decreased by 4, what is the new mean of the data \nset?",
    "choices": [
      "45.0",
      "45.3",
      "45.6",
      "51.0"
    ],
    "correctIndex": 1,
    "explanation": "The mean of a data set is the sum of its values divided by \nthe number of values. If the mean of 20 integers is 45, their total sum is 20 * \n45 = 900. When the largest integer is increased by 10, the sum increases by 10. \nWhen the smallest integer is decreased by 4, the sum decreases by 4. The new sum\nis 900 + 10 - 4 = 906. Since the number of integers remains 20, the new mean is \n906 / 20 = 45.3."
  },
  {
    "id": 92019,
    "domain": "Geometry and Trigonometry",
    "difficulty": "Easy",
    "question": "A rectangular garden has a length of 12 meters and a width of 5 meters. What is the area of the garden, in square meters?",
    "choices": [
      "17",
      "34",
      "60",
      "120"
    ],
    "correctIndex": 2,
    "explanation": "The area of a rectangle is found by multiplying its length by its width. 12 meters times 5 meters equals 60 square meters."
  },
  {
    "id": 92020,
    "domain": "Geometry and Trigonometry",
    "difficulty": "Easy",
    "question": "In a triangle, two of the interior angles measure 45 degrees and 65 degrees. What is the measure, in degrees, of the third interior angle?",
    "choices": [
      "70",
      "80",
      "90",
      "110"
    ],
    "correctIndex": 0,
    "explanation": "The sum of the interior angles in any triangle is always 180 degrees. To find the third angle, subtract the two known angles from 180: 180 - 45 - 65 = 70 degrees."
  },
  {
    "id": 92021,
    "domain": "Geometry and Trigonometry",
    "difficulty": "Medium",
    "question": "In right triangle XYZ, angle Y is a right angle. The length of side XY is 8 and the length of side YZ is 15. What is the value of tan(X)?",
    "gridInAnswer": "15/8",
    "explanation": "In a right triangle, the tangent of an acute angle is the ratio of the length of the opposite side to the length of the adjacent side. For angle X, the opposite side is YZ (which has a length of 15) and the adjacent side is XY (which has a length of 8). Therefore, tan(X) = 15/8."
  },
  {
    "id": 92022,
    "domain": "Geometry and Trigonometry",
    "difficulty": "Medium",
    "question": "A rectangular prism has a length of l, a width of w, and a height of h. If the length is doubled and the width is tripled while the height remains the same, by what factor does the volume of the prism increase?",
    "choices": [
      "2",
      "3",
      "5",
      "6"
    ],
    "correctIndex": 3,
    "explanation": "The initial volume of the rectangular prism is V = l * w * h. After the dimensions are changed, the new volume becomes (2l) * (3w) * h, which simplifies to 6(l * w * h). The new volume is 6 times the original volume, meaning it increases by a factor of 6."
  },
  {
    "id": 92023,
    "domain": "Geometry and Trigonometry",
    "difficulty": "Hard",
    "question": "A circle with center O has a radius of 12. Points A and B lie \non the circle such that the measure of minor arc AB is 5pi/6 radians. What is \nthe perimeter of the sector formed by central angle AOB?",
    "choices": [
      "10pi + 24",
      "10pi + 12",
      "60pi + 24",
      "120pi + 24"
    ],
    "correctIndex": 0,
    "explanation": "The perimeter of a sector of a circle is the sum of the \nlengths of the two radii and the length of the arc. The arc length s is \ncalculated using the formula s = r * theta, where r is the radius and theta is \nthe central angle in radians. So, s = 12 * (5pi/6) = 10pi. The sum of the two \nradii is 12 + 12 = 24. Therefore, the perimeter of the sector is 10pi + 24."
  },
  {
    "id": 92024,
    "domain": "Geometry and Trigonometry",
    "difficulty": "Hard",
    "question": "In right triangle ABC, the right angle is at B. Point D lies on\nside BC such that AD bisects angle A. If AB = 8 and AC = 17, what is the length \nof segment CD?",
    "gridInAnswer": "10.2",
    "explanation": "First, use the Pythagorean theorem to find the length of \nside BC: BC = sqrt(AC^2 - AB^2) = sqrt(17^2 - 8^2) = sqrt(289 - 64) = sqrt(225) \n= 15. The Angle Bisector Theorem states that an angle bisector of a triangle \ndivides the opposite side into two segments that are proportional to the other \ntwo sides of the triangle. Therefore, BD / CD = AB / AC. Substituting the known \nvalues gives BD / CD = 8 / 17. We can express BD as 8k and CD as 17k. Since \npoint D lies on BC, BD + CD = BC, which gives 8k + 17k = 15, or 25k = 15. \nSolving for k yields k = 15 / 25 = 3 / 5 = 0.6. The length of CD is 17k = 17 * \n0.6 = 10.2."
  }
];

export const SAT_GEN_RW: SatQuestion[] = [
  {
    "id": 93001,
    "domain": "Information and Ideas",
    "difficulty": "Easy",
    "passage": "The library's new quiet policy has been highly successful. Since it was implemented last month, student complaints about noise have dropped by 80%, and daily attendance has steadily increased.",
    "question": "What is the main idea of the text?",
    "choices": [
      "Students prefer to study at home rather than the library.",
      "The library has always struggled with severe noise complaints.",
      "The new quiet policy has positively impacted the library.",
      "Daily attendance at the library is higher on weekends."
    ],
    "correctIndex": 2,
    "explanation": "The text focuses on the success of the quiet policy, evidenced by fewer complaints and higher overall attendance."
  },
  {
    "id": 93002,
    "domain": "Information and Ideas",
    "difficulty": "Easy",
    "passage": "Whenever the local bakery introduces a new pastry, it sells out within the first hour. Tomorrow, the bakery is launching a highly anticipated chocolate croissant.",
    "question": "What can most reasonably be inferred from the text?",
    "choices": [
      "The bakery makes the best chocolate croissants in the city.",
      "Customers do not like the bakery's older pastries.",
      "The bakery will close early tomorrow.",
      "The new chocolate croissants will likely sell out very quickly."
    ],
    "correctIndex": 3,
    "explanation": "Given the established pattern that new pastries sell out within an hour, it is reasonable to infer the newly introduced chocolate croissant will do the same."
  },
  {
    "id": 93003,
    "domain": "Information and Ideas",
    "difficulty": "Medium",
    "passage": "Urban agriculture has gained popularity for its ability to reduce the carbon footprint of food transportation while providing fresh produce to city dwellers. However, city planners note that the high cost of urban real estate often forces these agricultural initiatives to rely heavily on community grants and volunteer labor to remain financially viable.",
    "question": "Based on the text, what can be reasonably inferred about urban agriculture?",
    "choices": [
      "It is the most profitable use of commercial real estate in modern cities.",
      "Without external financial and physical support, many urban farms would struggle to survive.",
      "It produces a significantly higher yield of crops than traditional rural farming methods.",
      "City planners generally oppose urban farming due to its negative impact on real estate costs."
    ],
    "correctIndex": 1,
    "explanation": "The passage states that the high costs of real estate force these initiatives to \"rely heavily on community grants and volunteer labor to remain financially viable,\" meaning they would struggle to survive without this external support."
  },
  {
    "id": 93004,
    "domain": "Information and Ideas",
    "difficulty": "Medium",
    "passage": "The Silk Road was not a single, continuous thoroughfare from east to west, but rather a complex network of branching trade routes. Merchants rarely traveled the entire length of the network; instead, they exchanged goods, ideas, and technologies at various intermediate regional hubs, which facilitated a slow but profound cultural exchange across continents.",
    "question": "Which choice best states the main idea of the text?",
    "choices": [
      "The Silk Road was an interconnected web of routes that promoted indirect cultural and economic exchanges.",
      "Merchants who traveled the entire length of the Silk Road gained the most economic wealth.",
      "The primary purpose of the Silk Road was the rapid transportation of technology across continents.",
      "The Silk Road was a single, heavily guarded road used exclusively for the transport of textiles."
    ],
    "correctIndex": 0,
    "explanation": "The passage emphasizes that the Silk Road was a \"complex network of branching trade routes\" rather than a single road, and that merchants traded at \"intermediate regional hubs,\" causing profound cultural exchanges."
  },
  {
    "id": 93005,
    "domain": "Information and Ideas",
    "difficulty": "Hard",
    "passage": "Paleontologists analyzing the fossilized remains of the Cretaceous dinosaur Deinonychus antirrhopus noted that the skeletal structure of its hind limbs indicates a creature built for agility and leaping. However, biomechanical models of its relatively stiff tail suggest it lacked the dynamic counterbalance necessary for high-speed, sharp-turning pursuits over open ground. Thus, researchers hypothesize that Deinonychus ________",
    "question": "Which choice most logically completes the text?",
    "choices": [
      "relied more on ambush tactics in densely vegetated environments than on long-distance chases.",
      "was an aquatic dinosaur that used its hind limbs primarily for swimming.",
      "evolved a flexible tail over time to compensate for its rigid hind limbs.",
      "primarily scavenged for food rather than hunting live prey."
    ],
    "correctIndex": 0,
    "explanation": "Since the dinosaur was built for agility and leaping but lacked the tail mechanics for high-speed, sharp-turning open ground pursuits, the most logical inference is that it used ambush tactics where sustained, turning speed wasn't needed."
  },
  {
    "id": 93006,
    "domain": "Information and Ideas",
    "difficulty": "Hard",
    "passage": "A botanist studied the growth rate of Arabidopsis thaliana under varying concentrations of nitrogen fertilizer. Plants given 50 ppm of nitrogen grew an average of 12 cm in a month, while those given 100 ppm grew 18 cm. However, plants exposed to 150 ppm of nitrogen grew only 14 cm, and those exposed to 200 ppm exhibited severe leaf necrosis and averaged just 8 cm of growth.",
    "question": "Which statement best describes the relationship between nitrogen concentration and plant growth based on the data?",
    "choices": [
      "Nitrogen concentration is inversely proportional to the growth rate of Arabidopsis thaliana.",
      "Increasing nitrogen concentration stimulates growth up to an optimal point, after which it becomes detrimental.",
      "150 ppm of nitrogen is the optimal concentration for maximizing growth in Arabidopsis thaliana.",
      "The plants exhibit leaf necrosis only when nitrogen concentrations fall below 100 ppm."
    ],
    "correctIndex": 1,
    "explanation": "Plant growth increases as nitrogen goes from 50 ppm to 100 ppm, but then decreases and leads to necrosis at 150 ppm and 200 ppm, clearly indicating an optimal point beyond which additional nitrogen is harmful."
  },
  {
    "id": 93007,
    "domain": "Craft and Structure",
    "difficulty": "Easy",
    "passage": "The chef carefully measured the ingredients, knowing that even a slight mistake could ________ the delicate flavor of the soup.",
    "question": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      "ruin",
      "improve",
      "create",
      "protect"
    ],
    "correctIndex": 0,
    "explanation": "The word ruin logically fits the context of a mistake negatively affecting a delicate flavor."
  },
  {
    "id": 93008,
    "domain": "Craft and Structure",
    "difficulty": "Easy",
    "passage": "Many people believe that bats are blind, but this is a myth. Bats actually have perfectly good vision. However, they rely primarily on echolocation to navigate and hunt in the dark.",
    "question": "Which choice best states the main purpose of the text?",
    "choices": [
      "To explain exactly how echolocation works.",
      "To correct a common misconception about bats.",
      "To argue that bats hunt better in the dark.",
      "To describe the anatomy of a bat's eye."
    ],
    "correctIndex": 1,
    "explanation": "The text explicitly introduces the myth that bats are blind and then states that it is not true, focusing on correcting this widespread belief."
  },
  {
    "id": 93009,
    "domain": "Craft and Structure",
    "difficulty": "Medium",
    "passage": "Though known for his concise and direct journalism, the author's latest novel is surprisingly __________, filled with meandering descriptions and lengthy tangents that slow the pace of the narrative.",
    "question": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      "succinct",
      "verbose",
      "compelling",
      "objective"
    ],
    "correctIndex": 1,
    "explanation": "The word \"verbose\" means using more words than are needed. This directly contrasts with the author's usual \"concise and direct\" style and perfectly aligns with the context clues \"meandering descriptions and lengthy tangents.\""
  },
  {
    "id": 93010,
    "domain": "Craft and Structure",
    "difficulty": "Medium",
    "passage": "Bioluminescence is the production and emission of light by a living organism. It occurs widely in marine vertebrates and invertebrates, as well as in some fungi and insects. The primary function of this trait varies by species, ranging from camouflage and defense to communication and attracting prey.",
    "question": "Which choice best describes the main purpose of the text?",
    "choices": [
      "To argue that bioluminescence is primarily used for camouflage in marine environments.",
      "To detail the complex chemical processes that allow organisms to produce light.",
      "To define bioluminescence and briefly explain its occurrences and functions in nature.",
      "To compare the bioluminescent capabilities of fungi to those of marine vertebrates."
    ],
    "correctIndex": 2,
    "explanation": "The text serves as a basic introduction to bioluminescence, providing its definition, listing where it is found, and outlining its various evolutionary functions."
  },
  {
    "id": 93011,
    "domain": "Craft and Structure",
    "difficulty": "Hard",
    "passage": "While the committee's initial proposal for urban redevelopment was widely praised for its visionary scope, a closer reading of the budget revealed that the financial projections were completely ________, relying on hypothetical tax revenues that had no basis in current economic realities.",
    "question": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      "illusory",
      "pragmatic",
      "prescient",
      "lucrative"
    ],
    "correctIndex": 0,
    "explanation": "The word 'illusory' means deceptive or not real. This perfectly fits the context of financial projections that rely on 'hypothetical tax revenues' with 'no basis in current economic realities.'"
  },
  {
    "id": 93012,
    "domain": "Craft and Structure",
    "difficulty": "Hard",
    "passage": "In 1856, Eunice Newton Foote conducted experiments demonstrating that carbon dioxide absorbs more heat than atmospheric air, concluding that an atmosphere of CO2 would give Earth a high temperature. Despite predating John Tyndall's similar and more famous findings by three years, Foote's work was largely overlooked by the scientific community of her time, relegated to a brief presentation by a male colleague at a conference she did not attend.",
    "question": "Which choice best describes the main purpose of the text?",
    "choices": [
      "To argue that John Tyndall plagiarized Eunice Newton Foote's experimental methods.",
      "To explain the chemical mechanisms by which carbon dioxide absorbs atmospheric heat.",
      "To highlight an overlooked historical figure who made an early discovery regarding greenhouse gases.",
      "To detail the specific events of the 1856 scientific conference where Foote's research was mocked."
    ],
    "correctIndex": 2,
    "explanation": "The text focuses on explaining Foote's early, significant discovery about CO2 and heat, and concludes by pointing out how her major contribution was historically neglected by the scientific community."
  },
  {
    "id": 93013,
    "domain": "Expression of Ideas",
    "difficulty": "Easy",
    "passage": "The hiking trail is known for its steep inclines and rocky terrain. ________, beginners are advised to choose a different route for their first trip.",
    "question": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Previously",
      "In contrast",
      "Similarly",
      "Therefore"
    ],
    "correctIndex": 3,
    "explanation": "The word 'Therefore' logically connects the difficulty of the trail to the resulting advice that beginners should avoid it."
  },
  {
    "id": 93014,
    "domain": "Expression of Ideas",
    "difficulty": "Easy",
    "passage": "While researching a topic, a student has taken the following notes:\n- The Eiffel Tower is a famous monument.\n- It was completed in 1889.\n- It is located in Paris, France.\n- Millions of people visit it every year.",
    "question": "The student wants to emphasize the location of the Eiffel Tower. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Completed in 1889, the Eiffel Tower is visited by millions.",
      "The famous Eiffel Tower is located in Paris, France.",
      "The Eiffel Tower is a famous monument that many people visit.",
      "Millions of people visit the famous monument every year."
    ],
    "correctIndex": 1,
    "explanation": "This choice is the only one that specifically highlights the location of the Eiffel Tower (Paris, France) as requested by the prompt."
  },
  {
    "id": 93015,
    "domain": "Expression of Ideas",
    "difficulty": "Medium",
    "passage": "Early electric vehicles suffered from limited battery ranges and long charging times, making them highly impractical for long road trips. __________, rapid advancements in lithium-ion technology and the widespread expansion of charging networks have largely eliminated these initial barriers.",
    "question": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Consequently",
      "Furthermore",
      "In other words",
      "However"
    ],
    "correctIndex": 3,
    "explanation": "The transition word \"However\" properly establishes the contrast between the past limitations of electric vehicles and the recent technological advancements that have solved those issues."
  },
  {
    "id": 93016,
    "domain": "Expression of Ideas",
    "difficulty": "Medium",
    "passage": "A student has taken the following notes:\n- Ada Lovelace was an English mathematician born in 1815.\n- She worked extensively on Charles Babbage's proposed mechanical computer, the Analytical Engine.\n- She recognized that the machine had applications beyond pure calculation.\n- She published the first algorithm intended to be carried out by such a machine, making her the first computer programmer.",
    "question": "The student wants to emphasize Ada Lovelace's pioneering contribution to computer science. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "By publishing the first algorithm intended for Charles Babbage's Analytical Engine, Ada Lovelace became the world's first computer programmer.",
      "Born in 1815, Ada Lovelace was an English mathematician who collaborated with Charles Babbage.",
      "Charles Babbage's Analytical Engine was a mechanical computer that Ada Lovelace worked on extensively during the 1800s.",
      "Ada Lovelace recognized that mechanical computers like the Analytical Engine had applications beyond pure calculation."
    ],
    "correctIndex": 0,
    "explanation": "This choice effectively synthesizes the notes to highlight her specific pioneering contribution (publishing the first algorithm) and its historical significance (becoming the first computer programmer)."
  },
  {
    "id": 93017,
    "domain": "Expression of Ideas",
    "difficulty": "Hard",
    "passage": "The prevailing theory among economists was that lowering interest rates would immediately spur consumer spending. ________, early indicators from the retail sector show that consumers are instead increasing their savings, wary of impending inflation.",
    "question": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Consequently",
      "Conversely",
      "In addition",
      "Similarly"
    ],
    "correctIndex": 1,
    "explanation": "The second sentence presents a reality (increasing savings) that directly contradicts the prevailing theory mentioned in the first sentence (spurring spending). 'Conversely' correctly sets up this contrasting relationship."
  },
  {
    "id": 93018,
    "domain": "Expression of Ideas",
    "difficulty": "Hard",
    "passage": "A student has taken the following notes: \n- The James Webb Space Telescope (JWST) was launched in 2021. \n- It observes the universe primarily in the infrared spectrum. \n- The Hubble Space Telescope primarily observes optical and ultraviolet light. \n- Infrared observation allows the JWST to see through dense dust clouds to observe star formation. \n- This capability makes JWST uniquely suited to studying the early universe.",
    "question": "The student wants to emphasize an advantage of the JWST over the Hubble Space Telescope. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Launched in 2021, the JWST observes the universe in the infrared spectrum, whereas the Hubble Space Telescope observes optical and ultraviolet light.",
      "Because it observes in the infrared spectrum unlike Hubble, the JWST can pierce dense dust clouds to study star formation in the early universe.",
      "The JWST and Hubble Space Telescope observe the universe in different spectrums, making them both valuable tools for studying star formation.",
      "The Hubble Space Telescope observes optical and ultraviolet light, which does not allow it to see through dense dust clouds to observe star formation."
    ],
    "correctIndex": 1,
    "explanation": "This choice explicitly contrasts the JWST's capabilities with Hubble's while detailing the specific advantage derived from those capabilities (piercing dense dust clouds to study early star formation), directly fulfilling the prompt's rhetorical goal."
  },
  {
    "id": 93019,
    "domain": "Standard English Conventions",
    "difficulty": "Easy",
    "passage": "The concert was scheduled to begin at eight o'clock in the ________ the band did not take the stage until almost nine.",
    "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "evening however",
      "evening, however,",
      "evening; however,",
      "evening however,"
    ],
    "correctIndex": 2,
    "explanation": "A semicolon is needed to properly separate the two independent clauses, followed by a comma after the transitional adverb 'however'."
  },
  {
    "id": 93020,
    "domain": "Standard English Conventions",
    "difficulty": "Easy",
    "passage": "The team of researchers successfully completed the experiment. Each of the scientists ________ praised for contributing to the major breakthrough.",
    "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "were",
      "was",
      "are",
      "have been"
    ],
    "correctIndex": 1,
    "explanation": "The subject 'Each' is singular, so it requires the singular verb 'was' to maintain subject-verb agreement."
  },
  {
    "id": 93021,
    "domain": "Standard English Conventions",
    "difficulty": "Medium",
    "passage": "The Andromeda Galaxy is the nearest spiral galaxy to the Milky ______ is on a collision course with our home galaxy and is expected to merge with it in about 4.5 billion years.",
    "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "Way, it",
      "Way it",
      "Way and it",
      "Way; it"
    ],
    "correctIndex": 3,
    "explanation": "The text contains two independent clauses: \"The Andromeda Galaxy is the nearest spiral galaxy...\" and \"it is on a collision course...\". A semicolon is required to properly separate two independent clauses when no coordinating conjunction is used."
  },
  {
    "id": 93022,
    "domain": "Standard English Conventions",
    "difficulty": "Medium",
    "passage": "The museum's new collection of rare paintings, which includes several recently undiscovered masterpieces from the 18th century, ______ going up for auction next month to help fund public art programs.",
    "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "are",
      "were",
      "is",
      "have been"
    ],
    "correctIndex": 2,
    "explanation": "The subject of the sentence is the singular noun \"collection,\" which requires the singular verb \"is.\" The phrase enclosed in commas is an interrupter and does not make the subject plural."
  },
  {
    "id": 93023,
    "domain": "Standard English Conventions",
    "difficulty": "Hard",
    "passage": "The architect's latest design integrates passive solar heating, extensive green roofs, and a state-of-the-art rainwater harvesting ______ these environmentally conscious features earned the building a Platinum LEED certification.",
    "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "system, furthermore,",
      "system",
      "system;",
      "system,"
    ],
    "correctIndex": 2,
    "explanation": "The blank separates two independent clauses: 'The architect's latest design integrates...' and 'these environmentally conscious features earned...'. A semicolon is necessary to properly join them without creating a run-on sentence or comma splice."
  },
  {
    "id": 93024,
    "domain": "Standard English Conventions",
    "difficulty": "Hard",
    "passage": "In the late nineteenth century, the meticulous cataloging of stellar spectra by Williamina Fleming and her colleagues at the Harvard College Observatory ______ the foundation for the modern classification of stars.",
    "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "have laid",
      "were laying",
      "laying",
      "laid"
    ],
    "correctIndex": 3,
    "explanation": "The subject of the sentence is the singular noun 'cataloging'. The sentence requires a main verb in the simple past tense to describe a completed historical action. 'Laid' correctly functions as the simple past main verb."
  }
];
