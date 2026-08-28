import { GoogleGenAI } from "@google/genai";

async function getAiToolsData() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Provide a comprehensive list of 50+ real AI tools across at least 20 categories.
    For each tool, provide:
    - Name
    - URL
    - Categories (at least 1, can be multiple)
    - Description (1-2 sentences)
    - Rating (3.5 to 5.0)
    - Details:
      - canDo (3-5 specific points)
      - cannotDo (2-3 specific points)
      - freeTier (what's included)
      - paidTier (what's included)
      - authReq (how to login)
      - credits (how the credit system works)
    
    Categories to include: Chat & Assistants, Code Generation, Image Generation, Video Production, Audio & Music, Design & UI/UX, Writing & Content, Marketing & SEO, Research & Science, Data Analysis, Productivity & Workflow, Education & Tutoring, Customer Support, 3D & Gaming, Legal & Compliance, Finance & Accounting, HR & Recruiting, Sales & CRM, Translation & Languages, Cybersecurity.
    
    Return the data as a JSON array of objects matching the AITool interface.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json"
    }
  });

  return response.text;
}
