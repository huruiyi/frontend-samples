@echo off
setlocal
cd /d "%~dp0.."

echo [docker] starting MySQL + Redis ...
docker compose up -d
if errorlevel 1 (
  echo [ERROR] docker compose failed. Make sure Docker Desktop is running.
  exit /b 1
)

echo.
docker compose ps
echo.
echo MySQL : 127.0.0.1:3306  db=express_demo  user=root  password=fairy-vip
echo Redis : 127.0.0.1:6379
endlocal
