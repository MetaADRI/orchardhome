import type { CSSProperties } from 'react';
import { ArrowUpRight, Clock3, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Plant } from '../data/plants';
import PlantArt from './PlantArt';

export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      to={`/plant/${plant.id}`}
      className="plant-card"
      aria-label={`Open the ${plant.name} growing guide`}
    >
      <div
        className="plant-card__art"
        style={{ '--art-bg': plant.palette.background } as CSSProperties}
      >
        <span className="plant-card__category">{plant.category}</span>
        <span className={`difficulty difficulty--${plant.difficulty.toLowerCase()}`}>
          {plant.difficulty}
        </span>
        <PlantArt plant={plant} className="plant-card__illustration" />
      </div>

      <div className="plant-card__body">
        <div className="plant-card__title-row">
          <div>
            <h3>{plant.name}</h3>
            <p className="plant-card__botanical">{plant.botanicalName}</p>
          </div>
          <span className="plant-card__arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <p className="plant-card__tagline">{plant.tagline}</p>

        <div className="plant-card__facts">
          <span>
            <Sun size={15} aria-hidden="true" />
            {plant.sun.split(' · ')[0]}
          </span>
          <span>
            <Clock3 size={15} aria-hidden="true" />
            {plant.harvestTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
