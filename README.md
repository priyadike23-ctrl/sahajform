# SahajForm (सहजफ़ॉर्म) 📄✨
> **Demystifying Government Forms for Every Citizen.**

SahajForm is an intelligent, high-accessibility web application designed to bridge the gap between complex bureaucratic jargon and everyday citizens. Government applications, legal forms, and official affidavits are notoriously difficult to navigate. They are often filled with rigid, intimidating legalese, written in unfamiliar languages, and designed with low readability. 

SahajForm solves this by leveraging Gemini AI to transform scanned paper forms, PDFs, and official documents into friendly, simple, interactive, and voice-assisted guided wizards in local languages.

---

## 🔗 Live Demo
👉 **[Launch SahajForm Live Demo](https://ais-pre-egaz6uz4bs4zxx54y33ww7-205116143886.asia-southeast1.run.app)** *(Replace with your deployed custom link)*

---

## 🎯 The Problem & Our Solution
For millions of citizens, particularly those with visual impairments, language barriers, or varying levels of literacy, filling out an official form can be an overwhelming obstacle. A single mistake can lead to delays or outright rejection.

**SahajForm** dismantles these structural barriers:
1. **Translates Bureaucracy to Humanity**: It translates rigid jargon into comforting, day-to-day explanations.
2. **Accessible Form Filling**: It provides text-to-speech guidance and native voice typing so citizens can listen, understand, and speak to complete their applications.
3. **Offline Resilience**: Offers offline-cached dictionaries of complex legal words so citizens can get assistance even without active internet connections.

---

## 🚀 Key Features

*   **📷 Scanned Form OCR & Upload**: Upload any photo, scan, or PDF of a government form. SahajForm automatically extracts input fields, instructions, and structure using multimodal AI.
*   **✍️ Plain Language Simplification**: Translates complex, formal instructions into simple, comforting, everyday phrases.
*   **🗣️ Interactive Text-to-Speech (TTS)**: High-quality local-language voice synthesis reads out questions, instructions, and vocabulary definitions in the user's chosen language.
*   **🎙️ Native Voice Input (STT)**: Allows citizens to answer questions hands-free by speaking naturally into their microphone in their native tongue.
*   **🌐 Multilingual Support**: Seamlessly switch between **English**, **Hindi (हिन्दी)**, **Marathi (मराठी)**, and **Bengali (বাংলা)**.
*   **⚠️ Rejection Risk Assessment**: Runs real-time safety and diagnostic checks on user inputs to identify common application mistakes, missing declarations, or potential reasons for rejection.
*   **📚 Offline-First Bureaucratic Glossary**: A locally-cached dictionary containing complex legal terms paired with simple translations, remaining fully functional even in areas with poor or no internet connectivity.
*   **🛡️ Privacy-First Stateless Design**: No forms, documents, or personal data are ever persisted or saved to a database. All inputs stay in transient, local browser memory and disappear on reset.

---

## 🔄 Step-by-Step App Workflow

1.  **Upload & Ingest**: The user drags and drops or uploads a document (or selects a preloaded template like a *Domicile Certificate* or *Affidavit*).
2.  **AI Simplification**: The document is processed to extract fields and map out rigid terminology.
3.  **Guided Wizard**: SahajForm breaks down the daunting application page into one simple question at a time. Citizens can use the audio controls to hear questions read out loud or dictate their answers using voice typing.
4.  **Diagnostic Check**: Before final output, the engine checks for missing details, formatting errors, or common mistakes that could trigger a government rejection.
5.  **Review Summary**: Generates a unified preview and a pre-filled submission draft ready to print or copy, alongside clear lists of required supplementary attachments and common gotchas.
6.  **Glossary Access**: Users can lookup intimidating words at any point during the process.

---

## 🛠️ Technology Stack

*   **Frontend**: React 18+ (Vite)
*   **Language**: TypeScript (with robust type definitions for forms and glossary items)
*   **Styling**: Tailwind CSS (optimized for high-contrast accessibility standards and responsive mobile layouts)
*   **AI Engine**: Gemini API (utilizing official `@google/genai` TypeScript SDK for lightning-fast server-side form understanding)
*   **Web Speech API**: Integrated SpeechSynthesis (TTS) and WebkitSpeechRecognition (STT) for hands-free audio assistance

---

## 💻 Run Locally

Follow these steps to set up SahajForm on your local development machine:

### 1. Clone & Install Dependencies
First, clone the repository to your machine, navigate to the folder, and install the required npm packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` (or `.env` in the root directory) and add your server-side Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Run Development Server
Boot the TypeScript server and Vite frontend bundle runner:
```bash
npm run dev
```

The application will be accessible locally at:
👉 **`http://localhost:3000`**

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

*Made with 💖 to make digital government services accessible to everyone, everywhere.*
