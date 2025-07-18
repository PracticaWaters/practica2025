namespace CinemaAPI.Models
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int FilmId { get; set; }
        public int NrPersoane { get; set; }

        //De modificat cand e adaugat TimeSlot
        //public int TimeSlotId { get; set; }

        //public List<Tuple<int, int>> Locuri { get; set; }
        //public List<int> Locuri { get; set; }

        //De modificat cand e adaugat Promo
        //public Promo Promo { get; set; }
        public String Pret { get; set; }
    }
}
