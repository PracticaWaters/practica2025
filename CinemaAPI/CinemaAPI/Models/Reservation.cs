﻿namespace CinemaAPI.Models
{	public class Reservation
	{
		public int Id { get; set; }
		public User User { get; set; }
		public Film Film { get; set; }
		public int NrOfPersons { get; set; }

		public int TimeSlotId { get; set; }

		//public List<Tuple<int, int>> Locuri { get; set; }
        //public List<int> Locuri { get; set; }

        //De modificat cand e adaugat Promo
        //public Promo Promo { get; set; }
        public String Price { get; set; }
        
        public List<Seat> Seats { get; set; }
	}
}
