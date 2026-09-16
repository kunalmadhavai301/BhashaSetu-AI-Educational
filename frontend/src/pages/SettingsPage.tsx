import React from 'react';
import { Settings, Moon, Sun, Type, Zap, RefreshCw, Trash2, Database, Shield, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    activeLanguage,
    setActiveLanguage,
    accessibility,
    updateAccessibility,
    addNotification,
  } = useApp();

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-700" /> Platform & Accessibility Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure vernacular defaults, accessibility modes, low-end device optimization, and offline storage
        </p>
      </div>

      {/* SETTINGS SECTIONS */}
      <div className="space-y-6">
        {/* Section 1: Vernacular Language Defaults */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b pb-3">
            <Globe className="w-4 h-4 text-sal-700" /> Default Vernacular Language
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['santhali', 'ho', 'mundari'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`p-4 rounded-2xl border text-left font-bold capitalize transition-all ${
                  activeLanguage === lang
                    ? 'bg-sal-700 text-white border-sal-800 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sal-600'
                }`}
              >
                <div className="text-sm font-extrabold">{lang}</div>
                <span className="text-[10px] opacity-80 font-normal">
                  {lang === 'santhali' ? 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)' : lang === 'ho' ? 'Warang Citi' : 'Mundari Bani'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Display & Accessibility */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b pb-3">
            <Sun className="w-4 h-4 text-amber-600" /> Display & Accessibility Modes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">High Contrast Mode</div>
                <span className="text-[10px] text-slate-500">Black background with high contrast borders</span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={(e) => updateAccessibility('highContrast', e.target.checked)}
                className="w-5 h-5 accent-sal-700"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Large Text Mode</div>
                <span className="text-[10px] text-slate-500">1.25x font size multiplier for low vision</span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.largeText}
                onChange={(e) => updateAccessibility('largeText', e.target.checked)}
                className="w-5 h-5 accent-sal-700"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Lite Mode (Low-End Android Optimization)</div>
                <span className="text-[10px] text-slate-500">Disables animations for 2 GB RAM devices</span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.liteMode}
                onChange={(e) => updateAccessibility('liteMode', e.target.checked)}
                className="w-5 h-5 accent-sal-700"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Speech Playback Speed</div>
                <span className="text-[10px] text-slate-500">Default rate: {accessibility.speechSpeed}x</span>
              </div>
              <select
                value={accessibility.speechSpeed}
                onChange={(e) => updateAccessibility('speechSpeed', parseFloat(e.target.value))}
                className="text-xs font-bold bg-white border border-slate-300 rounded-lg px-2.5 py-1"
              >
                <option value={0.5}>0.5x (Slow Speech)</option>
                <option value={0.75}>0.75x</option>
                <option value={1.0}>1.0x (Normal)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
