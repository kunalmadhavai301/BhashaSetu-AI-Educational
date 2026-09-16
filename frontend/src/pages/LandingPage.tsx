import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  WifiOff,
  Accessibility,
  Languages,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Heart,
  Globe,
  Layers,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VisualBridge } from '../components/shared/VisualBridge';

export const LandingPage: React.FC = () => {
  const { setActiveTab, triggerDemoMode, toggleSimulatedOffline, updateAccessibility } = useApp();

  return (
    <div className="space-y-12 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sal-900 via-sal-800 to-sal-950 text-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-sal-700/50">
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-harvest-500/20 text-harvest-300 border border-harvest-500/30 text-xs font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-harvest-400" />
            AI Classroom Operating System for Tribal Primary Education
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            “Every Child Learns Best in Their <span className="text-harvest-400">Own Language</span>.”
          </h1>

          <p className="text-sm sm:text-lg text-sal-200 font-medium max-w-2xl mx-auto">
            AI-powered Vernacular Pedagogy, Real-Time Voice Translation and Inclusive Education platform designed for Hindi-medium teachers in Jharkhand tribal schools.
          </p>

          {/* HERO ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-harvest-500 hover:bg-harvest-400 text-sal-950 font-extrabold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              Start Teaching Now <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={triggerDemoMode}
              className="px-6 py-3.5 rounded-2xl bg-sal-700 hover:bg-sal-600 text-white font-extrabold text-sm flex items-center gap-2 border border-sal-600 transition-transform active:scale-95"
            >
              <Zap className="w-4 h-4 text-harvest-400" /> Explore Hackathon Demo
            </button>

            <button
              onClick={toggleSimulatedOffline}
              className="px-4 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-bold text-xs flex items-center gap-1.5 border border-terracotta-400/40"
            >
              <WifiOff className="w-4 h-4" /> Simulate Offline Mode
            </button>

            <button
              onClick={() => {
                updateAccessibility('highContrast', true);
                setActiveTab('everychild');
              }}
              className="px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-600"
            >
              <Accessibility className="w-4 h-4 text-amber-400" /> EveryChild Mode
            </button>
          </div>
        </div>
      </section>

      {/* ANIMATED VISUAL BRIDGE */}
      <VisualBridge />

      {/* THE PROBLEM vs OUR SOLUTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-200 text-rose-900 text-xs font-bold">
            The Classroom Challenge
          </div>
          <h3 className="text-xl font-bold text-rose-950">Language Barrier in Tribal Primary Schools</h3>
          <ul className="space-y-2 text-xs text-rose-900 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              Hindi-medium primary teachers posted in Jharkhand tribal belts do not speak Santhali, Ho, or Mundari.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              Children entering Grade 1 speak only their mother tongue at home, leading to learning dropouts.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              Tribal school classrooms frequently lack internet connectivity and digital electricity.
            </li>
          </ul>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold">
            Our AI Solution
          </div>
          <h3 className="text-xl font-bold text-emerald-950">BhashaSetu Vernacular Classroom OS</h3>
          <ul className="space-y-2 text-xs text-emerald-900 font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              Real-time voice translation bridge converting Hindi speech into Santhali audio under 3s offline.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              Universal 14-in-1 Lesson Generator mapped to NIPUN Bharat Foundational Literacy & Numeracy.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              EveryChild accessibility engine supporting non-verbal, deaf, and low-vision children.
            </li>
          </ul>
        </div>
      </section>

      {/* CORE FEATURE CARDS */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900">Purpose-Built Educational Capabilities</h2>
          <p className="text-xs text-slate-500">
            Designed from the ground up for mother-tongue primary education in rural and tribal classrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Real-Time Voice Translation',
              desc: 'Bidirectional Hindi <-> Santhali/Ho/Mundari live conversation translator with low latency.',
              icon: Languages,
              tab: 'live-translate',
              color: 'text-sal-700 bg-sal-100',
            },
            {
              title: 'Universal Lesson Generator',
              desc: 'AI creates 14-part lessons with "One Lesson, Four Ways" (SEE, HEAR, DO, READ).',
              icon: Sparkles,
              tab: 'universal-lesson',
              color: 'text-harvest-700 bg-harvest-100',
            },
            {
              title: 'Printable A4 Worksheets',
              desc: 'Generates dual-language trace numbers, counting activities, and match exercises.',
              icon: BookOpen,
              tab: 'worksheets',
              color: 'text-terracotta-700 bg-terracotta-100',
            },
            {
              title: 'EveryChild Accessibility',
              desc: 'PECS picture board, Silent Classroom Mode, visual speech alerts, and AI image description.',
              icon: Accessibility,
              tab: 'everychild',
              color: 'text-blue-700 bg-blue-100',
            },
            {
              title: 'NIPUN Bharat Alignment',
              desc: 'FLN outcome mapping for foundational literacy, oral language, and number sense.',
              icon: Award,
              tab: 'nipun-alignment',
              color: 'text-purple-700 bg-purple-100',
            },
            {
              title: '100% Offline First',
              desc: 'Pre-bundled language packs in IndexedDB. Zero API dependency required in class.',
              icon: WifiOff,
              tab: 'offline-packs',
              color: 'text-emerald-700 bg-emerald-100',
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                onClick={() => setActiveTab(card.tab)}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft cursor-pointer hover:border-sal-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 mb-1">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-sal-700">
                  Explore Tool <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SYSTEM IMPACT & STATS */}
      <section className="bg-sal-900 text-white rounded-3xl p-8 shadow-elevated border border-sal-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-harvest-400">3+</div>
            <div className="text-xs text-sal-200 mt-1 font-medium">Tribal Languages (Santhali, Ho, Mundari)</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-harvest-400">100%</div>
            <div className="text-xs text-sal-200 mt-1 font-medium">Offline Classroom Reliability</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-harvest-400">14-in-1</div>
            <div className="text-xs text-sal-200 mt-1 font-medium">Universal AI Lesson Breakdown</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-harvest-400">FLN</div>
            <div className="text-xs text-sal-200 mt-1 font-medium">NIPUN Bharat Curriculum Aligned</div>
          </div>
        </div>
      </section>
    </div>
  );
};
