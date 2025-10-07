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

/**
 * Plays the switch sound from audio file
 * Uses the switch.mp3 file for realistic toggle sound
 */
export const playToggleSound = () => {
  try {
    const audio = new Audio('/switch.mp3')
    audio.volume = 0.5 // Set volume to 50%
    audio.play().catch(err => console.log('Audio play failed:', err))
  } catch (error) {
    console.log('Audio not supported:', error)
  }
}
