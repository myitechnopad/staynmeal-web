@echo off
echo ================================
echo  StaynMeal Project Setup Script
echo ================================

:: Step 1: Check if nvm is installed
where nvm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] NVM not found. Please install NVM for Windows from:
    echo https://github.com/coreybutler/nvm-windows/releases
    pause
    exit /b
)

:: Step 2: Install and use Node 22.2.0
echo.
echo [INFO] Installing and using Node.js 22.2.0 via NVM...
nvm install 22.2.0
nvm use 22.2.0

:: Step 3: Clean old node_modules and reinstall
echo.
echo [INFO] Installing project dependencies...
if exist node_modules (
    echo [INFO] Removing existing node_modules...
    rmdir /s /q node_modules
)

if exist package-lock.json (
    del package-lock.json
)

npm install

:: Step 4: Start development server
echo.
echo [INFO] Starting the development server...
npm run dev
