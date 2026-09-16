import React, { useState } from 'react';
import { RefreshCw, Cloud, Database, CheckCircle2, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SyncCenterPage: React.FC = () => {
  const { isSyncing, triggerManualSync, addNotification, effectiveOnline } = useApp();

  const [queueCount, setQueueCount] = useState(3);
  const [syncPaused, setSyncPaused] = useState(false);

  const handleClearQueue = () => {
    setQueueCount(0);
    addNotification('Offline sync queue cleared.');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-600" /> Cloud Sync Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automatic background synchronization of offline teacher lessons, worksheets, and translation corrections
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSyncPaused(!syncPaused)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              syncPaused ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {syncPaused ? 'Resume Sync' : 'Pause Sync'}
          </button>

          <button
            onClick={triggerManualSync}
            disabled={isSyncing || syncPaused}
            className="px-5 py-2.5 rounded-2xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Synchronizing...' : 'Sync Now'}
          </button>
        </div>
      </div>

      {/* SYNC METRICS CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Pending Upload Queue</span>
            <ArrowUpRight className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{queueCount} Items</div>
          <span className="text-[10px] text-slate-500">Teacher Corrections & Lessons</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Model Updates</span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-sal-700">v2.4 (Ol Chiki)</div>
          <span className="text-[10px] text-emerald-600 font-bold">Latest Version Downloaded</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Network Status</span>
            <Cloud className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-700">
            {effectiveOnline ? '🟢 Online' : '🔴 Offline'}
          </div>
          <span className="text-[10px] text-slate-500">Auto-sync on connection restore</span>
        </div>
      </div>

      {/* QUEUED ITEMS TABLE */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-extrabold text-sm text-slate-900">Queued Sync Items</h3>
          <button onClick={handleClearQueue} className="text-xs font-bold text-slate-500 hover:text-slate-800">
            Clear Queue
          </button>
        </div>

        {queueCount > 0 ? (
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">Translation Correction: "Mit" → "Mit sakam"</span>
                <span className="text-[10px] text-slate-400 block">Category: Mathematics</span>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">Queued</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">Universal Lesson: Counting Numbers 1 to 10</span>
                <span className="text-[10px] text-slate-400 block">Class 1 Math</span>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">Queued</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs font-semibold">
            ✓ Sync Queue Empty. All offline data synchronized.
          </div>
        )}
      </div>
    </div>
  );
};
