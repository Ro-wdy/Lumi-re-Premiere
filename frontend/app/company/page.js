'use client';

import React from 'react';
import styles from './Company.module.css';
import Carousel from '../components/Carousel';

export default function Company() {
  const timelineMilestones = [
    { year: '2020', title: 'The Genesis', desc: 'Lumière Premiere was founded in Los Angeles with a single mission: to return cinematic scale and luxury to movie releases in a digital age.' },
    { year: '2022', title: 'Cannes Collaboration', desc: 'Appointed as the official red-carpet experience partner for major international film releases, expanding operations to Europe.' },
    { year: '2024', title: 'Virtual Premiere Suite', desc: 'Pioneered secure, high-fidelity digital screening rooms, allowing studios to broadcast live red-carpets to VIP critics worldwide.' },
    { year: '2026', title: 'The Next Era', desc: 'Expanding to 18 countries, producing theatrical launching experiences that blur the line between storytelling and reality.' },
  ];

  const coreValues = [
    { title: 'Prestige', desc: 'We curate experiences that communicate respect and admiration for the cinematic arts.' },
    { title: 'Innovation', desc: 'We combine classical Hollywood red-carpet prestige with cutting-edge web release technology.' },
    { title: 'Exclusivity', desc: 'We protect the intimacy of storytelling by maintaining tight, high-profile invitation lists.' },
    { title: 'Craftsmanship', desc: 'Every campaign, asset, video feed, and physical carpet layout is designed with absolute precision.' },
  ];

  const team = [
    { name: 'Marcus Sterling', role: 'Founder & Creative Director', image: 'M' },
    { name: 'Elena Vane', role: 'Head of Press & Guest Relations', image: 'E' },
    { name: 'David Cho', role: 'Director of Digital Experiences', image: 'D' },
  ];

  const services = [
    { name: 'Red Carpet Premieres', desc: 'Immersive, star-studded physical screening launches at major theatrical hubs globally.' },
    { name: 'Marketing Campaigns', desc: 'Prestige campaign rolls, targeted editorial drops, and puzzle-based viral campaigns.' },
    { name: 'Press Events', desc: 'Exclusive press junkets, secure review screening rooms, and broadcast panel interviews.' },
    { name: 'Influencer Screenings', desc: 'Highly curated previews for content creators in luxury glass lounges.' },
    { name: 'Trailer Launches', desc: 'High-impact digital broadcasts and theatrical teaser releases.' },
    { name: 'Digital Release Experiences', desc: 'Secure, bespoke single-page streaming platforms built for VIP screenings.' },
  ];

  const testimonials = [
    {
      quote: 'Lumière Premiere turned our launch into a global cultural event. The red carpet was breathtaking, and the press coverage was unmatched.',
      author: 'Christopher Nolan',
      role: 'Director',
      company: 'Eclipse of the Mind',
    },
    {
      quote: 'The level of luxury, attention to detail, and prestige they bring to film releases is unparalleled. They are the Apple of movie marketing.',
      author: 'Florence Pugh',
      role: 'Actress',
      company: 'Shadows in the Mist',
    },
  ];

  return (
    <div className={styles.companyPage}>
      <div className={styles.container}>
        {/* Header */}
        <section className={styles.header}>
          <span className={styles.preTitle}>THE INNER WORKINGS</span>
          <h1 className={styles.title}>The Art of the Release</h1>
          <p className={styles.description}>
            Lumière Premiere is a creative release agency that crafts luxurious, cinematic campaigns, red-carpet events, and digital premiere experiences for the world's most anticipated films.
          </p>
        </section>

        {/* Story Section */}
        <section className={styles.storySection}>
          <div className={styles.storyGrid}>
            <div>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.storyText}>
                We believe that a film launch shouldn't just be an advertisement—it should be an event. Founded in 2020 by a collective of filmmakers, marketing architects, and event designers, Lumière Premiere bridge the gap between classical cinema prestige and modern digital execution.
              </p>
              <p className={styles.storyText}>
                From historic theaters in Hollywood to grand palaces in Venice, we design release experiences that build anticipation, foster critical acclaim, and leave a lasting imprint on cinematic culture.
              </p>
            </div>
            <div className={styles.storyStats}>
              <div className={styles.storyStatItem}>
                <span className={styles.statYear}>Mission</span>
                <p className={styles.statDesc}>To return theatrical magic and prestige to film release experiences worldwide.</p>
              </div>
              <div className={styles.storyStatItem}>
                <span className={styles.statYear}>Vision</span>
                <p className={styles.statDesc}>To define the future of high-end cinematic marketing through hybrid physical-digital release systems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Launch Services</h2>
          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.timelineSection}>
          <h2 className={styles.sectionTitle}>Milestones</h2>
          <div className={styles.timeline}>
            {timelineMilestones.map((milestone, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{milestone.year}</div>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                  <p className={styles.timelineDesc}>{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values Section */}
        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Core Values</h2>
          <div className={styles.valuesGrid}>
            {coreValues.map((value, idx) => (
              <div key={idx} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Leadership</h2>
          <div className={styles.teamGrid}>
            {team.map((member, idx) => (
              <div key={idx} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{member.image}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className={styles.testimonialsSection}>
          <Carousel items={testimonials} />
        </section>
      </div>
    </div>
  );
}
