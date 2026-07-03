'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

function StatItem({ value, label, suffix }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;

    let start = 0;
    const duration = 1500; // ms
    const stepTime = Math.max(Math.floor(duration / value), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(value / (duration / stepTime));
      if (start >= value) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [triggered, value]);

  return (
    <div ref={ref} className={styles.statCard}>
      <span className={styles.number}>
        {current}
        <span className={styles.suffix}>{suffix}</span>
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function Stats() {
  const statsData = [
    { value: 45, label: 'Global Releases', suffix: '+' },
    { value: 18, label: 'Countries Reached', suffix: '' },
    { value: 92, label: 'Press Invitations', suffix: '%' },
    { value: 350, label: 'Media Outlets Covered', suffix: '+' },
  ];

  return (
    <div className={styles.statsContainer}>
      <div className={styles.grid}>
        {statsData.map((stat, idx) => (
          <StatItem key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
}
