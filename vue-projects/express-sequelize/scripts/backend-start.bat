@echo off
setlocal
cd /d "%~dp0..\backend"

echo [backend] starting production server ...
call npm start
endlocal
