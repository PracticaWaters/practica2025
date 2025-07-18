namespace CinemaAPI.Models
{	public class Reservation
	{
		public int Id { get; set; }
		public User User { get; set; }
		public int NrOfPersons { get; set; }

		//De modificat cand e adaugat TimeSlot
		//public int TimeSlotId { get; set; }

		public Seat Seat { get; set; }

        //De modificat cand e adaugat Promo
        //public Promo Promo { get; set; }
        public String Price { get; set; }
	}
}
