import { useState } from 'react';
import {
  ArrowRight,
  Box,
  CloudSun,
  Droplets,
  Flower2,
  Lightbulb,
  Moon,
  Ruler,
  Sprout,
  Sun,
  Wind
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';
import PlantArt from '../components/PlantArt';
import { getPlant } from '../data/plants';

const lightOptions = [
  {
    id: 'full',
    icon: Sun,
    title: 'Full sun',
    hours: '6+ hours of direct sun',
    summary:
      'A bright patio, roof, open courtyard or vegetable bed. This is the best light for fruiting crops such as tomatoes and beans.',
    plantIds: ['tomato', 'beans', 'basil', 'pomegranate']
  },
  {
    id: 'part',
    icon: CloudSun,
    title: 'Part sun',
    hours: '3–6 hours, or bright dappled light',
    summary:
      'Morning sun with afternoon shelter, or light filtered through a tree. Leafy crops and many herbs settle in well here.',
    plantIds: ['mint', 'kale', 'basil']
  },
  {
    id: 'shade',
    icon: Moon,
    title: 'Bright shade',
    hours: 'Mostly shade, but still airy and light',
    summary:
      'A shaded veranda or wall. Be realistic: most food crops want more sun. Mint has the best chance, and containers can move with the seasons.',
    plantIds: ['mint']
  }
] as const;

const potSizes = [
  {
    range: '5–10 L',
    title: 'Herbs and small greens',
    body: 'Basil, mint and a few salad leaves. Small pots dry quickly, so check them often.',
    icon: Flower2
  },
  {
    range: '12–20 L',
    title: 'One productive vegetable',
    body: 'A bush tomato, a kale plant or a few dwarf beans. Depth and drainage both matter.',
    icon: Sprout
  },
  {
    range: '30–60 L',
    title: 'Dwarf fruit trees',
    body: 'A long-term home for a dwarf fruit tree. Use a stable pot, quality soil and a saucer you can empty.',
    icon: Box
  }
];

export default function SmallSpaceScreen() {
  const [light, setLight] = useState<(typeof lightOptions)[number]['id']>('full');
  const selected = lightOptions.find((option) => option.id === light) ?? lightOptions[0];

  return (
    <div className="page">
      <section className="space-hero">
        <div className="space-hero__copy" data-reveal="left">
          <p className="eyebrow">Small space, real garden</p>
          <h1>Grow in the space you actually have.</h1>
          <p>
            A doorstep, balcony or narrow courtyard can still grow food. Start by reading the light,
            then choose a pot and a plant that fit the reality of your week.
          </p>
          <div className="space-hero__actions">
            <Link to="/small-space#light-finder" className="btn btn--primary">
              Find your light
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/library" className="btn btn--ghost">
              Browse plants
            </Link>
          </div>
        </div>
        <div className="space-hero__scene" data-reveal="right">
          <div className="space-hero__pot space-hero__pot--one">
            <PlantArt plant={getPlant('mint')!} />
          </div>
          <div className="space-hero__pot space-hero__pot--two">
            <PlantArt plant={getPlant('tomato')!} />
          </div>
          <Gnome pose="thinking" className="space-hero__gnome" />
        </div>
      </section>

      <section
        className="light-finder"
        id="light-finder"
        aria-labelledby="light-heading"
        data-reveal
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start with observation</p>
            <h2 id="light-heading">How much sun does your spot get?</h2>
          </div>
          <p>Watch it on a clear day before you buy anything.</p>
        </div>

        <div className="light-tabs" role="group" aria-label="Choose your light level">
          {lightOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                type="button"
                className={`light-tab ${light === option.id ? 'is-active' : ''}`}
                onClick={() => setLight(option.id)}
                aria-pressed={light === option.id}
              >
                <span className="light-tab__icon">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <strong>{option.title}</strong>
                  <small>{option.hours}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="light-result" aria-live="polite">
          <div className="light-result__copy">
            <p className="eyebrow">{selected.hours}</p>
            <h3>{selected.title}</h3>
            <p>{selected.summary}</p>
          </div>
          <div className="light-result__plants">
            <span className="light-result__label">Plants to consider</span>
            <div>
              {selected.plantIds.map((id) => {
                const plant = getPlant(id);
                if (!plant) return null;
                return (
                  <Link key={id} to={`/plant/${id}`} className="light-plant">
                    <span
                      className="light-plant__dot"
                      style={{ background: plant.palette.foliage }}
                      aria-hidden="true"
                    />
                    {plant.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pot-section" aria-labelledby="pot-heading" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Think about roots</p>
            <h2 id="pot-heading">Choose a pot with room</h2>
          </div>
          <Link to="/library" className="text-link text-link--arrow">
            Pick a plant first
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="pot-grid" data-reveal-group>
          {potSizes.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.range} className="pot-card">
                <span className="pot-card__icon">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span className="pot-card__range">{item.range}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>

        <div className="pot-checks">
          <div>
            <Droplets size={19} aria-hidden="true" />
            <span>
              <strong>Drainage holes</strong>
              <small>Every pot needs a way for extra water to leave.</small>
            </span>
          </div>
          <div>
            <Ruler size={19} aria-hidden="true" />
            <span>
              <strong>Enough depth</strong>
              <small>Deep-rooted crops need deeper containers.</small>
            </span>
          </div>
          <div>
            <Wind size={19} aria-hidden="true" />
            <span>
              <strong>Air movement</strong>
              <small>Good airflow helps leaves stay dry and healthy.</small>
            </span>
          </div>
        </div>
      </section>

      <div className="space-bottom-grid" data-reveal-group>
        <section className="space-tips" aria-labelledby="layout-heading">
          <p className="eyebrow">Make it work</p>
          <h2 id="layout-heading">Four small-space moves</h2>
          <ul className="numbered-tips">
            <li>
              <span>01</span>
              <div>
                <strong>Use height, not just floor space.</strong>
                <p>A sturdy shelf or step can hold herbs while a taller pot holds a tomato below.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Group thirsty pots together.</strong>
                <p>They create a slightly more humid pocket and are quicker to check and water.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Keep a clear walking path.</strong>
                <p>If you cannot reach the back row, you will stop watering it. Leave yourself room.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Choose pots you can move.</strong>
                <p>Portable containers let you chase the sun in cool months and shelter from heavy rain.</p>
              </div>
            </li>
          </ul>
        </section>

        <aside className="space-note-card">
          <span className="space-note-card__icon">
            <Lightbulb size={22} aria-hidden="true" />
          </span>
          <p className="eyebrow">Gnome’s honest note</p>
          <h2>Start with one pot.</h2>
          <p>
            A single happy herb teaches you more than ten neglected pots. Once the watering rhythm
            feels natural, add another crop.
          </p>
          <Link to="/plant/mint" className="btn btn--secondary">
            Start with mint
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
