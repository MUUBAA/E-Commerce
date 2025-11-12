using Server.Utils;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllers();

    // CORS for client dev servers (Vite)
    const string CorsPolicyName = "AllowClient";
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(CorsPolicyName, policy =>
            policy.WithOrigins(
                    "http://localhost:5015",
                    "https://localhost:5015",
                    "http://127.0.0.1:5015",
                    "https://127.0.0.1:5015",
                    "http://localhost:5173",
                    "https://localhost:5173",
                    "http://127.0.0.1:5173",
                    "https://127.0.0.1:5173"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
        );
    });
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();

    AuthProvider.Confiqure(builder.Services, builder.Configuration);
    SwaggerProvider.Configure(builder.Services);
    ComponentRegistry.Registry(builder.Services, builder.Configuration).GetAwaiter().GetResult();

    var app = builder.Build();

    DataMigration.Configure(app.Services);

    app.UseDefaultFiles();
    app.UseStaticFiles();
 // Configure the HTTP request pipeline.
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseHttpsRedirection();
    app.UseCors(CorsPolicyName);

    app.UseAuthorization();

    app.MapControllers();

    app.MapFallbackToFile("/index.html");

    app.Run();
}
catch (Exception ex)
{
    // Log the exception or handle it as needed
    Console.WriteLine($"An error occurred: {ex.Message}");
    // Optionally, rethrow the exception if you want to terminate the application
    throw;

}