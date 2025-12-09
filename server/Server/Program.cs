using Server.Utils;


try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();

    // Add CORS
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins(
                "https://localhost:5200",
                "http://localhost:5200",
                "https://localhost:5173",
                "http://localhost:5173",
                "https://localhost:5015",
                "http://localhost:5015"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
    });

    AuthProvider.Configure(builder.Services, builder.Configuration);
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

    app.UseAuthorization();

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
