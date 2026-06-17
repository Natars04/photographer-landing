import { siteContent } from '../data/content';
import './About.css';

const PHOTO_PLACEHOLDER = '/images/hero/obomne.jpg';

export default function About() {
  const { about } = siteContent;

  return (
    <>
      <hr className="section-divider" />
      <section className="about section--white" id="about">
        <div className="about__inner container">
          <div className="about__photo-col">
            <img
              src={PHOTO_PLACEHOLDER}
              alt="Ирина Кручинина"
              className="about__photo"
            />
          </div>
          <div className="about__text-col">
            <h2 className="about__heading">Немного обо мне.</h2>
            {about.text.map((paragraph, i) => (
              <p key={i} className="about__paragraph">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <hr className="section-divider" />
    </>
  );
}
