namespace CinemaAPI.Models
{
    public class Format
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ScreeningRoom> ScreeningRooms { get; set; }
        public List<TimeSlot>? TimeSlots { get; set; }

    }
}
