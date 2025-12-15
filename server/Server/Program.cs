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
            // DEBUG: Allow any origin for troubleshooting
            policy
                .SetIsOriginAllowed(_ => true)
                .AllowAnyHeader()
                .AllowAnyMethod();
                // .AllowCredentials(); // Uncomment only if you use cookies/auth
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