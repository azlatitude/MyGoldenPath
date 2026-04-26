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

function drawCrystalPrism(ctx, x, y, length, width, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const tipLen = length * 0.28;
  const halfW = width / 2;
  ctx.beginPath();
  ctx.moveTo(0, -length / 2);
  ctx.lineTo(-halfW, -length / 2 + tipLen);
  ctx.lineTo(-halfW, length / 2 - tipLen);
  ctx.lineTo(0, length / 2);
  ctx.lineTo(halfW, length / 2 - tipLen);
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

// === GOLDEN CRYSTAL (闪灵水晶 — 3/4 view showing 3 faces of hex prism) ===
const cx = SIZE / 2;
const cy = SIZE / 2 + 10;
const totalH = 620;
const bodyH = 260;
const tipH = 180;
const topTip = cy - totalH / 2;
const topBody = topTip + tipH;
const botBody = topBody + bodyH;
const botTip = botBody + tipH;

// 3 visible faces of hexagonal prism from 3/4 view
const faceW = 130;
const sideW = 90;
const bLeftOuter  = cx - faceW/2 - sideW;
const bLeft       = cx - faceW/2;
const bRight      = cx + faceW/2;
const bRightOuter = cx + faceW/2 + sideW;

// Outer glow
const gemGlow = ctx.createRadialGradient(cx, cy, 50, cx, cy, 400);
gemGlow.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
gemGlow.addColorStop(0.5, 'rgba(255, 180, 0, 0.12)');
gemGlow.addColorStop(1, 'rgba(255, 180, 0, 0)');
ctx.fillStyle = gemGlow;
roundRect(ctx, 0, 0, SIZE, SIZE, 180);
ctx.fill();

// LEFT SIDE FACE (darkest)
ctx.beginPath();
ctx.moveTo(cx, topTip);
ctx.lineTo(bLeftOuter, topBody);
ctx.lineTo(bLeftOuter, botBody);
ctx.lineTo(cx, botTip);
ctx.lineTo(bLeft, botBody);
ctx.lineTo(bLeft, topBody);
ctx.closePath();
const leftGrad = ctx.createLinearGradient(bLeftOuter, topBody, bLeft, botBody);
leftGrad.addColorStop(0, '#8B6914');
leftGrad.addColorStop(0.3, '#A07818');
leftGrad.addColorStop(0.6, '#9A7216');
leftGrad.addColorStop(1, '#7A5A10');
ctx.fillStyle = leftGrad;
ctx.fill();

// CENTER FRONT FACE (medium)
ctx.beginPath();
ctx.moveTo(cx, topTip);
ctx.lineTo(bLeft, topBody);
ctx.lineTo(bLeft, botBody);
ctx.lineTo(cx, botTip);
ctx.lineTo(bRight, botBody);
ctx.lineTo(bRight, topBody);
ctx.closePath();
const cGrad = ctx.createLinearGradient(bLeft, topTip, bRight, botTip);
cGrad.addColorStop(0, '#FFE680');
cGrad.addColorStop(0.2, '#FFD700');
cGrad.addColorStop(0.45, '#FFECB3');
cGrad.addColorStop(0.55, '#FFD700');
cGrad.addColorStop(0.8, '#DAA520');
cGrad.addColorStop(1, '#C8960E');
ctx.fillStyle = cGrad;
ctx.fill();

// RIGHT SIDE FACE (brightest)
ctx.beginPath();
ctx.moveTo(cx, topTip);
ctx.lineTo(bRightOuter, topBody);
ctx.lineTo(bRightOuter, botBody);
ctx.lineTo(cx, botTip);
ctx.lineTo(bRight, botBody);
ctx.lineTo(bRight, topBody);
ctx.closePath();
const rGrad = ctx.createLinearGradient(bRight, topBody, bRightOuter, botBody);
rGrad.addColorStop(0, '#FFF8DC');
rGrad.addColorStop(0.3, '#FFECB3');
rGrad.addColorStop(0.5, '#FFD700');
rGrad.addColorStop(0.7, '#F0C040');
rGrad.addColorStop(1, '#DAA520');
ctx.fillStyle = rGrad;
ctx.fill();

// TOP TIP FACETS (3 triangles converging to top point)
ctx.beginPath(); ctx.moveTo(cx, topTip); ctx.lineTo(bLeftOuter, topBody); ctx.lineTo(bLeft, topBody); ctx.closePath();
ctx.fillStyle = 'rgba(139, 105, 20, 0.5)'; ctx.fill();

ctx.beginPath(); ctx.moveTo(cx, topTip); ctx.lineTo(bLeft, topBody); ctx.lineTo(bRight, topBody); ctx.closePath();
const tcGrad = ctx.createLinearGradient(cx, topTip, cx, topBody);
tcGrad.addColorStop(0, 'rgba(255, 255, 240, 0.5)'); tcGrad.addColorStop(1, 'rgba(255, 215, 0, 0.15)');
ctx.fillStyle = tcGrad; ctx.fill();

ctx.beginPath(); ctx.moveTo(cx, topTip); ctx.lineTo(bRight, topBody); ctx.lineTo(bRightOuter, topBody); ctx.closePath();
ctx.fillStyle = 'rgba(255, 248, 220, 0.35)'; ctx.fill();

// BOTTOM TIP FACETS
ctx.beginPath(); ctx.moveTo(cx, botTip); ctx.lineTo(bLeftOuter, botBody); ctx.lineTo(bLeft, botBody); ctx.closePath();
ctx.fillStyle = 'rgba(100, 75, 10, 0.55)'; ctx.fill();

ctx.beginPath(); ctx.moveTo(cx, botTip); ctx.lineTo(bLeft, botBody); ctx.lineTo(bRight, botBody); ctx.closePath();
ctx.fillStyle = 'rgba(184, 134, 11, 0.35)'; ctx.fill();

ctx.beginPath(); ctx.moveTo(cx, botTip); ctx.lineTo(bRight, botBody); ctx.lineTo(bRightOuter, botBody); ctx.closePath();
ctx.fillStyle = 'rgba(218, 165, 32, 0.25)'; ctx.fill();

// ALL EDGES
ctx.strokeStyle = 'rgba(255, 248, 220, 0.55)'; ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(cx, topTip); ctx.lineTo(bLeftOuter, topBody); ctx.lineTo(bLeftOuter, botBody);
ctx.lineTo(cx, botTip); ctx.lineTo(bRightOuter, botBody); ctx.lineTo(bRightOuter, topBody); ctx.closePath();
ctx.stroke();

// Inner ridges
ctx.beginPath();
ctx.moveTo(bLeft, topBody); ctx.lineTo(bLeft, botBody);
ctx.moveTo(bRight, topBody); ctx.lineTo(bRight, botBody);
ctx.moveTo(cx, topTip); ctx.lineTo(cx, botTip);
ctx.stroke();

// Shoulder lines
ctx.strokeStyle = 'rgba(255, 248, 220, 0.4)'; ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.moveTo(bLeftOuter, topBody); ctx.lineTo(bLeft, topBody); ctx.lineTo(bRight, topBody); ctx.lineTo(bRightOuter, topBody);
ctx.moveTo(bLeftOuter, botBody); ctx.lineTo(bLeft, botBody); ctx.lineTo(bRight, botBody); ctx.lineTo(bRightOuter, botBody);
ctx.stroke();

// Tip lines
ctx.strokeStyle = 'rgba(255, 248, 220, 0.35)'; ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.moveTo(cx, topTip); ctx.lineTo(bLeft, topBody);
ctx.moveTo(cx, topTip); ctx.lineTo(bRight, topBody);
ctx.moveTo(cx, botTip); ctx.lineTo(bLeft, botBody);
ctx.moveTo(cx, botTip); ctx.lineTo(bRight, botBody);
ctx.stroke();

// SPECULAR HIGHLIGHTS
ctx.save(); ctx.globalAlpha = 0.3;
ctx.beginPath();
ctx.moveTo(bLeft + 20, topBody + 30); ctx.lineTo(bLeft + 50, topBody + 20);
ctx.lineTo(bLeft + 40, botBody - 20); ctx.lineTo(bLeft + 10, botBody - 10);
ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();

ctx.save(); ctx.globalAlpha = 0.22;
ctx.beginPath();
ctx.moveTo(bRight + 30, topBody + 40); ctx.lineTo(bRight + 65, topBody + 50);
ctx.lineTo(bRight + 55, botBody - 40); ctx.lineTo(bRight + 20, botBody - 30);
ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();

ctx.save(); ctx.globalAlpha = 0.2;
ctx.beginPath();
ctx.moveTo(cx + 10, topTip + 30); ctx.lineTo(bRight - 10, topBody - 5); ctx.lineTo(cx + 5, topBody);
ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();

// === CRYSTAL PRISM SPARKLES ===
const crystals = [
  [cx - 30, 270, 55, 12, -0.3, 0.95],
  [cx + 150, 400, 40, 9, 0.8, 0.85],
  [cx - 180, 420, 35, 8, -0.6, 0.8],
  [cx + 60, 580, 30, 7, 1.2, 0.75],
  [cx - 90, 650, 28, 6, -1.0, 0.7],
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
  const glowR = length * 0.9;
  const sg = ctx.createRadialGradient(x, y, 0, x, y, glowR);
  sg.addColorStop(0, `rgba(255, 248, 200, ${opacity * 0.6})`);
  sg.addColorStop(0.4, `rgba(255, 230, 150, ${opacity * 0.2})`);
  sg.addColorStop(1, 'rgba(255, 230, 150, 0)');
  ctx.fillStyle = sg;
  ctx.fillRect(x - glowR, y - glowR, glowR * 2, glowR * 2);

  drawCrystalPrism(ctx, x, y, length, width, angle);
  const cg = ctx.createLinearGradient(
    x + Math.cos(angle) * (-length/2), y + Math.sin(angle) * (-length/2),
    x + Math.cos(angle) * (length/2), y + Math.sin(angle) * (length/2)
  );
  cg.addColorStop(0, `rgba(255,255,255,${opacity*0.4})`);
  cg.addColorStop(0.3, `rgba(255,255,255,${opacity})`);
  cg.addColorStop(0.5, `rgba(255,248,220,${opacity})`);
  cg.addColorStop(0.7, `rgba(255,255,255,${opacity})`);
  cg.addColorStop(1, `rgba(255,255,255,${opacity*0.4})`);
  ctx.fillStyle = cg;
  ctx.fill();
});

// Tiny dots
const dots = [
  [370,280,3],[700,320,2],[430,770,2],[590,830,2],[190,430,2],[840,380,2],
  [520,140,2],[740,600,2],[290,700,2],[150,310,1.5],[860,270,1.5],[620,130,1.5],
];
dots.forEach(([x, y, r]) => {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,255,255,${0.4 + Math.random() * 0.4})`; ctx.fill();
});

// === SAVE ===
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('assets/icon.png', buffer);
fs.copyFileSync('assets/icon.png', 'assets/adaptive-icon.png');
console.log('Generated hex prism crystal icon');
