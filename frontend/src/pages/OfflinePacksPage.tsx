import React, { useState } from 'react';
import { PackageCheck, Download, HardDrive, CheckCircle2, RefreshCw, Trash2, Database } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LANGUAGE_PACKS } from '../services/mockData';
import { LanguagePack } from '../types';

export const OfflinePacksPage: React.FC = () => {
  const { addNotification, triggerManualSync, isSyncing } = useApp();
  const [packs, setPacks] = useState<LanguagePack[]>(LANGUAGE_PACKS);

  const handleDownload = (id: string) => {
    setPacks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, downloaded: true, lastUpdated: 'Just now' } : p))
    );
    addNotification(`Language Pack for ${id.toUpperCase()} downloaded successfully to local IndexedDB!`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-700" /> Offline Language Pack Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Download once, teach offline forever without internet connectivity
          </p>
        </div>

        <button
          onClick={triggerManualSync}
          disabled={isSyncing}
          className="px-4 py-2 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} /> Sync Model Updates
        </button>
      </div>

      {/* STORAGE OVERVIEW CARD */}
      <div className="bg-gradient-to-r from-sal-900 via-sal-800 to-sal-950 text-white p-6 rounded-3xl border border-sal-700/50 shadow-elevated space-y-4">
        <div className="flex items-center justify-between border-b border-sal-800 pb-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm text-white">Device Offline Storage Allocation</h3>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-sal-900 px-3 py-1 rounded-full border border-sal-700">
            Offline Ready ✓
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span>Storage Used: 1.2 GB</span>
            <span className="text-sal-300">Available Storage: 800 MB</span>
          </div>
          <div className="w-full bg-sal-950 h-3 rounded-full overflow-hidden border border-sal-800">
            <div className="bg-emerald-400 h-full w-[60%]" />
          </div>
          <div className="text-[10px] text-sal-300 flex justify-between pt-1">
            <span>Last Synced: Today, 10:30 AM</span>
            <span>Device Target: Android 9+ / 2 GB RAM Tablet</span>
          </div>
        </div>
      </div>

      {/* PACKS LIST */}
      <div className="space-y-4">
        {packs.map((pack) => (
          <div key={pack.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-slate-900">{pack.name}</h3>
                  <span className="text-base font-bold text-sal-800 font-olchiki">({pack.nativeName})</span>
                  {pack.downloaded && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Installed ✓
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Native Script: {pack.script} • Size: {pack.sizeMB} MB
                </p>
              </div>

              {pack.downloaded ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">Ready for offline use</span>
                </div>
              ) : (
                <button
                  onClick={() => handleDownload(pack.id)}
                  className="px-5 py-2.5 rounded-2xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" /> Download Offline Pack ({pack.sizeMB} MB)
                </button>
              )}
            </div>

            {/* Included Content Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-sal-50 border border-sal-200">
                <span className="font-bold text-slate-400 text-[10px] uppercase block">Vocabulary</span>
                <span className="text-sm font-extrabold text-sal-900">{pack.vocabularyCount} words</span>
              </div>

              <div className="p-3 rounded-2xl bg-harvest-50 border border-harvest-200">
                <span className="font-bold text-slate-400 text-[10px] uppercase block">Lessons</span>
                <span className="text-sm font-extrabold text-harvest-950">{pack.lessonsCount} lessons</span>
              </div>

              <div className="p-3 rounded-2xl bg-terracotta-50 border border-terracotta-200">
                <span className="font-bold text-slate-400 text-[10px] uppercase block">Worksheets</span>
                <span className="text-sm font-extrabold text-terracotta-950">{pack.worksheetsCount} worksheets</span>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="font-bold text-slate-400 text-[10px] uppercase block">Translation Engine</span>
                <span className="text-sm font-extrabold text-purple-950">✓ Offline Ready</span>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="font-bold text-slate-400 text-[10px] uppercase block">Speech Audio</span>
                <span className="text-sm font-extrabold text-blue-950">✓ TTS Engine</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
