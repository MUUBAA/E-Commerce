# Runtime image (Linux, .NET 8)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Fly.io requires explicit port binding
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

# Copy csproj and restore
COPY ["server/Server/Server.csproj", "server/Server/"]
RUN dotnet restore "server/Server/Server.csproj"

# Copy everything and publish
COPY . .
WORKDIR "/src/server/Server"
RUN dotnet publish "Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Server.dll"]
