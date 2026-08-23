import { useState } from 'react'
import Reveal from './Reveal'

const projectTypes = [
  'Website',
  'Web Application',
  'Management System',
  'API / Backend',
  'Other',
]

const initialForm = {
  name: '',
  email: '',
  projectType: projectTypes[0],
  message: '',
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meajdyna'

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }))

    setServerError('')
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Please add a short message.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setServerError('')
    setStatus('loading')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          projectType: form.projectType,
          message: form.message.trim(),
          _subject: `New Portfolio Project Inquiry - ${form.projectType}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.errors?.[0]?.message || 'Unable to send your message.'
        )
      }

      setStatus('sent')
      setForm(initialForm)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setServerError(
        error.message || 'Unable to send your message. Please try again.'
      )
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-container contact-wrapper">
        <Reveal>
          <p className="section-label">04 — Contact</p>

          <h2 className="section-title">
            Have an idea?
            <span className="grad-text"> Let's build it.</span>
          </h2>

          <p className="contact-text">
            Looking for a developer to build a modern website, web
            application, or digital system? Feel free to contact me.
          </p>
        </Reveal>

        <Reveal delay={100} className="contact-links">
          <a
            href="mailto:saacidgamer7@gmail.com"
            className="contact-pill"
          >
            <span>Email</span>
            <strong>saacidgamer7@gmail.com</strong>
          </a>

          <a
            href="https://github.com/saahil90"
            target="_blank"
            rel="noreferrer"
            className="contact-pill"
          >
            <span>GitHub</span>
            <strong>github.com/saahil90</strong>
          </a>
        </Reveal>

        <Reveal delay={180} className="contact-form-wrap">
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={status === 'loading'}
                />

                {errors.name && (
                  <small className="form-error">
                    {errors.name}
                  </small>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={status === 'loading'}
                />

                {errors.email && (
                  <small className="form-error">
                    {errors.email}
                  </small>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="projectType">Project Type</label>

              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                disabled={status === 'loading'}
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me a bit about your project..."
                disabled={status === 'loading'}
              />

              {errors.message && (
                <small className="form-error">
                  {errors.message}
                </small>
              )}
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading'
                ? 'Sending...'
                : status === 'sent'
                  ? 'Message Sent ✓'
                  : 'Send Message'}
            </button>

            {status === 'sent' && (
              <p className="form-note form-note-success">
                Your message has been sent successfully. I'll get back to
                you as soon as possible.
              </p>
            )}

            {status === 'error' && (
              <p className="form-note form-error">
                {serverError}
              </p>
            )}

            {status === 'idle' && (
              <p className="form-note">
                Your message will be sent directly to my inbox.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact