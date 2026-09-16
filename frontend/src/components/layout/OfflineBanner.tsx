import React from 'react';
import { WifiOff, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineBanner: React.FC = () => {
  const { effectiveOnline, isSimulatedOffline, toggleSimulatedOffline } = useApp();

  if (effectiveOnline) return null;

  return (
    <div className="bg-gradient-to-r from-terracotta-700 via-sal-900 to-terracotta-800 text-white p-3 sm:px-6 rounded-2xl shadow-elevated border border-terracotta-500/40 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-terracotta-500/20 text-terracotta-300 flex items-center justify-center shrink-0 border border-terracotta-400/30">
          <WifiOff className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
              No Internet — You're still ready to teach.
            </h4>
            {isSimulatedOffline && (
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Simulated Offline Mode
              </span>
            )}
          </div>
          <p className="text-xs text-terracotta-100 mt-0.5">
            BhashaSetu AI is running 100% locally from device storage and IndexedDB.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-sal-200 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Offline Lessons ✓
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Translation & Audio ✓
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Worksheets & Flashcards ✓
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> EveryChild Accessibility ✓
            </span>
          </div>
        </div>
      </div>

      {isSimulatedOffline && (
        <button
          onClick={toggleSimulatedOffline}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 transition-all"
        >
          <Sliders className="w-3.5 h-3.5" /> Turn Off Offline Simulation
        </button>
      )}
    </div>
  );
};
