import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__left">
          <span className="footer__name">Ирина Кручинина</span>
          <span className="footer__role">Семейный фотограф и анималист</span>
          <span className="footer__city">Воронеж</span>
        </div>
        <div className="footer__right">
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="ВКонтакте">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.71 13.5h-1.77c-.67 0-.88-.54-2.08-1.75-.97-.97-1.4-.97-1.64-.97-.33 0-.42.08-.42.5v1.6c0 .35-.11.56-1.04.56-1.53 0-3.23-.93-4.43-2.65C4.85 10.9 4.5 9.1 4.5 8.73c0-.24.08-.46.5-.46h1.77c.37 0 .52.17.66.58.73 2.1 1.94 3.93 2.44 3.93.19 0 .27-.09.27-.57V10c-.06-1.02-.6-1.1-.6-1.47 0-.22.18-.43.46-.43h2.79c.31 0 .43.17.43.54v2.9c0 .31.13.42.22.42.19 0 .35-.11.7-.46 1.08-1.2 1.85-3.06 1.85-3.06.1-.22.3-.43.67-.43h1.77c.53 0 .65.27.53.54-.22 1.03-2.36 4.03-2.36 4.03-.19.3-.26.43 0 .76.18.25.78.78 1.18 1.25.73.84 1.29 1.54 1.44 2.03.14.47-.1.71-.56.71z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
