import { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes, FaUser, FaCode, FaFolder, FaEnvelope, FaGithub, FaLinkedin, FaGoogle } from 'react-icons/fa'
import './CommandMenu.css'

const CommandMenu = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  // Simple commands
  const commands = [
    { title: 'About Me', description: 'Learn more about my background', href: '#about', icon: FaUser },
    { title: 'Technical Skills', description: 'View my technical expertise', href: '#about', icon: FaCode },
    { title: 'Projects', description: 'Explore my portfolio projects', href: '#projects', icon: FaFolder },
    { title: 'Contact', description: 'Get in touch with me', href: '#contact', icon: FaEnvelope },
    {title : 'Google', description : 'Search on Google', href : 'https://google.com/search?q=Aditya%20Kurani', icon : FaGoogle, external : true},
    { title: 'GitHub', description: 'View my code repositories', href: 'https://github.com/adi2687', icon: FaGithub, external: true },
    { title: 'LinkedIn', description: 'Connect with me professionally', href: 'https://linkedin.com/in/aditya-kurani', icon: FaLinkedin, external: true },
  ]

  // Filter commands based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults(commands)
    } else {
      const filtered = commands.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    }
    setSelectedIndex(0)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % results.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length)
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            handleItemClick(results[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  const handleItemClick = (item) => {
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    } else {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="command-menu-overlay" onClick={(e) => {
      if (e.target.classList.contains('command-menu-overlay')) {
        onClose()
      }
    }}>
      <div className="command-menu">
        <div className="command-menu-header">
          <div className="command-input-wrapper">
            <FaSearch className="command-search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="command-input"
            />
            {query && (
              <button onClick={() => setQuery('')} className="command-clear-btn">
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="command-menu-content">
          {results.length === 0 ? (
            <div className="command-empty">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="command-results">
              {results.map((item, index) => (
                <div
                  key={item.title}
                  className={`command-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="command-item-icon">
                    <item.icon />
                  </div>
                  <div className="command-item-content">
                    <div className="command-item-title">{item.title}</div>
                    <div className="command-item-description">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="command-menu-footer">
          <div className="command-footer-left">
            <span>Aditya Kurani</span>
          </div>
          <div className="command-footer-right">
            <span>Press Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandMenu