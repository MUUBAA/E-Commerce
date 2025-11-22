using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto;
using Server.Services.AuthService;

namespace Server.Controllers.AuthController
{
    [ApiController]
    public class AuthController(IAuthService authService) : BaseController
    {
        private readonly IAuthService _authService = authService;

        [HttpPost]
        [Route("/auth/login")]
        public IActionResult Login([FromQuery] string email, [FromQuery] string password)
        {
            var response = _authService.Login(email, password);
            return Ok(response);
        }

        [HttpPost]
        [Route("/auth/register")]
        public IActionResult Register([FromBody] RegisterUserDto userDto)
        {
          var response =   _authService.Register(userDto);
            return Ok(response);
        }

        [HttpPost]
        [Route("/auth/forgot-password")]
        public IActionResult ForgotPassword([FromBody] ForgotPasswordRequestDto request)
        {
            _authService.ForgotPassword(request);
            return Ok();
        }

        [HttpPost]
        [Route("/auth/reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequestDto request)
        {
            _authService.ResetPassword(request);
            return Ok();
        }
      }
    }
