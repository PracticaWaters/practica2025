namespace CinemaAPI.Models
{
    public class SuportTicket
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool Active { get; set; }
        public string Mesaj { get; set; }

        //public int UserId { get; set; }      // Foreign key - ID-ul userului
        //public User User { get; set; }       // Navigația către entitatea User
    }
}
