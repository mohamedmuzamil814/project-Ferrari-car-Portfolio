import React, { useState, useEffect } from 'react';
import { engineSound } from '../utils/engineSound';

interface NavbarProps {
  onOpenTestDrive: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTestDrive }) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRevSound = () => {
    setSoundPlaying(true);
    engineSound.revEngine();
    setTimeout(() => setSoundPlaying(false), 2800);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(17, 17, 17, 0.88)' : 'rgba(250, 250, 248, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(201, 201, 196, 0.25)',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '1.1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Ferrari Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            textDecoration: 'none',
            color: scrolled ? '#FFFFFF' : '#111111',
          }}
        >
          {/* Cavallino Rampante Crest */}
          <div
            style={{
              width: '32px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
            }}
          >
            <svg viewBox="0 0 100 120" width="100%" height="100%">
              <path
                d="M10 10 L90 10 C90 10 90 70 50 115 C10 70 10 10 10 10 Z"
                fill="#FFD700"
                stroke="#111111"
                strokeWidth="2"
              />
              <path d="M11 11 L37 11 L37 18 L11 18 Z" fill="#009246" />
              <path d="M37 11 L63 11 L63 18 L37 18 Z" fill="#FFFFFF" />
              <path d="M63 11 L89 11 L89 18 L63 18 Z" fill="#CE2B37" />
              <path
                d="M50 35 C52 32 57 32 58 35 C58 37 54 40 52 42 C54 45 59 47 62 46 C60 48 56 50 54 50 C56 54 58 57 60 60 C57 58 54 56 52 54 C50 58 49 64 51 68 C53 72 55 76 56 80 C54 78 52 76 50 74 C48 78 46 83 45 88 C44 93 42 98 39 101 C41 96 42 90 41 85 C39 80 37 75 36 70 C34 65 32 60 32 55 C34 54 37 53 39 52 C37 49 35 46 33 43 C36 43 40 44 43 46 C45 42 47 38 50 35 Z"
                fill="#111111"
              />
            </svg>
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Italiana', serif",
                fontSize: '1.25rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              FERRARI
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: scrolled ? '#C9C9C4' : '#666666',
                display: 'block',
              }}
            >
              296 GTB
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="desktop-nav"
        >
          <a
            href="#car"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              color: scrolled ? '#FFFFFF' : '#111111',
              transition: 'color 0.25s',
            }}
          >
            The Car
          </a>
          <a
            href="#performance"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              color: scrolled ? '#FFFFFF' : '#111111',
              transition: 'color 0.25s',
            }}
          >
            Performance
          </a>
          <a
            href="#gallery"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              color: scrolled ? '#FFFFFF' : '#111111',
              transition: 'color 0.25s',
            }}
          >
            Gallery
          </a>

          {/* Audio Engine Rev Button */}
          <button
            onClick={handleRevSound}
            title="Hear 296 GTB 830cv V6 Engine Rev"
            aria-label="Rev engine sound"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: soundPlaying ? 'rgba(212, 0, 0, 0.18)' : 'transparent',
              border: `1px solid ${soundPlaying ? '#D40000' : scrolled ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
              borderRadius: '9999px',
              padding: '0.45rem 0.95rem',
              color: soundPlaying ? '#D40000' : scrolled ? '#FFFFFF' : '#111111',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: soundPlaying ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.2s',
              }}
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            {soundPlaying ? 'Revving...' : 'Sound'}
          </button>

          {/* Test Drive Pill Button */}
          <button
            onClick={onOpenTestDrive}
            className="btn-pill-rosso"
            style={{
              padding: '0.65rem 1.45rem',
              fontSize: '0.8125rem',
            }}
          >
            Test Drive
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="mobile-actions">
          <button
            onClick={handleRevSound}
            aria-label="Rev engine"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: soundPlaying ? '#D40000' : 'rgba(0,0,0,0.06)',
              border: 'none',
              color: soundPlaying ? '#FFFFFF' : scrolled ? '#FFFFFF' : '#111111',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: 'transparent',
              border: 'none',
              color: scrolled ? '#FFFFFF' : '#111111',
              cursor: 'pointer',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: scrolled ? '#111111' : '#FAFAF8',
            borderTop: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
            padding: '1.5rem 2rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <a
            href="#car"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              textDecoration: 'none',
              color: scrolled ? '#FFFFFF' : '#111111',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            The Car
          </a>
          <a
            href="#performance"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              textDecoration: 'none',
              color: scrolled ? '#FFFFFF' : '#111111',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            Performance
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              textDecoration: 'none',
              color: scrolled ? '#FFFFFF' : '#111111',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            Gallery
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTestDrive();
            }}
            className="btn-pill-rosso"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Book a Test Drive
          </button>
        </div>
      )}

      {/* Responsive media styling */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-actions {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
