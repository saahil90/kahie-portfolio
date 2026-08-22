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

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | sent

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) nextErrors.message = 'Please add a short message.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      setStatus('idle')
      return
    }

    setStatus('loading')

    const subject = encodeURIComponent(
      `Project inquiry — ${form.projectType} (from ${form.name})`
    )
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.projectType}\n\nMessage:\n${form.message}`
    )

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=saacidgamer7@gmail.com&su=${subject}&body=${body}`

    // brief delay so the loading state is visible before Gmail opens
    window.setTimeout(() => {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
      setStatus('sent')
    }, 500)
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
          <a href="mailto:saacidgamer7@gmail.com" className="contact-pill">
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
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
                />
                {errors.name && <small className="form-error">{errors.name}</small>}
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
                />
                {errors.email && (
                  <small className="form-error">{errors.email}</small>
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
              />
              {errors.message && (
                <small className="form-error">{errors.message}</small>
              )}
            </div>

            <button type="submit" className="primary-btn" disabled={status === 'loading'}>
              {status === 'loading' ? 'Opening Gmail…' : 'Send Message'}
            </button>

            <p className={`form-note ${status === 'sent' ? 'form-note-success' : ''}`}>
              {status === 'sent'
                ? 'Gmail has been opened with your message pre-filled. Review it and press Send.'
                : status === 'loading'
                ? 'Preparing your message…'
                : "Submitting opens Gmail with your message pre-filled — you'll still need to press Send there."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
