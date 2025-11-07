using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using JWT.Algorithms;
using JWT.Builder;
using Server.Data.Contract.Users;
using Server.Data.Dto;
using Server.Data.Entities.Users;
using Server.Services.MessageServices;
using Server.Utils;
using System.Security.Cryptography;

namespace Server.Services.AuthService
{
    public interface IAuthService
    {
        string Login(string email, string password);
        bool Register(RegisterUserDto userDto);
        bool ForgotPassword(ForgotPasswordRequestDto request);
        bool ResetPassword(ResetPasswordRequestDto resetDto);
    }
    public class AuthService(IConfiguration configuration, IUserService userService, IEmailService emailService, IEmailTemplate emailTemplate) : IAuthService
    {
        private readonly string _JwtSecret = configuration.GetValue("JWTSecret", string.Empty);
        private readonly string _appUrl = configuration.GetValue<string>("AppUrl") ?? string.Empty;
        private readonly IUserService _userService = userService;
        private readonly IEmailService _emailService = emailService;
        private readonly IEmailTemplate _emailTemplate = emailTemplate;

        public string Login(string email, string password)
        {
            var user = _userService.GetUserByEmail(email) ?? throw new Exception("User not found");
            var passwordHasher = new PasswordHasher<User>();
            var passwordVerificationResult = passwordHasher.VerifyHashedPassword(null, user.PasswordHash, password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid password");
            }
            var generatedToken = GenerateToken(new JWTUserParam
            {
                Email = user.Email,
                Name = user.Name,
                CreatedAt = user.CreatedAt
            }, 2);
            return generatedToken;

        }

        public bool Register(RegisterUserDto userDto)
        {
            var contract = new UserContract
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password  // Pass plain password, let createUser hash it
            };
            return _userService.createUser(contract);
        }
        private string GenerateToken(JWTUserParam userParam, int expireInDays)
        {
           if(string.IsNullOrEmpty(_JwtSecret))
            {
                throw new Exception("JWT Secret is not configured");
            }
            var token = JwtBuilder.Create()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(_JwtSecret)
                .AddClaim("exp", DateTimeOffset.UtcNow.AddDays(expireInDays).ToUnixTimeSeconds())
                .AddClaim("UserData", userParam) 
                .AddClaim("issuedAt",new DateTimeOffset(userParam.CreatedAt).ToUnixTimeSeconds())
                .AddClaim(JwtRegisteredClaimNames.Jti, userParam.Name)
                .AddClaim(ClaimTypes.NameIdentifier, userParam.Email.ToString())
                .Encode();
            return token;
        }
        public bool ForgotPassword(ForgotPasswordRequestDto request)
        {
            if(string.IsNullOrEmpty(request.Email))
            {
                throw new Exception("Email is required");
            }
            var user = _userService.GetUserByEmail(request.Email);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var token = Guid.NewGuid().ToString();
            _userService.SavePasswordResetToken(user.Id, token, DateTime.UtcNow.AddHours(1));

            return SendForgotPasswordEmail(user, token);
        }
        private bool SendForgotPasswordEmail(UserDto user, string token)
        {
            var resetLink = $"{_appUrl}/reset-password?token={token}";
            var (subject, body) = _emailTemplate.SendForgotPasswordEmail(user, resetLink);
             _emailService.SendEmail(user.Email!, subject, body);
            return true;
        }
        public bool ResetPassword(ResetPasswordRequestDto resetDto)
        {
            var user = _userService.GetUserByPasswordResetToken(resetDto.Token);
            if (user == null || user.PasswordResetTokenExpiry == null || user.PasswordResetTokenExpiry < DateTime.UtcNow)
            {
                throw new Exception("Invalid or expired token");
            }

            var passwordHasher = new PasswordHasher<User>();
            var newHashedPassword = passwordHasher.HashPassword(null, resetDto.NewPassword);
            var passwordUpdated = _userService.UpdateUserPasswordById(user.Id, newHashedPassword);
            if(!passwordUpdated)
            {
                throw new Exception("Failed to update password");
            }
            _userService.ClearPasswordResetToken(user.Id);
            return true;
        }

    }
}
