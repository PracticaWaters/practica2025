using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Film> films { get; set; }
        
        public DbSet<ScreeningRoom> screeningRooms { get; set; }
        public DbSet<Seat> seats { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Cinema;Trusted_Connection=True;MultipleActiveResultSets=true");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ScreeningRoom>()
                .HasMany(s => s.SeatList)
                .WithOne(sc => sc.ScreeningRoom);

            base.OnModelCreating(modelBuilder);
        }
    }
}
