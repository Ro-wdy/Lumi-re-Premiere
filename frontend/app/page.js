'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useToast } from './ToastContext';
import Countdown from './components/Countdown';
import Stats from './components/Stats';
import Accordion from './components/Accordion';
import Carousel from './components/Carousel';
import TrailerModal from './components/TrailerModal';
import MovieCard from './components/MovieCard';

export default function Home() {
  const { showToast } = useToast();
  const [featuredFilm, setFeaturedFilm] = useState(null);
  const [closestFilm, setClosestFilm] = useState(null);
  const [upcomingFilms, setUpcomingFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // FAQ Accordion items
  const faqItems = [
    {
      question: 'What is Lumière Premiere?',
      answer: 'Lumière Premiere is an exclusive cinematic release agency specializing in producing red-carpet premieres, international film festival campaigns, media distribution events, and immersive digital screening experiences for blockbuster films.',
    },
    {
      question: 'How can I request an invite to a premiere?',
      answer: 'Invites are extremely exclusive and reserved for press, cast and crew, media partners, and members of our Inner Circle. You can submit an invite request through our Contact page, detailing your credentials and company affiliation.',
    },
    {
      question: 'Can you handle campaigns for indie films as well as blockbusters?',
      answer: 'Absolutely. We believe every masterpiece deserves the spotlight. We scale our luxurious promotional and red-carpet experiences to fit cinematic releases of all budgets, keeping visual excellence and prestige at the core.',
    },
    {
      question: 'What digital experiences do you offer?',
      answer: 'For global releases, we host high-fidelity digital premiere screenings featuring live Q&As, virtual interactive red carpets, secure cast panel broadcasts, and digital press room junkets.',
    },
  ];

  // Testimonials
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
    {
      quote: 'A masterpiece release experience. From Paris to Cannes, their team executed a flawless, high-end promotional tour.',
      author: 'François Dubois',
      role: 'Director',
      company: 'L\'Amour Éternel',
    },
  ];

  // Fetch films from Laravel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmsRes, featuredRes] = await Promise.all([
          fetch('http://localhost:8000/api/films'),
          fetch('http://localhost:8000/api/films/featured'),
        ]);

        if (filmsRes.ok && featuredRes.ok) {
          const films = await filmsRes.json();
          const featured = await featuredRes.json();

          setFeaturedFilm(featured);
          setUpcomingFilms(films.slice(0, 3)); // Display top 3 upcoming

          // Find the film with closest countdown date in the future
          const now = new Date();
          const futureFilms = films
            .filter((f) => new Date(f.countdown_date) > now)
            .sort((a, b) => new Date(a.countdown_date) - new Date(b.countdown_date));

          if (futureFilms.length > 0) {
            setClosestFilm(futureFilms[0]);
          } else if (films.length > 0) {
            setClosestFilm(films[0]);
          }
        } else {
          showToast('Failed to load cinematic launches.', 'error');
        }
      } catch (err) {
        showToast('Could not connect to the API server.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="skeleton" style={{ width: '200px', height: '30px', marginBottom: '20px' }}></div>
        <div className="skeleton" style={{ width: '80%', height: '80px', marginBottom: '30px' }}></div>
        <div className="skeleton" style={{ width: '60%', height: '24px', marginBottom: '40px' }}></div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="skeleton" style={{ width: '150px', height: '45px' }}></div>
          <div className="skeleton" style={{ width: '150px', height: '45px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/hero_backdrop.png"
            alt="Lumière Premiere Cinema Backdrop"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          {closestFilm && (
            <div className={styles.badgeWrapper}>
              <span className={styles.badge}>
                NEXT PREMIERE: {new Date(closestFilm.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
              </span>
            </div>
          )}
          <h1 className={styles.headline}>
            Where Stories Meet<br />
            <span className="gold-gradient-text">The Spotlight</span>
          </h1>
          <p className={styles.subheadline}>
            Lumière Premiere designs exclusive, high-end global campaigns and red-carpet experiences for the world's finest cinema releases.
          </p>
          <div className={styles.ctas}>
            <Link href="/launches" className={styles.primaryCta}>
              Explore Upcoming Launches
            </Link>
            {featuredFilm && (
              <button onClick={() => setModalOpen(true)} className={styles.secondaryCta}>
                Watch Spotlight Trailer
              </button>
            )}
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* 2. Countdown Section */}
      {closestFilm && (
        <section className={styles.countdownSection}>
          <div className={styles.countdownBox}>
            <span className={styles.countdownTitle}>COUNTDOWN TO THE NEXT WORLD PREMIERE</span>
            <h2 className={styles.countdownMovieTitle}>{closestFilm.title}</h2>
            <Countdown targetDate={closestFilm.countdown_date} />
          </div>
        </section>
      )}

      {/* 3. Featured Movie Spotlight */}
      {featuredFilm && (
        <section className={styles.spotlight}>
          <div className={styles.sectionContainer}>
            <span className={styles.preTitle}>SPOTLIGHT CAMPAIGN</span>
            <h2 className={styles.sectionTitle}>Featured Launch</h2>
            <div className={styles.spotlightGrid}>
              <div className={styles.spotlightPoster}>
                <Image
                  src={featuredFilm.poster_img}
                  alt={featuredFilm.title}
                  width={380}
                  height={480}
                  className={styles.spotlightImage}
                />
                <span className={styles.spotlightGenre}>{featuredFilm.genre}</span>
              </div>
              <div className={styles.spotlightDetails}>
                <h3 className={styles.spotlightTitle}>{featuredFilm.title}</h3>
                <p className={styles.spotlightLogline}>{featuredFilm.logline}</p>
                <p className={styles.spotlightSynopsis}>{featuredFilm.synopsis}</p>
                <div className={styles.spotlightMeta}>
                  <div>
                    <span className={styles.metaLabel}>Director</span>
                    <span className={styles.metaValue}>{featuredFilm.director}</span>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Runtime</span>
                    <span className={styles.metaValue}>{featuredFilm.runtime} Mins</span>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Starring</span>
                    <span className={styles.metaValue}>{featuredFilm.cast.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
                <div className={styles.spotlightBtns}>
                  <Link href={`/launches/${featuredFilm.slug}`} className={styles.spotlightBtnPrimary}>
                    View Launch Campaign
                  </Link>
                  <button onClick={() => setModalOpen(true)} className={styles.spotlightBtnSecondary}>
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Upcoming Movie Launches Grid */}
      <section className={styles.launches}>
        <div className={styles.sectionContainer}>
          <div className={styles.launchesHeader}>
            <div>
              <span className={styles.preTitle}>EXCLUSIVE RELEASES</span>
              <h2 className={styles.sectionTitle}>Upcoming Launches</h2>
            </div>
            <Link href="/launches" className={styles.viewAllLink}>
              View All Campaigns →
            </Link>
          </div>
          <div className={styles.launchesGrid}>
            {upcomingFilms.map((film) => (
              <MovieCard key={film.id} movie={film} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section className={styles.services}>
        <div className={styles.sectionContainer}>
          <span className={styles.preTitle}>OUR EXPERTISE</span>
          <h2 className={styles.sectionTitle}>Sleek Launch Architecture</h2>
          <div className={styles.servicesGrid}>
            {[
              { title: 'Red Carpet Premieres', desc: 'Producing luxury, high-prestige physical screenings in Los Angeles, Cannes, London, and Tokyo.' },
              { title: 'Global Teaser Campaigns', desc: 'Tailoring suspenseful digital content drops, puzzle marketing, and trailer launch strategies.' },
              { title: 'Press & Media Events', desc: 'Organizing exclusive press junkets, secure review screening rooms, and celebrity interviews.' },
              { title: 'Digital Premiere Experiences', desc: 'Crafting high-end virtual interactive screening sites for secure global audiences.' },
            ].map((service, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <span className={styles.serviceNum}>0{idx + 1}</span>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Behind-the-scenes Statistics */}
      <section className={styles.statsSection}>
        <div className={styles.sectionContainer}>
          <Stats />
        </div>
      </section>

      {/* 7. Testimonials Carousel */}
      <section className={styles.testimonials}>
        <div className={styles.sectionContainer}>
          <span className={styles.preTitle}>PARTNER EXPERIENCES</span>
          <h2 className={styles.sectionTitle}>What the Industry Says</h2>
          <Carousel items={testimonials} />
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className={styles.faq}>
        <div className={styles.sectionContainer}>
          <div className={styles.faqHeader}>
            <span className={styles.preTitle}>COMMON INQUIRIES</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqAccordionWrapper}>
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Trailer Modal Overlay */}
      {featuredFilm && (
        <TrailerModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          videoUrl={featuredFilm.trailer_url}
        />
      )}
    </div>
  );
}
