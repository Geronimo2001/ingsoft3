using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StockControl.Api.Data;
using StockControl.Api.Services;
using System.Text.Json.Serialization;

LoadDotEnv();

if (args.Contains("--seed-only"))
{
    Console.WriteLine("Ejecutando seed sin iniciar API...");
    var configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: true)
        .AddEnvironmentVariables()
        .Build();
    var connectionString = GetRequiredConnectionString(configuration);
    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseNpgsql(connectionString)
        .Options;

    using var db = new AppDbContext(options);
    db.Database.EnsureCreated();
    SeedData.EnsureSeeded(db);
    Console.WriteLine("Base de datos lista.");
    return;
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(GetRequiredConnectionString(builder.Configuration)));
builder.Services.AddScoped<StockService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("Frontend");
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    SeedData.EnsureSeeded(db);
}

app.Run();

static string GetRequiredConnectionString(IConfiguration configuration)
{
    return configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException(
            "Falta configurar ConnectionStrings__DefaultConnection en backend/.env o en las variables de entorno.");
}

static void LoadDotEnv()
{
    var envPath = FindFileInCurrentOrParent("backend/.env") ?? FindFileInCurrentOrParent(".env");
    if (envPath is null)
    {
        return;
    }

    foreach (var rawLine in File.ReadAllLines(envPath))
    {
        var line = rawLine.Trim();
        if (line.Length == 0 || line.StartsWith('#'))
        {
            continue;
        }

        var separatorIndex = line.IndexOf('=');
        if (separatorIndex <= 0)
        {
            continue;
        }

        var key = line[..separatorIndex].Trim();
        var value = line[(separatorIndex + 1)..].Trim().Trim('"');
        if (Environment.GetEnvironmentVariable(key) is null)
        {
            Environment.SetEnvironmentVariable(key, value);
        }
    }
}

static string? FindFileInCurrentOrParent(string relativePath)
{
    var directory = new DirectoryInfo(Directory.GetCurrentDirectory());
    while (directory is not null)
    {
        var candidate = Path.Combine(directory.FullName, relativePath);
        if (File.Exists(candidate))
        {
            return candidate;
        }

        directory = directory.Parent;
    }

    return null;
}
using NoExiste;// TODO: endpoint de salud
using NoExiste;
