import { useState, useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { siteContent } from '../data/content';
import { galleryImages } from '../data/gallery';
import { useReveal } from '../hooks/useReveal';
import CategoryFilter from './CategoryFilter';
import MasonryGallery from './MasonryGallery';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const ref = useReveal();

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const slides = filteredImages.map((img) => ({ src: img.src, alt: img.alt }));

  const handleImageClick = (image) => {
    const index = filteredImages.findIndex((img) => img.id === image.id);
    setLightboxIndex(index);
  };

  return (
    <section className="section" id="portfolio">
      <div className="container reveal" ref={ref}>
        <span className="section-label">{siteContent.portfolio.label}</span>
        <h2 className="section-title">{siteContent.portfolio.title}</h2>
        <p className="section-subtitle">{siteContent.portfolio.subtitle}</p>

        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        <MasonryGallery
          images={galleryImages}
          activeCategory={activeCategory}
          onImageClick={handleImageClick}
        />
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}
