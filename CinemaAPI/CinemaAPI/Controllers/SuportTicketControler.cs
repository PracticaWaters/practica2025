using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/ticketsupport")]
    public class SuportTicketControler : ControllerBase
    {
        private readonly SuportTicketDataOps suportTicketDataOps;

        public SuportTicketControler()
        {
            suportTicketDataOps = new SuportTicketDataOps();
        }

        [HttpGet]
        public ActionResult<IEnumerable<SuportTicket>> GetSuportTickets()
        {
            try
            {
                var tickets = suportTicketDataOps.GetSuportTickets();
                return Ok(tickets);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        //[Authorize] // va fi activat cand autentificarea e gata
        public ActionResult<SuportTicket> AddTicket([FromBody] CreateSuportTicketDto ticketDto)
        {
            try
            {
                var ticket = new SuportTicket
                {
                    Message = ticketDto.Message,
                    Name = ticketDto.Name,
                    Email = ticketDto.Email,
                    CreatedAt = DateTime.UtcNow,
                    Status = true // activ
                };
                
                suportTicketDataOps.AddTicket(ticket);
                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
        }

        [HttpPut]
        //[Authorize] // va fi activat cand autentificarea e gata
        public ActionResult<SuportTicket> ChangeStatus([FromBody] int ticketId)
        {
            try
            {
                // TODO: validare user (doar admin poate schimba stat)
                var ticket = suportTicketDataOps.GetSuportTicketById(ticketId);
                if (ticket == null)
                    return NotFound($"Ticket with ID {ticketId} not found");
                
                ticket.Status = !ticket.Status;
                suportTicketDataOps.UpdateTicket(ticket);
                
                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
        }
    }
}
