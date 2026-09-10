import React, { useEffect, useRef, useState } from 'react';

export const PerformanceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [power, setPower] = useState(0);
  const [accel, setAccel] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [powertrainMode, setPowertrainMode] = useState<'combined' | 'ice' | 'hybrid'>('combined');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate Power (0 to 830)
          const startTime = performance.now();
          const duration = 1800; // 1.8s

          const animateNumbers = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setPower(Math.round(ease * 830));
            setAccel(parseFloat((ease * 2.9).toFixed(1)));
            setSpeed(Math.round(ease * 330));

            if (progress < 1) {
              requestAnimationFrame(animateNumbers);
            } else {
              setPower(830);
              setAccel(2.9);
              setSpeed(330);
            }
          };

          requestAnimationFrame(animateNumbers);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="performance"
      ref={sectionRef}
      style={{
        backgroundColor: '#111111',
        color: '#FFFFFF',
        padding: '8rem 2rem 7rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(212, 0, 0, 0.12) 0%, rgba(17, 17, 17, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#D40000',
              display: 'block',
              marginBottom: '0.6rem',
            }}
          >
            03 — Performance
          </span>
          <h2
            style={{
              fontFamily: "'Italiana', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            Numbers don't lie.
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '1.0625rem',
              color: '#999999',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            An unprecedented specific output of 221 cv per liter, harmonized with instantaneous Formula 1 electric torque.
          </p>
        </div>

        {/* Numbers Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4.5rem',
            padding: '2.5rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Stat 1: Power */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3.5rem, 6.5vw, 5.8rem)',
                fontWeight: 700,
                color: '#D40000',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.03em',
              }}
            >
              {power}
              <span
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  marginLeft: '0.4rem',
                  color: '#FFFFFF',
                }}
              >
                cv
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#C9C9C4',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
              }}
            >
              Combined Maximum Power
            </div>
          </div>

          {/* Stat 2: Acceleration */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3.5rem, 6.5vw, 5.8rem)',
                fontWeight: 700,
                color: '#D40000',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.03em',
              }}
            >
              {accel.toFixed(1)}
              <span
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  marginLeft: '0.4rem',
                  color: '#FFFFFF',
                }}
              >
                s
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#C9C9C4',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
              }}
            >
              0–100 km/h Sprint
            </div>
          </div>

          {/* Stat 3: Top Speed */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3.5rem, 6.5vw, 5.8rem)',
                fontWeight: 700,
                color: '#D40000',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.03em',
              }}
            >
              &gt;{speed}
              <span
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  marginLeft: '0.4rem',
                  color: '#FFFFFF',
                }}
              >
                km/h
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#C9C9C4',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
              }}
            >
              Maximum Top Speed
            </div>
          </div>
        </div>

        {/* Powertrain Architecture Switch */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setPowertrainMode('combined')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              border: powertrainMode === 'combined' ? '1px solid #D40000' : '1px solid rgba(255,255,255,0.15)',
              backgroundColor: powertrainMode === 'combined' ? '#D40000' : 'rgba(255,255,255,0.04)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            Combined Hybrid (830 cv)
          </button>
          <button
            onClick={() => setPowertrainMode('ice')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              border: powertrainMode === 'ice' ? '1px solid #D40000' : '1px solid rgba(255,255,255,0.15)',
              backgroundColor: powertrainMode === 'ice' ? '#D40000' : 'rgba(255,255,255,0.04)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            V6 ICE Twin-Turbo (663 cv)
          </button>
          <button
            onClick={() => setPowertrainMode('hybrid')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              border: powertrainMode === 'hybrid' ? '1px solid #D40000' : '1px solid rgba(255,255,255,0.15)',
              backgroundColor: powertrainMode === 'hybrid' ? '#D40000' : 'rgba(255,255,255,0.04)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            MGU-K Electric Motor (167 cv / 122 kW)
          </button>
        </div>

        {/* Full-width Side Profile Supercar Image */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <img
            src="/images/side_profile.jpg"
            alt="Ferrari 296 GTB Side Profile"
            style={{
              width: '100%',
              maxHeight: '620px',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Dynamic Telemetry Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              backgroundColor: 'rgba(17, 17, 17, 0.82)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '1.25rem 1.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.6875rem',
                  color: '#D40000',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                Powertrain Configuration
              </span>
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginTop: '0.2rem',
                }}
              >
                {powertrainMode === 'combined' && 'Total Hybrid Synergy · 830 cv @ 8,000 RPM · 740 Nm'}
                {powertrainMode === 'ice' && 'F163 120° 2.9L Twin-Turbo V6 · 663 cv @ 8,000 RPM'}
                {powertrainMode === 'hybrid' && 'Dual-Rotor MGU-K Electric Motor · 315 Nm Instant Torque · 7.45 kWh Battery'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.6875rem',
                    color: '#888888',
                    textTransform: 'uppercase',
                  }}
                >
                  Fiorano Lap Time
                </span>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  1' 21.00"
                </div>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.6875rem',
                    color: '#888888',
                    textTransform: 'uppercase',
                  }}
                >
                  Weight/Power Ratio
                </span>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#D40000',
                  }}
                >
                  1.77 kg/cv
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
