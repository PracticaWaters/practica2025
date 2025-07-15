using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{

    [ApiController]
    [Route("api/cinema/cinema")]

    public class CinemaController : Controller
    {
        private readonly CinemaDataOps _cinemaDataOps;

        public CinemaController()
        {
            _cinemaDataOps = new CinemaDataOps();
        }

        [HttpGet]
        public ActionResult<Cinema> GetCinema()
        {
            try
            {
                var cinemas = _cinemaDataOps.GetCinemas();
                if (cinemas == null || cinemas.Length == 0)
                {
                    return NotFound("No cinemas found.");
                }
                return Ok(cinemas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult AddCinema(Cinema cinema)
        {
            _cinemaDataOps.AddCinema(cinema);
            return Ok("Cinema added successfully.");
        }

        [HttpPut]
        [Authorize (Roles = "Admin")]
        public ActionResult UpdateCinema(Cinema cinema)
        {
            try
            {
                _cinemaDataOps.UpdateCinema(cinema);
                return Ok("Cinema updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Cinema> GetCinemaById(int id)
        {
            try
            {
                var cinema = _cinemaDataOps.GetCinema(id);
                if (cinema == null)
                {
                    return NotFound($"Cinema with ID {id} not found.");
                }
                return Ok(cinema);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteCinema(Cinema cinema)
        {
            try
            {
                _cinemaDataOps.DeleteCinema(cinema);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
