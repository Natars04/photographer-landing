import { Link } from 'react-router-dom';
import './Services.css';

export default function Services() {
  return (
    <>
      <section className="services-section section--white" id="services">
        <div className="services-section__inner container">
          <h2 className="services-section__title">Услуги и цены</h2>
          <Link to="/services" className="btn-outline">Ознакомиться</Link>
        </div>
      </section>
      <hr className="section-divider" />
    </>
  );
}
