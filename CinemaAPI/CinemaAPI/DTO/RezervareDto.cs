namespace CinemaAPI.Models
{
    public class RezervareDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int NrOfPersons { get; set; }

        //De modificat cand e adaugat TimeSlot
        //public int TimeSlotId { get; set; }

        public List<int> SeatIds { get; set; }

        //De modificat cand e adaugat Promo
        //public Promo Promo { get; set; }
        public String Price { get; set; }
    }
}
