using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Entities.Users;
using Server.Data.Repositories;

namespace Server.Services.Admin.AdminUserService
{
    public interface IAdminUserService
    {
        List<User> GetAll();
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

        public List<User> GetAll()
        {
            return _db.Users.AsNoTracking().Where(u => !u.IsDeleted).OrderByDescending(u => u.CreatedAt).ToList();
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
