import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { playToggleSound, prefetchAudio } from '../utils/sounds'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    // Prefetch audio files for better performance
    prefetchAudio()
    playToggleSound()
    toggleTheme()
  }

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={handleToggle}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeToggle
