using System;
using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/reservation")]
    public class ReservationController : Controller
    {
        private readonly ReservationDataOps _reservationDatOps;
        private readonly FilmDataOps _filmDataOps;
        private readonly UserDataOps _userDataOps;

        public ReservationController(CinemaDbContext dbContext)
        {
            _reservationDatOps = new ReservationDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<List<Reservation>> GetReservation()
        {
            try
            {
                var reservations = _reservationDatOps.GetReservations();
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult Add(ReservationDto ReservationDto)
        {
            try
            {
                Reservation reservation = new Reservation();
                reservation.NrOfPersons = ReservationDto.NrPersoane;
                reservation.Price = ReservationDto.Pret;
                reservation.Film = _filmDataOps.GetFilmById(ReservationDto.FilmId);
                reservation.User = _userDataOps.GetUserById(ReservationDto.UserId);
                _reservationDatOps.AddReservation(reservation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public ActionResult Update(Reservation reservation)
        {
            try
            {
                _reservationDatOps.Update(reservation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public ActionResult Delete(Reservation reservation)
        {
            try
            {
                _reservationDatOps.DeleteReservation(reservation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Reservation> GetReservationById(int id)
        {
            try
            {
                var reservation = _reservationDatOps.GetReservationById(id);
                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}