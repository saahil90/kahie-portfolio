import Reveal from './Reveal'

// Drop screenshots into src/assets/projects/ using the filenames below —
// they are picked up automatically. No file yet? The card falls back to
// the designed placeholder cover art.
const projectImages = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

function resolveImage(filename) {
  if (!filename) return null
  const match = Object.entries(projectImages).find(([path]) =>
    path.endsWith(`/${filename}`)
  )
  return match ? match[1] : null
}

const projects = [
  {
  number: '01',
  mark: 'TS',
  cover: 'cover-01',
  image: 'tayo-supermarket.png',
  title: 'Tayo Supermarket',
  category: 'Full-Stack Management System',
  description:
    'A supermarket management system currently in development for managing products, customers, employees, orders, and deliveries.',
  tech: ['React', 'Spring Boot', 'PostgreSQL'],
  frontend:
    'https://github.com/saahil90/Tayo-supermarket/tree/main/tayo-supermarket-frontend',
  backend:
    'https://github.com/saahil90/Tayo-supermarket/tree/main/tayo-supermarket',
  demo: '',
  status: 'github-only',
},
  {
    number: '02',
    mark: 'SA',
    cover: 'cover-02',
    image: 'somarena.png',
    title: 'SomArena',
    category: 'Gaming Platform',
    description:
      'A modern platform designed for Somali gamers with player profiles, clans, tournaments, rankings, competitions, and gaming communities.',
    tech: ['React', 'JavaScript', 'PostgreSQL'],
    github: '',
    demo: '',
    status: 'coming-soon',
  },
  {
    number: '03',
    mark: 'CR',
    cover: 'cover-03',
    image: 'car-rental.png',
    title: 'Car Rental System',
    category: 'Full-Stack Web Application',
    description:
      'A full-stack car rental management system for managing cars, customers, bookings, and rental operations.',
    tech: ['React', 'C#', '.NET'],
    frontend: 'https://github.com/saahil90/car-rental-frontend',
    backend: 'https://github.com/saahil90/Car-Rental',
    demo: '',
    status: 'github-only',
  },
]

function ProjectActions({ project }) {
  if (project.status === 'live') {
    return (
      <div className="project-actions">
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="ghost-btn ghost-btn-active"
        >
          View Project
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="ghost-btn ghost-btn-active"
        >
          View Code
        </a>
      </div>
    )
  }

  if (project.status === 'github-only') {
    return (
      <div className="project-actions">
        {project.frontend && (
          <a
            href={project.frontend}
            target="_blank"
            rel="noreferrer"
            className="ghost-btn ghost-btn-active"
          >
            Frontend Code
          </a>
        )}

        {project.backend && (
          <a
            href={project.backend}
            target="_blank"
            rel="noreferrer"
            className="ghost-btn ghost-btn-active"
          >
            Backend Code
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="project-actions">
      <button className="ghost-btn" disabled title="Not available yet">
        Coming Soon
      </button>
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-heading">
          <Reveal>
            <p className="section-label">03 — My Projects</p>
            <h2 className="section-title">
              Things I've
              <span className="grad-text"> created.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="section-text">
              A collection of projects representing my experience in
              frontend, backend, database design, and full-stack
              development.
            </p>
          </Reveal>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const screenshot = resolveImage(project.image)

            return (
              <Reveal
                as="article"
                key={project.number}
                delay={index * 90}
                className="project-card"
              >
                <div className={`project-cover ${project.cover}`}>
                  <div className="cover-browser-bar">
                    <div className="cover-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="cover-url">
                      {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                    </span>
                  </div>

                  {screenshot ? (
                    <div className="cover-screenshot">
                      <img src={screenshot} alt={`${project.title} preview`} />
                    </div>
                  ) : (
                    <div className="cover-canvas">
                      <span className="cover-mark">{project.mark}</span>
                      <span className="cover-number">{project.number}</span>
                    </div>
                  )}
                </div>

                <div className="project-card-body">
                  <div className="project-row-top">
                    <h3>{project.title}</h3>
                    <span className="project-category">
                      {project.category}
                    </span>
                  </div>

                  <p>{project.description}</p>

                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <small key={tech}>{tech}</small>
                    ))}
                  </div>

                  <ProjectActions project={project} />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
