using System;
using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/rezervare")]
    public class RezervareController : Controller
    {
        private readonly RezervareDataOps rezervareDataOps;
        private readonly FilmDataOps filmDataOps;
        private readonly UserDataOps userDataOps;

        public RezervareController()
        {
            rezervareDataOps = new RezervareDataOps();
        }

        [HttpGet]
        public ActionResult<List<Rezervation>> GetRezervari()
        {
            try
            {
                var rezervari = rezervareDataOps.GetRezervari();
                return Ok(rezervari);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult AddRezervare(RezervareDto rezervareDto)
        {
            Rezervation rezervation = new Rezervation();
            rezervation.NrOfPersons = rezervareDto.NrPersoane;
            rezervation.Price = rezervareDto.Pret;
            rezervation.Film = filmDataOps.GetFilmById(rezervareDto.FilmId);
            rezervation.User = userDataOps.GetUserById(rezervareDto.UserId);
            rezervareDataOps.AddRezervare(rezervation);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateRezervare(Rezervation rezervation)
        {
            try
            {
                rezervareDataOps.UpdateRezervare(rezervation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public ActionResult DeleteRezervare(Rezervation rezervation)
        {
            try
            {
                rezervareDataOps.DeleteRezervare(rezervation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Rezervation> GetRezervareById(int id)
        {
            try
            {
                var rezervare = rezervareDataOps.GetRezervareById(id);
                return Ok(rezervare);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
