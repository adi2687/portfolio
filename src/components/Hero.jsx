import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGoogle, FaGamepad, FaRocket, FaPlay } from 'react-icons/fa'
import './Hero.css'
import me from '/metesting.jpg'

// Preload the hero image
const heroImage = new Image()
heroImage.src = me

const Hero = () => {
  // Static content for faster loading
  const heroData = {
    description: "I'm a dedicated student at IIIT Nagpur with a strong passion for software development. Currently, I'm focused on building full-stack applications and enhancing my problem-solving skills."
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      {/* Background Elements */}
      <div className="grid-background"></div>

      {/* Main Hero Container */}
      <div className="hero-container">

        {/* Hero Content Grid */}
        <div className="hero-content">

          {/* Left Column - Text Content */}
          <div className="hero-text">
            <h1 className="hero-name animate-fadeInUp">
              Aditya Kurani<span className="cursor-blink">_</span>
            </h1>
            <h2 className="hero-title animate-fadeInUp">
              Computer Science Student & Developer
            </h2>
            <p className="hero-description animate-fadeInUp">
              {heroData.description || "I'm a dedicated student at IIIT Nagpur with a strong passion for software development. Currently, I'm focused on building full-stack applications and enhancing my problem-solving skills."}
            </p>

            {/* Call-to-Action Buttons */}
            <div className="hero-cta animate-fadeInUp">
              <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
                View Projects
                <i className="fas fa-arrow-right"></i>
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-outline">
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="hero-social animate-fadeInUp" id="socialLinks">
              <a href="https://github.com/adi2687" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/aditya-kurani" target="_blank" rel="noopener noreferrer" className="social-link">
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

          {/* Right Column - Visual Content */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-border"></div>
              <img
                src={me}
                alt="Aditya Kurani"
                className="hero-photo"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Scroll</span>
        </div>

        {/* Interactive Game Section */}
        <div className="interactive-game-section animate-fadeInUp">
          <div className="game-card">
            <div className="game-card-header">
              <div className="game-icon">
                <FaGamepad />
              </div>
              <div className="game-title">
                <h3>Interactive Portfolio</h3>
                <p>Experience my work through an Iron Man themed game</p>
              </div>
            </div>

            {/* <div className="game-features">
              <div className="feature-item">
                <FaRocket className="feature-icon" />
                <span>3D Interactive Experience</span>
              </div>
              <div className="feature-item">
                <FaPlay className="feature-icon" />
                <span>Portfolio Showcase</span>
              </div>
            </div> */}

            <a
              href="https://adi2687.github.io/iron_man/"
              target="_blank"
              rel="noopener noreferrer"
              className="game-link-enhanced"
            >
              <span className="game-link-text">
                <FaGamepad className="link-icon" />
                Launch Interactive Game
              </span>
              <div className="game-link-arrow">
                <span>→</span>
              </div>
              <div className="game-link-glow"></div>
            </a>

<div className="game-preview">
            <div className="preview-text">Experience my portfolio like never before</div>
          </div>
          </div>
          
        </div>

      </div>
    </section>
  )
}

export default Hero