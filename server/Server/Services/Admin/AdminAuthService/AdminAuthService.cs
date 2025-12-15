using Microsoft.AspNetCore.Identity;
using Server.Data.Dto;
using Server.Data.Dto.Admin;
using Server.Data.Entities.Users;
using Server.Data.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services.Admin.AdminAuthService
{
    public interface IAdminAuthService
    {
        AdminLoginResponseDto Login(AdminLoginRequestDto request);
        ClaimsPrincipal? ValidateToken(string token);
    }
    public class AdminAuthService : IAdminAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AdminAuthService> _logger;
        public AdminAuthService(IConfiguration configuration, IUserRepository userRepository, ILogger<AdminAuthService> logger)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _logger = logger;
        }

        public AdminLoginResponseDto Login(AdminLoginRequestDto request)
        {
            var user = _userRepository.GetUserByEmail(request.Email) ?? throw new Exception("User not found");
            if (!string.Equals(user.Role, "Admin", StringComparison.OrdinalIgnoreCase))
            {
                throw new UnauthorizedAccessException("Admin access required");
            }

            if (user.IsBlocked)
            {
                throw new UnauthorizedAccessException("Account is blocked");
            }

            var passwordHasher = new PasswordHasher<User>();
            var passwordVerificationResult = passwordHasher.VerifyHashedPassword(null, user.PasswordHash, request.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            var token = BuildToken(user);
            return new AdminLoginResponseDto
            {
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(6),
                Role = user.Role
            };
        }

        private string BuildToken(UserDto user)
        {
            var secret = _configuration.GetValue<string>("JWTSecret") ?? throw new InvalidOperationException("Missing JWT secret");
            var key = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
            var creds = new Microsoft.IdentityModel.Tokens.SigningCredentials(key, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role ?? "Admin"),
                new Claim("isAdmin", "true"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var jwt = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public ClaimsPrincipal? ValidateToken(string token)
        {
            try
            {
                var secret = _configuration.GetValue<string>("JWTSecret") ?? string.Empty;
                var validationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
                var handler = new JwtSecurityTokenHandler();
                var principal = handler.ValidateToken(token, validationParameters, out _);
                return principal;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Token validation failed");
                return null;
            }
        }
    }
}

