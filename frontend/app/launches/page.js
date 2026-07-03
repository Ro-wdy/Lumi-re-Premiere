'use client';

import React, { useState, useEffect } from 'react';
import styles from './Launches.module.css';
import MovieCard from '../components/MovieCard';
import { useToast } from '../ToastContext';
import { API_BASE_URL } from '../config';

export default function Launches() {
  const { showToast } = useToast();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/films`);
        if (res.ok) {
          const data = await res.json();
          setFilms(data);
        } else {
          showToast('Failed to retrieve cinematic launches.', 'error');
        }
      } catch (err) {
        showToast('Could not reach the server API.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [showToast]);

  return (
    <div className={styles.launchesPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.preTitle}>RED CARPET ARCHIVES</span>
          <h1 className={styles.title}>Upcoming Releases</h1>
          <p className={styles.description}>
            Discover the next blockbusters. Lumière Premiere designs exclusive, high-prestige release campaigns for the industry's most anticipated masterpieces.
          </p>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.skeletonCard}>
                <div className="skeleton" style={{ width: '100%', aspectRatio: '4/5', borderRadius: '6px' }}></div>
                <div className="skeleton" style={{ width: '60px', height: '14px', marginTop: '16px' }}></div>
                <div className="skeleton" style={{ width: '80%', height: '20px', marginTop: '10px' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {films.map((film) => (
              <MovieCard key={film.id} movie={film} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
