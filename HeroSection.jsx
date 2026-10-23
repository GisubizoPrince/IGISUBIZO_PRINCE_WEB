import { api } from '../utils/api'

export default function HeroSection({ query, onQueryChange, t }) {
  return (
    <section className="hero" id="home">
      <img
        className="hero-image"
        src={api.siteImageUrl('hero')}
        alt=""
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">{t.heroEyebrow}</p>
        <h1>{t.heroTitle}</h1>
        <p className="hero-description">{t.heroDescription}</p>
        <form
          className="hero-search"
          onSubmit={(event) => {
            event.preventDefault()
            document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </span>
          <input
            aria-label={t.searchPlaceholder}
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <button type="submit">{t.searchButton}</button>
        </form>
      </div>
      <div className="hero-caption">
        <span className="caption-line" />
        <span>{t.heroCaption}</span>
      </div>
    </section>
  )
}
