import type { MouseEvent } from 'react';
import { Leaf } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import BottomNav from './BottomNav';

export default function AppLayout() {
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const main = document.getElementById('main-content');
    main?.focus();
    main?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content" onClick={skipToContent}>
        Skip to content
      </a>
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer" data-reveal>
        <div className="site-footer__brand">
          <Leaf size={17} aria-hidden="true" />
          <span>Orchard Home Gnome</span>
        </div>
        <p>An original student prototype for learning to grow food where you are.</p>
        <div className="site-footer__links">
          <Link to="/about">About the prototype</Link>
          <Link to="/library">Plant library</Link>
          <Link to="/about#sources">Sources</Link>
        </div>
      </footer>
      <BottomNav />
    </div>
  );
}
