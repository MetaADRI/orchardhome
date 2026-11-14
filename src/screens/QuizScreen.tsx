import { useState, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Trophy,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';
import ProgressBar from '../components/ProgressBar';
import { useGame } from '../contexts/useGame';
import { QUIZ_PASS_MARK, quizQuestions } from '../data/lessons';

interface QuizResult {
  score: number;
  passed: boolean;
  awarded: number;
}

export default function QuizScreen() {
  const { recordQuiz, quizBest, quizCompleted } = useGame();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  const total = quizQuestions.length;
  const question = quizQuestions[index];
  const isCorrect = checked && selected === question.correctIndex;
  const progress = ((index + (checked ? 1 : 0)) / total) * 100;

  const startQuiz = () => {
    setStarted(true);
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setResult(null);
  };

  const checkAnswer = () => {
    if (selected === null || checked) return;
    setChecked(true);
    if (selected === question.correctIndex) {
      setScore((current) => current + 1);
    }
  };

  const nextQuestion = () => {
    if (index === total - 1) {
      const finalResult = recordQuiz(score, total);
      setResult({ score, ...finalResult });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIndex((current) => current + 1);
    setSelected(null);
    setChecked(false);
  };

  if (result) {
    const percent = Math.round((result.score / total) * 100);

    return (
      <div className="page quiz-page">
        <Link to="/home" className="back-link">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to your path
        </Link>

        <section
          className={`quiz-result ${result.passed ? 'is-passed' : 'is-retry'}`}
          data-reveal="scale"
        >
          <div className="quiz-result__gnome">
            <Gnome pose={result.passed ? 'celebrating' : 'thinking'} />
          </div>
          <div className="quiz-result__copy">
            <p className="eyebrow">{result.passed ? 'Checkpoint passed' : 'Checkpoint not passed yet'}</p>
            <h1>
              {result.passed
                ? result.awarded > 0
                  ? 'Your growing knowledge is taking root.'
                  : 'Still sharp on the basics.'
                : 'A good try. The next one will be better.'}
            </h1>
            <p>
              {result.passed
                ? `You scored ${result.score} out of ${total}. That is enough to open the next stretch of the path.`
                : `You scored ${result.score} out of ${total}. You need ${QUIZ_PASS_MARK} to pass. Read the explanations, then try again.`}
            </p>

            <div
              className="score-ring"
              style={{ '--score-percent': `${percent * 3.6}deg` } as CSSProperties}
            >
              <span>
                <strong>{result.score}</strong>
                <small>out of {total}</small>
              </span>
            </div>

            <div className="quiz-result__stats">
              <span>
                <Trophy size={17} aria-hidden="true" />
                Best: {Math.max(quizBest, result.score)}/{total}
              </span>
              <span>
                <Sparkles size={17} aria-hidden="true" />
                {result.awarded > 0 ? `+${result.awarded} XP earned` : 'Best score saved'}
              </span>
            </div>

            <div className="quiz-result__actions">
              {result.passed ? (
                <>
                  <Link to="/growth" className="btn btn--primary">
                    Continue to growth stages
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <Link to="/home" className="btn btn--ghost">
                    Back to your path
                  </Link>
                </>
              ) : (
                <>
                  <button type="button" className="btn btn--primary" onClick={startQuiz}>
                    <RefreshCw size={18} aria-hidden="true" />
                    Try the quiz again
                  </button>
                  <Link to="/home" className="btn btn--ghost">
                    Review the path
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="quiz-review">
          <div className="section-heading section-heading--tight">
            <div>
              <p className="eyebrow">What the quiz covers</p>
              <h2>Keep these ideas close</h2>
            </div>
          </div>
          <div className="quiz-review__grid">
            <article>
              <span>01</span>
              <h3>Light and place</h3>
              <p>Match the plant to the sun your space actually receives.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Water and drainage</h3>
              <p>Check the soil, water at the base, and let extra water escape.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Timing and patience</h3>
              <p>Some crops are quick. Fruit trees ask for years, not weeks.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Harvest gently</h3>
              <p>Pick often, leave the growing centre, and protect the plant.</p>
            </article>
          </div>
        </section>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="page quiz-page">
        <Link to="/home" className="back-link">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to your path
        </Link>

        <section className="quiz-intro" data-reveal>
          <div className="quiz-intro__copy">
            <p className="eyebrow">Grower’s checkpoint</p>
            <h1>Six quick questions. No pressure.</h1>
            <p>
              This is a friendly check on the basics you have met so far: light, water, drainage,
              patience and harvest. You can retake it as many times as you like.
            </p>

            <div className="quiz-rules">
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                {total} multiple-choice questions
              </span>
              <span>
                <Award size={18} aria-hidden="true" />
                Score {QUIZ_PASS_MARK} or more to pass
              </span>
              <span>
                <RefreshCw size={18} aria-hidden="true" />
                Retake whenever you need
              </span>
            </div>

            <div className="quiz-intro__actions">
              <button type="button" className="btn btn--primary" onClick={startQuiz}>
                {quizCompleted ? 'Retake the checkpoint' : 'Start the checkpoint'}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <Link to="/home" className="btn btn--ghost">
                Keep learning first
              </Link>
            </div>

            <p className="quiz-best">
              <Trophy size={16} aria-hidden="true" />
              Your best so far: <strong>{quizBest}/{total}</strong>
              {quizCompleted && ' · Checkpoint complete'}
            </p>
          </div>

          <div className="quiz-intro__card">
            <Gnome pose="teaching" />
            <div className="quiz-intro__note">
              <span>
                <Sparkles size={18} aria-hidden="true" />
              </span>
              <p>
                Read each explanation, even when you get it right. That is where the useful detail
                lives.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page quiz-page">
      <div className="lesson-topbar">
        <button type="button" className="back-link" onClick={() => setStarted(false)}>
          <ArrowLeft size={17} aria-hidden="true" />
          Leave the checkpoint
        </button>
        <span className="quiz-progress-label">
          Question {index + 1} of {total}
        </span>
      </div>

      <div className="quiz-progress">
        <ProgressBar value={progress} label="Quiz progress" tone="berry" compact />
      </div>

      <section className="quiz-card" data-reveal>
        <div className="quiz-card__top">
          <span className="quiz-card__number">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="quiz-card__score">
            <Trophy size={15} aria-hidden="true" />
            {score} correct
          </span>
        </div>

        <h1>{question.question}</h1>

        <div className="answer-list" role="group" aria-label="Answer options">
          {question.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex;
            const isRight = checked && optionIndex === question.correctIndex;
            const isWrong = checked && isSelected && !isCorrect;

            return (
              <button
                key={option}
                type="button"
                className={`answer-option ${isSelected ? 'is-selected' : ''} ${
                  isRight ? 'is-right' : ''
                } ${isWrong ? 'is-wrong' : ''}`}
                onClick={() => !checked && setSelected(optionIndex)}
                disabled={checked}
                aria-pressed={isSelected}
              >
                <span className="answer-option__letter">
                  {String.fromCharCode(65 + optionIndex)}
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
            <strong>{isCorrect ? 'Correct.' : 'Not quite.'}</strong>
            <p>{question.explanation}</p>
          </div>
        )}

        <div className="quiz-card__actions">
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
          ) : (
            <button type="button" className="btn btn--primary" onClick={nextQuestion}>
              {index === total - 1 ? 'See my result' : 'Next question'}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
