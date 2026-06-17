import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PortfolioGallery from '../components/PortfolioGallery';
import './PortfolioPage.css';

const IMAGE_SETS = {
  family: [
    '/images/gallery/family/family-4.jpg',   // малыш смеётся на руках — самый сильный, золотой боке
    '/images/gallery/family/family-7.jpg',   // B&W силуэт беременной семьи — другая эмоция
    '/images/gallery/family/family-2.jpg',   // мама целует малыша в цветах — нежно, цвет после B&W
    '/images/gallery/family/family-1.jpg',   // два малыша в лесу — общий план, смена масштаба
    '/images/gallery/family/family-10.jpg',  // B&W щека к щеке — крупный, интимный
    '/images/gallery/family/family-3.jpg',   // пёс на траве — смена сцены, пауза
    '/images/gallery/family/family-9.jpg',   // папа с малышом в парке — средний план, радость
    '/images/gallery/family/family-6.jpg',   // B&W беременная семья у кроватки — нарративный
    '/images/gallery/family/family-5.jpg',   // мыльные пузыри — цвет, действие
    '/images/gallery/family/family-8.jpg',   // семья с шаром «2 года» — праздник, финал
  ],
  individual: [
    '/images/gallery/individual/individual-1.jpg',  // B&W портрет через цветы — самый сильный
    '/images/gallery/individual/individual-9.jpg',  // женщина у сирени, другой человек, полный рост
    '/images/gallery/individual/individual-6.jpg',  // коллаж мужчина в горах — полная смена
    '/images/gallery/individual/individual-8.jpg',  // рыжая, золотой час, смеётся
    '/images/gallery/individual/individual-3.jpg',  // белый образ, парк — средний план
    '/images/gallery/individual/individual-7.jpg',  // B&W спиной к горам — созерцательно
    '/images/gallery/individual/individual-11.jpg', // коллаж 4 кадра в лесу
    '/images/gallery/individual/individual-4.jpg',  // берёзовый лес, улыбка
    '/images/gallery/individual/individual-5.jpg',  // снежные горы — пейзажный wide
    '/images/gallery/individual/individual-10.jpg', // поляроид-коллаж лес
    '/images/gallery/individual/individual-2.jpg',  // та же девушка что в 1, но цвет и в профиль
  ],
  reportage: [
    '/images/gallery/reportage/reportage-4.jpg',  // крупный план лица мальчика — самый выразительный
    '/images/gallery/reportage/reportage-9.jpg',  // мама+малыш в цветах, конфетти — широкий, радостный
    '/images/gallery/reportage/reportage-3.jpg',  // B&W девочка с косами на линейке — нарративный
    '/images/gallery/reportage/reportage-8.jpg',  // малыш с одуванчиком — нежный крупный план
    '/images/gallery/reportage/reportage-7.jpg',  // женщина кружится на закате — динамичный wide
    '/images/gallery/reportage/reportage-1.jpg',  // малыш идёт один по аллее — репортажная глубина
    '/images/gallery/reportage/reportage-2.jpg',  // B&W зеркало машины — абстрактный детальный
    '/images/gallery/reportage/reportage-6.jpg',  // женщина у забора в лесу — спокойный
    '/images/gallery/reportage/reportage-5.jpg',  // группа детей за партой — финальный широкий
  ],
};

const TABS = [
  { id: 'family',     label: 'Семья и хвостики' },
  { id: 'individual', label: 'Индивидуальная' },
  { id: 'reportage',  label: 'Репортажная съёмка' },
];

export default function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    TABS.map((t) => t.id).includes(initialTab) ? initialTab : 'family'
  );
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const images = IMAGE_SETS[activeTab];
  const slides = images.map((src) => ({ src }));

  const handleTabChange = (id) => {
    setActiveTab(id);
    setLightboxIndex(-1);
  };

  return (
    <main className="portfolio-page">
      <div className="portfolio-page__header">
        <button
          className="portfolio-page__back-btn"
          onClick={() => navigate(-1)}
          aria-label="Назад"
          title="Назад"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h1 className="portfolio-page__title">Моё портфолио</h1>
      </div>

      <div className="portfolio-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`portfolio-tabs__btn${activeTab === tab.id ? ' portfolio-tabs__btn--active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <PortfolioGallery images={images} onImageClick={setLightboxIndex} />

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
      />
    </main>
  );
}
