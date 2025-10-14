import { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => scrollToSection('home')}>
          <span className="logo-text">AK</span>
          <span className="logo-dot"></span>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li>
              <a onClick={() => scrollToSection('home')} className="nav-link">
                <span className="nav-number">01.</span>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('about')} className="nav-link">
                <span className="nav-number">02.</span>
                <span>About</span>
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('projects')} className="nav-link">
                <span className="nav-number">03.</span>
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('contact')} className="nav-link">
                <span className="nav-number">04.</span>
                <span>Contact</span>
              </a>
            </li>
          </ul>
          <a 
            href="https://github.com/adi2687" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline resume-btn"
          >
            GitHub
          </a>
        </nav>
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  )
}

export default Header
