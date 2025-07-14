using System;
using System.Security.Cryptography.X509Certificates;

public class Rezervare
{
	public Rezervare()
	{
		
		public int Id { get; set;}
		public Film Film { get; set; }
		public int NrPersoane { get; set;}

		//De modificat cand e adaugat TimeSlot
		//public TimeSlot TimeSlot { get; set; }
	    public List<Tuple<int,int>> Locuri {  get; set; }

		//De modificat cand e adaugat Promo
		//public Promo Promo { get; set; }
		public Currency Pret {  get; set; }

	}
}
