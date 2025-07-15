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
        public ActionResult<List<Rezervare>> GetRezervari()
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
            Rezervare rezervare = new Rezervare();
            rezervare.NrPersoane = rezervareDto.NrPersoane;
            rezervare.Pret = rezervareDto.Pret;
            rezervare.Film = filmDataOps.GetFilmById(rezervareDto.FilmId);
            rezervare.User = userDataOps.GetUserById(rezervareDto.UserId);
            rezervareDataOps.AddRezervare(rezervare);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateRezervare(Rezervare rezervare)
        {
            try
            {
                rezervareDataOps.UpdateRezervare(rezervare);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public ActionResult DeleteRezervare(Rezervare rezervare)
        {
            try
            {
                rezervareDataOps.DeleteRezervare(rezervare);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Rezervare> GetRezervareById(int id)
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
