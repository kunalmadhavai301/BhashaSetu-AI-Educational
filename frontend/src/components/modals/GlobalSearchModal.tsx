import React, { useState } from 'react';
import { Search, X, Sparkles, BookOpen, FileText, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EDUCATION_GLOSSARY, MOCK_FLASHCARDS, MOCK_STORIES } from '../../services/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveTab, activeLanguage } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredWords = EDUCATION_GLOSSARY.filter(
    (w) =>
      w.hindi.includes(query) ||
      (w.targetLangText[activeLanguage] && w.targetLangText[activeLanguage].includes(query)) ||
      (w.phonetic[activeLanguage] && w.phonetic[activeLanguage].toLowerCase().includes(query.toLowerCase()))
  );

  const filteredFlashcards = MOCK_FLASHCARDS.filter(
    (f) => f.hindi.includes(query) || f.target.includes(query) || f.phonetic.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStories = MOCK_STORIES.filter(
    (s) => s.titleHindi.includes(query) || s.titleTarget.includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-elevated border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, vocabulary, stories, flashcards in Hindi or Santhali..."
            className="w-full text-sm font-medium bg-transparent focus:outline-none text-slate-900"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-sal-500 opacity-60" />
              <p className="text-xs font-semibold text-slate-600">Type a keyword to search across offline library</p>
              <p className="text-[11px] text-slate-400 mt-1">Try: "एक", "पेड़", "गाय", "Counting", "Sal Tree"</p>
            </div>
          ) : (
            <>
              {/* Words Result */}
              {filteredWords.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Glossary Words</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredWords.slice(0, 4).map((w) => (
                      <div
                        key={w.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setActiveTab('translation-studio');
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-sal-50 border border-slate-200 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900">{w.hindi}</span>
                          <span className="text-sal-700 font-extrabold">{w.targetLangText[activeLanguage]}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{w.phonetic[activeLanguage]} ({w.category})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flashcards Result */}
              {filteredFlashcards.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Flashcards</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredFlashcards.slice(0, 4).map((fc) => (
                      <div
                        key={fc.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setActiveTab('flashcards');
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-sal-50 border border-slate-200 cursor-pointer flex items-center gap-3"
                      >
                        <span className="text-2xl">{fc.symbolOrImage}</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{fc.hindi} → {fc.target}</div>
                          <span className="text-[10px] text-slate-400">{fc.phonetic}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories Result */}
              {filteredStories.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Stories</h4>
                  {filteredStories.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveTab('stories');
                      }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-sal-50 border border-slate-200 cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{s.titleHindi}</h5>
                        <p className="text-[10px] text-sal-700 font-semibold">{s.titleTarget}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
