'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Carousel.module.css';

export default function Carousel({ items }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className={styles.carousel}>
      <div className={styles.slidesContainer}>
        {items.map((item, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={idx}
              className={`${styles.slide} ${isActive ? styles.activeSlide : ''}`}
            >
              <blockquote className={styles.blockquote}>
                <span className={styles.quoteMark}>“</span>
                <p className={styles.quote}>{item.quote}</p>
              </blockquote>
              <div className={styles.authorWrapper}>
                <cite className={styles.author}>{item.author}</cite>
                <span className={styles.role}>
                  {item.role}, <span className={styles.company}>{item.company}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.dots}>
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
