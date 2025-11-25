using Microsoft.EntityFrameworkCore;
using Server.Data.Repositories;

namespace Server.Utils
{
    public class DataMigration
    {
        public static void Configure(IServiceProvider services)
        {
            using (var scope = services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<Repository>();
                db.Database.Migrate();
                db.Database.EnsureCreated();
            }
        }
    }
}
