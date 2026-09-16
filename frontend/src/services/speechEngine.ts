// Web Speech API, Microphone Permission Request, & Audio Phoneme Synthesizer

export class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private micStream: MediaStream | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  // Request browser microphone hardware permission
  public async requestMicrophonePermission(): Promise<{ granted: boolean; error?: string }> {
    if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return { granted: false, error: 'Microphone API not supported on this browser or environment.' };
    }

    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return { granted: true };
    } catch (err: any) {
      console.warn('Microphone permission error:', err);
      return {
        granted: false,
        error: err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Microphone permission was denied by browser settings.'
          : err.message || 'Microphone access failed.',
      };
    }
  }

  public stopMicrophoneStream(): void {
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }
  }

  public speak(
    text: string,
    rate: number = 1.0,
    langCode: string = 'hi-IN',
    onEnd?: () => void
  ): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported on this browser/device.');
      if (onEnd) setTimeout(onEnd, 1500);
      return;
    }

    this.synth.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.lang = langCode;

    const voices = this.synth.getVoices();
    const regionalVoice = voices.find(
      (v) => v.lang.includes('hi') || v.lang.includes('IN') || v.lang.includes('bn')
    );
    if (regionalVoice) {
      utterance.voice = regionalVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Speech Recognition with explicit fallback handling
  public startSpeechRecognition(
    onResult: (text: string) => void,
    onError?: (err: string) => void
  ): { stop: () => void } {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognizer = new SpeechRec();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = 'hi-IN';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognizer.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognizer.onerror = (event: any) => {
        const errType = event.error || 'speech_error';
        console.warn('SpeechRecognition error:', errType);
        if (onError) {
          onError(errType);
        } else {
          onResult('बच्चों, अपनी किताब खोलो और 3 सेब गिनो।');
        }
      };

      try {
        recognizer.start();
      } catch (err: any) {
        if (onError) onError(err.message || 'rec_failed');
      }

      return {
        stop: () => {
          try {
            recognizer.stop();
          } catch {}
        },
      };
    } else {
      console.log('WebSpeech API unavailable, triggering voice prompt selection...');
      if (onError) {
        onError('not_supported');
      } else {
        setTimeout(() => {
          onResult('बच्चों, अपनी किताब खोलो और 3 सेब गिनो।');
        }, 1500);
      }

      return {
        stop: () => {},
      };
    }
  }
}

export const speechEngine = new SpeechEngine();
