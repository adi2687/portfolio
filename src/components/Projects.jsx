import { useEffect, useState, useRef } from 'react'
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaPlay, FaStar, FaEye, FaCode, FaRocket, FaSearch, FaTimes ,FaYoutube} from 'react-icons/fa'
import './Projects.css'
const Projects = () => {
  const [projectsData, setProjectsData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const videoRefs = useRef([])

  useEffect(() => {
    // Load projects data
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => setProjectsData(data))
      .catch(err => console.error('Error loading projects data:', err))
  }, [])

  // Enhanced Intersection Observer for video autoplay
  useEffect(() => {
    if (videoRefs.current.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '100px', // Start loading earlier
      threshold: 0.3 // Play when 30% visible
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.isIntersecting) {
          // Pause other videos for better performance
          videoRefs.current.forEach(v => {
            if (v !== video && v) v.pause()
          })
          
          // Try to play the video
          if (video) {
            video.play().catch((error) => {
              console.log('Video autoplay failed:', error)
              // If autoplay fails, try again after user interaction
              const playOnInteraction = () => {
                video.play().catch(() => {})
                document.removeEventListener('click', playOnInteraction)
                document.removeEventListener('scroll', playOnInteraction)
              }
              document.addEventListener('click', playOnInteraction, { once: true })
              document.addEventListener('scroll', playOnInteraction, { once: true })
            })
          }
        } else if (video) {
          video.pause()
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Setup observer immediately
    videoRefs.current.forEach(video => {
      if (video) observer.observe(video)
    })

    return () => {
      videoRefs.current.forEach(video => {
        if (video) observer.unobserve(video)
      })
    }
  }, [projectsData])

  const categories = ['all', 'ai', 'web', 'mobile']

  // Filter by category and search query
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.summary && project.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Filter featured projects with search query
  const featuredProjects = filteredProjects.filter(project => project.featured)

  const addVideoRef = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el)
      
      // Try to play video immediately if it's in viewport
      const rect = el.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isInViewport) {
        setTimeout(() => {
          el.play().catch(() => {
            console.log('Video autoplay failed, user interaction required')
          })
        }, 500)
      }
    }
  }

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-number">04.</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line"></div>
        </div>
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search projects by name, tech stack, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="search-results-count">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="featured-section">

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
                      <div className="video-container">
                        <video
                          ref={addVideoRef}
                          src={project.video || project.image}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          autoPlay
                          poster={project.image}
                          className="project-video"
                        />
                        <button 
                          className="video-play-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            const video = e.target.previousElementSibling
                            if (video.paused) {
                              video.play()
                            } else {
                              video.pause()
                            }
                          }}
                          aria-label="Play/Pause video"
                        >
                          <FaPlay />
                        </button>
                      </div>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <div className="project-icon-wrapper">
                        <i className={project.icon}></i>
                      </div>
                      <span className="project-category">
                        <FaRocket className="category-icon" />
                        {project.category}
                      </span>
                    </div>
                    
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-description">{project.summary}</p>
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
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div className="all-projects-section" id="allprojects">
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

          {filteredProjects.length === 0 ? (
            <div className="no-results">
              <FaSearch className="no-results-icon" />
              <h4 className="no-results-title">No projects found</h4>
              <p className="no-results-text">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
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
                          title="Live"
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
          )}
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
                  {selectedProject.youtube && (
                    <a
                      href={selectedProject.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary youtube-btn"
                    >
                      <FaYoutube /> YouTube
                    </a>
                  )}
                </div>
                <div className='modal-section'>
                <h4>Project Description</h4>
                <p className="modal-description">{selectedProject.description}</p>
                </div>

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

                
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects