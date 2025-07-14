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
            return dbContext.SuportTickets.ToArray();
        }

        public void AddTicket(SuportTicket suportTicket)
        {
            
                dbContext.SuportTickets.Add(suportTicket);
                dbContext.SaveChanges();
           
        }

        public SuportTicket GetSuportTicketById(int id) {
            return dbContext.SuportTickets.Where(x => x.Id == id).FirstOrDefault();
        }

        public void ChangeSuportTicketStatus(SuportTicket suportTicket)
        {
            var ticket = GetSuportTicketById(suportTicket.Id);
            if (ticket != null)
            {
                ticket.Active = !ticket.Active;
                dbContext.SaveChanges();
            }
        }
    }
}
