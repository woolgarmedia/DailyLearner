// One-shot icon generator for Daily Learner.
//
// Renders a clean, geometric "daily checklist" mark from SVG into all the
// PNG sizes Expo wants. Run after changing the SVG below:
//
//   npm install --save-dev sharp        # one-off
//   node scripts/generate-icons.mjs
//
// Outputs are written under assets/images/. Commit the PNGs.

import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES = join(ROOT, 'assets', 'images');

const CREAM = '#F7F4EF';
const DARK = '#1A1814';
const ACCENT = '#B85C2A';

// --- Master icon: dark rounded square + 3 checklist rows (1 done, 1 current, 1 pending)
const MASTER_ICON_SVG = (bg = DARK) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="220" fill="${bg}"/>

  <!-- Row 1: completed -->
  <circle cx="280" cy="380" r="44" fill="${ACCENT}"/>
  <path d="M 256 380 L 274 398 L 304 366" stroke="${CREAM}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="360" y="354" width="400" height="52" rx="26" fill="${CREAM}"/>

  <!-- Row 2: in progress -->
  <circle cx="280" cy="512" r="42" fill="none" stroke="${CREAM}" stroke-width="10"/>
  <rect x="360" y="488" width="320" height="48" rx="24" fill="${CREAM}" opacity="0.85"/>

  <!-- Row 3: pending -->
  <circle cx="280" cy="644" r="38" fill="none" stroke="${CREAM}" stroke-width="8" opacity="0.45"/>
  <rect x="360" y="624" width="240" height="44" rx="22" fill="${CREAM}" opacity="0.45"/>
</svg>`;

// --- Splash icon (transparent background, dark content for cream splash screen)
const SPLASH_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <!-- Row 1: completed -->
  <circle cx="280" cy="380" r="44" fill="${ACCENT}"/>
  <path d="M 256 380 L 274 398 L 304 366" stroke="${CREAM}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="360" y="354" width="400" height="52" rx="26" fill="${DARK}"/>

  <!-- Row 2: in progress -->
  <circle cx="280" cy="512" r="42" fill="none" stroke="${DARK}" stroke-width="10"/>
  <rect x="360" y="488" width="320" height="48" rx="24" fill="${DARK}" opacity="0.78"/>

  <!-- Row 3: pending -->
  <circle cx="280" cy="644" r="38" fill="none" stroke="${DARK}" stroke-width="8" opacity="0.4"/>
  <rect x="360" y="624" width="240" height="44" rx="22" fill="${DARK}" opacity="0.4"/>
</svg>`;

// --- Android adaptive foreground (must fit inside 264x264 safe zone of 432x432)
// We render the same mark but scaled / centred to live inside the safe circle.
const ADAPTIVE_FG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
  <g transform="translate(216 216) scale(0.22) translate(-512 -512)">
    <!-- Row 1: completed -->
    <circle cx="280" cy="380" r="44" fill="${ACCENT}"/>
    <path d="M 256 380 L 274 398 L 304 366" stroke="${CREAM}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="360" y="354" width="400" height="52" rx="26" fill="${CREAM}"/>

    <!-- Row 2: in progress -->
    <circle cx="280" cy="512" r="42" fill="none" stroke="${CREAM}" stroke-width="10"/>
    <rect x="360" y="488" width="320" height="48" rx="24" fill="${CREAM}" opacity="0.85"/>

    <!-- Row 3: pending -->
    <circle cx="280" cy="644" r="38" fill="none" stroke="${CREAM}" stroke-width="8" opacity="0.45"/>
    <rect x="360" y="624" width="240" height="44" rx="22" fill="${CREAM}" opacity="0.45"/>
  </g>
</svg>`;

// --- Android adaptive background: solid dark
const ADAPTIVE_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
  <rect width="432" height="432" fill="${DARK}"/>
</svg>`;

// --- Android monochrome (Android 13+ themed icons): single-colour silhouette on transparent
const MONOCHROME_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
  <g transform="translate(216 216) scale(0.22) translate(-512 -512)">
    <!-- Row 1 -->
    <circle cx="280" cy="380" r="44" fill="#000"/>
    <path d="M 256 380 L 274 398 L 304 366" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="360" y="354" width="400" height="52" rx="26" fill="#000"/>

    <!-- Row 2 -->
    <circle cx="280" cy="512" r="42" fill="none" stroke="#000" stroke-width="12"/>
    <rect x="360" y="488" width="320" height="48" rx="24" fill="#000" opacity="0.8"/>

    <!-- Row 3 -->
    <circle cx="280" cy="644" r="38" fill="none" stroke="#000" stroke-width="10" opacity="0.45"/>
    <rect x="360" y="624" width="240" height="44" rx="22" fill="#000" opacity="0.45"/>
  </g>
</svg>`;

async function render(svg, size, outPath) {
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log('✓', outPath.replace(ROOT + '\\', '').replace(ROOT + '/', ''));
}

async function main() {
  // Main app icon: 1024×1024 with dark rounded background
  await render(MASTER_ICON_SVG(), 1024, join(IMAGES, 'icon.png'));

  // Favicon for web: 48×48
  await render(MASTER_ICON_SVG(), 48, join(IMAGES, 'favicon.png'));

  // Splash icon: transparent, dark content (cream BG is set in app.json)
  await render(SPLASH_ICON_SVG, 512, join(IMAGES, 'splash-icon.png'));

  // Android adaptive icon pieces (target 432×432)
  await render(ADAPTIVE_FG_SVG, 432, join(IMAGES, 'android-icon-foreground.png'));
  await render(ADAPTIVE_BG_SVG, 432, join(IMAGES, 'android-icon-background.png'));
  await render(MONOCHROME_SVG, 432, join(IMAGES, 'android-icon-monochrome.png'));

  console.log('\nDone. Commit the regenerated PNGs.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
