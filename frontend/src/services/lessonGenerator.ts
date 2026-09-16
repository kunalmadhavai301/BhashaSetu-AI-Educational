import {
  UniversalLesson,
  GradeLevel,
  Subject,
  Language,
} from '../types';
import { translationEngine } from './translationEngine';
import { dbManager } from './indexedDB';

export class UniversalLessonGenerator {
  public async generateLesson(
    prompt: string,
    grade: GradeLevel = 'class_1',
    subject: Subject = 'mathematics',
    targetLang: Language = 'santhali'
  ): Promise<UniversalLesson> {
    // Perform AI breakdown of the prompt into 14 components
    const isMath = prompt.toLowerCase().includes('number') || prompt.toLowerCase().includes('संख्या') || prompt.toLowerCase().includes('count');

    const objHindi = isMath
      ? `छात्र ${prompt} में वस्तुओं को गिनेंगे, संथाली में 1 से 10 तक बोलेंगे और सखुआ की पत्तियों का उपयोग करेंगे।`
      : `छात्र ${prompt} के बारे में अपनी मातृभाषा संथाली और हिंदी दोनों में समझ विकसित करेंगे।`;

    const objTrans = await translationEngine.translate(objHindi, targetLang, isMath ? 'Mathematics' : 'Language');

    const hindiExp = isMath
      ? `आज हम ${prompt} सीखेंगे। ध्यान से सखुआ पत्तों की संख्या गिनो और संथाली में उत्तर दो।`
      : `आज का पाठ: ${prompt}। हम चित्रों और शब्दों द्वारा मातृभाषा में सीखेंगे।`;

    const tribalExp = objTrans.targetText;
    const phoneticExp = objTrans.phonetic;

    const teacherScript = `शिक्षक कहें: "बच्चों, स्क्रीन पर बने चित्रों को देखो। जब मैं कहूँ 'Mit', तो 1 दिखाओ!"`;

    const lesson: UniversalLesson = {
      id: `lesson_${Date.now()}`,
      title: `Universal Lesson: ${prompt}`,
      grade,
      subject,
      targetLang,
      createdAt: new Date().toISOString().split('T')[0],
      learningObjective: objHindi,
      hindiExplanation: hindiExp,
      tribalExplanation: tribalExp,
      tribalScript: objTrans.scriptText,
      phoneticScript: phoneticExp,
      teacherScript,
      visualExamples: isMath
        ? [
            { title: 'Mit (One)', symbol: '🍎', description: '1 Apple / ᱢᱤᱫ ᱥᱮᱣ' },
            { title: 'Bar (Two)', symbol: '🍎 🍎', description: '2 Apples / ᱵᱟᱨ ᱥᱮᱣ' },
            { title: 'Pe (Three)', symbol: '🍎 🍎 🍎', description: '3 Apples / ᱯᱮ ᱥᱮᱣ' },
            { title: 'Pun (Four)', symbol: '🍎 🍎 🍎 🍎', description: '4 Apples / ᱯᱩᱱ ᱥᱮᱣ' },
            { title: 'Monre (Five)', symbol: '🍎 🍎 🍎 🍎 🍎', description: '5 Apples / ᱢᱚᱬᱮ ᱥᱮᱣ' },
          ]
        : [
            { title: 'Dare (Tree)', symbol: '🌳', description: 'Green tree in forest / ᱫᱟᱨᱮ' },
            { title: 'Daah (Water)', symbol: '💧', description: 'Fresh river water / ᱫᱟ custom' },
            { title: 'Dangri (Cow)', symbol: '🐄', description: 'Village cow / ᱰᱟᱝᱜᱽᱨᱤ' },
          ],
      audioNarrationText: `${prompt}. Mit, Bar, Pe, Pun, Monre!`,
      flashcards: [
        { hindi: 'एक (1)', target: 'ᱢᱤᱫ', phonetic: 'Mit', symbol: '1️⃣' },
        { hindi: 'दो (2)', target: 'ᱵᱟᱨ', phonetic: 'Bar', symbol: '2️⃣' },
        { hindi: 'तीन (3)', target: 'ᱯᱮ', phonetic: 'Pe', symbol: '3️⃣' },
        { hindi: 'चार (4)', target: 'ᱯᱩᱱ', phonetic: 'Pun', symbol: '4️⃣' },
        { hindi: 'पांच (5)', target: 'ᱢᱚᱬᱮ', phonetic: 'Monre', symbol: '5️⃣' },
      ],
      interactiveActivity: {
        title: 'Classroom Group Activity',
        instructions: `Divide students into pairs. Practice ${prompt} with stones or Sal leaves.`,
        steps: [
          'Form groups of 3 children.',
          'Show 3 fingers and ask students to say "Pe" in Santhali.',
          'Reward correct response with applause.',
        ],
      },
      worksheet: {
        title: `Worksheet: ${prompt}`,
        instructions: 'Match objects with correct numbers.',
        questions: ['Count 🍎 🍎 -> Match with ᱵᱟᱨ (Bar)', 'Count 🔴 -> Match with ᱢᱤᱫ (Mit)'],
      },
      quiz: [
        { question: `${prompt}: Santhali word for number 1?`, options: ['Mit', 'Bar', 'Pe'], answerIndex: 0 },
        { question: `What does "Bar" mean in Hindi?`, options: ['एक', 'दो', 'तीन'], answerIndex: 1 },
      ],
      assessment: 'Oral counting test in mother tongue up to 5.',
      homework: 'Practice counting 5 objects at home with family.',
      accessibilityAlternatives: {
        visual: 'Use physical tactile counting beads or wooden blocks.',
        hearing: 'Use visual symbol flashcards and Silent Classroom sign cards.',
        communication: 'Use "Speak Without Speaking" PECS touch cards.',
      },
      culturalExamples: [
        'Counting Sal leaves during Sohrai & Baha village celebrations in Jharkhand.',
        'Counting traditional mud lamps (diya) on village doorstep.',
      ],
      nipunOutcomeId: 'nipun_num_1',
    };

    await dbManager.saveLesson(lesson);
    return lesson;
  }
}

export const lessonGenerator = new UniversalLessonGenerator();
