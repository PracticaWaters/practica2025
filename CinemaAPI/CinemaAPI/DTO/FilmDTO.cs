namespace CinemaAPI.DTO
{
    public class FilmDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<int> ActorIds { get; set; } = new();
        public List<int> RewiesIds { get; set; } = new();
        public List<int>? ProgramIds { get; set; } = new();
        public List<int> RezervationsIds {  get; set; } = new();
        public List<int> WhishlistIds { get; set; } = new();
        public string Image { get; set; }
        public string Trailer { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string AgeRating { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime StartRunningDate { get; set; }
        public DateTime EndRunningDate { get; set; }
    }
}
