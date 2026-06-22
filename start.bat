@echo off
title Sawariya Backend  --  KEEP THIS WINDOW OPEN
cd /d "%~dp0"
echo ============================================================
echo   Sawariya Solution - backend server
echo ------------------------------------------------------------
echo   Site  :  http://localhost:8000/
echo   Admin :  http://localhost:8000/admin/   (login: admin / admin)
echo            also works from http://localhost:3000/admin/
echo.
echo   KEEP THIS WINDOW OPEN while you use the site/admin.
echo   Close it (or press Ctrl+C) to stop the server.
echo ============================================================
echo.

where php >nul 2>nul
if %errorlevel%==0 (
  php artisan serve --host=127.0.0.1 --port=8000
) else (
  "C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\php.exe" artisan serve --host=127.0.0.1 --port=8000
)

echo.
echo Server stopped.
pause
