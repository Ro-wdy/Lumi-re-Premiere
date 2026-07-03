'use client';

import React, { useState } from 'react';
import styles from './Contact.module.css';
import { useToast } from '../ToastContext';
import { API_BASE_URL } from '../config';

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Client-side quick checks
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please correct form validation errors.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast(data.message, 'success');
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        if (data.errors) {
          setErrors(data.errors);
          showToast('Validation failed on server.', 'error');
        } else {
          showToast(data.message || 'Submission failed.', 'error');
        }
      }
    } catch (err) {
      showToast('Could not connect to the API server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Information column */}
          <div className={styles.infoCol}>
            <span className={styles.preTitle}>GET IN TOUCH</span>
            <h1 className={styles.title}>Request Red Carpet Credentials</h1>
            <p className={styles.description}>
              Lumière Premiere releases are strictly exclusive. Press representatives, media outlets, and industry VIPs may request access credentials to our upcoming film campaigns and global red-carpet events.
            </p>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoLabel}>For Press & Guest Relations</h3>
              <p className={styles.infoValue}>guestrelations@lumiere.com</p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoLabel}>For Studio Collaborations</h3>
              <p className={styles.infoValue}>partnerships@lumiere.com</p>
            </div>
          </div>

          {/* Form column */}
          <div className={styles.formCol}>
            {loading ? (
              <div className={styles.skeletonForm}>
                <div className="skeleton" style={{ width: '100%', height: '50px', marginBottom: '20px' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '50px', marginBottom: '20px' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '50px', marginBottom: '20px' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '150px', marginBottom: '20px' }}></div>
                <div className="skeleton" style={{ width: '120px', height: '45px' }}></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="E.g., Alexander Mercer"
                    required
                  />
                  {errors.name && <span className={styles.errorText}>{Array.isArray(errors.name) ? errors.name[0] : errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="E.g., alexander@mediahouse.com"
                    required
                  />
                  {errors.email && <span className={styles.errorText}>{Array.isArray(errors.email) ? errors.email[0] : errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.label}>Company / Affiliation</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="E.g., The Hollywood Reporter"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Subject / Campaign Select</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                    placeholder="E.g., Invite Request: Chronicles of the Dust"
                    required
                  />
                  {errors.subject && <span className={styles.errorText}>{Array.isArray(errors.subject) ? errors.subject[0] : errors.subject}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Credentials & Request Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="Describe your role, publication/studio, and details of your coverage request..."
                    required
                  ></textarea>
                  {errors.message && <span className={styles.errorText}>{Array.isArray(errors.message) ? errors.message[0] : errors.message}</span>}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
