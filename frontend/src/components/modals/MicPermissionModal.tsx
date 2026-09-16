import React, { useState } from 'react';
import { Mic, X, AlertTriangle, RefreshCw, Send, Sparkles, Volume2 } from 'lucide-react';
import { speechEngine } from '../../services/speechEngine';

interface MicPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhrase: (phrase: string) => void;
  errorReason?: string;
}

export const MicPermissionModal: React.FC<MicPermissionModalProps> = ({
  isOpen,
  onClose,
  onSelectPhrase,
  errorReason = 'Microphone permission was not granted or blocked by browser settings.',
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [micStatusMsg, setMicStatusMsg] = useState('');

  if (!isOpen) return null;

  const quickPhrases = [
    'बच्चों, अपनी किताब खोलो और पाठ दो निकालो।',
    'तीन लाल वस्तुएं दिखाओ।',
    'दो और तीन को जोड़ो।',
    'पानी पीओ और यहाँ बैठो।',
    'सर, मेरी पेंसिल खो गई है!',
    'चीजों को गिनो और बताओ कितने हैं।',
  ];

  const handleRetryMic = async () => {
    setIsRequesting(true);
    setMicStatusMsg('Requesting microphone permission from browser...');
    const result = await speechEngine.requestMicrophonePermission();
    setIsRequesting(false);

    if (result.granted) {
      setMicStatusMsg('✓ Microphone permission granted! Click Teacher Speak button again.');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setMicStatusMsg(`✕ ${result.error || 'Permission denied. Please allow microphone in browser URL bar.'}`);
    }
  };

  const handleSelect = (phrase: string) => {
    onSelectPhrase(phrase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-elevated border border-slate-200 overflow-hidden animate-scaleUp p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Microphone Input & Permissions</h3>
              <p className="text-[10px] text-slate-500">Voice Translation Assistance</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error / Instruction Alert (Req #24) */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="font-extrabold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Microphone Permission Advice:</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">{errorReason}</p>
        </div>

        {micStatusMsg && (
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold font-mono">
            {micStatusMsg}
          </div>
        )}

        {/* Option A: Retry Hardware Mic Access */}
        <button
          onClick={handleRetryMic}
          disabled={isRequesting}
          className="w-full py-3 rounded-2xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          {isRequesting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-harvest-400" /> Requesting Browser Access...
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-harvest-400" /> Request Microphone Permission Again
            </>
          )}
        </button>

        {/* Option B: Quick Spoken Classroom Phrases Picker */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Or Pick a Quick Classroom Spoken Phrase:
          </label>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {quickPhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(phrase)}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-sal-50 border border-slate-200 hover:border-sal-600 text-left text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors"
              >
                <span>"{phrase}"</span>
                <Sparkles className="w-3.5 h-3.5 text-sal-700 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Option C: Custom Typed Voice Prompt */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Or type custom speech phrase..."
            className="flex-1 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-sal-600"
          />
          <button
            onClick={() => customPrompt.trim() && handleSelect(customPrompt)}
            className="px-4 py-2.5 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-sal-950 font-extrabold text-xs shadow-xs shrink-0"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};
