import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

let CURRENT_API_KEY = process.env.GEMINI_API_KEY || '';
let CURRENT_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

export class GeminiService {
  public getApiKey(): string {
    return CURRENT_API_KEY;
  }

  public setApiKey(key: string): void {
    if (key && key.trim()) {
      CURRENT_API_KEY = key.trim();
    }
  }

  public getModel(): string {
    return CURRENT_MODEL;
  }

  public setModel(modelName: string): void {
    if (modelName && modelName.trim()) {
      CURRENT_MODEL = modelName.trim();
    }
  }

  // Safe JSON extraction helper from LLM output
  private extractJSON<T>(rawText: string): T {
    try {
      return JSON.parse(rawText) as T;
    } catch {
      let cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const firstOpen = cleaned.indexOf('{');
      const lastClose = cleaned.lastIndexOf('}');
      if (firstOpen !== -1 && lastClose !== -1) {
        cleaned = cleaned.substring(firstOpen, lastClose + 1);
        return JSON.parse(cleaned) as T;
      }
      // If parsing failed, construct fallback JSON object
      return {
        sourceText: rawText,
        translatedText: rawText,
        phonetic: rawText,
        confidence: 'Medium',
        confidenceScore: 80,
        contextUsed: 'Fallback Extracted Response',
        educationTermsMatched: [],
        alternativeTranslations: [rawText],
      } as unknown as T;
    }
  }

  // Send raw prompt to Gemini with model fallbacks & retries
  public async callGemini(prompt: string, systemInstruction?: string): Promise<{ text: string; modelUsed: string; latencyMs: number }> {
    if (!CURRENT_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in backend.');
    }

    const startTime = Date.now();
    const candidateModels = Array.from(new Set([CURRENT_MODEL, 'gemini-3.6-flash', 'gemini-2.5-flash-latest', 'gemini-1.5-flash-latest']));

    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${CURRENT_API_KEY}`;
        const payload: any = {
          contents: [{ parts: [{ text: prompt }] }],
        };

        if (systemInstruction) {
          payload.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        const response = await axios.post(url, payload, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000,
        });

        const latencyMs = Date.now() - startTime;
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (text) {
          return { text, modelUsed: model, latencyMs };
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[GeminiService] Model ${model} call failed:`, err.response?.data?.error?.message || err.message);
      }
    }

    const errMsg = lastError?.response?.data?.error?.message || lastError?.message || 'Unknown Gemini API Error';
    throw new Error(`Gemini API call failed across models: ${errMsg}`);
  }

  // 1. Health Check & Diagnostics
  public async healthCheck(): Promise<{ connected: boolean; model: string; latencyMs: number; message: string }> {
    try {
      const res = await this.callGemini('Respond with ONLY: OK');
      return {
        connected: true,
        model: res.modelUsed,
        latencyMs: res.latencyMs,
        message: '✓ Gemini AI model connected and working correctly.',
      };
    } catch (err: any) {
      return {
        connected: false,
        model: CURRENT_MODEL,
        latencyMs: 0,
        message: `✕ Gemini AI connection failed: ${err.message}`,
      };
    }
  }

  // 2. Educational Vernacular Translation (Hindi -> Santhali/Ho/Mundari)
  public async translate(sourceText: string, targetLang: string = 'santhali', category: string = 'Mathematics'): Promise<any> {
    const systemPrompt = `You are BhashaSetu AI, an expert vernacular educational translator for primary schools in Jharkhand tribal regions.
Translate primary-school educational content from Hindi into authentic ${targetLang} (using Ol Chiki script for Santhali e.g. ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ and Latin phonetics).
CRITICAL RULES:
1. Preserve mathematical meaning, numbers, and classroom commands.
2. Use child-friendly, natural vernacular vocabulary suitable for Class 1-5 children.
3. Return ONLY a structured JSON object with keys:
{
  "sourceText": "${sourceText}",
  "targetLang": "${targetLang}",
  "translatedText": "Authentic native script translation (Ol Chiki characters if Santhali)",
  "phonetic": "Latin phonetic transliteration",
  "category": "${category}",
  "confidence": "High" | "Medium" | "Needs Review",
  "confidenceScore": 95,
  "contextUsed": "${category} Domain Vernacular Context",
  "educationTermsMatched": ["matched_term_1"],
  "alternativeTranslations": ["Colloquial Dialect: ...", "Classroom Direct Command: ..."]
}`;

    const prompt = `Translate this Hindi ${category} text into ${targetLang}: "${sourceText}"`;
    const response = await this.callGemini(prompt, systemPrompt);
    return this.extractJSON(response.text);
  }

  // 3. Universal Lesson Generator (14-in-1 components)
  public async generateLesson(topic: string, grade: string, subject: string, targetLang: string): Promise<any> {
    const systemPrompt = `You are an AI Primary Education Curriculum Designer for Jharkhand tribal schools.
Generate a 14-part Universal Lesson aligned with NIPUN Bharat Foundational Literacy & Numeracy (FLN).
Return ONLY a valid JSON object:
{
  "id": "lesson_${Date.now()}",
  "title": "${topic}",
  "grade": "${grade}",
  "subject": "${subject}",
  "targetLang": "${targetLang}",
  "createdAt": "2026-09-16",
  "learningObjective": "Learning objective in Hindi & ${targetLang}",
  "hindiExplanation": "Clear explanation in Hindi",
  "tribalExplanation": "Explanation in ${targetLang} native script (Ol Chiki for Santhali)",
  "tribalScript": "Ol Chiki script text",
  "phoneticScript": "Latin phonetic transliteration",
  "teacherScript": "Teacher classroom script",
  "visualExamples": [{"title": "Mit (1)", "symbol": "🍃", "description": "1 Sal leaf"}],
  "audioNarrationText": "Audio narration text",
  "flashcards": [{"hindi": "एक (1)", "target": "ᱢᱤᱫ", "phonetic": "Mit", "symbol": "1️⃣"}],
  "interactiveActivity": {"title": "Leaf Collector Game", "instructions": "Collect leaves in pairs", "steps": ["Step 1", "Step 2"]},
  "worksheet": {"title": "Worksheet: ${topic}", "instructions": "Match numbers", "questions": ["Q1", "Q2"]},
  "quiz": [{"question": "Santhali word for 1?", "options": ["Mit", "Bar", "Pe"], "answerIndex": 0}],
  "assessment": "Oral assessment guide",
  "homework": "Practice at home",
  "accessibilityAlternatives": {"visual": "Tactile counting beads", "hearing": "Visual symbol cards", "communication": "PECS cards"},
  "culturalExamples": ["Counting Sal leaves during Sohrai festival", "Counting village mud lamps"],
  "nipunOutcomeId": "FLN-M1.2"
}`;

    const prompt = `Create a Universal Lesson on topic: "${topic}" for ${grade} ${subject} in ${targetLang}.`;
    const response = await this.callGemini(prompt, systemPrompt);
    return this.extractJSON(response.text);
  }

  // 4. Worksheet Generator
  public async generateWorksheet(topic: string, grade: string, subject: string, targetLang: string, difficulty: string): Promise<any> {
    const systemPrompt = `Generate a printable A4 bilingual primary school worksheet in Hindi and ${targetLang} (${difficulty} level).
Return ONLY a valid JSON object:
{
  "id": "ws_${Date.now()}",
  "title": "Classroom Worksheet: ${topic}",
  "grade": "${grade}",
  "subject": "${subject}",
  "topic": "${topic}",
  "targetLang": "${targetLang}",
  "difficulty": "${difficulty}",
  "instructionsHindi": "निर्देश: सभी प्रश्नों के उत्तर मातृभाषा या हिंदी में दें।",
  "instructionsTarget": "ᱱᱤᱨᱫᱮᱥ: ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱨᱮᱱᱟᱜ ᱛᱮᱞᱟ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱮᱢ ᱢᱮ᱾",
  "questions": [
    {
      "id": "q1",
      "type": "counting",
      "questionHindi": "चीजों को गिनो और सही संख्या लिखो",
      "questionTarget": "ᱡᱤᱱᱤᱥ ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱥᱟᱹᱦᱤ ᱞᱮᱠᱷᱟ ᱚᱞ ᱢᱮ",
      "phonetic": "Jinis lekhay me ar sahi lekha ol me",
      "symbolOrImage": "🍎 🍎 🍎",
      "options": ["ᱢᱤᱫ (1)", "ᱵᱟᱨ (2)", "ᱯᱮ (3)", "ᱯᱩᱱ (4)"],
      "correctAnswer": "ᱯᱮ (3)"
    },
    {
      "id": "q2",
      "type": "match",
      "questionHindi": "संख्या 1 को संथाली शब्द से मिलाओ",
      "questionTarget": "᱑ ᱢᱤᱫ ᱥᱟᱶᱛᱮ ᱡᱚᱲᱟᱣ ᱢᱮ",
      "phonetic": "Mit (1)",
      "options": ["ᱢᱤᱫ (Mit)", "ᱵᱟᱨ (Bar)", "ᱯᱮ (Pe)"]
    }
  ]
}`;

    const prompt = `Generate 4 worksheet questions for topic "${topic}" (${grade}, ${difficulty}).`;
    const response = await this.callGemini(prompt, systemPrompt);
    return this.extractJSON(response.text);
  }

  // 5. Flashcards Generator
  public async generateFlashcards(topic: string, targetLang: string): Promise<any> {
    const systemPrompt = `Generate 6 visual flashcards in Hindi and ${targetLang}.
Return ONLY a JSON array of objects:
[
  {"id": "fc1", "category": "Numbers", "hindi": "एक (1)", "target": "ᱢᱤᱫ", "script": "᱑", "phonetic": "Mit", "symbolOrImage": "1️⃣", "audioText": "Mit"},
  {"id": "fc2", "category": "Animals", "hindi": "गाय (Cow)", "target": "ᱰᱟᱝᱜᱽᱨᱤ", "phonetic": "Dangri", "symbolOrImage": "🐄", "audioText": "Dangri"}
]`;

    const prompt = `Generate flashcards for topic: "${topic}" in ${targetLang}.`;
    const response = await this.callGemini(prompt, systemPrompt);
    return this.extractJSON(response.text);
  }

  // 6. Story Generator
  public async generateStory(theme: string, grade: string, targetLang: string): Promise<any> {
    const systemPrompt = `Generate a culturally relevant children's story set in Jharkhand for primary school (${grade}) in Hindi and ${targetLang}.
Return ONLY a valid JSON object:
{
  "id": "story_${Date.now()}",
  "titleHindi": "छोटानागपुर की ${theme} गाथा",
  "titleTarget": "ᱥᱟᱨᱡᱚᱢ ᱵᱤᱨ ᱨᱮᱱᱟᱜ ᱠᱟᱦᱱᱤ (${theme})",
  "phoneticTitle": "Sarjom Bir Renag Kahni (${theme})",
  "theme": "${theme}",
  "grade": "${grade}",
  "targetLang": "${targetLang}",
  "contentHindi": ["एक सुंदर गाँव में बच्चे रहते थे।", "वे हर दिन सखुआ के जंगल में जाते थे।", "उन्होंने सीखा कि प्रकृति हमारी मित्र है।"],
  "contentTarget": ["ᱢᱤᱫ ᱥᱚᱨᱮᱥ ᱟᱹᱛᱩ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾", "ᱟᱹᱠᱩ ᱫᱤᱱᱚᱢ ᱦᱤᱞᱚᱜ ᱥᱟᱨᱡᱚᱢ ᱵᱤᱨ ᱛᱮ ᱠᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾", "ᱟᱹᱠᱩ ᱠᱚ ᱪᱮᱫ ᱠᱮᱫᱟ ᱪᱮᱫ ᱞᱮᱠᱟ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱵᱚᱱ ᱜᱟᱛᱮ ᱠᱟᱱᱟ ᱠᱚ᱾"],
  "phoneticContent": ["Mit sores atu re gidra ko tahe kana.", "Aku dinom hilog Sarjom bir te ko senog-a.", "Aku ko ched keda ched leka dare-nari bon gate kana ko."],
  "illustrations": ["🌳", "🏡", "💧"],
  "comprehensionQuestions": [
    {"questionHindi": "कहानी में गाँव कहाँ था?", "questionTarget": "ᱟᱹᱛᱩ ᱚᱠᱟᱨᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ?", "options": ["जंगल के पास", "शहर में"], "answerIndex": 0}
  ],
  "culturalDisclaimer": "Notice: AI-generated fictional story inspired by Jharkhand ecosystems for bilingual reading practice."
}`;

    const prompt = `Write a 3-paragraph children story on theme "${theme}" for ${grade} in ${targetLang}.`;
    const response = await this.callGemini(prompt, systemPrompt);
    return this.extractJSON(response.text);
  }

  // 7. Quiz Generator
  public async generateQuiz(topic: string, grade: string, targetLang: string): Promise<any> {
    const systemPrompt = `Generate a 3-question MCQ quiz for primary students in ${targetLang}.
Return ONLY a JSON array of question objects:
[
  {"question": "Santhali for number 1 (एक)?", "options": ["Mit", "Bar", "Pe"], "answerIndex": 0}
]`;

    const prompt = `Generate quiz questions on topic "${topic}" for ${grade} in ${targetLang}.`;
    const response = await this.callGemini(prompt, systemPrompt);
    return this.extractJSON(response.text);
  }

  // 8. Ask BhashaSetu AI Assistant
  public async chatAssistant(userPrompt: string, context?: string): Promise<{ text: string; actionTab?: string }> {
    const systemPrompt = `You are Ask BhashaSetu, a friendly classroom AI teaching assistant for primary school teachers in Jharkhand tribal regions.
Provide concise, practical pedagogical advice for mother-tongue education (Santhali, Ho, Mundari).`;

    const fullPrompt = `${context ? `Context: ${context}\n` : ''}Teacher Question: "${userPrompt}"`;
    const response = await this.callGemini(fullPrompt, systemPrompt);

    let targetTab: string | undefined = undefined;
    const lower = userPrompt.toLowerCase();
    if (lower.includes('lesson')) targetTab = 'universal-lesson';
    else if (lower.includes('worksheet')) targetTab = 'worksheets';
    else if (lower.includes('hear') || lower.includes('deaf')) targetTab = 'everychild';
    else if (lower.includes('translate')) targetTab = 'translation-studio';

    return { text: response.text, actionTab: targetTab };
  }

  // 9. AI Visual Description & Image-to-Lesson
  public async visualDescription(imageConcept: string, targetLang: string): Promise<any> {
    const systemPrompt = `Generate a child-friendly audio and visual description for a visually-impaired student in Hindi and ${targetLang}.
Return ONLY a valid JSON object:
{
  "title": "${imageConcept}",
  "symbol": "🖼️",
  "hindiDesc": "चित्र में ${imageConcept} दिखाई दे रहा है।",
  "targetDesc": "ᱪᱤᱛᱟᱹᱨ ᱨᱮ ${imageConcept} ᱢᱮᱱᱟᱜ-ᱟ᱾",
  "phonetic": "Citar re ${imageConcept} menag-a."
}`;

    const prompt = `Describe object/image concept: "${imageConcept}" for a primary student in ${targetLang}.`;
    const response = await this.callGemini(prompt, systemPrompt);
    return this.extractJSON(response.text);
  }
}

export const geminiService = new GeminiService();
