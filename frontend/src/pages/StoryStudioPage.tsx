import React, { useState } from 'react';
import {
  BookMarked,
  Sparkles,
  Volume2,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storyGenerator } from '../services/storyGenerator';
import { MOCK_STORIES } from '../services/mockData';
import { LocalStory } from '../types';
import { AudioButton } from '../components/shared/AudioButton';

export const StoryStudioPage: React.FC = () => {
  const { activeLanguage, activeGrade, addNotification, speakText } = useApp();

  const [selectedTheme, setSelectedTheme] = useState<any>('Forest');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStory, setCurrentStory] = useState<LocalStory>(MOCK_STORIES[0]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const themes = ['Forest', 'Animals', 'Rivers', 'Village life', 'Seasons', 'Farming', 'Community', 'Games'];

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    setTimeout(async () => {
      const generated = await storyGenerator.generateStory(selectedTheme, activeGrade, activeLanguage);
      setCurrentStory(generated);
      setIsGenerating(false);
      setUserAnswers({});
      addNotification(`New Jharkhand Story generated on ${selectedTheme}!`);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-emerald-700" /> Local Jharkhand Story Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Culturally relevant children's stories in mother tongue ({activeLanguage})
          </p>
        </div>

        {/* THEMES PILLS */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-md">
          {themes.map((th) => (
            <button
              key={th}
              onClick={() => setSelectedTheme(th)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedTheme === th ? 'bg-sal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {th}
            </button>
          ))}
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleGenerateStory}
          disabled={isGenerating}
          className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-harvest-400" />
          {isGenerating ? 'Generating Story...' : `Generate ${selectedTheme} Story`}
        </button>
      </div>

      {/* CULTURAL SAFETY DISCLAIMER (Req #13 & #34) */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Cultural Disclaimer:</strong> {currentStory.culturalDisclaimer}
        </span>
      </div>

      {/* STORY DISPLAY CARD */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        {/* Story Title Header */}
        <div className="border-b pb-4 text-center space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Theme: {currentStory.theme} • {currentStory.targetLang}
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 pt-2">{currentStory.titleHindi}</h3>
          <h4 className="text-xl font-bold text-sal-900 font-olchiki">{currentStory.titleTarget}</h4>
          <p className="text-xs font-mono text-slate-400">Phonetic: {currentStory.phoneticTitle}</p>
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-6">
          {currentStory.contentHindi.map((paragraph, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start gap-4">
              <span className="text-4xl p-2 bg-white rounded-2xl border shrink-0">{currentStory.illustrations[idx] || '🌳'}</span>

              <div className="space-y-1.5 flex-1">
                <div className="text-xs font-semibold text-slate-700">"{paragraph}"</div>
                <div className="text-base font-extrabold text-sal-950">
                  "{currentStory.contentTarget[idx]}"
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Phonetic: {currentStory.phoneticContent[idx]}
                </div>

                <div className="pt-2">
                  <AudioButton text={currentStory.contentTarget[idx]} langCode="hi-IN" size="sm" showSpeedControls={false} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comprehension Questions */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sal-600" /> Story Comprehension Questions
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentStory.comprehensionQuestions.map((cq, qIdx) => (
              <div key={qIdx} className="p-4 rounded-2xl bg-sal-50 border border-sal-200 text-xs space-y-3">
                <div className="font-bold text-sal-950">{qIdx + 1}. {cq.questionHindi}</div>
                <div className="font-semibold text-sal-800">{cq.questionTarget}</div>

                <div className="space-y-1.5 pt-1">
                  {cq.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setUserAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                        if (oIdx === cq.answerIndex) speakText('सही उत्तर! ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!');
                      }}
                      className={`w-full p-2 rounded-xl text-left font-bold transition-all text-xs ${
                        userAnswers[qIdx] === oIdx
                          ? oIdx === cq.answerIndex
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-rose-600 text-white'
                          : 'bg-white text-slate-800 border border-slate-200 hover:border-sal-600'
                      }`}
                    >
                      {opt} {userAnswers[qIdx] === oIdx && oIdx === cq.answerIndex && ' ✓'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
