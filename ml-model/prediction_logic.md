## Food Waste Prediction Logic

The system predicts food waste levels using historical hostel and canteen data.

### Inputs
- Expected attendance
- Menu type (Vegetarian, Non-Vegetarian, Special)

### Approach
1. Historical data is stored in a CSV file.
2. For a given menu type, past records are filtered.
3. The attendance value closest to the current day’s attendance is selected.
4. The corresponding waste level (Low, Medium, High) is returned.

### Why this works
- Food consumption patterns remain consistent for similar menus.
- Attendance strongly influences waste generation.
- Using nearest historical values gives reliable estimates without complex models.

### Benefits
- Easy to understand
- Fast predictions
- Suitable for real-time use in canteens
- No heavy computation or training required

This approach ensures accuracy while maintaining transparency and simplicity.
