using Microsoft.EntityFrameworkCore;
using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<SuportTicket> SuportTickets { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Cinema;Trusted_Connection=True;MultipleActiveResultSets=true");
     
        }
    }
}
