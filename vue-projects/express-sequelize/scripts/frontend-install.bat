@echo off
setlocal
cd /d "%~dp0..\frontend"

echo [frontend] npm install ...
call npm install
if errorlevel 1 exit /b 1
echo Done.
endlocal
