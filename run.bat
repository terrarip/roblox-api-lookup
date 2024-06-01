@echo off
setlocal
set /p userId=Enter Roblox UserID: 
echo Searching Userid '%userId%'...
node search.js %userId%
echo Press enter to exit...
pause >nul
