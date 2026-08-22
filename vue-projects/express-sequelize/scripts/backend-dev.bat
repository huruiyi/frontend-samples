@echo off
setlocal
cd /d "%~dp0..\backend"

echo [backend] starting development server ...
call npm run dev
endlocal
