import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  WifiOff,
  Save,
  MessageSquare,
  Sliders,
  Type,
  VolumeX,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { speechEngine } from '../services/speechEngine';
import { MicPermissionModal } from '../components/modals/MicPermissionModal';

export const LiveTranslatePage: React.FC = () => {
  const { activeLanguage, speakText, isDemoModeActive, effectiveOnline } = useApp();

  const [isListening, setIsListening] = useState<boolean>(false);
  const [isContinuous, setIsContinuous] = useState<boolean>(false);
  const [largeCaptions, setLargeCaptions] = useState<boolean>(true);
  const [activeSpeaker, setActiveSpeaker] = useState<'teacher' | 'student'>('teacher');

  const [statusState, setStatusState] = useState<'idle' | 'listening' | 'understanding' | 'translating' | 'speaking'>(
    'idle'
  );
  const [latencyMs, setLatencyMs] = useState<number>(420);
  const [isMicModalOpen, setIsMicModalOpen] = useState<boolean>(false);
  const [micErrorMsg, setMicErrorMsg] = useState<string>('');

  const [conversation, setConversation] = useState<
    { id: string; speaker: 'teacher' | 'student'; hindi: string; target: string; phonetic: string; time: string }[]
  >([
    {
      id: '1',
      speaker: 'teacher',
      hindi: 'बच्चों, अपनी किताब खोलो और पाठ दो निकालो।',
      target: 'ᱜᱤᱫᱽᱨᱟᱹ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ ᱟᱨ ᱯᱟᱴ ᱵᱟᱨ ᱚᱰᱚᱠ ᱯᱮ᱾',
      phonetic: 'Gidra, apeyag puthi jhij pe ar pat bar odok pe.',
      time: '10:28 AM',
    },
    {
      id: '2',
      speaker: 'student',
      hindi: 'सर, मेरी पेंसिल खो गई है!',
      target: 'ᱥᱟᱨ, ᱤᱧᱟᱜ ᱯᱮᱱᱥᱤᱞ ᱟᱫ ᱮᱱᱟ!',
      phonetic: 'Sar, injag pencil ad ena!',
      time: '10:29 AM',
    },
  ]);

  // Demo Mode Auto Simulation Trigger (Req #40)
  useEffect(() => {
    if (isDemoModeActive) {
      runDemoSequence();
    }
  }, [isDemoModeActive]);

  const runDemoSequence = () => {
    setStatusState('listening');
    setTimeout(() => {
      setStatusState('understanding');
      setTimeout(() => {
        setStatusState('translating');
        setTimeout(() => {
          setStatusState('speaking');
          const newBubble = {
            id: Date.now().toString(),
            speaker: 'teacher' as const,
            hindi: 'आज हम तीन सेब गिनेंगे!',
            target: 'ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱯᱮᱭᱟ ᱥᱮᱣ ᱞᱮᱠᱷᱟᱭᱟ!',
            phonetic: 'Tehenj bon peya sew lekhaya!',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setConversation((prev) => [...prev, newBubble]);
          speakText(newBubble.target);
          setTimeout(() => setStatusState('idle'), 1500);
        }, 600);
      }, 500);
    }, 800);
  };

  const processSpokenPhrase = async (spokenText: string, speaker: 'teacher' | 'student') => {
    setStatusState('understanding');
    const startTime = Date.now();

    setTimeout(async () => {
      setStatusState('translating');
      const result = await apiService.translate(spokenText, activeLanguage, 'Classroom instructions', effectiveOnline);
      const totalLatency = Date.now() - startTime;
      setLatencyMs(totalLatency);

      setStatusState('speaking');
      const newBubble = {
        id: Date.now().toString(),
        speaker,
        hindi: result.sourceText || spokenText,
        target: result.targetText || result.translatedText || spokenText,
        phonetic: result.phonetic || spokenText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConversation((prev) => [...prev, newBubble]);
      speakText(newBubble.target);

      setIsListening(false);
      setTimeout(() => setStatusState('idle'), 1200);
    }, 400);
  };

  const handlePushToTalk = async (speaker: 'teacher' | 'student' = 'teacher') => {
    if (isListening) return;

    setActiveSpeaker(speaker);
    setIsListening(true);
    setStatusState('listening');

    // First check microphone permission
    const perm = await speechEngine.requestMicrophonePermission();

    if (!perm.granted) {
      setIsListening(false);
      setStatusState('idle');
      setMicErrorMsg(perm.error || 'Microphone permission was not granted by browser settings.');
      setIsMicModalOpen(true);
      return;
    }

    // Start speech recognition
    speechEngine.startSpeechRecognition(
      (transcript) => {
        processSpokenPhrase(transcript, speaker);
      },
      (errType) => {
        setIsListening(false);
        setStatusState('idle');
        setMicErrorMsg(`Speech recognition info: ${errType}. You can select or type a spoken phrase below.`);
        setIsMicModalOpen(true);
      }
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Live Classroom Voice Translator</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
              Measured Latency: {latencyMs}ms ({effectiveOnline ? '🟢 Live Gemini AI' : '🔵 Offline Engine'})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time bidirectional speech bridge between Hindi Teacher and Vernacular Students ({activeLanguage})
          </p>
        </div>

        {/* CONTROLS BAR */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsContinuous((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isContinuous ? 'bg-sal-700 text-white border-sal-800' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            Continuous Mode: {isContinuous ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setLargeCaptions((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              largeCaptions ? 'bg-harvest-500 text-sal-950 border-harvest-600' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            Large Captions: {largeCaptions ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* LIVE VOICE BRIDGE SPEAKING STAGE */}
      <div className="bg-gradient-to-br from-sal-950 via-sal-900 to-sal-950 text-white rounded-3xl p-8 shadow-elevated border border-sal-800 relative overflow-hidden text-center">
        {/* Active Status Indicator Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sal-800 border border-sal-700 text-xs font-bold mb-6">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              statusState === 'idle'
                ? 'bg-slate-400'
                : statusState === 'listening'
                ? 'bg-rose-500 animate-ping'
                : 'bg-harvest-400 animate-pulse'
            }`}
          />
          <span className="capitalize text-harvest-300">
            {statusState === 'idle'
              ? 'Ready to Listen'
              : statusState === 'listening'
              ? `Listening to ${activeSpeaker}...`
              : statusState === 'understanding'
              ? 'Understanding Speech...'
              : statusState === 'translating'
              ? `Translating to ${activeLanguage}...`
              : 'Speaking Vernacular Audio...'}
          </span>
        </div>

        {/* Push-to-Talk Big Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
          <button
            onClick={() => handlePushToTalk('teacher')}
            disabled={isListening}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 border-4 ${
              isListening && activeSpeaker === 'teacher'
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse scale-105'
                : 'bg-harvest-500 hover:bg-harvest-400 border-harvest-300 text-sal-950 font-extrabold'
            }`}
          >
            <Mic className="w-10 h-10" />
            <span className="text-xs font-extrabold uppercase tracking-wider">TEACHER SPEAK</span>
            <span className="text-[10px] font-normal opacity-80">(Hindi)</span>
          </button>

          <div className="text-xs font-bold text-sal-400 uppercase">OR</div>

          <button
            onClick={() => handlePushToTalk('student')}
            disabled={isListening}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 border-4 ${
              isListening && activeSpeaker === 'student'
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse scale-105'
                : 'bg-terracotta-600 hover:bg-terracotta-500 border-terracotta-400 text-white font-extrabold'
            }`}
          >
            <Mic className="w-10 h-10" />
            <span className="text-xs font-extrabold uppercase tracking-wider">STUDENT SPEAK</span>
            <span className="text-[10px] font-normal opacity-80">({activeLanguage})</span>
          </button>
        </div>

        <p className="text-xs text-sal-300 mt-4">
          Tap microphone button to trigger speech input. Requests browser microphone permission or opens quick spoken phrases selector.
        </p>
      </div>

      {/* LIVE CAPTIONS & CONVERSATION BUBBLES */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sal-600" /> Live Conversation History
          </h3>
          <button
            onClick={() => setConversation([])}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Clear History
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto p-2">
          {conversation.map((bubble) => (
            <div
              key={bubble.id}
              className={`p-4 rounded-3xl border ${
                bubble.speaker === 'teacher'
                  ? 'bg-sal-50/80 border-sal-200 ml-0 sm:mr-12'
                  : 'bg-terracotta-50/80 border-terracotta-200 mr-0 sm:ml-12'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {bubble.speaker === 'teacher' ? '👩‍🏫 Teacher (Hindi)' : `👧 Student (${activeLanguage})`}
                </span>
                <span className="text-[10px] text-slate-400">{bubble.time}</span>
              </div>

              {/* Hindi Original */}
              <div className="text-xs font-semibold text-slate-700">"{bubble.hindi}"</div>

              {/* Vernacular Translation in Authentic Ol Chiki */}
              <div
                className={`font-extrabold text-sal-900 font-olchiki mt-2 ${
                  largeCaptions ? 'text-lg sm:text-xl' : 'text-sm'
                }`}
              >
                "{bubble.target}"
              </div>

              <div className="text-[11px] font-medium text-slate-500 mt-0.5 font-mono">
                Phonetic: {bubble.phonetic}
              </div>

              {/* Audio Playback Controls */}
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  onClick={() => speakText(bubble.target)}
                  className="px-3 py-1 rounded-xl bg-sal-700 hover:bg-sal-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Replay Vernacular Audio
                </button>

                <button
                  onClick={() => speakText(bubble.target, 0.5)}
                  className="text-xs text-sal-700 font-bold hover:underline"
                >
                  🐢 Slow Speech (0.5x)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MICROPHONE PERMISSION & QUICK VOICE INPUT MODAL */}
      <MicPermissionModal
        isOpen={isMicModalOpen}
        onClose={() => setIsMicModalOpen(false)}
        onSelectPhrase={(phrase) => processSpokenPhrase(phrase, activeSpeaker)}
        errorReason={micErrorMsg}
      />
    </div>
  );
};
