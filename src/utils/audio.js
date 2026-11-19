// Web Audio API Synthesizer - 100% self-contained, zero external asset dependencies
let audioCtx = null;
let isMuted = true; // muted by default for best user experience

export const toggleAudioMute = () => {
  isMuted = !isMuted;
  return isMuted;
};

export const getAudioMuted = () => isMuted;

const initAudio = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

// Subtle high-tech blip on hover
export const playHoverSound = () => {
  if (isMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Ignore audio errors
  }
};

// Playful puppy bark / click jump boop
export const playJumpSound = () => {
  if (isMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(650, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (e) {
    // Ignore audio errors
  }
};

// Electric shatter sound on glass break
export const playShatterSound = () => {
  if (isMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    // Layered chime
    [520, 780, 1040, 1560].forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.02);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + idx * 0.02 + 0.2);

      gain.gain.setValueAtTime(0.03, audioCtx.currentTime + idx * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.02 + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.02);
      osc.stop(audioCtx.currentTime + idx * 0.02 + 0.25);
    });
  } catch (e) {
    // Ignore audio errors
  }
};
