import { useEffect, useState } from 'react'
import './About.css'

const About = () => {
  const [aboutData, setAboutData] = useState({ paragraphs: [] })
  const [skillsData, setSkillsData] = useState([])
  const [awardsData, setAwardsData] = useState([])
  const [timelineData, setTimelineData] = useState([])
  const [projectslength, setProjectslength] = useState(0)
  const [projectsData, setProjectsData] = useState([])
  const [questions, setQuestions] = useState(0)
  useEffect(() => {
    // Load about data
    fetch('/data/about.json')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error('Error loading about data:', err))

    // Load skills data
    fetch('/data/skills.json')
      .then(res => res.json())
      .then(data => setSkillsData(data.filter(skill => skill.name)))
      .catch(err => console.error('Error loading skills data:', err))

    // Load awards data
    fetch('/data/awards.json')
      .then(res => res.json())
      .then(data => setAwardsData(data))
      .catch(err => console.error('Error loading awards data:', err))

    // Load timeline data
    fetch('/data/timeline.json')
      .then(res => res.json())
      .then(data => {
        setTimelineData(data[0].education)
        setQuestions(data[1].questions)

      })
      .catch(err => console.error('Error loading timeline data:', err))

    // Load projects data
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjectsData(data)
        setProjectslength(data.length)
      })
      .catch(err => console.error('Error loading projects data:', err))
  }, [])

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-number">02.</span>
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
