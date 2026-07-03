'use client';

import React, { useState } from 'react';
import styles from './Accordion.module.css';

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div key={idx} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
            <button
              className={styles.trigger}
              onClick={() => toggleItem(idx)}
              aria-expanded={isOpen}
            >
              <span className={styles.question}>{item.question}</span>
              <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>
            <div className={styles.contentWrapper} style={{ height: isOpen ? 'auto' : '0' }}>
              <div className={styles.content}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
