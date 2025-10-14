import { useState, useEffect } from 'react'
import './About.css'

const About = () => {
  const [aboutData, setAboutData] = useState({ paragraphs: [] })
  const [skillsData, setSkillsData] = useState([])
  const [awardsData, setAwardsData] = useState([])
  const [timelineData, setTimelineData] = useState([])
  const [projectslength, setProjectslength] = useState(0)
  const [projectsData, setProjectsData] = useState([])
  const [questions, setQuestions] = useState(0)
  
  // Load data with intersection observer for better performance
  useEffect(() => {
    const loadData = async () => {
      try {
        const [aboutRes, skillsRes, awardsRes, timelineRes, projectsRes] = await Promise.all([
          fetch('/data/about.json'),
          fetch('/data/skills.json'),
          fetch('/data/awards.json'),
          fetch('/data/timeline.json'),
          fetch('/data/projects.json')
        ])
        
        const [about, skills, awards, timeline, projects] = await Promise.all([
          aboutRes.json(),
          skillsRes.json(),
          awardsRes.json(),
          timelineRes.json(),
          projectsRes.json()
        ])
        
        setAboutData(about)
        setSkillsData(skills.filter(skill => skill.name))
        setAwardsData(awards)
        setTimelineData(timeline[0].education)
        setQuestions(timeline[1].questions)
        setProjectsData(projects)
        setProjectslength(projects.length)
      } catch (err) {
        console.error('Error loading data:', err)
      }
    }
    
    // Delay loading until component is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadData()
        observer.disconnect()
      }
    })
    
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      observer.observe(aboutSection)
    } else {
      // Fallback if section not found
      loadData()
    }
    
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-number">03.</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text scroll-reveal">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
                className="about-paragraph"
              />
            ))}
          </div>

          <div className="about-stats scroll-reveal">
            <div className="stat-card">
              <div className="stat-number">{questions}</div>
              <div className="stat-label">LeetCode Problems</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{projectslength}</div>
              <div className="stat-label">Projects Built</div>
            </div>
            
          </div>
        </div>

        <div className="skills-section">
          <h3 className="skills-title">Technical Skills</h3>
          <div className="skills-compact-grid">
            {skillsData.map((skill, index) => (
              <div key={index} className="skill-compact-item cursor-pointer hover:bg-gray-100">
                <i className={skill.icon}></i>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="awards-section">
          <h3 className="awards-title scroll-reveal">Awards & Achievements</h3>
          <div className="awards-grid">
            {awardsData.map((award, index) => (
              <div key={index} className="award-card scroll-reveal">
                <div className="award-icon">
                  <i className={award.icon}></i>
                </div>
                <div className="award-content">
                  <h4 className="award-title">{award.title}</h4>
                  <p className="award-description">{award.description}</p>
                  {award.link && (
                    <a href={award.link} target="_blank" rel="noopener noreferrer" className="award-link">
                      View Profile
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-section">
          <h3 className="timeline-title scroll-reveal">Education</h3>
          <div className="timeline">
            {timelineData ?  (
              <div className={`timeline-item scroll-reveal`}>
                <div className="timeline-icon">
                  <i className={timelineData.icon}></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">{timelineData.date}</div>
                  <h4 className="timeline-item-title">{timelineData.title}</h4>
                  <h5 className="timeline-item-subtitle">{timelineData.subtitle}</h5>
                  <p className="timeline-text">{timelineData.description}</p>
                </div>
              </div>
            ) : (
              <p>No timeline data available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
