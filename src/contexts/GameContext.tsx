import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { learningPath } from '../data/lessons';
import { GameContext, type GameContextValue, type ProgressState } from './game-context';

const STORAGE_KEY = 'orchard-home-gnome-progress-v1';

const defaultState: ProgressState = {
  version: 1,
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  completedLessons: [],
  quizBest: 0,
  quizCompleted: false,
  growthStages: []
};

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function todayKey() {
  return dateKey(new Date());
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return dateKey(date);
}

function loadState(): ProgressState {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;

    const parsed = JSON.parse(saved) as Partial<ProgressState>;
    return {
      version: 1,
      xp: typeof parsed.xp === 'number' ? Math.max(0, parsed.xp) : 0,
      streak: typeof parsed.streak === 'number' ? Math.max(0, parsed.streak) : 0,
      lastActiveDate: typeof parsed.lastActiveDate === 'string' ? parsed.lastActiveDate : null,
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons.filter((item): item is string => typeof item === 'string')
        : [],
      quizBest: typeof parsed.quizBest === 'number' ? parsed.quizBest : 0,
      quizCompleted: Boolean(parsed.quizCompleted),
      growthStages: Array.isArray(parsed.growthStages)
        ? parsed.growthStages.filter((item): item is number => typeof item === 'number')
        : []
    };
  } catch {
    return defaultState;
  }
}

function nextStreak(state: ProgressState) {
  const today = todayKey();
  if (state.lastActiveDate === today) return Math.max(state.streak, 1);
  if (state.lastActiveDate === yesterdayKey()) return state.streak + 1;
  return 1;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Progress still works for this session if storage is unavailable.
    }
  }, [state]);

  const completeLesson = useCallback(
    (lessonId: string, xp: number) => {
      if (state.completedLessons.includes(lessonId)) return false;

      setState((current) => {
        if (current.completedLessons.includes(lessonId)) return current;
        return {
          ...current,
          xp: current.xp + xp,
          streak: nextStreak(current),
          lastActiveDate: todayKey(),
          completedLessons: [...current.completedLessons, lessonId]
        };
      });

      return true;
    },
    [state.completedLessons]
  );

  const recordQuiz = useCallback(
    (score: number, total: number) => {
      const passed = score >= Math.ceil(total * (2 / 3));
      const awarded = passed && !state.quizCompleted ? 40 : 0;

      setState((current) => {
        const nextBest = Math.max(current.quizBest, score);
        if (passed && !current.quizCompleted) {
          return {
            ...current,
            xp: current.xp + 40,
            streak: nextStreak(current),
            lastActiveDate: todayKey(),
            quizBest: nextBest,
            quizCompleted: true,
            completedLessons: current.completedLessons.includes('quiz')
              ? current.completedLessons
              : [...current.completedLessons, 'quiz']
          };
        }

        return {
          ...current,
          quizBest: nextBest
        };
      });

      return { passed, awarded };
    },
    [state.quizCompleted]
  );

  const visitGrowthStage = useCallback((stage: number) => {
    if (!Number.isInteger(stage) || stage < 1 || stage > 5) return;

    setState((current) => {
      if (current.growthStages.includes(stage)) return current;

      const growthStages = [...current.growthStages, stage].sort((a, b) => a - b);
      const finishedDemo = [1, 2, 3, 4, 5].every((step) => growthStages.includes(step));
      const alreadyCompleted = current.completedLessons.includes('growth');

      if (finishedDemo && !alreadyCompleted) {
        return {
          ...current,
          growthStages,
          xp: current.xp + 15,
          streak: nextStreak(current),
          lastActiveDate: todayKey(),
          completedLessons: [...current.completedLessons, 'growth']
        };
      }

      return {
        ...current,
        growthStages
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(defaultState);
  }, []);

  const isLessonComplete = useCallback(
    (lessonId: string) => state.completedLessons.includes(lessonId),
    [state.completedLessons]
  );

  const isLessonUnlocked = useCallback(
    (lessonId: string) => {
      const index = learningPath.findIndex((node) => node.id === lessonId);
      if (index <= 0) return true;
      if (state.completedLessons.includes(lessonId)) return true;
      return state.completedLessons.includes(learningPath[index - 1].id);
    },
    [state.completedLessons]
  );

  const pathProgress = useMemo(
    () =>
      learningPath.filter((node) => state.completedLessons.includes(node.id)).length /
      learningPath.length,
    [state.completedLessons]
  );

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      completeLesson,
      recordQuiz,
      visitGrowthStage,
      resetProgress,
      isLessonComplete,
      isLessonUnlocked,
      pathProgress
    }),
    [
      state,
      completeLesson,
      recordQuiz,
      visitGrowthStage,
      resetProgress,
      isLessonComplete,
      isLessonUnlocked,
      pathProgress
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
