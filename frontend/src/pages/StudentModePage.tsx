import React from 'react';
import { BookOpen, Gamepad2, Headphones, Eye, Mic, Star, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentModePage: React.FC = () => {
  const { setActiveTab, activeLanguage } = useApp();

  const studentButtons = [
    { label: '📚 Learn', sub: 'पाठ सीखो', tab: 'universal-lesson', color: 'bg-harvest-500 text-sal-950' },
    { label: '🎮 Play', sub: 'खेल खेलो', tab: 'learning-games', color: 'bg-purple-600 text-white' },
    { label: '🎧 Listen', sub: 'कहानियां सुनो', tab: 'stories', color: 'bg-emerald-600 text-white' },
    { label: '🖼 See', sub: 'चित्र देखो', tab: 'flashcards', color: 'bg-blue-600 text-white' },
    { label: '🗣 Speak', sub: 'अपनी भाषा में बोलो', tab: 'live-translate', color: 'bg-terracotta-600 text-white' },
    { label: '⭐ Progress', sub: 'मेरा स्कोर', tab: 'analytics', color: 'bg-amber-500 text-slate-950' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 p-6 space-y-8">
      {/* TOP STUDENT BAR */}
      <div className="bg-sal-900 text-white p-6 rounded-3xl flex items-center justify-between shadow-elevated">
        <div>
          <span className="text-xs font-bold text-harvest-400 uppercase tracking-widest">
            Student Classroom Mode • {activeLanguage}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Johar! Welcome Student 01 🌟</h2>
        </div>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-4 py-2 rounded-xl bg-sal-800 hover:bg-sal-700 text-white text-xs font-bold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Student Mode
        </button>
      </div>

      {/* GIANT KID-FRIENDLY BUTTONS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {studentButtons.map((btn, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(btn.tab)}
            className={`p-8 sm:p-12 rounded-3xl shadow-elevated hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center text-center gap-2 border-4 border-white/20 ${btn.color}`}
          >
            <span className="text-3xl sm:text-5xl font-extrabold">{btn.label}</span>
            <span className="text-xs font-bold opacity-90">{btn.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
