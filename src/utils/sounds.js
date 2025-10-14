// Sound utility functions using Web Audio API

/**
 * Plays a click sound using Web Audio API
 * Creates a short, pleasant click sound without needing audio files
 */
export const playClickSound = () => {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Create oscillator for the click sound
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    // Connect nodes
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Configure the click sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // High pitch
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.01) // Quick drop
    
    // Volume envelope for a sharp click
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)
    
    // Play the sound
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.05)
    
    // Clean up
    setTimeout(() => {
      audioContext.close()
    }, 100)
  } catch (error) {
    // Silently fail if audio is not supported
    console.log('Audio not supported:', error)
  }
}

// Audio prefetching cache
const audioCache = new Map()

/**
 * Prefetches audio files for better performance
 * Caches audio objects to avoid reloading on subsequent plays
 */
export const prefetchAudio = () => {
  const audioFiles = [
    '/switch.mp3',
    '/iron-man-repulsor-157371 (3).mp3',
    '/missile.mp3'
  ]

  audioFiles.forEach(audioSrc => {
    if (!audioCache.has(audioSrc)) {
      try {
        const audio = new Audio(audioSrc)
        audio.preload = 'auto'
        audio.volume = 0.5
        
        // Cache the audio object
        audioCache.set(audioSrc, audio)
        
        // Preload by setting source and loading
        audio.load()
        
        console.log(`🎵 Prefetched audio: ${audioSrc}`)
      } catch (error) {
        console.log(`Failed to prefetch audio: ${audioSrc}`, error)
      }
    }
  })
}

/**
 * Plays the switch sound from audio file
 * Uses cached audio if available for better performance
 */
export const playToggleSound = () => {
  try {
    const audioSrc = '/switch.mp3'
    let audio = audioCache.get(audioSrc)
    
    if (!audio) {
      audio = new Audio(audioSrc)
      audioCache.set(audioSrc, audio)
    }
    
    audio.volume = 0.5 // Set volume to 50%
    audio.currentTime = 0 // Reset to beginning
    audio.play().catch(err => console.log('Audio play failed:', err))
  } catch (error) {
    console.log('Audio not supported:', error)
  }
}

/**
 * Preloads all audio files on component mount
 * Call this in useEffect for better user experience
 */
export const preloadAllAudio = () => {
  if (typeof window !== 'undefined') {
    // Prefetch on user interaction to respect browser autoplay policies
    const preloadOnInteraction = () => {
      prefetchAudio()
      document.removeEventListener('click', preloadOnInteraction)
      document.removeEventListener('touchstart', preloadOnInteraction)
    }
    
    document.addEventListener('click', preloadOnInteraction, { once: true })
    document.addEventListener('touchstart', preloadOnInteraction, { once: true })
  }
}
