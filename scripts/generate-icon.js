const { createCanvas } = require('canvas');
const fs = require('fs');

const SIZE = 1024;
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext('2d');

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Draw a 4-pointed star sparkle
function drawStar(ctx, x, y, outerR, innerR) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// === BACKGROUND ===
const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
bg.addColorStop(0, '#0F1B4D');
bg.addColorStop(0.4, '#1E3A8A');
bg.addColorStop(0.7, '#1D4ED8');
bg.addColorStop(1, '#2563EB');
roundRect(ctx, 0, 0, SIZE, SIZE, 180);
ctx.fillStyle = bg;
ctx.fill();

// Warm center glow (golden light from gem)
const warmGlow = ctx.createRadialGradient(SIZE/2, SIZE/2 + 30, 0, SIZE/2, SIZE/2 + 30, SIZE * 0.5);
warmGlow.addColorStop(0, 'rgba(255, 200, 50, 0.18)');
warmGlow.addColorStop(0.4, 'rgba(255, 180, 30, 0.08)');
warmGlow.addColorStop(1, 'rgba(255, 180, 30, 0)');
ctx.fillStyle = warmGlow;
ctx.fill();

// === GOLDEN DIAMOND GEM ===
const cx = SIZE / 2;
const cy = SIZE / 2;

// Classic diamond shape: top point, left shoulder, right shoulder, bottom point
const top = [cx, 180];
const left = [cx - 280, 440];
const right = [cx + 280, 440];
const bottom = [cx, 820];

// Outer glow behind gem
const gemGlow = ctx.createRadialGradient(cx, cy + 20, 50, cx, cy + 20, 380);
gemGlow.addColorStop(0, 'rgba(255, 215, 0, 0.35)');
gemGlow.addColorStop(0.5, 'rgba(255, 180, 0, 0.12)');
gemGlow.addColorStop(1, 'rgba(255, 180, 0, 0)');
ctx.fillStyle = gemGlow;
roundRect(ctx, 0, 0, SIZE, SIZE, 180);
ctx.fill();

// Main diamond body
ctx.beginPath();
ctx.moveTo(...top);
ctx.lineTo(...right);
ctx.lineTo(...bottom);
ctx.lineTo(...left);
ctx.closePath();

const bodyGrad = ctx.createLinearGradient(left[0], top[1], right[0], bottom[1]);
bodyGrad.addColorStop(0, '#FFF8DC');
bodyGrad.addColorStop(0.15, '#FFD700');
bodyGrad.addColorStop(0.35, '#FFC940');
bodyGrad.addColorStop(0.5, '#FFECB3');
bodyGrad.addColorStop(0.65, '#FFD700');
bodyGrad.addColorStop(0.85, '#DAA520');
bodyGrad.addColorStop(1, '#B8860B');
ctx.fillStyle = bodyGrad;
ctx.fill();

// Gem border
ctx.strokeStyle = 'rgba(255, 248, 220, 0.7)';
ctx.lineWidth = 2.5;
ctx.stroke();

// === FACETS ===
// Crown (upper section)
const crownLeft = [cx - 100, 440];
const crownRight = [cx + 100, 440];

// Upper-left facet (darker gold)
ctx.beginPath();
ctx.moveTo(...top);
ctx.lineTo(...left);
ctx.lineTo(...crownLeft);
ctx.closePath();
ctx.fillStyle = 'rgba(184, 134, 11, 0.3)';
ctx.fill();

// Upper-right facet (lighter gold)
ctx.beginPath();
ctx.moveTo(...top);
ctx.lineTo(...right);
ctx.lineTo(...crownRight);
ctx.closePath();
ctx.fillStyle = 'rgba(255, 236, 179, 0.25)';
ctx.fill();

// Center highlight facet
ctx.beginPath();
ctx.moveTo(...top);
ctx.lineTo(...crownLeft);
ctx.lineTo(...crownRight);
ctx.closePath();
const centerGrad = ctx.createLinearGradient(cx, top[1], cx, 440);
centerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
centerGrad.addColorStop(1, 'rgba(255, 248, 220, 0.1)');
ctx.fillStyle = centerGrad;
ctx.fill();

// Lower-left facet
ctx.beginPath();
ctx.moveTo(...left);
ctx.lineTo(...crownLeft);
ctx.lineTo(...bottom);
ctx.closePath();
ctx.fillStyle = 'rgba(184, 134, 11, 0.2)';
ctx.fill();

// Lower-right facet (bright reflection)
ctx.beginPath();
ctx.moveTo(...right);
ctx.lineTo(...crownRight);
ctx.lineTo(...bottom);
ctx.closePath();
ctx.fillStyle = 'rgba(255, 236, 179, 0.15)';
ctx.fill();

// Facet lines
ctx.strokeStyle = 'rgba(218, 165, 32, 0.5)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(...top); ctx.lineTo(...crownLeft);
ctx.moveTo(...top); ctx.lineTo(...crownRight);
ctx.moveTo(...left); ctx.lineTo(...right);  // crown line
ctx.moveTo(...crownLeft); ctx.lineTo(...bottom);
ctx.moveTo(...crownRight); ctx.lineTo(...bottom);
ctx.stroke();

// Specular highlight streak (diagonal shine across gem)
ctx.save();
ctx.globalAlpha = 0.3;
ctx.beginPath();
ctx.moveTo(cx - 160, 340);
ctx.lineTo(cx - 60, 320);
ctx.lineTo(cx + 40, 500);
ctx.lineTo(cx - 60, 520);
ctx.closePath();
ctx.fillStyle = '#FFFFFF';
ctx.fill();
ctx.restore();

// === STAR SPARKLES (light reflections) ===
const stars = [
  // [x, y, outerRadius, innerRadius, glowRadius, opacity]
  [cx - 20, 260, 28, 6, 50, 1.0],      // top of gem - big star
  [cx + 180, 380, 20, 4, 35, 0.9],     // right shoulder
  [cx - 200, 400, 16, 3, 28, 0.85],    // left shoulder
  [cx + 60, 550, 14, 3, 24, 0.8],      // mid-right
  [cx - 80, 620, 12, 2, 20, 0.75],     // lower-left
  // Stars floating outside gem
  [160, 200, 22, 5, 40, 0.7],          // top-left corner
  [860, 180, 18, 4, 32, 0.65],         // top-right corner
  [140, 750, 14, 3, 25, 0.5],          // bottom-left
  [880, 700, 16, 3, 28, 0.55],         // bottom-right
  [780, 500, 12, 2, 20, 0.45],         // right side
  [240, 560, 10, 2, 18, 0.4],          // left side
  [cx, 880, 15, 3, 26, 0.5],           // below gem
];

stars.forEach(([x, y, outerR, innerR, glowR, opacity]) => {
  // Glow halo
  const sg = ctx.createRadialGradient(x, y, 0, x, y, glowR);
  sg.addColorStop(0, `rgba(255, 248, 200, ${opacity * 0.7})`);
  sg.addColorStop(0.3, `rgba(255, 230, 150, ${opacity * 0.3})`);
  sg.addColorStop(1, 'rgba(255, 230, 150, 0)');
  ctx.fillStyle = sg;
  ctx.fillRect(x - glowR, y - glowR, glowR * 2, glowR * 2);

  // Star shape
  ctx.save();
  ctx.globalAlpha = opacity;
  drawStar(ctx, x, y, outerR, innerR);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.restore();
});

// Extra tiny dot sparkles
const dots = [
  [350, 260, 4], [680, 300, 3], [450, 750, 3],
  [600, 800, 2], [200, 450, 3], [820, 400, 2],
  [500, 160, 3], [720, 620, 2], [300, 680, 2],
  [180, 340, 2], [840, 250, 2], [600, 150, 2],
];
dots.forEach(([x, y, r]) => {
  const dg = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
  dg.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  dg.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = dg;
  ctx.fillRect(x - r*3, y - r*3, r*6, r*6);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
});

// === SAVE ===
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('assets/icon.png', buffer);
fs.copyFileSync('assets/icon.png', 'assets/adaptive-icon.png');
console.log('Generated golden diamond icon: assets/icon.png, assets/adaptive-icon.png');
