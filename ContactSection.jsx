import { useState } from 'react'
import { whatsappLink } from '../utils/propertyUtils'

export default function ContactSection({ language, t, contactInfo, onMessageSubmit }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setFormError(t.required)
      return
    }
    setFormError('')
    setFormSuccess('')
    const wasSent = await onMessageSubmit({
      id: Date.now(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    })

    if (wasSent) {
      setForm({ name: '', phone: '', message: '' })
      setFormSuccess(t.messageSent)
      window.location.hash = 'home'
    } else {
      setFormError(t.messageSendError)
    }
  }

  const greeting =
    language === 'rw'
      ? 'Muraho, ndifuza kumenya byinshi kuri serivisi zanyu.'
      : 'Hello, I would like to know more about your services.'
  const details = contactInfo || {
    whatsappNumber: '250795925926',
    instagramUrl: 'https://www.instagram.com/ruhango_property250/',
    instagramHandle: '@ruhango_property250',
    email: 'gisubizoprince9@gmail.com',
  }

  return (
    <section className="contact-section section-wrap" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">{t.contactEyebrow}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <div className="contact-methods">
          <a
            className="direct-contact"
            href={whatsappLink(greeting, details.whatsappNumber)}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-method-icon" aria-hidden="true">↗</span>
            <span>
              <small>WHATSAPP</small>
              <strong>+{details.whatsappNumber.replace(/\D/g, '')}</strong>
            </span>
          </a>
          <a
            className="direct-contact"
            href={details.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-method-icon" aria-hidden="true">IG</span>
            <span>
              <small>INSTAGRAM</small>
              <strong>{details.instagramHandle}</strong>
            </span>
          </a>
          <a className="direct-contact" href={`mailto:${details.email}`}>
            <span className="contact-method-icon" aria-hidden="true">@</span>
            <span>
              <small>EMAIL</small>
              <strong>{details.email}</strong>
            </span>
          </a>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          {t.name}
          <input
            autoComplete="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder={t.namePlaceholder}
            required
          />
        </label>
        <label>
          {t.phone}
          <input
            autoComplete="tel"
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder={t.phonePlaceholder}
            required
          />
        </label>
        <label>
          {t.message}
          <textarea
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            placeholder={t.messagePlaceholder}
            rows="3"
            required
          />
        </label>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        {formSuccess && <p className="form-success" role="status">{formSuccess}</p>}
        <button className="submit-button" type="submit">
          {t.send} <span aria-hidden="true">↗</span>
        </button>
        <p className="form-note">{t.whatsappHelp}</p>
      </form>
    </section>
  )
}
