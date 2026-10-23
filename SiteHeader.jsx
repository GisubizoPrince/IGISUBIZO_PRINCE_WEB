export default function SiteHeader({ language, onLanguageChange, t }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="RUHANGO PROPERTY CONNECT home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none">
            <path d="M5 17.5 18 6l13 11.5v13H5v-13Z" />
            <path d="M14 30.5V20h8v10.5M2.5 17.5 18 4l15.5 13.5" />
          </svg>
        </span>
        <span className="brand-name">
          <strong>{t.brandName}</strong>
          <span>{t.brandSubtitle}</span>
        </span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#listings">{t.navListings}</a>
        <a href="#about">{t.navAbout}</a>
        <a href="#contact">{t.contact}</a>
        <a href="#admin">{t.navAdmin}</a>
      </nav>
      <div className="header-actions">
        <div className="language-switch" aria-label="Choose language">
          <button
            className={language === 'rw' ? 'active' : ''}
            type="button"
            onClick={() => onLanguageChange('rw')}
            aria-pressed={language === 'rw'}
          >
            RW
          </button>
          <span aria-hidden="true">/</span>
          <button
            className={language === 'en' ? 'active' : ''}
            type="button"
            onClick={() => onLanguageChange('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>
        <a className="header-contact" href="#contact">
          {t.contact}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  )
}
