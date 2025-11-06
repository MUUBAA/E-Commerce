$ErrorActionPreference = "Stop"

# Launch frontend in new PowerShell window
Start-Process -FilePath powershell -ArgumentList "-NoExit", "-Command", "cd $PSScriptRoot\..\client; npm run dev" | Out-Null

# Launch backend in new PowerShell window
Start-Process -FilePath powershell -ArgumentList "-NoExit", "-Command", "cd $PSScriptRoot\..\server\Server; dotnet run" | Out-Null

Write-Host "Started frontend (npm run dev) and backend (dotnet run) in separate terminals."


