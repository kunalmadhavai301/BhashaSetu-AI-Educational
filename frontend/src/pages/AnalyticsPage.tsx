import React from 'react';
import { BarChart3, Users, CheckCircle2, TrendingUp, Award, Layers } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useApp } from '../context/AppContext';

export const AnalyticsPage: React.FC = () => {
  const { activeGrade, activeLanguage } = useApp();

  const progressData = [
    { name: 'Class 1', completed: 24, struggling: 4 },
    { name: 'Class 2', completed: 32, struggling: 2 },
    { name: 'Class 3', completed: 18, struggling: 6 },
    { name: 'Class 4', completed: 15, struggling: 3 },
    { name: 'Class 5', completed: 12, struggling: 1 },
  ];

  const languageUsageData = [
    { name: 'Santhali', value: 65, color: '#347746' },
    { name: 'Ho', value: 20, color: '#eab308' },
    { name: 'Mundari', value: 15, color: '#c24233' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sal-700" /> Offline Teacher Analytics & Mastery
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time classroom progress tracking operating completely offline without cloud calls
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
          Offline Analytics Sync Ready ✓
        </span>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Students</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">38</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% Vernacular Enrolled</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="text-xs font-bold text-slate-400 uppercase">Lessons Completed</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sal-700 mt-1">101</div>
          <span className="text-[10px] text-sal-700 font-bold">14-in-1 AI Lessons</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="text-xs font-bold text-slate-400 uppercase">Worksheets Printed</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-terracotta-600 mt-1">45</div>
          <span className="text-[10px] text-terracotta-600 font-bold">Printable A4 Format</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="text-xs font-bold text-slate-400 uppercase">FLN Mastery Rate</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-harvest-600 mt-1">84%</div>
          <span className="text-[10px] text-harvest-600 font-bold">NIPUN Bharat Aligned</span>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CHART 1: LESSON PROGRESS BY GRADE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Class Progress & Completed Activities</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Bar dataKey="completed" fill="#347746" radius={[6, 6, 0, 0]} name="Completed" />
                <Bar dataKey="struggling" fill="#c24233" radius={[6, 6, 0, 0]} name="Needs Review" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: LANGUAGE USAGE SHARE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Classroom Language Usage Ratio</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={languageUsageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {languageUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
