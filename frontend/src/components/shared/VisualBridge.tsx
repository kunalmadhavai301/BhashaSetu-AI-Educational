import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, Languages, Baby, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VisualBridge: React.FC = () => {
  const { activeLanguage } = useApp();

  const langNames = {
    santhali: 'Santhali (ᱥᱟᱱᱛᱟᱲᱤ)',
    ho: 'Ho (ᱦᱚ: ᱡᱟᱜᱟᱨ)',
    mundari: 'Mundari (ᱢᱩᱱᱰᱟᱨᱤ)',
  };

  return (
    <div className="w-full bg-gradient-to-r from-sal-900 via-sal-800 to-sal-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-sal-700/50 relative overflow-hidden my-6">
      {/* Background Decorative Circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-harvest-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-terracotta-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-harvest-500/20 text-harvest-300 border border-harvest-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Language Bridge Engine
        </span>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">The Mother-Tongue Learning Bridge</h3>
        <p className="text-xs sm:text-sm text-sal-200 mt-1">
          Bridging non-native Hindi teachers and tribal-language students seamlessly offline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative z-10">
        {/* Step 1: Hindi Teacher */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-sal-800/80 backdrop-blur-md rounded-2xl p-4 border border-sal-600/40 text-center flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-harvest-500/20 text-harvest-400 flex items-center justify-center mb-3 text-2xl font-bold shadow-inner border border-harvest-500/30">
            👩‍🏫
          </div>
          <span className="text-xs font-medium text-harvest-300">STEP 1</span>
          <h4 className="text-base font-bold text-white mt-0.5">Hindi Teacher</h4>
          <div className="mt-3 bg-sal-900/90 rounded-xl p-2.5 text-xs text-sal-200 border border-sal-700 w-full text-left font-mono">
            <span className="text-harvest-400 font-bold">Hindi:</span> "किताब खोलो और 3 सेब गिनो।"
          </div>
        </motion.div>

        {/* Arrow 1 */}
        <div className="hidden md:flex justify-center text-harvest-400 animate-pulse">
          <ArrowRight className="w-7 h-7" />
        </div>

        {/* Step 2: BhashaSetu AI Engine */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-sal-800/80 backdrop-blur-md rounded-2xl p-4 border border-harvest-500/40 text-center flex flex-col items-center shadow-lg relative"
        >
          <div className="w-14 h-14 rounded-2xl bg-sal-600 text-white flex items-center justify-center mb-3 shadow-md border border-harvest-400/50">
            <Languages className="w-7 h-7 text-harvest-300 animate-bounce" />
          </div>
          <span className="text-xs font-medium text-harvest-300">STEP 2</span>
          <h4 className="text-base font-bold text-white mt-0.5">BhashaSetu AI</h4>
          <div className="mt-3 bg-sal-900/90 rounded-xl p-2.5 text-xs text-sal-200 border border-sal-700 w-full text-left font-mono">
            <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold mb-1">
              <CheckCircle2 className="w-3 h-3" /> Offline Glossaries
            </div>
            <span className="text-harvest-300">Context:</span> Math & Instruction
          </div>
        </motion.div>

        {/* Arrow 2 */}
        <div className="hidden md:flex justify-center text-harvest-400 animate-pulse">
          <ArrowRight className="w-7 h-7" />
        </div>

        {/* Step 3: Tribal Student */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-sal-800/80 backdrop-blur-md rounded-2xl p-4 border border-sal-600/40 text-center flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-terracotta-500/20 text-terracotta-300 flex items-center justify-center mb-3 text-2xl font-bold shadow-inner border border-terracotta-500/30">
            👧
          </div>
          <span className="text-xs font-medium text-terracotta-300">STEP 3</span>
          <h4 className="text-base font-bold text-white mt-0.5">Child Learns</h4>
          <div className="mt-3 bg-sal-900/90 rounded-xl p-2.5 text-xs text-sal-200 border border-sal-700 w-full text-left font-mono">
            <span className="text-terracotta-300 font-bold">{langNames[activeLanguage]}:</span>
            <div className="font-semibold text-white mt-0.5">"ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ (Pe / 3)"</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
