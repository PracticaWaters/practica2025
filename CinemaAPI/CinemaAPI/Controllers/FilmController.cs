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
        private readonly FilmDataOps FilmDataOps;
        private readonly ActorDataOps ActorDataOps;
        private readonly ReviewDataOps ReviewDataOps;
        private readonly ReservationDataOps ReservationDataOps;
        private readonly WishlistDataOps WishlistDataOps;
        public FilmController(CinemaDbContext dbContext)
        {
            FilmDataOps = new FilmDataOps(dbContext);
            ActorDataOps = new ActorDataOps(dbContext);
            ReviewDataOps = new ReviewDataOps(dbContext);
            ReservationDataOps = new ReservationDataOps(dbContext);
            WishlistDataOps =new WishlistDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<List<Film>> GetFilms()
        {
            try
            {
                var films = FilmDataOps.GetFilms();
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
                FilmDataOps.DeleteFilm(film);
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
                var film = FilmDataOps.GetFilmById(id);
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
                FilmDataOps.AddFilm(film);
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
                FilmDataOps.UpdateFilm(film);
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
                var film = FilmDataOps.GetFilmById(id);
                if (film == null) return NotFound($"Film with ID {id} was not found.");

                FilmDataOps.DeleteFilm(film);
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
                Reservations = new List<Reservation>(),
                Wishlists = new List<Wishlist>(),
            };

            foreach (var actorId in dto.ActorIds)
            {
                var actor = ActorDataOps.GetActorById(actorId)
                          ?? throw new ArgumentException($"Actor with Id {actorId} not found.");
                film.FilmActors.Add(actor);
            }
            foreach (var reviewId in dto.RewiesIds)
            {
                var review = ReviewDataOps.GetReviewById(reviewId)
                          ?? throw new ArgumentException($"Review with Id {reviewId} not found.");
                film.Reviews.Add(review);
            }

            foreach (var rezervationId in dto.RezervationsIds)
            {
                var rezervation =ReservationDataOps.GetReservationById(rezervationId)
                          ?? throw new ArgumentException($"Review with Id {rezervationId} not found.");
                film.Reservations.Add(rezervation);
            }

            foreach (var whishlistId in dto.WhishlistIds)
            {
                var whishlist = WishlistDataOps.GetWishlistById(whishlistId)
                          ?? throw new ArgumentException($"Review with Id {whishlistId} not found.");
                film.Wishlists.Add(whishlist);
            }


            return film;
        }
    }
}
