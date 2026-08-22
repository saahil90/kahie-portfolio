import Reveal from './Reveal'

const infoCards = [
  { label: 'Focus', value: 'Web Development' },
  { label: 'Specialty', value: 'Full-Stack Systems' },
  { label: 'Username', value: '@kahie' },
]

function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container about-grid">
        <Reveal>
          <p className="section-label">01 — About Me</p>
          <h2 className="section-title">
            Turning ideas into
            <span className="grad-text"> useful digital products.</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="about-content">
          <p>
            I'm <strong>Said Abdullahi Mohamed</strong>, also known as
            <strong> Kahie</strong>. I am a Full-Stack Developer interested
            in building modern websites, web applications, APIs, and
            practical management systems.
          </p>

          <p>
            I enjoy working across the complete development process, from
            designing clean user interfaces to building backend services,
            databases, and reliable application functionality.
          </p>

          <div className="about-info">
            {infoCards.map((card) => (
              <div className="info-card" key={card.label}>
                <span>{card.label.toUpperCase()}</span>
                <strong>{card.value}</strong>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
