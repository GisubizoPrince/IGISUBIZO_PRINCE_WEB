import { api } from '../utils/api'

export default function AboutSection({ t }) {
  return (
    <section className="about-section" id="about">
      <div className="about-image-wrap">
        <img
          src={api.siteImageUrl('about')}
          alt="Inzu nziza iri ahantu hatuje"
          loading="lazy"
        />
        <div className="about-image-note">
          <span className="note-icon" aria-hidden="true">⌂</span>
          <span>
            <strong>{t.brandName}</strong>
            <small>{t.brandSubtitle}</small>
          </span>
        </div>
      </div>
      <div className="about-content">
        <p className="eyebrow">{t.aboutEyebrow}</p>
        <h2>{t.aboutTitle}</h2>
        <p className="about-description">{t.aboutText}</p>
        <ul className="about-points">
          <li><span aria-hidden="true">✓</span>{t.aboutPointOne}</li>
          <li><span aria-hidden="true">✓</span>{t.aboutPointTwo}</li>
          <li><span aria-hidden="true">✓</span>{t.aboutPointThree}</li>
        </ul>
        <a className="text-link" href="#contact">
          {t.contact} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
