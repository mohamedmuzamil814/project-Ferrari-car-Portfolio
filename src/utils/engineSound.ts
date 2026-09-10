// Ferrari 296 GTB 120° V6 Twin-Turbo Hybrid Audio Synthesizer (Web Audio API)

class EngineSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private mainGain: GainNode | null = null;
  private revInterval: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public revEngine() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 2.8;

    // Master gain
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.01, now);
    master.gain.exponentialRampToValueAtTime(0.5, now + 0.3);
    master.gain.exponentialRampToValueAtTime(0.7, now + 1.2);
    master.gain.exponentialRampToValueAtTime(0.001, now + duration);
    master.connect(this.ctx.destination);

    // Distortion / saturation for aggressive Italian exhaust crackle
    const distortion = this.ctx.createWaveShaper();
    distortion.curve = this.makeDistortionCurve(18);
    distortion.oversample = '4x';
    distortion.connect(master);

    // Fundamental V6 Oscillators (120-degree firing order)
    const baseFreq = 78; // ~800 RPM idle base
    const peakFreq = 340; // ~8500 RPM screaming V6

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(peakFreq, now + 1.2);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 2.4);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq, now + duration);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
    osc2.frequency.exponentialRampToValueAtTime(peakFreq * 1.5, now + 1.2);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, now + 2.4);

    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sawtooth';
    osc3.frequency.setValueAtTime(baseFreq * 3, now);
    osc3.frequency.exponentialRampToValueAtTime(peakFreq * 3, now + 1.2);
    osc3.frequency.exponentialRampToValueAtTime(baseFreq * 3, now + 2.4);

    // Resonant lowpass filter to mimic tuned exhaust chamber
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(600, now + 2.5);
    filter.Q.value = 4.5;

    // Turbocharger whistle simulation (high bandpass noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const turboFilter = this.ctx.createBiquadFilter();
    turboFilter.type = 'bandpass';
    turboFilter.frequency.setValueAtTime(2200, now);
    turboFilter.frequency.exponentialRampToValueAtTime(5400, now + 1.1);
    turboFilter.frequency.exponentialRampToValueAtTime(1800, now + 2.2);
    turboFilter.Q.value = 7.0;

    const turboGain = this.ctx.createGain();
    turboGain.gain.setValueAtTime(0.001, now);
    turboGain.gain.exponentialRampToValueAtTime(0.18, now + 0.9);
    turboGain.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

    whiteNoise.connect(turboFilter);
    turboFilter.connect(turboGain);
    turboGain.connect(master);

    // Electric MGU-K motor whine (Ferrari 296 GTB hybrid system)
    const electricOsc = this.ctx.createOscillator();
    electricOsc.type = 'sine';
    electricOsc.frequency.setValueAtTime(1200, now);
    electricOsc.frequency.exponentialRampToValueAtTime(4800, now + 1.1);
    electricOsc.frequency.exponentialRampToValueAtTime(1400, now + 2.2);

    const electricGain = this.ctx.createGain();
    electricGain.gain.setValueAtTime(0.001, now);
    electricGain.gain.exponentialRampToValueAtTime(0.06, now + 0.8);
    electricGain.gain.exponentialRampToValueAtTime(0.001, now + 2.1);

    electricOsc.connect(electricGain);
    electricGain.connect(master);

    // Connections
    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(distortion);

    // Start nodes
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    whiteNoise.start(now);
    electricOsc.start(now);

    // Stop nodes after rev cycle
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
    whiteNoise.stop(now + duration);
    electricOsc.stop(now + duration);
  }

  private makeDistortionCurve(amount = 20): Float32Array {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

export const engineSound = new EngineSoundSynthesizer();
