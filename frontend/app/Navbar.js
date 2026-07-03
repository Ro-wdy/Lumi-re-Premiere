'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Launches', path: '/launches' },
    { name: 'Company', path: '/company' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          LUMIÈRE<span className={styles.logoGold}>PREMIERE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <Link href="/contact" className={styles.ctaButton}>
            Request Invite
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuActive : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={styles.mobileCtaButton}
            onClick={() => setMobileMenuOpen(false)}
          >
            Request Invite
          </Link>
        </nav>
      </div>
    </header>
  );
}
