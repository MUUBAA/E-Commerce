using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Contract;
using Server.Data.Entities.Users;
using Server.Data.Repositories;

namespace Server.Services.Admin.AdminUserService
{
    public interface IAdminUserService
    {
        PagedResult<User> GetAll(PaginationContract pagination);
        void BlockUser(UserBlockDto dto, string performedBy);
    }
    public class AdminUserService : IAdminUserService
    {
        private readonly Repository _db;
        private readonly ILogger<AdminUserService> _logger;

        public AdminUserService(Repository db, ILogger<AdminUserService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public PagedResult<User> GetAll(PaginationContract pagination)
        {
            var page = pagination != null && pagination.Page > 0 ? pagination.Page : 1;
            var pageSize = pagination != null && pagination.PageSize > 0 ? pagination.PageSize : 20;
            var search = pagination?.Search?.Trim();

            var query = _db.Users
                .AsNoTracking()
                .Where(u => !u.IsDeleted);

            if (!string.IsNullOrEmpty(search))
            {
                if (int.TryParse(search, out var idSearch) && idSearch > 0)
                {
                    query = query.Where(u => u.Id == idSearch);
                }
                else
                {
                    query = query.Where(u => (u.Name != null && u.Name.Contains(search))
                        || (u.Email != null && u.Email.Contains(search))
                        || (u.Role != null && u.Role.Contains(search)));
                }
            }

            var total = query.Count();

            var items = query
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<User>
            {
                Items = items,
                Total = total
            };
        }

        public void BlockUser(UserBlockDto dto, string performedBy)
        {
            var user = _db.Users.FirstOrDefault(u => u.Id == dto.UserId) ?? throw new Exception("User not found");
            user.IsBlocked = dto.Block;
            user.UpdatedAt = DateTime.UtcNow;
            user.UpdatedBy = performedBy;
            _db.SaveChanges();
        }
    }

}
