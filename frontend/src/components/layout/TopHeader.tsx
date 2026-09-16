import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Search,
  Bell,
  Sun,
  Eye,
  Zap,
  Bot,
  CheckCircle2,
  Sparkles,
  Sliders,
  Type,
  Maximize2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GradeLevel } from '../../types';

export const TopHeader: React.FC = () => {
  const {
    isOnline,
    isSimulatedOffline,
    isSyncing,
    effectiveOnline,
    toggleSimulatedOffline,
    triggerManualSync,
    activeGrade,
    setActiveGrade,
    accessibility,
    updateAccessibility,
    setIsSearchOpen,
    setIsAskBhashaSetuOpen,
    notifications,
    markNotificationsRead,
    triggerDemoMode,
    setActiveTab,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const grades: { id: GradeLevel; label: string }[] = [
    { id: 'class_1', label: 'Class 1' },
    { id: 'class_2', label: 'Class 2' },
    { id: 'class_3', label: 'Class 3' },
    { id: 'class_4', label: 'Class 4' },
    { id: 'class_5', label: 'Class 5' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-20 px-6 flex items-center justify-between shadow-xs transition-all">
      {/* Left: Class Grade Selector & Search trigger */}
      <div className="flex items-center gap-3">
        {/* Class Grade Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 px-2">Grade:</span>
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGrade(g.id)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                activeGrade === g.id
                  ? 'bg-sal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Global Search Bar Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs border border-slate-200 w-48 transition-all"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Search lessons, words...</span>
          <kbd className="ml-auto bg-white px-1.5 py-0.5 text-[10px] rounded text-slate-400 border font-mono">⌘K</kbd>
        </button>
      </div>

      {/* Right: Offline Status Badge + Dev Simulation Toggle + Controls */}
      <div className="flex items-center gap-2">
        {/* Developer Offline Simulation Toggle (Req #41) */}
        <button
          onClick={toggleSimulatedOffline}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
            isSimulatedOffline
              ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
          title="Toggle developer offline simulation mode"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-700" />
          <span className="hidden sm:inline">Simulate Offline:</span>
          <span className={`font-bold ${isSimulatedOffline ? 'text-amber-700' : 'text-slate-500'}`}>
            {isSimulatedOffline ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Status Indicator (🟢 Online / 🟠 Syncing / 🔴 Offline) */}
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border shadow-xs transition-all ${
            isSyncing
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : effectiveOnline
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-rose-50 text-rose-800 border-rose-300'
          }`}
        >
          {isSyncing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>🟠 Syncing</span>
            </>
          ) : effectiveOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>🟢 Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-rose-600" />
              <span>🔴 Offline Ready</span>
            </>
          )}

          {/* Sync Button */}
          {effectiveOnline && !isSyncing && (
            <button
              onClick={triggerManualSync}
              className="ml-1 p-0.5 hover:bg-emerald-200/50 rounded-full text-emerald-700"
              title="Sync offline data"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* High Contrast Mode Quick Toggle */}
        <button
          onClick={() => updateAccessibility('highContrast', !accessibility.highContrast)}
          className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
            accessibility.highContrast
              ? 'bg-black text-white border-white'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
          title="Toggle High Contrast Mode"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Large Text Mode Toggle */}
        <button
          onClick={() => updateAccessibility('largeText', !accessibility.largeText)}
          className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
            accessibility.largeText
              ? 'bg-sal-700 text-white border-sal-800'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
          title="Toggle Large Text Mode"
        >
          <Type className="w-4 h-4" />
        </button>

        {/* Lite Mode Toggle (Req #39 Low-end Optimization) */}
        <button
          onClick={() => updateAccessibility('liteMode', !accessibility.liteMode)}
          className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
            accessibility.liteMode
              ? 'bg-harvest-500 text-sal-950 border-harvest-600 font-bold'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
          title="Lite Mode (Disables animations for low-end tablets)"
        >
          <Zap className="w-4 h-4" />
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications((prev) => !prev);
              if (unreadCount > 0) markNotificationsRead();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 relative transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-elevated border border-slate-200 p-3 z-50">
              <div className="flex items-center justify-between border-b pb-2 mb-2">
                <h4 className="font-bold text-xs text-slate-900">Notifications</h4>
                <span className="text-[10px] text-slate-500">BhashaSetu System</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <p className="font-semibold text-slate-800">{n.title}</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
