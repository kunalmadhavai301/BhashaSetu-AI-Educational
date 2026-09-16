import React from 'react';
import { HardDrive, ArrowRight, CheckCircle2, Wifi, WifiOff, Layers, Cpu, Database } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-sal-700" /> BhashaSetu System Architecture
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Offline-first PWA, IndexedDB local persistence, WebAssembly / ONNX AI inference, and background synchronization architecture
        </p>
      </div>

      {/* ARCHITECTURE FLOW DIAGRAM CARD */}
      <div className="bg-sal-950 text-white p-8 rounded-3xl border border-sal-800 shadow-elevated space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 font-bold text-xs border border-harvest-500/30">
            End-to-End Offline & Online Flow
          </span>
          <h3 className="text-2xl font-extrabold text-white">Classroom Processing Engine</h3>
        </div>

        {/* FLOW GRAPH */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center">
          <div className="bg-sal-900 p-4 rounded-2xl border border-sal-800 space-y-2">
            <span className="text-2xl">👩‍🏫</span>
            <div className="text-xs font-bold text-white">Teacher Input</div>
            <p className="text-[10px] text-sal-300">Speech / Text / Image</p>
          </div>

          <div className="hidden md:block text-harvest-400 font-bold text-lg">➔</div>

          <div className="bg-sal-900 p-4 rounded-2xl border border-harvest-500/50 space-y-2 shadow-lg">
            <Cpu className="w-6 h-6 text-harvest-400 mx-auto" />
            <div className="text-xs font-bold text-harvest-300">Local AI Engine</div>
            <p className="text-[10px] text-sal-300">Wasm / ONNX / Glossaries</p>
          </div>

          <div className="hidden md:block text-harvest-400 font-bold text-lg">➔</div>

          <div className="bg-sal-900 p-4 rounded-2xl border border-sal-800 space-y-2">
            <span className="text-2xl">👧</span>
            <div className="text-xs font-bold text-white">Vernacular Output</div>
            <p className="text-[10px] text-sal-300">Audio + Ol Chiki Text</p>
          </div>
        </div>

        {/* CONNECTIVITY BRANCHES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-sal-800">
          <div className="bg-sal-900/80 p-6 rounded-2xl border border-emerald-500/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
              <WifiOff className="w-4 h-4" /> Internet Unavailable Mode
            </div>
            <ul className="space-y-1.5 text-xs text-sal-200">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Local IndexedDB Database Reads</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pre-bundled Santhali/Ho Glossaries</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Offline Speech Synthesis Engine</li>
            </ul>
          </div>

          <div className="bg-sal-900/80 p-6 rounded-2xl border border-blue-500/40 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-extrabold text-sm">
              <Wifi className="w-4 h-4" /> Internet Available Mode
            </div>
            <ul className="space-y-1.5 text-xs text-sal-200">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Background Content Pack Sync</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Model Updates & Corrections Review</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> NIPUN Bharat Curriculum Alignment Sync</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
