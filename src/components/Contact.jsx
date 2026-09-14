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

// BACKEND URL
const API_URL = 'https://portfolioemailserver-acw8dte1.b4a.run'

// FORMSPREE
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meajdyna'

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [otp, setOtp] = useState('')
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
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Please add a short message.'
    }

    return nextErrors
  }

  const handleSendOTP = async (event) => {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setServerError('')
    setStatus('sending-otp')

    try {
      const response = await fetch(`${API_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to send verification code.'
        )
      }

      setStatus('otp-sent')
    } catch (error) {
      console.error(error)
      setStatus('error')
      setServerError(
        error.message || 'Unable to send verification code.'
      )
    }
  }

  const handleVerifyAndSend = async (event) => {
    event.preventDefault()

    if (!otp.trim() || otp.length !== 6) {
      setServerError('Please enter the 6-digit verification code.')
      return
    }

    setServerError('')
    setStatus('verifying')

    try {
      const verifyResponse = await fetch(
        `${API_URL}/api/verify-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email.trim(),
            otp: otp.trim(),
          }),
        }
      )

      const verifyData = await verifyResponse.json()

      if (!verifyResponse.ok || !verifyData.success) {
        throw new Error(
          verifyData.message || 'Invalid verification code.'
        )
      }

      setStatus('sending-message')

      const formspreeResponse = await fetch(
        FORMSPREE_ENDPOINT,
        {
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
        }
      )

      const formspreeData = await formspreeResponse.json()

      if (!formspreeResponse.ok) {
        throw new Error(
          formspreeData?.errors?.[0]?.message ||
            'Unable to send your message.'
        )
      }

      setStatus('sent')
    } catch (error) {
      console.error(error)
      setStatus('error')
      setServerError(
        error.message || 'Something went wrong. Please try again.'
      )
    }
  }

  const resetForm = () => {
    setForm(initialForm)
    setOtp('')
    setErrors({})
    setServerError('')
    setStatus('idle')
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
          {status === 'sent' ? (
            <div className="contact-form">
              <p className="form-note form-note-success">
                Message sent successfully!
              </p>

              <button
                type="button"
                className="secondary-btn"
                onClick={resetForm}
              >
                Send Another Message
              </button>
            </div>
          ) : status === 'otp-sent' ||
            status === 'verifying' ||
            status === 'sending-message' ? (
            <form
              className="contact-form"
              onSubmit={handleVerifyAndSend}
            >
              <div className="form-field">
                <label htmlFor="otp">
                  Email Verification Code
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => {
                    const value = event.target.value.replace(
                      /\D/g,
                      ''
                    )
                    setOtp(value)
                    setServerError('')
                  }}
                  placeholder="Enter 6-digit code"
                  autoComplete="one-time-code"
                />

                <small className="form-note">
                  A 6-digit verification code was sent to{' '}
                  <strong>{form.email}</strong>.
                </small>
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={
                  status === 'verifying' ||
                  status === 'sending-message'
                }
              >
                {status === 'verifying'
                  ? 'Verifying...'
                  : status === 'sending-message'
                    ? 'Sending Message...'
                    : 'Verify & Send Message'}
              </button>

              {serverError && (
                <p className="form-note form-error">
                  {serverError}
                </p>
              )}

              <button
                type="button"
                className="secondary-btn"
                onClick={async () => {
                  setServerError('')
                  setStatus('sending-otp')

                  try {
                    const response = await fetch(
                      `${API_URL}/api/send-otp`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          email: form.email.trim(),
                        }),
                      }
                    )

                    const data = await response.json()

                    if (!response.ok || !data.success) {
                      throw new Error(
                        data.message ||
                          'Unable to send verification code.'
                      )
                    }

                    setStatus('otp-sent')
                  } catch (error) {
                    setStatus('error')
                    setServerError(
                      error.message ||
                        'Unable to send verification code.'
                    )
                  }
                }}
              >
                Send Code Again
              </button>
            </form>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSendOTP}
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
                  />

                  {errors.email && (
                    <small className="form-error">
                      {errors.email}
                    </small>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="projectType">
                  Project Type
                </label>

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
                  <small className="form-error">
                    {errors.message}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={status === 'sending-otp'}
              >
                {status === 'sending-otp'
                  ? 'Sending Code...'
                  : 'Send Message'}
              </button>

              {status === 'error' && (
                <p className="form-note form-error">
                  {serverError}
                </p>
              )}

              <p className="form-note">
                You will receive a verification code before your
                message is sent.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default Contact