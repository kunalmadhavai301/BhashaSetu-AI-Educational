import React, { useState } from 'react';
import { FolderHeart, BookOpen, FileText, Image as ImageIcon, BookMarked, Star, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_UNIVERSAL_LESSON, MOCK_WORKSHEETS, MOCK_STORIES } from '../services/mockData';

export const MyLibraryPage: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeTabFolder, setActiveTabFolder] = useState<'lessons' | 'worksheets' | 'stories' | 'favorites'>('lessons');

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-sal-700" /> Teacher Content Library ("My Library")
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize, view, edit, and duplicate your saved offline teaching assets
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {(['lessons', 'worksheets', 'stories', 'favorites'] as const).map((folder) => (
            <button
              key={folder}
              onClick={() => setActiveTabFolder(folder)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTabFolder === folder ? 'bg-sal-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* FOLDER CONTENTS */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
        {activeTabFolder === 'lessons' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-sal-50 border border-sal-200 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-sal-950">{MOCK_UNIVERSAL_LESSON.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{MOCK_UNIVERSAL_LESSON.learningObjective}</p>
              </div>
              <button
                onClick={() => setActiveTab('universal-lesson')}
                className="px-4 py-2 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-bold text-xs"
              >
                Open Lesson
              </button>
            </div>
          </div>
        )}

        {activeTabFolder === 'worksheets' && (
          <div className="space-y-3">
            {MOCK_WORKSHEETS.map((ws) => (
              <div key={ws.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{ws.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Difficulty: {ws.difficulty} • Printable A4 Format</p>
                </div>
                <button
                  onClick={() => setActiveTab('worksheets')}
                  className="px-4 py-2 rounded-xl bg-terracotta-600 text-white font-bold text-xs"
                >
                  Print Worksheet
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTabFolder === 'stories' && (
          <div className="space-y-3">
            {MOCK_STORIES.map((st) => (
              <div key={st.id} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-emerald-950">{st.titleHindi}</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">{st.titleTarget} ({st.theme})</p>
                </div>
                <button
                  onClick={() => setActiveTab('stories')}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Read Story
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
