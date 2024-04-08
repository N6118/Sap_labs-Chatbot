@echo off
REM Install Python dependencies globally
pip install -r requirements.txt

REM Run npm installs in parallel for gpt-crawler and front-end-
start cmd /c "cd gpt-crawler && npm i"
start cmd /c "cd front-end- && npm i && npm run build"

REM Wait for npm installs and build to finish
echo Waiting for npm installs and build to complete...
timeout /t 30

REM Start Flask app and open the browser to the Flask application's URL
start cmd /c "python app.py"
timeout /t 5
start http://localhost:5000