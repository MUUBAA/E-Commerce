FROM mcr.microsoft.com/dotnet/aspnet:9.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 5015

ENV ASPNETCORE_URLS=http://+:5015

FROM mcr.microsoft.com/dotnet/sdk:9.0-nanoserver-1809 AS build
ARG configuration=Release
WORKDIR /src
COPY ["server/Server/Server.csproj", "server/Server/"]
RUN dotnet restore "server\Server\Server.csproj"
COPY . .
WORKDIR "/src/server/Server"
RUN dotnet build "Server.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Server.dll"]
