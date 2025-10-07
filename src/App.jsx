import { useEffect } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CardNav from './ui/navbar'
import Pixel from './ui/Pixel'
import ScrollProgress from './components/ScrollProgress'

function App() {
  useEffect(() => {
    // Scroll reveal animation
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal')
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('revealed')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
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
        { label: 'Experience', href: '#about', ariaLabel: 'View my experience' }
      ]
    },
    {
      label: 'Projects',
      bgColor: '#2a2a2a',
      textColor: '#ffffff',
      links: [
        { label: 'Featured', href: '#projects', ariaLabel: 'View featured projects' },
        { label: 'All Projects', href: '#projects', ariaLabel: 'View all projects' }
      ]
    },
    {
      label: 'Contact',
      bgColor: '#3a3a3a',
      textColor: '#ffffff',
      links: [
        { label: 'Get in Touch', href: '#contact', ariaLabel: 'Contact me' },
        { label: 'Social Links', href: '#contact', ariaLabel: 'View social links' }
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
        <About />
        <Projects />
        <Contact />
    </div>
    </>
  )
}
export default App