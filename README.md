# Food Waste Predictor 🍽️

A web application that predicts food waste in canteens and hostels based on expected attendance, menu type, and food quantity.

## 🏗️ Architecture

The application consists of three main components:

1.  **Frontend**: Static web pages (HTML/CSS/JS) served by a simple Node.js server.
2.  **Backend**: Node.js/Express API that acts as the gateway and logic layer.
3.  **ML Model**: Python Flask application containing the Random Forest prediction logic.

**Flow:** `Frontend` -> `Backend (Port 5000)` -> `ML Model (Port 5001)`

## ⚡ Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)

### 1. Install Dependencies

**Backend & Frontend:**
```bash
cd backend
npm install
cd ../frontend
npm install # (If package.json exists, otherwise simple node server typically uses standard modules or global)
# If frontend/server.js only uses standard 'http' module, no install might be needed, but check if it uses express.
# Assuming standard setup:
cd ..
```

**ML Model:**
```bash
cd ml-model
pip install flask pandas scikit-learn
cd ..
```

### 2. Start Servers

You need to run **three** terminals:

**Terminal 1: ML Model**
```bash
cd ml-model
python app.py
# Runs on Port 5001
```

**Terminal 2: Backend**
```bash
cd backend
npm start
# Runs on Port 5000
```

**Terminal 3: Frontend**
```bash
cd frontend
node server.js
# Runs on Port 8000
```

### 3. Usage
Open **http://localhost:8000** in your browser.

---

## 📁 Project Structure

```
food-waste-predictor/
├── frontend/           # UI Layer
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── server.js       # Simple static file server
├── backend/            # API Gateway & Business Logic
│   ├── server.js       # Express App
│   ├── routes/         # API Routes
│   └── services/       # Services (calls ML model)
├── ml-model/           # Machine Learning Layer
│   ├── app.py          # Flask API (Port 5001)
│   ├── waste_prediction.py # Prediction Logic
│   └── sample_data.csv
└── README.md
```

## 🔌 API Endpoints (Backend)

**POST** `/api/predict`
```json
{
  "attendance": 150,
  "menu_type": "veg",
  "food_quantity": 50
}
```

## 📄 License
ISC

