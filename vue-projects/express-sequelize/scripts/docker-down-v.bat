@echo off
setlocal
cd /d "%~dp0.."

echo [docker] stopping containers and removing volumes ...
docker compose down -v
if errorlevel 1 exit /b 1
echo Done. MySQL/Redis data cleared.
endlocal
