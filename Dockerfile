# Runtime image (Linux, .NET 8)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# NOTE: we don't set ASPNETCORE_URLS here.
# Your Program.cs reads the PORT env var from Render and binds to it.

# Build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["server/Server/Server.csproj", "server/Server/"]
RUN dotnet restore "server/Server/Server.csproj"

# Copy everything and build
COPY . .
WORKDIR "/src/server/Server"
RUN dotnet publish "Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Server.dll"]
