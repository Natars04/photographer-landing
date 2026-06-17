import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const INPUT_DIR = './public/images/hero';
const OUTPUT_DIR = './public/images/hero';
const MAX_WIDTH = 1920;
const QUALITY = 82;

const files = await readdir(INPUT_DIR);
const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

for (const file of images) {
  const input = join(INPUT_DIR, file);

  // Выходной файл: убираем двойное расширение если есть, всегда сохраняем как .jpg
  const cleanName = file.replace(/\.jpg\.jpg$/i, '.jpg').replace(/\.jpeg$/i, '.jpg');
  const output = join(OUTPUT_DIR, cleanName);

  const before = (await import('fs')).statSync(input).size;

  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true })
    .toFile(output === input ? input + '.tmp' : output);

  // Если имя совпадает (нет двойного расширения) — переименовываем tmp
  if (output === input) {
    const fs = await import('fs');
    fs.renameSync(input + '.tmp', output);
  }

  const after = (await import('fs')).statSync(output).size;
  const saved = (((before - after) / before) * 100).toFixed(0);
  console.log(`${file} → ${cleanName}: ${(before/1024/1024).toFixed(1)} МБ → ${(after/1024).toFixed(0)} КБ (−${saved}%)`);
}

console.log('\nГотово!');
