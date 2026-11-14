import { ArrowRight, Check, Clock3, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGame } from '../contexts/useGame';
import { learningPath } from '../data/lessons';
import PathIcon from './PathIcon';

const typeLabels = {
  story: 'First steps',
  plant: 'Plant lesson',
  skill: 'Growing skill',
  quiz: 'Checkpoint',
  demo: 'Simulated demo',
  harvest: 'Harvest skill'
};

export default function LearningPath() {
  const { isLessonComplete, isLessonUnlocked } = useGame();
  const nextNode = learningPath.find(
    (node) => !isLessonComplete(node.id) && isLessonUnlocked(node.id)
  );

  return (
    <ol className="path-map" aria-label="Your growing path">
      {learningPath.map((node, index) => {
        const completed = isLessonComplete(node.id);
        const unlocked = isLessonUnlocked(node.id);
        const current = nextNode?.id === node.id;
        const side = index % 2 === 0 ? 'left' : 'right';
        const status = completed ? 'completed' : unlocked ? 'open' : 'locked';

        const cardContents = (
          <>
            <div className="path-card__topline">
              <span className={`path-card__type path-card__type--${node.accent}`}>
                {typeLabels[node.type]}
              </span>
              <span className="path-card__xp">+{node.xp} XP</span>
            </div>
            <h3>{node.title}</h3>
            <p>{node.description}</p>
            <div className="path-card__footer">
              <span className="path-card__meta">
                <Clock3 size={15} aria-hidden="true" />
                {node.duration}
              </span>
              <span className="path-card__action">
                {completed ? 'Review' : current ? 'Start now' : 'Open'}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </>
        );

        return (
          <li
            key={node.id}
            className={`path-step path-step--${side} path-step--${status} ${
              current ? 'path-step--current' : ''
            }`}
            data-reveal={side}
          >
            <div className="path-node" aria-hidden="true">
              <span className="path-node__halo" />
              <span className="path-node__circle">
                {completed ? (
                  <Check size={24} strokeWidth={3} />
                ) : unlocked ? (
                  <PathIcon icon={node.icon} size={24} />
                ) : (
                  <LockKeyhole size={20} />
                )}
              </span>
              <span className="path-node__index">{String(index + 1).padStart(2, '0')}</span>
            </div>

            {unlocked ? (
              <Link
                to={node.route}
                className={`path-card ${current ? 'path-card--current' : ''}`}
                aria-label={`${node.title}. ${completed ? 'Completed. Review lesson' : current ? 'Start this lesson' : 'Open lesson'}`}
              >
                {cardContents}
              </Link>
            ) : (
              <div className="path-card path-card--locked" aria-disabled="true">
                {cardContents}
                <span className="path-card__locked-note">
                  <LockKeyhole size={14} aria-hidden="true" />
                  Finish the step before this one to unlock
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
