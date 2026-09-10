import React from 'react';

interface CtaSectionProps {
  onOpenTestDrive: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenTestDrive }) => {
  return (
    <section
      id="cta"
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#111111',
      }}
    >
      {/* Full-bleed background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.32) contrast(1.1)',
          transform: 'scale(1.05)',
        }}
      />

      {/* Luxury radial gradient vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.9) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '4rem 2rem',
          maxWidth: '840px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(212, 0, 0, 0.18)',
            border: '1px solid rgba(212, 0, 0, 0.35)',
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FF4D4D',
            }}
          >
            Maranello Experience
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Italiana', serif",
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            fontWeight: 400,
          }}
        >
          Stop scrolling. Start driving.
        </h2>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: '#C9C9C4',
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Experience 830 cv of hybrid electrification and the unbridled acoustic symphony of the 120° V6 turbo engine firsthand.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={onOpenTestDrive}
            className="btn-pill-rosso"
            style={{
              padding: '1.1rem 2.8rem',
              fontSize: '0.9375rem',
              boxShadow: '0 15px 40px rgba(212, 0, 0, 0.5)',
            }}
          >
            Book a Test Drive
          </button>
          <a
            href="#car"
            className="btn-pill-dark"
            style={{
              padding: '1.1rem 2.4rem',
              fontSize: '0.9375rem',
            }}
          >
            Back to Top
          </a>
        </div>
      </div>
    </section>
  );
};
