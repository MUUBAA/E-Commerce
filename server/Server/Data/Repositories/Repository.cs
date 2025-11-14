using Microsoft.EntityFrameworkCore;
using Server.Data.Entities.Users;
using Server.Data.Entities.Products;
using Server.Data.Contract.Products;
using Server.Data.Entities.CartItems;
using Server.Data.Entities.OrderItems;
using Server.Data.Entities.Orders;
using Server.Data.Entities.Payments;

namespace Server.Data.Repositories
{
    public class Repository : DbContext
    {
        public Repository(DbContextOptions<Repository> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CartItems> CartItems { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Payments> Payments { get; set; }

    }
}
