@echo off
setlocal
cd /d "%~dp0.."

echo [docker] stopping containers ...
docker compose down
if errorlevel 1 exit /b 1
echo Done.
endlocal
