@echo off
setlocal
cd /d "%~dp0..\backend"

echo [backend] npm install ...
call npm install
if errorlevel 1 exit /b 1
echo Done.
endlocal
