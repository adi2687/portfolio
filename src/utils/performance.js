// Performance monitoring utilities
export const measurePerformance = () => {
  if (typeof window === 'undefined') return

  // Measure Core Web Vitals
  const measureCLS = () => {
    let clsValue = 0
    let clsEntries = []
    let sessionValue = 0
    let sessionEntries = []

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0]
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1]

          if (sessionValue && 
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value
            sessionEntries.push(entry)
          } else {
            sessionValue = entry.value
            sessionEntries = [entry]
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue
            clsEntries = [...sessionEntries]
          }
        }
      }
    })

    observer.observe({ entryTypes: ['layout-shift'] })

    return {
      get value() { return clsValue },
      get entries() { return clsEntries }
    }
  }

  // Measure FCP
  const measureFCP = () => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
        if (fcpEntry) {
          observer.disconnect()
          resolve(fcpEntry.startTime)
        }
      })
      observer.observe({ entryTypes: ['paint'] })
    })
  }

  // Measure LCP
  const measureLCP = () => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        observer.disconnect()
        resolve(lastEntry.startTime)
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    })
  }

  // Log performance metrics
  const logMetrics = async () => {
    try {
      const [fcp, lcp] = await Promise.all([
        measureFCP(),
        measureLCP()
      ])

      const cls = measureCLS()

      console.group('🚀 Performance Metrics')
      console.log(`First Contentful Paint: ${fcp.toFixed(2)}ms`)
      console.log(`Largest Contentful Paint: ${lcp.toFixed(2)}ms`)
      console.log(`Cumulative Layout Shift: ${cls.value.toFixed(3)}`)
      console.groupEnd()

      // Send to analytics if needed
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'Core Web Vitals',
          value: Math.round(fcp)
        })
      }
    } catch (error) {
      console.warn('Performance measurement failed:', error)
    }
  }

  // Run after page load
  if (document.readyState === 'complete') {
    logMetrics()
  } else {
    window.addEventListener('load', logMetrics)
  }
}

// Resource loading optimization
export const optimizeResourceLoading = () => {
  // Preload critical images
  const criticalImages = [
    '/metesting.jpg',
    '/logo.png'
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    link.fetchPriority = 'high'
    document.head.appendChild(link)
  })

  // Lazy load non-critical images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]')
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src || img.src
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach(img => imageObserver.observe(img))
  }
}

// Bundle size monitoring
export const monitorBundleSize = () => {
  if (typeof window === 'undefined') return

  const scripts = Array.from(document.scripts)
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  
  let totalSize = 0
  
  // Estimate script sizes
  scripts.forEach(script => {
    if (script.src) {
      // This is a rough estimate - in production you'd want more accurate measurement
      totalSize += 50 // KB estimate per script
    }
  })

  console.log(`📦 Estimated bundle size: ${totalSize}KB`)
  
  if (totalSize > 500) {
    console.warn('⚠️ Large bundle size detected. Consider code splitting.')
  }
}
