import { GoogleGenAI } from "@google/genai";
import { 
  CPMK_SCHEMA, 
  DESCRIPTION_SCHEMA, 
  BAHAN_KAJIAN_SCHEMA, 
  REFERENCE_SCHEMA, 
  MEDIA_SCHEMA, 
  EVALUATION_SCHEMA, 
  WEEKLY_PLAN_SCHEMA 
} from '../types';

const apiKey = process.env.API_KEY || '';
// Note: We recreate the client in each call if needed, but sharing one instance is fine if key is static.
// The requirements state "Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key" 
// mostly for user-input keys. Here it's process.env, but following pattern is safer.

const getAIClient = () => new GoogleGenAI({ apiKey });

export const generateContent = async (prompt: string, schema: any, useSearch = false) => {
  const ai = getAIClient();
  
  const config: any = {
    systemInstruction: "Anda adalah asisten akademik yang ahli dalam menyusun Rencana Pembelajaran Semester (RPS) universitas di Indonesia. Anda harus mengikuti format yang diminta dan selaras dengan semua data yang diberikan.",
  };

  // IMPORTANT: Gemini guidance says:
  // If Google Search is used:
  // 1. tools: [{googleSearch: {}}]
  // 2. DO NOT set responseMimeType
  // 3. DO NOT set responseSchema
  
  if (useSearch) {
    config.tools = [{ googleSearch: {} }];
  } else {
    config.responseMimeType = "application/json";
    config.responseSchema = schema;
  }

  const model = useSearch ? 'gemini-2.5-flash' : 'gemini-2.5-flash-preview-09-2025'; 
  // Use preview model for structured JSON tasks as per previous experience with complex schemas, 
  // or stick to standard models if stable. The user code used 'gemini-2.5-flash-preview-09-2025'.

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: config
    });

    // For search, we just return the text. For JSON, we parse it.
    if (useSearch) {
      return { result: response.text };
    }

    // For JSON mode
    const text = response.text;
    if (!text) throw new Error("No text returned from API");
    return JSON.parse(text);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Gagal memproses permintaan AI");
  }
};
