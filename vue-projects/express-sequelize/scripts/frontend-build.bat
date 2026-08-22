@echo off
setlocal
cd /d "%~dp0..\frontend"

echo [frontend] building ...
call npm run build
if errorlevel 1 exit /b 1
echo Done. Output: frontend\dist
endlocal
