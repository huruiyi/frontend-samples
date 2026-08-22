@echo off
setlocal
cd /d "%~dp0.."

echo ========== 1/3 Docker: MySQL + Redis ==========
call "%~dp0docker-up.bat"
if errorlevel 1 exit /b 1

echo.
echo ========== 2/3 Backend install + wait MySQL ==========
call "%~dp0backend-install.bat"
if errorlevel 1 exit /b 1

echo Waiting for MySQL to be ready ...
timeout /t 15 /nobreak >nul

echo.
echo ========== 3/3 Frontend install ==========
call "%~dp0frontend-install.bat"
if errorlevel 1 exit /b 1

echo.
echo ========== Ready ==========
echo Next steps (open 2 terminals):
echo   scripts\backend-dev.bat
echo   scripts\frontend-dev.bat
echo.
echo Backend : http://localhost:13000
echo Frontend: http://localhost:5173
endlocal
