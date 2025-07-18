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
        private readonly UserDataOps _userDataOps;
        private readonly SeatDataOps _seatDataOps;

        public ReservationController(CinemaDbContext dbContext)
        {
            _reservationDatOps = new ReservationDataOps(dbContext);
            _userDataOps = new UserDataOps(dbContext);
            _seatDataOps = new SeatDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<List<Reservation>> GetReservation()
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
                Reservation rezervation = new Reservation();
                rezervation.NrOfPersons = rezervareDto.NrOfPersons;
                rezervation.Price = rezervareDto.Price;
                rezervation.User = _userDataOps.GetUserById(rezervareDto.UserId);
                foreach(int seatId in rezervareDto.SeatIds)
                {
                rezervation.Seats.Add(_seatDataOps.GetSeatById(seatId));
                }
                _reservationDatOps.AddReservation(rezervation);
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
                _reservationDatOps.UpdateRezervare(reservation);
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