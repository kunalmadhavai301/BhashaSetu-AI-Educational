import React, { useState } from 'react';
import { Bot, X, Mic, Send, Sparkles, Volume2, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { speechEngine } from '../../services/speechEngine';

export const AskBhashaSetuModal: React.FC = () => {
  const { isAskBhashaSetuOpen, setIsAskBhashaSetuOpen, activeLanguage, activeGrade, speakText, setActiveTab } = useApp();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string; actionTab?: string }[]>([
    {
      sender: 'ai',
      text: `Namaste Teacher! I am Ask BhashaSetu, your classroom AI assistant. Ask me pedagogical guidance, activity ideas, translation assistance, or accessibility adaptations for ${activeGrade} in ${activeLanguage}.`,
    },
  ]);
  const [isListening, setIsListening] = useState(false);

  if (!isAskBhashaSetuOpen) return null;

  const quickQueries = [
    'How can I teach addition to Class 1 using Sal leaves?',
    'Give me a 20-minute group activity.',
    'Explain this number lesson for a child who cannot hear.',
    'Create a worksheet on numbers 1-10.',
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || prompt;
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setPrompt('');

    // Generate Contextual AI Response
    setTimeout(() => {
      let aiReply = '';
      let targetTab: string | undefined = undefined;

      const lower = q.toLowerCase();
      if (lower.includes('addition') || lower.includes('जोड़')) {
        aiReply = `For Class 1 Addition in ${activeLanguage}: Use physical Sal leaves! Tell students "Mit (1) + Bar (2) = Pe (3)". Ask children to collect 5 leaves and count "Monre".`;
        targetTab = 'universal-lesson';
      } else if (lower.includes('activity') || lower.includes('20-minute')) {
        aiReply = `20-Minute Vernacular Activity: "Sal Leaf Collector". Divide class into pairs. Team A calls a Santhali number (e.g. "Bar"), Team B shows 2 objects. Swap after 10 mins!`;
        targetTab = 'learning-games';
      } else if (lower.includes('cannot hear') || lower.includes('hear') || lower.includes('deaf')) {
        aiReply = `For Hearing-Impaired Students: Switch to "Silent Classroom Mode" in EveryChild tab. Use visual flashcards with 1️⃣ 2️⃣ symbols and sign gestures!`;
        targetTab = 'everychild';
      } else if (lower.includes('worksheet')) {
        aiReply = `I will navigate you to Worksheet Studio to generate a printable A4 sheet for ${activeGrade}.`;
        targetTab = 'worksheets';
      } else {
        aiReply = `Here is pedagogical guidance for "${q}": Integrate local Jharkhand forest examples (Sarjom trees, river pebbles), pronounce key terms in ${activeLanguage}, and use EveryChild visual cards.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply, actionTab: targetTab }]);
      speakText(aiReply);
    }, 1000);
  };

  const handleMicClick = () => {
    setIsListening(true);
    speechEngine.startSpeechRecognition((recText) => {
      setIsListening(false);
      handleSend(recText);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-elevated border border-slate-200 overflow-hidden flex flex-col h-[520px]">
        {/* Header */}
        <div className="p-4 bg-sal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-harvest-500 text-sal-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Ask BhashaSetu AI</h3>
              <p className="text-[10px] text-sal-300">Offline Classroom Pedagogical Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsAskBhashaSetuOpen(false)}
            className="p-1 rounded-xl text-sal-300 hover:text-white hover:bg-sal-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Query Pills */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          <Lightbulb className="w-4 h-4 text-harvest-600 shrink-0" />
          {quickQueries.map((qq, i) => (
            <button
              key={i}
              onClick={() => handleSend(qq)}
              className="text-[11px] font-medium bg-white hover:bg-sal-50 border border-slate-200 px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap shrink-0 transition-colors"
            >
              {qq}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] p-3 rounded-2xl text-xs ${
                  m.sender === 'user'
                    ? 'bg-sal-700 text-white font-medium rounded-br-none'
                    : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>

                {m.actionTab && (
                  <button
                    onClick={() => {
                      setIsAskBhashaSetuOpen(false);
                      setActiveTab(m.actionTab!);
                    }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sal-800 text-white font-bold text-[10px] hover:bg-sal-900 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3 h-3 text-harvest-400" /> Open Tool Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <button
            onClick={handleMicClick}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Speak voice command"
          >
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI assistant for teaching advice, activities, translation..."
            className="flex-1 text-xs font-medium bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-sal-600"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-sal-700 hover:bg-sal-800 text-white font-semibold transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
