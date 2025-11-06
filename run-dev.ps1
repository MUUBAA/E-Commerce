# MarketNest Development Server Launcher
Write-Host "Starting MarketNest Development Servers..." -ForegroundColor Green

# Start Frontend (Vite)
Write-Host "`nStarting Frontend on http://localhost:5015..." -ForegroundColor Cyan
$frontendPath = "C:\workspace\personal\E-Commerce\Nest\client"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev"

# Wait a moment for frontend to initialize
Start-Sleep -Seconds 2

# Start Backend (.NET)
Write-Host "`nStarting Backend on https://localhost:5200..." -ForegroundColor Cyan
$backendPath = "C:\workspace\personal\E-Commerce\Nest\server\Server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; dotnet run"

Write-Host "`n===========================================================" -ForegroundColor Green
Write-Host "Development Servers Started!" -ForegroundColor Green
Write-Host "===========================================================" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5015" -ForegroundColor Yellow
Write-Host "Backend:  https://localhost:5200" -ForegroundColor Yellow
Write-Host "Swagger:  https://localhost:5200/swagger" -ForegroundColor Yellow
Write-Host "===========================================================" -ForegroundColor Green
Write-Host "`nPress any key to stop all servers..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Kill the processes when script exits
Get-Process | Where-Object {$_.MainWindowTitle -like "*npm run dev*" -or $_.MainWindowTitle -like "*dotnet run*"} | Stop-Process -Force
