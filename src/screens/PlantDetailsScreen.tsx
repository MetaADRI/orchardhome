import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Box,
  Check,
  Clock3,
  Droplets,
  ExternalLink,
  Lightbulb,
  MapPin,
  Ruler,
  ShieldAlert,
  Sprout,
  Sun
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PlantArt from '../components/PlantArt';
import { getPlant } from '../data/plants';

export default function PlantDetailsScreen() {
  const { plantId } = useParams();
  const plant = getPlant(plantId);

  if (!plant) {
    return (
      <div className="page">
        <div className="empty-state empty-state--page">
          <span className="empty-state__icon">
            <Sprout size={28} aria-hidden="true" />
          </span>
          <h1>That plant is not in the library yet.</h1>
          <p>The link may be old. Choose a plant from the library and start there.</p>
          <Link to="/library" className="btn btn--primary">
            Back to the plant library
          </Link>
        </div>
      </div>
    );
  }

  const facts = [
    { label: 'Light', value: plant.sun, icon: Sun },
    { label: 'Water', value: plant.water, icon: Droplets },
    { label: 'Space', value: plant.space, icon: Ruler },
    { label: 'Container', value: plant.container, icon: Box },
    { label: 'First harvest', value: plant.harvestTime, icon: Clock3 },
    { label: 'Best for', value: plant.bestFor, icon: MapPin }
  ];

  return (
    <div className="page plant-detail-page">
      <Link to="/library" className="back-link">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to the plant library
      </Link>

      <section className="plant-hero">
        <div
          className="plant-hero__art"
          style={{ background: plant.palette.background }}
          aria-hidden="true"
          data-reveal="right"
        >
          <span className="plant-hero__category">{plant.category}</span>
          <span className={`difficulty difficulty--${plant.difficulty.toLowerCase()}`}>
            {plant.difficulty}
          </span>
          <PlantArt plant={plant} className="plant-hero__illustration" />
          <span className="plant-hero__art-note">Original illustration</span>
        </div>

        <div className="plant-hero__copy" data-reveal="left">
          <p className="eyebrow">Growing guide</p>
          <h1>{plant.name}</h1>
          <p className="plant-hero__botanical">{plant.botanicalName}</p>
          <p className="plant-hero__tagline">{plant.tagline}</p>
          <p className="plant-hero__summary">{plant.summary}</p>

          <div className="plant-hero__actions">
            <Link to={`/plant/${plant.id}/planting`} className="btn btn--primary">
              <Sprout size={18} aria-hidden="true" />
              Planting guide
            </Link>
            <Link to={`/plant/${plant.id}/care`} className="btn btn--secondary">
              <Droplets size={18} aria-hidden="true" />
              Care guide
            </Link>
          </div>

          <div className="plant-hero__meta">
            <span>
              <Sun size={16} aria-hidden="true" />
              {plant.sun}
            </span>
            <span>
              <Clock3 size={16} aria-hidden="true" />
              {plant.harvestTime}
            </span>
          </div>
        </div>
      </section>

      <div className="plant-detail-grid">
        <div className="plant-detail-main">
          <section className="detail-section" aria-labelledby="glance-heading" data-reveal>
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">Before you begin</p>
                <h2 id="glance-heading">At a glance</h2>
              </div>
            </div>
            <dl className="fact-grid">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="fact">
                    <dt>
                      <Icon size={17} aria-hidden="true" />
                      {fact.label}
                    </dt>
                    <dd>{fact.value}</dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <section className="zambia-note" data-reveal>
            <div className="zambia-note__icon">
              <MapPin size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">A note for Zambian gardens</p>
              <h2>Local conditions matter.</h2>
              <p>{plant.zambiaNote}</p>
            </div>
          </section>

          <section className="detail-section" aria-labelledby="harvest-heading" data-reveal>
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">The reward</p>
                <h2 id="harvest-heading">Harvest clues</h2>
              </div>
              <Link to="/harvest" className="text-link text-link--arrow">
                Harvest guide
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

          <section className="tip-banner" data-reveal>
            <span className="tip-banner__icon">
              <Lightbulb size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">Gnome’s tip</p>
              <p>{plant.tip}</p>
            </div>
          </section>

          <section className="verification-card" aria-labelledby="verify-heading" data-reveal>
            <div className="verification-card__top">
              <span className="verification-card__icon">
                <ShieldAlert size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Use local knowledge</p>
                <h2 id="verify-heading">Worth checking before you plant</h2>
              </div>
            </div>
            <p>
              These notes are general growing guidance, not a guarantee for every garden. A local
              nursery or extension officer can confirm the details that depend on your area,
              altitude and season.
            </p>
            <ul className="check-list">
              {plant.needsHumanVerification.map((item) => (
                <li key={item}>
                  <span className="check-list__icon check-list__icon--plain">
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="source-links">
              {plant.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  <BookOpen size={15} aria-hidden="true" />
                  {source.label}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="plant-detail-aside">
          <div className="guide-nav" data-reveal="right">
            <p className="eyebrow">Your next step</p>
            <h2>Make a plan</h2>
            <p>Move from reading to doing with a materials list and clear planting steps.</p>
            <Link to={`/plant/${plant.id}/planting`} className="guide-nav__link">
              <span className="guide-nav__number">01</span>
              <span>
                <strong>Planting guide</strong>
                <small>{plant.materials.length} things to gather</small>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to={`/plant/${plant.id}/care`} className="guide-nav__link">
              <span className="guide-nav__number">02</span>
              <span>
                <strong>Care guide</strong>
                <small>{plant.care.length} care habits</small>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/harvest" className="guide-nav__link">
              <span className="guide-nav__number">03</span>
              <span>
                <strong>Harvest guide</strong>
                <small>Know when it is ready</small>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="season-card" data-reveal="right">
            <span className="season-card__icon">
              <Sun size={21} aria-hidden="true" />
            </span>
            <p className="eyebrow">Season note</p>
            <h2>{plant.season}</h2>
            <p>
              Planting at the start of the rains is a useful default for many crops, but local
              timing still depends on your area.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
