import { Worksheet, GradeLevel, Subject, Language, WorksheetQuestion } from '../types';
import { dbManager } from './indexedDB';

export class WorksheetGenerator {
  public async generateWorksheet(
    topic: string,
    grade: GradeLevel = 'class_1',
    subject: Subject = 'mathematics',
    targetLang: Language = 'santhali',
    difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Advanced' = 'Easy'
  ): Promise<Worksheet> {
    const questions: WorksheetQuestion[] = [
      {
        id: `wq_1`,
        type: 'counting',
        questionHindi: 'चित्रों को गिनो और सही संथाली संख्या चुनो:',
        questionTarget: 'ᱪᱤᱛᱟᱹᱨ ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱥᱟᱹᱦᱤ ᱥᱟᱱᱛᱟᱲᱤ ᱞᱮᱠᱷᱟ ᱵᱟᱪᱷᱟᱣ ᱢᱮ:',
        phonetic: 'Citar lekhay me ar sahi Santhali lekha bachaw me:',
        symbolOrImage: '🍃 🍃 🍃',
        options: ['ᱢᱤᱫ (Mit - 1)', 'ᱵᱟᱨ (Bar - 2)', 'ᱯᱮ (Pe - 3)', 'ᱯᱩᱱ (Pun - 4)'],
        correctAnswer: 'ᱯᱮ (Pe - 3)',
        countTarget: 3,
      },
      {
        id: `wq_2`,
        type: 'match',
        questionHindi: 'हिंदी शब्द को संथाली (Ol Chiki) शब्द से मिलाओ:',
        questionTarget: 'ᱦᱤᱱᱫᱤ ᱠᱟᱛᱷᱟ ᱥᱟᱱᱛᱟᱲᱤ ᱠᱟᱛᱷᱟ ᱥᱟᱶᱛᱮ ᱡᱚᱲᱟᱣ ᱢᱮ:',
        phonetic: 'Hindi katha Santhali katha sawte joraw me:',
        options: [
          'एक (1) ----> ᱢᱤᱫ (Mit)',
          'दो (2) ----> ᱵᱟᱨ (Bar)',
          'तीन (3) ----> ᱯᱮ (Pe)',
          'गाय (Cow) ----> ᱰᱟᱝᱜᱽᱨᱤ (Dangri)',
        ],
      },
      {
        id: `wq_3`,
        type: 'trace',
        questionHindi: 'संथाली अंक "᱑" (Mit - 1) और "᱒" (Bar - 2) को ट्रेस (पेंसिल चलाओ) करो:',
        questionTarget: ' Ol Chiki "᱑" ᱟᱨ "᱒" trace me:',
        phonetic: 'Ol Chiki 1 ar 2 trace me:',
        symbolOrImage: '᱑   ᱒   ᱓   ᱔   ᱕',
      },
      {
        id: `wq_4`,
        type: 'fill_in_blanks',
        questionHindi: 'खाली स्थान में संथाली संख्या भरो: 1 (Mit), __ (Bar), 3 (Pe)',
        questionTarget: 'Mit, ___, Pe, Pun',
        phonetic: 'Mit, ___, Pe, Pun',
        options: ['ᱵᱟᱨ (Bar)', 'ᱢᱚᱬᱮ (Monre)', 'ᱯᱩᱱ (Pun)'],
        correctAnswer: 'ᱵᱟᱨ (Bar)',
      },
      {
        id: `wq_5`,
        type: 'picture',
        questionHindi: 'लाल रंग के गोला (🔴) पर घेरा बनाओ और गिनती करो:',
        questionTarget: 'ᱟᱨᱟ (Ara - Red) ᱨᱚᱝ ᱜᱚᱞ ᱢᱮ:',
        phonetic: 'Ara rong gol me:',
        symbolOrImage: '🔴 🟢 🔵 🔴 🟡 🔴',
        correctAnswer: '3 (ᱯᱮ / Pe)',
      },
    ];

    const worksheet: Worksheet = {
      id: `ws_${Date.now()}`,
      title: `Classroom Worksheet: ${topic}`,
      grade,
      subject,
      topic,
      targetLang,
      difficulty,
      createdAt: new Date().toISOString().split('T')[0],
      instructionsHindi: 'निर्देश: सभी प्रश्नों के उत्तर अपनी भाषा संथाली या हिंदी में दें।',
      instructionsTarget: 'ᱱᱤᱨᱫᱮᱥ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱨᱮᱱᱟᱜ ᱛᱮᱞᱟ ᱟᱯᱱᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱮᱢ ᱢᱮ᱾',
      questions,
    };

    await dbManager.saveWorksheet(worksheet);
    return worksheet;
  }
}

export const worksheetGenerator = new WorksheetGenerator();
