using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Cinema> cinemas { get; set; }
        public DbSet<Film> films { get; set; }
        public DbSet<Rezervare> rezervari { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Cinema;Trusted_Connection=True;MultipleActiveResultSets=true");

        }

        //UNSURE IF FUNCTIONAL
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Film>()
                .HasMany(r => r.Rezervari)
                .WithOne(g => g.Film)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(r => r.Rezervari)
                .WithOne(g => g.User)
                .IsRequired();


        }
        
    }
}
