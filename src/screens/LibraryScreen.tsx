import { useMemo, useState } from 'react';
import { ArrowRight, Search, Sprout, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Gnome from '../components/Gnome';
import PageIntro from '../components/PageIntro';
import PlantCard from '../components/PlantCard';
import { plantCategories, plants, type PlantCategory } from '../data/plants';

type CategoryFilter = 'All' | PlantCategory;

export default function LibraryScreen() {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    return plants.filter((plant) => {
      const matchesCategory = category === 'All' || plant.category === category;
      const matchesQuery =
        normalised.length === 0 ||
        `${plant.name} ${plant.botanicalName} ${plant.category} ${plant.tagline} ${plant.bestFor}`
          .toLowerCase()
          .includes(normalised);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="page">
      <PageIntro
        eyebrow="Nine places to begin"
        title="The plant library"
        lead="Practical growing guides for fruit trees, vegetables and herbs that can find a home in a Zambian garden, courtyard or windowsill."
        actions={
          <Link to="/small-space" className="btn btn--secondary">
            <Sprout size={18} aria-hidden="true" />
            Help me choose for my space
          </Link>
        }
        aside={
          <div className="library-aside">
            <Gnome pose="thinking" className="library-aside__gnome" />
            <div>
              <p className="eyebrow">A good rule</p>
              <p>
                Start with one plant you will actually use. A happy herb in a pot beats a whole
                orchard you cannot keep up with.
              </p>
            </div>
          </div>
        }
      />

      <section className="library-toolbar" aria-label="Filter the plant library" data-reveal>
        <div className="filter-tabs" role="group" aria-label="Plant category">
          {plantCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-tab ${category === item ? 'is-active' : ''}`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
              {item === 'All' && <span>{plants.length}</span>}
            </button>
          ))}
        </div>

        <label className="search-field">
          <span className="sr-only">Search plants</span>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tomato, mint, fruit tree…"
          />
          {query && (
            <button
              type="button"
              className="search-field__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </section>

      <div className="library-results" aria-live="polite" data-reveal>
        <p>
          Showing <strong>{filtered.length}</strong> of {plants.length} guides
          {query && <> for “{query}”</>}
        </p>
        <span>{category === 'All' ? 'Every kind of grower' : category}</span>
      </div>

      {filtered.length > 0 ? (
        <div className="plant-grid" data-reveal-group>
          {filtered.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state__icon">
            <Search size={26} aria-hidden="true" />
          </span>
          <h2>No plant matches that search.</h2>
          <p>Try a shorter word or clear the filters to see all nine guides.</p>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      <section className="library-cta" data-reveal>
        <div>
          <p className="eyebrow">Not sure where to start?</p>
          <h2>Three friendly first crops</h2>
          <p>
            Try a cherry tomato in a sunny pot, mint on a shaded step, or kale in the cooler months.
            Each guide starts with what you need and walks you through it.
          </p>
        </div>
        <div className="library-cta__links">
          <Link to="/plant/tomato" className="chip-link">
            Tomato <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link to="/plant/mint" className="chip-link">
            Mint <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link to="/plant/kale" className="chip-link">
            Kale <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
