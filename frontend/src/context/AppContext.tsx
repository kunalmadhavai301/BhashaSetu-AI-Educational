import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, GradeLevel, AccessibilityConfig } from '../types';
import { speechEngine } from '../services/speechEngine';

interface AppContextType {
  isOnline: boolean;
  isSimulatedOffline: boolean;
  isSyncing: boolean;
  effectiveOnline: boolean;
  toggleSimulatedOffline: () => void;
  triggerManualSync: () => void;

  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;

  activeGrade: GradeLevel;
  setActiveGrade: (grade: GradeLevel) => void;

  accessibility: AccessibilityConfig;
  updateAccessibility: (key: keyof AccessibilityConfig, value: boolean | number) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  isDemoModeActive: boolean;
  triggerDemoMode: () => void;
  stopDemoMode: () => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isAskBhashaSetuOpen: boolean;
  setIsAskBhashaSetuOpen: (open: boolean) => void;

  notifications: { id: string; title: string; time: string; read: boolean }[];
  addNotification: (title: string) => void;
  markNotificationsRead: () => void;

  speakText: (text: string, speed?: number, langCode?: string) => void;
}

const defaultAccessibility: AccessibilityConfig = {
  visualSupport: false,
  hearingSupport: false,
  communicationSupport: false,
  readingSupport: false,
  simplifiedLearning: false,
  highContrast: false,
  darkMode: false,
  largeText: false,
  liteMode: false,
  silentClassroom: false,
  speechSpeed: 1.0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const [activeLanguage, setActiveLanguage] = useState<Language>('santhali');
  const [activeGrade, setActiveGrade] = useState<GradeLevel>('class_1');
  const [accessibility, setAccessibility] = useState<AccessibilityConfig>(defaultAccessibility);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDemoModeActive, setIsDemoModeActive] = useState<boolean>(false);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAskBhashaSetuOpen, setIsAskBhashaSetuOpen] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<{ id: string; title: string; time: string; read: boolean }[]>([
    { id: '1', title: 'Santhali Offline Language Pack Updated', time: '10:15 AM', read: false },
    { id: '2', title: 'New NIPUN FLN Worksheet Available for Class 1', time: '09:30 AM', read: false },
    { id: '3', title: 'Offline Storage Status: 1.2 GB used / 800 MB free', time: 'Yesterday', read: true },
  ]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update body classes on accessibility changes
  useEffect(() => {
    if (accessibility.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if (accessibility.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    if (accessibility.largeText) {
      document.body.classList.add('large-text-mode');
    } else {
      document.body.classList.remove('large-text-mode');
    }

    if (accessibility.liteMode) {
      document.body.classList.add('lite-mode');
    } else {
      document.body.classList.remove('lite-mode');
    }
  }, [accessibility]);

  const effectiveOnline = isOnline && !isSimulatedOffline;

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline((prev) => !prev);
  };

  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      addNotification('Offline data synchronized successfully with cloud library!');
    }, 2500);
  };

  const updateAccessibility = (key: keyof AccessibilityConfig, value: boolean | number) => {
    setAccessibility((prev) => ({ ...prev, [key]: value }));
  };

  const triggerDemoMode = () => {
    setIsDemoModeActive(true);
    setActiveTab('live-translate');
  };

  const stopDemoMode = () => {
    setIsDemoModeActive(false);
  };

  const addNotification = (title: string) => {
    setNotifications((prev) => [
      { id: Date.now().toString(), title, time: 'Just now', read: false },
      ...prev,
    ]);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const speakText = (text: string, speed?: number, langCode: string = 'hi-IN') => {
    if (accessibility.silentClassroom) {
      addNotification(`[Silent Classroom Captions]: "${text}"`);
      return;
    }
    const finalRate = speed || accessibility.speechSpeed || 1.0;
    speechEngine.speak(text, finalRate, langCode);
  };

  return (
    <AppContext.Provider
      value={{
        isOnline,
        isSimulatedOffline,
        isSyncing,
        effectiveOnline,
        toggleSimulatedOffline,
        triggerManualSync,
        activeLanguage,
        setActiveLanguage,
        activeGrade,
        setActiveGrade,
        accessibility,
        updateAccessibility,
        activeTab,
        setActiveTab,
        isDemoModeActive,
        triggerDemoMode,
        stopDemoMode,
        isSearchOpen,
        setIsSearchOpen,
        isAskBhashaSetuOpen,
        setIsAskBhashaSetuOpen,
        notifications,
        addNotification,
        markNotificationsRead,
        speakText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
