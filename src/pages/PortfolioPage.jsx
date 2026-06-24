import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PortfolioGallery from '../components/PortfolioGallery';
import SessionCards from '../components/SessionCards';
import './PortfolioPage.css';

const IMAGE_SETS = {
  family: [
    '/images/gallery/family/family-4.jpg',
    '/images/gallery/family/family-7.jpg',
    '/images/gallery/family/family-2.jpg',
    '/images/gallery/family/family-1.jpg',
    '/images/gallery/family/family-10.jpg',
    '/images/gallery/family/family-3.jpg',
    '/images/gallery/family/family-9.jpg',
    '/images/gallery/family/family-6.jpg',
    '/images/gallery/family/family-5.jpg',
    '/images/gallery/family/family-8.jpg',
  ],
  reportage: [
    '/images/gallery/reportage/reportage-4.jpg',
    '/images/gallery/reportage/reportage-9.jpg',
    '/images/gallery/reportage/reportage-3.jpg',
    '/images/gallery/reportage/reportage-8.jpg',
    '/images/gallery/reportage/reportage-7.jpg',
    '/images/gallery/reportage/reportage-1.jpg',
    '/images/gallery/reportage/reportage-2.jpg',
    '/images/gallery/reportage/reportage-6.jpg',
    '/images/gallery/reportage/reportage-5.jpg',
  ],
};

function generateImages(folder, prefix, count) {
  return Array.from({ length: count }, (_, i) =>
    `/images/gallery/individual/${folder}/${prefix}-${i + 1}.jpg`
  );
}

const INDIVIDUAL_SESSIONS = [
  {
    id: 'kovaleva',
    name: 'Ковалева Татьяна',
    cover: '/images/gallery/individual/kovaleva/kovaleva-30.jpg',
    images: generateImages('kovaleva', 'kovaleva', 111),
  },
  {
    id: 'kruchinina',
    name: 'Кручинина Наталья',
    cover: '/images/gallery/individual/kruchinina/kruchinina-1.jpg',
    images: generateImages('kruchinina', 'kruchinina', 56),
  },
];

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
  const [selectedSession, setSelectedSession] = useState(null);

  const currentSession = activeTab === 'individual' && selectedSession
    ? INDIVIDUAL_SESSIONS.find((s) => s.id === selectedSession)
    : null;

  const images = currentSession ? currentSession.images : IMAGE_SETS[activeTab];
  const slides = (images || []).map((src) => ({ src }));

  const handleTabChange = (id) => {
    setActiveTab(id);
    setLightboxIndex(-1);
    setSelectedSession(null);
  };

  return (
    <main className="portfolio-page">
      <div className="portfolio-page__header">
        <button
          className="portfolio-page__back-btn"
          onClick={() => navigate('/')}
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

      {activeTab === 'individual' && !selectedSession ? (
        <SessionCards
          sessions={INDIVIDUAL_SESSIONS}
          onSessionClick={setSelectedSession}
        />
      ) : (
        <>
          {activeTab === 'individual' && selectedSession && (
            <div className="portfolio-page__sub-nav">
              <button
                className="portfolio-page__back-btn portfolio-page__back-btn--inline"
                onClick={() => { setSelectedSession(null); setLightboxIndex(-1); }}
                aria-label="Назад к сессиям"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                <span>{currentSession.name}</span>
              </button>
            </div>
          )}
          {images && images.length > 0 ? (
            <PortfolioGallery images={images} onImageClick={setLightboxIndex} />
          ) : (
            <p className="portfolio-empty">Фотографии скоро появятся</p>
          )}
        </>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
      />
    </main>
  );
}
