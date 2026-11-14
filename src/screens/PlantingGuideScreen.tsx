import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Droplets,
  Lightbulb,
  MapPin,
  ShieldAlert,
  Sprout,
  Sun
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PlantArt from '../components/PlantArt';
import ProgressBar from '../components/ProgressBar';
import { getPlant } from '../data/plants';

export default function PlantingGuideScreen() {
  const { plantId } = useParams();
  const plant = getPlant(plantId);
  const [gathered, setGathered] = useState<boolean[]>(
    () => plant?.materials.map(() => false) ?? []
  );

  if (!plant) {
    return (
      <div className="page">
        <div className="empty-state empty-state--page">
          <span className="empty-state__icon">
            <Sprout size={28} aria-hidden="true" />
          </span>
          <h1>We could not find that planting guide.</h1>
          <Link to="/library" className="btn btn--primary">
            Browse the plant library
          </Link>
        </div>
      </div>
    );
  }

  const gatheredCount = gathered.filter(Boolean).length;
  const allGathered = gatheredCount === plant.materials.length;

  const toggleMaterial = (index: number) => {
    setGathered((current) =>
      current.map((value, itemIndex) => (itemIndex === index ? !value : value))
    );
  };

  return (
    <div className="page">
      <Link to={`/plant/${plant.id}`} className="back-link">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to the {plant.name.toLowerCase()} guide
      </Link>

      <section className="guide-hero">
        <div className="guide-hero__copy" data-reveal="left">
          <p className="eyebrow">Planting guide</p>
          <h1>Set your {plant.name.toLowerCase()} up well.</h1>
          <p>
            A good planting day saves months of fixing. Gather what you need, work through the
            steps, then settle into a simple care rhythm.
          </p>
          <div className="guide-hero__meta">
            <span>
              <Sun size={16} aria-hidden="true" />
              {plant.sun}
            </span>
            <span>
              <CalendarDays size={16} aria-hidden="true" />
              {plant.season}
            </span>
          </div>
        </div>

        <div
          className="guide-hero__art"
          style={{ background: plant.palette.background }}
          data-reveal="right"
        >
          <PlantArt plant={plant} />
          <div className="guide-hero__art-label">
            <span>{plant.category}</span>
            <strong>{plant.container}</strong>
          </div>
        </div>
      </section>

      <div className="guide-grid">
        <div className="guide-main">
          <section className="guide-section" aria-labelledby="gather-heading" data-reveal>
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">Before you begin</p>
                <h2 id="gather-heading">Gather these things</h2>
              </div>
              <span className="section-heading__count">
                {gatheredCount}/{plant.materials.length} ready
              </span>
            </div>

            <div className="gather-progress">
              <ProgressBar
                value={(gatheredCount / plant.materials.length) * 100}
                label={`${plant.name} materials gathered`}
                compact
              />
            </div>

            <div className="material-list">
              {plant.materials.map((material, index) => (
                <label
                  key={material}
                  className={`material-item ${gathered[index] ? 'is-checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={gathered[index]}
                    onChange={() => toggleMaterial(index)}
                  />
                  <span className="material-item__box" aria-hidden="true">
                    {gathered[index] && <Check size={14} strokeWidth={3} />}
                  </span>
                  <span>{material}</span>
                </label>
              ))}
            </div>

            <p className="gather-note" aria-live="polite">
              {allGathered
                ? 'Everything is ready. The next step is the fun part.'
                : 'Tick things off as you find them. You can start with what you have and gather the rest.'}
            </p>
          </section>

          <section className="guide-section" aria-labelledby="steps-heading" data-reveal>
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">One at a time</p>
                <h2 id="steps-heading">How to plant</h2>
              </div>
            </div>

            <ol className="step-list">
              {plant.steps.map((step, index) => (
                <li key={step.title} className="step-item">
                  <span className="step-item__number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="step-item__copy">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="zambia-note">
            <div className="zambia-note__icon">
              <MapPin size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">Local check</p>
              <h2>Adapt the timing to your area.</h2>
              <p>{plant.zambiaNote}</p>
            </div>
          </section>

          <section className="guide-next">
            <div>
              <p className="eyebrow">Planting done?</p>
              <h2>Keep the care rhythm going.</h2>
              <p>
                Watering, feeding and watching for problems are what turn a planted seedling into a
                harvest.
              </p>
            </div>
            <Link to={`/plant/${plant.id}/care`} className="btn btn--primary">
              <Droplets size={18} aria-hidden="true" />
              Open the care guide
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <aside className="guide-aside" data-reveal="right">
          <div className="guide-aside__card">
            <span className="guide-aside__icon">
              <Lightbulb size={21} aria-hidden="true" />
            </span>
            <p className="eyebrow">Gnome’s tip</p>
            <p>{plant.tip}</p>
          </div>

          <div className="guide-aside__card guide-aside__card--warning">
            <span className="guide-aside__icon">
              <ShieldAlert size={21} aria-hidden="true" />
            </span>
            <p className="eyebrow">Before you dig</p>
            <p>
              Check for buried pipes or cables, and make sure the spot gets the light this plant
              needs. A few minutes of observation prevents a lot of moving later.
            </p>
          </div>

          <div className="guide-aside__links">
            <p className="eyebrow">Helpful next pages</p>
            <Link to={`/plant/${plant.id}`} className="text-link">
              Full {plant.name.toLowerCase()} guide
            </Link>
            <Link to="/harvest" className="text-link">
              Harvest guide
            </Link>
            <Link to="/small-space" className="text-link">
              Choosing a container
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
