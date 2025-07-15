namespace CinemaAPI.Models
{
    public class Actor
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Film>? FilmActors { get; set; }
    }
}


