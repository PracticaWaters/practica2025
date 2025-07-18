using CinemaAPI.Models;

namespace CinemaAPI.DTO
{
    public class ScreeningRoomDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumOfRow { get; set; }
        public int NumOfSeatsPerRow { get; set; }
        public List<int> FormatsIds { get; set; }=new();
        public List<Seat> SeatList { get; set; }
        public List<int>? TimeSlotsIds { get; set; }=new();
    }
}
