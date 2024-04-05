@echo off
start cmd /k "python app.py"
cd front-end-
start cmd /k "npm run dev"
timeout /t 5
start http://127.0.0.1:5173/