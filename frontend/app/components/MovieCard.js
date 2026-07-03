'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const formattedDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.card}>
      <div className={styles.posterWrapper}>
        <Image
          src={movie.poster_img}
          alt={movie.title}
          width={400}
          height={500}
          className={styles.poster}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <span className={styles.genre}>{movie.genre}</span>
          <p className={styles.logline}>{movie.logline}</p>
          <Link href={`/launches/${movie.slug}`} className={styles.detailsBtn}>
            View Details
          </Link>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <h3 className={styles.title}>
          <Link href={`/launches/${movie.slug}`}>{movie.title}</Link>
        </h3>
      </div>
    </div>
  );
}
