import React, { useRef, useState } from 'react';
import { engineSound } from '../utils/engineSound';

interface CarCard {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  specs: { label: string; value: string }[];
  description: string;
  audioAction?: boolean;
}

const CAR_CARDS: CarCard[] = [
  {
    id: 'design',
    title: 'Design',
    tagline: 'Every curve has a job.',
    category: 'Sculptural Aerodynamics',
    image: '/images/hero.jpg',
    specs: [
      { label: 'Inspiration', value: '1963 250 LM' },
      { label: 'Wheelbase', value: '2,600 mm' },
      { label: 'Dry Weight', value: '1,470 kg' },
    ],
    description:
      'Drawing inspiration from legendary racing machines like the 1963 250 LM, the 296 GTB redefines mid-rear engine architecture with a clean, monolithic surface language and a visor-style windscreen wrap.',
  },
  {
    id: 'engine',
    title: 'Engine',
    tagline: 'V6 hybrid. 830 horsepower.',
    category: 'Powertrain Mastery',
    image: '/images/engine.jpg',
    specs: [
      { label: 'Combined Output', value: '830 cv' },
      { label: 'ICE Architecture', value: '120° V6 Twin-Turbo' },
      { label: 'Specific Power', value: '221 cv/l' },
    ],
    description:
      'The first 6-cylinder engine installed in a road car sporting the Prancing Horse badge. The wide 120° vee houses the twin turbochargers inside the "hot-V", lowering the center of gravity and minimizing turbo lag.',
  },
  {
    id: 'sound',
    title: 'Sound',
    tagline: 'You hear it before you see it.',
    category: 'Acoustic Engineering',
    image: '/images/rear_aero.jpg',
    audioAction: true,
    specs: [
      { label: 'Nickname', value: 'Il Piccolo V12' },
      { label: 'Max Engine Speed', value: '8,500 RPM' },
      { label: 'Exhaust Geometry', value: 'Tuned Hot-Tube' },
    ],
    description:
      'Dubbed "il piccolo V12" during development, the 296 GTB pairs pure turbo whistles with high-frequency combustion harmonics routed directly into the cockpit via a patented acoustic conduit.',
  },
  {
    id: 'aero',
    title: 'Aero',
    tagline: 'The air works for you.',
    category: 'Active Downforce',
    image: '/images/rear_aero.jpg',
    specs: [
      { label: 'Downforce @ 250 km/h', value: '360 kg' },
      { label: 'Active Aero', value: 'Mobile Rear Spoiler' },
      { label: 'Brake Cooling', value: 'Aero-Caliper' },
    ],
    description:
      'For the first time, an active aerodynamic device is used not to manage drag, but to generate supplementary downforce. The active rear spoiler delivers up to 360 kg of downforce for unmatched high-speed cornering stability.',
  },
  {
    id: 'interior',
    title: 'Interior',
    tagline: 'A cockpit, not a cabin.',
    category: 'Digital Immersion',
    image: '/images/interior.jpg',
    specs: [
      { label: 'Interface', value: '100% Digital HUD' },
      { label: 'Materials', value: 'Italian Leather & Carbon' },
      { label: 'Steering Wheel', value: 'eManettino Touch' },
    ],
    description:
      'Crafted around a fully digital interface derived from Formula 1 technology. When the engine is dormant, the displays go black for minimalist sophistication; pressing the capacitive Start button awakens the entire vehicle.',
  },
];

export const CarSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedCard, setSelectedCard] = useState<CarCard | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -offset : offset,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (card: CarCard) => {
    setSelectedCard(card);
    if (card.audioAction) {
      engineSound.revEngine();
    }
  };

  return (
    <section
      id="car"
      style={{
        backgroundColor: '#FAFAF8',
        padding: '7rem 0 6rem',
        overflow: 'hidden',
        borderTop: '1px solid rgba(201, 201, 196, 0.3)',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 2rem 3rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
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
            02 — The Car
          </span>
          <h2
            style={{
              fontFamily: "'Italiana', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.1,
              color: '#111111',
              fontWeight: 400,
            }}
          >
            Everything that makes it a Ferrari.
          </h2>
        </div>

        {/* Carousel controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => scroll('left')}
            aria-label="Previous card"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1px solid rgba(201, 201, 196, 0.6)',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
              transition: 'all 0.25s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next card"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1px solid rgba(201, 201, 196, 0.6)',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
              transition: 'all 0.25s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Card Track */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '2rem',
          padding: '1rem 2rem 3rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {CAR_CARDS.map((card, idx) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              flex: '0 0 380px',
              scrollSnapAlign: 'start',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.07)',
              border: '1px solid rgba(201, 201, 196, 0.35)',
              cursor: 'pointer',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.07)';
            }}
          >
            {/* Card Image */}
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(17, 17, 17, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  color: '#FFFFFF',
                  fontSize: '0.6875rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                0{idx + 1} // {card.category}
              </div>

              {card.audioAction && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: '#D40000',
                    color: '#FFFFFF',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(212,0,0,0.4)',
                  }}
                  title="Click to hear sound"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3
                style={{
                  fontFamily: "'Italiana', serif",
                  fontSize: '1.875rem',
                  color: '#111111',
                  marginBottom: '0.4rem',
                  fontWeight: 400,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '1.0625rem',
                  color: '#D40000',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                }}
              >
                {card.tagline}
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.875rem',
                  color: '#666666',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  flex: 1,
                }}
              >
                {card.description}
              </p>

              {/* Specs Pills */}
              <div
                style={{
                  borderTop: '1px solid rgba(201, 201, 196, 0.4)',
                  paddingTop: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  textAlign: 'center',
                }}
              >
                {card.specs.map((spec, sIdx) => (
                  <div key={sIdx}>
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '0.625rem',
                        color: '#888888',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        display: 'block',
                      }}
                    >
                      {spec.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#111111',
                        display: 'block',
                        marginTop: '0.15rem',
                      }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="modal-backdrop" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedCard(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                color: '#D40000',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              {selectedCard.category}
            </span>
            <h3
              style={{
                fontFamily: "'Italiana', serif",
                fontSize: '2.5rem',
                color: '#FFFFFF',
                marginBottom: '0.5rem',
              }}
            >
              {selectedCard.title}
            </h3>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '1.125rem',
                color: '#D40000',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              {selectedCard.tagline}
            </p>

            <div
              style={{
                height: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.9375rem',
                color: '#C9C9C4',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              {selectedCard.description}
            </p>

            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                textAlign: 'center',
              }}
            >
              {selectedCard.specs.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.6875rem',
                      color: '#888888',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginTop: '0.2rem',
                    }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
