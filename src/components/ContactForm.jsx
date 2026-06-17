import { siteContent } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import './ContactForm.css';

export default function ContactForm() {
  const { contact } = siteContent;
  const ref = useReveal();

  return (
    <section className="section section--alt" id="contact">
      <div className="container contact reveal" ref={ref}>
        <div className="contact__info">
          <span className="section-label">{contact.label}</span>
          <h2 className="section-title">{contact.title}</h2>
          <p className="section-subtitle">{contact.subtitle}</p>
        </div>

        <div className="contact__links">
          <div className="contact__link-item">Telegram</div>
          <div className="contact__link-item">MAX</div>
          <div className="contact__link-item">
            Instagram
            <p className="contact__disclaimer">
              Instagram принадлежит компании Meta, признанной экстремистской
              организацией и запрещённой на территории РФ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
