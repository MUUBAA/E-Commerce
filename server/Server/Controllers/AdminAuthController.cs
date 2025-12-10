using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto.Admin;
using Server.Services.Admin;

namespace Server.Controllers
{
    [ApiController]
    [Route("admin/auth")]
    public class AdminAuthController : ControllerBase
    {
        private readonly IAdminAuthService _authService;

        public AdminAuthController(IAdminAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] AdminLoginRequestDto request)
        {
            var response = _authService.Login(request);
            return Ok(response);
        }

        [HttpGet("validate")]
        [Authorize(Roles = "Admin")]
        public IActionResult Validate()
        {
            return Ok(new { valid = true });
        }
    }
}

