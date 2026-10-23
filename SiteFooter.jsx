export default function SiteFooter({ t }) {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="#home">
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
      <p>{t.footerText}</p>
      <span className="footer-location">
        {t.footerLocation} <span aria-hidden="true">·</span> © 2026
      </span>
    </footer>
  )
}
