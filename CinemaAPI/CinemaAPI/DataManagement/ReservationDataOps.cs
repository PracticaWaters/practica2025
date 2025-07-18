using System;
using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class ReservationDataOps
    {
        private CinemaDbContext dbContext;

        public ReservationDataOps(CinemaDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Reservation[] GetRezervari()
        {
            return dbContext.rezervari.Include(x => x.User).Include(x => x.Seats).ToArray();
        }

        //Idk daca e bine
        public void AddReservation(Reservation reservation)
        {
            try
            {
                dbContext.users.Attach(reservation.User);
                foreach(Seat seat in reservation.Seats)
                {
                    dbContext.seats.Attach(seat);
                }
                
                dbContext.rezervari.Add(reservation);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public void UpdateRezervare(Reservation reservation)
        {
            try
            {
                dbContext.rezervari.Update(reservation);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteReservation(Reservation reservation)
        {
            try
            {
                if (reservation != null)
                {
                    dbContext.rezervari.Remove(reservation);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(reservation), "Reservation cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Reservation? GetReservationById(int id)
        {
            return dbContext.rezervari.FirstOrDefault(x => x.Id == id);
        }
    }
}