# BhashaSetu AI — Vernacular Pedagogy & Inclusive Education Platform

> **“One Teacher. Many Languages. Every Child Included.”**

BhashaSetu AI is an offline-first AI educational platform designed specifically for primary school teachers in tribal regions of Jharkhand (starting with Santhali, expandable to Ho and Mundari). It allows Hindi-medium teachers who do not speak tribal languages to teach children seamlessly in their mother tongue, with deep NIPUN Bharat alignment, EveryChild accessibility features, real-time voice translation, offline language packs, and Gemini AI lesson generation.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Google Gemini API Key**: Configured in environment variables

### 2. Environment Configuration
Create a `.env` file in both the project root and `backend/` directory (refer to `.env.example`):

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
GEMINI_MODEL=gemini-3.6-flash
PORT=5000
API_BASE_URL=http://localhost:5000
OFFLINE_MODE=false
```

> [!IMPORTANT]
> **Security Requirement**: Never commit `.env` or hard-code API keys in frontend code. The key is securely loaded on the Express server side.

### 3. Install & Run

#### Backend Server (Port 5000)
```bash
cd backend
npm install
npm run dev
```

#### Frontend Application (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/) in your web browser.

---

## 🌟 Key Architecture & Capabilities

### 🟢 Online AI Mode vs 🔵 Offline Mode
- **🟢 ONLINE AI Mode**: Calls the backend Node.js Express server to invoke Google Gemini (`gemini-3.6-flash`) for real-time translation, Universal 14-in-1 lesson generation, A4 printable worksheets, flashcards, local Jharkhand stories, quizzes, and visual descriptions.
- **🔵 OFFLINE Mode**: Operates 100% locally from browser **IndexedDB** (`BhashaSetuDB`) and pre-bundled language packs (Santhali Ol Chiki ᱚᱞ ᱪᱤᱠᱤ glossaries, audio phonemes, local lesson templates) with zero internet dependency.
- **Auto Network Detection**: Automatically switches to Offline Mode when internet connectivity disappears and notifies the teacher without interrupting class.

### ♿ EveryChild Inclusive Accessibility Engine
- **"Speak Without Speaking" PECS Board**: 12 core picture cards with immediate TTS speech output for non-verbal children.
- **Silent Classroom Mode**: Visual speech wave indicators, gesture instructional cards, visual alerts, and full captioning for deaf/hard-of-hearing children.
- **AI Visual Description & Image-to-Lesson**: Generates child-friendly audio and bilingual descriptions for visually impaired children.
- **Lite Mode**: Disables animations for low-end 2 GB RAM Android tablets.

### 🎯 NIPUN Bharat FLN Alignment
- Maps generated lessons, activities, and worksheets to Foundational Literacy and Numeracy (FLN) learning outcomes.

---

## 🧪 Testing & AI Diagnostics

Navigate to the **AI Diagnostics** page in the sidebar or test the health endpoint directly:

```bash
curl http://localhost:5000/api/ai/health
```

**Response**:
```json
{
  "connected": true,
  "model": "gemini-3.6-flash",
  "latencyMs": 340,
  "message": "✓ AI model connected and working correctly."
}
```

---

## 📱 Building for Android & PWA
BhashaSetu AI is packaged as an offline-first PWA. To build for production or wrap with Capacitor/TWA for Android:

```bash
cd frontend
npm run build
```
The production bundle will be generated in `frontend/dist`.
