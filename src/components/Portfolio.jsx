import { Link } from 'react-router-dom';
import './Portfolio.css';

const CARDS = [
  {
    img: '/images/gallery/family/family-10.jpg',
    alt: 'Семейная съёмка',
    caption: 'Семья и хвостики',
    tab: 'family',
  },
  {
    img: '/images/gallery/individual/kovaleva/kovaleva-30.jpg',
    alt: 'Индивидуальная съёмка',
    caption: 'Индивидуальная съёмка',
    tab: 'individual',
  },
  {
    img: '/images/gallery/reportage/reportage-1.jpg',
    alt: 'Репортажная съёмка',
    caption: 'Репортажная съёмка',
    tab: 'reportage',
  },
];

export default function Portfolio() {
  return (
    <>
      <section className="portfolio section--beige" id="portfolio">
        <h2 className="portfolio__title">Моё портфолио</h2>
        <div className="portfolio__cards">
          {CARDS.map((card) => (
            <Link key={card.caption} to={`/portfolio?tab=${card.tab}`} className="portfolio__card">
              <img src={card.img} alt={card.alt} className="portfolio__card-img" />
              <p className="portfolio__card-caption">{card.caption}</p>
            </Link>
          ))}
        </div>
      </section>
      <hr className="section-divider" />
    </>
  );
}
