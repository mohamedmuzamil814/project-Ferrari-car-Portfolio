import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CarSection } from './components/CarSection';
import { PerformanceSection } from './components/PerformanceSection';
import { GallerySection } from './components/GallerySection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { TestDriveModal } from './components/TestDriveModal';

export const App: React.FC = () => {
  const [testDriveOpen, setTestDriveOpen] = useState(false);

  // Initialize Lenis luxury smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Luxury Navbar */}
      <Navbar onOpenTestDrive={() => setTestDriveOpen(true)} />

      {/* Main Sections */}
      <main style={{ flex: 1 }}>
        {/* Section 1: Hero Canvas Cloth Reveal */}
        <HeroSection onOpenTestDrive={() => setTestDriveOpen(true)} />

        {/* Section 2: The Car Horizontal Cards */}
        <CarSection />

        {/* Section 3: Performance Numbers Strip */}
        <PerformanceSection />

        {/* Section 4: Gallery Craft Masonry */}
        <GallerySection />

        {/* Section 5: CTA */}
        <CtaSection onOpenTestDrive={() => setTestDriveOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Test Drive VIP Booking Modal */}
      <TestDriveModal isOpen={testDriveOpen} onClose={() => setTestDriveOpen(false)} />
    </div>
  );
};

export default App;
