import { useEffect, useState } from 'react'
import profileImg from '../assets/pro.jpg'
import Reveal from './Reveal'

const stats = [
  { value: '4+', label: 'Projects Built' },
  { value: '10+', label: 'Technologies' },
  { value: 'Full-Stack', label: 'Development' },
  { value: 'Kahie', label: 'Personal Brand' },
]

const CV_PATH = `${import.meta.env.BASE_URL}Said-Abdullahi-Mohamed-CV.pdf`

function Hero() {
  const [cvAvailable, setCvAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(CV_PATH, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setCvAvailable(res.ok)
      })
      .catch(() => {
        if (!cancelled) setCvAvailable(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="home" className="hero-section">
      <div className="hero-glow hero-glow-cyan"></div>
      <div className="hero-glow hero-glow-purple"></div>

      <div className="section-container hero-grid">
        <div className="hero-content">
          <Reveal>
            <div className="available">
              <span></span>
              Available for freelance work
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="intro">HELLO, I'M</p>
          </Reveal>

          <Reveal delay={140}>
            <h1>
              <span className="grad-text">Said</span> Abdullahi Mohamed
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="role">Full-Stack Developer</h2>
          </Reveal>

          <Reveal delay={260}>
            <p className="description">
              I build modern websites, web applications, and practical
              digital systems with clean design, reliable functionality, and
              user-friendly experiences.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">
                View My Work
              </a>

              <a href="#contact" className="secondary-btn">
                Contact Me
              </a>

              {cvAvailable ? (
                <a
                  href={CV_PATH}
                  download="Said-Abdullahi-Mohamed-CV.pdf"
                  className="ghost-btn cv-btn cv-ready"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 2 2h12a2 2 0 0 2-2v-2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Download CV
                </a>
              ) : (
                <button
                  type="button"
                  className="ghost-btn cv-btn"
                  disabled
                  title="Add the PDF at public/Said-Abdullahi-Mohamed-CV.pdf to enable this button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 2 2h12a2 2 0 0 2-2v-2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  CV Coming Soon
                </button>
              )}
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="hero-visual">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="profile-card">
            <div className="profile-photo">
              <img src={profileImg} alt="Said Abdullahi Mohamed" />
            </div>

            <div className="profile-info">
              <strong>Kahie</strong>
              <span>Full-Stack Developer</span>
            </div>

            <div className="profile-tags">
              <small>React</small>
              <small>Java</small>
              <small>Spring Boot</small>
              <small>PostgreSQL</small>
            </div>
          </div>

          <div className="float-chip chip-react">React</div>
          <div className="float-chip chip-java">Java</div>
          <div className="float-chip chip-db">PostgreSQL</div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero