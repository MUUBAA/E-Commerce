using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Contract;
using Server.Data.Entities.Categories;
using Server.Data.Repositories;

namespace Server.Services.Admin.AdminCategoryService
{
    public interface IAdminCategoryService
    {
        int Add(AdminCategoryDto dto, string performedBy);
        void Update(AdminCategoryDto dto, string performedBy);
        void Delete(int id, string performedBy);
        PagedResult<Category> GetAll(PaginationContract pagination);
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

        public PagedResult<Category> GetAll(PaginationContract pagination)
        {
            var page = pagination != null && pagination.Page > 0 ? pagination.Page : 1;
            var pageSize = pagination != null && pagination.PageSize > 0 ? pagination.PageSize : 20;
            var search = pagination?.Search?.Trim();

            // Primary source: categories table (non-deleted)
            var query = _db.Categories
                .AsNoTracking()
                .Where(c => !c.IsDeleted)
                ;

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(c => c.Name != null && c.Name.Contains(search));
            }

            query = query.OrderBy(c => c.Name);

            var total = query.Count();

            var categories = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Fallback: derive categories from products if none exist
            if (categories.Count == 0)
            {
                var fallbackQuery = _db.Products
                    .AsNoTracking()
                    .Where(p => !p.IsDeleted && !string.IsNullOrEmpty(p.CategoryName));

                if (!string.IsNullOrEmpty(search))
                {
                    fallbackQuery = fallbackQuery.Where(p => p.CategoryName != null && p.CategoryName.Contains(search));
                }

                var fallbackGrouped = fallbackQuery
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
                    .OrderBy(c => c.Name);

                total = fallbackGrouped.Count();

                categories = fallbackGrouped
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

            return new PagedResult<Category>
            {
                Items = categories,
                Total = total
            };
        }
    }

}
