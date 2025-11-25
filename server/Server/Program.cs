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
            // Local dev origins (your current list)
            var origins = new List<string>
            {
                "http://localhost:5015",
                "https://localhost:5015",
                "http://127.0.0.1:5015",
                "https://127.0.0.1:5015",
                "http://localhost:5173",
                "https://localhost:5173",
                "http://127.0.0.1:5173",
                "https://127.0.0.1:5173",
                "https://nestonlinestore.vercel.app"
            };

            // Add production frontend origin from env var (Vercel)
            var prodOrigin = Environment.GetEnvironmentVariable("ALLOWED_ORIGIN");
            if (!string.IsNullOrEmpty(prodOrigin))
            {
                origins.Add(prodOrigin);
            }

            // Allow only the exact Vercel production domain and local dev
            origins.Add("https://nestonlinestore.vercel.app");

            policy.SetIsOriginAllowed(origin =>
                origins.Contains(origin)
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
            // .AllowCredentials(); // Uncomment only if you use cookies/auth
        });
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

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred: {ex.Message}");
    throw;
}
