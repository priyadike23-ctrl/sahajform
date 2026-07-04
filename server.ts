import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { glossaryTerms } from "./src/demoData";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

// Increase payload limits for base64 image processing
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Initialize Google Gen AI client lazy-style to prevent immediate crash if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add your key in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", apiKeyConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY" });
});

// API endpoint to simplify complex forms using Gemini API (Multimodal Vision + JSON output)
const handleSimplify = async (req: express.Request, res: express.Response) => {
  try {
    const { image, images, pages, text, language = "en" } = req.body;

    const hasImages = (images && Array.isArray(images) && images.length > 0) || 
                      (pages && Array.isArray(pages) && pages.length > 0) || 
                      image;

    if (!hasImages && !text) {
      return res.status(400).json({ error: "Please upload an image or provide form text to simplify." });
    }

    const ai = getAiClient();
    
    // Prepare contents parts for Gemini
    const parts: any[] = [];

    // Collect all base64 images
    const imageList: string[] = [];
    if (images && Array.isArray(images)) {
      imageList.push(...images);
    } else if (pages && Array.isArray(pages)) {
      imageList.push(...pages);
    } else if (image) {
      imageList.push(image);
    }

    // Add images if available
    for (const img of imageList) {
      // Expecting a base64 string, e.g., "data:image/png;base64,iVBORw0K..."
      const matches = img.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        parts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        });
      } else {
        // Fallback if it's already a raw base64 string
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: img,
          },
        });
      }
    }

    // Prepare system/context prompts
    const langNames: Record<string, string> = {
      hi: "Hindi (हिंदी)",
      en: "English",
      mr: "Marathi (मराठी)",
      te: "Telugu (తెలుగు)",
      ta: "Tamil (தமிழ்)",
      bn: "Bengali (বাংলা)",
      gu: "Gujarati (ગુજરાતી)",
      kn: "Kannada (ಕನ್ನಡ)",
      pa: "Punjabi (ਪੰਜਾਬੀ)",
      ml: "Malayalam (മലയാളം)",
      or: "Odia (ଓଡ଼ିଆ)"
    };
    const targetLang = langNames[language] || "English";

    const systemInstruction = 
      "You are SahajForm (meaning 'Easy Form' in Hindi) - a friendly, highly empathetic AI assistant designed to help low-literacy, elderly, and visually impaired citizens. " +
      "Your objective is to analyze a government/legal application form (either from an image or pasted text), extract its core fields, " +
      `and simplify them completely into plain, conversational, humble, and jargon-free language in the requested language: ${targetLang}. ` +
      "Avoid any formal, legalistic, or bureaucratic terminology. Explain every field like you are speaking to a grandparent or neighbor who cannot read well. " +
      "For every field, provide a very clear, simple, and realistic example answer so they know exactly what to write.";

    const userPrompt = text 
      ? `Simplify the following form text. Explain what each section means, list required documents, list common mistakes to avoid, and break down each individual field into super-simple instructions in ${targetLang}:\n\n${text}`
      : `First, determine if all provided images belong to the same form/document based on title, letterhead, and structure. If they do not, respond with a clear indication of mismatch and name each distinct form detected. If they do match, proceed to extract and simplify all fields as a single unified form.` +
        ` Perform OCR to read it, find its title, detect its purpose, list required documents to go with it, list common mistakes to avoid, and break down each individual form field/input area into super-simple, conversational instructions in ${targetLang}.`;

    parts.push({ text: userPrompt });

    // Call Gemini 3.5 Flash for multimodal processing and JSON-structured output
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: parts,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            is_mismatch: {
              type: Type.BOOLEAN,
              description: "True if multiple images are provided and they appear to belong to DIFFERENT, unrelated documents/forms instead of different pages of the same form. False otherwise (including when only 1 image or text is provided).",
            },
            detected_forms: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "If is_mismatch is true, list the names/titles of the distinct forms/documents detected (e.g. ['Bank Account Opening Form', 'Trademark Application Form']). If is_mismatch is false, keep this list empty.",
            },
            form_title: {
              type: Type.STRING,
              description: "A friendly and clear name for the form in the output language. Incorporate the original title. If is_mismatch is true, provide an empty string.",
            },
            language: {
              type: Type.STRING,
              description: "The language of the output: 'en' or 'hi'.",
            },
            detected_purpose: {
              type: Type.STRING,
              description: "A super-simple, warm, 2-3 sentence description of what this form is used for, why citizens need it, and who it is for. If is_mismatch is true, provide an empty string.",
            },
            required_documents: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of documents needed to submit alongside this form. If is_mismatch is true, keep this list empty.",
            },
            common_mistakes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of common errors people make when filling this form and how to avoid them. If is_mismatch is true, keep this list empty.",
            },
            fields: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: {
                    type: Type.STRING,
                    description: "A unique string id for the field (e.g., f1, f2, f3).",
                  },
                  field_name: {
                    type: Type.STRING,
                    description: "A simple, friendly name/label for the field.",
                  },
                  original_text: {
                    type: Type.STRING,
                    description: "The exact or approximate original wording of the field from the form.",
                  },
                  simplified_explanation: {
                    type: Type.STRING,
                    description: "The plain-language, extremely simple step-by-step instruction explaining what this field is asking for and how to find the information.",
                  },
                  example_answer: {
                    type: Type.STRING,
                    description: "A clear, realistic sample answer to illustrate what should be filled in.",
                  },
                },
                required: ["id", "field_name", "original_text", "simplified_explanation", "example_answer"],
              },
              description: "The step-by-step sequential breakdown of fields to fill in the form. If is_mismatch is true, keep this list empty.",
            },
          },
          required: ["is_mismatch", "detected_forms", "form_title", "language", "detected_purpose", "required_documents", "fields", "common_mistakes"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response generated from the AI model.");
    }

    const parsedJson = JSON.parse(resultText.trim());
    return res.json(parsedJson);

  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ 
      error: error.message || "Something went wrong while processing the form. Please try again.",
      details: error.stack
    });
  }
};

app.post("/api/simplify", handleSimplify);
app.post("/api/simplify-form", handleSimplify);

// API endpoint to answer voice/text follow-up questions about a form field
app.post("/api/ask", async (req, res) => {
  try {
    const { question, field_context, form_context, language = "en" } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Please provide a question." });
    }

    const ai = getAiClient();

    const langNames: Record<string, string> = {
      hi: "Hindi (हिंदी)",
      en: "English",
      mr: "Marathi (मराठी)",
      te: "Telugu (తెలుగు)",
      ta: "Tamil (தமிழ்)",
      bn: "Bengali (বাংলা)",
      gu: "Gujarati (ગુજરાતી)",
      kn: "Kannada (ಕನ್ನಡ)",
      pa: "Punjabi (ਪੰਜਾਬੀ)",
      ml: "Malayalam (മലയാളം)",
      or: "Odia (ଓଡ଼ିଆ)"
    };
    const targetLang = langNames[language] || "English";

    const systemInstruction = 
      "You are SahajForm - a highly empathetic assistant for elderly and low-literacy citizens. " +
      "The user is asking a follow-up question about a specific field on a government form. " +
      "Answer their question in 2-3 short, warm sentences. " +
      "NEVER use legal or complex terms. Keep it humble, direct, and incredibly clear. " +
      `You MUST reply in the requested language: ${targetLang}. ` +
      `Use simple terms. Speak in very warm, colloquial, friendly terms.`;

    const userPrompt = 
      `Form context: ${form_context || "Government Form"}\n` +
      `Field they are currently on: ${field_context || "General Form Area"}\n` +
      `User's verbal/text question: "${question}"\n\n` +
      `Please answer this question directly in simple terms.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ text: userPrompt }],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return res.json({ answer: response.text });
  } catch (error: any) {
    console.error("Ask API error:", error);
    res.status(500).json({ 
      error: error.message || "I had trouble answering that. Please ask again in simple words." 
    });
  }
});

// API endpoint to check if a user's typed answer has any rejection risk or issues
app.post("/api/check-answer", async (req, res) => {
  try {
    const { originalText, simplifiedExplanation, commonMistakes, userAnswer } = req.body;
    if (!originalText || !userAnswer || !userAnswer.trim()) {
      return res.json({ status: "ok" });
    }

    const ai = getAiClient();
    
    const mistakesListStr = Array.isArray(commonMistakes) 
      ? commonMistakes.map((m: string) => `- ${m}`).join("\n") 
      : "None";

    const systemInstruction = 
      "You are a helpful government form reviewer assistant. Your goal is to detect if a user's typed answer to a specific form field has a high risk of being rejected or contains common mistakes.\n" +
      "If the user's answer has an issue, briefly explain what is wrong and how to fix it in one warm, supportive, plain-language sentence.\n" +
      "If the answer looks fine, respond exactly with 'OK'. Keep your responses short and extremely clear.";

    const prompt = 
      `Form Field Label/Original Text: "${originalText}"\n` +
      `Field Requirement/Plain-language Explanation: "${simplifiedExplanation}"\n` +
      `Common Form Mistakes to Avoid:\n${mistakesListStr}\n\n` +
      `User's Typed Answer: "${userAnswer}"\n\n` +
      `Please check the user's answer against these details. Is there an issue? Respond with either exactly 'OK' or with a one-sentence warm warning explaining what is wrong and how to fix it.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ text: prompt }],
      config: {
        systemInstruction,
        temperature: 0.1,
      }
    });

    const result = response.text?.trim() || "OK";
    
    // Check if result is basically 'OK'
    const normalizedResult = result.replace(/[.\s]/g, "").toUpperCase();
    if (normalizedResult === "OK" || normalizedResult.startsWith("OK")) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "warning", message: result });
    }
  } catch (error: any) {
    console.error("Check Answer API error:", error);
    // On API error, we do not block the user
    return res.json({ status: "ok" });
  }
});

// API endpoint to return the static offline term list
app.get("/api/glossary", (req, res) => {
  try {
    return res.json({ glossary: glossaryTerms });
  } catch (error: any) {
    console.error("Glossary API error:", error);
    return res.status(500).json({ error: "Failed to retrieve glossary terms." });
  }
});

// API endpoint to explain a term not found in the static glossary list
app.post("/api/explain-term", async (req, res) => {
  try {
    const { term, language = "en" } = req.body;
    if (!term || !term.trim()) {
      return res.status(400).json({ error: "Missing term parameter." });
    }

    const ai = getAiClient();

    const langNames: Record<string, string> = {
      hi: "Hindi (हिंदी)",
      en: "English",
      mr: "Marathi (मराठी)",
      te: "Telugu (తెలుగు)",
      ta: "Tamil (தமிழ்)",
      bn: "Bengali (বাংলা)",
      gu: "Gujarati (ગુજરાતી)",
      kn: "Kannada (ಕನ್ನಡ)",
      pa: "Punjabi (ਪੰਜਾਬী)",
      ml: "Malayalam (മലയാളം)",
      or: "Odia (ଓଡ଼ିଆ)"
    };
    const targetLang = langNames[language] || "English";

    const systemInstruction = 
      "You are an expert legal and government terminology simplified dictionary assistant. " +
      `Your task is to define the term in the target language: ${targetLang}. ` +
      "Only provide a definition if this is a genuine, recognizable Indian government, legal, or bureaucratic term. " +
      "If the searched word is vague, incomplete, not a real term, or you are not confident it refers to something specific, " +
      "you MUST respond honestly by setting is_real to false and setting definition to a helpful fallback message in the requested language. " +
      "Do not guess or invent a plausible-sounding definition. " +
      "If it is a valid term, explain it in very simple, plain language for someone with low literacy in 2-3 short sentences, " +
      `and set is_real to true. All field values (term, translation, definition, example) must be written in the target language: ${targetLang}.`;

    const prompt = `Term to explain: "${term}". Please translate and explain it in ${targetLang}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ text: prompt }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            term: { type: Type.STRING, description: "The term being explained (translated to the target language)" },
            translation: { type: Type.STRING, description: "A simple translation, transliteration or simple equivalent in the target language" },
            definition: { type: Type.STRING, description: "A simple, warm explanation of 2-3 short sentences for someone with low literacy in the target language." },
            example: { type: Type.STRING, description: "A simple realistic example of this term or document in action in the target language." },
            category: { 
              type: Type.STRING, 
              description: "The category of the term. MUST be one of: 'Legal', 'Identity', 'Financial', 'Address'." 
            },
            is_real: { 
              type: Type.BOOLEAN, 
              description: "True if this is a real government, administrative, or legal term. False if it is not." 
            }
          },
          required: ["term", "translation", "definition", "example", "category", "is_real"]
        },
        temperature: 0.2,
      }
    });

    const resultText = response.text?.trim();
    if (!resultText) {
      throw new Error("Empty response from Gemini model");
    }

    const parsed = JSON.parse(resultText);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Explain Term API error:", error);
    return res.status(500).json({ error: "Failed to explain term" });
  }
});

// API endpoint to dynamically translate simplified form structure using Gemini API
app.post("/api/translate-form", async (req, res) => {
  try {
    const { form, language } = req.body;
    if (!form || !language) {
      return res.status(400).json({ error: "Missing form or language parameter." });
    }

    const ai = getAiClient();
    
    const langNames: Record<string, string> = {
      hi: "Hindi (हिंदी)",
      en: "English",
      mr: "Marathi (मराठी)",
      bn: "Bengali (বাংলা)",
      te: "Telugu (తెలుగు)",
      ta: "Tamil (தமிழ்)",
      gu: "Gujarati (ગુજરાતી)",
      kn: "Kannada (ಕನ್ನಡ)",
      pa: "Punjabi (ਪੰਜਾਬੀ)",
      ml: "Malayalam (മലയാളം)",
      or: "Odia (ଓڈિଆ)",
      ur: "Urdu (اردو)",
      ne: "Nepali (नेपाली)",
      as: "Assamese (অসমীয়া)"
    };
    const targetLang = langNames[language] || "English";

    const systemInstruction = 
      "You are SahajForm translator. Your task is to translate a simplified form structure from its current language " +
      `into the target language: ${targetLang}. ` +
      "You must preserve the JSON structure exactly, including all field IDs. " +
      "Translate the `form_title`, `detected_purpose`, `required_documents`, `common_mistakes`, and for each field, the `field_name`, `simplified_explanation`, and `example_answer` into extremely simple, warm, clear, and colloquial phrasing in the target language. " +
      "Keep the `original_text` field exactly as is (do not translate it because it represents the actual printed text on the physical form).";

    const userPrompt = `Translate this simplified form structure into ${targetLang}:\n\n${JSON.stringify(form, null, 2)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ text: userPrompt }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            form_title: { type: Type.STRING },
            language: { type: Type.STRING },
            detected_purpose: { type: Type.STRING },
            required_documents: { type: Type.ARRAY, items: { type: Type.STRING } },
            common_mistakes: { type: Type.ARRAY, items: { type: Type.STRING } },
            fields: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  field_name: { type: Type.STRING },
                  original_text: { type: Type.STRING },
                  simplified_explanation: { type: Type.STRING },
                  example_answer: { type: Type.STRING },
                },
                required: ["id", "field_name", "original_text", "simplified_explanation", "example_answer"],
              },
            },
          },
          required: ["form_title", "language", "detected_purpose", "required_documents", "fields", "common_mistakes"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response generated from the AI model.");
    }

    const parsedJson = JSON.parse(resultText.trim());
    // Ensure the language field matches the selected code
    parsedJson.language = language;
    return res.json(parsedJson);

  } catch (error: any) {
    console.error("Translate-form API error:", error);
    res.status(500).json({ 
      error: error.message || "Something went wrong while translating the form. Please try again."
    });
  }
});

// Configure Vite integration or static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SahajForm Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
