export type PathNodeType = 'story' | 'plant' | 'skill' | 'quiz' | 'demo' | 'harvest';

export interface PathNode {
  id: string;
  type: PathNodeType;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  xp: number;
  route: string;
  accent: 'leaf' | 'sun' | 'berry' | 'sky' | 'clay';
  icon: 'seed' | 'tomato' | 'pot' | 'mint' | 'quiz' | 'growth' | 'kale' | 'plum' | 'apple' | 'basket';
}

export interface LessonCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  nodeId: string;
  guidePlantId?: string;
  kicker: string;
  intro: string;
  notes: Array<{
    title: string;
    body: string;
  }>;
  check: LessonCheck;
  finishMessage: string;
}

export const learningPath: PathNode[] = [
  {
    id: 'intro',
    type: 'story',
    title: 'Start where you are',
    shortTitle: 'Start here',
    description: 'Meet Grow Gnome and learn the three things every plant needs.',
    duration: '2 min',
    xp: 10,
    route: '/lesson/intro',
    accent: 'sun',
    icon: 'seed'
  },
  {
    id: 'tomato',
    type: 'plant',
    title: 'Tomato: the confident starter',
    shortTitle: 'Tomato',
    description: 'Sun, steady water and a pot with drainage. Your first win is close.',
    duration: '4 min',
    xp: 20,
    route: '/lesson/tomato',
    accent: 'clay',
    icon: 'tomato'
  },
  {
    id: 'small-space',
    type: 'skill',
    title: 'Small space, big harvest',
    shortTitle: 'Small space',
    description: 'Find the brightest corner and choose a crop that fits it.',
    duration: '4 min',
    xp: 20,
    route: '/lesson/small-space',
    accent: 'sky',
    icon: 'pot'
  },
  {
    id: 'mint',
    type: 'plant',
    title: 'Mint: the generous herb',
    shortTitle: 'Mint',
    description: 'An easy herb with one important rule: give it its own pot.',
    duration: '3 min',
    xp: 15,
    route: '/lesson/mint',
    accent: 'leaf',
    icon: 'mint'
  },
  {
    id: 'quiz',
    type: 'quiz',
    title: "Grower's checkpoint",
    shortTitle: 'Checkpoint',
    description: 'Six quick questions. Score 4 or more to open the next stretch.',
    duration: '4 min',
    xp: 40,
    route: '/quiz',
    accent: 'berry',
    icon: 'quiz'
  },
  {
    id: 'growth',
    type: 'demo',
    title: 'From flower to fruit',
    shortTitle: 'Growth stages',
    description: 'Walk through a tomato’s life cycle in this simulated demo.',
    duration: '3 min',
    xp: 15,
    route: '/growth',
    accent: 'sun',
    icon: 'growth'
  },
  {
    id: 'kale',
    type: 'plant',
    title: 'Kale: cut and come again',
    shortTitle: 'Kale',
    description: 'A leafy crop that keeps giving when you harvest the outer leaves.',
    duration: '3 min',
    xp: 20,
    route: '/lesson/kale',
    accent: 'leaf',
    icon: 'kale'
  },
  {
    id: 'plum',
    type: 'plant',
    title: 'Plum: think in seasons',
    shortTitle: 'Plum',
    description: 'Fruit trees ask for patience, sunlight and a little planning.',
    duration: '4 min',
    xp: 25,
    route: '/lesson/plum',
    accent: 'berry',
    icon: 'plum'
  },
  {
    id: 'apple',
    type: 'plant',
    title: 'Apple: the long game',
    shortTitle: 'Apple',
    description: 'Why two varieties are often better than one, and when to wait.',
    duration: '4 min',
    xp: 30,
    route: '/lesson/apple',
    accent: 'clay',
    icon: 'apple'
  },
  {
    id: 'harvest',
    type: 'harvest',
    title: 'Harvest with confidence',
    shortTitle: 'Harvest',
    description: 'Know the signs, pick gently and keep the harvest coming.',
    duration: '3 min',
    xp: 25,
    route: '/lesson/harvest',
    accent: 'sun',
    icon: 'basket'
  }
];

export const lessonContent: Record<string, LessonContent> = {
  intro: {
    nodeId: 'intro',
    kicker: 'A gentle beginning',
    intro:
      'You do not need a farm to grow food. A doorstep, a balcony or a sunny courtyard can be enough to begin. Grow Gnome will help you choose a plant that fits the space you actually have.',
    notes: [
      {
        title: 'Light comes first',
        body: 'Watch your space for a day. Notice where the sun lands in the morning and afternoon. Most food plants want at least four to six hours of direct sun, while some leafy crops and herbs enjoy a little shade.'
      },
      {
        title: 'Roots need air',
        body: 'A container without drainage holes becomes a swimming pool, not a garden. Choose a pot with holes and empty the saucer after heavy rain.'
      },
      {
        title: 'A steady rhythm beats a big splash',
        body: 'Check the soil with your finger before watering. If it is dry a few centimetres down, water slowly at the base until it runs out of the pot. Then wait and check again.'
      }
    ],
    check: {
      question: 'What should you check before choosing a plant?',
      options: ['The colour of your pot', 'How much sun the space receives', 'Whether the plant has a nickname'],
      correctIndex: 1,
      explanation:
        'Sunlight is the first big clue. A sun-loving tomato will struggle in deep shade, while mint may prefer a little afternoon shelter.'
    },
    finishMessage: 'You have the three basics: light, drainage and a steady watering rhythm.'
  },
  tomato: {
    nodeId: 'tomato',
    guidePlantId: 'tomato',
    kicker: 'Your first container crop',
    intro:
      'A bush or cherry tomato is a friendly place to start. It grows quickly, shows you what it needs and gives you something delicious to pick.',
    notes: [
      {
        title: 'Choose a compact plant',
        body: 'Bush and cherry tomatoes are easier in pots than tall varieties that keep climbing. One healthy plant in a 12–15 litre pot is a good beginning.'
      },
      {
        title: 'Water the soil, not the leaves',
        body: 'Tomatoes like even moisture. Water slowly at the base in the morning. Wet leaves and soggy soil invite problems.'
      },
      {
        title: 'Feed when fruit begins',
        body: 'Once flowers turn into tiny green tomatoes, start a balanced liquid feed. Follow the label. More is not better.'
      }
    ],
    check: {
      question: 'Where should you aim the watering can?',
      options: ['Over the leaves', 'At the base of the plant', 'Onto the flowers'],
      correctIndex: 1,
      explanation:
        'Watering at the base keeps the leaves drier and gets moisture to the roots where it is needed.'
    },
    finishMessage: 'Tomato basics unlocked. The full guide has materials, planting steps and a care plan.'
  },
  'small-space': {
    nodeId: 'small-space',
    kicker: 'Make the most of what you have',
    intro:
      'Small gardens are real gardens. The trick is to match the crop to the light, the pot and the time you can give it.',
    notes: [
      {
        title: 'Think in layers',
        body: 'A tall stake can support beans or tomatoes, while a low pot of herbs sits at its feet. Just make sure the taller plants do not shade the smaller ones.'
      },
      {
        title: 'Deep pots hold more roots',
        body: 'Leafy crops can manage in shallower containers, but tomatoes, beans and dwarf fruit trees need depth. Bigger pots also dry out more slowly.'
      },
      {
        title: 'Move with the seasons',
        body: 'Pots are portable. Move delicate herbs out of pounding rain, or shift a container into afternoon shade during a heatwave.'
      }
    ],
    check: {
      question: 'Which is the safer choice for a very small, shady balcony?',
      options: ['A full-sun fruit tree', 'A shade-tolerant herb such as mint', 'A giant pumpkin'],
      correctIndex: 1,
      explanation:
        'Match the plant to the light you have. Mint can cope with morning sun and afternoon shade, making it a better small-space candidate.'
    },
    finishMessage: 'Small space does not mean small ambition. Choose the right plant for the light.'
  },
  mint: {
    nodeId: 'mint',
    guidePlantId: 'mint',
    kicker: 'The easy-going herb',
    intro:
      'Mint is generous, fragrant and hard to kill. It is also ambitious: underground runners will spread into neighbouring pots if you let them.',
    notes: [
      {
        title: 'One herb, one pot',
        body: 'Keep mint in its own container. That controls its spread and lets you move it into afternoon shade when the sun is fierce.'
      },
      {
        title: 'Pinch, pick, repeat',
        body: 'Harvest from the top and pinch out the growing tips. The plant responds by making side shoots and staying bushy.'
      }
    ],
    check: {
      question: 'Why is mint usually grown in its own pot?',
      options: ['It needs no water', 'It spreads quickly by runners', 'It only grows indoors'],
      correctIndex: 1,
      explanation:
        'Mint spreads underground. A separate pot keeps it from crowding out neighbouring plants.'
    },
    finishMessage: 'Mint rule remembered: give it room, keep it moist, and pick often.'
  },
  kale: {
    nodeId: 'kale',
    guidePlantId: 'kale',
    kicker: 'A patient leafy harvest',
    intro:
      'Kale is a cut-and-come-again crop. Instead of pulling the whole plant, you pick the outer leaves and leave the growing centre to carry on.',
    notes: [
      {
        title: 'Cooler is kinder',
        body: 'Kale prefers cooler weather and highland gardens. In hot areas, afternoon shade and steady water help leaves stay tender.'
      },
      {
        title: 'Net the butterflies',
        body: 'Small green caterpillars can appear quickly. A fine insect net over young plants is easier than chasing every caterpillar later.'
      }
    ],
    check: {
      question: 'Which leaves should you pick first?',
      options: ['The tiny centre leaves', 'The outer leaves', 'The roots'],
      correctIndex: 1,
      explanation:
        'Take the outer leaves first and leave the growing centre to produce the next harvest.'
    },
    finishMessage: 'You know the kale rhythm: outer leaves first, centre keeps growing.'
  },
  plum: {
    nodeId: 'plum',
    guidePlantId: 'plum',
    kicker: 'Think like a tree',
    intro:
      'A fruit tree is a longer relationship than a pot of herbs. The first years are about roots, shape and steady care. Fruit comes when the tree is ready.',
    notes: [
      {
        title: 'Cool winters matter',
        body: 'Plums need some winter chill to flower and fruit well. In warmer parts of Zambia, ask for a low-chill variety and take local nursery advice.'
      },
      {
        title: 'Mulch, but leave the trunk free',
        body: 'A ring of mulch keeps moisture in the soil. Keep it a hand-width away from the trunk so the bark can breathe and stay dry.'
      }
    ],
    check: {
      question: 'What is the safest way to mulch a young fruit tree?',
      options: ['Pile mulch against the trunk', 'Leave a clear gap around the trunk', 'Cover the whole tree'],
      correctIndex: 1,
      explanation:
        'Mulch should feed the soil around the tree, not smother the trunk. Leave a clear gap to protect the bark.'
    },
    finishMessage: 'You are thinking in seasons now. A tree is a long-term garden companion.'
  },
  apple: {
    nodeId: 'apple',
    guidePlantId: 'apple',
    kicker: 'Plan for pollination',
    intro:
      'Apples have a reputation for being tricky in warm climates. The right variety, a suitable partner tree and a cool highland garden can all make a difference.',
    notes: [
      {
        title: 'Often, two is better than one',
        body: 'Many apples need pollen from a different variety that flowers at the same time. Ask your nursery which pair works together.'
      },
      {
        title: 'Wait before you expect a crop',
        body: 'Young apple trees put energy into roots and branches. Removing early flowers can help a small tree establish before it carries fruit.'
      }
    ],
    check: {
      question: 'Why do many apple growers plant two varieties?',
      options: ['To make the tree taller', 'To improve cross-pollination', 'To stop the leaves falling'],
      correctIndex: 1,
      explanation:
        'Most apples set better fruit when a compatible second variety provides pollen at the same flowering time.'
    },
    finishMessage: 'Apple lesson complete. Ask local growers before buying: variety and chill hours matter.'
  },
  harvest: {
    nodeId: 'harvest',
    kicker: 'The reward, done gently',
    intro:
      'Harvesting is not just the end of the lesson. The way you pick affects the next round of growth, the health of the plant and the quality of what reaches your kitchen.',
    notes: [
      {
        title: 'Look, feel, then pick',
        body: 'Colour is only one clue. Check size, firmness and smell. For pods and leaves, choose the tender ones and leave the rest to size up.'
      },
      {
        title: 'Pick often',
        body: 'Beans, tomatoes and leafy greens respond to regular harvesting. Leaving overripe fruit or fat pods on the plant can slow new production.'
      },
      {
        title: 'Use a clean cut',
        body: 'A sharp pair of scissors or snips makes a clean cut and avoids tearing stems. Clean your tools between sick and healthy plants.'
      }
    ],
    check: {
      question: 'Why should you pick beans and tomatoes regularly?',
      options: ['To make the plant shorter', 'To encourage more flowers and fruit', 'To stop the roots growing'],
      correctIndex: 1,
      explanation:
        'Regular picking removes mature fruit and pods, which helps the plant keep flowering and setting more.'
    },
    finishMessage: 'You have reached the harvest. Keep observing, keep notes, and let the garden teach you the rest.'
  }
};

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'season',
    question: 'In many parts of Zambia, when is the most natural time to plant a young fruit tree?',
    options: ['At the start of the rains', 'In the middle of the driest month', 'During the coldest frost'],
    correctIndex: 0,
    explanation:
      'Planting at the start of the rains gives roots time to settle with natural moisture. Local timing still depends on your area and the nursery’s advice.'
  },
  {
    id: 'drainage',
    question: 'What must every plant pot have?',
    options: ['A painted lid', 'Drainage holes', 'A second pot inside it'],
    correctIndex: 1,
    explanation:
      'Drainage holes let excess water escape. Without them, roots can suffocate and rot.'
  },
  {
    id: 'mint',
    question: 'Which herb is best kept in a pot of its own?',
    options: ['Basil', 'Mint', 'Coriander'],
    correctIndex: 1,
    explanation:
      'Mint spreads by underground runners. Its own pot keeps it from taking over a bed or crowding other herbs.'
  },
  {
    id: 'tomato',
    question: 'A tomato plant starts forming small green fruit. What should you do next?',
    options: ['Stop watering completely', 'Start a balanced feed and keep water steady', 'Move it into deep shade'],
    correctIndex: 1,
    explanation:
      'Once fruit forms, tomatoes benefit from steady moisture and a balanced feed. Follow the product label.'
  },
  {
    id: 'apple',
    question: 'Why might you plant two different apple varieties near each other?',
    options: ['For cross-pollination', 'To make the fruit seedless', 'To keep insects away'],
    correctIndex: 0,
    explanation:
      'Many apples need pollen from a compatible variety that flowers at the same time. Ask a local nursery which pair suits your area.'
  },
  {
    id: 'watering',
    question: 'What is a simple way to check whether a container needs water?',
    options: ['Wait for the leaves to turn brown', 'Feel the soil a few centimetres below the surface', 'Water every day at noon'],
    correctIndex: 1,
    explanation:
      'A finger test is quick and reliable. If the soil is dry below the surface, water slowly at the base until it drains.'
  }
];

export const QUIZ_PASS_MARK = 4;
