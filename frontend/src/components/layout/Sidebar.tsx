import React from 'react';
import {
  Home,
  Mic,
  Languages,
  BookOpen,
  Sparkles,
  FileText,
  Image as ImageIcon,
  BookMarked,
  Gamepad2,
  Accessibility,
  Award,
  BarChart3,
  PackageCheck,
  Bot,
  FolderHeart,
  Settings,
  Zap,
  Globe,
  HardDrive,
  HeartHandshake,
  ShieldCheck,
  PlayCircle,
  Activity,
  Cloud,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeLanguage,
    setActiveLanguage,
    effectiveOnline,
    triggerDemoMode,
    setIsAskBhashaSetuOpen,
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: 'Main' },
    { id: 'live-translate', label: 'Live Translate', icon: Mic, badge: 'Voice' },
    { id: 'translation-studio', label: 'Translation Studio', icon: Languages, badge: 'Glossary' },
    { id: 'universal-lesson', label: 'Universal Lesson', icon: Sparkles, badge: 'AI 14-in-1' },
    { id: 'classroom-mode', label: 'Classroom Mode', icon: GraduationCapIcon, badge: 'Full' },
    { id: 'worksheets', label: 'Worksheet Studio', icon: FileText, badge: 'Print A4' },
    { id: 'flashcards', label: 'Flashcards', icon: ImageIcon, badge: 'Ol Chiki' },
    { id: 'stories', label: 'Local Stories', icon: BookMarked, badge: 'Jharkhand' },
    { id: 'learning-games', label: 'Learning Games', icon: Gamepad2, badge: 'Offline' },
    { id: 'everychild', label: 'EveryChild Mode', icon: Accessibility, badge: 'Core' },
    { id: 'nipun-alignment', label: 'NIPUN Alignment', icon: Award, badge: 'FLN' },
    { id: 'analytics', label: 'Teacher Analytics', icon: BarChart3, badge: 'Progress' },
    { id: 'diagnostics', label: 'AI Diagnostics', icon: Activity, badge: '10-Check' },
    { id: 'sync', label: 'Sync Center', icon: Cloud, badge: 'Cloud' },
    { id: 'offline-packs', label: 'Offline Packs', icon: PackageCheck, badge: '1.2 GB' },
    { id: 'my-library', label: 'My Library', icon: FolderHeart, badge: 'Saved' },
    { id: 'teacher-learn', label: 'Learn 10 Words', icon: HeartHandshake, badge: 'Phrases' },
    { id: 'visual-description', label: 'Image to Lesson', icon: LayersIcon, badge: 'AI Vision' },
    { id: 'student-mode', label: 'Student Mode', icon: PlayCircle, badge: 'Kids' },
    { id: 'architecture', label: 'System Architecture', icon: HardDrive, badge: 'Diagram' },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck, badge: 'Sync' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-sal-900 text-white flex flex-col h-screen fixed left-0 top-0 bottom-0 z-30 shadow-elevated border-r border-sal-800 transition-all">
      {/* Brand Header */}
      <div className="p-4 border-b border-sal-800 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-harvest-500 text-sal-950 flex items-center justify-center font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            भाषा
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white leading-tight">
              BhashaSetu <span className="text-harvest-400 font-normal text-xs">AI</span>
            </h1>
            <p className="text-[10px] text-sal-300 font-medium">Vernacular Classroom OS</p>
          </div>
        </button>

        <span
          className={`w-3 h-3 rounded-full ${
            effectiveOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
          }`}
          title={effectiveOnline ? '🟢 Online AI Mode' : '🔵 Offline Classroom Mode'}
        />
      </div>

      {/* Target Language Selector */}
      <div className="p-3 bg-sal-950/60 border-b border-sal-800">
        <label className="text-[10px] uppercase font-bold text-sal-400 mb-1 block px-1 tracking-wider">
          Target Tribal Language
        </label>
        <div className="grid grid-cols-3 gap-1">
          {(['santhali', 'ho', 'mundari'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLanguage(lang)}
              className={`px-2 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeLanguage === lang
                  ? 'bg-harvest-500 text-sal-950 shadow-xs'
                  : 'bg-sal-800/80 text-sal-200 hover:bg-sal-700'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Hackathon 2-Min Demo Trigger */}
      <div className="px-3 pt-3">
        <button
          onClick={triggerDemoMode}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-terracotta-500 to-harvest-500 text-sal-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm hover:brightness-110 active:scale-98 transition-all"
        >
          <Zap className="w-4 h-4 fill-sal-950" /> 2-Min Hackathon Demo
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="text-[10px] uppercase font-bold text-sal-400 px-2 mb-1 tracking-wider">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-harvest-500 text-sal-950 font-bold shadow-md'
                  : 'text-sal-200 hover:bg-sal-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-sal-950' : 'text-sal-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isActive ? 'bg-sal-950/20 text-sal-950' : 'bg-sal-800 text-sal-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick AI Assistant Trigger & Storage Status */}
      <div className="p-3 border-t border-sal-800 bg-sal-950/80 space-y-2">
        <button
          onClick={() => setIsAskBhashaSetuOpen(true)}
          className="w-full py-2 px-3 rounded-xl bg-sal-800 hover:bg-sal-700 text-sal-100 text-xs font-semibold flex items-center justify-between border border-sal-700"
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-harvest-400" />
            <span>Ask BhashaSetu</span>
          </div>
          <span className="text-[10px] bg-harvest-500/20 text-harvest-300 px-1.5 py-0.5 rounded">AI</span>
        </button>

        <div className="px-2 py-1.5 bg-sal-900 rounded-lg border border-sal-800/80 text-[10px] text-sal-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-emerald-400" /> Storage: 1.2 GB
          </span>
          <span className="text-emerald-400 font-bold">Offline Ready ✓</span>
        </div>
      </div>
    </aside>
  );
};

function GraduationCapIcon(props: any) {
  return <Award {...props} />;
}

function LayersIcon(props: any) {
  return <Languages {...props} />;
}
