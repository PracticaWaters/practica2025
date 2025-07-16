namespace CinemaAPI.Models
{
    public class Promotions
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public double DiscountPercentage { get; set; }

        public ICollection<Film> Films { get; set; } = new List<Film>();
    }
}
