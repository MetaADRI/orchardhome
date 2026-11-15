import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/useTheme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'is-dark' : ''} ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
        <Sun size={13} strokeWidth={2.4} />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
        <Moon size={13} strokeWidth={2.4} />
      </span>
      <span className="theme-toggle__thumb" aria-hidden="true" />
    </button>
  );
}
