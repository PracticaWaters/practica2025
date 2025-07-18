
using CinemaAPI.DataManagement;
using CinemaAPI.DTO;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/film")]
    public class FilmController : ControllerBase
    {
        private readonly FilmDataOps _filmDataOps;
        private readonly ActorDataOps _actorDataOps;
        private readonly ReviewDataOps _reviewDataOps;

        public FilmController(CinemaDbContext dbContext)
        {
            _filmDataOps = new FilmDataOps(dbContext);
            _actorDataOps = new ActorDataOps(dbContext);
            _reviewDataOps = new ReviewDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<List<Film>> GetFilms()
        {
            try
            {
                var films = _filmDataOps.GetFilms();
                return Ok(films);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving films: {ex.Message}");
            }
        }


        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteFilm(Film film)
        {
            try
            {
                _filmDataOps.DeleteFilm(film);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Film> GetFilmById(int id)
        {
            try
            {
                var film = _filmDataOps.GetFilmById(id);
                return film == null
                       ? NotFound($"Film with ID {id} was not found.")
                       : Ok(film);
            }
            catch (Exception ex)
            {
                return BadRequest($"Internal error: {ex.Message}");
            }
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public ActionResult AddFilm([FromBody] FilmDTO dto)
        {
            try
            {
                var film = MapDtoToFilm(dto);
                _filmDataOps.AddFilm(film);
                return Ok("Film added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add film: {ex.Message}");
            }
        }

        [HttpPut]
        //[Authorize(Roles = "Admin")]

        public ActionResult UpdateFilm([FromBody] FilmDTO dto)
        {
            try
            {
                var film = MapDtoToFilm(dto);
                film.Id = dto.Id;
                _filmDataOps.UpdateFilm(film);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Update failed: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteFilm(int id)
        {
            try
            {
                var film = _filmDataOps.GetFilmById(id);
                if (film == null) return NotFound($"Film with ID {id} was not found.");

                _filmDataOps.DeleteFilm(film);
                return Ok($"Film with ID {id} was deleted.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting film: {ex.Message}");
            }
        }

        private Film MapDtoToFilm(FilmDTO dto)
        {
            var film = new Film
            {
                Name = dto.Name,
                Image = dto.Image,
                Trailer = dto.Trailer,
                Description = dto.Description,
                ReleaseDate = dto.ReleaseDate,
                AgeRating = dto.AgeRating,
                Duration = dto.Duration,
                StartRunningDate = dto.StartRunningDate,
                EndRunningDate = dto.EndRunningDate,
                FilmActors = new List<Actor>(),
                Reviews = new List<Review>(),
            };

            foreach (var actorId in dto.ActorIds)
            {
                var actor = _actorDataOps.GetActorById(actorId)
                          ?? throw new ArgumentException($"Actor with Id {actorId} not found.");
                film.FilmActors.Add(actor);
            }
            foreach (var reviewId in dto.RewiesIds)
            {
                var review = _reviewDataOps.GetReviewById(reviewId)
                          ?? throw new ArgumentException($"Review with Id {reviewId} not found.");
                film.Reviews.Add(review);
            }

            return film;
        }
    }
}
