using CinemaAPI.DataManagement;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaAPI.Models
{
    public class UserDto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Phone]
        [StringLength(20)]
        public string Phone { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [StringLength(10)]
        public string Gender { get; set; }

        [Url]
        [StringLength(255)]
        public string AvatarUrl { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        [ForeignKey("Role")]
        public Role Role { get; set; }

        public List<int>? RezervationId { get; set; }

        public List<int>? ReviewsId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime ModifiedAt { get; set; }

        public bool IsDeleted { get; set; }

        public User ToUser (ReservationDataOps reservareDataOps, ReviewDataOps reviewDataOps)
        {

            User user = new User
            {
                Id = this.Id,
                Name = this.Name,
                Email = this.Email,
                Phone = this.Phone,
                BirthDate = this.BirthDate,
                Role = this.Role,
                AvatarUrl = this.AvatarUrl,
                Gender = this.Gender,
                Password = this.Password,
                CreatedAt = this.CreatedAt,
                ModifiedAt = this.ModifiedAt,
                IsDeleted = this.IsDeleted,
                Reservations = new List<Reservation>(),
                Reviews = new List<Review>(),
            };


            if (this.RezervationId != null)
            {
                foreach (int id in this.RezervationId)
                {
                    var rezervation = reservareDataOps.GetReservationById(id)
                        ?? throw new ArgumentException($"Rezervation with Id {id} not found.");
                    user.Reservations.Add(rezervation);
                }
            }

            if (this.ReviewsId != null)
            {
                foreach (int id in this.ReviewsId)
                {
                    var review = reviewDataOps.GetReviewById(id)
                        ?? throw new ArgumentException($"Review with Id {id} not found.");
                    user.Reviews.Add(review);
                }
            }

            return user;
        }
    }


}
