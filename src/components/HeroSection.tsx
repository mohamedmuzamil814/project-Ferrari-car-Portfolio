import React, { useRef, useEffect, useState, useCallback } from 'react';
import { engineSound } from '../utils/engineSound';

interface HeroSectionProps {
  onOpenTestDrive: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTestDrive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0); // 0 (covered) to 1 (fully revealed)
  const [isPlaying, setIsPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const coveredImgRef = useRef<HTMLImageElement | null>(null);
  const revealedImgRef = useRef<HTMLImageElement | null>(null);

  // Load images
  useEffect(() => {
    let loadedCount = 0;
    const covered = new Image();
    covered.src = '/images/covered.jpg';

    const revealed = new Image();
    revealed.src = '/images/hero.jpg';

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        coveredImgRef.current = covered;
        revealedImgRef.current = revealed;
        setImagesLoaded(true);
      }
    };

    covered.onload = checkLoaded;
    revealed.onload = checkLoaded;

    return () => {
      covered.onload = null;
      revealed.onload = null;
    };
  }, []);

  // Render on canvas with high-fidelity cloth reveal simulation
  const drawFrame = useCallback((p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#FAFAF8';
    ctx.fillRect(0, 0, width, height);

    const revealed = revealedImgRef.current;
    const covered = coveredImgRef.current;

    // Compute cover sizing
    const renderCover = (img: HTMLImageElement, alpha = 1, offsetY = 0, scale = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (canvasRatio > imgRatio) {
        drawW = width * scale;
        drawH = (width / imgRatio) * scale;
      } else {
        drawH = height * scale;
        drawW = (height * imgRatio) * scale;
      }

      drawX = (width - drawW) / 2;
      drawY = (height - drawH) / 2 + offsetY;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    };

    // If images are loaded, render the transition
    if (revealed && covered) {
      // 1. Draw revealed car (underneath)
      const carScale = 1.0 + (1 - p) * 0.04; // subtle scale zoom settling in
      renderCover(revealed, 1, 0, carScale);

      // 2. Draw covered silk cloth (lifts upward and dissolves)
      if (p < 0.99) {
        // Cloth lifts up gracefully (as described in wireframe: "silk cloth lifts straight up in one single graceful motion")
        const liftProgress = Math.min(1, p * 1.25);
        const clothOffsetY = -height * Math.pow(liftProgress, 1.4) * 0.95;
        const clothAlpha = Math.max(0, 1 - Math.pow(liftProgress, 1.8));

        // Draw cloth with upward motion
        renderCover(covered, clothAlpha, clothOffsetY, 1.0 + liftProgress * 0.08);

        // Silk light shimmer effect
        if (p > 0.05 && p < 0.85) {
          ctx.save();
          const gradient = ctx.createLinearGradient(0, clothOffsetY + height * 0.3, width, clothOffsetY + height * 0.6);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.35 * (1 - p)})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }
    } else {
      // Fallback placeholder during load
      ctx.fillStyle = '#111111';
      ctx.font = "32px 'Italiana', serif";
      ctx.textAlign = 'center';
      ctx.fillText('FERRARI 296 GTB', width / 2, height / 2);
    }
  }, []);

  // Update canvas size
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(progress);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame, progress]);

  // Redraw when progress or images loaded change
  useEffect(() => {
    drawFrame(progress);
  }, [progress, imagesLoaded, drawFrame]);

  // Scroll listener for hero container (pins scroll to progress)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isPlaying) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDist = window.innerHeight * 1.4;
      const currentScroll = -rect.top;
      const p = Math.min(Math.max(currentScroll / scrollDist, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  // Cinematic play animation
  const playReveal = () => {
    setIsPlaying(true);
    engineSound.revEngine();
    let startTime: number | null = null;
    const duration = 2400; // 2.4s

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const p = Math.min(elapsed / duration, 1);
      // Smooth easeInOutCubic
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setProgress(eased);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const copyOpacity = Math.max(0, Math.min(1, (progress - 0.45) / 0.4));

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '240vh', // Extended scroll track for scrubbing
        backgroundColor: '#FAFAF8',
      }}
    >
      {/* Pinned 100vh Sticky Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Full-screen Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* Top Vignette / Gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '140px',
            background: 'linear-gradient(to bottom, rgba(250,250,248,0.7) 0%, rgba(250,250,248,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Center/Bottom Overlay: Headline & Copy (fades in as car is revealed) */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            marginTop: 'auto',
            marginBottom: '4.5rem',
            padding: '0 2rem',
            textAlign: 'center',
            opacity: copyOpacity,
            transform: `translateY(${(1 - copyOpacity) * 25}px)`,
            transition: 'transform 0.3s ease-out',
            pointerEvents: copyOpacity > 0.3 ? 'auto' : 'none',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(212, 0, 0, 0.08)',
              border: '1px solid rgba(212, 0, 0, 0.25)',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#D40000',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              830 CV · V6 HYBRID ARCHITECTURE
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Italiana', serif",
              fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
              color: '#111111',
              lineHeight: 1.05,
              marginBottom: '0.75rem',
              fontWeight: 400,
            }}
          >
            Beauty was hiding here.
          </h1>

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
              color: '#444444',
              maxWidth: '600px',
              margin: '0 auto 1.8rem',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            Meet the Ferrari 296 GTB.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <button onClick={onOpenTestDrive} className="btn-pill-rosso">
              Configure & Test Drive
            </button>
            <a href="#car" className="btn-pill-ghost">
              Explore The Car
            </a>
          </div>
        </div>

        {/* Bottom Interactive Scrub Bar & Control Strip */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            padding: '1rem 2rem 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1360px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Play Reveal button */}
          <button
            onClick={playReveal}
            disabled={isPlaying}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(201, 201, 196, 0.4)',
              borderRadius: '9999px',
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: "'Manrope', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#111111',
              cursor: isPlaying ? 'default' : 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D40000">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {isPlaying ? 'Revealing...' : 'Cinematic Reveal'}
          </button>

          {/* Interactive Cloth Scrub slider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(201, 201, 196, 0.4)',
              borderRadius: '9999px',
              padding: '0.4rem 1.2rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.6875rem',
                color: '#666666',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Cloth
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={progress}
              onChange={(e) => setProgress(parseFloat(e.target.value))}
              aria-label="Cloth reveal slider"
              style={{
                accentColor: '#D40000',
                width: '100px',
                cursor: 'pointer',
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.6875rem',
                color: '#D40000',
                fontWeight: 600,
                minWidth: '32px',
              }}
            >
              {Math.round(progress * 100)}%
            </span>
          </div>

          {/* Scroll prompt indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#888888',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            <span>Scroll</span>
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
                animation: 'bounce 2s infinite',
              }}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(5px); }
          60% { transform: translateY(2px); }
        }
      `}</style>
    </div>
  );
};
