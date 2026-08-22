@echo off
setlocal
cd /d "%~dp0..\frontend"

echo [frontend] starting Vite dev server ...
call npm run dev
endlocal
