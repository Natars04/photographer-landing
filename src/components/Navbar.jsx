import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Главная', to: '/' },
  { label: 'Портфолио', to: '/portfolio' },
  { label: 'Услуги и цены', to: '/services' },
  { label: 'Отзывы', to: '/reviews' },
  { label: 'Контакты', to: '/#contacts' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          Ирина Кручинина
        </Link>

        <nav className={`navbar__nav${open ? ' navbar__nav--open' : ''}`} aria-label="Основная навигация">
          {NAV_ITEMS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`navbar__link${location.pathname === to ? ' navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className={`navbar__burger${open ? ' navbar__burger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
