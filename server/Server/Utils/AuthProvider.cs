using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using Server.Data.Entities.AuthToken;
using Server.Data.Exceptions;
using Server.Services.Cache;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Utils
{
    public class AuthProvider
    {
        public static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            var cacheService = new CacheService(new MemoryCache(new MemoryCacheOptions()));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration.GetValue<string>("JWTSecret"))),
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {
                        var principal = context.Principal;
                        var userId = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                        var JwtId = principal.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti)?.Value;
                        var expClaim = principal.Claims.FirstOrDefault(c => c.Type == "exp")?.Value;

                        if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(JwtId) || string.IsNullOrEmpty(expClaim))
                        {
                            throw new SecurityTokenException("Token does not contain required claims.");

                        }
                        // Parse the expiration time once
                        var tokenExpiry = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expClaim)).UtcDateTime;
                        // Fetch cached token
                        var cachedToken = cacheService.GetCache<AuthToken>(userId);

                        if (cachedToken == null)
                        {
                            // If token not found in cache, add it
                            cachedToken = new AuthToken
                            {
                                UserId = userId,
                                JwtUniqueId = JwtId,
                                TokenExpiry = tokenExpiry
                            };
                            cacheService.SetCache(userId, cachedToken, CacheSetting.CacheForThreeHourAndExtendByHalfAndHour);
                        }
                        else if (cachedToken.JwtUniqueId != JwtId)
                        {
                            // If token is invalid or expired
                            if (cachedToken.TokenExpiry < DateTime.UtcNow)
                            {
                                throw new InvalidAuthException("Invalid or expired token.");
                            }
                            else
                            {
                                // Update cache with new token details
                                cachedToken.JwtUniqueId = JwtId;
                                cachedToken.TokenExpiry = tokenExpiry;
                                cacheService.SetCache(userId, cachedToken, CacheSetting.CacheForThreeHourAndExtendByHalfAndHour);
                            }

                        }

                    },

                };
            });
            
        }
    }
}
