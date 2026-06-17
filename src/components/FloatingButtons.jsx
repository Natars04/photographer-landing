import { useState, useEffect } from 'react';
import ShareModal from './ShareModal';
import './FloatingButtons.css';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <div className="floating-buttons">
        <button
          className="floating-btn"
          onClick={() => setShareOpen(true)}
          aria-label="Поделиться"
          title="Поделиться"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>

        <button
          className={`floating-btn floating-btn--top${showTop ? ' floating-btn--visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Наверх"
          title="Наверх"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </div>

      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
    </>
  );
}
