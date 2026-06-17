import './FullscreenPhoto.css';

const PLACEHOLDER = 'https://placehold.co/1920x1080/F5F0EA/C4A882?text=Фото';

export default function FullscreenPhoto({ src = PLACEHOLDER, alt = 'Ирина Кручинина — фотограф' }) {
  return (
    <div className="fullscreen-photo">
      <img src={src} alt={alt} className="fullscreen-photo__img" />
    </div>
  );
}
