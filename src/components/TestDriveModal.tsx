import React, { useState } from 'react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dealership: 'Maranello Official Showroom — Italy',
    date: '2026-09-24',
    timeSlot: '11:00 AM (Track & Highway Experience)',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '640px', padding: '2.5rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
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

        {!submitted ? (
          <div>
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
              VIP Concierge
            </span>
            <h3
              style={{
                fontFamily: "'Italiana', serif",
                fontSize: '2.4rem',
                color: '#FFFFFF',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}
            >
              Book a Test Drive
            </h3>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.9375rem',
                color: '#999999',
                marginBottom: '2rem',
              }}
            >
              Experience the 830 cv Ferrari 296 GTB with our factory-trained test drivers.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.75rem',
                    color: '#C9C9C4',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.4rem',
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Matteo Rossi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.2rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.9375rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.75rem',
                      color: '#C9C9C4',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vip@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.2rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#FFFFFF',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.9375rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.75rem',
                      color: '#C9C9C4',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+39 0536 949111"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.2rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#FFFFFF',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.9375rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.75rem',
                    color: '#C9C9C4',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.4rem',
                  }}
                >
                  Preferred Dealership Location
                </label>
                <select
                  value={formData.dealership}
                  onChange={(e) => setFormData({ ...formData, dealership: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.2rem',
                    borderRadius: '12px',
                    backgroundColor: '#1E1E1E',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.9375rem',
                    outline: 'none',
                  }}
                >
                  <option value="Maranello Official Showroom — Italy">Maranello Official Showroom — Italy</option>
                  <option value="Mayfair Boutique — London, UK">Mayfair Boutique — London, UK</option>
                  <option value="Park Avenue Gallery — New York, USA">Park Avenue Gallery — New York, USA</option>
                  <option value="Downtown Lounge — Dubai, UAE">Downtown Lounge — Dubai, UAE</option>
                  <option value="Ginza Atelier — Tokyo, Japan">Ginza Atelier — Tokyo, Japan</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.75rem',
                      color: '#C9C9C4',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.2rem',
                      borderRadius: '12px',
                      backgroundColor: '#1E1E1E',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#FFFFFF',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.9375rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.75rem',
                      color: '#C9C9C4',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.2rem',
                      borderRadius: '12px',
                      backgroundColor: '#1E1E1E',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#FFFFFF',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.9375rem',
                      outline: 'none',
                    }}
                  >
                    <option value="10:00 AM (Aerodynamic Briefing)">10:00 AM (Aerodynamic Briefing)</option>
                    <option value="11:00 AM (Track & Highway Experience)">11:00 AM (Track & Highway Experience)</option>
                    <option value="02:30 PM (Sunset Dyno & Track Sprint)">02:30 PM (Sunset Dyno & Track Sprint)</option>
                    <option value="04:00 PM (Private Track Session)">04:00 PM (Private Track Session)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-pill-rosso"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.9375rem',
                  marginTop: '1rem',
                }}
              >
                Confirm VIP Reservation
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 0, 0, 0.15)',
                border: '2px solid #D40000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#D40000',
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

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
              Reservation Confirmed
            </span>

            <h3
              style={{
                fontFamily: "'Italiana', serif",
                fontSize: '2.5rem',
                color: '#FFFFFF',
                marginBottom: '1rem',
              }}
            >
              Benvenuto a Maranello
            </h3>

            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '1rem',
                color: '#C9C9C4',
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: '0 auto 2rem',
              }}
            >
              Thank you, <strong>{formData.name}</strong>. Your test drive appointment at <strong>{formData.dealership}</strong> on{' '}
              <strong>{formData.date}</strong> has been prioritized. A Ferrari Client Specialist will contact you at {formData.phone}.
            </p>

            <div
              style={{
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                marginBottom: '2rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8125rem',
                color: '#888888',
              }}
            >
              VIP Booking Code: <span style={{ color: '#FFFFFF', fontWeight: 700 }}>FERRARI-296-{(Math.random() * 90000 + 10000).toFixed(0)}</span>
            </div>

            <button onClick={handleReset} className="btn-pill-rosso">
              Return to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
