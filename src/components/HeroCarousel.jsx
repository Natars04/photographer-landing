import { useState, useEffect } from 'react';
import './HeroCarousel.css';

const SLIDES = [
  { src: '/images/hero/hero-1.jpg', alt: 'Фотосессия с животными' },
  { src: '/images/hero/hero-2.jpg', alt: 'Семейная фотосессия' },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-carousel">
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`hero-carousel__slide${i === active ? ' hero-carousel__slide--active' : ''}`}
        />
      ))}

      <div className="hero-carousel__overlay" />

      <div className="hero-carousel__content">
        <h1 className="hero-carousel__title">
          Сохраняю моменты,<br />которые невозможно повторить
        </h1>
        <p className="hero-carousel__subtitle">
          Семейные и pet-friendly съёмки про жизнь, эмоции и любовь
        </p>
        <p className="hero-carousel__subtitle">
          Приглашаю вас на тёплую фотосессию о самом важном - о вас
        </p>
        <div className="hero-carousel__buttons">
          <a href="#contacts" className="hero-carousel__btn">Записаться</a>
        </div>
      </div>

      <div className="hero-carousel__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-carousel__dot${i === active ? ' hero-carousel__dot--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
