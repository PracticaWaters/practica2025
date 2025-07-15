using System;
using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/rezervare")]
    public class RezervariController: Controller
    {
        private readonly RezervareDataOps rezervareDataOps;
        public RezervariController()
        {
            rezervareDataOps = new RezervareDataOps();
        }

        [HttpGet]
        public ActionResult<Rezervare> GetRezervare()
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
        public ActionResult AddRezervare(Rezervare rezervare)
        {
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
