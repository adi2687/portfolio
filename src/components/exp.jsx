import React, { useEffect, useState, useRef } from 'react';
import './exp.css';

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const experienceRef = useRef(null);

  useEffect(() => {
    fetch('/data/experience.json')
      .then(res => res.json())
      .then(data => {
        setExperienceData(data);
        // Initialize all cards as not visible
        setVisibleCards(new Array(data.length).fill(false));
      })
      .catch(err => console.error('Error loading experience data:', err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'), 10);
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const cards = document.querySelectorAll('.experience-card');
    cards.forEach((card, index) => {
      card.setAttribute('data-index', index);
      observer.observe(card);
    });

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, [experienceData]);

  return (
    <section id="experience" className="experience section" ref={experienceRef}>
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-number">02.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line"></div>
        </div>

        <div className="experience-timeline">
          {experienceData.map((experience, index) => (
            <div
              key={index}
              className={`experience-card ${visibleCards[index] ? 'revealed' : ''}`}
            >
              <div className="experience-icon">
                <i className={experience.icon}></i>
              </div>
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-title">{experience.position}</h3>
                  <span className="experience-company">{experience.company}</span>
                </div>
                <p className="experience-date">
                  {experience.startDate} - {experience.endDate}
                </p>
                <div className="experience-description">
                  {experience.description.map((desc, index) => (
                    <div key={index} className='experience-item'>
                      <span className="experience-dot"></span>
                      {desc}
                      <br />
                    </div>

                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience
