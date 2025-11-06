using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json.Converters;
using Server.Data.Filters;
using Server.Data.Repositories;
using Server.Services;
using Server.Services.AuthService;
using Server.Services.MessageServices;
using Server.Utils;

namespace Server.Utils
{
    public class ComponentRegistry
    {
        public static Task Registry(IServiceCollection services, IConfiguration configuration)
        {
           services.AddControllers().AddNewtonsoftJson(options =>
           {
               options.SerializerSettings.Converters.Add(new StringEnumConverter());
               options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
           });
            // Mysql Database connection
            services.AddDbContext<Repository>(options =>
            {
                string? ConnectionString = configuration.GetConnectionString("Repository");
                options.UseMySql(ConnectionString, new MySqlServerVersion(new Version(8, 0, 25)));
            });
            // added custom exception filter
            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(CustomException));
            });

            services.AddHttpContextAccessor();
            // Register HttpClient factory for external API calls
            services.AddHttpClient();

            // Registering Components
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<UserContext, UserContext>();
            services.AddScoped<IUserContext, UserContext>();
            services.AddScoped<IUserService , UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IEmailTemplate, EmailTemplate>();
            
            return Task.CompletedTask;
        }
    }
}
