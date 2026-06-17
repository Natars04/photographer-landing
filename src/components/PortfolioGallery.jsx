import Masonry from 'react-masonry-css';
import './PortfolioGallery.css';

const BREAKPOINTS = {
  default: 3,
  1024: 2,
  640: 1,
};

export default function PortfolioGallery({ images, onImageClick }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="portfolio-masonry-wrap">
      <Masonry
        breakpointCols={BREAKPOINTS}
        className="portfolio-masonry"
        columnClassName="portfolio-masonry__col"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="portfolio-masonry__item"
            onClick={() => onImageClick?.(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onImageClick?.(i); }}
            aria-label="Открыть фото"
          >
            <img src={src} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
