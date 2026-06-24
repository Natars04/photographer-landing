import { useState } from 'react';
import { siteContent } from '../data/content';
import './About.css';

const PHOTO_PLACEHOLDER = '/images/hero/obomne.jpg';
const PREVIEW_COUNT = 2;

export default function About() {
  const { about } = siteContent;
  const [expanded, setExpanded] = useState(false);

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
          <div className={`about__text-col${expanded ? ' about__text-col--expanded' : ''}`}>
            <h2 className="about__heading">Немного обо мне</h2>
            {about.text.map((paragraph, i) => (
              <p
                key={i}
                className={`about__paragraph${i >= PREVIEW_COUNT ? ' about__paragraph--extra' : ''}`}
              >
                {paragraph}
              </p>
            ))}
            <button
              className="about__toggle"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Свернуть ▴' : 'Читать дальше ▾'}
            </button>
          </div>
        </div>
      </section>
      <hr className="section-divider" />
    </>
  );
}
