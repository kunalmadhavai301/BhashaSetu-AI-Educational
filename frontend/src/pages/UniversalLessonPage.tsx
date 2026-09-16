import React, { useState } from 'react';
import {
  Sparkles,
  Eye,
  Headphones,
  Hand,
  BookOpen,
  Edit,
  Save,
  Printer,
  Download,
  Award,
  CheckCircle2,
  Play,
  Volume2,
  FileText,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { lessonGenerator } from '../services/lessonGenerator';
import { UniversalLesson, GradeLevel, Subject } from '../types';
import { MOCK_UNIVERSAL_LESSON } from '../services/mockData';
import { AudioButton } from '../components/shared/AudioButton';
import { NipunBadge } from '../components/shared/NipunBadge';

export const UniversalLessonPage: React.FC = () => {
  const { activeLanguage, activeGrade, addNotification, setActiveTab } = useApp();

  const [promptInput, setPromptInput] = useState('Teach numbers 1 to 10 using Sal leaves to Class 1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<UniversalLesson>(MOCK_UNIVERSAL_LESSON);
  const [activeLessonTab, setActiveLessonTab] = useState<'see' | 'hear' | 'do' | 'read' | 'full'>('see');
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = async () => {
    if (!promptInput.trim()) return;
    setIsGenerating(true);

    setTimeout(async () => {
      const generated = await lessonGenerator.generateLesson(promptInput, activeGrade, 'mathematics', activeLanguage);
      setCurrentLesson(generated);
      setIsGenerating(false);
      addNotification(`Universal 14-in-1 Lesson generated successfully!`);
    }, 1200);
  };

  const handleSave = () => {
    addNotification(`Lesson saved to My Library!`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-harvest-600" /> Universal AI Lesson Generator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generates 14 complete pedagogical components mapped to NIPUN Bharat FLN outcomes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NipunBadge code={currentLesson.nipunOutcomeId || 'FLN-M1.2'} />
          <button
            onClick={() => setActiveTab('classroom-mode')}
            className="px-4 py-2 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> Present Class Mode
          </button>
        </div>
      </div>

      {/* PROMPT GENERATOR INPUT BAR */}
      <div className="bg-gradient-to-r from-sal-900 via-sal-800 to-sal-950 text-white p-6 rounded-3xl border border-sal-700/50 shadow-elevated space-y-4">
        <label className="text-xs font-bold text-harvest-300 uppercase tracking-wider block">
          Enter Lesson Topic / Instruction:
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="e.g. Teach numbers 1 to 10 to Class 1 using Sal leaves..."
            className="flex-1 w-full bg-sal-950 border border-sal-700 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-harvest-400 font-medium"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-harvest-500 hover:bg-harvest-400 text-sal-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" /> Generating 14 Modules...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Universal Lesson
              </>
            )}
          </button>
        </div>
      </div>

      {/* UNIQUE FEATURE: "ONE LESSON, FOUR WAYS" TABS (Req #51) */}
      <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-soft flex items-center justify-around gap-1">
        {[
          { id: 'see', label: '👁 SEE (Pictures & Symbols)', icon: Eye, color: 'text-blue-600' },
          { id: 'hear', label: '🎧 HEAR (Audio & Narration)', icon: Headphones, color: 'text-emerald-600' },
          { id: 'do', label: '✋ DO (Activities & Games)', icon: Hand, color: 'text-amber-600' },
          { id: 'read', label: '📖 READ (Dual Language)', icon: BookOpen, color: 'text-purple-600' },
          { id: 'full', label: '📋 All 14 Modules', icon: FileText, color: 'text-sal-700' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeLessonTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveLessonTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-sal-800 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-harvest-400' : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* LESSON DISPLAY CONTAINER */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        {/* Lesson Title & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sal-700 bg-sal-100 px-2.5 py-0.5 rounded-full">
              {currentLesson.grade} • {currentLesson.subject} • {currentLesson.targetLang}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{currentLesson.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> {isEditing ? 'Done Editing' : 'Edit Lesson'}
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-xl bg-sal-700 hover:bg-sal-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" /> Save Lesson
            </button>
          </div>
        </div>

        {/* TAB CONTENT: 👁 SEE */}
        {(activeLessonTab === 'see' || activeLessonTab === 'full') && (
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b pb-2">
              <Eye className="w-4 h-4 text-blue-600" /> 1. Visual Examples & Symbols (SEE)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {currentLesson.visualExamples.map((vis, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-center space-y-2">
                  <div className="text-3xl">{vis.symbol}</div>
                  <div className="text-xs font-extrabold text-blue-950">{vis.title}</div>
                  <span className="text-[10px] text-slate-500 font-medium block">{vis.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: 🎧 HEAR */}
        {(activeLessonTab === 'hear' || activeLessonTab === 'full') && (
          <div className="space-y-4 pt-4">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b pb-2">
              <Headphones className="w-4 h-4 text-emerald-600" /> 2. Audio Narration & Pronunciation (HEAR)
            </h4>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="text-xs font-bold text-emerald-950">
                Audio Text: "{currentLesson.audioNarrationText}"
              </div>
              <AudioButton text={currentLesson.audioNarrationText} langCode="hi-IN" size="lg" showSpeedControls />
            </div>
          </div>
        )}

        {/* TAB CONTENT: ✋ DO */}
        {(activeLessonTab === 'do' || activeLessonTab === 'full') && (
          <div className="space-y-4 pt-4">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b pb-2">
              <Hand className="w-4 h-4 text-amber-600" /> 3. Classroom Activity & Physical Game (DO)
            </h4>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <h5 className="font-bold text-xs text-amber-950">{currentLesson.interactiveActivity.title}</h5>
              <p className="text-xs text-slate-700">{currentLesson.interactiveActivity.instructions}</p>
              <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc font-medium">
                {currentLesson.interactiveActivity.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 📖 READ */}
        {(activeLessonTab === 'read' || activeLessonTab === 'full') && (
          <div className="space-y-4 pt-4">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b pb-2">
              <BookOpen className="w-4 h-4 text-purple-600" /> 4. Dual Language Explanations (READ)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Hindi Explanation:</span>
                <p className="text-xs font-semibold text-slate-800">{currentLesson.hindiExplanation}</p>
              </div>
              <div className="p-4 rounded-2xl bg-sal-50 border border-sal-200 space-y-1">
                <span className="text-[10px] font-bold text-sal-700 uppercase">
                  {currentLesson.targetLang} Vernacular:
                </span>
                <p className="text-xs font-bold text-sal-950">{currentLesson.tribalExplanation}</p>
                <div className="text-[10px] text-slate-500 font-mono">Phonetic: {currentLesson.phoneticScript}</div>
              </div>
            </div>
          </div>
        )}

        {/* FULL 14-MODULE BREAKDOWN EXTRA SECTIONS */}
        {activeLessonTab === 'full' && (
          <div className="space-y-6 pt-6 border-t border-slate-200">
            {/* Quiz & Assessment */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-3">5. Quick Quiz & Assessment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentLesson.quiz.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="font-bold text-slate-900">{idx + 1}. {q.question}</div>
                    <div className="space-y-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-1.5 rounded-lg text-xs font-semibold ${
                            oIdx === q.answerIndex
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {opt} {oIdx === q.answerIndex && '✓ Correct'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility & Cultural Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2 text-xs">
                <h5 className="font-bold text-blue-950">EveryChild Accessibility Alternatives</h5>
                <ul className="space-y-1 text-slate-700">
                  <li><strong>Visual:</strong> {currentLesson.accessibilityAlternatives.visual}</li>
                  <li><strong>Hearing:</strong> {currentLesson.accessibilityAlternatives.hearing}</li>
                  <li><strong>Communication:</strong> {currentLesson.accessibilityAlternatives.communication}</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                <h5 className="font-bold text-amber-950">Jharkhand Local Cultural Integration</h5>
                <ul className="space-y-1 text-slate-700 list-disc pl-4">
                  {currentLesson.culturalExamples.map((ce, i) => (
                    <li key={i}>{ce}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
