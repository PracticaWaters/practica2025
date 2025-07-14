using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaAPI.Models
{
    public class SuportTicket
    {
        [Key]
        public int Id { get; set; }

        public DateTime Date { get; set; }
        public bool Active { get; set; }
        public string Mesaj { get; set; }

        [ForeignKey("User")] // Leagă proprietatea UserId de navigația User
        public int UserId { get; set; }

    }
}
