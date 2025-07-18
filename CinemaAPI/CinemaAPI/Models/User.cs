using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaAPI.Models
{
    public class User
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

        public List<Reservation>? Reservations { get; set; }

        public List<Review>? Reviews { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime ModifiedAt { get; set; }

        public bool IsDeleted { get; set; }
        
        public List<Wishlist> Wishlists { get; set; }
    }
}
