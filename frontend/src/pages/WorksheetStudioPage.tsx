import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  Download,
  Save,
  RotateCcw,
  Edit,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { worksheetGenerator } from '../services/worksheetGenerator';
import { Worksheet } from '../types';
import { MOCK_WORKSHEETS } from '../services/mockData';

export const WorksheetStudioPage: React.FC = () => {
  const { activeLanguage, activeGrade, addNotification } = useApp();

  const [topic, setTopic] = useState('Numbers 1-10 & Sal Leaf Counting');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Easy' | 'Medium' | 'Advanced'>('Easy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [worksheet, setWorksheet] = useState<Worksheet>(MOCK_WORKSHEETS[0]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(async () => {
      const generated = await worksheetGenerator.generateWorksheet(topic, activeGrade, 'mathematics', activeLanguage, difficulty);
      setWorksheet(generated);
      setIsGenerating(false);
      addNotification('Printable A4 Worksheet generated successfully!');
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER BAR (NO PRINT) */}
      <div className="no-print bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-terracotta-600" /> Printable Worksheet Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generates A4 bilingual worksheets for primary classrooms ({activeGrade} • {activeLanguage})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" /> Print A4 Worksheet
          </button>
        </div>
      </div>

      {/* GENERATOR CONTROLS BAR (NO PRINT) */}
      <div className="no-print bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-elevated space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-terracotta-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Difficulty Level:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="Beginner">⭐ Beginner</option>
              <option value="Easy">⭐⭐ Easy</option>
              <option value="Medium">⭐⭐⭐ Medium</option>
              <option value="Advanced">⭐⭐⭐⭐ Advanced</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-harvest-400" />
              {isGenerating ? 'Generating Worksheet...' : 'Generate New Worksheet'}
            </button>
          </div>
        </div>
      </div>

      {/* A4 PRINTABLE WORKSHEET CONTAINER */}
      <div className="a4-page bg-white p-8 sm:p-12 rounded-3xl border-2 border-slate-300 shadow-elevated space-y-8 max-w-4xl mx-auto">
        {/* Worksheet School Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-sal-800 uppercase tracking-widest">
              BhashaSetu Primary Education • Jharkhand
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{worksheet.title}</h1>
            <p className="text-xs text-slate-600 font-medium">
              Grade: {worksheet.grade} • Subject: {worksheet.subject} • Language: Hindi + {worksheet.targetLang}
            </p>
          </div>

          <div className="text-right text-xs font-bold text-slate-700 space-y-1">
            <div>Student Name: ___________________</div>
            <div>Date: ____________ Rolls: ______</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
          <div className="font-bold text-slate-900">Hindi: {worksheet.instructionsHindi}</div>
          <div className="font-bold text-sal-900">Santhali: {worksheet.instructionsTarget}</div>
        </div>

        {/* Worksheet Questions Grid */}
        <div className="space-y-6">
          {worksheet.questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-extrabold text-slate-900">
                    Q{idx + 1}. {q.questionHindi}
                  </div>
                  <div className="text-xs font-bold text-sal-950">
                    {q.questionTarget} <span className="font-mono text-slate-500 text-[11px]">({q.phonetic})</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">
                  {q.type}
                </span>
              </div>

              {/* Question Visuals / Tracing / Choices */}
              {q.symbolOrImage && (
                <div className="p-4 bg-sal-50 rounded-2xl border border-sal-200 text-center text-3xl font-extrabold tracking-widest text-sal-900">
                  {q.symbolOrImage}
                </div>
              )}

              {q.options && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white">
                      [ &nbsp; ] {opt}
                    </div>
                  ))}
                </div>
              )}

              {q.type === 'trace' && (
                <div className="py-6 border-2 border-dashed border-slate-300 rounded-2xl text-center text-4xl text-slate-300 font-bold tracking-widest select-none">
                  ᱑ &nbsp;&nbsp; ᱒ &nbsp;&nbsp; ᱓ &nbsp;&nbsp; ᱔ &nbsp;&nbsp; ᱕
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Teacher Signature & Score Footer */}
        <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-xs font-bold text-slate-600">
          <div>Teacher Score: ______ / 10</div>
          <div>Teacher Signature: ___________________</div>
        </div>
      </div>
    </div>
  );
};
