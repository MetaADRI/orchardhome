import { useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CloudOff,
  ExternalLink,
  Info,
  LockKeyhole,
  MapPin,
  RefreshCw,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Sprout,
  Trash2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';
import InstallButton from '../components/InstallButton';
import { useGame } from '../contexts/useGame';
import { plants } from '../data/plants';

const sourceMap = new Map<string, { label: string; url: string }>();
plants.forEach((plant) => {
  plant.sources.forEach((source) => {
    if (!sourceMap.has(source.url)) sourceMap.set(source.url, source);
  });
});
const sources = [...sourceMap.values()];

const assumptions = [
  'The app speaks to a broad Zambian audience, so it avoids claiming one planting calendar for the whole country.',
  'Garden conditions vary with altitude, rainfall, soil and microclimate. Local nursery or extension advice should override general notes.',
  'Measurements use litres, centimetres and metres, with familiar household comparisons where useful.',
  'The growth demo is explicitly labelled as a simulation. It compresses a tomato life cycle and does not predict real dates.',
  'Fruit-tree guidance focuses on choosing suitable low-chill varieties and asking local growers, rather than promising success in every garden.',
  'The prototype is in English only and has not been tested with a broad group of Zambian gardeners.'
];

const verificationQuestions = [
  'Which varieties are actually sold near you, and which do local growers recommend?',
  'What are the usual sowing and harvest months for your altitude and rainfall pattern?',
  'Which pests or diseases are common in your area, and what safe controls are available?',
  'Does your garden receive enough winter chill for the fruit trees you are considering?'
];

export default function AboutScreen() {
  const { resetProgress, xp, completedLessons, quizBest } = useGame();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [resetDone, setResetDone] = useState(false);

  const openReset = () => {
    setResetDone(false);
    dialogRef.current?.showModal();
  };

  const confirmReset = () => {
    resetProgress();
    dialogRef.current?.close();
    setResetDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="about-hero__copy" data-reveal="left">
          <p className="eyebrow">About this prototype</p>
          <h1>A small guide for growing real food.</h1>
          <p>
            Orchard Home Gnome is an original, offline-first learning prototype. It combines short
            lessons with researched plant guides so a new gardener can move from “I have a sunny
            step” to “I know what to do next.”
          </p>
          <div className="about-hero__actions">
            <Link to="/home" className="btn btn--primary">
              Return to your path
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <InstallButton />
          </div>
        </div>
        <div className="about-hero__scene" data-reveal="right">
          <div className="about-hero__ring" aria-hidden="true" />
          <Gnome pose="waving" className="about-hero__gnome" />
          <span className="about-hero__tag">
            <Sparkles size={16} aria-hidden="true" />
            Original prototype
          </span>
        </div>
      </section>

      <section className="about-stats" aria-label="Prototype at a glance" data-reveal-group>
        <div>
          <strong>9</strong>
          <span>researched plant guides</span>
        </div>
        <div>
          <strong>10</strong>
          <span>path steps</span>
        </div>
        <div>
          <strong>{completedLessons.length}</strong>
          <span>steps completed here</span>
        </div>
        <div>
          <strong>{xp}</strong>
          <span>XP in this browser</span>
        </div>
        <div>
          <strong>{quizBest}/6</strong>
          <span>best checkpoint score</span>
        </div>
      </section>

      <div className="about-grid">
        <div className="about-main">
          <section
            className="about-section"
            id="what"
            aria-labelledby="what-heading"
            data-reveal
          >
            <div className="about-section__heading">
              <span className="about-section__icon">
                <Sprout size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">What it does</p>
                <h2 id="what-heading">Learning by doing, gently</h2>
              </div>
            </div>
            <p>
              The path introduces a few important ideas in a deliberate order: observe your light,
              choose a plant that fits, use a pot with drainage, water steadily, and harvest without
              damaging the plant. Each lesson ends with one quick check and a clear explanation.
            </p>
            <p>
              The plant library then stays open as a reference. It covers fruit trees, vegetables and
              herbs, including the practical materials, planting steps and care habits for each.
            </p>
            <div className="about-feature-row">
              <span>
                <BookOpen size={18} aria-hidden="true" />
                Short lessons
              </span>
              <span>
                <Sprout size={18} aria-hidden="true" />
                Practical guides
              </span>
              <span>
                <CloudOff size={18} aria-hidden="true" />
                Offline-ready
              </span>
            </div>
          </section>

          <section
            className="about-section"
            id="progress"
            aria-labelledby="progress-heading"
            data-reveal
          >
            <div className="about-section__heading">
              <span className="about-section__icon">
                <LockKeyhole size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Progress and privacy</p>
                <h2 id="progress-heading">Stored only on this device</h2>
              </div>
            </div>
            <p>
              XP, streaks, completed lessons, quiz scores and visited growth stages are saved in this
              browser’s local storage. There is no account, analytics service or server receiving your
              progress.
            </p>
            <div className="privacy-points">
              <div>
                <Check size={17} aria-hidden="true" />
                <span>No account or email required.</span>
              </div>
              <div>
                <Check size={17} aria-hidden="true" />
                <span>No personal data is collected by the app.</span>
              </div>
              <div>
                <Check size={17} aria-hidden="true" />
                <span>Clearing browser data also clears progress.</span>
              </div>
            </div>

            {resetDone ? (
              <div className="reset-confirmation" role="status">
                <Check size={18} aria-hidden="true" />
                Progress cleared. Your path is fresh again.
              </div>
            ) : (
              <button type="button" className="btn btn--danger btn--small" onClick={openReset}>
                <Trash2 size={16} aria-hidden="true" />
                Reset all progress
              </button>
            )}
          </section>

          <section
            className="about-section"
            id="offline"
            aria-labelledby="offline-heading"
            data-reveal
          >
            <div className="about-section__heading">
              <span className="about-section__icon">
                <CloudOff size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Install and offline use</p>
                <h2 id="offline-heading">Keep the guide with you</h2>
              </div>
            </div>
            <p>
              After the first successful load, the built app caches its pages, illustrations and
              self-hosted fonts. On a supported browser you can install it to the home screen and
              open it without a connection. Source links still need the internet when you tap them.
            </p>
            <div className="install-help">
              <Smartphone size={22} aria-hidden="true" />
              <div>
                <strong>Install from your browser</strong>
                <p>
                  Use the Install button in the header. On iPhone or iPad, open the Share menu in
                  Safari and choose “Add to Home Screen”.
                </p>
              </div>
            </div>
          </section>

          <section
            className="about-section"
            id="assumptions"
            aria-labelledby="assumptions-heading"
            data-reveal
          >
            <div className="about-section__heading">
              <span className="about-section__icon">
                <Info size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Honest limits</p>
                <h2 id="assumptions-heading">Assumptions behind the content</h2>
              </div>
            </div>
            <ul className="assumption-list">
              {assumptions.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="about-section" id="verify" aria-labelledby="verify-heading" data-reveal>
            <div className="about-section__heading">
              <span className="about-section__icon">
                <MapPin size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Use local knowledge</p>
                <h2 id="verify-heading">What to ask before you plant</h2>
              </div>
            </div>
            <p>
              The guides are a starting point, not a substitute for local experience. Take these
              questions to a nursery, extension officer or gardener who knows your area.
            </p>
            <ul className="question-list">
              {verificationQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>

          <section
            className="about-section"
            id="sources"
            aria-labelledby="sources-heading"
            data-reveal
          >
            <div className="about-section__heading">
              <span className="about-section__icon">
                <ShieldAlert size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Evidence base</p>
                <h2 id="sources-heading">Sources used for the plant guides</h2>
              </div>
            </div>
            <p>
              These sources informed the general growing guidance. Each plant page lists the sources
              used for that specific guide.
            </p>
            <div className="source-list">
              {sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  <span>{source.label}</span>
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="about-aside" data-reveal-group>
          <div className="about-aside__card">
            <p className="eyebrow">About the experience</p>
            <h2>No streak guilt.</h2>
            <p>
              The streak is a small nudge, not a debt. Missing a day resets the count, but your
              lessons and XP stay exactly where they were.
            </p>
          </div>

          <div className="about-aside__card about-aside__card--accent">
            <p className="eyebrow">A useful reminder</p>
            <h2>Start smaller than you think.</h2>
            <p>
              One pot is a real garden. Get that rhythm right, then add the next thing when it feels
              easy.
            </p>
          </div>

          <nav className="about-aside__nav" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <Link to="/about#what">What it does</Link>
            <Link to="/about#progress">Progress and privacy</Link>
            <Link to="/about#offline">Install and offline</Link>
            <Link to="/about#assumptions">Assumptions</Link>
            <Link to="/about#sources">Sources</Link>
          </nav>

          <p className="about-version">Orchard Home Gnome · prototype v1.0</p>
        </aside>
      </div>

      <dialog
        ref={dialogRef}
        className="confirm-dialog"
        aria-labelledby="reset-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="confirm-dialog__panel">
          <button
            type="button"
            className="icon-button confirm-dialog__close"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close reset dialog"
          >
            <X size={20} />
          </button>
          <span className="confirm-dialog__icon">
            <RefreshCw size={24} aria-hidden="true" />
          </span>
          <p className="eyebrow">Start fresh</p>
          <h2 id="reset-title">Reset all progress?</h2>
          <p>
            This removes XP, streaks, completed lessons, quiz scores and visited growth stages from
            this browser. It cannot be undone.
          </p>
          <div className="confirm-dialog__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => dialogRef.current?.close()}
            >
              Keep my progress
            </button>
            <button type="button" className="btn btn--danger" onClick={confirmReset}>
              <Trash2 size={17} aria-hidden="true" />
              Reset everything
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
