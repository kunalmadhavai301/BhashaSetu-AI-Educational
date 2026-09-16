import React from 'react';
import { HeartHandshake, Volume2, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TEACHER_10_WORDS, EMERGENCY_PHRASES } from '../services/mockData';
import { AudioButton } from '../components/shared/AudioButton';

export const TeacherLearnPage: React.FC = () => {
  const { activeLanguage, speakText } = useApp();

  return (
    <div className="space-y-8 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-sal-700" /> Teacher Language Learning & Phrasebook
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Daily mother-tongue vocabulary for non-native Hindi teachers in tribal Jharkhand schools ({activeLanguage})
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-harvest-100 text-harvest-950 font-bold text-xs border border-harvest-300">
          Daily Vocabulary Module
        </span>
      </div>

      {/* SECTION 1: LEARN 10 WORDS TODAY (Req #36) */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sal-100 text-sal-900 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sal-600" /> Daily Teacher Micro-Learning
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">“Learn 10 Words Today”</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TEACHER_10_WORDS.map((w, idx) => (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-sal-50/70 border border-sal-200 space-y-2 flex flex-col justify-between hover:shadow-soft transition-all"
            >
              <div>
                <span className="text-[10px] font-extrabold text-sal-700 bg-sal-200 px-2 py-0.5 rounded-full">
                  Word #{idx + 1}
                </span>
                <div className="text-sm font-bold text-slate-800 mt-2">{w.hindi}</div>
                <div className="text-lg font-extrabold text-sal-950 font-olchiki mt-0.5">{w.target}</div>
                <div className="text-[10px] font-mono text-slate-500">Phonetic: {w.phonetic}</div>
                <div className="text-[11px] text-slate-600 font-medium italic mt-1">
                  Example: "{w.sentenceHindi}" → "{w.sentenceTarget}"
                </div>
              </div>

              <div className="pt-2">
                <AudioButton text={w.target} langCode="hi-IN" size="sm" showSpeedControls={false} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: EMERGENCY CLASSROOM PHRASES (Req #37) */}
      <section className="bg-sal-950 text-white p-8 rounded-3xl border border-sal-800 shadow-elevated space-y-6">
        <div className="flex items-center justify-between border-b border-sal-800 pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-terracotta-400" />
            <h3 className="text-xl font-extrabold text-white">Emergency Classroom Phrasebook</h3>
          </div>
          <span className="text-xs text-sal-300">One-tap vernacular translation & instant audio</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_PHRASES.map((ph, idx) => (
            <div
              key={idx}
              onClick={() => speakText(ph.target)}
              className="p-4 rounded-2xl bg-sal-900 border border-sal-800 hover:border-harvest-400 hover:bg-sal-800/80 cursor-pointer transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{ph.symbol}</span>
                <span className="text-[10px] font-bold text-harvest-400 uppercase">1-Tap Speak</span>
              </div>
              <div className="text-xs font-bold text-slate-200">"{ph.hindi}"</div>
              <div className="text-base font-extrabold text-harvest-300 font-olchiki">
                "{ph.target}"
              </div>
              <div className="text-[10px] font-mono text-sal-400">Phonetic: {ph.phonetic}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
