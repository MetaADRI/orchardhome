import { createContext } from 'react';

export interface ProgressState {
  version: 1;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
  quizBest: number;
  quizCompleted: boolean;
  growthStages: number[];
}

export interface GameContextValue extends ProgressState {
  completeLesson: (lessonId: string, xp: number) => boolean;
  recordQuiz: (score: number, total: number) => { passed: boolean; awarded: number };
  visitGrowthStage: (stage: number) => void;
  resetProgress: () => void;
  isLessonComplete: (lessonId: string) => boolean;
  isLessonUnlocked: (lessonId: string) => boolean;
  pathProgress: number;
}

export const GameContext = createContext<GameContextValue | null>(null);
