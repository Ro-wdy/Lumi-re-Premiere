'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Details.module.css';
import { useToast } from '../../ToastContext';
import TrailerModal from '../../components/TrailerModal';
import MovieCard from '../../components/MovieCard';

export default function FilmDetails({ params }) {
  const unwrappedParams = React.use(params);
  const filmId = unwrappedParams.id;
  const { showToast } = useToast();

  const [film, setFilm] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!filmId) return;

    const fetchFilmAndRelated = async () => {
      try {
        const filmRes = await fetch(`http://localhost:8000/api/films/${filmId}`);
        if (!filmRes.ok) {
          showToast('Film not found.', 'error');
          setLoading(false);
          return;
        }
        const filmData = await filmRes.json();
        setFilm(filmData);

        // Fetch all to get related films
        const allRes = await fetch('http://localhost:8000/api/films');
        if (allRes.ok) {
          const allData = await allRes.json();
          // Filter out current film
          const filtered = allData.filter((f) => f.slug !== filmData.slug).slice(0, 3);
          setRelated(filtered);
        }
      } catch (err) {
        showToast('Could not fetch movie campaign details.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchFilmAndRelated();
  }, [filmId, showToast]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="skeleton" style={{ width: '150px', height: '24px', marginBottom: '40px' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '50px', width: '100%' }}>
          <div className="skeleton" style={{ width: '100%', aspectRatio: '4/5', borderRadius: '8px' }}></div>
          <div>
            <div className="skeleton" style={{ width: '80%', height: '50px', marginBottom: '20px' }}></div>
            <div className="skeleton" style={{ width: '50%', height: '20px', marginBottom: '30px' }}></div>
            <div className="skeleton" style={{ width: '100%', height: '120px', marginBottom: '30px' }}></div>
            <div className="skeleton" style={{ width: '40%', height: '40px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className={styles.notFoundContainer}>
        <h1 className={styles.notFoundTitle}>Campaign Not Found</h1>
        <p className={styles.notFoundDesc}>This cinematic release campaign does not exist or has closed.</p>
        <Link href="/launches" className={styles.backBtn}>
          ← Back to Launches
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(film.release_date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.detailsPage}>
      {/* Dynamic Hero Banner */}
      <div className={styles.hero}>
        <Image
          src={film.backdrop_img}
          alt={film.title}
          fill
          priority
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Link href="/launches" className={styles.backLink}>
            ← Back to Launches
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        {/* Main Details block */}
        <div className={styles.mainInfo}>
          {/* Poster column */}
          <div className={styles.posterCol}>
            <div className={styles.posterCard}>
              <Image
                src={film.poster_img}
                alt={film.title}
                width={360}
                height={450}
                className={styles.posterImage}
              />
            </div>
            <button onClick={() => setModalOpen(true)} className={styles.trailerBtn}>
              Watch Teaser Trailer
            </button>
          </div>

          {/* Texts column */}
          <div className={styles.textCol}>
            <span className={styles.genre}>{film.genre}</span>
            <h1 className={styles.title}>{film.title}</h1>
            <p className={styles.logline}>{film.logline}</p>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Premiere Date</span>
                <span className={styles.metaValue}>{formattedDate}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Director</span>
                <span className={styles.metaValue}>{film.director}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Running Time</span>
                <span className={styles.metaValue}>{film.runtime} Minutes</span>
              </div>
            </div>

            <div className={styles.synopsisWrapper}>
              <h2 className={styles.subTitle}>Synopsis</h2>
              <p className={styles.synopsis}>{film.synopsis}</p>
            </div>

            <div className={styles.castWrapper}>
              <h2 className={styles.subTitle}>Cast</h2>
              <ul className={styles.castList}>
                {film.cast.map((actor, idx) => (
                  <li key={idx} className={styles.castItem}>
                    {actor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {film.gallery && film.gallery.length > 0 && (
          <section className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>Campaign Stills</h2>
            <div className={styles.galleryGrid}>
              {film.gallery.map((image, idx) => (
                <div key={idx} className={styles.galleryCard}>
                  <Image
                    src={image}
                    alt={`${film.title} scene ${idx + 1}`}
                    width={400}
                    height={250}
                    className={styles.galleryImage}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related movies */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>Other Launches</h2>
            <div className={styles.relatedGrid}>
              {related.map((relatedFilm) => (
                <MovieCard key={relatedFilm.id} movie={relatedFilm} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Trailer Modal Player */}
      <TrailerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoUrl={film.trailer_url}
      />
    </div>
  );
}
