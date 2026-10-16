FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["StockControl.Api.csproj", "./"]
RUN dotnet restore "StockControl.Api.csproj"
COPY . .
RUN dotnet publish "StockControl.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM build AS test
RUN dotnet restore "tests/StockControl.Api.Tests/StockControl.Api.Tests.csproj"
RUN dotnet tool install dotnet-reportgenerator-globaltool --tool-path /tools --version 5.5.11
ENTRYPOINT ["dotnet", "test", "tests/StockControl.Api.Tests/StockControl.Api.Tests.csproj", "--no-restore", "--logger", "trx;LogFileName=tests.trx", "--results-directory", "/out", "/p:CoverletOutput=/out/"]

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "StockControl.Api.dll"]
