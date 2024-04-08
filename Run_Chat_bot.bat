@echo off
REM Start Flask app
start cmd /c "call venv\Scripts\activate && python app.py"
timeout /t 5

REM Open the browser to the Flask application's URL
start http://localhost:5000

:end
