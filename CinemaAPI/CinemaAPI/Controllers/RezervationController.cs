using System;
using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/rezevation")]
    public class RezervationController : Controller
    {
        private readonly RezervareDataOps _reservationDatOps;
        private readonly UserDataOps _userDataOps;

        public RezervationController(CinemaDbContext dbContext)
        {
            _reservationDatOps = new RezervareDataOps(dbContext);
            _userDataOps = new UserDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<List<Rezervation>> GetReservation()
        {
            try
            {
                var rezervari = _reservationDatOps.GetRezervari();
                return Ok(rezervari);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving reservations: {ex.Message}");
            }
        }

        [HttpPost]
        public ActionResult Add(RezervareDto rezervareDto)
        {
            try
            {
                Rezervation rezervation = new Rezervation();
                rezervation.NrOfPersons = rezervareDto.NrOfPersons;
                rezervation.Price = rezervareDto.Price;
                rezervation.User = _userDataOps.GetUserById(rezervareDto.UserId);
                _reservationDatOps.AddRezervare(rezervation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public ActionResult Update(Rezervation rezervation)
        {
            try
            {
                _reservationDatOps.UpdateRezervare(rezervation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public ActionResult Delete(Rezervation rezervation)
        {
            try
            {
                _reservationDatOps.DeleteRezervare(rezervation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Rezervation> GetReservationById(int id)
        {
            try
            {
                var rezervare = _reservationDatOps.GetRezervareById(id);
                return Ok(rezervare);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}