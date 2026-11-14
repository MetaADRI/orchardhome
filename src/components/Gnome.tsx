import { useId } from 'react';

export type GnomePose = 'waving' | 'teaching' | 'celebrating' | 'thinking';

interface GnomeProps {
  pose?: GnomePose;
  className?: string;
  decorative?: boolean;
}

const poseLabels: Record<GnomePose, string> = {
  waving: 'Grow Gnome waving hello',
  teaching: 'Grow Gnome holding a growing guide',
  celebrating: 'Grow Gnome celebrating with leaves in the air',
  thinking: 'Grow Gnome thinking with a hand at his chin'
};

export default function Gnome({ pose = 'waving', className, decorative = false }: GnomeProps) {
  const uid = useId().replace(/:/g, '');
  const hatId = `gnome-hat-${pose}-${uid}`;
  const beardId = `gnome-beard-${pose}-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 240 260"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : poseLabels[pose]}
      aria-hidden={decorative || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={hatId} x1="84" y1="82" x2="169" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f2b544" />
          <stop offset="1" stopColor="#e07b3f" />
        </linearGradient>
        <linearGradient id={beardId} x1="120" y1="122" x2="120" y2="188" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffaf0" />
          <stop offset="1" stopColor="#eadfc8" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="244" rx="57" ry="9" fill="#16352b" opacity="0.11" />

      {pose === 'celebrating' && (
        <g className="gnome-confetti" fill="none" strokeLinecap="round">
          <path d="M44 91c-8-8-13-17-14-27" stroke="#4f8f5b" strokeWidth="4" />
          <path d="M44 91c-13 2-24 0-33-7" stroke="#f2b544" strokeWidth="4" />
          <path d="M191 74c4-12 10-20 20-25" stroke="#b8445a" strokeWidth="4" />
          <path d="M192 97c12 3 21 10 27 20" stroke="#4f8f5b" strokeWidth="4" />
          <circle cx="37" cy="42" r="4" fill="#f2b544" />
          <circle cx="206" cy="42" r="5" fill="#c8e07a" />
          <path d="M30 132c8 0 14 4 18 11-9 2-15-1-18-11Z" fill="#4f8f5b" />
          <path d="M207 128c-7 2-12 7-14 15 9 0 14-5 14-15Z" fill="#f2b544" />
        </g>
      )}

      {pose === 'waving' && (
        <g>
          <path d="M83 166c-9-2-14-10-18-23" stroke="#f8eedb" strokeWidth="16" strokeLinecap="round" />
          <path d="M66 145c-8-12-11-21-10-31" stroke="#f6ead6" strokeWidth="15" strokeLinecap="round" />
          <circle cx="55" cy="105" r="9" fill="#dfaa80" />
          <path d="M50 99c2-4 7-5 11-2" stroke="#c48560" strokeWidth="2" strokeLinecap="round" fill="none" />
          <g transform="translate(145 176)">
            <path d="M2 17h23l-3 22H5L2 17Z" fill="#b76543" />
            <path d="M1 17h25" stroke="#8f4d33" strokeWidth="3" strokeLinecap="round" />
            <path d="M13 17c-2-7 1-12 7-15 2 6 0 12-7 15Z" fill="#4f8f5b" />
            <path d="M13 17c-4-5-9-6-14-4 2 6 7 8 14 4Z" fill="#77a05d" />
          </g>
        </g>
      )}

      {pose === 'teaching' && (
        <g>
          <path d="M82 167c-8 4-16 0-24-8" stroke="#f8eedb" strokeWidth="16" strokeLinecap="round" />
          <g transform="translate(35 154) rotate(-10)">
            <rect x="0" y="0" width="29" height="36" rx="3" fill="#fff7e8" />
            <path d="M0 7h29M0 29h29" stroke="#d9c9ad" strokeWidth="2" />
            <path d="M7 15c4-4 9-4 13 0-4 5-9 5-13 0Z" fill="#4f8f5b" />
            <path d="M13 15V8" stroke="#4f8f5b" strokeWidth="2" strokeLinecap="round" />
          </g>
          <path d="M155 167c9 4 17 2 24-4" stroke="#f8eedb" strokeWidth="16" strokeLinecap="round" />
          <path d="M177 164c10 0 18-4 22-11" stroke="#f6ead6" strokeWidth="15" strokeLinecap="round" />
          <circle cx="202" cy="151" r="8.5" fill="#dfaa80" />
        </g>
      )}

      {pose === 'celebrating' && (
        <g>
          <path d="M82 161c-11-1-19-9-24-22" stroke="#f8eedb" strokeWidth="16" strokeLinecap="round" />
          <path d="M60 142c-9-13-12-24-10-35" stroke="#f6ead6" strokeWidth="15" strokeLinecap="round" />
          <circle cx="47" cy="98" r="9" fill="#dfaa80" />
          <path d="M158 161c11-1 19-9 24-22" stroke="#f8eedb" strokeWidth="16" strokeLinecap="round" />
          <path d="M180 142c9-13 12-24 10-35" stroke="#f6ead6" strokeWidth="15" strokeLinecap="round" />
          <circle cx="193" cy="98" r="9" fill="#dfaa80" />
        </g>
      )}

      {pose === 'thinking' && (
        <g>
          <path d="M82 167c-8 4-15 1-21-5" stroke="#f8eedb" strokeWidth="16" strokeLinecap="round" />
          <path d="M134 178c11-2 17-12 15-25" stroke="#f8eedb" strokeWidth="16" strokeLinecap="round" />
          <path d="M149 157c-1-10-5-18-12-24" stroke="#f6ead6" strokeWidth="15" strokeLinecap="round" />
          <circle cx="136" cy="128" r="8.5" fill="#dfaa80" />
          <circle cx="196" cy="67" r="3" fill="#f2b544" />
          <circle cx="206" cy="51" r="4.5" fill="#c8e07a" />
          <path d="M174 52c-5-5-6-11-4-17 6 2 9 8 4 17Z" fill="#4f8f5b" />
        </g>
      )}

      <path d="M94 213h22l2 35H84l2-31c1-2 4-4 8-4Z" fill="#6d4a32" />
      <path d="M124 213h22c4 0 7 2 8 4l2 31h-34l2-35Z" fill="#6d4a32" />
      <path d="M84 241h34v8H80c-3 0-4-2-4-4s3-4 8-4Z" fill="#3e3027" />
      <path d="M122 241h34c5 0 8 2 8 4s-2 4-4 4h-38v-8Z" fill="#3e3027" />
      <path d="M88 150c-6 18-7 38-5 55 4 8 20 10 37 10s33-2 37-10c2-17 1-37-5-55H88Z" fill="#4f8f5b" />
      <path d="M94 160h52l-3 45H97l-3-45Z" fill="#5f9e69" />
      <path d="M112 160l8 15 8-15" fill="none" stroke="#f8edd5" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 176h9v12h-9zM131 176h9v12h-9z" fill="#3c7650" opacity="0.7" />
      <path d="M93 153c7-5 47-7 55 0l4 8H88l5-8Z" fill="#3c7650" />

      <path
        d="M84 119c2 27 10 53 26 64 6 4 14 4 20 0 16-11 24-37 26-64-11 7-20 10-36 10s-25-3-36-10Z"
        fill={`url(#${beardId})`}
      />
      <path d="M108 144c4-4 8-5 12-1 4-4 8-3 12 1-3 5-6 7-12 7s-9-2-12-7Z" fill="#f4ead7" />
      <path d="M100 118c-2-12 6-22 20-22s22 10 20 22v9c0 9-9 16-20 16s-20-7-20-16v-9Z" fill="#e5b188" />
      <circle cx="83" cy="119" r="8" fill="#e5b188" />
      <circle cx="157" cy="119" r="8" fill="#e5b188" />
      <circle cx="105" cy="113" r="3.4" fill="#18352b" />
      <circle cx="135" cy="113" r="3.4" fill="#18352b" />
      <circle cx="106" cy="112" r="1.1" fill="#fffdf8" />
      <circle cx="136" cy="112" r="1.1" fill="#fffdf8" />
      <path d="M99 105c3-3 7-3 10-1M131 104c3-2 7-2 10 1" stroke="#7b4e35" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="97" cy="125" r="5.5" fill="#dc8e74" opacity="0.55" />
      <circle cx="143" cy="125" r="5.5" fill="#dc8e74" opacity="0.55" />
      <ellipse cx="120" cy="122" rx="8" ry="9.5" fill="#d99a72" />
      <ellipse cx="117" cy="119" rx="2.5" ry="3" fill="#f1ba94" opacity="0.8" />
      <path d="M96 137c5 5 12 7 18 1" stroke="#d3c4aa" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />

      <path
        d="M72 91C82 62 96 43 120 24c24 19 38 38 48 67-19 9-67 9-96 0Z"
        fill={`url(#${hatId})`}
      />
      <path
        d="M63 90c15-5 44-7 57-7s42 2 57 7c7 2 7 11-5 14-22 5-82 5-104 0-12-3-12-12-5-14Z"
        fill="#e89047"
      />
      <path d="M120 27c-1 17-4 35-9 57M120 27c8 13 15 29 18 51" stroke="#c76a35" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
      <path d="M120 24c-4-7-3-13 3-18 4 7 3 13-3 18Z" fill="#4f8f5b" />
      <path d="M122 8c5 0 9 2 12 6-5 3-10 2-12-6Z" fill="#77a05d" />
      <path d="M92 97c16 4 40 5 56 1" stroke="#b55b2d" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      {pose === 'thinking' && (
        <g>
          <path d="M139 135c3-1 6-5 7-9" stroke="#dfaa80" strokeWidth="2" fill="none" opacity="0.5" />
          <circle cx="176" cy="92" r="3" fill="#f2b544" opacity="0.8" />
          <circle cx="186" cy="78" r="2.2" fill="#f2b544" opacity="0.65" />
          <circle cx="191" cy="67" r="1.5" fill="#f2b544" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}
