import Masonry from 'react-masonry-css';
import GalleryItem from './GalleryItem';

const breakpointColumns = {
  default: 4,
  1280: 3,
  900: 2,
  640: 1,
};

export default function MasonryGallery({ images, activeCategory, onImageClick }) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {images.map((image) => (
        <GalleryItem
          key={image.id}
          image={image}
          onClick={onImageClick}
          hidden={activeCategory !== 'all' && image.category !== activeCategory}
        />
      ))}
    </Masonry>
  );
}
