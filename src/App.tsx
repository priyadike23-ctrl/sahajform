import React, { useState, useEffect, useRef } from "react";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Info, 
  Sparkles, 
  Check, 
  RotateCcw, 
  HelpCircle, 
  Eye, 
  Sun, 
  Moon,
  Heading,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Languages,
  Play,
  Pause,
  Plus,
  Download,
  Copy,
  Loader2
} from "lucide-react";
import { SimplifiedForm, GlossaryTerm } from "./types";
import { demoForms, glossaryTerms } from "./demoData";

// Setup SpeechRecognition fallback
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const LANGUAGES = [
  { code: 'en', label: 'English', englishLabel: 'English' },
  { code: 'hi', label: 'हिंदी', englishLabel: 'Hindi' },
  { code: 'mr', label: 'मराठी', englishLabel: 'Marathi' },
  { code: 'bn', label: 'বাংলা', englishLabel: 'Bengali' },
];

export const sahajTranslations: Record<string, Record<string, string>> = {
  en: {
    tools: "Accessibility Options:",
    home: "Home",
    upload: "Simplify a Form",
    glossary: "Help Word Glossary",
    subtitle: "Plain Government & Legal Forms • Simple Language & Voice Assistant",
    chooseLang: "Choose Output Translation Language:",
    uploadTitle: "Simplify a Government Form",
    uploadSubtitle: "Upload form images, paste text, or use our pre-filled live demo forms.",
    demoTitle: "Choose a Pre-filled Demo Form (Instant Test)",
    uploadBoxTitle: "Upload Form Photo / Scan",
    uploadBoxSubtitle: "Drag & drop image here or click to browse",
    pasteLabel: "Alternative: Paste Form Text Directly",
    pastePlaceholder: "If you do not have an image, copy and paste the complex legal paragraphs, terms, or field labels of your form here...",
    simplifyBtn: "Simplify My Form Now",
    resetBtn: "Reset & Start Fresh",
    voiceMute: "Stop Voice",
    voiceActive: "Voice Mode Enabled",
    demoStart: "Start Demo",
    steps: "Steps",
    purpose: "What is this form for? (Form Purpose):",
    requiredDocs: "Papers You Will Need:",
    commonMistakes: "Common Mistakes to Avoid:",
    glossaryTitle: "Quick Term Dictionary:",
    glossaryDesc: "Click any word to see what it really means:",
    allWords: "View All Words →",
    bureaucraticGlossary: "Bureaucratic Words Glossary",
    clearFilters: "Clear filters",
    noWords: "No words found",
    askAssistant: "Ask Follow-up Question:",
    voiceModeEnabled: "Voice Mode Enabled",
    thinking: "Assistant is thinking...",
    assistantAnswer: "Assistant Answer:",
    listenAgain: "Listen Again",
    previous: "Previous (Back)",
    next: "Next Step (Next)",
    finish: "Finish",
    congrats: "Congratulations! You have understood all parts of the form. You are ready to fill the real hardcopy form.",
    formFieldLabel: "Form Field Label:",
    originalText: "Original Text on the Form:",
    sahajMeaning: "Sahaj Simplified Meaning:",
    readAloud: "Read Aloud",
    exampleFill: "Example of what you can fill in:",
    sampleAnswer: "Sample Answer:",
    details: "Details",
    close: "Clear Selected",
    badge: "India's First Plain Language Form Assistant",
    heroTitle: "Understand Complex Government and Legal Forms in Plain Language, Out Loud!",
    heroDesc: "No more fear of complex bureaucratic language. SahajForm converts intimidating form descriptions into simple, step-by-step guides with direct voice readings and answers to your follow-up questions.",
    simplifyBtnCta: "Simplify a Form Now",
    tryDemoBtn: "Try Indian Demo Forms",
    noDataSaved: "No data saved permanently",
    voiceSupport: "Read Aloud & Voice Assistance",
    multiLanguageSupport: "English, Hindi, Marathi & Bengali",
    bentoTitle: "Key Features Crafted For You",
    bentoSubtitle: "Use these four pillars to understand any legal or government form easily",
    feature1Title: "1. Upload Form (OCR)",
    feature1Desc: "Upload or drag a clear photo/scan of any government, court, or legal form. Our AI extracts it instantly.",
    feature2Title: "2. Plain & Simple Language",
    feature2Desc: "We strip out archaic legal jargon and replace it with everyday friendly local terms.",
    feature3Title: "3. Text-to-Speech (Audio)",
    feature3Desc: "Clear and accessible audio read-aloud for visually impaired or low-literacy users.",
    feature4Title: "4. Voice Follow-up",
    feature4Desc: "Click the mic and ask anything like 'What is an affidavit?' to get an instant explanation.",
    readyToTestTitle: "Are you ready to try it? (Try It Out)",
    readyToTestDesc: "Whether you have a form to upload or want to try with our preloaded examples, let's get started.",
    readyToTestBtn: "Go to Simplification Dashboard",
    uploadTitlePage: "Simplify a Government Form",
    uploadSubtitlePage: "Upload form photos, paste text, or use our pre-filled live demo forms.",
    catAll: "All",
    catLegal: "Legal",
    catIdentity: "Identity",
    catFinancial: "Financial",
    catAddress: "Address"
  },
  hi: {
    tools: "सहायता उपकरण (Tools):",
    home: "मुख्य पृष्ठ (Home)",
    upload: "फ़ॉर्म अपलोड (Upload)",
    glossary: "शब्दकोश (Glossary)",
    subtitle: "आसान सरकारी एवं कानूनी फॉर्म • Plain Language & Voice Assistant",
    chooseLang: "सरल भाषा चुनें (Language for output):",
    uploadTitle: "नया फ़ॉर्म सरल करें",
    uploadSubtitle: "सरकारी फॉर्म की तस्वीर अपलोड करें, टेक्स्ट पेस्ट करें, या डेमो फॉर्मों का उपयोग करें।",
    demoTitle: "डेमो फॉर्म चुनें (त्वरित परीक्षण)",
    uploadBoxTitle: "यहाँ फ़ॉर्म की फ़ोटो खींचकर डालें",
    uploadBoxSubtitle: "तस्वीर यहाँ खींचें (Drag & Drop) या ढूँढने के लिए दबाएँ",
    pasteLabel: "वैकल्पिक: फॉर्म का टेक्स्ट यहाँ पेस्ट करें",
    pastePlaceholder: "यदि आपके पास फॉर्म की फोटो नहीं है, तो आप उसके कठिन पैराग्राफ या नियमों को यहाँ कॉपी करके पेस्ट कर सकते हैं...",
    simplifyBtn: "फ़ॉर्म को आसान भाषा में बदलें",
    resetBtn: "हटाएं और नया चुनें",
    voiceMute: "आवाज़ बंद करें",
    voiceActive: "आवाज़ चालू है",
    demoStart: "डेमो शुरू करें",
    steps: "कदम",
    purpose: "फ़ॉर्म किसलिए है? (Form Purpose):",
    requiredDocs: "आवश्यक दस्तावेज (Required Papers):",
    commonMistakes: "सावधान रहें (Mistakes to Avoid):",
    glossaryTitle: "कठिन शब्दों का अर्थ जानें:",
    glossaryDesc: "किसी भी शब्द पर क्लिक करके उसका सरल अर्थ जानें:",
    allWords: "सभी शब्द देखें →",
    bureaucraticGlossary: "सरकारी और कानूनी शब्दकोश",
    clearFilters: "फ़िल्टर साफ़ करें",
    noWords: "कोई शब्द नहीं मिला",
    askAssistant: "सहायक से सवाल पूछें (Ask a Question):",
    voiceModeEnabled: "आवाज़ मोड सक्रिय",
    thinking: "सहायक सोच रहा है...",
    assistantAnswer: "सहायक का उत्तर (Sahaj Answer):",
    listenAgain: "फिर से सुनें",
    previous: "पिछला (Back)",
    next: "अगला (Next)",
    finish: "समाप्त (Finish)",
    congrats: "शाबाश! आपने फ़ॉर्म के सभी मुख्य भाग समझ लिए हैं। अब आप अपना मुख्य कागज़ी फ़ॉर्म भरना शुरू कर सकते हैं।",
    formFieldLabel: "फ़ॉर्म का भाग (Form Field Label):",
    originalText: "मूल फ़ॉर्म में लिखा जटिल शब्द (Original Complex Text):",
    sahajMeaning: "आसान भाषा में समझें (Sahaj Simple Meaning):",
    readAloud: "बोलकर सुनाएं",
    exampleFill: "आपको क्या लिखना है (Example of what to fill in):",
    sampleAnswer: "जैसे (Example):",
    details: "अर्थ और उदाहरण जानें (Details)",
    close: "बंद करें (Close)",
    badge: "भारत का पहला सरल फ़ॉर्म सहायक (Easy Form Assistant)",
    heroTitle: "जटिल सरकारी और कानूनी फॉर्मों को समझें बेहद सरल भाषा में, बोलकर!",
    heroDesc: "राशन कार्ड, आय प्रमाण पत्र या पासपोर्ट के कठिन शब्दों से अब डरना नहीं। साहजफ़ॉर्म आपके कठिन फॉर्म को सरल कहानियों जैसी भाषा में बदलता है, बोलकर सुनाता है और आपके सवालों के जवाब भी देता है।",
    simplifyBtnCta: "अभी फ़ॉर्म सरल करें",
    tryDemoBtn: "डेमो फॉर्म देखें (Demo)",
    noDataSaved: "कोई डेटा स्थायी रूप से सुरक्षित नहीं होता",
    voiceSupport: "बोलकर सुनाना और आवाज़ सहायक",
    multiLanguageSupport: "अंग्रेजी, हिंदी, मराठी और बंगाली सपोर्ट",
    bentoTitle: "विशेष रूप से आपके लिए बनाया गया (Key Features)",
    bentoSubtitle: "किसी भी कानूनी या सरकारी फॉर्म को आसानी से समझने के लिए इन चार स्तंभों का उपयोग करें",
    feature1Title: "1. फ़ॉर्म अपलोड (OCR)",
    feature1Desc: "अपने सरकारी या अदालती फ़ॉर्म का एक साफ़ फ़ोटो खींचकर अपलोड करें। हमारी कृत्रिम बुद्धिमत्ता (AI) उसे खुद पढ़ लेगी।",
    feature2Title: "2. अत्यंत सरल भाषा",
    feature2Desc: "कठिन कानूनी और सरकारी शब्दों को हटाकर आसान बोलचाल की भाषा (हिंदी या अंग्रेजी) में अनुवाद प्रदान करता है।",
    feature3Title: "3. बोलकर सुनाना (Audio)",
    feature3Desc: "दृष्टिबाधित और कम साक्षरता वाले उपयोगकर्ताओं के लिए हर निर्देश को साफ़ आवाज़ में बोलकर सुनाने की सुविधा।",
    feature4Title: "4. बोलकर सवाल पूछें",
    feature4Desc: "यदि आपको कोई चीज़ समझ न आए, तो बस माइक बटन दबाकर बोलकर पूछें, जैसे \"शपथ पत्र क्या होता है?\" और सरल उत्तर पाएँ।",
    readyToTestTitle: "क्या आप परीक्षण के लिए तैयार हैं? (Try It Out)",
    readyToTestDesc: "चाहे आपके पास अपलोड करने के लिए फ़ॉर्म हो या आप सिर्फ एक डेमो देखना चाहते हों, अभी शुरुआत करें। नीचे दिए गए बटन पर क्लिक करें।",
    readyToTestBtn: "Simplification Dashboard में जाएँ",
    uploadTitlePage: "नया फ़ॉर्म सरल करें",
    uploadSubtitlePage: "यहाँ आप सरकारी फॉर्म की तस्वीर अपलोड कर सकते हैं, पाठ चिपका सकते हैं, या हमारे पहले से तैयार डेमो फॉर्मों का उपयोग कर सकते हैं।",
    catAll: "सभी (All)",
    catLegal: "कानूनी (Legal)",
    catIdentity: "पहचान (Identity)",
    catFinancial: "वित्तीय (Financial)",
    catAddress: "पता (Address)"
  },
  mr: {
    tools: "मदत साधने (Tools):",
    home: "मुख्य पृष्ठ (Home)",
    upload: "फॉर्म अपलोड (Upload)",
    glossary: "शब्दकोश (Glossary)",
    subtitle: "सोपे सरकारी आणि कायदेशीर फॉर्म • सोपी भाषा आणि आवाज सहाय्यक",
    chooseLang: "सोपी भाषा निवडा (Language for output):",
    uploadTitle: "नवीन फॉर्म सोपा करा",
    uploadSubtitle: "सरकारी फॉर्मचे चित्र अपलोड करा, मजकूर पेस्ट करा किंवा डेमो फॉर्म वापरा.",
    demoTitle: "डेमो फॉर्म निवडा (त्वरित चाचणी)",
    uploadBoxTitle: "येथे फॉर्मचा फोटो अपलोड करा",
    uploadBoxSubtitle: "चित्र येथे ड्रॅग करा किंवा शोधण्यासाठी क्लिक करा",
    pasteLabel: "पर्यायी: फॉर्मचा मजकूर येथे पेस्ट करा",
    pastePlaceholder: "तुमच्याकडे फोटो नसल्यास, कायदेशीर परिच्छेद किंवा नियम येथे कॉपी-पेस्ट करा...",
    simplifyBtn: "फॉर्म सोप्या भाषेत बदला",
    resetBtn: "हटवा आणि नवीन निवडा",
    voiceMute: "आवाज बंद करा",
    voiceActive: "आवाज सुरू आहे",
    demoStart: "डेमो सुरू करा",
    steps: "पायऱ्या",
    purpose: "हा फॉर्म कशासाठी आहे? (Form Purpose):",
    requiredDocs: "आवश्यक कागदपत्रे (Required Papers):",
    commonMistakes: "टाळावयाच्या चुका (Mistakes to Avoid):",
    glossaryTitle: "कठीन शब्दांचे अर्थ जाणून घ्या:",
    glossaryDesc: "सोपा अर्थ जाणून घेण्यासाठी कोणत्याही शब्दावर क्लिक करा:",
    allWords: "सर्व शब्द पहा →",
    bureaucraticGlossary: "सरकारी आणि कायदेशीर शब्दकोश",
    clearFilters: "फिल्टर साफ करा",
    noWords: "एकही शब्द सापडला नाही",
    askAssistant: "सहाय्यकाला प्रश्न विचारा (Ask a Question):",
    voiceModeEnabled: "आवाज मोड सक्रिय",
    thinking: "सहाय्यक विचार करत आहे...",
    assistantAnswer: "सहाय्यकाचे उत्तर (Sahaj Answer):",
    listenAgain: "पुन्हा ऐका",
    previous: "मागे (Back)",
    next: "पुढे (Next)",
    finish: "पूर्ण करा (Finish)",
    congrats: "अभिनंदन! तुम्ही फॉर्मचे सर्व मुख्य भाग समजून घेतले आहेत. आता तुम्ही मूळ कागदी फॉर्म भरणे सुरू करू शकता.",
    formFieldLabel: "फॉर्मचा भाग (Form Field Label):",
    originalText: "मूळ फॉर्ममधील कठीण मजकूर (Original Complex Text):",
    sahajMeaning: "सोप्या भाषेत अर्थ (Sahaj Simple Meaning):",
    readAloud: "वाचून दाखवा",
    exampleFill: "तुम्हाला काय लिहायचे आहे (Example of what to fill in):",
    sampleAnswer: "उदा (Example):",
    details: "तपशील (Details)",
    close: "बंद करा (Close)",
    badge: "भारताचा पहिला सोपा फॉर्म सहाय्यक (Easy Form Assistant)",
    heroTitle: "गुंतागुंतीचे सरकारी आणि कायदेशीर फॉर्म समजून घ्या सोप्या भाषेत, बोलून!",
    heroDesc: "रेशन कार्ड, उत्पन्न प्रमाणपत्र किंवा पासपोर्टच्या कठीण शब्दांची आता भीती नाही. साहजफॉर्म तुमचे कठीण फॉर्म सोप्या भाषेत बदलते, बोलून दाखवते आणि तुमच्या प्रश्नांची उत्तरेही देते.",
    simplifyBtnCta: "आता फॉर्म सोपा करा",
    tryDemoBtn: "डेमो फॉर्म पहा (Demo)",
    noDataSaved: "कोणताही डेटा कायमचा साठवला जात नाही",
    voiceSupport: "बोलून दाखवणे आणि आवाज सहाय्य",
    multiLanguageSupport: "इंग्रजी, हिंदी, मराठी आणि बंगाली सपोर्ट",
    bentoTitle: "खास तुमच्यासाठी बनवलेली वैशिष्ट्ये",
    bentoSubtitle: "कोणताही कायदेशीर किंवा सरकारी फॉर्म सहज समजण्यासाठी या चार स्तंभांचा वापर करा",
    feature1Title: "१. फॉर्म अपलोड (OCR)",
    feature1Desc: "तुमच्या सरकारी किंवा न्यायालयीन फॉर्मचा स्पष्ट फोटो अपलोड करा. आमचे एआय (AI) तो वाचून घेईल.",
    feature2Title: "२. अत्यंत सोपी भाषा",
    feature2Desc: "कठणी कायदेशीर आणि सरकारी शब्द काढून सोप्या बोलीभाषेत अनुवाद पुरवला जातो.",
    feature3Title: "३. बोलून दाखवणे (Audio)",
    feature3Desc: "दृष्टिहीन आणि कमी साक्षरता असलेल्या वापरकर्त्यांसाठी प्रत्येक सूचना स्पष्ट आवाजात बोलून दाखवण्याची सुविधा.",
    feature4Title: "४. बोलून प्रश्न विचारा",
    feature4Desc: "काही समजले नाही तर फक्त माइक दाबा आणि बोलून प्रश्न विचारा, जसे की 'प्रतिज्ञापत्र म्हणजे काय?' आणि सोपे उत्तर मिळवा.",
    readyToTestTitle: "तुम्ही चाचणीसाठी तयार आहात का? (Try It Out)",
    readyToTestDesc: "तुमच्याकडे अपलोड करण्यासाठी फॉर्म असो किंवा तुम्हाला फक्त डेमो पाहायचा असो, आत्ताच सुरुवात करा। खालील बटणावर क्लिक करा.",
    readyToTestBtn: "Simplification Dashboard मध्ये जा",
    uploadTitlePage: "नवीन फॉर्म सोपा करा",
    uploadSubtitlePage: "येथे तुम्ही सरकारी फॉर्मचे चित्र अपलोड करू शकता, मजकूर पेस्ट करू शकता किंवा डेमो फॉर्म वापरू शकता।",
    catAll: "सर्व (All)",
    catLegal: "कायदेशीर (Legal)",
    catIdentity: "ओळख (Identity)",
    catFinancial: "आर्थिक (Financial)",
    catAddress: "पत्ता (Address)"
  },
  bn: {
    tools: "সহায়তা সরঞ্জাম (Tools):",
    home: "মূল পাতা (Home)",
    upload: "ফর্ম আপলোড (Upload)",
    glossary: "অভিধান (Glossary)",
    subtitle: "সহজ সরকারি ও আইনি ফর্ম • সহজ ভাষা ও ভয়েস সহকারী",
    chooseLang: "সহজ ভাষা নির্বাচন করুন (Language for output):",
    uploadTitle: "নতুন ফর্ম সহজ করুন",
    uploadSubtitle: "সরকারি ফর্মের ছবি আপলোড করুন, টেক্সট পেস্ট করুন অথবা ডেমো ফর্ম ব্যবহার করুন।",
    demoTitle: "ডেমো ফর্ম নির্বাচন করুন (দ্রুট পরীক্ষা)",
    uploadBoxTitle: "এখানে ফর্মের ছবি আপলোড করুন",
    uploadBoxSubtitle: "ছবি এখানে ড্র্যাগ করুন অথবা খোঁজার জন্য ক্লিক করুন",
    pasteLabel: "বিকল্প: ফর্মের টেক্সট এখানে পেস্ট করুন",
    pastePlaceholder: "আপনার কাছে ছবি না থাকলে, জটিল অনুচ্ছেদ বা নিয়ম এখানে কপি-পেস্ট করুন...",
    simplifyBtn: "ফর্মটি সহজ ভাষায় রূপান্তর করুন",
    resetBtn: "মুছে ফেলুন এবং নতুন শুরু করুন",
    voiceMute: "কণ্ঠ বন্ধ করুন",
    voiceActive: "কণ্ঠ সচল আছে",
    demoStart: "ডেমো শুরু করুন",
    steps: "ধাপ",
    purpose: "ফর্মটি কীসের জন্য? (Form Purpose):",
    requiredDocs: "প্রয়োজনীয় কাগজপত্র (Required Papers):",
    commonMistakes: "ভুল এড়িয়ে চলুন (Mistakes to Avoid):",
    glossaryTitle: "কঠিন শব্দের অর্থ জানুন:",
    glossaryDesc: "সহজ অর্থ জানতে যেকোনো শব্দের ওপর ক্লিক করুন:",
    allWords: "সব শব্দ দেখুন →",
    bureaucraticGlossary: "সরকারি ও আইনি অভিধান",
    clearFilters: "ফিল্টার পরিষ্কার করুন",
    noWords: "কোনো শব্দ পাওয়া যায়নি",
    askAssistant: "সহকারীকে প্রশ্ন করুন (Ask a Question):",
    voiceModeEnabled: "ভয়েস মোড সক্রিয়",
    thinking: "সহকারী চিন্তা করছে...",
    assistantAnswer: "সহকারীর উত্তর (Sahaj Answer):",
    listenAgain: "আবার শুনুন",
    previous: "পূর্ববর্তী (Back)",
    next: "পরবর্তী (Next)",
    finish: "সমাপ্ত (Finish)",
    congrats: "অভিনন্দন! আপনি ফর্মের সব মূল অংশ বুঝতে পেরেছেন। এখন আপনি মূল কাগজের ফর্ম পূরণ করা শুরু করতে পারেন।",
    formFieldLabel: "ফর্মের অংশ (Form Field Label):",
    originalText: "মূল ফর্মের জটিল টেক্সট (Original Complex Text):",
    sahajMeaning: "সহজ ভাষায় অর্থ (Sahaj Simple Meaning):",
    readAloud: "পড়ে শুনুন",
    exampleFill: "আপনাকে কী লিখতে হবে (Example of what to fill in):",
    sampleAnswer: "যেমন (Example):",
    details: "বিস্তারিত (Details)",
    close: "বন্ধ করুন (Close)",
    badge: "ভারতের প্রথম সহজ ফর্ম সহকারী (Easy Form Assistant)",
    heroTitle: "জটিল সরকারি ও আইনি ফর্ম বুঝুন অত্যন্ত সহজ ভাষায়, শুনে শুনে!",
    heroDesc: "রেশন কার্ড, আয় শংসাপত্র বা পাসপোর্টের কঠিন শব্দকে আর ভয় পাবেন না। সাহজফর্ম আপনার কঠিন ফর্মকে সহজ গল্পের মতো ভাষায় রূপান্তর করে, পড়ে শোনায় এবং আপনার প্রশ্নের উত্তরও দেয়।",
    simplifyBtnCta: "এখনই ফর্ম সহজ করুন",
    tryDemoBtn: "ডেমো ফর্ম দেখুন (Demo)",
    noDataSaved: "কোনো তথ্য স্থায়ীভাবে সংরক্ষণ করা হয় না",
    voiceSupport: "পড়ে শোনানো এবং ভয়েস সহায়তা",
    multiLanguageSupport: "ইংরেজি, হিন্দি, মারাঠি ও বাংলা সাপোর্ট",
    bentoTitle: "বিশেষভাবে আপনার জন্য তৈরি বৈশিষ্ট্যসমূহ",
    bentoSubtitle: "যেকোনো আইনি বা সরকারি ফর্ম সহজেই বুঝতে এই চারটি স্তম্ভ ব্যবহার করুন",
    feature1Title: "১. ফর্ম আপলোড (OCR)",
    feature1Desc: "আপাতত আপনার সরকারি বা আইনি ফর্মের একটি পরিষ্কার ছবি আপলোড করুন। আমাদের কৃত্রিম বুদ্ধিমত্তা (AI) সেটি নিজে থেকেই পড়ে নেবে।",
    feature2Title: "২. অত্যন্ত সহজ ভাষা",
    feature2Desc: "কঠিন আইনি ও সরকারি শব্দ বাদ দিয়ে দৈনন্দিন সহজ ভাষায় অনুবাদ প্রদান করে।",
    feature3Title: "৩. পড়ে শোনানো (Audio)",
    feature3Desc: "দৃষ্টিপ্রতিবন্ধী এবং কম স্বাক্ষর ব্যবহারকারীদের জন্য প্রতিটি নির্দেশ পরিষ্কার আওয়াজে পড়ে শোনানোর সুবিধা।",
    feature4Title: "৪. মুখে বলে প্রশ্ন করুন",
    feature4Desc: "যদি কোনো বিষয় বুঝতে না পারেন, তবে মাইক বোতাম টিপে প্রশ্ন করুন, যেমন 'হলফনামা কী?' এবং সহজ উত্তর পান।",
    readyToTestTitle: "আপনি কি পরীক্ষার জন্য প্রস্তুত? (Try It Out)",
    readyToTestDesc: "আপনার কাছে আপলোড করার মতো ফর্ম থাকুক বা আপনি শুধু একটি ডেমো দেখতে চান, এখনই শুরু করুন। নিচের বোতামে ক্লিক করুন।",
    readyToTestBtn: "Simplification Dashboard-এ যান",
    uploadTitlePage: "নতুন ফর্ম সহজ করুন",
    uploadSubtitlePage: "এখানে আপনি সরকারি ফর্মের ছবি আপলোড করতে পারেন, টেক্সট পেস্ট করতে পারেন অথবা আমাদের তৈরি ডেমো ফর্মগুলি ব্যবহার করতে পারেন।",
    catAll: "সব (All)",
    catLegal: "আইনি (Legal)",
    catIdentity: "পরিচয় (Identity)",
    catFinancial: "আর্থিক (Financial)",
    catAddress: "ঠিকানা (Address)"
  }
};

const reviewTranslations: Record<string, Record<string, string>> = {
  en: {
    successHeader: "Your form is ready to fill out!",
    successSub: "You now understand every part of this form. Use these answers as your guide when filling the official form.",
    fieldSummary: "Guided Field Answers Summary",
    fieldLabel: "Field Label (Plain Language)",
    noAnswer: "Not filled yet",
    requiredPapers: "Final Reminder: Papers You Will Need",
    commonMistakes: "Final Check: Common Mistakes to Avoid",
    editBtn: "Edit Answers",
    downloadBtn: "Download Summary as Text",
    copyBtn: "Copy Summary",
    copied: "Summary copied to clipboard!",
    congratsMessage: "Excellent job completing the guided walkthrough! By understanding the requirements in plain language, you've taken a huge step towards hassle-free filing.",
    originalTerm: "Original Term",
    yourAnswer: "Your Entered Answer",
    filledStatus: "Filled",
    partialStatus: "Partially filled",
    missingPrefix: "You may be missing: "
  },
  hi: {
    successHeader: "आपका फ़ॉर्म भरने के लिए तैयार है!",
    successSub: "अब आप इस फ़ॉर्म के हर हिस्से को समझ गए हैं। आधिकारिक फ़ॉर्म भरते समय इन उत्तरों का मार्गदर्शक के रूप में उपयोग करें।",
    fieldSummary: "निर्देशित फ़ील्ड उत्तरों का सारांश",
    fieldLabel: "फ़ील्ड का नाम (सरल भाषा में)",
    noAnswer: "अभी नहीं भरा गया",
    requiredPapers: "अंतिम अनुस्मारक: आवश्यक दस्तावेज़",
    commonMistakes: "अंतिम जांच: बचने योग्य सामान्य गलतियां",
    editBtn: "उत्तर सुधारें",
    downloadBtn: "सारांश टेक्स्ट डाउनलोड करें",
    copyBtn: "सारांश कॉपी करें",
    copied: "सारांश क्लिपबोर्ड पर कॉपी हो गया!",
    congratsMessage: "मार्गदर्शित वॉकथ्रू पूरा करने के लिए बहुत बढ़िया काम! सरल भाषा में आवश्यकताओं को समझकर, आपने बिना किसी परेशानी के फॉर्म भरने की दिशा में एक बड़ा कदम उठाया है।",
    originalTerm: "मूल शब्द",
    yourAnswer: "आपका दर्ज उत्तर",
    filledStatus: "भरा हुआ",
    partialStatus: "आंशिक रूप से भरा हुआ",
    missingPrefix: "संभावित कमी: "
  },
  mr: {
    successHeader: "तुमचा फॉर्म भरण्यासाठी तयार आहे!",
    successSub: "आता तुम्हाला या फॉर्मचा प्रत्येक भाग समजला आहे. अधिकृत फॉर्म भरताना या उत्तरांचा मार्गदर्शक म्हणून वापर करा.",
    fieldSummary: "मार्गदर्शित फील्ड उत्तरांचा सारांश",
    fieldLabel: "フィールドचे नाव (सोप्या भाषेत)",
    noAnswer: "अजून भरले नाही",
    requiredPapers: "अंतिम स्मरणपत्र: आवश्यक कागदपत्रे",
    commonMistakes: "अंतिम तपासणी: टाळायच्या सामान्य चुका",
    editBtn: "उत्तरे दुरुस्त करा",
    downloadBtn: "सारांश टेक्स्ट डाउनलोड करा",
    copyBtn: "सारांश कॉपी करा",
    copied: "सारांश क्लिपबोर्डवर कॉपी केला!",
    congratsMessage: "मार्गदर्शित वॉकथ्रू यशस्वीरित्या पूर्ण केल्याबद्दल अभिनंदन! सोप्या भाषेत आवश्यक गोष्टी समजून घेऊन, तुम्ही विनासायास फॉर्म भरण्याच्या दिशेने एक मोठे पाऊल टाकले आहे.",
    originalTerm: "मूळ संज्ञा",
    yourAnswer: "तुमचे नोंदवलेले उत्तर",
    filledStatus: "भरले आहे",
    partialStatus: "अंशतः भरले आहे",
    missingPrefix: "कदाचित गहाळ: "
  },
  bn: {
    successHeader: "আপনার ফর্ম পূরণ করার জন্য প্রস্তুত!",
    successSub: "আপনি এখন এই ফর্মের প্রতিটি অংশ বুঝতে পেরেছেন। অফিসিয়াল ফর্ম পূরণ করার সময় এই উত্তরগুলিকে আপনার গাইড হিসাবে ব্যবহার করুন।",
    fieldSummary: "নির্দেশিত ফিল্ড উত্তরগুলির সংক্ষিপ্তসার",
    fieldLabel: "ফিল্ড লেবেল (সহজ ভাষায়)",
    noAnswer: "এখনো পূরণ করা হয়নি",
    requiredPapers: "চূড়ান্ত অনুস্মারক: আপনার প্রয়োজনীয় কাগজপত্র",
    commonMistakes: "চূড়ান্ত পরীক্ষা: সাধারণ ভুল যা এড়ানো উচিত",
    editBtn: "উত্তর সংশোধন করুন",
    downloadBtn: "সংক্ষিপ্তসার টেক্সট ডাউনলোড করুন",
    copyBtn: "সংক্ষিপ্তসার কপি করুন",
    copied: "সংক্ষিপ্তসার ক্লিপবোর্ডে কপি করা হয়েছে!",
    congratsMessage: "গাইডেড ওয়াকথ্রু সম্পূর্ণ করার জন্য চমৎকার কাজ করেছেন! সহজ ভাষায় প্রয়োজনীয় বিষয়গুলি বুঝতে পারার মাধ্যমে আপনি ঝামেলাহীন ফর্ম পূরণের দিকে একটি বড় পদক্ষেপ নিয়েছেন।",
    originalTerm: "মূল শব্দ",
    yourAnswer: "আপনার দেওয়া উত্তর",
    filledStatus: "পূরণ করা হয়েছে",
    partialStatus: "আংশিক পূরণ করা হয়েছে",
    missingPrefix: "সম্ভবত অনুপস্থিত: "
  }
};

interface FieldStatus {
  status: 'empty' | 'partial' | 'filled';
  missingParts: string[];
}

function getFieldCompletionStatus(field: any, answerText: string | undefined, lang: string): FieldStatus {
  const trimmed = answerText?.trim() || "";
  if (!trimmed) {
    return { status: 'empty', missingParts: [] };
  }

  const text = trimmed.toLowerCase();
  const missingParts: string[] = [];
  
  const originalLower = (field.original_text || "").toLowerCase();
  const nameLower = (field.field_name || "").toLowerCase();
  const explLower = (field.simplified_explanation || "").toLowerCase();

  // 1. Applicant's Identity Details
  const asksGender = originalLower.includes("gender") || originalLower.includes("लिंग") || nameLower.includes("gender") || nameLower.includes("लिंग") || explLower.includes("gender") || explLower.includes("लिंग");
  const asksFather = originalLower.includes("father") || originalLower.includes("husband") || originalLower.includes("पिता") || originalLower.includes("पति") || nameLower.includes("father") || nameLower.includes("husband") || nameLower.includes("पिता") || nameLower.includes("पति") || explLower.includes("father") || explLower.includes("husband") || explLower.includes("पिता") || explLower.includes("पति");
  const asksMother = originalLower.includes("mother") || originalLower.includes("माता") || nameLower.includes("mother") || nameLower.includes("माता") || explLower.includes("mother") || explLower.includes("माता");

  if (asksGender) {
    const genderWords = ["male", "female", "other", "m/f", "m ", "f ", "purush", "mahila", "stri", "पुरुष", "महिला", "स्त्री", "अन्य", "m", "f", "boy", "girl", "man", "woman"];
    const hasGender = genderWords.some(word => text.includes(word));
    if (!hasGender) {
      missingParts.push(lang === 'hi' ? 'लिंग (Gender)' : 'Gender');
    }
  }

  if (asksFather) {
    const hasFather = text.includes("father") || text.includes("husband") || text.includes("पिता") || text.includes("पति") || text.includes("f:") || text.includes("h:") || text.includes("wife") || text.includes("son") || text.includes("d/o") || text.includes("s/o") || text.includes("w/o") || text.split(",").length >= 2 || text.split(":").length >= 2;
    if (!hasFather) {
      missingParts.push(lang === 'hi' ? "पिता/पति का नाम (Father's/Husband's Name)" : "Father's or Husband's Name");
    }
  }

  if (asksMother) {
    const hasMother = text.includes("mother") || text.includes("mom") || text.includes("माता") || text.includes("m:") || text.includes("mother:") || text.split(",").length >= 3;
    if (!hasMother) {
      missingParts.push(lang === 'hi' ? "माता का नाम (Mother's Name)" : "Mother's Name");
    }
  }

  // 2. Service Required
  const asksServiceType = originalLower.includes("fresh") && originalLower.includes("tatkaal");
  if (asksServiceType) {
    const hasFreshReissue = text.includes("fresh") || text.includes("re-issue") || text.includes("reissue") || text.includes("नया") || text.includes("नवीनीकरण");
    const hasNormalTatkaal = text.includes("normal") || text.includes("tatkaal") || text.includes("नॉर्मल") || text.includes("तत्काल");
    const hasBookletPages = text.includes("page") || text.includes("36") || text.includes("60") || text.includes("पन्ने");

    if (!hasFreshReissue) missingParts.push(lang === 'hi' ? 'पासपोर्ट का प्रकार (Fresh/Re-issue)' : 'Type of Passport (Fresh or Re-issue)');
    if (!hasNormalTatkaal) missingParts.push(lang === 'hi' ? 'आवेदन का प्रकार (Normal/Tatkaal)' : 'Type of Application (Normal or Tatkaal)');
    if (!hasBookletPages) missingParts.push(lang === 'hi' ? 'बुकलेट साइज (36/60 Pages)' : 'Booklet Pages (36 or 60 Pages)');
  }

  // 3. Place of Birth
  const asksBirthPlace = originalLower.includes("village or town") || nameLower.includes("place of birth");
  if (asksBirthPlace) {
    const hasState = text.includes("state") || text.includes("राज्य") || text.split(",").length >= 3;
    const hasDistrict = text.includes("district") || text.includes("जिला") || text.split(",").length >= 2;
    
    if (!hasDistrict) missingParts.push(lang === 'hi' ? 'जिला (District)' : 'District');
    if (!hasState) missingParts.push(lang === 'hi' ? 'राज्य (State)' : 'State');
  }

  // 4. Emergency Contact Details
  const asksEmergencyContact = originalLower.includes("emergency contact") || nameLower.includes("emergency contact");
  if (asksEmergencyContact) {
    const hasPhone = /[0-9]{10}/.test(text) || text.includes("mobile") || text.includes("phone") || text.includes("नंबर") || text.includes("मोबाइल");
    const hasAddress = text.includes("address") || text.includes("nagar") || text.includes("chowk") || text.includes("road") || text.includes("पता") || text.split(",").length >= 2;

    if (!hasPhone) missingParts.push(lang === 'hi' ? 'मोबाइल नंबर (Mobile Number)' : 'Mobile Number');
    if (!hasAddress) missingParts.push(lang === 'hi' ? 'पता (Address)' : 'Address');
  }

  // 5. LPG Connection Details
  const asksLpgDetails = originalLower.includes("lpg connection") || explLower.includes("lpg") || explLower.includes("गैस");
  if (asksLpgDetails) {
    if (text.includes("yes") || text.includes("हाँ") || text.includes("है")) {
      const hasConsumerNum = text.includes("consumer") || text.includes("उपभोक्ता") || text.includes("नंबर") || text.includes("no") || /[0-9]/.test(text);
      const hasAgency = text.includes("agency") || text.includes("एजेंसी") || text.includes("gas") || text.includes("गैस");
      if (!hasConsumerNum) missingParts.push(lang === 'hi' ? 'उपभोक्ता संख्या (Consumer Number)' : 'Consumer Number');
      if (!hasAgency) missingParts.push(lang === 'hi' ? 'गैस एजेंसी का नाम (Gas Agency Name)' : 'Gas Agency Name');
    }
  }

  if (missingParts.length > 0) {
    return { status: 'partial', missingParts };
  }

  return { status: 'filled', missingParts: [] };
}

export function getTermDefinition(item: GlossaryTerm, lang: string): string {
  if (item.definitions && typeof item.definitions === 'object') {
    const d = (item.definitions as Record<string, string>)[lang];
    if (d) return d;
  }
  return item.definition;
}

export function getTermExample(item: GlossaryTerm, lang: string): string {
  if (item.examples && typeof item.examples === 'object') {
    const e = (item.examples as Record<string, string>)[lang];
    if (e) return e;
  }
  return item.example;
}

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<'landing' | 'upload' | 'results' | 'glossary' | 'summary'>('landing');
  
  // Accessibility State
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  
  // Form Upload / Input State
  const [pastedText, setPastedText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedPages, setUploadedPages] = useState<string[]>([]);
  const [isFileProcessing, setIsFileProcessing] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('hi');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Translation Helper function
  const t = (key: string): string => {
    return sahajTranslations[selectedLanguage]?.[key] || sahajTranslations['en']?.[key] || key;
  };

  const rt = (key: string): string => {
    return reviewTranslations[selectedLanguage]?.[key] || reviewTranslations['en']?.[key] || key;
  };

  const handleCopySummary = () => {
    if (!activeForm) return;
    
    let textContent = `=========================================\n`;
    textContent += `${activeForm.form_title} - ${rt('fieldSummary')}\n`;
    textContent += `=========================================\n\n`;
    
    activeForm.fields.forEach((field, index) => {
      const answer = userAnswers[field.id]?.trim() || rt('noAnswer');
      textContent += `Step ${index + 1}: ${field.field_name}\n`;
      textContent += `[${rt('originalTerm')}]: ${field.original_text}\n`;
      textContent += `[${rt('yourAnswer')}]: ${answer}\n\n`;
    });
    
    navigator.clipboard.writeText(textContent).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    });
  };

  const handleDownloadSummary = () => {
    if (!activeForm) return;
    
    let textContent = `=========================================\n`;
    textContent += `${activeForm.form_title} - ${rt('fieldSummary')}\n`;
    textContent += `=========================================\n\n`;
    textContent += `${rt('successSub')}\n\n`;
    
    activeForm.fields.forEach((field, index) => {
      const answer = userAnswers[field.id]?.trim() || rt('noAnswer');
      textContent += `Step ${index + 1}: ${field.field_name}\n`;
      textContent += `[${rt('originalTerm')}]: ${field.original_text}\n`;
      textContent += `[${rt('yourAnswer')}]: ${answer}\n`;
      textContent += `-----------------------------------------\n`;
    });
    
    textContent += `\n${rt('requiredPapers')}:\n`;
    activeForm.required_documents.forEach((doc) => {
      textContent += `- [ ] ${doc}\n`;
    });
    
    textContent += `\n${rt('commonMistakes')}:\n`;
    activeForm.common_mistakes.forEach((mistake) => {
      textContent += `- ${mistake}\n`;
    });
    
    textContent += `\n${rt('congratsMessage')}\n`;
    
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeForm.form_title.replace(/\s+/g, "_")}_summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // API Key Status
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean>(false);
  const [checkingApi, setCheckingApi] = useState<boolean>(true);

  // Active Processed Form State
  const [activeForm, setActiveForm] = useState<SimplifiedForm | null>(null);
  const [activeDemoFormKey, setActiveDemoFormKey] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>("Initializing...");
  const [apiError, setApiError] = useState<string | null>(null);
  const [mismatchResult, setMismatchResult] = useState<{
    detectedForms: string[];
    allPages: string[];
  } | null>(null);

  // Rejection Risk Check State
  const [isCheckingAnswer, setIsCheckingAnswer] = useState<boolean>(false);
  const [answerCheckWarnings, setAnswerCheckWarnings] = useState<Record<string, string>>({});
  const [lastCheckedAnswers, setLastCheckedAnswers] = useState<Record<string, string>>({});

  // Voice Synthesis State
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [isSpeechPaused, setIsSpeechPaused] = useState<boolean>(false);
  const [currentSpeakingText, setCurrentSpeakingText] = useState<string>("");
  const [activeVoiceInfo, setActiveVoiceInfo] = useState<string | null>(null);
  
  // Voice Input (Ask Question) State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [activeListeningField, setActiveListeningField] = useState<'pasted' | 'query' | null>(null);
  const [sessionFinalText, setSessionFinalText] = useState<string>("");
  const [sessionInterimText, setSessionInterimText] = useState<string>("");
  const baseTextRef = useRef<string>("");
  const [speechTranscript, setSpeechTranscript] = useState<string>("");
  const [askAnswer, setAskAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  
  // Custom text question fallback
  const [typedQuestion, setTypedQuestion] = useState<string>("");

  // Search & Filters for Glossary
  const [glossarySearch, setGlossarySearch] = useState<string>("");
  const [activeGlossaryTab, setActiveGlossaryTab] = useState<'All' | 'Legal' | 'Identity' | 'Financial' | 'Address'>('All');
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(null);

  // Hybrid Glossary State
  const [debouncedGlossarySearch, setDebouncedGlossarySearch] = useState<string>("");
  const [isSearchingAI, setIsSearchingAI] = useState<boolean>(false);
  const [aiTermsSession, setAiTermsSession] = useState<Record<string, GlossaryTerm & { is_invalid?: boolean }>>({});
  const [glossaryOfflineError, setGlossaryOfflineError] = useState<boolean>(false);

  // Glossary terms - always use the latest static definitions/examples from demoData.ts to bypass stale cache issues
  const [glossary, setGlossary] = useState<GlossaryTerm[]>(() => {
    return glossaryTerms;
  });

  // Keep local storage cache updated
  useEffect(() => {
    try {
      localStorage.setItem("sahaj_glossary_terms", JSON.stringify(glossaryTerms));
    } catch (e) {
      console.error("Failed to cache glossary terms:", e);
    }
  }, []);

  const recognitionRef = useRef<any>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check API status on mount
  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => {
        setIsApiKeyConfigured(data.apiKeyConfigured);
        setCheckingApi(false);
      })
      .catch(() => {
        setCheckingApi(false);
      });

    // Retrieve offline glossary from backend
    fetch("/api/glossary")
      .then(res => {
        if (!res.ok) throw new Error("Offline");
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.glossary)) {
          setGlossary(data.glossary);
        }
      })
      .catch(e => {
        console.log("Using static glossary fallback:", e);
      });

    // Warm up the speechSynthesis voices so they are populated early
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      };
    }
  }, []);

  // Synchronize active form translation when language is switched
  useEffect(() => {
    if (!activeForm) return;

    // 1. If it's a demo form, swap to the pre-translated static version instantly if available
    if (activeDemoFormKey) {
      let nextFormKey = `${activeDemoFormKey}_${selectedLanguage}`;
      if (demoForms[nextFormKey]) {
        setActiveForm(demoForms[nextFormKey]);
        return;
      }
    }

    // 2. If it's a custom uploaded form, or a demo form where static translation isn't available, and an API key is configured
    // We call the backend to translate the form content dynamically
    if (activeForm.language !== selectedLanguage && isApiKeyConfigured) {
      const translateFormContent = async () => {
        setIsProcessing(true);
        setProcessingStatus(selectedLanguage === 'hi' ? "अनुवाद किया जा रहा है..." : "Translating form content...");
        try {
          const res = await fetch("/api/translate-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              form: activeForm,
              language: selectedLanguage
            })
          });
          if (res.ok) {
            const translated = await res.json();
            setActiveForm(translated);
          } else {
            console.error("Dynamic translation API failed");
          }
        } catch (err) {
          console.error("Error during dynamic translation:", err);
        } finally {
          setIsProcessing(false);
        }
      };
      translateFormContent();
    }
  }, [selectedLanguage, activeDemoFormKey]);

  // Stop reading aloud whenever page or wizard step changes
  useEffect(() => {
    stopSpeaking();
    setAskAnswer(null);
    setSpeechTranscript("");
    setTypedQuestion("");
  }, [currentPage, wizardStep, activeForm]);

  // Loading state status-scroller to reassure users
  useEffect(() => {
    if (!isProcessing) return;
    const statuses = [
      "Reading the small print of your form...",
      "Removing complex legal words...",
      "Translating questions into plain language...",
      "Creating simple examples for you...",
      "Adding voice support guidance...",
      "Almost done, building your easy step-by-step wizard..."
    ];
    let index = 0;
    setProcessingStatus(statuses[0]);
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setProcessingStatus(statuses[index]);
    }, 3500);
    return () => clearInterval(interval);
  }, [isProcessing]);

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFiles = async (files: File[] | FileList) => {
    setUploadError(null);
    setApiError(null);
    setMismatchResult(null);
    setIsFileProcessing(true);
    const newPages: string[] = [];
    const baseCount = uploadedPages.length;
    let failedPageMsg: string | null = null;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          const pageNum = baseCount + i + 1;
          failedPageMsg = selectedLanguage === 'hi'
            ? `पेज ${pageNum} को ठीक से नहीं पढ़ा जा सका। कृपया उस फोटो को फिर से खींचें।`
            : `Page ${pageNum} couldn't be read clearly. Try retaking that photo.`;
          continue;
        }

        try {
          const result = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.result) {
                resolve(reader.result as string);
              } else {
                reject(new Error("Empty reader result"));
              }
            };
            reader.onerror = () => reject(new Error("Reader error"));
            reader.readAsDataURL(file);
          });
          newPages.push(result);
        } catch (err) {
          const pageNum = baseCount + i + 1;
          failedPageMsg = selectedLanguage === 'hi'
            ? `पेज ${pageNum} को ठीक से नहीं पढ़ा जा सका। कृपया उस फोटो को फिर से खींचें।`
            : `Page ${pageNum} couldn't be read clearly. Try retaking that photo.`;
        }
      }

      if (newPages.length > 0) {
        setUploadedPages((prev) => {
          const updated = [...prev, ...newPages];
          setImagePreview(updated[0] || null);
          return updated;
        });
        setPastedText("");
      }

      if (failedPageMsg) {
        setUploadError(failedPageMsg);
        setApiError(failedPageMsg);
      }
    } catch (err: any) {
      console.error("File processing error:", err);
      setUploadError("An error occurred while loading your files. Please try again.");
    } finally {
      setIsFileProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Handle Local File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Web Speech API: Text to Speech
  const speakText = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Voice speech is not supported in this browser.");
      return;
    }

    // Toggle pause/resume if requested on the EXACT same text that is already playing/paused
    if (isReadingAloud && currentSpeakingText === text) {
      if (isSpeechPaused) {
        window.speechSynthesis.resume();
        setIsSpeechPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsSpeechPaused(true);
      }
      return;
    }
    
    // Otherwise, cancel any current speaking and start the new text
    window.speechSynthesis.cancel();
    currentUtteranceRef.current = null;
    setIsSpeechPaused(false);
    setCurrentSpeakingText(text);

    const utterance = new SpeechSynthesisUtterance(text);
    currentUtteranceRef.current = utterance;
    
    const synthesisLangMap: Record<string, string> = {
      hi: 'hi-IN',
      en: 'en-US',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
      pa: 'pa-IN',
      ml: 'ml-IN',
      or: 'or-IN',
      ur: 'ur-IN',
      ne: 'ne-NP',
      as: 'as-IN'
    };
    
    const voiceLangCode = synthesisLangMap[lang] || 'en-US';
    utterance.lang = voiceLangCode;
    
    // Choose voice based on language
    const voices = window.speechSynthesis.getVoices();
    const prefix = voiceLangCode.split('-')[0].toLowerCase();

    // Cross-language script fallback groups to guarantee Devanagari / other scripts render correctly
    const fallbackChains: Record<string, string[]> = {
      mr: ['mr', 'hi'],       // Marathi falls back to Hindi (Devanagari script)
      ne: ['ne', 'hi', 'mr'], // Nepali falls back to Hindi / Marathi (Devanagari script)
      as: ['as', 'bn'],       // Assamese falls back to Bengali (Bengali script)
      bn: ['bn', 'as'],       // Bengali falls back to Assamese
      hi: ['hi', 'mr'],       // Hindi falls back to Marathi
      te: ['te'],
      ta: ['ta'],
      gu: ['gu'],
      kn: ['kn'],
      pa: ['pa'],
      ml: ['ml'],
      or: ['or'],
      ur: ['ur', 'hi'],       // Urdu falls back to Hindi
      en: ['en']
    };

    const chain = fallbackChains[prefix] || [prefix];
    let targetVoice = null;

    const languageNames: Record<string, string> = {
      hi: 'hindi',
      mr: 'marathi',
      bn: 'bengali',
      te: 'telugu',
      ta: 'tamil',
      gu: 'gujarati',
      kn: 'kannada',
      pa: 'punjabi',
      ml: 'malayalam',
      or: 'odia',
      ur: 'urdu',
      ne: 'nepali',
      as: 'assamese'
    };

    // Robust search loop across our fallback hierarchy
    for (const p of chain) {
      const targetLangTag = p === 'hi' ? 'hi-IN' : p === 'mr' ? 'mr-IN' : `${p}-IN`;
      
      // 1. Exact match on language tag
      targetVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === targetLangTag.toLowerCase());
      
      // 2. Exact match on prefix-region code (starts with 'hi-' or 'mr-')
      if (!targetVoice) {
        targetVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(p + '-'));
      }
      
      // 3. Prefix match on language alone (e.g. 'mr')
      if (!targetVoice) {
        targetVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(p));
      }
      
      // 4. Name match for the language name (e.g., includes "hindi", "marathi", etc.)
      if (!targetVoice) {
        const langName = languageNames[p];
        if (langName) {
          targetVoice = voices.find(v => v.name.toLowerCase().includes(langName));
        }
      }
      
      // 5. Name contains prefix letter codes
      if (!targetVoice) {
        targetVoice = voices.find(v => v.name.toLowerCase().includes(p));
      }

      if (targetVoice) {
        break; // Match found!
      }
    }

    if (targetVoice) {
      utterance.voice = targetVoice;
      utterance.lang = targetVoice.lang; // CRITICAL: override utterance.lang to force browser to use the correct engine
      setActiveVoiceInfo(`${targetVoice.name} (${targetVoice.lang})`);
    } else {
      // General ultimate fallback to whatever default voice matching the requested prefix, or browser default
      const defaultMatch = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
      if (defaultMatch) {
        utterance.voice = defaultMatch;
        utterance.lang = defaultMatch.lang;
        setActiveVoiceInfo(`${defaultMatch.name} (${defaultMatch.lang})`);
      } else {
        setActiveVoiceInfo(lang === 'hi' ? "डिफ़ॉल्ट सिस्टम आवाज़ (Default System Voice)" : "Default System Voice");
      }
    }

    // Speech rate: slightly slower for elderly/low-literacy comprehension
    utterance.rate = 0.82;

    utterance.onend = () => {
      if (currentUtteranceRef.current === utterance) {
        setIsReadingAloud(false);
        setIsSpeechPaused(false);
        setCurrentSpeakingText("");
        setActiveVoiceInfo(null);
        currentUtteranceRef.current = null;
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted') {
        console.warn("SpeechSynthesis warning:", e.error);
      }
      if (currentUtteranceRef.current === utterance) {
        setIsReadingAloud(false);
        setIsSpeechPaused(false);
        setCurrentSpeakingText("");
        setActiveVoiceInfo(null);
        currentUtteranceRef.current = null;
      }
    };

    setIsReadingAloud(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    currentUtteranceRef.current = null;
    setIsReadingAloud(false);
    setIsSpeechPaused(false);
    setCurrentSpeakingText("");
    setActiveVoiceInfo(null);
  };

  // Web Speech API: Specific field real-time speech-to-text transcription
  const toggleFieldListening = (field: 'pasted' | 'query') => {
    if (activeListeningField === field) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setActiveListeningField(null);
      setSessionFinalText("");
      setSessionInterimText("");
      return;
    }

    if (!SpeechRecognition) {
      return;
    }

    // Cancel/Stop any existing speaking or speech recognition sessions
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Error stopping speech recognition:", err);
      }
    }

    setRecognitionError(null);

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    const synthesisLangMap: Record<string, string> = {
      hi: 'hi-IN',
      en: 'en-US',
      mr: 'mr-IN',
      bn: 'bn-IN',
    };
    recognition.lang = synthesisLangMap[selectedLanguage] || 'en-US';

    // Store the text currently in the box when starting speech typing, so we can append cleanly
    let baseText = field === 'pasted' ? pastedText : typedQuestion;
    if (baseText.trim()) {
      if (!baseText.endsWith(" ")) {
        baseText += " ";
      }
    } else {
      baseText = "";
    }
    baseTextRef.current = baseText;
    setSessionFinalText("");
    setSessionInterimText("");

    recognition.onstart = () => {
      setActiveListeningField(field);
    };

    recognition.onerror = (event: any) => {
      console.error("Field Speech Recognition Error:", event.error);
      setActiveListeningField(null);
      setSessionFinalText("");
      setSessionInterimText("");
      if (event.error === 'not-allowed') {
        if (selectedLanguage === 'hi') {
          setRecognitionError("माइक्रोफ़ोन अनुमति अस्वीकृत (Not Allowed)। कृपया इस प्रीव्यू को नए टैब में खोलें ताकि माइक काम कर सके।");
        } else {
          setRecognitionError("Microphone access is blocked in this preview. Please click 'Open in new tab' to trigger microphone permissions natively.");
        }
      }
    };

    recognition.onend = () => {
      setActiveListeningField(null);
      setSessionFinalText("");
      setSessionInterimText("");
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setSessionFinalText(finalTranscript);
      setSessionInterimText(interimTranscript);

      const updatedText = baseTextRef.current + finalTranscript;
      
      if (field === 'pasted') {
        setPastedText(updatedText);
      } else {
        setTypedQuestion(updatedText);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start SpeechRecognition:", err);
    }
  };

  // Web Speech API: Speech Recognition (Voice input)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!SpeechRecognition) {
      setRecognitionError("Speech typing is not supported in this browser. Please type your question below.");
      return;
    }

    setRecognitionError(null);
    setSpeechTranscript("");
    setAskAnswer(null);

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    // Set language to match the form language
    const synthesisLangMap: Record<string, string> = {
      hi: 'hi-IN',
      en: 'en-US',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
      pa: 'pa-IN',
      ml: 'ml-IN',
      or: 'or-IN',
      ur: 'ur-IN',
      ne: 'ne-NP',
      as: 'as-IN'
    };
    recognition.lang = synthesisLangMap[selectedLanguage] || 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        if (selectedLanguage === 'hi') {
          setRecognitionError("माइक्रोफ़ोन अनुमति अस्वीकृत (Not Allowed)। कृपया इस प्रीव्यू को ऊपर दाईं ओर 'नए टैब में खोलें' आइकॉन द्वारा नए टैब में शुरू करें ताकि माइक काम कर सके, या नीचे बॉक्स में प्रश्न टाइप करें।");
        } else {
          setRecognitionError("Microphone access is blocked in this preview. Please click 'Open in new tab' at the top-right of the preview window to trigger microphone permissions natively, or type your question in the text box.");
        }
      } else {
        if (selectedLanguage === 'hi') {
          setRecognitionError("हम आपकी आवाज़ नहीं सुन पाए। कृपया माइक के करीब बोलें या अपना प्रश्न लिखकर पूछें।");
        } else {
          setRecognitionError("Could not hear you. Please try speaking closer to your microphone or type your question directly.");
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcriptText = event.results[0][0].transcript;
      setSpeechTranscript(transcriptText);
      // Auto-trigger ask-assistant with the captured speech transcript
      askAssistant(transcriptText);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Query Gemini API to answer follow-up questions
  const askAssistant = async (questionText: string) => {
    if (!questionText.trim()) return;
    
    setIsAsking(true);
    setAskAnswer(null);
    stopSpeaking();

    const currentField = activeForm?.fields[wizardStep];
    const fieldContext = currentField 
      ? `Field Name: ${currentField.field_name}, Original Text: ${currentField.original_text}, Simplified Explanation: ${currentField.simplified_explanation}, Example Answer: ${currentField.example_answer}`
      : "General form help";

    const formContext = activeForm 
      ? `Form Title: ${activeForm.form_title}, Purpose: ${activeForm.detected_purpose}`
      : "Government application form";

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questionText,
          field_context: fieldContext,
          form_context: formContext,
          language: selectedLanguage
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAskAnswer(data.answer);
        // Auto read-aloud the answer for the user
        speakText(data.answer, selectedLanguage);
      } else {
        setAskAnswer(data.error || "Sorry, I could not process your question. Please try typing it.");
      }
    } catch (err: any) {
      setAskAnswer("Sorry, I could not connect to the assistant server. Please check your connection.");
    } finally {
      setIsAsking(false);
    }
  };

  // Rejection Risk check for user answer
  const checkAnswerAndNavigate = async (isFinish: boolean) => {
    if (!activeForm) return;
    const currentField = activeForm.fields[wizardStep];
    if (!currentField) return;

    const answer = userAnswers[currentField.id]?.trim() || "";

    // 4. If the field's answer box is empty, skip this check entirely and proceed immediately
    if (!answer) {
      if (isFinish) {
        stopSpeaking();
        setCurrentPage('summary');
      } else {
        setWizardStep(prev => prev + 1);
      }
      return;
    }

    // 5. Keep this check fast and lightweight — do not re-run if the user hasn't changed their answer since the last check on this step
    const lastChecked = lastCheckedAnswers[currentField.id] || "";
    if (answer === lastChecked) {
      const existingWarning = answerCheckWarnings[currentField.id];
      if (existingWarning) {
        // Warning already exists for this exact answer, just keep showing it (stays on this step)
        return;
      }
      // No warning exists, so it's already considered "ok", proceed directly
      if (isFinish) {
        stopSpeaking();
        setCurrentPage('summary');
      } else {
        setWizardStep(prev => prev + 1);
      }
      return;
    }

    // Run the check
    setIsCheckingAnswer(true);
    try {
      const res = await fetch("/api/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          originalText: currentField.original_text,
          simplifiedExplanation: currentField.simplified_explanation,
          commonMistakes: activeForm.common_mistakes,
          userAnswer: answer
        })
      });

      if (!res.ok) {
        throw new Error("Failed to validate answer");
      }

      const data = await res.json();
      
      // Save that we checked this answer
      setLastCheckedAnswers(prev => ({
        ...prev,
        [currentField.id]: answer
      }));

      if (data.status === "warning") {
        setAnswerCheckWarnings(prev => ({
          ...prev,
          [currentField.id]: data.message
        }));
      } else {
        // Clear warning and proceed
        setAnswerCheckWarnings(prev => ({
          ...prev,
          [currentField.id]: ""
        }));
        
        if (isFinish) {
          stopSpeaking();
          setCurrentPage('summary');
        } else {
          setWizardStep(prev => prev + 1);
        }
      }
    } catch (e) {
      console.error("Error checking answer:", e);
      // In case of any error (network failure, etc.), do not block the user!
      if (isFinish) {
        stopSpeaking();
        setCurrentPage('summary');
      } else {
        setWizardStep(prev => prev + 1);
      }
    } finally {
      setIsCheckingAnswer(false);
    }
  };

  // Submit form for Simplification
  const handleSimplifySubmit = async () => {
    if (uploadedPages.length === 0 && !pastedText.trim()) {
      alert("Please upload a form photo/PDF or paste form text first.");
      return;
    }

    setIsProcessing(true);
    setApiError(null);
    setMismatchResult(null);
    setActiveForm(null);
    setActiveDemoFormKey(null);

    try {
      const response = await fetch("/api/simplify-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: uploadedPages,
          text: pastedText,
          language: selectedLanguage
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.is_mismatch) {
          setMismatchResult({
            detectedForms: data.detected_forms && data.detected_forms.length > 0 ? data.detected_forms : ["Form 1", "Form 2"],
            allPages: [...uploadedPages]
          });
        } else {
          setMismatchResult(null);
          setActiveForm(data);
          setWizardStep(0);
          setUserAnswers({});
          setCurrentPage('results');
        }
      } else {
        setApiError(data.error || "Failed to process the form. The image might be blurry or the text contains non-standard characters.");
      }
    } catch (error: any) {
      console.error(error);
      setApiError("Could not reach our simplification engine. Please check your internet connection and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Process only a specific form from the mismatched list
  const handleProcessSingleForm = async (formName: string, formIndex: number) => {
    const pageToKeep = mismatchResult?.allPages[formIndex] || uploadedPages[formIndex] || uploadedPages[0];
    setUploadedPages([pageToKeep]);
    setImagePreview(pageToKeep);
    setMismatchResult(null);
    setApiError(null);
    setIsProcessing(true);
    
    try {
      const response = await fetch("/api/simplify-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: [pageToKeep],
          text: "",
          language: selectedLanguage
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.is_mismatch) {
          setMismatchResult({
            detectedForms: data.detected_forms && data.detected_forms.length > 0 ? data.detected_forms : [formName],
            allPages: [pageToKeep]
          });
        } else {
          setActiveForm(data);
          setWizardStep(0);
          setUserAnswers({});
          setCurrentPage('results');
        }
      } else {
        setApiError(data.error || "Failed to process the form.");
      }
    } catch (err: any) {
      console.error(err);
      setApiError("Could not reach our simplification engine. Please check your internet connection and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear Upload and start fresh
  const handleResetUpload = () => {
    setImagePreview(null);
    setUploadedPages([]);
    setUploadError(null);
    setMismatchResult(null);
    setPastedText("");
    setApiError(null);
    setUserAnswers({});
    setActiveForm(null);
    setActiveDemoFormKey(null);
    setWizardStep(0);
  };

  // Instantly load a demo form
  const handleSelectDemoForm = (formBaseKey: string) => {
    setActiveDemoFormKey(formBaseKey);
    let formKey = `${formBaseKey}_${selectedLanguage}`;
    if (!demoForms[formKey]) {
      // Fallbacks if target language isn't statically defined
      if (formBaseKey === 'ration_card') {
        formKey = 'ration_card_hi';
      } else if (formBaseKey === 'income_certificate') {
        formKey = 'income_certificate_en';
      } else {
        formKey = 'passport_en';
      }
    }
    const form = demoForms[formKey];
    if (form) {
      setActiveForm(form);
      setWizardStep(0);
      setUserAnswers({});
      setCurrentPage('results');
    }
  };

  // Debounce search term to prevent rate limit and spam
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedGlossarySearch(glossarySearch.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [glossarySearch]);

  // Check if a search string has any match in the static glossary
  const hasStaticMatch = (search: string, categoryTab: string) => {
    if (!search) return true;
    return glossary.some(item => {
      const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || 
                            item.translation.toLowerCase().includes(search.toLowerCase()) ||
                            item.definition.toLowerCase().includes(search.toLowerCase());
      const matchesTab = categoryTab === 'All' || item.category === categoryTab;
      return matchesSearch && matchesTab;
    });
  };

  // Trigger AI fallback if no static match and online
  useEffect(() => {
    const triggerAIFallback = async () => {
      const term = debouncedGlossarySearch;
      if (!term || term.length < 2) {
        setIsSearchingAI(false);
        setGlossaryOfflineError(false);
        return;
      }

      // Check if there is any static match
      const existsInStatic = hasStaticMatch(term, activeGlossaryTab);
      if (existsInStatic) {
        setIsSearchingAI(false);
        setGlossaryOfflineError(false);
        return;
      }

      // Check if already in session cache
      const cachedKey = term.toLowerCase();
      if (aiTermsSession[cachedKey]) {
        setIsSearchingAI(false);
        setGlossaryOfflineError(false);
        return;
      }

      // 3. If there is no internet connection (detect via navigator.onLine or a failed fetch)
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setGlossaryOfflineError(true);
        setIsSearchingAI(false);
        return;
      }

      // Call dynamic lookup API
      setIsSearchingAI(true);
      setGlossaryOfflineError(false);

      try {
        const response = await fetch("/api/explain-term", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ term, language: selectedLanguage })
        });

        if (!response.ok) {
          throw new Error("Failed to look up term");
        }

        const data = await response.json();
        
        // Cache returned term (even if is_real is false, we mark it so we don't fetch again)
        setAiTermsSession(prev => ({
          ...prev,
          [cachedKey]: {
            term: data.term || term,
            translation: data.translation || "",
            definition: data.definition || "",
            example: data.example || "",
            category: (data.category as any) || "Legal",
            is_invalid: !data.is_real
          }
        }));
      } catch (error) {
        console.error("AI Glossary fallback error:", error);
        // On failed fetch, check if we might be offline or it just failed
        setGlossaryOfflineError(true);
      } finally {
        setIsSearchingAI(false);
      }
    };

    triggerAIFallback();
  }, [debouncedGlossarySearch, activeGlossaryTab]);

  // Combine static glossary and dynamic AI glossary terms
  const combinedGlossary = React.useMemo(() => {
    // Only include valid dynamic terms in the general glossary list
    const validAiTerms = (Object.values(aiTermsSession) as any[]).filter(item => !item.is_invalid);
    return [...glossary, ...validAiTerms];
  }, [glossary, aiTermsSession]);

  // Filter glossary
  const filteredGlossary = combinedGlossary.filter(item => {
    const termDef = getTermDefinition(item, selectedLanguage);
    const matchesSearch = item.term.toLowerCase().includes(glossarySearch.toLowerCase()) || 
                          item.translation.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                          termDef.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesTab = activeGlossaryTab === 'All' || item.category === activeGlossaryTab;
    return matchesSearch && matchesTab;
  });

  // Dynamic Typography sizes based on user choice
  const textClass = (size: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl') => {
    const baseSizes = {
      sm: 'text-xs md:text-sm',
      base: 'text-sm md:text-base',
      lg: 'text-base md:text-lg',
      xl: 'text-lg md:text-xl',
      '2xl': 'text-xl md:text-2xl',
      '3xl': 'text-2xl md:text-4xl font-bold'
    };
    const largeSizes = {
      sm: 'text-sm md:text-base',
      base: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
      xl: 'text-xl md:text-2xl',
      '2xl': 'text-2xl md:text-3xl',
      '3xl': 'text-3xl md:text-5xl font-bold font-bold'
    };
    const extraLargeSizes = {
      sm: 'text-base md:text-lg',
      base: 'text-lg md:text-xl',
      lg: 'text-xl md:text-2xl',
      xl: 'text-2xl md:text-3xl',
      '2xl': 'text-3xl md:text-4xl',
      '3xl': 'text-4xl md:text-6xl font-bold font-extrabold'
    };

    if (fontSize === 'large') return largeSizes[size];
    if (fontSize === 'xl') return extraLargeSizes[size];
    return baseSizes[size];
  };

  // Color theme selectors based on High Contrast toggle
  const getThemeClasses = () => {
    if (highContrast) {
      return {
        bg: "bg-black text-white selection:bg-yellow-400 selection:text-black",
        card: "bg-black border-4 border-yellow-400 text-white shadow-none",
        accentCard: "bg-black border-4 border-white text-white",
        textMuted: "text-yellow-400 font-bold",
        primaryButton: "bg-yellow-400 text-black border-4 border-black hover:bg-yellow-300 font-extrabold transition-all text-center flex items-center justify-center cursor-pointer",
        secondaryButton: "bg-black text-white border-4 border-white hover:bg-zinc-900 font-bold transition-all text-center flex items-center justify-center cursor-pointer",
        accentButton: "bg-white text-black border-4 border-black hover:bg-zinc-200 font-bold cursor-pointer",
        input: "bg-black text-white border-4 border-yellow-400 focus:border-white focus:ring-0",
        pillActive: "bg-yellow-400 text-black border-2 border-black font-extrabold",
        pillInactive: "bg-black text-white border-2 border-white hover:bg-zinc-900",
        iconColor: "text-yellow-400",
        alertBg: "bg-black border-4 border-red-500 text-white",
        navLink: "hover:bg-zinc-900 text-white border-b-4 border-transparent hover:border-yellow-400",
        navLinkActive: "border-b-4 border-yellow-400 text-yellow-400 font-bold",
        accentText: "text-yellow-400"
      };
    }
    return {
      bg: "bg-[#F0F4F8] text-[#1A365D] selection:bg-[#EBF8FF] selection:text-[#1A365D]",
      card: "bg-white border border-[#E2E8F0] rounded-3xl shadow-md shadow-blue-900/5 hover:shadow-lg transition-all duration-300",
      accentCard: "bg-gradient-to-br from-[#EBF8FF] to-white border border-[#E2E8F0] rounded-3xl text-[#1A365D]",
      textMuted: "text-[#4A5568]",
      primaryButton: "bg-[#2B6CB0] text-white hover:bg-[#3182CE] font-bold rounded-2xl shadow-lg shadow-[#2B6CB0]/20 transition-all text-center flex items-center justify-center cursor-pointer hover:-translate-y-0.5 active:translate-y-0",
      secondaryButton: "bg-[#EDF2F7] text-[#4A5568] hover:text-[#1A365D] hover:bg-[#E2E8F0] font-bold rounded-2xl transition-all text-center flex items-center justify-center cursor-pointer",
      accentButton: "bg-[#EBF8FF] text-[#2B6CB0] hover:bg-[#EBF8FF]/80 font-bold rounded-2xl cursor-pointer",
      input: "bg-white text-[#1A365D] border-2 border-[#E2E8F0] rounded-2xl focus:border-[#2B6CB0] focus:ring-4 focus:ring-[#EBF8FF]/50 focus:outline-none",
      pillActive: "bg-[#2B6CB0] text-white shadow-md shadow-[#EBF8FF]",
      pillInactive: "bg-white text-[#4A5568] hover:text-[#1A365D] border-2 border-[#E2E8F0] hover:bg-[#F7FAFC]",
      iconColor: "text-[#2B6CB0]",
      alertBg: "bg-red-50 border border-red-100 rounded-2xl text-red-800",
      navLink: "text-[#4A5568] hover:text-[#2B6CB0] border-b-2 border-transparent hover:border-[#2B6CB0] font-medium",
      navLinkActive: "border-b-2 border-[#2B6CB0] text-[#2B6CB0] font-extrabold",
      accentText: "text-[#2B6CB0]"
    };
  };

  const theme = getThemeClasses();

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${theme.bg}`}>
      


      {/* HEADER & BRANDING */}
      <header className={`w-full py-4 px-6 border-b flex flex-col md:flex-row items-center justify-between gap-4 ${highContrast ? 'border-yellow-400 bg-black' : 'border-zinc-100 bg-white'}`}>
        <div 
          id="brand-logo"
          onClick={() => setCurrentPage('landing')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className={`p-2.5 rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-[#2B6CB0] text-white shadow-md shadow-[#EBF8FF]'}`}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-black tracking-tight ${highContrast ? 'text-yellow-400' : 'text-zinc-900'}`}>SahajForm</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold bg-green-100 text-green-800 ${highContrast ? 'bg-white text-black border-2 border-black' : ''}`}>AI 3.5</span>
            </div>
            <p className={`text-xs ${theme.textMuted} tracking-wide font-medium`}>{t('subtitle')}</p>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="flex items-center gap-1.5 md:gap-4" aria-label="Main Navigation">
          <button
            id="nav-home"
            onClick={() => setCurrentPage('landing')}
            className={`px-3 py-2 text-sm font-medium ${currentPage === 'landing' ? theme.navLinkActive : theme.navLink}`}
          >
            {t('home')}
          </button>
          <button
            id="nav-simplify"
            onClick={() => setCurrentPage('upload')}
            className={`px-3 py-2 text-sm font-medium ${currentPage === 'upload' ? theme.navLinkActive : theme.navLink}`}
          >
            {t('upload')}
          </button>
          <button
            id="nav-glossary"
            onClick={() => setCurrentPage('glossary')}
            className={`px-3.5 py-2 text-sm font-bold rounded-xl transition-all relative flex items-center gap-1.5 ${
              currentPage === 'glossary' 
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-700' 
                : theme.navLink
            } ring-2 ring-emerald-500/80 dark:ring-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105 animate-pulse`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{t('glossary')}</span>
          </button>
        </nav>
      </header>

      {/* SYSTEM WARNING IF NO GEMINI KEY */}
      {!checkingApi && !isApiKeyConfigured && currentPage === 'upload' && (
        <div id="api-warning-banner" className={`mx-6 mt-4 p-4 ${highContrast ? 'border-4 border-yellow-400 bg-black text-white' : 'bg-amber-50 border border-amber-200 text-amber-900 rounded-xl'} flex items-start gap-3`}>
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" style={{ color: highContrast ? '#eab308' : undefined }} />
          <div>
            <p className="font-bold text-sm">💡 Active Demo Mode (डेमो मोड चालू है)</p>
            <p className="text-xs mt-1">
              Custom document OCR uploads require a <strong>GEMINI_API_KEY</strong> configuration. You can try our live pre-built **Indian Government Demo Forms** below to experience the guided wizard, voice-read aloud, and voice follow-up Q&A immediately! To test custom files, add your key in Settings &gt; Secrets.
            </p>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">

        {/* 1. LANDING PAGE VIEW */}
        {currentPage === 'landing' && (
          <div id="view-landing" className="space-y-16 animate-fade-in">
            {/* HERO BANNER SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${highContrast ? 'border-2 border-yellow-400 text-yellow-400' : 'bg-blue-50 text-blue-700'}`}>
                  <Languages className="w-4 h-4" />
                  <span>{t('badge')}</span>
                </div>
                
                <h1 className={textClass('3xl')}>
                  {t('heroTitle')}
                </h1>
                
                <p className={`${textClass('lg')} leading-relaxed ${theme.textMuted}`}>
                  {t('heroDesc')}
                </p>

                {/* SYSTEM LANGUAGE SWITCHER */}
                <div className={`${theme.card} p-5 space-y-3.5 border-2 shadow-xs max-w-2xl`}>
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${highContrast ? 'bg-yellow-400 text-black' : 'bg-[#EBF8FF] text-[#2B6CB0]'}`}>
                      <Languages className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold tracking-tight">
                        {selectedLanguage === 'hi' ? 'सिस्टम की भाषा बदलें (Select Application Language)' : 'Choose App & Translation Language'}
                      </h3>
                      <p className="text-[11px] opacity-75 leading-tight mt-0.5">
                        {selectedLanguage === 'hi' 
                          ? "इससे पूरे ऐप के शब्द, बोलकर सुनाने की आवाज़ और मदद आपकी चुनी हुई भाषा में हो जाएगी।" 
                          : "This switches the entire app's text, voice narrations, and helper guidance to your language."
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        id={`btn-dashboard-lang-${lang.code}`}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          const welcomeTexts: Record<string, string> = {
                            hi: 'नमस्ते, भाषा बदल गई है।',
                            en: 'Hello, language has been changed.',
                            mr: 'नमस्कार, भाषा बदलली आहे.',
                            bn: 'নমস্কার, ভাষা পরিবর্তন করা হয়েছে।',
                            te: 'నమస్కారం, భాష మార్చబడింది.',
                            ta: 'வணக்கம், மொழி மாற்றப்பட்டுள்ளது.',
                            gu: 'નમસ્તે, ભાષા બદલાઈ ગઈ છે.',
                            kn: 'ನಮಸ್कार, ಭಾಷೆ ಬದಲಾಗಿದೆ.',
                            pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕាល, ਭਾਸ਼ਾ ਬਦਲ ਗਈ ਹੈ।',
                            ml: 'നമസ്കാരം, ഭാഷ മാറ്റിയിരിക്കുന്നു.',
                            or: 'ନମସ୍କାର, ଭାଷା ବଦଳି ଯାଇଛି।',
                            ur: 'اسلام علیکم، زبان تبدیل ہو گئی ہے۔',
                            ne: 'नमस्ते, भाषा परिवर्तन भएको छ।',
                            as: 'নমস্কাৰ, ভাষা সলনি কৰা হৈছে।'
                          };
                          speakText(welcomeTexts[lang.code] || 'Language updated', lang.code);
                        }}
                        className={`px-2.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                          selectedLanguage === lang.code
                            ? theme.pillActive
                            : theme.pillInactive
                        }`}
                        aria-label={`Switch language to ${lang.englishLabel}`}
                      >
                        <span>{lang.label}</span>
                        <span className="opacity-65 text-[9px] font-normal">({lang.englishLabel})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    id="btn-cta-upload"
                    onClick={() => setCurrentPage('upload')}
                    className={`${theme.primaryButton} px-8 py-4 ${textClass('lg')}`}
                    aria-label="Start simplifying a form now"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {t('simplifyBtnCta')}
                  </button>

                  <button
                    id="btn-cta-demo"
                    onClick={() => {
                      setCurrentPage('upload');
                    }}
                    className={`${theme.secondaryButton} px-6 py-4 ${textClass('base')}`}
                    aria-label="Try with interactive demo forms"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    {t('tryDemoBtn')}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-6 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>{t('noDataSaved')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-green-600" />
                    <span>{t('voiceSupport')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-green-600" />
                    <span>{t('multiLanguageSupport')}</span>
                  </div>
                </div>
              </div>

              {/* HERO VISUAL MOCKUP */}
              <div className="lg:col-span-5">
                <div className={`${theme.card} p-6 space-y-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
                  
                  {/* Before / After Concept Slider */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-1 rounded-md">Original Legal Form Wording</span>
                    <div className="mt-2 p-3 bg-red-50/50 rounded-xl border border-red-100 font-mono text-xs text-red-800">
                      "The deponent herein must declare under pains of perjury that cumulative emoluments received from public, private or commercial holdings aggregate less than Rs 1,00,000/- per annum."
                    </div>
                  </div>

                  <div className="flex justify-center my-1">
                    <div className={`p-2 rounded-full ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Sahaj Simple Explanation</span>
                    <div className="mt-2 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-sm space-y-2">
                      <p className="font-semibold text-emerald-950">साहज अनुवाद (सरल शब्दों में):</p>
                      <p className="text-emerald-900 leading-relaxed">
                        यहाँ आपको लिखकर बताना है कि आपके पूरे घर के सभी कमाने वाले लोगों की सालभर की कुल आमदनी 1 लाख रुपये से कम है।
                      </p>
                      <div className="bg-white/80 p-2 rounded-lg border border-emerald-100 text-xs text-emerald-800 font-medium">
                        <strong>उदाहरण उत्तर:</strong> "हाँ, मेरे परिवार की सालाना कुल आय ७५,००० रुपये है।"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURES bento Grid */}
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className={textClass('2xl')}>{t('bentoTitle')}</h2>
                <p className={`${textClass('sm')} ${theme.textMuted}`}>{t('bentoSubtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`${theme.card} p-6 space-y-4`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{t('feature1Title')}</h3>
                  <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                    {t('feature1Desc')}
                  </p>
                </div>

                <div className={`${theme.card} p-6 space-y-4`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{t('feature2Title')}</h3>
                  <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                    {t('feature2Desc')}
                  </p>
                </div>

                <div className={`${theme.card} p-6 space-y-4`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{t('feature3Title')}</h3>
                  <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                    {t('feature3Desc')}
                  </p>
                </div>

                <div className={`${theme.card} p-6 space-y-4`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
                    <Mic className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{t('feature4Title')}</h3>
                  <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                    {t('feature4Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* INFORMATIVE SECTION FOR PRESENTATION DEMO */}
            <div className={`${theme.accentCard} p-8 md:p-12 space-y-6 text-center`}>
              <h2 className={textClass('2xl')}>{t('readyToTestTitle')}</h2>
              <p className={`max-w-2xl mx-auto ${textClass('base')} ${theme.textMuted}`}>
                {t('readyToTestDesc')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  id="btn-get-started-upload"
                  onClick={() => setCurrentPage('upload')}
                  className={`${theme.primaryButton} px-8 py-4 font-bold text-base`}
                >
                  {t('readyToTestBtn')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. UPLOAD / SELECTION PAGE VIEW */}
        {currentPage === 'upload' && (
          <div id="view-upload" className="space-y-10 animate-fade-in">
            {activeForm ? (
              <div id="resume-prompt-container" className="max-w-2xl mx-auto py-8">
                <div className={`${theme.card} p-8 border-2 shadow-xl rounded-3xl space-y-6 text-center ${highContrast ? 'border-yellow-400 bg-black text-white' : ''}`}>
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-[#2B6CB0] dark:bg-blue-900/40 dark:text-blue-400">
                    <FileText className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className={textClass('2xl')}>
                      {selectedLanguage === 'hi' 
                        ? 'अधूरा फ़ॉर्म प्रगति पर है' 
                        : 'Unfinished Form in Progress'}
                    </h2>
                    <p className={`${textClass('base')} ${theme.textMuted} leading-relaxed`}>
                      {selectedLanguage === 'hi'
                        ? `आपके पास एक अधूरा फ़ॉर्म प्रगति पर है: "${activeForm.form_title}" (कदम ${wizardStep + 1} / ${activeForm.fields.length})। क्या आप आगे बढ़ना चाहते हैं या नया फ़ॉर्म शुरू करना चाहते हैं?`
                        : `You have an unfinished form in progress: "${activeForm.form_title}" (Step ${wizardStep + 1} of ${activeForm.fields.length}). Continue where you left off, or start a new form?`}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                      id="btn-resume-continue"
                      onClick={() => {
                        setCurrentPage('results');
                      }}
                      className={`${theme.primaryButton} w-full sm:w-auto px-8 py-4 font-bold text-base flex items-center justify-center gap-2`}
                    >
                      <span>
                        {selectedLanguage === 'hi' ? 'हाँ, जारी रखें (Continue)' : 'Continue'}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      id="btn-resume-new"
                      onClick={() => {
                        setActiveForm(null);
                        setActiveDemoFormKey(null);
                        setWizardStep(0);
                        setUserAnswers({});
                        handleResetUpload();
                      }}
                      className={`${theme.secondaryButton} w-full sm:w-auto px-8 py-4 font-bold text-base flex items-center justify-center gap-2`}
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>
                        {selectedLanguage === 'hi' ? 'नया फ़ॉर्म शुरू करें (Start New Form)' : 'Start New Form'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h1 className={textClass('3xl')}>
                    {t('uploadTitlePage')}
                  </h1>
                  <p className={`${textClass('base')} ${theme.textMuted}`}>
                    {t('uploadSubtitlePage')}
                  </p>
                </div>

            {/* DEMO FORMS SELECTOR - Prominently highlighted first */}
            <div className="space-y-4">
              <h2 className={`font-bold flex items-center gap-2 ${textClass('xl')}`}>
                <BookOpen className={`w-5 h-5 ${theme.iconColor}`} />
                {selectedLanguage === 'hi' ? 'डेमो फॉर्म चुनें (त्वरित परीक्षण)' : 'Choose a Pre-filled Demo Form (Instant Test)'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Ration Card Application */}
                <div 
                  id="demo-card-ration"
                  onClick={() => handleSelectDemoForm('ration_card')}
                  className={`${theme.card} p-5 cursor-pointer hover:border-[#2B6CB0] hover:shadow-lg transition-all space-y-3 relative group`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs px-2.5 py-1 bg-orange-100 text-orange-800 rounded-md font-bold">
                      {selectedLanguage === 'hi' ? 'हिंदी + अंग्रेजी' : 'Hindi & English'}
                    </span>
                    <span className={`text-xs font-bold ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-300'}`}>6 Steps</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base group-hover:text-[#2B6CB0] transition-colors">
                      {selectedLanguage === 'hi' ? 'नया राशन कार्ड आवेदन पत्र' : 'New Ration Card Form'}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${highContrast ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {selectedLanguage === 'hi' 
                        ? 'खाद्य सुरक्षा एवं राशन दुकान से सस्ता अनाज प्राप्त करने हेतु नए राशन कार्ड के लिए आवेदन का सरल विवरण।'
                        : 'Simple guidance and explanation for getting a new ration card to obtain subsidized food grains.'
                      }
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#2B6CB0] group-hover:translate-x-1 transition-transform">
                    <span>{selectedLanguage === 'hi' ? 'डेमो शुरू करें (Start)' : 'Start Demo'}</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>

                {/* Income Certificate Application */}
                <div 
                  id="demo-card-income"
                  onClick={() => handleSelectDemoForm('income_certificate')}
                  className={`${theme.card} p-5 cursor-pointer hover:border-[#2B6CB0] hover:shadow-lg transition-all space-y-3 relative group`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs px-2.5 py-1 bg-[#EBF8FF] text-[#2B6CB0] rounded-md font-bold">
                      {selectedLanguage === 'hi' ? 'हिंदी + अंग्रेजी' : 'Hindi & English'}
                    </span>
                    <span className={`text-xs font-bold ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-300'}`}>5 Steps</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base group-hover:text-[#2B6CB0] transition-colors">
                      {selectedLanguage === 'hi' ? 'आय प्रमाण पत्र फॉर्म' : 'Income Certificate Form'}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${highContrast ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {selectedLanguage === 'hi'
                        ? 'स्कूल फीस माफी और छात्रवृत्ति के लिए वार्षिक पारिवारिक संचयी आय को प्रमाणित करने हेतु आवेदन।'
                        : 'Revenue department application to certify annual cumulative family income for school fee concession and scholarships.'
                      }
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#2B6CB0] group-hover:translate-x-1 transition-transform">
                    <span>{selectedLanguage === 'hi' ? 'डेमो शुरू करें (Start)' : 'Start Demo'}</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>

                {/* Passport Form */}
                <div 
                  id="demo-card-passport"
                  onClick={() => handleSelectDemoForm('passport')}
                  className={`${theme.card} p-5 cursor-pointer hover:border-[#2B6CB0] hover:shadow-lg transition-all space-y-3 relative group`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs px-2.5 py-1 bg-[#EBF8FF] text-[#2B6CB0] rounded-md font-bold">
                      {selectedLanguage === 'hi' ? 'हिंदी + अंग्रेजी' : 'Hindi & English'}
                    </span>
                    <span className={`text-xs font-bold ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-300'}`}>5 Steps</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base group-hover:text-[#2B6CB0] transition-colors">
                      {selectedLanguage === 'hi' ? 'नया पासपोर्ट आवेदन पत्र' : 'Fresh Passport Application'}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${highContrast ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {selectedLanguage === 'hi'
                        ? 'पुलिस सत्यापन और नॉन-ईसीआर स्थिति योग्यता विवरण सहित पहली बार पासपोर्ट पंजीकरण पत्र।'
                        : 'First-time passport registration form details including police verification setup and Non-ECR qualification rules.'
                      }
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#2B6CB0] group-hover:translate-x-1 transition-transform">
                    <span>{selectedLanguage === 'hi' ? 'डेमो शुरू करें (Start)' : 'Start Demo'}</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>

              </div>
            </div>

            {/* DIVIDER */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-zinc-200"></div>
              <span className={`flex-shrink mx-4 text-xs font-bold uppercase tracking-widest px-3 ${
                highContrast 
                  ? 'text-yellow-400 bg-black' 
                  : 'text-zinc-650 dark:text-zinc-350 bg-[#F0F4F8] dark:bg-zinc-900'
              }`}>या अपना खुद का फ़ॉर्म अपलोड करें (Or Upload Custom Form)</span>
              <div className="flex-grow border-t border-zinc-200"></div>
            </div>

            {/* DUAL INPUT INTERFACE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Language and Upload Input */}
              <div className="space-y-6">

                {mismatchResult && (
                  <div className="p-5 border-2 border-red-500 bg-red-50/50 dark:bg-red-950/20 rounded-xl space-y-4 text-left shadow-xs">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-800 dark:text-red-300 text-base">
                          {selectedLanguage === 'hi' ? 'दस्तावेज़ मेल नहीं खा रहे' : 'Different Forms Detected'}
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                          {selectedLanguage === 'hi' 
                            ? `ये अलग-अलग फॉर्म लग रहे हैं (जैसे, '${mismatchResult.detectedForms[0] || "फॉर्म 1"}' और '${mismatchResult.detectedForms[1] || "फॉर्म 2"}')। कृपया केवल एक ही फॉर्म के पेज अपलोड करें, या उन्हें एक-एक करके प्रोसेस करें।` 
                            : `These look like different forms (e.g., '${mismatchResult.detectedForms[0] || "Form 1"}' and '${mismatchResult.detectedForms[1] || "Form 2"}'). Please upload only pages from the SAME form, or process them one at a time.`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-red-200 dark:border-red-900/50 space-y-2">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-red-800 dark:text-red-300">
                        {selectedLanguage === 'hi' ? 'विकल्प चुनें:' : 'Please choose an option:'}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {mismatchResult.detectedForms.map((formName, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProcessSingleForm(formName, idx);
                            }}
                            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg transition-colors shadow-xs cursor-pointer text-center"
                          >
                            {selectedLanguage === 'hi' ? `केवल '${formName}' प्रोसेस करें` : `Process only ${formName}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Drag and Drop Image Box */}
                <div 
                  id="drag-drop-box"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`${theme.card} p-8 border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[250px] ${
                    isDragOver ? 'border-blue-600 bg-blue-50/20' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                >
                  <input 
                    id="file-upload-input"
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleFileChange} 
                    className="hidden" 
                  />

                  {isFileProcessing && (
                    <div className="space-y-4 py-6 w-full flex flex-col items-center justify-center">
                      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <div className="space-y-1">
                        <p className={`font-bold ${textClass('base')}`}>
                          {selectedLanguage === 'hi' ? 'दस्तावेज़ लोड किया जा रहा है...' : 'Processing Document...'}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {selectedLanguage === 'hi' ? 'कृपया प्रतीक्षा करें, तस्वीरें लोड की जा रही हैं' : 'Please wait, loading form images'}
                        </p>
                      </div>
                    </div>
                  )}

                  {!isFileProcessing && uploadedPages.length > 0 ? (
                    <div className="space-y-6 w-full" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-center max-w-md mx-auto">
                        {uploadedPages.map((page, index) => (
                          <div 
                            key={index} 
                            className="relative aspect-[3/4] rounded-lg overflow-hidden border shadow-xs group bg-zinc-50 dark:bg-zinc-800"
                          >
                            <img src={page} alt={`Page ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {selectedLanguage === 'hi' ? `पेज ${index + 1}` : `Page ${index + 1}`}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadedPages((prev) => {
                                  const updated = prev.filter((_, idx) => idx !== index);
                                  setImagePreview(updated[0] || null);
                                  return updated;
                                });
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-md transition-colors font-bold text-sm cursor-pointer"
                              title={selectedLanguage === 'hi' ? 'यह पेज हटाएं' : 'Remove this page'}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3 flex flex-col items-center">
                        <p className="text-sm text-green-600 dark:text-green-400 font-bold flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4" />
                          <span>
                            {selectedLanguage === 'hi' 
                              ? `${uploadedPages.length} पेज अपलोड किए गए` 
                              : `${uploadedPages.length} page${uploadedPages.length > 1 ? 's' : ''} uploaded`}
                          </span>
                        </p>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById('file-upload-input')?.click();
                          }}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-bold text-sm rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-850 transition-colors shadow-xs cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{selectedLanguage === 'hi' ? 'एक और पेज जोड़ें' : 'Add another page'}</span>
                        </button>
                      </div>
                    </div>
                  ) : !isFileProcessing && (
                    <div className="space-y-4">
                      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-50 text-blue-600'}`}>
                        <Upload className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className={`font-bold ${textClass('lg')}`}>
                          {selectedLanguage === 'hi' ? 'यहाँ फ़ॉर्म की फ़ोटो डालें' : 'Upload Form Photo or Scan'}
                        </p>
                        <p className={`text-xs ${theme.textMuted}`}>
                          {selectedLanguage === 'hi' ? 'तस्वीर यहाँ खींचें (Drag & Drop) या ढूँढने के लिए दबाएँ' : 'Drag & drop image here or click to browse'}
                        </p>
                      </div>
                      <span className="inline-block text-[11px] font-bold text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded dark:bg-zinc-800">
                        {selectedLanguage === 'hi' 
                          ? "Supports JPG, PNG, WEBP — upload multiple pages if your form has more than one page." 
                          : "Supports JPG, PNG, WEBP — upload multiple pages if your form has more than one page."}
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Paste Text Option & Submit */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className={`${theme.card} p-6 space-y-4 flex-1 flex flex-col`}>
                  <label htmlFor="pasted-form-text" className="block text-sm font-bold uppercase tracking-wider text-zinc-500">
                    {selectedLanguage === 'hi' ? 'वैकल्पिक: फॉर्म का टेक्स्ट यहाँ पेस्ट करें' : 'Alternative: Paste Form Text Directly'}
                  </label>
                  
                  <div className="relative flex-1 flex flex-col">
                    <textarea
                      id="pasted-form-text"
                      value={pastedText}
                      onChange={(e) => {
                        setPastedText(e.target.value);
                      }}
                      placeholder={
                        selectedLanguage === 'hi' 
                          ? "यदि आपके पास फॉर्म की फोटो नहीं है, तो आप उसके कठिन पैराग्राफ या नियमों को यहाँ कॉपी करके पेस्ट कर सकते हैं..." 
                          : "If you do not have an image, copy and paste the complex legal paragraphs, terms, or field labels of your form here..."
                      }
                      className={`${theme.input} w-full p-4 pr-12 flex-1 min-h-[160px] text-sm resize-none`}
                      aria-label="Paste complex form text here"
                    />

                    {SpeechRecognition && (
                      <div className="absolute right-3 bottom-3 flex items-center gap-2">
                        {activeListeningField === 'pasted' && (
                          <span className="text-[10px] font-bold text-red-500 animate-pulse bg-red-50 px-2 py-0.5 rounded border border-red-200 dark:bg-red-950/30 dark:border-red-900/50">
                            {selectedLanguage === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'}
                          </span>
                        )}
                        <button
                          type="button"
                          id="btn-paste-mic"
                          onClick={() => toggleFieldListening('pasted')}
                          className={`p-2.5 rounded-full transition-all cursor-pointer shadow-xs ${
                            activeListeningField === 'pasted'
                              ? 'bg-red-500 text-white animate-pulse scale-110'
                              : highContrast ? 'bg-yellow-400 text-black border border-zinc-900 hover:bg-yellow-300' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                          }`}
                          title={selectedLanguage === 'hi' ? 'बोलकर लिखने के लिए दबाएं' : 'Click to voice type'}
                          aria-label="Voice input for form text"
                        >
                          {activeListeningField === 'pasted' ? (
                            <MicOff className="w-4 h-4" />
                          ) : (
                            <Mic className="w-4 h-4 text-red-500" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {activeListeningField === 'pasted' && (
                    <div className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 text-xs dark:bg-red-950/20 dark:border-red-900/40 space-y-1.5 animate-pulse">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>{selectedLanguage === 'hi' ? 'बोलकर लिखा जा रहा है' : 'Voice Typing Preview'}</span>
                      </div>
                      <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                        <span>{baseTextRef.current + sessionFinalText}</span>
                        {sessionInterimText && (
                          <span className="text-red-500/80 font-normal"> {sessionInterimText}</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                   {(uploadedPages.length > 0 || pastedText.trim()) && (
                    <button
                      id="btn-clear-inputs"
                      onClick={handleResetUpload}
                      className="text-xs text-red-500 hover:text-red-700 font-bold self-end flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {selectedLanguage === 'hi' ? 'हटाएं और नया चुनें' : 'Reset & Start Fresh'}
                    </button>
                  )}
                </div>

                {/* SIMPLIFY TRIGGER CTA BUTTON */}
                <div className="space-y-4">
                  <button
                    id="btn-trigger-simplify"
                    onClick={handleSimplifySubmit}
                    disabled={uploadedPages.length === 0 && !pastedText.trim()}
                    className={`w-full py-4.5 font-extrabold cursor-pointer ${
                      (uploadedPages.length > 0 || pastedText.trim()) 
                        ? theme.primaryButton 
                        : 'bg-zinc-200 text-zinc-400 border-transparent cursor-not-allowed shadow-none'
                    } ${textClass('lg')}`}
                    aria-label="Process and Simplify Form"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {selectedLanguage === 'hi' ? 'फ़ॉर्म को आसान भाषा में बदलें' : 'Simplify My Form Now'}
                  </button>

                  {apiError && (
                    <div id="error-message-block" className={`${theme.alertBg} p-4 text-sm flex items-start gap-3`}>
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">असुविधा के लिए खेद है (Something Went Wrong)</p>
                        <p className="text-xs mt-1">{apiError}</p>
                        <button 
                          onClick={handleSimplifySubmit}
                          className="mt-2 text-xs font-bold underline cursor-pointer"
                        >
                          पुनः प्रयास करें (Retry)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
              </>
            )}
          </div>
        )}

        {/* 3. LOADING ENGINE PROCESSING STATE VIEW */}
        {isProcessing && (
          <div id="view-processing" className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 py-20 animate-pulse">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            
            <div className="space-y-2 max-w-lg">
              <h2 className={textClass('2xl')}>{selectedLanguage === 'hi' ? 'फ़ॉर्म को आसान बनाया जा रहा है...' : 'Simplifying Your Form...'}</h2>
              <p className={`font-mono text-sm px-4 py-2 ${theme.accentText} bg-blue-50/80 rounded-xl border border-blue-100 inline-block`}>
                {processingStatus}
              </p>
              <p className={`text-xs ${theme.textMuted} pt-4`}>
                {selectedLanguage === 'hi'
                  ? "कृपया प्रतीक्षा करें। हमारी कृत्रिम बुद्धिमत्ता (Gemini AI) इस फॉर्म की जांच कर रही है और जटिल शब्दों को हटाकर आसान भाषा तैयार कर रही है।"
                  : "Please keep this window open. Gemini is currently converting dense legal jargon into a simple, step-by-step guidance assistant."
                }
              </p>
            </div>
          </div>
        )}

        {/* 4. RESULTS / INTERACTIVE STEP-BY-STEP WIZARD VIEW */}
        {currentPage === 'results' && activeForm && (
          <div id="view-wizard-results" className="space-y-8 animate-fade-in">
            
            {/* Form Title & Top Progress Bar */}
            <div className={`${theme.card} p-6 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-green-100 text-green-800 ${highContrast ? 'bg-white text-black border border-black' : ''}`}>
                    {selectedLanguage === 'hi' ? 'सरल फ़ॉर्म तैयार है' : 'Simplified Form Ready'}
                  </span>
                </div>
                <h1 className={textClass('2xl')}>{activeForm.form_title}</h1>
                <p className={`text-xs font-medium ${theme.textMuted}`}>
                  {selectedLanguage === 'hi' ? 'कुल कदम (Total Fields):' : 'Total Fields to Fill:'} {activeForm.fields.length}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="btn-wizard-restart"
                  onClick={() => {
                    stopSpeaking();
                    setActiveForm(null);
                    setActiveDemoFormKey(null);
                    setWizardStep(0);
                    setUserAnswers({});
                    handleResetUpload();
                    setCurrentPage('upload');
                  }}
                  className={`${theme.secondaryButton} px-4 py-2 text-xs`}
                  aria-label="Upload another form"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  {selectedLanguage === 'hi' ? 'दूसरा फ़ॉर्म चुनें' : 'Process New Form'}
                </button>
              </div>
            </div>

            {/* General Purpose / Intro of Form */}
            <div className={`${theme.accentCard} p-6 flex items-start gap-4`}>
              <div className={`p-2.5 rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-700'} shrink-0`}>
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm uppercase tracking-wider">
                  {selectedLanguage === 'hi' ? 'यह फ़ॉर्म किसलिए है? (Form Purpose):' : 'What is this form for?'}
                </h3>
                <p className={`${textClass('base')} leading-relaxed`}>{activeForm.detected_purpose}</p>
              </div>
            </div>

            {/* THREE-COLUMN BENTO RESULTS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: THE ACTIVE GUIDED WIZARD CARD (Takes 8 of 12 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Wizard Container Card */}
                <div className={`${theme.card} overflow-hidden`}>
                  
                  {/* Step Progress bar inside header */}
                  <div className={`px-6 py-3 border-b flex items-center justify-between gap-4 ${highContrast ? 'border-yellow-400 bg-zinc-950' : 'bg-zinc-50/50'}`}>
                    <span className={`text-xs font-extrabold uppercase tracking-widest ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-300'}`}>
                      {selectedLanguage === 'hi' ? `कदम ${wizardStep + 1} / ${activeForm.fields.length}` : `Step ${wizardStep + 1} of ${activeForm.fields.length}`}
                    </span>
                    
                    {/* Visual Progress percentage */}
                    <div className="flex items-center gap-3 flex-1 max-w-[200px]">
                      <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${highContrast ? 'bg-yellow-400' : 'bg-[#2B6CB0]'}`}
                          style={{ width: `${((wizardStep + 1) / activeForm.fields.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold font-mono">{Math.round(((wizardStep + 1) / activeForm.fields.length) * 100)}%</span>
                    </div>
                  </div>

                  {/* ACTIVE WIZARD CONTENT */}
                  <div className="p-6 md:p-8 space-y-8">
                    
                    {/* A. Dynamic Field Name */}
                    <div className="space-y-2">
                      <span className={`text-xs font-bold uppercase tracking-widest ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-400'}`}>
                        {selectedLanguage === 'hi' ? 'फ़ॉर्म का भाग (Form Field Label):' : 'Form Field Label:'}
                      </span>
                      <h2 className={`font-black tracking-tight text-[#2B6CB0] ${textClass('xl')}`} style={{ color: highContrast ? '#eab308' : undefined }}>
                        {activeForm.fields[wizardStep]?.field_name}
                      </h2>
                    </div>

                    {/* B. Original Form Jargon (To reference on actual form) */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-red-500 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {selectedLanguage === 'hi' ? 'मूल फ़ॉर्म में लिखा जटिल शब्द (Original Complex Text):' : 'Original Text on the Form:'}
                      </span>
                      <p className={`p-3 border rounded-xl font-mono text-xs leading-relaxed italic ${
                        highContrast 
                          ? 'border-yellow-400 bg-black text-yellow-400' 
                          : 'bg-red-50/30 dark:bg-red-950/20 text-red-900 dark:text-red-300 border-red-100 dark:border-red-900/40'
                      }`}>
                        "{activeForm.fields[wizardStep]?.original_text}"
                      </p>
                    </div>

                    {/* C. SAHAJ SIMPLIFIED EXPLANATION */}
                    <div className={`p-5 rounded-3xl border-2 ${highContrast ? 'border-yellow-400 bg-black' : 'border-[#CBD5E0] bg-[#EBF8FF]/35'} space-y-4`}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className={`text-xs font-black uppercase tracking-widest flex items-center gap-1.5 ${theme.accentText}`}>
                          <Sparkles className="w-4 h-4" />
                          {selectedLanguage === 'hi' ? 'आसान भाषा में समझें (Sahaj Simple Meaning):' : 'Sahaj Simplified Meaning:'}
                        </span>

                        {/* Read Aloud Trigger for Explanation */}
                        <button
                          id="btn-read-explanation"
                          onClick={() => speakText(activeForm.fields[wizardStep]?.simplified_explanation, selectedLanguage)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:scale-102 transition-transform ${
                            isReadingAloud && currentSpeakingText === activeForm.fields[wizardStep]?.simplified_explanation
                              ? isSpeechPaused 
                                ? 'bg-amber-600 text-white shadow-xs' 
                                : 'bg-red-500 text-white animate-pulse' 
                              : highContrast ? 'bg-yellow-400 text-black border border-black' : 'bg-[#2B6CB0] text-white shadow-xs'
                          }`}
                          aria-label="Read simplified explanation out loud"
                        >
                          {isReadingAloud && currentSpeakingText === activeForm.fields[wizardStep]?.simplified_explanation ? (
                            isSpeechPaused ? (
                              <>
                                <Play className="w-4 h-4" />
                                {selectedLanguage === 'hi' ? 'जारी रखें' : 'Resume'}
                              </>
                            ) : (
                              <>
                                <Pause className="w-4 h-4" />
                                {selectedLanguage === 'hi' ? 'रोकें (Pause)' : 'Pause'}
                              </>
                            )
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              {selectedLanguage === 'hi' ? 'बोलकर सुनाएं' : 'Read Aloud'}
                            </>
                          )}
                        </button>
                      </div>

                      {activeVoiceInfo && (
                        <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full w-fit animate-pulse border ${
                          highContrast ? 'bg-yellow-400 text-black border-black' : 'text-[#2B6CB0] bg-[#EBF8FF] border-[#BEE3F8]'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                          <span>
                            {selectedLanguage === 'hi' 
                              ? `सक्रिय आवाज़: ${activeVoiceInfo}` 
                              : `Active Voice: ${activeVoiceInfo}`
                            }
                          </span>
                        </div>
                      )}

                      <p className={`${textClass('lg')} leading-relaxed font-medium`}>
                        {activeForm.fields[wizardStep]?.simplified_explanation}
                      </p>
                    </div>

                    {/* D. EXAMPLE ANSWER */}
                    <div className="space-y-2">
                      <span className={`text-xs font-bold uppercase tracking-widest ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-400'}`}>
                        {selectedLanguage === 'hi' ? 'आपको क्या लिखना है (Example of what to fill in):' : 'Example of what you can fill in:'}
                      </span>
                      <div className={`p-4 rounded-xl border border-dashed ${
                        highContrast 
                          ? 'border-2 border-white bg-black text-white' 
                          : 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-900 dark:text-emerald-300'
                      } space-y-1`}>
                        <p className={`text-xs font-extrabold uppercase tracking-widest ${
                          highContrast ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'
                        }`}>
                          {selectedLanguage === 'hi' ? 'जैसे (Example):' : 'Sample Answer:'}
                        </p>
                        <p className={`${textClass('base')} font-semibold`}>
                          {activeForm.fields[wizardStep]?.example_answer}
                        </p>
                      </div>
                    </div>

                    {/* F. YOUR ANSWER / NOTES */}
                    <div className="space-y-2">
                      <span className={`text-xs font-bold uppercase tracking-widest ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-400'}`}>
                        {selectedLanguage === 'hi' ? 'आपका दर्ज उत्तर (Your Answer):' : 'Your Answer / Notes:'}
                      </span>

                      {answerCheckWarnings[activeForm.fields[wizardStep]?.id] && (
                        <div id="rejection-risk-warning" className={`p-4 rounded-xl border ${
                          highContrast 
                            ? 'border-2 border-yellow-400 bg-black text-white' 
                            : 'border-amber-200 bg-amber-50 dark:bg-amber-950/20 text-zinc-800 dark:text-zinc-200'
                        } space-y-3 animate-fade-in`}>
                          <div className="flex gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" style={{ color: highContrast ? '#eab308' : undefined }} />
                            <div>
                              <p className={`text-xs font-bold ${highContrast ? 'text-yellow-400' : 'text-amber-800 dark:text-amber-300'}`}>
                                {selectedLanguage === 'hi' ? 'अस्वीकृति जोखिम चेतावनी' : 'Rejection Risk Warning'}
                              </p>
                              <p className={`text-sm font-medium mt-1 leading-relaxed ${highContrast ? 'text-white' : 'text-zinc-850 dark:text-zinc-200'}`}>
                                {answerCheckWarnings[activeForm.fields[wizardStep]?.id]}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3 justify-end pt-1">
                            <button
                              id="btn-warning-edit"
                              onClick={() => {
                                setAnswerCheckWarnings({
                                  ...answerCheckWarnings,
                                  [activeForm.fields[wizardStep]?.id]: ""
                                });
                                setTimeout(() => {
                                  document.getElementById(`user-answer-${activeForm.fields[wizardStep]?.id}`)?.focus();
                                }, 50);
                              }}
                              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                                highContrast
                                  ? 'border-yellow-400 bg-black text-yellow-400 hover:bg-zinc-900'
                                  : 'border-amber-300 bg-white hover:bg-amber-100 text-amber-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-amber-300'
                              }`}
                            >
                              {selectedLanguage === 'hi' ? 'मेरा उत्तर संपादित करें (Edit Answer)' : 'Edit my answer'}
                            </button>
                            <button
                              id="btn-warning-continue"
                              onClick={() => {
                                setAnswerCheckWarnings({
                                  ...answerCheckWarnings,
                                  [activeForm.fields[wizardStep]?.id]: ""
                                });
                                const isLast = wizardStep === activeForm.fields.length - 1;
                                if (isLast) {
                                  stopSpeaking();
                                  setCurrentPage('summary');
                                } else {
                                  setWizardStep(prev => prev + 1);
                                }
                              }}
                              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg shadow transition-colors cursor-pointer ${
                                highContrast
                                  ? 'bg-yellow-400 hover:bg-yellow-300 text-black border border-black font-black'
                                  : 'bg-amber-600 hover:bg-amber-700 text-white'
                              }`}
                            >
                              {selectedLanguage === 'hi' ? 'वैसे भी जारी रखें (Continue Anyway)' : 'Continue anyway'}
                            </button>
                          </div>
                        </div>
                      )}

                      <textarea
                        id={`user-answer-${activeForm.fields[wizardStep]?.id}`}
                        rows={2}
                        value={userAnswers[activeForm.fields[wizardStep]?.id] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUserAnswers({
                            ...userAnswers,
                            [activeForm.fields[wizardStep]?.id]: val
                          });
                          // Clear warning when the user edits their answer
                          if (answerCheckWarnings[activeForm.fields[wizardStep]?.id]) {
                            setAnswerCheckWarnings({
                              ...answerCheckWarnings,
                              [activeForm.fields[wizardStep]?.id]: ""
                            });
                          }
                        }}
                        placeholder={
                          selectedLanguage === 'hi' 
                            ? "इस फ़ील्ड के लिए अपना उत्तर या नोट यहाँ लिखें..." 
                            : "Write your answer or notes for this field here..."
                        }
                        className={`${theme.input} w-full p-4 text-sm`}
                        aria-label="Your answer or notes"
                      />
                      {/* Live Feedback Status Badges */}
                      {(() => {
                        const answerVal = userAnswers[activeForm.fields[wizardStep]?.id];
                        if (answerVal && answerVal.trim()) {
                          const check = getFieldCompletionStatus(activeForm.fields[wizardStep], answerVal, selectedLanguage);
                          if (check.status === 'partial') {
                            return (
                              <div className="mt-2 space-y-1 animate-fade-in">
                                <div className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-lg border ${
                                  highContrast 
                                    ? 'text-yellow-400 bg-black border-yellow-400' 
                                    : 'text-amber-900 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/20 dark:border-amber-900/40'
                                }`}>
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                                  <span>
                                    {reviewTranslations[selectedLanguage]?.partialStatus || reviewTranslations['en']?.partialStatus}
                                  </span>
                                </div>
                                <p className={`text-[11px] font-bold pl-1 ${
                                  highContrast ? 'text-yellow-400' : 'text-amber-950 dark:text-amber-200'
                                }`}>
                                  {reviewTranslations[selectedLanguage]?.missingPrefix || reviewTranslations['en']?.missingPrefix}
                                  <span className="underline font-extrabold">{check.missingParts.join(", ")}</span>
                                </p>
                              </div>
                            );
                          } else {
                            return (
                              <div className="mt-2 animate-fade-in">
                                <div className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-lg border ${
                                  highContrast 
                                    ? 'text-green-400 bg-black border-green-400' 
                                    : 'text-green-900 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-950/20 dark:border-green-900/40'
                                }`}>
                                  <Check className="w-3.5 h-3.5 shrink-0" />
                                  <span>
                                    {reviewTranslations[selectedLanguage]?.filledStatus || reviewTranslations['en']?.filledStatus}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        }
                        return null;
                      })()}
                    </div>

                    {/* E. ASSISTANT CHAT WITH VOICE COMMANDS (ASK QUESTION) */}
                    <div className={`p-4 rounded-xl border ${highContrast ? 'border-white bg-black' : 'border-zinc-200 bg-zinc-50/50'} space-y-4`}>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#2B6CB0]" style={{ color: highContrast ? '#eab308' : undefined }} />
                          <span className="text-xs font-bold uppercase tracking-widest">
                            {selectedLanguage === 'hi' ? 'सहायक से सवाल पूछें (Ask a Question):' : 'Ask Follow-up Question:'}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${highContrast ? 'bg-yellow-400 text-black' : 'bg-[#EBF8FF] text-[#2B6CB0]'}`}>
                          Voice Mode Enabled
                        </span>
                      </div>

                      {/* Microphone voice trigger inside text box */}
                      <div className="flex flex-col md:flex-row gap-3 items-stretch">
                        <div className="flex-1 flex gap-2">
                          <div className="relative flex-1 flex items-center">
                            <input
                              id="input-text-query"
                              type="text"
                              value={typedQuestion}
                              onChange={(e) => setTypedQuestion(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  askAssistant(typedQuestion);
                                  setTypedQuestion("");
                                }
                              }}
                              placeholder={
                                selectedLanguage === 'hi' 
                                  ? "लिखकर पूछें या माइक दबाकर बोलें..." 
                                  : "Type question or click mic to speak..."
                              }
                              className={`${theme.input} w-full pl-3 pr-24 py-2 text-xs md:text-sm`}
                              aria-label="Type follow-up question"
                            />

                            {SpeechRecognition && (
                              <div className="absolute right-2 flex items-center gap-1.5">
                                {activeListeningField === 'query' && (
                                  <span className="text-[10px] font-bold text-red-500 animate-pulse bg-red-50 px-1.5 py-0.5 rounded border border-red-200 dark:bg-red-950/30 dark:border-red-900/50">
                                    {selectedLanguage === 'hi' ? 'बोलें...' : 'Speak...'}
                                  </span>
                                )}
                                <button
                                  type="button"
                                  id="btn-query-mic"
                                  onClick={() => toggleFieldListening('query')}
                                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                                    activeListeningField === 'query'
                                      ? 'bg-red-500 text-white animate-pulse scale-110 shadow-xs'
                                      : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                                  }`}
                                  title={selectedLanguage === 'hi' ? 'बोलकर लिखने के लिए दबाएं' : 'Click to voice type'}
                                  aria-label="Voice input for query"
                                >
                                  {activeListeningField === 'query' ? (
                                    <MicOff className="w-4 h-4" />
                                  ) : (
                                    <Mic className="w-4 h-4 text-red-500" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <button
                            id="btn-submit-text-query"
                            onClick={() => {
                              askAssistant(typedQuestion);
                              setTypedQuestion("");
                            }}
                            disabled={!typedQuestion.trim()}
                            className={`px-4 py-2 font-bold text-xs rounded-xl ${
                              typedQuestion.trim() 
                                ? theme.primaryButton 
                                : 'bg-zinc-200 text-zinc-400 shadow-none border-transparent cursor-not-allowed'
                            }`}
                          >
                            Ask
                          </button>
                        </div>
                      </div>

                      {activeListeningField === 'query' && (
                        <div className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 text-xs dark:bg-red-950/20 dark:border-red-900/40 space-y-1.5 animate-pulse">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <span>{selectedLanguage === 'hi' ? 'बोलकर लिखा जा रहा है' : 'Voice Typing Preview'}</span>
                          </div>
                          <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                            <span>{baseTextRef.current + sessionFinalText}</span>
                            {sessionInterimText && (
                              <span className="text-red-500/80 font-normal"> {sessionInterimText}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Speech Error Banner */}
                      {recognitionError && (
                        <p className="text-xs text-red-500 font-semibold">{recognitionError}</p>
                      )}

                      {/* Transcribed User Speech */}
                      {speechTranscript && (
                        <div className="p-3 bg-zinc-100 rounded-lg dark:bg-zinc-900 border text-xs">
                          <p className={`uppercase font-extrabold tracking-widest ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-400'}`}>You Spoke (आपने पूछा):</p>
                          <p className="font-bold text-zinc-800 dark:text-zinc-100 mt-0.5">"{speechTranscript}"</p>
                        </div>
                      )}

                      {/* Loading/Answering state */}
                      {isAsking && (
                        <div className="flex items-center gap-2 text-xs text-[#2B6CB0] animate-pulse font-bold">
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>सहायक सोच रहा है (Assistant is thinking)...</span>
                        </div>
                      )}

                      {/* Gemini Assistant's spoken speech bubble answer */}
                      {askAnswer && !isAsking && (
                        <div className={`p-4 rounded-xl border ${
                          highContrast 
                            ? 'border-yellow-400 bg-black text-white' 
                            : 'bg-gradient-to-br from-[#EBF8FF] to-white dark:from-zinc-900 dark:to-zinc-950 border-[#CBD5E0] dark:border-zinc-800 text-zinc-800 dark:text-zinc-100'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#2B6CB0]" style={{ color: highContrast ? '#eab308' : undefined }}>
                              {selectedLanguage === 'hi' ? 'सहायक का उत्तर (Sahaj Answer):' : 'Assistant Answer:'}
                            </span>
                            <button
                              id="btn-repeat-ask-answer"
                              onClick={() => speakText(askAnswer, selectedLanguage)}
                              className="text-xs font-bold underline flex items-center gap-1 cursor-pointer"
                            >
                              {isReadingAloud && currentSpeakingText === askAnswer ? (
                                isSpeechPaused ? (
                                  <>
                                    <Play className="w-3.5 h-3.5" />
                                    {selectedLanguage === 'hi' ? 'जारी रखें' : 'Resume'}
                                  </>
                                ) : (
                                  <>
                                    <Pause className="w-3.5 h-3.5 text-red-500" />
                                    {selectedLanguage === 'hi' ? 'रोकें' : 'Pause'}
                                  </>
                                )
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5" />
                                  {selectedLanguage === 'hi' ? 'फिर से सुनें' : 'Listen Again'}
                                </>
                              )}
                            </button>
                          </div>
                          <p className={`${textClass('base')} leading-relaxed font-medium`}>
                            {askAnswer}
                          </p>
                        </div>
                      )}

                    </div>

                  </div>

                  {/* BOTTOM STEP CONTROLS BAR */}
                  <div className={`px-6 py-4 border-t flex items-center justify-between gap-4 ${highContrast ? 'border-yellow-400 bg-zinc-950' : 'bg-zinc-50/50'}`}>
                    
                    <button
                      id="btn-wizard-prev"
                      onClick={() => setWizardStep(prev => Math.max(0, prev - 1))}
                      disabled={wizardStep === 0 || isCheckingAnswer}
                      className={`px-5 py-3 text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all border rounded-xl ${
                        wizardStep === 0 || isCheckingAnswer
                          ? 'opacity-40 cursor-not-allowed shadow-none' 
                          : theme.secondaryButton
                      }`}
                      aria-label="Go to previous step"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {selectedLanguage === 'hi' ? 'पिछला (Back)' : 'Previous'}
                    </button>

                    <div className={`text-xs font-bold ${highContrast ? 'text-yellow-400' : 'text-zinc-650 dark:text-zinc-350'}`}>
                      {selectedLanguage === 'hi' ? 'कदम' : 'Step'} {wizardStep + 1} / {activeForm.fields.length}
                    </div>

                    {wizardStep < activeForm.fields.length - 1 ? (
                      <button
                        id="btn-wizard-next"
                        disabled={isCheckingAnswer}
                        onClick={() => checkAnswerAndNavigate(false)}
                        className={`${theme.primaryButton} px-6 py-3 text-xs md:text-sm font-bold flex items-center gap-2 ${isCheckingAnswer ? 'opacity-80 cursor-wait' : ''}`}
                        aria-label="Go to next step"
                      >
                        {isCheckingAnswer ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{selectedLanguage === 'hi' ? 'जांच की जा रही है...' : 'Checking...'}</span>
                          </>
                        ) : (
                          <>
                            {selectedLanguage === 'hi' ? 'अगला (Next)' : 'Next Step'}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        id="btn-wizard-finish"
                        disabled={isCheckingAnswer}
                        onClick={() => checkAnswerAndNavigate(true)}
                        className={`bg-green-600 hover:bg-green-700 text-white font-extrabold px-6 py-3 rounded-xl border border-transparent shadow-lg text-xs md:text-sm flex items-center gap-2 cursor-pointer ${isCheckingAnswer ? 'opacity-80 cursor-wait' : ''}`}
                        aria-label="Finish guided wizard"
                      >
                        {isCheckingAnswer ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{selectedLanguage === 'hi' ? 'जांच की जा रही है...' : 'Checking...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{selectedLanguage === 'hi' ? 'समाप्त करें (Finish)' : 'Finish Form'}</span>
                            <CheckCircle className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}

                  </div>

                </div>
              </div>

              {/* RIGHT COLUMN: CURRENT PROGRESS FIELD DETAILS & PAPERS CHECKS */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* PAPERS TO HAVE READY (Side view checklist) */}
                <div className={`${theme.card} p-6 space-y-4`}>
                  <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: highContrast ? '#eab308' : undefined }}>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wider">
                      {selectedLanguage === 'hi' ? 'ये कागजात तैयार रखें' : 'Papers to Have Ready'}
                    </h3>
                  </div>
                  <p className={`text-xs font-medium ${highContrast ? 'text-yellow-400' : 'text-zinc-600 dark:text-zinc-350'}`}>
                    {selectedLanguage === 'hi' ? 'इस फ़ॉर्म को भरते समय इन दस्तावेज़ों की ज़रूरत होगी:' : 'You will need these documents while filling this form:'}
                  </p>
                  
                  <ul className="space-y-3" role="list">
                    {activeForm.required_documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs">
                        <input 
                          type="checkbox" 
                          id={`wizard-doc-check-${idx}`}
                          className={`mt-0.5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4 shrink-0`}
                          aria-label={`Checkbox for document: ${doc}`}
                        />
                        <label htmlFor={`wizard-doc-check-${idx}`} className="font-semibold cursor-pointer select-none leading-relaxed">
                          {doc}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COMMON MISTAKES BANNER */}
                <div className={`${theme.card} p-6 space-y-4 border-amber-200 bg-amber-50/10`}>
                  <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: highContrast ? '#eab308' : undefined }}>
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-800" style={{ color: highContrast ? 'white' : undefined }}>
                      {selectedLanguage === 'hi' ? 'ये गलतियाँ न करें' : 'Common Mistakes to Avoid'}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3" role="list">
                    {activeForm.common_mistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed font-bold text-amber-900" style={{ color: highContrast ? 'white' : undefined }}>
                        <span className="text-amber-500 font-extrabold shrink-0">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Quick Glossary search helper */}
                <div className={`${theme.card} p-5 space-y-3`}>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2B6CB0]" style={{ color: highContrast ? '#eab308' : undefined }} />
                    {selectedLanguage === 'hi' ? 'कठिन शब्दों का अर्थ जानें:' : 'Quick Term Dictionary:'}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {selectedLanguage === 'hi' ? 'किसी भी शब्द पर क्लिक करके उसका सरल अर्थ जानें:' : 'Click any word to see what it really means:'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {glossary.slice(0, 5).map((item, idx) => (
                      <button
                        key={idx}
                        id={`quick-term-${idx}`}
                        onClick={() => {
                          setSelectedGlossaryTerm(item);
                          setCurrentPage('glossary');
                        }}
                        className={`text-xs px-2.5 py-1 rounded-md border font-semibold hover:border-[#2B6CB0] hover:text-[#2B6CB0] transition-colors cursor-pointer ${
                          highContrast ? 'border-white hover:border-yellow-400 hover:text-yellow-400 bg-black text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                        }`}
                      >
                        {item.term.split(' ')[0]}
                      </button>
                    ))}
                    <button
                      id="quick-term-view-all"
                      onClick={() => setCurrentPage('glossary')}
                      className="text-xs px-2.5 py-1 font-bold text-[#2B6CB0] underline hover:text-[#3182CE] cursor-pointer"
                      style={{ color: highContrast ? '#eab308' : undefined }}
                    >
                      {selectedLanguage === 'hi' ? 'सभी शब्द देखें →' : 'View All Words →'}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 5. SEARCHABLE HELP GLOSSARY PAGE */}
        {currentPage === 'glossary' && (
          <div id="view-glossary" className="space-y-10 animate-fade-in">
            
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h1 className={textClass('3xl')}>
                  {selectedLanguage === 'hi' ? 'सरकारी और कानूनी शब्दकोश' : 'Bureaucratic Words Glossary'}
                </h1>
                <p className={`${textClass('base')} ${theme.textMuted}`}>
                  सरकारी फॉर्म और अदालती कागजात में इस्तेमाल होने वाले जटिल अंग्रेजी और हिंदी शब्दों के सरलतम अर्थ यहाँ खोजें।
                </p>
              </div>
              <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl self-start md:self-center shadow-sm ${
                highContrast 
                  ? 'bg-black border-2 border-white text-white' 
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60'
              }`}>
                <CheckCircle className={`w-5 h-5 shrink-0 ${
                  highContrast 
                    ? 'text-white' 
                    : 'text-emerald-600 dark:text-emerald-400 animate-pulse'
                }`} />
                <div className="text-left">
                  <p className={`text-xs font-extrabold ${
                    highContrast 
                      ? 'text-white' 
                      : 'text-emerald-900 dark:text-emerald-100'
                  }`}>
                    {selectedLanguage === 'hi' ? 'ऑफ़लाइन उपयोग के लिए सुरक्षित' : 'Offline Mode Active'}
                  </p>
                  <p className={`text-[10px] font-semibold ${
                    highContrast 
                      ? 'text-white' 
                      : 'text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {selectedLanguage === 'hi' ? 'बिना इंटरनेट भी सभी अर्थ उपलब्ध हैं' : 'All terms cached in browser'}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Detail Box of selected term */}
            {selectedGlossaryTerm && (() => {
              const termDef = getTermDefinition(selectedGlossaryTerm, selectedLanguage);
              const termExample = getTermExample(selectedGlossaryTerm, selectedLanguage);
              return (
                <div id="glossary-selected-detail" className={`p-6 rounded-3xl border-2 ${highContrast ? 'border-yellow-400 bg-black text-white' : 'border-[#CBD5E0] bg-[#EBF8FF]/30 dark:bg-zinc-900/30 dark:border-zinc-800'} space-y-4`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2B6CB0] bg-[#EBF8FF] px-2.5 py-1 rounded dark:bg-zinc-800 dark:text-yellow-400" style={{ color: highContrast ? '#eab308' : undefined }}>
                        {t('cat' + selectedGlossaryTerm.category)} {selectedLanguage === 'hi' ? 'श्रेणी का शब्द' : selectedLanguage === 'mr' ? 'वर्गातील शब्द' : selectedLanguage === 'bn' ? 'বিভাগের শব্দ' : 'Category Term'}
                      </span>
                      <h2 className={`font-black tracking-tight mt-2 text-[#2B6CB0] ${textClass('2xl')}`} style={{ color: highContrast ? '#eab308' : undefined }}>
                        {selectedGlossaryTerm.term}
                      </h2>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        id="btn-glossary-read"
                        onClick={() => speakText(`${selectedGlossaryTerm.term}. ${termDef}`, selectedLanguage)}
                        className={`p-2.5 rounded-xl flex items-center justify-center cursor-pointer ${
                          isReadingAloud && currentSpeakingText === `${selectedGlossaryTerm.term}. ${termDef}`
                            ? isSpeechPaused ? 'bg-amber-600 text-white' : 'bg-red-500 text-white animate-pulse'
                            : highContrast ? 'bg-yellow-400 text-black' : 'bg-[#2B6CB0] text-white'
                        }`}
                        aria-label="Read definition out loud"
                      >
                        {isReadingAloud && currentSpeakingText === `${selectedGlossaryTerm.term}. ${termDef}` ? (
                          isSpeechPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        id="btn-glossary-close"
                        onClick={() => setSelectedGlossaryTerm(null)}
                        className="px-3 py-1.5 border border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        {selectedLanguage === 'hi' ? 'बंद करें (Close)' : selectedLanguage === 'mr' ? 'बंद करा (Close)' : selectedLanguage === 'bn' ? 'বন্ধ করুন (Close)' : 'Clear Selected'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className={`space-y-2 p-4 rounded-xl border ${
                      highContrast 
                        ? 'bg-black border-yellow-400 text-white' 
                        : 'bg-white/80 dark:bg-zinc-900/65 border-zinc-200 dark:border-zinc-800'
                    }`}>
                      <p className={`text-xs font-extrabold uppercase tracking-widest ${highContrast ? 'text-yellow-400' : 'text-[#2B6CB0] dark:text-blue-400'}`}>
                        {selectedLanguage === 'hi' ? 'सरल शब्दों में अर्थ (Simple Meaning):' : selectedLanguage === 'mr' ? 'सरळ शब्दांत अर्थ (Simple Meaning):' : selectedLanguage === 'bn' ? 'সহজ ভাষায় অর্থ (Simple Meaning):' : 'Simple Explanation:'}
                      </p>
                      <p className={`${textClass('lg')} leading-relaxed font-semibold ${highContrast ? 'text-white' : 'text-zinc-800 dark:text-zinc-100'}`}>
                        {termDef}
                      </p>
                    </div>

                    <div className={`space-y-2 p-4 rounded-xl border ${
                      highContrast 
                        ? 'bg-black border-white text-white' 
                        : 'bg-zinc-50/50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
                    }`}>
                      <p className={`text-xs font-extrabold uppercase tracking-widest ${highContrast ? 'text-white' : 'text-[#2B6CB0] dark:text-blue-400'}`}>
                        {selectedLanguage === 'hi' ? 'कहाँ इस्तेमाल होता है (Where you will see it):' : selectedLanguage === 'mr' ? 'कुठे वापरले जाते (Where you will see it):' : selectedLanguage === 'bn' ? 'কোথায় ব্যবহৃত হয় (Where you will see it):' : 'Real-life Example:'}
                      </p>
                      <p className={`${textClass('base')} font-semibold leading-relaxed italic ${highContrast ? 'text-yellow-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                        "{termExample}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Search Input and Category Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="glossary-search-input"
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder={
                    selectedLanguage === 'hi' 
                      ? "कठिन शब्द खोजें (जैसे: शपथ पत्र, सत्यापन)..." 
                      : "Search terms (e.g., affidavit, domicile, attestation)..."
                  }
                  className={`${theme.input} w-full pl-11 pr-4 py-3 text-sm`}
                  aria-label="Search glossary terms"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Glossary categories">
                {(['All', 'Legal', 'Identity', 'Financial', 'Address'] as const).map((tab) => (
                  <button
                    key={tab}
                    id={`glossary-tab-${tab}`}
                    onClick={() => setActiveGlossaryTab(tab)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer border transition-all ${
                      activeGlossaryTab === tab ? theme.pillActive : theme.pillInactive
                    }`}
                    role="tab"
                    aria-selected={activeGlossaryTab === tab}
                  >
                    {t(`cat${tab}`)}
                  </button>
                ))}
              </div>

            </div>

             {/* Glossary Terms Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGlossary.map((item, idx) => (
                <div
                  key={idx}
                  id={`glossary-card-${idx}`}
                  onClick={() => setSelectedGlossaryTerm(item)}
                  className={`${theme.card} p-5 cursor-pointer hover:border-[#2B6CB0] hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group ${
                    selectedGlossaryTerm?.term === item.term ? 'ring-2 ring-[#2B6CB0]' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] uppercase font-extrabold tracking-widest ${highContrast ? 'text-yellow-400' : 'text-zinc-600 dark:text-zinc-400'}`}>{t('cat' + item.category)} {selectedLanguage === 'hi' ? 'श्रेणी' : selectedLanguage === 'mr' ? 'वर्ग' : selectedLanguage === 'bn' ? 'বিভাগ' : 'Category'}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300`}>Hindi: {item.translation.split(' ')[0]}</span>
                    </div>
                    
                    <h3 className="font-extrabold text-base group-hover:text-[#2B6CB0] transition-colors">{item.term}</h3>
                    <p className={`text-xs ${theme.textMuted} line-clamp-2 leading-relaxed`}>{getTermDefinition(item, selectedLanguage)}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#2B6CB0] border-t pt-3" style={{ borderColor: highContrast ? '#eab308' : undefined }}>
                    <span>अर्थ और उदाहरण जानें (Details)</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}

               {filteredGlossary.length === 0 && (
                <div className="col-span-full">
                  {isSearchingAI ? (
                    <div id="glossary-ai-loading" className="py-16 text-center space-y-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 animate-pulse">
                      <Loader2 className="w-10 h-10 text-[#2B6CB0] dark:text-blue-400 mx-auto animate-spin" />
                      <div className="space-y-1">
                        <p className="font-bold text-zinc-700 dark:text-zinc-300">
                          {selectedLanguage === 'hi' ? 'हमारी त्वरित सूची में नहीं है — AI से जांच की जा रही है...' : selectedLanguage === 'mr' ? 'आमच्या त्वरित यादीत नाही — AI द्वारे तपासले जात आहे...' : selectedLanguage === 'bn' ? 'আমাদের তালিকায় নেই — AI দিয়ে খোঁজা হচ্ছে...' : 'Not in our quick list — checking with AI...'}
                        </p>
                        <p className={`text-xs ${highContrast ? 'text-yellow-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
                          {selectedLanguage === 'hi' ? 'कृपया प्रतीक्षा करें, हम इसके सरलतम अर्थ की खोज कर रहे हैं' : selectedLanguage === 'mr' ? 'कृपया प्रतीक्षा करा, आम्ही सर्वात सोपा अर्थ शोधत आहोत' : selectedLanguage === 'bn' ? 'দয়া করে অপেক্ষা করুন, আমরা সহজতম অর্থ খুঁজছি' : 'Please wait while we search for its simplified meaning'}
                        </p>
                      </div>
                    </div>
                  ) : glossaryOfflineError ? (
                    <div id="glossary-offline-error" className="py-16 text-center space-y-4 bg-amber-50/40 dark:bg-amber-950/10 rounded-3xl border border-dashed border-amber-200 dark:border-amber-900/60 p-6">
                      <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto animate-bounce" />
                      <div className="space-y-1.5 max-w-md mx-auto">
                        <p className="font-bold text-amber-800 dark:text-amber-400">
                          {selectedLanguage === 'hi' ? 'ऑफ़लाइन मोड (शब्द नहीं मिला)' : selectedLanguage === 'mr' ? 'ऑफलाईन मोड (शब्द सापडला नाही)' : selectedLanguage === 'bn' ? 'অফলাইন মোড (শব্দ পাওয়া যায়নি)' : 'Offline Mode (Term Not Found)'}
                        </p>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {selectedLanguage === 'hi' 
                            ? 'यह शब्द अभी हमारी ऑफ़लाइन सूची में नहीं है। इसे खोजने के लिए इंटरनेट से कनेक्ट करें, या ऑनलाइन आने पर दोबारा प्रयास करें।' 
                            : selectedLanguage === 'mr'
                            ? 'हा शब्द अजून आमच्या ऑफलाईन यादीत नाही. शोधण्यासाठी इंटरनेटशी कनेक्ट करा, किंवा ऑनलाईन आल्यावर पुन्हा प्रयत्न करा.'
                            : selectedLanguage === 'bn'
                            ? 'এই শব্দটি এখনও আমাদের অফলাইন তালিকায় নেই। এটি খুঁজতে ইন্টারনেটের সাথে যুক্ত হোন, অথবা অনলাইন হলে আবার চেষ্টা করুন।'
                            : "This word isn't in our offline list yet. Connect to the internet to look it up, or ask about it once you're back online."}
                        </p>
                      </div>
                    </div>
                  ) : (() => {
                    const termKey = debouncedGlossarySearch.toLowerCase();
                    const cachedInvalid = aiTermsSession[termKey]?.is_invalid;
                    if (cachedInvalid) {
                      return (
                        <div id="glossary-invalid-term" className={`${theme.card} py-12 text-center space-y-4 p-6 animate-fade-in`}>
                          <HelpCircle className={`w-12 h-12 mx-auto ${highContrast ? 'text-yellow-400' : 'text-[#2B6CB0]'}`} />
                          <div className="space-y-2 max-w-md mx-auto">
                            <p className={`font-extrabold text-lg ${highContrast ? 'text-white' : 'text-[#1A365D]'}`}>
                              {selectedLanguage === 'hi' ? 'गैर-सरकारी या सामान्य शब्द' : selectedLanguage === 'mr' ? 'गैर-सरकारी किंवा सामान्य शब्द' : selectedLanguage === 'bn' ? 'বেসরকারি বা সাধারণ শব্দ' : 'Non-Government / Standard Term'}
                            </p>
                            <p className={`text-sm leading-relaxed font-semibold ${highContrast ? 'text-yellow-400' : 'text-zinc-750 dark:text-zinc-250'}`}>
                              {aiTermsSession[termKey]?.definition || (selectedLanguage === 'hi' 
                                ? 'यह एक मानक सरकारी या कानूनी शब्द नहीं लगता है। कृपया अपने फॉर्म पर दिखाई देने वाले सटीक शब्द या वाक्यांश को खोजने का प्रयास करें।' 
                                : selectedLanguage === 'mr'
                                ? 'हा एक प्रमाणित सरकारी किंवा कायदेशीर शब्द वाटत नाही. कृपया आपल्या फॉर्मवर दिसणारा अचूक शब्द किंवा वाक्यांश शोधण्याचा प्रयत्न करा.'
                                : selectedLanguage === 'bn'
                                ? 'এটি কোনো সাধারণ সরকারি বা আইনি শব্দ বলে মনে হচ্ছে না। অনুগ্রহ করে আপনার ফর্মে থাকা সঠিক শব্দটি দিয়ে খোঁজার চেষ্টা করুন।'
                                : "This doesn't look like a standard government or legal term. Try searching for the exact word or phrase as it appears on your form.")
                              }
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div id="glossary-no-results" className="py-16 text-center space-y-3">
                        <HelpCircle className="w-12 h-12 text-zinc-350 mx-auto dark:text-zinc-400" />
                        <p className="font-bold text-zinc-600 dark:text-zinc-350">
                          {selectedLanguage === 'hi' ? 'कोई शब्द नहीं मिला (No words found)' : selectedLanguage === 'mr' ? 'एकही शब्द सापडला नाही (No words found)' : selectedLanguage === 'bn' ? 'কোনো শব্দ পাওয়া যায়নি (No words found)' : 'No words found'}
                        </p>
                        <button 
                          onClick={() => { setGlossarySearch(""); setActiveGlossaryTab("All"); }}
                          className="text-xs text-[#2B6CB0] font-bold underline cursor-pointer"
                        >
                          {selectedLanguage === 'hi' ? 'फ़िल्टर साफ़ करें (Clear filters)' : selectedLanguage === 'mr' ? 'ফिल्टर साफ करा (Clear filters)' : selectedLanguage === 'bn' ? 'ফিল্টার পরিষ্কার করুন (Clear filters)' : 'Clear filters'}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>
          </div>
        )}





        {/* 6. REVIEW SUMMARY PAGE VIEW */}
        {currentPage === 'summary' && activeForm && (
          <div id="view-summary" className="space-y-10 animate-fade-in">
            
            {/* SUCCESS HEADER */}
            <div className={`p-8 rounded-3xl border-2 text-center space-y-4 ${
              highContrast 
                ? 'border-yellow-400 bg-black text-white' 
                : 'border-green-200 bg-green-50/20 text-zinc-900'
            }`}>
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/40 dark:text-green-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h1 className={`${textClass('3xl')} font-black tracking-tight text-green-700 dark:text-green-400`}>
                  {rt('successHeader')}
                </h1>
                <p className={`${textClass('lg')} max-w-2xl mx-auto ${theme.textMuted} font-medium`}>
                  {rt('successSub')}
                </p>
              </div>
            </div>

            {/* TWO COLUMN GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: FIELDS SUMMARY LIST */}
              <div className="lg:col-span-8 space-y-6">
                <div className={`${theme.card} p-6 space-y-6`}>
                  <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: highContrast ? '#eab308' : undefined }}>
                    <div className="flex items-center gap-2">
                      <FileText className={`w-5 h-5 ${theme.iconColor}`} />
                      <h2 className={textClass('xl')}>
                        {rt('fieldSummary')}
                      </h2>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {activeForm.fields.length} {selectedLanguage === 'hi' ? 'फ़ील्ड' : 'fields'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeForm.fields.map((field, idx) => {
                      const answer = userAnswers[field.id]?.trim();
                      const isBlank = !answer;
                      const check = getFieldCompletionStatus(field, answer, selectedLanguage);
                      const isPartial = !isBlank && check.status === 'partial';

                      const cardBorderClass = isBlank 
                        ? 'border-amber-300 bg-amber-50/5' 
                        : isPartial
                          ? 'border-amber-200 bg-amber-50/5'
                          : 'border-zinc-100 bg-zinc-50/20';

                      return (
                        <div 
                          key={field.id}
                          id={`summary-field-card-${idx}`}
                          className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${cardBorderClass} ${highContrast ? 'border-yellow-400 bg-black text-white' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className={`${textClass('base')} font-black text-[#2B6CB0]`} style={{ color: highContrast ? 'white' : undefined }}>
                                {selectedLanguage === 'hi' ? `भाग ${idx + 1}: ` : `Step ${idx + 1}: `}
                                {field.field_name}
                              </h3>
                            </div>
                            {(() => {
                              if (isBlank) {
                                return (
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 ${highContrast ? 'bg-yellow-400 text-black border-none' : ''}`}>
                                    <AlertTriangle className="w-3 h-3 shrink-0" />
                                    {rt('noAnswer')}
                                  </span>
                                );
                              }
                              if (isPartial) {
                                return (
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 ${highContrast ? 'bg-yellow-400 text-black border-none' : ''}`}>
                                    <AlertTriangle className="w-3 h-3 shrink-0 animate-pulse" />
                                    {reviewTranslations[selectedLanguage]?.partialStatus || reviewTranslations['en']?.partialStatus}
                                  </span>
                                );
                              }
                              return (
                                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-green-100 text-green-800 border border-green-300">
                                  <Check className="w-3.5 h-3.5 shrink-0" />
                                  {reviewTranslations[selectedLanguage]?.filledStatus || reviewTranslations['en']?.filledStatus}
                                </span>
                              );
                            })()}
                          </div>

                          <div className="pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col gap-1.5 text-xs">
                            <p className="font-semibold text-zinc-500">
                              <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] mr-1">
                                {rt('originalTerm')}:
                              </span>
                              <span className="italic">"{field.original_text}"</span>
                            </p>
                            <div className="mt-1">
                              <p className={`${textClass('sm')} font-bold`}>
                                <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] mr-1 block sm:inline">
                                  {rt('yourAnswer')}:
                                </span>
                                <span className={isBlank ? 'text-amber-600 font-extrabold' : 'text-zinc-900 font-extrabold bg-zinc-100 px-2.5 py-1 rounded-lg'}>
                                  {isBlank ? rt('noAnswer') : answer}
                                </span>
                              </p>
                              {isPartial && (
                                <p className="text-[11px] font-bold text-amber-700 mt-1 pl-1">
                                  {reviewTranslations[selectedLanguage]?.missingPrefix || reviewTranslations['en']?.missingPrefix}
                                  <span className="underline font-extrabold">{check.missingParts.join(", ")}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: REPEATED CHECKLISTS & CONGRATULATIONS */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* PAPERS YOU WILL NEED */}
                <div className={`${theme.card} p-6 space-y-4`}>
                  <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: highContrast ? '#eab308' : undefined }}>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wider">
                      {rt('requiredPapers')}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">
                    {selectedLanguage === 'hi' ? 'फ़ॉर्म जमा करते समय इन्हें साथ ज़रूर लगाएँ:' : 'Attach these copies alongside your form:'}
                  </p>
                  
                  <ul className="space-y-3" role="list">
                    {activeForm.required_documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs">
                        <input 
                          type="checkbox" 
                          id={`summary-doc-check-${idx}`}
                          className={`mt-0.5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4 shrink-0`}
                          aria-label={`Checkbox for document: ${doc}`}
                        />
                        <label htmlFor={`summary-doc-check-${idx}`} className="font-semibold cursor-pointer select-none leading-relaxed">
                          {doc}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COMMON MISTAKES TO AVOID */}
                <div className={`${theme.card} p-6 space-y-4 border-amber-200 bg-amber-50/10`}>
                  <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: highContrast ? '#eab308' : undefined }}>
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-800" style={{ color: highContrast ? 'white' : undefined }}>
                      {rt('commonMistakes')}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3" role="list">
                    {activeForm.common_mistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed font-bold text-amber-900" style={{ color: highContrast ? 'white' : undefined }}>
                        <span className="text-amber-500 font-extrabold shrink-0">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CONGRATS & PURPOSE NOTE */}
                <div className={`${theme.accentCard} p-6 space-y-3`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500 shrink-0" />
                    <h4 className="font-extrabold text-sm uppercase tracking-wider">
                      {selectedLanguage === 'hi' ? 'बधाई हो!' : 'Congratulations!'}
                    </h4>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">
                    {rt('congratsMessage')}
                  </p>
                </div>

              </div>

            </div>

            {/* ACTION BUTTONS FOOTER BAR */}
            <div className={`p-6 rounded-3xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 ${
              highContrast ? 'border-yellow-400 bg-black' : 'border-zinc-100 bg-zinc-50/50'
            }`}>
              
              <button
                id="btn-summary-edit"
                onClick={() => {
                  setWizardStep(0);
                  setCurrentPage('results');
                }}
                className={`${theme.secondaryButton} w-full md:w-auto px-6 py-4 text-sm font-bold flex items-center justify-center gap-2`}
              >
                <ArrowLeft className="w-4 h-4" />
                {rt('editBtn')}
              </button>

              <div className="flex flex-col sm:flex-row items-stretch w-full md:w-auto gap-3">
                
                {copiedNotification && (
                  <div className="self-center text-xs font-extrabold text-green-600 animate-pulse">
                    {rt('copied')}
                  </div>
                )}
                
                <button
                  id="btn-summary-copy"
                  onClick={handleCopySummary}
                  className={`${theme.accentButton} px-6 py-4 text-sm font-bold flex items-center justify-center gap-2`}
                >
                  <Copy className="w-4 h-4" />
                  {rt('copyBtn')}
                </button>

                <button
                  id="btn-summary-download"
                  onClick={handleDownloadSummary}
                  className={`${theme.primaryButton} px-6 py-4 text-sm font-bold flex items-center justify-center gap-2`}
                >
                  <Download className="w-4 h-4" />
                  {rt('downloadBtn')}
                </button>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`mt-auto py-8 px-6 border-t text-center space-y-2 text-xs font-medium ${highContrast ? 'border-yellow-400 bg-black text-white' : 'border-zinc-100 bg-white'}`}>
        <p className="font-bold">SahajForm (सहजफ़ॉर्म) • Built for India, accessible to all.</p>
        <p className={theme.textMuted}>
          Created for visually impaired, elderly, and rural citizens to bridge the legal language divide. Supported languages: English, Hindi (हिंदी).
        </p>
      </footer>

    </div>
  );
}
