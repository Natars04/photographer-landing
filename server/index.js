import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendToTelegram, validateContactPayload } from './telegram.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

const rateLimitMap = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);

  return entry.count <= RATE_LIMIT;
}

app.use(express.json({ limit: '16kb' }));

app.post('/api/contact', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      ok: false,
      message: 'Слишком много запросов. Попробуйте через минуту.',
    });
  }

  const validation = validateContactPayload(req.body);

  if (!validation.ok) {
    return res.status(400).json({
      ok: false,
      message: 'Проверьте правильность заполнения формы',
      errors: validation.errors,
    });
  }

  try {
    const result = await sendToTelegram(validation.data);
    return res.json({
      ok: true,
      stub: result.stub,
      message: result.stub
        ? 'Заявка принята (режим заглушки — Telegram не настроен)'
        : 'Спасибо! Ваша заявка отправлена.',
    });
  } catch {
    return res.status(502).json({
      ok: false,
      message: 'Не удалось отправить заявку. Попробуйте позже или напишите напрямую.',
    });
  }
});

if (isProduction) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.log('[INFO] Telegram stub mode — заявки логируются в консоль');
  }
});
