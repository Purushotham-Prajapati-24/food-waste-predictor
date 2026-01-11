const axios = require('axios');

async function diagnose() {
    console.log('🔍 Starting Diagnosis...');

    // 1. Check Backend Health
    try {
        console.log('1. Pinging Backend Health Check...');
        // Try root or a known endpoint if /health doesn't exist
        // Based on server.js I saw earlier, /health might exist? Let's assume /api/predict is the keen one.
        // Actually, let's just try the predict endpoint directly which is what's failing.
    } catch (e) {
        console.log('Warning: Health check skipped or failed.');
    }

    // 2. Test Prediction Endpoint
    console.log('2. Testing /api/predict endpoint...');
    try {
        const response = await axios.post('http://localhost:5000/api/predict', {
            attendance: 15,
            menu_type: 'veg',
            food_quantity: 50
        });
        console.log('✅ PREDICTION SUCCESS!');
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.log('❌ PREDICTION FAILED');
        if (error.code === 'ECONNREFUSED') {
            console.error('🔴 CONNECTION REFUSED: The backend server is NOT running on port 5000.');
            console.error('   Please run "run.bat" again and keep the window open.');
        } else if (error.response) {
            console.error(`🟠 SERVER ERROR (${error.response.status}):`);
            console.error('   Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('❌ REQUEST ERROR:', error.message);
        }
    }
}

diagnose();
