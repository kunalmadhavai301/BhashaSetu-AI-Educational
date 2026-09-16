import React from 'react';
import { Home, Mic, Languages, Sparkles, Accessibility } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const mobileTabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'live-translate', label: 'Live Translate', icon: Mic },
    { id: 'translation-studio', label: 'Studio', icon: Languages },
    { id: 'universal-lesson', label: 'Lessons', icon: Sparkles },
    { id: 'everychild', label: 'EveryChild', icon: Accessibility },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-sal-950 text-white border-t border-sal-800 z-40 flex items-center justify-around px-2 shadow-elevated">
      {mobileTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full py-1 text-[10px] font-semibold transition-all ${
              isActive ? 'text-harvest-400 font-bold' : 'text-sal-300 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-harvest-400' : 'text-sal-400'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
