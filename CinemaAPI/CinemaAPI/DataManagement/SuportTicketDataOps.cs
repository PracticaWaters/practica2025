using System.Runtime.InteropServices;
using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class SuportTicketDataOps
    {
        private CinemaDbContext dbContext;

        public SuportTicketDataOps()
        {
            dbContext = new CinemaDbContext();
        }

        public SuportTicket[] GetSuportTickets()
        {
            return dbContext.suporttickets.ToArray();
        }

        public void AddTicket(SuportTicket ticket)
        {
            ticket.CreatedAt = DateTime.UtcNow;
            ticket.Status = true; // activ la creare
            dbContext.suporttickets.Add(ticket);
            dbContext.SaveChanges();
        }

        public SuportTicket GetSuportTicketById(int id)
        {
            return dbContext.suporttickets.Where(x => x.Id == id).FirstOrDefault();
        }

        public void UpdateTicket(SuportTicket ticket)
        {
            var existingTicket = dbContext.suporttickets.Find(ticket.Id);
            if (existingTicket != null)
            {
                existingTicket.Status = ticket.Status;
                dbContext.SaveChanges();
            }
        }
    }
}