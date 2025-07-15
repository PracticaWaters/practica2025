using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaAPI.Models
{
    public class SuportTicket
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public bool Status { get; set; } // true = activ, false = inactiv

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
