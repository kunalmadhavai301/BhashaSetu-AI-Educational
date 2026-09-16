import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Shuffle,
  Volume2,
  Gamepad2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_FLASHCARDS } from '../services/mockData';
import { Flashcard } from '../types';
import { AudioButton } from '../components/shared/AudioButton';

export const FlashcardStudioPage: React.FC = () => {
  const { activeLanguage, speakText } = useApp();

  const [cards, setCards] = useState<Flashcard[]>(MOCK_FLASHCARDS);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [mode, setMode] = useState<'grid' | 'quiz' | 'memory'>('grid');

  const handleShuffle = () => {
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" /> Vernacular AI Flashcard Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Visual cards with Ol Chiki script, phonetic pronunciations and audio speech ({activeLanguage})
          </p>
        </div>

        {/* MODE SWITCHER */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
          >
            <Shuffle className="w-3.5 h-3.5" /> Shuffle
          </button>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['grid', 'quiz', 'memory'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  mode === m ? 'bg-sal-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m} Mode
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FLASHCARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {cards.map((card) => {
          const isFlipped = flippedCardId === card.id;
          return (
            <div
              key={card.id}
              onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
              className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-soft hover:shadow-elevated hover:border-sal-600 cursor-pointer transition-all flex flex-col items-center text-center justify-between min-h-[260px] relative overflow-hidden group"
            >
              <span className="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {card.category}
              </span>

              {/* CARD SYMBOL / IMAGE */}
              <div className="text-6xl my-3 group-hover:scale-110 transition-transform">
                {card.symbolOrImage}
              </div>

              {/* TEXT DISPLAY (HINDI vs VERNACULAR) */}
              <div className="space-y-1 w-full">
                <div className="text-sm font-bold text-slate-700">{card.hindi}</div>
                <div className="text-xl font-extrabold text-sal-950 font-olchiki">
                  {card.target} {card.script && `(${card.script})`}
                </div>
                <div className="text-[11px] font-mono text-slate-400 font-semibold">
                  Phonetic: {card.phonetic}
                </div>
              </div>

              {/* AUDIO BUTTON */}
              <div className="mt-3 pt-2 border-t border-slate-100 w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
                <AudioButton text={card.audioText} langCode="hi-IN" size="sm" showSpeedControls={false} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
