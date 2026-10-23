import { useState } from 'react'
import { formatPrice } from '../utils/propertyUtils'

const editableContentFields = [
  ['brandName', 'Izina ry’urubuga', 'Brand name'],
  ['brandSubtitle', 'Ibisobanuro bigufi by’urubuga', 'Brand subtitle'],
  ['navListings', 'Amatangazo muri menu', 'Listings navigation'],
  ['navAbout', 'Abo turibo muri menu', 'About navigation'],
  ['contact', 'Twandikire muri menu', 'Contact navigation'],
  ['navAdmin', 'Ubuyobozi muri menu', 'Admin navigation'],
  ['heroEyebrow', 'Amajambo mato ya Hero', 'Hero eyebrow'],
  ['heroTitle', 'Umutwe wa Hero', 'Hero title'],
  ['heroDescription', 'Ibisobanuro bya Hero', 'Hero description'],
  ['heroCaption', 'Ahantu handitse ku ifoto ya Hero', 'Hero location caption'],
  ['featured', 'Umutwe w’amatangazo', 'Listings heading'],
  ['featuredDescription', 'Ibisobanuro by’amatangazo', 'Listings description'],
  ['aboutEyebrow', 'Amajambo mato ya About', 'About eyebrow'],
  ['aboutTitle', 'Umutwe wa About', 'About title'],
  ['aboutText', 'Ibisobanuro bya About', 'About description'],
  ['aboutPointOne', 'Ingingo ya mbere ya About', 'About point one'],
  ['aboutPointTwo', 'Ingingo ya kabiri ya About', 'About point two'],
  ['aboutPointThree', 'Ingingo ya gatatu ya About', 'About point three'],
  ['contactEyebrow', 'Amajambo mato ya Contact', 'Contact eyebrow'],
  ['contactTitle', 'Umutwe wa Contact', 'Contact title'],
  ['contactText', 'Ibisobanuro bya Contact', 'Contact description'],
  ['footerText', 'Ubutumwa bwo muri footer', 'Footer message'],
  ['footerLocation', 'Aho ikigo giherereye', 'Business location in footer'],
]

const copy = {
  rw: {
    title: 'Ubuyobozi',
    subtitle: 'Genzura amatangazo y’amazu n’amasambu.',
    back: 'Subira ku rubuga',
    total: 'Amatangazo yose',
    sale: 'Ayo kugurisha',
    rent: 'Ayo gukodesha',
    listings: 'Amatangazo',
    inbox: 'Ubutumwa bwakiriwe',
    propertyInquiry: 'Ubusabe ku mutungo',
    inboxEmpty: 'Nta butumwa urakira.',
    received: 'Byakiriwe',
    deleteMessage: 'Siba ubutumwa',
    confirmDeleteMessage: 'Urashaka gusiba ubu butumwa?',
    messageStorageError: 'Ubutumwa ntibwabitswe. Reba ubushobozi bwo kubika muri browser yawe.',
    username: 'Izina rikoreshwa',
    password: 'Ijambo ry’ibanga',
    login: 'Injira',
    loginError: 'Kwinjira ntibyashobotse.',
    add: 'Ongeraho itangazo',
    edit: 'Hindura',
    remove: 'Siba',
    cancel: 'Reka',
    save: 'Bika itangazo',
    create: 'Ongeraho itangazo',
    saving: 'Birabikwa…',
    nameRw: 'Umutwe mu Kinyarwanda',
    nameEn: 'Umutwe mu Cyongereza',
    location: 'Aho riherereye',
    price: 'Igiciro (RWF)',
    kind: 'Ubwoko',
    house: 'Inzu',
    apartment: 'Apartimenti',
    land: 'Isambu',
    deal: 'Uburyo',
    forSale: 'Kugurisha',
    forRent: 'Gukodesha',
    bedrooms: 'Ibyumba',
    bathrooms: 'Ubwiherero',
    area: 'Ubuso (m²)',
    image: 'Hitamo amafoto 1 kugeza kuri 3 (JPEG, PNG, WebP; buri foto ntirenze 5 MB)',
    imageReplace: 'Amafoto mashya yongerwa ku yari ahari; hitamo ahandi kugira ngo uyasimbuze.',
    replaceImages: 'Simbuza amafoto yari ahari',
    imageLimitError: 'Hitamo amafoto atarenze 3.',
    removeImage: 'Siba amafoto yose',
    imageAlt: 'Ibisobanuro by’ifoto',
    badge: 'Ikirango',
    actions: 'Ibikorwa',
    empty: 'Nta matangazo ahari. Ongeraho irya mbere.',
    confirmDelete: 'Urashaka gusiba iri tangazo?',
    storageError: 'Impinduka ntizibitswe. Reba ubushobozi bwo kubika muri browser yawe.',
    storageNotice: 'Amatangazo n’ubutumwa bibikwa muri MySQL kandi bigaragara ku bakoresha urubuga bose.',
    websiteContent: 'Amakuru agaragara ku rubuga',
    websiteContentDescription: 'Hindura amagambo agaragara ku rubuga mu Kinyarwanda no mu Cyongereza.',
    contentRw: 'Ikinyarwanda',
    contentEn: 'English',
    contactDetails: 'Amakuru yo kutwandikira',
    whatsappNumber: 'Nimero ya WhatsApp (andika imibare gusa)',
    instagramUrl: 'Instagram URL',
    instagramHandle: 'Izina rya Instagram',
    emailAddress: 'Imeyili',
    saveContent: 'Bika amakuru y’urubuga',
    contentSaved: 'Amakuru y’urubuga yabitswe.',
    contentError: 'Amakuru y’urubuga ntiyabitswe.',
    contentLoading: 'Amakuru y’urubuga aracyafatwa...',
  },
  en: {
    title: 'Admin dashboard',
    subtitle: 'Manage your home and land listings.',
    back: 'Back to website',
    total: 'Total listings',
    sale: 'For sale',
    rent: 'For rent',
    listings: 'Listings',
    inbox: 'Inbox messages',
    propertyInquiry: 'Property enquiry',
    inboxEmpty: 'No messages received yet.',
    received: 'Received',
    deleteMessage: 'Delete message',
    confirmDeleteMessage: 'Delete this message?',
    messageStorageError: 'Messages could not be saved. Check storage availability in your browser.',
    username: 'Username',
    password: 'Password',
    login: 'Sign in',
    loginError: 'Sign-in failed.',
    add: 'Add listing',
    edit: 'Edit',
    remove: 'Delete',
    cancel: 'Cancel',
    save: 'Save listing',
    create: 'Add listing',
    saving: 'Saving…',
    nameRw: 'Title in Kinyarwanda',
    nameEn: 'Title in English',
    location: 'Location',
    price: 'Price (RWF)',
    kind: 'Property type',
    house: 'House',
    apartment: 'Apartment',
    land: 'Land',
    deal: 'Listing type',
    forSale: 'For sale',
    forRent: 'For rent',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    area: 'Area (m²)',
    image: 'Choose 1 to 3 photos (JPEG, PNG, WebP; up to 5 MB each)',
    imageReplace: 'New photos are added to the current gallery; select replace to swap them.',
    replaceImages: 'Replace current photos',
    imageLimitError: 'Choose no more than 3 photos.',
    removeImage: 'Delete all photos',
    imageAlt: 'Image description',
    badge: 'Badge',
    actions: 'Actions',
    empty: 'No listings yet. Add your first one.',
    confirmDelete: 'Delete this listing?',
    storageError: 'Changes could not be saved. Check storage availability in your browser.',
    storageNotice: 'Listings and messages are stored in MySQL and shared with all website visitors.',
    websiteContent: 'Website content',
    websiteContentDescription: 'Edit the text shown on the website in Kinyarwanda and English.',
    contentRw: 'Kinyarwanda',
    contentEn: 'English',
    contactDetails: 'Business contact details',
    whatsappNumber: 'WhatsApp number (digits only)',
    instagramUrl: 'Instagram URL',
    instagramHandle: 'Instagram handle',
    emailAddress: 'Email address',
    saveContent: 'Save website content',
    contentSaved: 'Website content saved.',
    contentError: 'Website content could not be saved.',
    contentLoading: 'Website content is loading...',
  },
}

const emptyForm = {
  title: '',
  titleEn: '',
  location: '',
  price: '',
  kind: 'house',
  deal: 'rent',
  bedrooms: '',
  bathrooms: '',
  area: '',
  image: '',
  images: [],
  imageFiles: [],
  imageAction: 'append',
  imageAlt: '',
  badge: '',
}

function toFormValues(property) {
  return {
    ...property,
    imageFiles: [],
    imageAction: 'append',
    price: String(property.price),
    bedrooms: property.bedrooms ?? '',
    bathrooms: property.bathrooms ?? '',
    area: String(property.area),
  }
}

export default function AdminDashboard({
  properties,
  onPropertySave,
  onPropertyDelete,
  onPropertyImageDelete,
  messages,
  onMessageDelete,
  language,
  onLanguageChange,
  adminToken,
  onLogin,
  siteContent,
  onSiteContentSave,
  apiError,
}) {
  const t = copy[language]
  const [form, setForm] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageError, setImageError] = useState('')
  const [contentDraft, setContentDraft] = useState(null)
  const [contentStatus, setContentStatus] = useState('')

  function startNewListing() {
    setEditingId(null)
    setImageError('')
    setForm({ ...emptyForm })
  }

  function startEditing(property) {
    setEditingId(property.id)
    setImageError('')
    setForm(toFormValues(property))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const photoCount = form.imageAction === 'replace'
      ? form.imageFiles.length
      : (form.images?.length || (form.image ? 1 : 0)) + form.imageFiles.length
    if (photoCount > 3) {
      setImageError(t.imageLimitError)
      return
    }
    setImageError('')
    const deal = form.deal
    const property = {
      ...form,
      ...(editingId !== null ? { id: editingId } : {}),
      price: Number(form.price),
      period: deal === 'rent' ? 'month' : null,
      bedrooms: form.bedrooms === '' ? null : Number(form.bedrooms),
      bathrooms: form.bathrooms === '' ? null : Number(form.bathrooms),
      area: Number(form.area),
      badge:
        form.badge.trim() ||
        (language === 'rw'
          ? deal === 'rent'
            ? 'Gukodesha'
            : 'Kugurisha'
          : deal === 'rent'
            ? 'For rent'
            : 'For sale'),
    }

    setIsSubmitting(true)
    try {
      const saved = await onPropertySave(property, editingId !== null)
      if (saved) {
        setForm(null)
        setEditingId(null)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteListing(propertyId) {
    if (!window.confirm(t.confirmDelete)) return
    const deleted = await onPropertyDelete(propertyId)
    if (deleted && editingId === propertyId) {
      setForm(null)
      setEditingId(null)
    }
  }

  async function deletePropertyImage(propertyId) {
    if (!window.confirm(t.removeImage + '?')) return
    const deleted = await onPropertyImageDelete(propertyId)
    if (deleted && editingId === propertyId) {
      setForm((current) => ({ ...current, image: '', images: [], imageFiles: [] }))
    }
  }

  async function deleteMessage(messageId) {
    if (!window.confirm(t.confirmDeleteMessage)) return
    await onMessageDelete(messageId)
  }

  async function handleLogin(event) {
    event.preventDefault()
    setLoginError('')
    setIsSubmitting(true)
    try {
      await onLogin(loginForm.username, loginForm.password)
    } catch (error) {
      setLoginError(error.message || t.loginError)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSiteContentSubmit(event) {
    event.preventDefault()
    setContentStatus('')
    setIsSubmitting(true)
    try {
      const saved = await onSiteContentSave(contentDraft || siteContent)
      setContentStatus(saved ? t.contentSaved : t.contentError)
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateSiteContent(language, key, value) {
    setContentDraft((current) => {
      const source = current || siteContent
      return {
        ...source,
        [language]: { ...source[language], [key]: value },
      }
    })
  }

  function updateContactInfo(key, value) {
    setContentDraft((current) => {
      const source = current || siteContent
      return {
        ...source,
        contactInfo: { ...source.contactInfo, [key]: value },
      }
    })
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  if (!adminToken) {
    return (
      <main className="admin-shell">
        <header className="admin-header">
          <a className="brand" href="#home" aria-label="RUHANGO PROPERTY CONNECT home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 36 36" fill="none">
                <path d="M5 17.5 18 6l13 11.5v13H5v-13Z" />
                <path d="M14 30.5V20h8v10.5M2.5 17.5 18 4l15.5 13.5" />
              </svg>
            </span>
            <span className="brand-name"><strong>RUHANGO</strong><span>PROPERTY CONNECT</span></span>
          </a>
          <div className="admin-header-actions">
            <div className="language-switch" aria-label="Choose language">
              <button className={language === 'rw' ? 'active' : ''} type="button" onClick={() => onLanguageChange('rw')}>RW</button>
              <span aria-hidden="true">/</span>
              <button className={language === 'en' ? 'active' : ''} type="button" onClick={() => onLanguageChange('en')}>EN</button>
            </div>
            <a className="admin-back-link" href="#home">{t.back} ↗</a>
          </div>
        </header>
        <form className="admin-form admin-login-form" onSubmit={handleLogin}>
          <h1>{t.title}</h1>
          <label>
            {t.username}
            <input
              autoComplete="username"
              value={loginForm.username}
              onChange={(event) => setLoginForm({ ...loginForm, username: event.target.value })}
              required
            />
          </label>
          <label>
            {t.password}
            <input
              type="password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
              required
            />
          </label>
          {loginError && <p className="form-error" role="alert">{loginError}</p>}
          <button className="submit-button" type="submit" disabled={isSubmitting}>{t.login}</button>
        </form>
      </main>
    )
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <a className="brand" href="#home" aria-label="RUHANGO PROPERTY CONNECT home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none">
              <path d="M5 17.5 18 6l13 11.5v13H5v-13Z" />
              <path d="M14 30.5V20h8v10.5M2.5 17.5 18 4l15.5 13.5" />
            </svg>
          </span>
          <span className="brand-name">
            <strong>RUHANGO</strong>
            <span>PROPERTY CONNECT</span>
          </span>
        </a>
        <div className="admin-header-actions">
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
          <a className="admin-back-link" href="#home">{t.back} ↗</a>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-title-row">
          <div>
            <p className="eyebrow">RUHANGO PROPERTY CONNECT</p>
            <h1>{t.title}</h1>
            <p className="admin-subtitle">{t.subtitle}</p>
          </div>
          <button className="submit-button" type="button" onClick={startNewListing}>
            <span aria-hidden="true">＋</span> {t.add}
          </button>
        </div>

        <section className="admin-listings-panel">
          <div className="admin-panel-heading">
            <h2>{t.websiteContent}</h2>
          </div>
          <p className="admin-subtitle">{t.websiteContentDescription}</p>
          {(contentDraft || siteContent) ? (
            <form className="admin-form website-content-form" onSubmit={handleSiteContentSubmit}>
              {['rw', 'en'].map((contentLanguage) => (
                <fieldset className="website-content-language" key={contentLanguage}>
                  <legend>{contentLanguage === 'rw' ? t.contentRw : t.contentEn}</legend>
                  {editableContentFields.map(([key, labelRw, labelEn]) => (
                    <label
                      className={['heroDescription', 'aboutText', 'contactText'].includes(key) ? 'website-content-wide' : ''}
                      key={key}
                    >
                      {language === 'rw' ? labelRw : labelEn}
                      {['heroDescription', 'aboutText', 'contactText'].includes(key) ? (
                        <textarea
                          rows="3"
                          value={(contentDraft || siteContent)[contentLanguage][key]}
                          onChange={(event) => updateSiteContent(contentLanguage, key, event.target.value)}
                          required
                        />
                      ) : (
                        <input
                          value={(contentDraft || siteContent)[contentLanguage][key]}
                          onChange={(event) => updateSiteContent(contentLanguage, key, event.target.value)}
                          required
                        />
                      )}
                    </label>
                  ))}
                </fieldset>
              ))}
              <fieldset className="website-content-language">
                <legend>{t.contactDetails}</legend>
                <label>
                  {t.whatsappNumber}
                  <input
                    value={(contentDraft || siteContent).contactInfo.whatsappNumber}
                    onChange={(event) => updateContactInfo('whatsappNumber', event.target.value)}
                    required
                  />
                </label>
                <label>
                  {t.instagramUrl}
                  <input
                    type="url"
                    value={(contentDraft || siteContent).contactInfo.instagramUrl}
                    onChange={(event) => updateContactInfo('instagramUrl', event.target.value)}
                    required
                  />
                </label>
                <label>
                  {t.instagramHandle}
                  <input
                    value={(contentDraft || siteContent).contactInfo.instagramHandle}
                    onChange={(event) => updateContactInfo('instagramHandle', event.target.value)}
                    required
                  />
                </label>
                <label>
                  {t.emailAddress}
                  <input
                    type="email"
                    value={(contentDraft || siteContent).contactInfo.email}
                    onChange={(event) => updateContactInfo('email', event.target.value)}
                    required
                  />
                </label>
              </fieldset>
              {contentStatus && <p className="form-success" role="status">{contentStatus}</p>}
              <button className="submit-button admin-form-wide" type="submit" disabled={isSubmitting}>
                {isSubmitting ? t.saving : t.saveContent}
              </button>
            </form>
          ) : (
            <p className="admin-empty-state">{t.contentLoading}</p>
          )}
        </section>

        <div className="admin-stats">
          <article className="admin-stat">
            <span>{t.total}</span>
            <strong>{properties.length.toString().padStart(2, '0')}</strong>
          </article>
          <article className="admin-stat">
            <span>{t.sale}</span>
            <strong>{properties.filter((property) => property.deal === 'sale').length.toString().padStart(2, '0')}</strong>
          </article>
          <article className="admin-stat">
            <span>{t.rent}</span>
            <strong>{properties.filter((property) => property.deal === 'rent').length.toString().padStart(2, '0')}</strong>
          </article>
        </div>

        <section className="admin-listings-panel">
          <div className="admin-panel-heading">
            <h2>{t.listings}</h2>
            <span>{properties.length}</span>
          </div>
          {apiError && <p className="admin-alert" role="alert">{apiError}</p>}
          <p className="admin-storage-notice">{t.storageNotice}</p>

          {form && (
            <form className="admin-form" onSubmit={handleSubmit}>
              <label>
                {t.nameRw}
                <input name="title" value={form.title} onChange={updateField} required />
              </label>
              <label>
                {t.nameEn}
                <input name="titleEn" value={form.titleEn} onChange={updateField} required />
              </label>
              <label>
                {t.location}
                <input name="location" value={form.location} onChange={updateField} required />
              </label>
              <label>
                {t.price}
                <input name="price" type="number" min="1" step="1" value={form.price} onChange={updateField} required />
              </label>
              <label>
                {t.kind}
                <select name="kind" value={form.kind} onChange={updateField}>
                  <option value="house">{t.house}</option>
                  <option value="apartment">{t.apartment}</option>
                  <option value="land">{t.land}</option>
                </select>
              </label>
              <label>
                {t.deal}
                <select name="deal" value={form.deal} onChange={updateField}>
                  <option value="sale">{t.forSale}</option>
                  <option value="rent">{t.forRent}</option>
                </select>
              </label>
              <label>
                {t.bedrooms}
                <input name="bedrooms" type="number" min="0" step="1" value={form.bedrooms} onChange={updateField} />
              </label>
              <label>
                {t.bathrooms}
                <input name="bathrooms" type="number" min="0" step="1" value={form.bathrooms} onChange={updateField} />
              </label>
              <label>
                {t.area}
                <input name="area" type="number" min="1" step="1" value={form.area} onChange={updateField} required />
              </label>
              <div className="admin-form-wide admin-image-field">
                <label htmlFor="property-images">{t.image}</label>
                <div className="admin-image-previews">
                  {((form.imageFiles.length && form.imageAction === 'replace')
                    ? form.imageFiles.map((file) => ({ name: file.name, url: '' }))
                    : [
                      ...(form.images || (form.image ? [form.image] : [])).map((url) => ({ name: '', url })),
                      ...form.imageFiles.map((file) => ({ name: file.name, url: '' })),
                    ]
                  ).map((image, index) => (
                    image.url
                      ? <img className="admin-image-preview" src={image.url} alt="" key={image.url} />
                      : <span className="admin-image-file" key={`${image.name}-${index}`}>{image.name}</span>
                  ))}
                </div>
                <input
                  id="property-images"
                  name="imageFiles"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={(event) =>
                    {
                      const imageFiles = Array.from(event.target.files || [])
                      setForm((current) => ({ ...current, imageFiles }))
                      const existingCount = form.images?.length || (form.image ? 1 : 0)
                      const photoCount = form.imageAction === 'replace'
                        ? imageFiles.length
                        : existingCount + imageFiles.length
                      setImageError(photoCount > 3 ? t.imageLimitError : '')
                    }
                  }
                  required={!form.images?.length && !form.image}
                />
                <small>{t.imageReplace}</small>
                {editingId && (
                  <label className="admin-image-replace-toggle">
                    <input
                      type="checkbox"
                      checked={form.imageAction === 'replace'}
                      onChange={(event) =>
                        {
                          const imageAction = event.target.checked ? 'replace' : 'append'
                          setForm((current) => ({ ...current, imageAction }))
                          const existingCount = form.images?.length || (form.image ? 1 : 0)
                          const photoCount = imageAction === 'replace'
                            ? form.imageFiles.length
                            : existingCount + form.imageFiles.length
                          setImageError(photoCount > 3 ? t.imageLimitError : '')
                        }
                      }
                    />
                    {t.replaceImages}
                  </label>
                )}
                {imageError && <span className="form-error" role="alert">{imageError}</span>}
                {editingId && form.image && (
                  <button
                    className="admin-delete-button"
                    type="button"
                    onClick={() => deletePropertyImage(editingId)}
                  >
                    {t.removeImage}
                  </button>
                )}
              </div>
              <label>
                {t.imageAlt}
                <input name="imageAlt" value={form.imageAlt} onChange={updateField} required />
              </label>
              <label>
                {t.badge}
                <input name="badge" value={form.badge} onChange={updateField} />
              </label>
              <div className="admin-form-actions">
                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t.saving : editingId ? t.save : t.create}
                </button>
                <button className="admin-cancel-button" type="button" onClick={() => setForm(null)}>
                  {t.cancel}
                </button>
              </div>
            </form>
          )}

          {properties.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t.listings}</th>
                    <th>{t.location}</th>
                    <th>{t.price}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className="admin-property">
                          {property.image && <img src={property.image} alt="" />}
                          <span>
                            <strong>{language === 'rw' ? property.title : property.titleEn}</strong>
                            <small>{property.kind} · {property.deal}</small>
                          </span>
                        </div>
                      </td>
                      <td>{property.location}</td>
                      <td>{formatPrice(property.price, property.period, language)}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button className="admin-edit-button" type="button" onClick={() => startEditing(property)}>{t.edit}</button>
                          <button className="admin-delete-button" type="button" onClick={() => deleteListing(property.id)}>{t.remove}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="admin-empty-state">{t.empty}</p>
          )}
        </section>

        <section className="admin-listings-panel admin-inbox-panel" id="admin-messages">
          <div className="admin-panel-heading">
            <h2>{t.inbox}</h2>
            <span>{messages.length}</span>
          </div>
          {apiError && <p className="admin-alert" role="alert">{apiError}</p>}
          {messages.length ? (
            <div className="admin-message-list">
              {messages.map((message) => (
                <article className="admin-message-card" key={message.id}>
                  <div className="admin-message-heading">
                    <div>
                      <h3>{message.name}</h3>
                      <a href={`tel:${message.phone}`}>{message.phone}</a>
                    </div>
                    <time dateTime={message.createdAt}>
                      {new Date(message.createdAt).toLocaleString(
                        language === 'rw' ? 'rw-RW' : 'en-US',
                        { dateStyle: 'medium', timeStyle: 'short' },
                      )}
                    </time>
                  </div>
                  {message.propertyTitle && (
                    <div className="admin-message-property">
                      <strong>{t.propertyInquiry}</strong>
                      <span>{message.propertyTitle} · {message.propertyLocation}</span>
                    </div>
                  )}
                  <p className="admin-message-body">{message.message}</p>
                  <div className="admin-message-footer">
                    <span>{t.received}</span>
                    <button
                      className="admin-message-delete-button"
                      type="button"
                      onClick={() => deleteMessage(message.id)}
                    >
                      {t.deleteMessage}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="admin-empty-state">{t.inboxEmpty}</p>
          )}
        </section>
      </div>
    </main>
  )
}
