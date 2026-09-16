import { LocalStory, GradeLevel, Language } from '../types';
import { dbManager } from './indexedDB';

export class StoryGenerator {
  public async generateStory(
    theme: 'Forest' | 'Animals' | 'Rivers' | 'Village life' | 'Seasons' | 'Farming' | 'Community' | 'Nature' | 'Games',
    grade: GradeLevel = 'class_1',
    targetLang: Language = 'santhali'
  ): Promise<LocalStory> {
    const story: LocalStory = {
      id: `story_${Date.now()}`,
      titleHindi: `छोटानागपुर की ${theme === 'Forest' ? 'सांस्कृतिक जंगल' : theme} गाथा`,
      titleTarget: `ᱥᱟᱨᱡᱚᱢ ᱵᱤᱨ ᱨᱮᱱᱟᱜ ᱠᱟᱦᱱᱤ (${theme})`,
      phoneticTitle: `Sarjom Bir Renag Kahni (${theme})`,
      theme,
      grade,
      targetLang,
      contentHindi: [
        'झारखंड के घने सखुआ (साल) जंगलों के पास एक छोटा सा गाँव था।',
        'गाँव के बच्चे हर शाम बरगद के पेड़ के नीचे बैठकर बुजुर्गों की कहानियाँ सुनते थे।',
        'उन्होंने सीखा कि कैसे प्रकृति, नदियाँ और जानवर हमारे सच्चे मित्र हैं।',
        'सभी बच्चे मिलकर पेड़ लगाने और प्रकृति की रक्षा करने का संकल्प लेते हैं।',
      ],
      contentTarget: [
        'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱥᱟᱨᱡᱚᱢ ᱵᱤᱨ ᱥᱩᱨ ᱨᱮ ᱢᱤᱫ ᱠᱟᱹᱴᱤᱡ ᱟᱹᱛᱩ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
        'ᱟᱹᱛᱩ ᱨᱮᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱫᱤᱱᱚᱢ ᱦᱤᱞᱚᱜ ᱵᱟᱨᱮ ᱫᱟᱨᱮ ᱩᱢᱩᱞ ᱨᱮ ᱫᱩᱲᱩᱵ ᱠᱟᱛᱮ ᱦᱟᱲᱟᱢ ᱠᱚᱣᱟᱜ ᱠᱟᱦᱱᱤ ᱠᱚ ᱟᱸᱡᱚᱢ ᱮᱫ ᱛᱟᱦᱮᱸᱱ᱾',
        'ᱟᱹᱠᱩ ᱠᱚ ᱪᱮᱫ ᱠᱮᱫᱟ ᱪᱮᱫ ᱞᱮᱠᱟ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ, ᱜᱟᱰᱟ ᱟᱨ ᱡᱤᱣᱤ-ᱡᱤᱭᱟᱹᱞᱤ ᱵᱚᱱ ᱜᱟᱛᱮ ᱠᱟᱱᱟ ᱠᱚ᱾',
        'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱫᱟᱨᱮ ᱨᱚᱦᱚᱭ ᱟᱨ ᱵᱤᱨ ᱡᱚᱜᱟᱣ ᱨᱮᱱᱟᱜ ᱠᱤᱨᱤᱭᱟᱹ ᱠᱚ ᱦᱟᱛᱟᱣ ᱠᱮᱫᱟ᱾',
      ],
      phoneticContent: [
        'Jharkhand renag Sarjom bir sur re mit katij atu tahe kana.',
        'Atu ren gidra dinom hilog bare dare umul re durup kate haram kowag kahni ko anjom ed tahen.',
        'Aku ko ched keda ched leka dare-nari, gada ar jiwi-jiyali bon gate kana ko.',
        'Joto gidra mesa kate dare rohoy ar bir jogaw renag kiriya ko hataw keda.',
      ],
      illustrations: ['🌳', '🏡', '🌊', '🤝'],
      comprehensionQuestions: [
        {
          questionHindi: 'बच्चे शाम को कहाँ बैठते थे?',
          questionTarget: 'ᱜᱤᱫᱽᱨᱟᱹ ᱛᱟᱨᱟᱥᱤᱧ ᱚᱠᱟᱨᱮ ᱠᱚ ᱫᱩᱲᱩᱵ ᱮᱫ ᱛᱟᱦᱮᱸᱱ?',
          options: ['बरगद के पेड़ के नीचे (Bare dare umul)', 'घर के अंदर', 'बाजार में'],
          answerIndex: 0,
        },
        {
          questionHindi: 'बच्चों ने किसकी रक्षा करने का संकल्प लिया?',
          questionTarget: 'ᱜᱤᱫᱽᱨᱟᱹ ᱪᱮᱫ ᱡᱚᱜᱟᱣ ᱨᱮᱱᱟᱜ ᱠᱤᱨᱤᱭᱟᱹ ᱠᱚ ᱦᱟᱛᱟᱣ ᱠᱮᱫᱟ?',
          options: ['प्रकृति और जंगल (Bir & Nature)', 'खिलौनों की', 'गाड़ियों की'],
          answerIndex: 0,
        },
      ],
      culturalDisclaimer:
        'Notice: AI-generated fictional narrative created for bilingual primary education practice in Jharkhand schools. Content should be reviewed by local language educators before classroom use.',
    };

    await dbManager.put('stories', story);
    return story;
  }
}

export const storyGenerator = new StoryGenerator();
