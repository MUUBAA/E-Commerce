using System.Security.Claims;

namespace Server.Middlewares
{
    public class AdminAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AdminAuthorizationMiddleware> _logger;

        public AdminAuthorizationMiddleware(RequestDelegate next, ILogger<AdminAuthorizationMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path;

            // Skip admin auth endpoints to allow login/validate without existing token
            var isAdminAuthPath = path.StartsWithSegments("/admin/auth", StringComparison.OrdinalIgnoreCase);

            if (path.StartsWithSegments("/admin", StringComparison.OrdinalIgnoreCase) && !isAdminAuthPath)
            {
                var role = context.User.FindFirstValue(ClaimTypes.Role);
                if (!string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsJsonAsync(new { message = "Admin access required" });
                    return;
                }
            }

            await _next(context);
        }
    }
}

