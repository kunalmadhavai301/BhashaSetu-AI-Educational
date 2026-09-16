export type Language = 'santhali' | 'ho' | 'mundari';

export interface LanguagePack {
  id: Language;
  name: string;
  nativeName: string;
  script: string; // e.g. "Ol Chiki" for Santhali
  translationReady: boolean;
  audioReady: boolean;
  vocabularyCount: number;
  lessonsCount: number;
  worksheetsCount: number;
  sizeMB: number;
  downloaded: boolean;
  lastUpdated: string;
}

export type Subject = 'mathematics' | 'language' | 'environmental_studies' | 'science';
export type GradeLevel = 'class_1' | 'class_2' | 'class_3' | 'class_4' | 'class_5';

export type EducationCategory =
  | 'Mathematics'
  | 'Language'
  | 'Environment'
  | 'Science'
  | 'Classroom instructions'
  | 'Stories'
  | 'Assessment'
  | 'Games'
  | 'Daily conversation';

export interface TranslationResult {
  id: string;
  sourceText: string;
  sourceLang: 'hindi' | 'english';
  targetLang: Language;
  targetText: string;
  scriptText?: string; // e.g. Ol Chiki characters for Santhali
  phonetic: string;
  category: EducationCategory;
  confidence: 'High' | 'Medium' | 'Needs Review';
  confidenceScore: number;
  contextUsed: string;
  educationTermsMatched: string[];
  alternativeTranslations: string[];
  audioUrl?: string;
  saved?: boolean;
}

export interface VocabularyTerm {
  id: string;
  category: string;
  hindi: string;
  targetLangText: Record<Language, string>;
  scriptText?: Record<Language, string>;
  phonetic: Record<Language, string>;
  exampleHindi?: string;
  exampleTarget?: Record<Language, string>;
  audioPhonetic?: string;
  isCustom?: boolean;
}

export interface UniversalLesson {
  id: string;
  title: string;
  grade: GradeLevel;
  subject: Subject;
  targetLang: Language;
  createdAt: string;
  // 14 Core Components
  learningObjective: string;
  hindiExplanation: string;
  tribalExplanation: string;
  tribalScript?: string;
  phoneticScript: string;
  teacherScript: string;
  visualExamples: { title: string; symbol: string; description: string }[];
  audioNarrationText: string;
  flashcards: { hindi: string; target: string; phonetic: string; symbol: string }[];
  interactiveActivity: { title: string; instructions: string; steps: string[] };
  worksheet: { title: string; instructions: string; questions: string[] };
  quiz: { question: string; options: string[]; answerIndex: number }[];
  assessment: string;
  homework: string;
  accessibilityAlternatives: {
    visual: string;
    hearing: string;
    communication: string;
  };
  culturalExamples: string[];
  nipunOutcomeId?: string;
}

export interface WorksheetQuestion {
  id: string;
  type: 'fill_in_blanks' | 'match' | 'counting' | 'mcq' | 'picture' | 'coloring' | 'trace';
  questionHindi: string;
  questionTarget: string;
  phonetic: string;
  options?: string[];
  correctAnswer?: string;
  symbolOrImage?: string;
  countTarget?: number;
}

export interface Worksheet {
  id: string;
  title: string;
  grade: GradeLevel;
  subject: Subject;
  topic: string;
  targetLang: Language;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Advanced';
  questions: WorksheetQuestion[];
  instructionsHindi: string;
  instructionsTarget: string;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  category: string;
  hindi: string;
  target: string;
  script?: string;
  phonetic: string;
  symbolOrImage: string;
  audioText: string;
  exampleHindi?: string;
  exampleTarget?: string;
}

export interface LocalStory {
  id: string;
  titleHindi: string;
  titleTarget: string;
  phoneticTitle: string;
  theme: 'Forest' | 'Animals' | 'Rivers' | 'Village life' | 'Seasons' | 'Farming' | 'Community' | 'Nature' | 'Games';
  grade: GradeLevel;
  targetLang: Language;
  contentHindi: string[];
  contentTarget: string[];
  phoneticContent: string[];
  illustrations: string[]; // Emojis / SVG symbols
  comprehensionQuestions: {
    questionHindi: string;
    questionTarget: string;
    options: string[];
    answerIndex: number;
  }[];
  culturalDisclaimer: string;
}

export interface NipunOutcome {
  id: string;
  code: string;
  category: 'FLN' | 'Oral Language' | 'Reading' | 'Writing' | 'Number Sense' | 'Math Reasoning' | 'Problem Solving';
  grade: GradeLevel;
  title: string;
  description: string;
  suggestedActivity: string;
  suggestedPractice: string;
}

export interface CommunicationCard {
  id: string;
  labelHindi: string;
  labelTarget: string;
  phonetic: string;
  symbol: string;
  category: 'basic' | 'needs' | 'feelings' | 'classroom';
  audioText: string;
}

export interface TranslationFeedback {
  id: string;
  sourceText: string;
  originalTranslation: string;
  suggestedCorrection: string;
  targetLang: Language;
  category: EducationCategory;
  timestamp: string;
  status: 'pending' | 'synced' | 'reviewed';
}

export interface AccessibilityConfig {
  visualSupport: boolean;
  hearingSupport: boolean;
  communicationSupport: boolean;
  readingSupport: boolean;
  simplifiedLearning: boolean;
  highContrast: boolean;
  darkMode: boolean;
  largeText: boolean;
  liteMode: boolean; // low-end device optimization
  silentClassroom: boolean;
  speechSpeed: number; // 0.5, 0.75, 1.0
}

export interface StudentProfile {
  id: string;
  pseudonym: string; // Privacy-first ID e.g. "Student 01"
  grade: GradeLevel;
  preferredLang: Language;
  learningLevel: number; // 1 - 10
  completedActivities: number;
  strugglingTopics: string[];
  lastActive: string;
}
