const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: { responseMimeType: "application/json" }
});

/**
 * Predict waste using Gemini API (Primary Engine)
 * @param {Object} data - { attendance, menuType, foodQuantity }
 * @returns {Promise<Object>} - JSON prediction { waste_level, waste_kg, waste_percentage, suggestion }
 */
async function predictWaste(data) {
    if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY missing. Returning null to trigger fallback.');
        return null;
    }

    try {
        const prompt = `
            Act as an expert Food Waste Analyst.
            
            SCENARIO: ONE-TIME PREPARATION (No Refills).
            
            Input Data:
            - Menu: ${data.menuType}
            - Expected Attendance: ${data.attendance} people
            - Food Prepared: ${data.foodQuantity} kg
            - Average Consumption: ${data.consumption} kg/person
            
            YOUR TASK (Step-by-Step):
            1. Calculate 'Required Food' = Attendance * ${data.consumption} (Average consumption).
            2. Calculate 'Difference' = Food Prepared - Required Food.
            
            DECISION LOGIC:
            - IF (Difference < 0) THEN Status = "shortage".
            - IF (Difference > 0 AND Difference <= 10% of Required) THEN Status = "low".
            - IF (Difference > 10% AND Difference <= 30% of Required) THEN Status = "medium".
            - IF (Difference > 30% of Required) THEN Status = "high".
            
            OUTPUT:
            Return ONLY a JSON object:
            {
                "waste_level": "low" | "medium" | "high" | "shortage",
                "waste_kg": number (Absolute value of the Difference),
                "waste_percentage": number ((Difference / Food Prepared) * 100),
                "required_kg": number (The calculated required amount),
                "suggestion": "A distinct, actionable suggestion regarding the quantity. If Waste: 'Reduce batch by X kg'. If Shortage: 'Cook X kg more'.",
                "packing_tips": "One short sentence (max 15 words) regarding sustainable packing or storage strategies."
            }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Ensure we parse JSON correctly
        return JSON.parse(text);
    } catch (error) {
        console.error('Gemini Prediction Error:', error.message);
        return null;
    }
}

// Deprecated: Kept for reference but not used in new flow
async function generateSmartSuggestion(data) {
    return predictWaste(data).then(res => res ? res.suggestion : null);
}

module.exports = {
    predictWaste,
    generateSmartSuggestion
};
