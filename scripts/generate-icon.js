const { createCanvas } = require('canvas');
const fs = require('fs');

const SIZE = 1024;
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext('2d');

// Rounded rect helper
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

// Blue gradient background with rounded corners
const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
bg.addColorStop(0, '#1E3A8A');
bg.addColorStop(0.5, '#2563EB');
bg.addColorStop(1, '#3B82F6');
roundRect(ctx, 0, 0, SIZE, SIZE, 180);
ctx.fillStyle = bg;
ctx.fill();

// Radial glow
const glow = ctx.createRadialGradient(SIZE/2, SIZE/2, 0, SIZE/2, SIZE/2, SIZE*0.45);
glow.addColorStop(0, 'rgba(147, 197, 253, 0.35)');
glow.addColorStop(1, 'rgba(147, 197, 253, 0)');
ctx.fillStyle = glow;
ctx.fill();

// Diamond gem
const cx = SIZE / 2;
const cy = SIZE / 2 - 10;

ctx.beginPath();
ctx.moveTo(cx, 200);       // top
ctx.lineTo(cx + 260, 420); // upper right
ctx.lineTo(cx + 168, 780); // lower right
ctx.lineTo(cx - 168, 780); // lower left
ctx.lineTo(cx - 260, 420); // upper left
ctx.closePath();

const gemGrad = ctx.createLinearGradient(cx - 260, 200, cx + 260, 780);
gemGrad.addColorStop(0, '#FFFFFF');
gemGrad.addColorStop(0.3, '#E0F2FE');
gemGrad.addColorStop(0.5, '#BAE6FD');
gemGrad.addColorStop(0.7, '#E0F2FE');
gemGrad.addColorStop(1, '#FFFFFF');
ctx.fillStyle = gemGrad;
ctx.fill();
ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
ctx.lineWidth = 3;
ctx.stroke();

// Facet lines
ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(cx, 200); ctx.lineTo(cx - 82, 420);
ctx.moveTo(cx, 200); ctx.lineTo(cx + 82, 420);
ctx.moveTo(cx - 260, 420); ctx.lineTo(cx + 260, 420);
ctx.moveTo(cx - 82, 420); ctx.lineTo(cx, 680);
ctx.moveTo(cx + 82, 420); ctx.lineTo(cx, 680);
ctx.moveTo(cx - 168, 780); ctx.lineTo(cx - 82, 420);
ctx.moveTo(cx + 168, 780); ctx.lineTo(cx + 82, 420);
ctx.stroke();

// Sparkles with glow
const sparkles = [
  [420, 310, 10], [620, 350, 8], [560, 520, 7],
  [380, 500, 9], [660, 260, 6], [440, 650, 6],
  [300, 380, 7], [700, 480, 5],
];
sparkles.forEach(([x, y, r]) => {
  const sg = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
  sg.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  sg.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
  sg.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sg;
  ctx.fillRect(x - r*4, y - r*4, r*8, r*8);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
});

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('assets/icon.png', buffer);
fs.copyFileSync('assets/icon.png', 'assets/adaptive-icon.png');
console.log('Generated assets/icon.png and assets/adaptive-icon.png (1024x1024)');
