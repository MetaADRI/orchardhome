import {
  ArrowRight,
  BookOpen,
  Droplets,
  Leaf,
  Lock,
  Sprout,
  Sun,
  WifiOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';
import InstallButton from '../components/InstallButton';
import PlantArt from '../components/PlantArt';
import { BrandMark } from '../components/AppHeader';
import { useGame } from '../contexts/useGame';
import { getPlant } from '../data/plants';

const mint = getPlant('mint');

export default function WelcomeScreen() {
  const { completedLessons, pathProgress } = useGame();
  const hasProgress = completedLessons.length > 0;

  return (
    <div className="welcome">
      <header className="welcome__header">
        <Link to="/" className="brand" aria-label="Orchard Home Gnome home">
          <BrandMark />
          <span className="brand__copy">
            <strong>Orchard</strong>
            <span>Home Gnome</span>
          </span>
        </Link>
        <div className="welcome__header-actions">
          <Link to="/about" className="text-link">
            How it works
          </Link>
          <InstallButton compact />
        </div>
      </header>

      <main>
        <section className="welcome-hero">
          <div className="welcome-hero__copy" data-reveal="left">
            <p className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              A growing guide for Zambian homes
            </p>
            <h1>
              Grow something good,
              <span className="highlight-word">right where you are.</span>
            </h1>
            <p className="welcome-hero__lead">
              Meet Grow Gnome: a calm, practical companion for growing fruit, vegetables and herbs
              in the space you actually have. No farm required.
            </p>

            <div className="welcome-hero__actions">
              <Link to="/home" className="btn btn--primary btn--large">
                {hasProgress ? 'Continue growing' : 'Start growing'}
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
              <Link to="/library" className="btn btn--ghost btn--large">
                <BookOpen size={18} aria-hidden="true" />
                Explore plants
              </Link>
            </div>

            <div className="welcome-proof" aria-label="Prototype highlights">
              <span>
                <Sprout size={17} aria-hidden="true" />
                9 plant guides
              </span>
              <span>
                <WifiOff size={17} aria-hidden="true" />
                Works offline
              </span>
              <span>
                <Lock size={17} aria-hidden="true" />
                No sign-up
              </span>
            </div>

            {hasProgress && (
              <div className="welcome-return">
                <span className="welcome-return__ring" aria-hidden="true">
                  {Math.round(pathProgress * 100)}%
                </span>
                <span>
                  <strong>Welcome back.</strong> Your growing path is saved on this device.
                </span>
              </div>
            )}
          </div>

          <div
            className="welcome-scene"
            aria-label="Grow Gnome welcomes you to a small garden"
            data-reveal="right"
          >
            <div className="welcome-scene__sun" aria-hidden="true">
              <Sun size={40} strokeWidth={1.6} />
            </div>
            <div className="welcome-scene__blob" aria-hidden="true" />
            <div className="welcome-scene__ring" aria-hidden="true" />
            <span className="welcome-scene__leaf welcome-scene__leaf--one" aria-hidden="true" />
            <span className="welcome-scene__leaf welcome-scene__leaf--two" aria-hidden="true" />
            <span className="welcome-scene__leaf welcome-scene__leaf--three" aria-hidden="true" />

            <Gnome pose="waving" className="welcome-gnome" />

            <div className="float-card float-card--tip">
              <span className="float-card__icon">
                <Droplets size={18} aria-hidden="true" />
              </span>
              <span>
                <strong>Water at the base</strong>
                <small>Keep leaves dry</small>
              </span>
            </div>

            {mint && (
              <div className="float-card float-card--plant">
                <PlantArt plant={mint} className="float-card__art" />
                <span>
                  <strong>Mint</strong>
                  <small>An easy first herb</small>
                </span>
              </div>
            )}

            <div className="welcome-scene__ground" aria-hidden="true" />
          </div>
        </section>

        <section className="welcome-strip" aria-label="What you can grow" data-reveal>
          <span>
            <Sprout size={20} aria-hidden="true" /> Vegetables
          </span>
          <span>
            <Leaf size={20} aria-hidden="true" /> Herbs
          </span>
          <span>
            <Sun size={20} aria-hidden="true" /> Fruit trees
          </span>
          <span className="welcome-strip__space">
            <span className="welcome-strip__dot" aria-hidden="true" /> Small spaces welcome
          </span>
        </section>

        <section
          className="welcome-values"
          aria-label="How Orchard Home Gnome works"
          data-reveal-group
        >
          <article className="value-card">
            <span className="value-card__number">01</span>
            <div className="value-card__icon">
              <Sun size={24} aria-hidden="true" />
            </div>
            <h2>Match the plant to your light</h2>
            <p>
              A balcony, windowsill or courtyard can all grow something. Start with what your space
              naturally offers.
            </p>
          </article>
          <article className="value-card">
            <span className="value-card__number">02</span>
            <div className="value-card__icon value-card__icon--sun">
              <Sprout size={24} aria-hidden="true" />
            </div>
            <h2>Learn one small step at a time</h2>
            <p>
              Short field notes, quick checks and a gentle path. You will always know what to do
              next.
            </p>
          </article>
          <article className="value-card">
            <span className="value-card__number">03</span>
            <div className="value-card__icon value-card__icon--berry">
              <WifiOff size={24} aria-hidden="true" />
            </div>
            <h2>Keep the guide in your pocket</h2>
            <p>
              Install the app and open your plant guides without a signal. Your progress stays on
              your device.
            </p>
          </article>
        </section>
      </main>

      <footer className="welcome__footer" data-reveal>
        <p>Original artwork, grown for learning.</p>
        <p>Independent student prototype · Zambia · 2026</p>
      </footer>
    </div>
  );
}
