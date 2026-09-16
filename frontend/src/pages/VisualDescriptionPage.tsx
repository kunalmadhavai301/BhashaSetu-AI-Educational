import React, { useState } from 'react';
import { Layers, Upload, Sparkles, Volume2, Eye, BookOpen, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AudioButton } from '../components/shared/AudioButton';

export const VisualDescriptionPage: React.FC = () => {
  const { activeLanguage, addNotification } = useApp();

  const [selectedSample, setSelectedSample] = useState<'cow' | 'tree' | 'sal'>('cow');
  const [isProcessing, setIsProcessing] = useState(false);

  const samples = {
    cow: {
      title: 'Village Cow (गाय / ᱰᱟᱝᱜᱽᱨᱤ)',
      symbol: '🐄',
      hindiDesc: 'चित्र में एक सफेद गाय हरी घास चर रही है। गाय के दो सींग और एक पूंछ है।',
      targetDesc: 'ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱢᱤᱫ ᱯᱩᱸᱰ ᱰᱟᱝᱜᱽᱨᱤ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱜᱷᱟᱸᱥ ᱡᱚᱢ ᱮᱫᱟᱭ᱾ ᱰᱟᱝᱜᱽᱨᱤ ᱭᱟᱜ ᱵᱟᱨᱭᱟ ᱫᱤᱨᱤᱧ ᱟᱨ ᱢᱤᱫ ᱪᱩᱯᱤ ᱢᱮᱱᱟᱜ-ᱟ᱾',
      phonetic: 'Citar re mit pund dangri hariyar ghas jom eday. Dangriyag barya dirinj ar mit cupi menag-a.',
    },
    tree: {
      title: 'Sal Tree in Forest (पेड़ / ᱫᱟᱨᱮ)',
      symbol: '🌳',
      hindiDesc: 'चित्र में एक बड़ा सखुआ (साल) का हरा पेड़ है। इसके नीचे ठंडी छाया है।',
      targetDesc: 'ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱢᱮᱱᱟᱜ-ᱟ᱾ ᱱᱚᱣᱟ ᱩᱢᱩᱞ ᱨᱮ ᱨᱮᱭᱟᱲ ᱜᱮᱭᱟ᱾',
      phonetic: 'Citar re mit marang Sarjom dare menag-a. Nowa umul re reyar geya.',
    },
    sal: {
      title: 'Five Sal Leaves (साल की पत्तियाँ / ᱥᱟᱠᱟᱢ)',
      symbol: '🍃 🍃 🍃 🍃 🍃',
      hindiDesc: 'चित्र में पांच हरी साल की पत्तियाँ हैं। इनका उपयोग पूजा और गिनती सीखने में होता है।',
      targetDesc: 'ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱢᱚᱬᱮ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱥᱟᱨᱡᱚᱢ ᱥᱟᱠᱟᱢ ᱢᱮᱱᱟᱜ-ᱟ᱾',
      phonetic: 'Citar re monre hariyar Sarjom sakam menag-a.',
    },
  };

  const sample = samples[selectedSample];

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sal-700" /> AI Visual Description & Image-to-Lesson
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload classroom images to generate bilingual audio descriptions for visually impaired children
          </p>
        </div>
      </div>

      {/* SAMPLE IMAGE SELECTOR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['cow', 'tree', 'sal'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedSample(key)}
            className={`p-4 rounded-3xl border-2 text-left transition-all ${
              selectedSample === key
                ? 'bg-sal-700 text-white border-sal-800 shadow-md'
                : 'bg-white text-slate-800 border-slate-200 hover:border-sal-600'
            }`}
          >
            <div className="text-4xl mb-2">{samples[key].symbol}</div>
            <div className="text-xs font-extrabold">{samples[key].title}</div>
          </button>
        ))}
      </div>

      {/* AI GENERATED AUDIO & BILINGUAL DESCRIPTION */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl p-2 bg-sal-50 rounded-2xl border">{sample.symbol}</span>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{sample.title}</h3>
              <span className="text-xs text-sal-700 font-bold">AI Visual Description Mode ({activeLanguage})</span>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Hindi Visual Description:</span>
            <p className="text-xs font-semibold text-slate-800">{sample.hindiDesc}</p>
          </div>

          <div className="p-4 rounded-2xl bg-sal-50 border border-sal-200 space-y-2">
            <span className="text-xs font-bold text-sal-800 uppercase">{activeLanguage} Description:</span>
            <p className="text-base font-extrabold text-sal-950 font-olchiki">{sample.targetDesc}</p>
            <div className="text-[11px] font-mono text-slate-500">Phonetic: {sample.phonetic}</div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="pt-2">
          <AudioButton text={sample.targetDesc} langCode="hi-IN" size="lg" showSpeedControls />
        </div>
      </div>
    </div>
  );
};
