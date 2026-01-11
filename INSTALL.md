# Installation Guide 📦

## For First-Time Users

### 1. Prerequisites

7. Make sure you have:
8. - **Node.js** v14 or higher ([Download](https://nodejs.org/))
9. - **Git** (to clone the repository)

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd food-waste-predictor
```

### 3. Install Dependencies

You need to install dependencies for **Backend** and **Frontend**.

#### Node.js Dependencies
```bash
cd backend
npm install
cd ../frontend
npm install # (Optional, depending on frontend setup)
cd ..
```

### 4. Verify Installation

Check that Node.js modules are installed:
```bash
ls backend/node_modules
```

Check Python dependencies:
```bash
pip freeze | grep -E "Flask|pandas|scikit-learn"
```

### 5. Run the Application

See [START.md](START.md) for detailed running instructions.

## What Gets Installed?

- **Node.js**:
    - **express**: Web framework for the backend API
    - **cors**: Enables cross-origin requests
    - **axios**: For calling the Python ML service
- **Python**:
    - **flask**: Runs the ML model as an API
    - **pandas**: Data manipulation
    - **scikit-learn**: Machine learning library


