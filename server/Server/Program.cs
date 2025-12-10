using Server.Utils;


try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();

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
        options.AddDefaultPolicy(policy =>
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
    ComponentRegistry.Registry(builder.Services, builder.Configuration).GetAwaiter().GetResult();

    var app = builder.Build();

    DataMigration.Configure(app.Services);

    app.UseDefaultFiles();
    app.UseStaticFiles();

    // Configure the HTTP request pipeline.
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseHttpsRedirection();

    app.UseCors();

    app.UseAuthentication();
    app.UseAuthorization();
    app.UseMiddleware<Server.Middlewares.AdminAuthorizationMiddleware>();

    app.MapControllers();

    app.UseStaticFiles();


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
