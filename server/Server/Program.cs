using Server.Utils;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Fly.io + Render compatible port binding
    var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

    // CORS
    const string CorsPolicyName = "AllowClient";
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(CorsPolicyName, policy =>
        {
            policy
                .SetIsOriginAllowed(_ => true)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });

    // Swagger / OpenAPI
    builder.Services.AddEndpointsApiExplorer();

    AuthProvider.Configure(builder.Services, builder.Configuration);
    SwaggerProvider.Configure(builder.Services);

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
    Console.WriteLine($"Startup error: {ex}");
    throw;
}
