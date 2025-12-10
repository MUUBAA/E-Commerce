using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto.Admin;
using Server.Services.Admin;
using System.Security.Claims;

namespace Server.Controllers
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
        public IActionResult Update(int id, [FromBody] AdminCategoryDto dto)
        {
            dto.Id = id;
            _categoryService.Update(dto, GetAdmin());
            return NoContent();
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

