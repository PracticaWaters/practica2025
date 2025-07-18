namespace CinemaAPI.Models
{
    public class SeatDTO
    {
        public int Id { get; set; }
        public int Row { get; set; }
        public int Number { get; set; }
        public bool IsReserved { get; set; }
        public int ScreeningRoomId { get; set; }
        public List<int> ReservationIds { get; set; }

    }
}
