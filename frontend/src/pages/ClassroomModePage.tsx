import React, { useState } from 'react';
import {
  Play,
  Volume2,
  Mic,
  CheckCircle,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowRight,
  Accessibility,
  Languages,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_UNIVERSAL_LESSON } from '../services/mockData';
import { AudioButton } from '../components/shared/AudioButton';

export const ClassroomModePage: React.FC = () => {
  const { activeLanguage, activeGrade, speakText, accessibility } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const steps = [
    {
      instructionHindi: 'तीन लाल वस्तुएं दिखाओ।',
      instructionTarget: 'ᱯᱮᱭᱟ ᱟᱨᱟ ᱡᱤᱱᱤᱥ ᱩᱫᱩᱜ ᱢᱮ᱾',
      phonetic: 'Peya ara jinis udug me.',
      symbol: '🔴 🔴 🔴',
      options: ['🔴 🔴 🔴 (Pe / 3)', '🟢 🟢 (Bar / 2)', '🔵 (Mit / 1)'],
      correctOptionIndex: 0,
    },
    {
      instructionHindi: 'अपनी किताब खोलो और पाठ एक निकालो।',
      instructionTarget: 'ᱟᱢᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ ᱟᱨ ᱯᱟᱴ ᱢᱤᱫ ᱚᱰᱚᱠ ᱢᱮ᱾',
      phonetic: 'Amag puthi jhij me ar pat mit odok me.',
      symbol: '📚 📖 ✏️',
      options: ['📖 (Puthi / Book)', '✏️ (Pencil)', '🎒 (Bag)'],
      correctOptionIndex: 0,
    },
  ];

  const stepData = steps[currentStep];

  const handleSelectOption = (opt: string, idx: number) => {
    setSelectedResponse(opt);
    if (idx === stepData.correctOptionIndex) {
      speakText('बहुत अच्छे! ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!');
    } else {
      speakText('फिर से कोशिश करो। ᱟᱨᱦᱚᱸ ᱠᱩᱨᱩᱢᱩᱴᱩᱭ ᱢᱮ।');
    }
  };

  return (
    <div className={`space-y-6 pb-16 ${isFullScreen ? 'fixed inset-0 z-50 bg-ivory-50 p-6 overflow-y-auto' : ''}`}>
      {/* FULLSCREEN TOP BAR */}
      <div className="bg-sal-900 text-white p-4 rounded-3xl flex items-center justify-between shadow-elevated">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="font-extrabold text-sm sm:text-base text-white">
            Classroom Presentation Mode ({activeGrade} • {activeLanguage})
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullScreen((prev) => !prev)}
            className="px-3 py-1.5 rounded-xl bg-sal-800 hover:bg-sal-700 text-xs font-bold flex items-center gap-1 text-white border border-sal-700"
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isFullScreen ? 'Exit Fullscreen' : 'Full Screen'}
          </button>
        </div>
      </div>

      {/* TEACHER INSTRUCTION CARD (GIANT TOUCH-FRIENDLY DISPLAY) */}
      <div className="bg-white p-8 rounded-3xl border-2 border-sal-600 shadow-elevated space-y-6 text-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sal-100 text-sal-900 font-extrabold text-xs uppercase tracking-wider">
          Teacher Instruction (Step {currentStep + 1} of {steps.length})
        </span>

        {/* HINDI INSTRUCTION */}
        <div className="text-xl sm:text-2xl font-extrabold text-slate-800">
          "{stepData.instructionHindi}"
        </div>

        {/* SANTHALI VERNACULAR INSTRUCTION */}
        <div className="text-3xl sm:text-4xl font-extrabold text-sal-950 font-olchiki leading-tight">
          "{stepData.instructionTarget}"
        </div>

        <div className="text-sm font-mono text-slate-500 font-semibold">
          Phonetic Pronunciation: {stepData.phonetic}
        </div>

        {/* VISUAL SYMBOLS */}
        <div className="text-5xl sm:text-6xl py-4 bg-sal-50 rounded-3xl border border-sal-200 inline-block px-12 shadow-inner">
          {stepData.symbol}
        </div>

        {/* AUDIO PLAYER */}
        <div className="flex justify-center pt-2">
          <AudioButton text={stepData.instructionTarget} langCode="hi-IN" size="lg" showSpeedControls />
        </div>
      </div>

      {/* STUDENT RESPONSE PANEL */}
      <div className="bg-sal-950 text-white p-8 rounded-3xl border border-sal-800 shadow-elevated space-y-4">
        <div className="flex items-center justify-between border-b border-sal-800 pb-3">
          <h3 className="font-extrabold text-base text-harvest-400">Student Response Options:</h3>
          <span className="text-xs text-sal-300">Tap picture or say answer</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {stepData.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt, idx)}
              className={`p-6 rounded-3xl border-2 text-xl font-extrabold transition-all text-center flex flex-col items-center justify-center gap-2 active:scale-95 ${
                selectedResponse === opt
                  ? idx === stepData.correctOptionIndex
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                    : 'bg-rose-600 border-rose-400 text-white'
                  : 'bg-sal-900 border-sal-700 hover:border-harvest-400 text-white'
              }`}
            >
              <span>{opt}</span>
              {selectedResponse === opt && idx === stepData.correctOptionIndex && (
                <span className="text-xs font-bold bg-emerald-800 px-3 py-1 rounded-full text-white">
                  ✓ Correct! ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!
                </span>
              )}
            </button>
          ))}
        </div>

        {/* NEXT STEP BUTTON */}
        <div className="flex justify-between items-center pt-4 border-t border-sal-800">
          <button
            onClick={() => {
              setSelectedResponse(null);
              setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
            }}
            className="px-4 py-2 rounded-xl bg-sal-900 hover:bg-sal-800 text-sal-300 font-bold text-xs"
          >
            Previous Step
          </button>

          <button
            onClick={() => {
              setSelectedResponse(null);
              setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
            }}
            className="px-6 py-3 rounded-2xl bg-harvest-500 hover:bg-harvest-400 text-sal-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
