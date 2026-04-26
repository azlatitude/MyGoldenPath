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

// === GOLDEN CRYSTAL PRISM GEM (闪灵水晶 double-terminated hexagonal prism) ===
const cx = SIZE / 2;
const cy = SIZE / 2 + 10;

// Crystal dimensions
const totalH = 620;      // total height tip-to-tip
const bodyH = 280;        // middle prism body height
const tipH = 170;         // each tip height
const bodyW = 200;        // half-width of body
const midW = bodyW * 0.6; // mid-facet width

// Key Y positions
const topTip = cy - totalH / 2;
const topBody = topTip + tipH;
const botBody = topBody + bodyH;
const botTip = botBody + tipH;

// Outer glow
const gemGlow = ctx.createRadialGradient(cx, cy, 50, cx, cy, 400);
gemGlow.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
gemGlow.addColorStop(0.5, 'rgba(255, 180, 0, 0.12)');
gemGlow.addColorStop(1, 'rgba(255, 180, 0, 0)');
ctx.fillStyle = gemGlow;
roundRect(ctx, 0, 0, SIZE, SIZE, 180);
ctx.fill();

// === Draw crystal as 3 visible faces of hexagonal prism ===

// LEFT FACE (darker)
ctx.beginPath();
ctx.moveTo(cx, topTip);                // top tip
ctx.lineTo(cx - bodyW, topBody);       // top-left shoulder
ctx.lineTo(cx - bodyW, botBody);       // bottom-left shoulder
ctx.lineTo(cx, botTip);                // bottom tip
ctx.lineTo(cx, botBody);               // bottom center
ctx.lineTo(cx, topBody);               // top center
ctx.closePath();
const leftGrad = ctx.createLinearGradient(cx - bodyW, topTip, cx, botTip);
leftGrad.addColorStop(0, '#DAA520');
leftGrad.addColorStop(0.3, '#C8960E');
leftGrad.addColorStop(0.5, '#E8B830');
leftGrad.addColorStop(0.7, '#B8860B');
leftGrad.addColorStop(1, '#8B6914');
ctx.fillStyle = leftGrad;
ctx.fill();

// RIGHT FACE (brighter, catches light)
ctx.beginPath();
ctx.moveTo(cx, topTip);                // top tip
ctx.lineTo(cx + bodyW, topBody);       // top-right shoulder
ctx.lineTo(cx + bodyW, botBody);       // bottom-right shoulder
ctx.lineTo(cx, botTip);                // bottom tip
ctx.lineTo(cx, botBody);               // bottom center
ctx.lineTo(cx, topBody);               // top center
ctx.closePath();
const rightGrad = ctx.createLinearGradient(cx, topTip, cx + bodyW, botTip);
rightGrad.addColorStop(0, '#FFF8DC');
rightGrad.addColorStop(0.2, '#FFE680');
rightGrad.addColorStop(0.4, '#FFD700');
rightGrad.addColorStop(0.6, '#FFECB3');
rightGrad.addColorStop(0.8, '#FFD700');
rightGrad.addColorStop(1, '#F0C040');
ctx.fillStyle = rightGrad;
ctx.fill();

// TOP TIP — left facet
ctx.beginPath();
ctx.moveTo(cx, topTip);
ctx.lineTo(cx - bodyW, topBody);
ctx.lineTo(cx, topBody);
ctx.closePath();
ctx.fillStyle = 'rgba(184, 134, 11, 0.4)';
ctx.fill();

// TOP TIP — right facet (bright highlight)
ctx.beginPath();
ctx.moveTo(cx, topTip);
ctx.lineTo(cx + bodyW, topBody);
ctx.lineTo(cx, topBody);
ctx.closePath();
const topRightGrad = ctx.createLinearGradient(cx, topTip, cx + bodyW, topBody);
topRightGrad.addColorStop(0, 'rgba(255, 255, 240, 0.6)');
topRightGrad.addColorStop(1, 'rgba(255, 236, 179, 0.2)');
ctx.fillStyle = topRightGrad;
ctx.fill();

// BOTTOM TIP — left facet
ctx.beginPath();
ctx.moveTo(cx, botTip);
ctx.lineTo(cx - bodyW, botBody);
ctx.lineTo(cx, botBody);
ctx.closePath();
ctx.fillStyle = 'rgba(139, 105, 20, 0.5)';
ctx.fill();

// BOTTOM TIP — right facet
ctx.beginPath();
ctx.moveTo(cx, botTip);
ctx.lineTo(cx + bodyW, botBody);
ctx.lineTo(cx, botBody);
ctx.closePath();
ctx.fillStyle = 'rgba(218, 165, 32, 0.3)';
ctx.fill();

// Crystal edges
ctx.strokeStyle = 'rgba(255, 248, 220, 0.6)';
ctx.lineWidth = 2;
ctx.beginPath();
// Outline
ctx.moveTo(cx, topTip);
ctx.lineTo(cx - bodyW, topBody);
ctx.lineTo(cx - bodyW, botBody);
ctx.lineTo(cx, botTip);
ctx.lineTo(cx + bodyW, botBody);
ctx.lineTo(cx + bodyW, topBody);
ctx.closePath();
ctx.stroke();
// Center ridge line
ctx.beginPath();
ctx.moveTo(cx, topTip);
ctx.lineTo(cx, botTip);
ctx.stroke();
// Shoulder lines
ctx.beginPath();
ctx.moveTo(cx - bodyW, topBody);
ctx.lineTo(cx + bodyW, topBody);
ctx.moveTo(cx - bodyW, botBody);
ctx.lineTo(cx + bodyW, botBody);
ctx.stroke();

// Specular highlight streak on right face
ctx.save();
ctx.globalAlpha = 0.35;
ctx.beginPath();
ctx.moveTo(cx + 40, topBody + 20);
ctx.lineTo(cx + 100, topBody + 40);
ctx.lineTo(cx + 80, botBody - 30);
ctx.lineTo(cx + 20, botBody - 10);
ctx.closePath();
ctx.fillStyle = '#FFFFFF';
ctx.fill();
ctx.restore();

// Small specular on top-right tip
ctx.save();
ctx.globalAlpha = 0.25;
ctx.beginPath();
ctx.moveTo(cx + 20, topTip + 40);
ctx.lineTo(cx + 90, topBody - 10);
ctx.lineTo(cx + 50, topBody);
ctx.lineTo(cx + 10, topTip + 70);
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
