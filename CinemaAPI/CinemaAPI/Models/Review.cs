using System.ComponentModel.DataAnnotations;

namespace CinemaAPI.Models
{
    public class Review
    {
        public int Id { get; set; }
        //public User User { get; set; }
        [Range(0, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        public string Comment { get; set; }
        public Film Film { get; set; }
    }
}
