import { Flame, Home, Info, Library, Sparkles, TrendingUp, Trophy } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useGame } from '../contexts/useGame';
import InstallButton from './InstallButton';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/growth', label: 'Growth', icon: TrendingUp },
  { to: '/quiz', label: 'Quiz', icon: Trophy },
  { to: '/about', label: 'About', icon: Info }
];

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="23" fill="#1f5d43" />
        <path d="M14 23c3-8 8-13 16-16 1 9-3 15-11 18l-5-2Z" fill="#c8e07a" />
        <path d="M24 16c-1 7-2 13-6 19" stroke="#fbf7ee" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 28c6-3 12-2 17 2-5 5-11 5-17-2Z" fill="#f2b544" />
        <path d="M30 35c0-7 3-12 9-15 1 8-2 13-9 15Z" fill="#f4a261" />
      </svg>
    </span>
  );
}

export default function AppHeader() {
  const { xp, streak } = useGame();

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/home" className="brand" aria-label="Orchard Home Gnome, go to home">
          <BrandMark />
          <span className="brand__copy">
            <strong>Orchard</strong>
            <span>Home Gnome</span>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `header-nav__link ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="header-tools">
          <div className="stat-pill" aria-label={`${streak} day growing streak`}>
            <Flame size={16} aria-hidden="true" />
            <span>{streak}</span>
          </div>
          <div className="stat-pill stat-pill--xp" aria-label={`${xp} experience points`}>
            <Sparkles size={16} aria-hidden="true" />
            <span>{xp}</span>
            <span className="stat-pill__unit">XP</span>
          </div>
          <ThemeToggle />
          <InstallButton compact />
        </div>
      </div>
    </header>
  );
}
