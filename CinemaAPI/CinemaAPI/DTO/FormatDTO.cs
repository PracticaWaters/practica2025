using CinemaAPI.Models;

namespace CinemaAPI.DTO
{
    public class FormatDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<int>? TimeSlotsIds { get; set; } = new();
    }
}
