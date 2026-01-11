@echo off
echo Starting Food Waste Predictor (Gemini-Powered)...
echo.

echo Step 1: Starting Backend Server...
cd backend
start "Backend Server (Port 5000)" cmd /k "npm start"
timeout /t 3 /nobreak >nul
echo.

echo Step 2: Starting Frontend Server...
cd ..\frontend
start "Frontend Server (Port 8000)" cmd /k "node server.js"
timeout /t 2 /nobreak >nul
echo.

echo ========================================
echo All services are starting!
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:8000
echo.
echo Open http://localhost:8000 in your browser
echo ========================================
pause

