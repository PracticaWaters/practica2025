namespace CinemaAPI.Models
{
    public class ScreeningRoom
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumOfRow { get; set; }
        public int NumOfSeatsPerRow { get; set; }
        public List<string> Format { get; set; } //placeholder
        public List<Seat> SeatList { get; set; }

    }
}