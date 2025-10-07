import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa'
import './Hero.css'
import me from '../../public/metesting.jpg'
const Hero = () => {
  const [heroData, setHeroData] = useState({ description: '' })

  useEffect(() => {
    // Load hero data
    fetch('/data/hero.json')
      .then(res => res.json())
      .then(data => setHeroData(data))
      .catch(err => console.error('Error loading hero data:', err))
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero" >
      <div className="grid-background"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            {/* <p className="hero-greeting animate-fadeIn">Hi, I'm</p> */}
            <h1 className="hero-name animate-fadeInUp">
              Aditya Kurani<span className="cursor-blink">_</span>
            </h1>
            <h2 className="hero-title animate-fadeInUp">
              Computer Science Student & Developer
            </h2>
            <p className="hero-description animate-fadeInUp">
              {heroData.description || "I'm a dedicated student at IIIT Nagpur with a strong passion for software development. Currently, I'm focused on building full-stack applications and enhancing my problem-solving skills."}
            </p>
            <div className="hero-cta animate-fadeInUp">
              <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
                View Projects
                <i className="fas fa-arrow-right"></i>
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-outline">
                Get In Touch
              </button>
            </div>
            <div className="hero-social animate-fadeInUp">
              <a href="https://github.com/adi2687" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/aditya-kurani-818668176/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://x.com/AdityaKurani" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/aditya_kurani_26/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://www.google.com/search?q=aditya+kurani" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGoogle />
              </a>
            </div>
          </div>
          {/* <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-border"></div>
              <div className="hero-image-content">
                <span className="hero-initials">AK</span>
              </div>
            </div>
          </div> */}
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Scroll</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
