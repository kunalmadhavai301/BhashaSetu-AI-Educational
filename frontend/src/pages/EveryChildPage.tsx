import React, { useState } from 'react';
import {
  Accessibility,
  Volume2,
  VolumeX,
  Eye,
  Ear,
  MessageSquare,
  BookOpen,
  Brain,
  Plus,
  CheckCircle2,
  Sun,
  Type,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMMUNICATION_CARDS } from '../services/mockData';
import { CommunicationCard } from '../types';

export const EveryChildPage: React.FC = () => {
  const { accessibility, updateAccessibility, speakText, activeLanguage, addNotification } = useApp();

  const [cards, setCards] = useState<CommunicationCard[]>(COMMUNICATION_CARDS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customLabel, setCustomLabel] = useState('');
  const [customSymbol, setCustomSymbol] = useState('🌟');

  const filteredCards =
    selectedCategory === 'all' ? cards : cards.filter((c) => c.category === selectedCategory);

  const handleCardClick = (card: CommunicationCard) => {
    speakText(`${card.labelHindi}. ${card.labelTarget}`, 1.0, 'hi-IN');
    addNotification(`PECS Card Triggered: "${card.labelHindi}" (${card.labelTarget})`);
  };

  const handleAddCustomCard = () => {
    if (!customLabel.trim()) return;
    const newCard: CommunicationCard = {
      id: `c_${Date.now()}`,
      labelHindi: customLabel,
      labelTarget: `${customLabel} (${activeLanguage})`,
      phonetic: customLabel,
      symbol: customSymbol || '🌟',
      category: 'needs',
      audioText: customLabel,
    };
    setCards((prev) => [...prev, newCard]);
    setCustomLabel('');
    addNotification('Custom Communication Card added!');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-amber-600" /> EveryChild Inclusive Accessibility Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Universal accessibility toolkit for non-verbal, hearing-impaired, and low-vision children
          </p>
        </div>

        {/* ACCESSIBILITY PRESET PILLS */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => updateAccessibility('silentClassroom', !accessibility.silentClassroom)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              accessibility.silentClassroom
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {accessibility.silentClassroom ? <VolumeX className="w-3.5 h-3.5 inline mr-1" /> : null}
            Silent Classroom Mode: {accessibility.silentClassroom ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* CORE ACCESSIBILITY TOGGLE CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { key: 'visualSupport', label: '👁 Visual Support', desc: 'Screen reader & audio desc' },
          { key: 'hearingSupport', label: '👂 Hearing Support', desc: 'Captions & gesture cards' },
          { key: 'communicationSupport', label: '🗣 Communication', desc: 'Speak Without Speaking' },
          { key: 'readingSupport', label: '📖 Reading Support', desc: 'Bilingual text guides' },
          { key: 'highContrast', label: '☀️ High Contrast', desc: 'Black & high contrast UI' },
          { key: 'largeText', label: '🔤 Large Text Mode', desc: '1.5x font size multiplier' },
        ].map((acc, i) => {
          const isVal = (accessibility as any)[acc.key];
          return (
            <button
              key={i}
              onClick={() => updateAccessibility(acc.key as any, !isVal)}
              className={`p-4 rounded-2xl border text-left transition-all active:scale-95 shadow-soft ${
                isVal
                  ? 'bg-sal-700 text-white border-sal-800 shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-sal-600'
              }`}
            >
              <div className="text-xs font-extrabold">{acc.label}</div>
              <span className="text-[10px] opacity-80 mt-1 block font-medium">{acc.desc}</span>
              <span className={`text-[9px] font-bold mt-2 block ${isVal ? 'text-harvest-300' : 'text-slate-400'}`}>
                {isVal ? '✓ ACTIVE' : 'Tap to Enable'}
              </span>
            </button>
          );
        })}
      </div>

      {/* FEATURE 1: "SPEAK WITHOUT SPEAKING" PECS COMMUNICATION BOARD (Req #17) */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" /> Non-Verbal PECS Board
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">“Speak Without Speaking” Communication Board</h3>
            <p className="text-xs text-slate-500">
              Children tap picture cards to communicate needs. Speaks out loud instantly in Hindi and {activeLanguage}.
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border">
            {['all', 'basic', 'needs', 'feelings', 'classroom'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedCategory === cat ? 'bg-amber-600 text-white' : 'text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PECS CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="p-5 rounded-3xl bg-ivory-100 border-2 border-amber-300 hover:border-amber-600 hover:bg-amber-50 shadow-soft hover:shadow-elevated transition-all flex flex-col items-center text-center gap-2 active:scale-95 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{card.symbol}</span>
              <div className="text-xs font-extrabold text-slate-900">{card.labelHindi}</div>
              <div className="text-[11px] font-bold text-sal-800 font-olchiki">{card.labelTarget}</div>
            </button>
          ))}
        </div>

        {/* ADD CUSTOM CARD */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-bold text-slate-600 shrink-0">Add Custom Card:</span>
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Card phrase e.g. I need my pencil..."
            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
          />
          <button
            onClick={handleAddCustomCard}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Card
          </button>
        </div>
      </section>

      {/* FEATURE 2: SILENT CLASSROOM MODE & COLOR-BLIND SAFE PATTERNS (Req #16 & #19) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SILENT CLASSROOM DEMO */}
        <div className="bg-sal-950 text-white p-6 rounded-3xl border border-sal-800 shadow-elevated space-y-4">
          <div className="flex items-center justify-between border-b border-sal-800 pb-3">
            <h4 className="font-extrabold text-sm text-harvest-400 flex items-center gap-2">
              <Ear className="w-4 h-4 text-harvest-400" /> Silent Classroom Mode (Deaf / Hard of Hearing)
            </h4>
            <span className="text-[10px] bg-amber-400 text-sal-950 px-2 py-0.5 rounded font-bold uppercase">
              Visual Captions Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sal-900 border border-sal-800 space-y-3">
            <div className="text-xs font-bold text-sal-300 uppercase">Live Teacher Caption Output:</div>
            <div className="text-lg font-extrabold text-white">
              "बच्चों, अपनी किताब खोलो और 3 सेब गिनो।"
            </div>
            <div className="text-xl font-extrabold text-harvest-300 font-olchiki">
              "ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ (Pe / 3)"
            </div>

            {/* Gesture instructional visual card */}
            <div className="p-3 bg-sal-950 rounded-xl border border-sal-800 flex items-center gap-3">
              <span className="text-3xl">📖 👉 3️⃣</span>
              <div className="text-xs text-sal-200">
                Sign Gesture Card: Point to Book + Show 3 Fingers
              </div>
            </div>
          </div>
        </div>

        {/* COLOR-BLIND SAFE PATTERN DESIGN (Req #19) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h4 className="font-extrabold text-sm text-slate-900">Color-Blind Safe Visual Indicators</h4>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              Icons + Labels + Patterns
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-xs font-bold text-emerald-950 flex items-center justify-between">
              <span>✓ Correct Answer (Checkmark + Solid Border)</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 border-2 border-dashed border-rose-500 text-xs font-bold text-rose-950 flex items-center justify-between">
              <span>✕ Try Again (Cross + Dashed Border)</span>
              <span className="text-rose-600 font-extrabold">✕</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
