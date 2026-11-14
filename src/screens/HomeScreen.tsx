import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Flame,
  Flower2,
  Lightbulb,
  ShoppingBasket,
  Sparkles,
  Sprout,
  Star,
  TrendingUp,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';
import LearningPath from '../components/LearningPath';
import PlantArt from '../components/PlantArt';
import ProgressBar from '../components/ProgressBar';
import { useGame } from '../contexts/useGame';
import { learningPath } from '../data/lessons';
import { getPlant } from '../data/plants';

const quickLinks = [
  {
    to: '/library',
    label: 'Plant library',
    text: '9 growing guides',
    icon: BookOpen,
    tone: 'leaf'
  },
  {
    to: '/small-space',
    label: 'Small spaces',
    text: 'Pots, light and layout',
    icon: Flower2,
    tone: 'sky'
  },
  {
    to: '/growth',
    label: 'Growth stages',
    text: 'See a tomato grow',
    icon: TrendingUp,
    tone: 'sun'
  },
  {
    to: '/harvest',
    label: 'Harvest',
    text: 'Read the signs',
    icon: ShoppingBasket,
    tone: 'clay'
  },
  {
    to: '/quiz',
    label: 'Checkpoint',
    text: 'Test your know-how',
    icon: Trophy,
    tone: 'berry'
  }
];

const fieldNotes = [
  {
    title: 'Check before you water',
    body: 'Push a finger a few centimetres into the soil. If it is dry down there, water slowly at the base. If it is still damp, wait.',
    icon: 'water'
  },
  {
    title: 'More sun, more growth',
    body: 'Watch where the light falls in the morning and afternoon. Most food crops want at least four to six hours of direct sun.',
    icon: 'sun'
  },
  {
    title: 'Pick little and often',
    body: 'Beans, kale and tomatoes respond to regular harvesting. Leaving overripe fruit on the plant slows the next round.',
    icon: 'harvest'
  },
  {
    title: 'Keep the roots cool',
    body: 'A layer of dry mulch around a plant helps hold moisture and keeps the soil temperature steadier.',
    icon: 'mulch'
  }
];

const tomato = getPlant('tomato');

function greetingForHour(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const { xp, streak, completedLessons, pathProgress, quizBest, isLessonUnlocked } = useGame();
  const nextNode = learningPath.find(
    (node) => !completedLessons.includes(node.id) && isLessonUnlocked(node.id)
  );
  const completedCount = learningPath.filter((node) => completedLessons.includes(node.id)).length;
  const [today] = useState(() => {
    const now = new Date();
    return {
      dateLabel: now.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      }),
      greeting: greetingForHour(now.getHours()),
      tip: fieldNotes[Math.floor(now.getTime() / 86_400_000) % fieldNotes.length]
    };
  });
  const allDone = completedCount === learningPath.length;
  const TipIcon = today.tip.icon === 'water' ? Sparkles : today.tip.icon === 'sun' ? Star : today.tip.icon === 'harvest' ? ShoppingBasket : Sprout;

  return (
    <div className="page home-page">
      <header className="home-intro" data-reveal>
        <div className="home-intro__copy">
          <p className="eyebrow">{today.dateLabel}</p>
          <h1>
            {today.greeting}, <span className="ink-soft">grower.</span>
          </h1>
          <p>
            A little time outside is still progress. Your next step is ready whenever you are.
          </p>
          <div className="home-intro__actions">
            {nextNode ? (
              <Link to={nextNode.route} className="btn btn--primary">
                {completedCount === 0 ? 'Begin your path' : 'Continue learning'}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ) : (
              <Link to="/library" className="btn btn--primary">
                Browse the plant library
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
            <Link to="/about" className="btn btn--ghost">
              How this prototype works
            </Link>
          </div>
        </div>

        <div className="home-patch-card">
          <div className="home-patch-card__top">
            <span className="home-patch-card__icon">
              <Sprout size={20} aria-hidden="true" />
            </span>
            <span>
              <small>Your growing patch</small>
              <strong>{completedCount} of {learningPath.length} steps</strong>
            </span>
            <span className="home-patch-card__percent">{Math.round(pathProgress * 100)}%</span>
          </div>
          <ProgressBar value={pathProgress * 100} label="Growing path progress" tone="sun" />
          <div className="home-patch-card__stats">
            <span>
              <Sparkles size={17} aria-hidden="true" />
              <strong>{xp}</strong> XP
            </span>
            <span>
              <Flame size={17} aria-hidden="true" />
              <strong>{streak}</strong> day streak
            </span>
            <span>
              <Trophy size={17} aria-hidden="true" />
              <strong>{quizBest}/6</strong> best quiz
            </span>
          </div>
          <div className="home-patch-card__next">
            <span className="home-patch-card__next-label">{allDone ? 'Path complete' : 'Next up'}</span>
            <strong>{allDone ? 'Keep growing your garden' : nextNode?.shortTitle}</strong>
          </div>
        </div>

        <Gnome pose={allDone ? 'celebrating' : 'teaching'} className="home-intro__gnome" />
      </header>

      <section className="quick-section" aria-labelledby="quick-heading">
        <div className="section-heading section-heading--tight">
          <div>
            <p className="eyebrow">Go straight there</p>
            <h2 id="quick-heading">Quick access</h2>
          </div>
          <p>These guides stay open, even when the path is locked.</p>
        </div>

        <div className="quick-grid" data-reveal-group>
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={`quick-card quick-card--${item.tone}`}>
                <span className="quick-card__icon">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span className="quick-card__copy">
                  <strong>{item.label}</strong>
                  <small>{item.text}</small>
                </span>
                <ArrowRight size={17} className="quick-card__arrow" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      {allDone && (
        <section className="path-complete-banner">
          <Gnome pose="celebrating" decorative className="path-complete-banner__gnome" />
          <div>
            <p className="eyebrow">Path complete</p>
            <h2>You grew a whole set of growing habits.</h2>
            <p>
              Keep the plant library close, revisit a lesson whenever you need it, and let your real
              garden take over from here.
            </p>
          </div>
          <Link to="/library" className="btn btn--primary">
            Choose your next plant
          </Link>
        </section>
      )}

      <div className="home-grid">
        <section className="path-section" aria-labelledby="path-heading" data-reveal="left">
          <div className="section-heading">
            <div>
              <p className="eyebrow">One step at a time</p>
              <h2 id="path-heading">Your growing path</h2>
            </div>
            <span className="section-heading__count">
              {completedCount}/{learningPath.length} complete
            </span>
          </div>
          <LearningPath />
        </section>

        <aside className="home-aside" data-reveal="right">
          <article className="field-note-card">
            <div className="field-note-card__top">
              <span className="field-note-card__icon">
                <TipIcon size={21} aria-hidden="true" />
              </span>
              <span className="eyebrow">Gnome’s field note</span>
            </div>
            <h2>{today.tip.title}</h2>
            <p>{today.tip.body}</p>
            <Link to="/library" className="text-link text-link--arrow">
              Find a plant to try it on
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </article>

          <article className="aside-stats-card">
            <div className="aside-stats-card__header">
              <span className="aside-stats-card__icon">
                <Lightbulb size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Little by little</p>
                <h2>Your patch</h2>
              </div>
            </div>
            <dl className="patch-stats">
              <div>
                <dt>Experience</dt>
                <dd>
                  <Sparkles size={16} aria-hidden="true" /> {xp} XP
                </dd>
              </div>
              <div>
                <dt>Current streak</dt>
                <dd>
                  <Flame size={16} aria-hidden="true" /> {streak} {streak === 1 ? 'day' : 'days'}
                </dd>
              </div>
              <div>
                <dt>Path steps</dt>
                <dd>
                  <Sprout size={16} aria-hidden="true" /> {completedCount} done
                </dd>
              </div>
            </dl>
            <p className="aside-stats-card__note">
              Progress is stored only in this browser. No account, no tracking.
            </p>
          </article>

          {tomato && (
            <article className="aside-plant-card">
              <div
                className="aside-plant-card__art"
                style={{ background: tomato.palette.background }}
              >
                <PlantArt plant={tomato} decorative />
              </div>
              <div className="aside-plant-card__copy">
                <p className="eyebrow">Good first crop</p>
                <h2>Tomato</h2>
                <p>A sunny pot, steady water and something delicious in about 60–90 days.</p>
                <Link to="/plant/tomato" className="text-link text-link--arrow">
                  Open the full guide
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          )}
        </aside>
      </div>
    </div>
  );
}
