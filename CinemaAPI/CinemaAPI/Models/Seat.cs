namespace CinemaAPI.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public int Row {  get; set; }
        public int Number {  get; set; }
        public bool IsReserved {  get; set; }
        public ScreeningRoom ScreeningRoom { get; set; }

        public List<Reservation> Reservations { get; set; }

    }
}
