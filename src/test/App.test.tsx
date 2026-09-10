import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

describe('Ferrari 296 GTB Portfolio Landing Page', () => {
  it('renders brand heading and model name', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/FERRARI/i);
    expect(brandElements.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/296 GTB/i).length).toBeGreaterThan(0);
  });

  it('renders wireframe hero headline and copy', () => {
    render(<App />);
    expect(screen.getByText(/Beauty was hiding here\./i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the Ferrari 296 GTB\./i)).toBeInTheDocument();
  });

  it('renders 5 section categories from the specification', () => {
    render(<App />);
    expect(screen.getByText(/Everything that makes it a Ferrari\./i)).toBeInTheDocument();
    expect(screen.getByText(/Numbers don't lie\./i)).toBeInTheDocument();
    expect(screen.getByText(/Look closer\./i)).toBeInTheDocument();
    expect(screen.getByText(/Stop scrolling\. Start driving\./i)).toBeInTheDocument();
  });

  it('renders the 5 car feature cards', () => {
    render(<App />);
    expect(screen.getByText(/Every curve has a job\./i)).toBeInTheDocument();
    expect(screen.getByText(/V6 hybrid\. 830 horsepower\./i)).toBeInTheDocument();
    expect(screen.getByText(/You hear it before you see it\./i)).toBeInTheDocument();
    expect(screen.getByText(/The air works for you\./i)).toBeInTheDocument();
    expect(screen.getByText(/A cockpit, not a cabin\./i)).toBeInTheDocument();
  });

  it('opens and submits the test drive modal', () => {
    render(<App />);
    const testDriveButtons = screen.getAllByText(/Test Drive/i);
    fireEvent.click(testDriveButtons[0]);

    // Modal should be open
    expect(screen.getByRole('heading', { name: /Book a Test Drive/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Matteo Rossi/i)).toBeInTheDocument();

    // Fill form and submit
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. Matteo Rossi/i), {
      target: { value: 'Enzo Ferrari' },
    });
    fireEvent.change(screen.getByPlaceholderText(/vip@domain\.com/i), {
      target: { value: 'enzo@ferrari.it' },
    });
    fireEvent.change(screen.getByPlaceholderText(/\+39 0536 949111/i), {
      target: { value: '+39 0536 949000' },
    });

    fireEvent.click(screen.getByText(/Confirm VIP Reservation/i));

    // Confirmation message shown
    expect(screen.getByText(/Benvenuto a Maranello/i)).toBeInTheDocument();
    expect(screen.getByText(/Enzo Ferrari/i)).toBeInTheDocument();
  });
});
