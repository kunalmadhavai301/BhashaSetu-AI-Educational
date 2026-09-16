import {
  LanguagePack,
  UniversalLesson,
  Worksheet,
  Flashcard,
  LocalStory,
  TranslationFeedback,
  StudentProfile,
  VocabularyTerm,
} from '../types';
import {
  LANGUAGE_PACKS,
  EDUCATION_GLOSSARY,
  MOCK_UNIVERSAL_LESSON,
  MOCK_WORKSHEETS,
  MOCK_FLASHCARDS,
  MOCK_STORIES,
  MOCK_STUDENTS,
} from './mockData';

const DB_NAME = 'BhashaSetuDB';
const DB_VERSION = 1;

class OfflineDBManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('packs')) {
          db.createObjectStore('packs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('glossary')) {
          db.createObjectStore('glossary', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('lessons')) {
          db.createObjectStore('lessons', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('worksheets')) {
          db.createObjectStore('worksheets', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('flashcards')) {
          db.createObjectStore('flashcards', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('stories')) {
          db.createObjectStore('stories', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('corrections')) {
          db.createObjectStore('corrections', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('students')) {
          db.createObjectStore('students', { keyPath: 'id' });
        }
      };

      request.onsuccess = async () => {
        this.db = request.result;
        await this.seedInitialData();
        resolve(this.db);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private async seedInitialData() {
    if (!this.db) return;

    // Check if packs exist
    const packsCount = await this.count('packs');
    if (packsCount === 0) {
      for (const pack of LANGUAGE_PACKS) {
        await this.put('packs', pack);
      }
    }

    // Check if glossary exists
    const glossaryCount = await this.count('glossary');
    if (glossaryCount === 0) {
      for (const term of EDUCATION_GLOSSARY) {
        await this.put('glossary', term);
      }
    }

    // Seed initial lesson
    const lessonCount = await this.count('lessons');
    if (lessonCount === 0) {
      await this.put('lessons', MOCK_UNIVERSAL_LESSON);
    }

    // Seed worksheets
    const wsCount = await this.count('worksheets');
    if (wsCount === 0) {
      for (const ws of MOCK_WORKSHEETS) {
        await this.put('worksheets', ws);
      }
    }

    // Seed flashcards
    const fcCount = await this.count('flashcards');
    if (fcCount === 0) {
      for (const fc of MOCK_FLASHCARDS) {
        await this.put('flashcards', fc);
      }
    }

    // Seed stories
    const storyCount = await this.count('stories');
    if (storyCount === 0) {
      for (const story of MOCK_STORIES) {
        await this.put('stories', story);
      }
    }

    // Seed students
    const studentCount = await this.count('students');
    if (studentCount === 0) {
      for (const student of MOCK_STUDENTS) {
        await this.put('students', student);
      }
    }
  }

  private async count(storeName: string): Promise<number> {
    const db = await this.init();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(0);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }

  async get<T>(storeName: string, id: string): Promise<T | undefined> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  }

  async put<T>(storeName: string, item: T): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Specific helper operations
  async addCustomVocabulary(term: VocabularyTerm): Promise<void> {
    await this.put('glossary', term);
  }

  async saveLesson(lesson: UniversalLesson): Promise<void> {
    await this.put('lessons', lesson);
  }

  async saveWorksheet(worksheet: Worksheet): Promise<void> {
    await this.put('worksheets', worksheet);
  }

  async saveCorrection(feedback: TranslationFeedback): Promise<void> {
    await this.put('corrections', feedback);
  }
}

export const dbManager = new OfflineDBManager();
