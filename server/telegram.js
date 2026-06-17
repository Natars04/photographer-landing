const TELEGRAM_API = 'https://api.telegram.org';

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function validateContactPayload(body) {
  const errors = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || name.length > 80) {
    errors.name = 'Имя должно содержать от 2 до 80 символов';
  }

  const contactPattern = /^(\+?[\d\s\-().]{5,30}|[\w.+-]+@[\w.-]+\.\w{2,})$/;
  if (!contactPattern.test(contact) || contact.length > 120) {
    errors.contact = 'Укажите корректный телефон или email';
  }

  if (message.length < 10 || message.length > 2000) {
    errors.message = 'Сообщение должно содержать от 10 до 2000 символов';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data: { name, contact, message } };
}

export async function sendToTelegram({ name, contact, message }) {
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    console.log('[STUB] Новая заявка с сайта:');
    console.log(`  Имя: ${name}`);
    console.log(`  Контакт: ${contact}`);
    console.log(`  Сообщение: ${message}`);
    return { ok: true, stub: true };
  }

  const text = [
    '<b>📸 Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Контакт:</b> ${escapeHtml(contact)}`,
    `<b>Сообщение:</b>`,
    escapeHtml(message),
  ].join('\n');

  const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    console.error('[Telegram] Ошибка отправки:', result);
    throw new Error('Не удалось отправить сообщение в Telegram');
  }

  return { ok: true, stub: false };
}
