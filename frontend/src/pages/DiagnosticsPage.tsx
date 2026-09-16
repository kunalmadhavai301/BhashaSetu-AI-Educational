import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Cpu,
  Wifi,
  WifiOff,
  Database,
  Volume2,
  Mic,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';

export const DiagnosticsPage: React.FC = () => {
  const { isOnline, isSimulatedOffline, effectiveOnline, triggerManualSync } = useApp();

  const [isRunning, setIsRunning] = useState(false);
  const [healthInfo, setHealthInfo] = useState<{ connected: boolean; model: string; latencyMs: number; message: string } | null>(null);
  const [diagnostics, setDiagnostics] = useState<{ overall: string; results: any[] }>({
    overall: 'CHECKING',
    results: [],
  });

  const runFullDiagnostics = async () => {
    setIsRunning(true);
    const health = await apiService.checkHealth();
    setHealthInfo(health);

    const diag = await apiService.runDiagnostics();
    setDiagnostics(diag);
    setIsRunning(false);
  };

  useEffect(() => {
    runFullDiagnostics();
  }, [effectiveOnline]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PASS':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PASS
          </span>
        );
      case 'WARNING':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> WARNING
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 font-extrabold text-xs flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> FAILED
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-sal-700" /> AI Model Status & System Diagnostics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            10-Point System Health Check for Gemini API, Vernacular Engines, TTS, and IndexedDB
          </p>
        </div>

        <button
          onClick={runFullDiagnostics}
          disabled={isRunning}
          className="px-5 py-2.5 rounded-2xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          {isRunning ? 'Testing 10 Components...' : 'Run Full AI Diagnostics'}
        </button>
      </div>

      {/* GEMINI MODEL HEALTH CARD (Req #9) */}
      <div className="bg-gradient-to-r from-sal-900 via-sal-800 to-sal-950 text-white p-8 rounded-3xl border border-sal-700/50 shadow-elevated space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sal-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-harvest-500 text-sal-950 flex items-center justify-center font-extrabold text-xl shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Gemini Model Status & Config</h3>
              <p className="text-xs text-sal-200 mt-0.5">
                Model Configured: <span className="text-harvest-400 font-bold font-mono">gemini-3.6-flash</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {healthInfo?.connected ? (
              <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-sal-950 font-extrabold text-xs shadow-md flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sal-950" /> Gemini API Connected ({healthInfo.latencyMs}ms)
              </span>
            ) : (
              <span className="px-4 py-1.5 rounded-full bg-amber-500 text-sal-950 font-extrabold text-xs shadow-md flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-sal-950" /> Offline Local Engine Active
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-sal-900/90 border border-sal-800">
            <span className="text-sal-400 font-bold block text-[10px] uppercase">Backend Endpoint</span>
            <span className="font-extrabold text-white">http://localhost:5000</span>
          </div>

          <div className="p-4 rounded-2xl bg-sal-900/90 border border-sal-800">
            <span className="text-sal-400 font-bold block text-[10px] uppercase">Primary LLM</span>
            <span className="font-extrabold text-harvest-300 font-mono">gemini-3.6-flash</span>
          </div>

          <div className="p-4 rounded-2xl bg-sal-900/90 border border-sal-800">
            <span className="text-sal-400 font-bold block text-[10px] uppercase">Response Format</span>
            <span className="font-extrabold text-white">Structured JSON</span>
          </div>

          <div className="p-4 rounded-2xl bg-sal-900/90 border border-sal-800">
            <span className="text-sal-400 font-bold block text-[10px] uppercase">Offline Fallback</span>
            <span className="font-extrabold text-emerald-400">IndexedDB Wasm</span>
          </div>
        </div>
      </div>

      {/* 10-COMPONENT DIAGNOSTICS GRID (Req #10) */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-extrabold text-base text-slate-900">10-Point Diagnostic Checklist</h3>
          <span className="text-xs font-extrabold text-sal-700 bg-sal-100 px-3 py-1 rounded-full">
            Overall: {diagnostics.overall}
          </span>
        </div>

        <div className="space-y-3">
          {diagnostics.results.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-extrabold text-slate-900">
                  {item.id}. {item.name}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">{item.details}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {getStatusBadge(item.status)}
                <button
                  onClick={runFullDiagnostics}
                  className="px-3 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold"
                >
                  Retry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
