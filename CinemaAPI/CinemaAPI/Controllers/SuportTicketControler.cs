using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/film")]
    public class SuportTicketControler : ControllerBase
    {
        private readonly SuportTicketDataOps suportTicketDataOps;

        public SuportTicketControler()
        {
            suportTicketDataOps = new SuportTicketDataOps();
        }

        [HttpGet]
        public ActionResult<SuportTicket> GetSuportTickets()
        {
            try
            {
                var tickets = suportTicketDataOps.GetSuportTickets();
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult AddTicket(SuportTicket suportTicket)
        {
            suportTicketDataOps.AddTicket(suportTicket);
            return Ok();
        }

        [HttpPut]
        public ActionResult ChangeStatus(SuportTicket suportTicket)
        {
            suportTicketDataOps.ChangeSuportTicketStatus(suportTicket);
            return Ok();
        }
    }
}
