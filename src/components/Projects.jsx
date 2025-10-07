import { useEffect, useState, useRef } from 'react'
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaPlay, FaStar, FaEye, FaCode, FaRocket } from 'react-icons/fa'
import './Projects.css'
const Projects = () => {
  const [projectsData, setProjectsData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const videoRefs = useRef([])

  useEffect(() => {
    // Load projects data
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => setProjectsData(data))
      .catch(err => console.error('Error loading projects data:', err))
  }, [])

  // Intersection Observer for video autoplay
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Video must be 50% visible
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.isIntersecting) {
          // Video is visible, play it
          video.play().catch(err => console.log('Video play failed:', err))
        } else {
          // Video is not visible, pause it
          video.pause()
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all video elements
    videoRefs.current.forEach(video => {
      if (video) {
        observer.observe(video)
      }
    })

    // Cleanup
    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          observer.unobserve(video)
        }
      })
    }
  }, [projectsData])

  const categories = ['all', 'ai', 'web', 'mobile']
  
  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory)

  const featuredProjects = projectsData.filter(project => project.featured)

  const addVideoRef = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el)
    }
  }

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-number">03.</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line"></div>
        </div>

        {/* Featured Projects */}
        <div className="featured-section">
          <h3 className="subsection-title scroll-reveal">
            <FaStar className="title-icon" />
            Featured Work
            <div className="title-glow"></div>
          </h3>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="project-card featured scroll-reveal"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="project-image">
                  {project.isVideo || project.video ? (
                    <video 
                      ref={addVideoRef}
                      src={project.video || project.image} 
                      muted 
                      loop 
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img src={project.image} alt={project.title} />
                  )}
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <FaPlay className="play-icon" />
                      <span className="view-details">View Details</span>
                      <div className="overlay-particles">
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="project-glow"></div>
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <div className="project-icon-wrapper">
                      <i className={project.icon}></i>
                      <div className="icon-glow"></div>
                    </div>
                    <span className="project-category">
                      <FaRocket className="category-icon" />
                      {project.category}
                    </span>
                  </div>
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="tech-tag" style={{ animationDelay: `${i * 0.1}s` }}>
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="tech-tag more-tech">+{project.tech.length - 4}</span>
                    )}
                  </div>
                  <div className="project-links">
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="project-link github-link"
                        title="View Code"
                      >
                        <FaGithub />
                        <span className="link-tooltip">GitHub</span>
                      </a>
                    )}
                    {project.links.live && (
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="project-link live-link"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt />
                        <span className="link-tooltip">Live Demo</span>
                      </a>
                    )}
                    {project.links.linkedin && (
                      <a 
                        href={project.links.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="project-link linkedin-link"
                        title="LinkedIn Post"
                      >
                        <FaLinkedin />
                        <span className="link-tooltip">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="card-border-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div className="all-projects-section">
          <h3 className="subsection-title scroll-reveal">
            <FaCode className="title-icon" />
            All Projects
            <div className="title-glow"></div>
          </h3>
          
          <div className="filter-buttons scroll-reveal">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="filter-text">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <div className="filter-glow"></div>
                <div className="filter-ripple"></div>
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className="project-card compact scroll-reveal"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-card-header">
                  <div className="project-icon-wrapper">
                    <i className={project.icon}></i>
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="project-card-links">
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="card-link github-link"
                        title="View Code"
                      >
                        <FaGithub />
                        <div className="link-ripple"></div>
                      </a>
                    )}
                    {project.links.live && (
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="card-link live-link"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt />
                        <div className="link-ripple"></div>
                      </a>
                    )}
                    <div className="view-more-btn">
                      <FaEye />
                      <span>View More</span>
                    </div>
                  </div>
                </div>
                <h4 className="project-card-title">{project.title}</h4>
                <p className="project-card-description">
                  {project.description.slice(0, 120)}...
                </p>
                <div className="project-card-tech">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span key={i} className="tech-badge" style={{ animationDelay: `${i * 0.05}s` }}>
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="tech-badge more-badge">+{project.tech.length - 3}</span>
                  )}
                </div>
                <div className="card-hover-glow"></div>
                <div className="card-border-animation"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            
            <div className="modal-body">
              <div className="modal-media">
                {selectedProject.isVideo || selectedProject.video ? (
                  <video 
                    src={selectedProject.video || selectedProject.image} 
                    controls 
                    autoPlay 
                    loop
                    muted
                  />
                ) : (
                  <img src={selectedProject.image} alt={selectedProject.title} />
                )}
              </div>
              
              <div className="modal-info">
                <div className="modal-header">
                  <h3>{selectedProject.title}</h3>
                  <span className="modal-category">{selectedProject.category}</span>
                </div>
                
                <p className="modal-description">{selectedProject.description}</p>
                
                <div className="modal-section">
                  <h4>Technologies</h4>
                  <div className="modal-tech">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="modal-section">
                    <h4>Key Features</h4>
                    <ul className="modal-features">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="modal-links">
                  {selectedProject.links.github && (
                    <a 
                      href={selectedProject.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {selectedProject.links.live && (
                    <a 
                      href={selectedProject.links.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {selectedProject.links.linkedin && (
                    <a 
                      href={selectedProject.links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects