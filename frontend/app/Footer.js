'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from './ToastContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter an email address.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        const errorMsg = data.errors?.email ? data.errors.email[0] : (data.errors ? Object.values(data.errors)[0] : data.message);
        showToast(errorMsg || 'Subscription failed.', 'error');
      }
    } catch (error) {
      showToast('Could not connect to the API server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <h3 className={styles.brandTitle}>LUMIÈRE<span className={styles.brandGold}>PREMIERE</span></h3>
            <p className={styles.brandDesc}>
              Where stories meet the spotlight. We curate, market, and produce global, red-carpet cinematic release experiences for the world's most anticipated films.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
              <a href="#" className={styles.socialLink} aria-label="X">TW</a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">YT</a>
              <a href="#" className={styles.socialLink} aria-label="Vimeo">VM</a>
            </div>
          </div>

          {/* Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.footerLink}>Home</Link></li>
              <li><Link href="/launches" className={styles.footerLink}>Upcoming Launches</Link></li>
              <li><Link href="/company" className={styles.footerLink}>Company Story</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>Request Invite</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>The Office</h4>
            <address className={styles.address}>
              Lumière Premiere HQ<br />
              842 Avenue of the Stars<br />
              Beverly Hills, CA 90210<br />
              <span className={styles.contactItem}>E: guestrelations@lumiere.com</span><br />
              <span className={styles.contactItem}>P: +1 (310) 555-0195</span>
            </address>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>Join the Inner Circle</h4>
            <p className={styles.newsletterDesc}>
              Subscribe to receive exclusive red-carpet invitations, private screening credentials, and global campaign updates.
            </p>
            <form onSubmit={handleSubscribe} className={styles.form}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                disabled={loading}
                required
              />
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Lumière Premiere. All Rights Reserved. Crafted with cinematic precision.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
