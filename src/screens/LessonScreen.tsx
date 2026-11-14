import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  LockKeyhole,
  Sparkles,
  Sprout,
  X
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Gnome from '../components/Gnome';
import PlantArt from '../components/PlantArt';
import ProgressBar from '../components/ProgressBar';
import { useGame } from '../contexts/useGame';
import { learningPath, lessonContent } from '../data/lessons';
import { getPlant } from '../data/plants';

export default function LessonScreen() {
  const { lessonId } = useParams();
  const content = lessonId ? lessonContent[lessonId] : undefined;
  const node = learningPath.find((item) => item.id === lessonId);
  const { completeLesson, isLessonUnlocked } = useGame();

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  if (!content || !node || lessonId === 'quiz' || lessonId === 'growth') {
    return <Navigate to="/home" replace />;
  }

  if (!isLessonUnlocked(node.id)) {
    return <Navigate to="/home" replace />;
  }

  const guidePlant = content.guidePlantId ? getPlant(content.guidePlantId) : undefined;
  const checkStep = content.notes.length;
  const atCheck = step === checkStep;
  const totalSteps = content.notes.length + 1;
  const progress = done ? 100 : (step / totalSteps) * 100;
  const isCorrect = checked && selected === content.check.correctIndex;

  const selectOption = (index: number) => {
    if (checked) return;
    setSelected(index);
  };

  const checkAnswer = () => {
    if (selected === null) return;
    setChecked(true);
  };

  const continueLesson = () => {
    if (atCheck) {
      if (!checked) {
        checkAnswer();
        return;
      }
      if (!isCorrect) {
        setChecked(false);
        setSelected(null);
        return;
      }

      const awarded = completeLesson(node.id, node.xp);
      setEarnedXp(awarded ? node.xp : 0);
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setStep((current) => current + 1);
    setSelected(null);
    setChecked(false);
  };

  if (done) {
    return (
      <div className="page lesson-page">
        <Link to="/home" className="back-link">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to your path
        </Link>
        <section className="lesson-complete" data-reveal="scale">
          <div className="lesson-complete__art">
            <Gnome pose="celebrating" className="lesson-complete__gnome" />
          </div>
          <div className="lesson-complete__copy">
            <p className="eyebrow">Lesson complete</p>
            <h1>{earnedXp > 0 ? 'A new growing habit, planted.' : 'A good review.'}</h1>
            <p>{content.finishMessage}</p>
            <div className="lesson-complete__reward">
              <span>
                <Sparkles size={18} aria-hidden="true" />
                {earnedXp > 0 ? `+${earnedXp} XP` : 'No extra XP on review'}
              </span>
              <span>{earnedXp > 0 ? 'Completed' : 'Reviewed'}</span>
            </div>
            <div className="lesson-complete__actions">
              <Link to="/home" className="btn btn--primary">
                Back to your path
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              {guidePlant ? (
                <Link to={`/plant/${guidePlant.id}`} className="btn btn--secondary">
                  <BookOpen size={18} aria-hidden="true" />
                  Read the full {guidePlant.name.toLowerCase()} guide
                </Link>
              ) : (
                <Link to="/library" className="btn btn--secondary">
                  <BookOpen size={18} aria-hidden="true" />
                  Explore the plant library
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const note = atCheck ? null : content.notes[step];

  return (
    <div className="page lesson-page">
      <div className="lesson-topbar">
        <Link to="/home" className="back-link">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to your path
        </Link>
        <div className="lesson-topbar__meta">
          <span>
            <Clock3 size={15} aria-hidden="true" />
            {node.duration}
          </span>
          <span>
            <Sparkles size={15} aria-hidden="true" />
            +{node.xp} XP
          </span>
        </div>
      </div>

      <section className="lesson-hero" data-reveal>
        <div>
          <p className="eyebrow">{content.kicker}</p>
          <h1>{node.title}</h1>
          <p>{content.intro}</p>
        </div>
        <div className="lesson-hero__badge" aria-hidden="true">
          <Sprout size={28} />
        </div>
      </section>

      <div className="lesson-progress-row">
        <ProgressBar value={progress} label="Lesson progress" tone={node.accent} compact />
        <span>
          Step {Math.min(step + 1, totalSteps)} of {totalSteps}
        </span>
      </div>

      <div className="lesson-layout">
        <section className="lesson-stage" aria-live="polite" data-reveal="left">
          {!atCheck && note ? (
            <article className="note-card">
              <div className="note-card__top">
                <span className="note-card__count">
                  Field note {step + 1} of {content.notes.length}
                </span>
                <span className="note-card__mark" aria-hidden="true">
                  <Sprout size={19} />
                </span>
              </div>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
              <button type="button" className="btn btn--primary" onClick={continueLesson}>
                Next note
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </article>
          ) : (
            <article className="check-card">
              <div className="check-card__top">
                <span className="note-card__count">Quick check</span>
                <span className="check-card__icon" aria-hidden="true">
                  <BookOpen size={20} />
                </span>
              </div>
              <h2>{content.check.question}</h2>
              <div className="answer-list" role="group" aria-label="Answer options">
                {content.check.options.map((option, index) => {
                  const isSelected = selected === index;
                  const isRight = checked && index === content.check.correctIndex;
                  const isWrong = checked && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`answer-option ${isSelected ? 'is-selected' : ''} ${
                        isRight ? 'is-right' : ''
                      } ${isWrong ? 'is-wrong' : ''}`}
                      onClick={() => selectOption(index)}
                      disabled={checked}
                      aria-pressed={isSelected}
                    >
                      <span className="answer-option__letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {isRight && <Check size={18} className="answer-option__state" aria-hidden="true" />}
                      {isWrong && <X size={18} className="answer-option__state" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              {checked && (
                <div className={`feedback ${isCorrect ? 'feedback--correct' : 'feedback--wrong'}`} role="status">
                  <strong>{isCorrect ? 'That’s it.' : 'Not quite yet.'}</strong>
                  <p>{content.check.explanation}</p>
                </div>
              )}

              <div className="check-card__actions">
                {!checked ? (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={checkAnswer}
                    disabled={selected === null}
                  >
                    Check answer
                    <Check size={18} aria-hidden="true" />
                  </button>
                ) : isCorrect ? (
                  <button type="button" className="btn btn--primary" onClick={continueLesson}>
                    Finish lesson
                    <Sparkles size={18} aria-hidden="true" />
                  </button>
                ) : (
                  <button type="button" className="btn btn--secondary" onClick={continueLesson}>
                    Try again
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          )}
        </section>

        <aside className="lesson-guide" data-reveal="right">
          {guidePlant ? (
            <>
              <div
                className="lesson-guide__art"
                style={{ background: guidePlant.palette.background }}
              >
                <PlantArt plant={guidePlant} />
              </div>
              <p className="eyebrow">Go deeper</p>
              <h2>{guidePlant.name}</h2>
              <p>{guidePlant.tagline}</p>
              <Link to={`/plant/${guidePlant.id}`} className="text-link text-link--arrow">
                Open the full growing guide
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </>
          ) : (
            <>
              <Gnome pose="thinking" className="lesson-guide__gnome" />
              <p className="eyebrow">Gnome’s reminder</p>
              <h2>Observe first.</h2>
              <p>
                Light, water and drainage tell you more than any label. Look at your space before
                you buy a plant.
              </p>
            </>
          )}

          <div className="lesson-guide__tip">
            <LockKeyhole size={18} aria-hidden="true" />
            <p>
              Complete this lesson to unlock the next step on your path. Quick guides stay open
              whenever you need them.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
