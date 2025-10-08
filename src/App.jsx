import { useEffect } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CardNav from './ui/navbar'
import Pixel from './ui/Pixel'
import ScrollProgress from './components/ScrollProgress'
import ExperienceTimeline from './components/exp'

function App() {
  useEffect(() => {
    // Scroll reveal animation with throttling
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)')
          elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top
            const windowHeight = window.innerHeight
            if (elementPosition < windowHeight * 0.85) {
              element.classList.add('revealed')
            }
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      label: 'About',
      bgColor: '#1a1a1a',
      textColor: '#ffffff',
      links: [
        { label: 'Skills', href: '#about', ariaLabel: 'View my skills' },
        { label: 'Experience', href: '#experience', ariaLabel: 'View my experience' }
      ]
    },
    {
      label: 'Projects',
      bgColor: '#2a2a2a',
      textColor: '#ffffff',
      links: [
        { label: 'Featured', href: '#projects', ariaLabel: 'View featured projects' },
        { label: 'All Projects', href: '#allprojects', ariaLabel: 'View all projects' }
      ]
    },
    {
      label: 'Contact',
      bgColor: '#3a3a3a',
      textColor: '#ffffff',
      links: [
        { label: 'Get in Touch', href: '#contact', ariaLabel: 'Contact me' },
        { label: 'Social Links', href: '#socialLinks', ariaLabel: 'View social links' }
      ]
    }
  ]
  return (
    <>
    <div className="global-pixel-background">
        <Pixel />
    </div>
    
    {/* Scroll Progress Indicator */}
    <ScrollProgress />
    
    <div className="app">
      <CardNav
        logo="/logo.png"
        logoAlt="Aditya Kurani"
        items={navItems}
        baseColor="#000000"
        menuColor="#ffffff"
        buttonBgColor="#ffffff"
        buttonTextColor="#000000"
      />
        <Hero />
        <ExperienceTimeline />
        <About />
        <Projects />
        <Contact />
    </div>
    </>
  )
}

export default App