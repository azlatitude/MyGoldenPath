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

// Draw a double-terminated crystal prism (闪灵水晶 shape)
// Hexagonal prism with pointed ends at both tips
function drawCrystalPrism(ctx, x, y, length, width, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const tipLen = length * 0.28; // pointed tip length
  const bodyLen = length * 0.44; // body length (middle section)
  const halfW = width / 2;
  const narrowW = width * 0.15; // tip narrowing

  // Crystal shape: top tip -> body -> bottom tip
  ctx.beginPath();
  // Top tip point
  ctx.moveTo(0, -length / 2);
  // Top tip to body transition (left side)
  ctx.lineTo(-halfW, -length / 2 + tipLen);
  // Body left side
  ctx.lineTo(-halfW, length / 2 - tipLen);
  // Bottom tip point
  ctx.lineTo(0, length / 2);
  // Bottom tip to body transition (right side)
  ctx.lineTo(halfW, length / 2 - tipLen);
  // Body right side
  ctx.lineTo(halfW, -length / 2 + tipLen);
  ctx.closePath();

  ctx.restore();
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

// Warm center glow
const warmGlow = ctx.createRadialGradient(SIZE/2, SIZE/2 + 30, 0, SIZE/2, SIZE/2 + 30, SIZE * 0.5);
warmGlow.addColorStop(0, 'rgba(255, 200, 50, 0.18)');
warmGlow.addColorStop(0.4, 'rgba(255, 180, 30, 0.08)');
warmGlow.addColorStop(1, 'rgba(255, 180, 30, 0)');
ctx.fillStyle = warmGlow;
ctx.fill();

// === GOLDEN DIAMOND GEM (classic diamond shape) ===
const cx = SIZE / 2;
const cy = SIZE / 2;
const top = [cx, 180];
const left = [cx - 280, 440];
const right = [cx + 280, 440];
const bottom = [cx, 820];

// Outer glow
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
ctx.strokeStyle = 'rgba(255, 248, 220, 0.7)';
ctx.lineWidth = 2.5;
ctx.stroke();

// Facets
const crownLeft = [cx - 100, 440];
const crownRight = [cx + 100, 440];

ctx.beginPath();
ctx.moveTo(...top); ctx.lineTo(...left); ctx.lineTo(...crownLeft); ctx.closePath();
ctx.fillStyle = 'rgba(184, 134, 11, 0.3)';
ctx.fill();

ctx.beginPath();
ctx.moveTo(...top); ctx.lineTo(...right); ctx.lineTo(...crownRight); ctx.closePath();
ctx.fillStyle = 'rgba(255, 236, 179, 0.25)';
ctx.fill();

ctx.beginPath();
ctx.moveTo(...top); ctx.lineTo(...crownLeft); ctx.lineTo(...crownRight); ctx.closePath();
const centerGrad = ctx.createLinearGradient(cx, top[1], cx, 440);
centerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
centerGrad.addColorStop(1, 'rgba(255, 248, 220, 0.1)');
ctx.fillStyle = centerGrad;
ctx.fill();

ctx.beginPath();
ctx.moveTo(...left); ctx.lineTo(...crownLeft); ctx.lineTo(...bottom); ctx.closePath();
ctx.fillStyle = 'rgba(184, 134, 11, 0.2)';
ctx.fill();

ctx.beginPath();
ctx.moveTo(...right); ctx.lineTo(...crownRight); ctx.lineTo(...bottom); ctx.closePath();
ctx.fillStyle = 'rgba(255, 236, 179, 0.15)';
ctx.fill();

// Facet lines
ctx.strokeStyle = 'rgba(218, 165, 32, 0.5)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(...top); ctx.lineTo(...crownLeft);
ctx.moveTo(...top); ctx.lineTo(...crownRight);
ctx.moveTo(...left); ctx.lineTo(...right);
ctx.moveTo(...crownLeft); ctx.lineTo(...bottom);
ctx.moveTo(...crownRight); ctx.lineTo(...bottom);
ctx.stroke();

// Specular highlight
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

// === CRYSTAL PRISM SPARKLES (闪灵水晶 double-terminated) ===
// Each: [x, y, length, width, angle, opacity]
// Scattered irregularly with varied sizes and angles
const crystals = [
  // On the gem surface
  [cx - 30, 270, 55, 12, -0.3, 0.95],
  [cx + 150, 400, 40, 9, 0.8, 0.85],
  [cx - 180, 420, 35, 8, -0.6, 0.8],
  [cx + 60, 580, 30, 7, 1.2, 0.75],
  [cx - 90, 650, 28, 6, -1.0, 0.7],
  // Floating around the gem — scattered irregularly
  [180, 190, 48, 11, -0.8, 0.65],
  [830, 230, 38, 9, 0.5, 0.6],
  [120, 680, 32, 7, -1.4, 0.45],
  [890, 650, 42, 9, 1.1, 0.5],
  [760, 520, 26, 6, -0.2, 0.4],
  [260, 530, 22, 5, 0.9, 0.35],
  [cx + 20, 870, 34, 8, 0.3, 0.45],
  [680, 160, 28, 6, -1.2, 0.4],
  [340, 160, 24, 5, 0.6, 0.35],
  [910, 420, 20, 5, -0.5, 0.3],
];

crystals.forEach(([x, y, length, width, angle, opacity]) => {
  // Glow halo (elongated to match crystal orientation)
  const glowR = length * 0.9;
  const sg = ctx.createRadialGradient(x, y, 0, x, y, glowR);
  sg.addColorStop(0, `rgba(255, 248, 200, ${opacity * 0.6})`);
  sg.addColorStop(0.4, `rgba(255, 230, 150, ${opacity * 0.2})`);
  sg.addColorStop(1, 'rgba(255, 230, 150, 0)');
  ctx.fillStyle = sg;
  ctx.fillRect(x - glowR, y - glowR, glowR * 2, glowR * 2);

  // Crystal prism shape
  drawCrystalPrism(ctx, x, y, length, width, angle);

  // Fill with white gradient
  const cg = ctx.createLinearGradient(
    x + Math.cos(angle) * (-length/2),
    y + Math.sin(angle) * (-length/2),
    x + Math.cos(angle) * (length/2),
    y + Math.sin(angle) * (length/2)
  );
  cg.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.4})`);
  cg.addColorStop(0.3, `rgba(255, 255, 255, ${opacity})`);
  cg.addColorStop(0.5, `rgba(255, 248, 220, ${opacity})`);
  cg.addColorStop(0.7, `rgba(255, 255, 255, ${opacity})`);
  cg.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.4})`);
  ctx.fillStyle = cg;
  ctx.fill();

  // Center line (crystal axis)
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, -length / 2 * 0.7);
  ctx.lineTo(0, length / 2 * 0.7);
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.restore();
});

// Tiny dot sparkles (random scatter)
const dots = [
  [370, 280, 3], [700, 320, 2], [430, 770, 2],
  [590, 830, 2], [190, 430, 2], [840, 380, 2],
  [520, 140, 2], [740, 600, 2], [290, 700, 2],
  [150, 310, 1.5], [860, 270, 1.5], [620, 130, 1.5],
  [480, 920, 1.5], [780, 760, 1.5], [200, 600, 1.5],
];
dots.forEach(([x, y, r]) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`;
  ctx.fill();
});

// === SAVE ===
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('assets/icon.png', buffer);
fs.copyFileSync('assets/icon.png', 'assets/adaptive-icon.png');
console.log('Generated golden diamond icon with crystal prism sparkles');
