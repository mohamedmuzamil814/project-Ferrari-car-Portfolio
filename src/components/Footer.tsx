import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#111111',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4.5rem 2rem 3rem',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {/* Logo & Cavallino */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '28px', height: '34px' }}>
              <svg viewBox="0 0 100 120" width="100%" height="100%">
                <path d="M10 10 L90 10 C90 10 90 70 50 115 C10 70 10 10 10 10 Z" fill="#FFD700" stroke="#111" strokeWidth="2" />
                <path d="M11 11 L37 11 L37 18 L11 18 Z" fill="#009246" />
                <path d="M37 11 L63 11 L63 18 L37 18 Z" fill="#FFFFFF" />
                <path d="M63 11 L89 11 L89 18 L63 18 Z" fill="#CE2B37" />
                <path d="M50 35 C52 32 57 32 58 35 C58 37 54 40 52 42 C54 45 59 47 62 46 C60 48 56 50 54 50 C56 54 58 57 60 60 C57 58 54 56 52 54 C50 58 49 64 51 68 C53 72 55 76 56 80 C54 78 52 76 50 74 C48 78 46 83 45 88 C44 93 42 98 39 101 C41 96 42 90 41 85 C39 80 37 75 36 70 C34 65 32 60 32 55 C34 54 37 53 39 52 C37 49 35 46 33 43 C36 43 40 44 43 46 C45 42 47 38 50 35 Z" fill="#111111" />
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
                }}
              >
                FERRARI 296 GTB
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#888888',
                }}
              >
                Maranello, Italy
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#C9C9C4',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D40000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C9C9C4')}
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#C9C9C4',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D40000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C9C9C4')}
            >
              YouTube
            </a>
          </div>

          {/* Policy Links */}
          <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }}>
            <a
              href="#"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                color: '#888888',
                textDecoration: 'none',
              }}
            >
              Privacy
            </a>
            <a
              href="#"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                color: '#888888',
                textDecoration: 'none',
              }}
            >
              Terms
            </a>
          </div>
        </div>

        {/* Disclaimer row */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            color: '#666666',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.75rem',
          }}
        >
          <div>
            © 2026 — Portfolio concept. Not affiliated with Ferrari S.p.A.
          </div>
          <div>
            Designed for luxury interactive portfolio presentation.
          </div>
        </div>
      </div>
    </footer>
  );
};
