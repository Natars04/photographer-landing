import { Link } from 'react-router-dom';
import './Testimonials.css';

export default function Reviews() {
  return (
    <>
      <section className="reviews-section section--beige" id="reviews">
        <div className="reviews-section__inner container">
          <h2 className="reviews-section__title">Отзывы</h2>
          <Link to="/reviews" className="btn-outline">Смотреть</Link>
        </div>
      </section>
      <hr className="section-divider" />
    </>
  );
}
