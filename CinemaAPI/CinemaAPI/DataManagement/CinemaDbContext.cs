using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace CinemaAPI.DataManagement
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Cinema> cinemas { get; set; }
        public DbSet<Film> films { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<Wishlist> wishlists { get; set; }
        public DbSet<Format> formats { get; set; }
        public DbSet<Actor> actors { get; set; }
        public DbSet<Rezervare> rezervari { get; set; }

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

            modelBuilder.Entity<User>()
                .HasMany(w => w.Wishlists)
                .WithOne(u => u.User);

            modelBuilder.Entity<Film>()
                .HasMany(w => w.Wishlists)
                .WithOne(f => f.Film);

            modelBuilder.Entity<Film>()
                .HasMany(f => f.FilmActors)
                .WithMany(a => a.FilmActors)
                .UsingEntity(j => j.ToTable("FilmActor"));

                .HasMany(r => r.Rezervari)
                .WithOne(g => g.Film)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(r => r.Rezervari)
                .WithOne(g => g.User)
                .IsRequired();

            base.OnModelCreating(modelBuilder);


        }
        
    }
}
