using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/film")]
    public class FilmController : Controller
    {
        private readonly FilmDataOps filmDataOps;

        public FilmController()
        {
            filmDataOps = new FilmDataOps();
        }

        [HttpGet]
        public ActionResult<Film> GetFilms()
        {
            try
            {
                var films = filmDataOps.GetFilms();
                return Ok(films);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult AddFilm(Film film)
        {
            filmDataOps.AddFilm(film);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateFilm(Film film)
        {
            try
            {
                filmDataOps.UpdateFilm(film);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public ActionResult DeleteFilm(Film film)
        {
            try
            {
                filmDataOps.DeleteFilm(film);
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
                var film = filmDataOps.GetFilmById(id);
                return Ok(film);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
