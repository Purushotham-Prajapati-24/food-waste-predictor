const axios = require('axios');
const { predictWaste } = require('./geminiService');

/**
 * Prediction Service
 * Purpose: Uses Gemini API as the primary engine for food waste prediction.
 * Fallback: Uses internal JS logic if API is unavailable.
 */

// Historical data (Optional reference, unused in logic)
const historicalData = [];

// Legacy functions removed to prevent confusion.
// Logic now resides entirely within the predict() function.

/**
 * Main prediction function
 * @param {Object} input - Processed input { attendance, menu_type, food_quantity }
 * @returns {Object} - Prediction result
 */
async function predict(input) {
    const { attendance, menu_type, food_quantity } = input;

    // 1. Try Gemini Prediction (Engine #1)
    try {
        const geminiPrediction = await predictWaste({
            attendance,
            menuType: menu_type,
            foodQuantity: food_quantity,
            consumption: input.consumption
        });

        if (geminiPrediction) {
            return {
                waste_level: geminiPrediction.waste_level,
                waste_kg: geminiPrediction.waste_kg,
                waste_percentage: geminiPrediction.waste_percentage,
                suggestion: geminiPrediction.suggestion,
                packing_tips: geminiPrediction.packing_tips,
                source: 'Gemini AI'
            };
        }
    } catch (error) {
        console.warn('Gemini API failed or returned invalid data, switching to fallback.');
        console.warn(error.message);
    }

    // 2. Fallback Logic (Engine #2)
    console.log('Using Fallback Logic...');
    const consumption = input.consumption || 0.5; // Default to 0.5 if missing

    // Recalculate based on custom consumption
    const requiredKg = (attendance * consumption).toFixed(2);
    const difference = food_quantity - requiredKg;

    let wasteLevelFallback = 'low';
    let wasteKgFallback = Math.abs(difference).toFixed(2);
    let suggestionFallback = '';

    if (difference < 0) {
        wasteLevelFallback = 'shortage';
        suggestionFallback = `⚠️ You are short by ${wasteKgFallback} kg! Cook more immediately. based on ${consumption}kg/person.`;
    } else {
        const wastePercentage = ((difference / requiredKg) * 100);
        if (wastePercentage > 30) wasteLevelFallback = 'high';
        else if (wastePercentage > 10) wasteLevelFallback = 'medium';
        else wasteLevelFallback = 'low';

        suggestionFallback = `Predicted ${wasteLevelFallback} waste level. You have ${wasteKgFallback}kg excess based on ${consumption}kg/person.`;
    }

    return {
        waste_level: wasteLevelFallback,
        waste_kg: wasteKgFallback,
        waste_percentage: ((Math.abs(difference) / food_quantity) * 100).toFixed(1),
        required_kg: requiredKg,
        suggestion: suggestionFallback,
        packing_tips: "Use airtight containers to extend shelf life.",
        source: 'Fallback Logic',
        using_fallback: true
    };
}

module.exports = {
    predict
};
