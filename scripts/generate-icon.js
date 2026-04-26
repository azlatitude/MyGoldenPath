const { createCanvas } = require('canvas');
const fs = require('fs');
const SIZE = 1024;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

function drawStar4(ctx, x, y, outerR, innerR) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
  }
  ctx.closePath();
}

// Draw a hex prism crystal. Rotates around the BOTTOM TIP so all tips converge.
// pivotX, pivotY: the bottom tip position (convergence point)
// heightScale: optional, multiplier for height independent of width (default 1.0)
function drawHexCrystal(ctx, pivotX, pivotY, rotation, scale, colors, heightScale) {
  ctx.save();
  const hScale = (heightScale || 1.0) * scale;

  const totalH = 620 * hScale;
  const bodyH = 260 * hScale;
  const tipH = 180 * hScale;
  const faceW = 130 * scale;
  const sideW = 90 * scale;

  // Rotate around the bottom tip
  ctx.translate(pivotX, pivotY);
  ctx.rotate(rotation);

  // Positions relative to bottom tip at origin (0,0)
  const bTip = 0;
  const bBody = -tipH;
  const tBody = bBody - bodyH;
  const tTip = tBody - tipH;
  const LO = -faceW/2 - sideW;
  const L = -faceW/2;
  const R = faceW/2;
  const RO = faceW/2 + sideW;

  // Glow
  ctx.save(); ctx.rotate(-rotation);
  const glow = ctx.createRadialGradient(0, 0, 20, 0, 0, totalH * 0.55);
  glow.addColorStop(0, `rgba(${colors.glowColor}, ${colors.glowOp})`);
  glow.addColorStop(0.5, `rgba(${colors.glowColor}, ${colors.glowOp * 0.3})`);
  glow.addColorStop(1, `rgba(${colors.glowColor}, 0)`);
  ctx.fillStyle = glow; ctx.fillRect(-totalH, -totalH, totalH*2, totalH*2);
  ctx.restore();

  // LEFT FACE
  ctx.beginPath();
  ctx.moveTo(0, tTip); ctx.lineTo(LO, tBody); ctx.lineTo(LO, bBody);
  ctx.lineTo(0, bTip); ctx.lineTo(L, bBody); ctx.lineTo(L, tBody); ctx.closePath();
  const lg = ctx.createLinearGradient(LO, tBody, L, bBody);
  colors.dark.forEach(([o, c]) => lg.addColorStop(o, c));
  ctx.fillStyle = lg; ctx.fill();

  // CENTER FACE
  ctx.beginPath();
  ctx.moveTo(0, tTip); ctx.lineTo(L, tBody); ctx.lineTo(L, bBody);
  ctx.lineTo(0, bTip); ctx.lineTo(R, bBody); ctx.lineTo(R, tBody); ctx.closePath();
  const mg = ctx.createLinearGradient(L, tTip, R, bTip);
  colors.mid.forEach(([o, c]) => mg.addColorStop(o, c));
  ctx.fillStyle = mg; ctx.fill();

  // RIGHT FACE
  ctx.beginPath();
  ctx.moveTo(0, tTip); ctx.lineTo(RO, tBody); ctx.lineTo(RO, bBody);
  ctx.lineTo(0, bTip); ctx.lineTo(R, bBody); ctx.lineTo(R, tBody); ctx.closePath();
  const rg = ctx.createLinearGradient(R, tBody, RO, bBody);
  colors.bright.forEach(([o, c]) => rg.addColorStop(o, c));
  ctx.fillStyle = rg; ctx.fill();

  // TOP TIP FACETS
  ctx.beginPath(); ctx.moveTo(0, tTip); ctx.lineTo(LO, tBody); ctx.lineTo(L, tBody); ctx.closePath();
  ctx.fillStyle = colors.tipDark; ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, tTip); ctx.lineTo(L, tBody); ctx.lineTo(R, tBody); ctx.closePath();
  const tcg = ctx.createLinearGradient(0, tTip, 0, tBody);
  tcg.addColorStop(0, colors.tipBright); tcg.addColorStop(1, colors.tipDark);
  ctx.fillStyle = tcg; ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, tTip); ctx.lineTo(R, tBody); ctx.lineTo(RO, tBody); ctx.closePath();
  ctx.fillStyle = colors.tipBright; ctx.fill();

  // BOTTOM TIP FACETS
  ctx.beginPath(); ctx.moveTo(0, bTip); ctx.lineTo(LO, bBody); ctx.lineTo(L, bBody); ctx.closePath();
  ctx.fillStyle = colors.tipDark; ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, bTip); ctx.lineTo(L, bBody); ctx.lineTo(R, bBody); ctx.closePath();
  ctx.fillStyle = `${colors.tipDark}88`; ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, bTip); ctx.lineTo(R, bBody); ctx.lineTo(RO, bBody); ctx.closePath();
  ctx.fillStyle = `${colors.tipBright}66`; ctx.fill();

  // EDGES
  ctx.strokeStyle = colors.edge; ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(0, tTip); ctx.lineTo(LO, tBody); ctx.lineTo(LO, bBody);
  ctx.lineTo(0, bTip); ctx.lineTo(RO, bBody); ctx.lineTo(RO, tBody); ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(L, tBody); ctx.lineTo(L, bBody);
  ctx.moveTo(R, tBody); ctx.lineTo(R, bBody);
  ctx.stroke();
  ctx.strokeStyle = colors.edge.replace('0.55', '0.35'); ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.moveTo(LO, tBody); ctx.lineTo(L, tBody); ctx.lineTo(R, tBody); ctx.lineTo(RO, tBody);
  ctx.moveTo(LO, bBody); ctx.lineTo(L, bBody); ctx.lineTo(R, bBody); ctx.lineTo(RO, bBody);
  ctx.moveTo(0, tTip); ctx.lineTo(L, tBody); ctx.moveTo(0, tTip); ctx.lineTo(R, tBody);
  ctx.moveTo(0, bTip); ctx.lineTo(L, bBody); ctx.moveTo(0, bTip); ctx.lineTo(R, bBody);
  ctx.stroke();

  // SPECULAR
  ctx.save(); ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.moveTo(L + 15*scale, tBody + 25*scale); ctx.lineTo(L + 40*scale, tBody + 18*scale);
  ctx.lineTo(L + 32*scale, bBody - 18*scale); ctx.lineTo(L + 8*scale, bBody - 10*scale);
  ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();

  ctx.restore();
}

const GOLD = {
  dark: [[0,'#8B6914'],[0.3,'#A07818'],[0.6,'#9A7216'],[1,'#7A5A10']],
  mid: [[0,'#FFE680'],[0.2,'#FFD700'],[0.45,'#FFECB3'],[0.55,'#FFD700'],[0.8,'#DAA520'],[1,'#C8960E']],
  bright: [[0,'#FFF8DC'],[0.3,'#FFECB3'],[0.5,'#FFD700'],[0.7,'#F0C040'],[1,'#DAA520']],
  tipDark: 'rgba(139,105,20,0.5)', tipBright: 'rgba(255,248,220,0.35)',
  edge: 'rgba(255,248,220,0.55)', glowColor: '255,215,0', glowOp: 0.35,
};
const GREEN = {
  dark: [[0,'#0D5E3A'],[0.5,'#147A4C'],[1,'#0A4D30']],
  mid: [[0,'#34D399'],[0.25,'#2DD4A0'],[0.5,'#6EE7B7'],[0.75,'#34D399'],[1,'#10B981']],
  bright: [[0,'#A7F3D0'],[0.3,'#6EE7B7'],[0.6,'#34D399'],[1,'#10B981']],
  tipDark: 'rgba(10,77,48,0.5)', tipBright: 'rgba(167,243,208,0.35)',
  edge: 'rgba(167,243,208,0.55)', glowColor: '16,185,129', glowOp: 0.25,
};
const WHITE = {
  dark: [[0,'#8899AA'],[0.3,'#A0AABB'],[0.6,'#95A5B5'],[1,'#7888A0']],
  mid: [[0,'#E8EDF5'],[0.2,'#F0F4FA'],[0.45,'#FFFFFF'],[0.55,'#F0F4FA'],[0.8,'#D8DEE8'],[1,'#C0CAD8']],
  bright: [[0,'#FFFFFF'],[0.3,'#F0F4FF'],[0.5,'#E8EEFF'],[0.7,'#F8FAFF'],[1,'#DEE4F0']],
  tipDark: 'rgba(100,115,140,0.45)', tipBright: 'rgba(240,244,255,0.4)',
  edge: 'rgba(220,230,245,0.55)', glowColor: '200,210,230', glowOp: 0.2,
};

function drawBackground(ctx) {
  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0, '#0F1B4D'); bg.addColorStop(0.4, '#1E3A8A');
  bg.addColorStop(0.7, '#1D4ED8'); bg.addColorStop(1, '#2563EB');
  roundRect(ctx, 0, 0, SIZE, SIZE, 180);
  ctx.fillStyle = bg; ctx.fill();
  const wg = ctx.createRadialGradient(SIZE/2, SIZE/2+30, 0, SIZE/2, SIZE/2+30, SIZE*0.5);
  wg.addColorStop(0, 'rgba(255,200,50,0.18)');
  wg.addColorStop(0.4, 'rgba(255,180,30,0.08)');
  wg.addColorStop(1, 'rgba(255,180,30,0)');
  ctx.fillStyle = wg; ctx.fill();
}

function drawStars(ctx, cx) {
  let seed = 42;
  function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }

  const stars = [
    { x: cx - 60, y: 160, outer: 30, inner: 5, op: 1.0 },
    { x: cx + 250, y: 280, outer: 22, inner: 4, op: 0.85 },
    { x: cx - 240, y: 350, outer: 16, inner: 3, op: 0.75 },
    { x: 800, y: 180, outer: 18, inner: 3, op: 0.6 },
    { x: 150, y: 250, outer: 12, inner: 2, op: 0.55 },
    { x: 880, y: 720, outer: 14, inner: 3, op: 0.5 },
    { x: 180, y: 780, outer: 10, inner: 2, op: 0.4 },
    { x: cx, y: 900, outer: 8, inner: 1.5, op: 0.35 },
    { x: 900, y: 420, outer: 7, inner: 1.5, op: 0.3 },
    { x: 120, y: 550, outer: 6, inner: 1, op: 0.28 },
    { x: 700, y: 870, outer: 5, inner: 1, op: 0.22 },
  ];
  for (let i = 0; i < 15; i++) {
    stars.push({ x: 70+rand()*884, y: 70+rand()*884, outer: 2+rand()*7, inner: 0.6+rand()*1.5, op: 0.12+rand()*0.3 });
  }
  stars.forEach(({ x, y, outer, inner, op }) => {
    const glowR = outer * 2.5;
    const sg = ctx.createRadialGradient(x, y, 0, x, y, glowR);
    sg.addColorStop(0, `rgba(255,250,210,${op*0.65})`);
    sg.addColorStop(0.35, `rgba(255,240,170,${op*0.2})`);
    sg.addColorStop(1, 'rgba(255,240,170,0)');
    ctx.fillStyle = sg; ctx.fillRect(x-glowR, y-glowR, glowR*2, glowR*2);
    ctx.save(); ctx.globalAlpha = op;
    drawStar4(ctx, x, y, outer, inner);
    ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();
  });
}

// === VERSION 1: Gold + Green (green behind) ===
{
  const canvas1 = createCanvas(SIZE, SIZE);
  const c = canvas1.getContext('2d');
  drawBackground(c);
  const px = SIZE / 2;
  const py = 850; // pivot = bottom tip convergence

  // Green fluorite BEHIND, tilted right
  drawHexCrystal(c, px, py, 0.35, 0.7, GREEN);
  // Golden crystal in FRONT, vertical
  drawHexCrystal(c, px, py, 0, 1.0, GOLD);

  drawStars(c, px);
  fs.writeFileSync('assets/icon.png', canvas1.toBuffer('image/png'));
  fs.copyFileSync('assets/icon.png', 'assets/adaptive-icon.png');
  console.log('icon.png: Gold front + Green behind');
}

// === VERSION 2: White + Gold + Green — ALL TIPS CONVERGE AT ONE POINT ===
{
  const canvas2 = createCanvas(SIZE, SIZE);
  const c = canvas2.getContext('2d');
  drawBackground(c);
  const px = SIZE / 2;  // same pivot X for all 3
  const py = 860;       // same pivot Y — the single convergence point

  // Green (medium-thick, scale 0.78) — behind right, tilted ~50deg
  drawHexCrystal(c, px, py, 0.87, 0.78, GREEN);
  // White (thinnest but tallest, scale 0.52, heightScale 1.5) — behind left, tilted ~38deg
  drawHexCrystal(c, px, py, -0.66, 0.52, WHITE, 1.5);
  // Gold (thickest, scale 1.0) — front center, near vertical ~3deg
  drawHexCrystal(c, px, py, 0.05, 1.0, GOLD);

  drawStars(c, px);
  fs.writeFileSync('assets/icon-v2.png', canvas2.toBuffer('image/png'));
  console.log('icon-v2.png: 3 crystals, tips converge, varied thickness & angles');
}
