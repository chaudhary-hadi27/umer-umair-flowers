
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFlowerHook(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, poetic, and catchy marketing one-liner for a high-end Pakistani flower business named 'Umer and Umair Flowers'. Include a mix of English and Urdu sentiment. Keep it under 15 words.",
      config: {
        temperature: 0.8,
      },
    });
    return response.text.trim() || "Mohabbat aur Mehak, Umer & Umair Ke Saath.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Beautifully crafted flowers for your special day.";
  }
}
