import React from 'react';
import { Award, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface NipunBadgeProps {
  code?: string;
  title?: string;
}

export const NipunBadge: React.FC<NipunBadgeProps> = ({
  code = 'FLN-M1.2',
  title = 'NIPUN Bharat Aligned',
}) => {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
      title="Aligned with National NIPUN Bharat Foundational Literacy & Numeracy Outcomes"
    >
      <Award className="w-3.5 h-3.5 text-amber-700" />
      <span>NIPUN: {code}</span>
    </span>
  );
};

interface ConfidenceBadgeProps {
  confidence: 'High' | 'Medium' | 'Needs Review';
  score?: number;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence, score = 95 }) => {
  const badgeConfig = {
    High: {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />,
      label: 'High Confidence',
    },
    Medium: {
      bg: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: <HelpCircle className="w-3.5 h-3.5 text-blue-700" />,
      label: 'Medium Confidence',
    },
    'Needs Review': {
      bg: 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />,
      label: 'Needs Review',
    },
  };

  const current = badgeConfig[confidence];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${current.bg}`}>
      {current.icon}
      <span>{current.label} ({score}%)</span>
    </span>
  );
};
