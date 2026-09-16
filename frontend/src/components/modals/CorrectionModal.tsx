import React, { useState } from 'react';
import { ThumbsDown, X, Check, Save, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translationEngine } from '../../services/translationEngine';
import { EducationCategory } from '../../types';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceText: string;
  originalTranslation: string;
  category: EducationCategory;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  sourceText,
  originalTranslation,
  category,
}) => {
  const { activeLanguage, addNotification } = useApp();
  const [correction, setCorrection] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!correction.trim()) return;

    await translationEngine.saveCorrection(
      sourceText,
      originalTranslation,
      correction,
      activeLanguage,
      category
    );

    setSaved(true);
    addNotification(`Correction recorded locally! Will be submitted during next cloud sync.`);
    setTimeout(() => {
      setSaved(false);
      setCorrection('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-elevated border border-slate-200 overflow-hidden animate-scaleUp p-6">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
              <ThumbsDown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Suggest Translation Correction</h3>
              <p className="text-[10px] text-slate-500">Human-in-the-loop Vernacular Feedback</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {saved ? (
          <div className="text-center py-8 space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Correction Saved Offline!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your feedback is saved locally and will be reviewed by language experts upon synchronization.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[9px] block">Original Hindi Text:</span>
                <span className="font-semibold text-slate-800">{sourceText}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase text-[9px] block">Current AI Translation ({activeLanguage}):</span>
                <span className="font-semibold text-terracotta-700">{originalTranslation}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Suggested Vernacular Correction ({activeLanguage}):
              </label>
              <textarea
                value={correction}
                onChange={(e) => setCorrection(e.target.value)}
                placeholder="Type the accurate mother-tongue translation..."
                rows={3}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-sal-600 text-slate-900"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Note: Offline corrections are saved locally first. Cloud sync does not automatically overwrite official dictionary until validated by community language experts.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-4 h-4" /> Save Correction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
