using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<Film> films { get; set; }
        public DbSet<Review> reviews { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Cinema;Trusted_Connection=True;MultipleActiveResultSets=true");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Film)
                .WithMany(f => f.Reviews)
                .HasForeignKey("FilmId")
                .IsRequired();

            base.OnModelCreating(modelBuilder);
        }
    }
}
