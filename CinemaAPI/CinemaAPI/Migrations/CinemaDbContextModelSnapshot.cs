using CinemaAPI.DataManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CinemaAPI.Migrations
{
    [DbContext(typeof(CinemaDbContext))]
    partial class CinemaDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CinemaAPI.Models.ScreeningRoom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.PrimitiveCollection<string>("Format")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumOfRow")
                        .HasColumnType("int");

                    b.Property<int>("NumOfSeatsPerRow")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("screeningRooms");
                });

            modelBuilder.Entity("CinemaAPI.Models.Seat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsReserved")
                        .HasColumnType("bit");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.Property<int?>("ScreeningRoomId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ScreeningRoomId");

                    b.ToTable("seats");
                });

            modelBuilder.Entity("CinemaAPI.Models.Seat", b =>
                {
                    b.HasOne("CinemaAPI.Models.ScreeningRoom", null)
                        .WithMany("SeatList")
                        .HasForeignKey("ScreeningRoomId");
                });

            modelBuilder.Entity("CinemaAPI.Models.ScreeningRoom", b =>
                {
                    b.Navigation("SeatList");
                });
#pragma warning restore 612, 618
        }
    }
}
