import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <span className="hero__kicker">Давайте знакомиться</span>
        <p className="hero__name-label">Меня зовут</p>
        <h1 className="hero__title">
          Ирина Кручинина —<br />
          семейный фотограф<br />
          и анималист в Воронеже.
        </h1>
        <p className="hero__text">
          Снимаю живые истории: семьи, детей и их питомцев.
          Для меня каждая съёмка — это воспоминания,
          которые вы будете пересматривать спустя годы.
          Верю, что лучшие фотографии получаются тогда, когда люди расслаблены
          и чувствуют себя комфортно — именно это я создаю на каждой съёмке.
        </p>
      </div>
    </section>
  );
}
