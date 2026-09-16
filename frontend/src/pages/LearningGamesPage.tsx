import React, { useState } from 'react';
import { Gamepad2, Sparkles, Trophy, RotateCcw, CheckCircle2, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LearningGamesPage: React.FC = () => {
  const { activeLanguage, speakText, addNotification } = useApp();

  const [score, setScore] = useState<number>(30);
  const [learningLevel, setLearningLevel] = useState<number>(6);
  const [selectedGame, setSelectedGame] = useState<'matching' | 'counting' | 'memory'>('matching');
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const matchingItems = [
    { id: 1, hindi: 'एक (1)', target: 'ᱢᱤᱫ (Mit)', symbol: '🍎' },
    { id: 2, hindi: 'दो (2)', target: 'ᱵᱟᱨ (Bar)', symbol: '🍎 🍎' },
    { id: 3, hindi: 'तीन (3)', target: 'ᱯᱮ (Pe)', symbol: '🍎 🍎 🍎' },
    { id: 4, hindi: 'पेड़ (Tree)', target: 'ᱫᱟᱨᱮ (Dare)', symbol: '🌳' },
  ];

  const handleMatch = (id: number) => {
    if (!matchedPairs.includes(id)) {
      setMatchedPairs((prev) => [...prev, id]);
      setScore((prev) => prev + 10);
      speakText('बहुत अच्छे! Correct match!');
      if (matchedPairs.length + 1 === matchingItems.length) {
        setLearningLevel((prev) => Math.min(10, prev + 1));
        addNotification(`Level Up! Learning level increased to Lvl ${learningLevel + 1}!`);
      }
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-600" /> Vernacular Learning Games & Voice Quiz
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Offline interactive games and adaptive learning performance tracking ({activeLanguage})
          </p>
        </div>

        {/* SCORE & LEVEL BADGE */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
            <Trophy className="w-4 h-4 text-amber-700" /> Score: {score} pts
          </div>

          <div className="px-4 py-2 rounded-2xl bg-sal-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
            <Award className="w-4 h-4 text-harvest-400" /> Level: {learningLevel}/10
          </div>
        </div>
      </div>

      {/* ADAPTIVE LEARNING RECOMMENDATION WIDGET (Req #30) */}
      <div className="p-4 rounded-3xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-extrabold text-purple-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" /> Adaptive Learning Recommendation
          </div>
          <p className="text-slate-600 mt-0.5">
            Student struggles with "Numbers 6-10". Recommended practice: "Counting Sal leaves with pictures".
          </p>
        </div>
        <button
          onClick={() => setSelectedGame('counting')}
          className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shrink-0 shadow-xs"
        >
          Start Practice Game
        </button>
      </div>

      {/* GAME WORKSPACE */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="font-extrabold text-base text-slate-900">
            {selectedGame === 'matching' ? 'Number & Word Matching Game' : 'Count Objects Game'}
          </h3>
          <button
            onClick={() => setMatchedPairs([])}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Game
          </button>
        </div>

        {/* MATCHING GAME GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {matchingItems.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleMatch(item.id)}
                className={`p-6 rounded-3xl border-2 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 active:scale-95 ${
                  isMatched
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-md'
                    : 'bg-slate-50 border-slate-200 hover:border-sal-600 text-slate-900'
                }`}
              >
                <div className="text-4xl">{item.symbol}</div>
                <div className="text-sm font-bold">{item.hindi}</div>
                <div className="text-xl font-extrabold text-sal-900 font-olchiki">{item.target}</div>
                {isMatched && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-4 h-4" /> Matched!
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
