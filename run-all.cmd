@echo off
setlocal

set ROOT=%~dp0

start "frontend" powershell -NoExit -Command "cd '%ROOT%client'; npm run dev"
start "backend" powershell -NoExit -Command "cd '%ROOT%server\Server'; dotnet run"

echo Started frontend (npm run dev) and backend (dotnet run) in separate terminals.
