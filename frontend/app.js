// Get form and result elements
const form = document.getElementById('predictionForm');
const resultsDiv = document.getElementById('results');
const wasteLevelSpan = document.getElementById('wasteLevel');
const wasteAmountP = document.getElementById('wasteAmount');
const suggestionP = document.getElementById('suggestion');

// Handle form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const attendance = parseInt(document.getElementById('attendance').value);
    const menuType = document.getElementById('menuType').value;
    const foodQuantity = parseFloat(document.getElementById('foodQuantity').value);
    
    // Prepare data to send to backend
    const data = {
        attendance: attendance,
        menu_type: menuType,
        food_quantity: foodQuantity
    };
    
    // Show loading state
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Predicting...';
    submitBtn.disabled = true;
    
    try {
        // TODO: Replace with your actual backend URL
        // const response = await fetch('http://localhost:5000/predict', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // });
        
        // const result = await response.json();
        
        // TEMPORARY: Mock prediction (remove when backend is ready)
        const result = mockPrediction(attendance, menuType, foodQuantity);
        
        // Display results
        displayResults(result);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to get prediction. Please check if backend is running.');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Display prediction results
function displayResults(result) {
    // Update waste level badge
    wasteLevelSpan.textContent = result.waste_level.toUpperCase();
    wasteLevelSpan.className = 'badge ' + result.waste_level;
    
    // Update waste amount
    wasteAmountP.textContent = `${result.waste_kg} kg (${result.waste_percentage}% of prepared food)`;
    
    // Update suggestion
    suggestionP.textContent = result.suggestion;
    
    // Show results card
    resultsDiv.style.display = 'block';
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// TEMPORARY: Mock prediction function (for testing without backend)
// TODO: Remove this when backend is ready
function mockPrediction(attendance, menuType, foodQuantity) {
    // Simple calculation
    let perPersonConsumption;
    switch(menuType) {
        case 'special':
            perPersonConsumption = 0.4;
            break;
        case 'nonveg':
            perPersonConsumption = 0.35;
            break;
        case 'veg':
        default:
            perPersonConsumption = 0.3;
    }
    
    const expectedConsumption = attendance * perPersonConsumption;
    const wasteKg = Math.max(0, foodQuantity - expectedConsumption);
    const wastePercentage = ((wasteKg / foodQuantity) * 100).toFixed(1);
    
    // Determine waste level
    let level = 'low';
    let suggestion = '';
    
    if (wastePercentage > 20) {
        level = 'high';
        suggestion = `⚠️ High waste predicted! Consider reducing preparation by ${wastePercentage}%. Prepare around ${expectedConsumption.toFixed(1)} kg instead.`;
    } else if (wastePercentage > 10) {
        level = 'medium';
        suggestion = '⚡ Moderate waste expected. Monitor portions during service and adjust if needed.';
    } else {
        level = 'low';
        suggestion = '✅ Excellent planning! Waste level is minimal. Continue with current preparation strategy.';
    }
    
    return {
        waste_level: level,
        waste_kg: wasteKg.toFixed(2),
        waste_percentage: wastePercentage,
        suggestion: suggestion
    };
}

// When backend is ready, the response format should be:
/*
{
    "waste_level": "low" | "medium" | "high",
    "waste_kg": "2.5",
    "waste_percentage": "5.2",
    "suggestion": "Your suggestion text here"
}
*/