import { NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

export async function POST(req: Request) {
  try {
    const { letterContent, childName } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      // Return a simulated high-quality mock if API key is missing
      return NextResponse.json({
        thoughtProcess: [
          "Analyzing semantic rhythm...",
          "Detecting latent emotional dissonance...",
          "Decrypting core desire subtext...",
        ],
        deepInsight: `Our neural models detect that ${childName}'s request mask a deeper emotional journey. This isn't just about a toy; it's about a connection to their evolving sense of wonder.`,
        personalRecommendation:
          "Include a hand-written note from the Lead Elf emphasizing the unique spirit of the gift.",
      });
    }

    const systemPrompt = `
      You are the SantaOS Neural Wish Decryptor. 
      Analyze the following child's letter to Santa. 
      Provide a deep emotional insight and the "AI's thought process" in a structured JSON format.
      
      Tone: Cinematic, professional, warm, and highly analytical.
      
      The output MUST be a JSON object with strictly these keys:
      1. thoughtProcess: (Array of strings) 3 short, technical-sounding steps describing the analysis.
      2. deepInsight: (String) A sophisticated 2-sentence explanation of the real emotional root of the wish.
      3. personalRecommendation: (String) A specific, creative suggestion for Santa.

      Letter content from ${childName}: "${letterContent}"
    `;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemPrompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error(
        `Gemini Error: ${data.error?.message || "Empty response"}`
      );
    }

    // Extract JSON from potential markdown backticks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsedData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!parsedData) {
      throw new Error("Failed to parse technical JSON from AI response.");
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("SantaOS API Error Details:", error.message);
    // GLOBAL FALLBACK: Always return a high-quality mock if anything fails
    return NextResponse.json({
      thoughtProcess: [
        "Analyzing latent emotional markers...",
        "Neural nodes syncing with regional data...",
        "Finalizing heuristic wish decryption...",
      ],
      deepInsight:
        "The neural link is experiencing heavy festive traffic. However, initial scans suggest a deep desire for connection and joy that transcends physical gifts.",
      personalRecommendation:
        "Proceed with standard festive protocols and include a special 'Spirit of Christmas' certificate.",
    });
  }
}
