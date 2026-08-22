import Reveal from './Reveal'

const skillGroups = [
  {
    label: 'Frontend',
    items: [
      { name: 'HTML', code: 'HT' },
      { name: 'CSS', code: 'CS' },
      { name: 'JavaScript', code: 'JS' },
      { name: 'React', code: 'RX' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Java', code: 'JV' },
      { name: 'Spring Boot', code: 'SB' },
      { name: 'C#', code: 'C#' },
      { name: '.NET', code: 'NT' },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'PostgreSQL', code: 'PG' },
      { name: 'SQL', code: 'SQ' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', code: 'GT' },
      { name: 'GitHub', code: 'GH' },
    ],
  },
]

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-heading">
          <Reveal>
            <p className="section-label">02 — My Skills</p>
            <h2 className="section-title">
              Technologies I use to
              <span className="grad-text"> build things.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="section-text">
              Technologies and tools I have worked with while creating web
              applications, backend systems, APIs, and databases.
            </p>
          </Reveal>
        </div>

        <div className="skills-groups">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.label}
              delay={index * 90}
              className="skill-group"
            >
              <span className="skill-group-label">{group.label}</span>

              <div className="skill-tags">
                {group.items.map((item) => (
                  <div className="skill-tag" key={item.name}>
                    <span className="skill-code">{item.code}</span>
                    {item.name}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
