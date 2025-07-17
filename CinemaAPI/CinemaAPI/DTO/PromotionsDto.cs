namespace CinemaAPI.DTO
{
    public class PromotionsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public double DiscountPercentage { get; set; }


        public List<int> FilmIds { get; set; } 
    }
}
