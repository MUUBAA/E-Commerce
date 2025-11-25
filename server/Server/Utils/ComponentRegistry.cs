using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json.Converters;
using Server.Data.Filters;
using Server.Data.Repositories;
using Server.Services;
using Server.Services.AuthService;
using Server.Services.MessageServices;
using Server.Services.ProductService;
using Server.Services.Cache;
using Server.Utils;
using Server.Services.CartServices;
using Server.Services.PaymentService;

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
                // Prefer environment variable (for Render / production)
                var connectionString = Environment.GetEnvironmentVariable("MYSQL_URL")
                                     ?? configuration.GetConnectionString("Repository");

                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException(
                        "No MySQL connection string found. Set MYSQL_URL env var or ConnectionStrings:Repository in appsettings.json.");
                }

                options.UseMySql(
                    connectionString,
                    ServerVersion.AutoDetect(connectionString) // lets EF figure out the MySQL version
                );
            });


            services.AddHttpContextAccessor();
            // Register HttpClient factory for external API calls
            services.AddHttpClient();

            // Register Memory Cache
            services.AddMemoryCache();

            // Registering Components
            services.AddScoped<ICacheService, CacheService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<UserContext, UserContext>();
            services.AddScoped<IUserContext, UserContext>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IEmailTemplate, EmailTemplate>();
            services.AddScoped<IProductsRepository, ProductsRepository>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<ICartServices, CartServices>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IPaymentService, PaymentService>();

            return Task.CompletedTask;
        }
    }
}
