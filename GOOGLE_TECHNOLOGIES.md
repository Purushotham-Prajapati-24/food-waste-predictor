# Google Technologies Used in Food Waste Predictor

## Overview

Currently, the application runs independently without requiring any Google services.
However, it is architected to easily support **Google Sheets** for data persistence.

---

## 🔄 **Google Sheets API** (Infrastructure Ready)

### Status
🔄 **Optional Enhancement**

The codebase includes prepared services (`backend/services/sheetsService.js`) to log prediction data to a Google Sheet.

### Use Case
- Save every prediction to a spreadsheet.
- Analyze long-term trends using Google Sheets charts.

### How to Enable
1. Set up a Google Service Account.
2. Add the JSON key to `backend/config/`.
3. Set `GOOGLE_SHEETS_ID` environment variable.
4. Uncomment the usage in `backend/routes/foodRoutes.js` (if implemented).

---

## 🚀 **Future Enhancements**

- **Google Vertex AI**: Train a more powerful ML model on Google Cloud.
- **Google Cloud Run**: Deploy the containerized app.

