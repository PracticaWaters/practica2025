using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class CinemaDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Cinema;Trusted_Connection=True;MultipleActiveResultSets=true");

        }
    }
}
