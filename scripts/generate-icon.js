const fs = require('fs');

// Generate SVG icon
const SIZE = 1024;
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3A8A"/>
      <stop offset="50%" style="stop-color:#2563EB"/>
      <stop offset="100%" style="stop-color:#3B82F6"/>
    </linearGradient>
    <linearGradient id="gem" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF"/>
      <stop offset="30%" style="stop-color:#E0F2FE"/>
      <stop offset="50%" style="stop-color:#BAE6FD"/>
      <stop offset="70%" style="stop-color:#E0F2FE"/>
      <stop offset="100%" style="stop-color:#FFFFFF"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="45%">
      <stop offset="0%" style="stop-color:rgba(147,197,253,0.35)"/>
      <stop offset="100%" style="stop-color:rgba(147,197,253,0)"/>
    </radialGradient>
    <filter id="sparkle" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="gemGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)" rx="180"/>

  <!-- Center glow -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#glow)"/>

  <!-- Diamond gem -->
  <g filter="url(#gemGlow)">
    <polygon points="512,200 772,420 680,780 344,780 252,420" fill="url(#gem)" stroke="rgba(255,255,255,0.8)" stroke-width="3"/>

    <!-- Facet lines -->
    <line x1="512" y1="200" x2="430" y2="420" stroke="rgba(96,165,250,0.5)" stroke-width="2.5"/>
    <line x1="512" y1="200" x2="594" y2="420" stroke="rgba(96,165,250,0.5)" stroke-width="2.5"/>
    <line x1="252" y1="420" x2="772" y2="420" stroke="rgba(96,165,250,0.5)" stroke-width="2.5"/>
    <line x1="430" y1="420" x2="512" y2="680" stroke="rgba(96,165,250,0.4)" stroke-width="2"/>
    <line x1="594" y1="420" x2="512" y2="680" stroke="rgba(96,165,250,0.4)" stroke-width="2"/>
    <line x1="344" y1="780" x2="430" y2="420" stroke="rgba(96,165,250,0.3)" stroke-width="1.5"/>
    <line x1="680" y1="780" x2="594" y2="420" stroke="rgba(96,165,250,0.3)" stroke-width="1.5"/>
  </g>

  <!-- Sparkles -->
  <g filter="url(#sparkle)">
    <circle cx="420" cy="310" r="8" fill="white" opacity="0.95"/>
    <circle cx="620" cy="350" r="6" fill="white" opacity="0.9"/>
    <circle cx="560" cy="520" r="5" fill="white" opacity="0.85"/>
    <circle cx="380" cy="500" r="7" fill="white" opacity="0.9"/>
    <circle cx="660" cy="260" r="4" fill="white" opacity="0.8"/>
    <circle cx="440" cy="650" r="4" fill="white" opacity="0.75"/>
    <circle cx="300" cy="380" r="5" fill="white" opacity="0.7"/>
    <circle cx="700" cy="480" r="3" fill="white" opacity="0.7"/>
  </g>
</svg>`;

fs.writeFileSync('assets/icon.svg', svg);
console.log('Generated assets/icon.svg');
console.log('');
console.log('To convert to PNG for app icon, use one of:');
console.log('  macOS:  npx svg2png-cli assets/icon.svg -o assets/icon.png -w 1024 -h 1024');
console.log('  or:     npx sharp-cli -i assets/icon.svg -o assets/icon.png --width 1024 --height 1024');
console.log('  or use an online converter like https://svgtopng.com/');
