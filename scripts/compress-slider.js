import sharp from 'sharp';
import { statSync } from 'fs';
import { unlink } from 'fs/promises';

const DIR = './public/images/slider';
const MAX_WIDTH = 1920;
const QUALITY = 82;

const SLIDES = [
  { from: 'photo_2026-05-03_22-41-06.jpg', to: 'slide-01.jpg' },
  { from: 'photo_2026-05-20_16-10-15.jpg', to: 'slide-02.jpg' },
  { from: 'photo_2026-06-16_19-40-09.jpg', to: 'slide-03.jpg' },
  { from: 'photo_2026-04-28_18-00-03.jpg', to: 'slide-04.jpg' },
  { from: 'photo_2026-06-16_19-40-26.jpg', to: 'slide-05.jpg' },
  { from: 'photo_2026-04-28_18-00-05.jpg', to: 'slide-06.jpg' },
  { from: 'photo_2026-06-16_19-40-31.jpg', to: 'slide-07.jpg' },
  { from: 'photo_2026-06-16_19-40-30.jpg', to: 'slide-08.jpg' },
];

for (const { from, to } of SLIDES) {
  const input = `${DIR}/${from}`;
  const output = `${DIR}/${to}`;
  const before = statSync(input).size;
  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true })
    .toFile(output);
  const after = statSync(output).size;
  const pct = (((before - after) / before) * 100).toFixed(0);
  console.log(`${to}: ${(before/1024).toFixed(0)}КБ → ${(after/1024).toFixed(0)}КБ (${pct > 0 ? '-'+pct : '+'+Math.abs(pct)}%)`);
}

for (const { from } of SLIDES) {
  await unlink(`${DIR}/${from}`);
}

console.log('\nГотово! Исходные файлы удалены.');
