import { useEffect, Suspense, lazy } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import CardNav from './ui/navbar'
import ScrollProgress from './components/ScrollProgress'
import ExperienceTimeline from './components/exp'
// import { measurePerformance, optimizeResourceLoading, monitorBundleSize } from './utils/performance'
import { preloadAllAudio } from './utils/sounds'

// Lazy load heavy components
const Projects = lazy(() => import('./components/Projects'))
// Import Pixel directly for immediate loading
import Pixel from './ui/Pixel'

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    // measurePerformance()
    // optimizeResourceLoading()
    // monitorBundleSize()
    
    // Preload audio files on user interaction
    preloadAllAudio()

    // Optimized scroll reveal animation
    const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)')
    
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    )

    // Throttle observer setup for better performance
    const timeoutId = setTimeout(() => {
      elements.forEach(element => observer.observe(element))
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
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
        <Suspense fallback={<div className="projects-loading">Loading projects...</div>}>
          <Projects />
        </Suspense>
        <Contact />
    </div>
    </>
  )
}

export default App