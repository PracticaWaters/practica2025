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
        public ActionResult AddTicket([FromBody] SuportTicket ticket)
        {
            try
            {
                ticket.CreatedAt = DateTime.UtcNow;
                ticket.Status = true; // activ
                suportTicketDataOps.AddTicket(ticket);
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] {ex.Message}");
                return BadRequest();
            }
        }

        [HttpPut]
        //[Authorize] // va fi activat cand autentificarea e gata
        public ActionResult ChangeStatus([FromBody] int ticketId)
        {
            try
            {
                // TODO: validare user (doar owner/admin poate schimba statusul)
                var ticket = suportTicketDataOps.GetSuportTicketById(ticketId);
                if (ticket == null)
                    return NotFound();
                ticket.Status = !ticket.Status;
                suportTicketDataOps.UpdateTicket(ticket);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
