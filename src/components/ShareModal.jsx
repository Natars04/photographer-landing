import { useState, useEffect } from 'react';
import './ShareModal.css';

export default function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const shareLinks = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(url)}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
    },
    {
      label: 'ВКонтакте',
      href: `https://vk.com/share.php?url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.71 13.5h-1.77c-.67 0-.88-.54-2.08-1.75-.97-.97-1.4-.97-1.64-.97-.33 0-.42.08-.42.5v1.6c0 .35-.11.56-1.04.56-1.53 0-3.23-.93-4.43-2.65C4.85 10.9 4.5 9.1 4.5 8.73c0-.24.08-.46.5-.46h1.77c.37 0 .52.17.66.58.73 2.1 1.94 3.93 2.44 3.93.19 0 .27-.09.27-.57V10c-.06-1.02-.6-1.1-.6-1.47 0-.22.18-.43.46-.43h2.79c.31 0 .43.17.43.54v2.9c0 .31.13.42.22.42.19 0 .35-.11.7-.46 1.08-1.2 1.85-3.06 1.85-3.06.1-.22.3-.43.67-.43h1.77c.53 0 .65.27.53.54-.22 1.03-2.36 4.03-2.36 4.03-.19.3-.26.43 0 .76.18.25.78.78 1.18 1.25.73.84 1.29 1.54 1.44 2.03.14.47-.1.71-.56.71z"/>
        </svg>
      ),
    },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
        </svg>
      ),
    },
    {
      label: 'Viber',
      href: `viber://forward?text=${encodeURIComponent(url)}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9A16 16 0 0 0 15.1 16.1l.9-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="share-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Поделиться ссылкой">
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <button className="share-modal__close" onClick={onClose} aria-label="Закрыть">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h3 className="share-modal__title">Поделиться ссылкой</h3>

        <div className="share-modal__copy">
          <input
            type="text"
            value={url}
            readOnly
            className="share-modal__input"
            aria-label="URL страницы"
          />
          <button className="share-modal__copy-btn" onClick={handleCopy}>
            {copied ? 'Скопировано ✓' : 'Скопировать'}
          </button>
        </div>

        <div className="share-modal__links">
          {shareLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="share-modal__link"
              aria-label={label}
            >
              {icon}
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
