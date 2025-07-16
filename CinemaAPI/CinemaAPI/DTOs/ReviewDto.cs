using CinemaAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaAPI.DTOs
{
    public class ReviewDto
    {
        public int Id { get; set; }
        //public User User { get; set; }
        [Range(0, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        public string Comment { get; set; }
        public int FilmId { get; set; }
    }
}
