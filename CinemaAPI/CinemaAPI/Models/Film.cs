using System.ComponentModel.DataAnnotations;

namespace CinemaAPI.Models { 

    public class Film
    {
        public int Id {  get; set; }
        public string Name { get; set; }
        //public Gen Gen { get; set; }
        //public List<string> Distributtion { get; set; }
        public string Image { get; set; }
        [Url(ErrorMessage ="Url is not valid")]
        public string Trailer { get; set; }
        //public List<TimeSlot> Program {  get; set; }   
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string AgeRating { get; set; }
        public List<Review> Reviews{get;set;} = new List<Review>();
        public TimeSpan Duration { get; set; }
        //public List<Reservations> Reservations { get; set; }
        public DateTime StartRunningDate { get; set; }
        public DateTime EndRunningDate { get; set; }

    }
}
