
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PortfolioData, AIInsight } from '../types';
import { GEMINI_TEXT_MODEL } from '../constants';

// IMPORTANT: The API key MUST be set as an environment variable `process.env.API_KEY`.
// This code assumes `process.env.API_KEY` is available in the execution environment.
// For pure client-side setups without a build process, this is often not the case.
// A backend proxy or server-side rendering setup is better for key management.

let ai: GoogleGenAI | null = null;
let apiKeyAvailable = false;

// Safely attempt to get the API key
let apiKeyFromEnv: string | undefined = undefined;
if (typeof process !== 'undefined' && process.env) {
  apiKeyFromEnv = process.env.API_KEY;
}

if (apiKeyFromEnv) {
  try {
    ai = new GoogleGenAI({ apiKey: apiKeyFromEnv });
    apiKeyAvailable = true;
    console.log("GoogleGenAI initialized successfully.");
  } catch (error) {
    console.error("Error initializing GoogleGenAI (even with API key found):", error);
    // ai remains null, apiKeyAvailable remains false
  }
} else {
  console.warn("Gemini API key is not available (process.env.API_KEY is not set, or 'process'/'process.env' is undefined). AI features will be limited.");
}


const generatePromptForPortfolio = (portfolio: PortfolioData): string => {
  const assetsSummary = portfolio.assets.map(asset => 
    `${asset.name} (${asset.symbol}): ${asset.balance.toFixed(2)} units, valued at $${asset.usdValue.toFixed(2)} on ${asset.chain}`
  ).join('\n - ');

  return `
    You are a DeFi portfolio analyst AI for "DeFi Intelligence Hub".
    Analyze the following crypto portfolio and provide insights.
    The user's current selected chain is ${portfolio.assets[0]?.chain || 'not specified'}.
    Portfolio Total Value: $${portfolio.totalValue.toFixed(2)}
    Assets:
    - ${assetsSummary}

    Based on this data:
    1. Provide a concise (50-70 words) risk assessment summary.
    2. Suggest 2-3 actionable yield optimization strategies relevant to the assets or general DeFi landscape. Keep each suggestion brief (1-2 sentences).
    3. Briefly comment on a potential market trend (e.g., related to Layer 2s, liquid staking, RWAs, etc.) that might be relevant (30-50 words).

    Format your response clearly. Be professional, insightful, and slightly optimistic but cautious.
    Do not use markdown formatting in your response text like \`\`\`json or \`\`\`.
  `;
};

export const generateAIInsights = async (portfolio: PortfolioData): Promise<AIInsight[]> => {
  if (!ai || !apiKeyAvailable) {
    console.warn("Gemini AI client not initialized or API key missing. Returning placeholder insight.");
    return [
      { 
        id: 'error-no-api-key-or-client', 
        title: "AI Service Unavailable", 
        content: "The AI insights service is currently unavailable. This might be due to a missing API key or an issue with the AI client initialization.", 
        type: 'General', 
        timestamp: new Date().toISOString() 
      }
    ];
  }

  const prompt = generatePromptForPortfolio(portfolio);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: "user", parts: [{text: prompt}] }],
      // config: { systemInstruction: "You are a helpful DeFi analyst." } // System instruction can also be part of the prompt.
    });
    
    const text = response.text;

    // Basic parsing of the text. This can be improved with more structured output from Gemini.
    // For now, we'll create a single insight with the full text.
    // A more advanced approach would be to ask Gemini for JSON.
    const insights: AIInsight[] = [
      {
        id: `gemini-${Date.now()}`,
        title: "AI Portfolio Analysis",
        content: text || "No specific insights generated. The AI model may have returned an empty response.",
        type: 'General',
        timestamp: new Date().toISOString(),
      }
    ];
    // Example: Try to split sections if AI follows a pattern (e.g., "Risk Assessment:", "Yield Optimization:")
    // This is a naive split and depends heavily on consistent AI output format.
    const sections = (text ?? '').split(/\n\s*\d\.\s+|\n\s*(?:Risk Assessment|Yield Optimization|Market Trend):/i);
    if (sections.length > 1) {
        insights.length = 0; // Clear the generic insight
        const textLength = (text ?? '').length;
        if (sections[0].trim().length > 5 && sections[0].trim().length < textLength * 0.8) { // Overall intro if any, and not the whole text
            insights.push({ id: `gemini-intro-${Date.now()}`, title: "AI Overview", content: sections[0].trim(), type: 'General', timestamp: new Date().toISOString() });
        }
        sections.slice(1).forEach((sectionText, index) => {
            let title = "AI Insight";
            let type: AIInsight['type'] = 'General';
            const lowerSectionText = sectionText.toLowerCase();

            if (lowerSectionText.includes("risk assessment") || (insights.length === 0 && index === 0)) title = "Risk Assessment";
            else if (lowerSectionText.includes("yield optimization") || lowerSectionText.includes("strateg")) { title = "Yield Suggestion"; type = 'YieldOptimization'; }
            else if (lowerSectionText.includes("market trend")) { title = "Market Trend"; type = 'MarketTrend'; }
            
            if(sectionText.trim()){
              insights.push({
                  id: `gemini-section-${index}-${Date.now()}`,
                  title: title,
                  content: sectionText.trim(),
                  type: type,
                  timestamp: new Date().toISOString(),
              });
            }
        });
        // If still no insights, use the full text as a fallback
        if(insights.length === 0 && (text ?? '').trim()){
             insights.push({
                id: `gemini-fallback-${Date.now()}`,
                title: "AI Portfolio Analysis",
                content: (text ?? '').trim(),
                type: 'General',
                timestamp: new Date().toISOString(),
            });
        }
    }


    return insights;

  } catch (error) {
    console.error("Error generating AI insights:", error);
    let errorMessage = "An error occurred while fetching AI insights.";
    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
    }
    return [{ 
      id: `error-${Date.now()}`, 
      title: "AI Insight Error", 
      content: errorMessage, 
      type: 'General', 
      timestamp: new Date().toISOString() 
    }];
  }
};
