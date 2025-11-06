using Microsoft.EntityFrameworkCore;
using Server.Data.Entities.Users;

namespace Server.Data.Repositories
{
    public class Repository : DbContext
    {
        public Repository(DbContextOptions<Repository> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

    }
}
