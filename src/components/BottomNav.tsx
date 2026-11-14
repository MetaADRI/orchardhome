import { Home, Info, Library, TrendingUp, Trophy } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/growth', label: 'Growth', icon: TrendingUp },
  { to: '/quiz', label: 'Quiz', icon: Trophy },
  { to: '/about', label: 'About', icon: Info }
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `bottom-nav__link ${isActive ? 'is-active' : ''}`}
          >
            <span className="bottom-nav__icon">
              <Icon size={21} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
