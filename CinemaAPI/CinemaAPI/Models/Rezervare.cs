namespace CinemaAPI.Models
{	public class Rezervare
	{
		public int Id { get; set; }
		public User User { get; set; }
		public Film Film { get; set; }
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
