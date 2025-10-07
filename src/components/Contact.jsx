import { useState, useRef } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import './Contact.css'

const Contact = () => {
  const form = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await emailjs.sendForm(
        'service_uet0wns',              // Replace with your EmailJS service ID
        'template_mjgdn3v',              // Replace with your EmailJS template ID
        form.current,
        'tVYHnLdWAWgc8ZPed'              // Replace with your EmailJS public key
      )

      if (result.text === 'OK') {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-number">04.</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line"></div>
        </div>

        <div className="contact-content">
          <div className="contact-info scroll-reveal">
            <h3 className="contact-subtitle">Let's Connect</h3>
            <p className="contact-text">
              I'm currently looking for new opportunities and collaborations. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-item-content">
                  <h4>Email</h4>
                  <a href="mailto:adityakurani26@gmail.com">adityakurani26@gmail.com</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-item-content">
                  <h4>Location</h4>
                  <p>IIIT Nagpur, India</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-item-content">
                  <h4>Availability</h4>
                  <p>Open to opportunities</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form scroll-reveal" ref={form} onSubmit={handleSubmit}>
            {/* Hidden title field for EmailJS subject line */}
            <input type="hidden" name="title" value="Portfolio Contact Form Submission" />

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Your message..."
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <i className="fas fa-paper-plane"></i>
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="form-status success">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-status error">
                ❌ Failed to send message. Please try again or email me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
