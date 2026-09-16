import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  BookOpen,
  Database,
  Sliders,
  Send,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { dbManager } from '../services/indexedDB';
import { EDUCATION_GLOSSARY } from '../services/mockData';
import { VocabularyTerm, TranslationFeedback } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { addNotification, activeLanguage } = useApp();

  // Authentication State (Req: username: kunal, password: kunal123)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Controls State
  const [activeModel, setActiveModel] = useState('gemini-3.6-flash');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [availableModels, setAvailableModels] = useState<string[]>(['gemini-3.6-flash', 'gemini-2.5-flash-latest', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-001']);
  const [configStatus, setConfigStatus] = useState('');

  // Live Model Tester
  const [testPrompt, setTestPrompt] = useState('बच्चों, अपनी किताब खोलो और 3 सेब गिनो।');
  const [isTestingModel, setIsTestingModel] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  // Glossary Manager State
  const [glossary, setGlossary] = useState<VocabularyTerm[]>(EDUCATION_GLOSSARY);
  const [newHindi, setNewHindi] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newCategory, setNewCategory] = useState('Mathematics');

  // Corrections Feedback Queue
  const [corrections, setCorrections] = useState<TranslationFeedback[]>([
    {
      id: 'fb_101',
      sourceText: 'किताब खोलो',
      originalTranslation: 'ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ',
      suggestedCorrection: 'ᱯᱩᱛᱷᱤ ᱚᱰᱚᱠ ᱢᱮ (Open and extract book)',
      targetLang: 'santhali',
      category: 'Classroom instructions',
      timestamp: 'Today, 09:15 AM',
      status: 'pending',
    },
    {
      id: 'fb_102',
      sourceText: 'दो और तीन',
      originalTranslation: 'ᱵᱟᱨ ᱟᱨ ᱯᱮ',
      suggestedCorrection: 'ᱵᱟᱨ ᱥᱟᱶᱛᱮ ᱯᱮ (Two together with three)',
      targetLang: 'santhali',
      category: 'Mathematics',
      timestamp: 'Yesterday, 04:30 PM',
      status: 'pending',
    },
  ]);

  // Load backend model config on mount
  useEffect(() => {
    fetchModelConfig();
  }, []);

  const fetchModelConfig = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ai/config');
      if (res.ok) {
        const data = await res.json();
        if (data.model) setActiveModel(data.model);
        if (data.availableModels) setAvailableModels(data.availableModels);
      }
    } catch {
      console.warn('Backend server not reachable for model config');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'kunal' && password.trim() === 'kunal123') {
      setIsAuthenticated(true);
      setAuthError('');
      addNotification('Admin authenticated successfully as kunal');
    } else {
      setAuthError('Invalid credentials! Username is "kunal" and Password is "kunal123".');
    }
  };

  const handleSaveModelConfig = async () => {
    setConfigStatus('Updating AI model configuration...');
    try {
      const res = await fetch('http://localhost:5000/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: activeModel, apiKey: apiKeyInput }),
      });
      if (res.ok) {
        setConfigStatus(`✓ Gemini model successfully updated to ${activeModel}!`);
        addNotification(`AI Model switched to ${activeModel}`);
      } else {
        setConfigStatus('✕ Failed to update model on backend.');
      }
    } catch {
      setConfigStatus('✕ Backend server unreachable.');
    }
  };

  const handleTestModel = async () => {
    if (!testPrompt.trim()) return;
    setIsTestingModel(true);
    setTestResult(null);
    try {
      const res = await fetch('http://localhost:5000/api/ai/test-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: testPrompt }),
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ success: false, error: err.message });
    }
    setIsTestingModel(false);
  };

  const handleAddGlossaryTerm = async () => {
    if (!newHindi.trim() || !newTarget.trim()) return;
    const newTerm: VocabularyTerm = {
      id: `custom_${Date.now()}`,
      category: newCategory,
      hindi: newHindi,
      targetLangText: { santhali: newTarget, ho: newTarget, mundari: newTarget },
      scriptText: { santhali: newTarget, ho: newTarget, mundari: newTarget },
      phonetic: { santhali: newPhonetic || newTarget, ho: newPhonetic || newTarget, mundari: newPhonetic || newTarget },
      isCustom: true,
    };
    await dbManager.addCustomVocabulary(newTerm);
    setGlossary((prev) => [newTerm, ...prev]);
    setNewHindi('');
    setNewTarget('');
    setNewPhonetic('');
    addNotification(`Added custom vocabulary: ${newHindi} → ${newTarget}`);
  };

  const handleApproveCorrection = (id: string) => {
    setCorrections((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'synced' as const } : c)));
    addNotification('Correction approved and added to linguistic dictionary queue.');
  };

  const handleRejectCorrection = (id: string) => {
    setCorrections((prev) => prev.filter((c) => c.id !== id));
    addNotification('Correction rejected.');
  };

  // 1. LOGIN SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[500px] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-md p-8 border-2 border-slate-200 shadow-elevated space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-sal-900 text-harvest-400 flex items-center justify-center mx-auto text-2xl font-extrabold shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">BhashaSetu Admin Portal</h2>
            <p className="text-xs text-slate-500 font-medium">
              Enter Administrator Credentials to manage AI Models & Vernacular Content
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Username:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-sal-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password:</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-sal-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Authenticate Admin Access
            </button>
          </form>

          <div className="p-3 rounded-2xl bg-sal-50 border border-sal-200 text-[11px] text-sal-900 text-center font-medium">
            Authorized Account: Username <strong className="text-sal-700">kunal</strong> • Password <strong className="text-sal-700">kunal123</strong>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="space-y-8 pb-16">
      {/* ADMIN TOP BAR */}
      <div className="bg-sal-900 text-white p-6 rounded-3xl border border-sal-800 shadow-elevated flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-harvest-500 text-sal-950 flex items-center justify-center font-extrabold text-xl shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Admin Control Console</h2>
              <span className="text-[10px] bg-emerald-400 text-sal-950 font-bold px-2.5 py-0.5 rounded-full">
                Authenticated: kunal
              </span>
            </div>
            <p className="text-xs text-sal-300">Google Gemini AI Model Selector & Vernacular Glossary Manager</p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 rounded-xl bg-sal-800 hover:bg-sal-700 text-sal-200 font-bold text-xs flex items-center gap-1.5 border border-sal-700"
        >
          <LogOut className="w-3.5 h-3.5" /> Logout Kunal
        </button>
      </div>

      {/* SECTION 1: GEMINI AI MODEL CONFIGURATION & LIVE TESTER */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-sal-700 bg-sal-100 px-3 py-1 rounded-full">
              Live AI Provider Setup
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sal-700" /> Google Gemini Model Configuration
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Active: {activeModel}
          </span>
        </div>

        {configStatus && (
          <div className="p-3 rounded-2xl bg-sal-50 border border-sal-200 text-xs font-bold text-sal-900">
            {configStatus}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model Selector & Key Update */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Gemini AI Model:</label>
              <select
                value={activeModel}
                onChange={(e) => setActiveModel(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-sal-600"
              >
                {availableModels.map((m) => (
                  <option key={m} value={m}>
                    {m} {m === 'gemini-3.6-flash' ? '(Recommended)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Update Gemini API Key (Server Side):</label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Leave blank to keep existing key..."
                className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-sal-600 font-mono"
              />
            </div>

            <button
              onClick={handleSaveModelConfig}
              className="w-full py-3 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4" /> Save AI Model Configuration
            </button>
          </div>

          {/* Live Admin Model Tester */}
          <div className="space-y-4 bg-sal-950 text-white p-6 rounded-2xl border border-sal-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-harvest-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Live Gemini AI Tester
              </span>
              <span className="text-[10px] text-sal-300 font-mono">{activeModel}</span>
            </div>

            <textarea
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-sal-900 border border-sal-800 text-xs font-medium text-white focus:outline-none focus:border-harvest-400"
              placeholder="Enter Hindi prompt to test..."
            />

            <button
              onClick={handleTestModel}
              disabled={isTestingModel}
              className="w-full py-2.5 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-sal-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {isTestingModel ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Calling Gemini API...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Test Model Translation Live
                </>
              )}
            </button>

            {testResult && (
              <div className="p-3 bg-sal-900 rounded-xl border border-sal-800 text-xs font-mono space-y-1">
                {testResult.success ? (
                  <>
                    <div className="text-emerald-400 font-bold">✓ Model Response ({testResult.modelUsed}):</div>
                    <div className="text-white font-olchiki text-sm font-bold">
                      "{testResult.result.translatedText}"
                    </div>
                    <div className="text-sal-300 text-[11px]">
                      Phonetic: {testResult.result.phonetic}
                    </div>
                  </>
                ) : (
                  <div className="text-rose-400">✕ Model Error: {testResult.error}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: CUSTOM VERNACULAR GLOSSARY MANAGER */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-sal-700 bg-sal-100 px-3 py-1 rounded-full">
              Educational Lexicon
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sal-700" /> Vernacular Glossary Manager ({activeLanguage})
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">{glossary.length} Vocabulary Terms</span>
        </div>

        {/* Add New Term Inputs */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Hindi Word:</label>
            <input
              type="text"
              value={newHindi}
              onChange={(e) => setNewHindi(e.target.value)}
              placeholder="e.g. फूल (Flower)"
              className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Vernacular ({activeLanguage}):</label>
            <input
              type="text"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              placeholder="e.g. ᱵᱟᱦᱟ (Baha)"
              className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Latin Phonetic:</label>
            <input
              type="text"
              value={newPhonetic}
              onChange={(e) => setNewPhonetic(e.target.value)}
              placeholder="e.g. Baha"
              className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
            />
          </div>

          <button
            onClick={handleAddGlossaryTerm}
            className="py-2.5 px-4 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Term
          </button>
        </div>

        {/* Glossary Terms List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
          {glossary.map((term) => (
            <div key={term.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900">{term.hindi}</span>
                <span className="text-sal-700 font-extrabold">{term.targetLangText[activeLanguage]}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Phonetic: {term.phonetic[activeLanguage]} {term.isCustom && '• Custom Term'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: HUMAN-IN-THE-LOOP CORRECTIONS MODERATION */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-terracotta-700 bg-terracotta-100 px-3 py-1 rounded-full">
              Linguistic Moderation
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-sal-700" /> Teacher Translation Corrections Queue
            </h3>
          </div>
          <span className="text-xs font-bold text-terracotta-600">{corrections.length} Pending Feedback Items</span>
        </div>

        <div className="space-y-3">
          {corrections.map((corr) => (
            <div key={corr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Original Hindi: "{corr.sourceText}"</span>
                  <span className="text-[10px] text-slate-400 font-semibold">• {corr.timestamp}</span>
                </div>
                <div className="text-sal-800 font-medium">Current AI: "{corr.originalTranslation}"</div>
                <div className="text-emerald-700 font-extrabold">Teacher Correction: "{corr.suggestedCorrection}"</div>
              </div>

              {corr.status === 'synced' ? (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                  ✓ Approved & Synced
                </span>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleApproveCorrection(corr.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => handleRejectCorrection(corr.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
