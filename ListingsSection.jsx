import { useCallback, useEffect, useState } from 'react'
import { formatPrice } from '../utils/propertyUtils'

function PropertyDetailsDialog({ property, language, t, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const images = property.images?.length ? property.images : property.image ? [property.image] : []
  const title = language === 'rw' ? property.title : property.titleEn

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')
    const message =
      form.message.trim() ||
      (language === 'rw'
        ? `Ndifuza amakuru arambuye kuri: ${title} — ${property.location}`
        : `I would like more details about: ${title} — ${property.location}`)
    const wasSent = await onSubmit({
      id: Date.now(),
      type: 'property-inquiry',
      name: form.name.trim(),
      phone: form.phone.trim(),
      message,
      propertyTitle: title,
      propertyLocation: property.location,
      createdAt: new Date().toISOString(),
    })

    if (wasSent) {
      setForm({ name: '', phone: '', message: '' })
      setSubmitSuccess(true)
    } else {
      setSubmitError(t.messageSendError)
    }
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setSubmitSuccess(false)
  }

  return (
    <div
      className="property-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="property-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-dialog-title"
      >
        <button
          className="property-dialog-close"
          type="button"
          onClick={onClose}
          aria-label={t.close}
        >
          ×
        </button>
        <div className="property-dialog-content">
          <div className="property-dialog-gallery">
            {images.length ? (
              <img
                className="property-dialog-image"
                src={images[activeImage]}
                alt={property.imageAlt}
              />
            ) : (
              <div className="property-dialog-image property-image-placeholder" aria-hidden="true" />
            )}
            {images.length > 1 && (
              <>
                <button
                  className="gallery-control gallery-previous"
                  type="button"
                  aria-label={t.previousPhoto}
                  onClick={() => setActiveImage((index) => (index - 1 + images.length) % images.length)}
                >
                  ‹
                </button>
                <button
                  className="gallery-control gallery-next"
                  type="button"
                  aria-label={t.nextPhoto}
                  onClick={() => setActiveImage((index) => (index + 1) % images.length)}
                >
                  ›
                </button>
                <span className="gallery-count">{activeImage + 1} / {images.length}</span>
              </>
            )}
          </div>
          <div className="property-dialog-info">
            <p className="eyebrow">{t.propertyDetails}</p>
            <h2 id="property-dialog-title">{title}</h2>
            <p className="property-dialog-location">{property.location}</p>
            <p className="property-price">
              {formatPrice(property.price, property.period, language)}
            </p>
            <dl className="property-dialog-facts">
              <div>
                <dt>{t.kind}</dt>
                <dd>{t[`${property.kind}Type`]}</dd>
              </div>
              <div>
                <dt>{t.listingType}</dt>
                <dd>{property.deal === 'sale' ? t.forSale : t.forRent}</dd>
              </div>
              {property.bedrooms !== null && (
                <div>
                  <dt>{t.bedrooms}</dt>
                  <dd>{property.bedrooms}</dd>
                </div>
              )}
              {property.bathrooms !== null && (
                <div>
                  <dt>{t.bathrooms}</dt>
                  <dd>{property.bathrooms}</dd>
                </div>
              )}
              <div>
                <dt>{t.sqm}</dt>
                <dd>{property.area} {t.sqm}</dd>
              </div>
            </dl>
          </div>
        </div>
        <form className="property-inquiry-form" onSubmit={handleSubmit}>
          <div className="property-inquiry-heading">
            <h3>{t.inquiryTitle}</h3>
            <p>{t.inquiryDescription}</p>
          </div>
          <label>
            {t.name}
            <input
              autoComplete="name"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder={t.namePlaceholder}
              required
            />
          </label>
          <label>
            {t.phone}
            <input
              autoComplete="tel"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              placeholder={t.phonePlaceholder}
              required
            />
          </label>
          <label className="property-inquiry-message">
            {t.optionalMessage}
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder={t.optionalMessagePlaceholder}
              rows="2"
            />
          </label>
          {submitError && <p className="form-error" role="alert">{submitError}</p>}
          {submitSuccess && <p className="form-success" role="status">{t.inquirySent}</p>}
          <button className="submit-button" type="submit">
            {t.sendInquiry} <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>
    </div>
  )
}

function PropertyCard({ property, index, language, t, onSelect }) {
  const title = language === 'rw' ? property.title : property.titleEn

  return (
    <article className="property-card">
      <button
        className="property-image-link"
        type="button"
        onClick={() => onSelect(property)}
        aria-label={`${t.propertyDetails}: ${title}`}
      >
        {(property.images?.[0] || property.image) && (
          <img
            className="property-image"
            src={property.images?.[0] || property.image}
            alt={property.imageAlt}
            loading={index > 1 ? 'lazy' : 'eager'}
          />
        )}
        <span className="property-badge">{property.badge}</span>
        <span className="image-arrow" aria-hidden="true">↗</span>
      </button>
      <div className="property-info">
        <p className="property-location">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M14.25 7.5c0 4.125-5.25 8.25-5.25 8.25S3.75 11.625 3.75 7.5a5.25 5.25 0 1 1 10.5 0Z" />
            <circle cx="9" cy="7.5" r="1.75" />
          </svg>
          {property.location}
        </p>
        <h3>{title}</h3>
        <p className="property-price">
          {formatPrice(property.price, property.period, language)}
        </p>
        <div className="property-divider" />
        <div className="property-details">
          {property.bedrooms !== null && (
            <span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 16V7.5M3 12h14v4M17 16V9.5a2 2 0 0 0-2-2h-4v4.5M3 9.5h5a2 2 0 0 1 2 2V12" />
              </svg>
              {property.bedrooms} {t.bedrooms}
            </span>
          )}
          {property.bathrooms !== null && (
            <span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10V5a2 2 0 0 1 4 0M3 10h14v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2ZM6 16v1M14 16v1" />
              </svg>
              {property.bathrooms} {t.bathrooms}
            </span>
          )}
          <span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 6V3h3M14 3h3v3M17 14v3h-3M6 17H3v-3M3 3l5 5M17 3l-5 5M17 17l-5-5M3 17l5-5" />
            </svg>
            {property.area} {t.sqm}
          </span>
        </div>
        <button className="property-cta" type="button" onClick={() => onSelect(property)}>
          {t.askAbout}
          <span aria-hidden="true">⌕</span>
        </button>
      </div>
    </article>
  )
}

export default function ListingsSection({
  properties,
  filteredProperties,
  language,
  onPropertyInquirySubmit,
  kind,
  deal,
  onKindChange,
  onDealChange,
  t,
}) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const closeDialog = useCallback(() => setSelectedProperty(null), [])

  return (
    <>
      <section className="listings section-wrap" id="listings">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.navListings}</p>
          <h2>{t.featured}</h2>
          <p className="section-description">{t.featuredDescription}</p>
        </div>
        <span className="listing-count">
          {filteredProperties.length.toString().padStart(2, '0')}{' '}
          <span>/ {properties.length.toString().padStart(2, '0')}</span>
        </span>
      </div>
      <div className="filter-bar">
        <div className="kind-filters" aria-label={t.navListings}>
          {[
            ['all', t.all],
            ['house', t.houses],
            ['apartment', t.apartments],
            ['land', t.land],
          ].map(([value, label]) => (
            <button
              className={kind === value ? 'filter-button active' : 'filter-button'}
              type="button"
              key={value}
              onClick={() => onKindChange(value)}
              aria-pressed={kind === value}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="deal-select-label">
          <span className="visually-hidden">{t.forSale}</span>
          <select value={deal} onChange={(event) => onDealChange(event.target.value)}>
            <option value="all">{t.anyDeal}</option>
            <option value="sale">{t.forSale}</option>
            <option value="rent">{t.forRent}</option>
          </select>
          <span aria-hidden="true" className="select-arrow">⌄</span>
        </label>
      </div>
      {filteredProperties.length > 0 ? (
        <div className="property-grid">
          {filteredProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
              language={language}
              t={t}
              onSelect={setSelectedProperty}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">⌕</span>
          <p>{t.noResults}</p>
        </div>
      )}
      </section>
      {selectedProperty && (
        <PropertyDetailsDialog
          key={selectedProperty.id}
          property={selectedProperty}
          language={language}
          t={t}
          onClose={closeDialog}
          onSubmit={onPropertyInquirySubmit}
        />
      )}
    </>
  )
}
