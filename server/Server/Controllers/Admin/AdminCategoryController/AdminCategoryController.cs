using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto.Admin;
using Server.Services.Admin;
using Server.Services.Admin.AdminCategoryService;
using System.Security.Claims;

namespace Server.Controllers.Admin.AdminCategoryController
{
    [ApiController]
    [Route("admin/categories")]
    [Authorize(Roles = "Admin")]
    public class AdminCategoryController : ControllerBase
    {
        private readonly IAdminCategoryService _categoryService;

        public AdminCategoryController(IAdminCategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_categoryService.GetAll());
        }

        [HttpPost]
        public IActionResult Create([FromBody] AdminCategoryDto dto)
        {
            var id = _categoryService.Add(dto, GetAdmin());
            return CreatedAtAction(nameof(GetAll), new { id }, new { id });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, AdminCategoryDto dto)
        {
            if (id != dto.Id)
                return BadRequest("Route ID and DTO ID do not match");

            _categoryService.Update(dto, User.Identity!.Name!);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryService.Delete(id, GetAdmin());
            return NoContent();
        }

        private string GetAdmin()
        {
            return User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "system";
        }
    }
}

