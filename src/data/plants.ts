export type PlantCategory = 'Fruit tree' | 'Vegetable' | 'Herb';
export type PlantArtKind = 'tree' | 'tomato' | 'kale' | 'bean' | 'herb';
export type Difficulty = 'Easy' | 'Medium' | 'Patient';

export interface PlantSource {
  label: string;
  url: string;
}

export interface PlantStep {
  title: string;
  body: string;
}

export interface CareTip {
  title: string;
  body: string;
  kind: 'sun' | 'water' | 'soil' | 'prune' | 'watch' | 'container';
}

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  category: PlantCategory;
  tagline: string;
  summary: string;
  art: PlantArtKind;
  palette: {
    background: string;
    foliage: string;
    foliageLight: string;
    fruit: string;
    fruitLight: string;
    pot: string;
  };
  difficulty: Difficulty;
  sun: string;
  water: string;
  space: string;
  container: string;
  harvestTime: string;
  season: string;
  bestFor: string;
  materials: string[];
  steps: PlantStep[];
  care: CareTip[];
  harvestSigns: string[];
  tip: string;
  zambiaNote: string;
  sources: PlantSource[];
  needsHumanVerification: string[];
}

export const plants: Plant[] = [
  {
    id: 'plum',
    name: 'Plum',
    botanicalName: 'Prunus salicina',
    category: 'Fruit tree',
    tagline: 'A patient tree with a generous payoff.',
    summary:
      'Plums reward a sunny, sheltered spot and a little patience. Choose a low-chill variety for Zambia and keep young trees watered through their first dry seasons.',
    art: 'tree',
    palette: {
      background: '#f3e7db',
      foliage: '#39704f',
      foliageLight: '#76a55f',
      fruit: '#8f3f61',
      fruitLight: '#c87996',
      pot: '#a96845'
    },
    difficulty: 'Patient',
    sun: 'Full sun · 6–8 hours',
    water: 'Deep, regular watering',
    space: '3–4 m in open ground',
    container: 'Dwarf tree · 40–50 L',
    harvestTime: '2–3 years after planting',
    season: 'Ripens in the warm months',
    bestFor: 'Garden or large courtyard',
    materials: [
      'A low-chill plum tree from a local nursery',
      'A sunny, sheltered planting spot',
      'Compost and topsoil',
      'A sturdy stake and soft tree tie',
      'Dry mulch such as bark or straw',
      'A watering can or hose'
    ],
    steps: [
      {
        title: 'Choose a low-chill variety',
        body: 'Ask your nursery which plum varieties fruit well in your area. Plums need some cool winter weather, so low-chill varieties are the safer choice in warm parts of Zambia.'
      },
      {
        title: 'Plant at the start of the rains',
        body: 'Dig a hole about twice as wide as the root ball and just as deep. Mix compost with the soil you removed, but do not add strong fertiliser to the planting hole.'
      },
      {
        title: 'Set the tree at the right depth',
        body: 'The soil mark on the trunk should sit level with the ground. Backfill, firm gently and water deeply so the soil settles around the roots.'
      },
      {
        title: 'Stake and mulch',
        body: 'Tie the tree loosely to a stake so it can still move a little. Spread mulch in a ring around the tree, leaving a clear gap around the trunk.'
      },
      {
        title: 'Build a watering routine',
        body: 'Water deeply once or twice a week for the first two dry seasons. A slow soak is better than a light daily sprinkle.'
      }
    ],
    care: [
      {
        title: 'Water the roots, not the leaves',
        body: 'Young plums need consistent moisture while they establish. Water at the base in the morning and let the top layer of soil begin to dry between deep waterings.',
        kind: 'water'
      },
      {
        title: 'Prune in dry weather',
        body: 'Remove dead, crossing or crowded branches during the cool dry season. Clean cuts and dry weather help prevent disease.',
        kind: 'prune'
      },
      {
        title: 'Feed gently',
        body: 'Add a bucket of mature compost around the drip line at the start of the rains. Keep strong fertiliser away from the trunk.',
        kind: 'soil'
      },
      {
        title: 'Watch for pests and birds',
        body: 'Check new leaves for aphids and look out for fruit fly. A light net can protect ripening fruit from birds.',
        kind: 'watch'
      }
    ],
    harvestSigns: [
      'The fruit has reached its full colour.',
      'A gentle squeeze feels slightly soft.',
      'The fruit comes away from the branch with a small twist.',
      'Birds begin showing interest just before the fruit is ready.'
    ],
    tip: 'Plant a plum where you will see it every day. Young trees do better when small problems are noticed early.',
    zambiaNote:
      'Best suited to cooler highland gardens with a distinct cool season. Low-chill varieties and local nursery advice matter more than the variety name on a packet.',
    sources: [
      {
        label: 'RHS: Grow your own plums',
        url: 'https://www.rhs.org.uk/fruit/plums/grow-your-own'
      }
    ],
    needsHumanVerification: [
      'Which plum varieties are sold and proven in your nearest agro-dealer or nursery?',
      'Whether your area receives enough winter chill for reliable fruiting.',
      'Local fruiting months, which vary with variety and altitude.'
    ]
  },
  {
    id: 'peach',
    name: 'Peach',
    botanicalName: 'Prunus persica',
    category: 'Fruit tree',
    tagline: 'Sunshine in a fuzzy little package.',
    summary:
      'Peaches are self-fertile, which means one tree can fruit on its own. Dwarf varieties can live in a large container, but they still need sun, drainage and regular care.',
    art: 'tree',
    palette: {
      background: '#f9e4d7',
      foliage: '#477a4e',
      foliageLight: '#82ad62',
      fruit: '#d96f3f',
      fruitLight: '#f3a36f',
      pot: '#b66b47'
    },
    difficulty: 'Patient',
    sun: 'Full sun · 6–8 hours',
    water: 'Regular, steady watering',
    space: '3 m in open ground',
    container: 'Dwarf peach · 40–50 L',
    harvestTime: '2–3 years after planting',
    season: 'Ripens in the warm months',
    bestFor: 'Sheltered garden or patio',
    materials: [
      'A healthy peach tree, ideally a dwarf variety for a container',
      'A large pot with drainage holes or a sunny garden bed',
      'Compost and well-draining soil',
      'A stake and soft tie',
      'Mulch',
      'A net for birds, if needed'
    ],
    steps: [
      {
        title: 'Pick a sheltered sun trap',
        body: 'Peaches flower early and dislike cold, windy spots. Choose the sunniest, most sheltered position you can offer.'
      },
      {
        title: 'Plant into free-draining soil',
        body: 'If planting in a pot, use a mix of garden soil and compost and make sure excess water can escape. In the ground, improve the planting area with compost.'
      },
      {
        title: 'Keep the graft union above soil',
        body: 'Plant so the join between rootstock and fruiting variety stays clearly above the soil line. Water well after planting.'
      },
      {
        title: 'Mulch and stake',
        body: 'Mulch around the tree, keeping the trunk clear. Stake young trees loosely for the first year or two.'
      },
      {
        title: 'Thin fruit later',
        body: 'Once the tree is established and sets a heavy crop, remove some young fruit so branches are not overloaded.'
      }
    ],
    care: [
      {
        title: 'Give it the brightest spot',
        body: 'Six to eight hours of direct sun helps fruit ripen and reduces problems with wet foliage.',
        kind: 'sun'
      },
      {
        title: 'Water consistently',
        body: 'Avoid letting a container tree dry out completely and then flooding it. Check the top few centimetres of soil before watering.',
        kind: 'water'
      },
      {
        title: 'Watch for leaf curl',
        body: 'Peaches can develop distorted, reddish leaves in cool wet weather. Remove badly affected leaves and ask a local nursery about resistant varieties and timing.',
        kind: 'watch'
      },
      {
        title: 'Prune for open branches',
        body: 'A goblet-shaped frame lets light and air into the tree. Prune in dry weather and remove dead or crossing wood.',
        kind: 'prune'
      }
    ],
    harvestSigns: [
      'The background colour changes from green to yellow or cream.',
      'The fruit feels firm-ripe, not rock hard.',
      'The peach smells sweet near the stem.',
      'Fruit comes away easily when cupped and gently twisted.'
    ],
    tip: 'A peach in a pot is still a tree. Give the roots room, feed it each growing season, and plan to repot or root-prune when it fills the container.',
    zambiaNote:
      'Grown successfully in cooler highland areas. In hot lowland gardens, a peach may grow but fruit poorly without enough winter chill. Choose locally recommended low-chill trees.',
    sources: [
      {
        label: 'RHS: Grow your own peaches',
        url: 'https://www.rhs.org.uk/fruit/peaches/grow-your-own'
      }
    ],
    needsHumanVerification: [
      'Whether dwarf peach varieties are available locally.',
      'Peach leaf curl pressure in your area and the recommended prevention timing.',
      'The best planting month for your altitude and rainfall pattern.'
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    botanicalName: 'Malus domestica',
    category: 'Fruit tree',
    tagline: 'The long game, with crisp rewards.',
    summary:
      'Apples need patience, sunlight and usually a second variety nearby for pollination. In Zambia, high-altitude gardens and low-chill varieties offer the best chance of success.',
    art: 'tree',
    palette: {
      background: '#eaf0db',
      foliage: '#3f774d',
      foliageLight: '#83aa58',
      fruit: '#b9443f',
      fruitLight: '#e77d65',
      pot: '#96603f'
    },
    difficulty: 'Patient',
    sun: 'Full sun · 6–8 hours',
    water: 'Deep weekly watering',
    space: '3–4 m in open ground',
    container: 'Dwarf apple · 50–60 L',
    harvestTime: '3–4 years after planting',
    season: 'Late summer to autumn',
    bestFor: 'Cool highland garden',
    materials: [
      'Two compatible low-chill apple varieties for cross-pollination',
      'A sunny, sheltered spot',
      'Compost and topsoil',
      'Stakes and soft ties',
      'Mulch',
      'A local nursery contact for variety advice'
    ],
    steps: [
      {
        title: 'Plan for two varieties',
        body: 'Most apples need pollen from a different apple variety to set good fruit. Choose two that flower at the same time, or ask your nursery which partner variety works.'
      },
      {
        title: 'Plant at the start of the rains',
        body: 'Prepare a wide planting hole and mix compost into the removed soil. Keep the graft union above ground level.'
      },
      {
        title: 'Water in and mulch',
        body: 'Water deeply after planting. Add a ring of mulch around the tree, but leave the trunk exposed to the air.'
      },
      {
        title: 'Shape the young tree',
        body: 'Choose a clear trunk and a few well-spaced branches. Remove dead or crossing growth in dry weather.'
      },
      {
        title: 'Be patient with fruiting',
        body: 'Remove flowers in the first season or two if the tree is small. This helps roots and branches establish before carrying a crop.'
      }
    ],
    care: [
      {
        title: 'Protect the flowers',
        body: 'Apple flowers are vulnerable to strong wind and heavy rain. A sheltered position improves pollination and fruit set.',
        kind: 'sun'
      },
      {
        title: 'Water during dry spells',
        body: 'Deep watering is especially important in the first two years. Containers dry faster than garden soil, so check them more often.',
        kind: 'water'
      },
      {
        title: 'Feed with compost',
        body: 'Top-dress with mature compost in the growing season. Avoid pushing lots of high-nitrogen fertiliser, which encourages leaves over fruit.',
        kind: 'soil'
      },
      {
        title: 'Thin crowded fruit',
        body: 'If the tree sets far too many small apples, remove some so the remaining fruit can size up and branches are not strained.',
        kind: 'prune'
      }
    ],
    harvestSigns: [
      'The apple colours up and feels heavy for its size.',
      'A gentle lift of the fruit releases it from the spur.',
      'Seeds inside are dark brown rather than pale.',
      'The flavour is sweet and juicy rather than starchy.'
    ],
    tip: 'Ask a local grower which apple varieties actually fruit in your area. A healthy tree of the right variety beats an exotic name that never ripens.',
    zambiaNote:
      'Most reliable in cool, high-altitude areas. Apples need winter chill, so low-chill varieties such as Anna are often discussed for warmer climates. Treat catalogue claims as a starting point and ask local growers.',
    sources: [
      {
        label: 'Susan Home Care: Growing apples in Zambia',
        url: 'https://susanhomecare.com/how-to-grow-apples-in-zambia/'
      },
      {
        label: 'RHS: Grow your own apples',
        url: 'https://www.rhs.org.uk/fruit/apples/grow-your-own'
      }
    ],
    needsHumanVerification: [
      'Which low-chill apple varieties are available in Zambia and which pollinate each other.',
      'Whether your garden receives enough winter chill.',
      'Local harvest timing and storage advice.'
    ]
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    botanicalName: 'Punica granatum',
    category: 'Fruit tree',
    tagline: 'A sun-loving shrub with jewel-bright fruit.',
    summary:
      'Pomegranates enjoy heat and sun once established. They are compact enough for a large container and reward steady watering with glossy leaves and ruby-red fruit.',
    art: 'tree',
    palette: {
      background: '#f6e2d5',
      foliage: '#3e7448',
      foliageLight: '#89aa5c',
      fruit: '#b9343f',
      fruitLight: '#ed8079',
      pot: '#a45d3d'
    },
    difficulty: 'Medium',
    sun: 'Full sun · 6–8 hours',
    water: 'Deep soaks, then dry slightly',
    space: '2–3 m as a shrub',
    container: 'Dwarf variety · 30–40 L',
    harvestTime: '3–4 years after planting',
    season: 'Late summer to autumn',
    bestFor: 'Hot, sunny courtyard',
    materials: [
      'A healthy pomegranate plant or rooted cutting',
      'A large pot with drainage or a sunny garden bed',
      'Gritty, well-draining soil and compost',
      'Mulch',
      'A stake for a young standard',
      'Pruning snips'
    ],
    steps: [
      {
        title: 'Choose the hottest spot',
        body: 'Pomegranates fruit best with long, warm, sunny days. Give them the brightest position you have and shelter from cold wind.'
      },
      {
        title: 'Plant in well-draining soil',
        body: 'They dislike soggy roots. In a container, add grit or coarse sand to the mix; in the ground, plant on a slight mound if drainage is poor.'
      },
      {
        title: 'Water deeply after planting',
        body: 'Settle the soil around the roots with a slow, deep watering. Mulch after planting, keeping the stem clear.'
      },
      {
        title: 'Train a strong shape',
        body: 'Remove weak or crossing shoots while the plant is young. Pomegranates can be grown as a multi-stemmed shrub or a small tree.'
      },
      {
        title: 'Be steady with water',
        body: 'Once established, water deeply and let the topsoil dry a little. Avoid switching between drought and flooding, which can split fruit.'
      }
    ],
    care: [
      {
        title: 'Give it heat',
        body: 'A warm wall or patio that holds afternoon heat can help fruit ripen in cooler areas.',
        kind: 'sun'
      },
      {
        title: 'Water evenly',
        body: 'Deep, infrequent watering is better than frequent splashes. Containers need more attention in hot weather.',
        kind: 'water'
      },
      {
        title: 'Prune lightly',
        body: 'Remove dead wood and crowded stems in the dry season. Pomegranates flower on new growth, so avoid cutting everything back.',
        kind: 'prune'
      },
      {
        title: 'Watch fruit splitting',
        body: 'Split fruit often follows uneven watering or heavy rain after a dry spell. Keep moisture steadier as fruit swells.',
        kind: 'watch'
      }
    ],
    harvestSigns: [
      'The skin turns from green to deep red or bronze.',
      'The fruit feels heavy and sounds slightly metallic when tapped.',
      'The crown at the top looks tight and dry.',
      'Seeds inside are bright and juicy.'
    ],
    tip: 'Pomegranate juice stains. Harvest over a bowl and wear clothes you do not mind decorating.',
    zambiaNote:
      'A good fit for hot, sunny gardens with good drainage. It can tolerate dry spells once established but fruits better with steady deep watering.',
    sources: [
      {
        label: 'Raintree Nursery: Pomegranate growing guide',
        url: 'https://raintreenursery.com/pages/pomegranate-growing-guide'
      }
    ],
    needsHumanVerification: [
      'Which pomegranate varieties perform best in your region.',
      'Whether local rainfall causes fruit splitting.',
      'The typical flowering and harvest months in your area.'
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    botanicalName: 'Solanum lycopersicum',
    category: 'Vegetable',
    tagline: 'The confident container starter.',
    summary:
      'A bush or cherry tomato in a sunny pot is one of the most satisfying first crops. It needs steady water, support and feeding once fruit begins to form.',
    art: 'tomato',
    palette: {
      background: '#f7e3d1',
      foliage: '#3f7d46',
      foliageLight: '#7eaf5a',
      fruit: '#d94b3d',
      fruitLight: '#f28b67',
      pot: '#ac6848'
    },
    difficulty: 'Easy',
    sun: 'Full sun · 6–8 hours',
    water: 'Steady, regular watering',
    space: 'One plant per 12–15 L pot',
    container: 'Bush or cherry · 12–15 L',
    harvestTime: '60–90 days from transplant',
    season: 'Cool dry months or start of rains',
    bestFor: 'Sunny patio or doorstep',
    materials: [
      'A bush or cherry tomato seedling',
      'A 12–15 L pot with drainage holes',
      'Compost-rich potting mix',
      'A stake or small cage',
      'Mulch',
      'Tomato feed for when fruit forms'
    ],
    steps: [
      {
        title: 'Choose a compact variety',
        body: 'Bush and cherry types are easier in pots than tall indeterminate varieties. Ask for a variety suited to your area and the season.'
      },
      {
        title: 'Fill a pot with drainage',
        body: 'Use a clean pot with holes. Fill it with compost-rich potting mix, leaving a few centimetres below the rim for watering.'
      },
      {
        title: 'Plant deeper than the nursery pot',
        body: 'Tomatoes can form roots along the buried stem. Set the seedling slightly deeper than it was growing, then firm the soil and water gently.'
      },
      {
        title: 'Support early',
        body: 'Put the stake or cage in at planting time so you do not damage roots later. Tie the stem loosely as it grows.'
      },
      {
        title: 'Water at the base',
        body: 'Keep the soil evenly moist but not waterlogged. Water in the morning, aiming at the soil rather than the leaves.'
      }
    ],
    care: [
      {
        title: 'Keep the leaves dry',
        body: 'Water the soil, not the foliage. Good airflow and dry leaves reduce the chance of disease.',
        kind: 'water'
      },
      {
        title: 'Feed when flowers appear',
        body: 'Start a balanced liquid feed once the first flowers set fruit. Follow the label rather than guessing a stronger dose.',
        kind: 'soil'
      },
      {
        title: 'Mulch the surface',
        body: 'A layer of dry mulch helps keep moisture even and stops soil splashing onto lower leaves.',
        kind: 'container'
      },
      {
        title: 'Check under the leaves',
        body: 'Look for caterpillars, whitefly and dark spots. Remove pests by hand where possible and keep the area clear of fallen leaves.',
        kind: 'watch'
      }
    ],
    harvestSigns: [
      'The fruit is fully coloured and slightly soft.',
      'It comes away from the vine with a gentle twist.',
      'Cherry tomatoes are sweet and fragrant when ripe.',
      'Harvest regularly to encourage more fruit.'
    ],
    tip: 'A tomato in a small pot is thirsty, not naughty. Check the soil every morning and water before it wilts.',
    zambiaNote:
      'Tomatoes grow in many seasons, but heavy rain can spread disease. The cooler dry months are often kinder, especially in lowland gardens. Use a sheltered spot and avoid wetting leaves.',
    sources: [
      {
        label: 'RHS: Edible container idea with bush tomatoes',
        url: 'https://www.rhs.org.uk/advice/grow-your-own/containers/may-edible-container-idea'
      },
      {
        label: 'RHS: Grow your own tomatoes',
        url: 'https://www.rhs.org.uk/vegetables/tomatoes/grow-your-own'
      }
    ],
    needsHumanVerification: [
      'Which tomato varieties are recommended for your region and season.',
      'Local disease pressure, especially during the rains.',
      'Whether afternoon shade is needed in very hot lowland gardens.'
    ]
  },
  {
    id: 'kale',
    name: 'Kale',
    botanicalName: 'Brassica oleracea',
    category: 'Vegetable',
    tagline: 'Cut a little, grow a little more.',
    summary:
      'Kale is a generous leafy crop: pick the outer leaves and the plant keeps producing. A compact variety can thrive in a deep container with cool roots and regular water.',
    art: 'kale',
    palette: {
      background: '#e5ecdf',
      foliage: '#2f6247',
      foliageLight: '#6f9c61',
      fruit: '#8fb36a',
      fruitLight: '#c2d68e',
      pot: '#a56847'
    },
    difficulty: 'Easy',
    sun: 'Full sun to light shade · 4–6 hours',
    water: 'Keep soil consistently moist',
    space: '30 cm between plants',
    container: 'Compact variety · 15–20 L',
    harvestTime: '8–10 weeks to first leaves',
    season: 'Cooler months or highlands',
    bestFor: 'Shaded edge of a sunny garden',
    materials: [
      'Kale seedlings or seeds',
      'A deep 15–20 L pot or garden bed',
      'Compost-rich soil',
      'A light insect net or row cover',
      'Mulch',
      'A sharp knife or scissors'
    ],
    steps: [
      {
        title: 'Sow or plant at the right time',
        body: 'Kale prefers cooler weather. In warm areas, choose a spot with afternoon shade and avoid the hottest weeks.'
      },
      {
        title: 'Prepare a deep bed or pot',
        body: 'Kale roots need room. Fill a deep pot with compost-rich soil and make sure water can drain freely.'
      },
      {
        title: 'Plant with space to grow',
        body: 'Set compact plants about 30 cm apart. Bury the root ball at the same level it was growing and water in.'
      },
      {
        title: 'Cover young plants',
        body: 'A fine net keeps butterflies and moths from laying eggs on the leaves. Secure it so insects cannot slip underneath.'
      },
      {
        title: 'Mulch and water',
        body: 'Keep the soil cool and moist with mulch. Water in the morning and avoid long dry spells.'
      }
    ],
    care: [
      {
        title: 'Cool roots, happy leaves',
        body: 'Mulch helps keep roots cool. In hot weather, afternoon shade can stop leaves becoming tough and bitter.',
        kind: 'sun'
      },
      {
        title: 'Water consistently',
        body: 'Dry soil slows growth and makes leaves tough. Aim for even moisture rather than a daily soak.',
        kind: 'water'
      },
      {
        title: 'Feed lightly',
        body: 'A little compost or balanced liquid feed keeps leaves coming. Too much nitrogen can attract aphids.',
        kind: 'soil'
      },
      {
        title: 'Inspect for caterpillars',
        body: 'Check leaf undersides for small green caterpillars and eggs. Pick them off or use a net from the start.',
        kind: 'watch'
      }
    ],
    harvestSigns: [
      'Leaves are a good size and deep green.',
      'The centre of the plant still has small new leaves.',
      'Outer leaves snap cleanly from the stem.',
      'Avoid harvesting the growing tip until the plant is well established.'
    ],
    tip: 'Harvest the outside leaves first. The tiny leaves in the centre are the plant’s next shift.',
    zambiaNote:
      'Kale does best in cooler months and highland gardens. In hot areas, give it afternoon shade and keep water steady. A shade cloth can extend the growing season.',
    sources: [
      {
        label: 'RHS: Grow your own kale',
        url: 'https://www.rhs.org.uk/vegetables/kale/grow-your-own'
      }
    ],
    needsHumanVerification: [
      'Which kale varieties are available and perform well locally.',
      'The best sowing window in your rainfall zone.',
      'Common local caterpillar pressure and safe control options.'
    ]
  },
  {
    id: 'beans',
    name: 'Bush beans',
    botanicalName: 'Phaseolus vulgaris',
    category: 'Vegetable',
    tagline: 'Fast, friendly and full of pods.',
    summary:
      'Dwarf French beans are compact, quick and productive. Sow them directly where they will grow and pick pods often to keep the plants flowering.',
    art: 'bean',
    palette: {
      background: '#e8eedb',
      foliage: '#3e7a4b',
      foliageLight: '#80a95e',
      fruit: '#6e9b4c',
      fruitLight: '#b7cf7a',
      pot: '#a56443'
    },
    difficulty: 'Easy',
    sun: 'Full sun · 6 hours',
    water: 'Regular, not waterlogged',
    space: '20–25 cm between plants',
    container: 'Dwarf variety · 15–20 L',
    harvestTime: '50–70 days from sowing',
    season: 'Warm months with reliable water',
    bestFor: 'A sunny bed or deep pot',
    materials: [
      'Dwarf French bean seeds',
      'A deep pot or sunny garden bed',
      'Compost-rich, well-draining soil',
      'A short support or string line if needed',
      'Mulch',
      'A basket for picking'
    ],
    steps: [
      {
        title: 'Sow direct',
        body: 'Beans dislike root disturbance. Sow seeds directly into the final pot or bed, about 3 cm deep.'
      },
      {
        title: 'Space the plants',
        body: 'Sow two or three seeds per 15–20 L pot, or space plants 20–25 cm apart in a bed. Thin weak seedlings after they appear.'
      },
      {
        title: 'Water gently',
        body: 'Keep the soil moist while seeds germinate. Water gently so seeds are not washed out.'
      },
      {
        title: 'Give a little support',
        body: 'Dwarf beans usually stand on their own, but a short stick or string line can keep a heavy pot crop tidy.'
      },
      {
        title: 'Pick early and often',
        body: 'Start harvesting while pods are young and tender. Regular picking encourages more flowers and pods.'
      }
    ],
    care: [
      {
        title: 'Full sun for pods',
        body: 'Beans need warmth and light. A spot that receives at least six hours of sun gives the best pod set.',
        kind: 'sun'
      },
      {
        title: 'Avoid soggy soil',
        body: 'Keep soil moist but not waterlogged. Good drainage matters, especially in a pot during heavy rain.',
        kind: 'water'
      },
      {
        title: 'Mulch lightly',
        body: 'A thin mulch keeps moisture even and reduces soil splash. Keep it away from the stems.',
        kind: 'container'
      },
      {
        title: 'Watch for aphids',
        body: 'Check growing tips and leaf undersides. A strong jet of water can dislodge aphids before they build up.',
        kind: 'watch'
      }
    ],
    harvestSigns: [
      'Pods are young, smooth and snap easily.',
      'Seeds inside are still small and tender.',
      'Pick every few days during peak season.',
      'Older pods become stringy and tough.'
    ],
    tip: 'The more you pick, the more the plant gives. Do not leave fat pods on the bush unless you are saving seed.',
    zambiaNote:
      'A useful warm-season crop where water is reliable. In heavy rain, raise pots or plant on ridges so roots do not sit in water.',
    sources: [
      {
        label: 'RHS: Growing vegetables in containers',
        url: 'https://www.rhs.org.uk/vegetables/containers'
      }
    ],
    needsHumanVerification: [
      'The best local bean variety and sowing date.',
      'Whether bean fly or other local pests are a problem.',
      'Rainfall patterns that could waterlog a container crop.'
    ]
  },
  {
    id: 'mint',
    name: 'Mint',
    botanicalName: 'Mentha spicata',
    category: 'Herb',
    tagline: 'A generous herb that likes its own room.',
    summary:
      'Mint is one of the easiest herbs to grow, as long as you keep it in its own pot. It spreads by runners, so give it a home where it can be generous without taking over.',
    art: 'herb',
    palette: {
      background: '#e2efdf',
      foliage: '#3e7b4b',
      foliageLight: '#86b56b',
      fruit: '#7ba65d',
      fruitLight: '#c7df9a',
      pot: '#b36b48'
    },
    difficulty: 'Easy',
    sun: 'Morning sun · 3–5 hours',
    water: 'Keep lightly moist',
    space: 'One plant per 8–10 L pot',
    container: 'Mint · 8–10 L',
    harvestTime: '8–10 weeks to first harvest',
    season: 'Grows through the warm months',
    bestFor: 'A shady kitchen doorstep',
    materials: [
      'A mint plant or rooted cutting',
      'An 8–10 L pot with drainage',
      'Compost-rich potting mix',
      'A saucer or tray',
      'Mulch or compost for the surface',
      'Scissors for harvesting'
    ],
    steps: [
      {
        title: 'Keep mint in its own pot',
        body: 'Mint spreads quickly by underground runners. A separate pot stops it crowding out other herbs and makes it easy to move.'
      },
      {
        title: 'Choose a part-shade spot',
        body: 'Morning sun and afternoon shade suits mint in warm gardens. Too much harsh afternoon sun can scorch the leaves.'
      },
      {
        title: 'Plant at the same depth',
        body: 'Set the plant in compost-rich soil at the same level it was growing. Water gently until the soil settles.'
      },
      {
        title: 'Pinch the tips',
        body: 'Pinch out the top pair of leaves every few weeks. This keeps the plant bushy and gives you leaves for tea.'
      },
      {
        title: 'Divide when crowded',
        body: 'When roots fill the pot, lift and divide the plant into two or three sections and repot the healthiest pieces.'
      }
    ],
    care: [
      {
        title: 'Protect from baking sun',
        body: 'Mint prefers a little shelter. In hot areas, move pots where they receive morning light and afternoon shade.',
        kind: 'sun'
      },
      {
        title: 'Keep it lightly moist',
        body: 'Mint dislikes drying out completely. Check the surface every day or two and water before the leaves droop.',
        kind: 'water'
      },
      {
        title: 'Feed with compost',
        body: 'A little mature compost in spring is usually enough. Mint is not a heavy feeder.',
        kind: 'soil'
      },
      {
        title: 'Cut back after flowering',
        body: 'Trim spent flower stems to encourage fresh leaves and a tidier plant.',
        kind: 'prune'
      }
    ],
    harvestSigns: [
      'Pick leaves from the top and sides, leaving lower stems.',
      'Harvest before the plant flowers for the sweetest flavour.',
      'Use scissors to cut a stem just above a pair of leaves.',
      'Aim to take no more than one third of the plant at a time.'
    ],
    tip: 'A mint pot on the kitchen step earns its keep. Pick a few leaves whenever you pass and the plant will stay bushy.',
    zambiaNote:
      'Mint grows well in warm gardens with some shade and reliable water. In hot lowlands, afternoon shade and a saucer can make a big difference.',
    sources: [
      {
        label: 'RHS: Growing herbs',
        url: 'https://www.rhs.org.uk/herbs/growing'
      }
    ],
    needsHumanVerification: [
      'Which mint varieties are available locally.',
      'Whether rust or other leaf diseases are common in your area.',
      'How much afternoon shade is needed in your hottest months.'
    ]
  },
  {
    id: 'basil',
    name: 'Basil',
    botanicalName: 'Ocimum basilicum',
    category: 'Herb',
    tagline: 'A sunny herb with a summer perfume.',
    summary:
      'Basil loves warmth, sun and well-drained soil. Pick the tips often, keep water off the leaves, and it will reward you with fragrant leaves for the kitchen.',
    art: 'herb',
    palette: {
      background: '#e9efd9',
      foliage: '#3e7d4d',
      foliageLight: '#88b360',
      fruit: '#7aa34f',
      fruitLight: '#c6dc86',
      pot: '#b96f4a'
    },
    difficulty: 'Easy',
    sun: 'Full sun · 5–6 hours',
    water: 'Water in the morning',
    space: '20–25 cm apart',
    container: 'Basil · 5–8 L',
    harvestTime: '6–8 weeks to first harvest',
    season: 'Warm, sunny months',
    bestFor: 'Sunny windowsill or patio',
    materials: [
      'Basil seeds or a healthy seedling',
      'A 5–8 L pot with drainage',
      'Light, compost-rich potting mix',
      'A sunny, sheltered spot',
      'Scissors',
      'A small saucer for catching water'
    ],
    steps: [
      {
        title: 'Give basil warmth',
        body: 'Basil sulks in cold, wet soil. Plant it when the weather is warm and choose the sunniest, most sheltered spot you have.'
      },
      {
        title: 'Use free-draining soil',
        body: 'A light potting mix with compost suits basil. Make sure the pot drains freely and empty the saucer after rain.'
      },
      {
        title: 'Sow or plant shallowly',
        body: 'Sow seeds lightly on the surface and cover with a thin layer of soil, or plant a seedling at the same depth it was growing.'
      },
      {
        title: 'Water at the base',
        body: 'Keep the soil lightly moist. Water in the morning so leaves can dry before evening.'
      },
      {
        title: 'Pinch the growing tips',
        body: 'Pinch out the top two leaves once the plant has several pairs. This makes a bushier plant and delays flowering.'
      }
    ],
    care: [
      {
        title: 'Sun and warmth',
        body: 'Basil needs good light and warm air. A sunny windowsill or sheltered patio is ideal.',
        kind: 'sun'
      },
      {
        title: 'Avoid wet leaves',
        body: 'Water the soil, not the foliage. Good airflow helps prevent downy mildew.',
        kind: 'water'
      },
      {
        title: 'Harvest often',
        body: 'Remove flower buds as they appear to keep the plant producing leaves. Use the young tips in cooking.',
        kind: 'prune'
      },
      {
        title: 'Watch for mildew',
        body: 'Yellowing leaves with fuzzy grey patches can signal downy mildew. Remove affected leaves and improve airflow.',
        kind: 'watch'
      }
    ],
    harvestSigns: [
      'Pick from the top, just above a pair of leaves.',
      'Harvest before flowers open for the best flavour.',
      'Take no more than one third of the plant at once.',
      'Use leaves fresh; basil loses flavour quickly when dried.'
    ],
    tip: 'Do not wait for basil to flower. Pinching the tips keeps the leaves sweet and the plant productive.',
    zambiaNote:
      'Basil enjoys warm weather but dislikes heavy rain and waterlogged roots. In the rainy season, grow it in a pot that can be moved under shelter.',
    sources: [
      {
        label: 'RHS: Growing herbs',
        url: 'https://www.rhs.org.uk/herbs/growing'
      }
    ],
    needsHumanVerification: [
      'Which basil varieties are available and suited to local conditions.',
      'Whether downy mildew is a common problem in your area.',
      'The best season for basil in your rainfall zone.'
    ]
  }
];

export const getPlant = (id: string | undefined) =>
  plants.find((plant) => plant.id === id);

export const plantCategories: Array<'All' | PlantCategory> = [
  'All',
  'Fruit tree',
  'Vegetable',
  'Herb'
];
