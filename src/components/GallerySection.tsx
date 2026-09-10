import React, { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  span: 'large' | 'small';
  details: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'wheel',
    title: 'Forged Diamond-Cut Wheels',
    subtitle: 'Unsprung Mass Reduction',
    image: '/images/wheel.jpg',
    span: 'large',
    details:
      'Engineered with aerospace-grade forged aluminum, reducing unsprung rotating mass by 8 kg per vehicle. Paired with Brembo Evo carbon-ceramic discs and aero-channeling calipers.',
  },
  {
    id: 'interior',
    title: 'Minimalist Digital Cockpit',
    subtitle: 'Driver-Centric Architecture',
    image: '/images/interior.jpg',
    span: 'small',
    details:
      'Featuring an all-digital 16-inch curved instrument panel and capacitive touch controls on the F1 steering wheel, enveloped in hand-stitched Italian Nero leather and exposed satin-finish carbon fiber.',
  },
  {
    id: 'engine-craft',
    title: '120° V6 Twin-Turbo Assembly',
    subtitle: 'Hot-V Turbo Integration',
    image: '/images/engine.jpg',
    span: 'small',
    details:
      'Crafted in Maranello with precision robotic casting and hand-finished cylinder heads. The symmetrical counter-rotating turbos spin up to 180,000 RPM.',
  },
  {
    id: 'rear-aero',
    title: 'Sculpted Rear Diffuser & Light Bar',
    subtitle: 'High-Downforce Active Aerodynamics',
    image: '/images/rear_aero.jpg',
    span: 'large',
    details:
      'Inspired by the 250 LM rear profile, incorporating an active mobile spoiler nestled between the slim LED taillights and an aggressively vented carbon-fiber rear undertray.',
  },
];

export const GallerySection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#FAFAF8',
        padding: '8rem 2rem 7rem',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Heading */}
        <div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D40000',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              04 — Gallery
            </span>
            <h2
              style={{
                fontFamily: "'Italiana', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.1,
              }}
            >
              Look closer.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '1rem',
              color: '#666666',
              maxWidth: '420px',
            }}
          >
            Maranello craft in every stitch, bevel, carbon fiber weave, and titanium weld.
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
          }}
        >
          {GALLERY_ITEMS.map((item) => {
            const colSpan = item.span === 'large' ? 'span 7' : 'span 5';
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="gallery-card"
                style={{
                  gridColumn: colSpan,
                  height: '480px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(201, 201, 196, 0.35)',
                  backgroundColor: '#111111',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Dark gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17, 17, 17, 0.85) 0%, rgba(17, 17, 17, 0.1) 60%, rgba(17, 17, 17, 0) 100%)',
                    transition: 'opacity 0.4s ease',
                  }}
                />

                {/* Caption info */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2.5rem',
                    color: '#FFFFFF',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.6875rem',
                      color: '#D40000',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {item.subtitle}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Italiana', serif",
                      fontSize: '1.75rem',
                      fontWeight: 400,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 600,
                      color: '#C9C9C4',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Inspect Detail
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Inspection Lightbox */}
      {activeItem && (
        <div className="modal-backdrop" onClick={() => setActiveItem(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '840px', padding: '1.5rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              aria-label="Close lightbox"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ✕
            </button>

            <div style={{ height: '440px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '0 1rem 1rem' }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.75rem',
                  color: '#D40000',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {activeItem.subtitle}
              </span>
              <h3
                style={{
                  fontFamily: "'Italiana', serif",
                  fontSize: '2.2rem',
                  color: '#FFFFFF',
                  margin: '0.4rem 0 1rem',
                }}
              >
                {activeItem.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '1rem',
                  color: '#C9C9C4',
                  lineHeight: 1.7,
                }}
              >
                {activeItem.details}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card:hover img {
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .gallery-card {
            grid-column: span 12 !important;
            height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
};
