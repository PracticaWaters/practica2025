namespace CinemaAPI.Models
{
    public class TimeSlot
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public float Price {get; set; }
        public ScreeningRoom ScreeningRoom { get; set; }
        public Format Format { get; set; }
        public Film Film { get; set; }
    }
}
