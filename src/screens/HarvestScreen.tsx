import { useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  Check,
  Clock3,
  Leaf,
  Scissors,
  ShoppingBasket,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PlantArt from '../components/PlantArt';
import { getPlant, plants, type PlantArtKind } from '../data/plants';

const harvestCrops = plants.filter((plant) =>
  ['tomato', 'beans', 'kale', 'mint', 'basil', 'plum', 'peach', 'apple', 'pomegranate'].includes(
    plant.id
  )
);

const pickMethods: Record<PlantArtKind, { title: string; body: string }[]> = {
  tomato: [
    {
      title: 'Cup the fruit',
      body: 'Support the tomato with your hand and twist gently at the stem. Do not pull the vine towards you.'
    },
    {
      title: 'Pick at the right colour',
      body: 'Use colour, firmness and scent together. A tomato can colour before it is ready to eat.'
    },
    {
      title: 'Keep the vine intact',
      body: 'Leave the green truss and unripe fruit attached. The plant will keep ripening the rest.'
    }
  ],
  bean: [
    {
      title: 'Hold the stem',
      body: 'Steady the plant with one hand while you pick with the other, so you do not tear the roots loose.'
    },
    {
      title: 'Snap young pods',
      body: 'Choose smooth, tender pods. Pick every few days so the plant keeps flowering.'
    },
    {
      title: 'Leave seed pods',
      body: 'Only leave pods to grow fat if you plan to save seed. Otherwise, regular picking keeps production going.'
    }
  ],
  kale: [
    {
      title: 'Start from the outside',
      body: 'Take the lowest, largest outer leaves first and work upwards around the plant.'
    },
    {
      title: 'Protect the centre',
      body: 'Leave the small growing leaves in the middle so the plant can keep producing.'
    },
    {
      title: 'Snap or snip cleanly',
      body: 'Use your fingers or clean scissors close to the stem. Avoid tearing the main stalk.'
    }
  ],
  herb: [
    {
      title: 'Pinch the tips',
      body: 'Take the top pair of leaves with your fingertips, just above a lower pair of leaves.'
    },
    {
      title: 'Harvest before flowering',
      body: 'Leaves are usually sweetest before flowers open. Remove flower buds on basil to keep it leafy.'
    },
    {
      title: 'Take only a third',
      body: 'Leave most of the plant to recover. Regular light picking keeps herbs bushy.'
    }
  ],
  tree: [
    {
      title: 'Cup and lift',
      body: 'Hold the fruit in your palm and lift gently. Ripe fruit should release with a small twist.'
    },
    {
      title: 'Use two hands',
      body: 'Support the branch while picking so heavy fruit does not tear the wood.'
    },
    {
      title: 'Pick in stages',
      body: 'Fruit on the same tree may ripen at different times. Check every few days rather than stripping it all at once.'
    }
  ]
};

export default function HarvestScreen() {
  const [selectedId, setSelectedId] = useState('tomato');
  const plant = getPlant(selectedId) ?? harvestCrops[0];
  const method = pickMethods[plant.art];

  return (
    <div className="page">
      <section className="harvest-hero">
        <div className="harvest-hero__copy" data-reveal="left">
          <p className="eyebrow">The reward, done gently</p>
          <h1>Know when to pick.</h1>
          <p>
            Colour is a clue, not the whole story. Check size, firmness and scent, then pick in a way
            that protects the plant and leaves more to come.
          </p>
          <Link to="/harvest#crop-selector" className="btn btn--primary">
            Choose your crop
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="harvest-hero__visual" data-reveal="right">
          <span className="harvest-hero__basket">
            <ShoppingBasket size={54} aria-hidden="true" />
          </span>
          <div className="harvest-hero__tomato">
            <PlantArt plant={getPlant('tomato')!} />
          </div>
          <span className="harvest-hero__tag">Pick little, pick often</span>
        </div>
      </section>

      <section
        id="crop-selector"
        className="harvest-selector"
        aria-labelledby="crop-heading"
        data-reveal
      >
        <div className="section-heading section-heading--tight">
          <div>
            <p className="eyebrow">Your crop</p>
            <h2 id="crop-heading">What are you harvesting?</h2>
          </div>
          <span className="section-heading__count">{harvestCrops.length} guides</span>
        </div>
        <div className="crop-tabs" role="group" aria-label="Choose a crop">
          {harvestCrops.map((crop) => (
            <button
              key={crop.id}
              type="button"
              className={`crop-tab ${plant.id === crop.id ? 'is-active' : ''}`}
              onClick={() => setSelectedId(crop.id)}
              aria-pressed={plant.id === crop.id}
            >
              <span
                className="crop-tab__dot"
                style={{ background: crop.palette.fruit }}
                aria-hidden="true"
              />
              {crop.name}
            </button>
          ))}
        </div>
      </section>

      <div className="harvest-detail">
        <section
          className="harvest-card"
          style={{ '--harvest-bg': plant.palette.background } as CSSProperties}
          data-reveal
        >
          <div className="harvest-card__art">
            <PlantArt plant={plant} />
          </div>
          <div className="harvest-card__copy">
            <p className="eyebrow">{plant.category}</p>
            <h2>{plant.name}</h2>
            <p>{plant.tagline}</p>
            <span className="harvest-card__time">
              <Clock3 size={16} aria-hidden="true" />
              {plant.harvestTime}
            </span>
          </div>
        </section>

        <div className="harvest-info-grid">
          <section className="harvest-signs" aria-labelledby="signs-heading" data-reveal="left">
            <div className="harvest-section-heading">
              <span className="harvest-section-heading__icon">
                <Sparkles size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Look for these</p>
                <h2 id="signs-heading">Signs it is ready</h2>
              </div>
            </div>
            <ul className="check-list">
              {plant.harvestSigns.map((sign) => (
                <li key={sign}>
                  <span className="check-list__icon">
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {sign}
                </li>
              ))}
            </ul>
          </section>

          <section className="harvest-method" aria-labelledby="method-heading" data-reveal="right">
            <div className="harvest-section-heading">
              <span className="harvest-section-heading__icon">
                <Scissors size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Do it gently</p>
                <h2 id="method-heading">How to pick</h2>
              </div>
            </div>
            <ol className="method-list">
              {method.map((item, index) => (
                <li key={item.title}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="harvest-tip" data-reveal>
          <span className="harvest-tip__icon">
            <Leaf size={21} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">{plant.name} field note</p>
            <p>{plant.tip}</p>
          </div>
          <Link to={`/plant/${plant.id}`} className="btn btn--secondary">
            Full growing guide
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </div>

      <section className="after-harvest" data-reveal>
        <div>
          <p className="eyebrow">After the basket</p>
          <h2>Keep the harvest coming</h2>
        </div>
        <div className="after-harvest__grid" data-reveal-group>
          <article>
            <span>01</span>
            <h3>Use it fresh</h3>
            <p>Home-grown food is often at its best soon after picking. Plan a meal around what is ready.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Clean up</h3>
            <p>Clear fallen leaves and overripe fruit so pests and disease have less to feed on.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Keep observing</h3>
            <p>Note what worked and when it ripened. Your own garden record becomes the best guide.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
