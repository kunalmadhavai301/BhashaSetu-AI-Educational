import React from 'react';
import { Award, BookOpen, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIPUN_OUTCOMES } from '../services/mockData';
import { NipunBadge } from '../components/shared/NipunBadge';

export const NipunAlignmentPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" /> NIPUN Bharat FLN Outcome Mapper
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Maps AI-generated lessons to official Foundational Literacy & Numeracy framework targets
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 font-semibold max-w-sm">
          Notice: Curriculum alignment assistance module for educators.
        </div>
      </div>

      {/* OUTCOMES LIST */}
      <div className="space-y-4">
        {NIPUN_OUTCOMES.map((out) => (
          <div key={out.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
              <div className="flex items-center gap-2">
                <NipunBadge code={out.code} />
                <h3 className="text-base font-extrabold text-slate-900">{out.title}</h3>
              </div>
              <span className="text-xs font-bold text-sal-700 bg-sal-100 px-3 py-1 rounded-full uppercase">
                {out.category} • {out.grade}
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium">{out.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-sal-50 border border-sal-200">
                <span className="font-bold text-sal-900 block mb-1">Suggested Vernacular Activity:</span>
                <span className="text-slate-700">{out.suggestedActivity}</span>
              </div>

              <div className="p-3 rounded-2xl bg-harvest-50 border border-harvest-200">
                <span className="font-bold text-harvest-950 block mb-1">Aligned Universal Lesson:</span>
                <span className="text-slate-700">{out.suggestedPractice}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('universal-lesson')}
                className="px-4 py-2 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                Generate Aligned Lesson <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
