import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Droplets,
  Info,
  Leaf,
  Sparkles,
  Sprout,
  Sun
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';
import { useGame } from '../contexts/useGame';

const stages = [
  {
    number: 1,
    label: 'Pot and seed',
    title: 'A small beginning',
    summary:
      'A clean pot, drainage holes and damp potting mix. The seed is tucked just below the surface, waiting for warmth and moisture.',
    notice: ['Good drainage matters from day one.', 'Keep the mix damp, not soaking.', 'Warmth helps germination begin.']
  },
  {
    number: 2,
    label: 'Sprout',
    title: 'The first green signal',
    summary:
      'A tiny shoot pushes through the soil and opens its first seed leaves. At this stage, light becomes the plant’s main direction-finder.',
    notice: ['Move the pot into good light.', 'Water gently so the seedling is not washed out.', 'Check the surface every day.']
  },
  {
    number: 3,
    label: 'Leafy growth',
    title: 'Building the engine',
    summary:
      'True leaves appear and the stem thickens. The plant is building the leaf area it needs to turn sunlight into growth.',
    notice: ['Steady water beats a big soak after drought.', 'Give the stem support before it needs it.', 'Watch for pests on new leaves.']
  },
  {
    number: 4,
    label: 'Flowering',
    title: 'The promise of fruit',
    summary:
      'Small yellow flowers open. Pollination needs gentle movement, insects or a little help from you, depending on the crop.',
    notice: ['Do not spray flowers directly.', 'Keep moisture even while flowers set.', 'A balanced feed can support fruit formation.']
  },
  {
    number: 5,
    label: 'Fruit',
    title: 'The harvest approaches',
    summary:
      'Green fruit swells and begins to colour. Ripening is a slow change in texture, scent and sugar, not only colour.',
    notice: ['Check colour, firmness and scent together.', 'Pick gently with a clean twist or cut.', 'Keep watering steady as fruit ripens.']
  }
];

function GrowthIllustration({ stage }: { stage: number }) {
  return (
    <svg
      className="growth-plant"
      viewBox="0 0 320 320"
      role="img"
      aria-label={`Tomato plant at stage ${stage}: ${stages[stage - 1].label}`}
    >
      <defs>
        <linearGradient id="growth-pot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c47c54" />
          <stop offset="100%" stopColor="#9c5739" />
        </linearGradient>
        <linearGradient id="growth-fruit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f07058" />
          <stop offset="100%" stopColor="#c94439" />
        </linearGradient>
      </defs>

      <circle className="growth-plant__sun" cx="264" cy="58" r="30" />
      <g className="growth-plant__sun-rays" aria-hidden="true">
        <path d="M264 12v14M264 90v14M218 58h14M296 58h14M231 25l10 10M287 81l10 10M297 25l-10 10M241 81l-10 10" />
      </g>

      <g className="growth-plant__soil-line">
        <path d="M84 248c30-9 58-4 82 4 28 9 54 7 76-2" />
      </g>

      {stage === 1 && (
        <g className="growth-plant__seed">
          <ellipse cx="162" cy="258" rx="9" ry="6" transform="rotate(-18 162 258)" />
          <circle cx="162" cy="258" r="19" className="growth-plant__seed-ring" />
        </g>
      )}

      {stage >= 2 && (
        <g className="growth-plant__stem">
          <path d="M160 250c-2-20 1-40 0-61 0-20 4-38 1-59" />
        </g>
      )}

      {stage === 2 && (
        <g className="growth-plant__seedling-leaves">
          <path d="M160 220c-17-8-30-2-39 10 14 9 29 6 39-10Z" />
          <path d="M161 212c15-11 28-8 39 2-12 12-27 12-39-2Z" />
        </g>
      )}

      {stage >= 3 && (
        <g className="growth-plant__leaves">
          <path d="M160 205c-23-13-41-5-51 12 20 12 39 5 51-12Z" />
          <path d="M161 196c22-13 38-4 47 13-19 11-36 4-47-13Z" />
          <path d="M160 172c-26-13-46-2-54 17 23 12 43 3 54-17Z" />
          <path d="M161 162c24-14 42-3 49 17-21 11-39 2-49-17Z" />
          <path d="M160 143c-20-9-36-1-42 14 18 10 33 3 42-14Z" />
        </g>
      )}

      {stage === 4 && (
        <g className="growth-plant__flowers">
          <g transform="translate(146 122)">
            <circle r="8" />
            <path d="M0-16v9M0 7v9M-16 0h9M7 0h9M-11-11l6 6M5 5l6 6M11-11l-6 6M-5 5l-6 6" />
          </g>
          <g transform="translate(184 154)">
            <circle r="7" />
            <path d="M0-14v8M0 6v8M-14 0h8M6 0h8M-10-10l5 5M5 5l5 5M10-10l-5 5M-5 5l-5 5" />
          </g>
          <g transform="translate(137 180)">
            <circle r="6" />
            <path d="M0-12v6M0 6v6M-12 0h6M6 0h6M-8-8l4 4M4 4l4 4M8-8l-4 4M-4 4l-4 4" />
          </g>
        </g>
      )}

      {stage === 5 && (
        <g className="growth-plant__fruit">
          <circle cx="141" cy="129" r="17" fill="url(#growth-fruit)" />
          <circle cx="185" cy="160" r="14" fill="url(#growth-fruit)" />
          <circle cx="146" cy="188" r="12" fill="url(#growth-fruit)" />
          <path d="M141 112l-5-8M141 112l5-8M141 112v-9" />
          <path d="M185 146l-4-6M185 146l4-6" />
        </g>
      )}

      <g className="growth-plant__pot">
        <path d="M97 252h126l-16 54c-2 8-9 14-17 14h-60c-8 0-15-6-17-14l-16-54Z" fill="url(#growth-pot)" />
        <path d="M91 244h138c7 0 12 5 11 12l-3 12H83l-3-12c-1-7 4-12 11-12Z" />
        <path d="M104 240c23-5 53-6 82-1 12 2 24 2 34 0" className="growth-plant__pot-soil" />
      </g>

      <g className="growth-plant__water" aria-hidden="true">
        <path d="M72 104c0 7-5 12-12 12s-12-5-12-12c0-8 12-22 12-22s12 14 12 22Z" />
      </g>
    </svg>
  );
}

export default function GrowthScreen() {
  const { visitGrowthStage, isLessonComplete } = useGame();
  const [stage, setStage] = useState(1);
  const [visited, setVisited] = useState<number[]>([1]);
  const current = stages[stage - 1];
  const growthDone = isLessonComplete('growth');

  useEffect(() => {
    visitGrowthStage(1);
  }, [visitGrowthStage]);

  const goToStage = (nextStage: number) => {
    const safeStage = Math.max(1, Math.min(stages.length, nextStage));
    setStage(safeStage);
    setVisited((items) => (items.includes(safeStage) ? items : [...items, safeStage]));
    visitGrowthStage(safeStage);
  };

  return (
    <div className="page">
      <div className="lesson-topbar">
        <Link to="/home" className="back-link">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to your path
        </Link>
        <span className={`demo-pill ${growthDone ? 'is-complete' : ''}`}>
          {growthDone ? <Check size={15} aria-hidden="true" /> : <Sparkles size={15} aria-hidden="true" />}
          {growthDone ? 'Demo complete' : 'Simulated demo'}
        </span>
      </div>

      <section className="growth-hero" data-reveal>
        <div className="growth-hero__copy">
          <p className="eyebrow">From flower to fruit</p>
          <h1>A tomato’s life, one stage at a time.</h1>
          <p>
            Real plants move at their own pace. This interactive demo compresses the journey so you
            can learn what to look for at each stage.
          </p>
          <div className="growth-hero__meta">
            <span>
              <Clock3 size={16} aria-hidden="true" />
              About 60–90 days from transplant
            </span>
            <span>
              <Info size={16} aria-hidden="true" />
              Timings vary by variety and season
            </span>
          </div>
        </div>
        <Gnome pose={stage === 5 ? 'celebrating' : 'teaching'} className="growth-hero__gnome" />
      </section>

      <section className="growth-demo" aria-labelledby="growth-heading" data-reveal>
        <div className="growth-stage-panel">
          <div className="growth-stage-panel__art">
            <GrowthIllustration stage={stage} />
          </div>

          <div className="growth-stage-tabs" role="group" aria-label="Choose a growth stage">
            {stages.map((item) => (
              <button
                key={item.number}
                type="button"
                className={`growth-stage-tab ${stage === item.number ? 'is-active' : ''} ${
                  visited.includes(item.number) ? 'is-visited' : ''
                }`}
                onClick={() => goToStage(item.number)}
                aria-pressed={stage === item.number}
              >
                <span>{item.number}</span>
                <small>{item.label}</small>
              </button>
            ))}
          </div>

          <div className="growth-stage-controls">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => goToStage(stage - 1)}
              disabled={stage === 1}
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Previous
            </button>
            <div className="growth-stage-dots" aria-hidden="true">
              {stages.map((item) => (
                <span
                  key={item.number}
                  className={`${stage === item.number ? 'is-active' : ''} ${
                    visited.includes(item.number) ? 'is-visited' : ''
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => goToStage(stage + 1)}
              disabled={stage === stages.length}
            >
              Next stage
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="growth-stage-copy">
          <span className="growth-stage-copy__number">
            Stage {current.number} of {stages.length}
          </span>
          <p className="eyebrow">{current.label}</p>
          <h2 id="growth-heading">{current.title}</h2>
          <p className="growth-stage-copy__summary">{current.summary}</p>

          <div className="growth-notice">
            <p className="eyebrow">What to notice</p>
            <ul className="check-list">
              {current.notice.map((item) => (
                <li key={item}>
                  <span className="check-list__icon">
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="growth-needs">
            <span>
              <Sun size={17} aria-hidden="true" />
              Light
            </span>
            <span>
              <Droplets size={17} aria-hidden="true" />
              Even water
            </span>
            <span>
              <Leaf size={17} aria-hidden="true" />
              Good airflow
            </span>
          </div>

          {stage === 5 && (
            <div className={`growth-complete ${growthDone ? 'is-complete' : ''}`}>
              <span className="growth-complete__icon">
                <Sparkles size={19} aria-hidden="true" />
              </span>
              <div>
                <strong>{growthDone ? 'Path step complete' : 'Keep exploring every stage'}</strong>
                <p>
                  {growthDone
                    ? 'You have seen the full simulated cycle and earned the growth-stage XP.'
                    : 'Visit all five stages to complete this demo on your path.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="simulation-note" data-reveal>
        <div className="simulation-note__icon">
          <Info size={22} aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">This is a model, not a calendar</p>
          <h2>Real plants do not have buttons.</h2>
          <p>
            A tomato may flower in weeks or take much longer depending on variety, sun, nutrition
            and season. Use the stages as a way to recognise change, not as a promise of exact
            dates.
          </p>
        </div>
        <Link to="/plant/tomato" className="btn btn--secondary">
          <Sprout size={18} aria-hidden="true" />
          Read the tomato guide
        </Link>
      </section>
    </div>
  );
}
