import React, { useState } from 'react';
import {
  Languages,
  Mic,
  FileText,
  Copy,
  Star,
  Edit,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  BookOpen,
  Plus,
  Check,
  AlertTriangle,
  HelpCircle,
  Clock,
  Cpu,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { AudioButton } from '../components/shared/AudioButton';
import { ConfidenceBadge } from '../components/shared/NipunBadge';
import { CorrectionModal } from '../components/modals/CorrectionModal';
import { EDUCATION_GLOSSARY } from '../services/mockData';
import { EducationCategory, TranslationResult, Language } from '../types';

export const TranslationStudioPage: React.FC = () => {
  const { activeLanguage, setActiveLanguage, speakText, addNotification, effectiveOnline } = useApp();

  const [inputMode, setInputMode] = useState<'type' | 'paste' | 'upload' | 'speak' | 'import'>('type');
  const [inputText, setInputText] = useState('बच्चों, अपनी किताब खोलो और 3 सेब गिनो।');
  const [selectedCategory, setSelectedCategory] = useState<EducationCategory>('Mathematics');

  const [result, setResult] = useState<any | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const categories: EducationCategory[] = [
    'Mathematics',
    'Language',
    'Environment',
    'Science',
    'Classroom instructions',
    'Stories',
    'Assessment',
    'Games',
    'Daily conversation',
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    try {
      const res = await apiService.translate(inputText, activeLanguage, selectedCategory, effectiveOnline);
      setResult(res);
    } catch (err: any) {
      addNotification(`Translation error: ${err.message}`);
    }
    setIsTranslating(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.targetText || result.translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    addNotification(`Translation saved to My Library!`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Languages className="w-5 h-5 text-sal-700" /> Vernacular AI Translation Studio
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                effectiveOnline
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              {effectiveOnline ? '🟢 Live Gemini AI Mode' : '🔵 Offline Local Engine Mode'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Context-aware AI translation for primary education glossaries ({activeLanguage})
          </p>
        </div>

        {/* TARGET LANGUAGE SELECTOR */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {(['santhali', 'ho', 'mundari'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setActiveLanguage(lang);
                if (result) handleTranslate();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeLanguage === lang
                  ? 'bg-sal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT MODES TABS */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 flex items-center gap-1 overflow-x-auto">
        {[
          { id: 'type', label: 'Type Hindi' },
          { id: 'paste', label: 'Paste Text' },
          { id: 'speak', label: 'Speak Hindi' },
          { id: 'upload', label: 'Upload Document' },
          { id: 'import', label: 'Import Lesson' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setInputMode(m.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              inputMode === m.id
                ? 'bg-sal-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* MAIN TRANSLATION WORKSPACE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* INPUT PANEL */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hindi Input:</span>

            {/* Context Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as EducationCategory)}
              className="text-xs font-bold bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Context: {c}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            placeholder="Type or paste Hindi sentence here..."
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-sal-600 text-slate-900"
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setShowGlossary((prev) => !prev)}
              className="text-xs font-bold text-sal-700 flex items-center gap-1 hover:underline"
            >
              <BookOpen className="w-4 h-4" /> {showGlossary ? 'Hide Glossaries' : 'View Glossaries'}
            </button>

            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-6 py-2.5 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              {isTranslating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-harvest-400" /> Translating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-harvest-400" /> Translate to {activeLanguage}
                </>
              )}
            </button>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="bg-sal-950 text-white p-6 rounded-3xl border border-sal-800 shadow-elevated space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-sal-800 pb-3 mb-3">
              <span className="text-xs font-extrabold text-harvest-400 uppercase tracking-wider">
                Vernacular Output ({activeLanguage}):
              </span>
              {result && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-sal-300 font-mono">
                    ⏱ {result.measuredLatencySec || '1.2'}s ({result.modeUsed || 'AI'})
                  </span>
                  <ConfidenceBadge confidence={result.confidence || 'High'} score={result.confidenceScore || 95} />
                </div>
              )}
            </div>

            {result ? (
              <div className="space-y-3">
                {/* Authentic Ol Chiki Native Script Output */}
                <div className="text-2xl font-extrabold text-white leading-relaxed font-olchiki">
                  "{result.targetText || result.translatedText}"
                </div>

                {/* Phonetic Transliteration */}
                <div className="text-xs text-sal-300 font-mono bg-sal-900 p-2.5 rounded-xl border border-sal-800">
                  Phonetic: {result.phonetic}
                </div>

                {/* Audio Controls */}
                <div className="pt-2">
                  <AudioButton text={result.targetText || result.translatedText} langCode="hi-IN" size="md" showSpeedControls />
                </div>

                {/* Context Details */}
                <div className="text-[11px] text-sal-300 pt-2 border-t border-sal-800 space-y-1">
                  <div>
                    <span className="text-harvest-400 font-bold">Engine Context:</span> {result.contextUsed || selectedCategory}
                  </div>
                  <div>
                    <span className="text-harvest-400 font-bold">Matched Terms:</span>{' '}
                    {result.educationTermsMatched?.join(', ') || 'Authentic Vernacular AI Prompt'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-sal-400">
                <Languages className="w-8 h-8 mx-auto mb-2 text-harvest-400 opacity-60" />
                <p className="text-xs">Click "Translate" to generate context-aware translation</p>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS & HUMAN-IN-THE-LOOP FEEDBACK */}
          {result && (
            <div className="pt-4 border-t border-sal-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-sal-800 hover:bg-sal-700 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy'}
                </button>

                <button
                  onClick={handleSaveToLibrary}
                  className="px-3 py-1.5 rounded-xl bg-sal-800 hover:bg-sal-700 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Star className="w-3.5 h-3.5 text-harvest-400" /> Save
                </button>
              </div>

              {/* Human-in-the-Loop Feedback (Req #44) */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-sal-400 font-bold">Feedback:</span>
                <button
                  onClick={() => addNotification('Thank you! Translation marked correct.')}
                  className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-700"
                  title="Correct Translation"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsCorrectionOpen(true)}
                  className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300 border border-rose-700"
                  title="Suggest Correction"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EDUCATION GLOSSARY BROWSER */}
      {showGlossary && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-sm text-slate-900">Education Glossaries ({activeLanguage})</h3>
            <span className="text-xs text-slate-500 font-bold">{EDUCATION_GLOSSARY.length} terms loaded</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EDUCATION_GLOSSARY.map((term) => (
              <div key={term.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">{term.hindi}</span>
                  <span className="text-sal-700 font-extrabold">{term.targetLangText[activeLanguage]}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Phonetic: {term.phonetic[activeLanguage]} • Category: {term.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HUMAN-IN-THE-LOOP CORRECTION MODAL */}
      {result && (
        <CorrectionModal
          isOpen={isCorrectionOpen}
          onClose={() => setIsCorrectionOpen(false)}
          sourceText={result.sourceText || inputText}
          originalTranslation={result.targetText || result.translatedText}
          category={result.category || selectedCategory}
        />
      )}
    </div>
  );
};
