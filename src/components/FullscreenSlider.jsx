import { useState, useEffect } from 'react';
import './FullscreenSlider.css';

const SLIDES = [
  { src: '/images/slider/slide-01.jpg', label: 'Тропинка в лесу' },
  { src: '/images/slider/slide-02.jpg', label: 'Первые шаги' },
  { src: '/images/slider/slide-03.jpg', label: 'Вольные кони' },
  { src: '/images/slider/slide-04.jpg', label: 'Майское солнце' },
  { src: '/images/slider/slide-05.jpg', label: 'Встреча с природой' },
  { src: '/images/slider/slide-06.jpg', label: 'Весенние ветки' },
  { src: '/images/slider/slide-07.jpg', label: 'Меловые горы' },
  { src: '/images/slider/slide-08.jpg', label: 'Босые ноги' },
];

export default function FullscreenSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((a) => (a + 1) % SLIDES.length);

  return (
    <section className="fs-slider">
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.label}
          className={`fs-slider__img${i === active ? ' fs-slider__img--active' : ''}`}
        />
      ))}

      <div className="fs-slider__overlay" />

      <p className="fs-slider__caption">{SLIDES[active].label}</p>

      <button className="fs-slider__arrow fs-slider__arrow--prev" onClick={prev} aria-label="Назад">
        &#8592;
      </button>
      <button className="fs-slider__arrow fs-slider__arrow--next" onClick={next} aria-label="Вперёд">
        &#8594;
      </button>

      <div className="fs-slider__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`fs-slider__dot${i === active ? ' fs-slider__dot--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
