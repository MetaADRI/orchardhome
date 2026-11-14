import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const publicDir = join(root, 'public');
const mark = `
  <g>
    <circle cx="256" cy="256" r="236" fill="#1f5d43" />
    <path d="M149.3 245.3c32-85.3 85.3-138.7 170.7-170.6 10.7 96-32 160-117.3 192l-53.4-21.4Z" fill="#c8e07a" />
    <path d="M256 170.7c-10.7 74.7-21.3 138.7-64 202.6" stroke="#fbf7ee" stroke-width="21.3" stroke-linecap="round" fill="none" />
    <path d="M128 298.7c64-32 128-21.3 181.3 21.3-53.3 53.3-117.3 53.3-181.3-21.3Z" fill="#f2b544" />
    <path d="M320 373.3c0-74.6 32-128 96-160 10.7 85.4-21.3 138.7-96 160Z" fill="#f4a261" />
  </g>`;

function iconSvg(maskable = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#fbf7ee" />
  <g${maskable ? ' transform="translate(256 256) scale(0.82) translate(-256 -256)"' : ''}>${mark}
  </g>
</svg>`;
}

const browserCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
].filter(Boolean);

const browser = browserCandidates.find((candidate) => existsSync(candidate));
if (!browser) {
  console.error('No Chrome or Edge binary found. Set CHROME_PATH to render the PNG icons.');
  process.exit(1);
}

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, 'favicon.svg'), `${iconSvg()}\n`);

const workDir = join(tmpdir(), `orchard-home-gnome-icons-${process.pid}`);
mkdirSync(workDir, { recursive: true });

const icons = [
  { file: 'favicon-32x32.png', size: 32, maskable: false },
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  { file: 'pwa-192x192.png', size: 192, maskable: false },
  { file: 'pwa-512x512.png', size: 512, maskable: false },
  { file: 'pwa-maskable-512x512.png', size: 512, maskable: true }
];

for (const icon of icons) {
  const htmlPath = join(workDir, `${icon.size}-${icon.maskable ? 'maskable' : 'any'}.html`);
  const outputPath = join(publicDir, icon.file);
  const profilePath = join(workDir, `profile-${icon.file}`);
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #fbf7ee; }
svg { display: block; width: 100vw; height: 100vh; }
</style>
</head>
<body>${iconSvg(icon.maskable)}</body>
</html>`;

  writeFileSync(htmlPath, html);

  const result = spawnSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--disable-extensions',
      '--force-device-scale-factor=1',
      `--window-size=${icon.size},${icon.size}`,
      `--user-data-dir=${profilePath}`,
      `--screenshot=${outputPath}`,
      pathToFileURL(htmlPath).href
    ],
    { stdio: 'inherit' }
  );

  if (result.status !== 0 || !existsSync(outputPath)) {
    rmSync(workDir, { recursive: true, force: true });
    console.error(`Failed to render ${icon.file}.`);
    process.exit(result.status ?? 1);
  }

  console.log(`Rendered ${icon.file} (${icon.size}x${icon.size}).`);
}

rmSync(workDir, { recursive: true, force: true });
