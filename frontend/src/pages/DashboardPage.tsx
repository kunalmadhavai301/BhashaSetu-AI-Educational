import React from 'react';
import {
  Mic,
  Sparkles,
  FileText,
  Image as ImageIcon,
  BookMarked,
  Gamepad2,
  Accessibility,
  PackageCheck,
  Languages,
  HardDrive,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Play,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_UNIVERSAL_LESSON, MOCK_WORKSHEETS, MOCK_STUDENTS } from '../services/mockData';
import { GradeLevel } from '../types';

export const DashboardPage: React.FC = () => {
  const { setActiveTab, activeLanguage, activeGrade, setActiveGrade } = useApp();

  const quickActions = [
    { label: 'Translate Voice', icon: Mic, tab: 'live-translate', color: 'bg-sal-700 text-white' },
    { label: 'Universal Lesson', icon: Sparkles, tab: 'universal-lesson', color: 'bg-harvest-500 text-sal-950 font-bold' },
    { label: 'Worksheet Studio', icon: FileText, tab: 'worksheets', color: 'bg-terracotta-600 text-white' },
    { label: 'Flashcard Studio', icon: ImageIcon, tab: 'flashcards', color: 'bg-blue-600 text-white' },
    { label: 'Create Story', icon: BookMarked, tab: 'stories', color: 'bg-emerald-700 text-white' },
    { label: 'Learning Games', icon: Gamepad2, tab: 'learning-games', color: 'bg-purple-600 text-white' },
    { label: 'Accessibility Mode', icon: Accessibility, tab: 'everychild', color: 'bg-amber-600 text-white' },
    { label: 'Offline Content', icon: PackageCheck, tab: 'offline-packs', color: 'bg-slate-800 text-white' },
  ];

  const grades: { id: GradeLevel; label: string }[] = [
    { id: 'class_1', label: 'Class 1' },
    { id: 'class_2', label: 'Class 2' },
    { id: 'class_3', label: 'Class 3' },
    { id: 'class_4', label: 'Class 4' },
    { id: 'class_5', label: 'Class 5' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* GREETING HERO CARD */}
      <div className="bg-gradient-to-r from-sal-900 via-sal-800 to-sal-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-sal-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-500/30 mb-2">
            ☀️ Primary Education OS • Jharkhand
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Good Morning, Teacher Kunal!</h2>
          <p className="text-xs sm:text-sm text-sal-200 mt-1">
            Today's Target Vernacular: <span className="font-bold text-harvest-400 capitalize">{activeLanguage} ( Ol Chiki ᱚᱞ ᱪᱤᱠᱤ )</span>
          </p>
        </div>

        {/* TODAY'S CLASSES TABS */}
        <div className="bg-sal-950/80 p-1.5 rounded-2xl border border-sal-700/80 flex items-center gap-1">
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGrade(g.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeGrade === g.id
                  ? 'bg-harvest-500 text-sal-950 shadow-md'
                  : 'text-sal-300 hover:text-white hover:bg-sal-800'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickActions.map((act, i) => {
            const Icon = act.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(act.tab)}
                className={`p-3.5 rounded-2xl shadow-soft hover:shadow-elevated transition-all flex flex-col items-center text-center gap-2 border border-slate-200/60 active:scale-95 ${act.color}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-bold leading-tight">{act.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* DASHBOARD WIDGET CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget 1: Today's Lessons & Classroom Mode */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sal-600" /> Today's Scheduled Lesson
            </h4>
            <span className="text-[10px] bg-sal-100 text-sal-800 font-bold px-2 py-0.5 rounded-full">
              Grade 1 Math
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sal-50 border border-sal-200 space-y-2">
            <div className="text-xs font-bold text-sal-900">{MOCK_UNIVERSAL_LESSON.title}</div>
            <p className="text-[11px] text-slate-600 line-clamp-2">{MOCK_UNIVERSAL_LESSON.learningObjective}</p>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-sal-700">14 AI Modules Ready</span>
              <button
                onClick={() => setActiveTab('classroom-mode')}
                className="px-3 py-1.5 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                <Play className="w-3 h-3 fill-white" /> Start Class Mode
              </button>
            </div>
          </div>
        </div>

        {/* Widget 2: Student Progress & Mastery */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-terracotta-600" /> Student Progress ({activeGrade})
            </h4>
            <button onClick={() => setActiveTab('analytics')} className="text-xs font-bold text-sal-700">
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {MOCK_STUDENTS.slice(0, 3).map((st) => (
              <div key={st.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">{st.pseudonym}</div>
                  <span className="text-[10px] text-slate-400 capitalize">{st.preferredLang} • {st.completedActivities} activities</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-sal-700">Lvl {st.learningLevel}/10</div>
                  <span className="text-[9px] text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Languages Available & Offline Storage */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-purple-600" /> Offline Language Storage
            </h4>
            <button onClick={() => setActiveTab('offline-packs')} className="text-xs font-bold text-sal-700">
              Manage Packs
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-purple-900">
              <span>Santhali ( Ol Chiki )</span>
              <span className="text-emerald-700">Installed ✓</span>
            </div>
            <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
              <div className="bg-sal-600 h-full w-[60%]" />
            </div>
            <div className="flex justify-between text-[10px] text-purple-800 font-medium">
              <span>Storage Used: 1.2 GB</span>
              <span>Available: 800 MB</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between">
            <div>
              <div className="font-bold text-amber-900">Ho & Mundari Packs</div>
              <span className="text-[10px] text-amber-700">Ready for single-tap download</span>
            </div>
            <button
              onClick={() => setActiveTab('offline-packs')}
              className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* SAVED WORKSHEETS & RECENT LESSONS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Saved Worksheets</h4>
            <button onClick={() => setActiveTab('worksheets')} className="text-xs font-bold text-sal-700 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Create New
            </button>
          </div>

          {MOCK_WORKSHEETS.map((ws) => (
            <div key={ws.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">{ws.title}</div>
                <span className="text-[10px] text-slate-500">{ws.difficulty} • Printable A4</span>
              </div>
              <button
                onClick={() => setActiveTab('worksheets')}
                className="px-3 py-1.5 rounded-xl bg-terracotta-600 text-white font-bold text-xs"
              >
                Print PDF
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Recently Used Lessons</h4>
            <button onClick={() => setActiveTab('universal-lesson')} className="text-xs font-bold text-sal-700">
              Open Library
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">Numbers 1-10 with Sal Leaves</div>
              <span className="text-[10px] text-slate-500">Language: Santhali • Class 1 Math</span>
            </div>
            <button
              onClick={() => setActiveTab('universal-lesson')}
              className="px-3 py-1.5 rounded-xl bg-sal-700 text-white font-bold text-xs"
            >
              Open Lesson
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
