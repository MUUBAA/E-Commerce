using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Entities.Categories;
using Server.Data.Repositories;

namespace Server.Services.Admin.AdminCategoryService
{
    public interface IAdminCategoryService
    {
        int Add(AdminCategoryDto dto, string performedBy);
        void Update(AdminCategoryDto dto, string performedBy);
        void Delete(int id, string performedBy);
        List<Category> GetAll();
    }
    public class AdminCategoryService : IAdminCategoryService
    {
        private readonly Repository _db;
        private readonly ILogger<AdminCategoryService> _logger;

        public AdminCategoryService(Repository db, ILogger<AdminCategoryService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public int Add(AdminCategoryDto dto, string performedBy)
        {
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description,
                IsActive = dto.IsActive,
                CreatedBy = performedBy
            };
            _db.Categories.Add(category);
            _db.SaveChanges();
            return category.Id;
        }

        public void Update(AdminCategoryDto dto, string performedBy)
        {
            var existing = _db.Categories
                .FirstOrDefault(c => c.Id == dto.Id && !c.IsDeleted);

            if (existing == null)
                throw new KeyNotFoundException($"Category with ID {dto.Id} not found");

            existing.Name = dto.Name;
            existing.Description = dto.Description;
            existing.IsActive = dto.IsActive;
            existing.UpdatedAt = DateTime.UtcNow;
            existing.UpdatedBy = performedBy;

            _db.SaveChanges();
        }


        public void Delete(int id, string performedBy)
        {
            var existing = _db.Categories.FirstOrDefault(c => c.Id == id) ?? throw new Exception("Category not found");
            existing.IsDeleted = true;
            existing.IsActive = false;
            existing.DeletedAt = DateTime.UtcNow;
            existing.DeletedBy = performedBy;
            _db.SaveChanges();
        }

        public List<Category> GetAll()
        {
            // Primary source: categories table (non-deleted)
            var categories = _db.Categories
                .AsNoTracking()
                .Where(c => !c.IsDeleted)
                .OrderBy(c => c.Name)
                .ToList();

            // Fallback: derive categories from products if none exist
            if (categories.Count == 0)
            {
                categories = _db.Products
                    .AsNoTracking()
                    .Where(p => !p.IsDeleted && !string.IsNullOrEmpty(p.CategoryName))
                    .GroupBy(p => new
                    {
                        p.CategoryId,
                        p.CategoryName
                    })
                    .Select(g => new Category
                    {
                        Id = g.Key.CategoryId,
                        Name = g.Key.CategoryName ?? ("Category-" + g.Key.CategoryId),
                        Description = null,
                        IsActive = true
                    })
                    .OrderBy(c => c.Name)
                    .ToList();
            }

            return categories;
        }
    }

}
