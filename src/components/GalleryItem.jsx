export default function GalleryItem({ image, onClick, hidden }) {
  if (hidden) return null;

  if (!image.src) {
    return (
      <article className={`gallery-item gallery-item--${image.size} gallery-item--placeholder`}>
        <div className="gallery-item__image-wrap">
          <div className="gallery-item__image gallery-item__image--blank" />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`gallery-item gallery-item--${image.size} gallery-item--fade-in`}
      onClick={() => onClick(image)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(image);
        }
      }}
      aria-label={`Открыть: ${image.alt}`}
    >
      <div className="gallery-item__image-wrap">
        <img
          src={image.src}
          alt={image.alt}
          className="gallery-item__image"
          loading="lazy"
          decoding="async"
        />
        <div className="gallery-item__overlay">
          <span className="gallery-item__category">{image.label}</span>
        </div>
      </div>
    </article>
  );
}
