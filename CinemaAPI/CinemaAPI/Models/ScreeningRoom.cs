namespace CinemaAPI.Models
{
    public class ScreeningRoom
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumOfRow { get; set; }
        public int NumOfSeatsPerRow { get; set; }
        public List<Format> Format { get; set; }
        public List<Seat> SeatList {  get; set; }
        public Cinema Cinema { get; set; }
        public List<TimeSlot>? TimeSlots { get; set; } 

    }
}
