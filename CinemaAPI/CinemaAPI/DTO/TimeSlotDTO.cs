using CinemaAPI.Models;

namespace CinemaAPI.DTO
{
    public class TimeSlotDTO
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public float Price { get; set; }
        public int ScreeningRoomId { get; set; }
        public int FormatID { get; set; }
        public int FilmId { get; set; }


    }
}
