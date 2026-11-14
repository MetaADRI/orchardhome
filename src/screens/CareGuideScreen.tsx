import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  Clock3,
  Droplets,
  Eye,
  Scissors,
  Sprout,
  Sun
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PlantArt from '../components/PlantArt';
import { getPlant } from '../data/plants';

const careIcons = {
  sun: Sun,
  water: Droplets,
  soil: Sprout,
  prune: Scissors,
  watch: Eye,
  container: Box
};

const careRhythm = [
  {
    when: 'Most days',
    title: 'A quick look',
    body: 'Check the soil surface, new growth and the underside of a few leaves. A two-minute walk-around catches most changes early.'
  },
  {
    when: 'Every week',
    title: 'A deeper check',
    body: 'Push a finger into the soil, clear fallen leaves, and look for pests or sticky patches. Water deeply when the soil below the surface is dry.'
  },
  {
    when: 'Each season',
    title: 'Tune the routine',
    body: 'Move pots with the sun, top up mulch and add compost when the plant starts growing again. Rainy and dry seasons ask for different watering.'
  }
];

export default function CareGuideScreen() {
  const { plantId } = useParams();
  const plant = getPlant(plantId);

  if (!plant) {
    return (
      <div className="page">
        <div className="empty-state empty-state--page">
          <span className="empty-state__icon">
            <Droplets size={28} aria-hidden="true" />
          </span>
          <h1>We could not find that care guide.</h1>
          <Link to="/library" className="btn btn--primary">
            Browse the plant library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={`/plant/${plant.id}`} className="back-link">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to the {plant.name.toLowerCase()} guide
      </Link>

      <section className="guide-hero guide-hero--care">
        <div className="guide-hero__copy" data-reveal="left">
          <p className="eyebrow">Care guide</p>
          <h1>A steady rhythm for your {plant.name.toLowerCase()}.</h1>
          <p>
            Plants rarely need dramatic gestures. They need the right light, even moisture and
            someone who notices small changes before they become big ones.
          </p>
          <div className="guide-hero__meta">
            <span>
              <Droplets size={16} aria-hidden="true" />
              {plant.water}
            </span>
            <span>
              <Clock3 size={16} aria-hidden="true" />
              First harvest: {plant.harvestTime}
            </span>
          </div>
        </div>

        <div
          className="guide-hero__art guide-hero__art--care"
          style={{ background: plant.palette.background }}
          data-reveal="right"
        >
          <PlantArt plant={plant} />
          <div className="care-badge">
            <span>
              <Droplets size={18} aria-hidden="true" />
            </span>
            <div>
              <small>Water routine</small>
              <strong>{plant.water}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="guide-grid">
        <div className="guide-main">
          <section className="guide-section" aria-labelledby="care-heading" data-reveal>
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">The essentials</p>
                <h2 id="care-heading">Four care habits</h2>
              </div>
            </div>

            <div className="care-grid">
              {plant.care.map((tip, index) => {
                const Icon = careIcons[tip.kind];
                return (
                  <article key={tip.title} className="care-card">
                    <div className="care-card__top">
                      <span className={`care-card__icon care-card__icon--${tip.kind}`}>
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="care-card__number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3>{tip.title}</h3>
                    <p>{tip.body}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="guide-section" aria-labelledby="rhythm-heading" data-reveal>
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">A simple routine</p>
                <h2 id="rhythm-heading">Your care rhythm</h2>
              </div>
            </div>

            <ol className="rhythm-list">
              {careRhythm.map((item, index) => (
                <li key={item.title}>
                  <span className="rhythm-list__marker">{index + 1}</span>
                  <div>
                    <span className="rhythm-list__when">{item.when}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="guide-section" aria-labelledby="ready-heading" data-reveal>
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">The reward</p>
                <h2 id="ready-heading">When harvest is close</h2>
              </div>
              <Link to="/harvest" className="text-link text-link--arrow">
                More harvest help
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <ul className="check-list check-list--two">
              {plant.harvestSigns.map((sign) => (
                <li key={sign}>
                  <span className="check-list__icon">
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {sign}
                </li>
              ))}
            </ul>
          </section>

          <section className="guide-next">
            <div>
              <p className="eyebrow">Ready to try another?</p>
              <h2>One plant is a start. Two is a garden.</h2>
              <p>
                Choose a crop that suits a different corner, or revisit the library when the season
                changes.
              </p>
            </div>
            <Link to="/library" className="btn btn--primary">
              Explore the plant library
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <aside className="guide-aside" data-reveal="right">
          <div className="quick-facts-card">
            <p className="eyebrow">Care at a glance</p>
            <dl>
              <div>
                <dt>
                  <Sun size={15} aria-hidden="true" />
                  Light
                </dt>
                <dd>{plant.sun}</dd>
              </div>
              <div>
                <dt>
                  <Droplets size={15} aria-hidden="true" />
                  Water
                </dt>
                <dd>{plant.water}</dd>
              </div>
              <div>
                <dt>
                  <Box size={15} aria-hidden="true" />
                  Container
                </dt>
                <dd>{plant.container}</dd>
              </div>
              <div>
                <dt>
                  <Sprout size={15} aria-hidden="true" />
                  Spacing
                </dt>
                <dd>{plant.space}</dd>
              </div>
            </dl>
          </div>

          <div className="guide-aside__card">
            <span className="guide-aside__icon">
              <Scissors size={21} aria-hidden="true" />
            </span>
            <p className="eyebrow">A useful habit</p>
            <p>
              Keep a few notes in your phone: planting date, first flower, first harvest. Your own
              garden record will become more useful than any general guide.
            </p>
          </div>

          <div className="guide-aside__links">
            <p className="eyebrow">Helpful next pages</p>
            <Link to={`/plant/${plant.id}/planting`} className="text-link">
              Planting guide
            </Link>
            <Link to="/growth" className="text-link">
              See the growth stages
            </Link>
            <Link to={`/plant/${plant.id}`} className="text-link">
              Full {plant.name.toLowerCase()} guide
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
