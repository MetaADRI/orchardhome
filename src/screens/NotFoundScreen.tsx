import { ArrowRight, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';

export default function NotFoundScreen() {
  return (
    <div className="page">
      <section className="not-found" data-reveal="scale">
        <div className="not-found__gnome">
          <Gnome pose="thinking" />
        </div>
        <p className="eyebrow">A wrong turn in the garden</p>
        <h1>This path has not been planted.</h1>
        <p>
          The page you followed does not exist, or the link has changed. Your progress is still safe.
        </p>
        <div className="not-found__actions">
          <Link to="/home" className="btn btn--primary">
            Back to your path
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/library" className="btn btn--secondary">
            <Sprout size={18} aria-hidden="true" />
            Browse the plant library
          </Link>
        </div>
      </section>
    </div>
  );
}
