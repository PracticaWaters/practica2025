using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaAPI.Models
{
    public class Wishlist
    {
        [Key] public int Id { get; set; }
        
        public User User { get; set; }
        public Film Film { get; set; }
    }
}