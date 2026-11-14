import type { Plant } from '../data/plants';

interface PlantArtProps {
  plant: Plant;
  className?: string;
  decorative?: boolean;
}

function Fruit({ plant, x, y }: { plant: Plant; x: number; y: number }) {
  const { fruit, fruitLight } = plant.palette;

  if (plant.id === 'plum') {
    return (
      <g>
        <ellipse cx={x} cy={y} rx="9" ry="11" fill={fruit} />
        <ellipse cx={x - 2} cy={y - 3} rx="3" ry="4" fill={fruitLight} opacity="0.8" />
        <path d={`M${x} ${y - 10}c1-3 4-5 7-5`} stroke="#5d4732" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    );
  }

  if (plant.id === 'pomegranate') {
    return (
      <g>
        <circle cx={x} cy={y} r="9" fill={fruit} />
        <circle cx={x - 2} cy={y - 3} r="3" fill={fruitLight} opacity="0.7" />
        <path d={`M${x - 4} ${y - 9}l1-4 3 3 2-4 2 4 3-3 1 4`} fill={fruit} stroke={fruit} strokeWidth="1" />
      </g>
    );
  }

  if (plant.id === 'peach') {
    return (
      <g>
        <circle cx={x} cy={y} r="9.5" fill={fruit} />
        <circle cx={x - 2} cy={y - 4} r="3.4" fill={fruitLight} opacity="0.65" />
        <path d={`M${x} ${y - 9}c-1-4 1-7 5-9 1 4-1 7-5 9Z`} fill={plant.palette.foliageLight} />
      </g>
    );
  }

  return (
    <g>
      <circle cx={x} cy={y} r="9" fill={fruit} />
      <circle cx={x - 3} cy={y - 4} r="3" fill={fruitLight} opacity="0.7" />
      <path d={`M${x} ${y - 9}l1-5M${x + 1} ${y - 12}c4-2 7-1 9 2-3 3-6 3-9-2Z`} stroke="#4d3828" strokeWidth="1.7" fill={plant.palette.foliageLight} strokeLinecap="round" />
    </g>
  );
}

function TreeArt({ plant }: { plant: Plant }) {
  const { foliage, foliageLight, pot } = plant.palette;

  return (
    <g>
      <ellipse cx="160" cy="174" rx="94" ry="13" fill="#16352b" opacity="0.09" />
      <ellipse cx="160" cy="169" rx="76" ry="10" fill={foliage} opacity="0.22" />
      <path d="M154 171c-2-28-1-53 5-72h9c4 19 5 45 2 72h-16Z" fill={pot} />
      <path d="M160 117c-11-13-21-23-35-30M164 124c11-15 22-25 36-32M160 105c-4-12-4-23 0-31" stroke={pot} strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="112" cy="82" r="31" fill={foliage} opacity="0.94" />
      <circle cx="153" cy="61" r="38" fill={foliageLight} />
      <circle cx="199" cy="82" r="30" fill={foliage} opacity="0.92" />
      <circle cx="134" cy="96" r="28" fill={foliageLight} opacity="0.75" />
      <circle cx="183" cy="103" r="25" fill={foliage} opacity="0.8" />
      <circle cx="124" cy="64" r="4" fill="#fffdf8" opacity="0.18" />
      <circle cx="171" cy="48" r="5" fill="#fffdf8" opacity="0.15" />
      <Fruit plant={plant} x={113} y={91} />
      <Fruit plant={plant} x={151} y={69} />
      <Fruit plant={plant} x={193} y={88} />
      <Fruit plant={plant} x={173} y={111} />
      <Fruit plant={plant} x={136} y={116} />
      {plant.id === 'pomegranate' && (
        <g>
          <path d="M96 130c4 2 8 2 12 0M208 123c4 2 8 2 12 0" stroke="#b8445a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="241" cy="53" r="4" fill="#f2b544" opacity="0.7" />
          <circle cx="70" cy="49" r="3" fill="#fffdf8" opacity="0.6" />
        </g>
      )}
    </g>
  );
}

function TomatoArt({ plant }: { plant: Plant }) {
  const { foliage, foliageLight, fruit, fruitLight, pot } = plant.palette;

  return (
    <g>
      <ellipse cx="160" cy="175" rx="91" ry="12" fill="#16352b" opacity="0.09" />
      <path d="M89 139h142l-13 43H102l-13-43Z" fill={pot} />
      <path d="M83 138h154c3 0 5 3 4 6H79c-1-3 1-6 4-6Z" fill="#c27a54" />
      <path d="M102 148c4 8 8 16 10 27M218 148c-4 8-8 16-10 27" stroke="#8f5138" strokeWidth="2" opacity="0.45" />
      <path d="M160 47v99" stroke="#c7a56c" strokeWidth="5" strokeLinecap="round" />
      <path d="M160 139c-3-22 3-48 15-63M160 121c-10-14-17-26-19-39M163 104c13-8 22-18 25-31M158 84c-12-5-19-13-23-23" stroke={foliage} strokeWidth="5" strokeLinecap="round" fill="none" />
      <g fill={foliage}>
        <path d="M142 118c-16-4-28 2-32 13 15 5 27 1 32-13Z" />
        <path d="M177 109c17-6 29-1 35 10-15 7-28 4-35-10Z" fill={foliageLight} />
        <path d="M144 91c-14-8-27-6-34 3 12 9 25 9 34-3Z" />
        <path d="M177 84c12-10 24-11 33-3-9 10-21 12-33 3Z" fill={foliageLight} />
        <path d="M153 63c-8-12-18-16-28-12 4 12 14 18 28 12Z" />
        <path d="M169 57c7-14 17-20 28-17-2 13-12 20-28 17Z" fill={foliageLight} />
      </g>
      <g>
        <circle cx="135" cy="135" r="14" fill={fruit} />
        <circle cx="184" cy="129" r="12" fill={fruit} />
        <circle cx="161" cy="151" r="15" fill={fruit} />
        <circle cx="130" cy="131" r="4" fill={fruitLight} opacity="0.75" />
        <circle cx="180" cy="125" r="3.4" fill={fruitLight} opacity="0.75" />
        <circle cx="156" cy="146" r="4.5" fill={fruitLight} opacity="0.75" />
        <path d="M135 121l-3-6 7 3 4-6 2 7 6-2-4 7M184 118l-2-5 6 2 3-5 2 6 5-1-4 5M161 138l-3-6 7 3 4-6 2 7 6-2-4 7" fill={foliage} />
      </g>
      <circle cx="208" cy="72" r="4" fill="#f2b544" />
      <circle cx="122" cy="56" r="3" fill="#f2b544" />
      <path d="M208 72c-4-4-4-9-1-13 5 3 6 8 1 13Z" fill="#f7d87c" />
    </g>
  );
}

function KaleArt({ plant }: { plant: Plant }) {
  const { foliage, foliageLight, fruit, fruitLight, pot } = plant.palette;
  const leaves = [
    { x: 160, y: 105, r: -7, s: 1.1, c: foliage },
    { x: 129, y: 113, r: -31, s: 0.95, c: foliageLight },
    { x: 193, y: 112, r: 28, s: 0.98, c: foliage },
    { x: 111, y: 139, r: -50, s: 0.85, c: foliage },
    { x: 209, y: 139, r: 48, s: 0.86, c: foliageLight },
    { x: 137, y: 151, r: -16, s: 0.83, c: foliageLight },
    { x: 184, y: 151, r: 16, s: 0.84, c: foliage }
  ];

  return (
    <g>
      <ellipse cx="160" cy="177" rx="83" ry="11" fill="#16352b" opacity="0.09" />
      <path d="M111 147h98l-8 34h-82l-8-34Z" fill={pot} />
      <path d="M106 147h108c3 0 4 3 3 5H103c-1-2 0-5 3-5Z" fill="#c47b54" />
      <path d="M160 154c-2-18 1-36 6-52" stroke="#789c55" strokeWidth="5" strokeLinecap="round" />
      {leaves.map((leaf, index) => (
        <g key={index} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
          <path d="M0 0C-23-17-25-43-8-57c6 3 12 8 15 15 5-9 12-14 19-16 11 18 3 43-22 58Z" fill={leaf.c} />
          <path d="M0 0c1-19 5-34 12-46" stroke={fruitLight} strokeWidth="2.2" opacity="0.7" strokeLinecap="round" />
          <path d="M5-22c7 0 11 3 15 8M2-34c-6-1-10-4-13-8" stroke={fruit} strokeWidth="1.4" opacity="0.45" fill="none" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="242" cy="66" r="5" fill="#f2b544" opacity="0.7" />
      <circle cx="78" cy="87" r="3" fill="#fffdf8" opacity="0.65" />
    </g>
  );
}

function BeanArt({ plant }: { plant: Plant }) {
  const { foliage, foliageLight, fruit, fruitLight, pot } = plant.palette;

  return (
    <g>
      <ellipse cx="160" cy="176" rx="88" ry="12" fill="#16352b" opacity="0.09" />
      <path d="M99 137h122l-12 44h-98l-12-44Z" fill={pot} />
      <path d="M94 136h132c3 0 5 3 4 6H90c-1-3 1-6 4-6Z" fill="#c07a54" />
      <path d="M128 139c-2-28 1-50 8-69M159 139c0-31 2-59 7-83M190 139c1-25 5-45 13-60" stroke={foliage} strokeWidth="5" strokeLinecap="round" fill="none" />
      <g fill={foliage}>
        <path d="M133 92c-17-11-31-9-40 2 13 10 28 10 40-2Z" />
        <path d="M135 112c15-11 29-11 39-1-11 11-25 11-39 1Z" fill={foliageLight} />
        <path d="M164 76c-14-11-27-10-37 0 11 10 25 10 37 0Z" />
        <path d="M166 97c15-10 29-9 39 2-12 10-26 9-39-2Z" fill={foliageLight} />
        <path d="M198 97c-13-9-25-7-34 3 11 8 24 7 34-3Z" />
        <path d="M200 116c13-8 25-5 31 4-11 7-22 6-31-4Z" fill={foliageLight} />
      </g>
      <g fill={fruit} stroke={fruitLight} strokeWidth="1.2">
        <path d="M135 112c19 2 32 10 36 23-19 5-34-3-36-23Z" />
        <path d="M168 87c18 3 30 12 33 25-19 4-32-5-33-25Z" />
        <path d="M193 120c14 2 24 9 27 19-15 3-25-4-27-19Z" />
      </g>
      <g fill="#f7e6b2">
        <circle cx="138" cy="98" r="3.5" />
        <circle cx="185" cy="77" r="3.2" />
        <circle cx="201" cy="104" r="3" />
      </g>
      <circle cx="236" cy="62" r="5" fill="#f2b544" opacity="0.7" />
      <circle cx="80" cy="58" r="4" fill="#fffdf8" opacity="0.65" />
    </g>
  );
}

function HerbArt({ plant }: { plant: Plant }) {
  const { foliage, foliageLight, fruitLight, pot } = plant.palette;
  const isBasil = plant.id === 'basil';

  return (
    <g>
      <ellipse cx="160" cy="177" rx="75" ry="10" fill="#16352b" opacity="0.1" />
      <path d="M114 132h92l-9 46h-74l-9-46Z" fill={pot} />
      <path d="M108 131h104c3 0 5 3 4 6H104c-1-3 1-6 4-6Z" fill="#cb855c" />
      <path d="M123 140c5 9 8 18 10 29M197 140c-5 9-8 18-10 29" stroke="#925139" strokeWidth="2" opacity="0.4" />
      <path d="M160 141V58M160 97c-12-8-18-19-19-33M160 112c13-8 19-19 20-34M160 78c-8-8-12-17-11-28M160 125c8-9 12-18 12-29" stroke={foliage} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <g fill={foliage}>
        {isBasil ? (
          <>
            <ellipse cx="133" cy="66" rx="13" ry="24" transform="rotate(-37 133 66)" />
            <ellipse cx="188" cy="76" rx="13" ry="24" transform="rotate(35 188 76)" />
            <ellipse cx="143" cy="86" rx="12" ry="22" transform="rotate(-48 143 86)" fill={foliageLight} />
            <ellipse cx="177" cy="52" rx="12" ry="22" transform="rotate(29 177 52)" fill={foliageLight} />
            <ellipse cx="161" cy="104" rx="12" ry="21" transform="rotate(-9 161 104)" fill={foliageLight} />
            <ellipse cx="145" cy="122" rx="10" ry="18" transform="rotate(-39 145 122)" />
            <ellipse cx="181" cy="120" rx="10" ry="18" transform="rotate(41 181 120)" />
          </>
        ) : (
          <>
            <ellipse cx="132" cy="70" rx="12" ry="24" transform="rotate(-42 132 70)" />
            <ellipse cx="188" cy="71" rx="12" ry="24" transform="rotate(42 188 71)" />
            <ellipse cx="142" cy="94" rx="11" ry="22" transform="rotate(-52 142 94)" fill={foliageLight} />
            <ellipse cx="180" cy="93" rx="11" ry="22" transform="rotate(52 180 93)" fill={foliageLight} />
            <ellipse cx="158" cy="47" rx="11" ry="20" transform="rotate(-12 158 47)" fill={foliageLight} />
            <ellipse cx="160" cy="112" rx="11" ry="21" transform="rotate(-8 160 112)" />
            <ellipse cx="138" cy="121" rx="9" ry="18" transform="rotate(-40 138 121)" />
            <ellipse cx="185" cy="119" rx="9" ry="18" transform="rotate(42 185 119)" />
          </>
        )}
      </g>
      <g stroke={fruitLight} strokeWidth="1.6" opacity="0.6" fill="none" strokeLinecap="round">
        <path d="M155 46v39M163 80v31M143 91c5 5 8 10 9 17M178 88c-4 5-6 11-7 18" />
      </g>
      <circle cx="226" cy="60" r="5" fill="#f2b544" opacity="0.7" />
      <circle cx="91" cy="80" r="3" fill="#fffdf8" opacity="0.7" />
    </g>
  );
}

export default function PlantArt({ plant, className, decorative = true }: PlantArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `Illustration of a ${plant.name.toLowerCase()} plant`}
      aria-hidden={decorative || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      {plant.art === 'tree' && <TreeArt plant={plant} />}
      {plant.art === 'tomato' && <TomatoArt plant={plant} />}
      {plant.art === 'kale' && <KaleArt plant={plant} />}
      {plant.art === 'bean' && <BeanArt plant={plant} />}
      {plant.art === 'herb' && <HerbArt plant={plant} />}
    </svg>
  );
}
