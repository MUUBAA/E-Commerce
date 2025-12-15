using Server.Utils;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // IMPORTANT: Bind to PORT env var for Render
    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");


    // CORS
    const string CorsPolicyName = "AllowClient";
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(CorsPolicyName, policy =>
        {
            // Allow known local dev origins (adjust as needed)
            policy
                .WithOrigins(
                    "https://localhost:5015",
                    "http://localhost:5015",
                    "https://localhost:5200",
                    "http://localhost:5200",
                    "https://nestonlinestore.vercel.app/",
                    ""
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); // allow cookies/auth if used by client
        });
    });

    // Swagger / OpenAPI
    builder.Services.AddEndpointsApiExplorer();

    AuthProvider.Configure(builder.Services, builder.Configuration);
    SwaggerProvider.Configure(builder.Services);

    // Registers controllers, DbContext, services, etc.
    await ComponentRegistry.Registry(builder.Services, builder.Configuration);

    var app = builder.Build();

    DataMigration.Configure(app.Services);

    app.UseSwagger();
    app.UseSwaggerUI();


    app.UseCors(CorsPolicyName);

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred: {ex.Message}");
    throw;
}