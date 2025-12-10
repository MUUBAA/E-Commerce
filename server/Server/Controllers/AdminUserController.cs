using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto.Admin;
using Server.Services.Admin;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("admin/users")]
    [Authorize(Roles = "Admin")]
    public class AdminUserController : ControllerBase
    {
        private readonly IAdminUserService _userService;

        public AdminUserController(IAdminUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userService.GetAll());
        }

        [HttpPatch("{id}/block")]
        public IActionResult BlockUser(int id, [FromBody] UserBlockDto dto)
        {
            dto.UserId = id;
            _userService.BlockUser(dto, GetAdmin());
            return NoContent();
        }

        private string GetAdmin()
        {
            return User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "system";
        }
    }
}

