using System;
using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace CinemaAPI.DataManagement
{
    public class SeatDataOps
    {
        private CinemaDbContext dbContext;

        public SeatDataOps(CinemaDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public Seat[] GetSeats()
        {
            return dbContext.seats.Include(x => x.ScreeningRoom).Include(x => x.Reservations).ToArray();
        }

        public void AddSeat(Seat seat)
        {
            try
            {
                dbContext.screeningRooms.Attach(seat.ScreeningRoom);
                foreach (Reservation reservation in seat.Reservations)
                {
                    dbContext.rezervari.Attach(reservation);
                }
                dbContext.seats.Add(seat);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public void UpdateSeat(Seat seat)
        {
            try
            {
                dbContext.seats.Update(seat);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public void DeleteSeat(Seat seat)
        {
            try
            {
                if (seat != null)
                {
                    dbContext.seats.Remove(seat);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(seat), "Seat cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Seat? GetSeatById(int id)
        {
            return dbContext.seats.FirstOrDefault(x => x.Id == id);
        }
    }

}
