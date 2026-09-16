import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { MobileNav } from './components/layout/MobileNav';
import { OfflineBanner } from './components/layout/OfflineBanner';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { AskBhashaSetuModal } from './components/modals/AskBhashaSetuModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LiveTranslatePage } from './pages/LiveTranslatePage';
import { TranslationStudioPage } from './pages/TranslationStudioPage';
import { UniversalLessonPage } from './pages/UniversalLessonPage';
import { ClassroomModePage } from './pages/ClassroomModePage';
import { WorksheetStudioPage } from './pages/WorksheetStudioPage';
import { FlashcardStudioPage } from './pages/FlashcardStudioPage';
import { StoryStudioPage } from './pages/StoryStudioPage';
import { LearningGamesPage } from './pages/LearningGamesPage';
import { EveryChildPage } from './pages/EveryChildPage';
import { NipunAlignmentPage } from './pages/NipunAlignmentPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';
import { SyncCenterPage } from './pages/SyncCenterPage';
import { OfflinePacksPage } from './pages/OfflinePacksPage';
import { MyLibraryPage } from './pages/MyLibraryPage';
import { TeacherLearnPage } from './pages/TeacherLearnPage';
import { VisualDescriptionPage } from './pages/VisualDescriptionPage';
import { StudentModePage } from './pages/StudentModePage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SettingsPage } from './pages/SettingsPage';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'live-translate':
        return <LiveTranslatePage />;
      case 'translation-studio':
        return <TranslationStudioPage />;
      case 'universal-lesson':
        return <UniversalLessonPage />;
      case 'classroom-mode':
        return <ClassroomModePage />;
      case 'worksheets':
        return <WorksheetStudioPage />;
      case 'flashcards':
        return <FlashcardStudioPage />;
      case 'stories':
        return <StoryStudioPage />;
      case 'learning-games':
        return <LearningGamesPage />;
      case 'everychild':
        return <EveryChildPage />;
      case 'nipun-alignment':
        return <NipunAlignmentPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'diagnostics':
        return <DiagnosticsPage />;
      case 'sync':
        return <SyncCenterPage />;
      case 'offline-packs':
        return <OfflinePacksPage />;
      case 'my-library':
        return <MyLibraryPage />;
      case 'teacher-learn':
        return <TeacherLearnPage />;
      case 'visual-description':
        return <VisualDescriptionPage />;
      case 'student-mode':
        return <StudentModePage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (activeTab === 'student-mode') {
    return <StudentModePage />;
  }

  return (
    <div className="min-h-screen bg-ivory-50 flex text-slate-900 font-sans selection:bg-sal-200 selection:text-sal-900">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Container */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <TopHeader />

        {/* Page Content */}
        <main className="flex-1 pt-20 px-4 sm:px-8 max-w-7xl w-full mx-auto">
          <OfflineBanner />
          {renderPage()}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Global Modals */}
      <GlobalSearchModal />
      <AskBhashaSetuModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
