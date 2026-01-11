const express = require('express');
const router = express.Router();
const predictionService = require('../services/predictionService');
const dataProcessor = require('../services/dataProcessor');

/**
 * POST /api/predict
 * Predicts food waste based on attendance, menu type, and food quantity
 * 
 * Request body:
 * {
 *   "attendance": 150,
 *   "menu_type": "veg",
 *   "food_quantity": 50
 * }
 * 
 * Response:
 * {
 *   "waste_level": "low",
 *   "waste_kg": "2.5",
 *   "waste_percentage": "5.2",
 *   "suggestion": "Your suggestion text here"
 * }
 */
router.post('/predict', async (req, res) => {
    try {
        // Get raw input from request
        const rawInput = req.body;

        // Process and validate input
        const processedInput = dataProcessor.processInput(rawInput);

        // Get prediction from service
        const prediction = await predictionService.predict(processedInput);

        // Send response
        res.json(prediction);

    } catch (error) {
        console.error('Error in /predict endpoint:', error);
        res.status(500).json({
            error: error.message || 'Failed to generate prediction'
        });
    }
});

module.exports = router;

