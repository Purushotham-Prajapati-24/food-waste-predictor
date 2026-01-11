# Setup Guide for New Users 👋

Welcome! This guide will help you get the Food Waste Predictor running on your computer.

## What You Need

1. **Node.js**: [Download here](https://nodejs.org/)
2. **Python**: [Download here](https://www.python.org/)
3. **Git**: [Download here](https://git-scm.com/)

---

## Step-by-Step Setup

### Step 1: Clone the Code
```bash
git clone <repository-url>
cd food-waste-predictor
```

### Step 2: Install Node.js Dependencies (Backend)
```bash
cd backend
npm install
cd ..
```

### Step 3: Install Python Dependencies (ML Model)
```bash
cd ml-model
pip install flask pandas scikit-learn
cd ..
```

### Step 4: Run the Application
You need to open **2 separate terminal windows**:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
node server.js
```

### Step 5: Open in Browser
Go to **http://localhost:8000**

---

## Troubleshooting

- **"npm is not recognized"**: Install Node.js.
- **"pip is not recognized"**: Install Python and ensure "Add Python to PATH" is checked during installation.
- **"Port 5000/5001/8000 already in use"**: Close other terminal windows or apps using these ports.


