namespace CinemaAPI.DTO
{
    public class PromotionsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public double DiscountPercentage { get; set; }


        public List<int> FilmIds=new();
    }
}
