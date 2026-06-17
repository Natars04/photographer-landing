import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './FAQ.css';

const faqItems = [
  {
    question: 'Где проходит съёмка?',
    answer:
      'Любая локация на ваш выбор — дом, улица, парк. Работаю в Воронеже и Воронежской области.',
  },
  {
    question: 'Сколько длится съёмка?',
    answer:
      'В среднем 1 час, но я не тороплюсь — если нужно больше времени, беру его без доплаты.',
  },
  {
    question: 'Как забронировать дату?',
    answer:
      'Оставьте заявку на сайте или напишите в Telegram. Бронирование подтверждается предоплатой 1 500 ₽.',
  },
  {
    question: 'Когда получу фотографии?',
    answer: 'В течение 7 дней после съёмки.',
  },
  {
    question: 'Делаете ли вы ретушь?',
    answer:
      'Лёгкая цветокоррекция включена в стоимость. Каждый снимок обрабатывается в тёплом атмосферном стиле.',
  },
  {
    question: 'Нужно ли готовиться к съёмке?',
    answer:
      'Никакой специальной подготовки не нужно. Я снимаю вас настоящими — в привычной обстановке, в движении, в жизни.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useReveal();

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="section" id="faq">
      <div className="container faq reveal" ref={ref}>
        <div className="faq__header">
          <span className="section-label">Вопросы и ответы</span>
          <h2 className="section-title">Часто спрашивают</h2>
        </div>

        <ul className="faq__list">
          {faqItems.map((item, index) => (
            <li key={index} className={`faq__item${openIndex === index ? ' faq__item--open' : ''}`}>
              <button className="faq__question" onClick={() => toggle(index)} aria-expanded={openIndex === index}>
                <span>{item.question}</span>
                <span className="faq__icon" aria-hidden="true">+</span>
              </button>
              <div className="faq__answer">
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
