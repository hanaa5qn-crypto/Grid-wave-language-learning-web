// =============================================================================
// Vivid Lingua — English track (IELTS listening expansion, tier C)
// -----------------------------------------------------------------------------
// C1–C2 listening expansion, ids 181–217. British academic monologues in the
// IELTS Section-4 register (en-GB-SoniaNeural). C1 = 16 items (181–196),
// C2 = 17 items (201–217). Each item carries exactly three MCQs, at least one
// of which probes the speaker's stance, argument, or purpose.
// =============================================================================

import type { ListeningItem } from '../types';

export const IELTS_EXP_LISTENING_C: ListeningItem[] = [
  // ---------------------------------------------------------------------------
  // C1 — ids 181–196
  // ---------------------------------------------------------------------------
  {
    id: 181,
    level: 'C1',
    topic: "Psychology",
    title: "The Psychology of Habit",
    transcript:
      "Today I want to unsettle a comfortable assumption: that changing a habit is chiefly a matter of willpower. The evidence points elsewhere. Work by Wendy Wood at the University of Southern California suggests that roughly forty-three per cent of our daily actions are performed almost automatically, triggered not by deliberate choice but by context. When you reach for your phone the moment you sit down, the sofa itself is doing much of the prompting. Now, I don't deny that motivation matters; without some initial intent, no new routine ever begins. But motivation is notoriously unreliable, and to lean on it exclusively is to build on sand. The more durable strategy, researchers argue, is to redesign the environment so that the desired action becomes the path of least resistance. Leave the running shoes by the door; keep the biscuits out of sight. It sounds almost trivial, and critics reasonably ask whether such tricks address the deeper causes of behaviour. Perhaps not entirely. Yet if habits are cued by surroundings, then reshaping those surroundings is not a gimmick but the very lever we have been overlooking all along.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main argument?",
        choices: [
          "Reshaping one's environment is a more reliable lever than willpower.",
          "Willpower is the decisive factor in changing habits.",
          "Habits cannot be changed once they are formed.",
          "Motivation is entirely irrelevant to behaviour.",
        ],
        correctIndex: 0,
        explanation: "\"if habits are cued by surroundings, then reshaping those surroundings is not a gimmick but the very lever we have been overlooking.\"",
      },
      {
        id: 2,
        question: "According to Wendy Wood's research, roughly what proportion of daily actions are near-automatic?",
        choices: [
          "A quarter",
          "Forty-three per cent",
          "A third",
          "Two thirds",
        ],
        correctIndex: 1,
        explanation: "\"roughly forty-three per cent of our daily actions are performed almost automatically.\"",
      },
      {
        id: 3,
        question: "How does the speaker treat the role of motivation?",
        choices: [
          "As unnecessary at every stage.",
          "As the single most durable strategy.",
          "As necessary to begin but unreliable to sustain change.",
          "As more important than context.",
        ],
        correctIndex: 2,
        explanation: "\"without some initial intent, no new routine ever begins. But motivation is notoriously unreliable.\"",
      },
    ],
  },
  {
    id: 182,
    level: 'C1',
    topic: "Environment",
    title: "A Panel on Urban Green Spaces",
    transcript:
      "When we defend urban parks, we usually reach for the language of wellbeing: green space calms the mind, we say, and lowers stress. That is true, and studies from the University of Exeter put a striking figure on it, linking regular access to nature with measurable drops in anxiety. But I want to push the conversation somewhere less comfortable. The trouble with framing parks purely as therapy is that it treats them as an amenity, a nice-to-have that competes with housing and roads for scarce land. And in that competition, therapy usually loses. So let me offer a different case. Green spaces are not merely restful; they are functional infrastructure. Mature trees intercept rainfall and ease the burden on Victorian drains during floods. They cool streets that would otherwise trap heat, sometimes by several degrees. Seen this way, a park is less a garden than a piece of engineering. I'm not suggesting we abandon the wellbeing argument entirely; it moves people. But if we want green space to survive the next planning dispute, we would be wise to speak the harder language of drainage, temperature, and long-term cost.",
    questions: [
      {
        id: 1,
        question: "What shift in framing does the speaker advocate?",
        choices: [
          "From engineering arguments back to wellbeing arguments.",
          "From building parks to building housing instead.",
          "From public parks to private gardens.",
          "From viewing parks as therapy to viewing them as functional infrastructure.",
        ],
        correctIndex: 3,
        explanation: "\"Green spaces are not merely restful; they are functional infrastructure.\"",
      },
      {
        id: 2,
        question: "Why does the speaker consider the \"therapy\" framing risky?",
        choices: [
          "It makes parks seem an optional amenity that loses out to housing and roads.",
          "It has no scientific support.",
          "It exaggerates the mental-health benefits.",
          "It ignores the cost of maintenance.",
        ],
        correctIndex: 0,
        explanation: "\"it treats them as an amenity, a nice-to-have that competes with housing and roads... in that competition, therapy usually loses.\"",
      },
      {
        id: 3,
        question: "Which functional benefit of trees does the speaker cite?",
        choices: [
          "They increase property values.",
          "They intercept rainfall and cool streets.",
          "They replace the need for drains entirely.",
          "They reduce traffic noise.",
        ],
        correctIndex: 1,
        explanation: "\"Mature trees intercept rainfall... They cool streets that would otherwise trap heat.\"",
      },
    ],
  },
  {
    id: 183,
    level: 'C1',
    topic: "Economics",
    title: "An Introduction to Behavioural Economics",
    transcript:
      "For most of the twentieth century, economics rested on a tidy fiction: the rational agent, a creature who weighs every option coolly and always chooses in its own best interest. It made the mathematics elegant. It also made the predictions wrong. Behavioural economics, pioneered by Daniel Kahneman and Amos Tversky in the nineteen-seventies, began by taking human error seriously. Their famous finding was loss aversion: we feel the pain of losing ten pounds far more keenly than the pleasure of gaining the same amount. Now, some economists resisted this, and not without reason, they worried that if people are irrational in a thousand different ways, prediction becomes impossible. It's a fair objection. But Kahneman's reply was crucial: our mistakes are not random, they are systematic. We over-value the present, we cling to defaults, we are swayed by how choices are framed. And because these biases are predictable, they can be modelled, and even gently steered. That, I would argue, is the field's real achievement: not to abandon the idea of prediction, but to rebuild it on a more honest picture of the mind.",
    questions: [
      {
        id: 1,
        question: "What does the speaker identify as behavioural economics' \"real achievement\"?",
        choices: [
          "Abandoning prediction altogether.",
          "Proving that people are entirely irrational.",
          "Rebuilding prediction on a more realistic model of human error.",
          "Defending the rational-agent model.",
        ],
        correctIndex: 2,
        explanation: "\"not to abandon the idea of prediction, but to rebuild it on a more honest picture of the mind.\"",
      },
      {
        id: 2,
        question: "Who does the speaker credit with pioneering the field in the 1970s?",
        choices: [
          "Adam Smith and David Ricardo",
          "Wendy Wood",
          "Richard Thaler alone",
          "Daniel Kahneman and Amos Tversky",
        ],
        correctIndex: 3,
        explanation: "\"pioneered by Daniel Kahneman and Amos Tversky in the nineteen-seventies.\"",
      },
      {
        id: 3,
        question: "How does the speaker answer the objection that human irrationality makes prediction impossible?",
        choices: [
          "By noting that our mistakes are systematic rather than random.",
          "By conceding that prediction is indeed impossible.",
          "By arguing that people are in fact rational.",
          "By rejecting mathematics in economics.",
        ],
        correctIndex: 0,
        explanation: "\"our mistakes are not random, they are systematic.\"",
      },
    ],
  },
  {
    id: 184,
    level: 'C1',
    topic: "History",
    title: "The History of the Tea Trade",
    transcript:
      "We tend to picture tea as quintessentially English, a symbol of quiet domestic comfort. The history behind the cup is anything but comfortable. Tea reached Britain in the mid-seventeenth century as a rare luxury, and by the seventeen-hundreds demand had become insatiable. Here is the awkward part. Britain had almost nothing China wanted in exchange; silver drained eastward, and the imbalance alarmed the government. The solution the East India Company arrived at was to sell opium, grown in India, into China, to finance the tea flowing the other way. It is tempting to tell this as a simple morality tale of greed, and greed certainly played its part. But I'd caution against reading it only that way. The tea trade also knit together three continents into a single economic web, spread new agricultural techniques, and reshaped diets from London to Canton. My point is not to excuse the coercion involved, which was real and often brutal, but to insist that this humble beverage sat at the centre of a genuinely global system, one whose consequences we are still, in various ways, living with.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main point about the tea trade?",
        choices: [
          "It was purely a story of British greed.",
          "It was a genuinely global system with lasting consequences, not just a morality tale.",
          "It had little effect beyond Britain.",
          "It was too comfortable to be historically interesting.",
        ],
        correctIndex: 1,
        explanation: "\"this humble beverage sat at the centre of a genuinely global system, one whose consequences we are still... living with.\"",
      },
      {
        id: 2,
        question: "How did the East India Company finance its tea purchases?",
        choices: [
          "By selling British silver directly.",
          "By trading English cloth for tea.",
          "By selling opium grown in India into China.",
          "By growing tea in India instead.",
        ],
        correctIndex: 2,
        explanation: "\"to sell opium, grown in India, into China, to finance the tea flowing the other way.\"",
      },
      {
        id: 3,
        question: "When did tea first reach Britain, according to the talk?",
        choices: [
          "The early sixteenth century",
          "The late eighteenth century",
          "The nineteenth century",
          "The mid-seventeenth century",
        ],
        correctIndex: 3,
        explanation: "\"Tea reached Britain in the mid-seventeenth century as a rare luxury.\"",
      },
    ],
  },
  {
    id: 185,
    level: 'C1',
    topic: "Media",
    title: "A Radio Essay on Attention Spans",
    transcript:
      "You will have heard the alarming claim, repeated everywhere, that the human attention span has shrunk to eight seconds, shorter, we are told, than that of a goldfish. It is a wonderful statistic, and almost entirely baseless; researchers have traced it to a source that never existed. So let me be clear from the outset: I am not here to tell you your brain is broken. Attention is not a fixed reservoir that technology is draining. And yet, to dismiss the whole worry as a myth would be too glib. Something has changed, even if it isn't our neural hardware. What the constant pull of notifications alters is not our capacity to concentrate but the conditions under which we choose to. We have built environments engineered to interrupt, and then we blame ourselves for being interruptible. The distinction matters, because it changes the remedy. If the problem were biological, we would be helpless. But if it is environmental, a matter of design and habit, then it is something we can, with effort, redesign. The goldfish, incidentally, deserves an apology.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's central claim about attention?",
        choices: [
          "The problem is environmental design, not a decline in our biological capacity.",
          "Human attention spans have shrunk to eight seconds.",
          "Technology has permanently damaged the brain.",
          "Attention is a fixed reservoir being drained.",
        ],
        correctIndex: 0,
        explanation: "\"What the constant pull of notifications alters is not our capacity to concentrate but the conditions under which we choose to.\"",
      },
      {
        id: 2,
        question: "What does the speaker say about the \"eight seconds\" statistic?",
        choices: [
          "It is well supported by research.",
          "It is almost entirely baseless, traced to a source that never existed.",
          "It applies only to children.",
          "It was measured against goldfish accurately.",
        ],
        correctIndex: 1,
        explanation: "\"almost entirely baseless; researchers have traced it to a source that never existed.\"",
      },
      {
        id: 3,
        question: "Why does the speaker say the biological-versus-environmental distinction matters?",
        choices: [
          "Because it proves the brain is broken.",
          "Because it excuses our behaviour entirely.",
          "Because an environmental problem is something we can redesign, unlike a biological one.",
          "Because notifications are harmless.",
        ],
        correctIndex: 2,
        explanation: "\"if it is environmental, a matter of design and habit, then it is something we can, with effort, redesign.\"",
      },
    ],
  },
  {
    id: 186,
    level: 'C1',
    topic: "Language",
    title: "Bilingualism and the Brain",
    transcript:
      "For decades, bilingualism carried a certain stigma. Educators once warned that raising a child with two languages would muddle the mind and delay development. That view has been thoroughly overturned. Research led by Ellen Bialystok in Toronto suggests that managing two languages is a continual mental workout: the bilingual brain must constantly suppress one tongue to speak the other, and this exercises the same executive-control systems we use for focus and self-restraint. Some studies even hint that lifelong bilingualism may delay the onset of dementia symptoms by several years. Now, I want to add a note of caution, because the field has seen its share of overstated headlines. Not every study replicates, and the so-called bilingual advantage may be smaller and more situational than early enthusiasm implied. Careful researchers now speak in measured terms. But even allowing for that correction, the deeper lesson stands: the brain is not a container that fills up and overflows. It is a muscle that adapts to the demands we place upon it, and juggling two languages, far from crowding it, appears to keep it supple.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's overall stance on bilingualism's effects?",
        choices: [
          "It muddles the developing mind.",
          "It has no measurable effect on cognition.",
          "It reliably prevents dementia in everyone.",
          "Despite some overstated claims, it broadly appears to keep the brain adaptable.",
        ],
        correctIndex: 3,
        explanation: "\"even allowing for that correction, the deeper lesson stands... juggling two languages... appears to keep it supple.\"",
      },
      {
        id: 2,
        question: "Whose research is cited on executive control in bilinguals?",
        choices: [
          "Ellen Bialystok in Toronto",
          "Daniel Kahneman",
          "Wendy Wood",
          "Amos Tversky",
        ],
        correctIndex: 0,
        explanation: "\"Research led by Ellen Bialystok in Toronto.\"",
      },
      {
        id: 3,
        question: "What caution does the speaker raise?",
        choices: [
          "That bilingualism delays speech permanently.",
          "That the bilingual advantage may be smaller and more situational than claimed.",
          "That no research exists on the topic.",
          "That two languages overflow the brain.",
        ],
        correctIndex: 1,
        explanation: "\"the so-called bilingual advantage may be smaller and more situational than early enthusiasm implied.\"",
      },
    ],
  },
  {
    id: 187,
    level: 'C1',
    topic: "Archaeology",
    title: "An Interview with an Archaeologist",
    transcript:
      "People often imagine archaeology as a treasure hunt, all golden masks and dramatic discoveries. I understand the appeal, but I'd gently resist it, because it distorts what the work is really about. The most valuable thing we recover is rarely the most beautiful. Take the site at Çatalhöyük in Turkey, a nine-thousand-year-old settlement. What made it extraordinary was not any single artefact but the accumulated evidence of ordinary life: the layers of household refuse, the pattern of the hearths, the position of the burials beneath the floors. From such humble traces we can reconstruct how people ate, worshipped, and organised their homes. Now, I won't pretend the spectacular finds don't matter; they capture the public imagination, and that funds the fieldwork. But if you ask me what archaeology actually teaches, it is patience with the unglamorous. A broken cooking pot, carefully documented in context, tells us more about a vanished society than a crown wrenched from the ground with no record of where it lay. Context, not treasure, is the discipline's true currency.",
    questions: [
      {
        id: 1,
        question: "What does the archaeologist argue is the discipline's \"true currency\"?",
        choices: [
          "Golden masks and treasure.",
          "Public funding.",
          "Context and the evidence of ordinary life.",
          "The oldest possible artefacts.",
        ],
        correctIndex: 2,
        explanation: "\"Context, not treasure, is the discipline's true currency.\"",
      },
      {
        id: 2,
        question: "What made Çatalhöyük extraordinary, according to the speaker?",
        choices: [
          "A single spectacular artefact.",
          "A royal burial with a crown.",
          "Its great physical size.",
          "The accumulated evidence of ordinary daily life.",
        ],
        correctIndex: 3,
        explanation: "\"not any single artefact but the accumulated evidence of ordinary life.\"",
      },
      {
        id: 3,
        question: "Why does the speaker concede that spectacular finds still matter?",
        choices: [
          "They capture the public imagination and help fund fieldwork.",
          "They are the only reliable evidence.",
          "They are easier to document than pottery.",
          "They reveal more about daily life.",
        ],
        correctIndex: 0,
        explanation: "\"they capture the public imagination, and that funds the fieldwork.\"",
      },
    ],
  },
  {
    id: 188,
    level: 'C1',
    topic: "Academic",
    title: "A Seminar on Research Methods",
    transcript:
      "Before you design your first study, I want to warn you against the most seductive error in the whole of research: mistaking correlation for causation. You will have heard the mantra a hundred times, and yet in practice it is astonishingly easy to forget. Suppose we find that towns with more ice-cream sales also record more drownings. Does ice cream cause drowning? Of course not; a third factor, hot weather, drives both. That example is obvious, but the same trap lurks, far better disguised, in medical and social data every day. So how do we guard against it? The gold standard remains the randomised controlled trial, in which we assign participants to conditions by chance and thereby break the link with hidden variables. I should stress that randomised trials are not always feasible or ethical, we cannot, for instance, randomly assign people to smoke. In those cases we lean on careful statistical controls and replication. But the underlying discipline is constant: before you claim that A causes B, you must rule out, as rigorously as you can, every C that might be quietly producing both.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's central methodological warning?",
        choices: [
          "Never use statistics in research.",
          "Do not mistake correlation for causation without ruling out hidden variables.",
          "Randomised trials are always the wrong choice.",
          "Ice cream should be studied more carefully.",
        ],
        correctIndex: 1,
        explanation: "\"mistaking correlation for causation... before you claim that A causes B, you must rule out... every C that might be quietly producing both.\"",
      },
      {
        id: 2,
        question: "What third factor explains the ice-cream-and-drowning correlation?",
        choices: [
          "Poor swimming ability",
          "Advertising",
          "Hot weather",
          "Coastal towns",
        ],
        correctIndex: 2,
        explanation: "\"a third factor, hot weather, drives both.\"",
      },
      {
        id: 3,
        question: "What does the speaker acknowledge about randomised controlled trials?",
        choices: [
          "They are always feasible and ethical.",
          "They can never establish causation.",
          "They are inferior to correlation studies.",
          "They are not always feasible or ethical, so controls and replication are sometimes used instead.",
        ],
        correctIndex: 3,
        explanation: "\"randomised trials are not always feasible or ethical... In those cases we lean on careful statistical controls and replication.\"",
      },
    ],
  },
  {
    id: 189,
    level: 'C1',
    topic: "Society",
    title: "A Talk on Sustainable Fashion",
    transcript:
      "The fashion industry has discovered sustainability, and you might think that a cause for celebration. I'm more sceptical. Walk into any high-street shop and you'll find garments proudly labelled as made from recycled bottles or organic cotton. These gestures are not nothing, but they can distract from the central problem, which is not how clothes are made but how many we make. The industry now produces roughly twice the volume of garments it did in the year two thousand, and the average item is worn far fewer times before it is discarded. Against that tide, a recycled polyester T-shirt is a raindrop. I don't want to sound purely negative, some brands are genuinely rethinking durability and repair, and those efforts deserve credit. But I'd urge you to be alert to what critics call greenwashing: sustainability as marketing rather than substance. The most sustainable garment, awkwardly for an industry built on novelty, is the one you already own. Until we confront overproduction itself, the eco-friendly label risks being less a solution than a comfortable way of avoiding one.",
    questions: [
      {
        id: 1,
        question: "What does the speaker identify as the central problem in fashion?",
        choices: [
          "The sheer volume of garments produced and quickly discarded.",
          "The materials used to make clothes.",
          "The lack of recycled polyester.",
          "The absence of organic cotton.",
        ],
        correctIndex: 0,
        explanation: "\"the central problem, which is not how clothes are made but how many we make.\"",
      },
      {
        id: 2,
        question: "What figure does the speaker give for changes in garment production?",
        choices: [
          "Production has halved since 2000.",
          "Production is roughly twice what it was in 2000.",
          "Production has stayed constant.",
          "Production tripled since 2010.",
        ],
        correctIndex: 1,
        explanation: "\"roughly twice the volume of garments it did in the year two thousand.\"",
      },
      {
        id: 3,
        question: "What is the speaker's attitude to \"eco-friendly\" labels?",
        choices: [
          "They fully solve the industry's problems.",
          "They are always dishonest.",
          "They can be greenwashing that distracts from overproduction.",
          "They are irrelevant to consumers.",
        ],
        correctIndex: 2,
        explanation: "\"the eco-friendly label risks being less a solution than a comfortable way of avoiding one.\"",
      },
    ],
  },
  {
    id: 190,
    level: 'C1',
    topic: "Medicine",
    title: "The Placebo Effect",
    transcript:
      "The placebo effect is often dismissed as a nuisance, the noise that clinical trials must subtract to reveal a drug's true worth. I want to suggest we have been looking at it the wrong way round. Consider that patients given a dummy pill frequently report genuine relief, sometimes measurable in blood pressure or pain thresholds, not because they are deluded, but because expectation and ritual shape the body's own responses. Henry Beecher drew attention to this as early as nineteen fifty-five. Now, let me be careful here, because the placebo effect is easily exaggerated by wishful thinking. It will not shrink a tumour or mend a broken bone, and to pretend otherwise would be dangerous. But within its real limits, it tells us something profound: that the mind's expectations are not separate from physical healing but woven into it. Rather than treating the placebo response as an embarrassment to be eliminated, thoughtful clinicians are beginning to ask how the care, attention, and reassurance surrounding a treatment might be harnessed deliberately, ethically, as part of medicine itself, rather than dismissed as mere illusion.",
    questions: [
      {
        id: 1,
        question: "What reframing of the placebo effect does the speaker propose?",
        choices: [
          "That it is pure delusion to be ignored.",
          "That it can cure any illness including cancer.",
          "That it should be eliminated from medicine.",
          "That it reveals how expectation is woven into physical healing and could be harnessed.",
        ],
        correctIndex: 3,
        explanation: "\"the mind's expectations are not separate from physical healing but woven into it.\"",
      },
      {
        id: 2,
        question: "Who drew attention to the placebo effect in 1955?",
        choices: [
          "Henry Beecher",
          "Ellen Bialystok",
          "Daniel Kahneman",
          "Wendy Wood",
        ],
        correctIndex: 0,
        explanation: "\"Henry Beecher drew attention to this as early as nineteen fifty-five.\"",
      },
      {
        id: 3,
        question: "What limit does the speaker place on the placebo effect?",
        choices: [
          "It works only on children.",
          "It will not shrink a tumour or mend a broken bone.",
          "It has no measurable effects at all.",
          "It only affects blood pressure.",
        ],
        correctIndex: 1,
        explanation: "\"It will not shrink a tumour or mend a broken bone, and to pretend otherwise would be dangerous.\"",
      },
    ],
  },
  {
    id: 191,
    level: 'C1',
    topic: "Economics",
    title: "A Podcast on the Gig Economy",
    transcript:
      "The gig economy sells itself on a single, powerful word: flexibility. Be your own boss, work when you like, fit earning around your life. And for some, that promise is real and genuinely liberating. But I'd ask you to look harder at who bears the risk in this arrangement. When a platform classifies its drivers or couriers as independent contractors rather than employees, it sheds a great deal: no sick pay, no pension contributions, no guaranteed minimum wage. The flexibility, in other words, is often paid for by the worker in the currency of security. Now, I don't want to romanticise the old model of the nine-to-five job, which had its own rigidities and frustrations. Nor is every gig worker exploited; many value the autonomy sincerely. But the deeper question is whether flexibility and security must really be traded against one another, as the platforms imply, or whether that trade-off is a political choice dressed up as an economic law. Several countries are now testing a middle path, and their experiments, I think, deserve our close attention.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main argument about gig-economy flexibility?",
        choices: [
          "Flexibility is always harmful to workers.",
          "The nine-to-five job was ideal.",
          "The flexibility is often paid for by workers in lost security, and that trade-off may be a political choice.",
          "All gig workers are exploited.",
        ],
        correctIndex: 2,
        explanation: "\"The flexibility... is often paid for by the worker in the currency of security... a political choice dressed up as an economic law.\"",
      },
      {
        id: 2,
        question: "What does a platform shed by classifying workers as contractors?",
        choices: [
          "Its profits and shareholders.",
          "Its need for drivers.",
          "Its flexibility.",
          "Sick pay, pension contributions, and guaranteed minimum wage.",
        ],
        correctIndex: 3,
        explanation: "\"no sick pay, no pension contributions, no guaranteed minimum wage.\"",
      },
      {
        id: 3,
        question: "Which concession does the speaker make?",
        choices: [
          "That many gig workers sincerely value the autonomy.",
          "That the nine-to-five had no problems.",
          "That flexibility is meaningless.",
          "That platforms are always fair.",
        ],
        correctIndex: 0,
        explanation: "\"Nor is every gig worker exploited; many value the autonomy sincerely.\"",
      },
    ],
  },
  {
    id: 192,
    level: 'C1',
    topic: "Culture",
    title: "The Museum Repatriation Debate",
    transcript:
      "Few debates in the cultural world are as heated as the question of repatriation: should museums return artefacts taken, often under colonial rule, to their countries of origin? The traditional defence of the universal museum is that institutions like the British Museum make world heritage accessible to all, in one place, free of charge. There is something to that argument, and I won't dismiss it lightly. But I find it increasingly hard to sustain as a blanket principle. Consider the Benin Bronzes, seized during a punitive expedition in eighteen ninety-seven. To say they belong to humanity in general is, conveniently, to say they belong to whoever currently holds them. And the claim that source countries lack the facilities to care for such objects has worn thin, as new museums in Lagos and elsewhere plainly demonstrate. I'm not arguing that every object should be repatriated wholesale; that would be crude, and some cases are genuinely ambiguous. But the presumption, I'd suggest, ought now to shift. The burden should fall on the holding institution to justify keeping an object, not on the origin country to justify its return.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's overall position on repatriation?",
        choices: [
          "Museums should never return any artefacts.",
          "The presumption should shift so that holders must justify keeping objects.",
          "Every single object should be returned immediately.",
          "The universal-museum argument is entirely convincing.",
        ],
        correctIndex: 1,
        explanation: "\"The burden should fall on the holding institution to justify keeping an object, not on the origin country to justify its return.\"",
      },
      {
        id: 2,
        question: "When were the Benin Bronzes seized, according to the talk?",
        choices: [
          "1799",
          "1857",
          "1897",
          "1920",
        ],
        correctIndex: 2,
        explanation: "\"seized during a punitive expedition in eighteen ninety-seven.\"",
      },
      {
        id: 3,
        question: "How does the speaker treat the \"universal museum\" defence?",
        choices: [
          "Dismisses it outright as worthless.",
          "Fully endorses it.",
          "Ignores it entirely.",
          "Grants it some merit but finds it hard to sustain as a blanket principle.",
        ],
        correctIndex: 3,
        explanation: "\"There is something to that argument... But I find it increasingly hard to sustain as a blanket principle.\"",
      },
    ],
  },
  {
    id: 193,
    level: 'C1',
    topic: "Science",
    title: "Ocean Plastics Research",
    transcript:
      "When we picture ocean plastic pollution, we tend to imagine the great garbage patches, floating islands of bottles and bags. That image, though vivid, may actually mislead us. Recent surveys suggest that the visible debris on the surface accounts for only a small fraction of the plastic entering the sea; the great bulk of it either sinks or fragments into microplastics too small to see. Researchers now estimate that millions of tonnes go missing from the surface budget each year, and much of it, we suspect, settles into deep-sea sediments we have scarcely begun to sample. Why does this matter for policy? Because a clean-up effort aimed only at the surface, however photogenic, addresses the least of the problem. I don't say such projects are worthless; they raise awareness and remove real hazards to marine life. But if the majority of plastic is invisible, dispersed, and already embedded in the food web, then the honest conclusion is uncomfortable: the only effective response is to stop the plastic reaching the ocean in the first place.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main conclusion?",
        choices: [
          "The only effective response is to stop plastic reaching the ocean at source.",
          "Surface clean-ups solve the ocean plastic problem.",
          "Garbage patches contain most ocean plastic.",
          "Microplastics are not a real concern.",
        ],
        correctIndex: 0,
        explanation: "\"the only effective response is to stop the plastic reaching the ocean in the first place.\"",
      },
      {
        id: 2,
        question: "What does recent research suggest about visible surface debris?",
        choices: [
          "It is the majority of ocean plastic.",
          "It accounts for only a small fraction; the rest sinks or fragments.",
          "It has been fully removed.",
          "It is harmless to marine life.",
        ],
        correctIndex: 1,
        explanation: "\"the visible debris on the surface accounts for only a small fraction of the plastic entering the sea.\"",
      },
      {
        id: 3,
        question: "Why might the \"garbage patch\" image mislead policy?",
        choices: [
          "It exaggerates the total amount of plastic.",
          "It underestimates the danger to birds.",
          "It focuses attention on the surface, which is the least of the problem.",
          "It ignores plastic recycling.",
        ],
        correctIndex: 2,
        explanation: "\"a clean-up effort aimed only at the surface... addresses the least of the problem.\"",
      },
    ],
  },
  {
    id: 194,
    level: 'C1',
    topic: "Science",
    title: "An Interview on Space Tourism",
    transcript:
      "Space tourism has finally arrived, and the images are undeniably thrilling: private citizens gazing down at the curve of the Earth. I share the wonder, but I want to temper the hype with a few sober questions. The first is access. At present, a seat costs hundreds of thousands of dollars, sometimes far more, which means this frontier is open only to the very wealthy. Advocates reply, reasonably, that all new technologies begin expensive, aviation included, and gradually democratise. Perhaps. But the second question is harder to wave away, and that is the environmental cost. Each launch burns enormous quantities of fuel and deposits pollutants high in the atmosphere, where their effects are poorly understood and potentially disproportionate. So when enthusiasts describe space tourism as opening the cosmos to humanity, I'd gently point out that humanity, for now, means a handful of millionaires, at a real cost to the atmosphere we all share. I'm not against the venture in principle; exploration has always mattered. I only ask that we count the full price of the ticket, not merely the one printed on it.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's attitude toward space tourism?",
        choices: [
          "Wholehearted enthusiasm without reservation.",
          "Total opposition to any space exploration.",
          "Indifference to its consequences.",
          "Cautious, urging that the full costs of access and environment be counted.",
        ],
        correctIndex: 3,
        explanation: "\"I only ask that we count the full price of the ticket, not merely the one printed on it.\"",
      },
      {
        id: 2,
        question: "How do advocates respond to the concern about high cost?",
        choices: [
          "They argue new technologies start expensive and gradually democratise.",
          "They deny that seats are expensive.",
          "They say only the wealthy deserve access.",
          "They ignore the objection.",
        ],
        correctIndex: 0,
        explanation: "\"all new technologies begin expensive, aviation included, and gradually democratise.\"",
      },
      {
        id: 3,
        question: "Which concern does the speaker find hardest to dismiss?",
        choices: [
          "The high ticket price.",
          "The environmental cost of launches on the upper atmosphere.",
          "The risk to the passengers.",
          "The lack of public interest.",
        ],
        correctIndex: 1,
        explanation: "\"the second question is harder to wave away, and that is the environmental cost.\"",
      },
    ],
  },
  {
    id: 195,
    level: 'C1',
    topic: "Ethics",
    title: "The Ethics of Advertising",
    transcript:
      "Is advertising simply the provision of information, helping us choose between products? That is how the industry likes to describe itself, and in its gentlest forms the description holds. But I'd argue the modern reality has drifted a good way from it. Much contemporary advertising sells not information but identity: not what a product does, but who you will supposedly become by owning it. That shift raises an ethical worry. When a campaign works by manufacturing dissatisfaction, by making you feel inadequate until you buy, it is not so much informing a desire as engineering one. Defenders will say that consumers are not passive dupes, that we see through the flattery and the fantasy, and there is truth in that; we are more sceptical than the cynics allow. Yet the sheer volume and sophistication of persuasion, now tailored by data to each of us individually, tips the balance. I'm not calling for advertising to be banned, which would be both impractical and illiberal. I am suggesting that we drop the comfortable pretence that it is merely neutral information, and judge it, honestly, as the shaping of desire that it has become.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's central claim about modern advertising?",
        choices: [
          "It is purely neutral information.",
          "It should be completely banned.",
          "It has become the shaping of desire and identity, not mere information.",
          "It has no effect on consumers.",
        ],
        correctIndex: 2,
        explanation: "\"judge it, honestly, as the shaping of desire that it has become.\"",
      },
      {
        id: 2,
        question: "What ethical worry does the speaker raise?",
        choices: [
          "That adverts are too boring.",
          "That products are too expensive.",
          "That consumers cannot read.",
          "That advertising can manufacture dissatisfaction to engineer desire.",
        ],
        correctIndex: 3,
        explanation: "\"by making you feel inadequate until you buy, it is not so much informing a desire as engineering one.\"",
      },
      {
        id: 3,
        question: "How does the speaker treat the defence that consumers \"see through\" adverts?",
        choices: [
          "Grants some truth to it, but says data-tailored persuasion tips the balance.",
          "Rejects it as entirely false.",
          "Fully accepts it as decisive.",
          "Ignores the point.",
        ],
        correctIndex: 0,
        explanation: "\"there is truth in that... Yet the sheer volume and sophistication of persuasion... tips the balance.\"",
      },
    ],
  },
  {
    id: 196,
    level: 'C1',
    topic: "Psychology",
    title: "A Lecture on Crowd Psychology",
    transcript:
      "The word \"mob\" conjures a frightening image, a crowd that has lost its reason, a single irrational beast. This picture owes much to Gustave Le Bon, whose eighteen ninety-five account of the crowd mind proved enormously influential. And yet modern research has largely overturned it. When social psychologists actually study crowds, at football matches, protests, even emergencies, they find not mindless contagion but structure. People in crowds cooperate, help strangers, and follow shared norms far more often than they panic. Consider the evacuation studies after the London bombings: survivors describe orderly, mutual assistance, not stampede. Now, I don't want to overcorrect and pretend that crowds never turn dangerous; they plainly can, under specific conditions. But the older model got the causation backwards. Crowds do not strip away individual identity so much as forge a temporary collective one, and how that collective behaves depends heavily on how it is treated, not least by the authorities policing it. Heavy-handed control can manufacture the very disorder it claims to prevent. The lesson, then, is less about the madness of crowds than about the wisdom of understanding them.",
    questions: [
      {
        id: 1,
        question: "What is the main argument of the lecture?",
        choices: [
          "Crowds are irrational mobs, as Le Bon claimed.",
          "Modern research shows crowds are largely structured and cooperative, overturning the \"mob\" image.",
          "Crowds always panic in emergencies.",
          "Crowd behaviour cannot be studied scientifically.",
        ],
        correctIndex: 1,
        explanation: "\"they find not mindless contagion but structure... the older model got the causation backwards.\"",
      },
      {
        id: 2,
        question: "Whose influential 1895 account does the lecture challenge?",
        choices: [
          "Henry Beecher",
          "Ellen Bialystok",
          "Gustave Le Bon",
          "Wendy Wood",
        ],
        correctIndex: 2,
        explanation: "\"owes much to Gustave Le Bon, whose eighteen ninety-five account of the crowd mind proved enormously influential.\"",
      },
      {
        id: 3,
        question: "What does the speaker say about heavy-handed policing of crowds?",
        choices: [
          "It always prevents disorder.",
          "It has no effect on crowd behaviour.",
          "It creates a permanent collective identity.",
          "It can manufacture the very disorder it claims to prevent.",
        ],
        correctIndex: 3,
        explanation: "\"Heavy-handed control can manufacture the very disorder it claims to prevent.\"",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // C2 — ids 201–217
  // ---------------------------------------------------------------------------
  {
    id: 201,
    level: 'C2',
    topic: "Language",
    title: "Linguistic Relativity",
    transcript:
      "It is tempting, and for a time it was fashionable, to believe that our language imprisons our thought, that speakers of different tongues inhabit incommensurable worlds. The strong form of this thesis, associated with Benjamin Lee Whorf, held that language determines what we can conceive at all. That version, I should say plainly, has not survived scrutiny; speakers manifestly grasp concepts their languages leave unnamed, or they could never coin new words. So one might conclude the whole idea a romantic error and move on. I would resist that tidy dismissal. For a subtler, weaker claim has quietly earned its keep. Lera Boroditsky's experiments show that habitual linguistic categories nudge attention and memory in measurable ways: speakers of languages that mark direction absolutely, rather than as left and right, keep an uncanny sense of the cardinal points. The language does not forbid a thought; it renders certain thoughts more habitual, more ready to hand. And that, properly understood, is the interesting position, neither the fantasy that we are language's prisoners nor the complacency that language is a mere transparent window onto a world we would perceive identically without it.",
    questions: [
      {
        id: 1,
        question: "What position does the speaker ultimately defend?",
        choices: [
          "A moderate view: language makes certain thoughts more habitual without forbidding others.",
          "The strong Whorfian view that language determines all thought.",
          "That language is a wholly transparent window on reality.",
          "That linguistic relativity is entirely a romantic error.",
        ],
        correctIndex: 0,
        explanation: "\"The language does not forbid a thought; it renders certain thoughts more habitual, more ready to hand.\"",
      },
      {
        id: 2,
        question: "Why does the speaker reject the strong Whorfian thesis?",
        choices: [
          "Because Boroditsky disproved all relativity.",
          "Because speakers grasp concepts their languages leave unnamed.",
          "Because language has no effect on cognition at all.",
          "Because it is too fashionable.",
        ],
        correctIndex: 1,
        explanation: "\"speakers manifestly grasp concepts their languages leave unnamed, or they could never coin new words.\"",
      },
      {
        id: 3,
        question: "What did Boroditsky's experiments reportedly show?",
        choices: [
          "That languages make thoughts impossible.",
          "That direction words have no cognitive effect.",
          "That linguistic categories nudge attention and memory measurably.",
          "That all speakers perceive space identically.",
        ],
        correctIndex: 2,
        explanation: "\"habitual linguistic categories nudge attention and memory in measurable ways.\"",
      },
    ],
  },
  {
    id: 202,
    level: 'C2',
    topic: "Economics",
    title: "A Debate on Universal Basic Income",
    transcript:
      "The case against a universal basic income tends to arrive dressed as common sense: pay people for nothing, the objection runs, and they will simply stop working. It is an intuition worth taking seriously, and I will grant it a hearing before I dispute it. The intuition assumes that work is sustained chiefly by the fear of destitution, that without the whip of necessity, effort collapses. Yet the pilot studies we have, from Finland to Kenya to the Canadian town of Dauphin in the nineteen-seventies, stubbornly refuse to confirm this. Employment scarcely fell; where hours dropped, it was mostly new mothers and students prolonging education. So here is the pivot. If the doomsday prediction fails, perhaps the intuition mistakes the nature of work itself, treating it as mere drudgery endured for wages, rather than something people often seek for meaning, status, and structure. My thesis, then, is not that basic income is costless, it plainly is not, and the fiscal questions are formidable, but that the deepest objection to it rests on a portrait of human motivation the evidence does not support.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's thesis?",
        choices: [
          "Basic income is costless and obviously correct.",
          "People will stop working under basic income.",
          "Basic income should never be tested.",
          "The strongest objection to basic income rests on a mistaken view of human motivation.",
        ],
        correctIndex: 3,
        explanation: "\"the deepest objection to it rests on a portrait of human motivation the evidence does not support.\"",
      },
      {
        id: 2,
        question: "What do the pilot studies suggest about employment under basic income?",
        choices: [
          "Employment scarcely fell; drops were mainly new mothers and students.",
          "Employment collapsed everywhere.",
          "Everyone worked longer hours.",
          "No data exists.",
        ],
        correctIndex: 0,
        explanation: "\"Employment scarcely fell; where hours dropped, it was mostly new mothers and students prolonging education.\"",
      },
      {
        id: 3,
        question: "Which concession does the speaker make?",
        choices: [
          "That people work only for fear of destitution.",
          "That basic income is not costless and raises formidable fiscal questions.",
          "That the pilot studies are worthless.",
          "That work is mere drudgery.",
        ],
        correctIndex: 1,
        explanation: "\"it plainly is not, and the fiscal questions are formidable.\"",
      },
    ],
  },
  {
    id: 203,
    level: 'C2',
    topic: "Philosophy",
    title: "The Philosophy of Time",
    transcript:
      "We speak of time flowing, of the present moving from past to future, as though this were the plainest fact of experience. Physics, awkwardly, offers little to support it. In the equations of relativity, there is no privileged \"now\" sweeping across the universe; past, present and future appear as coordinates in a single block, no more genuinely flowing than the miles on a map flow past a road. This is the so-called block universe, and it is tempting to conclude that the passage of time is simply an illusion. But I want to hesitate before that conclusion, because it explains too much too cheaply. To call the flow of time an illusion is to owe an account of why we suffer the illusion so universally and so vividly, why memory runs one way and anticipation the other. The physicist may have banished flow from the equations, yet the asymmetry of past and future remains stubbornly real in thermodynamics, in the growth of entropy. My suggestion is that the honest position is not that time's passage is unreal, but that we have not yet reconciled the timeless physics with the time-bound creatures who somehow do the physics.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's considered position on the passage of time?",
        choices: [
          "Time's flow is definitely a pure illusion.",
          "Physics fully confirms that time flows.",
          "Rather than declaring the flow unreal, we have not yet reconciled timeless physics with our time-bound experience.",
          "There is no asymmetry between past and future.",
        ],
        correctIndex: 2,
        explanation: "\"the honest position is not that time's passage is unreal, but that we have not yet reconciled the timeless physics with the time-bound creatures.\"",
      },
      {
        id: 2,
        question: "What is the \"block universe\" as described here?",
        choices: [
          "A theory that time flows faster near mass.",
          "The idea that the future does not exist.",
          "A model of expanding space.",
          "A view in which past, present and future exist as coordinates, with no privileged \"now\".",
        ],
        correctIndex: 3,
        explanation: "\"past, present and future appear as coordinates in a single block.\"",
      },
      {
        id: 3,
        question: "Why does the speaker resist calling time's flow a mere illusion?",
        choices: [
          "Because it \"explains too much too cheaply\" and leaves the entropy-based asymmetry unexplained.",
          "Because physics proves flow is real.",
          "Because memory runs in both directions.",
          "Because relativity has been disproven.",
        ],
        correctIndex: 0,
        explanation: "\"it explains too much too cheaply... the asymmetry of past and future remains stubbornly real in thermodynamics.\"",
      },
    ],
  },
  {
    id: 204,
    level: 'C2',
    topic: "Cognition",
    title: "Metaphor and Thought",
    transcript:
      "Metaphor is usually filed under decoration, a flourish that poets add and plain speakers can do without. That, I shall argue, gets the matter almost exactly backwards. Consider how we cannot discuss argument without the vocabulary of war, we attack positions, defend claims, win or lose. We cannot discuss time without money, we spend it, save it, waste it. George Lakoff and Mark Johnson contended that such metaphors are not ornamental at all but constitutive, that we reason about abstract domains by importing the structure of concrete ones. Grant that, and an unsettling implication follows: the metaphors we live by quietly shape the conclusions we reach. If argument is war, compromise looks like surrender; frame it instead as a journey taken together, and the whole enterprise shifts. Now, I would not push this to the fashionable extreme that we are wholly captive to our metaphors, for we can, with effort, notice them and choose others, which is precisely my point. The power of metaphor lies not in its being inescapable but in its being ordinarily invisible. To make it visible is to recover a measure of control over thought we did not know we had ceded.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main claim about metaphor?",
        choices: [
          "Metaphor is merely decorative language poets add.",
          "Metaphors are constitutive of thought and quietly shape the conclusions we reach.",
          "We are entirely captive to our metaphors with no escape.",
          "Metaphor plays no role in reasoning.",
        ],
        correctIndex: 1,
        explanation: "\"such metaphors are not ornamental at all but constitutive... the metaphors we live by quietly shape the conclusions we reach.\"",
      },
      {
        id: 2,
        question: "Who argued that metaphors structure abstract reasoning?",
        choices: [
          "Lera Boroditsky",
          "Benjamin Lee Whorf",
          "George Lakoff and Mark Johnson",
          "Gustave Le Bon",
        ],
        correctIndex: 2,
        explanation: "\"George Lakoff and Mark Johnson contended that such metaphors are not ornamental at all but constitutive.\"",
      },
      {
        id: 3,
        question: "Why does the speaker reject the \"fashionable extreme\"?",
        choices: [
          "Because metaphors do not affect thought.",
          "Because Lakoff was proven wrong.",
          "Because argument is not like war.",
          "Because we can notice metaphors and choose others, which is the speaker's point about recovering control.",
        ],
        correctIndex: 3,
        explanation: "\"we can, with effort, notice them and choose others, which is precisely my point.\"",
      },
    ],
  },
  {
    id: 205,
    level: 'C2',
    topic: "Ethics",
    title: "A Debate on Genetic Editing",
    transcript:
      "The prospect of editing the human germline, of altering genes that will pass to all future generations, is routinely met with a shudder, and the instinct behind that shudder deserves respect. We are, after all, contemplating changes no future person could consent to. Yet I want to examine whether the shudder, taken alone, amounts to an argument. Consider the case most favourable to intervention: eliminating a devastating hereditary disease such as Huntington's. Here the appeal to nature rings hollow, for we intervene against nature routinely, in every vaccine and every surgery, without moral panic. So the concession is genuine: in narrow therapeutic cases, the objection weakens considerably. But here is where I pivot, for the difficulty is not the clear cases but the slope beneath them. Once the machinery exists, the line between curing disease and selecting for advantage is not a wall but a gradient, policed by markets and vanity as much as by ethics. My thesis is therefore uncomfortable for both camps: the technology is not intrinsically wrong, and precisely for that reason it is more dangerous than a simple prohibition could ever capture.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's thesis about germline editing?",
        choices: [
          "It is not intrinsically wrong, and for that very reason it is more dangerous than a simple ban implies.",
          "It is intrinsically and always wrong.",
          "It should be freely available to all.",
          "The \"appeal to nature\" settles the debate.",
        ],
        correctIndex: 0,
        explanation: "\"the technology is not intrinsically wrong, and precisely for that reason it is more dangerous than a simple prohibition could ever capture.\"",
      },
      {
        id: 2,
        question: "Which example does the speaker call most favourable to intervention?",
        choices: [
          "Enhancing intelligence",
          "Eliminating a hereditary disease such as Huntington's",
          "Selecting eye colour",
          "Increasing height",
        ],
        correctIndex: 1,
        explanation: "\"eliminating a devastating hereditary disease such as Huntington's.\"",
      },
      {
        id: 3,
        question: "Where does the speaker locate the real difficulty?",
        choices: [
          "In the clear therapeutic cases.",
          "In the impossibility of any gene editing.",
          "In the gradient from curing disease to selecting for advantage.",
          "In the appeal to nature.",
        ],
        correctIndex: 2,
        explanation: "\"the line between curing disease and selecting for advantage is not a wall but a gradient.\"",
      },
    ],
  },
  {
    id: 206,
    level: 'C2',
    topic: "Society",
    title: "A Radio Essay on Solitude",
    transcript:
      "We have grown adept at pathologising being alone. Solitude and loneliness are quietly conflated, so that a person content in their own company is suspected of secret misery, and the cure prescribed is always more connection. I want to prise the two apart. Loneliness is indeed painful, a felt deficit, the ache of wanting company one lacks. But solitude, chosen and cultivated, is something else entirely, and cultures across history have prized it as the precondition of thought. Montaigne retreated to his tower; the Romantics walked alone; and it is no accident, I think, that so much of what we call original emerges from minds that could bear their own company. Here I must concede the obvious counterpoint: we are social animals, and prolonged isolation genuinely harms us, in body as much as mind. I do not dispute it. My argument is narrower and, I hope, more useful: that in a culture engineered for perpetual contact, where every idle moment is filled by a glowing screen, the capacity for solitude is not a symptom to be treated but a faculty to be protected, one we are quietly losing the very conditions to exercise.",
    questions: [
      {
        id: 1,
        question: "What is the central argument of the essay?",
        choices: [
          "Solitude and loneliness are the same thing.",
          "Human beings should avoid all social contact.",
          "Connection should always be prescribed as a cure.",
          "Chosen solitude is a valuable faculty to protect, distinct from painful loneliness.",
        ],
        correctIndex: 3,
        explanation: "\"the capacity for solitude is not a symptom to be treated but a faculty to be protected.\"",
      },
      {
        id: 2,
        question: "How does the speaker distinguish loneliness from solitude?",
        choices: [
          "Loneliness is a painful felt deficit; solitude is chosen and cultivated.",
          "Loneliness is chosen; solitude is imposed.",
          "They are identical in every respect.",
          "Solitude is always harmful.",
        ],
        correctIndex: 0,
        explanation: "\"Loneliness is indeed painful, a felt deficit... solitude, chosen and cultivated, is something else entirely.\"",
      },
      {
        id: 3,
        question: "What counterpoint does the speaker concede?",
        choices: [
          "That solitude produces nothing original.",
          "That we are social animals and prolonged isolation genuinely harms us.",
          "That Montaigne disliked his tower.",
          "That screens improve solitude.",
        ],
        correctIndex: 1,
        explanation: "\"we are social animals, and prolonged isolation genuinely harms us, in body as much as mind. I do not dispute it.\"",
      },
    ],
  },
  {
    id: 207,
    level: 'C2',
    topic: "Economics",
    title: "The Economics of Attention",
    transcript:
      "When a service is offered to us free of charge, we are inclined to feel we have got something for nothing. The economics of attention should disabuse us of that comfort. Herbert Simon observed, as long ago as nineteen seventy-one, that a wealth of information creates a poverty of attention; where information is abundant, the truly scarce resource is the human capacity to attend. Follow that thought and the business model of much of the modern internet comes into focus. The product being sold is not the service you enjoy but your attention, harvested and auctioned to advertisers. Now, one might respond, fairly, that this is merely the old bargain of commercial television in a new guise, and that consumers enter it with open eyes. There is something in that. But I would press the difference of degree until it becomes a difference in kind: television could not measure your every glance, adapt to your weaknesses in real time, and optimise relentlessly against your self-control. When the scarce resource is attention, and vast engineering effort is directed at capturing it, the polite word \"free\" conceals a transaction whose true price is levied on the one thing we cannot manufacture more of.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main point?",
        choices: [
          "Free online services genuinely cost the user nothing.",
          "Attention is an unlimited resource.",
          "In the attention economy, \"free\" services extract our scarce attention as the real price.",
          "Commercial television and the internet are identical.",
        ],
        correctIndex: 2,
        explanation: "\"the polite word 'free' conceals a transaction whose true price is levied on the one thing we cannot manufacture more of.\"",
      },
      {
        id: 2,
        question: "What did Herbert Simon observe in 1971?",
        choices: [
          "That information is always scarce.",
          "That television would decline.",
          "That advertising is harmless.",
          "That a wealth of information creates a poverty of attention.",
        ],
        correctIndex: 3,
        explanation: "\"a wealth of information creates a poverty of attention.\"",
      },
      {
        id: 3,
        question: "How does the speaker answer the \"it's just like TV\" objection?",
        choices: [
          "By arguing the internet's real-time measurement makes it a difference in kind, not just degree.",
          "By fully agreeing that the two are the same.",
          "By denying that television carried advertising.",
          "By claiming attention is not scarce.",
        ],
        correctIndex: 0,
        explanation: "\"I would press the difference of degree until it becomes a difference in kind.\"",
      },
    ],
  },
  {
    id: 208,
    level: 'C2',
    topic: "Technology",
    title: "A Panel on Artificial Creativity",
    transcript:
      "When a machine produces a passable sonnet or a striking image, the debate reliably splits into two camps. One insists this is genuine creativity; the other, that it is mere recombination, statistics dressed as art. I find both positions too hasty, because both assume we already possess a settled account of what human creativity is, and we do not. The sceptic says the machine only remixes what it was trained on. True enough, but I would ask, uncomfortably, how confident we are that human creativity is anything grander. Much of what we prize as original turns out, on inspection, to be recombination too, ingenious, yes, but drawing constantly on what came before. So the machine does not so much answer the question of creativity as expose how thin our theory of it has always been. My own view, offered tentatively, is that creativity was never a property residing in the maker alone. It is a judgement conferred by a community that finds a work valuable and surprising. On that account the interesting question is not whether the machine is creative, but whether, and why, we choose to receive its output as if it were.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's own view of machine creativity?",
        choices: [
          "Machines are definitely creative in the same way humans are.",
          "Creativity is a judgement conferred by a community, so the real question is how we choose to receive machine output.",
          "Machine output is worthless statistical noise.",
          "Only human makers can ever be creative.",
        ],
        correctIndex: 1,
        explanation: "\"creativity was never a property residing in the maker alone. It is a judgement conferred by a community.\"",
      },
      {
        id: 2,
        question: "Why does the speaker call both familiar camps \"too hasty\"?",
        choices: [
          "Because machines cannot make sonnets.",
          "Because community judgement is irrelevant.",
          "Because both assume a settled account of human creativity that we do not actually possess.",
          "Because recombination is impossible.",
        ],
        correctIndex: 2,
        explanation: "\"both assume we already possess a settled account of what human creativity is, and we do not.\"",
      },
      {
        id: 3,
        question: "How does the speaker respond to the sceptic's \"mere recombination\" claim?",
        choices: [
          "By denying machines recombine anything.",
          "By agreeing the debate is settled.",
          "By insisting community plays no role.",
          "By questioning how confident we are that human creativity is anything grander than recombination.",
        ],
        correctIndex: 3,
        explanation: "\"how confident we are that human creativity is anything grander... Much of what we prize as original turns out... to be recombination too.\"",
      },
    ],
  },
  {
    id: 209,
    level: 'C2',
    topic: "History",
    title: "Who Writes History? On Historiography",
    transcript:
      "History, we are fond of saying, is written by the victors. It is a serviceable slogan, and like most slogans it is half true and therefore doubly misleading. The victors certainly enjoy advantages: their records survive, their monuments stand, their version is taught. Grant all of that. But the slogan tempts us toward a lazy cynicism in which history becomes nothing but propaganda, every account merely the interested story of the powerful. Against that, I would enter a firm reservation. For the historian's craft exists precisely to interrogate the victors' record, to read it against the grain, to recover the silenced through tax rolls, court records, archaeology, the very documents the powerful left carelessly behind. The subaltern historians of South Asia built a whole method on exactly this. So the honest formulation is neither that history is objective truth, a naivety no serious scholar holds, nor that it is pure fabrication, which would make the discipline pointless. It is that history is an argument, disciplined by evidence, forever revisable, and that its integrity lies not in any final verdict but in the rigour with which competing accounts are tested against a record that, mercifully, always exceeds the intentions of those who made it.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's considered view of history?",
        choices: [
          "History is an evidence-disciplined, revisable argument, neither pure truth nor pure fabrication.",
          "History is objective, final truth.",
          "History is nothing but the propaganda of the powerful.",
          "History cannot be studied at all.",
        ],
        correctIndex: 0,
        explanation: "\"history is an argument, disciplined by evidence, forever revisable.\"",
      },
      {
        id: 2,
        question: "Why does the speaker call \"history is written by the victors\" misleading?",
        choices: [
          "Because victors never keep records.",
          "Because it tempts us toward a lazy cynicism that reduces all history to propaganda.",
          "Because losers always write history.",
          "Because it is entirely false.",
        ],
        correctIndex: 1,
        explanation: "\"the slogan tempts us toward a lazy cynicism in which history becomes nothing but propaganda.\"",
      },
      {
        id: 3,
        question: "Which tradition is cited for reading the record \"against the grain\"?",
        choices: [
          "The Romantics",
          "The behavioural economists",
          "The subaltern historians of South Asia",
          "The block-universe physicists",
        ],
        correctIndex: 2,
        explanation: "\"The subaltern historians of South Asia built a whole method on exactly this.\"",
      },
    ],
  },
  {
    id: 210,
    level: 'C2',
    topic: "Aesthetics",
    title: "The Aesthetics of Ruins",
    transcript:
      "Why do we find ruins beautiful? A crumbling abbey, a broken column half-swallowed by grass, these move us in ways an intact building rarely does, and the puzzle is worth pausing over. The eighteenth century had a ready answer in the picturesque: ruins please because they soften geometry with irregularity and remind us, agreeably, of nature reclaiming human works. There is truth in that, but I suspect it flatters us. For notice what a ruin actually is, the wreckage of someone's labour, ambition, and, often, catastrophe, aestheticised safely by the passage of time. Rose Macaulay wrote acutely of this \"pleasure of ruins\", and the phrase should give us pause. The pleasure is real, but it is purchased at a certain distance, the distance that lets us admire as scenery what was, to those who lived it, loss. Here is my pivot: I do not therefore condemn the feeling as mere callousness, for it also contains something valuable, a meditation on transience, a memento mori in stone. The aesthetics of ruins, properly understood, is neither innocent nostalgia nor guilty voyeurism, but the difficult art of holding beauty and catastrophe in a single, unresolved gaze.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's final view of our pleasure in ruins?",
        choices: [
          "It is simple, innocent nostalgia.",
          "It is pure callous voyeurism to be condemned.",
          "It is merely about geometry and irregularity.",
          "It is the difficult art of holding beauty and catastrophe together in one gaze.",
        ],
        correctIndex: 3,
        explanation: "\"neither innocent nostalgia nor guilty voyeurism, but the difficult art of holding beauty and catastrophe in a single, unresolved gaze.\"",
      },
      {
        id: 2,
        question: "How does the speaker treat the eighteenth-century \"picturesque\" explanation?",
        choices: [
          "Grants it some truth but suspects it flatters us.",
          "Accepts it as the whole truth.",
          "Rejects it as entirely false.",
          "Ignores it.",
        ],
        correctIndex: 0,
        explanation: "\"There is truth in that, but I suspect it flatters us.\"",
      },
      {
        id: 3,
        question: "Who wrote of the \"pleasure of ruins\"?",
        choices: [
          "Montaigne",
          "Rose Macaulay",
          "Herbert Simon",
          "George Lakoff",
        ],
        correctIndex: 1,
        explanation: "\"Rose Macaulay wrote acutely of this 'pleasure of ruins'.\"",
      },
    ],
  },
  {
    id: 211,
    level: 'C2',
    topic: "Culture",
    title: "Cultural Heritage versus Development",
    transcript:
      "Whenever a motorway is to be widened or a dam raised, and an ancient site lies in its path, the conflict is framed as heritage against progress, the dead past obstructing the living future. I want to question that framing itself, for it stacks the deck before the argument begins. Cast as nostalgia versus need, heritage will usually lose, and perhaps sometimes it should; I am not a preservationist who believes every old stone sacrosanct against every human requirement. That would be a kind of idolatry. But notice the sleight of hand in the word \"progress\". It presumes we already know that the new road serves the future better than the standing monument, when this is exactly what is in dispute. Heritage is not the past clinging on; it is a resource the future will want and cannot remake, for a demolished temple, unlike a delayed bypass, is gone irreversibly. So my position is not that heritage must always prevail, but that the asymmetry of loss should reframe the calculation. Reversible costs and irreversible ones do not belong on the same scale, and a civilisation that forgets the difference is not advancing but merely, expensively, forgetting.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's central position?",
        choices: [
          "Heritage must always defeat development.",
          "Every old stone is sacrosanct.",
          "The irreversibility of heritage loss should reframe the calculation, not that heritage always wins.",
          "Progress should always take priority.",
        ],
        correctIndex: 2,
        explanation: "\"my position is not that heritage must always prevail, but that the asymmetry of loss should reframe the calculation.\"",
      },
      {
        id: 2,
        question: "What \"sleight of hand\" does the speaker identify in the word \"progress\"?",
        choices: [
          "That progress is always impossible.",
          "That progress means only motorways.",
          "That heritage is worthless.",
          "That it presumes the new road serves the future better, which is exactly what is disputed.",
        ],
        correctIndex: 3,
        explanation: "\"It presumes we already know that the new road serves the future better than the standing monument, when this is exactly what is in dispute.\"",
      },
      {
        id: 3,
        question: "Why does the speaker say reversible and irreversible costs \"do not belong on the same scale\"?",
        choices: [
          "Because a delayed bypass can be built later, but a demolished temple is gone forever.",
          "Because heritage has no economic value.",
          "Because progress is an illusion.",
          "Because motorways are never needed.",
        ],
        correctIndex: 0,
        explanation: "\"a demolished temple, unlike a delayed bypass, is gone irreversibly.\"",
      },
    ],
  },
  {
    id: 212,
    level: 'C2',
    topic: "Language",
    title: "Translation and the Untranslatable",
    transcript:
      "There is a romantic notion, much cherished, that certain words are simply untranslatable, that Portuguese saudade or German Sehnsucht name feelings no English phrase can reach, and that something dies in every crossing between languages. It is a seductive idea, and I want both to honour and to puncture it. The honouring is easy: no single English word maps onto saudade, and a translator who pretends otherwise is a fool or a liar. So far the romantics are right. But here I must pivot, for from this true observation a false conclusion is often drawn, that translation is therefore a kind of failure, a betrayal, traduttore, traditore. This I reject. That no word matches saudade does not mean the feeling is inexpressible in English; it means it must be expressed differently, unpacked across a phrase, a sentence, a paragraph, rather than compressed into a lexical atom. Translation does not transport a fixed meaning across a gap; it rebuilds it in new materials. And the so-called untranslatable word is not a wall but an invitation, evidence not that languages are prisons but that each has cut the continuum of human experience along its own particular, and revisable, joints.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main claim about \"untranslatable\" words?",
        choices: [
          "They prove translation is always a betrayal.",
          "They show meaning must be rebuilt differently, not that it is inexpressible.",
          "They mean languages are prisons.",
          "They can each be matched by a single English word.",
        ],
        correctIndex: 1,
        explanation: "\"it means it must be expressed differently, unpacked across a phrase... Translation does not transport a fixed meaning across a gap; it rebuilds it in new materials.\"",
      },
      {
        id: 2,
        question: "What does the speaker concede to the \"romantics\"?",
        choices: [
          "That translation is impossible.",
          "That feelings cannot be expressed at all.",
          "That no single English word maps onto saudade.",
          "That languages are prisons.",
        ],
        correctIndex: 2,
        explanation: "\"no single English word maps onto saudade, and a translator who pretends otherwise is a fool or a liar.\"",
      },
      {
        id: 3,
        question: "The speaker rejects which conclusion drawn from untranslatability?",
        choices: [
          "That saudade is a real feeling.",
          "That languages differ from one another.",
          "That words can be unpacked in phrases.",
          "That translation is therefore a kind of failure or betrayal.",
        ],
        correctIndex: 3,
        explanation: "\"a false conclusion is often drawn, that translation is therefore a kind of failure, a betrayal... This I reject.\"",
      },
    ],
  },
  {
    id: 213,
    level: 'C2',
    topic: "Psychology",
    title: "A Radio Essay on Nostalgia",
    transcript:
      "Nostalgia has long carried a whiff of disrepute. Coined in the seventeenth century by a Swiss physician, Johannes Hofer, the word originally named a medical affliction, a soldier's morbid longing for home thought serious enough to kill. Even today we use it half-dismissively, as sentimentality, an indulgent softening of the past. I want to rehabilitate it, though not naively. The dismissive view has a genuine point: nostalgia does gild memory, editing out the boredom and the hardship, and when it hardens into politics, a longing to restore some imagined golden age, it can turn actively poisonous. I concede that fully. But recent psychology tells a more interesting story. Constantine Sedikides and colleagues find that nostalgia, far from being mere escapism, tends to strengthen our sense of meaning and social connection, a resource we reach for precisely when the present feels unmoored. Here, then, is the distinction I want to draw. The danger lies not in nostalgia itself, which is a natural and often steadying emotion, but in its weaponisation, in mistaking a private consolation for a public programme. To feel the pull of the past is human; to legislate from it is folly.",
    questions: [
      {
        id: 1,
        question: "What distinction does the speaker draw about nostalgia?",
        choices: [
          "Between nostalgia as a steadying private emotion and its dangerous weaponisation into politics.",
          "Between old and young people's nostalgia.",
          "Between Swiss and English nostalgia.",
          "Between memory and imagination.",
        ],
        correctIndex: 0,
        explanation: "\"The danger lies not in nostalgia itself... but in its weaponisation, in mistaking a private consolation for a public programme.\"",
      },
      {
        id: 2,
        question: "Who coined the word \"nostalgia\" and in what sense?",
        choices: [
          "Constantine Sedikides, as a social benefit.",
          "Johannes Hofer, a Swiss physician, as a medical affliction.",
          "Rose Macaulay, as an aesthetic pleasure.",
          "Herbert Simon, as an economic term.",
        ],
        correctIndex: 1,
        explanation: "\"Coined in the seventeenth century by a Swiss physician, Johannes Hofer, the word originally named a medical affliction.\"",
      },
      {
        id: 3,
        question: "What do Sedikides and colleagues find about nostalgia?",
        choices: [
          "That it is pure escapism with no benefit.",
          "That it always leads to dangerous politics.",
          "That it tends to strengthen meaning and social connection.",
          "That it kills soldiers.",
        ],
        correctIndex: 2,
        explanation: "\"nostalgia... tends to strengthen our sense of meaning and social connection.\"",
      },
    ],
  },
  {
    id: 214,
    level: 'C2',
    topic: "Science",
    title: "The Science of Risk Perception",
    transcript:
      "We like to think of ourselves as rational assessors of danger, yet our fears map poorly onto the actual statistics of harm. We dread the shark and the plane crash, while stepping calmly into the far deadlier car, or lighting the far deadlier cigarette. It is tempting to conclude simply that people are bad at risk, and to leave it there, as a lament about public ignorance. I think that conclusion is both smug and wrong. The psychologist Paul Slovic showed that our sense of risk is not a failed attempt at arithmetic but a rich, if imperfect, judgement responsive to factors the raw numbers omit: whether a hazard is voluntary or imposed, familiar or dreaded, controllable or not. A death in one's own hands on the motorway feels different from one delivered by a stranger's technology, and that difference is not mere confusion; it encodes real values about autonomy and consent. So the pivot is this. The expert who dismisses public fear as innumeracy misunderstands it, and, worse, courts disaster, for a risk communication that ignores why people feel as they do will persuade no one. The task is not to correct the public's feelings but to understand what they are actually measuring.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main argument?",
        choices: [
          "People are simply bad at assessing risk.",
          "Statistics are the only valid measure of risk.",
          "Experts always communicate risk well.",
          "Public risk perception encodes real values and should be understood, not dismissed as innumeracy.",
        ],
        correctIndex: 3,
        explanation: "\"The task is not to correct the public's feelings but to understand what they are actually measuring.\"",
      },
      {
        id: 2,
        question: "What did Paul Slovic show about our sense of risk?",
        choices: [
          "That it responds to factors like whether a hazard is voluntary, familiar, or controllable.",
          "That it is a failed attempt at arithmetic.",
          "That it perfectly matches the statistics.",
          "That fear is always irrational.",
        ],
        correctIndex: 0,
        explanation: "\"a rich, if imperfect, judgement responsive to factors the raw numbers omit: whether a hazard is voluntary or imposed, familiar or dreaded, controllable or not.\"",
      },
      {
        id: 3,
        question: "Why does the speaker say the dismissive expert \"courts disaster\"?",
        choices: [
          "Because experts are always wrong about numbers.",
          "Because risk communication that ignores why people feel as they do will persuade no one.",
          "Because sharks are genuinely dangerous.",
          "Because the public is innumerate.",
        ],
        correctIndex: 1,
        explanation: "\"a risk communication that ignores why people feel as they do will persuade no one.\"",
      },
    ],
  },
  {
    id: 215,
    level: 'C2',
    topic: "Sociology",
    title: "The Sociology of Taste",
    transcript:
      "We experience our tastes, our love of a certain music, a certain food, a certain way of furnishing a room, as intimately, spontaneously our own. Sociology delivers an unwelcome message: these preferences are far less personal than they feel. Pierre Bourdieu, in his study Distinction, argued that taste functions as a marker of social class, a way, largely unconscious, of signalling and reproducing one's position. The appreciation of difficult art, of dry wine over sweet, of understatement over display, correlates less with any intrinsic superiority than with an upbringing that made such preferences available. Now, I must guard against the cynical overstatement this invites, the claim that taste is nothing but class in disguise, mere snobbery all the way down. That goes too far; genuine pleasure and real discernment are not illusions, and people do cross the lines their origins drew for them. But the uncomfortable core survives the qualification. When we look down on another's taste as vulgar, we are seldom making the neutral aesthetic judgement we imagine; we are, more often than we care to admit, policing a boundary, and calling our own position nature when it is in fact inheritance.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's main claim about taste?",
        choices: [
          "Taste is entirely personal and spontaneous.",
          "Taste is nothing but class in disguise, all the way down.",
          "Taste largely functions as a marker of social class, though not reducible to snobbery alone.",
          "Taste has no social dimension.",
        ],
        correctIndex: 2,
        explanation: "\"taste functions as a marker of social class... the uncomfortable core survives the qualification.\"",
      },
      {
        id: 2,
        question: "In which work did Bourdieu make this argument?",
        choices: [
          "Metaphors We Live By",
          "The Pleasure of Ruins",
          "The Crowd",
          "Distinction",
        ],
        correctIndex: 3,
        explanation: "\"Pierre Bourdieu, in his study Distinction, argued that taste functions as a marker of social class.\"",
      },
      {
        id: 3,
        question: "What \"cynical overstatement\" does the speaker guard against?",
        choices: [
          "The claim that taste is nothing but class in disguise, mere snobbery all the way down.",
          "That taste is entirely inherited.",
          "That people never cross class lines.",
          "That discernment is real.",
        ],
        correctIndex: 0,
        explanation: "\"the claim that taste is nothing but class in disguise, mere snobbery all the way down. That goes too far.\"",
      },
    ],
  },
  {
    id: 216,
    level: 'C2',
    topic: "Music",
    title: "Silence in Music",
    transcript:
      "We tend to define music as organised sound, and to treat silence as its mere absence, the blank between the notes. I want to argue that this gets the relationship precisely wrong. Silence is not the negation of music but one of its materials, as load-bearing as any pitch. Consider the rest before a resolution, the held breath a great performer imposes before the final chord; the meaning lives in that pause as much as in what surrounds it. John Cage pressed this to its limit in nineteen fifty-two with four minutes and thirty-three seconds of nominal silence, a piece often mocked as a hoax. But the mockery misses the point, which was never that nothing happens; it was that no such thing as silence exists, that the piece reframes the coughs and the traffic as the composition. Now, I would not go so far as some admirers and dissolve the distinction between music and noise entirely; that overreach empties the very concept it means to celebrate. My claim is more disciplined. Silence in music is not empty but shaped, and to hear it as shaped, to attend to what is withheld, is to understand that music was never only about sound at all.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's central argument?",
        choices: [
          "Silence is merely the absence of music.",
          "Silence is a load-bearing material of music, shaped rather than empty.",
          "Music and noise are entirely the same thing.",
          "Cage's piece was a hoax.",
        ],
        correctIndex: 1,
        explanation: "\"Silence is not the negation of music but one of its materials, as load-bearing as any pitch.\"",
      },
      {
        id: 2,
        question: "According to the speaker, what was the real point of Cage's 4'33\"?",
        choices: [
          "That nothing happens during the piece.",
          "That music should have no notes.",
          "That no such thing as silence exists, reframing ambient sound as the composition.",
          "That the audience should stay silent.",
        ],
        correctIndex: 2,
        explanation: "\"it was that no such thing as silence exists, that the piece reframes the coughs and the traffic as the composition.\"",
      },
      {
        id: 3,
        question: "Which \"overreach\" does the speaker refuse?",
        choices: [
          "Treating silence as shaped.",
          "Admiring Cage's work.",
          "Attending to what is withheld.",
          "Dissolving the distinction between music and noise entirely.",
        ],
        correctIndex: 3,
        explanation: "\"I would not go so far as some admirers and dissolve the distinction between music and noise entirely; that overreach empties the very concept.\"",
      },
    ],
  },
  {
    id: 217,
    level: 'C2',
    topic: "Philosophy",
    title: "A Lecture on Moral Luck",
    transcript:
      "Consider two equally careless drivers. Both glance at their phones for the same instant; but one road happens to be empty, while into the other steps a child. The first driver earns a moment's fright; the second, a lifetime of guilt and perhaps a prison cell. They did the same thing. So on what grounds do we judge them so differently? This is the problem of moral luck, sharpened by Bernard Williams and Thomas Nagel in the nineteen seventies, and it cuts deeper than it first appears. Our ordinary morality insists we are responsible only for what lies within our control, yet in practice we assign blame according to outcomes that luck, not the agent, decides. One might try to dissolve the puzzle by saying only the intention truly matters, both drivers are equally guilty, and the child's death is legally but not morally relevant. Clean, but I do not think we can honestly live inside that verdict. The pivot I want to offer is uncomfortable: moral luck is not a paradox to be solved but a permanent tension we must inhabit, evidence that our moral lives are lived on terrain we do not, and cannot, fully control.",
    questions: [
      {
        id: 1,
        question: "What is the speaker's conclusion about moral luck?",
        choices: [
          "It is a permanent tension we must inhabit, not a puzzle to be dissolved.",
          "It is a paradox that can be neatly solved by focusing on intention.",
          "Only outcomes matter, never intentions.",
          "The two drivers are legally identical and that settles it.",
        ],
        correctIndex: 0,
        explanation: "\"moral luck is not a paradox to be solved but a permanent tension we must inhabit.\"",
      },
      {
        id: 2,
        question: "Who sharpened the problem of moral luck in the 1970s?",
        choices: [
          "Paul Slovic and Herbert Simon",
          "Bernard Williams and Thomas Nagel",
          "Lakoff and Johnson",
          "Kahneman and Tversky",
        ],
        correctIndex: 1,
        explanation: "\"sharpened by Bernard Williams and Thomas Nagel in the nineteen seventies.\"",
      },
      {
        id: 3,
        question: "How does the speaker treat the \"only intention matters\" solution?",
        choices: [
          "Endorses it fully as the correct answer.",
          "Ignores it entirely.",
          "Calls it clean but says we cannot honestly live inside that verdict.",
          "Says it proves the drivers are guilty of different acts.",
        ],
        correctIndex: 2,
        explanation: "\"Clean, but I do not think we can honestly live inside that verdict.\"",
      },
    ],
  },
];
