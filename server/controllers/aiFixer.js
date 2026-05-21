// Upgraded AI Fixer with automatic failover/fallback capabilities
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fixWithAI = async (req, res) => {
    const { codeSnippet } = req.body;
    if (!codeSnippet) return res.status(400).json({ error: "No code snippet provided." });
    
    const prompt = `
    Refactor this C code snippet to resolve the Y2K38 vulnerability. 
    Convert the 32-bit time variables to 64-bit equivalents (e.g., int64_t or time64_t) and adjust any casting.
    
    Target snippet:
    ${codeSnippet}
    
    Provide ONLY the refactored C code snippet. Do not include markdown blocks like \`\`\`c or explanations.
    `;

    // Array of models ordered by preference. If the first fails, it falls back to the next.
    const modelTierList = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
    let finalError = null;

    for (const modelName of modelTierList) {
        try {
            console.log(`[AI Engine] Attempting code refactor using model: ${modelName}...`);
            
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
            });
            
            // If successful, extract text and send back to frontend immediately
            const generatedText = response.text.trim();
            console.log(`[AI Engine] Successfully generated structural fix using ${modelName}.`);
            return res.json({ fixedCode: generatedText });

        } catch (error) {
            console.warn(`[AI Engine] Warning: ${modelName} failed or throttled. Checking fallbacks...`);
            finalError = error; // Capture the error in case all options fail
        }
    }

    // If the code loop reaches here, all models in the tier list were overloaded
    console.error("[AI Engine] Critical: All available Gemini API tiers are overloaded.", finalError);
    res.status(503).json({ 
        error: "Google AI servers are currently congested. Please wait a few moments and click 'AI Refactor' again." 
    });
};

module.exports = { fixWithAI };