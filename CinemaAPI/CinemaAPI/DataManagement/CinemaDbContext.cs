using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace CinemaAPI.DataManagement
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<SuportTicket> suporttickets { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Cinema> cinemas { get; set; }
        public DbSet<Film> films { get; set; }
        public DbSet<ScreeningRoom> screeningRooms { get; set; }
        public DbSet<Seat> seats { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<Wishlist> wishlists { get; set; }
        public DbSet<Format> formats { get; set; }
        public DbSet<Actor> actors { get; set; }
        public DbSet<TimeSlot> timeSlots { get; set; }
        public DbSet<Reservation> reservations { get; set; }


        public DbSet<Promotions> promotions { get; set; }

        public DbSet<RefreshToken> AuthenticationRefreshTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Cinema;Trusted_Connection=True;MultipleActiveResultSets=true");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            // existing relationship configs
            modelBuilder.Entity<ScreeningRoom>()
                .HasMany(s => s.SeatList)
                .WithOne(sc => sc.ScreeningRoom);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Film)
                .WithMany(f => f.Reviews)
                .HasForeignKey("FilmId")
                .IsRequired();

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(f => f.Reviews)
                .HasForeignKey("UserId")
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(w => w.Wishlists)
                .WithOne(u => u.User);

            modelBuilder.Entity<Film>()
                .HasMany(w => w.Wishlists)
                .WithOne(f => f.Film);

            modelBuilder.Entity<Film>()
                .HasMany(f => f.FilmActors)
                .WithMany(a => a.FilmActors);

            modelBuilder.Entity<Film>()
                .HasMany(r => r.Reservations)
                .WithOne(g => g.Film)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(r => r.Reservations)
                .WithOne(g => g.User)
                .IsRequired();

            modelBuilder.Entity<ScreeningRoom>()
                .HasMany(sc => sc.TimeSlots)
                .WithOne(sr => sr.ScreeningRoom)
                .IsRequired();

            modelBuilder.Entity<Format>()
                .HasMany(f => f.TimeSlots)
                .WithOne(ts => ts.Format);

            base.OnModelCreating(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }
    }
}
