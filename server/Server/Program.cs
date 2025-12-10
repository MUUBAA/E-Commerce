using Server.Utils;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // IMPORTANT: Bind to PORT env var for Render
    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");


    // CORS
    const string CorsPolicyName = "AllowClient";
    var allowedOrigins = new[]
    {
        "http://localhost:5015",
        "https://localhost:5015",
        "http://localhost:5173",
        "https://localhost:5173",
        "http://localhost:3000",
        "https://localhost:3000"
    };
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(CorsPolicyName, policy =>
        {
            policy
                .WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod();
                // If you add cookie-based auth later, also call: .AllowCredentials();
        });
    });

    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("AdminOnly", policy =>
            policy.RequireRole("Admin"));
    });

    // Swagger / OpenAPI
    builder.Services.AddEndpointsApiExplorer();

    AuthProvider.Confiqure(builder.Services, builder.Configuration);
    SwaggerProvider.Configure(builder.Services);

    // Registers controllers, DbContext, services, etc.
    await ComponentRegistry.Registry(builder.Services, builder.Configuration);

    var app = builder.Build();

    DataMigration.Configure(app.Services);

    app.UseSwagger();
    app.UseSwaggerUI();


    app.UseCors(CorsPolicyName);

    app.UseAuthentication();
    app.UseAuthorization();
    app.UseMiddleware<Server.Middlewares.AdminAuthorizationMiddleware>();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred: {ex.Message}");
    throw;
}
